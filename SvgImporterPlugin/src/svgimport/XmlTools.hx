package svgimport;

import htmlparser.HtmlNodeElement;

class XmlTools
{
	private static var mStyleSplit = ~/;/g;
	private static var mStyleValue = ~/\s*(.*)\s*:\s*(.*)\s*/;
	private static var mURLMatch = ~/url\(#(.*)\)/;
	
	public static function getStyles(node:HtmlNodeElement, baseStyles:Map<String, String>, gradients:Map<String, Grad>) : Map<String, String>
	{
		var styles = new Map<String, String>();
		
		if (baseStyles != null)
		{
			for (s in baseStyles.keys())
			{
				styles.set(s, baseStyles.get(s));
			}
		}
		
		if (node.hasAttribute("style")) 
		{
			var style = node.getAttribute("style");
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
				if (node.hasAttribute(key)) styles.set(key, node.getAttribute(key));
			}
		}
		
		return styles;
	}
	
	public static function getFloatStyle(node:HtmlNodeElement, key:String, inStyles:Map<String, String>, defaultValue:Float)
	{
		var s = getStyle(node, key, inStyles, "");
		if (s == "") return defaultValue;
		return Std.parseFloat(s);
	}
	
	public static function getStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, defaultValue:String) : String
	{
		if (node != null && node.hasAttribute(key)) return node.getAttribute(key);
		if (styles != null && styles.exists(key)) return styles.get(key);
		return defaultValue;
	}
	
	public static function getColorStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, defaultValue:String) : String
	{
		var s = getStyle(node, key, styles, defaultValue);
		return s;
	}
	
	public static function getFillStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, gradients:Map<String, Grad>) : FillType
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
	
	public static function getStrokeStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, gradients:Map<String, Grad>) : StrokeType
	{
		var s = getStyle(node, key, styles, "");
		
		if (s == "" || s == "none") return StrokeType.StrokeNone;
		
		if (mURLMatch.match(s))
		{
			var url = mURLMatch.matched(1);
			if (gradients.exists(url)) return StrokeType.StrokeGrad(gradients.get(url));
			throw "Unknown url:" + url;
		}
		
		return StrokeType.StrokeSolid(s);
	}
}