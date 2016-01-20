package nanofl.ide.commands;

extern class Commands
{
	function new(app:nanofl.ide.Application) : Void;
	var application(default, null) : nanofl.ide.commands.ApplicationGroup;
	var document(default, null) : nanofl.ide.commands.DocumentGroup;
	var editor(default, null) : nanofl.ide.commands.EditorGroup;
	var library(default, null) : nanofl.ide.commands.LibraryGroup;
	var timeline(default, null) : nanofl.ide.commands.TimelineGroup;
	function validateCommand(command:String) : Void;
	function run(command:String, ?params:Array<Dynamic>) : Bool;
}