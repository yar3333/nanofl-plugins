package htmlparser;

extern class HtmlParser
{
	function parse(str:String) : Array<htmlparser.HtmlNode>;
	static var SELF_CLOSING_TAGS_HTML(default, null) : Dynamic;
	static function run(str:String) : Array<htmlparser.HtmlNode>;
	static function parseCssSelector(selector:String) : Array<Array<htmlparser.CssSelector>>;
}