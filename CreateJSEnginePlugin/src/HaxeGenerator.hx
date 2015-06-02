class HaxeGenerator extends CodeGenerator
{
	override public function generate(dir:String, name:String)
	{
		fileApi.remove(dir + "/gen/*");
		
		generateLibrary(dir, name);
		generateHtml(dir, name);
		generateClasses(dir, name);
		generateSoundsClass(dir, name);
		generateTextureAtlases(dir);
	}
	
	override function getScriptUrls(dir:String, name:String) : Array<String> 
	{
		return super.getScriptUrls(dir, name)
			.concat([ "bin/" + name + ".js" ]);
	}
	
	function generateLibrary(dir:String, name:String)
	{
		fileApi.saveContent(dir + "/bin/library.js", library.compile("library"));
	}
	
	function generateClasses(dir:String, name:String)
	{
		
		var linkedItems = library.getInstancableItems().filter(function(item) return item.linkedClass != "");
		
		if (linkedItems.length > 0)
		{
			fileApi.copy(supportDir + "/haxe/files", dir);
			
			var baseMovieClipTemplate = fileApi.getContent(supportDir + "/haxe/BaseMovieClip.hx");
			var movieClipTemplate = fileApi.getContent(supportDir + "/haxe/MovieClip.hx");
			
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
					text.push("\tpublic static function " + sound.linkage + "(?options:SoundOptions) : AbstractSoundInstance return Sound.play(\"" + sound.linkage + "\", options);");
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
