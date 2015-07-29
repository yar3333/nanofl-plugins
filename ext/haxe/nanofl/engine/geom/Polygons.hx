package nanofl.engine.geom;

extern class Polygons
{
	static function findByPoint(polygons:Array<nanofl.engine.geom.Polygon>, x:Float, y:Float) : nanofl.engine.geom.Polygon;
	static function isEdgeInside(polygons:Array<nanofl.engine.geom.Polygon>, edge:nanofl.engine.geom.Edge) : Bool;
	static function mergeByCommonEdges(polygons:Array<nanofl.engine.geom.Polygon>, edges:Array<nanofl.engine.geom.StrokeEdge>) : Void;
	static function removeDublicates(polygons:Array<nanofl.engine.geom.Polygon>) : Void;
	static function normalize(polygons:Array<nanofl.engine.geom.Polygon>) : Void;
	static function getReconstructed(polygons:Array<nanofl.engine.geom.Polygon>, additionalEdges:Array<nanofl.engine.geom.Edge>, ?force:Bool) : Array<nanofl.engine.geom.Polygon>;
	static function fromContours(originalContours:Array<nanofl.engine.geom.Contour>, fill:nanofl.engine.fills.IFill, fillEvenOdd:Bool) : Array<nanofl.engine.geom.Polygon>;
	static function assertCorrect(polygons:Array<nanofl.engine.geom.Polygon>, intergrityChecks:Bool) : Void;
	static function removeErased(polygons:Array<nanofl.engine.geom.Polygon>) : Void;
}