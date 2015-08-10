package languages;

using Lambda;

class CodeGenerator extends HtmlGenerator
{
	function generateLibraryAndFilters(dir:String, name:String)
	{
		fileApi.saveContent(dir + "/bin/library.js", "var serializedLibrary = '" + serializedLibrary + "';");
		
		if (filterCodes.iterator().hasNext())
		{
			fileApi.saveContent(dir + "/bin/filters.js", filterCodes.array().join("\n\n"));
		}
		else
		{
			fileApi.remove(dir + "/bin/filters.js");
		}
	}
	
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
	
	override function getInlineScripts() return [];
	
	override function getScriptUrls(dir:String, name:String) : Array<String> 
	{
		var r = super.getScriptUrls(dir, name);
		r.push("bin/library.js");
		if (filterCodes.iterator().hasNext())
		{
			r.push("bin/filters.js");
		}
		return r;
	}
}