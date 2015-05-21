(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BaseGenerator = function(fileApi,documentProperties,library,supportDir) {
	this.fileApi = fileApi;
	this.documentProperties = documentProperties;
	this.library = library;
	this.supportDir = supportDir;
};
BaseGenerator.__name__ = true;
BaseGenerator.prototype = {
	generate: function(dir,name) {
	}
	,capitalizeClassName: function(fullClassName) {
		var n = fullClassName.lastIndexOf(".");
		if(n < 0) return this.capitalize(fullClassName); else return fullClassName.substring(0,n + 1) + this.capitalize(fullClassName.substring(n + 1));
	}
	,capitalize: function(s) {
		return s.substring(0,1).toUpperCase() + s.substring(1);
	}
};
var CreateJSEnginePlugin = function() {
	this.languages = ["HTML","JavaScript","TypeScript","Haxe"];
	this.name = "CreateJS";
};
CreateJSEnginePlugin.__name__ = true;
CreateJSEnginePlugin.__interfaces__ = [nanofl.ide.plugins.IEnginePlugin];
CreateJSEnginePlugin.main = function() {
	nanofl.engine.Plugins.registerEngine(new CreateJSEnginePlugin());
};
CreateJSEnginePlugin.prototype = {
	generateFiles: function(language,fileApi,filePath,documentProperties,library) {
		var supportDir = fileApi.getPluginsDirectory() + "/CreateJSEnginePlugin/" + language.toLowerCase();
		var generator;
		switch(language) {
		case "HTML":
			generator = new HtmlGenerator(fileApi,documentProperties,library,supportDir);
			break;
		case "JavaScript":
			generator = new JavaScriptGenerator(fileApi,documentProperties,library,supportDir);
			break;
		case "TypeScript":
			generator = new TypeScriptGenerator(fileApi,documentProperties,library,supportDir);
			break;
		case "Haxe":
			generator = new HaxeGenerator(fileApi,documentProperties,library,supportDir);
			break;
		default:
			throw "Unsupported language '" + language + "'.";
			generator = null;
		}
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0,pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name;
		if(nameExt.lastIndexOf(".") > 0) name = nameExt.substring(0,nameExt.lastIndexOf(".")); else name = nameExt;
		console.log("CreateJSEnginePlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		generator.generate(dir,name);
	}
};
var HaxeGenerator = function(fileApi,documentProperties,library,supportDir) {
	BaseGenerator.call(this,fileApi,documentProperties,library,supportDir);
};
HaxeGenerator.__name__ = true;
HaxeGenerator.__super__ = BaseGenerator;
HaxeGenerator.prototype = $extend(BaseGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateHtml: function(dir,name) {
		var file = dir + "/" + name + ".html";
		var defines = [];
		if(this.fileApi.exists(file)) {
			var text = this.fileApi.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		}
		if(!this.fileApi.exists(file) || HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(this.documentProperties.width);
			template = template.split("{height}").join(this.documentProperties.height);
			template = template.split("{backgroundColor}").join(this.documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{codeUrl}").join("bin/" + name + ".js");
			template = template.split("{framerate}").join(this.documentProperties.framerate);
			template = template.split("{defines}").join(defines.map(function(s) {
				return "<!--" + s + "-->\n";
			}).join(""));
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
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/BaseMovieClip.hx");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/MovieClip.hx");
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
				this.fileApi.saveContent(dir + "/gen/base/" + linkedClass.split(".").join("/") + ".hx",baseMovieClipTemplate.split("{pack}").join("base" + (pack != ""?"." + pack:"")).split("{klass}").join(klass).split("{base}").join(item1.getDisplayObjectClassName()).split("{namePath}").join(item1.namePath));
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".hx";
				if(!this.fileApi.exists(classFile)) this.fileApi.saveContent(classFile,(pack != ""?"package " + pack + ";\n\n":"") + movieClipTemplate.split("{klass}").join(klass).split("{base}").join("base." + linkedClass));
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
});
var HtmlGenerator = function(fileApi,documentProperties,library,supportDir) {
	BaseGenerator.call(this,fileApi,documentProperties,library,supportDir);
};
HtmlGenerator.__name__ = true;
HtmlGenerator.__super__ = BaseGenerator;
HtmlGenerator.prototype = $extend(BaseGenerator.prototype,{
	generate: function(dir,name) {
		var destHtmlFile = dir + "/" + name + ".html";
		if(!this.fileApi.exists(destHtmlFile) || this.fileApi.getContent(destHtmlFile).indexOf("<!--ALLOW_REGENERATION-->") >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(this.documentProperties.width);
			template = template.split("{height}").join(this.documentProperties.height);
			template = template.split("{backgroundColor}").join(this.documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
			template = template.split("{framerate}").join(this.documentProperties.framerate);
			template = template.split("{library}").join(this.library.compile("library"));
			this.fileApi.saveContent(destHtmlFile,template);
		}
	}
});
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
var JavaScriptGenerator = function(fileApi,documentProperties,library,supportDir) {
	BaseGenerator.call(this,fileApi,documentProperties,library,supportDir);
};
JavaScriptGenerator.__name__ = true;
JavaScriptGenerator.__super__ = BaseGenerator;
JavaScriptGenerator.prototype = $extend(BaseGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateHtml(dir,name);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateHtml: function(dir,name) {
		var file = dir + "/" + name + ".html";
		var defines = [];
		if(this.fileApi.exists(file)) {
			var text = this.fileApi.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		} else defines.push("ALLOW_REGENERATION");
		if(!this.fileApi.exists(file) || HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(this.documentProperties.width);
			template = template.split("{height}").join(this.documentProperties.height);
			template = template.split("{backgroundColor}").join(this.documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{scripts}").join(this.getFiles(dir + "/gen",".js").concat(this.getFiles(dir + "/src",".js")).map(function(s) {
				return "<script src='" + s.substring(dir.length + 1) + "'></script>";
			}).join("\n\t\t"));
			template = template.split("{framerate}").join(this.documentProperties.framerate);
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
});
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var TypeScriptGenerator = function(fileApi,documentProperties,library,supportDir) {
	BaseGenerator.call(this,fileApi,documentProperties,library,supportDir);
};
TypeScriptGenerator.__name__ = true;
TypeScriptGenerator.__super__ = BaseGenerator;
TypeScriptGenerator.prototype = $extend(BaseGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateHtml: function(dir,name) {
		var file = dir + "/" + name + ".html";
		var defines = [];
		if(this.fileApi.exists(file)) {
			var text = this.fileApi.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		}
		if(!this.fileApi.exists(file) || HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(Std.string(this.documentProperties.width));
			template = template.split("{height}").join(Std.string(this.documentProperties.height));
			template = template.split("{backgroundColor}").join(this.documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
			template = template.split("{libraryUrl}").join("bin/library.js");
			template = template.split("{codeUrl}").join("bin/" + name + ".js");
			template = template.split("{framerate}").join(Std.string(this.documentProperties.framerate));
			template = template.split("{defines}").join(defines.map(function(s) {
				return "<!--" + s + "-->\n";
			}).join(""));
			this.fileApi.saveContent(file,template);
		}
	}
	,generateClasses: function(dir,name) {
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		this.fileApi.remove(dir + "/gen/*");
		if(linkedItems.length > 0) {
			this.fileApi.copy(this.supportDir + "/files",dir);
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/BaseMovieClip.ts");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/MovieClip.ts");
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
				var text = baseMovieClipTemplate.split("{pack}").join("base" + (pack != ""?"." + pack:"")).split("{klass}").join(klass).split("{base}").join(item1.getDisplayObjectClassName()).split("{namePath}").join(item1.namePath);
				this.fileApi.saveContent(dir + "/gen/base/" + linkedClass.split(".").join("/") + ".ts",text);
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".ts";
				if(!this.fileApi.exists(classFile)) {
					var text1 = "";
					if(pack != "") text1 += "module " + pack + "\n{\n";
					text1 += movieClipTemplate.split("{klass}").join(klass).split("{base}").join("base." + linkedClass);
					if(pack != "") text1 += "\n}";
					this.fileApi.saveContent(classFile,text1);
				}
			}
		}
	}
	,generateSoundsClass: function(dir,name) {
		var classFilePath = dir + "/gen/Sounds.ts";
		var sounds = this.library.getSounds();
		if(sounds.length > 0) {
			var text = [];
			text.push("type AbstractSoundInstance = createjs.AbstractSoundInstance;");
			text.push("type SoundOptions = createjs.SoundOptions;");
			text.push("");
			text.push("class Sounds");
			text.push("{");
			var _g = 0;
			while(_g < sounds.length) {
				var sound = sounds[_g];
				++_g;
				if(sound.linkage != "" && sound.linkage != null) text.push("\tpublic static " + sound.linkage + "(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play(\"" + sound.linkage + "\", options); }");
			}
			text.push("}");
			this.fileApi.saveContent(classFilePath,text.join("\n"));
		} else this.fileApi.remove(classFilePath);
	}
});
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
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
CreateJSEnginePlugin.main();
})();
