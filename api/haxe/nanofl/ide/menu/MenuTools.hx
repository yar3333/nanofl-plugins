package nanofl.ide.menu;

extern class MenuTools
{
	static function findItem(items:Array<nanofl.ide.menu.MenuItem>, id:String) : nanofl.ide.menu.MenuItem;
	static function writeItem(item:nanofl.ide.menu.MenuItem, keyboard:nanofl.ide.keyboard.Keyboard, prefixID:String, ?nesting:Int, out:htmlparser.XmlBuilder) : Void;
	static function fixWidth(container:js.JQuery) : Void;
	static function updateItemStates(container:js.JQuery, app:nanofl.ide.Application) : Void;
	static function enableItem(container:js.JQuery, command:String, ?enable:Bool) : Void;
	static function enableItemLazy(container:js.JQuery, command:String, enable:Void -> Bool) : Void;
	static function toggleItem(container:js.JQuery, command:String, ?show:Bool) : Void;
	static function onItemClick(a:js.JQuery, commands:nanofl.ide.commands.Commands) : Void;
}