package nanofl.ide;

extern class ShapePropertiesOptions
{
	var strokePane(default, null) : Bool;
	var fillPane(default, null) : Bool;
	var roundRadiusPane(default, null) : Bool;
	function showStrokePane() : nanofl.ide.ShapePropertiesOptions;
	function showFillPane() : nanofl.ide.ShapePropertiesOptions;
	function showRoundRadiusPane() : nanofl.ide.ShapePropertiesOptions;
}