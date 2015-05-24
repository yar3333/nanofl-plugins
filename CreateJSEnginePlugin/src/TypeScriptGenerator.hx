﻿class TypeScriptGenerator extends CodeGenerator
{
	override public function generate(dir:String, name:String)
	{
        generateLibrary(dir, name);
        super.generate(dir, name);
        generateClasses(dir, name);
        generateSoundsClass(dir, name);
	}
	
	override function getScriptUrls(dir:String, name:String) : Array<String> 
	{
		return
		[
			"bin/library.js",
			"bin/" + name + ".js"
		];
	}
	
	function generateLibrary(dir:String, name:String)
	{
        fileApi.saveContent(dir + "/bin/library.js", library.compile("library"));
	}
	
	function generateClasses(dir:String, name:String)
	{
		var linkedItems = library.getInstancableItems().filter(function(item) return item.linkedClass != "");
		
        fileApi.remove(dir + "/gen/*");

		if (linkedItems.length > 0)
		{
            fileApi.copy(supportDir + "/typescript/files", dir);

			var baseMovieClipTemplate = fileApi.getContent(supportDir + "/typescript/BaseMovieClip.ts");
			var movieClipTemplate = fileApi.getContent(supportDir + "/typescript/MovieClip.ts");
			
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