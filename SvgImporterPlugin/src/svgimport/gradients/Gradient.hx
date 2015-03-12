package svgimport.gradients;

import htmlparser.HtmlNodeElement;
using htmlparser.HtmlParserTools;

class Gradient
{
	public var colors : Array<String>;
	public var alphas : Array<Float>;
	public var ratios : Array<Float>;
	public var matrix : Matrix;
	
	function new(colors:Array<String>, alphas:Array<Float>, ratios:Array<Float>, matrix:Matrix)
	{
		this.colors = colors;
		this.alphas = alphas;
		this.ratios = ratios;
		this.matrix = matrix;
	}
	
	public static function load(node:HtmlNodeElement) : GradientType
	{
		// todo - grad.spread = base.spread;
		var colors = new Array<String>();
		var alphas = new Array<Float>();
		var ratios = new Array<Float>();
		for (stop in node.children)
		{
			var styles = XmlTools.getStyles(stop, null);
			colors.push(XmlTools.getColorStyle(stop, "stop-color", styles, "#000000"));
			alphas.push(XmlTools.getFloatStyle(stop, "stop-opacity", styles, 1));
			ratios.push(XmlTools.getFloatStyle(stop, "offset", null, 1));
		}
		
		var matrix = Transform.load(node.getAttribute("gradientTransform"));
		
		switch (XmlTools.normalizeTag(node.name))
		{
			case "linearGradient": return GradientType.LINEAR(new LinearGradient(colors, alphas, ratios, matrix, node));
			case "radialGradient": return GradientType.RADIAL(new RadialGradient(colors, alphas, ratios, matrix, node));
			case _: throw "Unknow gradient tag '" + node.name + "'.";
		};
	}
}
