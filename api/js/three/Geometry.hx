package js.three;

/**
 * Base class for geometries
 *
 * # Example
 *     var geometry = new THREE.Geometry();
 *     geometry.vertices.push( new THREE.Vector3( -10, 10, 0 ) );
 *     geometry.vertices.push( new THREE.Vector3( -10, -10, 0 ) );
 *     geometry.vertices.push( new THREE.Vector3( 10, -10, 0 ) );
 *     geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
 *     geometry.computeBoundingSphere();
 *
 * @see https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js
 */
@:native("THREE.Geometry") extern class Geometry
{
	function new() : Void;
	/**
	 * Unique number of this geometry instance
	 */
	var id : Int;
	var uuid : String;
	/**
	 * Name for this geometry. Default is an empty string.
	 */
	var name : String;
	var type : String;
	/**
	 * The array of vertices hold every position of points of the model.
	 * To signal an update in this array, Geometry.verticesNeedUpdate needs to be set to true.
	 */
	var vertices : Array<js.three.Vector3>;
	/**
	 * Array of vertex colors, matching number and order of vertices.
	 * Used in ParticleSystem, Line and Ribbon.
	 * Meshes use per-face-use-of-vertex colors embedded directly in faces.
	 * To signal an update in this array, Geometry.colorsNeedUpdate needs to be set to true.
	 */
	var colors : Array<js.three.Color>;
	/**
	 * Array of triangles or/and quads.
	 * The array of faces describe how each vertex in the model is connected with each other.
	 * To signal an update in this array, Geometry.elementsNeedUpdate needs to be set to true.
	 */
	var faces : Array<js.three.Face3>;
	/**
	 * Array of face UV layers.
	 * Each UV layer is an array of UV matching order and number of vertices in faces.
	 * To signal an update in this array, Geometry.uvsNeedUpdate needs to be set to true.
	 */
	var faceVertexUvs : Array<Array<Array<js.three.Vector2>>>;
	/**
	 * Array of morph targets. Each morph target is a Javascript object:
	 *
	 *     { name: "targetName", vertices: [ new THREE.Vector3(), ... ] }
	 *
	 * Morph vertices match number and order of primary vertices.
	 */
	var morphTargets : Array<js.three.MorphTarget>;
	/**
	 * Array of morph normals. Morph normals have similar structure as morph targets, each normal set is a Javascript object:
	 *
	 *     morphNormal = { name: "NormalName", normals: [ new THREE.Vector3(), ... ] }
	 */
	var morphNormals : Array<js.three.MorphNormals>;
	/**
	 * Array of skinning weights, matching number and order of vertices.
	 */
	var skinWeights : Array<Float>;
	/**
	 * Array of skinning indices, matching number and order of vertices.
	 */
	var skinIndices : Array<Int>;
	/**
	 *
	 */
	var lineDistances : Array<Float>;
	/**
	 * Bounding box.
	 */
	var boundingBox : js.three.Box3;
	/**
	 * Bounding sphere.
	 */
	var boundingSphere : js.three.BoundingSphere;
	/**
	 * Set to true if the vertices array has been updated.
	 */
	var verticesNeedUpdate : Bool;
	/**
	 * Set to true if the faces array has been updated.
	 */
	var elementsNeedUpdate : Bool;
	/**
	 * Set to true if the uvs array has been updated.
	 */
	var uvsNeedUpdate : Bool;
	/**
	 * Set to true if the normals array has been updated.
	 */
	var normalsNeedUpdate : Bool;
	/**
	 * Set to true if the colors array has been updated.
	 */
	var colorsNeedUpdate : Bool;
	/**
	 * Set to true if the linedistances array has been updated.
	 */
	var lineDistancesNeedUpdate : Bool;
	/**
	 *
	 */
	var groupsNeedUpdate : Bool;
	/**
	 * Bakes matrix transform directly into vertex coordinates.
	 */
	function applyMatrix(matrix:js.three.Matrix4) : Void;
	function rotateX(angle:Float) : js.three.Geometry;
	function rotateY(angle:Float) : js.three.Geometry;
	function rotateZ(angle:Float) : js.three.Geometry;
	function translate(x:Float, y:Float, z:Float) : js.three.Geometry;
	function scale(x:Float, y:Float, z:Float) : js.three.Geometry;
	function lookAt(vector:js.three.Vector3) : Void;
	function fromBufferGeometry(geometry:js.three.BufferGeometry) : js.three.Geometry;
	/**
	 *
	 */
	function center() : js.three.Vector3;
	function normalize() : js.three.Geometry;
	/**
	 * Computes face normals.
	 */
	function computeFaceNormals() : Void;
	/**
	 * Computes vertex normals by averaging face normals.
	 * Face normals must be existing / computed beforehand.
	 */
	function computeVertexNormals(?areaWeighted:Bool) : Void;
	/**
	 * Computes morph normals.
	 */
	function computeMorphNormals() : Void;
	function computeLineDistances() : Void;
	/**
	 * Computes bounding box of the geometry, updating {@link Geometry.boundingBox} attribute.
	 */
	function computeBoundingBox() : Void;
	/**
	 * Computes bounding sphere of the geometry, updating Geometry.boundingSphere attribute.
	 * Neither bounding boxes or bounding spheres are computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	function computeBoundingSphere() : Void;
	function merge(geometry:js.three.Geometry, matrix:js.three.Matrix, materialIndexOffset:Float) : Void;
	function mergeMesh(mesh:js.three.Mesh) : Void;
	/**
	 * Checks for duplicate vertices using hashmap.
	 * Duplicated vertices are removed and faces' vertices are updated.
	 */
	function mergeVertices() : Float;
	function sortFacesByMaterialIndex() : Void;
	function toJSON() : Dynamic;
	/**
	 * Creates a new clone of the Geometry.
	 */
	function clone() : js.three.Geometry;
	function copy(source:js.three.Geometry) : js.three.Geometry;
	/**
	 * Removes The object from memory.
	 * Don't forget to call this method when you remove an geometry because it can cuase meomory leaks.
	 */
	function dispose() : Void;
	var bones : Array<js.three.Bone>;
	var animation : js.three.AnimationClip;
	var animations : Array<js.three.AnimationClip>;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
}