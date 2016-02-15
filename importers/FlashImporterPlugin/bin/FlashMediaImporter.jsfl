(function (console) { "use strict";
var FlashMediaImporter = function() { };
FlashMediaImporter.__name__ = true;
FlashMediaImporter.main = function() {
	var srcFilePath = "file:///" + StringTools.replace(FlashMediaImporter.SRC_FILE,"\\","/");
	var destLibraryDir = "file:///" + haxe_io_Path.addTrailingSlash(StringTools.replace(FlashMediaImporter.DEST_DIR,"\\","/")) + "library";
	FlashMediaImporter.log("Import media from '" + srcFilePath + "' to '" + destLibraryDir + "' directory:");
	var doc = fl.openDocument(srcFilePath);
	FLfile.createFolder(destLibraryDir);
	var _g1 = 0;
	var _g = doc.library.items.length;
	while(_g1 < _g) {
		var i = _g1++;
		var item = doc.library.items[i];
		if(item != null) {
			var _g2 = item.itemType;
			switch(_g2) {
			case "bitmap":
				FlashMediaImporter.log("  Import: " + item.name + " / " + item.itemType + " / " + item.originalCompressionType);
				FlashMediaImporter.importBitmap(destLibraryDir,item);
				break;
			case "movie clip":case "graphic":case "button":case "folder":
				break;
			case "sound":
				FlashMediaImporter.log("  Import: " + item.name + " / " + item.itemType + " / " + item.originalCompressionType);
				FlashMediaImporter.importSound(destLibraryDir,item);
				break;
			default:
				FlashMediaImporter.log("    Skip: " + item.name + " / " + item.itemType);
			}
		}
	}
	doc.close(false);
	FlashMediaImporter.log("Done.");
	FLfile.write("file:///" + StringTools.replace(FlashMediaImporter.DEST_DIR,"\\","/") + "/.done-import-media","");
};
FlashMediaImporter.importBitmap = function(destLibraryDir,item) {
	var savePath = destLibraryDir + "/" + item.name + ".png";
	if(!FLfile.exists(savePath)) {
		FLfile.createFolder(haxe_io_Path.directory(savePath));
		var temp = fl.createDocument();
		temp.addItem({ x : 0, y : 0},item);
		var image = temp.getTimeline().layers[0].frames[0].elements[0];
		temp.width = image.getBits().width;
		temp.height = image.getBits().height;
		image.x = 0;
		image.y = 0;
		image.setTransformationPoint({ x : 0, y : 0});
		image.width = temp.width;
		image.height = temp.height;
		temp.exportPNG(savePath,false,true);
		temp.close(false);
	}
	return true;
};
FlashMediaImporter.importSound = function(destLibraryDir,item) {
	var savePath;
	savePath = destLibraryDir + "/" + haxe_io_Path.withoutExtension(item.name) + (item.originalCompressionType == "RAW"?".wav":".mp3");
	if(!FLfile.exists(savePath)) {
		FLfile.createFolder(haxe_io_Path.directory(savePath));
		item.exportToFile(savePath);
	}
	return true;
};
FlashMediaImporter.log = function(s) {
	fl.trace(s);
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
Math.__name__ = true;
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
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
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	fl.trace(msg);
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
String.__name__ = true;
Array.__name__ = true;
haxe_Log.trace = function(v,infos) {
	fl.trace(v);
};
FlashMediaImporter.SRC_FILE = "{SRC_FILE}";
FlashMediaImporter.DEST_DIR = "{DEST_DIR}";
FlashMediaImporter.TEMP_MC_NAME = "__temp_fme";
FlashMediaImporter.main();
})(typeof console != "undefined" ? console : {log:function(){}});
