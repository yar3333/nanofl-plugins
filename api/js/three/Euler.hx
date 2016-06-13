package js.three;

@:native("THREE.Euler") extern class Euler
{
	function new(?x:Float, ?y:Float, ?z:Float, ?order:String) : Void;
	var x : Float;
	var y : Float;
	var z : Float;
	var order : String;
	function set(x:Float, y:Float, z:Float, ?order:String) : js.three.Euler;
	function clone() : js.three.Euler;
	function copy(euler:js.three.Euler) : js.three.Euler;
	function setFromRotationMatrix(m:js.three.Matrix4, ?order:String, ?update:Bool) : js.three.Euler;
	function setFromQuaternion(q:js.three.Quaternion, ?order:String, ?update:Bool) : js.three.Euler;
	function setFromVector3(v:js.three.Vector3, ?order:String) : js.three.Euler;
	function reorder(newOrder:String) : js.three.Euler;
	function equals(euler:js.three.Euler) : Bool;
	function fromArray(xyzo:Array<Dynamic>) : js.three.Euler;
	function toArray(?array:Array<Float>, ?offset:Float) : Array<Float>;
	function toVector3(?optionalResult:js.three.Vector3) : js.three.Vector3;
	var onChange : Void -> Void;
}