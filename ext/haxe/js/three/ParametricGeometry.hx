package js.three;

@:native("THREE.ParametricGeometry") extern class ParametricGeometry extends js.three.Geometry
{
	function new(func:Float -> Float -> js.three.Vector3, slices:Int, stacks:Int) : Void;
	var parameters : { var func : Float -> Float -> js.three.Vector3; var slices : Int; var stacks : Int; };
}