import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Log;
import models.common.Plugins;
import models.common.plugins.ILanguagePlugin;

class NoneLanguagePlugin implements ILanguagePlugin
{
	static function main() Plugins.registerLanguage(new NoneLanguagePlugin());
	
	public function new() { }
	
	public var name = "";
	
	public function generateFiles(fileApi:FileApi, filePath:String, documentProperties:DocumentProperties, library:Library) : Void
	{
		var supportDir = fileApi.getPluginsDirectory() + "/NoneLanguagePlugin";
		
		var parts = filePath.split("/");
		var nameExt = parts.pop();
		var name = nameExt.substring(0, nameExt.lastIndexOf("."));
		var dir = parts.join("/");
		
		Log.trace("NoneLanguagePlugin.compile filePath = " + filePath + "; supportDir = " + supportDir + "; dir = " + dir + "; name = " + name);
		
		var destFile = dir + "/" + name + ".html";
		if (!fileApi.exists(destFile))
		{
			var template = fileApi.getContent(supportDir + "/project.html");
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{framerate}").join(untyped documentProperties.framerate);
			template = template.split("{library}").join(library.compile("library"));
			fileApi.saveContent(destFile, template);
		}
	}
}
