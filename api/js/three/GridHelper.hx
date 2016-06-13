package js.three;

@:native("THREE.GridHelper") extern class GridHelper extends js.three.LineSegments
{
	function new(size:Int, step:Int) : Void;
	var color1 : js.three.Color;
	var color2 : js.three.Color;
	function setColors(colorCenterLine:Int, colorGrid:Int) : Void;
}