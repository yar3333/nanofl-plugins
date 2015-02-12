package models.common.elements;

extern class ShapeElement extends models.common.elements.Element
{
	function new(?edges:Array<models.common.geom.StrokeEdge>, ?polygons:Array<models.common.geom.Polygon>) : Void;
	var edges(default, null) : Array<models.common.geom.StrokeEdge>;
	var polygons(default, null) : Array<models.common.geom.Polygon>;
	override function getType() : String;
	override function save(out:models.common.XmlWriter) : Void;
	function ensureNoTransform() : Void;
	function drawOnGraphics(g:createjs.Graphics, m:createjs.Matrix2D) : Void;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	override function clone() : models.common.elements.Element;
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
	function translateVertex(point:models.common.geom.Point, dx:Float, dy:Float) : Void;
	function removeSelected() : Void;
	function getPolygonAtPos(pt:models.common.geom.Point) : models.common.geom.Polygon;
	function getSameEdges(edge:models.common.geom.Edge) : Array<models.common.geom.Edge>;
	function getNearestStrokeEdge(pt:models.common.geom.Point) : { var dist : Float; var edge : models.common.geom.StrokeEdge; var point : models.common.geom.Point; var t : Float; };
	function getNearestPolygonEdge(pt:models.common.geom.Point) : { var dist : Float; var edge : models.common.geom.Edge; var point : models.common.geom.Point; var t : Float; };
	function getNearestVertex(pt:models.common.geom.Point, ?excludeSelf:Bool) : { var dist : Float; var distMinusEdgeThickness : Float; var point : models.common.geom.Point; };
	function setSelectedEdgesStroke(stroke:models.common.strokes.IStroke) : Void;
	function setSelectedEdgesStrokeParams(params:{ @:optional
	var color : String; @:optional
	var thickness : Float; }) : Void;
	function getSelectedEdgesStrokeParams() : { var color : String; var thickness : Float; var type : String; };
	function setSelectedPolygonsFill(fill:models.common.fills.IFill, ?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float) : Void;
	function setSelectedPolygonsFillParams(params:{ @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var matrix : models.common.geom.Matrix; @:optional
	var ratios : Array<Float>; }) : Void;
	function getSelectedPolygonsFillParams() : { var bitmapPath : String; var color : String; var colors : Array<String>; var matrix : models.common.geom.Matrix; var ratios : Array<Float>; var type : String; };
	function floodFill(fill:models.common.fills.IFill, x1:Float, y1:Float, x2:Float, y2:Float) : Void;
	function getBounds(?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	function getSelectedBounds(?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	function transform(m:models.common.geom.Matrix) : Void;
	function transformSelected(m:models.common.geom.Matrix) : Void;
	function combine_strokeEdge(edge:models.common.geom.StrokeEdge) : Void;
	function combine_edge(edge:models.common.geom.Edge) : Void;
	function combine_vertex(x:Float, y:Float) : Void;
	function combine_selected() : Void;
	function extractSelected() : models.common.elements.ShapeElement;
	override function getState() : models.client.undo.states.ElementState;
	override function setState(_state:models.client.undo.states.ElementState) : Void;
	function replaceEdge(search:models.common.geom.Edge, replacement:Array<models.common.geom.Edge>) : Void;
	function combine(shape:models.common.elements.ShapeElement) : Void;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function toString() : String;
}