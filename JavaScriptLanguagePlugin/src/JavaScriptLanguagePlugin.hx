import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Plugins;
import models.common.plugins.ILanguagePlugin;

class JavaScriptLanguagePlugin implements ILanguagePlugin
{
	var fileApi : FileApi;
	var library : Library;
	var supportDir : String;
	
	static function main() Plugins.registerLanguage(new JavaScriptLanguagePlugin());
	
	public function new() { }
	
	public var name = "JavaScript";
	
	public function generateFiles(fileApi:FileApi, filePath:String, documentProperties:DocumentProperties, library:Library) : Void
	{
		this.fileApi = fileApi;
		this.library = library;
		this.supportDir = fileApi.getPluginsDirectory() + "/JavaScriptLanguagePlugin";
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
		trace("JavaScriptLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + supportDir+"; dir= " + dir + "; name = " + name);
		
		generateLibrary(dir, name);
		generateClasses(dir, name);
		generateSoundsClass(dir, name);
		generateHtml(dir, name, documentProperties);
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
			template = template.split("{scripts}").join(getFiles(dir + "/gen", ".js").concat(getFiles(dir + "/src", ".js")).map(function(s) return "<script src='" + s.substring(dir.length + 1) + "'></script>").join("\n\t\t"));
			template = template.split("{framerate}").join(untyped documentProperties.framerate);
			fileApi.saveContent(file, template);
		}
	}
	
	function generateClasses(dir:String, name:String)
	{
		fileApi.remove(dir + "/gen/base.js");
		
		var linkedItems = library.getInstancableItems().filter(function(item) return item.linkedClass != "");
		if (linkedItems.length > 0)
		{
			var classes = [];
			
			for (item in linkedItems)
			{
				var linkedClass = capitalizeClassName(item.linkedClass);
				
				var text = [];
				generatePack("base." + linkedClass, text);
				text.push("base." + linkedClass + " = function() {");
				text.push("\t" + item.getDisplayObjectClassName() + ".call(this, nanofl.Player.library.getItem(\"" + item.namePath + "\"));");
				text.push("}");
				text.push("base." + linkedClass + ".prototype = $extend(" + item.getDisplayObjectClassName() + ".prototype, {});");
				classes.push(text.join("\n"));
				
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".js";
				if (!fileApi.exists(classFile))
				{
					var text = [];
					generatePack(linkedClass, text);
					text.push("function " + linkedClass + "() {");
					text.push("\tbase." + linkedClass + ".call(this);");
					text.push("\t// add init code here");
					text.push("}");
					text.push(linkedClass + ".prototype = $extend(base." + linkedClass + ".prototype, {");
					text.push("\t// add your class members here");
					text.push("});");
					fileApi.saveContent(classFile, text.join("\n"));
				}
			}
			
			fileApi.saveContent(dir + "/gen/base.js", classes.join("\n\n"));
		}
	}
	
	function generateSoundsClass(dir:String, name:String)
	{
		fileApi.remove(dir + "/gen/Sounds.js");
		
		var sounds = library.getSounds();
		if (sounds.length > 0)
		{
			var text = [];
			text.push("function Sounds() {};");
			text.push("Sounds.prototype = {");
			text.push
			(
				sounds
					.filter(function(sound) return sound.linkage != "" && sound.linkage != null)
					.map(function(sound) return sound.linkage + ": function(options) { return Sound.play(\"" + sound.linkage + "\", options);")
					.join("\n\t,")
			);
			text.push("}");
			fileApi.saveContent(dir + "/gen/Sounds.js", text.join("\n"));
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
	
	function getFiles(dir:String, ext:String) : Array<String>
	{
		var r = [];
		fileApi.findFiles(dir, function(s) if (s.length > ext.length && s.substring(s.length - ext.length) == ext) r.push(s));
		return r;
	}
	
	function generatePack(fullClassName:String, lines:Array<String>)
	{
		var parts = fullClassName.split(".");
		if (parts.length == 1) return;
		for (i in 0...(parts.length - 1))
		{
			var s = parts.slice(0, i + 1).join(".");
			lines.push(s + " = typeof " + s + " != 'undefined' ? " + s + " : {};");
		}
	}
}
