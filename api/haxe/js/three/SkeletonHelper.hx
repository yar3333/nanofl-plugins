package js.three;

@:native("THREE.SkeletonHelper") extern class SkeletonHelper extends js.three.LineSegments
{
	function new(bone:js.three.Object3D) : Void;
	var bones : Array<js.three.Bone>;
	var root : js.three.Object3D;
	function getBoneList(object:js.three.Object3D) : Array<js.three.Bone>;
	function update() : Void;
}