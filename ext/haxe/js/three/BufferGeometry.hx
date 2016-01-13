package js.three;

/**
 * This is a superefficent class for geometries because it saves all data in buffers.
 * It reduces memory costs and cpu cycles. But it is not as easy to work with because of all the nessecary buffer calculations.
 * It is mainly interesting when working with static objects.
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js">src/core/BufferGeometry.js</a>
 */
@:native("THREE.BufferGeometry") extern class BufferGeometry
{
	/**
	 * This creates a new BufferGeometry. It also sets several properties to an default value.
	 */
	function new() : Void;
	/**
	 * Unique number of this buffergeometry instance
	 */
	var id : Int;
	var uuid : String;
	var name : String;
	var type : String;
	var index : js.three.BufferAttribute;
	var attributes : Array<haxe.extern.EitherType<js.three.BufferAttribute, js.three.InterleavedBufferAttribute>>;
	var morphAttributes : Dynamic;
	var groups : Array<{ var start : Int; @:optional var materialIndex : Int; var count : Int; }>;
	var boundingBox : js.three.Box3;
	var boundingSphere : js.three.BoundingSphere;
	var drawRange : { var count : Int; var start : Int; };
	/**
	 Deprecated.
	 */
	function addIndex(index:js.three.BufferAttribute) : Void;
	function getIndex() : js.three.BufferAttribute;
	function setIndex(index:js.three.BufferAttribute) : Void;
	/**
	 Deprecated. This overloaded method is deprecated.
	 */
	@:overload(function(name:String, attribute:haxe.extern.EitherType<BufferAttribute, InterleavedBufferAttribute>) : Void { })
	function addAttribute(name:String, array:Dynamic, itemSize:Float) : Dynamic;
	function getAttribute(name:String) : haxe.extern.EitherType<js.three.BufferAttribute, js.three.InterleavedBufferAttribute>;
	function removeAttribute(name:String) : Void;
	/**
	 Deprecated.
	 */
	function drawcalls() : Dynamic;
	/**
	 Deprecated.
	 */
	function offsets() : Dynamic;
	/**
	 Deprecated. Use addGroup
	 */
	function addDrawCall(start:Int, count:Int, ?index:Int) : Void;
	/**
	 Deprecated.
	 */
	function clearDrawCalls() : Void;
	function addGroup(start:Int, count:Int, ?materialIndex:Int) : Void;
	function clearGroups() : Void;
	function setDrawRange(start:Int, count:Int) : Void;
	/**
	 * Bakes matrix transform directly into vertex coordinates.
	 */
	function applyMatrix(matrix:js.three.Matrix4) : Void;
	function rotateX(angle:Float) : js.three.BufferGeometry;
	function rotateY(angle:Float) : js.three.BufferGeometry;
	function rotateZ(angle:Float) : js.three.BufferGeometry;
	function translate(x:Float, y:Float, z:Float) : js.three.BufferGeometry;
	function scale(x:Float, y:Float, z:Float) : js.three.BufferGeometry;
	function lookAt(v:js.three.Vector3) : Void;
	function center() : js.three.Vector3;
	function setFromObject(object:js.three.Object3D) : Void;
	function updateFromObject(object:js.three.Object3D) : Void;
	function fromGeometry(geometry:js.three.Geometry, ?settings:Dynamic) : js.three.BufferGeometry;
	function fromDirectGeometry(geometry:js.three.DirectGeometry) : js.three.BufferGeometry;
	/**
	 * Computes bounding box of the geometry, updating Geometry.boundingBox attribute.
	 * Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	function computeBoundingBox() : Void;
	/**
	 * Computes bounding sphere of the geometry, updating Geometry.boundingSphere attribute.
	 * Bounding spheres aren't' computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	function computeBoundingSphere() : Void;
	/**
	 * @deprecated
	 */
	function computeFaceNormals() : Void;
	/**
	 * Computes vertex normals by averaging face normals.
	 */
	function computeVertexNormals() : Void;
	function computeOffsets(size:Float) : Void;
	function merge(geometry:js.three.BufferGeometry, offset:Float) : js.three.BufferGeometry;
	function normalizeNormals() : Void;
	function toJSON() : Dynamic;
	function clone() : js.three.BufferGeometry;
	function copy(source:js.three.BufferGeometry) : js.three.BufferGeometry;
	/**
	 * Disposes the object from memory.
	 * You need to call this when you want the bufferGeometry removed while the application is running.
	 */
	function dispose() : Void;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
	static var MaxIndex : Int;
}