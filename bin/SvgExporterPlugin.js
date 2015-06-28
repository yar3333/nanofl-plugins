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
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
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
var _Slambda = {};
_Slambda.SlambdaMacro = function() { };
_Slambda.SlambdaMacro.__name__ = true;
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
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
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
haxe.macro.Context.__name__ = true;
haxe.macro.Constant = { __ename__ : true, __constructs__ : ["CInt","CFloat","CString","CIdent","CRegexp"] };
haxe.macro.Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = haxe.macro.Constant; return $x; };
haxe.macro.Binop = { __ename__ : true, __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
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
haxe.macro.Unop = { __ename__ : true, __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
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
haxe.macro.ExprDef = { __ename__ : true, __constructs__ : ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EMeta"] };
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
haxe.macro.ComplexType = { __ename__ : true, __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] };
haxe.macro.ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe.macro.ComplexType; return $x; };
haxe.macro.TypeParam = { __ename__ : true, __constructs__ : ["TPType","TPExpr"] };
haxe.macro.TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe.macro.TypeParam; return $x; };
haxe.macro.TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = haxe.macro.TypeParam; return $x; };
haxe.macro.Access = { __ename__ : true, __constructs__ : ["APublic","APrivate","AStatic","AOverride","ADynamic","AInline","AMacro"] };
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
haxe.macro.FieldType = { __ename__ : true, __constructs__ : ["FVar","FFun","FProp"] };
haxe.macro.FieldType.FVar = function(t,e) { var $x = ["FVar",0,t,e]; $x.__enum__ = haxe.macro.FieldType; return $x; };
haxe.macro.FieldType.FFun = function(f) { var $x = ["FFun",1,f]; $x.__enum__ = haxe.macro.FieldType; return $x; };
haxe.macro.FieldType.FProp = function(get,set,t,e) { var $x = ["FProp",2,get,set,t,e]; $x.__enum__ = haxe.macro.FieldType; return $x; };
haxe.macro.ExprTools = function() { };
haxe.macro.ExprTools.__name__ = true;
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
haxe.macro.ExprArrayTools.__name__ = true;
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
haxe.macro.Printer.__name__ = true;
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
			nanofl.ide.MovieClipItemTools.findShapes(item1,false,null,function(shape1,e) {
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
					if(js.Boot.__instanceof(element,nanofl.engine.elements.ShapeElement)) this.exportExistShapeElement(element,null,xml); else if(js.Boot.__instanceof(element,nanofl.engine.elements.Instance) && js.Boot.__instanceof(element.symbol,nanofl.engine.libraryitems.MovieClipItem)) nanofl.ide.MovieClipItemTools.findShapes(element.symbol,false,element.matrix,function(shape,e) {
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
SvgExporterPlugin.embeddedIcon = "\r\niVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC\r\n5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/Q\r\naKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lI\r\noqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy\r\n5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkN\r\nAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne\r\n8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQ\r\nTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2\r\nNu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMm\r\nDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXx\r\nCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRg\r\nT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8\r\ndtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz\r\n9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gH\r\nue+ALxPHGYEAAAAASUVORK5CYII=\r\n";
haxe.ds.ObjectMap.count = 0;
SvgExporterPlugin.main();
})();
