package js.three;

@:native("THREE.CylinderGeometry") extern class CylinderGeometry extends js.three.Geometry
{
	/**
	 * @param radiusTop — Radius of the cylinder at the top.
	 * @param radiusBottom — Radius of the cylinder at the bottom.
	 * @param height — Height of the cylinder.
	 * @param radiusSegments — Number of segmented faces around the circumference of the cylinder.
	 * @param heightSegments — Number of rows of faces along the height of the cylinder.
	 * @param openEnded - A Boolean indicating whether or not to cap the ends of the cylinder.
	 */
	function new(?radiusTop:Float, ?radiusBottom:Float, ?height:Float, ?radiusSegments:Int, ?heightSegments:Int, ?openEnded:Bool, ?thetaStart:Float, ?thetaLength:Float) : Void;
	var parameters : { var height : Float; var heightSegments : Int; var openEnded : Bool; var radialSegments : Int; var radiusBottom : Float; var radiusTop : Float; var thetaLength : Float; var thetaStart : Float; };
	@:overload(function() : CylinderGeometry { })
	override function clone() : js.three.Geometry;
}