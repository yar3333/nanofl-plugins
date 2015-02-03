package nanofl;

import createjs.AbstractSoundInstance;

extern class SeamlessSoundLoop
{
	function new(sound:AbstractSoundInstance) : Void;
	function stop() : Void;
}