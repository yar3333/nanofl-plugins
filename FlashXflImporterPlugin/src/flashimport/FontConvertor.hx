package flashimport;

using StringTools;

class FontConvertor
{
	public static function convert(font:String) : { face:String, style:String }
	{
		var n = font.lastIndexOf("-");
		
		var face = removeSuffixes(n >= 0 ? font.substring(0, n) : font);
		var style = n >= 0 ? removeSuffixes(font.substring(n + 1)).toLowerCase() : "";
		
		if (style == "bolditalic") style = "bold italic";
		
		return { face:face, style:style };
	}
	
	static function removeSuffixes(s:String) : String
	{
		var changed = true;
		while (changed)
		{
			changed = false;
			for (suffix in [ "MT", "PS", "MS" ])
			{
				if (s.endsWith(suffix))
				{
					s = s.substring(0, s.length - suffix.length);
					changed = true;
				}
			}
		}
		return s;
	}
}