package nanofl.ide;

extern class NewObjectParams
{
	function new(app:nanofl.ide.Application) : Void;
	var strokeType : String;
	var fillType : String;
	var stroke(default, never) : nanofl.engine.strokes.IStroke;
	var fill(default, never) : nanofl.engine.fills.IFill;
	var roundRadius : Float;
	var textFormat(default, null) : nanofl.TextRun;
	function setStroke(stroke:nanofl.engine.strokes.IStroke) : Void;
	function setFill(fill:nanofl.engine.fills.IFill) : Void;
	function setStrokeParams(p:{ @:optional
	var bitmapPath : String; @:optional
	var caps : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var ignoreScale : Bool; @:optional
	var joints : String; @:optional
	var miterLimit : Float; @:optional
	var ratios : Array<Float>; @:optional
	var thickness : Float; @:optional
	var x0 : Float; @:optional
	var x1 : Float; @:optional
	var y0 : Float; @:optional
	var y1 : Float; }) : Void;
	function getStrokeParams() : { var caps : String; var color : String; var ignoreScale : Bool; var joints : String; var miterLimit : Float; var thickness : Float; var type : String; };
	function setFillParams(p:{ @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var matrix : nanofl.engine.geom.Matrix; @:optional
	var ratios : Array<Float>; }) : Void;
	function getFillParams() : { var bitmapPath : String; var color : String; var colors : Array<String>; var matrix : nanofl.engine.geom.Matrix; var ratios : Array<Float>; var type : String; };
	function getStrokeByType(type:String) : nanofl.engine.strokes.IStroke;
	function getFillByType(type:String) : nanofl.engine.fills.IFill;
}