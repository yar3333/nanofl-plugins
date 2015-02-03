package models.common.geom;

extern class Edges
{
	static function ensureUnique<T>(edges:Array<T>) : Bool;
	static function concatUnique<T>(edgesA:Array<models.common.geom.Edge>, edgesB:Array<T>) : Array<models.common.geom.Edge>;
	static function appendUnique<T>(edgesA:Array<T>, edgesB:Array<T>) : Array<T>;
	static function drawStroked(edges:Array<models.common.geom.StrokeEdge>, g:createjs.Graphics, m:createjs.Matrix2D) : Void;
	static function draw<T>(edges:Array<T>, g:createjs.Graphics) : Void;
	static function getBounds(edges:Array<models.common.geom.Edge>, ?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	static function getStrokedBounds(edges:Array<models.common.geom.StrokeEdge>, ?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	static function export<T>(edges:Array<T>, out:models.common.XmlWriter) : Void;
	static function exportStroked(edges:Array<models.common.geom.StrokeEdge>, out:models.common.XmlWriter) : Void;
	static function load(s:String) : Array<models.common.geom.Edge>;
	static function save(edges:Array<models.common.geom.Edge>) : String;
	/**
	 * The pos is a random index in edges array. Method return a new pos after replace (pos may be increazed if inserts before pos).
	 */
	static function replace(edges:Array<models.common.geom.Edge>, search:models.common.geom.Edge, replacement:Array<models.common.geom.Edge>, ?pos:Int) : Int;
	static function intersect(edgesA:Array<models.common.geom.Edge>, edgesB:Array<models.common.geom.Edge>, ?onReplace:models.common.geom.Edge -> Array<models.common.geom.Edge> -> Void) : Void;
	static function roundAndRemoveDegenerated<T>(edges:Array<T>) : Void;
}