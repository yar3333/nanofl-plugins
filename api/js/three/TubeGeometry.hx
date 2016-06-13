package js.three;

@:native("THREE.TubeGeometry") extern class TubeGeometry extends js.three.Geometry
{
	function new(path:js.three.Path, ?segments:Int, ?radius:Float, ?radiusSegments:Int, ?closed:Bool, ?taper:Float -> Float) : Void;
	var parameters : { var closed : Bool; var path : js.three.Path; var radialSegments : Int; var radius : Float; var segments : Int; var taper : Float -> Float; };
	var tangents : Array<js.three.Vector3>;
	var normals : Array<js.three.Vector3>;
	var binormals : Array<js.three.Vector3>;
	@:overload(function() : TubeGeometry { })
	override function clone() : js.three.Geometry;
	static function NoTaper(?u:Float) : Float;
	static function SinusoidalTaper(u:Float) : Float;
	static function FrenetFrames(path:js.three.Path, segments:Int, closed:Bool) : Void;
}