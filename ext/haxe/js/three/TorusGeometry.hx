package js.three;

@:native("THREE.TorusGeometry") extern class TorusGeometry extends js.three.Geometry
{
	function new(?radius:Float, ?tube:Float, ?radialSegments:Int, ?tubularSegments:Float, ?arc:Float) : Void;
	var parameters : { var arc : Float; var radialSegments : Int; var radius : Float; var tube : Float; var tubularSegments : Float; };
	@:overload(function() : TorusGeometry { })
	override function clone() : js.three.Geometry;
}