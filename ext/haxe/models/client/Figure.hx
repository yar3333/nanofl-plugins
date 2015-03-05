package models.client;

extern class Figure
{
	function new(layers:Array<models.client.EditorLayer>) : Void;
	function getVertexAtPos(pt:models.common.geom.Point) : models.common.geom.Point;
	function getSameEdgeWithLayers(edge:models.common.geom.Edge) : Array<{ var layerIndex : Int; var edge : models.common.geom.Edge; }>;
	function getEdgeAtPos(pt:models.common.geom.Point) : { var dist : Float; var edge : models.common.geom.Edge; var layerIndex : Int; var t : Float; };
	function getStrokeEdgeAtPos(pt:models.common.geom.Point) : { var dist : Float; var edge : models.common.geom.StrokeEdge; var layerIndex : Int; var t : Float; };
	function getPolygonEdgeAtPos(pt:models.common.geom.Point) : { var dist : Float; var edge : models.common.geom.Edge; var layerIndex : Int; var t : Float; };
	function getPolygonAtPos(pt:models.common.geom.Point) : { var layerIndex : Int; var polygon : models.common.geom.Polygon; };
	function translateVertex(point:models.common.geom.Point, dx:Float, dy:Float) : Void;
	function hasSelected() : Bool;
	function hasSelectedEdges() : Bool;
	function hasSelectedPolygons() : Bool;
	@:profile
	function updateShapes() : Void;
	@:profile
	function getSelectedEdgesStrokeParams() : { var color : String; var thickness : Float; var type : String; };
	@:profile
	function getSelectedPolygonsFillParams() : { var bitmapPath : String; var color : String; var colors : Array<String>; var matrix : models.common.geom.Matrix; var ratios : Array<Float>; var type : String; };
	function selectAll() : Void;
	function deselectAll() : Void;
	function getBounds(?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	function getSelectedBounds(?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	@:profile
	function removeSelected() : Void;
	function translateSelected(dx:Float, dy:Float) : Void;
	function transformSelected(m:models.common.geom.Matrix) : Void;
	function setSelectedPolygonsFillParams(params:{ @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var matrix : models.common.geom.Matrix; @:optional
	var ratios : Array<Float>; }) : Void;
	function setSelectedEdgesStrokeParams(params:{ @:optional
	var color : String; @:optional
	var thickness : Float; }) : Void;
	function setSelectedPolygonsFill(fill:models.common.fills.IFill, ?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float) : Void;
	function setSelectedEdgesStroke(stroke:models.common.strokes.IStroke) : Void;
	function combine_vertex(x:Float, y:Float) : Void;
	function combine_selected() : Void;
	function extractSelected() : models.common.elements.ShapeElement;
	function combineLayerWithEdge(layerIndex:Int, edge:models.common.geom.Edge) : Void;
	function getMagnetPointEx(x:Float, y:Float, ?excludeSelf:Bool) : { var found : Bool; var point : models.common.geom.Point; };
	function splitEdge(edge:models.common.geom.Edge, t:Float) : models.common.geom.Point;
	function getSelectedStrokeEdges() : Array<models.common.geom.StrokeEdge>;
}