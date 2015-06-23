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
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
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
var Slambda = function() { };
Slambda.__name__ = ["Slambda"];
var Slambda1 = function() { };
Slambda1.__name__ = ["Slambda1"];
var Slambda2 = function() { };
Slambda2.__name__ = ["Slambda2"];
var Slambda3 = function() { };
Slambda3.__name__ = ["Slambda3"];
var Slambda4 = function() { };
Slambda4.__name__ = ["Slambda4"];
var _Slambda = {};
_Slambda.SlambdaMacro = function() { };
_Slambda.SlambdaMacro.__name__ = ["_Slambda","SlambdaMacro"];
_Slambda.SlambdaMacro.f = function(fn,exprs,expectedRest) {
	var extension = exprs != null && exprs.length > 0;
	if(!extension) exprs = [fn];
	if(exprs.length - 1 != expectedRest) haxe.macro.Context.error("Invalid number of rest arguments, " + expectedRest + " expected.",exprs[exprs.length - 1].pos);
	var addExtension = function(e) {
		if(extension) return { expr : haxe.macro.ExprDef.ECall(fn,[e]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 1655, max : 1662}}; else return e;
	};
	var restError = "Too many rest arguments, max 4 supported.";
	var e1 = exprs.shift();
	{
		var _g = e1.expr;
		switch(_g[1]) {
		case 2:
			switch(_g[2][1]) {
			case 22:
				break;
			default:
				var params = new haxe.ds.StringMap();
				var findParams;
				var findParams1 = null;
				findParams1 = function(e2) {
					{
						var _g1 = e2.expr;
						switch(_g1[1]) {
						case 0:
							switch(_g1[2][1]) {
							case 3:
								var v = _g1[2][2];
								if(v == "_" || v == "_1" || v == "_2" || v == "_3" || v == "_4") params.set(v,e2); else haxe.macro.ExprTools.iter(e2,findParams1);
								break;
							default:
								haxe.macro.ExprTools.iter(e2,findParams1);
							}
							break;
						default:
							haxe.macro.ExprTools.iter(e2,findParams1);
						}
					}
				};
				findParams = findParams1;
				haxe.macro.ExprTools.iter(e1,findParams);
				var paramArray;
				var _g11 = [];
				var $it0 = params.iterator();
				while( $it0.hasNext() ) {
					var p = $it0.next();
					_g11.push(p);
				}
				paramArray = _g11;
				if(paramArray.length == 0) haxe.macro.Context.error("No parameters found in lambda expression. Use _ for one parameter, _1 _2 for two, etc.",e1.pos); else {
					paramArray.sort(function(x,y) {
						if(haxe.macro.ExprTools.toString(x) > haxe.macro.ExprTools.toString(y)) return 1; else return 0;
					});
					e1 = { expr : haxe.macro.ExprDef.EBinop(haxe.macro.Binop.OpArrow,{ expr : haxe.macro.ExprDef.EArrayDecl(paramArray), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 2500, max : 2512}},e1), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 2500, max : 2518}};
				}
			}
			break;
		default:
			var params = new haxe.ds.StringMap();
			var findParams;
			var findParams1 = null;
			findParams1 = function(e2) {
				{
					var _g1 = e2.expr;
					switch(_g1[1]) {
					case 0:
						switch(_g1[2][1]) {
						case 3:
							var v = _g1[2][2];
							if(v == "_" || v == "_1" || v == "_2" || v == "_3" || v == "_4") params.set(v,e2); else haxe.macro.ExprTools.iter(e2,findParams1);
							break;
						default:
							haxe.macro.ExprTools.iter(e2,findParams1);
						}
						break;
					default:
						haxe.macro.ExprTools.iter(e2,findParams1);
					}
				}
			};
			findParams = findParams1;
			haxe.macro.ExprTools.iter(e1,findParams);
			var paramArray;
			var _g11 = [];
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				_g11.push(p);
			}
			paramArray = _g11;
			if(paramArray.length == 0) haxe.macro.Context.error("No parameters found in lambda expression. Use _ for one parameter, _1 _2 for two, etc.",e1.pos); else {
				paramArray.sort(function(x,y) {
					if(haxe.macro.ExprTools.toString(x) > haxe.macro.ExprTools.toString(y)) return 1; else return 0;
				});
				e1 = { expr : haxe.macro.ExprDef.EBinop(haxe.macro.Binop.OpArrow,{ expr : haxe.macro.ExprDef.EArrayDecl(paramArray), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 2500, max : 2512}},e1), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 2500, max : 2518}};
			}
		}
	}
	{
		var _g2 = e1.expr;
		switch(_g2[1]) {
		case 2:
			switch(_g2[2][1]) {
			case 22:
				var e21 = _g2[4];
				var e11 = _g2[3];
				var args;
				{
					var _g12 = e11.expr;
					switch(_g12[1]) {
					case 0:
						switch(_g12[2][1]) {
						case 3:
							var v1 = _g12[2][2];
							args = [v1];
							break;
						default:
							args = haxe.macro.Context.error("Invalid lambda argument, use x => ... or [x,y] => ...",e11.pos);
						}
						break;
					case 6:
						var values = _g12[2];
						var _g21 = [];
						var _g3 = 0;
						while(_g3 < values.length) {
							var v2 = values[_g3];
							++_g3;
							_g21.push(haxe.macro.ExprTools.toString(v2));
						}
						args = _g21;
						break;
					default:
						args = haxe.macro.Context.error("Invalid lambda argument, use x => ... or [x,y] => ...",e11.pos);
					}
				}
				var _g13 = args.length;
				switch(_g13) {
				case 1:
					var a = args[0];
					var _g22 = exprs.length;
					switch(_g22) {
					case 0:
						return addExtension({ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3081, max : 3091}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3068, max : 3091}});
					case 1:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3132, max : 3142}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3119, max : 3142}},exprs[0]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3115, max : 3156}};
					case 2:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3196, max : 3206}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3183, max : 3206}},exprs[0],exprs[1]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3179, max : 3233}};
					case 3:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3273, max : 3283}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3260, max : 3283}},exprs[0],exprs[1],exprs[2]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3256, max : 3323}};
					case 4:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3363, max : 3373}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3350, max : 3373}},exprs[0],exprs[1],exprs[2],exprs[3]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3346, max : 3426}};
					default:
						return haxe.macro.Context.error(restError,exprs[exprs.length - 1].pos);
					}
					break;
				case 2:
					var a1 = args[0];
					var b = args[1];
					var _g23 = exprs.length;
					switch(_g23) {
					case 0:
						return addExtension({ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a1, opt : false, type : null},{ name : b, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3642, max : 3652}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3625, max : 3652}});
					case 1:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a1, opt : false, type : null},{ name : b, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3697, max : 3707}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3680, max : 3707}},exprs[0]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3676, max : 3721}};
					case 2:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a1, opt : false, type : null},{ name : b, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3765, max : 3775}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3748, max : 3775}},exprs[0],exprs[1]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3744, max : 3802}};
					case 3:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a1, opt : false, type : null},{ name : b, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3846, max : 3856}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3829, max : 3856}},exprs[0],exprs[1],exprs[2]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3825, max : 3896}};
					case 4:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a1, opt : false, type : null},{ name : b, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3940, max : 3950}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3923, max : 3950}},exprs[0],exprs[1],exprs[2],exprs[3]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 3919, max : 4003}};
					default:
						return haxe.macro.Context.error(restError,exprs[exprs.length - 1].pos);
					}
					break;
				case 3:
					var a2 = args[0];
					var b1 = args[1];
					var c = args[2];
					var _g24 = exprs.length;
					switch(_g24) {
					case 0:
						return addExtension({ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a2, opt : false, type : null},{ name : b1, opt : false, type : null},{ name : c, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4236, max : 4246}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4215, max : 4246}});
					case 1:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a2, opt : false, type : null},{ name : b1, opt : false, type : null},{ name : c, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4295, max : 4305}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4274, max : 4305}},exprs[0]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4270, max : 4319}};
					case 2:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a2, opt : false, type : null},{ name : b1, opt : false, type : null},{ name : c, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4367, max : 4377}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4346, max : 4377}},exprs[0],exprs[1]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4342, max : 4404}};
					case 3:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a2, opt : false, type : null},{ name : b1, opt : false, type : null},{ name : c, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4452, max : 4462}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4431, max : 4462}},exprs[0],exprs[1],exprs[2]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4427, max : 4502}};
					case 4:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a2, opt : false, type : null},{ name : b1, opt : false, type : null},{ name : c, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4550, max : 4560}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4529, max : 4560}},exprs[0],exprs[1],exprs[2],exprs[3]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4525, max : 4613}};
					default:
						return haxe.macro.Context.error(restError,exprs[exprs.length - 1].pos);
					}
					break;
				case 4:
					var a3 = args[0];
					var b2 = args[1];
					var c1 = args[2];
					var d = args[3];
					var _g25 = exprs.length;
					switch(_g25) {
					case 0:
						return addExtension({ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a3, opt : false, type : null},{ name : b2, opt : false, type : null},{ name : c1, opt : false, type : null},{ name : d, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4863, max : 4873}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4838, max : 4873}});
					case 1:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a3, opt : false, type : null},{ name : b2, opt : false, type : null},{ name : c1, opt : false, type : null},{ name : d, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4926, max : 4936}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4901, max : 4936}},exprs[0]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4897, max : 4950}};
					case 2:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a3, opt : false, type : null},{ name : b2, opt : false, type : null},{ name : c1, opt : false, type : null},{ name : d, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5002, max : 5012}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4977, max : 5012}},exprs[0],exprs[1]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 4973, max : 5039}};
					case 3:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a3, opt : false, type : null},{ name : b2, opt : false, type : null},{ name : c1, opt : false, type : null},{ name : d, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5091, max : 5101}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5066, max : 5101}},exprs[0],exprs[1],exprs[2]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5062, max : 5141}};
					case 4:
						return { expr : haxe.macro.ExprDef.ECall(fn,[{ expr : haxe.macro.ExprDef.EFunction(null,{ args : [{ name : a3, opt : false, type : null},{ name : b2, opt : false, type : null},{ name : c1, opt : false, type : null},{ name : d, opt : false, type : null}], ret : null, expr : { expr : haxe.macro.ExprDef.EReturn(e21), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5193, max : 5203}}, params : []}), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5168, max : 5203}},exprs[0],exprs[1],exprs[2],exprs[3]]), pos : { file : "d:\\MyProg\\_tools\\motion-twin\\haxe\\lib\\slambda/git/src/Slambda.hx", min : 5164, max : 5256}};
					default:
						return haxe.macro.Context.error(restError,exprs[exprs.length - 1].pos);
					}
					break;
				default:
					return haxe.macro.Context.error("Too many lambda arguments, max 4 supported.",e11.pos);
				}
				break;
			default:
				return haxe.macro.Context.error("Lambda expression not in the form x => ...",e1.pos);
			}
			break;
		default:
			return haxe.macro.Context.error("Lambda expression not in the form x => ...",e1.pos);
		}
	}
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
var SvgExporterPlugin = function() {
	this.fileFilterExtensions = ["svg"];
	this.fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	this.menuItemIcon = "url(data:image/png;base64," + StringTools.replace(StringTools.replace(SvgExporterPlugin.embeddedIcon,"\r",""),"\n","") + ")";
	this.menuItemName = "Scalable Vector Graphics (*.svg)";
	this.name = "SvgExporter";
};
SvgExporterPlugin.__name__ = ["SvgExporterPlugin"];
SvgExporterPlugin.__interfaces__ = [nanofl.ide.plugins.IExporterPlugin];
SvgExporterPlugin.main = function() {
	nanofl.engine.Plugins.registerExporter(new SvgExporterPlugin());
};
SvgExporterPlugin.prototype = {
	exportDocument: function(fileApi,srcFilePath,destFilePath,documentProperties,library) {
		console.log("Plugin.exportDocument " + srcFilePath + " => " + destFilePath);
		var xml = new nanofl.engine.XmlWriter();
		xml.begin("svg").attr("xmlns","http://www.w3.org/2000/svg").attr("width",documentProperties.width).attr("height",documentProperties.height).attr("xmlns:xlink","http://www.w3.org/1999/xlink");
		new svgexporter.SvgExporter(library)["export"](xml);
		xml.end();
		fileApi.saveContent(destFilePath,xml.toString());
		return true;
	}
	,__class__: SvgExporterPlugin
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
var haxe = {};
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
haxe.macro = {};
haxe.macro.Context = function() { };
haxe.macro.Context.__name__ = ["haxe","macro","Context"];
haxe.macro.Constant = { __ename__ : ["haxe","macro","Constant"], __constructs__ : ["CInt","CFloat","CString","CIdent","CRegexp"] };
haxe.macro.Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Binop = { __ename__ : ["haxe","macro","Binop"], __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
haxe.macro.Binop.OpAdd = ["OpAdd",0];
haxe.macro.Binop.OpAdd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMult = ["OpMult",1];
haxe.macro.Binop.OpMult.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpDiv = ["OpDiv",2];
haxe.macro.Binop.OpDiv.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpSub = ["OpSub",3];
haxe.macro.Binop.OpSub.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssign = ["OpAssign",4];
haxe.macro.Binop.OpAssign.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpEq = ["OpEq",5];
haxe.macro.Binop.OpEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpNotEq = ["OpNotEq",6];
haxe.macro.Binop.OpNotEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGt = ["OpGt",7];
haxe.macro.Binop.OpGt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGte = ["OpGte",8];
haxe.macro.Binop.OpGte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLt = ["OpLt",9];
haxe.macro.Binop.OpLt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLte = ["OpLte",10];
haxe.macro.Binop.OpLte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAnd = ["OpAnd",11];
haxe.macro.Binop.OpAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpOr = ["OpOr",12];
haxe.macro.Binop.OpOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpXor = ["OpXor",13];
haxe.macro.Binop.OpXor.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe.macro.Binop.OpBoolAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolOr = ["OpBoolOr",15];
haxe.macro.Binop.OpBoolOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShl = ["OpShl",16];
haxe.macro.Binop.OpShl.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShr = ["OpShr",17];
haxe.macro.Binop.OpShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpUShr = ["OpUShr",18];
haxe.macro.Binop.OpUShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMod = ["OpMod",19];
haxe.macro.Binop.OpMod.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe.macro.Binop; return $x; };
haxe.macro.Binop.OpInterval = ["OpInterval",21];
haxe.macro.Binop.OpInterval.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpArrow = ["OpArrow",22];
haxe.macro.Binop.OpArrow.__enum__ = haxe.macro.Binop;
haxe.macro.Unop = { __ename__ : ["haxe","macro","Unop"], __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
haxe.macro.Unop.OpIncrement = ["OpIncrement",0];
haxe.macro.Unop.OpIncrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpDecrement = ["OpDecrement",1];
haxe.macro.Unop.OpDecrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNot = ["OpNot",2];
haxe.macro.Unop.OpNot.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNeg = ["OpNeg",3];
haxe.macro.Unop.OpNeg.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNegBits = ["OpNegBits",4];
haxe.macro.Unop.OpNegBits.__enum__ = haxe.macro.Unop;
haxe.macro.ExprDef = { __ename__ : ["haxe","macro","ExprDef"], __constructs__ : ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EMeta"] };
haxe.macro.ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",4,e]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",5,fields]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",6,values]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ECall = function(e,params) { var $x = ["ECall",7,e,params]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ENew = function(t,params) { var $x = ["ENew",8,t,params]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",9,op,postFix,e]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EVars = function(vars) { var $x = ["EVars",10,vars]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EFunction = function(name,f) { var $x = ["EFunction",11,name,f]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EBlock = function(exprs) { var $x = ["EBlock",12,exprs]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EFor = function(it,expr) { var $x = ["EFor",13,it,expr]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EIn = function(e1,e2) { var $x = ["EIn",14,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EBreak = ["EBreak",20];
haxe.macro.ExprDef.EBreak.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EContinue = ["EContinue",21];
haxe.macro.ExprDef.EContinue.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",28,e,t]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ExprDef.EMeta = function(s,e) { var $x = ["EMeta",29,s,e]; $x.__enum__ = haxe.macro.ExprDef; return $x; };
haxe.macro.ComplexType = { __ename__ : ["haxe","macro","ComplexType"], __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] };
haxe.macro.ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.TypeParam = { __ename__ : ["haxe","macro","TypeParam"], __constructs__ : ["TPType","TPExpr"] };
haxe.macro.TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe.macro.TypeParam; return $x; };
haxe.macro.TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = haxe.macro.TypeParam; return $x; };
haxe.macro.Access = { __ename__ : ["haxe","macro","Access"], __constructs__ : ["APublic","APrivate","AStatic","AOverride","ADynamic","AInline","AMacro"] };
haxe.macro.Access.APublic = ["APublic",0];
haxe.macro.Access.APublic.__enum__ = haxe.macro.Access;
haxe.macro.Access.APrivate = ["APrivate",1];
haxe.macro.Access.APrivate.__enum__ = haxe.macro.Access;
haxe.macro.Access.AStatic = ["AStatic",2];
haxe.macro.Access.AStatic.__enum__ = haxe.macro.Access;
haxe.macro.Access.AOverride = ["AOverride",3];
haxe.macro.Access.AOverride.__enum__ = haxe.macro.Access;
haxe.macro.Access.ADynamic = ["ADynamic",4];
haxe.macro.Access.ADynamic.__enum__ = haxe.macro.Access;
haxe.macro.Access.AInline = ["AInline",5];
haxe.macro.Access.AInline.__enum__ = haxe.macro.Access;
haxe.macro.Access.AMacro = ["AMacro",6];
haxe.macro.Access.AMacro.__enum__ = haxe.macro.Access;
haxe.macro.FieldType = { __ename__ : ["haxe","macro","FieldType"], __constructs__ : ["FVar","FFun","FProp"] };
haxe.macro.FieldType.FVar = function(t,e) { var $x = ["FVar",0,t,e]; $x.__enum__ = haxe.macro.FieldType; return $x; };
haxe.macro.FieldType.FFun = function(f) { var $x = ["FFun",1,f]; $x.__enum__ = haxe.macro.FieldType; return $x; };
haxe.macro.FieldType.FProp = function(get,set,t,e) { var $x = ["FProp",2,get,set,t,e]; $x.__enum__ = haxe.macro.FieldType; return $x; };
haxe.macro.ExprTools = function() { };
haxe.macro.ExprTools.__name__ = ["haxe","macro","ExprTools"];
haxe.macro.ExprTools.toString = function(e) {
	return new haxe.macro.Printer().printExpr(e);
};
haxe.macro.ExprTools.iter = function(e,f) {
	{
		var _g = e.expr;
		switch(_g[1]) {
		case 0:case 21:case 20:case 26:
			break;
		case 3:
			var e1 = _g[2];
			f(e1);
			break;
		case 4:
			var e1 = _g[2];
			f(e1);
			break;
		case 22:
			var e1 = _g[2];
			f(e1);
			break;
		case 23:
			var e1 = _g[2];
			f(e1);
			break;
		case 25:
			var e1 = _g[2];
			f(e1);
			break;
		case 28:
			var e1 = _g[2];
			f(e1);
			break;
		case 9:
			var e1 = _g[4];
			f(e1);
			break;
		case 24:
			var e1 = _g[2];
			f(e1);
			break;
		case 29:
			var e1 = _g[3];
			f(e1);
			break;
		case 1:
			var e2 = _g[3];
			var e11 = _g[2];
			f(e11);
			f(e2);
			break;
		case 16:
			var e2 = _g[3];
			var e11 = _g[2];
			f(e11);
			f(e2);
			break;
		case 2:
			var e2 = _g[4];
			var e11 = _g[3];
			f(e11);
			f(e2);
			break;
		case 13:
			var e2 = _g[3];
			var e11 = _g[2];
			f(e11);
			f(e2);
			break;
		case 14:
			var e2 = _g[3];
			var e11 = _g[2];
			f(e11);
			f(e2);
			break;
		case 10:
			var vl = _g[2];
			var _g1 = 0;
			while(_g1 < vl.length) {
				var v = vl[_g1];
				++_g1;
				haxe.macro.ExprTools.opt2(v.expr,f);
			}
			break;
		case 18:
			var cl = _g[3];
			var e3 = _g[2];
			f(e3);
			var _g11 = 0;
			while(_g11 < cl.length) {
				var c = cl[_g11];
				++_g11;
				f(c.expr);
			}
			break;
		case 27:
			var e31 = _g[4];
			var e21 = _g[3];
			var e12 = _g[2];
			f(e12);
			f(e21);
			if(e31 != null) f(e31);
			break;
		case 15:
			var e31 = _g[4];
			var e21 = _g[3];
			var e12 = _g[2];
			f(e12);
			f(e21);
			if(e31 != null) f(e31);
			break;
		case 6:
			var el = _g[2];
			haxe.macro.ExprArrayTools.iter(el,f);
			break;
		case 8:
			var el = _g[3];
			haxe.macro.ExprArrayTools.iter(el,f);
			break;
		case 12:
			var el = _g[2];
			haxe.macro.ExprArrayTools.iter(el,f);
			break;
		case 5:
			var fl = _g[2];
			var _g12 = 0;
			while(_g12 < fl.length) {
				var fd = fl[_g12];
				++_g12;
				f(fd.expr);
			}
			break;
		case 7:
			var el1 = _g[3];
			var e4 = _g[2];
			f(e4);
			haxe.macro.ExprArrayTools.iter(el1,f);
			break;
		case 19:
			var e5 = _g[2];
			if(e5 != null) f(e5);
			break;
		case 11:
			var func = _g[3];
			var _g13 = 0;
			var _g2 = func.args;
			while(_g13 < _g2.length) {
				var arg = _g2[_g13];
				++_g13;
				haxe.macro.ExprTools.opt2(arg.value,f);
			}
			haxe.macro.ExprTools.opt2(func.expr,f);
			break;
		case 17:
			var edef = _g[4];
			var cl1 = _g[3];
			var e6 = _g[2];
			f(e6);
			var _g14 = 0;
			while(_g14 < cl1.length) {
				var c1 = cl1[_g14];
				++_g14;
				haxe.macro.ExprArrayTools.iter(c1.values,f);
				haxe.macro.ExprTools.opt2(c1.guard,f);
				haxe.macro.ExprTools.opt2(c1.expr,f);
			}
			if(edef != null && edef.expr != null) f(edef);
			break;
		}
	}
};
haxe.macro.ExprTools.opt2 = function(e,f) {
	if(e != null) f(e);
};
haxe.macro.ExprArrayTools = function() { };
haxe.macro.ExprArrayTools.__name__ = ["haxe","macro","ExprArrayTools"];
haxe.macro.ExprArrayTools.iter = function(el,f) {
	var _g = 0;
	while(_g < el.length) {
		var e = el[_g];
		++_g;
		f(e);
	}
};
haxe.macro.Printer = function(tabString) {
	if(tabString == null) tabString = "\t";
	this.tabs = "";
	this.tabString = tabString;
};
haxe.macro.Printer.__name__ = ["haxe","macro","Printer"];
haxe.macro.Printer.prototype = {
	printUnop: function(op) {
		switch(op[1]) {
		case 0:
			return "++";
		case 1:
			return "--";
		case 2:
			return "!";
		case 3:
			return "-";
		case 4:
			return "~";
		}
	}
	,printBinop: function(op) {
		switch(op[1]) {
		case 0:
			return "+";
		case 1:
			return "*";
		case 2:
			return "/";
		case 3:
			return "-";
		case 4:
			return "=";
		case 5:
			return "==";
		case 6:
			return "!=";
		case 7:
			return ">";
		case 8:
			return ">=";
		case 9:
			return "<";
		case 10:
			return "<=";
		case 11:
			return "&";
		case 12:
			return "|";
		case 13:
			return "^";
		case 14:
			return "&&";
		case 15:
			return "||";
		case 16:
			return "<<";
		case 17:
			return ">>";
		case 18:
			return ">>>";
		case 19:
			return "%";
		case 21:
			return "...";
		case 22:
			return "=>";
		case 20:
			var op1 = op[2];
			return this.printBinop(op1) + "=";
		}
	}
	,printString: function(s) {
		return "\"" + s.split("\n").join("\\n").split("\t").join("\\t").split("'").join("\\'").split("\"").join("\\\"") + "\"";
	}
	,printConstant: function(c) {
		switch(c[1]) {
		case 2:
			var s = c[2];
			return this.printString(s);
		case 3:
			var s1 = c[2];
			return s1;
		case 0:
			var s1 = c[2];
			return s1;
		case 1:
			var s1 = c[2];
			return s1;
		case 4:
			var opt = c[3];
			var s2 = c[2];
			return "~/" + s2 + "/" + opt;
		}
	}
	,printTypeParam: function(param) {
		switch(param[1]) {
		case 0:
			var ct = param[2];
			return this.printComplexType(ct);
		case 1:
			var e = param[2];
			return this.printExpr(e);
		}
	}
	,printTypePath: function(tp) {
		return (tp.pack.length > 0?tp.pack.join(".") + ".":"") + tp.name + (tp.sub != null?"." + tp.sub:"") + (tp.params.length > 0?"<" + tp.params.map($bind(this,this.printTypeParam)).join(", ") + ">":"");
	}
	,printComplexType: function(ct) {
		switch(ct[1]) {
		case 0:
			var tp = ct[2];
			return this.printTypePath(tp);
		case 1:
			var ret = ct[3];
			var args = ct[2];
			return (args.length > 0?args.map($bind(this,this.printComplexType)).join(" -> "):"Void") + " -> " + this.printComplexType(ret);
		case 2:
			var fields = ct[2];
			return "{ " + ((function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					while(_g1 < fields.length) {
						var f = fields[_g1];
						++_g1;
						_g.push($this.printField(f) + "; ");
					}
				}
				$r = _g;
				return $r;
			}(this))).join("") + "}";
		case 3:
			var ct1 = ct[2];
			return "(" + this.printComplexType(ct1) + ")";
		case 5:
			var ct2 = ct[2];
			return "?" + this.printComplexType(ct2);
		case 4:
			var fields1 = ct[3];
			var tpl = ct[2];
			return "{> " + tpl.map($bind(this,this.printTypePath)).join(" >, ") + ", " + fields1.map($bind(this,this.printField)).join(", ") + " }";
		}
	}
	,printMetadata: function(meta) {
		return "@" + meta.name + (meta.params.length > 0?"(" + this.printExprs(meta.params,", ") + ")":"");
	}
	,printAccess: function(access) {
		switch(access[1]) {
		case 2:
			return "static";
		case 0:
			return "public";
		case 1:
			return "private";
		case 3:
			return "override";
		case 5:
			return "inline";
		case 4:
			return "dynamic";
		case 6:
			return "macro";
		}
	}
	,printField: function(field) {
		return (field.doc != null && field.doc != ""?"/**\n" + this.tabs + this.tabString + StringTools.replace(field.doc,"\n","\n" + this.tabs + this.tabString) + "\n" + this.tabs + "**/\n" + this.tabs:"") + (field.meta != null && field.meta.length > 0?field.meta.map($bind(this,this.printMetadata)).join("\n" + this.tabs) + ("\n" + this.tabs):"") + (field.access != null && field.access.length > 0?field.access.map($bind(this,this.printAccess)).join(" ") + " ":"") + (function($this) {
			var $r;
			var _g = field.kind;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 0:
					$r = (function($this) {
						var $r;
						var eo = _g[3];
						var t = _g[2];
						$r = "var " + field.name + $this.opt(t,$bind($this,$this.printComplexType)," : ") + $this.opt(eo,$bind($this,$this.printExpr)," = ");
						return $r;
					}($this));
					break;
				case 2:
					$r = (function($this) {
						var $r;
						var eo1 = _g[5];
						var t1 = _g[4];
						var set = _g[3];
						var get = _g[2];
						$r = "var " + field.name + "(" + get + ", " + set + ")" + $this.opt(t1,$bind($this,$this.printComplexType)," : ") + $this.opt(eo1,$bind($this,$this.printExpr)," = ");
						return $r;
					}($this));
					break;
				case 1:
					$r = (function($this) {
						var $r;
						var func = _g[2];
						$r = "function " + field.name + $this.printFunction(func);
						return $r;
					}($this));
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this));
	}
	,printTypeParamDecl: function(tpd) {
		return tpd.name + (tpd.params != null && tpd.params.length > 0?"<" + tpd.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">":"") + (tpd.constraints != null && tpd.constraints.length > 0?":(" + tpd.constraints.map($bind(this,this.printComplexType)).join(", ") + ")":"");
	}
	,printFunctionArg: function(arg) {
		return (arg.opt?"?":"") + arg.name + this.opt(arg.type,$bind(this,this.printComplexType),":") + this.opt(arg.value,$bind(this,this.printExpr)," = ");
	}
	,printFunction: function(func) {
		return (func.params.length > 0?"<" + func.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">":"") + "(" + func.args.map($bind(this,this.printFunctionArg)).join(", ") + ")" + this.opt(func.ret,$bind(this,this.printComplexType),":") + this.opt(func.expr,$bind(this,this.printExpr)," ");
	}
	,printVar: function(v) {
		return v.name + this.opt(v.type,$bind(this,this.printComplexType),":") + this.opt(v.expr,$bind(this,this.printExpr)," = ");
	}
	,printExpr: function(e) {
		var _g1 = this;
		if(e == null) return "#NULL"; else {
			var _g = e.expr;
			switch(_g[1]) {
			case 0:
				var c = _g[2];
				return this.printConstant(c);
			case 1:
				var e2 = _g[3];
				var e1 = _g[2];
				return "" + this.printExpr(e1) + "[" + this.printExpr(e2) + "]";
			case 2:
				var e21 = _g[4];
				var e11 = _g[3];
				var op = _g[2];
				return "" + this.printExpr(e11) + " " + this.printBinop(op) + " " + this.printExpr(e21);
			case 3:
				var n = _g[3];
				var e12 = _g[2];
				return "" + this.printExpr(e12) + "." + n;
			case 4:
				var e13 = _g[2];
				return "(" + this.printExpr(e13) + ")";
			case 5:
				var fl = _g[2];
				return "{ " + fl.map(function(fld) {
					return "" + fld.field + " : " + _g1.printExpr(fld.expr);
				}).join(", ") + " }";
			case 6:
				var el = _g[2];
				return "[" + this.printExprs(el,", ") + "]";
			case 7:
				var el1 = _g[3];
				var e14 = _g[2];
				return "" + this.printExpr(e14) + "(" + this.printExprs(el1,", ") + ")";
			case 8:
				var el2 = _g[3];
				var tp = _g[2];
				return "new " + this.printTypePath(tp) + "(" + this.printExprs(el2,", ") + ")";
			case 9:
				switch(_g[3]) {
				case true:
					var e15 = _g[4];
					var op1 = _g[2];
					return this.printExpr(e15) + this.printUnop(op1);
				case false:
					var e16 = _g[4];
					var op2 = _g[2];
					return this.printUnop(op2) + this.printExpr(e16);
				}
				break;
			case 11:
				var func = _g[3];
				var no = _g[2];
				if(no != null) return "function " + no + this.printFunction(func); else {
					var func1 = _g[3];
					return "function" + this.printFunction(func1);
				}
				break;
			case 10:
				var vl = _g[2];
				return "var " + vl.map($bind(this,this.printVar)).join(", ");
			case 12:
				var el3 = _g[2];
				switch(_g[2].length) {
				case 0:
					return "{ }";
				default:
					var old = this.tabs;
					this.tabs += this.tabString;
					var s = "{\n" + this.tabs + this.printExprs(el3,";\n" + this.tabs);
					this.tabs = old;
					return s + (";\n" + this.tabs + "}");
				}
				break;
			case 13:
				var e22 = _g[3];
				var e17 = _g[2];
				return "for (" + this.printExpr(e17) + ") " + this.printExpr(e22);
			case 14:
				var e23 = _g[3];
				var e18 = _g[2];
				return "" + this.printExpr(e18) + " in " + this.printExpr(e23);
			case 15:
				var eelse = _g[4];
				if(_g[4] == null) {
					var econd = _g[2];
					var eif = _g[3];
					return "if (" + this.printExpr(econd) + ") " + this.printExpr(eif);
				} else switch(_g[4]) {
				default:
					var econd1 = _g[2];
					var eif1 = _g[3];
					return "if (" + this.printExpr(econd1) + ") " + this.printExpr(eif1) + " else " + this.printExpr(eelse);
				}
				break;
			case 16:
				switch(_g[4]) {
				case true:
					var econd2 = _g[2];
					var e19 = _g[3];
					return "while (" + this.printExpr(econd2) + ") " + this.printExpr(e19);
				case false:
					var econd3 = _g[2];
					var e110 = _g[3];
					return "do " + this.printExpr(e110) + " while (" + this.printExpr(econd3) + ")";
				}
				break;
			case 17:
				var edef = _g[4];
				var cl = _g[3];
				var e111 = _g[2];
				var old1 = this.tabs;
				this.tabs += this.tabString;
				var s1 = "switch " + this.printExpr(e111) + " {\n" + this.tabs + cl.map(function(c1) {
					return "case " + _g1.printExprs(c1.values,", ") + (c1.guard != null?" if (" + _g1.printExpr(c1.guard) + "):":":") + (c1.expr != null?_g1.opt(c1.expr,$bind(_g1,_g1.printExpr)) + ";":"");
				}).join("\n" + this.tabs);
				if(edef != null) s1 += "\n" + this.tabs + "default:" + (edef.expr == null?"":this.printExpr(edef) + ";");
				this.tabs = old1;
				return s1 + ("\n" + this.tabs + "}");
			case 18:
				var cl1 = _g[3];
				var e112 = _g[2];
				return "try " + this.printExpr(e112) + cl1.map(function(c2) {
					return " catch(" + c2.name + ":" + _g1.printComplexType(c2.type) + ") " + _g1.printExpr(c2.expr);
				}).join("");
			case 19:
				var eo = _g[2];
				return "return" + this.opt(eo,$bind(this,this.printExpr)," ");
			case 20:
				return "break";
			case 21:
				return "continue";
			case 22:
				var e113 = _g[2];
				return "untyped " + this.printExpr(e113);
			case 23:
				var e114 = _g[2];
				return "throw " + this.printExpr(e114);
			case 24:
				var cto = _g[3];
				var e115 = _g[2];
				if(cto != null) return "cast(" + this.printExpr(e115) + ", " + this.printComplexType(cto) + ")"; else {
					var e116 = _g[2];
					return "cast " + this.printExpr(e116);
				}
				break;
			case 25:
				var e117 = _g[2];
				return "#DISPLAY(" + this.printExpr(e117) + ")";
			case 26:
				var tp1 = _g[2];
				return "#DISPLAY(" + this.printTypePath(tp1) + ")";
			case 27:
				var eelse1 = _g[4];
				var eif2 = _g[3];
				var econd4 = _g[2];
				return "" + this.printExpr(econd4) + " ? " + this.printExpr(eif2) + " : " + this.printExpr(eelse1);
			case 28:
				var ct = _g[3];
				var e118 = _g[2];
				return "(" + this.printExpr(e118) + " : " + this.printComplexType(ct) + ")";
			case 29:
				var e119 = _g[3];
				var meta = _g[2];
				return this.printMetadata(meta) + " " + this.printExpr(e119);
			}
		}
	}
	,printExprs: function(el,sep) {
		return el.map($bind(this,this.printExpr)).join(sep);
	}
	,opt: function(v,f,prefix) {
		if(prefix == null) prefix = "";
		if(v == null) return ""; else return prefix + f(v);
	}
	,__class__: haxe.macro.Printer
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
stdlib.Lambda = function() { };
stdlib.Lambda.__name__ = ["stdlib","Lambda"];
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
stdlib.Uuid = function() { };
stdlib.Uuid.__name__ = ["stdlib","Uuid"];
stdlib.Uuid.newUuid = function() {
	var timeF = new Date().getTime();
	var time = timeF - 268435455. * (timeF / 268435455 | 0) | 0;
	var uuid = stdlib.StringTools.hex(stdlib.Uuid.counter++,8) + "-" + StringTools.hex(timeF / 65536 | 0,8) + "-" + StringTools.hex(time % 65536,8) + "-" + stdlib.StringTools.hex(Std.random(65536),4) + "-" + stdlib.StringTools.hex(Std.random(65536),4);
	return uuid;
};
var svgexporter = {};
svgexporter.Gradient = function(tag,colors,ratios,attributes) {
	this.tag = tag;
	this.colors = colors;
	this.ratios = ratios;
	this.attributes = attributes;
	this.id = stdlib.Uuid.newUuid();
};
svgexporter.Gradient.__name__ = ["svgexporter","Gradient"];
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
	,write: function(xml) {
		xml.begin(this.tag);
		xml.attr("id",this.id);
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
svgexporter.ShapeExporter.__name__ = ["svgexporter","ShapeExporter"];
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
						this.gradients.push(g[0]);
						g[0].write(xml);
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
						this.gradients.push(g1[0]);
						g1[0].write(xml);
					}
					this.fills.push(polygon[0].fill);
				}
			}
		}
	}
	,exportPaths: function(shape,xml) {
		shape.draw(new svgexporter.ShapePathsRender(this.gradients,xml),null);
	}
	,__class__: svgexporter.ShapeExporter
};
svgexporter.ShapePathsRender = function(gradients,xml) {
	this.d = "";
	this.attributes = new Array();
	this.gradients = gradients;
	this.xml = xml;
};
svgexporter.ShapePathsRender.__name__ = ["svgexporter","ShapePathsRender"];
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
		this.attr("stroke","url(#" + ((function(_e) {
			return function(f) {
				return Lambda.find(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}).id + ")");
		return this;
	}
	,beginRadialGradientStroke: function(colors,ratios,fx,fy,fr,cx,cy,cr) {
		this.attr("fill","none");
		var g = svgexporter.Gradient.createRadial(colors,ratios,cx,cy,cr,fx,fy);
		this.attributes.push({ name : "stroke", value : "url(#" + ((function(_e) {
			return function(f) {
				return Lambda.find(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}).id + ")"});
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
		this.attr("fill","url(#" + ((function(_e) {
			return function(f) {
				return Lambda.find(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}).id + ")");
		return this;
	}
	,beginRadialGradientFill: function(colors,ratios,fx,fy,fr,cx,cy,cr) {
		var g = svgexporter.Gradient.createRadial(colors,ratios,cx,cy,cr,fx,fy);
		this.attr("fill","url(#" + ((function(_e) {
			return function(f) {
				return Lambda.find(_e,f);
			};
		})(this.gradients))(function(_) {
			return _.equ(g);
		}).id + ")");
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
		if(this.d != "") this.xml.begin("path",this.attributes).attr("d",this.d).end();
		this.attributes = [];
		this.d = "";
	}
	,attr: function(name,value,defaultValue) {
		if(value != defaultValue) this.attributes.push({ name : name, value : value});
	}
	,__class__: svgexporter.ShapePathsRender
};
svgexporter.SvgExporter = function(library) {
	this.shapeExporter = new svgexporter.ShapeExporter();
	this.library = library;
};
svgexporter.SvgExporter.__name__ = ["svgexporter","SvgExporter"];
svgexporter.SvgExporter.prototype = {
	'export': function(xml) {
		xml.begin("defs");
		var items = this.library.getItems();
		this.exportGradients(this.library.getSceneItem(),xml);
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			this.exportGradients(item,xml);
		}
		var _g1 = 0;
		while(_g1 < items.length) {
			var item1 = items[_g1];
			++_g1;
			this.exportItem(item1,xml);
		}
		xml.end();
		this.exportItem(this.library.getSceneItem(),xml);
	}
	,exportGradients: function(item,xml) {
		if(js.Boot.__instanceof(item,nanofl.engine.libraryitems.MovieClipItem)) {
			var _g = 0;
			var _g1 = item.layers;
			while(_g < _g1.length) {
				var layer = _g1[_g];
				++_g;
				if(layer.keyFrames.length > 0) {
					var shape = layer.keyFrames[0].getShape(false);
					if(shape != null) this.shapeExporter.exportGradients(shape,xml);
				}
			}
		}
	}
	,exportItem: function(item,xml) {
		if(js.Boot.__instanceof(item,nanofl.engine.libraryitems.MovieClipItem)) {
			var mc = item;
			xml.begin("g").attr("id",mc.namePath);
			var _g = 0;
			var _g1 = mc.layers;
			while(_g < _g1.length) {
				var layer = _g1[_g];
				++_g;
				xml.begin("g").attr("title",layer.name);
				if(layer.keyFrames.length > 0) {
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
			xml.end();
		} else console.log("Library item '" + item.namePath + "' of type '" + item.getType() + "' is not supported.");
	}
	,exportElement: function(element,xml) {
		if(js.Boot.__instanceof(element,nanofl.engine.elements.Instance)) {
			var instance = element;
			xml.begin("use").attr("transform","matrix(" + instance.matrix.toArray().join(",") + ")").attr("xlink:href","#" + instance.symbol.namePath).end();
		} else if(js.Boot.__instanceof(element,nanofl.engine.elements.GroupElement)) {
			var group = element;
			var _g = 0;
			var _g1 = group.getChildren();
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				this.exportElement(e,xml);
			}
		} else if(js.Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) this.shapeExporter.exportPaths(element,xml); else if(js.Boot.__instanceof(element,nanofl.engine.elements.TextElement)) {
			var text = element;
		} else console.log("Unsupported element: " + element.toString());
	}
	,__class__: svgexporter.SvgExporter
};
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
SvgExporterPlugin.embeddedIcon = "\r\niVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC\r\n5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/Q\r\naKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lI\r\noqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy\r\n5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkN\r\nAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne\r\n8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQ\r\nTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2\r\nNu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMm\r\nDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXx\r\nCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRg\r\nT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8\r\ndtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz\r\n9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gH\r\nue+ALxPHGYEAAAAASUVORK5CYII=\r\n";
stdlib.Uuid.counter = 0;
SvgExporterPlugin.main();
})();
