package js.three;

@:native("THREE.ArrowHelper") extern class ArrowHelper extends js.three.Object3D
{
	function new(dir:js.three.Vector3, ?origin:js.three.Vector3, ?length:Float, ?hex:Int, ?headLength:Float, ?headWidth:Float) : Void;
	var line : js.three.Line;
	var cone : js.three.Mesh;
	function setDirection(dir:js.three.Vector3) : Void;
	function setLength(length:Float, ?headLength:Float, ?headWidth:Float) : Void;
	function setColor(hex:Int) : Void;
}