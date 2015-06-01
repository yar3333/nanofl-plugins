import nanofl.engine.VersionInfo;

class HtmlGenerator extends BaseGenerator
{
	public function generate(dir:String, name:String)
	{
		generateHtml(dir, name);
		generateTextureAtlases(dir, name);
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
		
		if (!fileApi.exists(file) || defines.indexOf("ALLOW_REGENERATION") >= 0)
		{
			var template = fileApi.getContent(supportDir + "/project.html");
			template = template.split("{defines}").join(defines.map(function(s) return "<!--" + s + "-->\n").join(""));
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(VersionInfo.playerUrl);
			template = template.split("{framerate}").join(untyped documentProperties.framerate);
			template = template.split("{scripts}").join(getScripts(dir, name));
			fileApi.saveContent(file, template);
		}
	}
	
	function generateTextureAtlases(dir:String, name:String)
	{
		for (textureAtlasName in textureAtlases.keys())
		{
			fileApi.saveBinary(dir + "/" + textureAtlasName + ".png", textureAtlases.get(textureAtlasName).imagePng);
		}
	}
	
	function getScripts(dir:String, name:String) : String
	{
		return "\t\t<script>\n\t\t\t" + library.compile("library") + "\n\t\t</script>";
	}
}
