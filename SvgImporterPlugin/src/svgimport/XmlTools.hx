package svgimport;

class XmlTools
{
	private static var mStyleSplit = ~/;/g;
	private static var mStyleValue = ~/\s*(.*)\s*:\s*(.*)\s*/;
	private static var mURLMatch = ~/url\(#(.*)\)/;
	
	public static function getStyles(node:Xml, baseStyles:Map<String, String>, gradients:Map<String, Grad>) : Map<String, String>
	{
		var styles = new Map<String, String>();
		
		if (baseStyles != null)
		{
			for (s in baseStyles.keys())
			{
				styles.set(s, baseStyles.get(s));
			}
		}
		
		if (node.exists("style")) 
		{
			var style = node.get("style");
			var strings = mStyleSplit.split(style);
			
			for (s in strings)
			{
				if (mStyleValue.match(s))
				{
					styles.set(mStyleValue.matched(1), mStyleValue.matched(2));
				}
			}
		}
		else
		{
			for (key in SvgAttributes.presentation)
			{
				if (node.exists(key)) styles.set(key, node.get(key));
			}
		}
		
		return styles;
	}
	
	public static function getFloatStyle(node:Xml, key:String, inStyles:Map<String, String>, defaultValue:Float)
	{
		var s = getStyle(node, key, inStyles, "");
		if (s == "") return defaultValue;
		return Std.parseFloat(s);
	}
	
	public static function getStyle(node:Xml, key:String, styles:Map<String, String>, defaultValue:String) : String
	{
		if (node != null && node.exists(key)) return node.get(key);
		if (styles != null && styles.exists(key)) return styles.get(key);
		return defaultValue;
	}
	
	public static function getColorStyle(node:Xml, key:String, styles:Map<String, String>, defaultValue:String) : String
	{
		var s = getStyle(node, key, styles, defaultValue);
		return s;
	}
	
	public static function getFillStyle(node:Xml, key:String, styles:Map<String, String>, gradients:Map<String, Grad>) : FillType
	{
		var s = getStyle(node, key, styles, "");
		
		if (s == "") return FillType.FillSolid("#000000");
		if (s == "none") return FillType.FillNone;
		
		if (mURLMatch.match(s))
		{
			var url = mURLMatch.matched(1);
			if (gradients.exists(url)) return FillType.FillGrad(gradients.get(url));
			throw "Unknown url:" + url;
		}
		
		return FillType.FillSolid(s);
	}
	
	public static function getFloat(inXML:Xml, inName:String, inDef=0.0) : Float
	{
		return inXML.exists(inName) ? Std.parseFloat(inXML.get(inName)) : inDef;
	}
	
	public static function getStrokeStyle(node:Xml, key:String, styles:Map<String, String>, defaultValue:String) : String
	{
		var s = getStyle(node, key, styles, defaultValue);
		if (s == "none") return null;
		return s;
	}
}