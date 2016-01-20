package js.three;

@:native("THREE.SceneUtils") extern class SceneUtils
{
	static function createMultiMaterialObject(geometry:js.three.Geometry, materials:Array<js.three.Material>) : js.three.Object3D;
	static function detach(child:js.three.Object3D, parent:js.three.Object3D, scene:js.three.Scene) : Void;
	static function attach(child:js.three.Object3D, scene:js.three.Scene, parent:js.three.Object3D) : Void;
}