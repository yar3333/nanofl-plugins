package js.three;

@:native("THREE.TorusKnotGeometry") extern class TorusKnotGeometry extends js.three.Geometry
{
	function new(?radius:Float, ?tube:Float, ?radialSegments:Int, ?tubularSegments:Float, ?p:Float, ?q:Float, ?heightScale:Float) : Void;
	var parameters : { var heightScale : Float; var p : Float; var q : Float; var radialSegments : Int; var radius : Float; var tube : Float; var tubularSegments : Float; };
	@:overload(function() : TorusKnotGeometry { })
	override function clone() : js.three.Geometry;
}