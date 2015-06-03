(function () { "use strict";
var HxOverrides = function() { };
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
var ImageExporter = function() { };
ImageExporter.run = function(type,fileApi,destFilePath,documentProperties,library) {
	var instance = library.getSceneInstance();
	var scene = instance.createDisplayObject(null);
	nanofl.DisplayObjectTools.cache(scene);
	var canvas = window.document.createElement("canvas");
	canvas.width = documentProperties.width;
	canvas.height = documentProperties.height;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = documentProperties.backgroundColor;
	ctx.fillRect(0,0,documentProperties.width,documentProperties.height);
	scene.draw(ctx);
	var data = canvas.toDataURL(type).split(",")[1];
	fileApi.saveBinary(destFilePath,haxe.crypto.Base64.decode(data).getData());
	return true;
};
var JpegImageExporterPlugin = function() {
	this.fileDefaultExtension = "jpg";
	this.fileFilterExtensions = ["jpg","jpeg"];
	this.fileFilterDescription = "JPEG Image (*.jpg)";
	this.menuItemIcon = "";
	this.menuItemName = "JPEG Image (*.jpg)";
	this.name = "JpegImageExporter";
};
JpegImageExporterPlugin.__interfaces__ = [nanofl.ide.plugins.IExporterPlugin];
JpegImageExporterPlugin.prototype = {
	exportDocument: function(fileApi,srcFilePath,destFilePath,documentProperties,library) {
		ImageExporter.run("image/jpeg",fileApi,destFilePath,documentProperties,library);
		return true;
	}
};
var Main = function() { };
Main.main = function() {
	nanofl.engine.Plugins.registerExporter(new PngImageExporterPlugin());
	nanofl.engine.Plugins.registerExporter(new JpegImageExporterPlugin());
};
var IMap = function() { };
var PngImageExporterPlugin = function() {
	this.fileDefaultExtension = "png";
	this.fileFilterExtensions = ["png"];
	this.fileFilterDescription = "PNG Image (*.png)";
	this.menuItemIcon = "";
	this.menuItemName = "PNG Image (*.png)";
	this.name = "PngImageExporter";
};
PngImageExporterPlugin.__interfaces__ = [nanofl.ide.plugins.IExporterPlugin];
PngImageExporterPlugin.prototype = {
	exportDocument: function(fileApi,srcFilePath,destFilePath,documentProperties,library) {
		ImageExporter.run("image/png",fileApi,destFilePath,documentProperties,library);
		return true;
	}
};
var StringTools = function() { };
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var haxe = {};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getData: function() {
		return this.b;
	}
};
haxe.crypto = {};
haxe.crypto.Base64 = function() { };
haxe.crypto.Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
haxe.crypto.BaseCode.prototype = {
	initTable: function() {
		var tbl = new Array();
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe.io.Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw "BaseCode : invalid encoded char";
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.io.Eof = function() { };
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
haxe.crypto.Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe.crypto.Base64.BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.CHARS);
Main.main();
})();
