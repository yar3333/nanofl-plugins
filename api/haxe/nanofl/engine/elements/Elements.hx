package nanofl.engine.elements;

extern class Elements
{
	static function parse(base:htmlparser.HtmlNodeElement, version:String) : Array<nanofl.engine.elements.Element>;
	static function save(elements:nanofl.engine.ArrayRO<nanofl.engine.elements.Element>, out:htmlparser.XmlBuilder) : Void;
	static function expandGroups(elements:nanofl.engine.ArrayRO<nanofl.engine.elements.Element>) : Array<nanofl.engine.elements.Element>;
	static function getUsedSymbolNamePaths(elements:nanofl.engine.ArrayRO<nanofl.engine.elements.Element>) : Array<String>;
}