package nanofl.engine.elements;

extern class Elements
{
	static function parse(base:htmlparser.HtmlNodeElement) : Array<nanofl.engine.elements.Element>;
	static function save(elements:Array<nanofl.engine.elements.Element>, out:htmlparser.XmlBuilder) : Void;
}