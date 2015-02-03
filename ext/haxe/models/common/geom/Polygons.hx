package models.common.geom;

extern class Polygons
{
	static function findByPoint(polygons:Array<models.common.geom.Polygon>, x:Float, y:Float) : models.common.geom.Polygon;
	static function isEdgeInside(polygons:Array<models.common.geom.Polygon>, edge:models.common.geom.Edge) : Bool;
	static function reconstruct(edges:Array<models.common.geom.Edge>, polygonsToDetectFill:Array<models.common.geom.Polygon>) : Array<models.common.geom.Polygon>;
	static function mergeByCommonEdges(polygons:Array<models.common.geom.Polygon>, edges:Array<models.common.geom.StrokeEdge>) : Void;
	static function removeDublicates(polygons:Array<models.common.geom.Polygon>) : Void;
	static function hasDublicates(polygons:Array<models.common.geom.Polygon>) : Bool;
	static function roundAndRemoveDegenerated(polygons:Array<models.common.geom.Polygon>) : Void;
}