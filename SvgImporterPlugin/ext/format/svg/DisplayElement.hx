package format.svg;

enum DisplayElement
{
	DisplayPath(path:Path);
	DisplayGroup(group:Group);
	DisplayText(text:Text);
}
