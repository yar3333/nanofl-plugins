package models.common.geom;

extern class StrokeEdges
{
	static function load(node:htmlparser.HtmlNodeElement, strokes:Array<models.common.strokes.IStroke>) : Array<models.common.geom.StrokeEdge>;
	static function save(edges:Array<models.common.geom.StrokeEdge>, strokes:Array<models.common.strokes.IStroke>, out:models.common.XmlWriter) : Void;
	static function replace(edges:Array<models.common.geom.StrokeEdge>, search:models.common.geom.Edge, replacement:Array<models.common.geom.Edge>) : Bool;
}