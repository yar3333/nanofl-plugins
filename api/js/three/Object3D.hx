package js.three;

/**
 * Base class for scene graph objects
 */
@:native("THREE.Object3D") extern class Object3D
{
	function new() : Void;
	/**
	 * Unique number of this object instance.
	 */
	var id : Int;
	/**
	 *
	 */
	var uuid : String;
	/**
	 * Optional name of the object (doesn't need to be unique).
	 */
	var name : String;
	var type : String;
	/**
	 * Object's parent in the scene graph.
	 */
	var parent : js.three.Object3D;
	var channels : js.three.Channels;
	/**
	 * Array with object's children.
	 */
	var children : Array<js.three.Object3D>;
	/**
	 * Up direction.
	 */
	var up : js.three.Vector3;
	/**
	 * Object's local position.
	 */
	var position : js.three.Vector3;
	/**
	 * Object's local rotation (Euler angles), in radians.
	 */
	var rotation : js.three.Euler;
	/**
	 * Global rotation.
	 */
	var quaternion : js.three.Quaternion;
	/**
	 * Object's local scale.
	 */
	var scale : js.three.Vector3;
	var modelViewMatrix : { var value : js.three.Matrix4; };
	var normalMatrix : { var value : js.three.Matrix3; };
	/**
	 * When this is set, then the rotationMatrix gets calculated every frame.
	 */
	var rotationAutoUpdate : Bool;
	/**
	 * Local transform.
	 */
	var matrix : js.three.Matrix4;
	/**
	 * The global transform of the object. If the Object3d has no parent, then it's identical to the local transform.
	 */
	var matrixWorld : js.three.Matrix4;
	/**
	 * When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property.
	 */
	var matrixAutoUpdate : Bool;
	/**
	 * When this is set, it calculates the matrixWorld in that frame and resets this property to false.
	 */
	var matrixWorldNeedsUpdate : Bool;
	/**
	 * Object gets rendered if true.
	 */
	var visible : Bool;
	/**
	 * Gets rendered into shadow map.
	 */
	var castShadow : Bool;
	/**
	 * Material gets baked in shadow receiving.
	 */
	var receiveShadow : Bool;
	/**
	 * When this is set, it checks every frame if the object is in the frustum of the camera. Otherwise the object gets drawn every frame even if it isn't visible.
	 */
	var frustumCulled : Bool;
	var renderOrder : Float;
	/**
	 * An object that can be used to store custom data about the Object3d. It should not hold references to functions as these will not be cloned.
	 */
	var userData : Dynamic;
	/**
	 * This updates the position, rotation and scale with the matrix.
	 */
	function applyMatrix(matrix:js.three.Matrix4) : Void;
	/**
	 *
	 */
	function setRotationFromAxisAngle(axis:js.three.Vector3, angle:Float) : Void;
	/**
	 *
	 */
	function setRotationFromEuler(euler:js.three.Euler) : Void;
	/**
	 *
	 */
	function setRotationFromMatrix(m:js.three.Matrix4) : Void;
	/**
	 *
	 */
	function setRotationFromQuaternion(q:js.three.Quaternion) : Void;
	/**
	 * Rotate an object along an axis in object space. The axis is assumed to be normalized.
	 * @param axis  A normalized vector in object space.
	 * @param angle  The angle in radians.
	 */
	function rotateOnAxis(axis:js.three.Vector3, angle:Float) : js.three.Object3D;
	/**
	 *
	 * @param angle
	 */
	function rotateX(angle:Float) : js.three.Object3D;
	/**
	 *
	 * @param angle
	 */
	function rotateY(angle:Float) : js.three.Object3D;
	/**
	 *
	 * @param angle
	 */
	function rotateZ(angle:Float) : js.three.Object3D;
	/**
	 * @param axis  A normalized vector in object space.
	 * @param distance  The distance to translate.
	 */
	function translateOnAxis(axis:js.three.Vector3, distance:Float) : js.three.Object3D;
	/**
	 *
	 * @param distance
	 * @param axis
	 */
	function translate(distance:Float, axis:js.three.Vector3) : js.three.Object3D;
	/**
	 * Translates object along x axis by distance.
	 * @param distance Distance.
	 */
	function translateX(distance:Float) : js.three.Object3D;
	/**
	 * Translates object along y axis by distance.
	 * @param distance Distance.
	 */
	function translateY(distance:Float) : js.three.Object3D;
	/**
	 * Translates object along z axis by distance.
	 * @param distance Distance.
	 */
	function translateZ(distance:Float) : js.three.Object3D;
	/**
	 * Updates the vector from local space to world space.
	 * @param vector A local vector.
	 */
	function localToWorld(vector:js.three.Vector3) : js.three.Vector3;
	/**
	 * Updates the vector from world space to local space.
	 * @param vector A world vector.
	 */
	function worldToLocal(vector:js.three.Vector3) : js.three.Vector3;
	/**
	 * Rotates object to face point in space.
	 * @param vector A world vector to look at.
	 */
	function lookAt(vector:js.three.Vector3) : Void;
	/**
	 * Adds object as child of this object.
	 */
	function add(object:js.three.Object3D) : Void;
	/**
	 * Removes object as child of this object.
	 */
	function remove(object:js.three.Object3D) : Void;
	function getChildByName(name:String) : js.three.Object3D;
	/**
	 * Searches through the object's children and returns the first with a matching id, optionally recursive.
	 * @param id  Unique number of the object instance
	 */
	function getObjectById(id:Int) : js.three.Object3D;
	/**
	 * Searches through the object's children and returns the first with a matching name, optionally recursive.
	 * @param name  String to match to the children's Object3d.name property.
	 */
	function getObjectByName(name:String) : js.three.Object3D;
	function getObjectByProperty(name:String, value:String) : js.three.Object3D;
	function getWorldPosition(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function getWorldQuaternion(?optionalTarget:js.three.Quaternion) : js.three.Quaternion;
	function getWorldRotation(?optionalTarget:js.three.Euler) : js.three.Euler;
	function getWorldScale(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function getWorldDirection(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function raycast(raycaster:js.three.Raycaster, intersects:Dynamic) : Void;
	function traverse(callback:js.three.Object3D -> Void) : Void;
	function traverseVisible(callback:js.three.Object3D -> Void) : Void;
	function traverseAncestors(callback:js.three.Object3D -> Void) : Void;
	/**
	 * Updates local transform.
	 */
	function updateMatrix() : Void;
	/**
	 * Updates global transform of the object and its children.
	 */
	function updateMatrixWorld(force:Bool) : Void;
	function toJSON(?meta:Dynamic) : Dynamic;
	function clone(?recursive:Bool) : js.three.Object3D;
	/**
	 *
	 * @param object
	 * @param recursive
	 */
	function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
	/**
	 *
	 */
	static var DefaultUp : js.three.Vector3;
	static var DefaultMatrixAutoUpdate : js.three.Vector3;
}