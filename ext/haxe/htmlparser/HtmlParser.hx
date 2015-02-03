package htmlparser;

typedef HtmlLexem =
{
	var all : String;
	var allPos : Int;
	var attrs : String;
	var close : String;
	var comment : String;
	var elem : String;
	var script : String;
	var scriptAttrs : String;
	var scriptText : String;
	var style : String;
	var styleAttrs : String;
	var styleText : String;
	var tagClose : String;
	var tagEnd : String;
	var tagOpen : String;
};

extern class HtmlParser
{
	function parse(str:String) : Array<htmlparser.HtmlNode>;
	static var SELF_CLOSING_TAGS_HTML(default, null) : Dynamic;
	static function run(str:String) : Array<htmlparser.HtmlNode>;
	static function parseCssSelector(selector:String) : Array<Array<htmlparser.CssSelector>>;
}