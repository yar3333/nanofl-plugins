package svgimport;

enum SvgElement
{
	DisplayPath(path:SvgPath);
	DisplayGroup(group:SvgGroup);
	DisplayText(text:SvgText);
	DisplayUse(name:String, matrix:Matrix, styles:Map<String, String>, visible:Bool);
}
