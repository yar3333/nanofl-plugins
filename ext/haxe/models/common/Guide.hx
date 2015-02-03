package models.common;

extern class Guide
{
	function new(shape:models.common.elements.ShapeElement) : Void;
	function get(startProps:{ var rotation : Float; var x : Float; var y : Float; }, finishProps:{ var rotation : Float; var x : Float; var y : Float; }, orientToPath:Bool, t:Float) : { var rotation : Float; var x : Float; var y : Float; };
}