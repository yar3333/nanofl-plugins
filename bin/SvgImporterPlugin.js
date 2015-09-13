(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
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
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
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
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
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
HxOverrides.__name__ = ["HxOverrides"];
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
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
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
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
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
var SvgImporterPlugin = function() {
	this.properties = [{ type : "bool", name : "optimize", label : "Optimize (remove unused items and simplificate document after loading).", defaultValue : true}];
	this.fileFilterExtensions = ["svg"];
	this.fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	this.menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/QaKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lIoqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkNAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2Nu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMmDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXxCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRgT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8dtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gHue+ALxPHGYEAAAAASUVORK5CYII=)";
	this.menuItemName = "Scalable Vector Graphics (*.svg)";
	this.name = "SvgImporter";
};
SvgImporterPlugin.__name__ = ["SvgImporterPlugin"];
SvgImporterPlugin.__interfaces__ = [nanofl.ide.plugins.IImporterPlugin];
SvgImporterPlugin.main = function() {
	nanofl.engine.Plugins.registerImporter(new SvgImporterPlugin());
};
SvgImporterPlugin.prototype = {
	importDocument: function(fileApi,params,srcFilePath,destFilePath,documentProperties,library,fonts,callb) {
		haxe_Log.trace("Load",{ fileName : "SvgImporterPlugin.hx", lineNumber : 40, className : "SvgImporterPlugin", methodName : "importDocument"});
		var xml = new htmlparser.XmlDocument(fileApi.getContent(srcFilePath));
		haxe_Log.trace("Parse",{ fileName : "SvgImporterPlugin.hx", lineNumber : 44, className : "SvgImporterPlugin", methodName : "importDocument"});
		var svg = new svgimport_Svg(xml);
		documentProperties.width = Math.round(svg.width);
		documentProperties.height = Math.round(svg.height);
		if(svg.id != nanofl.engine.Library.SCENE_NAME_PATH) {
			stdlib_Debug.assert(svg.id == "" || svg.elements.exists(svg.id),null,{ fileName : "SvgImporterPlugin.hx", lineNumber : 53, className : "SvgImporterPlugin", methodName : "importDocument"});
			svg.elements.remove(svg.id);
			svg.id = nanofl.engine.Library.SCENE_NAME_PATH;
			var value = svgimport_SvgElement.DisplayGroup(svg);
			svg.elements.set(nanofl.engine.Library.SCENE_NAME_PATH,value);
		}
		haxe_Log.trace("Convert",{ fileName : "SvgImporterPlugin.hx", lineNumber : 59, className : "SvgImporterPlugin", methodName : "importDocument"});
		var $it0 = svg.elements.keys();
		while( $it0.hasNext() ) {
			var elementID = $it0.next();
			if(!library.hasItem(elementID)) {
				var _g = svg.elements.get(elementID);
				if(_g != null) switch(_g[1]) {
				case 1:
					var group = _g[2];
					new svgimport_SvgGroupExporter(svg,library,group).exportToLibrary();
					break;
				case 0:
					var path = _g[2];
					new svgimport_SvgPathExporter(svg,library,path).exportToLibrary();
					break;
				default:
					haxe_Log.trace("ID for item type '" + (function($this) {
						var $r;
						var e = svg.elements.get(elementID);
						$r = e[0];
						return $r;
					}(this)) + "' is not supported.",{ fileName : "SvgImporterPlugin.hx", lineNumber : 74, className : "SvgImporterPlugin", methodName : "importDocument"});
				} else haxe_Log.trace("ID for item type '" + (function($this) {
					var $r;
					var e = svg.elements.get(elementID);
					$r = e[0];
					return $r;
				}(this)) + "' is not supported.",{ fileName : "SvgImporterPlugin.hx", lineNumber : 74, className : "SvgImporterPlugin", methodName : "importDocument"});
			}
		}
		if(params.optimize) nanofl.ide.LibraryTools.optimize(library);
		callb(true);
	}
	,__class__: SvgImporterPlugin
};
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumConstructor = function(e) {
	return e[0];
};
var haxe_StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Utf8 = function(size) {
	this.__b = "";
};
haxe_Utf8.__name__ = ["haxe","Utf8"];
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
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
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
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function() { };
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
var haxe_io_Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
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
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
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
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
			haxe_CallStack.lastException = e;
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
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
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
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
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
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
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
var stdlib_Debug = function() { };
stdlib_Debug.__name__ = ["stdlib","Debug"];
stdlib_Debug.getDump = function(v,limit,level,prefix) {
	if(prefix == null) prefix = "";
	if(level == null) level = 0;
	if(limit == null) limit = 10;
	if(level >= limit) return "...\n";
	prefix += "\t";
	var s = "?\n";
	{
		var _g = Type["typeof"](v);
		switch(_g[1]) {
		case 3:
			s = "BOOL(" + (v?"true":"false") + ")\n";
			break;
		case 0:
			s = "NULL\n";
			break;
		case 6:
			var c = _g[2];
			if(c == String) s = "STRING(" + Std.string(v) + ")\n"; else if(c == Array) {
				s = "ARRAY(" + Std.string(v.length) + ")\n";
				var _g1 = 0;
				var _g2;
				_g2 = js_Boot.__cast(v , Array);
				while(_g1 < _g2.length) {
					var item = _g2[_g1];
					++_g1;
					s += prefix + stdlib_Debug.getDump(item,limit,level + 1,prefix);
				}
			} else if(c == List) {
				s = "LIST(" + Lambda.count(v) + ")\n";
				var _g11 = (js_Boot.__cast(v , List)).iterator();
				while(_g11.head != null) {
					var item1;
					_g11.val = _g11.head[0];
					_g11.head = _g11.head[1];
					item1 = _g11.val;
					s += prefix + stdlib_Debug.getDump(item1,limit,level + 1,prefix);
				}
			} else if(c == haxe_ds_StringMap) {
				s = "StringMap\n";
				var map;
				map = js_Boot.__cast(v , haxe_ds_StringMap);
				var $it0 = map.keys();
				while( $it0.hasNext() ) {
					var key = $it0.next();
					s += prefix + key + " => " + stdlib_Debug.getDump(__map_reserved[key] != null?map.getReserved(key):map.h[key],limit,level + 1,prefix);
				}
			} else s = "CLASS(" + Type.getClassName(c) + ")\n" + stdlib_Debug.getObjectDump(v,limit,level + 1,prefix);
			break;
		case 7:
			var e = _g[2];
			s = "ENUM(" + Type.getEnumName(e) + ") = " + Type.enumConstructor(v) + "\n";
			break;
		case 2:
			s = "FLOAT(" + Std.string(v) + ")\n";
			break;
		case 1:
			s = "INT(" + Std.string(v) + ")\n";
			break;
		case 4:
			s = "OBJECT" + "\n" + stdlib_Debug.getObjectDump(v,limit,level + 1,prefix);
			break;
		case 5:case 8:
			s = "FUNCTION OR UNKNOW\n";
			break;
		}
	}
	return s;
};
stdlib_Debug.getObjectDump = function(obj,limit,level,prefix) {
	var s = "";
	var _g = 0;
	var _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		s += prefix + fieldName + " : " + stdlib_Debug.getDump(Reflect.field(obj,fieldName),limit,level,prefix);
	}
	return s;
};
stdlib_Debug.assert = function(e,message,pos) {
	if(!e) {
		if(message == null) message = "error"; else if(Reflect.isFunction(message)) message = message();
		var s = "ASSERT " + Std.string(message) + " in " + pos.fileName + " at line " + pos.lineNumber;
		var r = new stdlib_Exception(s);
		r.stack.shift();
		throw new js__$Boot_HaxeError(r);
	}
};
stdlib_Debug.traceStack = function(v,pos) {
	var stack = stdlib_StringTools.trim(stdlib_StringTools.replace(haxe_CallStack.toString(haxe_CallStack.callStack()),"prototype<.",""));
	var lines = stack.split("\n").filter(function(s) {
		return s != "Called from module";
	}).map(function(s1) {
		return s1.split("@").map(function(ss) {
			return stdlib_StringTools.rtrim(ss,"</");
		}).join("@");
	});
	var len = 0;
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		len = stdlib_Std.max(len,line.indexOf("@"));
	}
	lines = lines.map(function(line1) {
		var ss1 = line1.split("@");
		return ss1[0] + StringTools.rpad(""," ",len - ss1[0].length + 1) + ss1[1];
	});
	stack = lines.slice(1).join("\n");
	haxe_Log.trace("TRACE " + (typeof(v) == "string"?v:stdlib_StringTools.trim(stdlib_Debug.getDump(v))) + "\nStack trace:\n" + stack,{ fileName : "Debug.hx", lineNumber : 136, className : "stdlib.Debug", methodName : "traceStack", customParams : [pos]});
};
stdlib_Debug.methodMustBeOverriden = function(_this,pos) {
	throw new js__$Boot_HaxeError(new stdlib_Exception("Method " + pos.methodName + "() must be overriden in class " + Type.getClassName(Type.getClass(_this)) + "."));
	return null;
};
stdlib_Debug.methodNotSupported = function(_this,pos) {
	throw new js__$Boot_HaxeError(new stdlib_Exception("Method " + pos.methodName + "() is not supported by class " + Type.getClassName(Type.getClass(_this)) + "."));
	return null;
};
var stdlib_Exception = function(message) {
	if(message == null) this.message = ""; else this.message = message;
	this.stack = haxe_CallStack.callStack();
	this.stack.shift();
	this.stack.shift();
};
stdlib_Exception.__name__ = ["stdlib","Exception"];
stdlib_Exception.string = function(e) {
	return Std.string(e);
};
stdlib_Exception.rethrow = function(exception) {
	throw new js__$Boot_HaxeError(stdlib_Exception.wrap(exception));
};
stdlib_Exception.wrap = function(e) {
	if(!js_Boot.__instanceof(e,stdlib_Exception)) {
		var r = new stdlib_Exception(Std.string(e));
		r.stack = haxe_CallStack.exceptionStack();
		return r;
	}
	return e;
};
stdlib_Exception.prototype = {
	toString: function() {
		return this.message;
	}
	,__class__: stdlib_Exception
};
var stdlib_Std = function() { };
stdlib_Std.__name__ = ["stdlib","Std"];
stdlib_Std.parseInt = function(x,defaultValue) {
	if(x != null) {
		if(new EReg("^\\s*[+-]?\\s*((?:0x[0-9a-fA-F]{1,7})|(?:\\d{1,9}))\\s*$","").match(x)) return Std.parseInt(x); else return defaultValue;
	} else return defaultValue;
};
stdlib_Std.parseFloat = function(x,defaultValue) {
	if(x != null) {
		if(new EReg("^\\s*[+-]?\\s*\\d{1,9}(?:[.]\\d+)?(?:e[+-]?\\d{1,9})?\\s*$","").match(x)) return parseFloat(x); else return defaultValue;
	} else return defaultValue;
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
stdlib_StringTools.__name__ = ["stdlib","StringTools"];
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
stdlib_Utf8.__name__ = ["stdlib","Utf8"];
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
	haxe_Log.trace("Unknow escape sequence: " + escape,{ fileName : "Utf8.hx", lineNumber : 129, className : "stdlib.Utf8", methodName : "htmlUnescapeChar"});
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
		_g.h[39] = "&#39;";
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
var svgimport_BaseExporter = function(svg,library) {
	this.svg = svg;
	this.library = library;
};
svgimport_BaseExporter.__name__ = ["svgimport","BaseExporter"];
svgimport_BaseExporter.prototype = {
	elementsToLibraryItem: function(elements,id) {
		stdlib_Debug.assert(id != null && id != "","ID must not be empty (" + id + ").",{ fileName : "BaseExporter.hx", lineNumber : 31, className : "svgimport.BaseExporter", methodName : "elementsToLibraryItem"});
		return this.library.addItem(nanofl.engine.MovieClipItemTools.create(id,elements,"auto"));
	}
	,applyMaskToElement: function(element,matrix,maskID,prefixID) {
		if(element == null) return null;
		if(maskID != null) {
			element = this.elementsToLibraryItem([element],this.getNextFreeID(prefixID)).newInstance();
			stdlib_Debug.assert(js_Boot.__instanceof(element,nanofl.engine.elements.Instance),null,{ fileName : "BaseExporter.hx", lineNumber : 46, className : "svgimport.BaseExporter", methodName : "applyMaskToElement"});
			stdlib_Debug.assert(this.library.getItem((js_Boot.__cast(element , nanofl.engine.elements.Instance)).namePath) != null,null,{ fileName : "BaseExporter.hx", lineNumber : 47, className : "svgimport.BaseExporter", methodName : "applyMaskToElement"});
			var item;
			item = js_Boot.__cast(this.library.getItem((js_Boot.__cast(element , nanofl.engine.elements.Instance)).namePath) , nanofl.engine.libraryitems.MovieClipItem);
			stdlib_Debug.assert(item != null,null,{ fileName : "BaseExporter.hx", lineNumber : 50, className : "svgimport.BaseExporter", methodName : "applyMaskToElement"});
			this.addMaskItemLayerToMovieClipItem(item,matrix,maskID);
		}
		return element;
	}
	,applyFilterToElement: function(element,filterID,prefixID) {
		if(element == null) return null;
		if(filterID != null) {
			var filter = this.svg.filters.get(filterID);
			if(filter != null) {
				var filterDefs = filter["export"]();
				if(filterDefs.length > 0) {
					element = this.elementsToLibraryItem([element],this.getNextFreeID(prefixID)).newInstance();
					(js_Boot.__cast(element , nanofl.engine.elements.Instance)).filters = filterDefs;
					var displayObject = element.createDisplayObject(null);
					var elemBounds = displayObject.getBounds();
					if(elemBounds != null) {
						var maskBounds;
						if(filter.filterUnits == "userSpaceOnUse") maskBounds = new createjs.Rectangle(elemBounds.x + (filter.x != null?filter.x:-elemBounds.width * 0.1),elemBounds.y + (filter.y != null?filter.y:-elemBounds.height * 0.1),filter.width != null?filter.width:elemBounds.width * 1.2,filter.height != null?filter.height:elemBounds.height * 1.2); else maskBounds = new createjs.Rectangle(elemBounds.x + (filter.x != null?filter.x * elemBounds.width:-elemBounds.width * 0.1),elemBounds.y + (filter.y != null?filter.y * elemBounds.height:-elemBounds.height * 0.1),(filter.width != null?filter.width:1.2) * elemBounds.width,(filter.height != null?filter.height:1.2) * elemBounds.height);
						if(!this.isRectangleNested(nanofl.DisplayObjectTools.getOuterBounds(displayObject),maskBounds)) {
							var mask = new nanofl.engine.elements.ShapeElement(null,[new nanofl.engine.geom.Polygon(new nanofl.engine.fills.SolidFill("red"),[nanofl.engine.geom.Contour.fromRectangle(maskBounds)])]);
							var item = this.elementsToLibraryItem([element],this.getNextFreeID(prefixID));
							this.addMaskElementLayerToMovieClipItem(item,mask);
							element = item.newInstance();
						}
					}
				}
			} else haxe_Log.trace("Filter reference '" + filterID + "' is not found.",{ fileName : "BaseExporter.hx", lineNumber : 115, className : "svgimport.BaseExporter", methodName : "applyFilterToElement"});
		}
		return element;
	}
	,wrapMovieClipItemWithMask: function(item,matrix,maskID,id) {
		if(maskID == null) return item;
		var r = this.elementsToLibraryItem([item.newInstance()],id);
		this.addMaskItemLayerToMovieClipItem(r,matrix,maskID);
		return r;
	}
	,wrapMovieClipItemWithFilter: function(item,filterID,id) {
		if(filterID == null) return item;
		var instance = item.newInstance();
		instance = this.applyFilterToElement(instance,filterID,id);
		return this.elementsToLibraryItem([instance],id);
	}
	,addMaskItemLayerToMovieClipItem: function(item,matrix,maskID) {
		if(maskID != null) {
			var maskItem;
			if(this.library.hasItem(maskID)) maskItem = this.library.getItem(maskID); else maskItem = this.exportSvgElementToLibrary(this.svg.elements.get(maskID));
			var mask = (js_Boot.__cast(maskItem , nanofl.engine.libraryitems.MovieClipItem)).newInstance();
			mask.matrix = matrix.clone();
			this.addMaskElementLayerToMovieClipItem(item,mask);
		}
	}
	,addMaskElementLayerToMovieClipItem: function(item,mask) {
		stdlib_Debug.assert(mask != null,null,{ fileName : "BaseExporter.hx", lineNumber : 159, className : "svgimport.BaseExporter", methodName : "addMaskElementLayerToMovieClipItem"});
		var maskLayer = new nanofl.engine.Layer("auto_clip-path","mask",true,true);
		maskLayer.addKeyFrame(new nanofl.engine.KeyFrame(null,null,null,[mask]));
		stdlib_Debug.assert(item.layers.length == 1,null,{ fileName : "BaseExporter.hx", lineNumber : 164, className : "svgimport.BaseExporter", methodName : "addMaskElementLayerToMovieClipItem"});
		item.addLayersBlock([maskLayer],0);
		item.layers[1].parentIndex = 0;
		item.layers[1].locked = true;
	}
	,exportSvgElementToLibrary: function(element) {
		switch(element[1]) {
		case 1:
			var g = element[2];
			return new svgimport_SvgGroupExporter(this.svg,this.library,g).exportToLibrary();
		case 0:
			var p = element[2];
			return new svgimport_SvgPathExporter(this.svg,this.library,p).exportToLibrary();
		default:
			return null;
		}
	}
	,getNextFreeID: function(prefix) {
		if(prefix == null) prefix = "";
		if(prefix == "") prefix = "auto";
		prefix += "_";
		var i = -1;
		var s;
		do s = prefix + ++i; while(this.svg.elements.exists(s) || this.library.hasItem(s) || HxOverrides.indexOf(this.svg.usedIDs,s,0) >= 0);
		this.svg.usedIDs.push(s);
		return s;
	}
	,isRectangleNested: function(inner,outer) {
		return inner.x >= outer.x && inner.x + inner.width <= outer.x + outer.width && inner.y >= outer.y && inner.y + inner.height <= outer.y + outer.height;
	}
	,__class__: svgimport_BaseExporter
};
var svgimport_FillType = { __ename__ : ["svgimport","FillType"], __constructs__ : ["FillNone","FillSolid","FillGrad"] };
svgimport_FillType.FillNone = ["FillNone",0];
svgimport_FillType.FillNone.toString = $estr;
svgimport_FillType.FillNone.__enum__ = svgimport_FillType;
svgimport_FillType.FillSolid = function(color) { var $x = ["FillSolid",1,color]; $x.__enum__ = svgimport_FillType; $x.toString = $estr; return $x; };
svgimport_FillType.FillGrad = function(gradType) { var $x = ["FillGrad",2,gradType]; $x.__enum__ = svgimport_FillType; $x.toString = $estr; return $x; };
var svgimport_Rectangle = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
svgimport_Rectangle.__name__ = ["svgimport","Rectangle"];
svgimport_Rectangle.prototype = {
	__class__: svgimport_Rectangle
};
var svgimport_SegmentType = { __ename__ : ["svgimport","SegmentType"], __constructs__ : ["MOVE","DRAW","CURVE","CUBIC","ARC"] };
svgimport_SegmentType.MOVE = function(seg) { var $x = ["MOVE",0,seg]; $x.__enum__ = svgimport_SegmentType; $x.toString = $estr; return $x; };
svgimport_SegmentType.DRAW = function(seg) { var $x = ["DRAW",1,seg]; $x.__enum__ = svgimport_SegmentType; $x.toString = $estr; return $x; };
svgimport_SegmentType.CURVE = function(seg) { var $x = ["CURVE",2,seg]; $x.__enum__ = svgimport_SegmentType; $x.toString = $estr; return $x; };
svgimport_SegmentType.CUBIC = function(seg) { var $x = ["CUBIC",3,seg]; $x.__enum__ = svgimport_SegmentType; $x.toString = $estr; return $x; };
svgimport_SegmentType.ARC = function(seg) { var $x = ["ARC",4,seg]; $x.__enum__ = svgimport_SegmentType; $x.toString = $estr; return $x; };
var svgimport_SegmentsParser = function() {
	if(svgimport_SegmentsParser.sCommandArgs == null) {
		svgimport_SegmentsParser.sCommandArgs = [];
		var _g = 0;
		while(_g < 128) {
			var i = _g++;
			svgimport_SegmentsParser.sCommandArgs[i] = this.commandArgs(i);
		}
	}
};
svgimport_SegmentsParser.__name__ = ["svgimport","SegmentsParser"];
svgimport_SegmentsParser.run = function(pathToParse) {
	return new svgimport_SegmentsParser().parse(pathToParse);
};
svgimport_SegmentsParser.prototype = {
	parse: function(pathToParse) {
		if(pathToParse == null) return [];
		this.lastMoveX = this.lastMoveY = 0;
		var pos = 0;
		var args = [];
		var segments = [];
		var current_command_pos = 0;
		var current_command = -1;
		var current_args = -1;
		this.prev = null;
		var len = pathToParse.length;
		var finished = false;
		while(pos <= len) {
			var code;
			if(pos == len) code = 32; else code = HxOverrides.cca(pathToParse,pos);
			var command;
			if(code > 0 && code < 128) command = svgimport_SegmentsParser.sCommandArgs[code]; else command = svgimport_SegmentsParser.UNKNOWN;
			if(command == svgimport_SegmentsParser.UNKNOWN) throw new js__$Boot_HaxeError("failed parsing path near '" + HxOverrides.substr(pathToParse,pos,null) + "'");
			if(command == svgimport_SegmentsParser.SEPARATOR) pos++; else if(command <= svgimport_SegmentsParser.FLOAT) {
				var end = pos + 1;
				var e_pos = -1;
				var seen_dot = command == svgimport_SegmentsParser.FLOAT_DOT;
				if(command == svgimport_SegmentsParser.FLOAT_EXP) {
					e_pos = 0;
					seen_dot = true;
				}
				while(end < pathToParse.length) {
					var ch = HxOverrides.cca(pathToParse,end);
					var code1;
					if(ch < 0 || ch > 127) code1 = svgimport_SegmentsParser.UNKNOWN; else code1 = svgimport_SegmentsParser.sCommandArgs[ch];
					if(code1 > svgimport_SegmentsParser.FLOAT) break;
					if(code1 == svgimport_SegmentsParser.FLOAT_DOT && seen_dot) break;
					if(e_pos >= 0) {
						if(code1 == svgimport_SegmentsParser.FLOAT_SIGN) {
							if(e_pos != 0) break;
						} else if(code1 != svgimport_SegmentsParser.FLOAT) break;
						e_pos++;
					} else if(code1 == svgimport_SegmentsParser.FLOAT_EXP) {
						if(e_pos >= 0) break;
						e_pos = 0;
						seen_dot = true;
					} else if(code1 == svgimport_SegmentsParser.FLOAT_SIGN) break;
					end++;
				}
				if(current_command < 0) {
				} else {
					var f = Std.parseFloat(HxOverrides.substr(pathToParse,pos,end - pos));
					args.push(f);
				}
				pos = end;
			} else {
				current_command = code;
				current_args = command;
				finished = false;
				current_command_pos = pos;
				args = [];
				pos++;
			}
			var px = 0.0;
			var py = 0.0;
			if(current_command >= 0) {
				if(current_args == args.length) {
					this.prev = this.createCommand(current_command,args);
					if(this.prev == null) throw new js__$Boot_HaxeError("Unknown command " + String.fromCharCode(current_command) + " near '" + HxOverrides.substr(pathToParse,current_command_pos,null) + "'");
					segments.push(this.prev);
					finished = true;
					if(current_args == 0) {
						current_args = -1;
						current_command = -1;
					} else if(current_command == 77) current_command = 76; else if(current_command == 109) current_command = 108;
					current_command_pos = pos;
					args = [];
				}
			}
		}
		if(current_command >= 0 && !finished) throw new js__$Boot_HaxeError("Unfinished command (" + args.length + "/" + current_args + ") near '" + HxOverrides.substr(pathToParse,current_command_pos,null) + "'");
		return segments;
	}
	,commandArgs: function(code) {
		if(code == 10) return svgimport_SegmentsParser.SEPARATOR;
		var str = String.fromCharCode(code).toUpperCase();
		if(str >= "0" && str <= "9") return svgimport_SegmentsParser.FLOAT;
		switch(str) {
		case "Z":
			return 0;
		case "H":case "V":
			return 1;
		case "M":case "L":case "T":
			return 2;
		case "S":case "Q":
			return 4;
		case "C":
			return 6;
		case "A":
			return 7;
		case "\t":case "\n":case " ":case "\r":case ",":
			return svgimport_SegmentsParser.SEPARATOR;
		case "-":
			return svgimport_SegmentsParser.FLOAT_SIGN;
		case "+":
			return svgimport_SegmentsParser.FLOAT_SIGN;
		case "E":case "e":
			return svgimport_SegmentsParser.FLOAT_EXP;
		case ".":
			return svgimport_SegmentsParser.FLOAT_DOT;
		}
		return svgimport_SegmentsParser.UNKNOWN;
	}
	,prevX: function() {
		if(this.prev != null) return this.prev.prevX(); else return 0;
	}
	,prevY: function() {
		if(this.prev != null) return this.prev.prevY(); else return 0;
	}
	,prevCX: function() {
		if(this.prev != null) return this.prev.prevCX(); else return 0;
	}
	,prevCY: function() {
		if(this.prev != null) return this.prev.prevCY(); else return 0;
	}
	,createCommand: function(code,a) {
		switch(code) {
		case 77:
			this.lastMoveX = a[0];
			this.lastMoveY = a[1];
			return new svgimport_segments_MoveSegment(this.lastMoveX,this.lastMoveY);
		case 109:
			this.lastMoveX = a[0] + this.prevX();
			this.lastMoveY = a[1] + this.prevY();
			return new svgimport_segments_MoveSegment(this.lastMoveX,this.lastMoveY);
		case 76:
			return new svgimport_segments_DrawSegment(a[0],a[1]);
		case 108:
			return new svgimport_segments_DrawSegment(a[0] + this.prevX(),a[1] + this.prevY());
		case 72:
			return new svgimport_segments_DrawSegment(a[0],this.prevY());
		case 104:
			return new svgimport_segments_DrawSegment(a[0] + this.prevX(),this.prevY());
		case 86:
			return new svgimport_segments_DrawSegment(this.prevX(),a[0]);
		case 118:
			return new svgimport_segments_DrawSegment(this.prevX(),a[0] + this.prevY());
		case 67:
			return new svgimport_segments_CubicSegment(a[0],a[1],a[2],a[3],a[4],a[5]);
		case 99:
			var rx = this.prevX();
			var ry = this.prevY();
			return new svgimport_segments_CubicSegment(a[0] + rx,a[1] + ry,a[2] + rx,a[3] + ry,a[4] + rx,a[5] + ry);
		case 83:
			var rx1 = this.prevX();
			var ry1 = this.prevY();
			return new svgimport_segments_CubicSegment(rx1 * 2 - this.prevCX(),ry1 * 2 - this.prevCY(),a[0],a[1],a[2],a[3]);
		case 115:
			var rx2 = this.prevX();
			var ry2 = this.prevY();
			return new svgimport_segments_CubicSegment(rx2 * 2 - this.prevCX(),ry2 * 2 - this.prevCY(),a[0] + rx2,a[1] + ry2,a[2] + rx2,a[3] + ry2);
		case 81:
			return new svgimport_segments_QuadraticSegment(a[0],a[1],a[2],a[3]);
		case 113:
			var rx3 = this.prevX();
			var ry3 = this.prevY();
			return new svgimport_segments_QuadraticSegment(a[0] + rx3,a[1] + ry3,a[2] + rx3,a[3] + ry3);
		case 84:
			var rx4 = this.prevX();
			var ry4 = this.prevY();
			return new svgimport_segments_QuadraticSegment(rx4 * 2 - this.prevCX(),rx4 * 2 - this.prevCY(),a[2],a[3]);
		case 116:
			var rx5 = this.prevX();
			var ry5 = this.prevY();
			return new svgimport_segments_QuadraticSegment(rx5 * 2 - this.prevCX(),ry5 * 2 - this.prevCY(),a[0] + rx5,a[1] + ry5);
		case 65:
			return new svgimport_segments_ArcSegment(this.prevX(),this.prevY(),a[0],a[1],a[2],a[3] != 0.,a[4] != 0.,a[5],a[6]);
		case 97:
			var rx6 = this.prevX();
			var ry6 = this.prevY();
			return new svgimport_segments_ArcSegment(rx6,ry6,a[0],a[1],a[2],a[3] != 0.,a[4] != 0.,a[5] + rx6,a[6] + ry6);
		case 90:case 122:
			return new svgimport_segments_DrawSegment(this.lastMoveX,this.lastMoveY);
		}
		return null;
	}
	,__class__: svgimport_SegmentsParser
};
var svgimport_StrokeType = { __ename__ : ["svgimport","StrokeType"], __constructs__ : ["StrokeNone","StrokeSolid","StrokeGrad"] };
svgimport_StrokeType.StrokeNone = ["StrokeNone",0];
svgimport_StrokeType.StrokeNone.toString = $estr;
svgimport_StrokeType.StrokeNone.__enum__ = svgimport_StrokeType;
svgimport_StrokeType.StrokeSolid = function(color) { var $x = ["StrokeSolid",1,color]; $x.__enum__ = svgimport_StrokeType; $x.toString = $estr; return $x; };
svgimport_StrokeType.StrokeGrad = function(gradType) { var $x = ["StrokeGrad",2,gradType]; $x.__enum__ = svgimport_StrokeType; $x.toString = $estr; return $x; };
var svgimport_SvgDisplayObject = function(svg,node,baseStyles,id) {
	this.svg = svg;
	this.node = node;
	if(id != null) this.id = id; else this.id = htmlparser.HtmlParserTools.getAttr(node,"id","");
	this.matrix = svgimport_Transform.load(node.getAttribute("transform"));
	this.visible = svgimport_XmlTools.getStyle(node,"display",baseStyles,null) != "none";
	this.clipPathID = svgimport_XmlTools.getIdFromUrl(svgimport_XmlTools.getStyle(node,"clip-path",baseStyles,null));
	this.filterID = svgimport_XmlTools.getIdFromUrl(svgimport_XmlTools.getStyle(node,"filter",baseStyles,null));
};
svgimport_SvgDisplayObject.__name__ = ["svgimport","SvgDisplayObject"];
svgimport_SvgDisplayObject.prototype = {
	__class__: svgimport_SvgDisplayObject
};
var svgimport_SvgGroup = function(svg,node,baseStyles,id) {
	this.children = [];
	svgimport_SvgDisplayObject.call(this,svg,node,baseStyles,id);
	if(this.id != "") {
		var value = svgimport_SvgElement.DisplayGroup(this);
		svg.elements.set(this.id,value);
	}
	this.name = htmlparser.HtmlParserTools.getAttr(node,"inkscape:label",this.id);
	this.loadChildren(node,svgimport_XmlTools.getStyles(node,baseStyles));
};
svgimport_SvgGroup.__name__ = ["svgimport","SvgGroup"];
svgimport_SvgGroup.__super__ = svgimport_SvgDisplayObject;
svgimport_SvgGroup.prototype = $extend(svgimport_SvgDisplayObject.prototype,{
	loadChildren: function(xml,styles) {
		var _g = 0;
		var _g1 = xml.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var _g2 = svgimport_XmlTools.normalizeTag(child.name);
			switch(_g2) {
			case "defs":
				this.loadDefs(child);
				break;
			case "g":
				this.children.push(svgimport_SvgElement.DisplayGroup(new svgimport_SvgGroup(this.svg,child,styles)));
				break;
			case "use":
				var $use = new svgimport_SvgUse(this.svg,child,styles);
				if($use.groupID != null) this.children.push(svgimport_SvgElement.DisplayUse($use));
				break;
			case "path":case "line":case "polyline":case "rect":case "polygon":case "ellipse":case "circle":
				this.children.push(svgimport_SvgElement.DisplayPath(new svgimport_SvgPath(this.svg,child,styles)));
				break;
			case "text":
				this.children.push(svgimport_SvgElement.DisplayText(new svgimport_SvgText(child,styles,this.svg.gradients)));
				break;
			case "linearGradient":
				this.loadGradient(child);
				break;
			case "radialGradient":
				this.loadGradient(child);
				break;
			case "a":
				this.loadChildren(child,styles);
				break;
			default:
				haxe_Log.trace("Unknown tag '" + child.name + "'.",{ fileName : "SvgGroup.hx", lineNumber : 57, className : "svgimport.SvgGroup", methodName : "loadChildren"});
			}
		}
	}
	,loadDefs: function(defsNode) {
		var _g = 0;
		var _g1 = defsNode.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var _g2 = svgimport_XmlTools.normalizeTag(child.name);
			switch(_g2) {
			case "linearGradient":
				this.loadGradient(child);
				break;
			case "radialGradient":
				this.loadGradient(child);
				break;
			case "g":
				new svgimport_SvgGroup(this.svg,child,null);
				break;
			case "path":case "line":case "polyline":case "rect":case "polygon":case "ellipse":case "circle":
				new svgimport_SvgPath(this.svg,child,null);
				break;
			case "clipPath":
				new svgimport_SvgGroup(this.svg,child,(function($this) {
					var $r;
					var _g3 = new haxe_ds_StringMap();
					if(__map_reserved.stroke != null) _g3.setReserved("stroke","none"); else _g3.h["stroke"] = "none";
					if(__map_reserved.fill != null) _g3.setReserved("fill","red"); else _g3.h["fill"] = "red";
					$r = _g3;
					return $r;
				}(this)));
				break;
			case "filter":
				new svgimport_SvgFilter(this.svg,child);
				break;
			default:
				haxe_Log.trace("Unknown tag '" + child.name + "'.",{ fileName : "SvgGroup.hx", lineNumber : 74, className : "svgimport.SvgGroup", methodName : "loadDefs"});
			}
		}
		var _g4 = 0;
		var _g11 = defsNode.children;
		while(_g4 < _g11.length) {
			var child1 = _g11[_g4];
			++_g4;
			var _g21 = svgimport_XmlTools.normalizeTag(child1.name);
			switch(_g21) {
			case "linearGradient":
				this.loadGradient(child1);
				break;
			case "radialGradient":
				this.loadGradient(child1);
				break;
			default:
			}
		}
	}
	,loadGradient: function(node) {
		var baseID = svgimport_XmlTools.getIdFromXlink(node);
		if(baseID == null || this.svg.gradients.exists(baseID)) {
			var id = node.getAttribute("id");
			if(!this.svg.gradients.exists(id)) {
				var value = svgimport_gradients_Gradient.load(this.svg,node,baseID != null?this.svg.gradients.get(baseID):null);
				this.svg.gradients.set(id,value);
			}
		}
	}
	,__class__: svgimport_SvgGroup
});
var svgimport_Svg = function(xml) {
	this.usedIDs = [];
	this.filters = new haxe_ds_StringMap();
	this.gradients = new haxe_ds_StringMap();
	this.elements = new haxe_ds_StringMap();
	var svg;
	if(xml.children.length > 0) svg = xml.children[0]; else svg = null;
	if(svg == null || svg.name != "svg" && svg.name != "svg:svg") throw new js__$Boot_HaxeError("Not an SVG file (" + (svg == null?"null":svg.name) + ")");
	this.detectSize(svg);
	svgimport_SvgGroup.call(this,this,svg,new haxe_ds_StringMap());
};
svgimport_Svg.__name__ = ["svgimport","Svg"];
svgimport_Svg.__super__ = svgimport_SvgGroup;
svgimport_Svg.prototype = $extend(svgimport_SvgGroup.prototype,{
	detectSize: function(svg) {
		this.width = 400.0;
		this.height = 400.0;
		if(svg.hasAttribute("viewBox")) {
			var params = new EReg("\\s+","g").split(svg.getAttribute("viewBox"));
			if(params.length == 4) this.viewBox = new svgimport_Rectangle(parseFloat(params[0]),parseFloat(params[1]),parseFloat(params[2]),parseFloat(params[3]));
		}
		if(svg.hasAttribute("width") && !StringTools.endsWith(svg.getAttribute("width"),"%") && svg.hasAttribute("height") && !StringTools.endsWith(svg.getAttribute("height"),"%")) {
			this.width = svgimport_XmlTools.getFloatStyle(svg,"width",null,400.0);
			this.height = svgimport_XmlTools.getFloatStyle(svg,"height",null,400.0);
		} else if(this.viewBox != null) {
			this.width = this.viewBox.width;
			this.height = this.viewBox.height;
		}
	}
	,__class__: svgimport_Svg
});
var svgimport_SvgAttributes = function() { };
svgimport_SvgAttributes.__name__ = ["svgimport","SvgAttributes"];
var svgimport_SvgElement = { __ename__ : ["svgimport","SvgElement"], __constructs__ : ["DisplayPath","DisplayGroup","DisplayText","DisplayUse"] };
svgimport_SvgElement.DisplayPath = function(path) { var $x = ["DisplayPath",0,path]; $x.__enum__ = svgimport_SvgElement; $x.toString = $estr; return $x; };
svgimport_SvgElement.DisplayGroup = function(group) { var $x = ["DisplayGroup",1,group]; $x.__enum__ = svgimport_SvgElement; $x.toString = $estr; return $x; };
svgimport_SvgElement.DisplayText = function(text) { var $x = ["DisplayText",2,text]; $x.__enum__ = svgimport_SvgElement; $x.toString = $estr; return $x; };
svgimport_SvgElement.DisplayUse = function($use) { var $x = ["DisplayUse",3,$use]; $x.__enum__ = svgimport_SvgElement; $x.toString = $estr; return $x; };
var svgimport_SvgFilter = function(svg,node) {
	this.node = node;
	var id = node.getAttribute("id");
	if(id != null && id != "" && !svg.filters.exists(id)) svg.filters.set(id,this);
	this.filterUnits = node.getAttribute("filterUnits");
	this.x = svgimport_XmlTools.getFloatValue(node,"x",null);
	this.y = svgimport_XmlTools.getFloatValue(node,"y",null);
	this.width = svgimport_XmlTools.getFloatValue(node,"width",null);
	this.height = svgimport_XmlTools.getFloatValue(node,"height",null);
};
svgimport_SvgFilter.__name__ = ["svgimport","SvgFilter"];
svgimport_SvgFilter.prototype = {
	'export': function() {
		var r = [];
		var _g = 0;
		var _g1 = this.node.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var f = this.exportChild(child);
			if(f == null) return [];
			r.push(f);
		}
		return r;
	}
	,exportChild: function(node) {
		var name = svgimport_XmlTools.normalizeTag(node.name);
		switch(name) {
		case "feGaussianBlur":
			var input = htmlparser.HtmlParserTools.getAttr(node,"in","SourceGraphic");
			if(input != "SourceGraphic") {
				haxe_Log.trace("Filter '" + name + "': 'in' attribute value different to 'SourceGraphic' is not supported.",{ fileName : "SvgFilter.hx", lineNumber : 67, className : "svgimport.SvgFilter", methodName : "exportChild"});
				return null;
			}
			var stdDeviation = this.getFloatParams(htmlparser.HtmlParserTools.getAttr(node,"stdDeviation"),[0]);
			return new nanofl.engine.FilterDef("GaussianBlurFilterPlugin",{ radius : (stdDeviation[0] + stdDeviation[stdDeviation.length > 1?1:0]) / 2 | 0});
		case "feColorMatrix":
			haxe_Log.trace("Filter '" + name + "' is unsupported.",{ fileName : "SvgFilter.hx", lineNumber : 82, className : "svgimport.SvgFilter", methodName : "exportChild"});
			break;
		case "feOffset":
			haxe_Log.trace("Filter '" + name + "' is unsupported.",{ fileName : "SvgFilter.hx", lineNumber : 85, className : "svgimport.SvgFilter", methodName : "exportChild"});
			break;
		case "feMerge":
			haxe_Log.trace("Filter '" + name + "' is unsupported.",{ fileName : "SvgFilter.hx", lineNumber : 88, className : "svgimport.SvgFilter", methodName : "exportChild"});
			break;
		case "feBlend":
			haxe_Log.trace("Filter '" + name + "' is unsupported.",{ fileName : "SvgFilter.hx", lineNumber : 91, className : "svgimport.SvgFilter", methodName : "exportChild"});
			break;
		case "feComponentTransfer":case "feComposite":case "feConvolveMatrix":case "feDiffuseLighting":case "feDisplacementMap":case "feFlood":case "feImage":case "feMorphology":case "feSpecularLighting":case "feTile":case "feTurbulence":case "feDistantLight":case "fePointLight":case "feSpotLight":
			haxe_Log.trace("Filter '" + name + "' is not supported.",{ fileName : "SvgFilter.hx", lineNumber : 107, className : "svgimport.SvgFilter", methodName : "exportChild"});
			break;
		default:
			haxe_Log.trace("Unknow filter '" + name + "'.",{ fileName : "SvgFilter.hx", lineNumber : 110, className : "svgimport.SvgFilter", methodName : "exportChild"});
		}
		return null;
	}
	,getFloatParams: function(s,defValue) {
		if(s == null) return defValue;
		s = StringTools.trim(s);
		if(s == "") return defValue;
		return new EReg("[ \t\r\n,]+","g").split(s).map((function(f,a1) {
			return function(s1) {
				return f(s1,a1);
			};
		})(svgimport_XmlTools.toFloat,null)).filter(function(f1) {
			return f1 != null;
		});
	}
	,__class__: svgimport_SvgFilter
};
var svgimport_SvgGroupExporter = function(svg,library,group) {
	svgimport_BaseExporter.call(this,svg,library);
	this.group = group;
};
svgimport_SvgGroupExporter.__name__ = ["svgimport","SvgGroupExporter"];
svgimport_SvgGroupExporter.__super__ = svgimport_BaseExporter;
svgimport_SvgGroupExporter.prototype = $extend(svgimport_BaseExporter.prototype,{
	exportToLibrary: function() {
		haxe_Log.trace("SvgGroupExporter.exportToLibrary " + this.group.id,{ fileName : "SvgGroupExporter.hx", lineNumber : 28, className : "svgimport.SvgGroupExporter", methodName : "exportToLibrary"});
		this.layers = [];
		var _g = 0;
		var _g1 = this.group.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			switch(child[1]) {
			case 1:
				var g = child[2];
				var item;
				if(!this.library.hasItem(g.id)) item = new svgimport_SvgGroupExporter(this.svg,this.library,g).exportToLibrary(); else item = this.library.getItem(g.id);
				if(item != null) {
					var instance = new nanofl.engine.elements.Instance(item.namePath);
					instance.matrix = g.matrix.clone();
					this.addElement(instance,g.visible);
				}
				break;
			case 0:
				var path = child[2];
				this.addElement(new svgimport_SvgPathExporter(this.svg,this.library,path).exportAsElement());
				break;
			case 2:
				var text = child[2];
				this.addElement(new svgimport_SvgTextExporter(this.svg,this.library,text).exportAsElement());
				break;
			case 3:
				var $use = child[2];
				this.addElement(new svgimport_SvgUseExporter(this.svg,this.library,$use).exportAsElement());
				break;
			}
		}
		var namePath;
		if(this.group.clipPathID == null) {
			if(this.group.id != "") namePath = this.group.id; else namePath = this.getNextFreeID();
		} else namePath = this.getNextFreeID(this.group.id);
		var mc = new nanofl.engine.libraryitems.MovieClipItem(namePath);
		this.layers.reverse();
		var _g2 = 0;
		var _g11 = this.layers;
		while(_g2 < _g11.length) {
			var layer = _g11[_g2];
			++_g2;
			mc.addLayer(layer);
		}
		this.library.addItem(mc);
		mc = this.wrapMovieClipItemWithFilter(mc,this.group.filterID,this.getNextFreeID(this.group.id));
		mc = this.wrapMovieClipItemWithMask(mc,new nanofl.engine.geom.Matrix(),this.group.clipPathID,this.getNextFreeID(this.group.id));
		return mc;
	}
	,addElement: function(element,visible) {
		if(visible == null) visible = true;
		if(element == null) return;
		if(this.layers.length == 0) this.createLayerWithFrame("auto_" + this.layers.length);
		var frame = this.layers[this.layers.length - 1].keyFrames[0];
		if(frame.elements.length > 0 && js_Boot.__instanceof(element,nanofl.engine.elements.ShapeElement) || this.layers[this.layers.length - 1].visible != visible) frame = this.createLayerWithFrame("auto_" + this.layers.length,visible);
		frame.addElement(element);
	}
	,createLayerWithFrame: function(name,visible) {
		if(visible == null) visible = true;
		var layer = new nanofl.engine.Layer(name,null,visible);
		var keyFrame = new nanofl.engine.KeyFrame();
		layer.addKeyFrame(keyFrame);
		this.layers.push(layer);
		return keyFrame;
	}
	,__class__: svgimport_SvgGroupExporter
});
var svgimport_SvgPath = function(svg,node,baseStyles,id) {
	svgimport_SvgDisplayObject.call(this,svg,node,baseStyles,id);
	if(this.id != "") {
		var value = svgimport_SvgElement.DisplayPath(this);
		svg.elements.set(this.id,value);
	}
	var styles = svgimport_XmlTools.getStyles(node,baseStyles);
	this.alpha = svgimport_XmlTools.getFloatStyle(node,"opacity",styles,1.0);
	this.fill = svgimport_XmlTools.getFillStyle(node,"fill",styles,svg.gradients);
	this.fillAlpha = svgimport_XmlTools.getFloatStyle(node,"fill-opacity",styles,1.0);
	this.fillRuleEvenOdd = svgimport_XmlTools.getStyle(node,"fill-rule",styles,"nonzero") == "evenodd";
	this.stroke = svgimport_XmlTools.getStrokeStyle(node,"stroke",styles,svg.gradients);
	this.strokeAlpha = svgimport_XmlTools.getFloatStyle(node,"stroke-opacity",styles,1.0);
	this.strokeWidth = svgimport_XmlTools.getFloatStyle(node,"stroke-width",styles,1.0);
	this.strokeCaps = svgimport_XmlTools.getStyle(node,"stroke-linecap",styles,"butt");
	this.strokeJoints = svgimport_XmlTools.getStyle(node,"stroke-linejoin",styles,"miter");
	this.strokeMiterLimit = svgimport_XmlTools.getFloatStyle(node,"stroke-miterlimit",styles,4.0);
	this.segments = [];
	var _g = svgimport_XmlTools.normalizeTag(node.name);
	switch(_g) {
	case "rect":
		var x = svgimport_XmlTools.getFloatValue(node,"x",0);
		var y = svgimport_XmlTools.getFloatValue(node,"y",0);
		var w = svgimport_XmlTools.getFloatValue(node,"width",0);
		var h = svgimport_XmlTools.getFloatValue(node,"height",0);
		var rx = svgimport_XmlTools.getFloatValue(node,"rx",0);
		var ry = svgimport_XmlTools.getFloatValue(node,"ry",rx);
		if(rx == 0 || ry == 0) {
			this.segments.push(new svgimport_segments_MoveSegment(x,y));
			this.segments.push(new svgimport_segments_DrawSegment(x + w,y));
			this.segments.push(new svgimport_segments_DrawSegment(x + w,y + h));
			this.segments.push(new svgimport_segments_DrawSegment(x,y + h));
			this.segments.push(new svgimport_segments_DrawSegment(x,y));
		} else {
			this.segments.push(new svgimport_segments_MoveSegment(x + rx,y));
			this.segments.push(new svgimport_segments_DrawSegment(x + w - rx,y));
			this.segments.push(new svgimport_segments_QuadraticSegment(x + w,y,x + w,y + ry));
			this.segments.push(new svgimport_segments_DrawSegment(x + w,y + h - ry));
			this.segments.push(new svgimport_segments_QuadraticSegment(x + w,y + h,x + w - rx,y + h));
			this.segments.push(new svgimport_segments_DrawSegment(x + rx,y + h));
			this.segments.push(new svgimport_segments_QuadraticSegment(x,y + h,x,y + h - ry));
			this.segments.push(new svgimport_segments_DrawSegment(x,y + ry));
			this.segments.push(new svgimport_segments_QuadraticSegment(x,y,x + rx,y));
		}
		break;
	case "ellipse":case "circle":
		var x1 = svgimport_XmlTools.getFloatValue(node,"cx",0);
		var y1 = svgimport_XmlTools.getFloatValue(node,"cy",0);
		var r = svgimport_XmlTools.getFloatValue(node,"r",0);
		var w1 = svgimport_XmlTools.getFloatValue(node,"rx",r);
		var w_ = w1 * svgimport_SvgPath.SIN45;
		var cw_ = w1 * svgimport_SvgPath.TAN22;
		var h1 = svgimport_XmlTools.getFloatValue(node,"ry",r);
		var h_ = h1 * svgimport_SvgPath.SIN45;
		var ch_ = h1 * svgimport_SvgPath.TAN22;
		this.segments.push(new svgimport_segments_MoveSegment(x1 + w1,y1));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 + w1,y1 + ch_,x1 + w_,y1 + h_));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 + cw_,y1 + h1,x1,y1 + h1));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 - cw_,y1 + h1,x1 - w_,y1 + h_));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 - w1,y1 + ch_,x1 - w1,y1));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 - w1,y1 - ch_,x1 - w_,y1 - h_));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 - cw_,y1 - h1,x1,y1 - h1));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 + cw_,y1 - h1,x1 + w_,y1 - h_));
		this.segments.push(new svgimport_segments_QuadraticSegment(x1 + w1,y1 - ch_,x1 + w1,y1));
		this.strokeCaps = "round";
		this.strokeJoints = "round";
		break;
	case "polyline":
		this.segments = this.segments.concat(svgimport_SegmentsParser.run("M" + node.getAttribute("points")));
		break;
	case "polygon":
		this.segments = this.segments.concat(svgimport_SegmentsParser.run("M" + node.getAttribute("points") + "z"));
		break;
	case "path":
		this.segments = this.segments.concat(svgimport_SegmentsParser.run(node.getAttribute("d")));
		break;
	}
};
svgimport_SvgPath.__name__ = ["svgimport","SvgPath"];
svgimport_SvgPath.__super__ = svgimport_SvgDisplayObject;
svgimport_SvgPath.prototype = $extend(svgimport_SvgDisplayObject.prototype,{
	toElement: function() {
		if(this.segments.length == 0) return null;
		var convertor = new svgimport_SvgPathToShapeConvertor();
		if(this.fill != null && this.fill != svgimport_FillType.FillNone) {
			convertor.beginFill(this);
			var _g = 0;
			var _g1 = this.segments;
			while(_g < _g1.length) {
				var segment = _g1[_g];
				++_g;
				segment["export"](convertor);
			}
			convertor.endFill();
		}
		if(this.stroke != null && this.stroke != svgimport_StrokeType.StrokeNone) {
			convertor.beginStroke(this);
			var _g2 = 0;
			var _g11 = this.segments;
			while(_g2 < _g11.length) {
				var segment1 = _g11[_g2];
				++_g2;
				segment1["export"](convertor);
			}
			convertor.endStroke();
		}
		var shape = convertor.convert();
		shape.applyStrokeAlpha(this.alpha * this.strokeAlpha);
		shape.applyFillAlpha(this.alpha * this.fillAlpha);
		if(shape.isEmpty()) return null;
		return { shape : shape, bounds : convertor.getBounds()};
	}
	,__class__: svgimport_SvgPath
});
var svgimport_SvgPathExporter = function(svg,library,path) {
	svgimport_BaseExporter.call(this,svg,library);
	this.path = path;
};
svgimport_SvgPathExporter.__name__ = ["svgimport","SvgPathExporter"];
svgimport_SvgPathExporter.__super__ = svgimport_BaseExporter;
svgimport_SvgPathExporter.prototype = $extend(svgimport_BaseExporter.prototype,{
	exportAsElement: function() {
		haxe_Log.trace("SvgPathExporter.exportAsElement " + this.path.id,{ fileName : "SvgPathExporter.hx", lineNumber : 28, className : "svgimport.SvgPathExporter", methodName : "exportAsElement"});
		var r = this.exportAsElementInner();
		r = this.applyFilterToElement(r,this.path.filterID,this.path.id);
		r = this.applyMaskToElement(r,this.path.matrix,this.path.clipPathID,this.path.id);
		return r;
	}
	,exportAsElementInner: function() {
		var shapeAndBounds = this.path.toElement();
		if(shapeAndBounds == null) return null;
		var shape = shapeAndBounds.shape;
		var bounds = shapeAndBounds.bounds;
		var canIgnoreStroke = shape.edges.length == 0 || this.path.stroke == svgimport_StrokeType.StrokeNone || this.path.stroke[1] == 1;
		var canIgnoreFill = shape.polygons.length == 0 || this.path.fill == svgimport_FillType.FillNone || this.path.fill[1] == 1;
		var aspectRatio = 1.0;
		var strokeMatrix = new nanofl.engine.geom.Matrix();
		if(!canIgnoreStroke) {
			var _g = this.path.stroke;
			switch(_g[1]) {
			case 2:
				var gradType = _g[2];
				switch(gradType[1]) {
				case 0:
					var grad = gradType[2];
					strokeMatrix = grad.matrix;
					aspectRatio = this.getApsectRatio(bounds,grad);
					break;
				case 1:
					var grad1 = gradType[2];
					strokeMatrix = grad1.matrix;
					aspectRatio = this.getApsectRatio(bounds,grad1);
					break;
				}
				break;
			default:
			}
		}
		var fillMatrix = new nanofl.engine.geom.Matrix();
		if(!canIgnoreFill) {
			var _g1 = this.path.fill;
			switch(_g1[1]) {
			case 2:
				var gradType1 = _g1[2];
				switch(gradType1[1]) {
				case 0:
					var grad2 = gradType1[2];
					fillMatrix = grad2.matrix;
					aspectRatio = this.getApsectRatio(bounds,grad2);
					break;
				case 1:
					var grad3 = gradType1[2];
					fillMatrix = grad3.matrix;
					aspectRatio = this.getApsectRatio(bounds,grad3);
					break;
				}
				break;
			default:
			}
		}
		if((canIgnoreStroke || strokeMatrix.isIdentity() && aspectRatio == 1.0) && (canIgnoreFill || fillMatrix.isIdentity() && aspectRatio == 1.0)) {
			if(this.path.matrix.isIdentity()) return shape;
			var item = this.elementsToLibraryItem([shape],this.getNextFreeID(this.path.id));
			var instance = item.newInstance();
			instance.matrix = this.path.matrix;
			return instance;
		} else if(canIgnoreStroke) {
			stdlib_Debug.assert(!fillMatrix.isIdentity() || aspectRatio != 1.0,null,{ fileName : "SvgPathExporter.hx", lineNumber : 106, className : "svgimport.SvgPathExporter", methodName : "exportAsElementInner"});
			var instance1 = this.shapeToInstance(shape,bounds,fillMatrix,aspectRatio,this.getNextFreeID(this.path.id));
			if(!instance1.matrix.isIdentity()) instance1 = this.elementsToLibraryItem([instance1],this.getNextFreeID(this.path.id)).newInstance();
			instance1.matrix.prependMatrix(this.path.matrix);
			return instance1;
		} else if(canIgnoreFill) {
			stdlib_Debug.assert(!strokeMatrix.isIdentity() || aspectRatio != 1.0,null,{ fileName : "SvgPathExporter.hx", lineNumber : 116, className : "svgimport.SvgPathExporter", methodName : "exportAsElementInner"});
			var instance2 = this.shapeToInstance(shape,bounds,strokeMatrix,aspectRatio,this.getNextFreeID(this.path.id));
			if(!instance2.matrix.isIdentity()) instance2 = this.elementsToLibraryItem([instance2],this.getNextFreeID(this.path.id)).newInstance();
			instance2.matrix.prependMatrix(this.path.matrix);
			return instance2;
		} else {
			var item1 = this.elementsToLibraryItem([this.shapeToInstance(new nanofl.engine.elements.ShapeElement(null,shape.polygons),bounds,fillMatrix,aspectRatio,this.getNextFreeID(this.path.id)),this.shapeToInstance(new nanofl.engine.elements.ShapeElement(shape.edges),bounds,strokeMatrix,aspectRatio,this.getNextFreeID(this.path.id))],this.getNextFreeID(this.path.id));
			var instance3 = item1.newInstance();
			instance3.matrix = this.path.matrix;
			return instance3;
		}
		stdlib_Debug.assert(false,null,{ fileName : "SvgPathExporter.hx", lineNumber : 139, className : "svgimport.SvgPathExporter", methodName : "exportAsElementInner"});
		return null;
	}
	,exportToLibrary: function() {
		stdlib_Debug.assert(this.path.id != null && this.path.id != "",null,{ fileName : "SvgPathExporter.hx", lineNumber : 145, className : "svgimport.SvgPathExporter", methodName : "exportToLibrary"});
		stdlib_Debug.assert(!this.library.hasItem(this.path.id),null,{ fileName : "SvgPathExporter.hx", lineNumber : 146, className : "svgimport.SvgPathExporter", methodName : "exportToLibrary"});
		var element = this.exportAsElement();
		if(element == null) return null;
		if(js_Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) return this.elementsToLibraryItem([element],this.path.id); else return js_Boot.__cast(this.library.getItem((js_Boot.__cast(element , nanofl.engine.elements.Instance)).namePath) , nanofl.engine.libraryitems.MovieClipItem);
	}
	,shapeToInstance: function(shape,bounds,matrix,aspectRatio,id) {
		shape = shape.clone();
		matrix = matrix.clone();
		if(aspectRatio != 1.0) {
			matrix.translate(-bounds.minX,-bounds.minY);
			matrix.scale(1,aspectRatio);
			matrix.translate(bounds.minX,bounds.minY);
		}
		var invertMatrix = matrix.clone().invert();
		shape.transform(invertMatrix,false);
		var k = invertMatrix.getAverageScale();
		nanofl.engine.geom.StrokeEdges.processStrokes(shape.edges,function(stroke) {
			stroke.thickness *= k;
		});
		var item = this.elementsToLibraryItem([shape],id);
		var instance = item.newInstance();
		instance.matrix = matrix.clone();
		return instance;
	}
	,getApsectRatio: function(bounds,grad) {
		if(grad.gradientUnits != "userSpaceOnUse" && bounds.maxX - bounds.minX > svgimport_SvgPathExporter.EPS) return (bounds.maxY - bounds.minY) / (bounds.maxX - bounds.minX);
		return 1.0;
	}
	,__class__: svgimport_SvgPathExporter
});
var svgimport_SvgPathToShapeConvertor = function() {
	this.y = null;
	this.x = null;
	this.fillPath = null;
	this.stroke = null;
	this.polygonAndFillRules = [];
	this.edges = [];
};
svgimport_SvgPathToShapeConvertor.__name__ = ["svgimport","SvgPathToShapeConvertor"];
svgimport_SvgPathToShapeConvertor.log = function(v,infos) {
};
svgimport_SvgPathToShapeConvertor.prototype = {
	beginFill: function(path) {
		if(path.fill != svgimport_FillType.FillNone) this.fillPath = path; else this.fillPath = null;
		this.polygonAndFillRules.push({ polygon : new nanofl.engine.geom.Polygon(null), fillRuleEvenOdd : path.fillRuleEvenOdd});
	}
	,endFill: function() {
		if(this.fillPath != null) {
			this.closeContour();
			var polygon = this.polygonAndFillRules[this.polygonAndFillRules.length - 1].polygon;
			{
				var _g = this.fillPath.fill;
				switch(_g[1]) {
				case 1:
					var color = _g[2];
					polygon.fill = new nanofl.engine.fills.SolidFill(color);
					break;
				case 2:
					var gradType = _g[2];
					var bounds = polygon.getBounds();
					switch(gradType[1]) {
					case 0:
						var grad = gradType[2];
						var params = grad.getAbsoluteParams(bounds);
						polygon.fill = new nanofl.engine.fills.LinearFill(this.getGradientRgbaColors(grad),grad.ratios,params.x1,params.y1,params.x2,params.y2);
						break;
					case 1:
						var grad1 = gradType[2];
						if(grad1.spreadMethod != "" && grad1.spreadMethod != "pad") haxe_Log.trace("Radial spread method 'pad' is only supported ('" + grad1.spreadMethod + "').",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 76, className : "svgimport.SvgPathToShapeConvertor", methodName : "endFill"});
						var params1 = grad1.getAbsoluteParams(bounds);
						polygon.fill = new nanofl.engine.fills.RadialFill(this.getGradientRgbaColors(grad1),grad1.ratios,params1.cx,params1.cy,params1.r,params1.fx,params1.fy);
						break;
					}
					break;
				case 0:
					break;
				}
			}
			this.fillPath = null;
		}
	}
	,beginStroke: function(path) {
		{
			var _g = path.stroke;
			switch(_g[1]) {
			case 0:
				this.stroke = null;
				break;
			case 1:
				var color = _g[2];
				this.stroke = new nanofl.engine.strokes.SolidStroke(color,path.strokeWidth,path.strokeCaps,path.strokeJoints,path.strokeMiterLimit,false);
				break;
			case 2:
				var gradType = _g[2];
				switch(gradType[1]) {
				case 0:
					var grad = gradType[2];
					this.stroke = new nanofl.engine.strokes.LinearStroke(this.getGradientRgbaColors(grad),grad.ratios,grad.x1,grad.y1,grad.x2,grad.y2,path.strokeWidth,path.strokeCaps,path.strokeJoints,path.strokeMiterLimit,false);
					break;
				case 1:
					var grad1 = gradType[2];
					this.stroke = new nanofl.engine.strokes.RadialStroke(this.getGradientRgbaColors(grad1),grad1.ratios,grad1.cx,grad1.cy,grad1.r,grad1.fx,grad1.fy,path.strokeWidth,path.strokeCaps,path.strokeJoints,path.strokeMiterLimit,false);
					break;
				}
				break;
			}
		}
	}
	,endStroke: function() {
	}
	,moveTo: function(x,y) {
		if(this.fillPath != null) {
			this.closeContour();
			this.polygonAndFillRules[this.polygonAndFillRules.length - 1].polygon.contours.push(new nanofl.engine.geom.Contour([]));
		}
		this.x = x;
		this.y = y;
	}
	,lineTo: function(x,y) {
		if(this.fillPath != null) {
			var contours = this.polygonAndFillRules[this.polygonAndFillRules.length - 1].polygon.contours;
			contours[contours.length - 1].edges.push(new nanofl.engine.geom.Edge(this.x,this.y,x,y));
		} else if(this.stroke != null) this.edges.push(new nanofl.engine.geom.StrokeEdge(this.x,this.y,x,y,null,null,this.stroke));
		this.x = x;
		this.y = y;
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.fillPath != null) {
			var contours = this.polygonAndFillRules[this.polygonAndFillRules.length - 1].polygon.contours;
			contours[contours.length - 1].edges.push(new nanofl.engine.geom.Edge(this.x,this.y,controlX,controlY,anchorX,anchorY));
		} else if(this.stroke != null) this.edges.push(new nanofl.engine.geom.StrokeEdge(this.x,this.y,controlX,controlY,anchorX,anchorY,this.stroke));
		this.x = anchorX;
		this.y = anchorY;
	}
	,convert: function() {
		svgimport_SvgPathToShapeConvertor.log("SvgPathExporter.export vvvvvvvvvvvvvvvvvvvvvvvvvvvv edges = " + (this.polygonAndFillRules.length > 0?this.polygonAndFillRules[0].polygon.getEdges().length:0),{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 204, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		var shape = new nanofl.engine.elements.ShapeElement();
		var _g = 0;
		var _g1 = this.polygonAndFillRules;
		while(_g < _g1.length) {
			var pf = _g1[_g];
			++_g;
			svgimport_SvgPathToShapeConvertor.log("Polygons.fromEdges vvvvvvvvvvvvvvv contours.edges = " + nanofl.engine.geom.Contours.getEdges(pf.polygon.contours).length + "; fill = " + Std.string(pf.polygon.fill) + "; fillRuleEvenOdd = " + (pf.fillRuleEvenOdd == null?"null":"" + pf.fillRuleEvenOdd),{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 209, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
			if(nanofl.engine.geom.Contours.getEdges(pf.polygon.contours).length >= 0) svgimport_SvgPathToShapeConvertor.log("------------------- CONTOURS FOR Polygons.fromContours:\n" + pf.polygon.contours.join(",\n"),{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 212, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
			var polygons = nanofl.engine.geom.Polygons.fromRawContours(pf.polygon.contours,pf.polygon.fill,pf.fillRuleEvenOdd);
			var _g2 = 0;
			while(_g2 < polygons.length) {
				var p = polygons[_g2];
				++_g2;
				p.assertCorrect();
			}
			svgimport_SvgPathToShapeConvertor.log("Polygons.fromEdges ^^^^^^^^^^^^^^^ polygons = " + polygons.length,{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 216, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
			var shape2 = new nanofl.engine.elements.ShapeElement([],polygons);
			svgimport_SvgPathToShapeConvertor.log("shape.combine vvvvvvvvvvvvvvvvv " + shape.getEdgeCount() + " + " + shape2.getEdgeCount(),{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 220, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
			shape.combine(shape2);
			svgimport_SvgPathToShapeConvertor.log("shape.combine ^^^^^^^^^^^^^^^^^",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 222, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		svgimport_SvgPathToShapeConvertor.log("normalize vvvvvvvvvvvvvv",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 225, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		var _g3 = 0;
		var _g11 = this.edges;
		while(_g3 < _g11.length) {
			var e = _g11[_g3];
			++_g3;
			stdlib_Debug.assert(e.stroke != null,"(1)",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 226, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		nanofl.engine.geom.Edges.normalize(this.edges);
		var _g4 = 0;
		var _g12 = this.edges;
		while(_g4 < _g12.length) {
			var e1 = _g12[_g4];
			++_g4;
			stdlib_Debug.assert(e1.stroke != null,"(2)",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 228, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		svgimport_SvgPathToShapeConvertor.log("normalize ^^^^^^^^^^^^^^",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 229, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		svgimport_SvgPathToShapeConvertor.log("intersectSelf vvvvvvvvvvvvvv",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 231, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		var _g5 = 0;
		var _g13 = this.edges;
		while(_g5 < _g13.length) {
			var e2 = _g13[_g5];
			++_g5;
			stdlib_Debug.assert(e2.stroke != null,"(3)",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 232, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		nanofl.engine.geom.Edges.intersectSelf(this.edges);
		var _g6 = 0;
		var _g14 = this.edges;
		while(_g6 < _g14.length) {
			var e3 = _g14[_g6];
			++_g6;
			stdlib_Debug.assert(e3.stroke != null,"(4)",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 234, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		svgimport_SvgPathToShapeConvertor.log("intersectSelf ^^^^^^^^^^^^^^",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 235, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		svgimport_SvgPathToShapeConvertor.log("shape.combine stroke vvvvvvvvvvvvvv",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 237, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		var _g7 = 0;
		var _g15 = this.edges;
		while(_g7 < _g15.length) {
			var e4 = _g15[_g7];
			++_g7;
			stdlib_Debug.assert(e4.stroke != null,"(5)",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 238, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		shape.combine(new nanofl.engine.elements.ShapeElement(this.edges));
		var _g8 = 0;
		var _g16 = this.edges;
		while(_g8 < _g16.length) {
			var e5 = _g16[_g8];
			++_g8;
			stdlib_Debug.assert(e5.stroke != null,"(6)",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 240, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		}
		svgimport_SvgPathToShapeConvertor.log("shape.combine stroke ^^^^^^^^^^^^^^",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 241, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		svgimport_SvgPathToShapeConvertor.log("SvgPathExporter.export ^^^^^^^^^^^^^^^^^^^^^^^^^^^^",{ fileName : "SvgPathToShapeConvertor.hx", lineNumber : 243, className : "svgimport.SvgPathToShapeConvertor", methodName : "convert"});
		return shape;
	}
	,getBounds: function() {
		if(this.boundsCache != null) return this.boundsCache;
		this.boundsCache = { minX : 1e100, minY : 1e100, maxX : -1e100, maxY : -1e100};
		nanofl.engine.geom.Edges.getBounds(this.edges,this.boundsCache);
		var _g = 0;
		var _g1 = this.polygonAndFillRules;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.polygon.getBounds(this.boundsCache);
		}
		return this.boundsCache;
	}
	,closeContour: function() {
		var contours = this.polygonAndFillRules[this.polygonAndFillRules.length - 1].polygon.contours;
		if(contours.length > 0) {
			var edges = contours[contours.length - 1].edges;
			if(edges.length > 0) {
				var edge1 = edges[0];
				var edge2 = edges[edges.length - 1];
				if(edge1.x1 != edge2.x3 || edge1.y1 != edge2.y3) edges.push(new nanofl.engine.geom.Edge(edge2.x3,edge2.y3,edge1.x1,edge1.y1));
			}
		}
	}
	,getGradientRgbaColors: function(grad) {
		return Lambda.array(Lambda.mapi(grad.colors,function(i,c) {
			return nanofl.engine.ColorTools.colorToString(c,grad.alphas[i]);
		}));
	}
	,__class__: svgimport_SvgPathToShapeConvertor
};
var svgimport_SvgText = function(node,baseStyles,gradients) {
	this.matrix = svgimport_Transform.load(node.getAttribute("transform"));
	var styles = svgimport_XmlTools.getStyles(node,baseStyles);
	this.name = htmlparser.HtmlParserTools.getAttr(node,"id","");
	var x = svgimport_XmlTools.getFloatValue(node,"x",0);
	var y = svgimport_XmlTools.getFloatValue(node,"y",0);
	if(x != 0 || y != 0) this.matrix.appendTransform(x,y);
	this.fill = svgimport_XmlTools.getFillStyle(node,"fill",styles,gradients);
	this.fillAlpha = svgimport_XmlTools.getFloatStyle(node,"fill-opacity",styles,1);
	this.stroke = svgimport_XmlTools.getStrokeStyle(node,"stroke",styles,gradients);
	this.strokeAlpha = svgimport_XmlTools.getFloatStyle(node,"stroke-opacity",styles,1);
	this.strokeWidth = svgimport_XmlTools.getFloatStyle(node,"stroke-width",styles,1);
	this.fontFamily = svgimport_XmlTools.getStyle(node,"font-family",styles,"");
	this.fontSize = svgimport_XmlTools.getFloatStyle(node,"font-size",styles,12);
	this.fontStyle = svgimport_XmlTools.getStyle(node,"font-style",styles,"");
	this.fontWeight = svgimport_XmlTools.getStyle(node,"font-weight",styles,"");
	this.kerning = svgimport_XmlTools.getFloatStyle(node,"kerning",styles,0);
	this.letterSpacing = svgimport_XmlTools.getFloatStyle(node,"letter-spacing",styles,0);
	this.textAnchor = svgimport_XmlTools.getStyle(node,"text-anchor",styles,"left");
	this.text = node.innerText;
};
svgimport_SvgText.__name__ = ["svgimport","SvgText"];
svgimport_SvgText.prototype = {
	__class__: svgimport_SvgText
};
var svgimport_SvgTextExporter = function(svg,library,text) {
	svgimport_BaseExporter.call(this,svg,library);
	this.text = text;
};
svgimport_SvgTextExporter.__name__ = ["svgimport","SvgTextExporter"];
svgimport_SvgTextExporter.__super__ = svgimport_BaseExporter;
svgimport_SvgTextExporter.prototype = $extend(svgimport_BaseExporter.prototype,{
	exportAsElement: function() {
		var fillColor;
		{
			var _g = this.text.fill;
			switch(_g[1]) {
			case 0:
				fillColor = null;
				break;
			case 1:
				var color1 = _g[2];
				fillColor = color1;
				break;
			case 2:
				var gradType = _g[2];
				haxe_Log.trace("Text gradients is not supported.",{ fileName : "SvgTextExporter.hx", lineNumber : 26, className : "svgimport.SvgTextExporter", methodName : "exportAsElement"});
				fillColor = "#000000";
				break;
			}
		}
		var color;
		{
			var _g1 = this.text.stroke;
			switch(_g1[1]) {
			case 1:
				var c = _g1[2];
				color = c;
				break;
			case 0:
				color = null;
				break;
			default:
				color = "#000000";
			}
		}
		var r = new nanofl.engine.elements.TextElement(this.text.name,0,0,false,false,[nanofl.TextRun.create(this.text.text,fillColor,this.text.fontFamily,"",this.text.fontSize,"left",this.text.strokeWidth,color,true,this.text.letterSpacing,0)]);
		r.matrix = this.text.matrix.clone();
		var t = r.createDisplayObject(null);
		var fontHeight = nanofl.TextField.measureFontHeight(this.text.fontFamily,this.text.fontStyle,this.text.fontSize);
		var fontBaselineCoef = nanofl.TextField.measureFontBaselineCoef(this.text.fontFamily,this.text.fontStyle);
		r.matrix.appendTransform(0,-fontHeight * fontBaselineCoef - nanofl.TextField.PADDING);
		var _g2 = this.text.textAnchor;
		switch(_g2) {
		case "middle":
			r.matrix.appendTransform(-t.minWidth / 2,0);
			break;
		case "end":
			r.matrix.appendTransform(-t.minWidth + nanofl.TextField.PADDING,0);
			break;
		default:
			r.matrix.appendTransform(-nanofl.TextField.PADDING,0);
		}
		return r;
	}
	,__class__: svgimport_SvgTextExporter
});
var svgimport_SvgUse = function(svg,node,baseStyles) {
	svgimport_SvgDisplayObject.call(this,svg,node,baseStyles,this.id);
	this.groupID = svgimport_XmlTools.getIdFromXlink(node);
	if(this.groupID == null) {
		haxe_Log.trace("Use: 'xlink:href' attribute must be specified.",{ fileName : "SvgUse.hx", lineNumber : 20, className : "svgimport.SvgUse", methodName : "new"});
		return;
	}
	var x = svgimport_XmlTools.getFloatValue(node,"x",0);
	var y = svgimport_XmlTools.getFloatValue(node,"y",0);
	if(x != 0 || y != 0) this.matrix.appendTransform(x,y);
	this.styles = svgimport_XmlTools.getStyles(node,baseStyles);
};
svgimport_SvgUse.__name__ = ["svgimport","SvgUse"];
svgimport_SvgUse.__super__ = svgimport_SvgDisplayObject;
svgimport_SvgUse.prototype = $extend(svgimport_SvgDisplayObject.prototype,{
	__class__: svgimport_SvgUse
});
var svgimport_SvgUseExporter = function(svg,library,$use) {
	svgimport_BaseExporter.call(this,svg,library);
	this["use"] = $use;
};
svgimport_SvgUseExporter.__name__ = ["svgimport","SvgUseExporter"];
svgimport_SvgUseExporter.__super__ = svgimport_BaseExporter;
svgimport_SvgUseExporter.prototype = $extend(svgimport_BaseExporter.prototype,{
	exportAsElement: function() {
		return this.applyMaskToElement(this.exportAsElementInner(),this["use"].matrix,this["use"].clipPathID,this.getNextFreeID(this["use"].groupID));
	}
	,exportAsElementInner: function() {
		var namePath = this["use"].groupID;
		if(this["use"].styles.keys().hasNext()) {
			var element = this.svg.elements.get(this["use"].groupID);
			if(element != null) switch(element[1]) {
			case 1:
				var base = element[2];
				var g = new svgimport_SvgGroup(this.svg,base.node,this["use"].styles,this.getNextFreeID(base.id));
				namePath = new svgimport_SvgGroupExporter(this.svg,this.library,g).exportToLibrary().namePath;
				break;
			case 0:
				var base1 = element[2];
				var p = new svgimport_SvgPath(this.svg,base1.node,this["use"].styles,this.getNextFreeID(base1.id));
				var item = new svgimport_SvgPathExporter(this.svg,this.library,p).exportToLibrary();
				if(item == null) return null;
				namePath = item.namePath;
				break;
			default:
			} else haxe_Log.trace("WARNING: Element '" + this["use"].groupID + "' is not found.",{ fileName : "SvgUseExporter.hx", lineNumber : 48, className : "svgimport.SvgUseExporter", methodName : "exportAsElementInner"});
		}
		var instance = new nanofl.engine.elements.Instance(namePath);
		instance.matrix = this["use"].matrix.clone().appendMatrix(this.getSvgElementMatrix(this.svg.elements.get(this["use"].groupID)));
		return instance;
	}
	,getSvgElementMatrix: function(element) {
		if(element == null) return new nanofl.engine.geom.Matrix();
		switch(element[1]) {
		case 1:
			var g = element[2];
			return g.matrix;
		case 0:
			var p = element[2];
			return p.matrix;
		default:
			return new nanofl.engine.geom.Matrix();
		}
	}
	,__class__: svgimport_SvgUseExporter
});
var svgimport_Transform = function() { };
svgimport_Transform.__name__ = ["svgimport","Transform"];
svgimport_Transform.load = function(trans) {
	if(trans == null || trans == "") return new nanofl.engine.geom.Matrix();
	var matrix = new nanofl.engine.geom.Matrix();
	var re = new EReg("^\\s*([a-zA-Z]+)\\s*\\(([^)]*)\\)\\s*","");
	while(re.match(trans)) {
		var params = new EReg("[ \t\r\n,]+","g").split(re.matched(2)).map(Std.parseFloat);
		var _g = re.matched(1);
		switch(_g) {
		case "translate":
			if(params.length == 2) matrix.appendTransform(params[0],params[1]); else if(params.length == 1) matrix.appendTransform(params[0],0); else haxe_Log.trace("Transform/translate: invalid params '" + re.matched(2) + "'.",{ fileName : "Transform.hx", lineNumber : 32, className : "svgimport.Transform", methodName : "load"});
			break;
		case "scale":
			if(params.length == 2) matrix.appendTransform(0,0,params[0],params[1]); else if(params.length == 1) matrix.appendTransform(0,0,params[0],params[0]); else haxe_Log.trace("Transform/scale: invalid params '" + re.matched(2) + "'.",{ fileName : "Transform.hx", lineNumber : 47, className : "svgimport.Transform", methodName : "load"});
			break;
		case "rotate":
			if(params.length == 1) matrix.appendTransform(0,0,1,1,params[0]); else if(params.length == 2) {
				matrix.appendTransform(params[1],0,1,1,0);
				matrix.appendTransform(0,0,1,1,params[0]);
				matrix.appendTransform(-params[1],0);
			} else if(params.length == 3) {
				matrix.appendTransform(params[1],params[2],1,1,0);
				matrix.appendTransform(0,0,1,1,params[0]);
				matrix.appendTransform(-params[1],-params[2]);
			} else haxe_Log.trace("Transform/rotate: invalid params '" + re.matched(2) + "'.",{ fileName : "Transform.hx", lineNumber : 71, className : "svgimport.Transform", methodName : "load"});
			break;
		case "matrix":
			if(params.length == 6) matrix.append(params[0],params[1],params[2],params[3],params[4],params[5]);
			break;
		default:
			haxe_Log.trace("Unknow transform: '" + re.matched(1) + "'.",{ fileName : "Transform.hx", lineNumber : 89, className : "svgimport.Transform", methodName : "load"});
		}
		trans = re.matchedRight();
	}
	return matrix;
};
var svgimport_XmlTools = function() { };
svgimport_XmlTools.__name__ = ["svgimport","XmlTools"];
svgimport_XmlTools.getStyles = function(node,baseStyles) {
	var styles = new haxe_ds_StringMap();
	if(baseStyles != null) {
		var $it0 = baseStyles.keys();
		while( $it0.hasNext() ) {
			var s = $it0.next();
			if(HxOverrides.indexOf(svgimport_SvgAttributes.presentationNoInherit,s,0) < 0) {
				var value;
				value = __map_reserved[s] != null?baseStyles.getReserved(s):baseStyles.h[s];
				if(__map_reserved[s] != null) styles.setReserved(s,value); else styles.h[s] = value;
			}
		}
	}
	var _g = 0;
	var _g1 = svgimport_SvgAttributes.presentation;
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		if(node.hasAttribute(key)) {
			var value1 = node.getAttribute(key);
			if(__map_reserved[key] != null) styles.setReserved(key,value1); else styles.h[key] = value1;
		}
	}
	svgimport_XmlTools.parseStyleAttr(node,styles);
	return styles;
};
svgimport_XmlTools.parseStyleAttr = function(node,r) {
	if(r == null) r = new haxe_ds_StringMap();
	if(node.hasAttribute("style")) {
		var _g = 0;
		var _g1 = node.getAttribute("style").split(";");
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(svgimport_XmlTools.reStyleValue.match(s)) {
				var key = svgimport_XmlTools.reStyleValue.matched(1);
				var value = svgimport_XmlTools.reStyleValue.matched(2);
				if(__map_reserved[key] != null) r.setReserved(key,value); else r.h[key] = value;
			}
		}
	}
	return r;
};
svgimport_XmlTools.getFloatStyle = function(node,key,styles,defaultValue) {
	return svgimport_XmlTools.toFloat(svgimport_XmlTools.getStyle(node,key,styles,""),defaultValue);
};
svgimport_XmlTools.getFloatValue = function(node,key,defaultValue) {
	return svgimport_XmlTools.toFloat(node.getAttribute(key),defaultValue);
};
svgimport_XmlTools.toFloat = function(s,defaultValue) {
	if(s == null || s == "") return defaultValue;
	if(StringTools.startsWith(s,".")) s = "0" + s;
	if(StringTools.endsWith(s,"%")) return Std.parseFloat(s.substring(0,s.length - 1)) / 100;
	if(StringTools.endsWith(s,"pt")) return Std.parseFloat(s.substring(0,s.length - 2)) * 1.25;
	if(StringTools.endsWith(s,"pc")) return Std.parseFloat(s.substring(0,s.length - 2)) * 15;
	if(StringTools.endsWith(s,"mm")) return Std.parseFloat(s.substring(0,s.length - 2)) * 3.543307;
	if(StringTools.endsWith(s,"cm")) return Std.parseFloat(s.substring(0,s.length - 2)) * 35.43307;
	if(StringTools.endsWith(s,"in")) return Std.parseFloat(s.substring(0,s.length - 2)) * 90;
	var r = parseFloat(s);
	if(r != null && !isNaN(r)) return r; else return defaultValue;
};
svgimport_XmlTools.getStyle = function(node,key,styles,defaultValue) {
	if(node != null && node.hasAttribute(key)) return node.getAttribute(key);
	var t = svgimport_XmlTools.parseStyleAttr(node);
	if(__map_reserved[key] != null?t.existsReserved(key):t.h.hasOwnProperty(key)) return __map_reserved[key] != null?t.getReserved(key):t.h[key];
	if(styles != null && (__map_reserved[key] != null?styles.existsReserved(key):styles.h.hasOwnProperty(key)) && HxOverrides.indexOf(svgimport_SvgAttributes.presentationNoInherit,key,0) < 0) return __map_reserved[key] != null?styles.getReserved(key):styles.h[key];
	return defaultValue;
};
svgimport_XmlTools.getColorStyle = function(node,key,styles,defaultValue) {
	var s = svgimport_XmlTools.getStyle(node,key,styles,defaultValue);
	return s;
};
svgimport_XmlTools.getFillStyle = function(node,key,styles,gradients) {
	var s = svgimport_XmlTools.getStyle(node,key,styles,"");
	if(s == "") return svgimport_FillType.FillSolid("#000000");
	if(s == "none") return svgimport_FillType.FillNone;
	if(svgimport_XmlTools.reURLMatch.match(s)) {
		var url = svgimport_XmlTools.reURLMatch.matched(1);
		if(__map_reserved[url] != null?gradients.existsReserved(url):gradients.h.hasOwnProperty(url)) return svgimport_FillType.FillGrad(__map_reserved[url] != null?gradients.getReserved(url):gradients.h[url]);
		haxe_Log.trace("WARNING: Unknown url('" + url + "').",{ fileName : "XmlTools.hx", lineNumber : 104, className : "svgimport.XmlTools", methodName : "getFillStyle"});
		return svgimport_FillType.FillNone;
	}
	return svgimport_FillType.FillSolid(s);
};
svgimport_XmlTools.getStrokeStyle = function(node,key,styles,gradients) {
	var s = svgimport_XmlTools.getStyle(node,key,styles,"");
	if(s == "" || s == "none") return svgimport_StrokeType.StrokeNone;
	if(svgimport_XmlTools.reURLMatch.match(s)) {
		var url = svgimport_XmlTools.reURLMatch.matched(1);
		if(__map_reserved[url] != null?gradients.existsReserved(url):gradients.h.hasOwnProperty(url)) return svgimport_StrokeType.StrokeGrad(__map_reserved[url] != null?gradients.getReserved(url):gradients.h[url]);
		haxe_Log.trace("WARNING: Unknown url('" + url + "').",{ fileName : "XmlTools.hx", lineNumber : 121, className : "svgimport.XmlTools", methodName : "getStrokeStyle"});
		return svgimport_StrokeType.StrokeNone;
	}
	return svgimport_StrokeType.StrokeSolid(s);
};
svgimport_XmlTools.normalizeTag = function(s) {
	if(StringTools.startsWith(s,"svg:")) return s.substring("svg:".length); else return s;
};
svgimport_XmlTools.getIdFromXlink = function(node) {
	var xlink = StringTools.trim(htmlparser.HtmlParserTools.getAttr(node,"xlink:href",""));
	if(xlink == "") return null;
	if(!StringTools.startsWith(xlink,"#")) {
		haxe_Log.trace("WARNING: Unkown xlink syntax ('" + xlink + "').",{ fileName : "XmlTools.hx", lineNumber : 139, className : "svgimport.XmlTools", methodName : "getIdFromXlink"});
		return null;
	}
	return xlink.substring(1);
};
svgimport_XmlTools.getIdFromUrl = function(s) {
	if(s == null) return null;
	var s1 = StringTools.trim(s);
	if(s1 == "") return null;
	if(svgimport_XmlTools.reURLMatch.match(s1)) return svgimport_XmlTools.reURLMatch.matched(1);
	haxe_Log.trace("WARNING: Unkown url syntax ('" + s1 + "').",{ fileName : "XmlTools.hx", lineNumber : 151, className : "svgimport.XmlTools", methodName : "getIdFromUrl"});
	return null;
};
var svgimport_gradients_Gradient = function(node,baseType) {
	var base = null;
	if(baseType != null) switch(baseType[1]) {
	case 0:
		var grad = baseType[2];
		base = grad;
		break;
	case 1:
		var grad1 = baseType[2];
		base = grad1;
		break;
	}
	if(node.hasAttribute("gradientUnits")) this.gradientUnits = node.getAttribute("gradientUnits"); else if(base != null) this.gradientUnits = base.gradientUnits; else this.gradientUnits = "";
	if(base != null) this.colors = base.colors.slice(); else this.colors = [];
	if(base != null) this.alphas = base.alphas.slice(); else this.alphas = [];
	if(base != null) this.ratios = base.ratios.slice(); else this.ratios = [];
	var _g = 0;
	var _g1 = node.children;
	while(_g < _g1.length) {
		var stop = _g1[_g];
		++_g;
		var styles = svgimport_XmlTools.getStyles(stop,null);
		this.colors.push(svgimport_XmlTools.getColorStyle(stop,"stop-color",styles,"#000000"));
		this.alphas.push(svgimport_XmlTools.getFloatStyle(stop,"stop-opacity",styles,1));
		this.ratios.push(svgimport_XmlTools.getFloatStyle(stop,"offset",null,0));
	}
	this.matrix = svgimport_Transform.load(node.getAttribute("gradientTransform"));
	if(base != null) this.matrix.prependMatrix(base.matrix);
};
svgimport_gradients_Gradient.__name__ = ["svgimport","gradients","Gradient"];
svgimport_gradients_Gradient.load = function(svg,node,baseType) {
	var _g = svgimport_XmlTools.normalizeTag(node.name);
	switch(_g) {
	case "linearGradient":
		return svgimport_gradients_GradientType.LINEAR(new svgimport_gradients_LinearGradient(node,baseType,svg.viewBox != null?svg.viewBox.width:svg.width));
	case "radialGradient":
		return svgimport_gradients_GradientType.RADIAL(new svgimport_gradients_RadialGradient(node,baseType));
	default:
		throw new js__$Boot_HaxeError("Unknow gradient tag '" + node.name + "'.");
	}
};
svgimport_gradients_Gradient.prototype = {
	__class__: svgimport_gradients_Gradient
};
var svgimport_gradients_GradientType = { __ename__ : ["svgimport","gradients","GradientType"], __constructs__ : ["LINEAR","RADIAL"] };
svgimport_gradients_GradientType.LINEAR = function(grad) { var $x = ["LINEAR",0,grad]; $x.__enum__ = svgimport_gradients_GradientType; $x.toString = $estr; return $x; };
svgimport_gradients_GradientType.RADIAL = function(grad) { var $x = ["RADIAL",1,grad]; $x.__enum__ = svgimport_gradients_GradientType; $x.toString = $estr; return $x; };
var svgimport_gradients_LinearGradient = function(node,baseType,svgWidth) {
	svgimport_gradients_Gradient.call(this,node,baseType);
	var base = null;
	if(baseType != null) switch(baseType[1]) {
	case 0:
		var grad = baseType[2];
		base = grad;
		break;
	default:
	}
	this.x1 = svgimport_XmlTools.getFloatValue(node,"x1",base != null?base.x1:null);
	this.y1 = svgimport_XmlTools.getFloatValue(node,"y1",base != null?base.y1:null);
	this.x2 = svgimport_XmlTools.getFloatValue(node,"x2",base != null?base.x2:null);
	this.y2 = svgimport_XmlTools.getFloatValue(node,"y2",base != null?base.y2:null);
	if(this.gradientUnits == "userSpaceOnUse") {
		if(this.x1 == null) this.x1 = 0;
		if(this.y1 == null) this.y1 = 0;
		if(this.x2 == null) this.x2 = svgWidth;
		if(this.y2 == null) this.y2 = 0;
	} else if(this.x1 == null && this.y1 == null && this.x2 == null && this.y2 == null) {
		this.x1 = 0;
		this.y1 = 0;
		this.x2 = 1;
		this.y2 = 0;
	} else {
		if(this.x1 == null) this.x1 = 0;
		if(this.y1 == null) this.y1 = 0;
		if(this.x2 == null) this.x2 = 0;
		if(this.y2 == null) this.y2 = 0;
	}
	this.spreadMethod = htmlparser.HtmlParserTools.getAttr(node,"spreadMethod",base != null?base.spreadMethod:"pad");
};
svgimport_gradients_LinearGradient.__name__ = ["svgimport","gradients","LinearGradient"];
svgimport_gradients_LinearGradient.__super__ = svgimport_gradients_Gradient;
svgimport_gradients_LinearGradient.prototype = $extend(svgimport_gradients_Gradient.prototype,{
	getAbsoluteParams: function(bounds) {
		if(this.gradientUnits == "userSpaceOnUse") return this; else {
			var w = bounds.maxX - bounds.minX;
			return { x1 : this.x1 * w + bounds.minX, y1 : this.y1 * w + bounds.minY, x2 : this.x2 * w + bounds.minX, y2 : this.y2 * w + bounds.minY};
		}
	}
	,__class__: svgimport_gradients_LinearGradient
});
var svgimport_gradients_RadialGradient = function(node,baseType) {
	svgimport_gradients_Gradient.call(this,node,baseType);
	var base = null;
	if(baseType != null) switch(baseType[1]) {
	case 1:
		var grad = baseType[2];
		base = grad;
		break;
	default:
	}
	this.cx = svgimport_XmlTools.getFloatValue(node,"cx",base != null?base.cx:0.5);
	this.cy = svgimport_XmlTools.getFloatValue(node,"cy",base != null?base.cy:0.5);
	this.fx = svgimport_XmlTools.getFloatValue(node,"fx",base != null?base.fx:this.cx);
	this.fy = svgimport_XmlTools.getFloatValue(node,"fy",base != null?base.fy:this.cy);
	this.r = svgimport_XmlTools.getFloatValue(node,"r",base != null?base.r:0.5);
	this.spreadMethod = htmlparser.HtmlParserTools.getAttr(node,"spreadMethod",base != null?base.spreadMethod:"pad");
};
svgimport_gradients_RadialGradient.__name__ = ["svgimport","gradients","RadialGradient"];
svgimport_gradients_RadialGradient.__super__ = svgimport_gradients_Gradient;
svgimport_gradients_RadialGradient.prototype = $extend(svgimport_gradients_Gradient.prototype,{
	getAbsoluteParams: function(bounds) {
		if(this.gradientUnits == "userSpaceOnUse") return this; else {
			var w = bounds.maxX - bounds.minX;
			return { cx : this.cx * w + bounds.minX, cy : this.cy * w + bounds.minY, fx : this.fx * w + bounds.minX, fy : this.fy * w + bounds.minY, r : this.r * w};
		}
	}
	,__class__: svgimport_gradients_RadialGradient
});
var svgimport_segments_Segment = function(inX,inY) {
	this.x = inX;
	this.y = inY;
};
svgimport_segments_Segment.__name__ = ["svgimport","segments","Segment"];
svgimport_segments_Segment.prototype = {
	getType: function() {
		return null;
	}
	,prevX: function() {
		return this.x;
	}
	,prevY: function() {
		return this.y;
	}
	,prevCX: function() {
		return this.x;
	}
	,prevCY: function() {
		return this.y;
	}
	,'export': function(exporter) {
		throw new js__$Boot_HaxeError("Segment.export() must be overriden.");
	}
	,toString: function() {
		return "Segment(" + this.prevX() + "," + this.prevY() + ", " + this.x + "," + this.y + ")";
	}
	,__class__: svgimport_segments_Segment
};
var svgimport_segments_ArcSegment = function(x0,y0,rx,ry,rotation,isLargeArc,isSweep,x,y) {
	this.x0 = x0;
	this.y0 = y0;
	svgimport_segments_Segment.call(this,x,y);
	this.rx = rx;
	this.ry = ry;
	this.rotation = rotation;
	this.isLargeArc = isLargeArc;
	this.isSweep = isSweep;
};
svgimport_segments_ArcSegment.__name__ = ["svgimport","segments","ArcSegment"];
svgimport_segments_ArcSegment.arcToCubicCurves = function(x1,y1,rx,ry,angle,isLargeArc,isSweep,x2,y2,recursive) {
	var rad = Math.PI / 180 * angle;
	var res = [];
	var f1;
	var f2;
	var cx;
	var cy;
	if(recursive == null) {
		var xy = svgimport_segments_ArcSegment.rotate(x1,y1,-rad);
		x1 = xy.x;
		y1 = xy.y;
		xy = svgimport_segments_ArcSegment.rotate(x2,y2,-rad);
		x2 = xy.x;
		y2 = xy.y;
		var x = (x1 - x2) / 2;
		var y = (y1 - y2) / 2;
		var h = x * x / (rx * rx) + y * y / (ry * ry);
		if(h > 1) {
			h = Math.sqrt(h);
			rx = h * rx;
			ry = h * ry;
		}
		var rx2 = rx * rx;
		var ry2 = ry * ry;
		var k;
		k = (isLargeArc == isSweep?-1:1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
		cx = k * rx * y / ry + (x1 + x2) / 2;
		cy = k * -ry * x / rx + (y1 + y2) / 2;
		f1 = Math.asin((y1 - cy) / ry);
		f2 = Math.asin((y2 - cy) / ry);
		if(x1 < cx) f1 = Math.PI - f1; else f1 = f1;
		if(x2 < cx) f2 = Math.PI - f2; else f2 = f2;
		if(f1 < 0) f1 = Math.PI * 2 + f1;
		if(f2 < 0) f2 = Math.PI * 2 + f2;
		if(isSweep && f1 > f2) f1 = f1 - Math.PI * 2;
		if(!isSweep && f2 > f1) f2 = f2 - Math.PI * 2;
	} else {
		f1 = recursive.f1;
		f2 = recursive.f2;
		cx = recursive.cx;
		cy = recursive.cy;
	}
	var df = f2 - f1;
	if(Math.abs(df) > svgimport_segments_ArcSegment.RAD_120) {
		var f2old = f2;
		var x2old = x2;
		var y2old = y2;
		f2 = f1 + svgimport_segments_ArcSegment.RAD_120 * (isSweep && f2 > f1?1:-1);
		x2 = cx + rx * Math.cos(f2);
		y2 = cy + ry * Math.sin(f2);
		res = svgimport_segments_ArcSegment.arcToCubicCurves(x2,y2,rx,ry,angle,false,isSweep,x2old,y2old,{ f1 : f2, f2 : f2old, cx : cx, cy : cy});
	}
	df = f2 - f1;
	var c1 = Math.cos(f1);
	var s1 = Math.sin(f1);
	var c2 = Math.cos(f2);
	var s2 = Math.sin(f2);
	var t = Math.tan(df / 4);
	var hx = 1.3333333333333333 * rx * t;
	var hy = 1.3333333333333333 * ry * t;
	var m1_x = x1;
	var m1_y = y1;
	var m2 = { x : x1 + hx * s1, y : y1 - hy * c1};
	var m3 = { x : x2 + hx * s2, y : y2 - hy * c2};
	var m4 = { x : x2, y : y2};
	m2.x = 2 * m1_x - m2.x;
	m2.y = 2 * m1_y - m2.y;
	if(recursive != null) return [m2,m3,m4].concat(res); else {
		res = [m2,m3,m4].concat(res);
		var newres = [];
		var _g1 = 0;
		var _g = res.length;
		while(_g1 < _g) {
			var i = _g1++;
			newres.push(svgimport_segments_ArcSegment.rotate(res[i].x,res[i].y,rad));
		}
		return newres;
	}
};
svgimport_segments_ArcSegment.rotate = function(x,y,rad) {
	return { x : x * Math.cos(rad) - y * Math.sin(rad), y : x * Math.sin(rad) + y * Math.cos(rad)};
};
svgimport_segments_ArcSegment.__super__ = svgimport_segments_Segment;
svgimport_segments_ArcSegment.prototype = $extend(svgimport_segments_Segment.prototype,{
	'export': function(exporter) {
		if(this.x0 == this.x && this.y0 == this.y) return;
		if(this.rx == 0 || this.ry == 0) {
			exporter.lineTo(this.x,this.y);
			return;
		}
		var points = svgimport_segments_ArcSegment.arcToCubicCurves(this.x0,this.y0,Math.abs(this.rx),Math.abs(this.ry),this.rotation,this.isLargeArc,this.isSweep,this.x,this.y,null);
		var i = 0;
		while(i < points.length) {
			var curve = new svgimport_segments_CubicSegment(points[i].x,points[i].y,points[i + 1].x,points[i + 1].y,points[i + 2].x,points[i + 2].y);
			curve["export"](exporter);
			i += 3;
		}
	}
	,__class__: svgimport_segments_ArcSegment
});
var svgimport_segments_CubicSegment = function(inCX1,inCY1,inCX2,inCY2,inX,inY) {
	svgimport_segments_Segment.call(this,inX,inY);
	this.cx1 = inCX1;
	this.cy1 = inCY1;
	this.cx2 = inCX2;
	this.cy2 = inCY2;
};
svgimport_segments_CubicSegment.__name__ = ["svgimport","segments","CubicSegment"];
svgimport_segments_CubicSegment.__super__ = svgimport_segments_Segment;
svgimport_segments_CubicSegment.prototype = $extend(svgimport_segments_Segment.prototype,{
	prevCX: function() {
		return this.cx2;
	}
	,prevCY: function() {
		return this.cy2;
	}
	,interp: function(a,b,frac) {
		return a + (b - a) * frac;
	}
	,'export': function(exporter) {
		var tx0 = exporter.x;
		var ty0 = exporter.y;
		var tx3 = this.x;
		var ty3 = this.y;
		var pa_x = this.interp(tx0,this.cx1,0.75);
		var pa_y = this.interp(ty0,this.cy1,0.75);
		var pb_x = this.interp(tx3,this.cx2,0.75);
		var pb_y = this.interp(ty3,this.cy2,0.75);
		var dx = (tx3 - tx0) / 16;
		var dy = (ty3 - ty0) / 16;
		var pcx_1 = this.interp(tx0,this.cx1,0.375);
		var pcy_1 = this.interp(ty0,this.cy1,0.375);
		var pcx_2 = this.interp(pa_x,pb_x,0.375) - dx;
		var pcy_2 = this.interp(pa_y,pb_y,0.375) - dy;
		var pcx_3 = this.interp(pb_x,pa_x,0.375) + dx;
		var pcy_3 = this.interp(pb_y,pa_y,0.375) + dy;
		var pcx_4 = this.interp(tx3,this.cx2,0.375);
		var pcy_4 = this.interp(ty3,this.cy2,0.375);
		var pax_1 = (pcx_1 + pcx_2) * 0.5;
		var pay_1 = (pcy_1 + pcy_2) * 0.5;
		var pax_2 = (pa_x + pb_x) * 0.5;
		var pay_2 = (pa_y + pb_y) * 0.5;
		var pax_3 = (pcx_3 + pcx_4) * 0.5;
		var pay_3 = (pcy_3 + pcy_4) * 0.5;
		exporter.curveTo(pcx_1,pcy_1,pax_1,pay_1);
		exporter.curveTo(pcx_2,pcy_2,pax_2,pay_2);
		exporter.curveTo(pcx_3,pcy_3,pax_3,pay_3);
		exporter.curveTo(pcx_4,pcy_4,tx3,ty3);
	}
	,getType: function() {
		return svgimport_SegmentType.CUBIC(this);
	}
	,__class__: svgimport_segments_CubicSegment
});
var svgimport_segments_DrawSegment = function(inX,inY) {
	svgimport_segments_Segment.call(this,inX,inY);
};
svgimport_segments_DrawSegment.__name__ = ["svgimport","segments","DrawSegment"];
svgimport_segments_DrawSegment.__super__ = svgimport_segments_Segment;
svgimport_segments_DrawSegment.prototype = $extend(svgimport_segments_Segment.prototype,{
	'export': function(exporter) {
		exporter.lineTo(this.x,this.y);
	}
	,getType: function() {
		return svgimport_SegmentType.DRAW(this);
	}
	,__class__: svgimport_segments_DrawSegment
});
var svgimport_segments_MoveSegment = function(inX,inY) {
	svgimport_segments_Segment.call(this,inX,inY);
};
svgimport_segments_MoveSegment.__name__ = ["svgimport","segments","MoveSegment"];
svgimport_segments_MoveSegment.__super__ = svgimport_segments_Segment;
svgimport_segments_MoveSegment.prototype = $extend(svgimport_segments_Segment.prototype,{
	'export': function(exporter) {
		exporter.moveTo(this.x,this.y);
	}
	,getType: function() {
		return svgimport_SegmentType.MOVE(this);
	}
	,__class__: svgimport_segments_MoveSegment
});
var svgimport_segments_QuadraticSegment = function(inCX,inCY,inX,inY) {
	svgimport_segments_Segment.call(this,inX,inY);
	this.cx = inCX;
	this.cy = inCY;
};
svgimport_segments_QuadraticSegment.__name__ = ["svgimport","segments","QuadraticSegment"];
svgimport_segments_QuadraticSegment.__super__ = svgimport_segments_Segment;
svgimport_segments_QuadraticSegment.prototype = $extend(svgimport_segments_Segment.prototype,{
	prevCX: function() {
		return this.cx;
	}
	,prevCY: function() {
		return this.cy;
	}
	,'export': function(exporter) {
		exporter.curveTo(this.cx,this.cy,this.x,this.y);
	}
	,getType: function() {
		return svgimport_SegmentType.CURVE(this);
	}
	,__class__: svgimport_segments_QuadraticSegment
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
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
svgimport_SegmentsParser.MOVE = 77;
svgimport_SegmentsParser.MOVER = 109;
svgimport_SegmentsParser.LINE = 76;
svgimport_SegmentsParser.LINER = 108;
svgimport_SegmentsParser.HLINE = 72;
svgimport_SegmentsParser.HLINER = 104;
svgimport_SegmentsParser.VLINE = 86;
svgimport_SegmentsParser.VLINER = 118;
svgimport_SegmentsParser.CUBIC = 67;
svgimport_SegmentsParser.CUBICR = 99;
svgimport_SegmentsParser.SCUBIC = 83;
svgimport_SegmentsParser.SCUBICR = 115;
svgimport_SegmentsParser.QUAD = 81;
svgimport_SegmentsParser.QUADR = 113;
svgimport_SegmentsParser.SQUAD = 84;
svgimport_SegmentsParser.SQUADR = 116;
svgimport_SegmentsParser.ARC = 65;
svgimport_SegmentsParser.ARCR = 97;
svgimport_SegmentsParser.CLOSE = 90;
svgimport_SegmentsParser.CLOSER = 122;
svgimport_SegmentsParser.UNKNOWN = -1;
svgimport_SegmentsParser.SEPARATOR = -2;
svgimport_SegmentsParser.FLOAT = -3;
svgimport_SegmentsParser.FLOAT_SIGN = -4;
svgimport_SegmentsParser.FLOAT_DOT = -5;
svgimport_SegmentsParser.FLOAT_EXP = -6;
svgimport_SvgAttributes.presentation = ["alignment-baseline","baseline-shift","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cursor","direction","display","dominant-baseline","enable-background","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","kerning","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","pointer-events","shape-rendering","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","unicode-bidi","visibility","word-spacing","writing-mode"];
svgimport_SvgAttributes.presentationNoInherit = ["clip-path","filter"];
svgimport_SvgPath.SIN45 = 0.70710678118654752440084436210485;
svgimport_SvgPath.TAN22 = 0.4142135623730950488016887242097;
svgimport_SvgPathExporter.EPS = 1e-10;
svgimport_XmlTools.reStyleValue = new EReg("^\\s*(.+)\\s*:\\s*(.+)\\s*$","");
svgimport_XmlTools.reURLMatch = new EReg("^\\s*url\\(#([^)]*)\\)\\s*","");
svgimport_segments_ArcSegment.RAD_120 = Math.PI * 2 / 3;
SvgImporterPlugin.main();
})(typeof console != "undefined" ? console : {log:function(){}});
