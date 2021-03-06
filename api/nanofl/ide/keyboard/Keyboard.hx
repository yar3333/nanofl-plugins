package nanofl.ide.keyboard;

extern class Keyboard
{
	function new(app:nanofl.ide.Application, commands:nanofl.ide.commands.Commands) : Void;
	function setKeymap(keymap:Array<{ var shortcut : String; var command : String; }>) : Void;
	function getShortcutsForCommand(command:String) : Array<String>;
	function getGroupedKeymap() : Array<{ var shortcuts : String; var command : String; }>;
	function enable() : Void;
	function disable() : Void;
}