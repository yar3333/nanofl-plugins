package js.three;

@:native("THREE.IcosahedronGeometry") extern class IcosahedronGeometry extends js.three.PolyhedronGeometry
{
	function new(radius:Float, detail:Int) : Void;
	@:overload(function() : IcosahedronGeometry { })
	override function clone() : js.three.Geometry;
}