package models.client;

extern class Clipboard
{
	function new(app:models.client.Application) : Void;
	function copy(?isCut:Bool) : Bool;
	function canCut() : Bool;
	function canCopy() : Bool;
	function canPaste() : Bool;
	function cut() : Bool;
	function paste() : Bool;
	function restoreFocus() : Void;
}