package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/DirectGeometry.js">src/core/DirectGeometry.js</a>
 */
@:native("THREE.DirectGeometry") extern class DirectGeometry
{
	function new() : Void;
	var id : Int;
	var uuid : String;
	var name : String;
	var type : String;
	var indices : Array<Float>;
	var vertices : Array<js.three.Vector3>;
	var normals : Array<js.three.Vector3>;
	var colors : Array<js.three.Color>;
	var uvs : Array<js.three.Vector2>;
	var uvs2 : Array<js.three.Vector2>;
	var groups : Array<{ var start : Float; var materialIndex : Int; }>;
	var morphTargets : Array<js.three.MorphTarget>;
	var skinWeights : Array<Float>;
	var skinIndices : Array<Int>;
	var boundingBox : js.three.Box3;
	var boundingSphere : js.three.BoundingSphere;
	var verticesNeedUpdate : Bool;
	var normalsNeedUpdate : Bool;
	var colorsNeedUpdate : Bool;
	var uvsNeedUpdate : Bool;
	var groupsNeedUpdate : Bool;
	function computeBoundingBox() : Void;
	function computeBoundingSphere() : Void;
	function computeGroups(geometry:js.three.Geometry) : Void;
	function fromGeometry(geometry:js.three.Geometry) : js.three.DirectGeometry;
	function dispose() : Void;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
}