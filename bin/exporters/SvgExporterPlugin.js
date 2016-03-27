(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
var Slambda = function() { };
Slambda.__name__ = true;
var Slambda1 = function() { };
Slambda1.__name__ = true;
var Slambda2 = function() { };
Slambda2.__name__ = true;
var Slambda3 = function() { };
Slambda3.__name__ = true;
var Slambda4 = function() { };
Slambda4.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var SvgExporterPlugin = function() {
	this.properties = null;
	this.fileFilterExtensions = ["svg"];
	this.fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	this.menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/QaKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lIoqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkNAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2Nu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMmDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXxCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRgT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8dtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gHue+ALxPHGYEAAAAASUVORK5CYII=)";
	this.menuItemName = "Scalable Vector Graphics (*.svg)";
	this.name = "SvgExporter";
};
SvgExporterPlugin.__name__ = true;
SvgExporterPlugin.__interfaces__ = [nanofl.ide.plugins.IExporterPlugin];
SvgExporterPlugin.main = function() {
	nanofl.engine.Plugins.registerExporter(new SvgExporterPlugin());
};
SvgExporterPlugin.prototype = {
	exportDocument: function(api,params,srcFilePath,destFilePath,documentProperties,library) {
		nanofl.engine.Debug.console.log("Plugin.exportDocument " + srcFilePath + " => " + destFilePath);
		var xml = new htmlparser.XmlBuilder();
		xml.begin("svg").attr("xmlns","http://www.w3.org/2000/svg").attr("width",documentProperties.width).attr("height",documentProperties.height).attr("xmlns:xlink","http://www.w3.org/1999/xlink");
		new svgexporter_SvgExporter(library)["export"](xml);
		xml.end();
		api.fileSystem.saveContent(destFilePath,xml.toString());
		return true;
	}
	,__class__: SvgExporterPlugin
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
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() { };
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
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
var svgexporter_Gradient = function(tag,colors,ratios,attributes) {
	this.tag = tag;
	this.colors = colors;
	this.ratios = ratios;
	this.attributes = attributes;
};
svgexporter_Gradient.__name__ = true;
svgexporter_Gradient.fromStroke = function(stroke) {
	if(js_Boot.__instanceof(stroke,nanofl.engine.strokes.LinearStroke)) {
		var data = stroke;
		return svgexporter_Gradient.createLinear(data.colors,data.ratios,data.x0,data.y0,data.x1,data.y1);
	} else if(js_Boot.__instanceof(stroke,nanofl.engine.strokes.RadialStroke)) {
		var data1 = stroke;
		return svgexporter_Gradient.createRadial(data1.colors,data1.ratios,data1.cx,data1.cy,data1.r,data1.fx,data1.fy);
	} else if(js_Boot.__instanceof(stroke,nanofl.engine.strokes.BitmapStroke)) nanofl.engine.Debug.console.warn("BitmapStroke is not supported.");
	return null;
};
svgexporter_Gradient.fromFill = function(fill) {
	if(js_Boot.__instanceof(fill,nanofl.engine.fills.LinearFill)) {
		var data = fill;
		return svgexporter_Gradient.createLinear(data.colors,data.ratios,data.x0,data.y0,data.x1,data.y1);
	} else if(js_Boot.__instanceof(fill,nanofl.engine.fills.RadialFill)) {
		var data1 = fill;
		return svgexporter_Gradient.createRadial(data1.colors,data1.ratios,data1.cx,data1.cy,data1.r,data1.fx,data1.fy);
	} else if(js_Boot.__instanceof(fill,nanofl.engine.fills.BitmapFill)) nanofl.engine.Debug.console.warn("BitmapFill is not supported.");
	return null;
};
svgexporter_Gradient.createLinear = function(colors,ratios,x0,y0,x1,y1) {
	return new svgexporter_Gradient("linearGradient",colors,ratios,[{ name : "x1", value : x0},{ name : "y1", value : y0},{ name : "x2", value : x1},{ name : "y2", value : y1}]);
};
svgexporter_Gradient.createRadial = function(colors,ratios,cx,cy,r,fx,fy) {
	return new svgexporter_Gradient("radialGradient",colors,ratios,[{ name : "cx", value : cx},{ name : "cy", value : cy},{ name : "r", value : r},{ name : "fx", value : fx},{ name : "fy", value : fy}]);
};
svgexporter_Gradient.prototype = {
	equ: function(g) {
		if(g == this) return true;
		if(g.tag != this.tag) return false;
		if(g.colors.length != this.colors.length) return false;
		if(g.attributes.length != this.attributes.length) return false;
		var _g1 = 0;
		var _g = this.colors.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(g.colors[i] != this.colors[i]) return false;
			if(g.ratios[i] != this.ratios[i]) return false;
		}
		var _g11 = 0;
		var _g2 = this.attributes.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(g.attributes[i1].name != this.attributes[i1].name) return false;
			if(g.attributes[i1].value != this.attributes[i1].value) return false;
		}
		return true;
	}
	,write: function(id,xml) {
		xml.begin(this.tag);
		xml.attr("id","grad" + id);
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			xml.attr(a.name,a.value);
		}
		xml.attr("gradientUnits","userSpaceOnUse");
		var _g11 = 0;
		var _g2 = this.colors.length;
		while(_g11 < _g2) {
			var i = _g11++;
			xml.begin("stop");
			xml.attr("stop-color",this.colors[i]);
			xml.attr("offset",this.ratios[i]);
			xml.end();
		}
		xml.end();
	}
	,__class__: svgexporter_Gradient
};
var svgexporter_ShapeExporter = function() {
	this.gradients = [];
	this.fills = [];
	this.strokes = [];
};
svgexporter_ShapeExporter.__name__ = true;
svgexporter_ShapeExporter.prototype = {
	exportGradients: function(shape,xml) {
		var _g = 0;
		var _g1 = shape.edges;
		while(_g < _g1.length) {
			var edge = [_g1[_g]];
			++_g;
			if(!(((function() {
				return function(_e) {
					return (function() {
						return function(f) {
							return Lambda.exists(_e,f);
						};
					})();
				};
			})())(this.strokes))((function(edge) {
				return function(_) {
					return _.equ(edge[0].stroke);
				};
			})(edge))) {
				var g = [svgexporter_Gradient.fromStroke(edge[0].stroke)];
				if(g[0] != null) {
					if(!(((function() {
						return function(_e1) {
							return (function() {
								return function(f1) {
									return Lambda.exists(_e1,f1);
								};
							})();
						};
					})())(this.gradients))((function(g) {
						return function(_1) {
							return _1.equ(g[0]);
						};
					})(g))) {
						g[0].write(this.gradients.length,xml);
						this.gradients.push(g[0]);
					}
					this.strokes.push(edge[0].stroke);
				}
			}
		}
		var _g2 = 0;
		var _g11 = shape.polygons;
		while(_g2 < _g11.length) {
			var polygon = [_g11[_g2]];
			++_g2;
			if(!(((function() {
				return function(_e2) {
					return (function() {
						return function(f2) {
							return Lambda.exists(_e2,f2);
						};
					})();
				};
			})())(this.fills))((function(polygon) {
				return function(_2) {
					return _2.equ(polygon[0].fill);
				};
			})(polygon))) {
				var g1 = [svgexporter_Gradient.fromFill(polygon[0].fill)];
				if(g1[0] != null) {
					if(!(((function() {
						return function(_e3) {
							return (function() {
								return function(f3) {
									return Lambda.exists(_e3,f3);
								};
							})();
						};
					})())(this.gradients))((function(g1) {
						return function(_3) {
							return _3.equ(g1[0]);
						};
					})(g1))) {
						g1[0].write(this.gradients.length,xml);
						this.gradients.push(g1[0]);
					}
					this.fills.push(polygon[0].fill);
				}
			}
		}
	}
	,'export': function(idPrefix,shape,xml) {
		var render = new svgexporter_ShapePathsRender(idPrefix,this.gradients,xml);
		shape.draw(render,null);
		return render.ids;
	}
	,__class__: svgexporter_ShapeExporter
};
var svgexporter_ShapePathsRender = function(idPrefix,gradients,xml) {
	this.ids = [];
	this.d = "";
	this.attributes = [];
	this.idPrefix = null;
	this.idPrefix = idPrefix;
	this.gradients = gradients;
	this.xml = xml;
};
svgexporter_ShapePathsRender.__name__ = true;
svgexporter_ShapePathsRender.prototype = {
	moveTo: function(x,y) {
		this.d += "M" + x + "," + y;
		return this;
	}
	,lineTo: function(x,y) {
		this.d += "L" + x + "," + y;
		return this;
	}
	,curveTo: function(x0,y0,x1,y1) {
		this.d += "Q" + x0 + "," + y0 + "," + x1 + "," + y1;
		return this;
	}
	,beginStroke: function(color) {
		this.attr("fill","none");
		this.attr("stroke",color);
		return this;
	}
	,beginLinearGradientStroke: function(colors,ratios,x0,y0,x1,y1) {
		this.attr("fill","none");
		var g = svgexporter_Gradient.createLinear(colors,ratios,x0,y0,x1,y1);
		this.attr("stroke","url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib_LambdaIterable.findIndex(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}) + ")");
		return this;
	}
	,beginRadialGradientStroke: function(colors,ratios,fx,fy,fr,cx,cy,cr) {
		this.attr("fill","none");
		var g = svgexporter_Gradient.createRadial(colors,ratios,cx,cy,cr,fx,fy);
		this.attributes.push({ name : "stroke", value : "url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib_LambdaIterable.findIndex(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}) + ")"});
		return this;
	}
	,beginBitmapStroke: function(image,repeat) {
		this.attr("fill","none");
		this.attr("stroke","#000000");
		return this;
	}
	,setStrokeStyle: function(thickness,caps,joints,miterLimit,ignoreScale) {
		this.attr("stroke-width",thickness);
		this.attr("stroke-linecap",caps);
		this.attr("stroke-linejoin",joints);
		this.attr("stroke-miterlimit",miterLimit);
		return this;
	}
	,endStroke: function() {
		this.finishPath();
		return this;
	}
	,beginFill: function(color) {
		this.attr("fill",color);
		return this;
	}
	,beginLinearGradientFill: function(colors,ratios,x0,y0,x1,y1) {
		var g = svgexporter_Gradient.createLinear(colors,ratios,x0,y0,x1,y1);
		this.attr("fill","url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib_LambdaIterable.findIndex(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}) + ")");
		return this;
	}
	,beginRadialGradientFill: function(colors,ratios,fx,fy,fr,cx,cy,cr) {
		var g = svgexporter_Gradient.createRadial(colors,ratios,cx,cy,cr,fx,fy);
		this.attr("fill","url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib_LambdaIterable.findIndex(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}) + ")");
		return this;
	}
	,beginBitmapFill: function(image,repeat,matrix) {
		this.attr("fill","#000000");
		return this;
	}
	,endFill: function() {
		this.finishPath();
		return this;
	}
	,finishPath: function() {
		if(this.d != "") {
			if(this.idPrefix != null) {
				var id = this.idPrefix + this.ids.length;
				this.ids.push(id);
				this.attributes.unshift({ name : "id", value : id});
			}
			this.xml.begin("path",this.attributes).attr("d",this.d).end();
		}
		this.attributes = [];
		this.d = "";
	}
	,attr: function(name,value,defaultValue) {
		if(value != defaultValue) this.attributes.push({ name : name, value : value});
	}
	,__class__: svgexporter_ShapePathsRender
};
var svgexporter_SvgExporter = function(library) {
	this.shapePaths = new haxe_ds_ObjectMap();
	this.layerItems = new haxe_ds_ObjectMap();
	this.shapeExporter = new svgexporter_ShapeExporter();
	this.library = library;
};
svgexporter_SvgExporter.__name__ = true;
svgexporter_SvgExporter.asInstance = function(element) {
	return element;
};
svgexporter_SvgExporter.prototype = {
	'export': function(xml) {
		var _g1 = this;
		var scene = this.library.getSceneItem();
		var items = this.library.getItems().filter(function(_) {
			return js_Boot.__instanceof(_,nanofl.engine.libraryitems.MovieClipItem);
		});
		var sceneWithItems = [scene].concat(items);
		xml.begin("defs");
		var _g = 0;
		while(_g < sceneWithItems.length) {
			var item = sceneWithItems[_g];
			++_g;
			var _g11 = 0;
			var _g2 = item.layers;
			while(_g11 < _g2.length) {
				var layer = _g2[_g11];
				++_g11;
				if(layer.keyFrames.length > 0) {
					var shape = layer.keyFrames[0].getShape(false);
					if(shape != null) this.shapeExporter.exportGradients(shape,xml);
				}
			}
		}
		var _g3 = 0;
		while(_g3 < sceneWithItems.length) {
			var item1 = sceneWithItems[_g3];
			++_g3;
			nanofl.engine.MovieClipItemTools.findShapes(item1,false,null,function(shape1,e) {
				if(e.insideMask && !(_g1.shapePaths.h.__keys__[shape1.__id__] != null)) {
					var value = _g1.shapeExporter["export"](e.item.namePath + "_layer" + e.layerIndex + "_shape",shape1,xml);
					_g1.shapePaths.set(shape1,value);
				}
			});
		}
		var _g4 = 0;
		while(_g4 < sceneWithItems.length) {
			var item2 = sceneWithItems[_g4];
			++_g4;
			this.exportMaskLayers(item2,xml);
		}
		var _g5 = 0;
		while(_g5 < items.length) {
			var item3 = items[_g5];
			++_g5;
			this.exportSvgGroup(item3,xml);
		}
		xml.end();
		this.exportMovieClipLayers(scene,xml);
	}
	,exportMaskLayers: function(item,xml) {
		var _g4 = this;
		var _g1 = 0;
		var _g = item.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var layer = item.layers[i];
			if(!(this.layerItems.h.__keys__[layer.__id__] != null) && layer.type == "mask" && layer.keyFrames.length > 0) {
				var layerID = item.namePath + "_layer" + i;
				this.layerItems.set(layer,layerID);
				xml.begin("clipPath").attr("id",layerID);
				var _g2 = 0;
				var _g3 = nanofl.engine.elements.Elements.expandGroups(layer.keyFrames[0].elements);
				while(_g2 < _g3.length) {
					var element = _g3[_g2];
					++_g2;
					if(js_Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) this.exportExistShapeElement(element,null,xml); else if(js_Boot.__instanceof(element,nanofl.engine.elements.Instance) && js_Boot.__instanceof(element.symbol,nanofl.engine.libraryitems.MovieClipItem)) nanofl.engine.MovieClipItemTools.findShapes(element.symbol,false,element.matrix,function(shape,e) {
						_g4.exportExistShapeElement(shape,e.matrix,xml);
					});
				}
				xml.end();
			}
		}
	}
	,exportSvgGroup: function(item,xml) {
		xml.begin("g").attr("id",item.namePath);
		this.exportMovieClipLayers(item,xml);
		xml.end();
	}
	,exportMovieClipLayers: function(item,xml) {
		var _g = 0;
		var _g1 = item.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(layer.type == "normal") {
				xml.begin("g").attr("title",layer.name);
				if(layer.keyFrames.length > 0) {
					if(layer.parentLayer != null && layer.parentLayer.type == "mask") xml.attr("clip-path","url(#" + this.layerItems.h[layer.parentLayer.__id__] + ")");
					var _g2 = 0;
					var _g3 = layer.keyFrames[0].elements;
					while(_g2 < _g3.length) {
						var element = _g3[_g2];
						++_g2;
						this.exportElement(element,xml);
					}
				}
				xml.end();
			}
		}
	}
	,exportElement: function(element,xml) {
		if(js_Boot.__instanceof(element,nanofl.engine.elements.Instance)) {
			var instance = element;
			xml.begin("use");
			xml.attr("xlink:href","#" + instance.symbol.namePath);
			this.exportMatrix(instance.matrix,xml);
			xml.end();
		} else if(js_Boot.__instanceof(element,nanofl.engine.elements.GroupElement)) {
			var group = element;
			var _g = 0;
			var _g1 = group.getChildren();
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				this.exportElement(e,xml);
			}
		} else if(js_Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) {
			if(this.shapePaths.h.__keys__[element.__id__] != null) this.exportExistShapeElement(element,null,xml); else this.shapeExporter["export"](null,element,xml);
		} else if(js_Boot.__instanceof(element,nanofl.engine.elements.TextElement)) this.exportTextElement(element,xml); else nanofl.engine.Debug.console.warn("Unsupported element: " + element.toString());
	}
	,exportTextElement: function(text,xml) {
		var tf = text.createDisplayObject(null);
		tf.update();
		var y = nanofl.TextField.PADDING;
		var _g = 0;
		var _g1 = tf.getTextLines();
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			xml.begin("text");
			var m = text.matrix.clone();
			var _g2 = line.align;
			switch(_g2) {
			case "left":
				xml.attr("text-anchor","start");
				m.appendTransform(nanofl.TextField.PADDING,0);
				break;
			case "center":
				xml.attr("text-anchor","middle");
				m.appendTransform(tf.width / 2,0);
				break;
			case "right":
				xml.attr("text-anchor","end");
				m.appendTransform(tf.width - nanofl.TextField.PADDING,0);
				break;
			}
			m.appendTransform(0,y - line.minY);
			this.exportMatrix(m,xml);
			var _g21 = 0;
			var _g3 = line.chunks;
			while(_g21 < _g3.length) {
				var chunk = _g3[_g21];
				++_g21;
				xml.begin("tspan");
				xml.attr("fill",chunk.format.fillColor,"#000000");
				xml.attr("stroke",chunk.format.strokeColor,"rgba(0,0,0,0)");
				xml.attr("stroke-width",chunk.format.strokeSize,1);
				xml.attr("font-family",chunk.format.family,"");
				xml.attr("font-size",chunk.format.size,16);
				xml.attr("font-style",chunk.format.style.indexOf("italic") >= 0?"italic":"","");
				xml.attr("font-weight",chunk.format.style.indexOf("bold") >= 0?"bold":"","");
				xml.attr("kerning",chunk.format.kerning?"auto":"0","auto");
				xml.attr("letter-spacing",chunk.format.letterSpacing,0);
				xml.content(chunk.format.characters);
				xml.end();
			}
			xml.end();
			y += line.maxY - line.minY + line.spacing;
		}
	}
	,exportExistShapeElement: function(shape,matrix,xml) {
		var _g = 0;
		var _g1 = this.shapePaths.h[shape.__id__];
		while(_g < _g1.length) {
			var pathID = _g1[_g];
			++_g;
			xml.begin("use");
			xml.attr("xlink:href","#" + pathID);
			if(matrix != null) this.exportMatrix(matrix,xml);
			xml.end();
		}
	}
	,exportMatrix: function(matrix,xml) {
		if(!matrix.isIdentity()) {
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) {
				xml.attr("x",matrix.tx);
				xml.attr("y",matrix.ty);
			} else xml.attr("transform","matrix(" + matrix.toArray().join(",") + ")");
		}
	}
	,__class__: svgexporter_SvgExporter
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
SvgExporterPlugin.main();
})(typeof console != "undefined" ? console : {log:function(){}});
