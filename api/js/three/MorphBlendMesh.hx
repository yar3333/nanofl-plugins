package js.three;

@:native("THREE.MorphBlendMesh") extern class MorphBlendMesh extends js.three.Mesh
{
	function new(geometry:js.three.Geometry, material:js.three.Material) : Void;
	var animationsMap : Dynamic<js.three.MorphBlendMeshAnimation>;
	var animationsList : Array<js.three.MorphBlendMeshAnimation>;
	function createAnimation(name:String, start:Float, end:Int, fps:Float) : Void;
	function autoCreateAnimations(fps:Float) : Void;
	function setAnimationDirectionForward(name:String) : Void;
	function setAnimationDirectionBackward(name:String) : Void;
	function setAnimationFPS(name:String, fps:Float) : Void;
	function setAnimationDuration(name:String, duration:Float) : Void;
	function setAnimationWeight(name:String, weight:Float) : Void;
	function setAnimationTime(name:String, time:Float) : Void;
	function getAnimationTime(name:String) : Float;
	function getAnimationDuration(name:String) : Float;
	function playAnimation(name:String) : Void;
	function stopAnimation(name:String) : Void;
	function update(delta:Float) : Void;
}