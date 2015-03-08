package nanofl.engine.geom;

extern class StrokeEdge extends nanofl.engine.geom.Edge implements nanofl.engine.ISelectable
{
	function new(x1:Float, y1:Float, x2:Float, y2:Float, ?x3:Float, ?y3:Float, ?stroke:nanofl.engine.strokes.IStroke, ?selected:Bool) : Void;
	var stroke : nanofl.engine.strokes.IStroke;
	var selected : Bool;
	override function draw(g:createjs.Graphics, m:createjs.Matrix2D) : Void;
	override function getNearestPoint(x:Float, y:Float) : { var point : nanofl.engine.geom.Point; var t : Float; };
	function addTo(edges:Array<nanofl.engine.geom.StrokeEdge>) : Void;
	override function clone() : nanofl.engine.geom.Edge;
	override function toString() : String;
	static function fromEdge(edge:nanofl.engine.geom.Edge, ?stroke:nanofl.engine.strokes.IStroke, ?selected:Bool) : nanofl.engine.geom.StrokeEdge;
}