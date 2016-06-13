package js.three;

@:native("THREE.LOD") extern class LOD extends js.three.Object3D
{
	function new() : Void;
	var levels : Array<Dynamic>;
	function addLevel(object:js.three.Object3D, ?distance:Float) : Void;
	function getObjectForDistance(distance:Float) : js.three.Object3D;
	override function raycast(raycaster:js.three.Raycaster, intersects:Dynamic) : Void;
	function update(camera:js.three.Camera) : Void;
	@:overload(function() : LOD { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:LOD) : LOD { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
	@:overload(function(meta:Dynamic) : Dynamic { })
	override function toJSON(?meta:Dynamic) : Dynamic;
}