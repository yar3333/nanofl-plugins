package js.three;

@:native("THREE.Bone") extern class Bone extends js.three.Object3D
{
	function new(skin:js.three.SkinnedMesh) : Void;
	var skin : js.three.SkinnedMesh;
	@:overload(function() : Bone { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:Bone) : Bone { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}