package nanofl.engine.geom;

extern class Edges
{
	static var showSelection : Bool;
	static function isUnique<T>(edges:Array<T>) : Bool;
	static function makeUnique<T>(edges:Array<T>) : Void;
	static function concatUnique<T>(edgesA:Array<nanofl.engine.geom.Edge>, edgesB:Array<T>) : Array<nanofl.engine.geom.Edge>;
	static function appendUnique<T>(edgesA:Array<T>, edgesB:Array<T>) : Array<T>;
	static function draw<T>(edges:Array<T>, g:createjs.Graphics, fixLineJoinsInClosedContours:Bool) : Void;
	static function getBounds(edges:Array<nanofl.engine.geom.Edge>, ?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	static function export<T>(edges:Array<T>, out:nanofl.engine.XmlWriter) : Void;
	static function exportStroked(edges:Array<nanofl.engine.geom.StrokeEdge>, out:nanofl.engine.XmlWriter) : Void;
	static function load(s:String) : Array<nanofl.engine.geom.Edge>;
	static function save(edges:Array<nanofl.engine.geom.Edge>) : String;
	/**
	 * The pos is a random index in edges array. Method return a new pos after replace (pos may be increazed if inserts before pos).
	 */
	static function replace(edges:Array<nanofl.engine.geom.Edge>, search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>, ?pos:Int) : Int;
	static function intersect(edgesA:Array<nanofl.engine.geom.Edge>, edgesB:Array<nanofl.engine.geom.Edge>, ?onReplace:nanofl.engine.geom.Edge -> Array<nanofl.engine.geom.Edge> -> Void) : Void;
	static function selfIntersect(edges:Array<nanofl.engine.geom.Edge>) : Void;
	static function roundAndRemoveDegenerated<T>(edges:Array<T>) : Void;
	static function isPointInside(edges:Array<nanofl.engine.geom.Edge>, x:Float, y:Float, fillEvenOdd:Bool) : Bool;
	static function getSequences(edges:Array<nanofl.engine.geom.Edge>) : Array<{ var equEdge : nanofl.engine.geom.Edge; var edges : Array<nanofl.engine.geom.Edge>; }>;
}