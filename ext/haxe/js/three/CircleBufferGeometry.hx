package js.three;

@:native("THREE.CircleBufferGeometry") extern class CircleBufferGeometry extends js.three.Geometry
{
	function new(?radius:Float, ?segments:Int, ?thetaStart:Float, ?thetaLength:Float) : Void;
	var parameters : { var radius : Float; var segments : Int; var thetaLength : Float; var thetaStart : Float; };
	@:overload(function() : CircleBufferGeometry { })
	override function clone() : js.three.Geometry;
}