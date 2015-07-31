package languages;

import nanofl.engine.VersionInfo;

class HtmlGenerator extends TextureAtlasGenerator
{
	override public function generate(dir:String, name:String)
	{
		generateHtml(dir, name);
		generateTextureAtlases(dir);
	}
	
	function generateHtml(dir:String, name:String)
	{
		var file = dir + "/" + name + ".html";
		
		var defines = [];
		if (fileApi.exists(file))
		{
			var text = fileApi.getContent(file);
			if (text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		}
		else
		{
			defines.push("ALLOW_REGENERATION");
		}
		
		if (defines.indexOf("ALLOW_REGENERATION") >= 0)
		{
			var template = fileApi.getContent(supportDir + "/languages/project.html");
			template = template.split("{defines}").join(defines.map(function(s) return "<!--" + s + "-->\n").join(""));
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(VersionInfo.playerUrl);
			template = template.split("{framerate}").join(untyped documentProperties.framerate);
			template = template.split("{scaleMode}").join(documentProperties.scaleMode);
			template = template.split("{scripts}").join
			(
				"\t\t\t" + getScriptInlineBlocks()
							.filter(function(s) return s != null && s != "")
							.map(function(s) return "\t\t<script>\n" + s.split("\n").join("\n\t\t") + "\n\t\t</script>")
							.concat(getScriptUrls(dir, name).map(function(s) return "\t\t<script src=\"" + s + "\"></script>")).join("\n")
			);
			fileApi.saveContent(file, template);
		}
	}
	
	function getScriptInlineBlocks() : Array<String>
	{
		return [ library.compile("library") ];
	}
	
	function getScriptUrls(dir:String, name:String) : Array<String> 
	{
		return documentProperties.useTextureAtlases ? [ "bin/textureatlases.js" ] : [];
	}
}
