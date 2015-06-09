(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var CreateJSGeneratorPlugin = function() {
	this.modes = ["HTML","JavaScript","JavaScript/FlashDevelop","JavaScript/MsVisualStudio2013","TypeScript","TypeScript/MsVisualStudio2013","Haxe","Haxe/FlashDevelop","TextureAtlas"];
	this.name = "CreateJS";
};
CreateJSGeneratorPlugin.__name__ = true;
CreateJSGeneratorPlugin.__interfaces__ = [nanofl.ide.plugins.IGeneratorPlugin];
CreateJSGeneratorPlugin.main = function() {
	nanofl.engine.Plugins.registerGenerator(new CreateJSGeneratorPlugin());
};
CreateJSGeneratorPlugin.prototype = {
	generateFiles: function(mode,fileApi,filePath,documentProperties,library,textureAtlases) {
		var supportDir = fileApi.getPluginsDirectory() + "/CreateJSGeneratorPlugin";
		var languageAndIde = mode.split("/");
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0,pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name;
		if(nameExt.lastIndexOf(".") > 0) name = nameExt.substring(0,nameExt.lastIndexOf(".")); else name = nameExt;
		var generator;
		var _g = languageAndIde[0];
		switch(_g) {
		case "HTML":
			generator = new languages.HtmlGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "JavaScript":
			generator = new languages.JavaScriptGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TypeScript":
			generator = new languages.TypeScriptGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "Haxe":
			generator = new languages.HaxeGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TextureAtlas":
			generator = new languages.TextureAtlasGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		default:
			throw "Unsupported language '" + languageAndIde[0] + "'.";
			generator = null;
		}
		console.log("CreateJSGeneratorPlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		generator.generate(dir,name);
		if(languageAndIde.length > 1) {
			var generator1;
			var _g1 = languageAndIde[1];
			switch(_g1) {
			case "FlashDevelop":
				generator1 = new ides.FlashDevelopGenerator(fileApi,supportDir);
				break;
			case "MsVisualStudio2013":
				generator1 = new ides.MsVisualStudio2013Generator(fileApi,supportDir);
				break;
			default:
				throw "Unsupported IDE '" + languageAndIde[1] + "'.";
				generator1 = null;
			}
			generator1.generate(languageAndIde[0],dir,name);
		}
	}
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
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
var IMap = function() { };
IMap.__name__ = true;
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
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
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__name__ = true;
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
var ides = {};
ides.BaseIdeGenerator = function(fileApi,supportDir) {
	this.fileApi = fileApi;
	this.supportDir = supportDir;
};
ides.BaseIdeGenerator.__name__ = true;
ides.BaseIdeGenerator.prototype = {
	generate: function(language,dir,name) {
	}
};
ides.FlashDevelopGenerator = function(fileApi,supportDir) {
	ides.BaseIdeGenerator.call(this,fileApi,supportDir);
};
ides.FlashDevelopGenerator.__name__ = true;
ides.FlashDevelopGenerator.__super__ = ides.BaseIdeGenerator;
ides.FlashDevelopGenerator.prototype = $extend(ides.BaseIdeGenerator.prototype,{
	generate: function(language,dir,name) {
		console.log("FlashDevelopGenerator language = " + language + "; dir = " + dir + "; name = " + name);
		var ext;
		switch(language) {
		case "JavaScript":
			ext = ".fdproj";
			break;
		case "Haxe":
			ext = ".hxproj";
			break;
		default:
			ext = null;
		}
		var destProjectFile = dir + "/" + name + ext;
		if(!this.fileApi.exists(destProjectFile)) {
			var template = this.fileApi.getContent(this.supportDir + "/ides/FlashDevelop/" + language + "/project" + ext);
			template = template.split("{name}").join(name);
			this.fileApi.saveContent(destProjectFile,template);
			this.fileApi.copy(this.supportDir + "/ides/FlashDevelop/" + language + "/files",dir);
		}
	}
});
ides.MsVisualStudio2013Generator = function(fileApi,supportDir) {
	ides.BaseIdeGenerator.call(this,fileApi,supportDir);
};
ides.MsVisualStudio2013Generator.__name__ = true;
ides.MsVisualStudio2013Generator.__super__ = ides.BaseIdeGenerator;
ides.MsVisualStudio2013Generator.prototype = $extend(ides.BaseIdeGenerator.prototype,{
	generate: function(language,dir,name) {
		console.log("MsVisualStudio2013Generator language = " + language + "; dir = " + dir + "; name = " + name);
		var guid = this.newGuid();
		var _g = 0;
		var _g1 = [".sln",".csproj"];
		while(_g < _g1.length) {
			var ext = _g1[_g];
			++_g;
			var destFile = dir + "/" + name + ext;
			if(!this.fileApi.exists(destFile)) {
				var template = this.fileApi.getContent(this.supportDir + "/ides/MsVisualStudio2013/" + language + "/project" + ext);
				template = template.split("{name}").join(name);
				template = template.split("{guid}").join(guid);
				this.fileApi.saveContent(destFile,template);
			}
		}
	}
	,newGuid: function() {
		var d = new Date().getTime();
		var uuid = new EReg("[xy]","g").map("{xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}",function(re) {
			var r = Std["int"](d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return StringTools.hex(re.matched(0) == "x"?r:r & 3 | 8);
		});
		return uuid.toUpperCase();
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
var languages = {};
languages.BaseGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	this.fileApi = fileApi;
	this.documentProperties = documentProperties;
	this.library = library;
	this.textureAtlases = textureAtlases;
	this.supportDir = supportDir;
};
languages.BaseGenerator.__name__ = true;
languages.BaseGenerator.prototype = {
	generate: function(dir,name) {
	}
};
languages.TextureAtlasGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages.BaseGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages.TextureAtlasGenerator.__name__ = true;
languages.TextureAtlasGenerator.__super__ = languages.BaseGenerator;
languages.TextureAtlasGenerator.prototype = $extend(languages.BaseGenerator.prototype,{
	generate: function(dir,name) {
		this.generateTextureAtlases(dir);
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
languages.HtmlGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages.TextureAtlasGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages.HtmlGenerator.__name__ = true;
languages.HtmlGenerator.__super__ = languages.TextureAtlasGenerator;
languages.HtmlGenerator.prototype = $extend(languages.TextureAtlasGenerator.prototype,{
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
			var template = this.fileApi.getContent(this.supportDir + "/languages/project.html");
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
				return "\t\t<script>\n" + s2.split("\n").join("\n\t\t") + "\n\t\t</script>";
			}).concat(this.getScriptUrls(dir,name).map(function(s3) {
				return "\t\t<script src=\"" + s3 + "\"></script>";
			})).join("\n"));
			this.fileApi.saveContent(file,template);
		}
	}
	,getScriptInlineBlocks: function() {
		return [this.library.compile("library")];
	}
	,getScriptUrls: function(dir,name) {
		if(this.documentProperties.useTextureAtlases) return ["bin/textureatlases.js"]; else return [];
	}
});
languages.CodeGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages.HtmlGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages.CodeGenerator.__name__ = true;
languages.CodeGenerator.__super__ = languages.HtmlGenerator;
languages.CodeGenerator.prototype = $extend(languages.HtmlGenerator.prototype,{
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
		return languages.HtmlGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/library.js"]);
	}
});
languages.HaxeGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages.CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages.HaxeGenerator.__name__ = true;
languages.HaxeGenerator.__super__ = languages.CodeGenerator;
languages.HaxeGenerator.prototype = $extend(languages.CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.fileApi.remove(dir + "/gen/*");
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages.CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/" + name + ".js"]);
	}
	,generateLibrary: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js",this.library.compile("library"));
	}
	,generateClasses: function(dir,name) {
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		if(linkedItems.length > 0) {
			this.fileApi.copy(this.supportDir + "/languages/haxe/files",dir);
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/languages/haxe/BaseMovieClip.hx");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/languages/haxe/MovieClip.hx");
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
languages.JavaScriptGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages.CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages.JavaScriptGenerator.__name__ = true;
languages.JavaScriptGenerator.__super__ = languages.CodeGenerator;
languages.JavaScriptGenerator.prototype = $extend(languages.CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateHtml(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages.CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(this.findFiles(dir + "/gen",".js")).concat(this.findFiles(dir + "/src",".js"));
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
languages.TypeScriptGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages.CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages.TypeScriptGenerator.__name__ = true;
languages.TypeScriptGenerator.__super__ = languages.CodeGenerator;
languages.TypeScriptGenerator.prototype = $extend(languages.CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibrary(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages.CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/" + name + ".js"]);
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
			this.fileApi.copy(this.supportDir + "/languages/typescript/files",dir);
			var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/languages/typescript/BaseMovieClip.ts");
			var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/languages/typescript/MovieClip.ts");
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
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
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
CreateJSGeneratorPlugin.main();
})();
