package js.three;

@:native("THREE.LensFlareProperty") extern interface LensFlareProperty
{
	var texture : js.three.Texture;
	var size : Float;
	var distance : Float;
	var x : Float;
	var y : Float;
	var z : Float;
	var scale : Float;
	var rotation : Float;
	var opacity : Float;
	var color : js.three.Color;
	var blending : js.three.Blending;
}