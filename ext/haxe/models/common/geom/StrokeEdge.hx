package models.common.geom;

extern class StrokeEdge extends models.common.geom.Edge implements models.common.ISelectable
{
	function new(x1:Float, y1:Float, x2:Float, y2:Float, ?x3:Float, ?y3:Float, ?stroke:models.common.strokes.IStroke, ?selected:Bool) : Void;
	var stroke : models.common.strokes.IStroke;
	var selected(default, set) : Bool;
	override function draw(g:createjs.Graphics, m:createjs.Matrix2D) : Void;
	override function getNearestPoint(x:Float, y:Float) : { var point : models.common.geom.Point; var t : Float; };
	function addTo(edges:Array<models.common.geom.StrokeEdge>) : Void;
	override function clone() : models.common.geom.Edge;
	override function toString() : String;
	static function fromEdge(edge:models.common.geom.Edge, ?stroke:models.common.strokes.IStroke, ?selected:Bool) : models.common.geom.StrokeEdge;
}