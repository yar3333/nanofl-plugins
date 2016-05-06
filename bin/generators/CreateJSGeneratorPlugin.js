(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var CreateJSGeneratorPlugin = function() {
	this.properties = [{ type : "list", name : "mode", label : "Mode", defaultValue : "HTML", values : ["HTML","JavaScript","JavaScript/FlashDevelop","JavaScript/MsVisualStudio","TypeScript","TypeScript/MsVisualStudio","Haxe","Haxe/FlashDevelop","TextureAtlas"]},{ type : "string", name : "urlOnClick", label : "URL on click", defaultValue : "", description : "Useful for Banner Ads. Keep field empty to disable this feature."},{ type : "bool", name : "useLocalScripts", label : "Use local scripts for Player/CreateJS/ThreeJS", defaultValue : false, description : "Check to prevent loading scripts from CDN. Local copies will be used. This increase document folder size."},{ type : "bool", name : "forceSoftwareRenderer", label : "Force software renderer for ThreeJS", defaultValue : false, description : "Don't check to have 3D acceleration autodetection. In code: nanofl.Mesh.forceSoftwareRenderer."}];
	this.name = "CreateJS";
};
CreateJSGeneratorPlugin.__name__ = true;
CreateJSGeneratorPlugin.__interfaces__ = [nanofl.ide.plugins.IGeneratorPlugin];
CreateJSGeneratorPlugin.main = function() {
	nanofl.ide.plugins.GeneratorPlugins.register(new CreateJSGeneratorPlugin());
};
CreateJSGeneratorPlugin.prototype = {
	generate: function(api,params,filePath,documentProperties,library,textureAtlases) {
		var supportDir = api.fileSystem.getPluginsDirectory() + "/generators/CreateJSGeneratorPlugin";
		var languageAndIde = params.mode.split("/");
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0,pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name;
		if(nameExt.lastIndexOf(".") > 0) name = nameExt.substring(0,nameExt.lastIndexOf(".")); else name = nameExt;
		var generator;
		var _g = languageAndIde[0];
		switch(_g) {
		case "HTML":
			generator = new languages_HtmlGenerator(api.fileSystem,params,documentProperties,library,textureAtlases,supportDir);
			break;
		case "JavaScript":
			generator = new languages_JavaScriptGenerator(api.fileSystem,params,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TypeScript":
			generator = new languages_TypeScriptGenerator(api.fileSystem,params,documentProperties,library,textureAtlases,supportDir);
			break;
		case "Haxe":
			generator = new languages_HaxeGenerator(api.fileSystem,params,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TextureAtlas":
			generator = new languages_TextureAtlasGenerator(api.fileSystem,params,documentProperties,library,textureAtlases,supportDir);
			break;
		default:
			throw new js__$Boot_HaxeError("Unsupported language '" + languageAndIde[0] + "'.");
			generator = null;
		}
		console.log("CreateJSGeneratorPlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		generator.generate(dir,name);
		if(languageAndIde.length > 1) {
			var generator1;
			var _g1 = languageAndIde[1];
			switch(_g1) {
			case "FlashDevelop":
				generator1 = new ides_FlashDevelopGenerator(api.fileSystem,supportDir);
				break;
			case "MsVisualStudio":
				generator1 = new ides_MsVisualStudioGenerator(api.fileSystem,supportDir);
				break;
			default:
				throw new js__$Boot_HaxeError("Unsupported IDE '" + languageAndIde[1] + "'.");
				generator1 = null;
			}
			generator1.generate(languageAndIde[0],dir,name);
		}
		if(api.fileSystem.exists(dir + "/bin") && api.fileSystem.readDirectory(dir + "/bin").length == 0) api.fileSystem.remove(dir + "/bin");
		var r = [name + ".html"];
		if(api.fileSystem.exists(dir + "/bin")) r.push("bin");
		return r;
	}
	,test: function(api,params,filePath) {
		var htmlFilePath = haxe_io_Path.withoutExtension(filePath) + ".html";
		if(api.fileSystem != null && !api.fileSystem.exists(htmlFilePath)) return "File \"" + htmlFilePath + "\" not found.";
		api.serverUtils.openInBrowser(htmlFilePath);
		return null;
	}
	,getCodeFilePath: function(params,symbol) {
		var language = params.mode.split("/")[0];
		var exts;
		var _g = new haxe_ds_StringMap();
		if(__map_reserved.JavaScript != null) _g.setReserved("JavaScript",".js"); else _g.h["JavaScript"] = ".js";
		if(__map_reserved.TypeScript != null) _g.setReserved("TypeScript",".hx"); else _g.h["TypeScript"] = ".hx";
		if(__map_reserved.Haxe != null) _g.setReserved("Haxe",".hx"); else _g.h["Haxe"] = ".hx";
		exts = _g;
		if(stdlib_LambdaIterator.indexOf(exts.keys(),language) >= 0) {
			if(symbol.linkedClass == "") symbol.linkedClass = stdlib_StringTools.replace(stdlib_StringTools.ltrim(haxe_io_Path.directory(symbol.namePath) + "/" + stdlib_StringTools.capitalize(haxe_io_Path.withoutDirectory(symbol.namePath)),"/"),"/",".");
			return "src/" + StringTools.replace(symbol.linkedClass,".","/") + (__map_reserved[language] != null?exts.getReserved(language):exts.h[language]);
		}
		return null;
	}
	,__class__: CreateJSGeneratorPlugin
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
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
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
	,replace: function(s,by) {
		return s.replace(this.r,by);
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
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
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
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
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
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
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
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Utf8 = function(size) {
	this.__b = "";
};
haxe_Utf8.__name__ = true;
haxe_Utf8.iter = function(s,chars) {
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars(HxOverrides.cca(s,i));
	}
};
haxe_Utf8.encode = function(s) {
	throw new js__$Boot_HaxeError("Not implemented");
};
haxe_Utf8.decode = function(s) {
	throw new js__$Boot_HaxeError("Not implemented");
};
haxe_Utf8.compare = function(a,b) {
	if(a > b) return 1; else if(a == b) return 0; else return -1;
};
haxe_Utf8.prototype = {
	addChar: function(c) {
		this.__b += String.fromCharCode(c);
	}
	,__class__: haxe_Utf8
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function() { };
haxe_io_Bytes.__name__ = true;
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var ides_BaseIdeGenerator = function(fileSystem,supportDir) {
	this.fileSystem = fileSystem;
	this.supportDir = supportDir;
};
ides_BaseIdeGenerator.__name__ = true;
ides_BaseIdeGenerator.prototype = {
	generate: function(language,dir,name) {
	}
	,__class__: ides_BaseIdeGenerator
};
var ides_FlashDevelopGenerator = function(fileSystem,supportDir) {
	ides_BaseIdeGenerator.call(this,fileSystem,supportDir);
};
ides_FlashDevelopGenerator.__name__ = true;
ides_FlashDevelopGenerator.__super__ = ides_BaseIdeGenerator;
ides_FlashDevelopGenerator.prototype = $extend(ides_BaseIdeGenerator.prototype,{
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
		if(!this.fileSystem.exists(destProjectFile)) {
			var template = this.fileSystem.getContent(this.supportDir + "/ides/FlashDevelop/" + language + "/project" + ext);
			template = template.split("{name}").join(name);
			this.fileSystem.saveContent(destProjectFile,template);
			this.fileSystem.copy(this.supportDir + "/ides/FlashDevelop/" + language + "/files",dir);
		}
	}
	,__class__: ides_FlashDevelopGenerator
});
var ides_MsVisualStudioGenerator = function(fileSystem,supportDir) {
	ides_BaseIdeGenerator.call(this,fileSystem,supportDir);
};
ides_MsVisualStudioGenerator.__name__ = true;
ides_MsVisualStudioGenerator.__super__ = ides_BaseIdeGenerator;
ides_MsVisualStudioGenerator.prototype = $extend(ides_BaseIdeGenerator.prototype,{
	generate: function(language,dir,name) {
		console.log("MsVisualStudioGenerator language = " + language + "; dir = " + dir + "; name = " + name);
		var guid = this.newGuid();
		var _g = 0;
		var _g1 = [".sln",".csproj"];
		while(_g < _g1.length) {
			var ext = _g1[_g];
			++_g;
			var destFile = dir + "/" + name + ext;
			if(!this.fileSystem.exists(destFile)) {
				var template = this.fileSystem.getContent(this.supportDir + "/ides/MsVisualStudio/" + language + "/project" + ext);
				template = template.split("{name}").join(name);
				template = template.split("{guid}").join(guid);
				this.fileSystem.saveContent(destFile,template);
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
	,__class__: ides_MsVisualStudioGenerator
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var languages_BaseGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	this.fileSystem = fileSystem;
	this.params = params;
	this.documentProperties = documentProperties;
	this.library = library;
	this.textureAtlases = textureAtlases;
	this.supportDir = supportDir;
};
languages_BaseGenerator.__name__ = true;
languages_BaseGenerator.prototype = {
	generate: function(dir,name) {
	}
	,__class__: languages_BaseGenerator
};
var languages_TextureAtlasGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	languages_BaseGenerator.call(this,fileSystem,params,documentProperties,library,textureAtlases,supportDir);
};
languages_TextureAtlasGenerator.__name__ = true;
languages_TextureAtlasGenerator.__super__ = languages_BaseGenerator;
languages_TextureAtlasGenerator.prototype = $extend(languages_BaseGenerator.prototype,{
	generate: function(dir,name) {
		this.generateTextureAtlases(dir);
	}
	,generateTextureAtlases: function(dir) {
		var $it0 = this.textureAtlases.keys();
		while( $it0.hasNext() ) {
			var textureAtlasName = $it0.next();
			var textureAtlas = this.textureAtlases.get(textureAtlasName);
			var imageUrl = "bin/" + textureAtlasName + ".png";
			this.fileSystem.saveBinary(dir + "/" + imageUrl,textureAtlas.imagePng);
			var spriteSheetJsons = [];
			var namePaths = Reflect.fields(textureAtlas.itemFrames);
			namePaths.sort(Reflect.compare);
			var _g = 0;
			while(_g < namePaths.length) {
				var namePath = namePaths[_g];
				++_g;
				spriteSheetJsons.push("\t'" + namePath + "': { 'images':[ \"" + imageUrl + "\" ], 'frames':[ " + this.getSpriteSheetFrames(textureAtlas,namePath).join(", ") + " ] }");
			}
			this.fileSystem.saveContent(dir + "/" + this.getTextureAtlasJsonUrl(textureAtlasName),"{\n" + spriteSheetJsons.join(",\n") + "\n}");
		}
	}
	,getTextureAtlasJsonUrl: function(textureAtlasName) {
		return "bin/" + textureAtlasName + ".json";
	}
	,getSpriteSheetFrames: function(textureAtlas,namePath) {
		var r = [];
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
	,__class__: languages_TextureAtlasGenerator
});
var languages_HtmlGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	languages_TextureAtlasGenerator.call(this,fileSystem,params,documentProperties,library,textureAtlases,supportDir);
	var data = library.compile("library");
	this.serializedLibrary = data.serializedLibrary;
	this.filterCodes = data.filterCodes;
};
languages_HtmlGenerator.__name__ = true;
languages_HtmlGenerator.__super__ = languages_TextureAtlasGenerator;
languages_HtmlGenerator.prototype = $extend(languages_TextureAtlasGenerator.prototype,{
	generate: function(dir,name) {
		this.generateHtml(dir,name);
		this.generateTextureAtlases(dir);
	}
	,generateHtml: function(dir,name) {
		var file = dir + "/" + name + ".html";
		var defines = [];
		if(this.fileSystem.exists(file)) {
			var text = this.fileSystem.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		} else defines.push("ALLOW_REGENERATION");
		if(HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileSystem.getContent(this.supportDir + "/languages/project.html");
			template = template.split("{defines}").join(defines.map(function(s3) {
				return "<!--" + s3 + "-->\n";
			}).join(""));
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(this.documentProperties.width);
			template = template.split("{height}").join(this.documentProperties.height);
			template = template.split("{bodyStyle}").join("background-color:" + this.documentProperties.backgroundColor + "; margin:0; padding:0; font-size:0; overflow:hidden");
			template = template.split("{preCanvas}").join(this.params.urlOnClick != ""?"<a href='" + this.params.urlOnClick + "' target='_blank'>\n\t\t\t":"");
			template = template.split("{postCanvas}").join(this.params.urlOnClick != ""?"\n\t\t</a>":"");
			var scriptUrls = this.getScriptUrls(dir,name).map(function(s) {
				return "<script src=\"" + s + "\"></script>";
			}).join("\n\t\t");
			template = template.split("{scriptUrls}").join(scriptUrls + (scriptUrls != ""?"\n\t\t":""));
			var inlineScripts = this.getInlineScripts().filter(function(s1) {
				return s1 != null && s1 != "";
			}).map(function(s2) {
				return s2.split("\n").join("\n\t\t\t");
			}).join("\n\t\t\t\n\t\t\t");
			template = template.split("{inlineScripts}").join(inlineScripts + (inlineScripts != ""?"\n\t\t\t\n\t\t\t":"") + this.getPlayerInitCode().split("\n").join("\n\t\t\t"));
			this.fileSystem.saveContent(file,template);
		}
		this.prepareLocalScriptFiles(dir);
	}
	,prepareLocalScriptFiles: function(dir) {
		var localScripts = [languages_HtmlGenerator.scriptUrls.createjs.local,languages_HtmlGenerator.scriptUrls.player.local];
		if(this.library.getMeshes().length > 0) localScripts.push(languages_HtmlGenerator.scriptUrls.threejs.local);
		var _g = 0;
		while(_g < localScripts.length) {
			var localScript = localScripts[_g];
			++_g;
			if(this.params.useLocalScripts) this.fileSystem.copy(this.supportDir + "/scripts/" + localScript,dir + "/bin/" + localScript); else this.fileSystem.remove(dir + "/bin/" + localScript);
		}
	}
	,getInlineScripts: function() {
		var r = [];
		r.push("var serializedLibrary = '" + this.serializedLibrary + "';");
		var $it0 = this.filterCodes.iterator();
		while( $it0.hasNext() ) {
			var filterCode = $it0.next();
			r.push(filterCode);
		}
		return r;
	}
	,getPlayerInitCode: function() {
		var r = [];
		if(this.documentProperties.useTextureAtlases && this.textureAtlases.iterator().hasNext()) {
			var textureAtlasJsonUrls = [];
			var $it0 = this.textureAtlases.keys();
			while( $it0.hasNext() ) {
				var textureAltasName = $it0.next();
				textureAtlasJsonUrls.push(this.getTextureAtlasJsonUrl(textureAltasName));
			}
			r.push("var loader = new createjs.LoadQueue(true);");
			r.push("loader.on('complete', run, this);");
			var $it1 = this.textureAtlases.keys();
			while( $it1.hasNext() ) {
				var textureAltasName1 = $it1.next();
				r.push("loader.loadFile('" + this.getTextureAtlasJsonUrl(textureAltasName1) + "', false);");
			}
			r.push("loader.load();");
			r.push("");
			r.push("function run()");
			r.push("{");
			if(this.params.forceSoftwareRenderer) r.push("nanofl.Mesh.forceSoftwareRenderer = true;");
			r.push("\t" + this.getBasePlayerInitCode("[ " + textureAtlasJsonUrls.map(function(url) {
				return "loader.getResult('" + url + "')";
			}).join(", ") + " ]"));
			r.push("}");
		} else r.push(this.getBasePlayerInitCode(null));
		return r.join("\n");
	}
	,getBasePlayerInitCode: function(textureAtlases) {
		return "nanofl.Player.init" + "(" + "document.getElementById(\"mainCanvas\")" + ", nanofl.DataTools.unserialize(serializedLibrary)" + ", " + this.documentProperties.framerate + ", '" + this.documentProperties.scaleMode + "'" + (textureAtlases != null?", " + textureAtlases:"") + ");";
	}
	,getScriptUrls: function(dir,name) {
		var r = [];
		r.push(this.params.useLocalScripts?"bin/" + languages_HtmlGenerator.scriptUrls.createjs.local:languages_HtmlGenerator.scriptUrls.createjs.remote);
		if(this.library.getMeshes().length > 0) r.push(this.params.useLocalScripts?"bin/" + languages_HtmlGenerator.scriptUrls.threejs.local:languages_HtmlGenerator.scriptUrls.threejs.remote);
		r.push(this.params.useLocalScripts?"bin/" + languages_HtmlGenerator.scriptUrls.player.local:languages_HtmlGenerator.scriptUrls.player.remote);
		return r;
	}
	,__class__: languages_HtmlGenerator
});
var languages_CodeGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	languages_HtmlGenerator.call(this,fileSystem,params,documentProperties,library,textureAtlases,supportDir);
};
languages_CodeGenerator.__name__ = true;
languages_CodeGenerator.__super__ = languages_HtmlGenerator;
languages_CodeGenerator.prototype = $extend(languages_HtmlGenerator.prototype,{
	generateLibraryAndFilters: function(dir,name) {
		this.fileSystem.saveContent(dir + "/bin/library.js","var serializedLibrary = '" + this.serializedLibrary + "';");
		if(this.filterCodes.iterator().hasNext()) this.fileSystem.saveContent(dir + "/bin/filters.js",Lambda.array(this.filterCodes).join("\n\n")); else this.fileSystem.remove(dir + "/bin/filters.js");
	}
	,capitalizeClassName: function(fullClassName) {
		var n = fullClassName.lastIndexOf(".");
		if(n < 0) return this.capitalize(fullClassName); else return fullClassName.substring(0,n + 1) + this.capitalize(fullClassName.substring(n + 1));
	}
	,capitalize: function(s) {
		return s.substring(0,1).toUpperCase() + s.substring(1);
	}
	,getInlineScripts: function() {
		return [];
	}
	,getScriptUrls: function(dir,name) {
		var r = languages_HtmlGenerator.prototype.getScriptUrls.call(this,dir,name);
		r.push("bin/library.js");
		if(this.filterCodes.iterator().hasNext()) r.push("bin/filters.js");
		return r;
	}
	,__class__: languages_CodeGenerator
});
var languages_HaxeGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	languages_CodeGenerator.call(this,fileSystem,params,documentProperties,library,textureAtlases,supportDir);
};
languages_HaxeGenerator.__name__ = true;
languages_HaxeGenerator.__super__ = languages_CodeGenerator;
languages_HaxeGenerator.prototype = $extend(languages_CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.fileSystem.remove(dir + "/gen/*");
		this.generateLibraryAndFilters(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages_CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/application.js"]);
	}
	,generateClasses: function(dir,name) {
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		if(linkedItems.length > 0) {
			this.fileSystem.copy(this.supportDir + "/languages/Haxe/files",dir);
			var baseMovieClipTemplate = this.fileSystem.getContent(this.supportDir + "/languages/Haxe/BaseMovieClip.hx");
			var movieClipTemplate = this.fileSystem.getContent(this.supportDir + "/languages/Haxe/MovieClip.hx");
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
				this.fileSystem.saveContent(dir + "/gen/base/" + linkedClass.split(".").join("/") + ".hx",baseMovieClipTemplate.split("{pack}").join("base" + (pack != ""?"." + pack:"")).split("{klass}").join(klass).split("{base}").join(item1.getDisplayObjectClassName()).split("{namePath}").join(item1.namePath));
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".hx";
				if(!this.fileSystem.exists(classFile)) this.fileSystem.saveContent(classFile,(pack != ""?"package " + pack + ";\n\n":"") + movieClipTemplate.split("{klass}").join(klass).split("{base}").join("base." + linkedClass));
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
			this.fileSystem.saveContent(classFilePath,text.join("\n"));
		} else this.fileSystem.remove(classFilePath);
	}
	,__class__: languages_HaxeGenerator
});
var languages_JavaScriptGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	languages_CodeGenerator.call(this,fileSystem,params,documentProperties,library,textureAtlases,supportDir);
};
languages_JavaScriptGenerator.__name__ = true;
languages_JavaScriptGenerator.__super__ = languages_CodeGenerator;
languages_JavaScriptGenerator.prototype = $extend(languages_CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibraryAndFilters(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateHtml(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages_CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(this.findFiles(dir,"gen",".js")).concat(this.findFiles(dir,"src",".js"));
	}
	,generateClasses: function(dir,name) {
		this.fileSystem.remove(dir + "/gen/base.js");
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
				text.push("base." + linkedClass + " = function() { " + item1.getDisplayObjectClassName() + ".call(this, nanofl.Player.library.getItem(\"" + item1.namePath + "\")); }");
				text.push("base." + linkedClass + ".prototype = $extend(" + item1.getDisplayObjectClassName() + ".prototype, {});");
				classes.push(text.join("\n"));
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".js";
				if(!this.fileSystem.exists(classFile)) {
					var text1 = [];
					this.generatePack(linkedClass,text1);
					text1.push("function " + linkedClass + "()");
					text1.push("{");
					text1.push("\tbase." + linkedClass + ".call(this);");
					text1.push("\t// add init code here");
					text1.push("}");
					text1.push("");
					text1.push(linkedClass + ".prototype = $extend(base." + linkedClass + ".prototype,");
					text1.push("{");
					text1.push("\tinit: function()");
					text1.push("\t{");
					text1.push("\t\t// your initialization code");
					text1.push("\t},");
					text1.push("");
					text1.push("\tonEnterFrame: function()");
					text1.push("\t{");
					text1.push("\t\t//your code for tick");
					text1.push("\t},");
					text1.push("");
					text1.push("\tonMouseDown: function(e)");
					text1.push("\t{");
					text1.push("\t\t// your code for mouse down");
					text1.push("\t}");
					text1.push("});");
					this.fileSystem.saveContent(classFile,text1.join("\n"));
				}
			}
			this.fileSystem.saveContent(dir + "/gen/base.js",classes.join("\n\n"));
		}
	}
	,generateSoundsClass: function(dir,name) {
		this.fileSystem.remove(dir + "/gen/Sounds.js");
		var sounds = this.library.getSounds();
		if(sounds.length > 0) {
			var text = [];
			text.push("function Sounds() {};");
			text.push("Sounds.prototype =");
			text.push("{");
			text.push(sounds.filter(function(sound) {
				return sound.linkage != "" && sound.linkage != null;
			}).map(function(sound1) {
				return sound1.linkage + ": function(options) { return Sound.play(\"" + sound1.linkage + "\", options);";
			}).join("\n\t,"));
			text.push("}");
			this.fileSystem.saveContent(dir + "/gen/Sounds.js",text.join("\n"));
		}
	}
	,findFiles: function(baseDir,relativePath,ext) {
		var r = [];
		this.fileSystem.findFiles(baseDir + "/" + relativePath,function(s) {
			if(s.length > ext.length && s.substring(s.length - ext.length) == ext) r.push(s);
		});
		return r.map(function(s1) {
			return s1.substring(baseDir.length + 1);
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
	,__class__: languages_JavaScriptGenerator
});
var languages_TypeScriptGenerator = function(fileSystem,params,documentProperties,library,textureAtlases,supportDir) {
	languages_CodeGenerator.call(this,fileSystem,params,documentProperties,library,textureAtlases,supportDir);
};
languages_TypeScriptGenerator.__name__ = true;
languages_TypeScriptGenerator.__super__ = languages_CodeGenerator;
languages_TypeScriptGenerator.prototype = $extend(languages_CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.generateLibraryAndFilters(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages_CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/application.js"]);
	}
	,generateClasses: function(dir,name) {
		var linkedItems = this.library.getInstancableItems().filter(function(item) {
			return item.linkedClass != "";
		});
		this.fileSystem.remove(dir + "/gen/*");
		if(linkedItems.length > 0) {
			this.fileSystem.copy(this.supportDir + "/languages/TypeScript/files",dir);
			var baseMovieClipTemplate = this.fileSystem.getContent(this.supportDir + "/languages/TypeScript/BaseMovieClip.ts");
			var movieClipTemplate = this.fileSystem.getContent(this.supportDir + "/languages/TypeScript/MovieClip.ts");
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
				this.fileSystem.saveContent(dir + "/gen/base/" + linkedClass.split(".").join("/") + ".ts",text);
				var classFile = dir + "/src/" + linkedClass.split(".").join("/") + ".ts";
				if(!this.fileSystem.exists(classFile)) {
					var text1 = "";
					if(pack != "") text1 += "module " + pack + "\n{\n";
					text1 += movieClipTemplate.split("{klass}").join(klass).split("{base}").join("base." + linkedClass);
					if(pack != "") text1 += "\n}";
					this.fileSystem.saveContent(classFile,text1);
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
			this.fileSystem.saveContent(classFilePath,text.join("\n"));
		} else this.fileSystem.remove(classFilePath);
	}
	,__class__: languages_TypeScriptGenerator
});
var stdlib_LambdaArray = function() { };
stdlib_LambdaArray.__name__ = true;
stdlib_LambdaArray.insertRange = function(arr,pos,range) {
	var _g = 0;
	while(_g < range.length) {
		var e = range[_g];
		++_g;
		var pos1 = pos++;
		arr.splice(pos1,0,e);
	}
};
stdlib_LambdaArray.extract = function(arr,f) {
	var r = [];
	var i = 0;
	while(i < arr.length) if(f(arr[i])) {
		r.push(arr[i]);
		arr.splice(i,1);
	} else i++;
	return r;
};
stdlib_LambdaArray.spliceEx = function(arr,pos,len,replacement) {
	var r = arr.splice(pos,len != null?len:arr.length - pos);
	if(replacement != null) stdlib_LambdaArray.insertRange(arr,pos,replacement);
	return r;
};
var stdlib_LambdaIterable = function() { };
stdlib_LambdaIterable.__name__ = true;
stdlib_LambdaIterable.findIndex = function(it,f) {
	var n = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return n;
		n++;
	}
	return -1;
};
stdlib_LambdaIterable.sorted = function(it,cmp) {
	var r = Lambda.array(it);
	r.sort(cmp != null?cmp:Reflect.compare);
	return r;
};
var stdlib_LambdaIterator = function() { };
stdlib_LambdaIterator.__name__ = true;
stdlib_LambdaIterator.array = function(it) {
	var r = [];
	while( it.hasNext() ) {
		var e = it.next();
		r.push(e);
	}
	return r;
};
stdlib_LambdaIterator.indexOf = function(it,elem) {
	var r = 0;
	while(it.hasNext()) {
		if(it.next() == elem) return r;
		r++;
	}
	return -1;
};
stdlib_LambdaIterator.map = function(it,conv) {
	var r = [];
	while( it.hasNext() ) {
		var e = it.next();
		r.push(conv(e));
	}
	return r;
};
stdlib_LambdaIterator.filter = function(it,pred) {
	var r = [];
	while( it.hasNext() ) {
		var e = it.next();
		if(pred(e)) r.push(e);
	}
	return r;
};
stdlib_LambdaIterator.exists = function(it,pred) {
	while( it.hasNext() ) {
		var e = it.next();
		if(pred(e)) return true;
	}
	return false;
};
stdlib_LambdaIterator.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		while( it.hasNext() ) {
			var _ = it.next();
			n++;
		}
	} else {
		while( it.hasNext() ) {
			var x = it.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
stdlib_LambdaIterator.findIndex = function(it,f) {
	var n = 0;
	while( it.hasNext() ) {
		var x = it.next();
		if(f(x)) return n;
		n++;
	}
	return -1;
};
stdlib_LambdaIterator.sorted = function(it,cmp) {
	var r = stdlib_LambdaIterator.array(it);
	r.sort(cmp != null?cmp:Reflect.compare);
	return r;
};
var stdlib_Std = function() { };
stdlib_Std.__name__ = true;
stdlib_Std.parseInt = function(x,defaultValue) {
	if(x != null) {
		if(new EReg("^\\s*[+-]?\\s*((?:0x[0-9a-fA-F]{1,7})|(?:\\d{1,9}))\\s*$","").match(x)) return Std.parseInt(x); else return defaultValue;
	} else return defaultValue;
};
stdlib_Std.parseFloat = function(x,defaultValue) {
	if(x == null) return defaultValue;
	if(new EReg("^\\s*[+-]?\\s*\\d{1,20}(?:[.]\\d+)?(?:e[+-]?\\d{1,20})?\\s*$","").match(x)) {
		var r = parseFloat(x);
		if(!isNaN(r)) return r; else return defaultValue;
	}
	return defaultValue;
};
stdlib_Std.bool = function(v) {
	return v != false && v != null && v != 0 && v != "" && v != "0" && (!(typeof(v) == "string") || (js_Boot.__cast(v , String)).toLowerCase() != "false" && (js_Boot.__cast(v , String)).toLowerCase() != "off" && (js_Boot.__cast(v , String)).toLowerCase() != "null");
};
stdlib_Std.parseValue = function(x) {
	var value = x;
	var valueLC;
	if(value != null) valueLC = value.toLowerCase(); else valueLC = null;
	var parsedValue;
	if(valueLC == "true") value = true; else if(valueLC == "false") value = false; else if(valueLC == "null") value = null; else if((parsedValue = stdlib_Std.parseInt(value)) != null) value = parsedValue; else if((parsedValue = stdlib_Std.parseFloat(value)) != null) value = parsedValue;
	return value;
};
stdlib_Std.hash = function(obj) {
	var r = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		var value = Reflect.field(obj,key);
		r.set(key,value);
	}
	return r;
};
stdlib_Std.min = function(a,b) {
	if(a < b) return a; else return b;
};
stdlib_Std.max = function(a,b) {
	if(a > b) return a; else return b;
};
stdlib_Std.abs = function(x) {
	if(x >= 0) return x; else return -x;
};
stdlib_Std.sign = function(n) {
	if(n > 0) return 1; else if(n < 0) return -1; else return 0;
};
stdlib_Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
stdlib_Std.instance = function(value,c) {
	return (value instanceof c)?value:null;
};
stdlib_Std.string = function(s) {
	return Std.string(s);
};
stdlib_Std["int"] = function(x) {
	return x | 0;
};
stdlib_Std.random = function(x) {
	return Std.random(x);
};
var stdlib_StringTools = function() { };
stdlib_StringTools.__name__ = true;
stdlib_StringTools.ltrim = function(s,chars) {
	if(chars == null) return StringTools.ltrim(s);
	while(s.length > 0 && chars.indexOf(HxOverrides.substr(s,0,1)) >= 0) s = HxOverrides.substr(s,1,null);
	return s;
};
stdlib_StringTools.rtrim = function(s,chars) {
	if(chars == null) return StringTools.rtrim(s);
	while(s.length > 0 && chars.indexOf(HxOverrides.substr(s,s.length - 1,1)) >= 0) s = HxOverrides.substr(s,0,s.length - 1);
	return s;
};
stdlib_StringTools.trim = function(s,chars) {
	if(chars == null) return StringTools.trim(s);
	return stdlib_StringTools.rtrim(stdlib_StringTools.ltrim(s,chars),chars);
};
stdlib_StringTools.hexdec = function(s) {
	return stdlib_Std.parseInt("0x" + s);
};
stdlib_StringTools.addcslashes = function(s) {
	return new EReg("['\"\t\r\n\\\\]","g").map(s,function(re) {
		return "\\" + re.matched(0);
	});
};
stdlib_StringTools.stripTags = function(str,allowedTags) {
	if(allowedTags == null) allowedTags = "";
	var allowedTagsArray = [];
	if(allowedTags != "") {
		var re1 = new EReg("[a-zA-Z0-9]+","i");
		var pos = 0;
		while(re1.matchSub(allowedTags,pos)) {
			allowedTagsArray.push(re1.matched(0));
			pos = re1.matchedPos().pos + re1.matchedPos().len;
		}
	}
	var matches = [];
	var re = new EReg("</?[\\S][^>]*>","g");
	str = re.map(str,function(_) {
		var html = re.matched(0);
		var allowed = false;
		if(allowedTagsArray.length > 0) {
			var htmlLC = html.toLowerCase();
			var _g = 0;
			while(_g < allowedTagsArray.length) {
				var allowedTag = allowedTagsArray[_g];
				++_g;
				if(StringTools.startsWith(htmlLC,"<" + allowedTag + ">") || StringTools.startsWith(htmlLC,"<" + allowedTag + " ") || StringTools.startsWith(htmlLC,"</" + allowedTag)) {
					allowed = true;
					break;
				}
			}
		}
		if(allowed) return html; else return "";
	});
	return str;
};
stdlib_StringTools.regexEscape = function(s) {
	return new EReg("([\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|])","g").replace(s,"\\$1");
};
stdlib_StringTools.jsonEscape = function(s) {
	if(s == null) return "null";
	var r = new stdlib_Utf8(s.length + (s.length / 5 | 0));
	r.__b += "\"";
	haxe_Utf8.iter(s,function(c) {
		switch(c) {
		case 92:
			r.__b += "\\";
			r.__b += "\\";
			break;
		case 34:
			r.__b += "\\";
			r.__b += "\"";
			break;
		case 9:
			r.__b += "\\";
			r.__b += "t";
			break;
		case 10:
			r.__b += "\\";
			r.__b += "n";
			break;
		case 13:
			r.__b += "\\";
			r.__b += "r";
			break;
		default:
			if(c < 32) {
				r.__b += "\\";
				r.__b += "u";
				var t = StringTools.hex(c,4);
				r.addChar(t.charCodeAt(0));
				r.addChar(t.charCodeAt(1));
				r.addChar(t.charCodeAt(2));
				r.addChar(t.charCodeAt(3));
			} else r.__b += String.fromCharCode(c);
		}
	});
	r.__b += "\"";
	return r.__b;
};
stdlib_StringTools.isEmpty = function(s) {
	return s == null || s == "";
};
stdlib_StringTools.capitalize = function(s) {
	if(stdlib_StringTools.isEmpty(s)) return s; else return HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,null);
};
stdlib_StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
stdlib_StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
stdlib_StringTools.htmlEscape = function(s,quotes) {
	return StringTools.htmlEscape(s,quotes);
};
stdlib_StringTools.htmlUnescape = function(s) {
	return StringTools.htmlUnescape(s);
};
stdlib_StringTools.startsWith = function(s,start) {
	return StringTools.startsWith(s,start);
};
stdlib_StringTools.endsWith = function(s,end) {
	return StringTools.endsWith(s,end);
};
stdlib_StringTools.isSpace = function(s,pos) {
	return StringTools.isSpace(s,pos);
};
stdlib_StringTools.lpad = function(s,c,l) {
	return StringTools.lpad(s,c,l);
};
stdlib_StringTools.rpad = function(s,c,l) {
	return StringTools.rpad(s,c,l);
};
stdlib_StringTools.replace = function(s,sub,by) {
	return StringTools.replace(s,sub,by);
};
stdlib_StringTools.hex = function(n,digits) {
	return StringTools.hex(n,digits);
};
stdlib_StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
stdlib_StringTools.isEof = function(c) {
	return c != c;
};
var stdlib_Utf8 = function(size) {
	haxe_Utf8.call(this,size);
};
stdlib_Utf8.__name__ = true;
stdlib_Utf8.replace = function(s,from,to) {
	var codes = [];
	haxe_Utf8.iter(s,function(c) {
		codes.push(c);
	});
	var r = new stdlib_Utf8();
	var len = from.length;
	if(codes.length < len) return s;
	var _g1 = 0;
	var _g = codes.length - len + 1;
	while(_g1 < _g) {
		var i = [_g1++];
		var found = [true];
		var j = [0];
		haxe_Utf8.iter(from,(function(j,found,i) {
			return function(cc) {
				if(found[0]) {
					if(codes[i[0] + j[0]] != cc) found[0] = false;
					j[0]++;
				}
			};
		})(j,found,i));
		if(found[0]) r.addString(to); else r.__b += String.fromCharCode(codes[i[0]]);
	}
	var _g11 = codes.length - len + 1;
	var _g2 = codes.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		r.__b += String.fromCharCode(codes[i1]);
	}
	return r.__b;
};
stdlib_Utf8.compactSpaces = function(s) {
	var r = new stdlib_Utf8();
	var prevSpace = false;
	haxe_Utf8.iter(s,function(c) {
		if(c == 32 || c == 13 || c == 10 || c == 9) {
			if(!prevSpace) {
				r.__b += " ";
				prevSpace = true;
			}
		} else {
			r.__b += String.fromCharCode(c);
			prevSpace = false;
		}
	});
	return r.__b;
};
stdlib_Utf8.htmlUnescape = function(s) {
	var r = new stdlib_Utf8();
	var $escape = null;
	haxe_Utf8.iter(s,function(c) {
		if($escape != null) {
			if(c == 59) {
				var chr = stdlib_Utf8.htmlUnescapeChar($escape);
				if(chr != null) r.__b += String.fromCharCode(chr);
				$escape = null;
			} else $escape += String.fromCharCode(c);
		} else if(c == 38) $escape = ""; else r.__b += String.fromCharCode(c);
	});
	return r.__b;
};
stdlib_Utf8.htmlEscape = function(utf8Str,chars) {
	if(chars == null) chars = "";
	chars = "&<>" + chars;
	var r = new stdlib_Utf8();
	haxe_Utf8.iter(utf8Str,function(c) {
		var s;
		var this1 = stdlib_Utf8.get_htmlEscapeMap();
		s = this1.get(c);
		if(s != null && c >= 0 && c <= 255 && chars.indexOf(String.fromCharCode(c)) >= 0) r.addString(s); else r.__b += String.fromCharCode(c);
	});
	return r.__b;
};
stdlib_Utf8.htmlUnescapeChar = function(escape) {
	if(StringTools.startsWith(escape,"#x")) return stdlib_Std.parseInt("0x" + HxOverrides.substr(escape,2,null)); else if(StringTools.startsWith(escape,"#")) return stdlib_Std.parseInt(HxOverrides.substr(escape,1,null)); else {
		var r;
		var this1 = stdlib_Utf8.get_htmlUnescapeMap();
		r = this1.get(escape);
		if(r != null) return r;
	}
	console.log("Unknow escape sequence: " + escape);
	return null;
};
stdlib_Utf8.get_htmlEscapeMap = function() {
	if(stdlib_Utf8.htmlEscapeMap == null) {
		var _g = new haxe_ds_IntMap();
		_g.h[32] = "&nbsp;";
		_g.h[38] = "&amp;";
		_g.h[60] = "&lt;";
		_g.h[62] = "&gt;";
		_g.h[34] = "&quot;";
		_g.h[39] = "&apos;";
		_g.h[13] = "&#xD;";
		_g.h[10] = "&#xA;";
		stdlib_Utf8.htmlEscapeMap = _g;
	}
	return stdlib_Utf8.htmlEscapeMap;
};
stdlib_Utf8.get_htmlUnescapeMap = function() {
	if(stdlib_Utf8.htmlUnescapeMap == null) {
		var _g = new haxe_ds_StringMap();
		if(__map_reserved.nbsp != null) _g.setReserved("nbsp",32); else _g.h["nbsp"] = 32;
		if(__map_reserved.amp != null) _g.setReserved("amp",38); else _g.h["amp"] = 38;
		if(__map_reserved.lt != null) _g.setReserved("lt",60); else _g.h["lt"] = 60;
		if(__map_reserved.gt != null) _g.setReserved("gt",62); else _g.h["gt"] = 62;
		if(__map_reserved.quot != null) _g.setReserved("quot",34); else _g.h["quot"] = 34;
		if(__map_reserved.apos != null) _g.setReserved("apos",39); else _g.h["apos"] = 39;
		if(__map_reserved.euro != null) _g.setReserved("euro",8364); else _g.h["euro"] = 8364;
		if(__map_reserved.iexcl != null) _g.setReserved("iexcl",161); else _g.h["iexcl"] = 161;
		if(__map_reserved.cent != null) _g.setReserved("cent",162); else _g.h["cent"] = 162;
		if(__map_reserved.pound != null) _g.setReserved("pound",163); else _g.h["pound"] = 163;
		if(__map_reserved.curren != null) _g.setReserved("curren",164); else _g.h["curren"] = 164;
		if(__map_reserved.yen != null) _g.setReserved("yen",165); else _g.h["yen"] = 165;
		if(__map_reserved.brvbar != null) _g.setReserved("brvbar",166); else _g.h["brvbar"] = 166;
		if(__map_reserved.sect != null) _g.setReserved("sect",167); else _g.h["sect"] = 167;
		if(__map_reserved.uml != null) _g.setReserved("uml",168); else _g.h["uml"] = 168;
		if(__map_reserved.copy != null) _g.setReserved("copy",169); else _g.h["copy"] = 169;
		if(__map_reserved.ordf != null) _g.setReserved("ordf",170); else _g.h["ordf"] = 170;
		if(__map_reserved.not != null) _g.setReserved("not",172); else _g.h["not"] = 172;
		if(__map_reserved.shy != null) _g.setReserved("shy",173); else _g.h["shy"] = 173;
		if(__map_reserved.reg != null) _g.setReserved("reg",174); else _g.h["reg"] = 174;
		if(__map_reserved.macr != null) _g.setReserved("macr",175); else _g.h["macr"] = 175;
		if(__map_reserved.deg != null) _g.setReserved("deg",176); else _g.h["deg"] = 176;
		if(__map_reserved.plusmn != null) _g.setReserved("plusmn",177); else _g.h["plusmn"] = 177;
		if(__map_reserved.sup2 != null) _g.setReserved("sup2",178); else _g.h["sup2"] = 178;
		if(__map_reserved.sup3 != null) _g.setReserved("sup3",179); else _g.h["sup3"] = 179;
		if(__map_reserved.acute != null) _g.setReserved("acute",180); else _g.h["acute"] = 180;
		if(__map_reserved.micro != null) _g.setReserved("micro",181); else _g.h["micro"] = 181;
		if(__map_reserved.para != null) _g.setReserved("para",182); else _g.h["para"] = 182;
		if(__map_reserved.middot != null) _g.setReserved("middot",183); else _g.h["middot"] = 183;
		if(__map_reserved.cedil != null) _g.setReserved("cedil",184); else _g.h["cedil"] = 184;
		if(__map_reserved.sup1 != null) _g.setReserved("sup1",185); else _g.h["sup1"] = 185;
		if(__map_reserved.ordm != null) _g.setReserved("ordm",186); else _g.h["ordm"] = 186;
		if(__map_reserved.raquo != null) _g.setReserved("raquo",187); else _g.h["raquo"] = 187;
		if(__map_reserved.frac14 != null) _g.setReserved("frac14",188); else _g.h["frac14"] = 188;
		if(__map_reserved.frac12 != null) _g.setReserved("frac12",189); else _g.h["frac12"] = 189;
		if(__map_reserved.frac34 != null) _g.setReserved("frac34",190); else _g.h["frac34"] = 190;
		if(__map_reserved.iquest != null) _g.setReserved("iquest",191); else _g.h["iquest"] = 191;
		if(__map_reserved.Agrave != null) _g.setReserved("Agrave",192); else _g.h["Agrave"] = 192;
		if(__map_reserved.Aacute != null) _g.setReserved("Aacute",193); else _g.h["Aacute"] = 193;
		if(__map_reserved.Acirc != null) _g.setReserved("Acirc",194); else _g.h["Acirc"] = 194;
		if(__map_reserved.Atilde != null) _g.setReserved("Atilde",195); else _g.h["Atilde"] = 195;
		if(__map_reserved.Auml != null) _g.setReserved("Auml",196); else _g.h["Auml"] = 196;
		if(__map_reserved.Aring != null) _g.setReserved("Aring",197); else _g.h["Aring"] = 197;
		if(__map_reserved.AElig != null) _g.setReserved("AElig",198); else _g.h["AElig"] = 198;
		if(__map_reserved.Ccedil != null) _g.setReserved("Ccedil",199); else _g.h["Ccedil"] = 199;
		if(__map_reserved.Egrave != null) _g.setReserved("Egrave",200); else _g.h["Egrave"] = 200;
		if(__map_reserved.Eacute != null) _g.setReserved("Eacute",201); else _g.h["Eacute"] = 201;
		if(__map_reserved.Ecirc != null) _g.setReserved("Ecirc",202); else _g.h["Ecirc"] = 202;
		if(__map_reserved.Euml != null) _g.setReserved("Euml",203); else _g.h["Euml"] = 203;
		if(__map_reserved.Igrave != null) _g.setReserved("Igrave",204); else _g.h["Igrave"] = 204;
		if(__map_reserved.Iacute != null) _g.setReserved("Iacute",205); else _g.h["Iacute"] = 205;
		if(__map_reserved.Icirc != null) _g.setReserved("Icirc",206); else _g.h["Icirc"] = 206;
		if(__map_reserved.Iuml != null) _g.setReserved("Iuml",207); else _g.h["Iuml"] = 207;
		if(__map_reserved.ETH != null) _g.setReserved("ETH",208); else _g.h["ETH"] = 208;
		if(__map_reserved.Ntilde != null) _g.setReserved("Ntilde",209); else _g.h["Ntilde"] = 209;
		if(__map_reserved.Ograve != null) _g.setReserved("Ograve",210); else _g.h["Ograve"] = 210;
		if(__map_reserved.Oacute != null) _g.setReserved("Oacute",211); else _g.h["Oacute"] = 211;
		if(__map_reserved.Ocirc != null) _g.setReserved("Ocirc",212); else _g.h["Ocirc"] = 212;
		if(__map_reserved.Otilde != null) _g.setReserved("Otilde",213); else _g.h["Otilde"] = 213;
		if(__map_reserved.Ouml != null) _g.setReserved("Ouml",214); else _g.h["Ouml"] = 214;
		if(__map_reserved.times != null) _g.setReserved("times",215); else _g.h["times"] = 215;
		if(__map_reserved.Oslash != null) _g.setReserved("Oslash",216); else _g.h["Oslash"] = 216;
		if(__map_reserved.Ugrave != null) _g.setReserved("Ugrave",217); else _g.h["Ugrave"] = 217;
		if(__map_reserved.Uacute != null) _g.setReserved("Uacute",218); else _g.h["Uacute"] = 218;
		if(__map_reserved.Ucirc != null) _g.setReserved("Ucirc",219); else _g.h["Ucirc"] = 219;
		if(__map_reserved.Uuml != null) _g.setReserved("Uuml",220); else _g.h["Uuml"] = 220;
		if(__map_reserved.Yacute != null) _g.setReserved("Yacute",221); else _g.h["Yacute"] = 221;
		if(__map_reserved.THORN != null) _g.setReserved("THORN",222); else _g.h["THORN"] = 222;
		if(__map_reserved.szlig != null) _g.setReserved("szlig",223); else _g.h["szlig"] = 223;
		if(__map_reserved.agrave != null) _g.setReserved("agrave",224); else _g.h["agrave"] = 224;
		if(__map_reserved.aacute != null) _g.setReserved("aacute",225); else _g.h["aacute"] = 225;
		if(__map_reserved.acirc != null) _g.setReserved("acirc",226); else _g.h["acirc"] = 226;
		if(__map_reserved.atilde != null) _g.setReserved("atilde",227); else _g.h["atilde"] = 227;
		if(__map_reserved.auml != null) _g.setReserved("auml",228); else _g.h["auml"] = 228;
		if(__map_reserved.aring != null) _g.setReserved("aring",229); else _g.h["aring"] = 229;
		if(__map_reserved.aelig != null) _g.setReserved("aelig",230); else _g.h["aelig"] = 230;
		if(__map_reserved.ccedil != null) _g.setReserved("ccedil",231); else _g.h["ccedil"] = 231;
		if(__map_reserved.egrave != null) _g.setReserved("egrave",232); else _g.h["egrave"] = 232;
		if(__map_reserved.eacute != null) _g.setReserved("eacute",233); else _g.h["eacute"] = 233;
		if(__map_reserved.ecirc != null) _g.setReserved("ecirc",234); else _g.h["ecirc"] = 234;
		if(__map_reserved.euml != null) _g.setReserved("euml",235); else _g.h["euml"] = 235;
		if(__map_reserved.igrave != null) _g.setReserved("igrave",236); else _g.h["igrave"] = 236;
		if(__map_reserved.iacute != null) _g.setReserved("iacute",237); else _g.h["iacute"] = 237;
		if(__map_reserved.icirc != null) _g.setReserved("icirc",238); else _g.h["icirc"] = 238;
		if(__map_reserved.iuml != null) _g.setReserved("iuml",239); else _g.h["iuml"] = 239;
		if(__map_reserved.eth != null) _g.setReserved("eth",240); else _g.h["eth"] = 240;
		if(__map_reserved.ntilde != null) _g.setReserved("ntilde",241); else _g.h["ntilde"] = 241;
		if(__map_reserved.ograve != null) _g.setReserved("ograve",242); else _g.h["ograve"] = 242;
		if(__map_reserved.oacute != null) _g.setReserved("oacute",243); else _g.h["oacute"] = 243;
		if(__map_reserved.ocirc != null) _g.setReserved("ocirc",244); else _g.h["ocirc"] = 244;
		if(__map_reserved.otilde != null) _g.setReserved("otilde",245); else _g.h["otilde"] = 245;
		if(__map_reserved.ouml != null) _g.setReserved("ouml",246); else _g.h["ouml"] = 246;
		if(__map_reserved.divide != null) _g.setReserved("divide",247); else _g.h["divide"] = 247;
		if(__map_reserved.oslash != null) _g.setReserved("oslash",248); else _g.h["oslash"] = 248;
		if(__map_reserved.ugrave != null) _g.setReserved("ugrave",249); else _g.h["ugrave"] = 249;
		if(__map_reserved.uacute != null) _g.setReserved("uacute",250); else _g.h["uacute"] = 250;
		if(__map_reserved.ucirc != null) _g.setReserved("ucirc",251); else _g.h["ucirc"] = 251;
		if(__map_reserved.uuml != null) _g.setReserved("uuml",252); else _g.h["uuml"] = 252;
		if(__map_reserved.yacute != null) _g.setReserved("yacute",253); else _g.h["yacute"] = 253;
		if(__map_reserved.thorn != null) _g.setReserved("thorn",254); else _g.h["thorn"] = 254;
		stdlib_Utf8.htmlUnescapeMap = _g;
	}
	return stdlib_Utf8.htmlUnescapeMap;
};
stdlib_Utf8.iter = function(s,chars) {
	haxe_Utf8.iter(s,chars);
	return;
};
stdlib_Utf8.encode = function(s) {
	return haxe_Utf8.encode(s);
};
stdlib_Utf8.decode = function(s) {
	return haxe_Utf8.decode(s);
};
stdlib_Utf8.charCodeAt = function(s,index) {
	return HxOverrides.cca(s,index);
};
stdlib_Utf8.validate = function(s) {
	return true;
};
stdlib_Utf8.$length = function(s) {
	return s.length;
};
stdlib_Utf8.compare = function(a,b) {
	return haxe_Utf8.compare(a,b);
};
stdlib_Utf8.sub = function(s,pos,len) {
	return HxOverrides.substr(s,pos,len);
};
stdlib_Utf8.__super__ = haxe_Utf8;
stdlib_Utf8.prototype = $extend(haxe_Utf8.prototype,{
	addString: function(s) {
		var _g = this;
		haxe_Utf8.iter(s,function(c) {
			_g.__b += String.fromCharCode(c);
		});
	}
	,__class__: stdlib_Utf8
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
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
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
languages_HtmlGenerator.scriptUrls = { createjs : { local : "createjs-0.8.0.js", remote : "http://code.createjs.com/createjs-2014.12.12.combined.js"}, threejs : { local : "three-r73.js", remote : "http://cdnjs.cloudflare.com/ajax/libs/three.js/r73/three.min.js"}, player : { local : "nanofl-" + nanofl.engine.Version.player + ".js", remote : "http://player.nanofl.com/nanofl-" + nanofl.engine.Version.player + ".js"}};
CreateJSGeneratorPlugin.main();
})(typeof console != "undefined" ? console : {log:function(){}});
