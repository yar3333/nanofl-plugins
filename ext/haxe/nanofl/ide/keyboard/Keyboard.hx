package nanofl.ide.keyboard;

extern class Keyboard
{
	function new(app:nanofl.ide.Application, keymap:Array<{ var shortcut : String; var command : String; }>, commands:nanofl.ide.commands.Commands) : Void;
	function getShortcutsForCommand(command:String) : Array<String>;
	function getGroupedKeymap() : Array<{ var shortcuts : String; var command : String; }>;
	function enable() : Void;
	function disable() : Void;
}