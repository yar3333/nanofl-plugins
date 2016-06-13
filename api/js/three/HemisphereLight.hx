package js.three;

@:native("THREE.HemisphereLight") extern class HemisphereLight extends js.three.Light
{
	function new(?skyColorHex:Int, ?groundColorHex:Int, ?intensity:Float) : Void;
	var groundColor : js.three.Color;
	var intensity : Float;
	@:overload(function(?recursive:Bool) : HemisphereLight { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:HemisphereLight) : HemisphereLight { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}