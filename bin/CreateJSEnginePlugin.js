(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BaseGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	this.fileApi = fileApi;
	this.documentProperties = documentProperties;
	this.library = library;
	this.textureAtlases = textureAtlases;
	this.supportDir = supportDir;
};
var HtmlGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	BaseGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
HtmlGenerator.__super__ = BaseGenerator;
HtmlGenerator.prototype = $extend(BaseGenerator.prototype,{
	generate: function(dir,name) {
		this.generateHtml(dir,name);
		this.generateTextureAtlases(dir);
	}
	,generateHtml: function(dir,name) {
		var file = dir + "/" + name + ".html";
		var defines = [];
		if(this.fileApi.exists(file)) {
			var text = this.fileApi.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		} else defines.push("ALLOW_REGENERATION");
		if(HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/project.html");
			template = template.split("{defines}").join(defines.map(function(s) {
				return "<!--" + s + "-->\n";
			}).join(""));
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(this.documentProperties.width);
			template = template.split("{height}").join(this.documentProperties.height);
			template = template.split("{backgroundColor}").join(this.documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
			template = template.split("{framerate}").join(this.documentProperties.framerate);
			template = template.split("{scripts}").join(this.getScriptInlineBlocks().filter(function(s1) {
				return s1 != null && s1 != "";
			}).map(function(s2) {
				return "\t\t<script>\n" + s2.split("\n").join("\n\t\t") + "\n</script>";
			}).concat(this.getScriptUrls(dir,name).map(function(s3) {
				return "\t\t<script src=\"" + s3 + "\"></script>";
			})).join("\n"));
			this.fileApi.saveContent(file,template);
		}
	}
	,generateTextureAtlases: function(dir) {
		var jsonFilePath = dir + "/bin/textureatlases.js";
		if(this.textureAtlases.iterator().hasNext()) {
			var textureAtlasesJson = "";
			var $it0 = this.textureAtlases.keys();
			while( $it0.hasNext() ) {
				var textureAtlasName = $it0.next();
				var textureAtlas = this.textureAtlases.get(textureAtlasName);
				var imageUrl = "bin/" + textureAtlasName + ".png";
				this.fileApi.saveBinary(dir + "/" + imageUrl,textureAtlas.imagePng);
				textureAtlasesJson += "(function() {\n";
				textureAtlasesJson += "\tvar images = [ '" + imageUrl + "' ];\n";
				var namePaths = Reflect.fields(textureAtlas.itemFrames);
				namePaths.sort(Reflect.compare);
				var _g = 0;
				while(_g < namePaths.length) {
					var namePath = namePaths[_g];
					++_g;
					textureAtlasesJson += "\tnanofl.Player.spriteSheets['" + namePath + "'] = new createjs.SpriteSheet({ images:images, frames:[ " + this.getSpriteSheetFrames(textureAtlas,namePath).join(", ") + " ] });\n";
				}
				textureAtlasesJson += "})();\n\n";
			}
			this.fileApi.saveContent(jsonFilePath,textureAtlasesJson);
		} else this.fileApi.remove(jsonFilePath);
	}
	,getScriptInlineBlocks: function() {
		return [this.library.compile("library")];
	}
	,getScriptUrls: function(dir,name) {
		if(this.documentProperties.useTextureAtlases) return ["bin/textureatlases.js"]; else return [];
	}
	,getSpriteSheetFrames: function(textureAtlas,namePath) {
		var r = new Array();
		var frameIndexes = Reflect.field(textureAtlas.itemFrames,namePath);
		var _g = 0;
		while(_g < frameIndexes.length) {
			var frameIndex = frameIndexes[_g];
			++_g;
			if(frameIndex != null) {
				var frame = textureAtlas.frames[frameIndex];
				r.push([frame.x,frame.y,frame.width,frame.height,0,frame.regX,frame.regY]);
			} else r.push([]);
		}
		return r;
	}
});
var CodeGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	HtmlGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
CodeGenerator.__super__ = HtmlGenerator;
CodeGenerator.prototype = $extend(HtmlGenerator.prototype,{
	capitalizeClassName: function(fullClassName) {
		var n = fullClassName.lastIndexOf(".");
		if(n < 0) return this.capitalize(fullClassName); else return fullClassName.substring(0,n + 1) + this.capitalize(fullClassName.substring(n + 1));
	}
	,capitalize: function(s) {
		return s.substring(0,1).toUpperCase() + s.substring(1);
	}
	,getScriptInlineBlocks: function() {
		return [];
	}
	,getScriptUrls: function(dir,name) {
		return HtmlGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/library.js"]);
	}
});
var CreateJSEnginePlugin = function() {
	this.languages = ["HTML","JavaScript","TypeScript","Haxe"];
	this.name = "CreateJS";
};
CreateJSEnginePlugin.__interfaces__ = [nanofl.ide.plugins.IEnginePlugin];
CreateJSEnginePlugin.main = function() {
	nanofl.engine.Plugins.registerEngine(new CreateJSEnginePlugin());
};
CreateJSEnginePlugin.prototype = {
	generateFiles: function(language,fileApi,filePath,documentProperties,library,textureAtlases) {
		var supportDir = fileApi.getPluginsDirectory() + "/CreateJSEnginePlugin";
		var generator;
		switch(language) {
		case "HTML":
			generator = new HtmlGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "JavaScript":
			generator = new JavaScriptGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TypeScript":
			generator = new TypeScriptGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "Haxe":
			generator = new HaxeGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
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
var HaxeGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
HaxeGenerator.__super__ = CodeGenerator;
HaxeGenerator.prototype = $extend(CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.fileApi.remove(dir + "/gen/*");
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/" + name + ".js"]);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateClasses: function(dir,name) {
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		if(linkedItems.length > 0) {
			this.fileApi.copy(this.supportDir + "/haxe/files",dir);
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/haxe/BaseMovieClip.hx");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/haxe/MovieClip.hx");
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
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var JavaScriptGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
JavaScriptGenerator.__super__ = CodeGenerator;
JavaScriptGenerator.prototype = $extend(CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateHtml(dir,name);
	}
	,getScriptUrls: function(dir,name) {
		return CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(this.findFiles(dir + "/gen",".js")).concat(this.findFiles(dir + "/src",".js"));
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
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
	,findFiles: function(dir,ext) {
		var r = [];
		this.fileApi.findFiles(dir,function(s) {
			if(s.length > ext.length && s.substring(s.length - ext.length) == ext) r.push(s);
		});
		return r.map(function(s1) {
			return s1.substring(dir.length + 1);
		});
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
var IMap = function() { };
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
var TypeScriptGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
TypeScriptGenerator.__super__ = CodeGenerator;
TypeScriptGenerator.prototype = $extend(CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
	}
	,getScriptUrls: function(dir,name) {
		return CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/" + name + ".js"]);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateClasses: function(dir,name) {
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		this.fileApi.remove(dir + "/gen/*");
		if(linkedItems.length > 0) {
			this.fileApi.copy(this.supportDir + "/typescript/files",dir);
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/typescript/BaseMovieClip.ts");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/typescript/MovieClip.ts");
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
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
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
CreateJSEnginePlugin.main();
})();
