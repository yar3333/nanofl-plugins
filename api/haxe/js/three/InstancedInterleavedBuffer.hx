package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InstancedInterleavedBuffer.js">src/core/InstancedInterleavedBuffer.js</a>
 */
@:native("THREE.InstancedInterleavedBuffer") extern class InstancedInterleavedBuffer extends js.three.InterleavedBuffer
{
	function new(array:js.html.ArrayBufferView, stride:Float, ?meshPerAttribute:Float) : Void;
	var meshPerAttribute : Float;
	@:overload(function() : InstancedInterleavedBuffer { })
	override function clone() : js.three.InterleavedBuffer;
	@:overload(function(source:InstancedInterleavedBuffer) : InstancedInterleavedBuffer { })
	override function copy(source:js.three.InterleavedBuffer) : js.three.InterleavedBuffer;
}