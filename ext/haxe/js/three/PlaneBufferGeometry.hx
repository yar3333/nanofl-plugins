package js.three;

@:native("THREE.PlaneBufferGeometry") extern class PlaneBufferGeometry extends js.three.BufferGeometry
{
	function new(width:Float, height:Float, ?widthSegments:Float, ?heightSegments:Int) : Void;
	var parameters : { var height : Float; var heightSegments : Int; var width : Float; var widthSegments : Float; };
	@:overload(function() : PlaneBufferGeometry { })
	override function clone() : js.three.BufferGeometry;
}