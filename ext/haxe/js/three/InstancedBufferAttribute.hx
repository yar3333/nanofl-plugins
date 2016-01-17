package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferAttribute.js">src/core/InstancedBufferAttribute.js</a>
 */
@:native("THREE.InstancedBufferAttribute") extern class InstancedBufferAttribute extends js.three.BufferAttribute
{
	function new(data:js.html.ArrayBufferView, itemSize:Float, ?meshPerAttribute:Float) : Void;
	var meshPerAttribute : Float;
	@:overload(function() : InstancedBufferAttribute { })
	override function clone() : js.three.BufferAttribute;
	@:overload(function(source:InstancedBufferAttribute) : InstancedBufferAttribute { })
	override function copy(source:js.three.BufferAttribute) : js.three.BufferAttribute;
}