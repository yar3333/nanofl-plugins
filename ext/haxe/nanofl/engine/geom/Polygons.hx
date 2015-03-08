package nanofl.engine.geom;

extern class Polygons
{
	static function findByPoint(polygons:Array<nanofl.engine.geom.Polygon>, x:Float, y:Float) : nanofl.engine.geom.Polygon;
	static function isEdgeInside(polygons:Array<nanofl.engine.geom.Polygon>, edge:nanofl.engine.geom.Edge) : Bool;
	static function reconstruct(edges:Array<nanofl.engine.geom.Edge>, polygonsToDetectFill:Array<nanofl.engine.geom.Polygon>) : Array<nanofl.engine.geom.Polygon>;
	static function mergeByCommonEdges(polygons:Array<nanofl.engine.geom.Polygon>, edges:Array<nanofl.engine.geom.StrokeEdge>) : Void;
	static function removeDublicates(polygons:Array<nanofl.engine.geom.Polygon>) : Void;
	static function hasDublicates(polygons:Array<nanofl.engine.geom.Polygon>) : Bool;
	static function roundAndRemoveDegenerated(polygons:Array<nanofl.engine.geom.Polygon>) : Void;
}