(function () { "use strict";
var HxOverrides = function() { };
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
var JavaScriptLanguagePlugin = function() {
	this.name = "JavaScript";
};
JavaScriptLanguagePlugin.__interfaces__ = [models.common.plugins.ILanguagePlugin];
JavaScriptLanguagePlugin.main = function() {
	models.common.Plugins.registerLanguage(new JavaScriptLanguagePlugin());
};
JavaScriptLanguagePlugin.prototype = {
	generateFiles: function(fileApi,filePath,documentProperties,library) {
		this.fileApi = fileApi;
		this.library = library;
		this.supportDir = fileApi.getPluginsDirectory() + "/JavaScriptLanguagePlugin";
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0,pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name;
		if(nameExt.lastIndexOf(".") > 0) name = nameExt.substring(0,nameExt.lastIndexOf(".")); else name = nameExt;
		console.log("JavaScriptLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + this.supportDir + "; dir= " + dir + "; name = " + name);
		this.generateLibrary(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateHtml(dir,name,documentProperties);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateHtml: function(dir,name,documentProperties) {
		var file = dir + "/" + name + ".html";
		var defines = [];
		if(this.fileApi.exists(file)) {
			var text = this.fileApi.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		} else defines.push("ALLOW_REGENERATION");
		if(!this.fileApi.exists(file) || HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{title}").join(documentProperties.title != ""?documentProperties.title:name);
			template = template.split("{width}").join(documentProperties.width);
			template = template.split("{height}").join(documentProperties.height);
			template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(models.common.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(models.common.VersionInfo.playerUrl);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{scripts}").join(this.getFiles(dir + "/gen",".js").concat(this.getFiles(dir + "/src",".js")).map(function(s) {
				return "<script src='" + s.substring(dir.length + 1) + "'></script>";
			}).join("\n\t\t"));
			template = template.split("{framerate}").join(documentProperties.framerate);
			template = template.split("{defines}").join(defines.map(function(s1) {
				return "<!--" + s1 + "-->\n";
			}).join(""));
			this.fileApi.saveContent(file,template);
		}
	}
	,generateClasses: function(dir,name) {
		this.fileApi.remove(dir + "/gen/base.js");
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		if(linkedItems.length > 0) {
			var classes = [];
			var _g = 0;
			while(_g < linkedItems.length) {
				var item1 = linkedItems[_g];
				++_g;
				var linkedClass = this.capitalizeClassName(item1.linkedClass);
				var text = [];
				this.generatePack("base." + linkedClass,text);
				text.push("base." + linkedClass + " = function() {");
				text.push("\t" + item1.getDisplayObjectClassName() + ".call(this, nanofl.Player.library.getItem(\"" + item1.namePath + "\"));");
				text.push("}");
				text.push("base." + linkedClass + ".prototype = $extend(" + item1.getDisplayObjectClassName() + ".prototype, {});");
				classes.push(text.join("\n"));
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".js";
				if(!this.fileApi.exists(classFile)) {
					var text1 = [];
					this.generatePack(linkedClass,text1);
					text1.push("function " + linkedClass + "() {");
					text1.push("\tbase." + linkedClass + ".call(this);");
					text1.push("\t// add init code here");
					text1.push("}");
					text1.push(linkedClass + ".prototype = $extend(base." + linkedClass + ".prototype, {");
					text1.push("\t// add your class members here");
					text1.push("});");
					this.fileApi.saveContent(classFile,text1.join("\n"));
				}
			}
			this.fileApi.saveContent(dir + "/gen/base.js",classes.join("\n\n"));
		}
	}
	,generateSoundsClass: function(dir,name) {
		this.fileApi.remove(dir + "/gen/Sounds.js");
		var sounds = this.library.getSounds();
		if(sounds.length > 0) {
			var text = [];
			text.push("function Sounds() {};");
			text.push("Sounds.prototype = {");
			text.push(sounds.filter(function(sound) {
				return sound.linkage != "" && sound.linkage != null;
			}).map(function(sound1) {
				return sound1.linkage + ": function(options) { return Sound.play(\"" + sound1.linkage + "\", options);";
			}).join("\n\t,"));
			text.push("}");
			this.fileApi.saveContent(dir + "/gen/Sounds.js",text.join("\n"));
		}
	}
	,capitalizeClassName: function(fullClassName) {
		var n = fullClassName.lastIndexOf(".");
		if(n < 0) return this.capitalize(fullClassName); else return fullClassName.substring(0,n + 1) + this.capitalize(fullClassName.substring(n + 1));
	}
	,capitalize: function(s) {
		return s.substring(0,1).toUpperCase() + s.substring(1);
	}
	,getFiles: function(dir,ext) {
		var r = [];
		this.fileApi.findFiles(dir,function(s) {
			if(s.length > ext.length && s.substring(s.length - ext.length) == ext) r.push(s);
		});
		return r;
	}
	,generatePack: function(fullClassName,lines) {
		var parts = fullClassName.split(".");
		if(parts.length == 1) return;
		var _g1 = 0;
		var _g = parts.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			var s = parts.slice(0,i + 1).join(".");
			lines.push(s + " = typeof " + s + " != 'undefined' ? " + s + " : {};");
		}
	}
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
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
JavaScriptLanguagePlugin.main();
})();
