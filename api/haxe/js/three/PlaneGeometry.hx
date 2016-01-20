package js.three;

@:native("THREE.PlaneGeometry") extern class PlaneGeometry extends js.three.Geometry
{
	function new(width:Float, height:Float, ?widthSegments:Float, ?heightSegments:Int) : Void;
	var parameters : { var height : Float; var heightSegments : Int; var width : Float; var widthSegments : Float; };
	@:overload(function() : PlaneGeometry { })
	override function clone() : js.three.Geometry;
}