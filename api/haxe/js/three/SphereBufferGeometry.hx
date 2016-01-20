package js.three;

@:native("THREE.SphereBufferGeometry") extern class SphereBufferGeometry extends js.three.BufferGeometry
{
	function new(radius:Float, ?widthSegments:Float, ?heightSegments:Int, ?phiStart:Float, ?phiLength:Float, ?thetaStart:Float, ?thetaLength:Float) : Void;
	var parameters : { var heightSegments : Int; var phiLength : Float; var phiStart : Float; var radius : Float; var thetaLength : Float; var thetaStart : Float; var widthSegments : Float; };
	@:overload(function() : SphereBufferGeometry { })
	override function clone() : js.three.BufferGeometry;
}