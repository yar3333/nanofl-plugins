class CodeGenerator extends HtmlGenerator
{
	function capitalizeClassName(fullClassName:String) : String
	{
		var n = fullClassName.lastIndexOf(".");
		return n < 0
            ? capitalize(fullClassName)
            : fullClassName.substring(0, n + 1) + capitalize(fullClassName.substring(n + 1));
	}
	
	function capitalize(s:String) : String
	{
		return s.substring(0, 1).toUpperCase() + s.substring(1);
	}
	
	override function getScripts(dir:String, name:String) : String
	{
		return getScriptUrls(dir, name).map(function(s) return "\t\t<script src='" + s + "'></script>").join("\n");
	}
	
	function getScriptUrls(dir:String, name:String) : Array<String> return [];
}