package nanofl.engine.geom;

extern class Contours
{
	@:profile
	static function find(edges:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Contour>;
	static function removeTailEdges(edges:Array<nanofl.engine.geom.Edge>) : Void;
}