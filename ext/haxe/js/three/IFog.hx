package js.three;

@:native("THREE.IFog") extern interface IFog
{
	var name : String;
	var color : js.three.Color;
	function clone() : js.three.IFog;
}