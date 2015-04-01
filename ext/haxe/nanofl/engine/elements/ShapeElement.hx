package nanofl.engine.elements;

extern class ShapeElement extends nanofl.engine.elements.Element
{
	function new(?edges:Array<nanofl.engine.geom.StrokeEdge>, ?polygons:Array<nanofl.engine.geom.Polygon>) : Void;
	var edges(default, null) : Array<nanofl.engine.geom.StrokeEdge>;
	var polygons(default, null) : Array<nanofl.engine.geom.Polygon>;
	override function getType() : String;
	override function save(out:nanofl.engine.XmlWriter) : Void;
	function ensureNoTransform() : Void;
	function drawOnGraphics(g:createjs.Graphics, scaleSelection:Float) : Void;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function clone() : nanofl.engine.elements.Element;
	override function translate(dx:Float, dy:Float) : Void;
	function isEmpty() : Bool;
	function hasSelected() : Bool;
	function isAllSelected() : Bool;
	function hasSelectedEdges() : Bool;
	function hasSelectedPolygons() : Bool;
	function select(obj:{ var selected : Bool; }) : Void;
	function selectAll() : Void;
	function deselectAll() : Void;
	function translateSelected(dx:Float, dy:Float) : Void;
	function translateVertex(point:nanofl.engine.geom.Point, dx:Float, dy:Float) : Void;
	function removeSelected() : Void;
	function getPolygonAtPos(pt:nanofl.engine.geom.Point) : nanofl.engine.geom.Polygon;
	function getSameEdges(edge:nanofl.engine.geom.Edge) : Array<nanofl.engine.geom.Edge>;
	function getNearestStrokeEdge(pt:nanofl.engine.geom.Point) : { var dist : Float; var edge : nanofl.engine.geom.StrokeEdge; var point : nanofl.engine.geom.Point; var t : Float; };
	function getNearestPolygonEdge(pt:nanofl.engine.geom.Point) : { var dist : Float; var edge : nanofl.engine.geom.Edge; var point : nanofl.engine.geom.Point; var t : Float; };
	function getNearestVertex(pt:nanofl.engine.geom.Point, ?excludeSelf:Bool) : { var dist : Float; var distMinusEdgeThickness : Float; var point : nanofl.engine.geom.Point; };
	function setSelectedEdgesStroke(stroke:nanofl.engine.strokes.IStroke) : Void;
	function setSelectedEdgesStrokeParams(params:{ @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var ratios : Array<Float>; @:optional
	var thickness : Float; @:optional
	var x0 : Float; @:optional
	var x1 : Float; @:optional
	var y0 : Float; @:optional
	var y1 : Float; }) : Void;
	function getSelectedEdgesStrokeParams() : { var bitmapPath : String; var color : String; var colors : Array<String>; var ratios : Array<Float>; var thickness : Float; var type : String; var x0 : Float; var x1 : Float; var y0 : Float; var y1 : Float; };
	function setSelectedPolygonsFill(fill:nanofl.engine.fills.IFill, ?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float) : Void;
	function setSelectedPolygonsFillParams(params:{ @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var matrix : nanofl.engine.geom.Matrix; @:optional
	var ratios : Array<Float>; }) : Void;
	function getSelectedPolygonsFillParams() : { var bitmapPath : String; var color : String; var colors : Array<String>; var matrix : nanofl.engine.geom.Matrix; var ratios : Array<Float>; var type : String; };
	function floodFill(fill:nanofl.engine.fills.IFill, x1:Float, y1:Float, x2:Float, y2:Float) : Void;
	function getBounds(?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	function getSelectedBounds(?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	override function transform(m:nanofl.engine.geom.Matrix) : Void;
	function transformSelected(m:nanofl.engine.geom.Matrix) : Void;
	function combine_strokeEdge(edge:nanofl.engine.geom.StrokeEdge) : Void;
	function combine_edge(edge:nanofl.engine.geom.Edge) : Void;
	function combine_vertex(x:Float, y:Float) : Void;
	function combine_selected() : Void;
	function extractSelected() : nanofl.engine.elements.ShapeElement;
	override function getState() : nanofl.ide.undo.states.ElementState;
	override function setState(_state:nanofl.ide.undo.states.ElementState) : Void;
	function replaceEdge(search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>) : Void;
	function combine(shape:nanofl.engine.elements.ShapeElement) : Void;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function toString() : String;
}