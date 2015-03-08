package nanofl.ide.undo.states;

extern class InstanceState extends nanofl.ide.undo.states.ElementState
{
	function new(name:String, colorEffect:nanofl.engine.coloreffects.ColorEffect, filters:Array<nanofl.engine.FilterDef>) : Void;
	var name(default, null) : String;
	var colorEffect(default, null) : nanofl.engine.coloreffects.ColorEffect;
	var filters(default, null) : Array<nanofl.engine.FilterDef>;
	override function equ(_state:nanofl.ide.undo.states.ElementState) : Bool;
}