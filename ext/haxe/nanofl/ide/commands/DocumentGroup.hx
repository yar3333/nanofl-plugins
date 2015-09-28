package nanofl.ide.commands;

extern class DocumentGroup extends nanofl.ide.commands.BaseGroup
{
	function new(app:nanofl.ide.Application) : Void;
	function createNewEmpty() : Void;
	function open(path:String) : Void;
	function save() : Void;
	function saveAs() : Void;
	function import_(pluginName:String) : Void;
	function export(pluginName:String) : Void;
	function test() : Void;
	function undo() : Void;
	function redo() : Void;
	function cut() : Void;
	function copy() : Void;
	function paste() : Void;
	function properties() : Void;
}