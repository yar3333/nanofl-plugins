package js.three;

@:native("THREE.EdgesGeometry") extern class EdgesGeometry extends js.three.BufferGeometry
{
	function new(geometry:js.three.BufferGeometry, thresholdAngle:Float) : Void;
	@:overload(function() : EdgesGeometry { })
	override function clone() : js.three.BufferGeometry;
}