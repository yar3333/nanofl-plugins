package models.client;

extern class ShapePropertiesOptions
{
	var strokePane(default, null) : Bool;
	var fillPane(default, null) : Bool;
	var roundRadiusPane(default, null) : Bool;
	function showStrokePane() : models.client.ShapePropertiesOptions;
	function showFillPane() : models.client.ShapePropertiesOptions;
	function showRoundRadiusPane() : models.client.ShapePropertiesOptions;
}