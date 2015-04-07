package nanofl.ide;

extern class Figure
{
	function new(layers:Array<nanofl.ide.EditorLayer>) : Void;
	function getVertexAtPos(pt:nanofl.engine.geom.Point) : nanofl.engine.geom.Point;
	function getSameEdgeWithLayers(edge:nanofl.engine.geom.Edge) : Array<{ var layerIndex : Int; var edge : nanofl.engine.geom.Edge; }>;
	function getEdgeAtPos(pt:nanofl.engine.geom.Point) : { var dist : Float; var edge : nanofl.engine.geom.Edge; var layerIndex : Int; var t : Float; };
	function getStrokeEdgeAtPos(pt:nanofl.engine.geom.Point) : { var dist : Float; var edge : nanofl.engine.geom.StrokeEdge; var layerIndex : Int; var t : Float; };
	function getPolygonEdgeAtPos(pt:nanofl.engine.geom.Point) : { var dist : Float; var edge : nanofl.engine.geom.Edge; var layerIndex : Int; var t : Float; };
	function getPolygonAtPos(pt:nanofl.engine.geom.Point) : { var layerIndex : Int; var polygon : nanofl.engine.geom.Polygon; };
	function translateVertex(point:nanofl.engine.geom.Point, dx:Float, dy:Float) : Void;
	function hasSelected() : Bool;
	function hasSelectedEdges() : Bool;
	function hasSelectedPolygons() : Bool;
	@:profile
	function updateShapes() : Void;
	@:profile
	function getSelectedEdgesStrokeParams() : { @:optional
	var bitmapPath : String; @:optional
	var caps : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var ignoreScale : Bool; @:optional
	var joints : String; @:optional
	var miterLimit : Float; @:optional
	var r0 : Float; @:optional
	var r1 : Float; @:optional
	var ratios : Array<Float>; @:optional
	var thickness : Float; var type : String; @:optional
	var x0 : Float; @:optional
	var x1 : Float; @:optional
	var y0 : Float; @:optional
	var y1 : Float; };
	@:profile
	function getSelectedPolygonsFillParams() : { @:optional
	var bitmapPath : String; @:optional
	var color : String; @:optional
	var colors : Array<String>; @:optional
	var matrix : nanofl.engine.geom.Matrix; @:optional
	var r0 : Float; @:optional
	var r1 : Float; @:optional
	var ratios : Array<Float>; var type : String; @:optional
	var x0 : Float; @:optional
	var x1 : Float; @:optional
	var y0 : Float; @:optional
	var y1 : Float; };
	function selectAll() : Void;
	function deselectAll() : Void;
	function getBounds(?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	function getSelectedBounds(?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	@:profile
	function removeSelected() : Void;
	function translateSelected(dx:Float, dy:Float) : Void;
	function transformSelected(m:nanofl.engine.geom.Matrix) : Void;
	function setSelectedPolygonsFillParams(params:nanofl.engine.fills.FillParams) : Void;
	function setSelectedEdgesStrokeParams(params:nanofl.engine.strokes.StrokeParams) : Void;
	function setSelectedPolygonsFill(fill:nanofl.engine.fills.IFill, ?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float) : Void;
	function setSelectedEdgesStroke(stroke:nanofl.engine.strokes.IStroke) : Void;
	function combine_vertex(x:Float, y:Float) : Void;
	function combine_selected() : Void;
	function extractSelected() : nanofl.engine.elements.ShapeElement;
	function combineLayerWithEdge(layerIndex:Int, edge:nanofl.engine.geom.Edge) : Void;
	function getMagnetPointEx(x:Float, y:Float, ?excludeSelf:Bool) : { var found : Bool; var point : nanofl.engine.geom.Point; };
	function splitEdge(edge:nanofl.engine.geom.Edge, t:Float) : nanofl.engine.geom.Point;
	function getSelectedStrokeEdges() : Array<nanofl.engine.geom.StrokeEdge>;
}