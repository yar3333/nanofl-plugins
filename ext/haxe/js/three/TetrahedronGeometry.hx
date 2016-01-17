package js.three;

@:native("THREE.TetrahedronGeometry") extern class TetrahedronGeometry extends js.three.PolyhedronGeometry
{
	function new(?radius:Float, ?detail:Float) : Void;
	@:overload(function() : TetrahedronGeometry { })
	override function clone() : js.three.Geometry;
}