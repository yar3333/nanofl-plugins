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
var FlashImporterPlugin = function() {
	this.properties = [{ type : "bool", name : "importMedia", label : "Import media (Adobe Flash CS5+ must be installed).", defaultValue : true}];
	this.fileFilterExtensions = ["fla","xfl"];
	this.fileFilterDescription = "Adobe Flash Documents (*.fla;*.xfl)";
	this.menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAACNUlEQVQoz21Qz0uUURQ997033zhjZvhjapps1RAkqYt0U1O4MAiLwUWEhEEQtKl2LdoEIkR/gFsX1S4iZgjbJiFEizSwTCgoYhgtSUTnm5nP+d47LWZGgzxwuffCORzOEZKYm5szw8PDvel0+nilUqEAAhIAAKUoIiYMwz/FYnEhl8v52WxWQBL5fB4jIyOTJFmtVnf4D6y1liQLhcLP0dHR6wAi+XweBgBmZ2fR0tIiALDt+64WBI5fv8FqjSB1FFok7O7u7pmenn5sjGE2m81hdXVVAODGxMQUSW5tbOxUnzzjzoP7LN+5xw3f59bmJq21oXOO6+vrhVQqdd6ICACA1tb38xeQd2/haiHcwQ5EvAjCIIDv+7pSqYSJRCKltT5k2ChB2tqAtd9QS4tgZxfkyhi8k2lY60BjEIYhrLUKAEjWDwBgtQosfEC4tAz2n4EaGoRKJqGVQiQSQTQaRSwWa9KVYq2mAcB8/uKwsgxvsI/hzAyCh5OAtVBKQWsNrTWMMU0hjBMJz7W2tt+OxQf4aQnOiWJnArrnWJ3R6EBEoJTaEyYXP2beDAxdCFKHLweVCvXYNR29OgZXKoEk6NyucLdIEsafevQyTCQ6zHZJSV8/vEsXQRFgL8++jspVgy7v+w8XP5Isyfg42HbA2XLZ0dVB0pHNr2EPULW/fnX2/a2bQ3d/rT2Nne4Fg8B68biKeJ7y9pmGO4Uk5ufnJZPJnEqn0yfK5bKVZpj/QRFhsVhc+QuQDi4zdLU6egAAAABJRU5ErkJggg==)";
	this.menuItemName = "Adobe Flash Document (*.fla;*.xfl)";
	this.name = "FlashImporter";
};
FlashImporterPlugin.__name__ = ["FlashImporterPlugin"];
FlashImporterPlugin.__interfaces__ = [nanofl.ide.plugins.IImporterPlugin];
FlashImporterPlugin.main = function() {
	nanofl.engine.Plugins.registerImporter(new FlashImporterPlugin());
};
FlashImporterPlugin.prototype = {
	importDocument: function(api,params,srcFilePath,destFilePath,documentProperties,library,callb) {
		if(haxe_io_Path.extension(srcFilePath) == "fla") {
			var dir = api.fileSystem.getTempDirectory() + "/unsaved/" + stdlib_Uuid.newUuid();
			api.fileSystem.unzip(srcFilePath,dir);
			var xflFiles = api.fileSystem.readDirectory(dir).filter(function(s) {
				return haxe_io_Path.extension(s).toLowerCase() == "xfl";
			});
			if(xflFiles.length == 0) throw new js__$Boot_HaxeError("XFL file is not found");
			flashimport_DocumentImporter.process(api,FlashImporterPlugin.IMPORT_MEDIA_SCRIPT_TEMPLATE,dir + "/" + xflFiles[0],destFilePath,documentProperties,library,params.importMedia,function(success) {
				api.fileSystem.remove(dir);
				callb(success);
			});
		} else flashimport_DocumentImporter.process(api,FlashImporterPlugin.IMPORT_MEDIA_SCRIPT_TEMPLATE,srcFilePath,destFilePath,documentProperties,library,params.importMedia,callb);
	}
	,__class__: FlashImporterPlugin
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
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
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
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
var List = function() { };
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
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
Reflect.setField = function(o,field,value) {
	o[field] = value;
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
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
var Std = function() { };
Std.__name__ = ["Std"];
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
var flashimport_DocumentImporter = function() { };
flashimport_DocumentImporter.__name__ = ["flashimport","DocumentImporter"];
flashimport_DocumentImporter.process = function(api,importMediaScriptTemplate,srcFilePath,destFilePath,destDocProp,destLibrary,runFlashToImportMedia,callb) {
	flashimport_DocumentImporter.log("DocumentImporter.process",{ fileName : "DocumentImporter.hx", lineNumber : 18, className : "flashimport.DocumentImporter", methodName : "process"});
	if(runFlashToImportMedia && flashimport_DocumentImporter.hasMedia(api.fileSystem,srcFilePath)) flashimport_DocumentImporter.importMedia(api,importMediaScriptTemplate,srcFilePath,destFilePath,destLibrary,function(success) {
		if(success) flashimport_DocumentImporter.importXmlFiles(api,srcFilePath,destDocProp,destLibrary,callb); else callb(false);
	}); else flashimport_DocumentImporter.importXmlFiles(api,srcFilePath,destDocProp,destLibrary,callb);
};
flashimport_DocumentImporter.hasMedia = function(fileSystem,srcFilePath) {
	var doc = new htmlparser.XmlDocument(fileSystem.getContent(haxe_io_Path.directory(srcFilePath) + "/DOMDocument.xml"));
	return htmlparser.HtmlParserTools.findOne(doc,">DOMDocument>media>*") != null;
};
flashimport_DocumentImporter.importMedia = function(api,importMediaScriptTemplate,srcFilePath,destFilePath,destLibrary,callb) {
	flashimport_DocumentImporter.log("DocumentImporter.importMedia",{ fileName : "DocumentImporter.hx", lineNumber : 48, className : "flashimport.DocumentImporter", methodName : "importMedia"});
	var destDir = haxe_io_Path.directory(destFilePath);
	var scriptFilePath = api.fileSystem.getTempDirectory() + "/flashImporter.jsfl";
	var script = StringTools.replace(StringTools.replace(importMediaScriptTemplate,"{SRC_FILE}",StringTools.replace(srcFilePath,"\\","/")),"{DEST_DIR}",StringTools.replace(destDir,"\\","/"));
	api.fileSystem.saveContent(scriptFilePath,script);
	var doneFile = destDir + "/.done-import-media";
	api.fileSystem.remove(doneFile);
	api.fileSystem.run(scriptFilePath,[],false);
	flashimport_DocumentImporter.waitFor(600,function() {
		return api.fileSystem.exists(doneFile);
	},function(success) {
		if(success) {
			api.fileSystem.remove(doneFile);
			destLibrary.loadItems(api);
			callb(true);
		} else callb(false);
	});
};
flashimport_DocumentImporter.importXmlFiles = function(api,srcFilePath,destDocProp,destLibrary,callb) {
	flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles BEGIN",{ fileName : "DocumentImporter.hx", lineNumber : 80, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
	var srcDir = haxe_io_Path.directory(srcFilePath);
	var srcDoc = new htmlparser.XmlDocument(api.fileSystem.getContent(srcDir + "/DOMDocument.xml"));
	var srcLibDir = srcDir + "/LIBRARY";
	var symbolLoader = new flashimport_SymbolLoader(api,srcDoc,srcLibDir,destLibrary);
	var docPropNode = htmlparser.HtmlParserTools.findOne(srcDoc,">DOMDocument");
	destDocProp.width = htmlparser.HtmlParserTools.getAttr(docPropNode,"width",550);
	destDocProp.height = htmlparser.HtmlParserTools.getAttr(docPropNode,"height",400);
	destDocProp.backgroundColor = htmlparser.HtmlParserTools.getAttr(docPropNode,"backgroundColor","#ffffff");
	destDocProp.framerate = htmlparser.HtmlParserTools.getAttr(docPropNode,"frameRate",24);
	flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles load media",{ fileName : "DocumentImporter.hx", lineNumber : 94, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
	var _g = 0;
	var _g1 = docPropNode.find(">media>DOMSoundItem");
	while(_g < _g1.length) {
		var node1 = _g1[_g];
		++_g;
		var soundItem = destLibrary.getItem(htmlparser.HtmlParserTools.getAttr(node1,"name"));
		if(js_Boot.__instanceof(soundItem,nanofl.engine.libraryitems.SoundItem)) {
			if(htmlparser.HtmlParserTools.getAttr(node1,"linkageExportForAS",false)) soundItem.linkage = htmlparser.HtmlParserTools.getAttr(node1,"linkageIdentifier");
		}
	}
	flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles load folders",{ fileName : "DocumentImporter.hx", lineNumber : 107, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
	var _g2 = 0;
	var _g11 = docPropNode.find(">folders>DOMFolderItem");
	while(_g2 < _g11.length) {
		var node2 = _g11[_g2];
		++_g2;
		if(node2.hasAttribute("name")) {
			var namePath = htmlparser.HtmlParserTools.getAttr(node2,"name","");
			if(namePath != "") destLibrary.addItem(new nanofl.engine.libraryitems.FolderItem(namePath));
		}
	}
	flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles load document",{ fileName : "DocumentImporter.hx", lineNumber : 120, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
	symbolLoader.loadFromXml(nanofl.engine.Library.SCENE_NAME_PATH,srcDoc);
	flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles load symbols",{ fileName : "DocumentImporter.hx", lineNumber : 123, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
	var hrefs = docPropNode.find(">symbols>Include").map(function(node) {
		return htmlparser.HtmlParserTools.getAttrString(node,"href");
	});
	flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles load library",{ fileName : "DocumentImporter.hx", lineNumber : 126, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
	var loadNext;
	var loadNext1 = null;
	loadNext1 = function() {
		if(hrefs.length == 0) {
			flashimport_DocumentImporter.log("DocumentImporter.importXmlFiles END",{ fileName : "DocumentImporter.hx", lineNumber : 132, className : "flashimport.DocumentImporter", methodName : "importXmlFiles"});
			callb(true);
		} else {
			symbolLoader.loadFromFile(hrefs.shift());
			haxe_Timer.delay(loadNext1,10);
		}
	};
	loadNext = loadNext1;
	loadNext();
};
flashimport_DocumentImporter.waitFor = function(maxSeconds,condition,finish) {
	if(maxSeconds == null) maxSeconds = 0;
	if(condition()) finish(true); else {
		var start = new Date().getTime();
		var timer = new haxe_Timer(200);
		timer.run = function() {
			if(condition()) {
				timer.stop();
				finish(true);
			} else if(maxSeconds > 0 && new Date().getTime() - start > maxSeconds * 1000) {
				timer.stop();
				finish(false);
			}
		};
	}
};
flashimport_DocumentImporter.log = function(s,infos) {
};
var flashimport_DrawOp = { __ename__ : ["flashimport","DrawOp"], __constructs__ : ["move","line","curve"] };
flashimport_DrawOp.move = function(x,y) { var $x = ["move",0,x,y]; $x.__enum__ = flashimport_DrawOp; $x.toString = $estr; return $x; };
flashimport_DrawOp.line = function(x,y) { var $x = ["line",1,x,y]; $x.__enum__ = flashimport_DrawOp; $x.toString = $estr; return $x; };
flashimport_DrawOp.curve = function(x1,y1,x2,y2) { var $x = ["curve",2,x1,y1,x2,y2]; $x.__enum__ = flashimport_DrawOp; $x.toString = $estr; return $x; };
var flashimport_EdgeData = function(edge) {
	this.strokeStyle = Std["int"](htmlparser.HtmlParserTools.getAttr(edge,"strokeStyle",0));
	this.fillStyle0 = Std["int"](htmlparser.HtmlParserTools.getAttr(edge,"fillStyle0",0));
	this.fillStyle1 = Std["int"](htmlparser.HtmlParserTools.getAttr(edge,"fillStyle1",0));
	this.drawOps = [];
	var drawStr = htmlparser.HtmlParserTools.getAttr(edge,"edges");
	if(drawStr == null) return;
	var reNumber = "(#?-?[0-9A-F]+(?:[.][0-9A-F]+)?)";
	var reXY = new EReg("^" + reNumber + "\\s+" + reNumber + "\\s*","i");
	var reX1Y1X2Y2 = new EReg("^" + reNumber + "\\s+" + reNumber + "\\s+" + reNumber + "\\s+" + reNumber + "\\s*","i");
	var lastX = 1.0e10;
	var lastY = 1.0e10;
	stdlib_Debug.assert(drawStr.length == 0 || StringTools.ltrim(drawStr).charAt(0) == "!","drawStr = " + drawStr,{ fileName : "EdgeData.hx", lineNumber : 39, className : "flashimport.EdgeData", methodName : "new"});
	while(drawStr.length > 0) {
		var opCode = drawStr.charAt(0);
		drawStr = HxOverrides.substr(drawStr,1,null);
		if(opCode == "!") {
			if(reXY.match(drawStr)) {
				var x = this.parseNumber(reXY.matched(1));
				var y = this.parseNumber(reXY.matched(2));
				if(x != lastX || y != lastY) {
					this.drawOps.push(flashimport_DrawOp.move(x,y));
					lastX = x;
					lastY = y;
				}
				drawStr = reXY.matchedRight();
			} else throw new js__$Boot_HaxeError("Expected (x, y).");
		} else if(opCode == "|" || opCode == "/") while(reXY.match(drawStr)) {
			this.drawOps.push(flashimport_DrawOp.line(lastX = this.parseNumber(reXY.matched(1)),lastY = this.parseNumber(reXY.matched(2))));
			drawStr = reXY.matchedRight();
		} else if(opCode == "[") while(reX1Y1X2Y2.match(drawStr)) {
			this.drawOps.push(flashimport_DrawOp.curve(this.parseNumber(reX1Y1X2Y2.matched(1)),this.parseNumber(reX1Y1X2Y2.matched(2)),lastX = this.parseNumber(reX1Y1X2Y2.matched(3)),lastY = this.parseNumber(reX1Y1X2Y2.matched(4))));
			drawStr = reX1Y1X2Y2.matchedRight();
		} else if(opCode == "S") drawStr = HxOverrides.substr(drawStr,1,null); else if(opCode == " " || opCode == "\r" || opCode == "\n") drawStr = HxOverrides.substr(drawStr,1,null); else throw new js__$Boot_HaxeError("Unknow edges code = '" + opCode + "' near '" + drawStr + "'.");
	}
};
flashimport_EdgeData.__name__ = ["flashimport","EdgeData"];
flashimport_EdgeData.prototype = {
	parseNumber: function(s) {
		if(StringTools.startsWith(s,"#")) {
			s = HxOverrides.substr(s,1,null);
			var n = s.indexOf(".");
			var high = HxOverrides.substr(s,0,n);
			var low = StringTools.rpad(HxOverrides.substr(s,n + 1,null),"0",2);
			var r = Std.parseInt("0x" + high + low);
			if(r >= -2147483648) r = -(~r + 1);
			return nanofl.engine.geom.PointTools.roundGap(r / 5120);
		}
		return nanofl.engine.geom.PointTools.roundGap(0.05 * parseFloat(s));
	}
	,__class__: flashimport_EdgeData
};
var flashimport_FontConvertor = function(fonts) {
	this.fonts = fonts;
};
flashimport_FontConvertor.__name__ = ["flashimport","FontConvertor"];
flashimport_FontConvertor.prototype = {
	convert: function(font) {
		var n = font.lastIndexOf("-");
		var face;
		if(n >= 0) face = font.substring(0,n); else face = font;
		face = this.convertFontFamily(face);
		var style;
		if(n >= 0) style = this.removeSuffixes(font.substring(n + 1)).toLowerCase(); else style = "";
		if(style == "bolditalic") style = "bold italic";
		style = StringTools.replace(style,"regular","");
		style = StringTools.replace(style,"semibold","bold");
		return { face : face, style : style};
	}
	,convertFontFamily: function(s) {
		var _g = 0;
		var _g1 = this.fonts;
		while(_g < _g1.length) {
			var font = _g1[_g];
			++_g;
			if(StringTools.replace(font," ","") == s) return font;
		}
		s = this.removeSuffixes(s);
		var _g2 = 0;
		var _g11 = this.fonts;
		while(_g2 < _g11.length) {
			var font1 = _g11[_g2];
			++_g2;
			if(StringTools.replace(font1," ","") == s) return font1;
		}
		return s;
	}
	,removeSuffixes: function(s) {
		var changed = true;
		while(changed) {
			changed = false;
			var _g = 0;
			var _g1 = ["MT","PS"];
			while(_g < _g1.length) {
				var suffix = _g1[_g];
				++_g;
				if(StringTools.endsWith(s,suffix)) {
					s = s.substring(0,s.length - suffix.length);
					changed = true;
				}
			}
		}
		return s;
	}
	,__class__: flashimport_FontConvertor
};
var flashimport_Macro = function() { };
flashimport_Macro.__name__ = ["flashimport","Macro"];
var flashimport_MatrixMap = function() {
	this.values = [];
	this.kk = [];
};
flashimport_MatrixMap.__name__ = ["flashimport","MatrixMap"];
flashimport_MatrixMap.prototype = {
	exists: function(key) {
		var _g = 0;
		var _g1 = this.kk;
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			if(k.equ(key)) return true;
		}
		return false;
	}
	,set: function(key,value) {
		var _g1 = 0;
		var _g = this.kk.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.kk[i].equ(key)) {
				this.values[i] = value;
				return;
			}
		}
		this.kk.push(key);
		this.values.push(value);
	}
	,get: function(key) {
		var _g1 = 0;
		var _g = this.kk.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.kk[i].equ(key)) return this.values[i];
		}
		return null;
	}
	,keys: function() {
		return HxOverrides.iter(this.kk);
	}
	,__class__: flashimport_MatrixMap
};
var flashimport_MatrixParser = function() { };
flashimport_MatrixParser.__name__ = ["flashimport","MatrixParser"];
flashimport_MatrixParser.load = function(node,divider,dx,dy) {
	if(dy == null) dy = 0.0;
	if(dx == null) dx = 0.0;
	if(divider == null) divider = 1.0;
	if(node != null) return new nanofl.engine.geom.Matrix(htmlparser.HtmlParserTools.getAttr(node,"a",1.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"b",0.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"c",0.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"d",1.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"tx",0.0) + dx,htmlparser.HtmlParserTools.getAttr(node,"ty",0.0) + dy);
	return new nanofl.engine.geom.Matrix();
};
var flashimport_PathTools = function() { };
flashimport_PathTools.__name__ = ["flashimport","PathTools"];
flashimport_PathTools.unescape = function(s) {
	return new EReg("&#(\\d\\d\\d)","g").map(s,function(re) {
		var code = Std.parseInt(re.matched(1));
		return String.fromCharCode(code);
	});
};
var flashimport_ShapeConvertor = function(stokes,fills,edgeDatas) {
	this.stokes = stokes;
	this.fills = fills;
	this.edgeDatas = edgeDatas;
};
flashimport_ShapeConvertor.__name__ = ["flashimport","ShapeConvertor"];
flashimport_ShapeConvertor.log = function(v,infos) {
};
flashimport_ShapeConvertor.prototype = {
	convert: function() {
		var strokeAndFillEdges = this.parseEdges();
		var fillContours = this.findFillContours(strokeAndFillEdges.fillEdges);
		flashimport_ShapeConvertor.log(function() {
			return "EdgeDataConvertor.convert(1) fillContours =\n\t" + fillContours.map(function(fc) {
				return StringTools.rpad(Std.string(fc.fill)," ",35) + " / " + fc.contour.getClockwiseProduct() + " / " + Std.string(fc.contour);
			}).join("\n\t");
		},{ fileName : "ShapeConvertor.hx", lineNumber : 34, className : "flashimport.ShapeConvertor", methodName : "convert"});
		return { edges : strokeAndFillEdges.strokeEdges, polygons : this.polygonsFromFillContours(fillContours)};
	}
	,parseEdges: function() {
		var strokeEdges = [];
		var fillEdges = [];
		var posX = 0.0;
		var posY = 0.0;
		var _g = 0;
		var _g1 = this.edgeDatas;
		while(_g < _g1.length) {
			var edgeData = _g1[_g];
			++_g;
			var stroke;
			if(edgeData.strokeStyle != 0) stroke = this.stokes[edgeData.strokeStyle - 1]; else stroke = null;
			var fill0;
			if(edgeData.fillStyle0 != 0) fill0 = this.fills[edgeData.fillStyle0 - 1]; else fill0 = null;
			var fill1;
			if(edgeData.fillStyle1 != 0) fill1 = this.fills[edgeData.fillStyle1 - 1]; else fill1 = null;
			var _g2 = 0;
			var _g3 = edgeData.drawOps;
			while(_g2 < _g3.length) {
				var drawOp = _g3[_g2];
				++_g2;
				switch(drawOp[1]) {
				case 0:
					var y = drawOp[3];
					var x = drawOp[2];
					posX = x;
					posY = y;
					break;
				case 1:
					var y1 = drawOp[3];
					var x1 = drawOp[2];
					var edge = new nanofl.engine.geom.Edge(posX,posY,x1,y1);
					if(stroke != null) strokeEdges.push(nanofl.engine.geom.StrokeEdge.fromEdge(edge,stroke));
					if(fill0 != null || fill1 != null) {
						fillEdges.push({ edge : edge, fill : fill0});
						fillEdges.push({ edge : edge.clone().reverse(), fill : fill1});
					}
					posX = x1;
					posY = y1;
					break;
				case 2:
					var y2 = drawOp[5];
					var x2 = drawOp[4];
					var y11 = drawOp[3];
					var x11 = drawOp[2];
					var edge1 = new nanofl.engine.geom.Edge(posX,posY,x11,y11,x2,y2);
					if(stroke != null) strokeEdges.push(nanofl.engine.geom.StrokeEdge.fromEdge(edge1,stroke));
					if(fill0 != null || fill1 != null) {
						fillEdges.push({ edge : edge1, fill : fill0});
						fillEdges.push({ edge : edge1.clone().reverse(), fill : fill1});
					}
					posX = x2;
					posY = y2;
					break;
				}
			}
		}
		flashimport_ShapeConvertor.log(function() {
			return "EdgeDataConvertor.parseEdges fillEdges =\n\t" + fillEdges.map(function(fe) {
				return StringTools.rpad(Std.string(fe.fill)," ",35) + " / " + Std.string(fe.edge);
			}).join("\n\t");
		},{ fileName : "ShapeConvertor.hx", lineNumber : 95, className : "flashimport.ShapeConvertor", methodName : "parseEdges"});
		return { strokeEdges : strokeEdges, fillEdges : fillEdges};
	}
	,findFillContours: function(fillEdges) {
		var r = [];
		while(fillEdges.length > 0) {
			var base = fillEdges.shift();
			var edges = [base.edge];
			var i = 0;
			while(i < fillEdges.length) if(fillEdges[i].fill == base.fill) {
				edges.push(fillEdges[i].edge);
				fillEdges.splice(i,1);
			} else i++;
			var contours = nanofl.engine.geom.Contours.fromVectors(edges);
			var _g = 0;
			while(_g < contours.length) {
				var contour = [contours[_g]];
				++_g;
				var c1 = Lambda.find(r,(function(contour) {
					return function(c) {
						return c.contour.equ(contour[0]);
					};
				})(contour));
				if(c1 == null) r.push({ fill : base.fill, contour : contour[0]}); else if(c1.fill == null) c1.fill = base.fill;
			}
		}
		return r;
	}
	,polygonsFromFillContours: function(fillContours) {
		this.assertFillContoursCorrect(fillContours);
		var _g = 0;
		while(_g < fillContours.length) {
			var fc = fillContours[_g];
			++_g;
			if(fc.contour.getClockwiseProduct() < 0) fc.contour.reverse();
		}
		this.assertFillContoursCorrect(fillContours);
		var r = [];
		var _g1 = 0;
		while(_g1 < fillContours.length) {
			var outer = fillContours[_g1];
			++_g1;
			if(outer.fill == null) continue;
			var inners = [];
			var _g11 = 0;
			while(_g11 < fillContours.length) {
				var inner = fillContours[_g11];
				++_g11;
				if(inner != outer && inner.contour.isNestedTo(outer.contour)) {
					stdlib_Debug.assert(inner.contour != outer.contour,null,{ fileName : "ShapeConvertor.hx", lineNumber : 154, className : "flashimport.ShapeConvertor", methodName : "polygonsFromFillContours"});
					stdlib_Debug.assert(!inner.contour.equ(outer.contour),null,{ fileName : "ShapeConvertor.hx", lineNumber : 155, className : "flashimport.ShapeConvertor", methodName : "polygonsFromFillContours"});
					inners.push(inner.contour.clone().reverse());
				}
			}
			nanofl.engine.geom.Contours.removeNested(inners);
			nanofl.engine.geom.Contours.mergeByCommonEdges(inners,true);
			var polygon = new nanofl.engine.geom.Polygon(outer.fill,[outer.contour].concat(inners));
			polygon.assertCorrect();
			r.push(polygon);
		}
		return r;
	}
	,assertFillContoursCorrect: function(fillContours) {
		var _g = 0;
		while(_g < fillContours.length) {
			var fc = fillContours[_g];
			++_g;
			fc.contour.assertCorrect();
		}
		var i = 0;
		while(i < fillContours.length) {
			var j = i + 1;
			while(j < fillContours.length) {
				if(fillContours[i].contour.equ(fillContours[j].contour)) haxe_Log.trace("Equ contours:\n\tfill[i] = " + Std.string(fillContours[i].fill) + "\n\tfill[j] = " + Std.string(fillContours[j].fill) + "\n\tcontour = " + Std.string(fillContours[i].contour),{ fileName : "ShapeConvertor.hx", lineNumber : 180, className : "flashimport.ShapeConvertor", methodName : "assertFillContoursCorrect"});
				j++;
			}
			i++;
		}
	}
	,__class__: flashimport_ShapeConvertor
};
var flashimport_SymbolLoader = function(api,doc,srcLibDir,library) {
	this.generatedAutoIDs = [];
	this.morphingNotSupported = [];
	this.fontMap = new haxe_ds_StringMap();
	this.fileSystem = api.fileSystem;
	this.doc = doc;
	this.srcLibDir = srcLibDir;
	this.library = library;
	this.fontConvertor = new flashimport_FontConvertor(api.fonts);
};
flashimport_SymbolLoader.__name__ = ["flashimport","SymbolLoader"];
flashimport_SymbolLoader.log = function(s,infos) {
};
flashimport_SymbolLoader.prototype = {
	loadFromFile: function(href) {
		var namePath = flashimport_PathTools.unescape(haxe_io_Path.withoutExtension(href));
		if(!this.library.hasItem(namePath)) {
			flashimport_SymbolLoader.log("Load item \"" + namePath + "\"",{ fileName : "SymbolLoader.hx", lineNumber : 78, className : "flashimport.SymbolLoader", methodName : "loadFromFile"});
			if(this.fileSystem.exists(this.srcLibDir + "/" + href)) this.loadFromXml(namePath,new htmlparser.XmlDocument(this.fileSystem.getContent(this.srcLibDir + "/" + href)));
		}
	}
	,loadFromXml: function(namePath,src) {
		if(this.library.hasItem(namePath)) return js_Boot.__cast(this.library.getItem(namePath) , nanofl.engine.libraryitems.MovieClipItem);
		var symbolItemXml = htmlparser.HtmlParserTools.findOne(src,">DOMSymbolItem");
		if(symbolItemXml == null) symbolItemXml = htmlparser.HtmlParserTools.findOne(src,">DOMDocument");
		var r = new nanofl.engine.libraryitems.MovieClipItem(namePath);
		r.likeButton = htmlparser.HtmlParserTools.getAttr(symbolItemXml,"symbolType") == "button";
		this.loadLinkage(r,symbolItemXml);
		var _g = 0;
		var _g1 = symbolItemXml.find(">timeline>DOMTimeline>layers>DOMLayer").concat(symbolItemXml.find(">timelines>DOMTimeline>layers>DOMLayer"));
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			r.addLayer(this.loadLayer(namePath,layer));
		}
		this.library.addItem(r);
		return r;
	}
	,loadBitmap: function(namePath) {
		var r = new nanofl.engine.libraryitems.BitmapItem(namePath,"png");
		var _g = 0;
		var _g1 = this.doc.find(">DOMDocument>media>DOMBitmapItem");
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(htmlparser.HtmlParserTools.getAttr(node,"name") == namePath) {
				this.loadLinkage(r,node);
				break;
			}
		}
		return r;
	}
	,loadLayer: function(namePath,layer) {
		var r = new nanofl.engine.Layer(htmlparser.HtmlParserTools.getAttr(layer,"name"),htmlparser.HtmlParserTools.getAttr(layer,"layerType","normal"),htmlparser.HtmlParserTools.getAttr(layer,"visible",true),htmlparser.HtmlParserTools.getAttr(layer,"locked",false),htmlparser.HtmlParserTools.getAttrInt(layer,"parentLayerIndex"));
		var _g = 0;
		var _g1 = layer.find(">frames>DOMFrame");
		while(_g < _g1.length) {
			var frame = _g1[_g];
			++_g;
			r.addKeyFrame(this.loadFrame(namePath,frame));
		}
		return r;
	}
	,loadFrame: function(namePath,frame) {
		return new nanofl.engine.KeyFrame(htmlparser.HtmlParserTools.getAttr(frame,"name",""),stdlib_Std["int"](htmlparser.HtmlParserTools.getAttr(frame,"duration",1)),this.loadMotionTween(namePath,frame),this.loadElements(namePath,frame.find(">elements>*"),new nanofl.engine.geom.Matrix()));
	}
	,loadMotionTween: function(namePath,frame) {
		var type = htmlparser.HtmlParserTools.getAttr(frame,"tweenType","none");
		switch(type) {
		case "none":
			return null;
		case "motion":
			return new nanofl.engine.MotionTween(-htmlparser.HtmlParserTools.getAttrInt(frame,"acceleration",0),this.parseMotionTweenRotate(htmlparser.HtmlParserTools.getAttr(frame,"motionTweenRotate"),htmlparser.HtmlParserTools.getAttr(frame,"motionTweenRotateTimes",1)),htmlparser.HtmlParserTools.getAttr(frame,"motionTweenOrientToPath",false),0,0);
		case "shape":
			if(!Lambda.has(this.morphingNotSupported,namePath)) {
				this.morphingNotSupported.push(namePath);
				nanofl.engine.Debug.console.warn("Shape morphing tween is not supported (symbol '" + namePath + "').");
			}
			return null;
		default:
			nanofl.engine.Debug.console.warn("Unknow tween type '" + type + "' (symbol '" + namePath + "').");
			return null;
		}
	}
	,loadElements: function(namePath,elements,parentMatrix) {
		var _g2 = this;
		var r = [];
		var _g = 0;
		while(_g < elements.length) {
			var element = [elements[_g]];
			++_g;
			var _g1 = element[0].name;
			switch(_g1) {
			case "DOMSymbolInstance":case "DOMBitmapInstance":
				var instance = new nanofl.engine.elements.Instance(flashimport_PathTools.unescape(htmlparser.HtmlParserTools.getAttr(element[0],"libraryItemName")),htmlparser.HtmlParserTools.getAttr(element[0],"name",""),this.loadColorEffect(htmlparser.HtmlParserTools.findOne(element[0],">color>Color")),element[0].find(">filters>*").map((function() {
					return function(f) {
						return _g2.loadFilter(f);
					};
				})()),htmlparser.HtmlParserTools.getAttr(element[0],"blendMode","normal"));
				instance.matrix = flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(element[0],">matrix>Matrix")).prependMatrix(parentMatrix);
				this.loadRegPoint(instance,htmlparser.HtmlParserTools.findOne(element[0],">transformationPoint>Point"));
				r.push(instance);
				break;
			case "DOMShape":
				if(!htmlparser.HtmlParserTools.getAttr(element[0],"isDrawingObject",false)) r = r.concat(this.loadShape(namePath,element[0],parentMatrix)); else r.push(new nanofl.engine.elements.GroupElement(this.loadShape(namePath,element[0],parentMatrix)));
				break;
			case "DOMRectangleObject":
				r.push(new nanofl.engine.elements.GroupElement(this.loadDrawing(namePath,element[0],parentMatrix,(function(element) {
					return function(strokes,fills) {
						return nanofl.engine.elements.ShapeElement.createRectangle(htmlparser.HtmlParserTools.getAttrFloat(element[0],"x"),htmlparser.HtmlParserTools.getAttrFloat(element[0],"y"),htmlparser.HtmlParserTools.getAttrFloat(element[0],"objectWidth"),htmlparser.HtmlParserTools.getAttrFloat(element[0],"objectHeight"),htmlparser.HtmlParserTools.getAttrFloat(element[0],"topLeftRadius",0.0),htmlparser.HtmlParserTools.getAttrFloat(element[0],"topRightRadius",0.0),htmlparser.HtmlParserTools.getAttrFloat(element[0],"bottomRightRadius",0.0),htmlparser.HtmlParserTools.getAttrFloat(element[0],"bottomLeftRadius",0.0),strokes.length > 0?strokes[0]:null,fills.length > 0?fills[0]:null);
					};
				})(element))));
				break;
			case "DOMOvalObject":
				r.push(new nanofl.engine.elements.GroupElement(this.loadDrawing(namePath,element[0],parentMatrix,(function(element) {
					return function(strokes1,fills1) {
						return nanofl.engine.elements.ShapeElement.createOval(htmlparser.HtmlParserTools.getAttrFloat(element[0],"x") + htmlparser.HtmlParserTools.getAttrFloat(element[0],"objectWidth") / 2,htmlparser.HtmlParserTools.getAttrFloat(element[0],"y") + htmlparser.HtmlParserTools.getAttrFloat(element[0],"objectHeight") / 2,htmlparser.HtmlParserTools.getAttrFloat(element[0],"objectWidth") / 2,htmlparser.HtmlParserTools.getAttrFloat(element[0],"objectHeight") / 2,htmlparser.HtmlParserTools.getAttrFloat(element[0],"startAngle",0.0),htmlparser.HtmlParserTools.getAttrFloat(element[0],"endAngle",360.0),htmlparser.HtmlParserTools.getAttrFloat(element[0],"innerRadius",0.0),htmlparser.HtmlParserTools.getAttrBool(element[0],"closePath",true),strokes1.length > 0?strokes1[0]:null,fills1.length > 0?fills1[0]:null);
					};
				})(element))));
				break;
			case "DOMStaticText":case "DOMDynamicText":case "DOMInputText":
				r.push(this.loadText(element[0],parentMatrix));
				break;
			case "DOMGroup":
				var elements1 = element[0].find(">members>*");
				if(elements1.length > 0) {
					var m = flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(element[0],">matrix>Matrix"));
					var group = new nanofl.engine.elements.GroupElement(this.loadElements(namePath,elements1,m.clone().invert().prependMatrix(parentMatrix)));
					group.matrix = m;
					r.push(group);
				}
				break;
			case "DOMTLFText":
				nanofl.engine.Debug.console.warn("DOMTLFText is not supported. Please, resave original document in Flash Pro CC.");
				break;
			default:
				nanofl.engine.Debug.console.warn("Unknow element node: '" + element[0].name + "'.");
			}
		}
		return r;
	}
	,loadShape: function(namePath,element,parentMatrix) {
		var _g = this;
		return this.loadDrawing(namePath,element,parentMatrix,function(strokes,fills) {
			return new flashimport_ShapeConvertor(strokes,fills,_g.loadEdgeDatas(element)).convert();
		});
	}
	,loadDrawing: function(namePath,element,parentMatrix,parseDrawData) {
		var transformedStrokes = element.find(">strokes>StrokeStyle>*, >stroke>*").map($bind(this,this.loadShapeStroke));
		var transformedFills = element.find(">fills>FillStyle>*, >fill>*").map($bind(this,this.loadShapeFill));
		var matrixBy = new haxe_ds_ObjectMap();
		var byMatrix = new flashimport_MatrixMap();
		var _g = 0;
		while(_g < transformedStrokes.length) {
			var z2 = transformedStrokes[_g];
			++_g;
			matrixBy.set(z2.stroke,z2.matrix);
			if(!byMatrix.exists(z2.matrix)) byMatrix.set(z2.matrix,[]);
			byMatrix.get(z2.matrix).push(z2.stroke);
		}
		var _g1 = 0;
		while(_g1 < transformedFills.length) {
			var z3 = transformedFills[_g1];
			++_g1;
			matrixBy.set(z3.fill,z3.matrix);
			if(!byMatrix.exists(z3.matrix)) byMatrix.set(z3.matrix,[]);
			byMatrix.get(z3.matrix).push(z3.fill);
		}
		var shapeData = parseDrawData(transformedStrokes.map(function(z) {
			return z.stroke;
		}),transformedFills.map(function(z1) {
			return z1.fill;
		}));
		var objectMatrix = flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(element,">matrix>Matrix")).prependMatrix(parentMatrix);
		var r = [];
		var edges = stdlib_LambdaArray.extract(shapeData.edges,function(edge) {
			return matrixBy.h[edge.stroke.__id__].isIdentity();
		});
		var polygons = stdlib_LambdaArray.extract(shapeData.polygons,function(polygon) {
			return matrixBy.h[polygon.fill.__id__].isIdentity();
		});
		if(edges.length > 0 || polygons.length > 0) {
			var shape = new nanofl.engine.elements.ShapeElement(edges,polygons);
			this.loadRegPoint(shape,htmlparser.HtmlParserTools.findOne(element,">transformationPoint>Point"));
			shape.transform(objectMatrix,true);
			r.push(shape);
		}
		var $it0 = byMatrix.keys();
		while( $it0.hasNext() ) {
			var matrix = $it0.next();
			var matrix1 = [matrix];
			if(matrix1[0].isIdentity()) continue;
			var shape1 = new nanofl.engine.elements.ShapeElement(stdlib_LambdaArray.extract(shapeData.edges,(function(matrix1) {
				return function(edge1) {
					return matrixBy.h[edge1.stroke.__id__].equ(matrix1[0]);
				};
			})(matrix1)),stdlib_LambdaArray.extract(shapeData.polygons,(function(matrix1) {
				return function(polygon1) {
					return matrixBy.h[polygon1.fill.__id__].equ(matrix1[0]);
				};
			})(matrix1)));
			shape1.transform(matrix1[0].clone().invert(),false);
			r.push(this.wrapElements(namePath,[shape1],objectMatrix.clone().appendMatrix(matrix1[0])));
		}
		return r;
	}
	,wrapElements: function(autoPrefixID,elements,matrix) {
		var mcItem = this.library.addItem(new nanofl.engine.libraryitems.MovieClipItem(this.generateNewID(autoPrefixID)));
		mcItem.addLayer(new nanofl.engine.Layer("auto"));
		mcItem.layers[0].addKeyFrame(new nanofl.engine.KeyFrame(null,null,null,elements));
		var r = mcItem.newInstance();
		if(matrix != null) r.matrix = matrix;
		return r;
	}
	,loadEdgeDatas: function(element) {
		var r = [];
		var _g = 0;
		var _g1 = element.find(">edges>Edge");
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			var edgeData = new flashimport_EdgeData(edge);
			if((edgeData.fillStyle0 != null || edgeData.fillStyle1 != null || edgeData.strokeStyle != null) && edgeData.drawOps.length > 0) r.push(edgeData);
		}
		return r;
	}
	,loadShapeFill: function(fill) {
		var _g = fill.name;
		switch(_g) {
		case "SolidColor":
			return { fill : new nanofl.engine.fills.SolidFill(nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(fill,"color","#000000"),htmlparser.HtmlParserTools.getAttr(fill,"alpha",1.0))), matrix : new nanofl.engine.geom.Matrix()};
		case "LinearGradient":
			var gradients = fill.find(">GradientEntry");
			var m = flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(fill,">matrix>Matrix"),0.001220703125);
			var p0 = m.transformPoint(-1,0);
			var p1 = m.transformPoint(1,0);
			return { fill : new nanofl.engine.fills.LinearFill(gradients.map(function(g) {
				return nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(g,"color","#000000"),htmlparser.HtmlParserTools.getAttr(g,"alpha",1.0));
			}),gradients.map(function(g1) {
				return htmlparser.HtmlParserTools.getAttr(g1,"ratio");
			}),p0.x,p0.y,p1.x,p1.y), matrix : new nanofl.engine.geom.Matrix()};
		case "RadialGradient":
			var focalPointRatio = htmlparser.HtmlParserTools.getAttr(fill,"focalPointRatio",0.0);
			var gradients1 = fill.find(">GradientEntry");
			var m1 = flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(fill,">matrix>Matrix"),0.001220703125);
			var p01 = m1.transformPoint(0,0);
			var p11 = m1.transformPoint(1,0);
			var p2 = m1.transformPoint(0,1);
			var k = Math.abs(nanofl.engine.geom.PointTools.getDist(p01.x,p01.y,p2.x,p2.y) - nanofl.engine.geom.PointTools.getDist(p01.x,p01.y,p11.x,p11.y));
			if(k < flashimport_SymbolLoader.EPS) return { fill : new nanofl.engine.fills.RadialFill(gradients1.map(function(g2) {
				return nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(g2,"color","#000000"),htmlparser.HtmlParserTools.getAttr(g2,"alpha",1.0));
			}),gradients1.map(function(g3) {
				return htmlparser.HtmlParserTools.getAttr(g3,"ratio");
			}),p01.x,p01.y,nanofl.engine.geom.PointTools.getDist(p01.x,p01.y,p11.x,p11.y),p01.x + (p11.x - p01.x) * focalPointRatio,p01.y + (p11.y - p01.y) * focalPointRatio), matrix : new nanofl.engine.geom.Matrix()}; else return { fill : new nanofl.engine.fills.RadialFill(gradients1.map(function(g4) {
				return nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(g4,"color","#000000"),htmlparser.HtmlParserTools.getAttr(g4,"alpha",1.0));
			}),gradients1.map(function(g5) {
				return htmlparser.HtmlParserTools.getAttr(g5,"ratio");
			}),0,0,1,focalPointRatio,0), matrix : m1};
			break;
		case "BitmapFill":
			return { fill : new nanofl.engine.fills.BitmapFill(htmlparser.HtmlParserTools.getAttr(fill,"bitmapPath"),htmlparser.HtmlParserTools.getAttr(fill,"bitmapIsClipped",true)?"no-repeat":"repeat",flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(fill,">matrix>Matrix"),20)), matrix : new nanofl.engine.geom.Matrix()};
		default:
			nanofl.engine.Debug.console.warn("Unknow fill type '" + fill.name + "'.");
			return { fill : new nanofl.engine.fills.SolidFill("#FFFFFF"), matrix : new nanofl.engine.geom.Matrix()};
		}
	}
	,loadShapeStroke: function(stroke) {
		var isHairline = htmlparser.HtmlParserTools.getAttr(stroke,"solidStyle") == "hairline";
		var colorElem = htmlparser.HtmlParserTools.findOne(stroke,">fill>SolidColor");
		var _g = stroke.name;
		switch(_g) {
		case "SolidStroke":
			return { stroke : new nanofl.engine.strokes.SolidStroke(nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(colorElem,"color","#000000"),htmlparser.HtmlParserTools.getAttr(colorElem,"alpha",1.0)),!isHairline?htmlparser.HtmlParserTools.getAttr(stroke,"weight",1.0):1.0,htmlparser.HtmlParserTools.getAttr(stroke,"caps","round"),htmlparser.HtmlParserTools.getAttr(stroke,"joins","round"),htmlparser.HtmlParserTools.getAttr(stroke,"miterLimit",3.0),isHairline), matrix : new nanofl.engine.geom.Matrix()};
		default:
			nanofl.engine.Debug.console.warn("Unknow stroke type '" + stroke.name + "'.");
			return { stroke : new nanofl.engine.strokes.SolidStroke("#000000"), matrix : new nanofl.engine.geom.Matrix()};
		}
	}
	,loadRegPoint: function(dest,point) {
		if(point != null) {
			dest.regX = htmlparser.HtmlParserTools.getAttr(point,"x",0);
			dest.regY = htmlparser.HtmlParserTools.getAttr(point,"y",0);
		}
	}
	,loadText: function(text,parentMatrix) {
		var _g = this;
		var r = new nanofl.engine.elements.TextElement(htmlparser.HtmlParserTools.getAttr(text,"name",""),htmlparser.HtmlParserTools.getAttr(text,"width",0.0) + 4.0,htmlparser.HtmlParserTools.getAttr(text,"height",0.0) + 4.0,htmlparser.HtmlParserTools.getAttr(text,"isSelectable",true),false,nanofl.TextRun.optimize(text.find(">textRuns>DOMTextRun").map(function(run) {
			return _g.loadTextRun(run);
		})));
		r.matrix = flashimport_MatrixParser.load(htmlparser.HtmlParserTools.findOne(text,">matrix>Matrix"),1.0,-2 + htmlparser.HtmlParserTools.getAttr(text,"left",0.0),-2).prependMatrix(parentMatrix);
		this.loadRegPoint(r,htmlparser.HtmlParserTools.findOne(text,">transformationPoint>Point"));
		return r;
	}
	,loadTextRun: function(textRun) {
		var textAttrs = htmlparser.HtmlParserTools.findOne(textRun,">textAttrs>DOMTextAttrs");
		var face = htmlparser.HtmlParserTools.getAttr(textAttrs,"face");
		if(!this.fontMap.exists(face)) {
			var font1 = this.fontConvertor.convert(face);
			this.fontMap.set(face,font1);
			nanofl.engine.Debug.console.log("FONT MAP: " + face + " -> " + font1.face + " / " + (font1.style != ""?font1.style:"regular"));
		}
		var font = this.fontMap.get(face);
		return nanofl.TextRun.create(StringTools.replace(stdlib_Utf8.htmlUnescape(htmlparser.HtmlParserTools.findOne(textRun,">characters").innerHTML),"\r","\n"),htmlparser.HtmlParserTools.getAttr(textAttrs,"fillColor","#000000"),font.face,font.style,htmlparser.HtmlParserTools.getAttrFloat(textAttrs,"size",12.0),htmlparser.HtmlParserTools.getAttr(textAttrs,"alignment","left"),0,"#000000",htmlparser.HtmlParserTools.getAttrBool(textAttrs,"autoKern",false),htmlparser.HtmlParserTools.getAttrFloat(textAttrs,"letterSpacing",0),htmlparser.HtmlParserTools.getAttrFloat(textAttrs,"lineSpacing",2));
	}
	,loadColorEffect: function(color) {
		if(color == null) return null;
		if(color.hasAttribute("brightness")) return new nanofl.engine.coloreffects.ColorEffectBrightness(htmlparser.HtmlParserTools.getAttr(color,"brightness",1.0));
		if(color.hasAttribute("tintMultiplier")) return new nanofl.engine.coloreffects.ColorEffectTint(htmlparser.HtmlParserTools.getAttr(color,"tintColor"),htmlparser.HtmlParserTools.getAttr(color,"tintMultiplier",1.0));
		var props = ["alphaMultiplier","redMultiplier","greenMultiplier","blueMultiplier","alphaOffset","redOffset","greenOffset","blueOffset"];
		var propCount = stdlib_LambdaIterator.count((function($this) {
			var $r;
			var this1 = color.getAttributesAssoc();
			$r = this1.keys();
			return $r;
		}(this)),function(s) {
			return Lambda.has(props,s);
		});
		if(color.hasAttribute("alphaMultiplier") && propCount == 1) return new nanofl.engine.coloreffects.ColorEffectAlpha(htmlparser.HtmlParserTools.getAttr(color,"alphaMultiplier",1.0)); else if(propCount > 0) return new nanofl.engine.coloreffects.ColorEffectAdvanced(htmlparser.HtmlParserTools.getAttr(color,"alphaMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"redMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"greenMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"blueMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"alphaOffset",0.0),htmlparser.HtmlParserTools.getAttr(color,"redOffset",0.0),htmlparser.HtmlParserTools.getAttr(color,"greenOffset",0.0),htmlparser.HtmlParserTools.getAttr(color,"blueOffset",0.0));
		return null;
	}
	,loadFilter: function(filter) {
		if(filter == null) return null;
		var params = filter.getAttributesObject();
		this.fixFilterParamFloat(params,"strength",100,function(k) {
			return Math.round(k * 100);
		});
		this.fixFilterParamFloat(params,"blurX",10,function(k1) {
			return k1 * 2;
		});
		this.fixFilterParamFloat(params,"blurY",10,function(k2) {
			return k2 * 2;
		});
		var _g = filter.name;
		switch(_g) {
		case "BlurFilter":
			filter.name = "BoxBlurFilter";
			break;
		default:
			filter.name = filter.name;
		}
		return new nanofl.engine.FilterDef(filter.name,params);
	}
	,parseMotionTweenRotate: function(motionTweenRotate,motionTweenRotateTimes) {
		switch(motionTweenRotate) {
		case "clockwise":
			return motionTweenRotateTimes;
		case "counter-clockwise":
			return -motionTweenRotateTimes;
		default:
			return 0;
		}
	}
	,loadLinkage: function(item,node) {
		if(htmlparser.HtmlParserTools.getAttr(node,"linkageExportForAS",false)) {
			item.linkedClass = htmlparser.HtmlParserTools.getAttr(node,"linkageClassName","");
			var linkageIdentifier = htmlparser.HtmlParserTools.getAttr(node,"linkageIdentifier","");
			if(linkageIdentifier != "") {
				nanofl.engine.Debug.console.warn("Linkage identifier is not supported (symbol '" + item.namePath + "')");
				if(item.linkedClass == "") item.linkedClass = linkageIdentifier;
			}
		}
	}
	,fixFilterParamFloat: function(params,name,defValue,f) {
		Reflect.setField(params,name,Object.prototype.hasOwnProperty.call(params,name)?f(stdlib_Std.parseFloat(Reflect.field(params,name))):defValue);
	}
	,generateNewID: function(autoPrefixID) {
		if(autoPrefixID == null) autoPrefixID = "auto";
		var i = 1;
		while(true) {
			var r = autoPrefixID + "_" + i;
			if(!this.library.hasItem(r) && HxOverrides.indexOf(this.generatedAutoIDs,r,0) < 0) {
				this.generatedAutoIDs.push(r);
				return r;
			}
			i++;
		}
	}
	,__class__: flashimport_SymbolLoader
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
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
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
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
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
haxe_io_Path.__name__ = ["haxe","io","Path"];
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
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
var stdlib_LambdaArray = function() { };
stdlib_LambdaArray.__name__ = ["stdlib","LambdaArray"];
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
stdlib_LambdaIterable.__name__ = ["stdlib","LambdaIterable"];
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
stdlib_LambdaIterator.__name__ = ["stdlib","LambdaIterator"];
stdlib_LambdaIterator.array = function(it) {
	var r = [];
	while( it.hasNext() ) {
		var e = it.next();
		r.push(e);
	}
	return r;
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
stdlib_Std.__name__ = ["stdlib","Std"];
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
	haxe_Log.trace("Unknow escape sequence: " + escape,{ fileName : "Utf8.hx", lineNumber : 131, className : "stdlib.Utf8", methodName : "htmlUnescapeChar"});
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
var stdlib_Uuid = function() { };
stdlib_Uuid.__name__ = ["stdlib","Uuid"];
stdlib_Uuid.newUuid = function() {
	var timeF = new Date().getTime();
	var time = timeF - 268435455. * (timeF / 268435455 | 0) | 0;
	var uuid = stdlib_StringTools.hex(stdlib_Uuid.counter++,8) + "-" + StringTools.hex(timeF / 65536 | 0,8) + "-" + StringTools.hex(time % 65536,8) + "-" + stdlib_StringTools.hex(Std.random(65536),4) + "-" + stdlib_StringTools.hex(Std.random(65536),4);
	return uuid;
};
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
FlashImporterPlugin.IMPORT_MEDIA_SCRIPT_TEMPLATE = "(function (console) { \"use strict\";\nvar FlashMediaImporter = function() { };\nFlashMediaImporter.__name__ = true;\nFlashMediaImporter.main = function() {\n\tvar srcFilePath = \"file:///\" + StringTools.replace(FlashMediaImporter.SRC_FILE,\"\\\\\",\"/\");\n\tvar destLibraryDir = \"file:///\" + haxe_io_Path.addTrailingSlash(StringTools.replace(FlashMediaImporter.DEST_DIR,\"\\\\\",\"/\")) + \"library\";\n\tFlashMediaImporter.log(\"Import media from '\" + srcFilePath + \"' to '\" + destLibraryDir + \"' directory:\");\n\tvar doc = fl.openDocument(srcFilePath);\n\tFLfile.createFolder(destLibraryDir);\n\tvar _g1 = 0;\n\tvar _g = doc.library.items.length;\n\twhile(_g1 < _g) {\n\t\tvar i = _g1++;\n\t\tvar item = doc.library.items[i];\n\t\tif(item != null) {\n\t\t\tvar _g2 = item.itemType;\n\t\t\tswitch(_g2) {\n\t\t\tcase \"bitmap\":\n\t\t\t\tFlashMediaImporter.log(\"  Import: \" + item.name + \" / \" + item.itemType + \" / \" + item.originalCompressionType);\n\t\t\t\tFlashMediaImporter.importBitmap(destLibraryDir,item);\n\t\t\t\tbreak;\n\t\t\tcase \"movie clip\":case \"graphic\":case \"button\":case \"folder\":\n\t\t\t\tbreak;\n\t\t\tcase \"sound\":\n\t\t\t\tFlashMediaImporter.log(\"  Import: \" + item.name + \" / \" + item.itemType + \" / \" + item.originalCompressionType);\n\t\t\t\tFlashMediaImporter.importSound(destLibraryDir,item);\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\tFlashMediaImporter.log(\"    Skip: \" + item.name + \" / \" + item.itemType);\n\t\t\t}\n\t\t}\n\t}\n\tdoc.close(false);\n\tFlashMediaImporter.log(\"Done.\");\n\tFLfile.write(\"file:///\" + StringTools.replace(FlashMediaImporter.DEST_DIR,\"\\\\\",\"/\") + \"/.done-import-media\",\"\");\n};\nFlashMediaImporter.importBitmap = function(destLibraryDir,item) {\n\tvar savePath = destLibraryDir + \"/\" + item.name + \".png\";\n\tif(!FLfile.exists(savePath)) {\n\t\tFLfile.createFolder(haxe_io_Path.directory(savePath));\n\t\tvar temp = fl.createDocument();\n\t\ttemp.addItem({ x : 0, y : 0},item);\n\t\tvar image = temp.getTimeline().layers[0].frames[0].elements[0];\n\t\ttemp.width = image.getBits().width;\n\t\ttemp.height = image.getBits().height;\n\t\timage.x = 0;\n\t\timage.y = 0;\n\t\timage.setTransformationPoint({ x : 0, y : 0});\n\t\timage.width = temp.width;\n\t\timage.height = temp.height;\n\t\ttemp.exportPNG(savePath,false,true);\n\t\ttemp.close(false);\n\t}\n\treturn true;\n};\nFlashMediaImporter.importSound = function(destLibraryDir,item) {\n\tvar savePath;\n\tsavePath = destLibraryDir + \"/\" + haxe_io_Path.withoutExtension(item.name) + (item.originalCompressionType == \"RAW\"?\".wav\":\".mp3\");\n\tif(!FLfile.exists(savePath)) {\n\t\tFLfile.createFolder(haxe_io_Path.directory(savePath));\n\t\titem.exportToFile(savePath);\n\t}\n\treturn true;\n};\nFlashMediaImporter.log = function(s) {\n\tfl.trace(s);\n};\nvar HxOverrides = function() { };\nHxOverrides.__name__ = true;\nHxOverrides.substr = function(s,pos,len) {\n\tif(pos != null && pos != 0 && len != null && len < 0) return \"\";\n\tif(len == null) len = s.length;\n\tif(pos < 0) {\n\t\tpos = s.length + pos;\n\t\tif(pos < 0) pos = 0;\n\t} else if(len < 0) len = s.length + len - pos;\n\treturn s.substr(pos,len);\n};\nMath.__name__ = true;\nvar StringTools = function() { };\nStringTools.__name__ = true;\nStringTools.replace = function(s,sub,by) {\n\treturn s.split(sub).join(by);\n};\nvar haxe_Log = function() { };\nhaxe_Log.__name__ = true;\nhaxe_Log.trace = function(v,infos) {\n\tjs_Boot.__trace(v,infos);\n};\nvar haxe_io_Path = function(path) {\n\tswitch(path) {\n\tcase \".\":case \"..\":\n\t\tthis.dir = path;\n\t\tthis.file = \"\";\n\t\treturn;\n\t}\n\tvar c1 = path.lastIndexOf(\"/\");\n\tvar c2 = path.lastIndexOf(\"\\\\\");\n\tif(c1 < c2) {\n\t\tthis.dir = HxOverrides.substr(path,0,c2);\n\t\tpath = HxOverrides.substr(path,c2 + 1,null);\n\t\tthis.backslash = true;\n\t} else if(c2 < c1) {\n\t\tthis.dir = HxOverrides.substr(path,0,c1);\n\t\tpath = HxOverrides.substr(path,c1 + 1,null);\n\t} else this.dir = null;\n\tvar cp = path.lastIndexOf(\".\");\n\tif(cp != -1) {\n\t\tthis.ext = HxOverrides.substr(path,cp + 1,null);\n\t\tthis.file = HxOverrides.substr(path,0,cp);\n\t} else {\n\t\tthis.ext = null;\n\t\tthis.file = path;\n\t}\n};\nhaxe_io_Path.__name__ = true;\nhaxe_io_Path.withoutExtension = function(path) {\n\tvar s = new haxe_io_Path(path);\n\ts.ext = null;\n\treturn s.toString();\n};\nhaxe_io_Path.directory = function(path) {\n\tvar s = new haxe_io_Path(path);\n\tif(s.dir == null) return \"\";\n\treturn s.dir;\n};\nhaxe_io_Path.addTrailingSlash = function(path) {\n\tif(path.length == 0) return \"/\";\n\tvar c1 = path.lastIndexOf(\"/\");\n\tvar c2 = path.lastIndexOf(\"\\\\\");\n\tif(c1 < c2) {\n\t\tif(c2 != path.length - 1) return path + \"\\\\\"; else return path;\n\t} else if(c1 != path.length - 1) return path + \"/\"; else return path;\n};\nhaxe_io_Path.prototype = {\n\ttoString: function() {\n\t\treturn (this.dir == null?\"\":this.dir + (this.backslash?\"\\\\\":\"/\")) + this.file + (this.ext == null?\"\":\".\" + this.ext);\n\t}\n};\nvar js_Boot = function() { };\njs_Boot.__name__ = true;\njs_Boot.__trace = function(v,i) {\n\tvar msg;\n\tif(i != null) msg = i.fileName + \":\" + i.lineNumber + \": \"; else msg = \"\";\n\tmsg += js_Boot.__string_rec(v,\"\");\n\tfl.trace(msg);\n};\njs_Boot.__string_rec = function(o,s) {\n\tif(o == null) return \"null\";\n\tif(s.length >= 5) return \"<...>\";\n\tvar t = typeof(o);\n\tif(t == \"function\" && (o.__name__ || o.__ename__)) t = \"object\";\n\tswitch(t) {\n\tcase \"object\":\n\t\tif(o instanceof Array) {\n\t\t\tif(o.__enum__) {\n\t\t\t\tif(o.length == 2) return o[0];\n\t\t\t\tvar str2 = o[0] + \"(\";\n\t\t\t\ts += \"\\t\";\n\t\t\t\tvar _g1 = 2;\n\t\t\t\tvar _g = o.length;\n\t\t\t\twhile(_g1 < _g) {\n\t\t\t\t\tvar i1 = _g1++;\n\t\t\t\t\tif(i1 != 2) str2 += \",\" + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);\n\t\t\t\t}\n\t\t\t\treturn str2 + \")\";\n\t\t\t}\n\t\t\tvar l = o.length;\n\t\t\tvar i;\n\t\t\tvar str1 = \"[\";\n\t\t\ts += \"\\t\";\n\t\t\tvar _g2 = 0;\n\t\t\twhile(_g2 < l) {\n\t\t\t\tvar i2 = _g2++;\n\t\t\t\tstr1 += (i2 > 0?\",\":\"\") + js_Boot.__string_rec(o[i2],s);\n\t\t\t}\n\t\t\tstr1 += \"]\";\n\t\t\treturn str1;\n\t\t}\n\t\tvar tostr;\n\t\ttry {\n\t\t\ttostr = o.toString;\n\t\t} catch( e ) {\n\t\t\treturn \"???\";\n\t\t}\n\t\tif(tostr != null && tostr != Object.toString && typeof(tostr) == \"function\") {\n\t\t\tvar s2 = o.toString();\n\t\t\tif(s2 != \"[object Object]\") return s2;\n\t\t}\n\t\tvar k = null;\n\t\tvar str = \"{\\n\";\n\t\ts += \"\\t\";\n\t\tvar hasp = o.hasOwnProperty != null;\n\t\tfor( var k in o ) {\n\t\tif(hasp && !o.hasOwnProperty(k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tif(k == \"prototype\" || k == \"__class__\" || k == \"__super__\" || k == \"__interfaces__\" || k == \"__properties__\") {\n\t\t\tcontinue;\n\t\t}\n\t\tif(str.length != 2) str += \", \\n\";\n\t\tstr += s + k + \" : \" + js_Boot.__string_rec(o[k],s);\n\t\t}\n\t\ts = s.substring(1);\n\t\tstr += \"\\n\" + s + \"}\";\n\t\treturn str;\n\tcase \"function\":\n\t\treturn \"<function>\";\n\tcase \"string\":\n\t\treturn o;\n\tdefault:\n\t\treturn String(o);\n\t}\n};\nString.__name__ = true;\nArray.__name__ = true;\nhaxe_Log.trace = function(v,infos) {\n\tfl.trace(v);\n};\nFlashMediaImporter.SRC_FILE = \"{SRC_FILE}\";\nFlashMediaImporter.DEST_DIR = \"{DEST_DIR}\";\nFlashMediaImporter.TEMP_MC_NAME = \"__temp_fme\";\nFlashMediaImporter.main();\n})(typeof console != \"undefined\" ? console : {log:function(){}});\n";
flashimport_SymbolLoader.EPS = 1e-10;
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
stdlib_Uuid.counter = 0;
FlashImporterPlugin.main();
})(typeof console != "undefined" ? console : {log:function(){}});
