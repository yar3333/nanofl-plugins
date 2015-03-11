package nanofl.engine.geom;

extern class StrokeEdges
{
	static function load(node:htmlparser.HtmlNodeElement, strokes:Array<nanofl.engine.strokes.IStroke>) : Array<nanofl.engine.geom.StrokeEdge>;
	static function save(edges:Array<nanofl.engine.geom.StrokeEdge>, strokes:Array<nanofl.engine.strokes.IStroke>, out:nanofl.engine.XmlWriter) : Void;
	static function replace(edges:Array<nanofl.engine.geom.StrokeEdge>, search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>) : Bool;
}