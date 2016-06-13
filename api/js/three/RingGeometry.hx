package js.three;

@:native("THREE.RingGeometry") extern class RingGeometry extends js.three.Geometry
{
	function new(?innerRadius:Float, ?outerRadius:Float, ?thetaSegments:Float, ?phiSegments:Float, ?thetaStart:Float, ?thetaLength:Float) : Void;
	var parameters : { var innerRadius : Float; var outerRadius : Float; var phiSegments : Float; var thetaLength : Float; var thetaSegments : Float; var thetaStart : Float; };
	@:overload(function() : RingGeometry { })
	override function clone() : js.three.Geometry;
}