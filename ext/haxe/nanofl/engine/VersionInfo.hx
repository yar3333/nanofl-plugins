package nanofl.engine;

extern class VersionInfo
{
	static var ideVersion(default, null) : String;
	static var playerVersion(default, null) : String;
	static var fileFormatVersion(default, null) : String;
	static var createjsUrl(default, null) : String;
	static var playerUrl(default, null) : String;
	static function compare(v1:String, v2:String) : Int;
}