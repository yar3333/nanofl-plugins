package svgexporter;

import nanofl.engine.Render;
import nanofl.engine.XmlWriter;
using stdlib.Lambda;
using Slambda;

class ShapePathsRender
{
	var gradients : Array<Gradient>;
	var xml : XmlWriter;
	
	var attributes = new Array<{ name:String, value:Dynamic }>();
	var d = "";
	
	public function new(gradients:Array<Gradient>, xml:XmlWriter)
	{
		this.gradients = gradients;
		this.xml = xml;
	}
	
	public function moveTo(x:Float, y:Float) : Render
	{
		d += 'M$x,$y';
		return this;
	}
	
	public function lineTo(x:Float, y:Float) : Render
	{
		d += 'L$x,$y';
		return this;
	}
	
	public function curveTo(x0:Float, y0:Float, x1:Float, y1:Float) : Render
	{
		d += 'Q$x0,$y0,$x1,$y1';
		return this;
	}
	
	public function beginStroke(color:String) : Render
	{
		attr("stroke", color);
		return this;
	}
	
	public function beginLinearGradientStroke(colors:Array<String>, ratios:Array<Float>, x0:Float, y0:Float, x1:Float, y1:Float) : Render
	{
		var g = Gradient.createLinear(colors, ratios, x0, y0, x1, y1);
		attr("stroke", "url(#" + gradients.find.fn(_.equ(g)).id + ")");
		return this;
	}
	
	public function beginRadialGradientStroke(colors:Array<String>, ratios:Array<Float>, fx:Float, fy:Float, fr:Float, cx:Float, cy:Float, cr:Float) : Render
	{
		var g = Gradient.createRadial(colors, ratios, cx, cy, cr, fx, fy);
		attributes.push({ name:"stroke", value:"url(#" + gradients.find.fn(_.equ(g)).id + ")" });
		return this;
	}
	
	#if js
	public function beginBitmapStroke(image:Dynamic, repeat:String) : Render
	{
		attr("stroke", "#000000");
		return this;
	}
	#else
	public function beginBitmapStroke(url:String, repeat:String) : Render
	{
		attr("stroke", "#000000");
		return this;
	}
	#end
	
	public function setStrokeStyle(thickness:Float, caps:String, joints:String, miterLimit:Float, ignoreScale:Bool) : Render
	{
		attr("stroke-width", thickness);
		attr("stroke-linecap", caps);
		attr("stroke-linejoin", joints);
		attr("stroke-miterlimit", miterLimit);
		return this;
	}
	
	public function endStroke() : Render
	{
		if (d != "")
		{
			d += "Z";
			finishPath();
		}
		return this;
	}
	
	public function beginFill(color:String) : Render
	{
		attr("fill", color);
		return this;
	}
	
	public function beginLinearGradientFill(colors:Array<String>, ratios:Array<Float>, x0:Float, y0:Float, x1:Float, y1:Float) : Render
	{
		var g = Gradient.createLinear(colors, ratios, x0, y0, x1, y1);
		attr("fill", "url(#" + gradients.find.fn(_.equ(g)).id + ")");
		return this;
	}
	
	public function beginRadialGradientFill(colors:Array<String>, ratios:Array<Float>, fx:Float, fy:Float, fr:Float, cx:Float, cy:Float, cr:Float) : Render
	{
		var g = Gradient.createRadial(colors, ratios, cx, cy, cr, fx, fy);
		attr("fill", "url(#" + gradients.find.fn(_.equ(g)).id + ")");
		return this;
	}
	
	#if js
	public function beginBitmapFill(image:Dynamic, repeat:String, matrix:createjs.Matrix2D) : Render
	{
		attr("fill", "#000000");
		return this;
	}
	#else
	public function beginBitmapFill(url:String, repeat:String, matrix:nanofl.engine.geom.Matrix) : Render
	{
		attr("fill", "#000000");
		return this;
	}
	#end
	
	public function endFill() : Render
	{
		if (d != "")
		{
			d += "Z";
			finishPath();
		}
		return this;
	}
	
	function finishPath()
	{
		xml.begin("path", attributes).attr("d", d).end();
		
		attributes = [];
		d = "";
	}
	
	function attr<T>(name:String, value:T, ?defaultValue:T)
	{
		if (value != defaultValue)
		{
			attributes.push({ name:name, value:value });
		}
	}
}