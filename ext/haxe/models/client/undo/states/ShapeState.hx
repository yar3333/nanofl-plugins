package models.client.undo.states;

extern class ShapeState extends models.client.undo.states.ElementState
{
	function new(edges:Array<models.common.geom.StrokeEdge>, polygons:Array<models.common.geom.Polygon>) : Void;
	var edges(default, null) : Array<models.common.geom.StrokeEdge>;
	var polygons(default, null) : Array<models.common.geom.Polygon>;
	override function equ(_state:models.client.undo.states.ElementState) : Bool;
	override function toString() : String;
}