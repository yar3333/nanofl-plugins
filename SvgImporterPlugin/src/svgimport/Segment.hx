package svgimport;

class Segment
{
	public var x : Float;
	public var y : Float;

	public function new(inX:Float, inY:Float)
	{
		x = inX;
		y = inY;
	}
	
	public function getType() : SegmentType return null;

	public function prevX() return x;
	public function prevY() return y;
	public function prevCX() return x;
	public function prevCY() return y;

	public function export(exporter:ContoursExporter)
	{
		throw "Must be overriden.";
	}
}

class MoveSegment extends Segment
{
	override public function getType() return SegmentType.MOVE(this);
}

class DrawSegment extends Segment
{
	override public function export(exporter:ContoursExporter)
	{
		exporter.lineTo(x, y);
	}

	override public function getType() return SegmentType.DRAW(this);
}

class QuadraticSegment extends Segment
{
	public var cx : Float;
	public var cy : Float;

	public function new(inCX:Float, inCY:Float, inX:Float, inY:Float)
	{
		super(inX, inY);
		cx = inCX;
		cy = inCY;
	}

	override public function prevCX() return cx;
	override public function prevCY() return cy;

	override public function export(exporter:ContoursExporter)
	{
		exporter.curveTo(cx, cy, x, y);
	}

	override public function getType() return SegmentType.CURVE(this);
}

class CubicSegment extends Segment
{
	public var cx1 : Float;
	public var cy1 : Float;
	public var cx2 : Float;
	public var cy2 : Float;
	
	public function new(inCX1:Float, inCY1:Float, inCX2:Float, inCY2:Float, inX:Float, inY:Float)
	{
		super(inX, inY);
		cx1 = inCX1;
		cy1 = inCY1;
		cx2 = inCX2;
		cy2 = inCY2;
	}
	
	override public function prevCX() { return cx2; }
	override public function prevCY() { return cy2; }
	
	function interp(a:Float, b:Float, frac:Float) : Float
	{
		return a + (b-a)*frac;
	}
	
	override public function export(exporter:ContoursExporter)
	{
		var tx0 = exporter.x;
		var ty0 = exporter.y;
		var tx3 = x;
		var ty3 = y;
		
		// from http://www.timotheegroleau.com/Flash/articles/cubic_bezier/bezier_lib.as
		
		var pa_x = interp(tx0, cx1, 0.75);
		var pa_y = interp(ty0, cy1, 0.75);
		var pb_x = interp(tx3, cx2, 0.75);
		var pb_y = interp(ty3, cy2, 0.75);
		
		// get 1/16 of the [P3, P0] segment
		var dx = (tx3 - tx0)/16;
		var dy = (ty3 - ty0)/16;
		
		// calculates control point 1
		var pcx_1 = interp(tx0, cx1, 3/8);
		var pcy_1 = interp(ty0, cy1, 3/8);
		
		// calculates control point 2
		var pcx_2 = interp(pa_x, pb_x, 3/8) - dx;
		var pcy_2 = interp(pa_y, pb_y, 3/8) - dy;
		
		// calculates control point 3
		var pcx_3 = interp(pb_x, pa_x, 3/8) + dx;
		var pcy_3 = interp(pb_y, pa_y, 3/8) + dy;
		
		// calculates control point 4
		var pcx_4 = interp(tx3, cx2, 3/8);
		var pcy_4 = interp(ty3, cy2, 3/8);
		
		// calculates the 3 anchor points
		var pax_1 = (pcx_1+pcx_2) * 0.5;
		var pay_1 = (pcy_1+pcy_2) * 0.5;
		
		var pax_2 = (pa_x+pb_x) * 0.5;
		var pay_2 = (pa_y+pb_y) * 0.5;
		
		var pax_3 = (pcx_3+pcx_4) * 0.5;
		var pay_3 = (pcy_3+pcy_4) * 0.5;
		
		// draw the four quadratic subsegments
		exporter.curveTo(pcx_1, pcy_1, pax_1, pay_1);
		exporter.curveTo(pcx_2, pcy_2, pax_2, pay_2);
		exporter.curveTo(pcx_3, pcy_3, pax_3, pay_3);
		exporter.curveTo(pcx_4, pcy_4, tx3, ty3);
	}
	
