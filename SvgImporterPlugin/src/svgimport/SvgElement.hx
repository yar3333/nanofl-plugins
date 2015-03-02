package svgimport;

enum SvgElement
{
	DisplayPath(path:SvgPath);
	DisplayGroup(group:SvgGroup);
	DisplayText(text:SvgText);
}
