package svgimport;

import htmlparser.HtmlNodeElement;
import svgimport.gradients.GradientType;
using htmlparser.HtmlParserTools;
using StringTools;

class XmlTools
{
	private static var reStyleValue = ~/^\s*(.+)\s*:\s*(.+)\s*$/;
	private static var reURLMatch = ~/^\s*url\(#([^)]*)\)\s*/;
	
	public static function getStyles(node:HtmlNodeElement, baseStyles:Map<String, String>) : Map<String, String>
	{
		var styles = new Map<String, String>();
		
		if (baseStyles != null)
		{
			for (s in baseStyles.keys())
			{
				styles.set(s, baseStyles.get(s));
			}
		}
		
		for (key in SvgAttributes.presentation)
		{
			if (node.hasAttribute(key)) styles.set(key, node.getAttribute(key));
		}
		
		if (node.hasAttribute("style")) 
		{
			for (s in node.getAttribute("style").split(";"))
			{
				if (reStyleValue.match(s))
				{
					styles.set(reStyleValue.matched(1), reStyleValue.matched(2));
				}
			}
		}
		
		return styles;
	}
	
	public static function getFloatStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, defaultValue:Float)
	{
		return toFloat(getStyle(node, key, styles, ""), defaultValue);
	}
	
	public static function getFloatValue(node:HtmlNodeElement, key:String, defaultValue:Float) : Float
	{
		return toFloat(node.getAttribute(key), defaultValue);
	}
	
	static function toFloat(s:String, defaultValue:Float)
	{
		if (s == null || s == "") return defaultValue;
		if (s.startsWith(".")) s = "0" + s;
		if (s.endsWith("%"))	return Std.parseFloat(s.substring(0, s.length - 1)) / 100;
		if (s.endsWith("pt"))	return Std.parseFloat(s.substring(0, s.length - 2)) * 1.25;
		if (s.endsWith("pc"))	return Std.parseFloat(s.substring(0, s.length - 2)) * 15;
		if (s.endsWith("mm"))	return Std.parseFloat(s.substring(0, s.length - 2)) * 3.543307;
		if (s.endsWith("cm"))	return Std.parseFloat(s.substring(0, s.length - 2)) * 35.43307;
		if (s.endsWith("in"))	return Std.parseFloat(s.substring(0, s.length - 2)) * 90;
		var r = Std.parseFloat(s);
		return r != null && !Math.isNaN(r) ? r : defaultValue;
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
	
	public static function getFillStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, gradients:Map<String, GradientType>) : FillType
	{
		var s = getStyle(node, key, styles, "");
		
		if (s == "") return FillType.FillSolid("#000000");
		if (s == "none") return FillType.FillNone;
		
		if (reURLMatch.match(s))
		{
			var url = reURLMatch.matched(1);
			if (gradients.exists(url)) return FillType.FillGrad(gradients.get(url));
			trace("WARNING: Unknown url('" + url + "').");
			return FillType.FillNone;
		}
		
		return FillType.FillSolid(s);
	}
	
	public static function getStrokeStyle(node:HtmlNodeElement, key:String, styles:Map<String, String>, gradients:Map<String, GradientType>) : StrokeType
	{
		var s = getStyle(node, key, styles, "");
		
		if (s == "" || s == "none") return StrokeType.StrokeNone;
		
		if (reURLMatch.match(s))
		{
			var url = reURLMatch.matched(1);
			if (gradients.exists(url)) return StrokeType.StrokeGrad(gradients.get(url));
			trace("WARNING: Unknown url('" + url + "').");
			return StrokeType.StrokeNone;
		}
		
		return StrokeType.StrokeSolid(s);
	}
	
	public static function normalizeTag(s:String) : String
	{
		return s.startsWith("svg:") ? s.substring("svg:".length) : s;
	}
	
	public static function getIdFromXlink(node:HtmlNodeElement, attrName="xlink:href") : String
	{
		var xlink = StringTools.trim(node.getAttr(attrName, ""));
		if (xlink == "") return  null;
		if (!xlink.startsWith("#"))
		{
			trace("WARNING: Unkown xlink syntax ('" + xlink + "').");
			return null;
		}
		return xlink.substring(1);
	}
	
	public static function getIdFromUrl(node:HtmlNodeElement, attrName:String) : String
	{
		var s = StringTools.trim(node.getAttr(attrName, ""));
		if (s == "") return null;
		if (reURLMatch.match(s)) return reURLMatch.matched(1);
		trace("WARNING: Unkown " + attrName + " syntax ('" + s + "').");
		return null;
	}
}