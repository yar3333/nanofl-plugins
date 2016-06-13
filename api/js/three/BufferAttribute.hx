package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js">src/core/BufferAttribute.js</a>
 */
@:native("THREE.BufferAttribute") extern class BufferAttribute
{
	function new(array:js.html.ArrayBufferView, itemSize:Float) : Void;
	var uuid : String;
	var array : js.html.ArrayBufferView;
	var itemSize : Float;
	var updateRange : { var count : Int; var offset : Float; };
	var version : Float;
	var needsUpdate : Bool;
	/**
	 Deprecated, use count instead
	 */
	var length : Float;
	var count : Int;
	function setDynamic(dynamic_:Bool) : js.three.BufferAttribute;
	@:overload(function() : BufferAttribute { })
	function clone() : js.three.BufferAttribute;
	function copy(source:js.three.BufferAttribute) : js.three.BufferAttribute;
	function copyAt(index1:Float, attribute:js.three.BufferAttribute, index2:Float) : js.three.BufferAttribute;
	function copyArray(array:js.html.ArrayBufferView) : js.three.BufferAttribute;
	function copyColorsArray(colors:Array<{ var r : Float; var g : Float; var b : Float; }>) : js.three.BufferAttribute;
	function copyIndicesArray(indices:Array<{ var c : Float; var b : Float; var a : Float; }>) : js.three.BufferAttribute;
	function copyVector2sArray(vectors:Array<{ var y : Float; var x : Float; }>) : js.three.BufferAttribute;
	function copyVector3sArray(vectors:Array<{ var z : Float; var y : Float; var x : Float; }>) : js.three.BufferAttribute;
	function copyVector4sArray(vectors:Array<{ var z : Float; var y : Float; var x : Float; var w : Float; }>) : js.three.BufferAttribute;
	function set(value:js.html.ArrayBufferView, ?offset:Float) : js.three.BufferAttribute;
	function getX(index:Int) : Float;
	function setX(index:Int, x:Float) : js.three.BufferAttribute;
	function getY(index:Int) : Float;
	function setY(index:Int, y:Float) : js.three.BufferAttribute;
	function getZ(index:Int) : Float;
	function setZ(index:Int, z:Float) : js.three.BufferAttribute;
	function getW(index:Int) : Float;
	function setW(index:Int, z:Float) : js.three.BufferAttribute;
	function setXY(index:Int, x:Float, y:Float) : js.three.BufferAttribute;
	function setXYZ(index:Int, x:Float, y:Float, z:Float) : js.three.BufferAttribute;
	function setXYZW(index:Int, x:Float, y:Float, z:Float, w:Float) : js.three.BufferAttribute;
}