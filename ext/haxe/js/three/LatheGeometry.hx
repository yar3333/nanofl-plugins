package js.three;

@:native("THREE.LatheGeometry") extern class LatheGeometry extends js.three.Geometry
{
	function new(points:Array<js.three.Vector3>, ?segments:Int, ?phiStart:Float, ?phiLength:Float) : Void;
	var parameters : { var phiLength : Float; var phiStart : Float; var points : Array<js.three.Vector3>; var segments : Int; };
}