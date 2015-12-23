package flashimport;

using StringTools;

class PathTools
{
	public static function unescape(s:String) : String
	{
		return s.replace("&#038", "&");
	}
	
	public static function escape(s:String) : String
	{
		return s.replace("&", "&#038");
	}
}