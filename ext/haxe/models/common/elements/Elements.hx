package models.common.elements;

extern class Elements
{
	static function parse(base:htmlparser.HtmlNodeElement) : Array<models.common.elements.Element>;
	static function save(elements:Array<models.common.elements.Element>, out:models.common.XmlWriter) : Void;
}