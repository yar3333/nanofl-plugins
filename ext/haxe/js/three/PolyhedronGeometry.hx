package js.three;

@:native("THREE.PolyhedronGeometry") extern class PolyhedronGeometry extends js.three.Geometry
{
	function new(vertices:Array<js.three.Vector3>, faces:Array<js.three.Face3>, ?radius:Float, ?detail:Float) : Void;
	var parameters : { var detail : Float; var faces : Array<js.three.Face3>; var radius : Float; var vertices : Array<js.three.Vector3>; };
	@:overload(function() : PolyhedronGeometry { })
	override function clone() : js.three.Geometry;
}