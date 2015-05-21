class TypeScriptGenerator extends BaseGenerator
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
			template = template.split("{width}").join(Std.string(documentProperties.width));
			template = template.split("{height}").join(Std.string(documentProperties.height));
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{codeUrl}").join("bin/" + name + ".js");
			template = template.split("{framerate}").join(Std.string(documentProperties.framerate));
			template = template.split("{defines}").join(defines.map(function(s) return "<!--" + s + "-->\n").join(""));
			fileApi.saveContent(file, template);
		}
	}
	
	function generateClasses(dir:String, name:String)
	{
        var linkedItems = library.getInstancableItems().filter(function(item) return item.linkedClass != "");
		
        fileApi.remove(dir + "/gen/*");

		if (linkedItems.length > 0)
		{
            fileApi.copy(supportDir + "/files", dir);

			var baseMovieClipTemplate = fileApi.getContent(supportDir + "/BaseMovieClip.ts");
			var movieClipTemplate = fileApi.getContent(supportDir + "/MovieClip.ts");
			
			for (item in linkedItems)
			{
                var linkedClass = capitalizeClassName(item.linkedClass);
				
				var dotPos = linkedClass.lastIndexOf(".");
				var pack = dotPos >= 0 ? linkedClass.substring(0, dotPos) : "";
				var klass = dotPos >= 0 ? linkedClass.substring(dotPos + 1) : linkedClass;
				
				var text = baseMovieClipTemplate
						.split("{pack}").join("base" + (pack != "" ? "." + pack : ""))
						.split("{klass}").join(klass)
						.split("{base}").join(item.getDisplayObjectClassName())
						.split("{namePath}").join(item.namePath);
                
				fileApi.saveContent(dir + "/gen/base/" + linkedClass.split(".").join("/") + ".ts", text);
				
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".ts";
                if (!fileApi.exists(classFile))
				{
                    var text = "";
					if (pack != "") text += "module " + pack + "\n{\n";
					text += movieClipTemplate
								.split("{klass}").join(klass)
								.split("{base}").join("base." + linkedClass);
					if (pack != "") text += "\n}";
					
					fileApi.saveContent(classFile, text);
				}
			}
		}
	}
	
	function generateSoundsClass(dir:String, name:String)
	{
		var classFilePath = dir + "/gen/Sounds.ts";
		
        var sounds = library.getSounds();
		if (sounds.length > 0)
		{
			var text = [];
			text.push("type AbstractSoundInstance = createjs.AbstractSoundInstance;");
			text.push("type SoundOptions = createjs.SoundOptions;");
			text.push("");
			text.push("class Sounds");
			text.push("{");
			
            for (sound in sounds)
			{
				if (sound.linkage != "" && sound.linkage != null)
				{
					text.push("\tpublic static " + sound.linkage + "(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play(\"" + sound.linkage + "\", options); }");
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
