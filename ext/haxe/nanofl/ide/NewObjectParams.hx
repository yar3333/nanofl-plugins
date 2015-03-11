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
	var color : String; @:optional
	var thickness : Float; }) : Void;
	function getStrokeParams() : { var color : String; var thickness : Float; var type : String; };
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