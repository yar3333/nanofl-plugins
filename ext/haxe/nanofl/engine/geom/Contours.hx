package nanofl.engine.geom;

extern class Contours
{
	@:profile
	static function find(edges:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Contour>;
	@:profile
	static function removeTailEdges(edges:Array<nanofl.engine.geom.Edge>) : Void;
	static function getEdges(contours:Array<nanofl.engine.geom.Contour>) : Array<nanofl.engine.geom.Edge>;
}