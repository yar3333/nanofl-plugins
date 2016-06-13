package nanofl.ide.graphicseditor;

extern class ShapePropertiesOptions
{
	function new() : Void;
	var strokePane(default, null) : Bool;
	var fillPane(default, null) : Bool;
	var roundRadiusPane(default, null) : Bool;
	var noneStroke(default, null) : Bool;
	var noneFill(default, null) : Bool;
	function showStrokePane() : nanofl.ide.graphicseditor.ShapePropertiesOptions;
	function showFillPane() : nanofl.ide.graphicseditor.ShapePropertiesOptions;
	function showRoundRadiusPane() : nanofl.ide.graphicseditor.ShapePropertiesOptions;
	function disallowNoneStroke() : nanofl.ide.graphicseditor.ShapePropertiesOptions;
	function disallowNoneFill() : nanofl.ide.graphicseditor.ShapePropertiesOptions;
}