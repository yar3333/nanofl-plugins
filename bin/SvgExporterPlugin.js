(function () { "use strict";
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
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
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
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
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
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x1 = $it1.next();
		l.add(x1);
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
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = true;
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
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var SvgExporterPlugin = function() {
	this.fileFilterExtensions = ["svg"];
	this.fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	this.menuItemIcon = "url(data:image/png;base64," + StringTools.replace(StringTools.replace(SvgExporterPlugin.embeddedIcon,"\r",""),"\n","") + ")";
	this.menuItemName = "Scalable Vector Graphics (*.svg)";
	this.name = "SvgExporter";
};
SvgExporterPlugin.__name__ = true;
SvgExporterPlugin.__interfaces__ = [nanofl.ide.plugins.IExporterPlugin];
SvgExporterPlugin.main = function() {
	nanofl.engine.Plugins.registerExporter(new SvgExporterPlugin());
};
SvgExporterPlugin.prototype = {
	exportDocument: function(fileApi,srcFilePath,destFilePath,documentProperties,library) {
		console.log("Plugin.exportDocument " + srcFilePath + " => " + destFilePath);
		var xml = new htmlparser.XmlBuilder();
		xml.begin("svg").attr("xmlns","http://www.w3.org/2000/svg").attr("width",documentProperties.width).attr("height",documentProperties.height).attr("xmlns:xlink","http://www.w3.org/1999/xlink");
		new svgexporter.SvgExporter(library)["export"](xml);
		xml.end();
		fileApi.saveContent(destFilePath,xml.toString());
		return true;
	}
	,__class__: SvgExporterPlugin
};
var haxe = {};
haxe.ds = {};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe.ds.ObjectMap.__name__ = true;
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
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
var stdlib = {};
stdlib.Lambda = function() { };
stdlib.Lambda.__name__ = true;
stdlib.Lambda.findIndex = function(it,f) {
	var n = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return n;
		n++;
	}
	return -1;
};
stdlib.Lambda.insertRange = function(arr,pos,range) {
	var _g = 0;
	while(_g < range.length) {
		var e = range[_g];
		++_g;
		var pos1 = pos++;
		arr.splice(pos1,0,e);
	}
};
stdlib.Lambda.array = function(it) {
	return Lambda.array(it);
};
stdlib.Lambda.list = function(it) {
	return Lambda.list(it);
};
stdlib.Lambda.map = function(it,f) {
	return Lambda.map(it,f);
};
stdlib.Lambda.mapi = function(it,f) {
	return Lambda.mapi(it,f);
};
stdlib.Lambda.has = function(it,elt) {
	return Lambda.has(it,elt);
};
stdlib.Lambda.exists = function(it,f) {
	return Lambda.exists(it,f);
};
stdlib.Lambda.foreach = function(it,f) {
	return Lambda.foreach(it,f);
};
stdlib.Lambda.iter = function(it,f) {
	return Lambda.iter(it,f);
};
stdlib.Lambda.filter = function(it,f) {
	return Lambda.filter(it,f);
};
stdlib.Lambda.fold = function(it,f,first) {
	return Lambda.fold(it,f,first);
};
stdlib.Lambda.count = function(it,pred) {
	return Lambda.count(it,pred);
};
stdlib.Lambda.empty = function(it) {
	return Lambda.empty(it);
};
stdlib.Lambda.indexOf = function(it,v) {
	return Lambda.indexOf(it,v);
};
stdlib.Lambda.find = function(it,f) {
	return Lambda.find(it,f);
};
stdlib.Lambda.concat = function(a,b) {
	return Lambda.concat(a,b);
};
var svgexporter = {};
svgexporter.Gradient = function(tag,colors,ratios,attributes) {
	this.tag = tag;
	this.colors = colors;
	this.ratios = ratios;
	this.attributes = attributes;
};
svgexporter.Gradient.__name__ = true;
svgexporter.Gradient.fromStroke = function(stroke) {
	if(js.Boot.__instanceof(stroke,nanofl.engine.strokes.LinearStroke)) {
		var data = stroke;
		return svgexporter.Gradient.createLinear(data.colors,data.ratios,data.x0,data.y0,data.x1,data.y1);
	} else if(js.Boot.__instanceof(stroke,nanofl.engine.strokes.RadialStroke)) {
		var data1 = stroke;
		return svgexporter.Gradient.createRadial(data1.colors,data1.ratios,data1.cx,data1.cy,data1.r,data1.fx,data1.fy);
	} else if(js.Boot.__instanceof(stroke,nanofl.engine.strokes.BitmapStroke)) console.log("BitmapStroke is not supported.");
	return null;
};
svgexporter.Gradient.fromFill = function(fill) {
	if(js.Boot.__instanceof(fill,nanofl.engine.fills.LinearFill)) {
		var data = fill;
		return svgexporter.Gradient.createLinear(data.colors,data.ratios,data.x0,data.y0,data.x1,data.y1);
	} else if(js.Boot.__instanceof(fill,nanofl.engine.fills.RadialFill)) {
		var data1 = fill;
		return svgexporter.Gradient.createRadial(data1.colors,data1.ratios,data1.cx,data1.cy,data1.r,data1.fx,data1.fy);
	} else if(js.Boot.__instanceof(fill,nanofl.engine.fills.BitmapFill)) console.log("BitmapFill is not supported.");
	return null;
};
svgexporter.Gradient.createLinear = function(colors,ratios,x0,y0,x1,y1) {
	return new svgexporter.Gradient("linearGradient",colors,ratios,[{ name : "x1", value : x0},{ name : "y1", value : y0},{ name : "x2", value : x1},{ name : "y2", value : y1}]);
};
svgexporter.Gradient.createRadial = function(colors,ratios,cx,cy,r,fx,fy) {
	return new svgexporter.Gradient("radialGradient",colors,ratios,[{ name : "cx", value : cx},{ name : "cy", value : cy},{ name : "r", value : r},{ name : "fx", value : fx},{ name : "fy", value : fy}]);
};
svgexporter.Gradient.prototype = {
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
	,__class__: svgexporter.Gradient
};
svgexporter.ShapeExporter = function() {
	this.gradients = new Array();
	this.fills = new Array();
	this.strokes = new Array();
};
svgexporter.ShapeExporter.__name__ = true;
svgexporter.ShapeExporter.prototype = {
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
				var g = [svgexporter.Gradient.fromStroke(edge[0].stroke)];
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
				var g1 = [svgexporter.Gradient.fromFill(polygon[0].fill)];
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
		var render = new svgexporter.ShapePathsRender(idPrefix,this.gradients,xml);
		shape.draw(render,null);
		return render.ids;
	}
	,__class__: svgexporter.ShapeExporter
};
svgexporter.ShapePathsRender = function(idPrefix,gradients,xml) {
	this.ids = new Array();
	this.d = "";
	this.attributes = new Array();
	this.idPrefix = null;
	this.idPrefix = idPrefix;
	this.gradients = gradients;
	this.xml = xml;
};
svgexporter.ShapePathsRender.__name__ = true;
svgexporter.ShapePathsRender.prototype = {
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
		var g = svgexporter.Gradient.createLinear(colors,ratios,x0,y0,x1,y1);
		this.attr("stroke","url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib.Lambda.findIndex(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}) + ")");
		return this;
	}
	,beginRadialGradientStroke: function(colors,ratios,fx,fy,fr,cx,cy,cr) {
		this.attr("fill","none");
		var g = svgexporter.Gradient.createRadial(colors,ratios,cx,cy,cr,fx,fy);
		this.attributes.push({ name : "stroke", value : "url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib.Lambda.findIndex(_e,f);
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
		var g = svgexporter.Gradient.createLinear(colors,ratios,x0,y0,x1,y1);
		this.attr("fill","url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib.Lambda.findIndex(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}) + ")");
		return this;
	}
	,beginRadialGradientFill: function(colors,ratios,fx,fy,fr,cx,cy,cr) {
		var g = svgexporter.Gradient.createRadial(colors,ratios,cx,cy,cr,fx,fy);
		this.attr("fill","url(#grad" + ((function(_e) {
			return function(f) {
				return stdlib.Lambda.findIndex(_e,f);
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
	,__class__: svgexporter.ShapePathsRender
};
svgexporter.SvgExporter = function(library) {
	this.shapePaths = new haxe.ds.ObjectMap();
	this.layerItems = new haxe.ds.ObjectMap();
	this.shapeExporter = new svgexporter.ShapeExporter();
	this.library = library;
};
svgexporter.SvgExporter.__name__ = true;
svgexporter.SvgExporter.asInstance = function(element) {
	return element;
};
svgexporter.SvgExporter.prototype = {
	'export': function(xml) {
		var _g1 = this;
		var scene = this.library.getSceneItem();
		var items = this.library.getItems().filter(function(_) {
			return js.Boot.__instanceof(_,nanofl.engine.libraryitems.MovieClipItem);
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
					if(js.Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) this.exportExistShapeElement(element,null,xml); else if(js.Boot.__instanceof(element,nanofl.engine.elements.Instance) && js.Boot.__instanceof(element.symbol,nanofl.engine.libraryitems.MovieClipItem)) nanofl.engine.MovieClipItemTools.findShapes(element.symbol,false,element.matrix,function(shape,e) {
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
		if(js.Boot.__instanceof(element,nanofl.engine.elements.Instance)) {
			var instance = element;
			xml.begin("use");
			xml.attr("xlink:href","#" + instance.symbol.namePath);
			this.exportMatrix(instance.matrix,xml);
			xml.end();
		} else if(js.Boot.__instanceof(element,nanofl.engine.elements.GroupElement)) {
			var group = element;
			var _g = 0;
			var _g1 = group.getChildren();
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				this.exportElement(e,xml);
			}
		} else if(js.Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) {
			if(this.shapePaths.h.__keys__[element.__id__] != null) this.exportExistShapeElement(element,null,xml); else this.shapeExporter["export"](null,element,xml);
		} else console.log("Unsupported element: " + element.toString());
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
	,__class__: svgexporter.SvgExporter
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
SvgExporterPlugin.embeddedIcon = "\r\niVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC\r\n5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/Q\r\naKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lI\r\noqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy\r\n5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkN\r\nAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne\r\n8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQ\r\nTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2\r\nNu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMm\r\nDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXx\r\nCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRg\r\nT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8\r\ndtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz\r\n9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gH\r\nue+ALxPHGYEAAAAASUVORK5CYII=\r\n";
haxe.ds.ObjectMap.count = 0;
SvgExporterPlugin.main();
})();
