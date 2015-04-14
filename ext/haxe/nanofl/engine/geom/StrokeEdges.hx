package nanofl.engine.geom;

extern class StrokeEdges
{
	static function load(node:htmlparser.HtmlNodeElement, strokes:Array<nanofl.engine.strokes.IStroke>) : Array<nanofl.engine.geom.StrokeEdge>;
	static function save(edges:Array<nanofl.engine.geom.StrokeEdge>, strokes:Array<nanofl.engine.strokes.IStroke>, out:nanofl.engine.XmlWriter) : Void;
	static function getBounds(edges:Array<nanofl.engine.geom.StrokeEdge>, ?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	static function drawSorted(edges:Array<nanofl.engine.geom.StrokeEdge>, g:createjs.Graphics, scaleSelection:Float) : Void;
}