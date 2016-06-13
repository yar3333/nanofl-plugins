package nanofl.ide.graphicseditor;

extern class MagnetMark
{
	function new() : Void;
	var pos : nanofl.engine.geom.Point;
	function show(pos:nanofl.engine.geom.Point) : Void;
	function hide() : Void;
	function draw(shape:createjs.Shape) : Void;
}