	override public function getType() return SegmentType.CUBIC(this);
}

class ArcSegment extends Segment
{
	var x1 : Float;
	var y1 : Float;
	var rx : Float;
	var ry : Float;
	var phi : Float;
	var fA : Bool;
	var fS : Bool;
	
	public function new(inX1:Float, inY1:Float, inRX:Float, inRY:Float, inRotation:Float, inLargeArc:Bool, inSweep:Bool, x:Float, y:Float)
	{
		x1 = inX1;
		y1 = inY1;
		super(x, y);
		rx = inRX;
		ry = inRY;
		phi = inRotation;
		fA = inLargeArc;
		fS = inSweep;
	}

	override public function export(exporter:ContoursExporter)
	{
		if (x1 == x && y1 == y) return;
		
		if (rx == 0 || ry == 0) { exporter.lineTo(x, y); return; }
		
		rx = Math.abs(rx);
		ry = Math.abs(ry);
		
		// See:  http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
		var p = phi*Math.PI/180.0;
		var cos = Math.cos(p);
		var sin = Math.sin(p);
		
		// Step 1, compute x', y'
		var dx = (x1 - x) * 0.5;
		var dy = (y1 - y) * 0.5;
		var x1_ =  cos*dx + sin*dy;
		var y1_ = -sin*dx + cos*dy;
		
		// Step 2, compute cx', cy'
		var rx2 = rx*rx;
		var ry2 = ry*ry;
		var x1_2 = x1_*x1_;
		var y1_2 = y1_*y1_;
		var s = (rx2*ry2 - rx2*y1_2 - ry2*x1_2) / (rx2*y1_2 + ry2*x1_2);
		
		if (s < 0) s = 0;
		else if (fA == fS)
			s = -Math.sqrt(s);
		else
			s = Math.sqrt(s);
		
		var cx_ =  s * rx * y1_ / ry;
		var cy_ = -s * ry * x1_ / rx;
		
		// Step 3, compute cx,cy from cx',cy'
		// Something not quite right here.
		
		var xm = (x1+x)*0.5;
		var ym = (y1+y)*0.5;
		
		var cx = cos*cx_ - sin*cy_ + xm;
		var cy = sin*cx_ + cos*cy_ + ym;
		
		var theta = Math.atan2((y1_-cy_)/ry, (x1_-cx_)/rx);
		var dtheta = Math.atan2((-y1_-cy_)/ry, (-x1_-cx_)/rx) - theta;
		
		if (fS && dtheta<0)
			dtheta += 2.0*Math.PI;
		else if (!fS && dtheta>0)
			dtheta -= 2.0*Math.PI;
		
		var Txc = rx;
		var Txs = 0;
		var Tx0 = cx;
		var Tyc = 0;
		var Tys = ry;
		var Ty0 = cy;
		
		var len = Math.abs(dtheta) * Math.sqrt(Txc*Txc + Txs*Txs + Tyc*Tyc + Tys*Tys);
		
		// TODO: Do as series of quadratics ...
		len *= 5;
		var steps = Math.round(len);
		
		if (steps > 1)
		{
			dtheta /= steps;
			for (i in 1...steps-1)
			{
				var c = Math.cos(theta);
				var s = Math.sin(theta);
				theta += dtheta;
				exporter.lineTo(Txc*c + Txs*s + Tx0,   Tyc*c + Tys*s + Ty0);
			}
		}
		exporter.lineTo(x, y);
	}
	
	override public function getType() return SegmentType.ARC(this);
}




