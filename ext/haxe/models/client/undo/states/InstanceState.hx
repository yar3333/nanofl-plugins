package models.client.undo.states;

extern class InstanceState extends models.client.undo.states.ElementState
{
	function new(name:String, colorEffect:models.common.coloreffects.ColorEffect, filters:Array<models.common.FilterDef>) : Void;
	var name(default, null) : String;
	var colorEffect(default, null) : models.common.coloreffects.ColorEffect;
	var filters(default, null) : Array<models.common.FilterDef>;
	override function equ(_state:models.client.undo.states.ElementState) : Bool;
}