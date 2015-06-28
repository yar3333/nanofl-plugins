package nanofl.engine.geom;

extern class Edges
{
	static var showSelection : Bool;
	static function hasDuplicates<T>(edges:Array<T>) : Bool;
	static function removeDublicates<T>(edges:Array<T>) : Void;
	static function concatUnique<T, Z>(edgesA:Array<T>, edgesB:Array<Z>) : Array<T>;
	static function appendUnique<T, Z>(edgesA:Array<T>, edgesB:Array<Z>) : Array<T>;
	static function exclude(edges:Array<nanofl.engine.geom.Edge>, exclude:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Edge>;
	static function draw<T>(edges:Array<T>, g:nanofl.engine.Render, fixLineJoinsInClosedContours:Bool) : Void;
	static function getBounds<T>(edges:Array<T>, ?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	static function export<T>(edges:Array<T>, out:htmlparser.XmlBuilder) : Void;
	static function exportStroked(edges:Array<nanofl.engine.geom.StrokeEdge>, out:htmlparser.XmlBuilder) : Void;
	static function load(s:String) : Array<nanofl.engine.geom.Edge>;
	static function save(edges:Array<nanofl.engine.geom.Edge>) : String;
	static function replace<T>(edges:Array<T>, search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>) : Int;
	static function replaceAll<T>(edges:Array<T>, search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>) : Void;
	static function replaceAt<T>(edges:Array<T>, n:Int, replacement:Array<nanofl.engine.geom.Edge>, reverse:Bool) : Void;
	@:profile
	static function intersect<T>(edgesA:Array<T>, edgesB:Array<T>, ?onReplace:nanofl.engine.geom.Edge -> Array<nanofl.engine.geom.Edge> -> Void) : Void;
	@:profile
	static function intersectSelf<T>(edges:Array<T>, ?onReplace:nanofl.engine.geom.Edge -> Array<nanofl.engine.geom.Edge> -> Void) : Void;
	static function normalize<T>(edges:Array<T>) : Array<T>;
	static function roundPoints<T>(edges:Array<T>) : Array<T>;
	static function removeDegenerated<T>(edges:Array<T>, ?removeAlsoCurvesWithStartAndEndEquals:Bool) : Array<T>;
	static function isPointInside(edges:Array<nanofl.engine.geom.Edge>, x:Float, y:Float, fillEvenOdd:Bool) : Bool;
	static function getSequences(edges:Array<nanofl.engine.geom.Edge>) : Array<{ var equEdge : nanofl.engine.geom.Edge; var edges : Array<nanofl.engine.geom.Edge>; }>;
	static function isSequence<T>(edges:Array<T>) : Bool;
	static function hasDegenerated<T>(edges:Array<T>) : Bool;
	static function getPointUseCount<T>(edges:Array<T>, x:Float, y:Float) : Int;
	static function equIgnoreOrder(edgesA:Array<nanofl.engine.geom.Edge>, edgesB:Array<nanofl.engine.geom.Edge>) : Bool;
	static function getCommon(edgesA:Array<nanofl.engine.geom.Edge>, edgesB:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Edge>;
	static function getDifferent(edgesA:Array<nanofl.engine.geom.Edge>, edgesB:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Edge>;
	static function getNearestVertex(edges:Array<nanofl.engine.geom.Edge>, x:Float, y:Float) : nanofl.engine.geom.Point;
	static function getTailPoints(edges:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Point>;
}