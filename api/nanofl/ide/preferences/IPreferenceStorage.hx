package nanofl.ide.preferences;

extern interface IPreferenceStorage
{
	function set(key:String, value:Dynamic) : Dynamic;
	function getString(key:String, ?defValue:String) : String;
	function getInt(key:String, ?defValue:Int) : Int;
	function getFloat(key:String, ?defValue:Float) : Float;
	function getBool(key:String, ?defValue:Bool) : Bool;
	function getObject(key:String, ?defValue:Dynamic) : Dynamic;
	function getMenu(pathID:String) : Array<nanofl.ide.menu.MenuItem>;
}