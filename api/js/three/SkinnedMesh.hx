package js.three;

@:native("THREE.SkinnedMesh") extern class SkinnedMesh extends js.three.Mesh
{
	@:overload(function(?geometry:haxe.extern.EitherType<Geometry, BufferGeometry>, ?material:MeshDepthMaterial, ?useVertexTexture:Bool) : Void { })
	@:overload(function(?geometry:haxe.extern.EitherType<Geometry, BufferGeometry>, ?material:MeshFaceMaterial, ?useVertexTexture:Bool) : Void { })
	@:overload(function(?geometry:haxe.extern.EitherType<Geometry, BufferGeometry>, ?material:MeshLambertMaterial, ?useVertexTexture:Bool) : Void { })
	@:overload(function(?geometry:haxe.extern.EitherType<Geometry, BufferGeometry>, ?material:MeshNormalMaterial, ?useVertexTexture:Bool) : Void { })
	@:overload(function(?geometry:haxe.extern.EitherType<Geometry, BufferGeometry>, ?material:MeshPhongMaterial, ?useVertexTexture:Bool) : Void { })
	@:overload(function(?geometry:haxe.extern.EitherType<Geometry, BufferGeometry>, ?material:ShaderMaterial, ?useVertexTexture:Bool) : Void { })
	function new(?geometry:haxe.extern.EitherType<js.three.Geometry, js.three.BufferGeometry>, ?material:js.three.MeshBasicMaterial, ?useVertexTexture:Bool) : Void;
	var bindMode : String;
	var bindMatrix : js.three.Matrix4;
	var bindMatrixInverse : js.three.Matrix4;
	function bind(skeleton:js.three.Skeleton, ?bindMatrix:js.three.Matrix4) : Void;
	function pose() : Void;
	function normalizeSkinWeights() : Void;
	@:overload(function(?force:Bool) : Void { })
	override function updateMatrixWorld(force:Bool) : Void;
	@:overload(function() : SkinnedMesh { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(?source:SkinnedMesh) : SkinnedMesh { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
	var skeleton : js.three.Skeleton;
}