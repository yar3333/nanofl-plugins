class JavaScriptGenerator extends CodeGenerator
{
	override public function generate(dir:String, name:String)
	{
		generateLibrary(dir, name);
		generateClasses(dir, name);
		generateSoundsClass(dir, name);
		generateHtml(dir, name);
	}
	
	override function getScriptUrls(dir:String, name:String) : Array<String> 
	{
		return [ "bin/library.js" ]
				.concat(findFiles(dir + "/gen", ".js"))
				.concat(findFiles(dir + "/src", ".js"));
	}
	
	function generateLibrary(dir:String, name:String)
	{
		fileApi.saveContent(dir + "/bin/library.js", library.compile("library"));
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
	
	function findFiles(dir:String, ext:String) : Array<String>
	{
		var r = [];
		fileApi.findFiles(dir, function(s) if (s.length > ext.length && s.substring(s.length - ext.length) == ext) r.push(s));
		return r.map(function(s) return s.substring(dir.length + 1));
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
