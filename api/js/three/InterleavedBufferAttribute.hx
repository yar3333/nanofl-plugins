package js.three;

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBufferAttribute.js">src/core/InterleavedBufferAttribute.js</a>
 */
@:native("THREE.InterleavedBufferAttribute") extern class InterleavedBufferAttribute
{
	function new(interleavedBuffer:js.three.InterleavedBuffer, itemSize:Float, offset:Float) : Void;
	var uuid : String;
	var data : js.three.InterleavedBuffer;
	var itemSize : Float;
	var offset : Float;
	/**
	 Deprecated, use count instead
	 */
	var length : Float;
	var count : Int;
	function getX(index:Int) : Float;
	function setX(index:Int, x:Float) : js.three.InterleavedBufferAttribute;
	function getY(index:Int) : Float;
	function setY(index:Int, y:Float) : js.three.InterleavedBufferAttribute;
	function getZ(index:Int) : Float;
	function setZ(index:Int, z:Float) : js.three.InterleavedBufferAttribute;
	function getW(index:Int) : Float;
	function setW(index:Int, z:Float) : js.three.InterleavedBufferAttribute;
	function setXY(index:Int, x:Float, y:Float) : js.three.InterleavedBufferAttribute;
	function setXYZ(index:Int, x:Float, y:Float, z:Float) : js.three.InterleavedBufferAttribute;
	function setXYZW(index:Int, x:Float, y:Float, z:Float, w:Float) : js.three.InterleavedBufferAttribute;
}