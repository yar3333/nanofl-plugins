(function () { "use strict";
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
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
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
var FlashXflImporterPlugin = function() {
	this.fileFilterExtensions = ["xfl"];
	this.fileFilterDescription = "Adobe Flash Uncompressed Document (*.xfl)";
	this.menuItemIcon = "url(data:image/png;base64," + StringTools.replace(StringTools.replace(FlashXflImporterPlugin.embeddedIcon,"\r",""),"\n","") + ")";
	this.menuItemName = "Adobe Flash Uncompressed Document (*.xfl)";
	this.name = "FlashXflImporter";
};
FlashXflImporterPlugin.__name__ = ["FlashXflImporterPlugin"];
FlashXflImporterPlugin.__interfaces__ = [nanofl.ide.plugins.IImporterPlugin];
FlashXflImporterPlugin.main = function() {
	nanofl.engine.Plugins.registerImporter(new FlashXflImporterPlugin());
};
FlashXflImporterPlugin.prototype = {
	importDocument: function(fileApi,srcFilePath,destFilePath,documentProperties,library,fonts,callb) {
		flashimport.DocumentImporter.process(FlashXflImporterPlugin.IMPORT_MEDIA_SCRIPT_TEMPLATE,fileApi,srcFilePath,destFilePath,documentProperties,library,fonts,true,null,callb);
	}
	,__class__: FlashXflImporterPlugin
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
	var a = new Array();
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
var List = function() { };
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
IMap.prototype = {
	__class__: IMap
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
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
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
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
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
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
var flashimport = {};
flashimport.ContourParser = function(edge) {
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
	stdlib.Debug.assert(drawStr.length == 0 || StringTools.ltrim(drawStr).charAt(0) == "!","drawStr = " + drawStr,{ fileName : "ContourParser.hx", lineNumber : 39, className : "flashimport.ContourParser", methodName : "new"});
	while(drawStr.length > 0) {
		var opCode = drawStr.charAt(0);
		drawStr = HxOverrides.substr(drawStr,1,null);
		if(opCode == "!") {
			if(reXY.match(drawStr)) {
				var x = this.parseNumber(reXY.matched(1));
				var y = this.parseNumber(reXY.matched(2));
				if(x != lastX || y != lastY) {
					this.drawOps.push(flashimport.DrawOp.move(x,y));
					lastX = x;
					lastY = y;
				}
				drawStr = reXY.matchedRight();
			} else throw "Expected (x, y).";
		} else if(opCode == "|" || opCode == "/") while(reXY.match(drawStr)) {
			this.drawOps.push(flashimport.DrawOp.line(lastX = this.parseNumber(reXY.matched(1)),lastY = this.parseNumber(reXY.matched(2))));
			drawStr = reXY.matchedRight();
		} else if(opCode == "[") while(reX1Y1X2Y2.match(drawStr)) {
			this.drawOps.push(flashimport.DrawOp.curve(this.parseNumber(reX1Y1X2Y2.matched(1)),this.parseNumber(reX1Y1X2Y2.matched(2)),lastX = this.parseNumber(reX1Y1X2Y2.matched(3)),lastY = this.parseNumber(reX1Y1X2Y2.matched(4))));
			drawStr = reX1Y1X2Y2.matchedRight();
		} else if(opCode == "S") drawStr = HxOverrides.substr(drawStr,1,null); else if(opCode == " " || opCode == "\r" || opCode == "\n") drawStr = HxOverrides.substr(drawStr,1,null); else throw "Unknow edges code = '" + opCode + "' near '" + drawStr + "'.";
	}
};
flashimport.ContourParser.__name__ = ["flashimport","ContourParser"];
flashimport.ContourParser.prototype = {
	parseNumber: function(s) {
		if(StringTools.startsWith(s,"#")) {
			s = HxOverrides.substr(s,1,null);
			var n = s.indexOf(".");
			var high = HxOverrides.substr(s,0,n);
			var low = StringTools.rpad(HxOverrides.substr(s,n + 1,null),"0",2);
			var r = Std.parseInt("0x" + high + low);
			if(r >= -2147483648) r = -(~r + 1);
			return nanofl.engine.geom.PointTools.round100(r / 5120);
		}
		return nanofl.engine.geom.PointTools.round100(0.05 * Std.parseFloat(s));
	}
	,__class__: flashimport.ContourParser
};
flashimport.ContoursExporter = function(strokes,fills) {
	this.y = null;
	this.x = null;
	this.stroke = null;
	this.polygons = new Array();
	this.edges = new Array();
	this.isInFill = false;
	this.strokes = strokes;
	this.fills = fills;
};
flashimport.ContoursExporter.__name__ = ["flashimport","ContoursExporter"];
flashimport.ContoursExporter.prototype = {
	beginFill: function(n) {
		this.isInFill = true;
		this.polygons.push(new nanofl.engine.geom.Polygon(this.fills[n]));
	}
	,endFill: function() {
		this.isInFill = false;
	}
	,beginStroke: function(n) {
		this.stroke = this.strokes[n];
	}
	,endStroke: function() {
	}
	,moveTo: function(x,y) {
		if(this.isInFill) this.polygons[this.polygons.length - 1].contours.push(new nanofl.engine.geom.Contour([]));
		this.x = x;
		this.y = y;
	}
	,lineTo: function(x,y) {
		if(this.isInFill) {
			var contours = this.polygons[this.polygons.length - 1].contours;
			contours[contours.length - 1].edges.push(new nanofl.engine.geom.Edge(this.x,this.y,x,y));
		} else this.edges.push(new nanofl.engine.geom.StrokeEdge(this.x,this.y,x,y,null,null,this.stroke));
		this.x = x;
		this.y = y;
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.isInFill) {
			var contours = this.polygons[this.polygons.length - 1].contours;
			contours[contours.length - 1].edges.push(new nanofl.engine.geom.Edge(this.x,this.y,controlX,controlY,anchorX,anchorY));
		} else this.edges.push(new nanofl.engine.geom.StrokeEdge(this.x,this.y,controlX,controlY,anchorX,anchorY,this.stroke));
		this.x = anchorX;
		this.y = anchorY;
	}
	,'export': function() {
		var polygons = [];
		var _g = 0;
		var _g1 = this.polygons;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			polygons = polygons.concat(p.split());
		}
		return { edges : this.edges, polygons : polygons};
	}
	,beginShape: function() {
	}
	,endShape: function() {
	}
	,beginFills: function() {
	}
	,endFills: function() {
	}
	,beginStrokes: function() {
	}
	,endStrokes: function() {
	}
	,__class__: flashimport.ContoursExporter
};
flashimport.ContoursParser = function(contours) {
	var xPos = 0.0;
	var yPos = 0.0;
	this.fillEdgeMap = new haxe.ds.IntMap();
	this.lineEdgeMap = new haxe.ds.IntMap();
	var _g = 0;
	while(_g < contours.length) {
		var contour = contours[_g];
		++_g;
		var subPath = new Array();
		var _g1 = 0;
		var _g2 = contour.drawOps;
		while(_g1 < _g2.length) {
			var drawOp = _g2[_g1];
			++_g1;
			switch(drawOp[1]) {
			case 0:
				var y = drawOp[3];
				var x = drawOp[2];
				xPos = x;
				yPos = y;
				break;
			case 1:
				var y1 = drawOp[3];
				var x1 = drawOp[2];
				var from = { x : xPos, y : yPos};
				xPos = x1;
				yPos = y1;
				var to = { x : xPos, y : yPos};
				subPath.push(new flashimport.StraightEdge(from,to,contour.strokeStyle,contour.fillStyle1));
				break;
			case 2:
				var y2 = drawOp[5];
				var x2 = drawOp[4];
				var y11 = drawOp[3];
				var x11 = drawOp[2];
				var from1 = { x : xPos, y : yPos};
				var xPosControl = x11;
				var yPosControl = y11;
				xPos = x2;
				yPos = y2;
				var control = { x : xPosControl, y : yPosControl};
				var to1 = { x : xPos, y : yPos};
				subPath.push(new flashimport.CurvedEdge(from1,control,to1,contour.strokeStyle,contour.fillStyle1));
				break;
			}
		}
		this.processSubPath(subPath,contour.strokeStyle,contour.fillStyle0,contour.fillStyle1);
	}
	this.cleanEdgeMap(this.fillEdgeMap);
	this.cleanEdgeMap(this.lineEdgeMap);
};
flashimport.ContoursParser.__name__ = ["flashimport","ContoursParser"];
flashimport.ContoursParser.prototype = {
	parse: function(handler) {
		handler.beginShape();
		this.exportFillPath(handler);
		this.exportLinePath(handler);
		handler.endShape();
	}
	,processSubPath: function(subPath,lineStyleIdx,fillStyleIdx0,fillStyleIdx1) {
		if(fillStyleIdx0 != 0) {
			var path = this.fillEdgeMap.get(fillStyleIdx0);
			if(path == null) this.fillEdgeMap.set(fillStyleIdx0,path = []);
			var j = subPath.length - 1;
			while(j >= 0) {
				path.push(subPath[j].reverseWithNewFillStyle(fillStyleIdx0));
				j--;
			}
		}
		if(fillStyleIdx1 != 0) {
			var path1 = this.fillEdgeMap.get(fillStyleIdx1);
			if(path1 == null) this.fillEdgeMap.set(fillStyleIdx1,path1 = []);
			this.appendEdges(path1,subPath);
		}
		if(lineStyleIdx != 0) {
			var path2 = this.lineEdgeMap.get(lineStyleIdx);
			if(path2 == null) this.lineEdgeMap.set(lineStyleIdx,path2 = []);
			this.appendEdges(path2,subPath);
		}
	}
	,cleanEdgeMap: function(edgeMap) {
		var $it0 = edgeMap.keys();
		while( $it0.hasNext() ) {
			var styleIdx = $it0.next();
			var subPath = edgeMap.get(styleIdx);
			if(subPath != null && subPath.length > 0) {
				var prevEdge = null;
				var tmpPath = new Array();
				var coordMap = this.createCoordMap(subPath);
				while(subPath.length > 0) {
					var idx = 0;
					while(idx < subPath.length) if(prevEdge == null || nanofl.engine.geom.PointTools.equ(prevEdge.get_to(),subPath[idx].get_from())) {
						var edge = subPath.splice(idx,1)[0];
						tmpPath.push(edge);
						this.removeEdgeFromCoordMap(coordMap,edge);
						prevEdge = edge;
					} else {
						var edge1 = this.findNextEdgeInCoordMap(coordMap,prevEdge);
						if(edge1 != null) idx = HxOverrides.indexOf(subPath,edge1,0); else {
							idx = 0;
							prevEdge = null;
						}
					}
				}
				edgeMap.set(styleIdx,tmpPath);
			}
		}
	}
	,createCoordMap: function(path) {
		var r = new haxe.ds.StringMap();
		var _g = 0;
		while(_g < path.length) {
			var edge = path[_g];
			++_g;
			var from = edge.get_from();
			var key = from.x + "_" + from.y;
			var coordMapArray = r.get(key);
			if(coordMapArray == null) r.set(key,[edge]); else coordMapArray.push(edge);
		}
		return r;
	}
	,removeEdgeFromCoordMap: function(coordMap,edge) {
		var key = edge.get_from().x + "_" + edge.get_from().y;
		var coordMapArray = coordMap.get(key);
		if(coordMapArray != null) {
			if(coordMapArray.length == 1) coordMap.remove(key); else {
				var i = HxOverrides.indexOf(coordMapArray,edge,0);
				if(i >= 0) coordMapArray.splice(i,1);
			}
		}
	}
	,findNextEdgeInCoordMap: function(coordMap,edge) {
		var key = edge.get_to().x + "_" + edge.get_to().y;
		var coordMapArray = coordMap.get(key);
		if(coordMapArray != null && coordMapArray.length > 0) return coordMapArray[0];
		return null;
	}
	,exportFillPath: function(handler) {
		var path = this.createPathFromEdgeMap(this.fillEdgeMap);
		var pos = { x : 1e10, y : 1e10};
		var fillStyleIdx = 2000000000;
		if(path.length > 0) {
			handler.beginFills();
			var _g = 0;
			while(_g < path.length) {
				var e = path[_g];
				++_g;
				if(fillStyleIdx != e.get_fillStyleIdx()) {
					if(fillStyleIdx != 2000000000) handler.endFill();
					fillStyleIdx = e.get_fillStyleIdx();
					pos = { x : 1e10, y : 1e10};
					handler.beginFill(fillStyleIdx - 1);
				}
				if(!nanofl.engine.geom.PointTools.equ(pos,e.get_from())) handler.moveTo(e.get_from().x,e.get_from().y);
				if(js.Boot.__instanceof(e,flashimport.CurvedEdge)) {
					var c;
					c = js.Boot.__cast(e , flashimport.CurvedEdge);
					handler.curveTo(c.control.x,c.control.y,c.get_to().x,c.get_to().y);
				} else handler.lineTo(e.get_to().x,e.get_to().y);
				pos = e.get_to();
			}
			if(fillStyleIdx != 2000000000) handler.endFill();
			handler.endFills();
		}
	}
	,exportLinePath: function(handler) {
		var path = this.createPathFromEdgeMap(this.lineEdgeMap);
		var pos = { x : 1e10, y : 1e10};
		var lineStyleIdx = 2000000000;
		if(path.length > 0) {
			handler.beginStrokes();
			var _g = 0;
			while(_g < path.length) {
				var e = path[_g];
				++_g;
				if(lineStyleIdx != e.get_lineStyleIdx()) {
					if(lineStyleIdx != 2000000000) handler.endStroke();
					lineStyleIdx = e.get_lineStyleIdx();
					pos = { x : 1e10, y : 1e10};
					handler.beginStroke(lineStyleIdx - 1);
				}
				if(!nanofl.engine.geom.PointTools.equ(e.get_from(),pos)) handler.moveTo(e.get_from().x,e.get_from().y);
				if(js.Boot.__instanceof(e,flashimport.CurvedEdge)) {
					var c;
					c = js.Boot.__cast(e , flashimport.CurvedEdge);
					handler.curveTo(c.control.x,c.control.y,c.get_to().x,c.get_to().y);
				} else handler.lineTo(e.get_to().x,e.get_to().y);
				pos = e.get_to();
			}
			if(lineStyleIdx != 2000000000) handler.endStroke();
			handler.endStrokes();
		}
	}
	,createPathFromEdgeMap: function(edgeMap) {
		var styleIndexes = Lambda.array({ iterator : $bind(edgeMap,edgeMap.keys)});
		styleIndexes.sort(function(a,b) {
			return a - b;
		});
		var path = new Array();
		var _g = 0;
		while(_g < styleIndexes.length) {
			var styleIndex = styleIndexes[_g];
			++_g;
			this.appendEdges(path,edgeMap.get(styleIndex));
		}
		return path;
	}
	,appendEdges: function(v1,v2) {
		var _g = 0;
		while(_g < v2.length) {
			var e = v2[_g];
			++_g;
			v1.push(e);
		}
	}
	,__class__: flashimport.ContoursParser
};
flashimport.IEdge = function() { };
flashimport.IEdge.__name__ = ["flashimport","IEdge"];
flashimport.IEdge.prototype = {
	__class__: flashimport.IEdge
};
flashimport.StraightEdge = function(from,to,lineStyleIdx,fillStyleIdx) {
	if(fillStyleIdx == null) fillStyleIdx = 0;
	if(lineStyleIdx == null) lineStyleIdx = 0;
	this.from = from;
	this.to = to;
	this.lineStyleIdx = lineStyleIdx;
	this.fillStyleIdx = fillStyleIdx;
};
flashimport.StraightEdge.__name__ = ["flashimport","StraightEdge"];
flashimport.StraightEdge.__interfaces__ = [flashimport.IEdge];
flashimport.StraightEdge.prototype = {
	get_from: function() {
		return this.from;
	}
	,get_to: function() {
		return this.to;
	}
	,get_lineStyleIdx: function() {
		return this.lineStyleIdx;
	}
	,get_fillStyleIdx: function() {
		return this.fillStyleIdx;
	}
	,reverseWithNewFillStyle: function(newFillStyleIdx) {
		return new flashimport.StraightEdge(this.get_to(),this.get_from(),this.get_lineStyleIdx(),newFillStyleIdx);
	}
	,__class__: flashimport.StraightEdge
};
flashimport.CurvedEdge = function(from,control,to,lineStyleIdx,fillStyleIdx) {
	if(fillStyleIdx == null) fillStyleIdx = 0;
	if(lineStyleIdx == null) lineStyleIdx = 0;
	flashimport.StraightEdge.call(this,from,to,lineStyleIdx,fillStyleIdx);
	this.control = control;
};
flashimport.CurvedEdge.__name__ = ["flashimport","CurvedEdge"];
flashimport.CurvedEdge.__interfaces__ = [flashimport.IEdge];
flashimport.CurvedEdge.__super__ = flashimport.StraightEdge;
flashimport.CurvedEdge.prototype = $extend(flashimport.StraightEdge.prototype,{
	reverseWithNewFillStyle: function(newFillStyleIdx) {
		return new flashimport.CurvedEdge(this.get_to(),this.control,this.get_from(),this.get_lineStyleIdx(),newFillStyleIdx);
	}
	,__class__: flashimport.CurvedEdge
});
flashimport.DocumentImporter = function() { };
flashimport.DocumentImporter.__name__ = ["flashimport","DocumentImporter"];
flashimport.DocumentImporter.process = function(importMediaScriptTemplate,fileApi,srcFilePath,destFilePath,destDocProp,destLibrary,fonts,runFlashToImportMedia,log,callb) {
	if(runFlashToImportMedia && flashimport.DocumentImporter.hasMedia(fileApi,srcFilePath)) flashimport.DocumentImporter.importMedia(importMediaScriptTemplate,fileApi,srcFilePath,destFilePath,destLibrary,function(success) {
		if(success) flashimport.DocumentImporter.importXmlFiles(fileApi,srcFilePath,destDocProp,destLibrary,fonts,log);
		callb(success);
	}); else {
		flashimport.DocumentImporter.importXmlFiles(fileApi,srcFilePath,destDocProp,destLibrary,fonts,log);
		callb(true);
	}
};
flashimport.DocumentImporter.hasMedia = function(fileApi,srcFilePath) {
	var doc = new htmlparser.XmlDocument(fileApi.getContent(haxe.io.Path.directory(srcFilePath) + "/DOMDocument.xml"));
	return htmlparser.HtmlParserTools.findOne(doc,">DOMDocument>media>*") != null;
};
flashimport.DocumentImporter.importMedia = function(importMediaScriptTemplate,fileApi,srcFilePath,destFilePath,destLibrary,callb) {
	var destDir = haxe.io.Path.directory(destFilePath);
	var scriptFilePath = fileApi.getTempDirectory() + "/flashImporter.jsfl";
	var script = StringTools.replace(StringTools.replace(importMediaScriptTemplate,"{SRC_FILE}",StringTools.replace(srcFilePath,"\\","/")),"{DEST_DIR}",StringTools.replace(destDir,"\\","/"));
	fileApi.saveContent(scriptFilePath,script);
	var doneFile = destDir + "/.done-import-media";
	fileApi.remove(doneFile);
	fileApi.run(scriptFilePath,[],false);
	flashimport.DocumentImporter.waitFor(600,function() {
		return fileApi.exists(doneFile);
	},function(success) {
		if(success) {
			fileApi.remove(doneFile);
			destLibrary.loadItems(fileApi);
			callb(true);
		} else callb(false);
	});
};
flashimport.DocumentImporter.importXmlFiles = function(fileApi,srcFilePath,destDocProp,destLibrary,fonts,log) {
	var srcDir = haxe.io.Path.directory(srcFilePath);
	var srcDoc = new htmlparser.XmlDocument(fileApi.getContent(srcDir + "/DOMDocument.xml"));
	var srcLibDir = srcDir + "/LIBRARY";
	var symbolLoader = new flashimport.SymbolLoader(fileApi,srcDoc,srcLibDir,destLibrary,fonts,log);
	var docPropNode = htmlparser.HtmlParserTools.findOne(srcDoc,">DOMDocument");
	destDocProp.width = htmlparser.HtmlParserTools.getAttr(docPropNode,"width",550);
	destDocProp.height = htmlparser.HtmlParserTools.getAttr(docPropNode,"height",400);
	destDocProp.backgroundColor = htmlparser.HtmlParserTools.getAttr(docPropNode,"backgroundColor","#ffffff");
	destDocProp.framerate = htmlparser.HtmlParserTools.getAttr(docPropNode,"frameRate",24);
	var _g = 0;
	var _g1 = docPropNode.find(">media>DOMSoundItem");
	while(_g < _g1.length) {
		var node = _g1[_g];
		++_g;
		var soundItem = nanofl.engine.libraryitems.SoundItem.load(htmlparser.HtmlParserTools.getAttr(node,"name"),destLibrary.libraryDir,fileApi);
		if(soundItem != null) {
			if(htmlparser.HtmlParserTools.getAttr(node,"linkageExportForAS",false)) soundItem.linkage = htmlparser.HtmlParserTools.getAttr(node,"linkageIdentifier");
			destLibrary.addItem(soundItem);
		}
	}
	symbolLoader.loadFromXml(nanofl.engine.Library.SCENE_NAME_PATH,srcDoc);
	fileApi.findFiles(srcLibDir,function(file) {
		var namePath = haxe.io.Path.withoutExtension(HxOverrides.substr(file,srcLibDir.length + 1,null));
		symbolLoader.loadFromLibrary(namePath);
	});
};
flashimport.DocumentImporter.waitFor = function(maxSeconds,condition,finish) {
	if(maxSeconds == null) maxSeconds = 0;
	if(condition()) finish(true); else {
		var start = new Date().getTime();
		var timer = new haxe.Timer(200);
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
flashimport.DrawOp = { __ename__ : ["flashimport","DrawOp"], __constructs__ : ["move","line","curve"] };
flashimport.DrawOp.move = function(x,y) { var $x = ["move",0,x,y]; $x.__enum__ = flashimport.DrawOp; return $x; };
flashimport.DrawOp.line = function(x,y) { var $x = ["line",1,x,y]; $x.__enum__ = flashimport.DrawOp; return $x; };
flashimport.DrawOp.curve = function(x1,y1,x2,y2) { var $x = ["curve",2,x1,y1,x2,y2]; $x.__enum__ = flashimport.DrawOp; return $x; };
flashimport.FontConvertor = function(fonts) {
	this.fonts = fonts;
};
flashimport.FontConvertor.__name__ = ["flashimport","FontConvertor"];
flashimport.FontConvertor.prototype = {
	convert: function(font) {
		var n = font.lastIndexOf("-");
		var face;
		if(n >= 0) face = font.substring(0,n); else face = font;
		face = this.convertFontFamily(face);
		var style;
		if(n >= 0) style = this.removeSuffixes(font.substring(n + 1)).toLowerCase(); else style = "";
		if(style == "bolditalic") style = "bold italic";
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
	,__class__: flashimport.FontConvertor
};
flashimport.Macro = function() { };
flashimport.Macro.__name__ = ["flashimport","Macro"];
flashimport.MatrixParser = function() { };
flashimport.MatrixParser.__name__ = ["flashimport","MatrixParser"];
flashimport.MatrixParser.load = function(node,divider,dx,dy) {
	if(dy == null) dy = 0.0;
	if(dx == null) dx = 0.0;
	if(divider == null) divider = 1.0;
	if(node != null) return new nanofl.engine.geom.Matrix(htmlparser.HtmlParserTools.getAttr(node,"a",1.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"b",0.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"c",0.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"d",1.0) / divider,htmlparser.HtmlParserTools.getAttr(node,"tx",0.0) + dx,htmlparser.HtmlParserTools.getAttr(node,"ty",0.0) + dy);
	return new nanofl.engine.geom.Matrix();
};
flashimport.SymbolLoader = function(fileApi,doc,srcLibDir,library,fonts,log) {
	this.morphingNotSupported = new Array();
	this.fontMap = new haxe.ds.StringMap();
	this.fileApi = fileApi;
	this.doc = doc;
	this.srcLibDir = srcLibDir;
	this.library = library;
	if(log != null) this.log = log; else this.log = function(v) {
	};
	this.fontConvertor = new flashimport.FontConvertor(fonts);
};
flashimport.SymbolLoader.__name__ = ["flashimport","SymbolLoader"];
flashimport.SymbolLoader.prototype = {
	loadFromLibrary: function(namePath) {
		if(!this.library.hasItem(namePath)) {
			var filePath = this.srcLibDir + "/" + namePath + ".xml";
			if(this.fileApi.exists(filePath)) this.loadFromXml(namePath,new htmlparser.XmlDocument(this.fileApi.getContent(filePath))); else this.library.addItem(this.loadBitmap(namePath));
		}
		return this.library.getItem(namePath);
	}
	,loadFromXml: function(namePath,src) {
		if(this.library.hasItem(namePath)) return js.Boot.__cast(this.library.getItem(namePath) , nanofl.engine.libraryitems.MovieClipItem);
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
			r.addLayer(this.loadLayer(layer,namePath));
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
	,loadLayer: function(layer,namePathForLog) {
		var r = new nanofl.engine.Layer(htmlparser.HtmlParserTools.getAttr(layer,"name"),htmlparser.HtmlParserTools.getAttr(layer,"layerType","normal"),htmlparser.HtmlParserTools.getAttr(layer,"visible",true),htmlparser.HtmlParserTools.getAttr(layer,"locked",false),htmlparser.HtmlParserTools.getAttrInt(layer,"parentLayerIndex"));
		var _g = 0;
		var _g1 = layer.find(">frames>DOMFrame");
		while(_g < _g1.length) {
			var frame = _g1[_g];
			++_g;
			r.addKeyFrame(this.loadFrame(frame,namePathForLog));
		}
		return r;
	}
	,loadFrame: function(frame,namePathForLog) {
		return new nanofl.engine.KeyFrame(htmlparser.HtmlParserTools.getAttr(frame,"name",""),stdlib.Std["int"](htmlparser.HtmlParserTools.getAttr(frame,"duration",1)),this.loadMotionTween(frame,namePathForLog),this.loadElements(frame.find(">elements>*"),new nanofl.engine.geom.Matrix()));
	}
	,loadMotionTween: function(frame,namePathForLog) {
		var type = htmlparser.HtmlParserTools.getAttr(frame,"tweenType","none");
		switch(type) {
		case "none":
			return null;
		case "motion":
			return new nanofl.engine.tweens.MotionTween(htmlparser.HtmlParserTools.getAttr(frame,"acceleration",0),this.parseMotionTweenRotate(htmlparser.HtmlParserTools.getAttr(frame,"motionTweenRotate"),htmlparser.HtmlParserTools.getAttr(frame,"motionTweenRotateTimes",1)),htmlparser.HtmlParserTools.getAttr(frame,"motionTweenOrientToPath",false));
		case "shape":
			if(!Lambda.has(this.morphingNotSupported,namePathForLog)) {
				this.morphingNotSupported.push(namePathForLog);
				this.log("WARNING: shape morphing tween is not supported (symbol '" + namePathForLog + "').");
			}
			return null;
		default:
			this.log("WARNING: unknow tween type '" + type + "' (symbol '" + namePathForLog + "').");
			return null;
		}
	}
	,loadElements: function(elements,parentMatrix) {
		var _g2 = this;
		var r = new Array();
		var _g = 0;
		while(_g < elements.length) {
			var element = elements[_g];
			++_g;
			var _g1 = element.name;
			switch(_g1) {
			case "DOMSymbolInstance":case "DOMBitmapInstance":
				var instance = new nanofl.engine.elements.Instance(htmlparser.HtmlParserTools.getAttr(element,"libraryItemName"),htmlparser.HtmlParserTools.getAttr(element,"name",""),this.loadColorEffect(htmlparser.HtmlParserTools.findOne(element,">color>Color")),element.find(">filters>*").map(function(f) {
					return _g2.loadFilter(f);
				}));
				instance.matrix = flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(element,">matrix>Matrix")).prependMatrix(parentMatrix);
				this.loadRegPoint(instance,htmlparser.HtmlParserTools.findOne(element,">transformationPoint>Point"));
				r.push(instance);
				break;
			case "DOMShape":
				if(!htmlparser.HtmlParserTools.getAttr(element,"isDrawingObject",false)) r.push(this.loadShape(element,parentMatrix)); else r.push(new nanofl.engine.elements.GroupElement([this.loadShape(element,parentMatrix)]));
				break;
			case "DOMStaticText":case "DOMDynamicText":case "DOMInputText":
				r.push(this.loadText(element,parentMatrix));
				break;
			case "DOMGroup":
				var elements1 = element.find(">members>*");
				if(elements1.length > 0) {
					var m = flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(element,">matrix>Matrix"));
					var group = new nanofl.engine.elements.GroupElement(this.loadElements(elements1,m.clone().invert().prependMatrix(parentMatrix)));
					group.matrix = m;
					r.push(group);
				}
				break;
			default:
				this.log("WARNING: unknow element node: '" + element.name + "'.");
			}
		}
		return r;
	}
	,loadShape: function(element,parentMatrix) {
		var _g = this;
		var strokes = element.find(">strokes>StrokeStyle>*").map(function(stroke) {
			return _g.loadShapeStroke(stroke);
		});
		var fills = element.find(">fills>FillStyle>*").map(function(fill) {
			return _g.loadShapeFill(fill);
		});
		var contours = [];
		var _g1 = 0;
		var _g11 = element.find(">edges>Edge");
		while(_g1 < _g11.length) {
			var edge = _g11[_g1];
			++_g1;
			var contour = new flashimport.ContourParser(edge);
			if((contour.fillStyle0 != null || contour.fillStyle1 != null || contour.strokeStyle != null) && contour.drawOps.length > 0) contours.push(contour);
		}
		var contoursExporter = new flashimport.ContoursExporter(strokes,fills);
		new flashimport.ContoursParser(contours).parse(contoursExporter);
		var p = contoursExporter["export"]();
		var shape = new nanofl.engine.elements.ShapeElement(p.edges,p.polygons);
		shape.matrix = flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(element,">matrix>Matrix")).prependMatrix(parentMatrix);
		this.loadRegPoint(shape,htmlparser.HtmlParserTools.findOne(element,">transformationPoint>Point"));
		shape.ensureNoTransform();
		return shape;
	}
	,loadShapeFill: function(fill) {
		var _g = fill.name;
		switch(_g) {
		case "SolidColor":
			return new nanofl.engine.fills.SolidFill(nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(fill,"color","#000000"),htmlparser.HtmlParserTools.getAttr(fill,"alpha",1.0)));
		case "LinearGradient":
			var gradients = fill.find(">GradientEntry");
			return new nanofl.engine.fills.LinearFill(gradients.map(function(g) {
				return nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(g,"color"),htmlparser.HtmlParserTools.getAttr(g,"alpha",1.0));
			}),gradients.map(function(g1) {
				return htmlparser.HtmlParserTools.getAttr(g1,"ratio");
			}),flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(fill,">matrix>Matrix"),0.001220703125));
		case "RadialGradient":
			var gradients1 = fill.find(">GradientEntry");
			return new nanofl.engine.fills.RadialFill(gradients1.map(function(g2) {
				return nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(g2,"color"),htmlparser.HtmlParserTools.getAttr(g2,"alpha",1.0));
			}),gradients1.map(function(g3) {
				return htmlparser.HtmlParserTools.getAttr(g3,"ratio");
			}),flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(fill,">matrix>Matrix"),0.001220703125));
		case "BitmapFill":
			return new nanofl.engine.fills.BitmapFill(htmlparser.HtmlParserTools.getAttr(fill,"bitmapPath"),flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(fill,">matrix>Matrix"),20),htmlparser.HtmlParserTools.getAttr(fill,"bitmapIsClipped",true)?"no-repeat":"repeat");
		default:
			this.log("WARNING: unknow fill type '" + fill.name + "'.");
			return new nanofl.engine.fills.SolidFill("#FFFFFF");
		}
	}
	,loadShapeStroke: function(stroke) {
		var isHairline = htmlparser.HtmlParserTools.getAttr(stroke,"solidStyle") == "hairline";
		var colorElem = htmlparser.HtmlParserTools.findOne(stroke,">fill>SolidColor");
		var _g = stroke.name;
		switch(_g) {
		case "SolidStroke":
			return new nanofl.engine.strokes.SolidStroke(nanofl.engine.ColorTools.colorToString(htmlparser.HtmlParserTools.getAttr(colorElem,"color","#000000"),htmlparser.HtmlParserTools.getAttr(colorElem,"alpha",1.0)),!isHairline?htmlparser.HtmlParserTools.getAttr(stroke,"weight",1.0):1.0,htmlparser.HtmlParserTools.getAttr(stroke,"caps","round"),htmlparser.HtmlParserTools.getAttr(stroke,"joins","round"),htmlparser.HtmlParserTools.getAttr(stroke,"miterLimit",3.0),isHairline);
		default:
			this.log("WARNING: unknow stroke type '" + stroke.name + "'.");
			return new nanofl.engine.strokes.SolidStroke("#000000");
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
		r.matrix = flashimport.MatrixParser.load(htmlparser.HtmlParserTools.findOne(text,">matrix>Matrix"),1.0,-2 + htmlparser.HtmlParserTools.getAttr(text,"left",0.0),-2).prependMatrix(parentMatrix);
		this.loadRegPoint(r,htmlparser.HtmlParserTools.findOne(text,">transformationPoint>Point"));
		return r;
	}
	,loadTextRun: function(textRun) {
		var textAttrs = htmlparser.HtmlParserTools.findOne(textRun,">textAttrs>DOMTextAttrs");
		var face = htmlparser.HtmlParserTools.getAttr(textAttrs,"face");
		if(!this.fontMap.exists(face)) {
			var font = this.fontConvertor.convert(face);
			this.fontMap.set(face,font);
			this.log("FONT MAP: " + face + " -> " + font.face + " / " + (font.style != ""?font.style:"regular"));
		}
		var font1 = this.fontMap.get(face);
		return nanofl.TextRun.create(StringTools.replace(stdlib.Utf8.htmlUnescape(htmlparser.HtmlParserTools.findOne(textRun,">characters").innerHTML),"\r","\n"),htmlparser.HtmlParserTools.getAttr(textAttrs,"fillColor","#000000"),font1.face,font1.style,htmlparser.HtmlParserTools.getAttrFloat(textAttrs,"size",12.0),htmlparser.HtmlParserTools.getAttr(textAttrs,"alignment","left"),0,"#000000",htmlparser.HtmlParserTools.getAttrBool(textAttrs,"autoKern",false),htmlparser.HtmlParserTools.getAttrFloat(textAttrs,"letterSpacing",0),htmlparser.HtmlParserTools.getAttrFloat(textAttrs,"lineSpacing",2));
	}
	,loadColorEffect: function(color) {
		if(color == null) return null;
		if(color.hasAttribute("brightness")) return new nanofl.engine.coloreffects.ColorEffectBrightness(htmlparser.HtmlParserTools.getAttr(color,"brightness",1.0));
		if(color.hasAttribute("tintMultiplier")) return new nanofl.engine.coloreffects.ColorEffectTint(htmlparser.HtmlParserTools.getAttr(color,"tintColor"),htmlparser.HtmlParserTools.getAttr(color,"tintMultiplier",1.0));
		var props = ["alphaMultiplier","redMultiplier","greenMultiplier","blueMultiplier","alphaOffset","redOffset","greenOffset","blueOffset"];
		var attrs = stdlib.Std.array((function($this) {
			var $r;
			var this1 = color.getAttributesAssoc();
			$r = this1.keys();
			return $r;
		}(this)));
		var propCount = Lambda.count(attrs,function(s) {
			return Lambda.has(props,s);
		});
		if(color.hasAttribute("alphaMultiplier") && propCount == 1) return new nanofl.engine.coloreffects.ColorEffectAlpha(htmlparser.HtmlParserTools.getAttr(color,"alphaMultiplier",1.0)); else if(propCount > 0) return new nanofl.engine.coloreffects.ColorEffectAdvanced(htmlparser.HtmlParserTools.getAttr(color,"alphaMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"redMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"greenMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"blueMultiplier",1.0),htmlparser.HtmlParserTools.getAttr(color,"alphaOffset",0.0),htmlparser.HtmlParserTools.getAttr(color,"redOffset",0.0),htmlparser.HtmlParserTools.getAttr(color,"greenOffset",0.0),htmlparser.HtmlParserTools.getAttr(color,"blueOffset",0.0));
		return null;
	}
	,loadFilter: function(filter) {
		if(filter == null) return null;
		var params = filter.getAttributesObject();
		if(Object.prototype.hasOwnProperty.call(params,"strength")) Reflect.setField(params,"strength",Math.round(stdlib.Std.parseFloat(Reflect.field(params,"strength")) * 100));
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
				this.log("WARNING: linkage identifier is not supported (symbol '" + item.namePath + "')");
				if(item.linkedClass == "") item.linkedClass = linkageIdentifier;
			}
		}
	}
	,__class__: flashimport.SymbolLoader
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Utf8 = function(size) {
	this.__b = "";
};
haxe.Utf8.__name__ = ["haxe","Utf8"];
haxe.Utf8.iter = function(s,chars) {
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars(HxOverrides.cca(s,i));
	}
};
haxe.Utf8.encode = function(s) {
	throw "Not implemented";
	return s;
};
haxe.Utf8.decode = function(s) {
	throw "Not implemented";
	return s;
};
haxe.Utf8.compare = function(a,b) {
	if(a > b) return 1; else if(a == b) return 0; else return -1;
};
haxe.Utf8.prototype = {
	addChar: function(c) {
		this.__b += String.fromCharCode(c);
	}
	,__class__: haxe.Utf8
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Path = function(path) {
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
haxe.io.Path.__name__ = ["haxe","io","Path"];
haxe.io.Path.withoutExtension = function(path) {
	var s = new haxe.io.Path(path);
	s.ext = null;
	return s.toString();
};
haxe.io.Path.directory = function(path) {
	var s = new haxe.io.Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe.io.Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe.io.Path
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
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
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
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
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var stdlib = {};
stdlib.Debug = function() { };
stdlib.Debug.__name__ = ["stdlib","Debug"];
stdlib.Debug.getDump = function(v,limit,level,prefix) {
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
				_g2 = js.Boot.__cast(v , Array);
				while(_g1 < _g2.length) {
					var item = _g2[_g1];
					++_g1;
					s += prefix + stdlib.Debug.getDump(item,limit,level + 1,prefix);
				}
			} else if(c == List) {
				s = "LIST(" + Lambda.count(v) + ")\n";
				var $it0 = (js.Boot.__cast(v , List)).iterator();
				while( $it0.hasNext() ) {
					var item1 = $it0.next();
					s += prefix + stdlib.Debug.getDump(item1,limit,level + 1,prefix);
				}
			} else if(c == haxe.ds.StringMap) {
				s = "StringMap\n";
				var map;
				map = js.Boot.__cast(v , haxe.ds.StringMap);
				var $it1 = map.keys();
				while( $it1.hasNext() ) {
					var key = $it1.next();
					s += prefix + key + " => " + stdlib.Debug.getDump(map.get(key),limit,level + 1,prefix);
				}
			} else s = "CLASS(" + Type.getClassName(c) + ")\n" + stdlib.Debug.getObjectDump(v,limit,level + 1,prefix);
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
			s = "OBJECT" + "\n" + stdlib.Debug.getObjectDump(v,limit,level + 1,prefix);
			break;
		case 5:case 8:
			s = "FUNCTION OR UNKNOW\n";
			break;
		}
	}
	return s;
};
stdlib.Debug.getObjectDump = function(obj,limit,level,prefix) {
	var s = "";
	var _g = 0;
	var _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		s += prefix + fieldName + " : " + stdlib.Debug.getDump(Reflect.field(obj,fieldName),limit,level,prefix);
	}
	return s;
};
stdlib.Debug.assert = function(e,message,pos) {
};
stdlib.Debug.traceStack = function(v,pos) {
};
stdlib.Std = function() { };
stdlib.Std.__name__ = ["stdlib","Std"];
stdlib.Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
stdlib.Std.string = function(s) {
	return Std.string(s);
};
stdlib.Std["int"] = function(x) {
	return x | 0;
};
stdlib.Std.parseInt = function(x,defaultValue) {
	if(x != null) {
		if(new EReg("^\\s*[+-]?\\s*((?:0x[0-9a-fA-F]{1,7})|(?:\\d{1,9}))\\s*$","").match(x)) return Std.parseInt(x); else return defaultValue;
	} else return defaultValue;
};
stdlib.Std.parseFloat = function(x,defaultValue) {
	if(x != null) {
		if(new EReg("^\\s*[+-]?\\s*\\d{1,9}(?:[.]\\d+)?(?:e[+-]?\\d{1,9})?\\s*$","").match(x)) return Std.parseFloat(x); else return defaultValue;
	} else return defaultValue;
};
stdlib.Std.random = function(x) {
	return Std.random(x);
};
stdlib.Std.bool = function(v) {
	return v != false && v != null && v != 0 && v != "" && v != "0" && (!(typeof(v) == "string") || (js.Boot.__cast(v , String)).toLowerCase() != "false" && (js.Boot.__cast(v , String)).toLowerCase() != "off" && (js.Boot.__cast(v , String)).toLowerCase() != "null");
};
stdlib.Std.parseValue = function(x) {
	var value = x;
	var valueLC;
	if(value != null) valueLC = value.toLowerCase(); else valueLC = null;
	var parsedValue;
	if(valueLC == "true") value = true; else if(valueLC == "false") value = false; else if(valueLC == "null") value = null; else if((parsedValue = stdlib.Std.parseInt(value)) != null) value = parsedValue; else if((parsedValue = stdlib.Std.parseFloat(value)) != null) value = parsedValue;
	return value;
};
stdlib.Std.hash = function(obj) {
	var r = new haxe.ds.StringMap();
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
stdlib.Std.min = function(a,b) {
	if(a < b) return a; else return b;
};
stdlib.Std.max = function(a,b) {
	if(a > b) return a; else return b;
};
stdlib.Std.sign = function(n) {
	if(n > 0) return 1; else if(n < 0) return -1; else return 0;
};
stdlib.Std.array = function(it) {
	var r = new Array();
	while( it.hasNext() ) {
		var e = it.next();
		r.push(e);
	}
	return r;
};
stdlib.StringTools = function() { };
stdlib.StringTools.__name__ = ["stdlib","StringTools"];
stdlib.StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
stdlib.StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
stdlib.StringTools.htmlEscape = function(s) {
	return StringTools.replace(StringTools.htmlEscape(s),"\n","&#xA;");
};
stdlib.StringTools.htmlUnescape = function(s) {
	return StringTools.htmlUnescape(StringTools.replace(s,"&#xA;","\n"));
};
stdlib.StringTools.startsWith = function(s,start) {
	return StringTools.startsWith(s,start);
};
stdlib.StringTools.endsWith = function(s,end) {
	return StringTools.endsWith(s,end);
};
stdlib.StringTools.isSpace = function(s,pos) {
	return StringTools.isSpace(s,pos);
};
stdlib.StringTools.ltrim = function(s,chars) {
	if(chars == null) return StringTools.ltrim(s);
	while(s.length > 0 && chars.indexOf(HxOverrides.substr(s,0,1)) >= 0) s = HxOverrides.substr(s,1,null);
	return s;
};
stdlib.StringTools.rtrim = function(s,chars) {
	if(chars == null) return StringTools.rtrim(s);
	while(s.length > 0 && chars.indexOf(HxOverrides.substr(s,s.length - 1,1)) >= 0) s = HxOverrides.substr(s,0,s.length - 1);
	return s;
};
stdlib.StringTools.trim = function(s,chars) {
	if(chars == null) return StringTools.trim(s);
	return stdlib.StringTools.rtrim(stdlib.StringTools.ltrim(s,chars),chars);
};
stdlib.StringTools.rpad = function(s,c,l) {
	return StringTools.rpad(s,c,l);
};
stdlib.StringTools.lpad = function(s,c,l) {
	return StringTools.lpad(s,c,l);
};
stdlib.StringTools.replace = function(s,sub,by) {
	return StringTools.replace(s,sub,by);
};
stdlib.StringTools.hex = function(n,digits) {
	return StringTools.hex(n,digits);
};
stdlib.StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
stdlib.StringTools.isEOF = function(c) {
	return c != c;
};
stdlib.StringTools.hexdec = function(s) {
	return stdlib.Std.parseInt("0x" + s);
};
stdlib.StringTools.addcslashes = function(s) {
	return new EReg("['\"\t\r\n\\\\]","g").map(s,function(re) {
		return "\\" + re.matched(0);
	});
};
stdlib.StringTools.stripTags = function(str,allowedTags) {
	if(allowedTags == null) allowedTags = "";
	var allowedTagsArray = [];
	if(allowedTags != "") {
		var re = new EReg("[a-zA-Z0-9]+","i");
		var pos = 0;
		while(re.matchSub(allowedTags,pos)) {
			allowedTagsArray.push(re.matched(0));
			pos = re.matchedPos().pos + re.matchedPos().len;
		}
	}
	var matches = [];
	var re1 = new EReg("</?[\\S][^>]*>","g");
	str = re1.map(str,function(_) {
		var html = re1.matched(0);
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
stdlib.StringTools.regexEscape = function(s) {
	return new EReg("([\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|])","g").replace(s,"\\$1");
};
stdlib.StringTools.jsonEscape = function(s) {
	if(s == null) return "null";
	var r = new stdlib.Utf8(s.length + (s.length / 5 | 0));
	r.__b += "\"";
	haxe.Utf8.iter(s,function(c) {
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
stdlib.StringTools.isEmpty = function(s) {
	return s == null || s == "";
};
stdlib.StringTools.capitalize = function(s) {
	if(stdlib.StringTools.isEmpty(s)) return s; else return HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,null);
};
stdlib.Utf8 = function(size) {
	haxe.Utf8.call(this,size);
};
stdlib.Utf8.__name__ = ["stdlib","Utf8"];
stdlib.Utf8.iter = function(s,chars) {
	haxe.Utf8.iter(s,chars);
};
stdlib.Utf8.encode = function(s) {
	return haxe.Utf8.encode(s);
};
stdlib.Utf8.decode = function(s) {
	return haxe.Utf8.decode(s);
};
stdlib.Utf8.charCodeAt = function(s,index) {
	return HxOverrides.cca(s,index);
};
stdlib.Utf8.validate = function(s) {
	return true;
};
stdlib.Utf8.$length = function(s) {
	return s.length;
};
stdlib.Utf8.compare = function(a,b) {
	return haxe.Utf8.compare(a,b);
};
stdlib.Utf8.sub = function(s,pos,len) {
	return HxOverrides.substr(s,pos,len);
};
stdlib.Utf8.replace = function(s,from,to) {
	var codes = [];
	haxe.Utf8.iter(s,function(c) {
		codes.push(c);
	});
	var r = new stdlib.Utf8();
	var len = from.length;
	if(codes.length < len) return s;
	var _g1 = 0;
	var _g = codes.length - len + 1;
	while(_g1 < _g) {
		var i = [_g1++];
		var found = [true];
		var j = [0];
		haxe.Utf8.iter(from,(function(j,found,i) {
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
stdlib.Utf8.compactSpaces = function(s) {
	var r = new stdlib.Utf8();
	var prevSpace = false;
	haxe.Utf8.iter(s,function(c) {
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
stdlib.Utf8.htmlUnescape = function(s) {
	var r = new stdlib.Utf8();
	var $escape = null;
	haxe.Utf8.iter(s,function(c) {
		if($escape != null) {
			if(c == 59) {
				var chr = stdlib.Utf8.htmlUnescapeChar($escape);
				if(chr != null) r.__b += String.fromCharCode(chr);
				$escape = null;
			} else $escape += String.fromCharCode(c);
		} else if(c == 38) $escape = ""; else r.__b += String.fromCharCode(c);
	});
	return r.__b;
};
stdlib.Utf8.htmlEscape = function(utf8Str,chars) {
	if(chars == null) chars = "";
	chars = "&<>" + chars;
	var r = new stdlib.Utf8();
	haxe.Utf8.iter(utf8Str,function(c) {
		var s;
		var this1 = stdlib.Utf8.get_htmlEscapeMap();
		s = this1.get(c);
		if(s != null && c >= 0 && c <= 255 && chars.indexOf(String.fromCharCode(c)) >= 0) r.addString(s); else r.__b += String.fromCharCode(c);
	});
	return r.__b;
};
stdlib.Utf8.htmlUnescapeChar = function(escape) {
	if(StringTools.startsWith(escape,"#x")) return stdlib.Std.parseInt("0x" + HxOverrides.substr(escape,2,null)); else if(StringTools.startsWith(escape,"#")) return stdlib.Std.parseInt(HxOverrides.substr(escape,1,null)); else {
		var r;
		var this1 = stdlib.Utf8.get_htmlUnescapeMap();
		r = this1.get(escape);
		if(r != null) return r;
	}
	console.log("Unknow escape sequence: " + escape);
	return null;
};
stdlib.Utf8.get_htmlEscapeMap = function() {
	if(stdlib.Utf8.htmlEscapeMap == null) {
		var _g = new haxe.ds.IntMap();
		_g.set(32,"&nbsp;");
		_g.set(38,"&amp;");
		_g.set(60,"&lt;");
		_g.set(62,"&gt;");
		_g.set(34,"&quot;");
		_g.set(39,"&#39;");
		_g.set(13,"&#xD;");
		_g.set(10,"&#xA;");
		stdlib.Utf8.htmlEscapeMap = _g;
	}
	return stdlib.Utf8.htmlEscapeMap;
};
stdlib.Utf8.get_htmlUnescapeMap = function() {
	if(stdlib.Utf8.htmlUnescapeMap == null) {
		var _g = new haxe.ds.StringMap();
		_g.set("nbsp",32);
		_g.set("amp",38);
		_g.set("lt",60);
		_g.set("gt",62);
		_g.set("quot",34);
		_g.set("euro",8364);
		_g.set("iexcl",161);
		_g.set("cent",162);
		_g.set("pound",163);
		_g.set("curren",164);
		_g.set("yen",165);
		_g.set("brvbar",166);
		_g.set("sect",167);
		_g.set("uml",168);
		_g.set("copy",169);
		_g.set("ordf",170);
		_g.set("not",172);
		_g.set("shy",173);
		_g.set("reg",174);
		_g.set("macr",175);
		_g.set("deg",176);
		_g.set("plusmn",177);
		_g.set("sup2",178);
		_g.set("sup3",179);
		_g.set("acute",180);
		_g.set("micro",181);
		_g.set("para",182);
		_g.set("middot",183);
		_g.set("cedil",184);
		_g.set("sup1",185);
		_g.set("ordm",186);
		_g.set("raquo",187);
		_g.set("frac14",188);
		_g.set("frac12",189);
		_g.set("frac34",190);
		_g.set("iquest",191);
		_g.set("Agrave",192);
		_g.set("Aacute",193);
		_g.set("Acirc",194);
		_g.set("Atilde",195);
		_g.set("Auml",196);
		_g.set("Aring",197);
		_g.set("AElig",198);
		_g.set("Ccedil",199);
		_g.set("Egrave",200);
		_g.set("Eacute",201);
		_g.set("Ecirc",202);
		_g.set("Euml",203);
		_g.set("Igrave",204);
		_g.set("Iacute",205);
		_g.set("Icirc",206);
		_g.set("Iuml",207);
		_g.set("ETH",208);
		_g.set("Ntilde",209);
		_g.set("Ograve",210);
		_g.set("Oacute",211);
		_g.set("Ocirc",212);
		_g.set("Otilde",213);
		_g.set("Ouml",214);
		_g.set("times",215);
		_g.set("Oslash",216);
		_g.set("Ugrave",217);
		_g.set("Uacute",218);
		_g.set("Ucirc",219);
		_g.set("Uuml",220);
		_g.set("Yacute",221);
		_g.set("THORN",222);
		_g.set("szlig",223);
		_g.set("agrave",224);
		_g.set("aacute",225);
		_g.set("acirc",226);
		_g.set("atilde",227);
		_g.set("auml",228);
		_g.set("aring",229);
		_g.set("aelig",230);
		_g.set("ccedil",231);
		_g.set("egrave",232);
		_g.set("eacute",233);
		_g.set("ecirc",234);
		_g.set("euml",235);
		_g.set("igrave",236);
		_g.set("iacute",237);
		_g.set("icirc",238);
		_g.set("iuml",239);
		_g.set("eth",240);
		_g.set("ntilde",241);
		_g.set("ograve",242);
		_g.set("oacute",243);
		_g.set("ocirc",244);
		_g.set("otilde",245);
		_g.set("ouml",246);
		_g.set("divide",247);
		_g.set("oslash",248);
		_g.set("ugrave",249);
		_g.set("uacute",250);
		_g.set("ucirc",251);
		_g.set("uuml",252);
		_g.set("yacute",253);
		_g.set("thorn",254);
		stdlib.Utf8.htmlUnescapeMap = _g;
	}
	return stdlib.Utf8.htmlUnescapeMap;
};
stdlib.Utf8.__super__ = haxe.Utf8;
stdlib.Utf8.prototype = $extend(haxe.Utf8.prototype,{
	addString: function(s) {
		var _g = this;
		haxe.Utf8.iter(s,function(c) {
			_g.__b += String.fromCharCode(c);
		});
	}
	,__class__: stdlib.Utf8
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
FlashXflImporterPlugin.embeddedIcon = "\r\niVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAAB\r\n7klEQVQoz2WQu2pUURSGv305l7mAJiliJARyURAxhShYiUVALGKjhW/gA1j7DBY21oKQykYLEUHQ\r\n2sJKJdEiRGOwmIRk5pyZs9daFhOSGIt/rerjv7jV1VUWivaNJ7PzH5NpnWWFI0TADHNZP6bNR1vr\r\nd3/1+l+Dd1HUEoA/PLlTiyqpg/OHCl2CzzqSXXh67/rr89PdBVFL3rlwBCoGoaDIOqCACJiCw9Mf\r\nSjY3ufjs8e130xPtJTUT55wfgwYkAdHxH6Rj+RB219blz4vv8w8X5t6UIUybmXoAM6NJwmgkEBTu\r\nt+BBG656uJVztvFhais113bLxeV2d+U4qhmVCFUjSFCYAN4ewGYDs+OdfBk9eSQzjjsaUCUZw3WC\r\nXg2XDbIE2zUmCk2CJo1rAfHIMQmqkItCr2bvvdAqPfmSMEyAekqnqNlJEAZJMCDUnslvI3b7MBgq\r\nM5tA8AxGSulAToKGMUiC80ZTeXqfA+3ckcSx8ckooxC8Y5Dc/46VKE4hOMGlimbkCEBR5JjL8aJk\r\n5v51VIxKBQfEGJhZvkIMgfaZLnsbP9j/vUNeFMQkp6IaDFXx3lPVfW7eWSFkgYPtHcrJKb68fEWK\r\nSnR2uiM6NENTIyEU7sPzNVrdDvs/tzl36SKjdouqqoUshmSmAH8B3SIVwuWULP8AAAAASUVORK5C\r\nYII=\r\n";
FlashXflImporterPlugin.IMPORT_MEDIA_SCRIPT_TEMPLATE = "(function () { \"use strict\";\nvar FlashMediaImporter = function() { };\nFlashMediaImporter.__name__ = true;\nFlashMediaImporter.main = function() {\n\tvar srcFilePath = \"file:///\" + StringTools.replace(FlashMediaImporter.SRC_FILE,\"\\\\\",\"/\");\n\tvar destLibraryDir = \"file:///\" + haxe.io.Path.addTrailingSlash(StringTools.replace(FlashMediaImporter.DEST_DIR,\"\\\\\",\"/\")) + \"library\";\n\tFlashMediaImporter.log(\"Import media from '\" + srcFilePath + \"' to '\" + destLibraryDir + \"' directory:\");\n\tvar doc = fl.openDocument(srcFilePath);\n\tfl.setActiveWindow(doc);\n\tFLfile.createFolder(destLibraryDir);\n\tvar _g1 = 0;\n\tvar _g = fl.getDocumentDOM().library.items.length;\n\twhile(_g1 < _g) {\n\t\tvar i = _g1++;\n\t\tvar item = fl.getDocumentDOM().library.items[i];\n\t\tif(item != null) {\n\t\t\tvar _g2 = item.itemType;\n\t\t\tswitch(_g2) {\n\t\t\tcase \"bitmap\":\n\t\t\t\tFlashMediaImporter.log(\"  Import: \" + item.name + \" / \" + item.itemType + \" / \" + item.originalCompressionType);\n\t\t\t\tFlashMediaImporter.importBitmap(destLibraryDir,item);\n\t\t\t\tbreak;\n\t\t\tcase \"movie clip\":case \"graphic\":case \"button\":case \"folder\":\n\t\t\t\tbreak;\n\t\t\tcase \"sound\":\n\t\t\t\tFlashMediaImporter.log(\"  Import: \" + item.name + \" / \" + item.itemType + \" / \" + item.originalCompressionType);\n\t\t\t\tFlashMediaImporter.importSound(destLibraryDir,item);\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\tFlashMediaImporter.log(\"    Skip: \" + item.name + \" / \" + item.itemType);\n\t\t\t}\n\t\t}\n\t}\n\tdoc.close(false);\n\tFlashMediaImporter.log(\"Done.\");\n\tFLfile.write(\"file:///\" + StringTools.replace(FlashMediaImporter.DEST_DIR,\"\\\\\",\"/\") + \"/.done-import-media\",\"\");\n};\nFlashMediaImporter.importBitmap = function(destLibraryDir,item) {\n\tvar savePath = destLibraryDir + \"/\" + item.name + \".png\";\n\tif(!FLfile.exists(savePath)) {\n\t\tFLfile.createFolder(haxe.io.Path.directory(savePath));\n\t\titem.exportToFile(savePath);\n\t}\n\treturn true;\n};\nFlashMediaImporter.importSound = function(destLibraryDir,item) {\n\tvar savePath;\n\tsavePath = destLibraryDir + \"/\" + haxe.io.Path.withoutExtension(item.name) + (item.originalCompressionType == \"RAW\"?\".wav\":\".mp3\");\n\tif(!FLfile.exists(savePath)) {\n\t\tFLfile.createFolder(haxe.io.Path.directory(savePath));\n\t\titem.exportToFile(savePath);\n\t}\n\treturn true;\n};\nFlashMediaImporter.log = function(s) {\n\tfl.trace(s);\n};\nvar HxOverrides = function() { };\nHxOverrides.__name__ = true;\nHxOverrides.substr = function(s,pos,len) {\n\tif(pos != null && pos != 0 && len != null && len < 0) return \"\";\n\tif(len == null) len = s.length;\n\tif(pos < 0) {\n\t\tpos = s.length + pos;\n\t\tif(pos < 0) pos = 0;\n\t} else if(len < 0) len = s.length + len - pos;\n\treturn s.substr(pos,len);\n};\nvar StringTools = function() { };\nStringTools.__name__ = true;\nStringTools.replace = function(s,sub,by) {\n\treturn s.split(sub).join(by);\n};\nvar haxe = {};\nhaxe.Log = function() { };\nhaxe.Log.__name__ = true;\nhaxe.Log.trace = function(v,infos) {\n\tjs.Boot.__trace(v,infos);\n};\nhaxe.io = {};\nhaxe.io.Path = function(path) {\n\tvar c1 = path.lastIndexOf(\"/\");\n\tvar c2 = path.lastIndexOf(\"\\\\\");\n\tif(c1 < c2) {\n\t\tthis.dir = HxOverrides.substr(path,0,c2);\n\t\tpath = HxOverrides.substr(path,c2 + 1,null);\n\t\tthis.backslash = true;\n\t} else if(c2 < c1) {\n\t\tthis.dir = HxOverrides.substr(path,0,c1);\n\t\tpath = HxOverrides.substr(path,c1 + 1,null);\n\t} else this.dir = null;\n\tvar cp = path.lastIndexOf(\".\");\n\tif(cp != -1) {\n\t\tthis.ext = HxOverrides.substr(path,cp + 1,null);\n\t\tthis.file = HxOverrides.substr(path,0,cp);\n\t} else {\n\t\tthis.ext = null;\n\t\tthis.file = path;\n\t}\n};\nhaxe.io.Path.__name__ = true;\nhaxe.io.Path.withoutExtension = function(path) {\n\tvar s = new haxe.io.Path(path);\n\ts.ext = null;\n\treturn s.toString();\n};\nhaxe.io.Path.directory = function(path) {\n\tvar s = new haxe.io.Path(path);\n\tif(s.dir == null) return \"\";\n\treturn s.dir;\n};\nhaxe.io.Path.addTrailingSlash = function(path) {\n\tif(path.length == 0) return \"/\";\n\tvar c1 = path.lastIndexOf(\"/\");\n\tvar c2 = path.lastIndexOf(\"\\\\\");\n\tif(c1 < c2) {\n\t\tif(c2 != path.length - 1) return path + \"\\\\\"; else return path;\n\t} else if(c1 != path.length - 1) return path + \"/\"; else return path;\n};\nhaxe.io.Path.prototype = {\n\ttoString: function() {\n\t\treturn (this.dir == null?\"\":this.dir + (this.backslash?\"\\\\\":\"/\")) + this.file + (this.ext == null?\"\":\".\" + this.ext);\n\t}\n};\nvar js = {};\njs.Boot = function() { };\njs.Boot.__name__ = true;\njs.Boot.__trace = function(v,i) {\n\tvar msg;\n\tif(i != null) msg = i.fileName + \":\" + i.lineNumber + \": \"; else msg = \"\";\n\tmsg += js.Boot.__string_rec(v,\"\");\n\tfl.trace(msg);\n};\njs.Boot.__string_rec = function(o,s) {\n\tif(o == null) return \"null\";\n\tif(s.length >= 5) return \"<...>\";\n\tvar t = typeof(o);\n\tif(t == \"function\" && (o.__name__ || o.__ename__)) t = \"object\";\n\tswitch(t) {\n\tcase \"object\":\n\t\tif(o instanceof Array) {\n\t\t\tif(o.__enum__) {\n\t\t\t\tif(o.length == 2) return o[0];\n\t\t\t\tvar str = o[0] + \"(\";\n\t\t\t\ts += \"\\t\";\n\t\t\t\tvar _g1 = 2;\n\t\t\t\tvar _g = o.length;\n\t\t\t\twhile(_g1 < _g) {\n\t\t\t\t\tvar i = _g1++;\n\t\t\t\t\tif(i != 2) str += \",\" + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);\n\t\t\t\t}\n\t\t\t\treturn str + \")\";\n\t\t\t}\n\t\t\tvar l = o.length;\n\t\t\tvar i1;\n\t\t\tvar str1 = \"[\";\n\t\t\ts += \"\\t\";\n\t\t\tvar _g2 = 0;\n\t\t\twhile(_g2 < l) {\n\t\t\t\tvar i2 = _g2++;\n\t\t\t\tstr1 += (i2 > 0?\",\":\"\") + js.Boot.__string_rec(o[i2],s);\n\t\t\t}\n\t\t\tstr1 += \"]\";\n\t\t\treturn str1;\n\t\t}\n\t\tvar tostr;\n\t\ttry {\n\t\t\ttostr = o.toString;\n\t\t} catch( e ) {\n\t\t\treturn \"???\";\n\t\t}\n\t\tif(tostr != null && tostr != Object.toString) {\n\t\t\tvar s2 = o.toString();\n\t\t\tif(s2 != \"[object Object]\") return s2;\n\t\t}\n\t\tvar k = null;\n\t\tvar str2 = \"{\\n\";\n\t\ts += \"\\t\";\n\t\tvar hasp = o.hasOwnProperty != null;\n\t\tfor( var k in o ) {\n\t\tif(hasp && !o.hasOwnProperty(k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tif(k == \"prototype\" || k == \"__class__\" || k == \"__super__\" || k == \"__interfaces__\" || k == \"__properties__\") {\n\t\t\tcontinue;\n\t\t}\n\t\tif(str2.length != 2) str2 += \", \\n\";\n\t\tstr2 += s + k + \" : \" + js.Boot.__string_rec(o[k],s);\n\t\t}\n\t\ts = s.substring(1);\n\t\tstr2 += \"\\n\" + s + \"}\";\n\t\treturn str2;\n\tcase \"function\":\n\t\treturn \"<function>\";\n\tcase \"string\":\n\t\treturn o;\n\tdefault:\n\t\treturn String(o);\n\t}\n};\nString.__name__ = true;\nArray.__name__ = true;\nhaxe.Log.trace = function(v,infos) {\n\tfl.trace(v);\n};\nFlashMediaImporter.SRC_FILE = \"{SRC_FILE}\";\nFlashMediaImporter.DEST_DIR = \"{DEST_DIR}\";\nFlashMediaImporter.TEMP_MC_NAME = \"__temp_fme\";\nFlashMediaImporter.main();\n})();\n";
flashimport.ContoursParser.INT_MAX_VALUE = 2000000000;
flashimport.ContoursParser.FLOAT_MAX_VALUE = 1e10;
FlashXflImporterPlugin.main();
})();
