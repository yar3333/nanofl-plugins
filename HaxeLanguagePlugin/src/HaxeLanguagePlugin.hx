import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Log;
import models.common.Plugins;
import models.common.plugins.ILanguagePlugin;

class HaxeLanguagePlugin implements ILanguagePlugin
{
	var fileApi : FileApi;
	var library : Library;
	var supportDir : String;
	
	static function main() Plugins.registerLanguage(new HaxeLanguagePlugin());
	
	public function new() { }
	
	public var name = "Haxe";
	
	public function generateFiles(fileApi:FileApi, filePath:String, documentProperties:DocumentProperties, library:Library) : Void
	{
		this.fileApi = fileApi;
		this.library = library;
		this.supportDir = fileApi.getPluginsDirectory() + "/HaxeLanguagePlugin";
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
		Log.trace("HaxeLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		
		generateLibrary(dir, name);
		generateHtml(dir, name, documentProperties);
		generateClasses(dir, name);
		generateSoundsClass(dir, name);
	}
	
	function generateLibrary(dir:String, name:String)
	{
		fileApi.saveContent(dir + "/bin/library.js", library.compile("library"));
	}
	
	function generateHtml(dir:String, name:String, documentProperties:DocumentProperties)
	{
		var file = dir + "/" + name + ".html";
		if (!fileApi.exists(file))
		{
			var template = fileApi.getContent(supportDir + "/project.html");
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{codeUrl}").join("bin/" + name + ".js");
			template = template.split("{framerate}").join(untyped documentProperties.framerate);
			fileApi.saveContent(file, template);
		}
	}
	
	function generateClasses(dir:String, name:String)
	{
		fileApi.remove(dir + "/gen/*");
		
		var linkedItems = library.getInstancableItems().filter(function(item) return item.linkedClass != "");
		
		if (linkedItems.length > 0)
		{
			fileApi.copy(supportDir + "/files", dir);
			
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/BaseMovieClip.hx");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/MovieClip.hx");
			
			for (item in linkedItems)
			{
				var linkedClass = capitalizeClassName(item.linkedClass);
				
				var dotPos = linkedClass.lastIndexOf(".");
				var pack = dotPos >= 0 ? linkedClass.substring(0, dotPos) : "";
				var klass = dotPos >= 0 ? linkedClass.substring(dotPos + 1) : linkedClass;
				
				fileApi.saveContent
				(
					dir + "/gen/base/" + linkedClass.split(".").join("/") + ".hx",
					baseMovieClipTemplate
						.split("{pack}").join("base" + (pack != "" ? "." + pack : ""))
						.split("{klass}").join(klass)
						.split("{base}").join(item.getDisplayObjectClassName())
						.split("{namePath}").join(item.namePath)
				);
				
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".hx";
				if (!fileApi.exists(classFile))
				{
					fileApi.saveContent
					(
						classFile,
						(pack != "" ? "package " + pack + ";\n\n" : "") +
						movieClipTemplate
							.split("{klass}").join(klass)
							.split("{base}").join("base." + linkedClass)
					);
				}
			}
		}
	}
	
	function generateSoundsClass(dir:String, name:String)
	{
		var classFilePath = dir + "/gen/Sounds.hx";
		
		var sounds = library.getSounds();
		if (sounds.length > 0)
		{
			var text = [];
			text.push("import createjs.AbstractSoundInstance;");
			text.push("import createjs.Sound;");
			text.push("import createjs.SoundOptions;");
			text.push("");
			text.push("class Sounds");
			text.push("{");
			
			for (sound in sounds)
			{
				if (sound.linkage != "" && sound.linkage != null)
				{
					text.push("\tpublic static function " + sound.linkage + "(?options:SoundOptions) : AbstractSoundInstance return Sound.play(\"" + sound.linkage+"\", options);");
				}
			}
			
			text.push("}");
			fileApi.saveContent(classFilePath, text.join("\n"));
		}
		else
		{
			fileApi.remove(classFilePath);
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
}
