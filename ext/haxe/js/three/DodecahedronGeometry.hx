package js.three;

@:native("THREE.DodecahedronGeometry") extern class DodecahedronGeometry extends js.three.Geometry
{
	function new(radius:Float, detail:Float) : Void;
	var parameters : { var detail : Float; var radius : Float; };
	@:overload(function() : DodecahedronGeometry { })
	override function clone() : js.three.Geometry;
}