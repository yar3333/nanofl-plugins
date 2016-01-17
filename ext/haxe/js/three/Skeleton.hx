package js.three;

@:native("THREE.Skeleton") extern class Skeleton
{
	function new(bones:Array<js.three.Bone>, ?boneInverses:Array<js.three.Matrix4>, ?useVertexTexture:Bool) : Void;
	var useVertexTexture : Bool;
	var identityMatrix : js.three.Matrix4;
	var bones : Array<js.three.Bone>;
	var boneTextureWidth : Float;
	var boneTextureHeight : Float;
	var boneMatrices : js.html.Float32Array;
	var boneTexture : js.three.DataTexture;
	var boneInverses : Array<js.three.Matrix4>;
	function calculateInverses(bone:js.three.Bone) : Void;
	function pose() : Void;
	function update() : Void;
	function clone() : js.three.Skeleton;
}