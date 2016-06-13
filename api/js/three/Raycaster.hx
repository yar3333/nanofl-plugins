package js.three;

@:native("THREE.Raycaster") extern class Raycaster
{
	function new(?origin:js.three.Vector3, ?direction:js.three.Vector3, ?near:Float, ?far:Float) : Void;
	var ray : js.three.Ray;
	var near : Float;
	var far : Float;
	var params : js.three.RaycasterParameters;
	var precision : Float;
	var linePrecision : Float;
	function set(origin:js.three.Vector3, direction:js.three.Vector3) : Void;
	function setFromCamera(coords:{ var x : Float; var y : Float; }, camera:js.three.Camera) : Void;
	function intersectObject(object:js.three.Object3D, ?recursive:Bool) : Array<js.three.Intersection>;
	function intersectObjects(objects:Array<js.three.Object3D>, ?recursive:Bool) : Array<js.three.Intersection>;
}