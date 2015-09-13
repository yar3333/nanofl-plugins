package nanofl.engine.geom;

extern class StrokeEdges
{
	static function load(node:htmlparser.HtmlNodeElement, strokes:Array<nanofl.engine.strokes.IStroke>) : Array<nanofl.engine.geom.StrokeEdge>;
	static function save(edges:Array<nanofl.engine.geom.StrokeEdge>, strokes:Array<nanofl.engine.strokes.IStroke>, out:htmlparser.XmlBuilder) : Void;
	static function getBounds(edges:Array<nanofl.engine.geom.StrokeEdge>, ?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	static function processStrokes(edges:Array<nanofl.engine.geom.StrokeEdge>, callb:nanofl.engine.strokes.IStroke -> Void) : Void;
	static function drawSorted(edges:Array<nanofl.engine.geom.StrokeEdge>, g:nanofl.engine.Render, scaleSelection:Float) : Void;
	static function fromEdges(edges:Array<nanofl.engine.geom.Edge>, stroke:nanofl.engine.strokes.IStroke, ?selected:Bool) : Array<nanofl.engine.geom.StrokeEdge>;
	static function replace(edges:Array<nanofl.engine.geom.StrokeEdge>, search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>) : Void;
}