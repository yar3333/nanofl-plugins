package js.three;

@:native("THREE.ExtrudeGeometry") extern class ExtrudeGeometry extends js.three.Geometry
{
	@:overload(function(?shapes:Array<Shape>, ?options:Dynamic) : Void { })
	function new(?shape:js.three.Shape, ?options:Dynamic) : Void;
	var WorldUVGenerator : { function generateSideWallUV(geometry:js.three.Geometry, indexA:Float, indexB:Float, indexC:Float, indexD:Float) : Array<js.three.Vector2>; function generateTopUV(geometry:js.three.Geometry, indexA:Float, indexB:Float, indexC:Float) : Array<js.three.Vector2>; };
	function addShapeList(shapes:Array<js.three.Shape>, ?options:Dynamic) : Void;
	function addShape(shape:js.three.Shape, ?options:Dynamic) : Void;
}