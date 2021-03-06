package js.three;

/**
 * BoxGeometry is the quadrilateral primitive geometry class. It is typically used for creating a cube or irregular quadrilateral of the dimensions provided within the (optional) 'width', 'height', & 'depth' constructor arguments.
 */
@:native("THREE.BoxGeometry") extern class BoxGeometry extends js.three.Geometry
{
	/**
	 * @param width — Width of the sides on the X axis.
	 * @param height — Height of the sides on the Y axis.
	 * @param depth — Depth of the sides on the Z axis.
	 * @param widthSegments — Number of segmented faces along the width of the sides.
	 * @param heightSegments — Number of segmented faces along the height of the sides.
	 * @param depthSegments — Number of segmented faces along the depth of the sides.
	 */
	function new(width:Float, height:Float, depth:Float, ?widthSegments:Float, ?heightSegments:Int, ?depthSegments:Float) : Void;
	var parameters : { var depth : Float; var depthSegments : Float; var height : Float; var heightSegments : Int; var width : Float; var widthSegments : Float; };
	@:overload(function() : BoxGeometry { })
	override function clone() : js.three.Geometry;
}