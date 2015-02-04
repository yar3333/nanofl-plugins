(function () { "use strict";
var HaxeLanguagePlugin = function() {
	this.name = "Haxe";
};
HaxeLanguagePlugin.__interfaces__ = [models.common.plugins.ILanguagePlugin];
HaxeLanguagePlugin.main = function() {
	models.common.Plugins.registerLanguage(new HaxeLanguagePlugin());
};
HaxeLanguagePlugin.prototype = {
	generateFiles: function(fileApi,filePath,documentProperties,library) {
		this.fileApi = fileApi;
		this.library = library;
		this.supportDir = fileApi.getPluginsDirectory() + "/HaxeLanguagePlugin";
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0,pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name;
		if(nameExt.lastIndexOf(".") > 0) name = nameExt.substring(0,nameExt.lastIndexOf(".")); else name = nameExt;
		models.common.Log.trace("HaxeLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + this.supportDir + "; dir= " + dir + "; name = " + name);
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name,documentProperties);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateHtml: function(dir,name,documentProperties) {
		var file = dir + "/" + name + ".html";
		if(!this.fileApi.exists(file)) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{title}").join(documentProperties.title != ""?documentProperties.title:name);
			template = template.split("{width}").join(documentProperties.width);
			template = template.split("{height}").join(documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{codeUrl}").join("bin/" + name + ".js");
			template = template.split("{framerate}").join(documentProperties.framerate);
			this.fileApi.saveContent(file,template);
		}
	}
	,generateClasses: function(dir,name) {
		this.fileApi.remove(dir + "/gen/*");
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		if(linkedItems.length > 0) {
			this.fileApi.copy(this.supportDir + "/files",dir);
			var _g = 0;
			while(_g < linkedItems.length) {
				var item1 = linkedItems[_g];
				++_g;
				var linkedClass = this.capitalizeClassName(item1.linkedClass);
				var dotPos = linkedClass.lastIndexOf(".");
				var pack;
				if(dotPos >= 0) pack = linkedClass.substring(0,dotPos); else pack = "";
				var klass;
				if(dotPos >= 0) klass = linkedClass.substring(dotPos + 1); else klass = linkedClass;
				this.fileApi.saveContent(dir + "/gen/base/" + linkedClass.split(".").join("/") + ".hx",this.fileApi.getContent(this.supportDir + "/BaseMovieClip.hx").split("{pack}").join("base" + (pack != ""?"." + pack:"")).split("{klass}").join(klass).split("{base}").join(item1.getDisplayObjectClassName()).split("{namePath}").join(item1.namePath));
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".hx";
				if(!this.fileApi.exists(classFile)) this.fileApi.saveContent(classFile,(pack != ""?"package " + pack + ";\n":"") + this.fileApi.getContent(this.supportDir + "/MovieClip.hx").split("{klass}").join(klass).split("{base}").join("base." + linkedClass));
			}
		}
	}
	,generateSoundsClass: function(dir,name) {
		var classFilePath = dir + "/gen/Sounds.hx";
		var sounds = this.library.getSounds();
		if(sounds.length > 0) {
			var text = [];
			text.push("import createjs.AbstractSoundInstance;");
			text.push("import createjs.Sound;");
			text.push("import createjs.SoundOptions;");
			text.push("");
			text.push("class Sounds");
			text.push("{");
			var _g = 0;
			while(_g < sounds.length) {
				var sound = sounds[_g];
				++_g;
				if(sound.linkage != "" && sound.linkage != null) text.push("\tpublic static function " + sound.linkage + "(?options:SoundOptions) : AbstractSoundInstance return Sound.play(\"" + sound.linkage + "\", options);");
			}
			text.push("}");
			this.fileApi.saveContent(classFilePath,text.join("\n"));
		} else this.fileApi.remove(classFilePath);
	}
	,capitalizeClassName: function(fullClassName) {
		var n = fullClassName.lastIndexOf(".");
		if(n < 0) return this.capitalize(fullClassName); else return fullClassName.substring(0,n + 1) + this.capitalize(fullClassName.substring(n + 1));
	}
	,capitalize: function(s) {
		return s.substring(0,1).toUpperCase() + s.substring(1);
	}
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
HaxeLanguagePlugin.main();
})();
