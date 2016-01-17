package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferGeometry.js">src/core/InstancedBufferGeometry.js</a>
 */
@:native("THREE.InstancedBufferGeometry") extern class InstancedBufferGeometry extends js.three.BufferGeometry
{
	function new() : Void;
	@:overload(function(start:Float, count:Int, instances:Float) : Void { })
	override function addGroup(start:Int, count:Int, ?materialIndex:Int) : Void;
	@:overload(function() : InstancedBufferGeometry { })
	override function clone() : js.three.BufferGeometry;
	@:overload(function(source:InstancedBufferGeometry) : InstancedBufferGeometry { })
	override function copy(source:js.three.BufferGeometry) : js.three.BufferGeometry;
}