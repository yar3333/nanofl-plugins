package flashimport;

interface IContoursExporter
{
	function beginShape() : Void;
	function endShape() : Void;
	
	function beginFills() : Void;
	function endFills() : Void;
	
	function beginStrokes() : Void;
	function endStrokes() : Void;
	
	function beginFill(n:Int) : Void;
	
	function endFill() : Void;

	function beginStroke(n:Int) : Void;
	
	function endStroke() : Void;
	
	function moveTo(x:Float, y:Float) : Void;
	
	function lineTo(x:Float, y:Float) : Void;
	
	function curveTo(controlX:Float, controlY:Float, anchorX:Float, anchorY:Float) : Void;
}