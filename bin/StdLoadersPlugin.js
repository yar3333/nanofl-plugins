(function () { "use strict";
var BitmapLoaderPlugin = function() {
	this.priority = 100;
	this.name = "BitmapLoader";
};
BitmapLoaderPlugin.__interfaces__ = [nanofl.ide.plugins.ILoaderPlugin];
BitmapLoaderPlugin.prototype = {
	load: function(files) {
		var r = new Array();
		var $it0 = files.iterator();
		while( $it0.hasNext() ) {
			var file = $it0.next();
			var ext = haxe.io.Path.extension(file.path);
			if(HxOverrides.indexOf(BitmapLoaderPlugin.extensions,ext,0) >= 0) {
				var namePath = [haxe.io.Path.withoutExtension(file.path)];
				if(!Lambda.exists(r,(function(namePath) {
					return function(item) {
						return item.namePath == namePath[0];
					};
				})(namePath))) {
					var item1 = new nanofl.engine.libraryitems.BitmapItem(namePath[0],ext);
					var xmlFile = files.get(namePath[0] + ".bitmap");
					if(xmlFile != null && xmlFile.getXml() != null) item1.loadProperties(xmlFile.getXml().children[0]);
					r.push(item1);
				}
				file.exclude();
			}
		}
		return r;
	}
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var FontLoaderPlugin = function() {
	this.priority = 400;
	this.name = "FontLoader";
};
FontLoaderPlugin.__interfaces__ = [nanofl.ide.plugins.ILoaderPlugin];
FontLoaderPlugin.prototype = {
	load: function(files) {
		var r = new Array();
		var $it0 = files.iterator();
		while( $it0.hasNext() ) {
			var file = $it0.next();
			if(haxe.io.Path.extension(file.path) == "font") {
				var namePath = [haxe.io.Path.withoutExtension(file.path)];
				if(!Lambda.exists(r,(function(namePath) {
					return function(item) {
						return item.namePath == namePath[0];
					};
				})(namePath))) {
					var xml = file.getXml();
					if(xml != null) r.push(nanofl.engine.libraryitems.FontItem.parse(namePath[0],xml.children[0]));
				}
				file.exclude();
			}
		}
		return r;
	}
};
var HxOverrides = function() { };
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
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var IMap = function() { };
var MovieClipLoaderPlugin = function() {
	this.priority = 200;
	this.name = "MovieClipLoader";
};
MovieClipLoaderPlugin.__interfaces__ = [nanofl.ide.plugins.ILoaderPlugin];
MovieClipLoaderPlugin.prototype = {
	load: function(files) {
		var r = new Array();
		var $it0 = files.iterator();
		while( $it0.hasNext() ) {
			var file = $it0.next();
			if(haxe.io.Path.extension(file.path) == "movieclip") {
				var namePath = [haxe.io.Path.withoutExtension(file.path)];
				if(!Lambda.exists(r,(function(namePath) {
					return function(item) {
						return item.namePath == namePath[0];
					};
				})(namePath))) {
					var xml = file.getXml();
					if(xml != null) r.push(nanofl.engine.libraryitems.MovieClipItem.parse(namePath[0],xml.children[0]));
				}
				file.exclude();
			}
		}
		return r;
	}
};
var SoundLoaderPlugin = function() {
	this.priority = 300;
	this.name = "SoundLoader";
};
SoundLoaderPlugin.__interfaces__ = [nanofl.ide.plugins.ILoaderPlugin];
SoundLoaderPlugin.prototype = {
	load: function(files) {
		var r = new Array();
		var $it0 = files.iterator();
		while( $it0.hasNext() ) {
			var file = $it0.next();
			var ext = haxe.io.Path.extension(file.path);
			if(HxOverrides.indexOf(SoundLoaderPlugin.extensions,ext,0) >= 0) {
				var namePath = [haxe.io.Path.withoutExtension(file.path)];
				if(!Lambda.exists(r,(function(namePath) {
					return function(item) {
						return item.namePath == namePath[0];
					};
				})(namePath))) {
					var item1 = new nanofl.engine.libraryitems.SoundItem(namePath[0],ext);
					var xmlFile;
					var key = haxe.io.Path.join([haxe.io.Path.directory(file.path),namePath[0] + ".sound"]);
					xmlFile = files.get(key);
					if(xmlFile != null && xmlFile.getXml() != null) {
						item1.loadProperties(xmlFile.getXml().children[0]);
						r.push(item1);
					}
				}
				file.exclude();
			}
		}
		return r;
	}
};
var SpriteLoaderPlugin = function() {
	this.priority = 500;
	this.name = "SpriteLoader";
};
SpriteLoaderPlugin.__interfaces__ = [nanofl.ide.plugins.ILoaderPlugin];
SpriteLoaderPlugin.prototype = {
	load: function(files) {
		var r = new Array();
		var $it0 = files.iterator();
		while( $it0.hasNext() ) {
			var file = $it0.next();
			if(file.excluded) continue;
			if(haxe.io.Path.extension(file.path) == "json") {
				var namePath = [haxe.io.Path.withoutExtension(file.path)];
				if(!Lambda.exists(r,(function(namePath) {
					return function(item) {
						return item.namePath == namePath[0];
					};
				})(namePath))) {
					var json = [file.getJson()];
					if(json[0] != null && json[0].frames != null && json[0].images != null) {
						r.push(new nanofl.engine.libraryitems.SpriteItem(namePath[0],json[0].frames.map((function(json) {
							return function(frame) {
								return { image : json[0].images[frame[4]], x : frame[0], y : frame[1], width : frame[2], height : frame[3], regX : frame[5], regY : frame[6]};
							};
						})(json))));
						var _g = 0;
						var _g1 = json[0].images;
						while(_g < _g1.length) {
							var image = _g1[_g];
							++_g;
							var p = haxe.io.Path.join([haxe.io.Path.directory(namePath[0]),image]);
							if(files.exists(p)) files.get(p).exclude();
						}
						file.exclude();
					}
				}
			}
		}
		return r;
	}
};
var StdLoadersPlugin = function() { };
StdLoadersPlugin.main = function() {
	nanofl.engine.Plugins.registerLoader(new BitmapLoaderPlugin());
	nanofl.engine.Plugins.registerLoader(new FontLoaderPlugin());
	nanofl.engine.Plugins.registerLoader(new SoundLoaderPlugin());
	nanofl.engine.Plugins.registerLoader(new MovieClipLoaderPlugin());
	nanofl.engine.Plugins.registerLoader(new SpriteLoaderPlugin());
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	get: function(key) {
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
haxe.io.Path.extension = function(path) {
	var s = new haxe.io.Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
haxe.io.Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe.io.Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe.io.Path.normalize(path);
};
haxe.io.Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var src;
	var parts;
	var token;
	src = path.split(slash);
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		token = src[i];
		if(token == "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	return result;
};
haxe.io.Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe.io.Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
BitmapLoaderPlugin.extensions = ["jpg","jpeg","png","gif","svg"];
SoundLoaderPlugin.extensions = ["ogg","mp3","wav"];
StdLoadersPlugin.main();
})();
