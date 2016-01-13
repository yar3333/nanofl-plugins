package js.three;

@:native("THREE.ShapeGeometry") extern class ShapeGeometry extends js.three.Geometry
{
	@:overload(function(shapes:Array<Shape>, ?options:Dynamic) : Void { })
	function new(shape:js.three.Shape, ?options:Dynamic) : Void;
	function addShapeList(shapes:Array<js.three.Shape>, options:Dynamic) : js.three.ShapeGeometry;
	function addShape(shape:js.three.Shape, ?options:Dynamic) : Void;
}