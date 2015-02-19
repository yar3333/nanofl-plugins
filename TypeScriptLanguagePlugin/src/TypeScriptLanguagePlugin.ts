type DocumentProperties = models.common.DocumentProperties;
type FileApi = models.common.FileApi;
type Library = models.common.Library;
type InstancableItem = models.common.libraryitems.InstancableItem;
type ICompilerPlugin = models.common.plugins.ILanguagePlugin;

class TypeScriptLanguagePlugin implements ICompilerPlugin
{
	private fileApi : FileApi;
	private library : Library;
	private supportDir : string;
	
    public name = "TypeScript";
	
	public generateFiles(fileApi:FileApi, filePath:string, documentProperties:DocumentProperties, library:Library) : void
	{
		this.fileApi = fileApi;
		this.library = library;
		this.supportDir = fileApi.getPluginsDirectory() + "/TypeScriptLanguagePlugin";
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
        console.log("TypeScriptLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + this.supportDir + "; dir= " + dir + "; name = " + name);
		
        this.generateLibrary(dir, name);
        this.generateHtml(dir, name, documentProperties);
        this.generateClasses(dir, name);
        this.generateSoundsClass(dir, name);
	}
	
	private generateLibrary(dir:string, name:string)
	{
        this.fileApi.saveContent(dir + "/bin/library.js", this.library.compile("library"));
	}
	
	private generateHtml(dir:string, name:string, documentProperties:DocumentProperties)
	{
		var file = dir + "/" + name + ".html";
		
		var defines = [];
		if (this.fileApi.exists(file))
		{
			var text = this.fileApi.getContent(file);
			if (text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		}

		if (!this.fileApi.exists(file) || defines.indexOf("ALLOW_REGENERATION") >= 0)
		{
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			var params = {
				title: documentProperties.title != "" ? documentProperties.title : name,
				width: documentProperties.width,
				height: documentProperties.height,
				backgroundColor: documentProperties.backgroundColor,
				createjsUrl: models.common.VersionInfo.createjsUrl,
				playerUrl: models.common.VersionInfo.playerUrl,
				libraryUrl: "bin/library.js",
				codeUrl: "bin/" + name + ".js",
				framerate: documentProperties.framerate,
				defines: defines.map(function(s) { return "<!--" + s + "-->\n" }).join("")
			};
			template = template.replace(/\{([_a-zA-Z0-9]+)\}/g, function(match, group) { return params[group]; });
			this.fileApi.saveContent(file, template);
		}
	}
	
	private generateClasses(dir:string, name:string)
	{
        var linkedItems = this.library.getInstancableItems().filter(function (item) { return item.linkedClass != ""; });
		
        this.fileApi.remove(dir + "/gen/*");

		if (linkedItems.length > 0)
		{
            this.fileApi.copy(this.supportDir + "/files", dir);

			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/BaseMovieClip.ts");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/MovieClip.ts");
			
            var self = this;
            linkedItems.forEach(function(item)
            {
                var linkedClass = self.capitalizeClassName(item.linkedClass);
				
				var dotPos = linkedClass.lastIndexOf(".");
				var pack = dotPos >= 0 ? linkedClass.substring(0, dotPos) : "";
				var klass = dotPos >= 0 ? linkedClass.substring(dotPos + 1) : linkedClass;
				
				var text = baseMovieClipTemplate
						.split("{pack}").join("base" + (pack != "" ? "." + pack : ""))
						.split("{klass}").join(klass)
						.split("{base}").join(item.getDisplayObjectClassName())
						.split("{namePath}").join(item.namePath);
                
				self.fileApi.saveContent(dir + "/gen/base/" + linkedClass.replace(".", "/") + ".ts", text);
				
				var classFile = dir + "/src/" + linkedClass.replace(".", "/") + ".ts";
                if (!self.fileApi.exists(classFile))
				{
                    var text = "";
					if (pack != "") text += "module " + pack + "\n{\n";
					text += movieClipTemplate
								.split("{klass}").join(klass)
								.split("{base}").join("base." + linkedClass);
					if (pack != "") text += "\n}";

					self.fileApi.saveContent(classFile, text);
				}
			});
		}
	}
	
	private generateSoundsClass(dir:string, name:string)
	{
		var classFilePath = dir + "/gen/Sounds.ts";
		
        var sounds = this.library.getSounds();
		if (sounds.length > 0)
		{
			var text = [];
			text.push("type AbstractSoundInstance = createjs.AbstractSoundInstance;");
			text.push("type SoundOptions = createjs.SoundOptions;");
			text.push("");
			text.push("class Sounds");
			text.push("{");
			
            sounds.forEach(function(sound)
			{
				if (sound.linkage != "" && sound.linkage != null)
				{
					text.push("\tpublic static " + sound.linkage + "(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play(\"" + sound.linkage + "\", options); }");
				}
			});
			
			text.push("}");
			this.fileApi.saveContent(classFilePath, text.join("\n"));
		}
		else
		{
            this.fileApi.remove(classFilePath);
		}
	}
	
	private capitalizeClassName(fullClassName:string) : string
	{
		var n = fullClassName.lastIndexOf(".");
		return n < 0
            ? this.capitalize(fullClassName)
            : fullClassName.substring(0, n + 1) + this.capitalize(fullClassName.substring(n + 1));
	}
	
	private capitalize(s:string) : string
	{
		return s.substring(0, 1).toUpperCase() + s.substring(1);
	}
}

models.common.Plugins.registerLanguage(new TypeScriptLanguagePlugin());