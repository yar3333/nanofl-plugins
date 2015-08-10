(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
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
			generator = new languages_HtmlGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "JavaScript":
			generator = new languages_JavaScriptGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TypeScript":
			generator = new languages_TypeScriptGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "Haxe":
			generator = new languages_HaxeGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
			break;
		case "TextureAtlas":
			generator = new languages_TextureAtlasGenerator(fileApi,documentProperties,library,textureAtlases,supportDir);
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
				generator1 = new ides_FlashDevelopGenerator(fileApi,supportDir);
				break;
			case "MsVisualStudio2013":
				generator1 = new ides_MsVisualStudio2013Generator(fileApi,supportDir);
				break;
			default:
				throw new js__$Boot_HaxeError("Unsupported IDE '" + languageAndIde[1] + "'.");
				generator1 = null;
			}
			generator1.generate(languageAndIde[0],dir,name);
		}
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
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
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
var haxe_ds_StringMap = function() { };
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
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
var ides_BaseIdeGenerator = function(fileApi,supportDir) {
	this.fileApi = fileApi;
	this.supportDir = supportDir;
};
ides_BaseIdeGenerator.__name__ = true;
ides_BaseIdeGenerator.prototype = {
	generate: function(language,dir,name) {
	}
	,__class__: ides_BaseIdeGenerator
};
var ides_FlashDevelopGenerator = function(fileApi,supportDir) {
	ides_BaseIdeGenerator.call(this,fileApi,supportDir);
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
		if(!this.fileApi.exists(destProjectFile)) {
			var template = this.fileApi.getContent(this.supportDir + "/ides/FlashDevelop/" + language + "/project" + ext);
			template = template.split("{name}").join(name);
			this.fileApi.saveContent(destProjectFile,template);
			this.fileApi.copy(this.supportDir + "/ides/FlashDevelop/" + language + "/files",dir);
		}
	}
	,__class__: ides_FlashDevelopGenerator
});
var ides_MsVisualStudio2013Generator = function(fileApi,supportDir) {
	ides_BaseIdeGenerator.call(this,fileApi,supportDir);
};
ides_MsVisualStudio2013Generator.__name__ = true;
ides_MsVisualStudio2013Generator.__super__ = ides_BaseIdeGenerator;
ides_MsVisualStudio2013Generator.prototype = $extend(ides_BaseIdeGenerator.prototype,{
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
	,__class__: ides_MsVisualStudio2013Generator
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
var languages_BaseGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	this.fileApi = fileApi;
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
var languages_TextureAtlasGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages_BaseGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
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
			this.fileApi.saveBinary(dir + "/" + imageUrl,textureAtlas.imagePng);
			var spriteSheetJsons = [];
			var namePaths = Reflect.fields(textureAtlas.itemFrames);
			namePaths.sort(Reflect.compare);
			var _g = 0;
			while(_g < namePaths.length) {
				var namePath = namePaths[_g];
				++_g;
				spriteSheetJsons.push("\t'" + namePath + "': { 'images':[ \"" + imageUrl + "\" ], 'frames':[ " + this.getSpriteSheetFrames(textureAtlas,namePath).join(", ") + " ] }");
			}
			this.fileApi.saveContent(dir + "/" + this.getTextureAtlasJsonUrl(textureAtlasName),"{\n" + spriteSheetJsons.join(",\n") + "\n}");
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
var languages_HtmlGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages_TextureAtlasGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
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
		if(this.fileApi.exists(file)) {
			var text = this.fileApi.getContent(file);
			if(text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		} else defines.push("ALLOW_REGENERATION");
		if(HxOverrides.indexOf(defines,"ALLOW_REGENERATION",0) >= 0) {
			var template = this.fileApi.getContent(this.supportDir + "/languages/project.html");
			template = template.split("{defines}").join(defines.map(function(s3) {
				return "<!--" + s3 + "-->\n";
			}).join(""));
			template = template.split("{title}").join(this.documentProperties.title != ""?this.documentProperties.title:name);
			template = template.split("{width}").join(this.documentProperties.width);
			template = template.split("{height}").join(this.documentProperties.height);
			template = template.split("{backgroundColor}").join(this.documentProperties.backgroundColor);
			template = template.split("{createjsUrl}").join(nanofl.engine.VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(nanofl.engine.VersionInfo.playerUrl);
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
			this.fileApi.saveContent(file,template);
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
		return [];
	}
	,__class__: languages_HtmlGenerator
});
var languages_CodeGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages_HtmlGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages_CodeGenerator.__name__ = true;
languages_CodeGenerator.__super__ = languages_HtmlGenerator;
languages_CodeGenerator.prototype = $extend(languages_HtmlGenerator.prototype,{
	generateLibraryAndFilters: function(dir,name) {
		this.fileApi.saveContent(dir + "/bin/library.js","var serializedLibrary = '" + this.serializedLibrary + "';");
		if(this.filterCodes.iterator().hasNext()) this.fileApi.saveContent(dir + "/bin/filters.js",Lambda.array(this.filterCodes).join("\n\n")); else this.fileApi.remove(dir + "/bin/filters.js");
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
var languages_HaxeGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages_CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
};
languages_HaxeGenerator.__name__ = true;
languages_HaxeGenerator.__super__ = languages_CodeGenerator;
languages_HaxeGenerator.prototype = $extend(languages_CodeGenerator.prototype,{
	generate: function(dir,name) {
		this.fileApi.remove(dir + "/gen/*");
		this.generateLibraryAndFilters(dir,name);
		this.generateHtml(dir,name);
		this.generateClasses(dir,name);
		this.generateSoundsClass(dir,name);
		this.generateTextureAtlases(dir);
	}
	,getScriptUrls: function(dir,name) {
		return languages_CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/" + name + ".js"]);
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
	,__class__: languages_HaxeGenerator
});
var languages_JavaScriptGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages_CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
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
		return languages_CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(this.findFiles(dir + "/gen",".js")).concat(this.findFiles(dir + "/src",".js"));
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
	,__class__: languages_JavaScriptGenerator
});
var languages_TypeScriptGenerator = function(fileApi,documentProperties,library,textureAtlases,supportDir) {
	languages_CodeGenerator.call(this,fileApi,documentProperties,library,textureAtlases,supportDir);
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
		return languages_CodeGenerator.prototype.getScriptUrls.call(this,dir,name).concat(["bin/" + name + ".js"]);
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
	,__class__: languages_TypeScriptGenerator
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
CreateJSGeneratorPlugin.main();
})(typeof console != "undefined" ? console : {log:function(){}});
