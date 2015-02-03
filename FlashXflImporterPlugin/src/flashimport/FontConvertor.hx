package flashimport;

using StringTools;
using Lambda;

class FontConvertor
{
	public static function convert(font:String) : { face:String, style:String }
	{
		var n = font.lastIndexOf("-");
		
		var face = n >= 0 ? font.substr(0, n) : font;
		if (face.endsWith("PSMT")) face = face.substr(0, face.length - "PSMT".length).trim();
		if (face.endsWith("PS")) face = face.substr(0, face.length - "PS".length).trim();
		
		var style = n >= 0 ? font.substr(n + 1) : "";
		if (style.endsWith("MT")) style = style.substr(0, style.length - "MT".length).trim();
		
		style = style.toLowerCase();
		
		if (style == "bolditalic") style = "bold italic";
		
		return { face:face, style:style };
	}
}