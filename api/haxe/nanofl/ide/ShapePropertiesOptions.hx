package nanofl.ide;

extern class ShapePropertiesOptions
{
	function new() : Void;
	var strokePane(default, null) : Bool;
	var fillPane(default, null) : Bool;
	var roundRadiusPane(default, null) : Bool;
	var noneStroke(default, null) : Bool;
	var noneFill(default, null) : Bool;
	function showStrokePane() : nanofl.ide.ShapePropertiesOptions;
	function showFillPane() : nanofl.ide.ShapePropertiesOptions;
	function showRoundRadiusPane() : nanofl.ide.ShapePropertiesOptions;
	function disallowNoneStroke() : nanofl.ide.ShapePropertiesOptions;
	function disallowNoneFill() : nanofl.ide.ShapePropertiesOptions;
}