package nanofl.engine;

extern class Frame
{
	function new(keyFrame:nanofl.engine.KeyFrame, subIndex:Int) : Void;
	var keyFrame : nanofl.engine.KeyFrame;
	var subIndex : Int;
}