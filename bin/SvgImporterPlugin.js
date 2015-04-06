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
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
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
	var a = new Array();
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
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
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
IMap.__name__ = true;
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var SvgImporterPlugin = function() {
	this.fileFilterExtensions = ["svg"];
	this.fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	this.menuItemIcon = "url(data:image/png;base64," + StringTools.replace(StringTools.replace(SvgImporterPlugin.embeddedIcon,"\r",""),"\n","") + ")";
	this.menuItemName = "Scalable Vector Graphics (*.svg)";
	this.name = "SvgImporter";
};
SvgImporterPlugin.__name__ = true;
SvgImporterPlugin.__interfaces__ = [nanofl.ide.plugins.IImporterPlugin];
SvgImporterPlugin.main = function() {
	nanofl.engine.Plugins.registerImporter(new SvgImporterPlugin());
};
SvgImporterPlugin.prototype = {
	importDocument: function(fileApi,srcFilePath,destFilePath,documentProperties,library,fonts,callb) {
		var xml = new htmlparser.XmlDocument(fileApi.getContent(srcFilePath));
		var svg = new svgimport.Svg(xml);
		documentProperties.width = Math.round(svg.width);
		documentProperties.height = Math.round(svg.height);
		if(svg.id == "") {
			svg.id = nanofl.engine.Library.SCENE_NAME_PATH;
			var value = svgimport.SvgElement.DisplayGroup(svg);
			svg.elements.set(nanofl.engine.Library.SCENE_NAME_PATH,value);
		}
		var $it0 = svg.elements.iterator();
		while( $it0.hasNext() ) {
			var element = $it0.next();
			switch(element[1]) {
			case 1:
				var group = element[2];
				svgimport.SvgGroupExporter.run(group,library);
				break;
			case 0:
				var path = element[2];
				var libraryItem = path.toLibraryItem();
				if(libraryItem != null) library.addItem(libraryItem);
				break;
			default:
				console.log("ID for item type '" + element[0] + "' is not supported.");
			}
		}
		if(!svg.elements.exists(nanofl.engine.Library.SCENE_NAME_PATH)) {
			var scene = new nanofl.engine.libraryitems.MovieClipItem(nanofl.engine.Library.SCENE_NAME_PATH);
			scene.addLayer(new nanofl.engine.Layer("auto"));
			scene.layers[0].addKeyFrame(new nanofl.engine.KeyFrame());
			scene.layers[0].keyFrames[0].addElement(new nanofl.engine.elements.Instance(svg.id));
			library.addItem(scene);
		}
		callb(true);
	}
	,__class__: SvgImporterPlugin
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
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
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
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
var svgimport = {};
svgimport.FillType = { __ename__ : true, __constructs__ : ["FillNone","FillSolid","FillGrad"] };
svgimport.FillType.FillNone = ["FillNone",0];
svgimport.FillType.FillNone.__enum__ = svgimport.FillType;
svgimport.FillType.FillSolid = function(color) { var $x = ["FillSolid",1,color]; $x.__enum__ = svgimport.FillType; return $x; };
svgimport.FillType.FillGrad = function(gradType) { var $x = ["FillGrad",2,gradType]; $x.__enum__ = svgimport.FillType; return $x; };
svgimport.Rectangle = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
svgimport.Rectangle.__name__ = true;
svgimport.Rectangle.prototype = {
	__class__: svgimport.Rectangle
};
svgimport.SegmentType = { __ename__ : true, __constructs__ : ["MOVE","DRAW","CURVE","CUBIC","ARC"] };
svgimport.SegmentType.MOVE = function(seg) { var $x = ["MOVE",0,seg]; $x.__enum__ = svgimport.SegmentType; return $x; };
svgimport.SegmentType.DRAW = function(seg) { var $x = ["DRAW",1,seg]; $x.__enum__ = svgimport.SegmentType; return $x; };
svgimport.SegmentType.CURVE = function(seg) { var $x = ["CURVE",2,seg]; $x.__enum__ = svgimport.SegmentType; return $x; };
svgimport.SegmentType.CUBIC = function(seg) { var $x = ["CUBIC",3,seg]; $x.__enum__ = svgimport.SegmentType; return $x; };
svgimport.SegmentType.ARC = function(seg) { var $x = ["ARC",4,seg]; $x.__enum__ = svgimport.SegmentType; return $x; };
svgimport.SegmentsParser = function() {
	if(svgimport.SegmentsParser.sCommandArgs == null) {
		svgimport.SegmentsParser.sCommandArgs = [];
		var _g = 0;
		while(_g < 128) {
			var i = _g++;
			svgimport.SegmentsParser.sCommandArgs[i] = this.commandArgs(i);
		}
	}
};
svgimport.SegmentsParser.__name__ = true;
svgimport.SegmentsParser.run = function(pathToParse) {
	return new svgimport.SegmentsParser().parse(pathToParse);
};
svgimport.SegmentsParser.prototype = {
	parse: function(pathToParse) {
		if(pathToParse == null) return [];
		this.lastMoveX = this.lastMoveY = 0;
		var pos = 0;
		var args = new Array();
		var segments = new Array();
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
			if(code > 0 && code < 128) command = svgimport.SegmentsParser.sCommandArgs[code]; else command = svgimport.SegmentsParser.UNKNOWN;
			if(command == svgimport.SegmentsParser.UNKNOWN) throw "failed parsing path near '" + HxOverrides.substr(pathToParse,pos,null) + "'";
			if(command == svgimport.SegmentsParser.SEPARATOR) pos++; else if(command <= svgimport.SegmentsParser.FLOAT) {
				var end = pos + 1;
				var e_pos = -1;
				var seen_dot = command == svgimport.SegmentsParser.FLOAT_DOT;
				if(command == svgimport.SegmentsParser.FLOAT_EXP) {
					e_pos = 0;
					seen_dot = true;
				}
				while(end < pathToParse.length) {
					var ch = HxOverrides.cca(pathToParse,end);
					var code1;
					if(ch < 0 || ch > 127) code1 = svgimport.SegmentsParser.UNKNOWN; else code1 = svgimport.SegmentsParser.sCommandArgs[ch];
					if(code1 > svgimport.SegmentsParser.FLOAT) break;
					if(code1 == svgimport.SegmentsParser.FLOAT_DOT && seen_dot) break;
					if(e_pos >= 0) {
						if(code1 == svgimport.SegmentsParser.FLOAT_SIGN) {
							if(e_pos != 0) break;
						} else if(code1 != svgimport.SegmentsParser.FLOAT) break;
						e_pos++;
					} else if(code1 == svgimport.SegmentsParser.FLOAT_EXP) {
						if(e_pos >= 0) break;
						e_pos = 0;
						seen_dot = true;
					} else if(code1 == svgimport.SegmentsParser.FLOAT_SIGN) break;
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
					if(this.prev == null) throw "Unknown command " + String.fromCharCode(current_command) + " near '" + HxOverrides.substr(pathToParse,current_command_pos,null) + "'";
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
		if(current_command >= 0 && !finished) throw "Unfinished command (" + args.length + "/" + current_args + ") near '" + HxOverrides.substr(pathToParse,current_command_pos,null) + "'";
		return segments;
	}
	,commandArgs: function(code) {
		if(code == 10) return svgimport.SegmentsParser.SEPARATOR;
		var str = String.fromCharCode(code).toUpperCase();
		if(str >= "0" && str <= "9") return svgimport.SegmentsParser.FLOAT;
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
			return svgimport.SegmentsParser.SEPARATOR;
		case "-":
			return svgimport.SegmentsParser.FLOAT_SIGN;
		case "+":
			return svgimport.SegmentsParser.FLOAT_SIGN;
		case "E":case "e":
			return svgimport.SegmentsParser.FLOAT_EXP;
		case ".":
			return svgimport.SegmentsParser.FLOAT_DOT;
		}
		return svgimport.SegmentsParser.UNKNOWN;
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
			return new svgimport.segments.MoveSegment(this.lastMoveX,this.lastMoveY);
		case 109:
			this.lastMoveX = a[0] + this.prevX();
			this.lastMoveY = a[1] + this.prevY();
			return new svgimport.segments.MoveSegment(this.lastMoveX,this.lastMoveY);
		case 76:
			return new svgimport.segments.DrawSegment(a[0],a[1]);
		case 108:
			return new svgimport.segments.DrawSegment(a[0] + this.prevX(),a[1] + this.prevY());
		case 72:
			return new svgimport.segments.DrawSegment(a[0],this.prevY());
		case 104:
			return new svgimport.segments.DrawSegment(a[0] + this.prevX(),this.prevY());
		case 86:
			return new svgimport.segments.DrawSegment(this.prevX(),a[0]);
		case 118:
			return new svgimport.segments.DrawSegment(this.prevX(),a[0] + this.prevY());
		case 67:
			return new svgimport.segments.CubicSegment(a[0],a[1],a[2],a[3],a[4],a[5]);
		case 99:
			var rx = this.prevX();
			var ry = this.prevY();
			return new svgimport.segments.CubicSegment(a[0] + rx,a[1] + ry,a[2] + rx,a[3] + ry,a[4] + rx,a[5] + ry);
		case 83:
			var rx1 = this.prevX();
			var ry1 = this.prevY();
			return new svgimport.segments.CubicSegment(rx1 * 2 - this.prevCX(),ry1 * 2 - this.prevCY(),a[0],a[1],a[2],a[3]);
		case 115:
			var rx2 = this.prevX();
			var ry2 = this.prevY();
			return new svgimport.segments.CubicSegment(rx2 * 2 - this.prevCX(),ry2 * 2 - this.prevCY(),a[0] + rx2,a[1] + ry2,a[2] + rx2,a[3] + ry2);
		case 81:
			return new svgimport.segments.QuadraticSegment(a[0],a[1],a[2],a[3]);
		case 113:
			var rx3 = this.prevX();
			var ry3 = this.prevY();
			return new svgimport.segments.QuadraticSegment(a[0] + rx3,a[1] + ry3,a[2] + rx3,a[3] + ry3);
		case 84:
			var rx4 = this.prevX();
			var ry4 = this.prevY();
			return new svgimport.segments.QuadraticSegment(rx4 * 2 - this.prevCX(),rx4 * 2 - this.prevCY(),a[2],a[3]);
		case 116:
			var rx5 = this.prevX();
			var ry5 = this.prevY();
			return new svgimport.segments.QuadraticSegment(rx5 * 2 - this.prevCX(),ry5 * 2 - this.prevCY(),a[0] + rx5,a[1] + ry5);
		case 65:
			return new svgimport.segments.ArcSegment(this.prevX(),this.prevY(),a[0],a[1],a[2],a[3] != 0.,a[4] != 0.,a[5],a[6]);
		case 97:
			var rx6 = this.prevX();
			var ry6 = this.prevY();
			return new svgimport.segments.ArcSegment(rx6,ry6,a[0],a[1],a[2],a[3] != 0.,a[4] != 0.,a[5] + rx6,a[6] + ry6);
		case 90:case 122:
			return new svgimport.segments.DrawSegment(this.lastMoveX,this.lastMoveY);
		}
		return null;
	}
	,__class__: svgimport.SegmentsParser
};
svgimport.StrokeType = { __ename__ : true, __constructs__ : ["StrokeNone","StrokeSolid","StrokeGrad"] };
svgimport.StrokeType.StrokeNone = ["StrokeNone",0];
svgimport.StrokeType.StrokeNone.__enum__ = svgimport.StrokeType;
svgimport.StrokeType.StrokeSolid = function(color) { var $x = ["StrokeSolid",1,color]; $x.__enum__ = svgimport.StrokeType; return $x; };
svgimport.StrokeType.StrokeGrad = function(gradType) { var $x = ["StrokeGrad",2,gradType]; $x.__enum__ = svgimport.StrokeType; return $x; };
svgimport.SvgGroup = function(node,svgWidth,styles,elements,gradients,id) {
	this.children = new Array();
	this.svgWidth = svgWidth;
	this.node = node;
	this.elements = elements;
	this.gradients = gradients;
	if(id != null) this.id = id; else this.id = htmlparser.HtmlParserTools.getAttr(node,"id","");
	if(this.id != "") {
		var value = svgimport.SvgElement.DisplayGroup(this);
		elements.set(this.id,value);
	}
	this.name = htmlparser.HtmlParserTools.getAttr(node,"inkscape:label",this.id);
	this.matrix = svgimport.Transform.load(node.getAttribute("transform"));
	this.visible = node.getAttribute("display") != "none";
	this.loadChildren(node,svgimport.XmlTools.getStyles(node,styles));
};
svgimport.SvgGroup.__name__ = true;
svgimport.SvgGroup.prototype = {
	loadChildren: function(xml,styles) {
		var _g = 0;
		var _g1 = xml.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var _g2 = svgimport.XmlTools.normalizeTag(child.name);
			switch(_g2) {
			case "defs":
				this.loadDefs(child);
				break;
			case "g":
				this.children.push(svgimport.SvgElement.DisplayGroup(new svgimport.SvgGroup(child,this.svgWidth,styles,this.elements,this.gradients)));
				break;
			case "use":
				var e = this.loadUse(child,styles);
				if(e != null) this.children.push(e);
				break;
			case "path":case "line":case "polyline":case "rect":case "polygon":case "ellipse":case "circle":
				this.children.push(svgimport.SvgElement.DisplayPath(new svgimport.SvgPath(child,styles,this.elements,this.gradients)));
				break;
			case "text":
				this.children.push(svgimport.SvgElement.DisplayText(new svgimport.SvgText(child,styles,this.gradients)));
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
				console.log("Unknown tag '" + child.name + "'.");
			}
		}
	}
	,loadDefs: function(defsNode) {
		var _g = 0;
		var _g1 = defsNode.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var _g2 = svgimport.XmlTools.normalizeTag(child.name);
			switch(_g2) {
			case "linearGradient":
				this.loadGradient(child);
				break;
			case "radialGradient":
				this.loadGradient(child);
				break;
			case "g":
				new svgimport.SvgGroup(child,this.svgWidth,null,this.elements,this.gradients);
				break;
			case "path":case "line":case "polyline":case "rect":case "polygon":case "ellipse":case "circle":
				new svgimport.SvgPath(child,null,this.elements,this.gradients);
				break;
			default:
				console.log("Unknown tag '" + child.name + "'.");
			}
		}
		var _g3 = 0;
		var _g11 = defsNode.children;
		while(_g3 < _g11.length) {
			var child1 = _g11[_g3];
			++_g3;
			var _g21 = svgimport.XmlTools.normalizeTag(child1.name);
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
	,loadUse: function(node,styles) {
		var groupID = svgimport.XmlTools.getXlink(node);
		if(groupID != null) {
			var matrix = svgimport.Transform.load(node.getAttribute("transform"));
			var x = svgimport.XmlTools.getFloatValue(node,"x",0);
			var y = svgimport.XmlTools.getFloatValue(node,"y",0);
			if(x != 0 || y != 0) matrix.prependTransform(x,y);
			return svgimport.SvgElement.DisplayUse(groupID,matrix,svgimport.XmlTools.getStyles(node,styles),node.getAttribute("display") != "none");
		}
		console.log("Use: 'xlink:href' attribute must be specified.");
		return null;
	}
	,loadGradient: function(node) {
		var baseGradID = svgimport.XmlTools.getXlink(node);
		if(baseGradID == null || this.gradients.exists(baseGradID)) {
			var gradID = node.getAttribute("id");
			if(!this.gradients.exists(gradID)) {
				var value = svgimport.gradients.Gradient.load(node,baseGradID != null?this.gradients.get(baseGradID):null,this.svgWidth);
				this.gradients.set(gradID,value);
			}
		}
	}
	,__class__: svgimport.SvgGroup
};
svgimport.Svg = function(xml) {
	var svg;
	if(xml.children.length > 0) svg = xml.children[0]; else svg = null;
	if(svg == null || svg.name != "svg" && svg.name != "svg:svg") throw "Not an SVG file (" + (svg == null?"null":svg.name) + ")";
	this.width = 400.0;
	this.height = 400.0;
	if(svg.hasAttribute("viewBox")) {
		var params = new EReg("\\s+","g").split(svg.getAttribute("viewBox"));
		if(params.length == 4) this.viewBox = new svgimport.Rectangle(Std.parseFloat(params[0]),Std.parseFloat(params[1]),Std.parseFloat(params[2]),Std.parseFloat(params[3]));
	}
	if(svg.hasAttribute("width") && !StringTools.endsWith(svg.getAttribute("width"),"%") && svg.hasAttribute("height") && !StringTools.endsWith(svg.getAttribute("height"),"%")) {
		this.width = svgimport.XmlTools.getFloatStyle(svg,"width",null,400.0);
		this.height = svgimport.XmlTools.getFloatStyle(svg,"height",null,400.0);
	} else if(this.viewBox != null) {
		this.width = this.viewBox.width;
		this.height = this.viewBox.height;
	}
	if(this.viewBox != null) this.svgWidth = this.viewBox.width; else this.svgWidth = this.width;
	svgimport.SvgGroup.call(this,svg,this.svgWidth,null,new haxe.ds.StringMap(),new haxe.ds.StringMap());
};
svgimport.Svg.__name__ = true;
svgimport.Svg.__super__ = svgimport.SvgGroup;
svgimport.Svg.prototype = $extend(svgimport.SvgGroup.prototype,{
	__class__: svgimport.Svg
});
svgimport.SvgAttributes = function() { };
svgimport.SvgAttributes.__name__ = true;
svgimport.SvgElement = { __ename__ : true, __constructs__ : ["DisplayPath","DisplayGroup","DisplayText","DisplayUse"] };
svgimport.SvgElement.DisplayPath = function(path) { var $x = ["DisplayPath",0,path]; $x.__enum__ = svgimport.SvgElement; return $x; };
svgimport.SvgElement.DisplayGroup = function(group) { var $x = ["DisplayGroup",1,group]; $x.__enum__ = svgimport.SvgElement; return $x; };
svgimport.SvgElement.DisplayText = function(text) { var $x = ["DisplayText",2,text]; $x.__enum__ = svgimport.SvgElement; return $x; };
svgimport.SvgElement.DisplayUse = function(name,matrix,styles,visible) { var $x = ["DisplayUse",3,name,matrix,styles,visible]; $x.__enum__ = svgimport.SvgElement; return $x; };
svgimport.SvgGroupExporter = function() { };
svgimport.SvgGroupExporter.__name__ = true;
svgimport.SvgGroupExporter.run = function(group,library) {
	var layers = [];
	var _g = 0;
	var _g1 = group.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		switch(child[1]) {
		case 1:
			var g = child[2];
			var item;
			if(!library.hasItem(g.id)) item = svgimport.SvgGroupExporter.run(g,library); else item = library.getItem(g.id);
			var instance = new nanofl.engine.elements.Instance(item.namePath);
			instance.matrix = g.matrix;
			svgimport.SvgGroupExporter.addElement(layers,instance,g.visible);
			break;
		case 0:
			var path = child[2];
			svgimport.SvgGroupExporter.addElement(layers,path.toElement());
			break;
		case 2:
			var text = child[2];
			svgimport.SvgGroupExporter.addElement(layers,text.toElement());
			break;
		case 3:
			var visible = child[5];
			var styles = child[4];
			var matrix = child[3];
			var id = child[2];
			if(styles.keys().hasNext()) {
				var element = group.elements.get(id);
				if(element != null) switch(element[1]) {
				case 1:
					var base = element[2];
					var g1 = new svgimport.SvgGroup(base.node,base.svgWidth,styles,group.elements,group.gradients,svgimport.SvgGroupExporter.getNextFreeID(group.elements,library,base.id));
					svgimport.SvgGroupExporter.run(g1,library);
					id = g1.id;
					break;
				case 0:
					var base1 = element[2];
					var p = new svgimport.SvgPath(base1.node,styles,group.elements,group.gradients,svgimport.SvgGroupExporter.getNextFreeID(group.elements,library,base1.id));
					var libraryItem = p.toLibraryItem();
					if(libraryItem != null) library.addItem(libraryItem);
					id = p.id;
					break;
				default:
				} else console.log("WARNING: Element '" + id + "' is not found.");
			}
			var instance1 = new nanofl.engine.elements.Instance(id);
			instance1.matrix = matrix.clone().appendMatrix(svgimport.SvgGroupExporter.getElementMatrix(group.elements.get(id)));
			svgimport.SvgGroupExporter.addElement(layers,instance1,visible);
			break;
		}
	}
	var mc = new nanofl.engine.libraryitems.MovieClipItem(group.id != ""?group.id:svgimport.SvgGroupExporter.getNextFreeID(group.elements,library));
	layers.reverse();
	var _g2 = 0;
	while(_g2 < layers.length) {
		var layer = layers[_g2];
		++_g2;
		mc.addLayer(layer);
	}
	library.addItem(mc);
	return mc;
};
svgimport.SvgGroupExporter.addElement = function(layers,element,visible) {
	if(visible == null) visible = true;
	if(element == null) return;
	if(layers.length == 0) svgimport.SvgGroupExporter.createLayerWithFrame(layers,"auto_" + layers.length);
	var frame = layers[layers.length - 1].keyFrames[0];
	if(frame.elements.length > 0 && js.Boot.__instanceof(element,nanofl.engine.elements.ShapeElement) || layers[layers.length - 1].visible != visible) frame = svgimport.SvgGroupExporter.createLayerWithFrame(layers,"auto_" + layers.length,visible);
	frame.addElement(element);
};
svgimport.SvgGroupExporter.createLayerWithFrame = function(layers,name,visible) {
	if(visible == null) visible = true;
	var layer = new nanofl.engine.Layer(name,null,visible);
	var keyFrame = new nanofl.engine.KeyFrame();
	layer.addKeyFrame(keyFrame);
	layers.push(layer);
	return keyFrame;
};
svgimport.SvgGroupExporter.getNextFreeID = function(elements,library,prefix) {
	if(prefix == null) prefix = "auto_";
	var i = 0;
	while(elements.exists(prefix + i) || library.hasItem(prefix + i)) i++;
	return prefix + i;
};
svgimport.SvgGroupExporter.getElementMatrix = function(elem) {
	if(elem == null) return new nanofl.engine.geom.Matrix();
	switch(elem[1]) {
	case 1:
		var g = elem[2];
		return g.matrix;
	default:
		return new nanofl.engine.geom.Matrix();
	}
};
svgimport.SvgPath = function(node,baseStyles,elements,gradients,id) {
	this.node = node;
	var styles = svgimport.XmlTools.getStyles(node,baseStyles);
	if(id != null) this.id = id; else this.id = htmlparser.HtmlParserTools.getAttr(node,"id","");
	if(this.id != "") {
		var value = svgimport.SvgElement.DisplayPath(this);
		elements.set(this.id,value);
	}
	this.matrix = svgimport.Transform.load(node.getAttribute("transform"));
	this.alpha = svgimport.XmlTools.getFloatStyle(node,"opacity",styles,1.0);
	this.fill = svgimport.XmlTools.getFillStyle(node,"fill",styles,gradients);
	this.fillAlpha = svgimport.XmlTools.getFloatStyle(node,"fill-opacity",styles,1.0);
	this.fillRuleEvenOdd = svgimport.XmlTools.getStyle(node,"fill-rule",styles,"nonzero") == "evenodd";
	this.stroke = svgimport.XmlTools.getStrokeStyle(node,"stroke",styles,gradients);
	this.strokeAlpha = svgimport.XmlTools.getFloatStyle(node,"stroke-opacity",styles,1.0);
	this.strokeWidth = svgimport.XmlTools.getFloatStyle(node,"stroke-width",styles,1.0);
	this.strokeCaps = svgimport.XmlTools.getStyle(node,"stroke-linecap",styles,"butt");
	this.strokeJoints = svgimport.XmlTools.getStyle(node,"stroke-linejoin",styles,"miter");
	this.strokeMiterLimit = svgimport.XmlTools.getFloatStyle(node,"stroke-miterlimit",styles,4.0);
	this.segments = [];
	var _g = svgimport.XmlTools.normalizeTag(node.name);
	switch(_g) {
	case "rect":
		var x = svgimport.XmlTools.getFloatValue(node,"x",0);
		var y = svgimport.XmlTools.getFloatValue(node,"y",0);
		var w = svgimport.XmlTools.getFloatValue(node,"width",0);
		var h = svgimport.XmlTools.getFloatValue(node,"height",0);
		var rx = svgimport.XmlTools.getFloatValue(node,"rx",0);
		var ry = svgimport.XmlTools.getFloatValue(node,"ry",rx);
		if(rx == 0 || ry == 0) {
			this.segments.push(new svgimport.segments.MoveSegment(x,y));
			this.segments.push(new svgimport.segments.DrawSegment(x + w,y));
			this.segments.push(new svgimport.segments.DrawSegment(x + w,y + h));
			this.segments.push(new svgimport.segments.DrawSegment(x,y + h));
			this.segments.push(new svgimport.segments.DrawSegment(x,y));
		} else {
			this.segments.push(new svgimport.segments.MoveSegment(x + rx,y));
			this.segments.push(new svgimport.segments.DrawSegment(x + w - rx,y));
			this.segments.push(new svgimport.segments.QuadraticSegment(x + w,y,x + w,y + ry));
			this.segments.push(new svgimport.segments.DrawSegment(x + w,y + h - ry));
			this.segments.push(new svgimport.segments.QuadraticSegment(x + w,y + h,x + w - rx,y + h));
			this.segments.push(new svgimport.segments.DrawSegment(x + rx,y + h));
			this.segments.push(new svgimport.segments.QuadraticSegment(x,y + h,x,y + h - ry));
			this.segments.push(new svgimport.segments.DrawSegment(x,y + ry));
			this.segments.push(new svgimport.segments.QuadraticSegment(x,y,x + rx,y));
		}
		break;
	case "ellipse":case "circle":
		var x1 = svgimport.XmlTools.getFloatValue(node,"cx",0);
		var y1 = svgimport.XmlTools.getFloatValue(node,"cy",0);
		var r = svgimport.XmlTools.getFloatValue(node,"r",0);
		var w1 = svgimport.XmlTools.getFloatValue(node,"rx",r);
		var w_ = w1 * svgimport.SvgPath.SIN45;
		var cw_ = w1 * svgimport.SvgPath.TAN22;
		var h1 = svgimport.XmlTools.getFloatValue(node,"ry",r);
		var h_ = h1 * svgimport.SvgPath.SIN45;
		var ch_ = h1 * svgimport.SvgPath.TAN22;
		this.segments.push(new svgimport.segments.MoveSegment(x1 + w1,y1));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 + w1,y1 + ch_,x1 + w_,y1 + h_));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 + cw_,y1 + h1,x1,y1 + h1));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 - cw_,y1 + h1,x1 - w_,y1 + h_));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 - w1,y1 + ch_,x1 - w1,y1));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 - w1,y1 - ch_,x1 - w_,y1 - h_));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 - cw_,y1 - h1,x1,y1 - h1));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 + cw_,y1 - h1,x1 + w_,y1 - h_));
		this.segments.push(new svgimport.segments.QuadraticSegment(x1 + w1,y1 - ch_,x1 + w1,y1));
		this.strokeCaps = "round";
		this.strokeJoints = "round";
		break;
	case "polyline":
		this.segments = this.segments.concat(svgimport.SegmentsParser.run("M" + node.getAttribute("points")));
		break;
	case "polygon":
		this.segments = this.segments.concat(svgimport.SegmentsParser.run("M" + node.getAttribute("points") + "z"));
		break;
	case "path":
		this.segments = this.segments.concat(svgimport.SegmentsParser.run(node.getAttribute("d")));
		break;
	}
};
svgimport.SvgPath.__name__ = true;
svgimport.SvgPath.prototype = {
	toElement: function() {
		if(this.segments.length == 0) return null;
		var exporter = new svgimport.SvgPathExporter();
		if(this.fill != null && this.fill != svgimport.FillType.FillNone) {
			exporter.beginFill(this);
			var _g = 0;
			var _g1 = this.segments;
			while(_g < _g1.length) {
				var segment = _g1[_g];
				++_g;
				segment["export"](exporter);
			}
			exporter.endFill();
		}
		if(this.stroke != null && this.stroke != svgimport.StrokeType.StrokeNone) {
			exporter.beginStroke(this);
			var _g2 = 0;
			var _g11 = this.segments;
			while(_g2 < _g11.length) {
				var segment1 = _g11[_g2];
				++_g2;
				segment1["export"](exporter);
			}
			exporter.endStroke();
		}
		var shape = exporter["export"]();
		if(!this.matrix.isIdentity()) shape.transform(this.matrix);
		var effectiveStrokeAlpha = this.alpha * this.strokeAlpha;
		if(effectiveStrokeAlpha != 1.0 && shape.edges.length > 0) shape.edges[0].stroke.applyAlpha(effectiveStrokeAlpha);
		var effectiveFillAlpha = this.alpha * this.fillAlpha;
		if(effectiveFillAlpha != 1.0 && shape.polygons.length > 0) shape.polygons[0].fill.applyAlpha(effectiveFillAlpha);
		return shape;
	}
	,toLibraryItem: function() {
		var element = this.toElement();
		if(element == null) return null;
		var mc = new nanofl.engine.libraryitems.MovieClipItem(this.id);
		mc.addLayer(new nanofl.engine.Layer("auto"));
		mc.layers[0].addKeyFrame(new nanofl.engine.KeyFrame(null,null,null,[element]));
		return mc;
	}
	,__class__: svgimport.SvgPath
};
svgimport.SvgPathExporter = function() {
	this.y = null;
	this.x = null;
	this.fillPath = null;
	this.stroke = null;
	this.polygonAndFillRules = new Array();
	this.edges = new Array();
};
svgimport.SvgPathExporter.__name__ = true;
svgimport.SvgPathExporter.prototype = {
	beginFill: function(path) {
		if(path.fill != svgimport.FillType.FillNone) this.fillPath = path; else this.fillPath = null;
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
						polygon.fill = new nanofl.engine.fills.LinearFill(this.getGradientRgbaColors(grad),grad.ratios,grad.getFullMatrix(bounds));
						break;
					case 1:
						var grad1 = gradType[2];
						polygon.fill = new nanofl.engine.fills.RadialFill(this.getGradientRgbaColors(grad1),grad1.ratios,grad1.getFullMatrix(bounds));
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
				default:
					console.log("Stroke: not linear gradients are not supported.");
					this.stroke = new nanofl.engine.strokes.SolidStroke("#000000");
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
	,'export': function() {
		var shape = new nanofl.engine.elements.ShapeElement();
		var _g = 0;
		var _g1 = this.polygonAndFillRules;
		while(_g < _g1.length) {
			var pf = _g1[_g];
			++_g;
			shape.combine(new nanofl.engine.elements.ShapeElement([],nanofl.engine.geom.Polygons.fromEdges(pf.polygon.getEdges(),pf.polygon.fill,pf.fillRuleEvenOdd)));
		}
		nanofl.engine.geom.Edges.selfIntersect(this.edges);
		shape.combine(new nanofl.engine.elements.ShapeElement(this.edges));
		return shape;
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
	,__class__: svgimport.SvgPathExporter
};
svgimport.SvgText = function(textNode,baseStyles,gradients) {
	this.matrix = svgimport.Transform.load(textNode.getAttribute("transform"));
	var styles = svgimport.XmlTools.getStyles(textNode,baseStyles);
	this.name = htmlparser.HtmlParserTools.getAttr(textNode,"id","");
	this.x = svgimport.XmlTools.getFloatValue(textNode,"x",0);
	this.y = svgimport.XmlTools.getFloatValue(textNode,"y",0);
	this.fill = svgimport.XmlTools.getFillStyle(textNode,"fill",styles,gradients);
	this.fillAlpha = svgimport.XmlTools.getFloatStyle(textNode,"fill-opacity",styles,1);
	this.stroke = svgimport.XmlTools.getStrokeStyle(textNode,"stroke",styles,gradients);
	this.strokeAlpha = svgimport.XmlTools.getFloatStyle(textNode,"stroke-opacity",styles,1);
	this.strokeWidth = svgimport.XmlTools.getFloatStyle(textNode,"stroke-width",styles,1);
	this.fontFamily = svgimport.XmlTools.getStyle(textNode,"font-family",styles,"");
	this.fontSize = svgimport.XmlTools.getFloatStyle(textNode,"font-size",styles,12);
	this.fontStyle = svgimport.XmlTools.getStyle(textNode,"font-style",styles,"");
	this.fontWeight = svgimport.XmlTools.getStyle(textNode,"font-weight",styles,"");
	this.kerning = svgimport.XmlTools.getFloatStyle(textNode,"kerning",styles,0);
	this.letterSpacing = svgimport.XmlTools.getFloatStyle(textNode,"letter-spacing",styles,0);
	this.textAnchor = svgimport.XmlTools.getStyle(textNode,"text-anchor",styles,"left");
	this.text = textNode.innerText;
};
svgimport.SvgText.__name__ = true;
svgimport.SvgText.prototype = {
	toElement: function() {
		var fillColor;
		{
			var _g = this.fill;
			switch(_g[1]) {
			case 0:
				fillColor = null;
				break;
			case 1:
				var color = _g[2];
				fillColor = color;
				break;
			case 2:
				var gradType = _g[2];
				console.log("Text gradients is not supported.");
				fillColor = "#000000";
				break;
			}
		}
		var color1;
		{
			var _g1 = this.stroke;
			switch(_g1[1]) {
			case 1:
				var c = _g1[2];
				color1 = c;
				break;
			case 0:
				color1 = null;
				break;
			default:
				color1 = "#000000";
			}
		}
		var r = new nanofl.engine.elements.TextElement(this.name,0,0,false,false,[nanofl.TextRun.create(this.text,fillColor,this.fontFamily,"",this.fontSize,"left",this.strokeWidth,color1,true,this.letterSpacing,0)]);
		r.matrix = this.matrix.clone();
		r.matrix.translate(this.x,this.y);
		var t = r.createDisplayObject(null);
		var fontHeight = nanofl.TextField.measureFontHeight(this.fontFamily,this.fontStyle,this.fontSize);
		var fontBaselineCoef = nanofl.TextField.measureFontBaselineCoef(this.fontFamily,this.fontStyle);
		r.matrix.translate(0,-fontHeight * fontBaselineCoef - nanofl.TextField.PADDING);
		var _g2 = this.textAnchor;
		switch(_g2) {
		case "middle":
			r.matrix.translate(-t.minWidth / 2,0);
			break;
		case "end":
			r.matrix.translate(-t.minWidth + nanofl.TextField.PADDING,0);
			break;
		default:
			r.matrix.translate(-nanofl.TextField.PADDING,0);
		}
		return r;
	}
	,__class__: svgimport.SvgText
};
svgimport.Transform = function() { };
svgimport.Transform.__name__ = true;
svgimport.Transform.load = function(trans) {
	if(trans == null || trans == "") return new nanofl.engine.geom.Matrix();
	var matrix = new nanofl.engine.geom.Matrix();
	var re = new EReg("^\\s*([a-zA-Z]+)\\s*\\(([^)]*)\\)\\s*","");
	while(re.match(trans)) {
		var params = new EReg("[ \t\r\n,]+","g").split(re.matched(2)).map(Std.parseFloat);
		var _g = re.matched(1);
		switch(_g) {
		case "translate":
			if(params.length == 2) matrix.appendTransform(params[0],params[1]); else if(params.length == 1) matrix.appendTransform(params[0],0); else console.log("Transform/translate: invalid params '" + re.matched(2) + "'.");
			break;
		case "scale":
			if(params.length == 2) matrix.appendTransform(0,0,params[0],params[1]); else if(params.length == 1) matrix.appendTransform(0,0,params[0],params[0]); else console.log("Transform/scale: invalid params '" + re.matched(2) + "'.");
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
			} else console.log("Transform/rotate: invalid params '" + re.matched(2) + "'.");
			break;
		case "matrix":
			if(params.length == 6) matrix.append(params[0],params[1],params[2],params[3],params[4],params[5]);
			break;
		default:
			console.log("Unknow transform: '" + re.matched(1) + "'.");
		}
		trans = re.matchedRight();
	}
	return matrix;
};
svgimport.XmlTools = function() { };
svgimport.XmlTools.__name__ = true;
svgimport.XmlTools.getStyles = function(node,baseStyles) {
	var styles = new haxe.ds.StringMap();
	if(baseStyles != null) {
		var $it0 = baseStyles.keys();
		while( $it0.hasNext() ) {
			var s = $it0.next();
			var value = baseStyles.get(s);
			styles.set(s,value);
		}
	}
	var _g = 0;
	var _g1 = svgimport.SvgAttributes.presentation;
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		if(node.hasAttribute(key)) {
			var value1 = node.getAttribute(key);
			styles.set(key,value1);
		}
	}
	if(node.hasAttribute("style")) {
		var _g2 = 0;
		var _g11 = node.getAttribute("style").split(";");
		while(_g2 < _g11.length) {
			var s1 = _g11[_g2];
			++_g2;
			if(svgimport.XmlTools.reStyleValue.match(s1)) {
				var key1 = svgimport.XmlTools.reStyleValue.matched(1);
				var value2 = svgimport.XmlTools.reStyleValue.matched(2);
				styles.set(key1,value2);
			}
		}
	}
	return styles;
};
svgimport.XmlTools.getFloatStyle = function(node,key,styles,defaultValue) {
	return svgimport.XmlTools.toFloat(svgimport.XmlTools.getStyle(node,key,styles,""),defaultValue);
};
svgimport.XmlTools.getFloatValue = function(node,key,defaultValue) {
	return svgimport.XmlTools.toFloat(node.getAttribute(key),defaultValue);
};
svgimport.XmlTools.toFloat = function(s,defaultValue) {
	if(s == null || s == "") return defaultValue;
	if(StringTools.startsWith(s,".")) s = "0" + s;
	if(StringTools.endsWith(s,"%")) return Std.parseFloat(s.substring(0,s.length - 1)) / 100;
	if(StringTools.endsWith(s,"pt")) return Std.parseFloat(s.substring(0,s.length - 2)) * 1.25;
	if(StringTools.endsWith(s,"pc")) return Std.parseFloat(s.substring(0,s.length - 2)) * 15;
	if(StringTools.endsWith(s,"mm")) return Std.parseFloat(s.substring(0,s.length - 2)) * 3.543307;
	if(StringTools.endsWith(s,"cm")) return Std.parseFloat(s.substring(0,s.length - 2)) * 35.43307;
	if(StringTools.endsWith(s,"in")) return Std.parseFloat(s.substring(0,s.length - 2)) * 90;
	var r = Std.parseFloat(s);
	if(r != null && !Math.isNaN(r)) return r; else return defaultValue;
};
svgimport.XmlTools.getStyle = function(node,key,styles,defaultValue) {
	if(node != null && node.hasAttribute(key)) return node.getAttribute(key);
	if(styles != null && styles.exists(key)) return styles.get(key);
	return defaultValue;
};
svgimport.XmlTools.getColorStyle = function(node,key,styles,defaultValue) {
	var s = svgimport.XmlTools.getStyle(node,key,styles,defaultValue);
	return s;
};
svgimport.XmlTools.getFillStyle = function(node,key,styles,gradients) {
	var s = svgimport.XmlTools.getStyle(node,key,styles,"");
	if(s == "") return svgimport.FillType.FillSolid("#000000");
	if(s == "none") return svgimport.FillType.FillNone;
	if(svgimport.XmlTools.reURLMatch.match(s)) {
		var url = svgimport.XmlTools.reURLMatch.matched(1);
		if(gradients.exists(url)) return svgimport.FillType.FillGrad(gradients.get(url));
		console.log("WARNING: Unknown url('" + url + "').");
		return svgimport.FillType.FillNone;
	}
	return svgimport.FillType.FillSolid(s);
};
svgimport.XmlTools.getStrokeStyle = function(node,key,styles,gradients) {
	var s = svgimport.XmlTools.getStyle(node,key,styles,"");
	if(s == "" || s == "none") return svgimport.StrokeType.StrokeNone;
	if(svgimport.XmlTools.reURLMatch.match(s)) {
		var url = svgimport.XmlTools.reURLMatch.matched(1);
		if(gradients.exists(url)) return svgimport.StrokeType.StrokeGrad(gradients.get(url));
		console.log("WARNING: Unknown url('" + url + "').");
		return svgimport.StrokeType.StrokeNone;
	}
	return svgimport.StrokeType.StrokeSolid(s);
};
svgimport.XmlTools.normalizeTag = function(s) {
	if(StringTools.startsWith(s,"svg:")) return s.substring("svg:".length); else return s;
};
svgimport.XmlTools.getXlink = function(node) {
	var xlink = htmlparser.HtmlParserTools.getAttr(node,"xlink:href","");
	if(xlink == "") return null;
	if(!StringTools.startsWith(xlink,"#")) {
		console.log("WARNING: Unkown xlink syntax ('" + xlink + "').");
		return null;
	}
	return xlink.substring(1);
};
svgimport.gradients = {};
svgimport.gradients.Gradient = function(node,baseType) {
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
	if(base != null) this.colors = base.colors.slice(); else this.colors = new Array();
	if(base != null) this.alphas = base.alphas.slice(); else this.alphas = new Array();
	if(base != null) this.ratios = base.ratios.slice(); else this.ratios = new Array();
	var _g = 0;
	var _g1 = node.children;
	while(_g < _g1.length) {
		var stop = _g1[_g];
		++_g;
		var styles = svgimport.XmlTools.getStyles(stop,null);
		this.colors.push(svgimport.XmlTools.getColorStyle(stop,"stop-color",styles,"#000000"));
		this.alphas.push(svgimport.XmlTools.getFloatStyle(stop,"stop-opacity",styles,1));
		this.ratios.push(svgimport.XmlTools.getFloatStyle(stop,"offset",null,0));
	}
	this.matrix = svgimport.Transform.load(node.getAttribute("gradientTransform"));
	if(base != null) this.matrix.prependMatrix(base.matrix);
};
svgimport.gradients.Gradient.__name__ = true;
svgimport.gradients.Gradient.load = function(node,baseType,svgWidth) {
	var _g = svgimport.XmlTools.normalizeTag(node.name);
	switch(_g) {
	case "linearGradient":
		return svgimport.gradients.GradientType.LINEAR(new svgimport.gradients.LinearGradient(node,baseType,svgWidth));
	case "radialGradient":
		return svgimport.gradients.GradientType.RADIAL(new svgimport.gradients.RadialGradient(node,baseType));
	default:
		throw "Unknow gradient tag '" + node.name + "'.";
	}
};
svgimport.gradients.Gradient.prototype = {
	__class__: svgimport.gradients.Gradient
};
svgimport.gradients.GradientType = { __ename__ : true, __constructs__ : ["LINEAR","RADIAL"] };
svgimport.gradients.GradientType.LINEAR = function(grad) { var $x = ["LINEAR",0,grad]; $x.__enum__ = svgimport.gradients.GradientType; return $x; };
svgimport.gradients.GradientType.RADIAL = function(grad) { var $x = ["RADIAL",1,grad]; $x.__enum__ = svgimport.gradients.GradientType; return $x; };
svgimport.gradients.LinearGradient = function(node,baseType,svgWidth) {
	svgimport.gradients.Gradient.call(this,node,baseType);
	var base = null;
	if(baseType != null) switch(baseType[1]) {
	case 0:
		var grad = baseType[2];
		base = grad;
		break;
	default:
	}
	this.x1 = svgimport.XmlTools.getFloatValue(node,"x1",base != null?base.x1:null);
	this.y1 = svgimport.XmlTools.getFloatValue(node,"y1",base != null?base.y1:null);
	this.x2 = svgimport.XmlTools.getFloatValue(node,"x2",base != null?base.x2:null);
	this.y2 = svgimport.XmlTools.getFloatValue(node,"y2",base != null?base.y2:null);
	if(this.gradientUnits != "userSpaceOnUse") {
		if(this.x1 == null && this.y1 == null && this.x2 == null && this.y2 == null) {
			this.x1 = 0;
			this.y1 = 0;
			this.x2 = 0.5;
			this.y2 = 0;
		} else {
			if(this.x1 == null) this.x1 = 0;
			if(this.y1 == null) this.y1 = 0;
			if(this.x2 == null) this.x2 = 0;
			if(this.y2 == null) this.y2 = 0;
		}
	} else {
		if(this.x1 == null) this.x1 = 0;
		if(this.y1 == null) this.y1 = 0;
		if(this.x2 == null) this.x2 = svgWidth;
		if(this.y2 == null) this.y2 = 0;
	}
};
svgimport.gradients.LinearGradient.__name__ = true;
svgimport.gradients.LinearGradient.__super__ = svgimport.gradients.Gradient;
svgimport.gradients.LinearGradient.prototype = $extend(svgimport.gradients.Gradient.prototype,{
	getFullMatrix: function(bounds) {
		var m = new nanofl.engine.geom.Matrix();
		if(this.gradientUnits == "userSpaceOnUse") {
			var w = Math.abs(this.x2 - this.x1);
			var h = Math.abs(this.y2 - this.y1);
			m.scale(Math.sqrt(w * w + h * h) / 2,1);
			m.rotate(Math.atan2(this.y2 - this.y1,this.x2 - this.x1));
			m.appendMatrix(this.matrix);
			m.translate((this.x1 + this.x2) / 2,(this.y1 + this.y2) / 2);
		} else {
			m.scale(0.5,0.5);
			m.translate(0.5,0.5);
			var dx = this.x2 - this.x1;
			var dy = this.y2 - this.y1;
			m.scale(Math.sqrt(dx * dx + dy * dy),1);
			m.rotate(Math.atan2(dy,dx));
			var w1 = bounds.maxX - bounds.minX;
			var h1 = bounds.maxY - bounds.minY;
			m.scale(w1,h1);
			m.translate(this.x1 * w1,this.y1 * h1);
			m.appendMatrix(this.matrix);
			m.translate(bounds.minX,bounds.minY);
		}
		return m;
	}
	,__class__: svgimport.gradients.LinearGradient
});
svgimport.gradients.RadialGradient = function(node,baseType) {
	svgimport.gradients.Gradient.call(this,node,baseType);
	var base = null;
	if(baseType != null) switch(baseType[1]) {
	case 1:
		var grad = baseType[2];
		base = grad;
		break;
	default:
	}
	this.cx = svgimport.XmlTools.getFloatValue(node,"cx",base != null?base.cx:0.5);
	this.cy = svgimport.XmlTools.getFloatValue(node,"cy",base != null?base.cy:0.5);
	this.fx = svgimport.XmlTools.getFloatValue(node,"fx",base != null?base.fx:this.cx);
	this.fy = svgimport.XmlTools.getFloatValue(node,"fy",base != null?base.fy:this.cy);
	this.r = svgimport.XmlTools.getFloatValue(node,"r",base != null?base.r:0.5);
};
svgimport.gradients.RadialGradient.__name__ = true;
svgimport.gradients.RadialGradient.__super__ = svgimport.gradients.Gradient;
svgimport.gradients.RadialGradient.prototype = $extend(svgimport.gradients.Gradient.prototype,{
	getFullMatrix: function(bounds) {
		var m = new nanofl.engine.geom.Matrix();
		if(this.gradientUnits == "" || this.gradientUnits == "objectBoundingBox") {
			var w = bounds.maxX - bounds.minX;
			var h = bounds.maxY - bounds.minY;
			m.scale(w * this.r,h * this.r);
			m.translate(bounds.minX + w * this.cx,bounds.minY + h * this.cy);
		} else if(this.gradientUnits == "userSpaceOnUse") {
			m.scale(this.r,this.r);
			m.translate(this.cx,this.cy);
		} else console.log("Unknow gradientUnits '" + this.gradientUnits + "'.");
		m.appendMatrix(this.matrix);
		return m;
	}
	,__class__: svgimport.gradients.RadialGradient
});
svgimport.segments = {};
svgimport.segments.Segment = function(inX,inY) {
	this.x = inX;
	this.y = inY;
};
svgimport.segments.Segment.__name__ = true;
svgimport.segments.Segment.prototype = {
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
		throw "Segment.export() must be overriden.";
	}
	,toString: function() {
		return "Segment(" + this.prevX() + "," + this.prevY() + ", " + this.x + "," + this.y + ")";
	}
	,__class__: svgimport.segments.Segment
};
svgimport.segments.ArcSegment = function(x0,y0,rx,ry,rotation,isLargeArc,isSweep,x,y) {
	this.x0 = x0;
	this.y0 = y0;
	svgimport.segments.Segment.call(this,x,y);
	this.rx = rx;
	this.ry = ry;
	this.rotation = rotation;
	this.isLargeArc = isLargeArc;
	this.isSweep = isSweep;
};
svgimport.segments.ArcSegment.__name__ = true;
svgimport.segments.ArcSegment.arcToCubicCurves = function(x1,y1,rx,ry,angle,isLargeArc,isSweep,x2,y2,recursive) {
	var rad = Math.PI / 180 * angle;
	var res = new Array();
	var f1;
	var f2;
	var cx;
	var cy;
	if(recursive == null) {
		var xy = svgimport.segments.ArcSegment.rotate(x1,y1,-rad);
		x1 = xy.x;
		y1 = xy.y;
		xy = svgimport.segments.ArcSegment.rotate(x2,y2,-rad);
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
	if(Math.abs(df) > svgimport.segments.ArcSegment.RAD_120) {
		var f2old = f2;
		var x2old = x2;
		var y2old = y2;
		f2 = f1 + svgimport.segments.ArcSegment.RAD_120 * (isSweep && f2 > f1?1:-1);
		x2 = cx + rx * Math.cos(f2);
		y2 = cy + ry * Math.sin(f2);
		res = svgimport.segments.ArcSegment.arcToCubicCurves(x2,y2,rx,ry,angle,false,isSweep,x2old,y2old,{ f1 : f2, f2 : f2old, cx : cx, cy : cy});
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
			newres.push(svgimport.segments.ArcSegment.rotate(res[i].x,res[i].y,rad));
		}
		return newres;
	}
};
svgimport.segments.ArcSegment.rotate = function(x,y,rad) {
	return { x : x * Math.cos(rad) - y * Math.sin(rad), y : x * Math.sin(rad) + y * Math.cos(rad)};
};
svgimport.segments.ArcSegment.__super__ = svgimport.segments.Segment;
svgimport.segments.ArcSegment.prototype = $extend(svgimport.segments.Segment.prototype,{
	'export': function(exporter) {
		if(this.x0 == this.x && this.y0 == this.y) return;
		if(this.rx == 0 || this.ry == 0) {
			exporter.lineTo(this.x,this.y);
			return;
		}
		var points = svgimport.segments.ArcSegment.arcToCubicCurves(this.x0,this.y0,Math.abs(this.rx),Math.abs(this.ry),this.rotation,this.isLargeArc,this.isSweep,this.x,this.y,null);
		var i = 0;
		while(i < points.length) {
			var curve = new svgimport.segments.CubicSegment(points[i].x,points[i].y,points[i + 1].x,points[i + 1].y,points[i + 2].x,points[i + 2].y);
			curve["export"](exporter);
			i += 3;
		}
	}
	,__class__: svgimport.segments.ArcSegment
});
svgimport.segments.CubicSegment = function(inCX1,inCY1,inCX2,inCY2,inX,inY) {
	svgimport.segments.Segment.call(this,inX,inY);
	this.cx1 = inCX1;
	this.cy1 = inCY1;
	this.cx2 = inCX2;
	this.cy2 = inCY2;
};
svgimport.segments.CubicSegment.__name__ = true;
svgimport.segments.CubicSegment.__super__ = svgimport.segments.Segment;
svgimport.segments.CubicSegment.prototype = $extend(svgimport.segments.Segment.prototype,{
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
		return svgimport.SegmentType.CUBIC(this);
	}
	,__class__: svgimport.segments.CubicSegment
});
svgimport.segments.DrawSegment = function(inX,inY) {
	svgimport.segments.Segment.call(this,inX,inY);
};
svgimport.segments.DrawSegment.__name__ = true;
svgimport.segments.DrawSegment.__super__ = svgimport.segments.Segment;
svgimport.segments.DrawSegment.prototype = $extend(svgimport.segments.Segment.prototype,{
	'export': function(exporter) {
		exporter.lineTo(this.x,this.y);
	}
	,getType: function() {
		return svgimport.SegmentType.DRAW(this);
	}
	,__class__: svgimport.segments.DrawSegment
});
svgimport.segments.MoveSegment = function(inX,inY) {
	svgimport.segments.Segment.call(this,inX,inY);
};
svgimport.segments.MoveSegment.__name__ = true;
svgimport.segments.MoveSegment.__super__ = svgimport.segments.Segment;
svgimport.segments.MoveSegment.prototype = $extend(svgimport.segments.Segment.prototype,{
	'export': function(exporter) {
		exporter.moveTo(this.x,this.y);
	}
	,getType: function() {
		return svgimport.SegmentType.MOVE(this);
	}
	,__class__: svgimport.segments.MoveSegment
});
svgimport.segments.QuadraticSegment = function(inCX,inCY,inX,inY) {
	svgimport.segments.Segment.call(this,inX,inY);
	this.cx = inCX;
	this.cy = inCY;
};
svgimport.segments.QuadraticSegment.__name__ = true;
svgimport.segments.QuadraticSegment.__super__ = svgimport.segments.Segment;
svgimport.segments.QuadraticSegment.prototype = $extend(svgimport.segments.Segment.prototype,{
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
		return svgimport.SegmentType.CURVE(this);
	}
	,__class__: svgimport.segments.QuadraticSegment
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
String.__name__ = true;
Array.__name__ = true;
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
SvgImporterPlugin.embeddedIcon = "\r\niVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC\r\n5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/Q\r\naKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lI\r\noqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy\r\n5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkN\r\nAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne\r\n8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQ\r\nTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2\r\nNu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMm\r\nDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXx\r\nCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRg\r\nT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8\r\ndtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz\r\n9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gH\r\nue+ALxPHGYEAAAAASUVORK5CYII=\r\n";
svgimport.SegmentsParser.MOVE = 77;
svgimport.SegmentsParser.MOVER = 109;
svgimport.SegmentsParser.LINE = 76;
svgimport.SegmentsParser.LINER = 108;
svgimport.SegmentsParser.HLINE = 72;
svgimport.SegmentsParser.HLINER = 104;
svgimport.SegmentsParser.VLINE = 86;
svgimport.SegmentsParser.VLINER = 118;
svgimport.SegmentsParser.CUBIC = 67;
svgimport.SegmentsParser.CUBICR = 99;
svgimport.SegmentsParser.SCUBIC = 83;
svgimport.SegmentsParser.SCUBICR = 115;
svgimport.SegmentsParser.QUAD = 81;
svgimport.SegmentsParser.QUADR = 113;
svgimport.SegmentsParser.SQUAD = 84;
svgimport.SegmentsParser.SQUADR = 116;
svgimport.SegmentsParser.ARC = 65;
svgimport.SegmentsParser.ARCR = 97;
svgimport.SegmentsParser.CLOSE = 90;
svgimport.SegmentsParser.CLOSER = 122;
svgimport.SegmentsParser.UNKNOWN = -1;
svgimport.SegmentsParser.SEPARATOR = -2;
svgimport.SegmentsParser.FLOAT = -3;
svgimport.SegmentsParser.FLOAT_SIGN = -4;
svgimport.SegmentsParser.FLOAT_DOT = -5;
svgimport.SegmentsParser.FLOAT_EXP = -6;
svgimport.SvgAttributes.presentation = ["alignment-baseline","baseline-shift","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cursor","direction","display","dominant-baseline","enable-background","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","kerning","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","pointer-events","shape-rendering","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","unicode-bidi","visibility","word-spacing","writing-mode"];
svgimport.SvgPath.SIN45 = 0.70710678118654752440084436210485;
svgimport.SvgPath.TAN22 = 0.4142135623730950488016887242097;
svgimport.XmlTools.reStyleValue = new EReg("^\\s*(.+)\\s*:\\s*(.+)\\s*$","");
svgimport.XmlTools.reURLMatch = new EReg("^\\s*url\\(#([^)]*)\\)\\s*","");
svgimport.segments.ArcSegment.RAD_120 = Math.PI * 2 / 3;
SvgImporterPlugin.main();
})();
