package js.three;

@:native("THREE.CircleGeometry") extern class CircleGeometry extends js.three.Geometry
{
	function new(?radius:Float, ?segments:Int, ?thetaStart:Float, ?thetaLength:Float) : Void;
	var parameters : { var radius : Float; var segments : Int; var thetaLength : Float; var thetaStart : Float; };
	@:overload(function() : CircleGeometry { })
	override function clone() : js.three.Geometry;
}