package js.three;

/**
 * A class for generating sphere geometries
 */
@:native("THREE.SphereGeometry") extern class SphereGeometry extends js.three.Geometry
{
	/**
	 * The geometry is created by sweeping and calculating vertexes around the Y axis (horizontal sweep) and the Z axis (vertical sweep). Thus, incomplete spheres (akin to 'sphere slices') can be created through the use of different values of phiStart, phiLength, thetaStart and thetaLength, in order to define the points in which we start (or end) calculating those vertices.
	 *
	 * @param radius — sphere radius. Default is 50.
	 * @param widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
	 * @param heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
	 * @param phiStart — specify horizontal starting angle. Default is 0.
	 * @param phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
	 * @param thetaStart — specify vertical starting angle. Default is 0.
	 * @param thetaLength — specify vertical sweep angle size. Default is Math.PI.
	 */
	function new(radius:Float, ?widthSegments:Float, ?heightSegments:Int, ?phiStart:Float, ?phiLength:Float, ?thetaStart:Float, ?thetaLength:Float) : Void;
	var parameters : { var heightSegments : Int; var phiLength : Float; var phiStart : Float; var radius : Float; var thetaLength : Float; var thetaStart : Float; var widthSegments : Float; };
}