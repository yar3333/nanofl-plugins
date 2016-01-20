package js.three;

@:native("THREE.LensFlare") extern class LensFlare extends js.three.Object3D
{
	function new(?texture:js.three.Texture, ?size:Float, ?distance:Float, ?blending:js.three.Blending, ?color:js.three.Color) : Void;
	var lensFlares : Array<js.three.LensFlareProperty>;
	var positionScreen : js.three.Vector3;
	var customUpdateCallback : js.three.LensFlare -> Void;
	@:overload(function(obj:Object3D) : Void { })
	@:overload(function(texture:Texture, ?size:Float, ?distance:Float, ?blending:Blending, ?color:Color) : Void { })
	override function add(object:js.three.Object3D) : Void;
	function updateLensFlares() : Void;
	@:overload(function() : LensFlare { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:LensFlare) : LensFlare { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}