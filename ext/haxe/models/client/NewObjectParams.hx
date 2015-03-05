package models.client;

extern class NewObjectParams
{
	function new(app:models.client.Application) : Void;
	var strokeType : String;
	var fillType : String;
	var stroke(get, never) : models.common.strokes.IStroke;
	var fill(get, never) : models.common.fills.IFill;
	var roundRadius : Float;
	var textFormat(default, null) : nanofl.TextRun;
	function setStroke(stroke:models.common.strokes.IStroke) : Void;
	function setFill(fill:models.common.fills.IFill) : Void;
	function setStrokeParams(p:{ @:optional
	var color : String; @:optional
	var thickness : Float; }) : Void;
	function getStrokeParams() : { var color : String; var thickness : Float; var type : String; };
	function setFillParams(p:{ @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var matrix : models.common.geom.Matrix; @:optional
	var ratios : Array<Float>; }) : Void;
	function getFillParams() : { var bitmapPath : String; var color : String; var colors : Array<String>; var matrix : models.common.geom.Matrix; var ratios : Array<Float>; var type : String; };
	function getStrokeByType(type:String) : models.common.strokes.IStroke;
	function getFillByType(type:String) : models.common.fills.IFill;
}