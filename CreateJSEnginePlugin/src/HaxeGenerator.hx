import nanofl.engine.VersionInfo;

class HaxeGenerator extends BaseGenerator
{
	override public function generate(dir:String, name:String)
	{
		generateLibrary(dir, name);
		generateHtml(dir, name);
		generateClasses(dir, name);
		generateSoundsClass(dir, name);
	}
	
	function generateLibrary(dir:String, name:String)
	{
		fileApi.saveContent(dir + "/bin/library.js", library.compile("library"));
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
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(VersionInfo.playerUrl);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{codeUrl}").join("bin/" + name + ".js");
			template = template.split("{framerate}").join(untyped documentProperties.framerate);
			template = template.split("{defines}").join(defines.map(function(s) return "<!--" + s + "-->\n").join(""));
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
			
			var baseMovieClipTemplate = fileApi.getContent(supportDir + "/BaseMovieClip.hx");
			var movieClipTemplate = fileApi.getContent(supportDir + "/MovieClip.hx");
			
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
}
