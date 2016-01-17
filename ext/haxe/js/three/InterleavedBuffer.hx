package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBuffer.js">src/core/InterleavedBuffer.js</a>
 */
@:native("THREE.InterleavedBuffer") extern class InterleavedBuffer
{
	function new(array:js.html.ArrayBufferView, stride:Float) : Void;
	var array : js.html.ArrayBufferView;
	var stride : Float;
	var updateRange : { var count : Int; var offset : Float; };
	var version : Float;
	var length : Float;
	var count : Int;
	var needsUpdate : Bool;
	function setDynamic(dynamic_:Bool) : js.three.InterleavedBuffer;
	@:overload(function() : InterleavedBuffer { })
	function clone() : js.three.InterleavedBuffer;
	function copy(source:js.three.InterleavedBuffer) : js.three.InterleavedBuffer;
	function copyAt(index1:Float, attribute:js.three.InterleavedBufferAttribute, index2:Float) : js.three.InterleavedBuffer;
	function set(value:js.html.ArrayBufferView, index:Int) : js.three.InterleavedBuffer;
}