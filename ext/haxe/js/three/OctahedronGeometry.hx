package js.three;

@:native("THREE.OctahedronGeometry") extern class OctahedronGeometry extends js.three.PolyhedronGeometry
{
	function new(radius:Float, detail:Int) : Void;
	@:overload(function() : OctahedronGeometry { })
	override function clone() : js.three.Geometry;
}