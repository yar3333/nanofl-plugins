!function(e, t) {
    "use strict";
    function n(e, t) {
        function n() {}
        n.prototype = e;
        var r = new n();
        for (var i in t) r[i] = t[i];
        return t.toString !== Object.prototype.toString && (r.toString = t.toString), r;
    }
    function r(e) {
        return e instanceof Array ? function() {
            return o.iter(e);
        } : "function" == typeof e.iterator ? i(e, e.iterator) : e.iterator;
    }
    function i(e, t) {
        if (null == t) return null;
        null == t.__id__ && (t.__id__ = hr++);
        var n;
        return null == e.hx__closures__ ? e.hx__closures__ = {} : n = e.hx__closures__[t.__id__], 
        null == n && (n = function() {
            return n.method.apply(n.scope, arguments);
        }, n.scope = e, n.method = t, e.hx__closures__[t.__id__] = n), n;
    }
    t.nanofl = t.nanofl || {}, t.nanofl.engine = t.nanofl.engine || {}, t.nanofl.engine.plugins = t.nanofl.engine.plugins || {};
    var s = {}, a = function() {
        return K.__string_rec(this, "");
    }, l = function(e, t) {
        t = t.split("u").join(""), this.r = new RegExp(e, t);
    };
    s.EReg = l, l.__name__ = [ "EReg" ], l.prototype = {
        r: null,
        match: function(e) {
            return this.r.global && (this.r.lastIndex = 0), this.r.m = this.r.exec(e), this.r.s = e, 
            null != this.r.m;
        },
        matched: function(e) {
            if (null != this.r.m && e >= 0 && e < this.r.m.length) return this.r.m[e];
            throw new J("EReg::matched");
        },
        matchedRight: function() {
            if (null == this.r.m) throw new J("No string matched");
            var e = this.r.m.index + this.r.m[0].length;
            return o.substr(this.r.s, e, this.r.s.length - e);
        },
        matchedPos: function() {
            if (null == this.r.m) throw new J("No string matched");
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            };
        },
        matchSub: function(e, t, n) {
            if (null == n && (n = -1), this.r.global) {
                this.r.lastIndex = t, this.r.m = this.r.exec(0 > n ? e : o.substr(e, 0, t + n));
                var r = null != this.r.m;
                return r && (this.r.s = e), r;
            }
            var i = this.match(0 > n ? o.substr(e, t, null) : o.substr(e, t, n));
            return i && (this.r.s = e, this.r.m.index += t), i;
        },
        split: function(e) {
            var t = "#__delim__#";
            return e.replace(this.r, t).split(t);
        },
        replace: function(e, t) {
            return e.replace(this.r, t);
        },
        map: function(e, t) {
            var n = 0, r = new _();
            do {
                if (n >= e.length) break;
                if (!this.matchSub(e, n)) {
                    r.add(o.substr(e, n, null));
                    break;
                }
                var i = this.matchedPos();
                r.add(o.substr(e, n, i.pos - n)), r.add(t(this)), 0 == i.len ? (r.add(o.substr(e, i.pos, 1)), 
                n = i.pos + 1) : n = i.pos + i.len;
            } while (this.r.global);
            return !this.r.global && n > 0 && n < e.length && r.add(o.substr(e, n, null)), r.b;
        },
        __class__: l
    };
    var o = function() {};
    s.HxOverrides = o, o.__name__ = [ "HxOverrides" ], o.strDate = function(e) {
        var t = e.length;
        switch (t) {
          case 8:
            var n = e.split(":"), r = new Date();
            return r.setTime(0), r.setUTCHours(n[0]), r.setUTCMinutes(n[1]), r.setUTCSeconds(n[2]), 
            r;

          case 10:
            var i = e.split("-");
            return new Date(i[0], i[1] - 1, i[2], 0, 0, 0);

          case 19:
            var s = e.split(" "), a = s[0].split("-"), l = s[1].split(":");
            return new Date(a[0], a[1] - 1, a[2], l[0], l[1], l[2]);

          default:
            throw new J("Invalid date format : " + e);
        }
    }, o.cca = function(e, t) {
        var n = e.charCodeAt(t);
        return n != n ? void 0 : n;
    }, o.substr = function(e, t, n) {
        return null != t && 0 != t && null != n && 0 > n ? "" : (null == n && (n = e.length), 
        0 > t ? (t = e.length + t, 0 > t && (t = 0)) : 0 > n && (n = e.length + n - t), 
        e.substr(t, n));
    }, o.indexOf = function(e, t, n) {
        var r = e.length;
        for (0 > n && (n += r, 0 > n && (n = 0)); r > n; ) {
            if (e[n] === t) return n;
            n++;
        }
        return -1;
    }, o.remove = function(e, t) {
        var n = o.indexOf(e, t, 0);
        return -1 == n ? !1 : (e.splice(n, 1), !0);
    }, o.iter = function(e) {
        return {
            cur: 0,
            arr: e,
            hasNext: function() {
                return this.cur < this.arr.length;
            },
            next: function() {
                return this.arr[this.cur++];
            }
        };
    };
    var u = function() {};
    s.Lambda = u, u.__name__ = [ "Lambda" ], u.array = function(e) {
        for (var t = [], n = r(e)(); n.hasNext(); ) {
            var i = n.next();
            t.push(i);
        }
        return t;
    }, u.exists = function(e, t) {
        for (var n = r(e)(); n.hasNext(); ) {
            var i = n.next();
            if (t(i)) return !0;
        }
        return !1;
    }, u.foreach = function(e, t) {
        for (var n = r(e)(); n.hasNext(); ) {
            var i = n.next();
            if (!t(i)) return !1;
        }
        return !0;
    }, u.count = function(e, t) {
        var n = 0;
        if (null == t) for (var i = r(e)(); i.hasNext(); ) {
            {
                i.next();
            }
            n++;
        } else for (var s = r(e)(); s.hasNext(); ) {
            var a = s.next();
            t(a) && n++;
        }
        return n;
    }, u.indexOf = function(e, t) {
        for (var n = 0, i = r(e)(); i.hasNext(); ) {
            var s = i.next();
            if (t == s) return n;
            n++;
        }
        return -1;
    }, u.find = function(e, t) {
        for (var n = r(e)(); n.hasNext(); ) {
            var i = n.next();
            if (t(i)) return i;
        }
        return null;
    };
    var h = function() {
        this.length = 0;
    };
    s.List = h, h.__name__ = [ "List" ], h.prototype = {
        h: null,
        q: null,
        length: null,
        add: function(e) {
            var t = [ e ];
            null == this.h ? this.h = t : this.q[1] = t, this.q = t, this.length++;
        },
        iterator: function() {
            return new c(this.h);
        },
        __class__: h
    };
    var c = function(e) {
        this.head = e, this.val = null;
    };
    s["_List.ListIterator"] = c, c.__name__ = [ "_List", "ListIterator" ], c.prototype = {
        head: null,
        val: null,
        hasNext: function() {
            return null != this.head;
        },
        next: function() {
            return this.val = this.head[0], this.head = this.head[1], this.val;
        },
        __class__: c
    }, Math.__name__ = [ "Math" ];
    var f = function() {};
    s.Reflect = f, f.__name__ = [ "Reflect" ], f.hasField = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, f.field = function(e, t) {
        try {
            return e[t];
        } catch (e) {
            return N.lastException = e, e instanceof J && (e = e.val), null;
        }
    }, f.setField = function(e, t, n) {
        e[t] = n;
    }, f.callMethod = function(e, t, n) {
        return t.apply(e, n);
    }, f.fields = function(e) {
        var t = [];
        if (null != e) {
            var n = Object.prototype.hasOwnProperty;
            for (var r in e) "__id__" != r && "hx__closures__" != r && n.call(e, r) && t.push(r);
        }
        return t;
    }, f.isFunction = function(e) {
        return "function" == typeof e && !(e.__name__ || e.__ename__);
    }, f.compare = function(e, t) {
        return e == t ? 0 : e > t ? 1 : -1;
    }, f.isObject = function(e) {
        if (null == e) return !1;
        var t = typeof e;
        return "string" == t || "object" == t && null == e.__enum__ || "function" == t && null != (e.__name__ || e.__ename__);
    }, f.deleteField = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t) ? (delete e[t], !0) : !1;
    }, f.copy = function(e) {
        for (var t = {}, n = 0, r = f.fields(e); n < r.length; ) {
            var i = r[n];
            ++n, f.setField(t, i, f.field(e, i));
        }
        return t;
    };
    var g = function() {};
    s.Slambda = g, g.__name__ = [ "Slambda" ];
    var m = function() {};
    s.Slambda1 = m, m.__name__ = [ "Slambda1" ];
    var d = function() {};
    s.Slambda2 = d, d.__name__ = [ "Slambda2" ];
    var p = function() {};
    s.Slambda3 = p, p.__name__ = [ "Slambda3" ];
    var v = function() {};
    s.Slambda4 = v, v.__name__ = [ "Slambda4" ];
    var y = function() {};
    s.Std = y, y.__name__ = [ "Std" ], y.string = function(e) {
        return K.__string_rec(e, "");
    }, y.int = function(e) {
        return 0 | e;
    }, y.parseInt = function(e) {
        var t = parseInt(e, 10);
        return 0 != t || 120 != o.cca(e, 1) && 88 != o.cca(e, 1) || (t = parseInt(e)), isNaN(t) ? null : t;
    }, y.parseFloat = function(e) {
        return parseFloat(e);
    }, y.random = function(e) {
        return 0 >= e ? 0 : Math.floor(Math.random() * e);
    };
    var _ = function() {
        this.b = "";
    };
    s.StringBuf = _, _.__name__ = [ "StringBuf" ], _.prototype = {
        b: null,
        add: function(e) {
            this.b += y.string(e);
        },
        __class__: _
    };
    var x = function() {};
    s.StringTools = x, x.__name__ = [ "StringTools" ], x.htmlEscape = function(e, t) {
        return e = e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;"), 
        t ? e.split('"').join("&quot;").split("'").join("&#039;") : e;
    }, x.htmlUnescape = function(e) {
        return e.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join('"').split("&#039;").join("'").split("&amp;").join("&");
    }, x.startsWith = function(e, t) {
        return e.length >= t.length && o.substr(e, 0, t.length) == t;
    }, x.endsWith = function(e, t) {
        var n = t.length, r = e.length;
        return r >= n && o.substr(e, r - n, n) == t;
    }, x.isSpace = function(e, t) {
        var n = o.cca(e, t);
        return n > 8 && 14 > n || 32 == n;
    }, x.ltrim = function(e) {
        for (var t = e.length, n = 0; t > n && x.isSpace(e, n); ) n++;
        return n > 0 ? o.substr(e, n, t - n) : e;
    }, x.rtrim = function(e) {
        for (var t = e.length, n = 0; t > n && x.isSpace(e, t - n - 1); ) n++;
        return n > 0 ? o.substr(e, 0, t - n) : e;
    }, x.trim = function(e) {
        return x.ltrim(x.rtrim(e));
    }, x.lpad = function(e, t, n) {
        if (t.length <= 0) return e;
        for (;e.length < n; ) e = t + e;
        return e;
    }, x.rpad = function(e, t, n) {
        if (t.length <= 0) return e;
        for (;e.length < n; ) e += t;
        return e;
    }, x.replace = function(e, t, n) {
        return e.split(t).join(n);
    }, x.hex = function(e, t) {
        var n = "", r = "0123456789ABCDEF";
        do n = r.charAt(15 & e) + n, e >>>= 4; while (e > 0);
        if (null != t) for (;n.length < t; ) n = "0" + n;
        return n;
    }, x.fastCodeAt = function(e, t) {
        return e.charCodeAt(t);
    };
    var A = s.ValueType = {
        __ename__: [ "ValueType" ],
        __constructs__: [ "TNull", "TInt", "TFloat", "TBool", "TObject", "TFunction", "TClass", "TEnum", "TUnknown" ]
    };
    A.TNull = [ "TNull", 0 ], A.TNull.toString = a, A.TNull.__enum__ = A, A.TInt = [ "TInt", 1 ], 
    A.TInt.toString = a, A.TInt.__enum__ = A, A.TFloat = [ "TFloat", 2 ], A.TFloat.toString = a, 
    A.TFloat.__enum__ = A, A.TBool = [ "TBool", 3 ], A.TBool.toString = a, A.TBool.__enum__ = A, 
    A.TObject = [ "TObject", 4 ], A.TObject.toString = a, A.TObject.__enum__ = A, A.TFunction = [ "TFunction", 5 ], 
    A.TFunction.toString = a, A.TFunction.__enum__ = A, A.TClass = function(e) {
        var t = [ "TClass", 6, e ];
        return t.__enum__ = A, t.toString = a, t;
    }, A.TEnum = function(e) {
        var t = [ "TEnum", 7, e ];
        return t.__enum__ = A, t.toString = a, t;
    }, A.TUnknown = [ "TUnknown", 8 ], A.TUnknown.toString = a, A.TUnknown.__enum__ = A;
    var b = function() {};
    s.Type = b, b.__name__ = [ "Type" ], b.getClass = function(e) {
        return null == e ? null : K.getClass(e);
    }, b.getClassName = function(e) {
        var t = e.__name__;
        return null == t ? null : t.join(".");
    }, b.getEnumName = function(e) {
        var t = e.__ename__;
        return t.join(".");
    }, b.resolveClass = function(e) {
        var t = s[e];
        return null != t && t.__name__ ? t : null;
    }, b.resolveEnum = function(e) {
        var t = s[e];
        return null != t && t.__ename__ ? t : null;
    }, b.createInstance = function(e, t) {
        var n = t.length;
        switch (n) {
          case 0:
            return new e();

          case 1:
            return new e(t[0]);

          case 2:
            return new e(t[0], t[1]);

          case 3:
            return new e(t[0], t[1], t[2]);

          case 4:
            return new e(t[0], t[1], t[2], t[3]);

          case 5:
            return new e(t[0], t[1], t[2], t[3], t[4]);

          case 6:
            return new e(t[0], t[1], t[2], t[3], t[4], t[5]);

          case 7:
            return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);

          case 8:
            return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]);

          default:
            throw new J("Too many arguments");
        }
        return null;
    }, b.createEmptyInstance = function(e) {
        function t() {}
        return t.prototype = e.prototype, new t();
    }, b.createEnum = function(e, t, n) {
        var r = f.field(e, t);
        if (null == r) throw new J("No such constructor " + t);
        if (f.isFunction(r)) {
            if (null == n) throw new J("Constructor " + t + " need parameters");
            return f.callMethod(e, r, n);
        }
        if (null != n && 0 != n.length) throw new J("Constructor " + t + " does not need parameters");
        return r;
    }, b.getInstanceFields = function(e) {
        var t = [];
        for (var n in e.prototype) t.push(n);
        return o.remove(t, "__class__"), o.remove(t, "__properties__"), t;
    }, b.getEnumConstructs = function(e) {
        var t = e.__constructs__;
        return t.slice();
    }, b.typeof = function(e) {
        var t = typeof e;
        switch (t) {
          case "boolean":
            return A.TBool;

          case "string":
            return A.TClass(String);

          case "number":
            return Math.ceil(e) == e % 2147483648 ? A.TInt : A.TFloat;

          case "object":
            if (null == e) return A.TNull;
            var n = e.__enum__;
            if (null != n) return A.TEnum(n);
            var r = K.getClass(e);
            return null != r ? A.TClass(r) : A.TObject;

          case "function":
            return e.__name__ || e.__ename__ ? A.TObject : A.TFunction;

          case "undefined":
            return A.TNull;

          default:
            return A.TUnknown;
        }
    }, b.enumConstructor = function(e) {
        return e[0];
    }, b.enumIndex = function(e) {
        return e[1];
    };
    var w = s["haxe.StackItem"] = {
        __ename__: [ "haxe", "StackItem" ],
        __constructs__: [ "CFunction", "Module", "FilePos", "Method", "LocalFunction" ]
    };
    w.CFunction = [ "CFunction", 0 ], w.CFunction.toString = a, w.CFunction.__enum__ = w, 
    w.Module = function(e) {
        var t = [ "Module", 1, e ];
        return t.__enum__ = w, t.toString = a, t;
    }, w.FilePos = function(e, t, n) {
        var r = [ "FilePos", 2, e, t, n ];
        return r.__enum__ = w, r.toString = a, r;
    }, w.Method = function(e, t) {
        var n = [ "Method", 3, e, t ];
        return n.__enum__ = w, n.toString = a, n;
    }, w.LocalFunction = function(e) {
        var t = [ "LocalFunction", 4, e ];
        return t.__enum__ = w, t.toString = a, t;
    };
    var N = function() {};
    s["haxe.CallStack"] = N, N.__name__ = [ "haxe", "CallStack" ], N.getStack = function(e) {
        if (null == e) return [];
        var t = Error.prepareStackTrace;
        Error.prepareStackTrace = function(e, t) {
            for (var n = [], r = 0; r < t.length; ) {
                var i = t[r];
                ++r, null != N.wrapCallSite && (i = N.wrapCallSite(i));
                var s = null, a = i.getFunctionName();
                if (null != a) {
                    var l = a.lastIndexOf(".");
                    if (l >= 0) {
                        var u = o.substr(a, 0, l), h = o.substr(a, l + 1, null);
                        s = w.Method(u, h);
                    }
                }
                n.push(w.FilePos(s, i.getFileName(), i.getLineNumber()));
            }
            return n;
        };
        var n = N.makeStack(e.stack);
        return Error.prepareStackTrace = t, n;
    }, N.callStack = function() {
        try {
            throw new Error();
        } catch (t) {
            N.lastException = t, t instanceof J && (t = t.val);
            var e = N.getStack(t);
            return e.shift(), e;
        }
    }, N.exceptionStack = function() {
        return N.getStack(N.lastException);
    }, N.toString = function(e) {
        for (var t = new _(), n = 0; n < e.length; ) {
            var r = e[n];
            ++n, t.b += "\nCalled from ", N.itemToString(t, r);
        }
        return t.b;
    }, N.itemToString = function(e, t) {
        switch (t[1]) {
          case 0:
            e.b += "a C function";
            break;

          case 1:
            var n = t[2];
            e.b += "module ", e.b += null == n ? "null" : "" + n;
            break;

          case 2:
            var r = t[4], i = t[3], s = t[2];
            null != s && (N.itemToString(e, s), e.b += " ("), e.b += null == i ? "null" : "" + i, 
            e.b += " line ", e.b += null == r ? "null" : "" + r, null != s && (e.b += ")");
            break;

          case 3:
            var a = t[3], l = t[2];
            e.b += null == l ? "null" : "" + l, e.b += ".", e.b += null == a ? "null" : "" + a;
            break;

          case 4:
            var o = t[2];
            e.b += "local function #", e.b += null == o ? "null" : "" + o;
        }
    }, N.makeStack = function(e) {
        if (null == e) return [];
        if ("string" == typeof e) {
            var t = e.split("\n");
            "Error" == t[0] && t.shift();
            for (var n = [], r = new l("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$", ""), i = 0; i < t.length; ) {
                var s = t[i];
                if (++i, r.match(s)) {
                    var a = r.matched(1).split("."), o = a.pop(), u = r.matched(2), h = y.parseInt(r.matched(3));
                    n.push(w.FilePos("Anonymous function" == o ? w.LocalFunction() : "Global code" == o ? null : w.Method(a.join("."), o), u, h));
                } else n.push(w.Module(x.trim(s)));
            }
            return n;
        }
        return e;
    };
    var E = function() {};
    s["haxe.IMap"] = E, E.__name__ = [ "haxe", "IMap" ], E.prototype = {
        get: null,
        set: null,
        keys: null,
        iterator: null,
        __class__: E
    };
    var S = function(e, t) {
        this.high = e, this.low = t;
    };
    s["haxe._Int64.___Int64"] = S, S.__name__ = [ "haxe", "_Int64", "___Int64" ], S.prototype = {
        high: null,
        low: null,
        __class__: S
    };
    var C = function() {};
    s["haxe.Log"] = C, C.__name__ = [ "haxe", "Log" ], C.trace = function(e, t) {
        K.__trace(e, t);
    };
    var P = function() {
        this.buf = new _(), this.cache = [], this.useCache = P.USE_CACHE, this.useEnumIndex = P.USE_ENUM_INDEX, 
        this.shash = new O(), this.scount = 0;
    };
    s["haxe.Serializer"] = P, P.__name__ = [ "haxe", "Serializer" ], P.prototype = {
        buf: null,
        cache: null,
        shash: null,
        scount: null,
        useCache: null,
        useEnumIndex: null,
        toString: function() {
            return this.buf.b;
        },
        serializeString: function(e) {
            var t = this.shash.get(e);
            return null != t ? (this.buf.b += "R", void (this.buf.b += null == t ? "null" : "" + t)) : (this.shash.set(e, this.scount++), 
            this.buf.b += "y", e = encodeURIComponent(e), this.buf.b += null == e.length ? "null" : "" + e.length, 
            this.buf.b += ":", void (this.buf.b += null == e ? "null" : "" + e));
        },
        serializeRef: function(e) {
            for (var t = typeof e, n = 0, r = this.cache.length; r > n; ) {
                var i = n++, s = this.cache[i];
                if (typeof s == t && s == e) return this.buf.b += "r", this.buf.b += null == i ? "null" : "" + i, 
                !0;
            }
            return this.cache.push(e), !1;
        },
        serializeFields: function(e) {
            for (var t = 0, n = f.fields(e); t < n.length; ) {
                var r = n[t];
                ++t, this.serializeString(r), this.serialize(f.field(e, r));
            }
            this.buf.b += "g";
        },
        serialize: function(e) {
            var t = b.typeof(e);
            switch (t[1]) {
              case 0:
                this.buf.b += "n";
                break;

              case 1:
                var n = e;
                if (0 == n) return void (this.buf.b += "z");
                this.buf.b += "i", this.buf.b += null == n ? "null" : "" + n;
                break;

              case 2:
                var r = e;
                isNaN(r) ? this.buf.b += "k" : isFinite(r) ? (this.buf.b += "d", this.buf.b += null == r ? "null" : "" + r) : this.buf.b += 0 > r ? "m" : "p";
                break;

              case 3:
                this.buf.b += e ? "t" : "f";
                break;

              case 6:
                var i = t[2];
                if (i == String) return void this.serializeString(e);
                if (this.useCache && this.serializeRef(e)) return;
                switch (i) {
                  case Array:
                    var s = 0;
                    this.buf.b += "a";
                    for (var a = e.length, l = 0; a > l; ) {
                        var o = l++;
                        null == e[o] ? s++ : (s > 0 && (1 == s ? this.buf.b += "n" : (this.buf.b += "u", 
                        this.buf.b += null == s ? "null" : "" + s), s = 0), this.serialize(e[o]));
                    }
                    s > 0 && (1 == s ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b += null == s ? "null" : "" + s)), 
                    this.buf.b += "h";
                    break;

                  case h:
                    this.buf.b += "l";
                    for (var u = e, c = u.h, g = null; null != c; ) {
                        var m;
                        g = c[0], c = c[1], m = g, this.serialize(m);
                    }
                    this.buf.b += "h";
                    break;

                  case Date:
                    var d = e;
                    this.buf.b += "v", this.buf.add(d.getTime());
                    break;

                  case O:
                    this.buf.b += "b";
                    for (var p = e, v = p.keys(); v.hasNext(); ) {
                        var x = v.next();
                        this.serializeString(x), this.serialize(null != vr[x] ? p.getReserved(x) : p.h[x]);
                    }
                    this.buf.b += "h";
                    break;

                  case M:
                    this.buf.b += "q";
                    for (var A = e, w = A.keys(); w.hasNext(); ) {
                        var N = w.next();
                        this.buf.b += ":", this.buf.b += null == N ? "null" : "" + N, this.serialize(A.h[N]);
                    }
                    this.buf.b += "h";
                    break;

                  case R:
                    this.buf.b += "M";
                    for (var E = e, S = E.keys(); S.hasNext(); ) {
                        var C = S.next(), I = f.field(C, "__id__");
                        f.deleteField(C, "__id__"), this.serialize(C), C.__id__ = I, this.serialize(E.h[C.__id__]);
                    }
                    this.buf.b += "h";
                    break;

                  case B:
                    for (var T = e, k = 0, F = T.length - 2, j = new _(), D = P.BASE64; F > k; ) {
                        var L = T.get(k++), z = T.get(k++), H = T.get(k++);
                        j.add(D.charAt(L >> 2)), j.add(D.charAt(63 & (L << 4 | z >> 4))), j.add(D.charAt(63 & (z << 2 | H >> 6))), 
                        j.add(D.charAt(63 & H));
                    }
                    if (k == F) {
                        var q = T.get(k++), X = T.get(k++);
                        j.add(D.charAt(q >> 2)), j.add(D.charAt(63 & (q << 4 | X >> 4))), j.add(D.charAt(X << 2 & 63));
                    } else if (k == F + 1) {
                        var Y = T.get(k++);
                        j.add(D.charAt(Y >> 2)), j.add(D.charAt(Y << 4 & 63));
                    }
                    var U = j.b;
                    this.buf.b += "s", this.buf.b += null == U.length ? "null" : "" + U.length, this.buf.b += ":", 
                    this.buf.b += null == U ? "null" : "" + U;
                    break;

                  default:
                    this.useCache && this.cache.pop(), null != e.hxSerialize ? (this.buf.b += "C", this.serializeString(b.getClassName(i)), 
                    this.useCache && this.cache.push(e), e.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", 
                    this.serializeString(b.getClassName(i)), this.useCache && this.cache.push(e), this.serializeFields(e));
                }
                break;

              case 4:
                if (K.__instanceof(e, dr)) {
                    var G = b.getClassName(e);
                    this.buf.b += "A", this.serializeString(G);
                } else if (K.__instanceof(e, pr)) this.buf.b += "B", this.serializeString(b.getEnumName(e)); else {
                    if (this.useCache && this.serializeRef(e)) return;
                    this.buf.b += "o", this.serializeFields(e);
                }
                break;

              case 7:
                var V = t[2];
                if (this.useCache) {
                    if (this.serializeRef(e)) return;
                    this.cache.pop();
                }
                this.buf.b += this.useEnumIndex ? "j" : "w", this.serializeString(b.getEnumName(V)), 
                this.useEnumIndex ? (this.buf.b += ":", this.buf.b += y.string(e[1])) : this.serializeString(e[0]), 
                this.buf.b += ":";
                var Q = e.length;
                this.buf.b += y.string(Q - 2);
                for (var W = 2; Q > W; ) {
                    var Z = W++;
                    this.serialize(e[Z]);
                }
                this.useCache && this.cache.push(e);
                break;

              case 5:
                throw new J("Cannot serialize function");

              default:
                throw new J("Cannot serialize " + y.string(e));
            }
        },
        __class__: P
    };
    var I = function(e) {
        var t = this;
        this.id = setInterval(function() {
            t.run();
        }, e);
    };
    s["haxe.Timer"] = I, I.__name__ = [ "haxe", "Timer" ], I.delay = function(e, t) {
        var n = new I(t);
        return n.run = function() {
            n.stop(), e();
        }, n;
    }, I.prototype = {
        id: null,
        stop: function() {
            null != this.id && (clearInterval(this.id), this.id = null);
        },
        run: function() {},
        __class__: I
    };
    var T = function(e) {
        this.buf = e, this.length = e.length, this.pos = 0, this.scache = [], this.cache = [];
        var t = T.DEFAULT_RESOLVER;
        null == t && (t = b, T.DEFAULT_RESOLVER = t), this.setResolver(t);
    };
    s["haxe.Unserializer"] = T, T.__name__ = [ "haxe", "Unserializer" ], T.initCodes = function() {
        for (var e = [], t = 0, n = T.BASE64.length; n > t; ) {
            var r = t++;
            e[T.BASE64.charCodeAt(r)] = r;
        }
        return e;
    }, T.prototype = {
        buf: null,
        pos: null,
        length: null,
        cache: null,
        scache: null,
        resolver: null,
        setResolver: function(e) {
            this.resolver = null == e ? {
                resolveClass: function() {
                    return null;
                },
                resolveEnum: function() {
                    return null;
                }
            } : e;
        },
        get: function(e) {
            return this.buf.charCodeAt(e);
        },
        readDigits: function() {
            for (var e = 0, t = !1, n = this.pos; ;) {
                var r = this.buf.charCodeAt(this.pos);
                if (r != r) break;
                if (45 != r) {
                    if (48 > r || r > 57) break;
                    e = 10 * e + (r - 48), this.pos++;
                } else {
                    if (this.pos != n) break;
                    t = !0, this.pos++;
                }
            }
            return t && (e *= -1), e;
        },
        readFloat: function() {
            for (var e = this.pos; ;) {
                var t = this.buf.charCodeAt(this.pos);
                if (!(t >= 43 && 58 > t || 101 == t || 69 == t)) break;
                this.pos++;
            }
            return y.parseFloat(o.substr(this.buf, e, this.pos - e));
        },
        unserializeObject: function(e) {
            for (;;) {
                if (this.pos >= this.length) throw new J("Invalid object");
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var t = this.unserialize();
                if ("string" != typeof t) throw new J("Invalid object key");
                var n = this.unserialize();
                e[t] = n;
            }
            this.pos++;
        },
        unserializeEnum: function(e, t) {
            if (58 != this.get(this.pos++)) throw new J("Invalid enum format");
            var n = this.readDigits();
            if (0 == n) return b.createEnum(e, t);
            for (var r = []; n-- > 0; ) r.push(this.unserialize());
            return b.createEnum(e, t, r);
        },
        unserialize: function() {
            var e = this.get(this.pos++);
            switch (e) {
              case 110:
                return null;

              case 116:
                return !0;

              case 102:
                return !1;

              case 122:
                return 0;

              case 105:
                return this.readDigits();

              case 100:
                return this.readFloat();

              case 121:
                var t = this.readDigits();
                if (58 != this.get(this.pos++) || this.length - this.pos < t) throw new J("Invalid string length");
                var n = o.substr(this.buf, this.pos, t);
                return this.pos += t, n = decodeURIComponent(n.split("+").join(" ")), this.scache.push(n), 
                n;

              case 107:
                return 0/0;

              case 109:
                return -1/0;

              case 112:
                return 1/0;

              case 97:
                var r = (this.buf, []);
                for (this.cache.push(r); ;) {
                    var i = this.buf.charCodeAt(this.pos);
                    if (104 == i) {
                        this.pos++;
                        break;
                    }
                    if (117 == i) {
                        this.pos++;
                        var s = this.readDigits();
                        r[r.length + s - 1] = null;
                    } else r.push(this.unserialize());
                }
                return r;

              case 111:
                var a = {};
                return this.cache.push(a), this.unserializeObject(a), a;

              case 114:
                var l = this.readDigits();
                if (0 > l || l >= this.cache.length) throw new J("Invalid reference");
                return this.cache[l];

              case 82:
                var u = this.readDigits();
                if (0 > u || u >= this.scache.length) throw new J("Invalid string reference");
                return this.scache[u];

              case 120:
                throw new J(this.unserialize());

              case 99:
                var c = this.unserialize(), f = this.resolver.resolveClass(c);
                if (null == f) throw new J("Class not found " + c);
                var g = b.createEmptyInstance(f);
                return this.cache.push(g), this.unserializeObject(g), g;

              case 119:
                var m = this.unserialize(), d = this.resolver.resolveEnum(m);
                if (null == d) throw new J("Enum not found " + m);
                var p = this.unserializeEnum(d, this.unserialize());
                return this.cache.push(p), p;

              case 106:
                var v = this.unserialize(), y = this.resolver.resolveEnum(v);
                if (null == y) throw new J("Enum not found " + v);
                this.pos++;
                var _ = this.readDigits(), A = b.getEnumConstructs(y)[_];
                if (null == A) throw new J("Unknown enum index " + v + "@" + _);
                var w = this.unserializeEnum(y, A);
                return this.cache.push(w), w;

              case 108:
                var N = new h();
                this.cache.push(N);
                for (this.buf; 104 != this.buf.charCodeAt(this.pos); ) N.add(this.unserialize());
                return this.pos++, N;

              case 98:
                var E = new O();
                this.cache.push(E);
                for (this.buf; 104 != this.buf.charCodeAt(this.pos); ) {
                    var S = this.unserialize();
                    E.set(S, this.unserialize());
                }
                return this.pos++, E;

              case 113:
                var C = new M();
                this.cache.push(C);
                for (var P = (this.buf, this.get(this.pos++)); 58 == P; ) {
                    var I = this.readDigits();
                    C.set(I, this.unserialize()), P = this.get(this.pos++);
                }
                if (104 != P) throw new J("Invalid IntMap format");
                return C;

              case 77:
                var k = new R();
                this.cache.push(k);
                for (this.buf; 104 != this.buf.charCodeAt(this.pos); ) {
                    var F = this.unserialize();
                    k.set(F, this.unserialize());
                }
                return this.pos++, k;

              case 118:
                var j;
                if (this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && 45 == this.buf.charCodeAt(this.pos + 4)) {
                    var D = o.substr(this.buf, this.pos, 19);
                    j = o.strDate(D), this.pos += 19;
                } else {
                    var L = this.readFloat(), z = new Date();
                    z.setTime(L), j = z;
                }
                return this.cache.push(j), j;

              case 115:
                var H = this.readDigits(), q = this.buf;
                if (58 != this.get(this.pos++) || this.length - this.pos < H) throw new J("Invalid bytes length");
                var X = T.CODES;
                null == X && (X = T.initCodes(), T.CODES = X);
                var Y, U = this.pos, G = 3 & H;
                Y = 3 * (H >> 2) + (G >= 2 ? G - 1 : 0);
                for (var V = U + (H - G), Q = B.alloc(Y), W = 0; V > U; ) {
                    var Z = X[x.fastCodeAt(q, U++)], K = X[x.fastCodeAt(q, U++)];
                    Q.set(W++, Z << 2 | K >> 4);
                    var $ = X[x.fastCodeAt(q, U++)];
                    Q.set(W++, K << 4 | $ >> 2);
                    var et = X[x.fastCodeAt(q, U++)];
                    Q.set(W++, $ << 6 | et);
                }
                if (G >= 2) {
                    var tt = X[x.fastCodeAt(q, U++)], nt = X[x.fastCodeAt(q, U++)];
                    if (Q.set(W++, tt << 2 | nt >> 4), 3 == G) {
                        var rt = X[x.fastCodeAt(q, U++)];
                        Q.set(W++, nt << 4 | rt >> 2);
                    }
                }
                return this.pos += H, this.cache.push(Q), Q;

              case 67:
                var it = this.unserialize(), st = this.resolver.resolveClass(it);
                if (null == st) throw new J("Class not found " + it);
                var at = b.createEmptyInstance(st);
                if (this.cache.push(at), at.hxUnserialize(this), 103 != this.get(this.pos++)) throw new J("Invalid custom data");
                return at;

              case 65:
                var lt = this.unserialize(), ot = this.resolver.resolveClass(lt);
                if (null == ot) throw new J("Class not found " + lt);
                return ot;

              case 66:
                var ut = this.unserialize(), ht = this.resolver.resolveEnum(ut);
                if (null == ht) throw new J("Enum not found " + ut);
                return ht;
            }
            throw this.pos--, new J("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
        },
        __class__: T
    };
    var k = function() {
        this.__b = "";
    };
    s["haxe.Utf8"] = k, k.__name__ = [ "haxe", "Utf8" ], k.iter = function(e, t) {
        for (var n = 0, r = e.length; r > n; ) {
            var i = n++;
            t(o.cca(e, i));
        }
    }, k.encode = function() {
        throw new J("Not implemented");
    }, k.decode = function() {
        throw new J("Not implemented");
    }, k.compare = function(e, t) {
        return e > t ? 1 : e == t ? 0 : -1;
    }, k.prototype = {
        __b: null,
        addChar: function(e) {
            this.__b += String.fromCharCode(e);
        },
        __class__: k
    };
    var M = function() {
        this.h = {};
    };
    s["haxe.ds.IntMap"] = M, M.__name__ = [ "haxe", "ds", "IntMap" ], M.__interfaces__ = [ E ], 
    M.prototype = {
        h: null,
        set: function(e, t) {
            this.h[e] = t;
        },
        get: function(e) {
            return this.h[e];
        },
        keys: function() {
            var e = [];
            for (var t in this.h) this.h.hasOwnProperty(t) && e.push(0 | t);
            return o.iter(e);
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext();
                },
                next: function() {
                    var e = this.it.next();
                    return this.ref[e];
                }
            };
        },
        __class__: M
    };
    var R = function() {
        this.h = {}, this.h.__keys__ = {};
    };
    s["haxe.ds.ObjectMap"] = R, R.__name__ = [ "haxe", "ds", "ObjectMap" ], R.__interfaces__ = [ E ], 
    R.prototype = {
        h: null,
        set: function(e, t) {
            var n = e.__id__ || (e.__id__ = ++R.count);
            this.h[n] = t, this.h.__keys__[n] = e;
        },
        get: function(e) {
            return this.h[e.__id__];
        },
        remove: function(e) {
            var t = e.__id__;
            return null == this.h.__keys__[t] ? !1 : (delete this.h[t], delete this.h.__keys__[t], 
            !0);
        },
        keys: function() {
            var e = [];
            for (var t in this.h.__keys__) this.h.hasOwnProperty(t) && e.push(this.h.__keys__[t]);
            return o.iter(e);
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext();
                },
                next: function() {
                    var e = this.it.next();
                    return this.ref[e.__id__];
                }
            };
        },
        __class__: R
    };
    var F = function(e, t) {
        this.map = e, this.keys = t, this.index = 0, this.count = t.length;
    };
    s["haxe.ds._StringMap.StringMapIterator"] = F, F.__name__ = [ "haxe", "ds", "_StringMap", "StringMapIterator" ], 
    F.prototype = {
        map: null,
        keys: null,
        index: null,
        count: null,
        hasNext: function() {
            return this.index < this.count;
        },
        next: function() {
            return this.map.get(this.keys[this.index++]);
        },
        __class__: F
    };
    var O = function() {
        this.h = {};
    };
    s["haxe.ds.StringMap"] = O, O.__name__ = [ "haxe", "ds", "StringMap" ], O.__interfaces__ = [ E ], 
    O.prototype = {
        h: null,
        rh: null,
        set: function(e, t) {
            null != vr[e] ? this.setReserved(e, t) : this.h[e] = t;
        },
        get: function(e) {
            return null != vr[e] ? this.getReserved(e) : this.h[e];
        },
        exists: function(e) {
            return null != vr[e] ? this.existsReserved(e) : this.h.hasOwnProperty(e);
        },
        setReserved: function(e, t) {
            null == this.rh && (this.rh = {}), this.rh["$" + e] = t;
        },
        getReserved: function(e) {
            return null == this.rh ? null : this.rh["$" + e];
        },
        existsReserved: function(e) {
            return null == this.rh ? !1 : this.rh.hasOwnProperty("$" + e);
        },
        remove: function(e) {
            return null != vr[e] ? (e = "$" + e, null != this.rh && this.rh.hasOwnProperty(e) ? (delete this.rh[e], 
            !0) : !1) : this.h.hasOwnProperty(e) ? (delete this.h[e], !0) : !1;
        },
        keys: function() {
            var e = this.arrayKeys();
            return o.iter(e);
        },
        arrayKeys: function() {
            var e = [];
            for (var t in this.h) this.h.hasOwnProperty(t) && e.push(t);
            if (null != this.rh) for (var t in this.rh) 36 == t.charCodeAt(0) && e.push(t.substr(1));
            return e;
        },
        iterator: function() {
            return new F(this, this.arrayKeys());
        },
        __class__: O
    };
    var B = function(e) {
        this.length = e.byteLength, this.b = new Ar(e), this.b.bufferValue = e, e.hxBytes = this, 
        e.bytes = this.b;
    };
    s["haxe.io.Bytes"] = B, B.__name__ = [ "haxe", "io", "Bytes" ], B.alloc = function(e) {
        return new B(new xr(e));
    }, B.prototype = {
        length: null,
        b: null,
        get: function(e) {
            return this.b[e];
        },
        set: function(e, t) {
            this.b[e] = 255 & t;
        },
        __class__: B
    };
    var j = s["haxe.io.Error"] = {
        __ename__: [ "haxe", "io", "Error" ],
        __constructs__: [ "Blocked", "Overflow", "OutsideBounds", "Custom" ]
    };
    j.Blocked = [ "Blocked", 0 ], j.Blocked.toString = a, j.Blocked.__enum__ = j, j.Overflow = [ "Overflow", 1 ], 
    j.Overflow.toString = a, j.Overflow.__enum__ = j, j.OutsideBounds = [ "OutsideBounds", 2 ], 
    j.OutsideBounds.toString = a, j.OutsideBounds.__enum__ = j, j.Custom = function(e) {
        var t = [ "Custom", 3, e ];
        return t.__enum__ = j, t.toString = a, t;
    };
    var D = function() {};
    s["haxe.io.FPHelper"] = D, D.__name__ = [ "haxe", "io", "FPHelper" ], D.i32ToFloat = function(e) {
        var t = 1 - (e >>> 31 << 1), n = e >>> 23 & 255, r = 8388607 & e;
        return 0 == r && 0 == n ? 0 : t * (1 + Math.pow(2, -23) * r) * Math.pow(2, n - 127);
    }, D.floatToI32 = function(e) {
        if (0 == e) return 0;
        var t;
        t = 0 > e ? -e : e;
        var n = Math.floor(Math.log(t) / .6931471805599453);
        -127 > n ? n = -127 : n > 128 && (n = 128);
        var r = 8388607 & Math.round(8388608 * (t / Math.pow(2, n) - 1));
        return (0 > e ? -2147483648 : 0) | n + 127 << 23 | r;
    }, D.i64ToDouble = function(e, t) {
        var n = 1 - (t >>> 31 << 1), r = (t >> 20 & 2047) - 1023, i = 4294967296 * (1048575 & t) + 2147483648 * (e >>> 31) + (2147483647 & e);
        return 0 == i && -1023 == r ? 0 : n * (1 + Math.pow(2, -52) * i) * Math.pow(2, r);
    }, D.doubleToI64 = function(e) {
        var t = D.i64tmp;
        if (0 == e) t.low = 0, t.high = 0; else {
            var n;
            n = 0 > e ? -e : e;
            var r, i = Math.floor(Math.log(n) / .6931471805599453), s = 4503599627370496 * (n / Math.pow(2, i) - 1);
            r = Math.round(s);
            var a = 0 | r, l = r / 4294967296 | 0;
            t.low = a, t.high = (0 > e ? -2147483648 : 0) | i + 1023 << 20 | l;
        }
        return t;
    };
    var L = function(e) {
        switch (e) {
          case ".":
          case "..":
            return this.dir = e, void (this.file = "");
        }
        var t = e.lastIndexOf("/"), n = e.lastIndexOf("\\");
        n > t ? (this.dir = o.substr(e, 0, n), e = o.substr(e, n + 1, null), this.backslash = !0) : t > n ? (this.dir = o.substr(e, 0, t), 
        e = o.substr(e, t + 1, null)) : this.dir = null;
        var r = e.lastIndexOf(".");
        -1 != r ? (this.ext = o.substr(e, r + 1, null), this.file = o.substr(e, 0, r)) : (this.ext = null, 
        this.file = e);
    };
    s["haxe.io.Path"] = L, L.__name__ = [ "haxe", "io", "Path" ], L.withoutDirectory = function(e) {
        var t = new L(e);
        return t.dir = null, t.toString();
    }, L.prototype = {
        dir: null,
        file: null,
        ext: null,
        backslash: null,
        toString: function() {
            return (null == this.dir ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (null == this.ext ? "" : "." + this.ext);
        },
        __class__: L
    };
    var z = function(e, t, n) {
        this.name = e, this.value = t, this.quote = n;
    };
    s["htmlparser.HtmlAttribute"] = z, z.__name__ = [ "htmlparser", "HtmlAttribute" ], 
    z.prototype = {
        name: null,
        value: null,
        quote: null,
        toString: function() {
            return this.name + "=" + this.quote + G.escape(this.value, "\r\n" + ("'" == this.quote ? '"' : "'")) + this.quote;
        },
        __class__: z
    };
    var H = function() {};
    s["htmlparser.HtmlNode"] = H, H.__name__ = [ "htmlparser", "HtmlNode" ], H.prototype = {
        parent: null,
        remove: function() {
            null != this.parent && this.parent.removeChild(this);
        },
        getPrevSiblingNode: function() {
            if (null == this.parent) return null;
            var e = this.parent.nodes, t = u.indexOf(e, this);
            return 0 >= t ? null : t > 0 ? e[t - 1] : null;
        },
        getNextSiblingNode: function() {
            if (null == this.parent) return null;
            var e = this.parent.nodes, t = u.indexOf(e, this);
            return 0 >= t ? null : t + 1 < e.length ? e[t + 1] : null;
        },
        toString: function() {
            return "";
        },
        toText: function() {
            return "";
        },
        hxSerialize: function() {},
        hxUnserialize: function() {},
        __class__: H
    };
    var q = function(e, t) {
        var n = this;
        Object.defineProperty(this, "innerHTML", {
            get: function() {
                return n.get_innerHTML();
            },
            set: function(e) {
                n.set_innerHTML(e);
            }
        }), Object.defineProperty(this, "innerText", {
            get: function() {
                return n.get_innerText();
            },
            set: function(e) {
                n.set_innerText(e);
            }
        }), this.name = e, this.attributes = t, this.nodes = [], this.children = [];
    };
    s["htmlparser.HtmlNodeElement"] = q, q.__name__ = [ "htmlparser", "HtmlNodeElement" ], 
    q.__super__ = H, q.prototype = n(H.prototype, {
        name: null,
        attributes: null,
        nodes: null,
        children: null,
        getPrevSiblingElement: function() {
            if (null == this.parent) return null;
            var e = o.indexOf(this.parent.children, this, 0);
            return 0 > e ? null : e > 0 ? this.parent.children[e - 1] : null;
        },
        getNextSiblingElement: function() {
            if (null == this.parent) return null;
            var e = o.indexOf(this.parent.children, this, 0);
            return 0 > e ? null : e + 1 < this.parent.children.length ? this.parent.children[e + 1] : null;
        },
        addChild: function(e, t) {
            if (e.parent = this, null == t) this.nodes.push(e), K.__instanceof(e, q) && this.children.push(e); else {
                var n = o.indexOf(this.nodes, t, 0);
                n >= 0 && (this.nodes.splice(n, 0, e), K.__instanceof(e, q) && (n = o.indexOf(this.children, t, 0), 
                n >= 0 && this.children.splice(n, 0, e)));
            }
        },
        toString: function() {
            for (var e = new _(), t = 0, n = this.attributes; t < n.length; ) {
                var r = n[t];
                ++t, e.b += " ", e.add(r.toString());
            }
            for (var i = new _(), s = 0, a = this.nodes; s < a.length; ) {
                var l = a[s];
                ++s, i.add(l.toString());
            }
            var o = i.b;
            return "" == o && this.isSelfClosing() ? "<" + this.name + e.b + " />" : null != this.name && "" != this.name ? "<" + this.name + e.b + ">" + o + "</" + this.name + ">" : o;
        },
        getAttribute: function(e) {
            for (var t = e.toLowerCase(), n = 0, r = this.attributes; n < r.length; ) {
                var i = r[n];
                if (++n, i.name.toLowerCase() == t) return i.value;
            }
            return null;
        },
        setAttribute: function(e, t) {
            for (var n = e.toLowerCase(), r = 0, i = this.attributes; r < i.length; ) {
                var s = i[r];
                if (++r, s.name.toLowerCase() == n) return void (s.value = t);
            }
            this.attributes.push(new z(e, t, '"'));
        },
        removeAttribute: function(e) {
            for (var t = e.toLowerCase(), n = 0, r = this.attributes.length; r > n; ) {
                var i = n++, s = this.attributes[i];
                if (s.name.toLowerCase() == t) return void this.attributes.splice(i, 1);
            }
        },
        hasAttribute: function(e) {
            for (var t = e.toLowerCase(), n = 0, r = this.attributes; n < r.length; ) {
                var i = r[n];
                if (++n, i.name.toLowerCase() == t) return !0;
            }
            return !1;
        },
        innerHTML: null,
        get_innerHTML: function() {
            for (var e = new _(), t = 0, n = this.nodes; t < n.length; ) {
                var r = n[t];
                ++t, e.add(r.toString());
            }
            return e.b;
        },
        set_innerHTML: function(e) {
            var t = Y.run(e);
            this.nodes = [], this.children = [];
            for (var n = 0; n < t.length; ) {
                var r = t[n];
                ++n, this.addChild(r);
            }
            return e;
        },
        innerText: null,
        get_innerText: function() {
            return this.toText();
        },
        set_innerText: function(e) {
            return this.fastSetInnerHTML(G.escape(e)), e;
        },
        fastSetInnerHTML: function(e) {
            this.nodes = [], this.children = [], this.addChild(new X(e));
        },
        toText: function() {
            for (var e = new _(), t = 0, n = this.nodes; t < n.length; ) {
                var r = n[t];
                ++t, e.add(r.toText());
            }
            return e.b;
        },
        find: function(e) {
            for (var t = Y.parseCssSelector(e), n = [], r = 0; r < t.length; ) {
                var i = t[r];
                ++r;
                for (var s = 0, a = this.children; s < a.length; ) {
                    var l = a[s];
                    ++s;
                    for (var u = l.findInner(i), h = 0; h < u.length; ) {
                        var c = u[h];
                        ++h, o.indexOf(n, c, 0) < 0 && n.push(c);
                    }
                }
            }
            return n;
        },
        findInner: function(e) {
            if (0 == e.length) return [];
            var t = [];
            if (" " == e[0].type) for (var n = 0, r = this.children; n < r.length; ) {
                var i = r[n];
                ++n, t = t.concat(i.findInner(e));
            }
            if (this.isSelectorTrue(e[0])) if (e.length > 1) for (var s = e.slice(1), a = 0, l = this.children; a < l.length; ) {
                var o = l[a];
                ++a, t = t.concat(o.findInner(s));
            } else 1 == e.length && null != this.parent && t.push(this);
            return t;
        },
        isSelectorTrue: function(e) {
            for (var t = 0, n = e.tags; t < n.length; ) {
                var r = n[t];
                if (++t, this.name.toLowerCase() != r) return !1;
            }
            for (var i = 0, s = e.ids; i < s.length; ) {
                var a = s[i];
                if (++i, this.getAttribute("id") != a) return !1;
            }
            for (var o = 0, u = e.classes; o < u.length; ) {
                var h = u[o];
                ++o;
                var c = new l("(?:^|\\s)" + h + "(?:$|\\s)", ""), f = this.getAttribute("class");
                if (null == f || !c.match(f)) return !1;
            }
            return !0;
        },
        replaceChild: function(e, t) {
            t.parent = this;
            var n = o.indexOf(this.nodes, e, 0);
            this.nodes[n] = t;
            var r = o.indexOf(this.children, e, 0);
            K.__instanceof(t, q) ? this.children[r] = t : this.children.splice(r, 1);
        },
        replaceChildWithInner: function(e, t) {
            for (var n = 0, r = t.nodes; n < r.length; ) {
                var i = r[n];
                ++n, i.parent = this;
            }
            var s = o.indexOf(this.nodes, e, 0), a = this.nodes.slice(s + 1, this.nodes.length);
            this.nodes = (0 != s ? this.nodes.slice(0, s) : []).concat(t.nodes).concat(a);
            var l = o.indexOf(this.children, e, 0), u = this.children.slice(l + 1, this.children.length);
            this.children = (0 != l ? this.children.slice(0, l) : []).concat(t.children).concat(u);
        },
        removeChild: function(e) {
            var t = o.indexOf(this.nodes, e, 0);
            t >= 0 && (this.nodes.splice(t, 1), K.__instanceof(e, q) && (t = o.indexOf(this.children, e, 0), 
            t >= 0 && this.children.splice(t, 1)));
        },
        getAttributesAssoc: function() {
            for (var e = new O(), t = 0, n = this.attributes; t < n.length; ) {
                var r = n[t];
                ++t, e.set(r.name, r.value);
            }
            return e;
        },
        getAttributesObject: function() {
            for (var e = {}, t = 0, n = this.attributes; t < n.length; ) {
                var r = n[t];
                ++t, e[r.name] = r.value;
            }
            return e;
        },
        isSelfClosing: function() {
            return Object.prototype.hasOwnProperty.call(Y.SELF_CLOSING_TAGS_HTML, this.name) || this.name.indexOf(":") >= 0;
        },
        hxSerialize: function(e) {
            e.serialize(this.name), e.serialize(this.attributes), e.serialize(this.nodes);
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "innerHTML", {
                get: function() {
                    return t.get_innerHTML();
                },
                set: function(e) {
                    t.set_innerHTML(e);
                }
            }), Object.defineProperty(this, "innerText", {
                get: function() {
                    return t.get_innerText();
                },
                set: function(e) {
                    t.set_innerText(e);
                }
            }), this.name = e.unserialize(), this.attributes = e.unserialize(), this.nodes = [], 
            this.children = [];
            for (var n = e.unserialize(), r = 0; r < n.length; ) {
                var i = n[r];
                ++r, this.addChild(i);
            }
        },
        __class__: q
    });
    var X = function(e) {
        this.text = e;
    };
    s["htmlparser.HtmlNodeText"] = X, X.__name__ = [ "htmlparser", "HtmlNodeText" ], 
    X.__super__ = H, X.prototype = n(H.prototype, {
        text: null,
        toString: function() {
            return this.text;
        },
        toText: function() {
            return G.unescape(this.text);
        },
        hxSerialize: function(e) {
            e.serialize(this.text);
        },
        hxUnserialize: function(e) {
            this.text = e.unserialize();
        },
        __class__: X
    });
    var Y = function() {};
    s["htmlparser.HtmlParser"] = Y, Y.__name__ = [ "htmlparser", "HtmlParser" ], Y.run = function(e) {
        return new Y().parse(e);
    }, Y.parseAttrs = function(e) {
        for (var t = [], n = 0; n < e.length && Y.reParseAttrs.matchSub(e, n); ) {
            var r = Y.reParseAttrs.matched(1), i = Y.reParseAttrs.matched(2), s = o.substr(i, 0, 1);
            '"' == s || "'" == s ? i = o.substr(i, 1, i.length - 2) : s = "", t.push(new z(r, G.unescape(i), s));
            var a = Y.reParseAttrs.matchedPos();
            n = a.pos + a.len;
        }
        return t;
    }, Y.parseCssSelector = function(e) {
        for (var t = new l("\\s*,\\s*", ""), n = t.split(e), r = [], i = 0; i < n.length; ) {
            var s = n[i];
            ++i, "" != s && r.push(Y.parseCssSelectorInner(s));
        }
        return r;
    }, Y.parseCssSelectorInner = function(e) {
        for (var t = "[.#]?" + Y.reID + "(?::" + Y.reID + ")?", n = [], r = new l("([ >])((?:" + t + ")+|[*])", "i"), i = " " + e; r.match(i); ) {
            var s = [], a = [], u = [];
            if ("*" != r.matched(2)) {
                var h = new l(t, "i"), c = r.matched(2);
                try {
                    for (;h.match(c); ) {
                        var f = h.matched(0);
                        "#" == o.substr(f, 0, 1) ? a.push(o.substr(f, 1, null)) : "." == o.substr(f, 0, 1) ? u.push(o.substr(f, 1, null)) : s.push(f.toLowerCase()), 
                        c = h.matchedRight();
                    }
                } catch (e) {
                    throw N.lastException = e, e instanceof J && (e = e.val), new J(e);
                }
            }
            n.push({
                type: r.matched(1),
                tags: s,
                ids: a,
                classes: u
            }), i = r.matchedRight();
        }
        return n;
    }, Y.getMatched = function(e, t) {
        try {
            return e.matched(t);
        } catch (e) {
            return N.lastException = e, e instanceof J && (e = e.val), null;
        }
    }, Y.prototype = {
        matches: null,
        str: null,
        i: null,
        parse: function(e) {
            this.matches = [];
            for (var t = 0; t < e.length && Y.reMain.matchSub(e, t); ) {
                var n, r = Y.reMain.matchedPos();
                try {
                    n = Y.reMain.matched(1);
                } catch (e) {
                    N.lastException = e, e instanceof J && (e = e.val), n = null;
                }
                if (null == n || "" == n) {
                    var i = {
                        all: Y.reMain.matched(0),
                        allPos: r.pos,
                        script: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(2);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        scriptAttrs: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(3);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        scriptText: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(4);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        style: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(5);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        styleAttrs: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(6);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        styleText: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(7);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        elem: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(8);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        tagOpen: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(9);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        attrs: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(10);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        tagEnd: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(11);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        close: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(12);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        tagClose: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(13);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this),
                        comment: function() {
                            var e;
                            try {
                                e = Y.reMain.matched(14);
                            } catch (t) {
                                N.lastException = t, t instanceof J && (t = t.val), e = null;
                            }
                            return e;
                        }(this)
                    };
                    this.matches.push(i);
                }
                t = r.pos + r.len;
            }
            if (this.matches.length > 0) {
                this.str = e, this.i = 0;
                var s = this.processMatches();
                if (this.i < this.matches.length) throw new J("Error parsing XML at " + this.i + ":\n" + e);
                return s;
            }
            return e.length > 0 ? [ new X(e) ] : [];
        },
        processMatches: function() {
            var e, t = [];
            e = this.i > 0 ? this.matches[this.i - 1].allPos + this.matches[this.i - 1].all.length : 0;
            var n = this.matches[this.i].allPos;
            for (n > e && t.push(new X(o.substr(this.str, e, n - e))); this.i < this.matches.length; ) {
                var r = this.matches[this.i];
                if (null != r.elem && "" != r.elem) t.push(this.parseElement()); else if (null != r.script && "" != r.script) {
                    var i = this.newElement("script", Y.parseAttrs(r.scriptAttrs));
                    i.addChild(new X(r.scriptText)), t.push(i);
                } else if (null != r.style && "" != r.style) {
                    var s = this.newElement("style", Y.parseAttrs(r.styleAttrs));
                    s.addChild(new X(r.styleText)), t.push(s);
                } else {
                    if (null != r.close && "" != r.close) break;
                    if (null == r.comment || "" == r.comment) throw new J("Error");
                    t.push(new X(r.comment));
                }
                var a, l = this.matches[this.i].allPos + this.matches[this.i].all.length;
                a = this.i + 1 < this.matches.length ? this.matches[this.i + 1].allPos : this.str.length, 
                a > l && t.push(new X(o.substr(this.str, l, a - l))), this.i++;
            }
            return t;
        },
        parseElement: function() {
            var e = this.matches[this.i].tagOpen, t = this.matches[this.i].attrs, n = null != this.matches[this.i].tagEnd && "" != this.matches[this.i].tagEnd || this.isSelfClosingTag(e), r = this.newElement(e, Y.parseAttrs(t));
            if (!n) {
                this.i++;
                for (var i = this.processMatches(), s = 0; s < i.length; ) {
                    var a = i[s];
                    ++s, r.addChild(a);
                }
                if (null == this.matches[this.i].close || "" == this.matches[this.i].close || this.matches[this.i].tagClose != e) throw new J("XML parse error: tag <" + e + "> not closed. ParsedText = \n<pre>" + this.str + "</pre>\n");
            }
            return r;
        },
        isSelfClosingTag: function(e) {
            return Object.prototype.hasOwnProperty.call(Y.SELF_CLOSING_TAGS_HTML, e);
        },
        newElement: function(e, t) {
            return new q(e, t);
        },
        __class__: Y
    };
    var U = function() {};
    s["htmlparser.HtmlParserTools"] = U, U.__name__ = [ "htmlparser", "HtmlParserTools" ], 
    U.getAttr = function(e, t, n) {
        return null != e && e.hasAttribute(t) ? U.parseValue(e.getAttribute(t), n) : n instanceof Array && null == n.__enum__ ? null : n;
    }, U.getAttrString = function(e, t, n) {
        var r = e.getAttribute(t);
        return null == r ? n : r;
    }, U.getAttrInt = function(e, t, n) {
        var r = y.parseInt(e.getAttribute(t));
        return null == r || isNaN(r) ? n : r;
    }, U.getAttrFloat = function(e, t, n) {
        var r = y.parseFloat(e.getAttribute(t));
        return null == r || isNaN(r) ? n : r;
    }, U.getAttrBool = function(e, t, n) {
        var r = e.getAttribute(t);
        return null == r || "" == r ? n : "0" != r && "false" != r.toLowerCase() && "no" != r.toLowerCase();
    }, U.findOne = function(e, t) {
        var n = e.find(t);
        return n.length > 0 ? n[0] : null;
    }, U.parseValue = function(e, t) {
        if ("number" == typeof t) return parseFloat(e);
        if ("boolean" == typeof t) return er.bool(e);
        if (t instanceof Array && null == t.__enum__) {
            for (var n = [], r = 0, i = -1, s = 0, a = e.length; a > s; ) {
                var l = s++, o = e.charAt(l);
                "(" == o || "[" == o || "{" == o ? r++ : ")" == o || "]" == o || "}" == o ? r-- : "," == o && 0 == r && (n.push(e.substring(i + 1, l)), 
                i = l);
            }
            return n.push(e.substring(i + 1, e.length)), t.length > 0 ? n.map(function(e) {
                return U.parseValue(e, t[0]);
            }) : n;
        }
        return e;
    };
    var G = function() {};
    s["htmlparser.HtmlTools"] = G, G.__name__ = [ "htmlparser", "HtmlTools" ], G.get_htmlUnescapeMap = function() {
        if (null == G.htmlUnescapeMap) {
            var e = new O();
            null != vr.nbsp ? e.setReserved("nbsp", " ") : e.h.nbsp = " ", null != vr.amp ? e.setReserved("amp", "&") : e.h.amp = "&", 
            null != vr.lt ? e.setReserved("lt", "<") : e.h.lt = "<", null != vr.gt ? e.setReserved("gt", ">") : e.h.gt = ">", 
            null != vr.quot ? e.setReserved("quot", '"') : e.h.quot = '"', null != vr.apos ? e.setReserved("apos", "'") : e.h.apos = "'", 
            null != vr.euro ? e.setReserved("euro", "€") : e.h.euro = "€", null != vr.iexcl ? e.setReserved("iexcl", "¡") : e.h.iexcl = "¡", 
            null != vr.cent ? e.setReserved("cent", "¢") : e.h.cent = "¢", null != vr.pound ? e.setReserved("pound", "£") : e.h.pound = "£", 
            null != vr.curren ? e.setReserved("curren", "¤") : e.h.curren = "¤", null != vr.yen ? e.setReserved("yen", "¥") : e.h.yen = "¥", 
            null != vr.brvbar ? e.setReserved("brvbar", "¦") : e.h.brvbar = "¦", null != vr.sect ? e.setReserved("sect", "§") : e.h.sect = "§", 
            null != vr.uml ? e.setReserved("uml", "¨") : e.h.uml = "¨", null != vr.copy ? e.setReserved("copy", "©") : e.h.copy = "©", 
            null != vr.ordf ? e.setReserved("ordf", "ª") : e.h.ordf = "ª", null != vr.not ? e.setReserved("not", "¬") : e.h.not = "¬", 
            null != vr.shy ? e.setReserved("shy", "­") : e.h.shy = "­", null != vr.reg ? e.setReserved("reg", "®") : e.h.reg = "®", 
            null != vr.macr ? e.setReserved("macr", "¯") : e.h.macr = "¯", null != vr.deg ? e.setReserved("deg", "°") : e.h.deg = "°", 
            null != vr.plusmn ? e.setReserved("plusmn", "±") : e.h.plusmn = "±", null != vr.sup2 ? e.setReserved("sup2", "²") : e.h.sup2 = "²", 
            null != vr.sup3 ? e.setReserved("sup3", "³") : e.h.sup3 = "³", null != vr.acute ? e.setReserved("acute", "´") : e.h.acute = "´", 
            null != vr.micro ? e.setReserved("micro", "µ") : e.h.micro = "µ", null != vr.para ? e.setReserved("para", "¶") : e.h.para = "¶", 
            null != vr.middot ? e.setReserved("middot", "·") : e.h.middot = "·", null != vr.cedil ? e.setReserved("cedil", "¸") : e.h.cedil = "¸", 
            null != vr.sup1 ? e.setReserved("sup1", "¹") : e.h.sup1 = "¹", null != vr.ordm ? e.setReserved("ordm", "º") : e.h.ordm = "º", 
            null != vr.raquo ? e.setReserved("raquo", "»") : e.h.raquo = "»", null != vr.frac14 ? e.setReserved("frac14", "¼") : e.h.frac14 = "¼", 
            null != vr.frac12 ? e.setReserved("frac12", "½") : e.h.frac12 = "½", null != vr.frac34 ? e.setReserved("frac34", "¾") : e.h.frac34 = "¾", 
            null != vr.iquest ? e.setReserved("iquest", "¿") : e.h.iquest = "¿", null != vr.Agrave ? e.setReserved("Agrave", "À") : e.h.Agrave = "À", 
            null != vr.Aacute ? e.setReserved("Aacute", "Á") : e.h.Aacute = "Á", null != vr.Acirc ? e.setReserved("Acirc", "Â") : e.h.Acirc = "Â", 
            null != vr.Atilde ? e.setReserved("Atilde", "Ã") : e.h.Atilde = "Ã", null != vr.Auml ? e.setReserved("Auml", "Ä") : e.h.Auml = "Ä", 
            null != vr.Aring ? e.setReserved("Aring", "Å") : e.h.Aring = "Å", null != vr.AElig ? e.setReserved("AElig", "Æ") : e.h.AElig = "Æ", 
            null != vr.Ccedil ? e.setReserved("Ccedil", "Ç") : e.h.Ccedil = "Ç", null != vr.Egrave ? e.setReserved("Egrave", "È") : e.h.Egrave = "È", 
            null != vr.Eacute ? e.setReserved("Eacute", "É") : e.h.Eacute = "É", null != vr.Ecirc ? e.setReserved("Ecirc", "Ê") : e.h.Ecirc = "Ê", 
            null != vr.Euml ? e.setReserved("Euml", "Ë") : e.h.Euml = "Ë", null != vr.Igrave ? e.setReserved("Igrave", "Ì") : e.h.Igrave = "Ì", 
            null != vr.Iacute ? e.setReserved("Iacute", "Í") : e.h.Iacute = "Í", null != vr.Icirc ? e.setReserved("Icirc", "Î") : e.h.Icirc = "Î", 
            null != vr.Iuml ? e.setReserved("Iuml", "Ï") : e.h.Iuml = "Ï", null != vr.ETH ? e.setReserved("ETH", "Ð") : e.h.ETH = "Ð", 
            null != vr.Ntilde ? e.setReserved("Ntilde", "Ñ") : e.h.Ntilde = "Ñ", null != vr.Ograve ? e.setReserved("Ograve", "Ò") : e.h.Ograve = "Ò", 
            null != vr.Oacute ? e.setReserved("Oacute", "Ó") : e.h.Oacute = "Ó", null != vr.Ocirc ? e.setReserved("Ocirc", "Ô") : e.h.Ocirc = "Ô", 
            null != vr.Otilde ? e.setReserved("Otilde", "Õ") : e.h.Otilde = "Õ", null != vr.Ouml ? e.setReserved("Ouml", "Ö") : e.h.Ouml = "Ö", 
            null != vr.times ? e.setReserved("times", "×") : e.h.times = "×", null != vr.Oslash ? e.setReserved("Oslash", "Ø") : e.h.Oslash = "Ø", 
            null != vr.Ugrave ? e.setReserved("Ugrave", "Ù") : e.h.Ugrave = "Ù", null != vr.Uacute ? e.setReserved("Uacute", "Ú") : e.h.Uacute = "Ú", 
            null != vr.Ucirc ? e.setReserved("Ucirc", "Û") : e.h.Ucirc = "Û", null != vr.Uuml ? e.setReserved("Uuml", "Ü") : e.h.Uuml = "Ü", 
            null != vr.Yacute ? e.setReserved("Yacute", "Ý") : e.h.Yacute = "Ý", null != vr.THORN ? e.setReserved("THORN", "Þ") : e.h.THORN = "Þ", 
            null != vr.szlig ? e.setReserved("szlig", "ß") : e.h.szlig = "ß", null != vr.agrave ? e.setReserved("agrave", "à") : e.h.agrave = "à", 
            null != vr.aacute ? e.setReserved("aacute", "á") : e.h.aacute = "á", null != vr.acirc ? e.setReserved("acirc", "â") : e.h.acirc = "â", 
            null != vr.atilde ? e.setReserved("atilde", "ã") : e.h.atilde = "ã", null != vr.auml ? e.setReserved("auml", "ä") : e.h.auml = "ä", 
            null != vr.aring ? e.setReserved("aring", "å") : e.h.aring = "å", null != vr.aelig ? e.setReserved("aelig", "æ") : e.h.aelig = "æ", 
            null != vr.ccedil ? e.setReserved("ccedil", "ç") : e.h.ccedil = "ç", null != vr.egrave ? e.setReserved("egrave", "è") : e.h.egrave = "è", 
            null != vr.eacute ? e.setReserved("eacute", "é") : e.h.eacute = "é", null != vr.ecirc ? e.setReserved("ecirc", "ê") : e.h.ecirc = "ê", 
            null != vr.euml ? e.setReserved("euml", "ë") : e.h.euml = "ë", null != vr.igrave ? e.setReserved("igrave", "ì") : e.h.igrave = "ì", 
            null != vr.iacute ? e.setReserved("iacute", "í") : e.h.iacute = "í", null != vr.icirc ? e.setReserved("icirc", "î") : e.h.icirc = "î", 
            null != vr.iuml ? e.setReserved("iuml", "ï") : e.h.iuml = "ï", null != vr.eth ? e.setReserved("eth", "ð") : e.h.eth = "ð", 
            null != vr.ntilde ? e.setReserved("ntilde", "ñ") : e.h.ntilde = "ñ", null != vr.ograve ? e.setReserved("ograve", "ò") : e.h.ograve = "ò", 
            null != vr.oacute ? e.setReserved("oacute", "ó") : e.h.oacute = "ó", null != vr.ocirc ? e.setReserved("ocirc", "ô") : e.h.ocirc = "ô", 
            null != vr.otilde ? e.setReserved("otilde", "õ") : e.h.otilde = "õ", null != vr.ouml ? e.setReserved("ouml", "ö") : e.h.ouml = "ö", 
            null != vr.divide ? e.setReserved("divide", "÷") : e.h.divide = "÷", null != vr.oslash ? e.setReserved("oslash", "ø") : e.h.oslash = "ø", 
            null != vr.ugrave ? e.setReserved("ugrave", "ù") : e.h.ugrave = "ù", null != vr.uacute ? e.setReserved("uacute", "ú") : e.h.uacute = "ú", 
            null != vr.ucirc ? e.setReserved("ucirc", "û") : e.h.ucirc = "û", null != vr.uuml ? e.setReserved("uuml", "ü") : e.h.uuml = "ü", 
            null != vr.yacute ? e.setReserved("yacute", "ý") : e.h.yacute = "ý", null != vr.thorn ? e.setReserved("thorn", "þ") : e.h.thorn = "þ", 
            G.htmlUnescapeMap = e;
        }
        return G.htmlUnescapeMap;
    }, G.escape = function(e, t) {
        null == t && (t = "");
        var n = e.split("&").join("&amp;");
        return n = n.split("<").join("&lt;"), n = n.split(">").join("&gt;"), t.indexOf('"') >= 0 && (n = n.split('"').join("&quot;")), 
        t.indexOf("'") >= 0 && (n = n.split("'").join("&apos;")), t.indexOf(" ") >= 0 && (n = n.split(" ").join("&nbsp;")), 
        t.indexOf("\n") >= 0 && (n = n.split("\n").join("&#xA;")), t.indexOf("\r") >= 0 && (n = n.split("\r").join("&#xD;")), 
        n;
    }, G.unescape = function(e) {
        return new l("[<]!\\[CDATA\\[((?:.|[\r\n])*?)\\]\\][>]|&[^;]+;", "g").map(e, function(e) {
            var t = e.matched(0);
            if ("&" == t.charAt(0)) {
                var n, r = G.get_htmlUnescapeMap(), i = t.substring(1, t.length - 1);
                return n = r.get(i), null != n ? n : t;
            }
            return e.matched(1);
        });
    };
    var V = function(e, t) {
        null == t && (t = "\n"), null == e && (e = "	"), this.level = 0, this.indent = e, 
        this.newLine = t, this.cur = this.xml = new W();
    };
    s["htmlparser.XmlBuilder"] = V, V.__name__ = [ "htmlparser", "XmlBuilder" ], V.prototype = {
        indent: null,
        newLine: null,
        cur: null,
        level: null,
        xml: null,
        begin: function(e, t) {
            null != this.indent && ((this.level > 0 || this.cur.nodes.length > 0) && this.cur.addChild(new X(this.newLine + x.rpad("", this.indent, this.level * this.indent.length))), 
            this.level++);
            var n = new Q(e, null != t ? t.map(function(e) {
                return new z(e.name, e.value, '"');
            }) : []);
            return this.cur.addChild(n), this.cur = n, this;
        },
        end: function() {
            return null != this.indent && (this.level--, u.exists(this.cur.nodes, function(e) {
                return !K.__instanceof(e, X);
            }) && this.cur.addChild(new X(this.newLine + x.rpad("", this.indent, this.level * this.indent.length)))), 
            this.cur = this.cur.parent, this;
        },
        attr: function(e, t, n) {
            return null == t || "number" == typeof t && function() {
                var e, n = t;
                return e = isNaN(n);
            }(this) || t == n || (t instanceof Array && null == t.__enum__ && (t = t.join(",")), 
            this.cur.setAttribute(e, y.string(t))), this;
        },
        content: function(e) {
            return this.cur.addChild(new X(e)), this;
        },
        toString: function() {
            return this.xml.toString();
        },
        __class__: V
    };
    var Q = function(e, t) {
        q.call(this, e, t);
    };
    s["htmlparser.XmlNodeElement"] = Q, Q.__name__ = [ "htmlparser", "XmlNodeElement" ], 
    Q.__super__ = q, Q.prototype = n(q.prototype, {
        isSelfClosing: function() {
            return !0;
        },
        set_innerHTML: function(e) {
            var t = Z.run(e);
            this.nodes = [], this.children = [];
            for (var n = 0; n < t.length; ) {
                var r = t[n];
                ++n, this.addChild(r);
            }
            return e;
        },
        __class__: Q
    });
    var W = function(e) {
        null == e && (e = ""), Q.call(this, "", []);
        for (var t = Z.run(e), n = 0; n < t.length; ) {
            var r = t[n];
            ++n, this.addChild(r);
        }
    };
    s["htmlparser.XmlDocument"] = W, W.__name__ = [ "htmlparser", "XmlDocument" ], W.__super__ = Q, 
    W.prototype = n(Q.prototype, {
        __class__: W
    });
    var Z = function() {
        Y.call(this);
    };
    s["htmlparser.XmlParser"] = Z, Z.__name__ = [ "htmlparser", "XmlParser" ], Z.run = function(e) {
        return new Z().parse(e);
    }, Z.__super__ = Y, Z.prototype = n(Y.prototype, {
        isSelfClosingTag: function() {
            return !1;
        },
        newElement: function(e, t) {
            return new Q(e, t);
        },
        __class__: Z
    });
    var J = function(e) {
        Error.call(this), this.val = e, this.message = String(e), Error.captureStackTrace && Error.captureStackTrace(this, J);
    };
    s["js._Boot.HaxeError"] = J, J.__name__ = [ "js", "_Boot", "HaxeError" ], J.__super__ = Error, 
    J.prototype = n(Error.prototype, {
        val: null,
        __class__: J
    });
    var K = function() {};
    s["js.Boot"] = K, K.__name__ = [ "js", "Boot" ], K.__unhtml = function(e) {
        return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
    }, K.__trace = function(t, n) {
        var r;
        if (r = null != n ? n.fileName + ":" + n.lineNumber + ": " : "", r += K.__string_rec(t, ""), 
        null != n && null != n.customParams) for (var i = 0, s = n.customParams; i < s.length; ) {
            var a = s[i];
            ++i, r += "," + K.__string_rec(a, "");
        }
        var l;
        "undefined" != typeof document && null != (l = document.getElementById("haxe:trace")) ? l.innerHTML += K.__unhtml(r) + "<br/>" : "undefined" != typeof e && null != e.log && e.log(r);
    }, K.getClass = function(e) {
        if (e instanceof Array && null == e.__enum__) return Array;
        var t = e.__class__;
        if (null != t) return t;
        var n = K.__nativeClassName(e);
        return null != n ? K.__resolveNativeClass(n) : null;
    }, K.__string_rec = function(e, t) {
        if (null == e) return "null";
        if (t.length >= 5) return "<...>";
        var n = typeof e;
        switch ("function" == n && (e.__name__ || e.__ename__) && (n = "object"), n) {
          case "object":
            if (e instanceof Array) {
                if (e.__enum__) {
                    if (2 == e.length) return e[0];
                    var r = e[0] + "(";
                    t += "	";
                    for (var i = 2, s = e.length; s > i; ) {
                        var a = i++;
                        r += 2 != a ? "," + K.__string_rec(e[a], t) : K.__string_rec(e[a], t);
                    }
                    return r + ")";
                }
                var l = e.length, o = "[";
                t += "	";
                for (var u = 0; l > u; ) {
                    var h = u++;
                    o += (h > 0 ? "," : "") + K.__string_rec(e[h], t);
                }
                return o += "]";
            }
            var c;
            try {
                c = e.toString;
            } catch (e) {
                return N.lastException = e, e instanceof J && (e = e.val), "???";
            }
            if (null != c && c != Object.toString && "function" == typeof c) {
                var f = e.toString();
                if ("[object Object]" != f) return f;
            }
            var g = null, m = "{\n";
            t += "	";
            var d = null != e.hasOwnProperty;
            for (var g in e) (!d || e.hasOwnProperty(g)) && "prototype" != g && "__class__" != g && "__super__" != g && "__interfaces__" != g && "__properties__" != g && (2 != m.length && (m += ", \n"), 
            m += t + g + " : " + K.__string_rec(e[g], t));
            return t = t.substring(1), m += "\n" + t + "}";

          case "function":
            return "<function>";

          case "string":
            return e;

          default:
            return String(e);
        }
    }, K.__interfLoop = function(e, t) {
        if (null == e) return !1;
        if (e == t) return !0;
        var n = e.__interfaces__;
        if (null != n) for (var r = 0, i = n.length; i > r; ) {
            var s = r++, a = n[s];
            if (a == t || K.__interfLoop(a, t)) return !0;
        }
        return K.__interfLoop(e.__super__, t);
    }, K.__instanceof = function(e, t) {
        if (null == t) return !1;
        switch (t) {
          case cr:
            return (0 | e) === e;

          case gr:
            return "number" == typeof e;

          case mr:
            return "boolean" == typeof e;

          case String:
            return "string" == typeof e;

          case Array:
            return e instanceof Array && null == e.__enum__;

          case fr:
            return !0;

          default:
            if (null == e) return !1;
            if ("function" == typeof t) {
                if (e instanceof t) return !0;
                if (K.__interfLoop(K.getClass(e), t)) return !0;
            } else if ("object" == typeof t && K.__isNativeObj(t) && e instanceof t) return !0;
            return t == dr && null != e.__name__ ? !0 : t == pr && null != e.__ename__ ? !0 : e.__enum__ == t;
        }
    }, K.__cast = function(e, t) {
        if (K.__instanceof(e, t)) return e;
        throw new J("Cannot cast " + y.string(e) + " to " + y.string(t));
    }, K.__nativeClassName = function(e) {
        var t = K.__toStr.call(e).slice(8, -1);
        return "Object" == t || "Function" == t || "Math" == t || "JSON" == t ? null : t;
    }, K.__isNativeObj = function(e) {
        return null != K.__nativeClassName(e);
    }, K.__resolveNativeClass = function(e) {
        return Function("return typeof " + e + ' != "undefined" ? ' + e + " : null")();
    };
    var $ = function(e) {
        if (e instanceof Array && null == e.__enum__) this.a = e, this.byteLength = e.length; else {
            var t = e;
            this.a = [];
            for (var n = 0; t > n; ) {
                var r = n++;
                this.a[r] = 0;
            }
            this.byteLength = t;
        }
    };
    s["js.html.compat.ArrayBuffer"] = $, $.__name__ = [ "js", "html", "compat", "ArrayBuffer" ], 
    $.sliceImpl = function(e, t) {
        var n = new Ar(this, e, null == t ? null : t - e), r = new xr(n.byteLength), i = new Ar(r);
        return i.set(n), r;
    }, $.prototype = {
        byteLength: null,
        a: null,
        slice: function(e, t) {
            return new $(this.a.slice(e, t));
        },
        __class__: $
    };
    var et = function(e, t, n) {
        if (this.buf = e, this.offset = null == t ? 0 : t, this.length = null == n ? e.byteLength - this.offset : n, 
        this.offset < 0 || this.length < 0 || this.offset + this.length > e.byteLength) throw new J(j.OutsideBounds);
    };
    s["js.html.compat.DataView"] = et, et.__name__ = [ "js", "html", "compat", "DataView" ], 
    et.prototype = {
        buf: null,
        offset: null,
        length: null,
        getInt8: function(e) {
            var t = this.buf.a[this.offset + e];
            return t >= 128 ? t - 256 : t;
        },
        getUint8: function(e) {
            return this.buf.a[this.offset + e];
        },
        getInt16: function(e, t) {
            var n = this.getUint16(e, t);
            return n >= 32768 ? n - 65536 : n;
        },
        getUint16: function(e, t) {
            return t ? this.buf.a[this.offset + e] | this.buf.a[this.offset + e + 1] << 8 : this.buf.a[this.offset + e] << 8 | this.buf.a[this.offset + e + 1];
        },
        getInt32: function(e, t) {
            var n = this.offset + e, r = this.buf.a[n++], i = this.buf.a[n++], s = this.buf.a[n++], a = this.buf.a[n++];
            return t ? r | i << 8 | s << 16 | a << 24 : a | s << 8 | i << 16 | r << 24;
        },
        getUint32: function(e, t) {
            var n = this.getInt32(e, t);
            return 0 > n ? n + 4294967296 : n;
        },
        getFloat32: function(e, t) {
            return D.i32ToFloat(this.getInt32(e, t));
        },
        getFloat64: function(e, t) {
            var n = this.getInt32(e, t), r = this.getInt32(e + 4, t);
            return D.i64ToDouble(t ? n : r, t ? r : n);
        },
        setInt8: function(e, t) {
            this.buf.a[e + this.offset] = 0 > t ? t + 128 & 255 : 255 & t;
        },
        setUint8: function(e, t) {
            this.buf.a[e + this.offset] = 255 & t;
        },
        setInt16: function(e, t, n) {
            this.setUint16(e, 0 > t ? t + 65536 : t, n);
        },
        setUint16: function(e, t, n) {
            var r = e + this.offset;
            n ? (this.buf.a[r] = 255 & t, this.buf.a[r++] = t >> 8 & 255) : (this.buf.a[r++] = t >> 8 & 255, 
            this.buf.a[r] = 255 & t);
        },
        setInt32: function(e, t, n) {
            this.setUint32(e, t, n);
        },
        setUint32: function(e, t, n) {
            var r = e + this.offset;
            n ? (this.buf.a[r++] = 255 & t, this.buf.a[r++] = t >> 8 & 255, this.buf.a[r++] = t >> 16 & 255, 
            this.buf.a[r++] = t >>> 24) : (this.buf.a[r++] = t >>> 24, this.buf.a[r++] = t >> 16 & 255, 
            this.buf.a[r++] = t >> 8 & 255, this.buf.a[r++] = 255 & t);
        },
        setFloat32: function(e, t, n) {
            this.setUint32(e, D.floatToI32(t), n);
        },
        setFloat64: function(e, t, n) {
            var r = D.doubleToI64(t);
            n ? (this.setUint32(e, r.low), this.setUint32(e, r.high)) : (this.setUint32(e, r.high), 
            this.setUint32(e, r.low));
        },
        __class__: et
    };
    var tt = function() {};
    s["js.html.compat.Uint8Array"] = tt, tt.__name__ = [ "js", "html", "compat", "Uint8Array" ], 
    tt._new = function(e, t, n) {
        var r;
        if ("number" == typeof e) {
            r = [];
            for (var i = 0; e > i; ) {
                var s = i++;
                r[s] = 0;
            }
            r.byteLength = r.length, r.byteOffset = 0, r.buffer = new $(r);
        } else if (K.__instanceof(e, $)) {
            var a = e;
            null == t && (t = 0), null == n && (n = a.byteLength - t), r = 0 == t ? a.a : a.a.slice(t, t + n), 
            r.byteLength = r.length, r.byteOffset = t, r.buffer = a;
        } else {
            if (!(e instanceof Array && null == e.__enum__)) throw new J("TODO " + y.string(e));
            r = e.slice(), r.byteLength = r.length, r.byteOffset = 0, r.buffer = new $(r);
        }
        return r.subarray = tt._subarray, r.set = tt._set, r;
    }, tt._set = function(e, t) {
        var n = this;
        if (K.__instanceof(e.buffer, $)) {
            var r = e;
            if (e.byteLength + t > n.byteLength) throw new J("set() outside of range");
            for (var i = 0, s = e.byteLength; s > i; ) {
                var a = i++;
                n[a + t] = r[a];
            }
        } else {
            if (!(e instanceof Array && null == e.__enum__)) throw new J("TODO");
            var l = e;
            if (l.length + t > n.byteLength) throw new J("set() outside of range");
            for (var o = 0, u = l.length; u > o; ) {
                var h = o++;
                n[h + t] = l[h];
            }
        }
    }, tt._subarray = function(e, t) {
        var n = this, r = tt._new(n.slice(e, t));
        return r.byteOffset = e, r;
    };
    var nt = t.nanofl.Bitmap = function(e) {
        createjs.Bitmap.call(this, null), this.symbol = e, e.updateDisplayObject(this, null);
    };
    s["nanofl.Bitmap"] = nt, nt.__name__ = [ "nanofl", "Bitmap" ], nt.__super__ = createjs.Bitmap, 
    nt.prototype = n(createjs.Bitmap.prototype, {
        symbol: null,
        clone: function() {
            return this._cloneProps(new nt(this.symbol));
        },
        toString: function() {
            return this.symbol.toString();
        },
        __class__: nt
    });
    var rt = t.nanofl.MovieClip = function(e, t, n) {
        this.currentFrame = 0, this.layerOfChild = new R(), Vn.assert(K.__instanceof(e, On), null, {
            fileName: "MovieClip.hx",
            lineNumber: 28,
            className: "nanofl.MovieClip",
            methodName: "new"
        }), createjs.Container.call(this), this.symbol = e, null != t && (this.currentFrame = t), 
        e.updateDisplayObject(this, n), this.paused = !e.autoPlay, this.loop = e.loop;
        var r = function(e, t) {
            return function(n) {
                e(t, n);
            };
        }(i(this, this.stageMouseEventProxy), i(this, this.onMouseDown));
        ot.stage.addEventListener("stagemousedown", r, null);
        var s = function(e, t) {
            return function(n) {
                e(t, n);
            };
        }(i(this, this.stageMouseEventProxy), i(this, this.onMouseMove));
        ot.stage.addEventListener("stagemousemove", s, null);
        var a = function(e, t) {
            return function(n) {
                e(t, n);
            };
        }(i(this, this.stageMouseEventProxy), i(this, this.onMouseUp));
        ot.stage.addEventListener("stagemouseup", a, null);
    };
    s["nanofl.MovieClip"] = rt, rt.__name__ = [ "nanofl", "MovieClip" ], rt.applyMask = function(e, t) {
        var n = at.getOuterBounds(t);
        if (null == n || 0 == n.width || 0 == n.height) return !1;
        e = e.clone(!0), e.transformMatrix = t.getMatrix().invert(), e.visible = !0;
        var r = new createjs.Container();
        r.addChild(e);
        var i = at.getOuterBounds(r);
        if (null == i || 0 == i.width || 0 == i.height) return t.visible = !1, !1;
        if (at.smartCache(e), K.__instanceof(t, createjs.Container)) for (var s = 0, a = t.children; s < a.length; ) {
            var l = a[s];
            ++s, at.smartCache(l);
        }
        var o = i.intersection(n);
        if (null == o || 0 == o.width || 0 == o.height) return t.visible = !1, !1;
        var u = n.union(o);
        r.cache(u.x, u.y, u.width, u.height);
        var h = at.getOuterBounds(t, !0);
        return t.cache(h.x, h.y, h.width, h.height), new createjs.AlphaMaskFilter(r.cacheCanvas).applyFilter(t.cacheCanvas.getContext("2d", null), 0, 0, n.width, n.height), 
        !0;
    }, rt.__super__ = createjs.Container, rt.prototype = n(createjs.Container.prototype, {
        layerOfChild: null,
        symbol: null,
        currentFrame: null,
        paused: null,
        loop: null,
        addChildToLayer: function(e, t) {
            this.layerOfChild.set(e, t);
            for (var n = 0, r = this.children.length; r > n; ) {
                var i = n++;
                if (function(e) {
                    var t, n = e.children[i];
                    return t = e.layerOfChild.h[n.__id__];
                }(this) < t) return this.addChildAt(e, i);
            }
            return this.addChild(e);
        },
        removeAllChildren: function() {
            createjs.Container.prototype.removeAllChildren.call(this), this.layerOfChild = new R();
        },
        removeChild: function(e) {
            return this.layerOfChild.remove(e), createjs.Container.prototype.removeChild.call(this, e);
        },
        removeChildAt: function(e) {
            var t = this.children[e];
            return this.layerOfChild.remove(t), createjs.Container.prototype.removeChildAt.call(this, e);
        },
        play: function() {
            this.paused = !1;
        },
        stop: function() {
            this.paused = !0;
        },
        gotoAndStop: function(e) {
            this.gotoFrame(e), this.stop();
        },
        gotoAndPlay: function(e) {
            this.gotoFrame(e), this.play();
        },
        getTotalFrames: function() {
            return this.symbol.getTotalFrames();
        },
        onEnterFrame: function() {},
        onMouseDown: function() {},
        onMouseMove: function() {},
        onMouseUp: function() {},
        maskChild: function(e) {
            var t = this.layerOfChild.h[e.__id__];
            if (null != t) {
                var n = this.symbol.layers[t].parentIndex;
                if (null != n && "mask" == this.symbol.layers[n].type) {
                    for (var r = new createjs.Container(), i = 0, s = this.getLayerChildren(n); i < s.length; ) {
                        var a = s[i];
                        ++i;
                        var l = a.clone(!0);
                        l.visible = !0, at.smartCache(l), r.addChild(l);
                    }
                    return rt.applyMask(r, e);
                }
            }
            return !1;
        },
        uncacheChild: function(e) {
            e.uncache(), at.autoHitArea && (e.hitArea = null);
            var t = this.layerOfChild.h[e.__id__];
            if (null != t && "mask" == this.symbol.layers[t].type) for (var n = 0, r = this.children; n < r.length; ) {
                var i = r[n];
                ++n;
                var s, a = i;
                s = this.layerOfChild.h[a.__id__], null != s && this.symbol.layers[s].parentIndex == t && (i.uncache(), 
                at.autoHitArea && (i.hitArea = null));
            }
        },
        getLayerChildren: function(e) {
            for (var t = [], n = 0, r = this.children; n < r.length; ) {
                var i = r[n];
                ++n, function(e) {
                    var t, n = i;
                    return t = e.layerOfChild.h[n.__id__];
                }(this) == e && t.push(i);
            }
            return t;
        },
        gotoFrame: function(e) {
            var t = this.getFrameIndexByLabel(e);
            if (this.currentFrame == t) return null;
            for (var n = !1, r = [], i = [], s = 0, a = this.symbol.layers.length; a > s; ) {
                var l = s++, o = !1, u = this.symbol.layers[l], h = u.getFrame(this.currentFrame), c = u.getFrame(t);
                if (null != h && null != c && h.keyFrame == c.keyFrame) {
                    if (null != c.keyFrame.motionTween) {
                        var f = u.getTweenedElements(t), g = this.getLayerChildren(l);
                        Vn.assert(f.length == g.length, "tweenedElements.length=" + f.length + " != layerChildren.length=" + g.length, {
                            fileName: "MovieClip.hx",
                            lineNumber: 241,
                            className: "nanofl.MovieClip",
                            methodName: "gotoFrame"
                        });
                        for (var m = 0, d = f.length; d > m; ) {
                            var p = m++;
                            f[p].current.updateDisplayObject(g[p], null), g[p].visible = "normal" == u.type, 
                            (K.__instanceof(f[p].current, rt) || K.__instanceof(f[p].current, createjs.Sprite)) && i.push(f[p].current);
                        }
                        o = !0;
                    }
                } else if (null != h || null != c) {
                    if (null != h) for (var v = 0; v < this.children.length; ) (function(e) {
                        var t, n = e.children[v];
                        return t = e.layerOfChild.h[n.__id__];
                    })(this) == l ? this.removeChildAt(v) : v++;
                    if (null != c) for (var y = 0, _ = u.getTweenedElements(t); y < _.length; ) {
                        var x = _[y];
                        ++y;
                        var A = x.current.createDisplayObject(null);
                        A.visible = "normal" == u.type, this.addChildToLayer(A, l), r.push(A);
                    }
                    o = !0;
                }
                if (o && (n = !0, "mask" == u.type)) for (var b = 0, w = this.symbol.layers.length; w > b; ) {
                    var N = b++;
                    if (this.symbol.layers[N].parentIndex == l) for (var E = 0, S = this.getLayerChildren(N); E < S.length; ) {
                        var C = S[E];
                        ++E, C.uncache();
                    }
                }
            }
            n && at.smartUncache(this), this.currentFrame = t;
            for (var P = 0; P < r.length; ) {
                var I = r[P];
                ++P, at.callMethod(I, "init");
            }
            return i;
        },
        getFrameIndexByLabel: function(e) {
            if ((0 | e) === e) return e;
            for (var t = o.iter(this.symbol.layers); t.hasNext(); ) for (var n = t.next(), r = o.iter(n.keyFrames); r.hasNext(); ) {
                var i = r.next();
                if (i.label == e) return i.getIndex();
            }
            return null;
        },
        advance: function() {
            var e = null;
            if (this.paused || (e = this.gotoFrame(this.loop ? (this.currentFrame + 1) % this.getTotalFrames() : er.min(this.currentFrame + 1, this.getTotalFrames() - 1))), 
            null == e) for (var t = 0, n = this.children; t < n.length; ) {
                var r = n[t];
                ++t, K.__instanceof(r, rt) ? r.advance() : K.__instanceof(r, createjs.Sprite) && r.advance();
            } else for (var i = 0; i < e.length; ) {
                var s = e[i];
                ++i, s.advance();
            }
        },
        clone: function() {
            return this._cloneProps(new rt(this.symbol, this.currentFrame, null));
        },
        toString: function() {
            return this.symbol.toString();
        },
        stageMouseEventProxy: function(e, t) {
            var n = t.currentTarget;
            t.currentTarget = this, e(t), t.currentTarget = n;
        },
        __class__: rt
    });
    var it = t.nanofl.Button = function(e) {
        if (rt.call(this, e, 0, null), this.stop(), this.getTotalFrames() >= 4) {
            var t;
            t = K.__cast(e.duplicate("__nanofl_temp"), On), t.likeButton = !1, t.linkedClass = "", 
            this.hitArea = t.createDisplayObject(3, null), t.remove();
        }
        this.cursor = "pointer";
    };
    s["nanofl.Button"] = it, it.__name__ = [ "nanofl", "Button" ], it.__super__ = rt, 
    it.prototype = n(rt.prototype, {
        onMouseDown: function(e) {
            this.getTotalFrames() >= 3 && 2 != this.currentFrame && (null != this.hitArea ? this.hitArea : this).hitTest(e.localX, e.localY) && this.gotoAndStop(2);
        },
        onMouseMove: function(e) {
            this.getTotalFrames() >= 2 && 2 != this.currentFrame && this.gotoAndStop((null != this.hitArea ? this.hitArea : this).hitTest(e.localX, e.localY) ? 1 : 0);
        },
        onMouseUp: function() {
            this.getTotalFrames() > 0 && 0 != this.currentFrame && this.gotoAndStop(0);
        },
        __class__: it
    });
    var st = t.nanofl.DataTools = function() {};
    s["nanofl.DataTools"] = st, st.__name__ = [ "nanofl", "DataTools" ], st.serialize = function(e) {
        return $n.run(e, !0);
    }, st.unserialize = function(e) {
        return nr.run(e);
    };
    var at = t.nanofl.DisplayObjectTools = function() {};
    s["nanofl.DisplayObjectTools"] = at, at.__name__ = [ "nanofl", "DisplayObjectTools" ], 
    at.smartCache = function(e) {
        if (e.visible && null == e.cacheCanvas) {
            if (K.__instanceof(e, createjs.Container) && !K.__instanceof(e, ft)) for (var t = 0, n = e.children; t < n.length; ) {
                var r = n[t];
                ++t, at.smartCache(r);
            }
            if ((null == e.parent || !K.__instanceof(e.parent, rt) || !e.parent.maskChild(e)) && null != e.filters && e.filters.length > 0) {
                var i = at.getInnerBounds(e);
                if (null != i && i.width > 0 && i.height > 0 && (e.cache(i.x, i.y, i.width, i.height), 
                at.autoHitArea)) {
                    var s = new createjs.Container(), a = new createjs.Bitmap(e.cacheCanvas);
                    a.x = e._cacheOffsetX + e._filterOffsetX, a.y = e._cacheOffsetY + e._filterOffsetY, 
                    s.addChild(a), e.hitArea = s;
                }
            }
        }
    }, at.smartUncache = function(e) {
        for (var t = null; null != e; ) e.uncache(), at.autoHitArea && (e.hitArea = null), 
        K.__instanceof(e, rt) && null != t && e.uncacheChild(t), t = e, e = e.parent;
    }, at.getOuterBounds = function(e, t) {
        null == t && (t = !1);
        var n = null;
        if (K.__instanceof(e, createjs.Container) && !K.__instanceof(e, ft)) for (var r = 0, i = e.children; r < i.length; ) {
            var s = i[r];
            ++r;
            var a = pn.transform(at.getOuterBounds(s), s.getMatrix());
            null != a && (n = null != n ? n.union(a) : a);
        } else n = at.getInnerBounds(e);
        if (null == n) return null;
        if (!t && null != e.filters) for (var l = 0, o = e.filters; l < o.length; ) {
            var u = o[l];
            ++l, u.getBounds(n);
        }
        return n;
    }, at.getInnerBounds = function(e) {
        var t = null;
        if (K.__instanceof(e, createjs.Container) && !K.__instanceof(e, ft)) {
            for (var n = 0, r = e.children; n < r.length; ) {
                var i = r[n];
                ++n;
                var s = pn.transform(at.getInnerBounds(i), i.getMatrix());
                null != s && (t = null != t ? t.union(s) : s);
            }
            if (null == t) return null;
        } else {
            if (null == e.cacheCanvas) t = e.getBounds(); else {
                var a = e.cacheCanvas;
                e.cacheCanvas = null, t = e.getBounds(), e.cacheCanvas = a;
            }
            if (null == t) return null;
            t = t.clone();
        }
        return t;
    }, at.callMethod = function(e, t) {
        if (K.__instanceof(e, createjs.Container)) for (var n = 0, r = e.children; n < r.length; ) {
            var i = r[n];
            ++n, at.callMethod(i, t);
        }
        var s = f.field(e, t);
        f.isFunction(s) && s.apply(e, []);
    }, at.smartHitTest = function(e, t, n, r) {
        if (null == r && (r = 1), null == e.cacheCanvas) return e.hitTest(t, n);
        if (t < e._cacheOffsetX || n < e._cacheOffsetY || t > e._cacheOffsetX + e._cacheWidth || n > e._cacheOffsetY + e._cacheHeight) return !1;
        t = Math.round((t - e._cacheOffsetX - e._filterOffsetX) * e._cacheScale), n = Math.round((n - e._cacheOffsetY - e._filterOffsetY) * e._cacheScale);
        var i = e.cacheCanvas.getContext("2d", null).getImageData(t, n, 1, 1).data[3];
        return i >= r;
    }, at.dump = function(e, t) {
        null == t && (t = 0);
        var n = x.rpad("", "	", t);
        if (n += K.__instanceof(e, rt) ? "MovieClip(" + e.symbol.namePath + ")" : K.__instanceof(e, ft) ? "TextField" : K.__instanceof(e, nt) ? "Bitmap(" + e.symbol.namePath + ")" : K.__instanceof(e, createjs.Container) ? "Container" : K.__instanceof(e, createjs.Shape) ? "Shape" : "Unknow", 
        null != e.cacheCanvas && (n += " cached"), null != e._bounds && (n += " fixed"), 
        n += " bounds(" + at.rectToString(e.getBounds()) + ")", n += " outers(" + at.rectToString(at.getOuterBounds(e)) + ")", 
        K.__instanceof(e, ft) && (n += " '" + x.replace(x.replace(e.text, "\r", " "), "\n", " ") + "'"), 
        C.trace(n, {
            fileName: "DisplayObjectTools.hx",
            lineNumber: 211,
            className: "nanofl.DisplayObjectTools",
            methodName: "dump"
        }), K.__instanceof(e, createjs.Container) && !K.__instanceof(e, ft)) for (var r = 0, i = e.children; r < i.length; ) {
            var s = i[r];
            ++r, at.dump(s, t + 1);
        }
    }, at.rectToString = function(e) {
        return null == e ? "null" : e.x + "," + e.y + " " + e.width + " x " + e.height;
    };
    var lt = t.nanofl.Mesh = function(e) {
        this.rotationY = 0, this.rotationX = 0, createjs.Bitmap.call(this, null), this.symbol = e, 
        e.updateDisplayObject(this, null);
    };
    s["nanofl.Mesh"] = lt, lt.__name__ = [ "nanofl", "Mesh" ], lt.__super__ = createjs.Bitmap, 
    lt.prototype = n(createjs.Bitmap.prototype, {
        symbol: null,
        rotationX: null,
        rotationY: null,
        get_canvas: function() {
            return this.image;
        },
        clone: function() {
            return this._cloneProps(new lt(this.symbol));
        },
        toString: function() {
            return this.symbol.toString();
        },
        getBounds: function() {
            return new createjs.Rectangle(0, 0, 2 * this.symbol.size, 2 * this.symbol.size);
        },
        draw: function(e, t) {
            return this.update(), createjs.Bitmap.prototype.draw.call(this, e, t);
        },
        update: function() {
            null == this.image && (this.image = window.document.createElement("canvas")), this.get_canvas().width = 2 * this.symbol.size, 
            this.get_canvas().height = 2 * this.symbol.size;
            var e, t = new THREE.Scene();
            e = null != this.symbol.data.materials ? new THREE.MeshFaceMaterial(this.symbol.data.materials) : new THREE.MeshBasicMaterial({
                color: 11184810
            });
            var n = new THREE.Mesh(this.symbol.data.geometry, e);
            n.rotateX(this.rotationX * Math.PI / 180), n.rotateY(this.rotationY * Math.PI / 180), 
            t.add(n), t.add(new THREE.DirectionalLight(16777215, 1));
            var r = this.symbol.data.geometry.boundingSphere.radius, i = new THREE.PerspectiveCamera(70, 1, 1e-7, 1e7);
            i.position.z = 2 * -r, i.lookAt(new THREE.Vector3(0, 0, 0)), i.updateMatrix(), i.updateProjectionMatrix(), 
            t.add(i);
            var s = new THREE.CanvasRenderer({
                canvas: this.get_canvas(),
                alpha: !0
            });
            s.setSize(2 * this.symbol.size, 2 * this.symbol.size), s.render(t, i);
        },
        __class__: lt
    });
    var ot = t.nanofl.Player = function() {};
    s["nanofl.Player"] = ot, ot.__name__ = [ "nanofl", "Player" ], ot.init = function(e, t, n, r, i) {
        if (null == r && (r = "custom"), null == n && (n = 24), ot.library = t, null != i) for (var s = 0; s < i.length; ) {
            var a = i[s];
            ++s;
            for (var l = 0, o = f.fields(a); l < o.length; ) {
                var u = o[l];
                ++l, f.setField(ot.spriteSheets, u, new createjs.SpriteSheet(f.field(a, u)));
            }
        }
        createjs.Sound.alternateExtensions = [ "ogg", "mp3", "wav" ], createjs.Sound.registerSounds(t.getSounds().map(function(e) {
            return {
                src: e.getUrl(),
                id: e.linkage
            };
        }), null), t.preload(function() {
            if (ot.stage = new ct(e), r != Xt.custom) {
                var i = e.width, s = e.height;
                window.addEventListener("resize", function() {
                    ot.resize(e, r, i, s);
                }), ot.resize(e, r, i, s);
            }
            ot.stage.addChild(ot.scene = t.getSceneInstance().createDisplayObject(null)), at.callMethod(ot.scene, "init"), 
            at.callMethod(ot.scene, "onEnterFrame"), ot.stage.update(), createjs.Ticker.framerate = n, 
            createjs.Ticker.addEventListener("tick", function() {
                ot.scene.advance(), at.callMethod(ot.scene, "onEnterFrame"), ot.stage.update();
            });
        });
    }, ot.resize = function(e, t, n, r) {
        window.document.body.style.width = window.innerWidth + "px", window.document.body.style.height = window.innerHeight + "px";
        var i, s;
        switch (t) {
          case "fit":
            i = s = Math.min(window.innerWidth / n, window.innerHeight / r);
            break;

          case "fill":
            i = s = Math.max(window.innerWidth / n, window.innerHeight / r);
            break;

          case "stretch":
            i = window.innerWidth / n, s = window.innerHeight / r;
            break;

          default:
            i = s = 1;
        }
        e.width = Math.round(n * i), e.height = Math.round(r * s), e.style.left = Math.round((window.innerWidth - e.width) / 2) + "px", 
        e.style.top = Math.round((window.innerHeight - e.height) / 2) + "px", ot.stage.scaleX = i, 
        ot.stage.scaleY = s;
    };
    var ut = t.nanofl.SeamlessSoundLoop = function(e) {
        this.n = 1, null != e.duration && 0 != e.duration && (null == ut.delay && (ut.delay = this.detectDelay()), 
        this.sounds = [ e, createjs.Sound.createInstance(e.src) ], this.switchSound());
    };
    s["nanofl.SeamlessSoundLoop"] = ut, ut.__name__ = [ "nanofl", "SeamlessSoundLoop" ], 
    ut.prototype = {
        sounds: null,
        timer: null,
        n: null,
        stop: function() {
            this.sounds[0].destroy(), this.sounds[1].destroy(), this.timer.stop();
        },
        switchSound: function() {
            this.n = 1 == this.n ? 0 : 1, this.sounds[this.n].play(), this.timer = I.delay(i(this, this.switchSound), Math.round(this.sounds[0].duration));
        },
        detectDelay: function() {
            var e = window, t = window.document;
            return null != e.mozInnerScreenX && new l("firefox", "i").match(window.navigator.userAgent) ? -25 : t.all ? -30 : e.chrome ? -25 : new l("safari", "i").match(window.navigator.userAgent) && e.getComputedStyle && !e.globalStorage ? -30 : 0;
        },
        __class__: ut
    };
    var ht = t.nanofl.SpriteButton = function(e) {
        createjs.Sprite.call(this, e), this.stop(), e.getNumFrames() >= 4 && (this.hitArea = e.getFrame(3)), 
        this.cursor = "pointer";
        var t = function(e, t) {
            return function(n) {
                e(t, n);
            };
        }(i(this, this.stageMouseEventProxy), i(this, this.onMouseDown));
        ot.stage.addEventListener("stagemousedown", t, null);
        var n = function(e, t) {
            return function(n) {
                e(t, n);
            };
        }(i(this, this.stageMouseEventProxy), i(this, this.onMouseMove));
        ot.stage.addEventListener("stagemousemove", n, null);
        var r = function(e, t) {
            return function(n) {
                e(t, n);
            };
        }(i(this, this.stageMouseEventProxy), i(this, this.onMouseUp));
        ot.stage.addEventListener("stagemouseup", r, null);
    };
    s["nanofl.SpriteButton"] = ht, ht.__name__ = [ "nanofl", "SpriteButton" ], ht.__super__ = createjs.Sprite, 
    ht.prototype = n(createjs.Sprite.prototype, {
        onMouseDown: function(e) {
            this.spriteSheet.getNumFrames() >= 3 && 2 != this.currentFrame && (null != this.hitArea ? this.hitArea : this).hitTest(e.localX, e.localY) && this.gotoAndStop(2);
        },
        onMouseMove: function(e) {
            this.spriteSheet.getNumFrames() >= 2 && 2 != this.currentFrame && this.gotoAndStop((null != this.hitArea ? this.hitArea : this).hitTest(e.localX, e.localY) ? 1 : 0);
        },
        onMouseUp: function() {
            this.spriteSheet.getNumFrames() > 0 && 0 != this.currentFrame && this.gotoAndStop(0);
        },
        stageMouseEventProxy: function(e, t) {
            var n = t.currentTarget;
            t.currentTarget = this, e(t), t.currentTarget = n;
        },
        __class__: ht
    });
    var ct = t.nanofl.Stage = function(e) {
        createjs.Stage.call(this, e), this.tickOnUpdate = !1, this.enableMouseOver(10);
    };
    s["nanofl.Stage"] = ct, ct.__name__ = [ "nanofl", "Stage" ], ct.__super__ = createjs.Stage, 
    ct.prototype = n(createjs.Stage.prototype, {
        update: function(e) {
            at.smartCache(this), createjs.Stage.prototype.update.call(this, e);
        },
        __class__: ct
    });
    var ft = t.nanofl.TextField = function(e, t, n, r, i, s, a) {
        null == i && (i = !1), null == r && (r = !1), null == n && (n = !1), null == t && (t = 0), 
        null == e && (e = 0), this._dashedBorder = !1, this._border = !1;
        var l = this;
        Object.defineProperty(this, "minWidth", {
            get: function() {
                return l.get_minWidth();
            }
        }), Object.defineProperty(this, "minHeight", {
            get: function() {
                return l.get_minHeight();
            }
        }), Object.defineProperty(this, "width", {
            get: function() {
                return l.get_width();
            },
            set: function(e) {
                l.set_width(e);
            }
        }), Object.defineProperty(this, "height", {
            get: function() {
                return l.get_height();
            },
            set: function(e) {
                l.set_height(e);
            }
        }), Object.defineProperty(this, "border", {
            get: function() {
                return l.get_border();
            },
            set: function(e) {
                l.set_border(e);
            }
        }), Object.defineProperty(this, "dashedBorder", {
            get: function() {
                return l.get_dashedBorder();
            },
            set: function(e) {
                l.set_dashedBorder(e);
            }
        }), Object.defineProperty(this, "newTextFormat", {
            get: function() {
                return l.get_newTextFormat();
            },
            set: function(e) {
                l.set_newTextFormat(e);
            }
        }), Object.defineProperty(this, "text", {
            get: function() {
                return l.get_text();
            },
            set: function(e) {
                l.set_text(e);
            }
        }), createjs.Container.call(this), this.width = e, this.height = t, this.selectable = n, 
        this.border = r, this.dashedBorder = i, this.textRuns = null != s ? s : [], this.newTextFormat = a, 
        this.resize = new Qn(this), this.change = new Qn(this);
        for (var o = 0, u = this.textRuns; o < u.length; ) {
            var h = u[o];
            ++o, h.characters = x.replace(x.replace(h.characters, "\r\n", "\n"), "\r", "\n");
        }
        this.textLines = [], this.addChild(this.globalBackground = new createjs.Shape()), 
        this.addChild(this.background = new createjs.Shape()), this.addChild(this.textsContainer = new createjs.Container()), 
        this.addChild(this.borders = new createjs.Shape()), this.addChild(this.caret = new createjs.Shape()), 
        this.hitBox = new createjs.Shape(), this.optionsChanged();
    };
    s["nanofl.TextField"] = ft, ft.__name__ = [ "nanofl", "TextField" ], ft.measureFontHeight = function(e, t, n) {
        var r = e + "|" + t + "|" + n;
        if (ft.fontHeightCache.exists(r)) return ft.fontHeightCache.get(r);
        var i = window.document.createElement("div");
        i.innerHTML = "Mp", i.style.position = "absolute", i.style.top = "0", i.style.left = "0", 
        i.style.fontFamily = e, i.style.fontWeight = t.indexOf("bold") >= 0 ? "bold" : "normal", 
        i.style.fontStyle = t.indexOf("italic") >= 0 ? "italic" : "normal", i.style.fontSize = n + "px", 
        i.style.lineHeight = "normal", null == window.document.body && (window.document.body = window.document.querySelector("body")), 
        window.document.body.appendChild(i);
        var s = i.offsetHeight;
        return window.document.body.removeChild(i), ft.fontHeightCache.set(r, s), s;
    }, ft.measureFontBaselineCoef = function(e, t) {
        var n = e + "|" + t;
        if (ft.fontBaselineCoefCache.exists(n)) return ft.fontBaselineCoefCache.get(n);
        var r = window.document.createElement("div");
        r.style.height = "100px", r.style.position = "absolute", r.style.top = "0", r.style.left = "0";
        var i = window.document.createElement("span");
        i.style.fontFamily = e, i.style.fontWeight = t.indexOf("bold") >= 0 ? "bold" : "normal", 
        i.style.fontStyle = t.indexOf("italic") >= 0 ? "italic" : "normal", i.style.fontSize = "100px", 
        i.style.lineHeight = "0", i.innerHTML = "A";
        var s = window.document.createElement("span");
        s.style.fontFamily = e, s.style.fontWeight = t.indexOf("bold") >= 0 ? "bold" : "normal", 
        s.style.fontStyle = t.indexOf("italic") >= 0 ? "italic" : "normal", s.style.fontSize = "999px", 
        s.style.lineHeight = "normal", s.style.display = "inline-block", s.style.height = "100px", 
        s.innerHTML = "", r.appendChild(i), r.appendChild(s), window.document.body.appendChild(r);
        var a = 1 - (i.offsetTop + i.offsetHeight - r.offsetHeight - r.offsetTop) / 100;
        return r.remove(), ft.fontBaselineCoefCache.set(n, a), a;
    }, ft.log = function() {}, ft.__super__ = createjs.Container, ft.prototype = n(createjs.Container.prototype, {
        _minWidth: null,
        minWidth: null,
        get_minWidth: function() {
            return this.update(), this._minWidth;
        },
        _minHeight: null,
        minHeight: null,
        get_minHeight: function() {
            return this.update(), this._minHeight;
        },
        _width: null,
        width: null,
        get_width: function() {
            return this._width;
        },
        set_width: function(e) {
            return this._width != e && (this._width = e, this.needUpdate = !0), e;
        },
        _height: null,
        height: null,
        get_height: function() {
            return this._height;
        },
        set_height: function(e) {
            return this._height != e && (this._height = e, this.needUpdate = !0), e;
        },
        selectable: null,
        _border: null,
        border: null,
        get_border: function() {
            return this._border;
        },
        set_border: function(e) {
            return this._border != e && (this._border = e, this.optionsChanged()), e;
        },
        _dashedBorder: null,
        dashedBorder: null,
        get_dashedBorder: function() {
            return this._dashedBorder;
        },
        set_dashedBorder: function(e) {
            return this._dashedBorder != e && (this._dashedBorder = e, this.optionsChanged()), 
            e;
        },
        textRunsOnLastUpdate: null,
        textRuns: null,
        needUpdate: null,
        textLines: null,
        _newTextFormat: null,
        newTextFormat: null,
        get_newTextFormat: function() {
            return this._newTextFormat;
        },
        set_newTextFormat: function(e) {
            return this._newTextFormat = null != e ? e : new gt();
        },
        globalBackground: null,
        background: null,
        textsContainer: null,
        borders: null,
        caret: null,
        hitBox: null,
        resize: null,
        change: null,
        text: null,
        get_text: function() {
            return this.textRuns.map(function(e) {
                return e.characters;
            }).join("");
        },
        set_text: function(e) {
            return this.textRuns.length > 0 && (this.newTextFormat = this.textRuns[0]), this.textRuns.splice(0, this.textRuns.length), 
            this.textRuns.push(this.newTextFormat.duplicate(e)), e;
        },
        getSplittedByPosition: function(e, t, n) {
            null == n && (n = "");
            var r = [];
            if (t > 0) for (var i = 0, s = 0; s < e.length; ) {
                var a = e[s];
                ++s;
                var l = a.characters.length;
                t > i && i + l > t ? (r.push(a.duplicate(o.substr(a.characters, 0, t - i))), n.length > 0 && r.push(a.duplicate(n)), 
                r.push(a.duplicate(o.substr(a.characters, t - i, l - (t - i)))), l += n.length) : (r.push(a.clone()), 
                t == i + l && n.length > 0 && (r.push(a.duplicate(n)), l += n.length)), i += l;
            } else {
                n.length > 0 && r.push(e.length > 0 ? e[0].duplicate(n) : this.newTextFormat.duplicate(n));
                for (var u = 0; u < e.length; ) {
                    var h = e[u];
                    ++u, r.push(h);
                }
            }
            return r;
        },
        getSplittedToLines: function(e) {
            for (var t = [], n = [], r = 0; r < e.length; ) {
                var i = e[r];
                ++r;
                var s = i.characters.split("\n");
                if (1 == s.length) "" != i.characters && n.push(i); else for (var a = 0, l = s.length; l > a; ) {
                    var o = a++;
                    "" != s[o] && n.push(i.duplicate(s[o])), o < s.length - 1 && (n.push(i.duplicate(" ")), 
                    t.push(n), n = []);
                }
            }
            return 0 == n.length && n.push(e.length > 0 ? e[e.length - 1].duplicate(" ") : this.newTextFormat.duplicate(" ")), 
            t.push(n), t;
        },
        getTextLines: function() {
            var e = this.textRuns.slice();
            this.selectable && !this.dashedBorder && (e = this.getSplittedByPosition(e, 0));
            for (var t = this.getSplittedToLines(e), n = [], r = 0, i = 0, s = t.length; s > i; ) {
                for (var a = i++, l = [ [] ], o = 0, u = t[a]; o < u.length; ) {
                    var h = [ u[o] ];
                    ++o, h[0].kerning ? l[0].push(h[0]) : k.iter(h[0].characters, function(e, t) {
                        return function(n) {
                            var r = new k();
                            r.__b += String.fromCharCode(n), t[0].push(e[0].duplicate(r.__b));
                        };
                    }(h, l));
                }
                for (var c = 0, f = 1e10, g = -1e10, m = null, d = [], p = 0, v = l[0].length; v > p; ) {
                    var y = p++, _ = l[0][y], A = this.selectable && !this.dashedBorder && r >= 0 && 0 > r, b = this.createFirstText(_, A), w = b.getBounds(), N = ft.measureFontHeight(_.family, _.style, _.size), E = ft.measureFontBaselineCoef(_.family, _.style);
                    Vn.assert(null != _.letterSpacing, null, {
                        fileName: "TextField.hx",
                        lineNumber: 290,
                        className: "nanofl.TextField",
                        methodName: "getTextLines"
                    }), b.setBounds(w.x, -N * E, w.width + (_.kerning ? 0 : _.letterSpacing), N), w = b.getBounds(), 
                    (a == t.length - 1 || y < l[0].length - 1) && (c += w.width), f = Math.min(f, w.y), 
                    g = Math.max(g, w.y + w.height), Vn.assert(null != _.lineSpacing, null, {
                        fileName: "TextField.hx",
                        lineNumber: 308,
                        className: "nanofl.TextField",
                        methodName: "getTextLines"
                    }), m = null != m ? Math.max(m, _.lineSpacing) : _.lineSpacing, d.push({
                        text: b,
                        textSecond: this.createSecondText(_, A),
                        charIndex: r,
                        bounds: w,
                        backgroundColor: A ? "darkblue" : _.backgroundColor,
                        format: _
                    }), r += _.characters.length;
                }
                n.push({
                    chunks: d,
                    width: c,
                    minY: f,
                    maxY: g,
                    align: x.trim(l[0][0].align).toLowerCase(),
                    spacing: m - 2
                });
            }
            return n;
        },
        update: function() {
            if (this.needUpdate || this.isTextChanged()) {
                this.needUpdate = !1, gt.optimize(this.textRuns), this.textRunsOnLastUpdate = this.textRuns.map(function(e) {
                    return e.clone();
                }), this.globalBackground.visible = !1, this.borders.visible = !1;
                var e = !1;
                this.textLines = this.getTextLines(), this._minWidth = 0, this._minHeight = 2 * ft.PADDING;
                for (var t = 0, n = this.textLines; t < n.length; ) {
                    var r = n[t];
                    if (++t, this._minWidth = Math.max(this._minWidth, r.width + 2 * ft.PADDING), this._minWidth > this.width) {
                        var i = r.align;
                        switch (i) {
                          case "center":
                            this.x -= (r.width - (this.width - 2 * ft.PADDING)) / 2;
                            break;

                          case "right":
                            this.x -= r.width - (this.width - 2 * ft.PADDING);
                        }
                        this.width = r.width + 2 * ft.PADDING, e = !0;
                    }
                    this._minHeight += r.maxY - r.minY + r.spacing;
                }
                this.textLines.length > 0 && (this._minHeight -= this.textLines[this.textLines.length - 1].spacing), 
                this._minHeight > this.height && (this.height = this._minHeight, e = !0), this.textsContainer.removeAllChildren(), 
                this.background.graphics.clear();
                for (var s = ft.PADDING, a = 0, l = this.textLines.length; l > a; ) {
                    var o, u = a++, h = this.textLines[u];
                    o = ft.PADDING + function(e) {
                        var t, n = h.align;
                        return t = function(e) {
                            var t;
                            switch (n) {
                              case "center":
                                t = (e.width - 2 * ft.PADDING - h.width) / 2;
                                break;

                              case "right":
                                t = e.width - 2 * ft.PADDING - h.width;
                                break;

                              default:
                                t = 0;
                            }
                            return t;
                        }(e);
                    }(this);
                    for (var c = 0, f = h.chunks; c < f.length; ) {
                        var g = f[c];
                        ++c, null != g.textSecond && this.textsContainer.addChild(g.textSecond), this.textsContainer.addChild(g.text), 
                        g.text.x = o, g.text.y = s - h.minY, null != g.backgroundColor && this.background.graphics.beginFill(g.backgroundColor).rect(g.text.x + g.bounds.x, g.text.y + h.minY, g.bounds.width, h.maxY - h.minY).endFill(), 
                        null != g.textSecond && (g.textSecond.x = g.text.x, g.textSecond.y = g.text.y), 
                        o += g.bounds.width;
                    }
                    s += h.maxY - h.minY + h.spacing;
                }
                if (this.border || this.dashedBorder) {
                    var m = this.localToGlobal(0, 0);
                    m = this.globalToLocal(Math.round(m.x) + .5, Math.round(m.y) + .5);
                    var d = this.localToGlobal(this.width, this.height);
                    d = this.globalToLocal(Math.round(d.x) + .5, Math.round(d.y) + .5), this.border && (this.globalBackground.visible = !0, 
                    this.globalBackground.graphics.clear().beginFill("#FFFFFF").rect(m.x, m.y, d.x - m.x, d.y - m.y).endFill()), 
                    this.drawBorders(m, d);
                }
                e && this.resize.call({
                    width: this.width,
                    height: this.height
                }), this.updateHitArea(), this.setBounds(0, 0, this.width, this.height);
            }
        },
        draw: function(e, t) {
            return this.update(), createjs.Container.prototype.draw.call(this, e, t);
        },
        drawBorders: function(e, t) {
            if (this.border) this.borders.visible = !0, this.borders.graphics.clear().setStrokeStyle(1, null, null, null, !0).beginStroke("#000000").rect(e.x, e.y, t.x - e.x, t.y - e.y).endStroke(); else if (this.dashedBorder) {
                this.borders.visible = !0;
                var n = this.globalToLocal(0, 0), r = this.globalToLocal(2, 2), i = (Math.abs(r.x - n.x) + Math.abs(r.y - n.y)) / 2;
                qt.drawDashedRect(this.borders.graphics.clear().setStrokeStyle(1, null, null, null, !0), e.x, e.y, t.x, t.y, "#000000", "#FFFFFF", i);
            }
        },
        updateHitArea: function() {
            this.hitBox.graphics.clear().beginFill("#000000").rect(0, 0, this.width, this.height).endFill();
        },
        optionsChanged: function() {
            this.hitArea = this.hitBox, this.needUpdate = !0;
        },
        updateStage: function() {
            this.update(), null != this.stage && this.stage.update();
        },
        isTextChanged: function() {
            if (this.textRunsOnLastUpdate.length != this.textRuns.length) return !0;
            for (var e = 0, t = this.textRuns.length; t > e; ) {
                var n = e++;
                if (!this.textRunsOnLastUpdate[n].equ(this.textRuns[n])) return !0;
            }
            return !1;
        },
        createFirstText: function(e, t) {
            return !t && e.isStroked() ? e.createText(e.strokeColor, e.strokeSize) : e.createText(t ? "white" : e.fillColor);
        },
        createSecondText: function(e, t) {
            return !t && e.isFilled() && e.isStroked() ? e.createText() : null;
        },
        clone: function(e) {
            return this._cloneProps(new ft(this.width, this.height, this.selectable, this.border, this.dashedBorder, e ? this.textRuns.map(function(e) {
                return e.clone();
            }) : this.textRuns, e && null != this.newTextFormat ? this.newTextFormat.clone() : this.newTextFormat));
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "minWidth", {
                get: function() {
                    return t.get_minWidth();
                }
            }), Object.defineProperty(this, "minHeight", {
                get: function() {
                    return t.get_minHeight();
                }
            }), Object.defineProperty(this, "width", {
                get: function() {
                    return t.get_width();
                },
                set: function(e) {
                    t.set_width(e);
                }
            }), Object.defineProperty(this, "height", {
                get: function() {
                    return t.get_height();
                },
                set: function(e) {
                    t.set_height(e);
                }
            }), Object.defineProperty(this, "border", {
                get: function() {
                    return t.get_border();
                },
                set: function(e) {
                    t.set_border(e);
                }
            }), Object.defineProperty(this, "dashedBorder", {
                get: function() {
                    return t.get_dashedBorder();
                },
                set: function(e) {
                    t.set_dashedBorder(e);
                }
            }), Object.defineProperty(this, "newTextFormat", {
                get: function() {
                    return t.get_newTextFormat();
                },
                set: function(e) {
                    t.set_newTextFormat(e);
                }
            }), Object.defineProperty(this, "text", {
                get: function() {
                    return t.get_text();
                },
                set: function(e) {
                    t.set_text(e);
                }
            }), e.unserializeObject(this);
        },
        hxSerialize: function(e) {
            e.serializeFields(this);
        },
        __class__: ft
    });
    var gt = t.nanofl.TextRun = function(e, t, n) {
        null == n && (n = 12), null == t && (t = "#000000"), null == e && (e = ""), this.lineSpacing = 2, 
        this.letterSpacing = 0, this.kerning = !0, this.strokeColor = "#000000", this.strokeSize = 0, 
        this.align = "left", this.style = "", this.family = "Times", this.characters = e, 
        this.fillColor = t, this.size = n;
    };
    s["nanofl.TextRun"] = gt, gt.__name__ = [ "nanofl", "TextRun" ], gt.create = function(e, t, n, r, i, s, a, l, o, u, h) {
        var c = new gt();
        return c.characters = e, c.fillColor = t, c.family = n, c.style = r, c.size = i, 
        c.align = s, c.strokeSize = a, c.strokeColor = l, c.kerning = o, c.letterSpacing = u, 
        c.lineSpacing = h, c;
    }, gt.optimize = function(e) {
        for (var t = 0; t < e.length - 1; ) e[t].equFormat(e[t + 1]) ? (e[t].characters += e[t + 1].characters, 
        e.splice(t + 1, 1)) : t++;
        return e;
    }, gt.prototype = {
        characters: null,
        fillColor: null,
        family: null,
        style: null,
        size: null,
        align: null,
        strokeSize: null,
        strokeColor: null,
        kerning: null,
        letterSpacing: null,
        lineSpacing: null,
        backgroundColor: null,
        getFontString: function() {
            return x.trim((null != this.style ? this.style : "") + " " + (null != this.size ? this.size + "px" : "") + " " + (null != this.family && "" != this.family ? this.family : "serif"));
        },
        clone: function() {
            return this.duplicate();
        },
        duplicate: function(e) {
            var t = gt.create(null != e ? e : this.characters, this.fillColor, this.family, this.style, this.size, this.align, this.strokeSize, this.strokeColor, this.kerning, this.letterSpacing, this.lineSpacing);
            return t.backgroundColor = this.backgroundColor, t;
        },
        equ: function(e) {
            return this.characters == e.characters && this.equFormat(e);
        },
        createText: function(e, t) {
            var n = new createjs.Text(this.characters, this.getFontString(), null != e ? e : this.fillColor);
            return null != t && (n.outline = t), n.textBaseline = "alphabetic", n.textAlign = "left", 
            n;
        },
        isFilled: function() {
            return !this.isEmptyColor(this.fillColor);
        },
        isStroked: function() {
            return null != this.strokeSize && 0 != this.strokeSize && !this.isEmptyColor(this.strokeColor);
        },
        isEmptyColor: function(e) {
            return null == e || "" == e || "transparent" == e || "none" == e || new l("^\\s*rgba\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*0(?:\\.0)?\\s*\\)$", "i").match(e);
        },
        equFormat: function(e) {
            return this.fillColor == e.fillColor && this.family == e.family && this.style == e.style && this.size == e.size && this.align == e.align && this.strokeSize == e.strokeSize && this.strokeColor == e.strokeColor && this.kerning == e.kerning && this.letterSpacing == e.letterSpacing && this.lineSpacing == e.lineSpacing;
        },
        __class__: gt
    };
    var mt = function() {};
    s["nanofl.engine.ArrayTools"] = mt, mt.__name__ = [ "nanofl", "engine", "ArrayTools" ], 
    mt.equ = function(e, t) {
        if (e.length != t.length) return !1;
        for (var n = 0, r = e.length; r > n; ) {
            var i = n++;
            if (null == e[i] && null != t[i]) return !1;
            if (null != e[i] && null == t[i]) return !1;
            if (null != e[i] && !e[i].equ(t[i])) return !1;
        }
        return !0;
    }, mt.clone = function(e) {
        for (var t = [], n = 0; n < e.length; ) {
            var r = e[n];
            ++n, t.push(r.clone());
        }
        return t;
    }, mt.swap = function(e, t, n) {
        var r = e[t];
        e[t] = e[n], e[n] = r;
    }, mt.equFast = function(e, t) {
        if (e.length != t.length) return !1;
        for (var n = 0, r = e.length; r > n; ) {
            var i = n++;
            if (e[i] != t[i]) return !1;
        }
        return !0;
    }, mt.appendUniqueFast = function(e, t) {
        for (var n = 0; n < t.length; ) {
            var r = t[n];
            ++n, o.indexOf(e, r, 0) < 0 && e.push(r);
        }
        return e;
    }, mt.fromBytes = function(e) {
        return Array.prototype.slice.call(e.b);
    };
    var dt = t.nanofl.engine.ColorTools = function() {};
    s["nanofl.engine.ColorTools"] = dt, dt.__name__ = [ "nanofl", "engine", "ColorTools" ], 
    dt.parse = function(e) {
        dt.log("parse color " + e, {
            fileName: "ColorTools.hx",
            lineNumber: 45,
            className: "nanofl.engine.ColorTools",
            methodName: "parse"
        });
        var t = -1, n = -1, r = -1, i = 1;
        e = x.replace(e, " ", ""), f.hasField(dt.colors, e.toLowerCase()) && (e = f.field(dt.colors, e.toLowerCase()));
        var s = new l("^rgb\\(([0-9]+),([0-9]+),([0-9]+)\\)$", "i"), a = new l("^rgba\\(([0-9]+),([0-9]+),([0-9]+),([0-9.e+-]+)\\)$", "i");
        return new l("^#?[0-9A-F]{6}$", "i").match(e) ? (x.startsWith(e, "#") && (e = o.substr(e, 1, null)), 
        t = y.parseInt("0x" + o.substr(e, 0, 2)), n = y.parseInt("0x" + o.substr(e, 2, 2)), 
        r = y.parseInt("0x" + o.substr(e, 4, 2))) : new l("^#?[0-9A-F]{3}$", "i").match(e) ? (x.startsWith(e, "#") && (e = o.substr(e, 1, null)), 
        t = y.parseInt("0x" + o.substr(e, 0, 1) + o.substr(e, 0, 1)), n = y.parseInt("0x" + o.substr(e, 1, 1) + o.substr(e, 1, 1)), 
        r = y.parseInt("0x" + o.substr(e, 2, 1) + o.substr(e, 2, 1))) : s.match(e) ? (t = y.parseInt(s.matched(1)), 
        n = y.parseInt(s.matched(2)), r = y.parseInt(s.matched(3))) : a.match(e) && (t = y.parseInt(a.matched(1)), 
        n = y.parseInt(a.matched(2)), r = y.parseInt(a.matched(3)), i = y.parseFloat(a.matched(4))), 
        t >= 0 && n >= 0 && r >= 0 ? {
            r: t,
            g: n,
            b: r,
            a: i
        } : null;
    }, dt.colorToString = function(e, t) {
        var n = dt.parse(e);
        return null != n ? (null != t && (n.a = t), dt.rgbaToString(n)) : null;
    }, dt.rgbaToString = function(e) {
        return null == e.a || 1 == e.a ? "#" + x.hex(e.r, 2) + x.hex(e.g, 2) + x.hex(e.b, 2) : "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a + ")";
    }, dt.rgbToHsl = function(e) {
        var t, n, r = e.r / 255, i = e.g / 255, s = e.b / 255, a = Math.max(r, Math.max(i, s)), l = Math.min(r, Math.min(i, s)), o = (a + l) / 2;
        if (a == l) t = n = 0; else {
            var u = a - l;
            n = o > .5 ? u / (2 - a - l) : u / (a + l), t = a == r ? (i - s) / u + (s > i ? 6 : 0) : a == i ? (s - r) / u + 2 : (r - i) / u + 4, 
            t /= 6;
        }
        return {
            h: t,
            s: n,
            l: o
        };
    }, dt.hslToRgb = function(e) {
        var t, n, r;
        if (0 == e.s) t = n = r = e.l; else {
            var i, s = function(e, t, n) {
                return 0 > n && (n += 1), n > 1 && (n -= 1), .16666666666666666 > n ? e + 6 * (t - e) * n : .5 > n ? t : .6666666666666666 > n ? e + (t - e) * (.6666666666666666 - n) * 6 : e;
            };
            i = e.l < .5 ? e.l * (1 + e.s) : e.l + e.s - e.l * e.s;
            var a = 2 * e.l - i;
            t = s(a, i, e.h + .3333333333333333), n = s(a, i, e.h), r = s(a, i, e.h - .3333333333333333);
        }
        return {
            r: 255 * t | 0,
            g: 255 * n | 0,
            b: 255 * r | 0
        };
    }, dt.rgbToHsv = function(e) {
        var t, n, r = e.r / 255, i = e.g / 255, s = e.b / 255, a = Math.max(r, Math.max(i, s)), l = Math.min(r, Math.min(i, s)), o = a, u = a - l;
        return n = 0 == a ? 0 : u / a, a == l ? t = 0 : (t = a == r ? (i - s) / u + (s > i ? 6 : 0) : a == i ? (s - r) / u + 2 : (r - i) / u + 4, 
        t /= 6), {
            h: t,
            s: n,
            v: o
        };
    }, dt.hsvToRgb = function(e) {
        var t, n, r, i = Math.floor(6 * e.h), s = 6 * e.h - i, a = e.v * (1 - e.s), l = e.v * (1 - s * e.s), o = e.v * (1 - (1 - s) * e.s), u = i % 6;
        switch (u) {
          case 0:
            t = e.v, n = o, r = a;
            break;

          case 1:
            t = l, n = e.v, r = a;
            break;

          case 2:
            t = a, n = e.v, r = o;
            break;

          case 3:
            t = a, n = l, r = e.v;
            break;

          case 4:
            t = o, n = a, r = e.v;
            break;

          default:
            t = e.v, n = a, r = l;
        }
        return {
            r: 255 * t | 0,
            g: 255 * n | 0,
            b: 255 * r | 0
        };
    }, dt.tweenRgba = function(e, t, n) {
        var r = dt.hslToRgb(dt.tweenHsl(dt.rgbToHsl(e), dt.rgbToHsl(t), n));
        if (null != e.a || null != t.a) {
            var i;
            i = null != e.a ? e.a : 1;
            var s;
            s = null != t.a ? t.a : 1, r.a = i + (s - i) * n;
        }
        return r;
    }, dt.tweenHsl = function(e, t, n) {
        return {
            h: e.h + (t.h - e.h) * n,
            s: e.s + (t.s - e.s) * n,
            l: e.l + (t.l - e.l) * n
        };
    }, dt.normalize = function(e) {
        return null == e ? null : "" == e ? "" : dt.rgbaToString(dt.parse(e));
    }, dt.log = function() {};
    var pt = function() {};
    s["nanofl.engine.Console"] = pt, pt.__name__ = [ "nanofl", "engine", "Console" ], 
    pt.prototype = {
        log: function(e) {
            window.console.log(e);
        },
        info: function(e) {
            window.console.info(e);
        },
        warn: function(e) {
            window.console.warn(e);
        },
        error: function(e) {
            window.console.error(e);
        },
        __class__: pt
    };
    var vt = function() {};
    s["nanofl.engine.CustomPropertiesTools"] = vt, vt.__name__ = [ "nanofl", "engine", "CustomPropertiesTools" ], 
    vt.equ = function(e, t) {
        var n = f.fields(e), r = f.fields(t);
        if (n.length != r.length) return !1;
        n.sort(f.compare), r.sort(f.compare);
        for (var i = 0, s = n.length; s > i; ) {
            var a = i++;
            if (n[a] != r[a]) return !1;
            if (f.field(e, n[a]) != f.field(t, n[a])) return !1;
        }
        return !0;
    }, vt.tween = function(e, t, n, r) {
        if (0 != t && null != r) for (var i = 0; i < r.length; ) {
            var s = r[i];
            if (++i, "delimiter" != s.type && "info" != s.type) {
                var a, l = f.field(e, s.name);
                a = null != n ? f.field(n, s.name) : null != s.neutralValue ? s.neutralValue : l;
                var o = s.type.toLowerCase();
                switch (o) {
                  case "int":
                  case "float":
                    e[s.name] = l + (a - l) * t;
                    break;

                  case "color":
                    f.setField(e, s.name, dt.rgbaToString(dt.tweenRgba(dt.parse(l), dt.parse(a), t)));
                    break;

                  default:
                    e[s.name] = l;
                }
            }
        }
    }, vt.fix = function(e, t) {
        if (null == t) return e;
        for (var n = 0; n < t.length; ) {
            var r = t[n];
            if (++n, "delimiter" != r.type && "info" != r.type) {
                var i = f.field(e, r.name);
                if (null == i) e[r.name] = r.defaultValue; else {
                    var s = r.type;
                    switch (s) {
                      case "int":
                        f.setField(e, r.name, "string" == typeof i ? er.parseInt(i) : i);
                        break;

                      case "float":
                        f.setField(e, r.name, "string" == typeof i ? er.parseFloat(i) : i);
                        break;

                      case "bool":
                        f.setField(e, r.name, "string" == typeof i ? er.bool(i) : i);
                        break;

                      default:
                        e[r.name] = i;
                    }
                }
            }
        }
        return e;
    }, vt.resetToNeutral = function(e, t) {
        for (var n = 0; n < t.length; ) {
            var r = t[n];
            ++n, "delimiter" != r.type && "info" != r.type && null != r.neutralValue && (e[r.name] = r.neutralValue);
        }
    };
    var yt = function() {};
    s["nanofl.engine.Debug"] = yt, yt.__name__ = [ "nanofl", "engine", "Debug" ];
    var _t = function() {};
    s["nanofl.engine.FileApi"] = _t, _t.__name__ = [ "nanofl", "engine", "FileApi" ], 
    _t.prototype = {
        getTempDirectory: null,
        getPluginsDirectory: null,
        getToolPath: null,
        createDirectory: null,
        readDirectory: null,
        getContent: null,
        saveContent: null,
        getBinary: null,
        saveBinary: null,
        exists: null,
        isDirectory: null,
        run: null,
        runCaptured: null,
        copy: null,
        syncDirectory: null,
        rename: null,
        remove: null,
        findFiles: null,
        getPluginPaths: null,
        getLastModified: null,
        getSize: null,
        zip: null,
        unzip: null,
        getEnvironmentVariable: null,
        convertImage: null,
        convertAudio: null,
        __class__: _t
    };
    var xt = function(e, t) {
        var n = this;
        Object.defineProperty(this, "params", {
            get: function() {
                return n.get_params();
            }
        }), Vn.assert(null != t, null, {
            fileName: "FilterDef.hx",
            lineNumber: 32,
            className: "nanofl.engine.FilterDef",
            methodName: "new"
        }), this.name = e, this._params = t;
    };
    s["nanofl.engine.FilterDef"] = xt, xt.__name__ = [ "nanofl", "engine", "FilterDef" ], 
    xt.load = function(e, t) {
        if (null == e) return null;
        for (var n = {}, r = 0, i = e.attributes; r < i.length; ) {
            var s = i[r];
            ++r, n[s.name] = s.value;
        }
        var a = Ut.handle(t, function() {
            var t, r = new O();
            return null != vr["1.0.0"] ? r.setReserved("1.0.0", function() {
                return "BlurFilter" != e.name ? e.name : (xt.fixParam(n, "blurX", function(e) {
                    return y.string(2 * y.parseInt(e));
                }), xt.fixParam(n, "blurY", function(e) {
                    return y.string(2 * y.parseInt(e));
                }), "BoxBlurFilter");
            }) : r.h["1.0.0"] = function() {
                return "BlurFilter" != e.name ? e.name : (xt.fixParam(n, "blurX", function(e) {
                    return y.string(2 * y.parseInt(e));
                }), xt.fixParam(n, "blurY", function(e) {
                    return y.string(2 * y.parseInt(e));
                }), "BoxBlurFilter");
            }, null != vr["2.0.0"] ? r.setReserved("2.0.0", function() {
                return e.name;
            }) : r.h["2.0.0"] = function() {
                return e.name;
            }, t = r;
        }(this));
        return new xt(a, n);
    }, xt.fixParam = function(e, t, n) {
        Object.prototype.hasOwnProperty.call(e, t) && f.setField(e, t, n(f.field(e, t)));
    }, xt.prototype = {
        name: null,
        _params: null,
        params: null,
        isParamsFixed: null,
        get_params: function() {
            return this.isParamsFixed || !Ht.filters.exists(this.name) ? this._params : (this.isParamsFixed = !0, 
            vt.fix(this._params, this.getProperties()));
        },
        save: function(e) {
            e.begin(this.name);
            var t = f.fields(this._params);
            t.sort(f.compare);
            for (var n = 0; n < t.length; ) {
                var r = t[n];
                ++n, e.attr(r, f.field(this._params, r));
            }
            e.end();
        },
        equ: function(e) {
            return e.name == this.name && vt.equ(e.params, this.params);
        },
        clone: function() {
            var e = new xt(this.name, f.copy(this._params));
            return e.isParamsFixed = this.isParamsFixed, e;
        },
        tween: function(e, t) {
            if (Vn.assert(null == t || this.name == t.name, this.name + " != " + t.name, {
                fileName: "FilterDef.hx",
                lineNumber: 108,
                className: "nanofl.engine.FilterDef",
                methodName: "tween"
            }), 0 == e || !Ht.filters.exists(this.name)) return this;
            var n = Ht.filters.get(this.name);
            return vt.tween(this.params, e, null != t ? t.params : null, null != n ? n.properties : null), 
            this;
        },
        getFilter: function() {
            return Ht.filters.exists(this.name) ? Ht.filters.get(this.name).getFilter(this.params) : null;
        },
        getLabel: function() {
            return Ht.filters.exists(this.name) ? Ht.filters.get(this.name).label : this.name;
        },
        getProperties: function() {
            return Ht.filters.exists(this.name) ? Ht.filters.get(this.name).properties : [];
        },
        resetToNeutral: function() {
            var e = Ht.filters.get(this.name);
            return null != e && vt.resetToNeutral(this.params, e.properties), this;
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "params", {
                get: function() {
                    return t.get_params();
                }
            }), e.unserializeObject(this);
        },
        hxSerialize: function(e) {
            e.serializeFields(this);
        },
        __class__: xt
    };
    var At = function(e, t, n, r) {
        null == t && (t = 400), null == e && (e = "normal"), this.style = e, this.weight = t, 
        this.locals = null != n ? n : [], this.urls = null != r ? r : new O();
    };
    s["nanofl.engine.FontVariant"] = At, At.__name__ = [ "nanofl", "engine", "FontVariant" ], 
    At.prototype = {
        style: null,
        weight: null,
        locals: null,
        urls: null,
        equ: function(e) {
            return e.style == this.style && e.weight == this.weight && jt.equFast(e.urls, this.urls);
        },
        getUrlByFormats: function(e) {
            for (var t = 0; t < e.length; ) {
                var n = e[t];
                if (++t, this.urls.exists(n)) return this.urls.get(n);
            }
            return null;
        },
        __class__: At
    };
    var bt = function(e, t) {
        this.keyFrame = e, this.subIndex = t;
    };
    s["nanofl.engine.Frame"] = bt, bt.__name__ = [ "nanofl", "engine", "Frame" ], bt.prototype = {
        keyFrame: null,
        subIndex: null,
        getTweenedElements: function() {
            return this.keyFrame.getTweenedElements(this.subIndex);
        },
        __class__: bt
    };
    var wt = function() {};
    s["nanofl.engine.IElementsContainer"] = wt, wt.__name__ = [ "nanofl", "engine", "IElementsContainer" ], 
    wt.prototype = {
        elements: null,
        addElement: null,
        removeElementAt: null,
        removeElement: null,
        toString: null,
        __class__: wt
    };
    var Nt = function(e, t, n, r) {
        null == t && (t = 1), null == e && (e = "");
        var i = this;
        Object.defineProperty(this, "motionTween", {
            get: function() {
                return i.get_motionTween();
            },
            set: function(e) {
                i.set_motionTween(e);
            }
        }), Object.defineProperty(this, "elements", {
            get: function() {
                return i.get_elements();
            }
        }), this.label = e, this.duration = t, this.motionTween = n, this._elements = null != r ? r : [];
        for (var s = o.iter(this.elements); s.hasNext(); ) {
            var a = s.next();
            a.parent = this;
        }
    };
    s["nanofl.engine.KeyFrame"] = Nt, Nt.__name__ = [ "nanofl", "engine", "KeyFrame" ], 
    Nt.__interfaces__ = [ wt ], Nt.parse = function(e, t) {
        Vn.assert("frame" == e.name, null, {
            fileName: "KeyFrame.hx",
            lineNumber: 153,
            className: "nanofl.engine.KeyFrame",
            methodName: "parse"
        });
        for (var n = new Nt(U.getAttr(e, "label", ""), y.int(U.getAttr(e, "duration", 1)), Dt.load(e)), r = 0, i = $t.parse(e, t); r < i.length; ) {
            var s = i[r];
            ++r, n.addElement(s);
        }
        return n;
    }, Nt.prototype = {
        layer: null,
        label: null,
        duration: null,
        _motionTween: null,
        motionTween: null,
        get_motionTween: function() {
            return this._motionTween;
        },
        set_motionTween: function(e) {
            return null != e && (e.keyFrame = this), this._motionTween = e;
        },
        _elements: null,
        elements: null,
        get_elements: function() {
            return this._elements;
        },
        addElement: function(e, t) {
            null == t ? this._elements.push(e) : this._elements.splice(t, 0, e), e.parent = this;
        },
        removeElementAt: function(e) {
            this._elements.splice(e, 1);
        },
        removeElement: function(e) {
            var t = o.indexOf(this.elements, e, 0);
            t >= 0 && this.removeElementAt(t);
        },
        swapElement: function(e, t) {
            var n = this.elements[e];
            this._elements[e] = this.elements[t], this._elements[t] = n;
        },
        duplicate: function(e, t, n) {
            return new Nt(null != e ? e : this.label, null != t ? t : this.duration, null != this.motionTween ? this.motionTween.clone() : null, mt.clone(null != n ? n : this._elements));
        },
        getShape: function(e) {
            if (this.elements.length > 0 && K.__instanceof(this.elements[0], nn)) return this.elements[0];
            if (e) {
                var t = new nn();
                return this.addElement(t, 0), t;
            }
            return null;
        },
        clone: function() {
            return this.duplicate();
        },
        isEmpty: function() {
            return 0 == this.elements.length || 1 == this.elements.length && K.__instanceof(this.elements[0], nn) && K.__cast(this.elements[0], nn).isEmpty();
        },
        getElementsState: function() {
            return {
                elements: this._elements.slice()
            };
        },
        setElementsState: function(e) {
            this._elements = e.elements.slice();
        },
        getTweenedElements: function(e) {
            return null != this.motionTween && 0 != e ? this.motionTween.apply(e) : this.elements.map(function(e) {
                return {
                    original: e,
                    current: e
                };
            });
        },
        getNextKeyFrame: function() {
            var e = this.getKeyIndex() + 1;
            return this.layer.keyFrames[e];
        },
        getParentLayerFrame: function(e) {
            var t = this.layer.parentLayer;
            return null == t ? null : t.getFrame(this.getIndex() + e);
        },
        hasGoodMotionTween: function() {
            if (null == this.motionTween) return !1;
            var e = this.getNextKeyFrame();
            return null == e ? !1 : this.motionTween.isGood();
        },
        getParentGuide: function(e) {
            return this.layer.getParentGuide(this.getIndex() + e);
        },
        save: function(e) {
            e.begin("frame").attr("label", this.label, "").attr("duration", this.duration, 1), 
            null != this.motionTween && this.motionTween.save(e), $t.save(this._elements, e), 
            e.end();
        },
        getKeyIndex: function() {
            return o.indexOf(this.layer.keyFrames, this, 0);
        },
        getIndex: function() {
            for (var e = 0, t = 0, n = this.getKeyIndex(); n > t; ) {
                var r = t++;
                e += this.layer.keyFrames[r].duration;
            }
            return e;
        },
        setLibrary: function(e) {
            for (var t = o.iter(this.elements); t.hasNext(); ) {
                var n = t.next();
                n.setLibrary(e);
            }
        },
        equ: function(e) {
            return e.label != this.label ? !1 : e.duration != this.duration ? !1 : null == e.motionTween && null != this.motionTween ? !1 : null != e.motionTween && null == this.motionTween ? !1 : (null == e.motionTween || null == this.motionTween || e.motionTween.equ(this.motionTween)) && mt.equ(this.getElementsWithoutEmptyShapes(e._elements), this.getElementsWithoutEmptyShapes(this._elements)) ? !0 : !1;
        },
        getElementsWithoutEmptyShapes: function(e) {
            return e.filter(function(e) {
                return !K.__instanceof(e, nn) || !e.isEmpty();
            });
        },
        toString: function() {
            return (null != this.layer ? this.layer.toString() + " / " : "") + "frame";
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "motionTween", {
                get: function() {
                    return t.get_motionTween();
                },
                set: function(e) {
                    t.set_motionTween(e);
                }
            }), Object.defineProperty(this, "elements", {
                get: function() {
                    return t.get_elements();
                }
            }), e.unserializeObject(this);
        },
        hxSerialize: function(e) {
            e.serializeFields(this);
        },
        __class__: Nt
    };
    var Et = function(e) {
        Nt.call(this, null, null, null, e._elements), this.group = e;
        for (var t = o.iter(this.elements); t.hasNext(); ) {
            var n = t.next();
            n.parent = e;
        }
    };
    s["nanofl.engine.GroupKeyFrame"] = Et, Et.__name__ = [ "nanofl", "engine", "GroupKeyFrame" ], 
    Et.__super__ = Nt, Et.prototype = n(Nt.prototype, {
        group: null,
        addElement: function(e, t) {
            Nt.prototype.addElement.call(this, e, t), e.parent = this.group;
        },
        duplicate: function() {
            return Vn.methodNotSupported(this, {
                fileName: "GroupKeyFrame.hx",
                lineNumber: 23,
                className: "nanofl.engine.GroupKeyFrame",
                methodName: "duplicate"
            });
        },
        __class__: Et
    });
    var St = function(e) {
        this.shape = e, this.vectors = e.edges.slice();
        for (var t = 0, n = e.edges; t < n.length; ) {
            var r = n[t];
            ++t, this.vectors.push(r.clone().reverse());
        }
        this.vectors = this.vectors.filter(function(e) {
            return e.x1 != e.x3 || e.y1 != e.y3;
        }), this.connections = St.getConnectionMatrix(this.vectors), this.used = [];
        for (var i = 0, s = e.edges.length; s > i; ) {
            {
                i++;
            }
            this.used.push(!1);
        }
    };
    s["nanofl.engine.Guide"] = St, St.__name__ = [ "nanofl", "engine", "Guide" ], St.getConnectionMatrix = function(e) {
        for (var t = [], n = 0; n < e.length; ) {
            var r = e[n];
            ++n;
            for (var i = [], s = 0; s < e.length; ) {
                var a = e[s];
                ++s, i.push(r.x3 == a.x1 && r.y3 == a.y1);
            }
            t.push(i);
        }
        return t;
    }, St.log = function() {}, St.prototype = {
        shape: null,
        vectors: null,
        connections: null,
        used: null,
        get: function(e, t, n, r) {
            St.log("Guide.getPos: " + e.x + ", " + e.y + " => " + t.x + ", " + t.y + "; t = " + r, {
                fileName: "Guide.hx",
                lineNumber: 47,
                className: "nanofl.engine.Guide",
                methodName: "get"
            });
            var i = this.findPath(e, t);
            St.log("path = " + i.join("; "), {
                fileName: "Guide.hx",
                lineNumber: 50,
                className: "nanofl.engine.Guide",
                methodName: "get"
            }), 0 == i.length && (i = [ new _n(e.x, e.y, t.x, t.y) ]);
            for (var s = i.map(function(e) {
                return e.getLength();
            }), a = 0, l = 0; l < s.length; ) {
                var o = s[l];
                ++l, a += o;
            }
            if (0 == a) return {
                x: i[0].x1,
                y: i[0].y1,
                rotation: e.rotation
            };
            for (var u = a * r, h = 0, c = 0, g = i.length; g > c; ) {
                var m = c++;
                if (0 != s[m] && (h += s[m], h >= u)) {
                    var d, p = u - (h - s[m]), v = p / s[m], y = i[m].getPoint(i[m].getMonotoneT(v));
                    if (n) {
                        var _ = 180 * i[m].getTangent(v) / Math.PI, x = 180 * i[0].getTangent(0) / Math.PI, A = 180 * i[i.length - 1].getTangent(1) / Math.PI;
                        d = e.rotation + (_ - x) + (t.rotation - A - (e.rotation - x)) * r;
                    } else d = e.rotation + (t.rotation - e.rotation) * r;
                    return {
                        x: y.x,
                        y: y.y,
                        rotation: d
                    };
                }
            }
            return f.copy(t);
        },
        findPath: function(e, t) {
            var n = this;
            if (0 == this.vectors.length) return [];
            var r = this.shape.getNearestStrokeEdge(e), i = this.shape.getNearestStrokeEdge(t);
            St.log("Guide.findPath " + wn.toString(e) + " (" + r.t + ") => " + wn.toString(t) + " (" + i.t + ")	end.edge = " + y.string(i.edge), {
                fileName: "Guide.hx",
                lineNumber: 108,
                className: "nanofl.engine.Guide",
                methodName: "findPath"
            });
            var s = {
                counter: 0,
                endEdge: i.edge,
                bestLen: 1e100,
                bestPath: [],
                path: [],
                len: 0
            }, a = Jn.findIndex(this.shape.edges, function(e) {
                return e.equ(r.edge);
            });
            Vn.assert(a >= 0, "startEdgeIndex = " + a, {
                fileName: "Guide.hx",
                lineNumber: 123,
                className: "nanofl.engine.Guide",
                methodName: "findPath"
            }), this.findPathInner(s, a), this.findPathInner(s, a + this.shape.edges.length);
            var l = s.bestPath.map(function(e) {
                return n.vectors[e];
            });
            if (l.length > 0) {
                var o = l.length - 1, u = l[0].x3 == r.edge.x3 && l[0].y3 == r.edge.y3, h = l[o].x1 == i.edge.x1 && l[o].y1 == i.edge.y1;
                l[0] = u ? l[0].clone().reverse().getPart(1 - r.t).reverse() : l[0] = l[0].getPart(r.t), 
                l[o] = h ? l[o].getPart(i.t) : l[o].clone().reverse().getPart(1 - i.t).reverse();
            }
            return l;
        },
        findPathInner: function(e, t) {
            e.counter++;
            var n = this.vectors[t], r = this.vectors.length >> 1;
            if (e.path.push(t), this.used[t % r] = !0, e.len += n.getLength(), e.len < e.bestLen) if (n.equ(e.endEdge)) e.bestLen = e.len, 
            e.bestPath = e.path.slice(); else for (var i = 0, s = this.vectors.length; s > i; ) {
                var a = i++;
                !this.used[a % r] && this.connections[t][a] && this.findPathInner(e, a);
            }
            e.len -= n.getLength(), this.used[t % r] = !1, e.path.pop();
        },
        __class__: St
    };
    var Ct = function() {};
    s["nanofl.engine.IFramedItem"] = Ct, Ct.__name__ = [ "nanofl", "engine", "IFramedItem" ], 
    Ct.prototype = {
        likeButton: null,
        autoPlay: null,
        loop: null,
        __class__: Ct
    };
    var Pt = function() {};
    s["nanofl.engine.ILayersContainer"] = Pt, Pt.__name__ = [ "nanofl", "engine", "ILayersContainer" ], 
    Pt.prototype = {
        layers: null,
        toString: null,
        __class__: Pt
    };
    var It = function() {};
    s["nanofl.engine.IPathElement"] = It, It.__name__ = [ "nanofl", "engine", "IPathElement" ], 
    It.__interfaces__ = [ Pt ], It.prototype = {
        visible: null,
        matrix: null,
        isScene: null,
        getNavigatorName: null,
        getNavigatorIcon: null,
        getChildren: null,
        createDisplayObject: null,
        getTimeline: null,
        __class__: It
    };
    var Tt = function() {};
    s["nanofl.engine.ISelectable"] = Tt, Tt.__name__ = [ "nanofl", "engine", "ISelectable" ], 
    Tt.prototype = {
        selected: null,
        __class__: Tt
    };
    var kt = function() {};
    s["nanofl.engine.ISpriteSheetableItem"] = kt, kt.__name__ = [ "nanofl", "engine", "ISpriteSheetableItem" ], 
    kt.prototype = {
        exportAsSpriteSheet: null,
        __class__: kt
    };
    var Mt = function() {};
    s["nanofl.engine.ITextureItem"] = Mt, Mt.__name__ = [ "nanofl", "engine", "ITextureItem" ], 
    Mt.prototype = {
        namePath: null,
        textureAtlas: null,
        __class__: Mt
    };
    var Rt = function() {};
    s["nanofl.engine.ITimeline"] = Rt, Rt.__name__ = [ "nanofl", "engine", "ITimeline" ], 
    Rt.prototype = {
        addLayer: null,
        addLayersBlock: null,
        removeLayer: null,
        removeLayerWithChildren: null,
        __class__: Rt
    };
    var Ft = function(e, t, n, r, i) {
        null == r && (r = !1), null == n && (n = !0), null == t && (t = "normal");
        var s = this;
        Object.defineProperty(this, "parentLayer", {
            get: function() {
                return s.get_parentLayer();
            }
        }), Object.defineProperty(this, "keyFrames", {
            get: function() {
                return s._keyFrames;
            }
        }), this.name = e, this.type = t, this.visible = n, this.locked = r, this.parentIndex = i, 
        this._keyFrames = [];
    };
    s["nanofl.engine.Layer"] = Ft, Ft.__name__ = [ "nanofl", "engine", "Layer" ], Ft.parse = function(e, t) {
        for (var n = new Ft(U.getAttr(e, "name", ""), U.getAttr(e, "type", "normal"), U.getAttr(e, "visible", !0), U.getAttr(e, "locked", !1), U.getAttrInt(e, "parentIndex")), r = 0, i = e.children; r < i.length; ) {
            var s = i[r];
            ++r, "frame" == s.name && n.addKeyFrame(Nt.parse(s, t));
        }
        return n;
    }, Ft.prototype = {
        layersContainer: null,
        name: null,
        type: null,
        visible: null,
        locked: null,
        parentIndex: null,
        parentLayer: null,
        get_parentLayer: function() {
            return null != this.parentIndex ? this.layersContainer.layers[this.parentIndex] : null;
        },
        _keyFrames: null,
        keyFrames: null,
        get_keyFrames: function() {
            return this._keyFrames;
        },
        getTotalFrames: function() {
            for (var e = 0, t = o.iter(this.keyFrames); t.hasNext(); ) {
                var n = t.next();
                e += n.duration;
            }
            return e;
        },
        getFrame: function(e) {
            var t = this.getFrameIndexes(e);
            return null != t ? new bt(this.keyFrames[t.keyIndex], t.subIndex) : null;
        },
        getFrameIndexes: function(e) {
            for (var t = 0, n = 0, r = this.keyFrames.length; r > n; ) {
                var i = n++;
                if (e >= t && e < t + this.keyFrames[i].duration) return {
                    keyIndex: i,
                    subIndex: e - t
                };
                t += this.keyFrames[i].duration;
            }
            return null;
        },
        addKeyFrame: function(e) {
            this._keyFrames.push(e), e.layer = this;
        },
        insertKeyFrame: function(e, t) {
            this._keyFrames.splice(e, 0, t), t.layer = this;
        },
        insertFrame: function(e) {
            if (this.keyFrames.length > 0) {
                var t = this.getFrameIndexes(e);
                null != t ? this.keyFrames[t.keyIndex].duration++ : this.keyFrames[this.keyFrames.length - 1].duration += e - this.getTotalFrames() + 1;
            } else this.addKeyFrame(new Nt(null, e + 1));
        },
        convertToKeyFrame: function(e, t) {
            if (null == t && (t = !1), this.keyFrames.length > 0) {
                for (var n = 0, r = 0, i = this.keyFrames.length; i > r; ) {
                    var s = r++, a = this.keyFrames[s];
                    if (e >= n && e < n + a.duration) return n == e ? !1 : (this.insertKeyFrame(s + 1, a.duplicate("", a.duration - (e - n), t ? [] : a.getTweenedElements(e - n).map(function(e) {
                        return e.current;
                    }))), a.duration = e - n, !0);
                    n += a.duration;
                }
                var l = this.keyFrames[this.keyFrames.length - 1];
                return l.duration = e - n + l.duration, this.addKeyFrame(l.duplicate("", 1)), !0;
            }
            return this.addKeyFrame(new Nt(null, e + 1)), !0;
        },
        removeFrame: function(e) {
            var t = this.getFrameIndexes(e);
            return null != t ? (this.keyFrames[t.keyIndex].duration--, 0 == this.keyFrames[t.keyIndex].duration && this._keyFrames.splice(t.keyIndex, 1), 
            !0) : !1;
        },
        getHumanType: function() {
            if (null == this.parentIndex) return this.type;
            if ("normal" == this.type) {
                var e = this.layersContainer.layers[this.parentIndex];
                if ("mask" == e.type) return "masked";
                if ("guide" == e.type) return "guided";
            }
            return this.type;
        },
        getIcon: function() {
            var e = this.type;
            switch (e) {
              case "mask":
                return "custom-icon-mask";

              case "folder":
                return "custom-icon-folder-close";

              case "guide":
                return "custom-icon-layer-guide";

              default:
                return "custom-icon-page-blank";
            }
        },
        getNestLevel: function(e) {
            for (var t = 0, n = this; null != n.parentIndex; ) t++, n = e[n.parentIndex];
            return t;
        },
        getParentGuide: function(e) {
            if (null != this.parentIndex) {
                var t = this.layersContainer.layers[this.parentIndex];
                if ("guide" == t.type) {
                    var n = t.getFrame(e), r = n.keyFrame.getShape(!1);
                    if (null != r) return new St(r);
                }
            }
            return new St(new nn());
        },
        getChildLayers: function() {
            var e = this.getIndex();
            return this.layersContainer.layers.filter(function(t) {
                return t.parentIndex == e;
            });
        },
        getTweenedElements: function(e) {
            var t = this.getFrame(e);
            return null != t ? t.keyFrame.getTweenedElements(t.subIndex) : [];
        },
        save: function(e) {
            e.begin("layer").attr("name", this.name, "").attr("type", this.type, "normal").attr("visible", this.visible, !0).attr("locked", this.locked, !1).attr("parentIndex", this.parentIndex);
            for (var t = o.iter(this.keyFrames); t.hasNext(); ) {
                var n = t.next();
                n.save(e);
            }
            e.end();
        },
        clone: function() {
            return this.duplicate(this.keyFrames, this.parentIndex);
        },
        duplicate: function(e, t) {
            for (var n = new Ft(this.name, this.type, this.visible, this.locked, t), r = o.iter(e); r.hasNext(); ) {
                var i = r.next();
                n.addKeyFrame(i.clone());
            }
            return n;
        },
        getIndex: function() {
            return o.indexOf(this.layersContainer.layers, this, 0);
        },
        setLibrary: function(e) {
            for (var t = o.iter(this.keyFrames); t.hasNext(); ) {
                var n = t.next();
                n.setLibrary(e);
            }
        },
        equ: function(e) {
            return e.name != this.name ? !1 : e.type != this.type ? !1 : e.visible != this.visible ? !1 : e.locked != this.locked ? !1 : mt.equ(e._keyFrames, this._keyFrames) ? !0 : !1;
        },
        toString: function() {
            return (null != this.layersContainer ? this.layersContainer.toString() + " / " : "") + "layer";
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "parentLayer", {
                get: function() {
                    return t.get_parentLayer();
                }
            }), Object.defineProperty(this, "keyFrames", {
                get: function() {
                    return t._keyFrames;
                }
            }), e.unserializeObject(this);
        },
        hxSerialize: function(e) {
            e.serializeFields(this);
        },
        __class__: Ft
    };
    var Ot = function(e, t) {
        if (this.items = new O(), this.libraryDir = e, null != t) for (var n = 0; n < t.length; ) {
            var r = t[n];
            ++n, this.addItem(r);
        }
    };
    s["nanofl.engine.Library"] = Ot, Ot.__name__ = [ "nanofl", "engine", "Library" ], 
    Ot.createWithScene = function(e, t, n) {
        var r = new Ot(e);
        return r.addSceneWithFrame(t, n), r;
    }, Ot.prototype = {
        items: null,
        libraryDir: null,
        addSceneWithFrame: function(e, t) {
            var n = On.createWithFrame(Ot.SCENE_NAME_PATH, e, t);
            return this.addItem(n), n;
        },
        addItem: function(e) {
            return e.setLibrary(this), this.items.set(e.namePath, e), this.ensureFolderOfItemExists(e.namePath), 
            e;
        },
        removeItem: function(e) {
            for (var t = 0, n = this.getItemsInFolder(e); t < n.length; ) {
                var r = n[t];
                ++t, this.removeItemInner(r.namePath);
            }
            this.removeItemInner(e);
        },
        removeItemInner: function(e) {
            var t = this.getItem(e);
            if (this.items.remove(e), K.__instanceof(t, Tn)) {
                for (var n = [], r = this.items.iterator(); r.hasNext(); ) {
                    var i = r.next();
                    K.__instanceof(i, On) && Lt.iterateInstances(i, !0, null, function(t) {
                        t.namePath == e && n.push(t);
                    });
                }
                for (var s = 0; s < n.length; ) {
                    var a = n[s];
                    ++s, a.parent.removeElement(a);
                }
            }
        },
        getSceneItem: function() {
            return K.__cast(this.items.get(Ot.SCENE_NAME_PATH), On);
        },
        getSceneInstance: function() {
            return this.getSceneItem().newInstance();
        },
        getInstancableItems: function() {
            return this.getItems(!0).filter(function(e) {
                return K.__instanceof(e, Tn);
            });
        },
        getBitmaps: function() {
            return this.getItems().filter(function(e) {
                return K.__instanceof(e, kn);
            });
        },
        getMeshes: function() {
            return this.getItems().filter(function(e) {
                return K.__instanceof(e, Fn);
            });
        },
        getSounds: function() {
            return this.getItems().filter(function(e) {
                return K.__instanceof(e, Bn);
            });
        },
        getFonts: function() {
            var e = this.getItems().filter(function(e) {
                return K.__instanceof(e, Rn);
            }), t = e.map(function(e) {
                return e.toFont();
            });
            return t.sort(function(e, t) {
                return f.compare(e.family, t.family);
            }), t;
        },
        getItem: function(e) {
            Vn.assert(null != e, null, {
                fileName: "Library.hx",
                lineNumber: 322,
                className: "nanofl.engine.Library",
                methodName: "getItem"
            }), Vn.assert("" != e, null, {
                fileName: "Library.hx",
                lineNumber: 323,
                className: "nanofl.engine.Library",
                methodName: "getItem"
            });
            var t = this.items.get(e);
            return null != t ? t : (C.trace("Symbol '" + e + "' is not found.", {
                fileName: "Library.hx",
                lineNumber: 326,
                className: "nanofl.engine.Library",
                methodName: "getItem"
            }), On.createWithFrame(e, [ new sn("", 0, 0, !1, !0, [ new gt("Symbol '" + e + "' is not found.") ]) ], "temp"));
        },
        hasItem: function(e) {
            return this.items.exists(e);
        },
        save: function(e) {
            Vn.assert(null != this.libraryDir, null, {
                fileName: "Library.hx",
                lineNumber: 337,
                className: "nanofl.engine.Library",
                methodName: "save"
            });
            for (var t = this.items.iterator(); t.hasNext(); ) {
                var n = t.next();
                n.save(e);
            }
        },
        realUrl: function(e) {
            return e.indexOf("//") >= 0 ? e : this.libraryDir + "/" + e;
        },
        getItems: function(e) {
            var t = this, n = Kn.array(this.items.keys());
            return e || (n = n.filter(function(e) {
                return e != Ot.SCENE_NAME_PATH;
            })), n.sort(function(e, t) {
                return f.compare(e.toLowerCase(), t.toLowerCase());
            }), n.map(function(e) {
                return t.items.get(e);
            });
        },
        preload: function(e) {
            var t = u.count(this.items);
            if (t > 0) for (var n = this.items.iterator(); n.hasNext(); ) {
                var r = n.next();
                r.preload(function() {
                    t--, 0 == t && e();
                });
            } else e();
        },
        clone: function() {
            return new Ot(this.libraryDir, mt.clone(this.getItems(!0)));
        },
        getItemCount: function() {
            return u.count(this.items);
        },
        ensureFolderOfItemExists: function(e) {
            for (var t = e.split("/"), n = 1, r = t.length; r > n; ) {
                var i = n++, s = t.slice(0, i).join("/");
                this.hasItem(s) || this.addItem(new Mn(s));
            }
        },
        getItemsInFolder: function(e) {
            return er.is(this.items.get(e), Mn) ? this.getItems().filter(function(t) {
                return x.startsWith(t.namePath, e + "/");
            }) : [];
        },
        equ: function(e) {
            var t = Kn.array(this.items.keys()), n = Kn.array(e.items.keys());
            if (t.length != n.length) return !1;
            for (var r = 0; r < t.length; ) {
                var i = t[r];
                if (++r, o.indexOf(n, i, 0) < 0) return !1;
            }
            for (var s = 0; s < t.length; ) {
                var a = t[s];
                if (++s, !this.getItem(a).equ(e.getItem(a))) return !1;
            }
            return !0;
        },
        __class__: Ot
    };
    var Bt = function() {};
    s["nanofl.engine.Loader"] = Bt, Bt.__name__ = [ "nanofl", "engine", "Loader" ], 
    Bt.image = function(e, t) {
        var n = new Image();
        n.onload = function() {
            null != t && t(n);
        }, n.onerror = function() {
            yt.console.error("Failed to load '" + e + "'."), n.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
        }, n.src = e;
    }, Bt.file = function(e, t) {
        var n = new XMLHttpRequest();
        n.responseType = "text", n.onreadystatechange = function() {
            4 == n.readyState && (200 == n.status ? t(n.responseText) : (yt.console.error("Failed to load '" + e + "': " + n.status + " / " + n.statusText), 
            t(null)));
        }, n.open("GET", e, !0), n.send();
    }, Bt.queued = function(e, t, n) {
        for (var r = [], i = 0; i < e.length; ) {
            var s = e[i];
            ++i, t(s, function(t) {
                r.push(t), r.length == e.length && null != n && n(r);
            });
        }
    };
    var jt = function() {};
    s["nanofl.engine.MapTools"] = jt, jt.__name__ = [ "nanofl", "engine", "MapTools" ], 
    jt.clone = function(e) {
        for (var t = b.createInstance(null == e ? null : K.getClass(e), []), n = e.keys(); n.hasNext(); ) {
            var r = n.next(), i = e.get(r).clone();
            t.set(r, i);
        }
        return t;
    }, jt.cloneFast = function(e) {
        for (var t = b.createInstance(null == e ? null : K.getClass(e), []), n = e.keys(); n.hasNext(); ) {
            var r = n.next(), i = e.get(r);
            t.set(r, i);
        }
        return t;
    }, jt.equ = function(e, t) {
        return jt.equCustom(e, t, function(e, t) {
            return null == e && null == t || null != e && null != t && e.equ(t);
        });
    }, jt.equFast = function(e, t) {
        return jt.equCustom(e, t, function(e, t) {
            return e == t;
        });
    }, jt.equCustom = function(e, t, n) {
        var r = Kn.array(e.keys()), i = Kn.array(t.keys());
        if (r.length != i.length) return !1;
        if (r.sort(f.compare), i.sort(f.compare), !mt.equFast(r, i)) return !1;
        for (var s = 0; s < r.length; ) {
            var a = r[s];
            if (++s, !n(e.get(a), t.get(a))) return !1;
        }
        return !0;
    };
    var Dt = function(e, t, n, r, i) {
        this.easing = e, this.rotateCount = t, this.orientToPath = n, this.rotateCountX = r, 
        this.rotateCountY = i;
    };
    s["nanofl.engine.MotionTween"] = Dt, Dt.__name__ = [ "nanofl", "engine", "MotionTween" ], 
    Dt.load = function(e) {
        return "motion" != U.getAttr(e, "tweenType") ? null : new Dt(U.getAttr(e, "motionTweenEasing", 0), U.getAttr(e, "motionTweenRotateCount", 0), U.getAttr(e, "motionTweenOrientToPath", !1), U.getAttr(e, "motionTweenRotateCountX", 0), U.getAttr(e, "motionTweenRotateCountY", 0));
    }, Dt.fixFilterSequence = function(e, t) {
        for (var n = 0, r = e.length; r > n; ) {
            var i = n++;
            if (i >= t.length || t[i].name != e[i].name) {
                var s = e[i].clone().resetToNeutral();
                t.splice(i, 0, s);
            }
        }
    }, Dt.getInstancesMap = function(e, t) {
        var n = new R();
        if (null != t) for (var r = e.filter(function(e) {
            return K.__instanceof(e, tn);
        }), i = t.filter(function(e) {
            return K.__instanceof(e, tn);
        }), s = 0; s < r.length; ) {
            var a = r[s];
            ++s;
            for (var l = 0; l < i.length; ) {
                var u = i[l];
                if (++l, u.namePath == a.namePath) {
                    n.set(a, u), o.remove(i, u);
                    break;
                }
            }
        }
        return n;
    }, Dt.log = function() {}, Dt.prototype = {
        keyFrame: null,
        easing: null,
        rotateCount: null,
        orientToPath: null,
        rotateCountX: null,
        rotateCountY: null,
        save: function(e) {
            e.attr("tweenType", "motion"), e.attr("motionTweenEasing", this.easing, 0), e.attr("motionTweenRotateCount", this.rotateCount, 0), 
            e.attr("motionTweenOrientToPath", this.orientToPath, !1), e.attr("motionTweenRotateCountX", this.rotateCountX, 0), 
            e.attr("motionTweenRotateCountY", this.rotateCountY, 0);
        },
        apply: function(e) {
            var t, n = this.keyFrame.elements, r = this.keyFrame.getNextKeyFrame();
            t = null != r ? r.elements : null;
            var i = this.keyFrame.getParentGuide(e), s = e / this.keyFrame.duration, a = [];
            if (null != t) for (var l = createjs.Ease.get(this.easing / 100), u = l(s), h = Dt.getInstancesMap(n, t), c = o.iter(n); c.hasNext(); ) {
                var f = c.next();
                if (K.__instanceof(f, tn) && function() {
                    var e, t;
                    return t = K.__cast(f, tn), e = null != h.h.__keys__[t.__id__];
                }(this)) {
                    var g;
                    g = K.__cast(f, tn);
                    var m, d = h.h[g.__id__];
                    m = K.__cast(g.clone(), tn);
                    var p = this.translatedMatrixByLocalVector(g.matrix.clone(), g.regX, g.regY).decompose(), v = this.translatedMatrixByLocalVector(d.matrix.clone(), g.regX, g.regY).decompose(), y = i.get(p, v, this.orientToPath, u);
                    if (m.matrix.setTransform(y.x, y.y, p.scaleX + (v.scaleX - p.scaleX) * u, p.scaleY + (v.scaleY - p.scaleY) * u, y.rotation + 360 * this.rotateCount * u, p.skewX + (v.skewX - p.skewX) * u, p.skewY + (v.skewY - p.skewY) * u), 
                    this.translatedMatrixByLocalVector(m.matrix, -g.regX, -g.regY), m.rotationX += (d.rotationX - g.rotationX) * u + 360 * this.rotateCountX * u, 
                    m.rotationY += (d.rotationY - g.rotationY) * u + 360 * this.rotateCountY * u, null != g.colorEffect || null != d.colorEffect) {
                        var _;
                        _ = null != g.colorEffect ? g.colorEffect : d.colorEffect.getNeutralClone();
                        var x;
                        x = null != d.colorEffect ? d.colorEffect : g.colorEffect.getNeutralClone(), m.colorEffect = (null == _ ? null : K.getClass(_)) == (null == x ? null : K.getClass(x)) ? _.getTweened(u, x) : new Zt(_.getTweened(u, _.getNeutralClone()), x.getNeutralClone().getTweened(u, x));
                    }
                    var A = g.filters.filter(function(e) {
                        return Ht.filters.exists(e.name);
                    }), b = d.filters.filter(function(e) {
                        return Ht.filters.exists(e.name);
                    });
                    Dt.fixFilterSequence(A, b), Dt.fixFilterSequence(b, A), Vn.assert(A.length == b.length, "startFilters.length = " + A.length + " != finishFilters.length = " + b.length, {
                        fileName: "MotionTween.hx",
                        lineNumber: 127,
                        className: "nanofl.engine.MotionTween",
                        methodName: "apply"
                    }), m.filters = [];
                    for (var w = 0, N = A.length; N > w; ) {
                        var E = w++;
                        m.filters.push(A[E].clone().tween(u, b[E]));
                    }
                    a.push({
                        original: f,
                        current: m
                    });
                } else a.push({
                    original: f,
                    current: f
                });
            } else for (var S = o.iter(this.keyFrame.elements); S.hasNext(); ) {
                var C = S.next();
                a.push({
                    original: C,
                    current: C
                });
            }
            return a;
        },
        clone: function() {
            return new Dt(this.easing, this.rotateCount, this.orientToPath, this.rotateCountX, this.rotateCountY);
        },
        isGood: function() {
            var e, t = this.keyFrame.elements, n = this.keyFrame.getNextKeyFrame();
            return e = null != n ? n.elements : null, function() {
                var n, r = Dt.getInstancesMap(t, e);
                return n = r.iterator();
            }(this).hasNext();
        },
        equ: function(e) {
            return e.easing != this.easing ? !1 : e.rotateCount != this.rotateCount ? !1 : e.orientToPath != this.orientToPath ? !1 : !0;
        },
        translatedMatrixByLocalVector: function(e, t, n) {
            var r = e.transformPoint(t, n);
            return e.tx = r.x, e.ty = r.y, e;
        },
        __class__: Dt
    };
    var Lt = function() {};
    s["nanofl.engine.MovieClipItemTools"] = Lt, Lt.__name__ = [ "nanofl", "engine", "MovieClipItemTools" ], 
    Lt.findShapes = function(e, t, n, r) {
        null == n && (n = new bn()), Lt.findShapesInner(e, t, n, !1, r), Lt.findMovieClipItems(e, t, n, function(e, n, i) {
            Lt.findShapesInner(e, t, n, i, r);
        });
    }, Lt.findShapesInner = function(e, t, n, r, i) {
        Lt.iterateElements(e, t, r, function(t, r) {
            K.__instanceof(t, nn) && i(t, {
                item: e,
                layerIndex: r.layerIndex,
                keyFrameIndex: r.keyFrameIndex,
                matrix: n,
                insideMask: r.insideMask
            });
        });
    }, Lt.findMovieClipItems = function(e, t, n, r) {
        Lt.findInstances(e, t, n, function(e, t) {
            K.__instanceof(e.symbol, On) && r(e.symbol, n.clone().appendMatrix(e.matrix), t.insideMask);
        });
    }, Lt.findInstances = function(e, t, n, r, i) {
        null == i && (i = !1), null == n && (n = new bn()), Lt.iterateInstances(e, t, i, function(s, a) {
            r(s, {
                item: e,
                layerIndex: a.layerIndex,
                keyFrameIndex: a.keyFrameIndex,
                matrix: n,
                insideMask: a.insideMask
            }), K.__instanceof(s.symbol, On) && Lt.findInstances(s.symbol, t, n.clone().appendMatrix(s.matrix), r, i);
        });
    }, Lt.iterateInstances = function(e, t, n, r) {
        null == n && (n = !1), Lt.iterateElements(e, t, n, function(e, t) {
            K.__instanceof(e, tn) && r(e, t);
        });
    }, Lt.iterateElements = function(e, t, n, r) {
        null == n && (n = !1);
        for (var i = 0, s = e.layers.length; s > i; ) {
            var a = i++, l = e.layers[a];
            if (l.keyFrames.length > 0) {
                var o, u = n || "mask" == l.type, h = 0;
                for (o = t ? l.keyFrames.length : 1; o > h; ) for (var c = h++, f = l.keyFrames[c], g = 0, m = $t.expandGroups(f.elements); g < m.length; ) {
                    var d = m[g];
                    ++g, r(d, {
                        keyFrameIndex: c,
                        layerIndex: a,
                        insideMask: u
                    });
                }
            }
        }
    }, Lt.hasInstance = function(e, t, n) {
        var r = !1;
        return n ? Lt.findInstances(e, !0, null, function(e) {
            e.namePath == t && (r = !0);
        }) : Lt.iterateInstances(e, !0, null, function(e) {
            e.namePath == t && (r = !0);
        }), r;
    };
    var zt = function() {};
    s["nanofl.engine.NullTools"] = zt, zt.__name__ = [ "nanofl", "engine", "NullTools" ], 
    zt.clone = function(e) {
        return null != e ? e.clone() : null;
    }, zt.equ = function(e, t) {
        return null == e && null == t || null != e && null != t && e.equ(t);
    };
    var Ht = t.nanofl.engine.Plugins = function() {};
    s["nanofl.engine.Plugins"] = Ht, Ht.__name__ = [ "nanofl", "engine", "Plugins" ], 
    Ht.registerFilter = function(e) {
        Ht.filters.set(e.name, e);
    };
    var qt = function() {};
    s["nanofl.engine.RenderTools"] = qt, qt.__name__ = [ "nanofl", "engine", "RenderTools" ], 
    qt.drawDashedLine = function(e, t, n, r, i, s, a, l) {
        null == l && (l = 2);
        var o = r - t, u = i - n, h = Math.floor(Math.sqrt(o * o + u * u) / l), c = o / h, f = u / h;
        e.beginStroke(s);
        var g = t, m = n;
        e.moveTo(g, m);
        for (var d = 0; d++ < h; ) g += c, m += f, d % 2 == 0 ? e.moveTo(g, m) : e.lineTo(g, m);
        if (d % 2 == 0 ? e.moveTo(r, i) : e.lineTo(r, i), e.endStroke(), null != a) {
            for (e.beginStroke(a), g = t + c, m = n + f, e.moveTo(g, m), d = 1; d++ < h; ) g += c, 
            m += f, d % 2 == 1 ? e.moveTo(g, m) : e.lineTo(g, m);
            d % 2 == 1 ? e.moveTo(r, i) : e.lineTo(r, i), e.endStroke();
        }
        return e;
    }, qt.drawDashedRect = function(e, t, n, r, i, s, a, l) {
        return null == l && (l = 2), qt.drawDashedLine(e, t, n, r, n, s, a, l), qt.drawDashedLine(e, r, n, r, i, s, a, l), 
        qt.drawDashedLine(e, r, i, t, i, s, a, l), qt.drawDashedLine(e, t, i, t, n, s, a, l), 
        e;
    };
    var Xt = function() {};
    s["nanofl.engine.ScaleMode"] = Xt, Xt.__name__ = [ "nanofl", "engine", "ScaleMode" ];
    var Yt = function() {};
    s["nanofl.engine.TextureItemTools"] = Yt, Yt.__name__ = [ "nanofl", "engine", "TextureItemTools" ], 
    Yt.getSpriteSheet = function(e) {
        return null != e.textureAtlas && "" != e.textureAtlas && Object.prototype.hasOwnProperty.call(ot.spriteSheets, e.namePath) ? f.field(ot.spriteSheets, e.namePath) : null;
    }, Yt.preload = function(e, t) {
        var n = Yt.getSpriteSheet(e);
        null != n ? n.complete ? t() : n.addEventListener("complete", function() {
            t();
        }, null) : t();
    };
    var Ut = function() {};
    s["nanofl.engine.Version"] = Ut, Ut.__name__ = [ "nanofl", "engine", "Version" ], 
    Ut.compare = function(e, t) {
        for (var n = e.split(".").map(y.parseInt), r = t.split(".").map(y.parseInt), i = 0; 3 > i; ) {
            var s = i++, a = f.compare(n[s], r[s]);
            if (0 != a) return a;
        }
        return 0;
    }, Ut.handle = function(e, t) {
        var n = Jn.sorted(function(e) {
            return function(t) {
                return Kn.filter(e, t);
            };
        }(t.keys())(function(t) {
            return Ut.compare(t, e) <= 0;
        }), Ut.compare);
        return 0 == n.length && (n = Kn.sorted(t.keys(), Ut.compare)), t.get(n[n.length - 1])();
    };
    var Gt = function() {};
    s["nanofl.engine.coloreffects.ColorEffect"] = Gt, Gt.__name__ = [ "nanofl", "engine", "coloreffects", "ColorEffect" ], 
    Gt.load = function(e) {
        if (null != e) {
            Vn.assert("color" == e.name, e.name, {
                fileName: "ColorEffect.hx",
                lineNumber: 44,
                className: "nanofl.engine.coloreffects.ColorEffect",
                methodName: "load"
            });
            var t = e.getAttribute("type");
            switch (t) {
              case "brightness":
                return Wt.load(e);

              case "tint":
                return Jt.load(e);

              case "advanced":
                return Vt.load(e);

              case "alpha":
                return Qt.load(e);
            }
        }
        return null;
    }, Gt.equS = function(e, t) {
        return null == e && null == t ? !0 : null == e && null != t || null != e && null == t ? !1 : e.equ(t);
    }, Gt.prototype = {
        apply: function() {
            throw new J("Unsupported.");
        },
        clone: function() {
            throw new J("Unsupported.");
        },
        getNeutralClone: function() {
            throw new J("Unsupported.");
        },
        getTweened: function() {
            throw new J("Unsupported.");
        },
        save: function() {
            Vn.methodMustBeOverriden(this, {
                fileName: "ColorEffect.hx",
                lineNumber: 56,
                className: "nanofl.engine.coloreffects.ColorEffect",
                methodName: "save"
            });
        },
        equ: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "ColorEffect.hx",
                lineNumber: 58,
                className: "nanofl.engine.coloreffects.ColorEffect",
                methodName: "equ"
            });
        },
        __class__: Gt
    };
    var Vt = function(e, t, n, r, i, s, a, l) {
        this.alphaMultiplier = e, this.redMultiplier = t, this.greenMultiplier = n, this.blueMultiplier = r, 
        this.alphaOffset = i, this.redOffset = s, this.greenOffset = a, this.blueOffset = l;
    };
    s["nanofl.engine.coloreffects.ColorEffectAdvanced"] = Vt, Vt.__name__ = [ "nanofl", "engine", "coloreffects", "ColorEffectAdvanced" ], 
    Vt.load = function(e) {
        return new Vt(U.getAttr(e, "alphaMultiplier", 1), U.getAttr(e, "redMultiplier", 1), U.getAttr(e, "greenMultiplier", 1), U.getAttr(e, "blueMultiplier", 1), U.getAttr(e, "alphaOffset", 0), U.getAttr(e, "redOffset", 0), U.getAttr(e, "greenOffset", 0), U.getAttr(e, "blueOffset", 0));
    }, Vt.__super__ = Gt, Vt.prototype = n(Gt.prototype, {
        redMultiplier: null,
        greenMultiplier: null,
        blueMultiplier: null,
        alphaMultiplier: null,
        redOffset: null,
        greenOffset: null,
        blueOffset: null,
        alphaOffset: null,
        save: function(e) {
            e.begin("color").attr("type", "advanced"), e.attr("alphaMultiplier", this.alphaMultiplier), 
            e.attr("redMultiplier", this.redMultiplier), e.attr("greenMultiplier", this.greenMultiplier), 
            e.attr("blueMultiplier", this.blueMultiplier), e.attr("alphaOffset", this.alphaOffset), 
            e.attr("redOffset", this.redOffset), e.attr("greenOffset", this.greenOffset), e.attr("blueOffset", this.blueOffset), 
            e.end();
        },
        apply: function(e) {
            null == e.filters && (e.filters = []), e.filters.push(new createjs.ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset));
        },
        clone: function() {
            return new Vt(this.alphaMultiplier, this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaOffset, this.redOffset, this.greenOffset, this.blueOffset);
        },
        getNeutralClone: function() {
            return new Vt(1, 1, 1, 1, 0, 0, 0, 0);
        },
        getTweened: function(e, t) {
            return Vn.assert(K.__instanceof(t, Vt), null, {
                fileName: "ColorEffectAdvanced.hx",
                lineNumber: 92,
                className: "nanofl.engine.coloreffects.ColorEffectAdvanced",
                methodName: "getTweened"
            }), new Vt(this.alphaMultiplier + (t.alphaMultiplier - this.alphaMultiplier) * e, this.redMultiplier + (t.redMultiplier - this.redMultiplier) * e, this.greenMultiplier + (t.greenMultiplier - this.greenMultiplier) * e, this.blueMultiplier + (t.blueMultiplier - this.blueMultiplier) * e, this.alphaOffset + (t.alphaOffset - this.alphaOffset) * e, this.redOffset + (t.redOffset - this.redOffset) * e, this.greenOffset + (t.greenOffset - this.greenOffset) * e, this.blueOffset + (t.blueOffset - this.blueOffset) * e);
        },
        equ: function(e) {
            return K.__instanceof(e, Vt) && this.redMultiplier == e.redMultiplier && this.greenMultiplier == e.greenMultiplier && this.blueMultiplier == e.blueMultiplier && this.alphaMultiplier == e.alphaMultiplier && this.redOffset == e.redOffset && this.greenOffset == e.greenOffset && this.blueOffset == e.blueOffset && this.alphaOffset == e.alphaOffset;
        },
        __class__: Vt
    });
    var Qt = function(e) {
        this.value = e;
    };
    s["nanofl.engine.coloreffects.ColorEffectAlpha"] = Qt, Qt.__name__ = [ "nanofl", "engine", "coloreffects", "ColorEffectAlpha" ], 
    Qt.load = function(e) {
        return new Qt(U.getAttr(e, "value", 1));
    }, Qt.__super__ = Gt, Qt.prototype = n(Gt.prototype, {
        value: null,
        save: function(e) {
            e.begin("color").attr("type", "alpha"), e.attr("value", this.value), e.end();
        },
        apply: function(e) {
            e.alpha = this.value;
        },
        clone: function() {
            return new Qt(this.value);
        },
        getNeutralClone: function() {
            return new Qt(1);
        },
        getTweened: function(e, t) {
            return new Qt(this.value + (K.__cast(t, Qt).value - this.value) * e);
        },
        equ: function(e) {
            return K.__instanceof(e, Qt) && this.value == e.value;
        },
        __class__: Qt
    });
    var Wt = function(e) {
        this.value = e;
    };
    s["nanofl.engine.coloreffects.ColorEffectBrightness"] = Wt, Wt.__name__ = [ "nanofl", "engine", "coloreffects", "ColorEffectBrightness" ], 
    Wt.load = function(e) {
        return new Wt(U.getAttr(e, "value", 0));
    }, Wt.__super__ = Gt, Wt.prototype = n(Gt.prototype, {
        value: null,
        save: function(e) {
            e.begin("color").attr("type", "brightness"), e.attr("value", this.value), e.end();
        },
        apply: function(e) {
            null == e.filters && (e.filters = []), this.value > 0 ? e.filters.push(new createjs.ColorFilter(1, 1, 1, 1, 255 * this.value, 255 * this.value, 255 * this.value, 0)) : this.value < 0 && e.filters.push(new createjs.ColorFilter(1 + this.value, 1 + this.value, 1 + this.value, 1, 0, 0, 0, 0));
        },
        clone: function() {
            return new Wt(this.value);
        },
        getNeutralClone: function() {
            return new Wt(0);
        },
        getTweened: function(e, t) {
            return new Wt(this.value + (K.__cast(t, Wt).value - this.value) * e);
        },
        equ: function(e) {
            return K.__instanceof(e, Wt) && this.value == e.value;
        },
        __class__: Wt
    });
    var Zt = function(e, t) {
        this.effect0 = e, this.effect1 = t;
    };
    s["nanofl.engine.coloreffects.ColorEffectDouble"] = Zt, Zt.__name__ = [ "nanofl", "engine", "coloreffects", "ColorEffectDouble" ], 
    Zt.__super__ = Gt, Zt.prototype = n(Gt.prototype, {
        effect0: null,
        effect1: null,
        apply: function(e) {
            this.effect0.apply(e), this.effect1.apply(e);
        },
        equ: function(e) {
            return K.__instanceof(e, Zt) && this.effect0.equ(e.effect0) && this.effect1.equ(e.effect1);
        },
        __class__: Zt
    });
    var Jt = function(e, t) {
        this.color = e, this.multiplier = t;
    };
    s["nanofl.engine.coloreffects.ColorEffectTint"] = Jt, Jt.__name__ = [ "nanofl", "engine", "coloreffects", "ColorEffectTint" ], 
    Jt.load = function(e) {
        return new Jt(U.getAttr(e, "color"), U.getAttr(e, "multiplier", 1));
    }, Jt.__super__ = Gt, Jt.prototype = n(Gt.prototype, {
        color: null,
        multiplier: null,
        save: function(e) {
            e.begin("color").attr("type", "tint"), e.attr("color", this.color), e.attr("multiplier", this.multiplier), 
            e.end();
        },
        apply: function(e) {
            var t = dt.parse(this.color);
            null == e.filters && (e.filters = []), e.filters.push(new createjs.ColorFilter(1 - this.multiplier, 1 - this.multiplier, 1 - this.multiplier, 1, t.r * this.multiplier, t.g * this.multiplier, t.b * this.multiplier, 0));
        },
        clone: function() {
            return new Jt(this.color, this.multiplier);
        },
        getNeutralClone: function() {
            return new Jt(this.color, 0);
        },
        getTweened: function(e, t) {
            return new Jt(this.color, this.multiplier + (K.__cast(t, Jt).multiplier - this.multiplier) * e);
        },
        equ: function(e) {
            return K.__instanceof(e, Jt) && this.color == e.color && this.multiplier == e.multiplier;
        },
        __class__: Jt
    });
    var Kt = function() {
        this.visible = !0, this.regY = 0, this.regX = 0, this.matrix = new bn();
    };
    s["nanofl.engine.elements.Element"] = Kt, Kt.__name__ = [ "nanofl", "engine", "elements", "Element" ], 
    Kt.parse = function(e, t) {
        var n = null, r = e.name;
        switch (r) {
          case "instance":
            n = new tn(null);
            break;

          case "text":
            n = new sn(null, null, null, null, null, null);
            break;

          case "shape":
            n = new nn();
            break;

          case "group":
            n = new en([]);
        }
        if (null != n) {
            if (n.visible = !0, !n.loadProperties(e, t)) return null;
            Vn.assert(null != n.matrix, null, {
                fileName: "Element.hx",
                lineNumber: 50,
                className: "nanofl.engine.elements.Element",
                methodName: "parse"
            });
        }
        return n;
    }, Kt.prototype = {
        matrix: null,
        regX: null,
        regY: null,
        visible: null,
        parent: null,
        getType: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "Element.hx",
                lineNumber: 25,
                className: "nanofl.engine.elements.Element",
                methodName: "getType"
            });
        },
        loadProperties: function(e) {
            return this.matrix = bn.load(e), this.regX = U.getAttr(e, "regX", 0), this.regY = U.getAttr(e, "regY", 0), 
            !0;
        },
        save: function() {
            Vn.methodMustBeOverriden(this, {
                fileName: "Element.hx",
                lineNumber: 64,
                className: "nanofl.engine.elements.Element",
                methodName: "save"
            });
        },
        saveProperties: function(e) {
            this.matrix.save(e), e.attr("regX", this.regX, 0), e.attr("regY", this.regY, 0);
        },
        copyBaseProperties: function(e) {
            e.matrix = this.matrix.clone(), e.regX = this.regX, e.regY = this.regY, e.parent = this.parent, 
            e.visible = this.visible;
        },
        clone: function() {
            return Vn.methodNotSupported(this, {
                fileName: "Element.hx",
                lineNumber: 82,
                className: "nanofl.engine.elements.Element",
                methodName: "clone"
            });
        },
        translate: function(e, t) {
            this.matrix.translate(e, t);
        },
        createDisplayObject: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "Element.hx",
                lineNumber: 91,
                className: "nanofl.engine.elements.Element",
                methodName: "createDisplayObject"
            });
        },
        updateDisplayObject: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "Element.hx",
                lineNumber: 93,
                className: "nanofl.engine.elements.Element",
                methodName: "updateDisplayObject"
            });
        },
        updateDisplayObjectProperties: function(e) {
            e.visible = this.visible, e.set(this.matrix.decompose()), e.filters = [], e.setBounds(null, null, null, null), 
            e.uncache();
        },
        setLibrary: function() {},
        transform: function(e, t) {
            null == t && (t = !0), this.matrix.prependMatrix(e);
        },
        equ: function(e) {
            return (null == e ? null : K.getClass(e)) != K.getClass(this) ? !1 : e.matrix.equ(this.matrix) ? e.regX != this.regX ? !1 : e.regY != this.regY ? !1 : e.visible != this.visible ? !1 : !0 : !1;
        },
        getNearestPoint: function(e) {
            var t = this.matrix.clone().invert().transformPointP(e), n = this.getNearestPointsLocal(t);
            return 0 == n.length || 1 == n.length && 1e100 == n[0].x && 1e100 == n[0].y ? {
                x: 1e100,
                y: 1e100
            } : (n.sort(function(e, n) {
                return f.compare(wn.getDist(t.x, t.y, e.x, e.y), wn.getDist(t.x, t.y, n.x, n.y));
            }), this.matrix.transformPointP(n[0]));
        },
        getNearestPointsLocal: function() {
            return [];
        },
        toString: function() {
            var e = b.getClassName(K.getClass(this)), t = e.lastIndexOf(".") + 1;
            e = o.substr(e, t, null);
            var n;
            return n = null != this.parent ? this.parent.toString() : "", x.endsWith(n, " / layer / frame") && (n = n.substring(0, n.length - " / layer / frame".length)), 
            ("" != n ? n + " / " : "") + e;
        },
        __class__: Kt
    };
    var $t = function() {};
    s["nanofl.engine.elements.Elements"] = $t, $t.__name__ = [ "nanofl", "engine", "elements", "Elements" ], 
    $t.parse = function(e, t) {
        for (var n = [], r = 0, i = e.children; r < i.length; ) {
            var s = i[r];
            ++r;
            var a = Kt.parse(s, t);
            null != a && n.push(a);
        }
        return n;
    }, $t.save = function(e, t) {
        for (var n = o.iter(e); n.hasNext(); ) {
            var r = n.next();
            r.save(t);
        }
    }, $t.expandGroups = function(e) {
        for (var t = [], n = o.iter(e); n.hasNext(); ) {
            var r = n.next();
            K.__instanceof(r, en) ? t = t.concat($t.expandGroups(r.getChildren())) : t.push(r);
        }
        return t;
    };
    var en = function(e) {
        this.name = "";
        var t = this;
        Kt.call(this), Object.defineProperty(this, "elements", {
            get: function() {
                return t.get_elements();
            }
        }), Object.defineProperty(this, "currentFrame", {
            get: function() {
                return t.get_currentFrame();
            },
            set: function(e) {
                t.set_currentFrame(e);
            }
        }), Object.defineProperty(this, "layers", {
            get: function() {
                return t.get_layers();
            }
        }), this._elements = null != e ? e : [];
        for (var n = o.iter(this.elements); n.hasNext(); ) {
            var r = n.next();
            r.parent = this;
        }
    };
    s["nanofl.engine.elements.GroupElement"] = en, en.__name__ = [ "nanofl", "engine", "elements", "GroupElement" ], 
    en.__interfaces__ = [ wt, It ], en.__super__ = Kt, en.prototype = n(Kt.prototype, {
        _elements: null,
        elements: null,
        get_elements: function() {
            return this._elements;
        },
        name: null,
        currentFrame: null,
        get_currentFrame: function() {
            return 0;
        },
        set_currentFrame: function(e) {
            return e;
        },
        _layers: null,
        layers: null,
        get_layers: function() {
            if (null == this._layers) {
                var e = new Ft("auto");
                e.layersContainer = this, e.addKeyFrame(new Et(this)), this._layers = [ e ];
            }
            return this._layers;
        },
        addElement: function(e, t) {
            null == t ? this._elements.push(e) : this._elements.splice(t, 0, e), e.parent = this;
        },
        removeElementAt: function(e) {
            this._elements.splice(e, 1);
        },
        removeElement: function(e) {
            var t = o.indexOf(this.elements, e, 0);
            t >= 0 && this.removeElementAt(t);
        },
        loadProperties: function(e, t) {
            if (!Kt.prototype.loadProperties.call(this, e, t)) return !1;
            this.name = U.getAttr(e, "name", ""), this._elements = [];
            for (var n = 0, r = $t.parse(e, t); n < r.length; ) {
                var i = r[n];
                ++n, this.addElement(i);
            }
            return this.elements.length > 0;
        },
        save: function(e) {
            e.begin("group"), e.attr("name", this.name, ""), this.saveProperties(e), $t.save(this.elements, e), 
            e.end();
        },
        clone: function() {
            var e = new en(mt.clone(this._elements));
            return this.copyBaseProperties(e), e.name = this.name, e;
        },
        setLibrary: function(e) {
            for (var t = o.iter(this.elements); t.hasNext(); ) {
                var n = t.next();
                n.setLibrary(e);
            }
        },
        getChildren: function() {
            return this.elements;
        },
        createDisplayObject: function(e) {
            return this.updateDisplayObject(new createjs.Container(), e);
        },
        updateDisplayObject: function(e, t) {
            Vn.assert(K.__instanceof(e, createjs.Container), this.toString(), {
                fileName: "GroupElement.hx",
                lineNumber: 113,
                className: "nanofl.engine.elements.GroupElement",
                methodName: "updateDisplayObject"
            }), Vn.assert(this.elements.length > 0, this.toString(), {
                fileName: "GroupElement.hx",
                lineNumber: 114,
                className: "nanofl.engine.elements.GroupElement",
                methodName: "updateDisplayObject"
            }), t = null != t && t.length > 0 && t[0].element == this ? t.slice(1) : null, this.updateDisplayObjectProperties(e);
            var n = e;
            n.removeAllChildren();
            for (var r = null, i = o.iter(this.elements); i.hasNext(); ) {
                var s = i.next();
                null == t || 0 == t.length || t[0].element != s ? n.addChild(s.createDisplayObject(t)) : null != t && 0 != t.length && t[0].element == s && (r = s);
            }
            return null != r && n.addChild(r.createDisplayObject(t)), n;
        },
        getMaskFilter: function() {
            return null;
        },
        isScene: function() {
            return !1;
        },
        getNavigatorName: function() {
            return "group";
        },
        getNavigatorIcon: function() {
            return "custom-icon-group";
        },
        getTimeline: function() {
            return null;
        },
        transform: function(e, t) {
            null == t && (t = !0);
            for (var n = o.iter(this.elements); n.hasNext(); ) {
                var r = n.next();
                r.transform(e, t);
            }
        },
        getNearestPointsLocal: function(e) {
            return this.elements.map(function(t) {
                return t.getNearestPoint(e);
            });
        },
        equ: function(e) {
            return Kt.prototype.equ.call(this, e) ? e.name != this.name ? !1 : mt.equ(e._elements, this._elements) ? !0 : !1 : !1;
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "elements", {
                get: function() {
                    return t.get_elements();
                }
            }), Object.defineProperty(this, "currentFrame", {
                get: function() {
                    return t.get_currentFrame();
                },
                set: function(e) {
                    t.set_currentFrame(e);
                }
            }), Object.defineProperty(this, "layers", {
                get: function() {
                    return t.get_layers();
                }
            }), e.unserializeObject(this);
        },
        hxSerialize: function(e) {
            e.serializeFields(this);
        },
        __class__: en
    });
    var tn = function(e, t, n, r, i) {
        this.rotationY = 0, this.rotationX = 0;
        var s = this;
        Kt.call(this), Object.defineProperty(this, "symbol", {
            get: function() {
                return s.get_symbol();
            }
        }), Object.defineProperty(this, "layers", {
            get: function() {
                return s.get_layers();
            }
        }), this.namePath = e, this.name = t, this.colorEffect = n, this.filters = null != r ? r : [], 
        this.blendMode = null != i ? i : "normal";
    };
    s["nanofl.engine.elements.Instance"] = tn, tn.__name__ = [ "nanofl", "engine", "elements", "Instance" ], 
    tn.__interfaces__ = [ It ], tn.__super__ = Kt, tn.prototype = n(Kt.prototype, {
        library: null,
        namePath: null,
        name: null,
        colorEffect: null,
        filters: null,
        blendMode: null,
        rotationX: null,
        rotationY: null,
        symbol: null,
        get_symbol: function() {
            return K.__cast(this.library.getItem(this.namePath), Tn);
        },
        getType: function() {
            return "instance";
        },
        loadProperties: function(e, t) {
            return Kt.prototype.loadProperties.call(this, e, t) ? (this.namePath = U.getAttr(e, "libraryItem"), 
            Vn.assert(null != this.namePath, null, {
                fileName: "Instance.hx",
                lineNumber: 49,
                className: "nanofl.engine.elements.Instance",
                methodName: "loadProperties"
            }), Vn.assert("" != this.namePath, null, {
                fileName: "Instance.hx",
                lineNumber: 50,
                className: "nanofl.engine.elements.Instance",
                methodName: "loadProperties"
            }), this.name = U.getAttr(e, "name", ""), this.colorEffect = Gt.load(U.findOne(e, ">color")), 
            this.filters = e.find(">filters>*").map(function(e) {
                return xt.load(e, t);
            }), this.blendMode = U.getAttr(e, "blendMode", "normal"), this.rotationX = U.getAttrFloat(e, "rotationX", 0), 
            this.rotationY = U.getAttrFloat(e, "rotationY", 0), !0) : !1;
        },
        save: function(e) {
            if (e.begin("instance").attr("libraryItem", this.namePath).attr("name", this.name, "").attr("blendMode", this.blendMode, "normal").attr("rotationX", this.rotationX, 0).attr("rotationY", this.rotationY, 0), 
            null != this.colorEffect && this.colorEffect.save(e), this.filters.length > 0) {
                e.begin("filters");
                for (var t = 0, n = this.filters; t < n.length; ) {
                    var r = n[t];
                    ++t, r.save(e);
                }
                e.end();
            }
            this.saveProperties(e), e.end();
        },
        clone: function() {
            var e = new tn(this.namePath, this.name, zt.clone(this.colorEffect), mt.clone(this.filters), this.blendMode);
            return e.library = this.library, this.copyBaseProperties(e), e.rotationX = this.rotationX, 
            e.rotationY = this.rotationY, e;
        },
        isScene: function() {
            return this.namePath == Ot.SCENE_NAME_PATH;
        },
        toString: function() {
            return (null != this.parent ? this.parent.toString() + " / " : "") + "Instance(" + this.namePath + ")";
        },
        layers: null,
        get_layers: function() {
            return K.__instanceof(this.symbol, Pt) ? this.symbol.layers : null;
        },
        createDisplayObject: function(e) {
            var t = 0;
            null != e && e.length > 0 && e[0].element == this ? (t = e[0].frameIndex, e = e.slice(1)) : e = null;
            var n = this.symbol.createDisplayObject(t, e);
            return this.updateDisplayObjectProperties(n), this.updateDisplayObjectInstanceProperties(n), 
            n;
        },
        updateDisplayObject: function(e, t) {
            return this.updateDisplayObjectProperties(e), this.symbol.updateDisplayObject(e, t), 
            this.updateDisplayObjectInstanceProperties(e), e;
        },
        updateDisplayObjectInstanceProperties: function(e) {
            null == e.filters && (e.filters = []), null != this.colorEffect && this.colorEffect.apply(e);
            for (var t = 0, n = this.filters; t < n.length; ) {
                var r = n[t];
                ++t;
                var i = r.getFilter();
                null != i && e.filters.push(i);
            }
            "" != this.name && (e.name = this.name), e.compositeOperation = this.blendMode, 
            K.__instanceof(e, lt) && (e.rotationX = this.rotationX, e.rotationY = this.rotationY);
        },
        getNavigatorName: function() {
            return this.namePath;
        },
        getNavigatorIcon: function() {
            return this.symbol.getIcon();
        },
        getChildren: function() {
            for (var e = [], t = o.iter(this.layers); t.hasNext(); ) {
                var n = t.next();
                n.keyFrames.length > 0 && (e = n.keyFrames[0].elements.concat(e));
            }
            return e;
        },
        getTimeline: function() {
            return K.__instanceof(this.symbol, Rt) ? this.symbol : null;
        },
        getNearestPointsLocal: function(e) {
            return [ this.symbol.getNearestPoint(e) ];
        },
        setLibrary: function(e) {
            this.library = e;
        },
        equ: function(e) {
            return Kt.prototype.equ.call(this, e) ? e.namePath != this.namePath ? !1 : e.name != this.name ? !1 : zt.equ(e.colorEffect, this.colorEffect) && mt.equ(e.filters, this.filters) ? e.blendMode != this.blendMode ? !1 : e.rotationX != this.rotationX ? !1 : e.rotationY != this.rotationY ? !1 : !0 : !1 : !1;
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "symbol", {
                get: function() {
                    return t.get_symbol();
                }
            }), Object.defineProperty(this, "layers", {
                get: function() {
                    return t.get_layers();
                }
            }), e.unserializeObject(this);
        },
        hxSerialize: function(e) {
            e.serializeFields(this);
        },
        __class__: tn
    });
    var nn = function(e, t, n) {
        null == n && (n = !0), Kt.call(this), this.edges = null != e ? e : [], this.polygons = null != t ? t : [], 
        n && this.normalize();
    };
    s["nanofl.engine.elements.ShapeElement"] = nn, nn.__name__ = [ "nanofl", "engine", "elements", "ShapeElement" ], 
    nn.createRectangle = function(e, t, n, r, i, s, a, l, o, u) {
        var h = e, c = t, f = e + n, g = t + r, m = Math.abs(i), d = Math.abs(s), p = Math.abs(a), v = Math.abs(l), y = [], _ = .87;
        return i > 0 ? y.push(new _n(h + m, c, h, c, h, c + m)) : 0 > i && y.push(new _n(h + m, c, h + m * _, c + m * _, h, c + m)), 
        y.push(new _n(h, c + m, h, g - v)), l > 0 ? y.push(new _n(h, g - v, h, g, h + v, g)) : 0 > l && y.push(new _n(h, g - v, h + v * _, g - v * _, h + v, g)), 
        y.push(new _n(h + v, g, f - p, g)), a > 0 ? y.push(new _n(f - p, g, f, g, f, g - p)) : 0 > a && y.push(new _n(f - p, g, f - p * _, g - p * _, f, g - p)), 
        y.push(new _n(f, g - p, f, c + d)), s > 0 ? y.push(new _n(f, c + d, f, c, f - d, c)) : 0 > s && y.push(new _n(f, c + d, f - d * _, c + d * _, f - d, c)), 
        y.push(new _n(f - d, c, h + m, c)), new nn(null != o ? y.map(function(e) {
            return Cn.fromEdge(e, o);
        }) : [], null != u ? [ new Nn(u, [ new vn(y) ]) ] : []);
    }, nn.createOval = function(e, t, n, r, i, s, a, l, o, u) {
        s == i && (s = i + 360), 0 == i && 360 == s && 0 == a && l || yt.console.warn("Oval: processing startAngle, endAngle, innerRadius and closePath arguments are not implemented yet.");
        for (var h = 1.075, c = [], f = -Math.PI / 8, g = 1; 16 >= g; ) c.push(new _n(e + n * Math.cos(f * g), t + r * Math.sin(f * g), e + n * Math.cos(f * (g + 1)) * h, t + r * Math.sin(f * (g + 1)) * h, e + n * Math.cos(f * (g + 2)), t + r * Math.sin(f * (g + 2)))), 
        g += 2;
        return new nn(null != o ? c.map(function(e) {
            return Cn.fromEdge(e, o);
        }) : [], null != u ? [ new Nn(u, [ new vn(c) ]) ] : []);
    }, nn.log = function() {}, nn.__super__ = Kt, nn.prototype = n(Kt.prototype, {
        edges: null,
        polygons: null,
        getType: function() {
            return "shape";
        },
        loadProperties: function(e, t) {
            if (!Kt.prototype.loadProperties.call(this, e, t)) return !1;
            this.edges = [], this.polygons = [];
            for (var n = [], r = [], i = 0, s = e.children; i < s.length; ) {
                var a = s[i];
                if (++i, "fills" == a.name) for (var l = 0, o = a.children; l < o.length; ) {
                    var u = [ o[l] ];
                    if (++l, "fill" == u[0].name) {
                        var h = U.getAttr(u[0], "type", "solid");
                        switch (h) {
                          case "solid":
                            n.push(gn.load(u[0], t));
                            break;

                          case "linear":
                            n.push(hn.load(u[0], t));
                            break;

                          case "bitmap":
                            n.push(on.load(u[0], t));
                            break;

                          case "radial":
                            n.push(cn.load(u[0], t));
                            break;

                          default:
                            nn.log(function(e) {
                                return function() {
                                    return "Unknow fill type '" + y.string(U.getAttr(e[0], "type")) + "'.";
                                };
                            }(u), {
                                fileName: "ShapeElement.hx",
                                lineNumber: 69,
                                className: "nanofl.engine.elements.ShapeElement",
                                methodName: "loadProperties"
                            });
                        }
                    }
                } else if ("strokes" == a.name) for (var c = 0, f = a.children; c < f.length; ) {
                    var g = f[c];
                    ++c, "stroke" == g.name && r.push(Ln.load(g, t));
                } else if ("figure" == a.name) for (var m = 0, d = a.children; m < d.length; ) {
                    var p = d[m];
                    ++m, "edge" == p.name ? this.edges = this.edges.concat(Pn.load(p, r, t)) : "polygon" == p.name && this.polygons.push(Nn.load(p, n, t));
                }
            }
            return this.ensureNoTransform(), !0;
        },
        getFills: function() {
            for (var e = [], t = 0, n = this.polygons; t < n.length; ) {
                var r = [ n[t] ];
                ++t, Jn.findIndex(e, function(e) {
                    return function(t) {
                        return t.equ(e[0].fill);
                    };
                }(r)) < 0 && e.push(r[0].fill);
            }
            return e;
        },
        getStrokes: function() {
            for (var e = [], t = 0, n = this.edges; t < n.length; ) {
                var r = [ n[t] ];
                ++t, Jn.findIndex(e, function(e) {
                    return function(t) {
                        return t.equ(e[0].stroke);
                    };
                }(r)) < 0 && e.push(r[0].stroke);
            }
            return e;
        },
        save: function(e) {
            if (!this.isEmpty()) {
                e.begin("shape"), this.saveProperties(e);
                var t = this.getFills();
                if (t.length > 0) {
                    e.begin("fills");
                    for (var n = 0; n < t.length; ) {
                        var r = t[n];
                        ++n, r.save(e);
                    }
                    e.end();
                }
                var i = this.getStrokes();
                if (i.length > 0) {
                    e.begin("strokes");
                    for (var s = 0; s < i.length; ) {
                        var a = i[s];
                        ++s, a.save(e);
                    }
                    e.end();
                }
                e.begin("figure");
                for (var l = 0, o = this.polygons; l < o.length; ) {
                    var u = o[l];
                    ++l, u.save(t, e);
                }
                Pn.save(this.edges, i, e), e.end(), e.end();
            }
        },
        ensureNoTransform: function() {
            this.transform(this.matrix), this.matrix.tx = 0, this.matrix.ty = 0, this.matrix.a = 1, 
            this.matrix.b = 0, this.matrix.c = 0, this.matrix.d = 1;
        },
        draw: function(e, t) {
            for (var n = 0, r = this.polygons; n < r.length; ) {
                var i = r[n];
                ++n, i.draw(e, t);
            }
            Pn.drawSorted(this.edges, e, t);
        },
        createDisplayObject: function() {
            return this.updateDisplayObject(new createjs.Shape(), null);
        },
        updateDisplayObject: function(e) {
            Vn.assert(K.__instanceof(e, createjs.Shape), null, {
                fileName: "ShapeElement.hx",
                lineNumber: 197,
                className: "nanofl.engine.elements.ShapeElement",
                methodName: "updateDisplayObject"
            }), this.updateDisplayObjectProperties(e);
            var t = e;
            t.graphics.clear();
            var n = e.getConcatenatedMatrix().invert();
            if (this.draw(t.graphics, (n.a + n.d) / 2), !this.isEmpty()) {
                var r = this.getBounds();
                t.setBounds(r.minX, r.minY, r.maxX - r.minX, r.maxY - r.minY);
            }
            return t;
        },
        clone: function() {
            var e = new nn(mt.clone(this.edges), mt.clone(this.polygons));
            return this.copyBaseProperties(e), e;
        },
        translate: function(e, t) {
            if (0 != e || 0 != t) {
                for (var n = 0, r = this.edges; n < r.length; ) {
                    var i = r[n];
                    ++n, i.translate(e, t);
                }
                for (var s = 0, a = this.polygons; s < a.length; ) {
                    var l = a[s];
                    ++s, l.translate(e, t);
                }
            }
        },
        isEmpty: function() {
            return 0 == this.edges.length && 0 == this.polygons.length;
        },
        hasSelected: function() {
            return this.hasSelectedEdges() || this.hasSelectedPolygons();
        },
        isAllSelected: function() {
            return u.foreach(this.edges, function(e) {
                return e.selected;
            }) && u.foreach(this.polygons, function(e) {
                return e.selected;
            });
        },
        hasSelectedEdges: function() {
            return u.exists(this.edges, function(e) {
                return e.selected;
            });
        },
        hasSelectedPolygons: function() {
            return u.exists(this.polygons, function(e) {
                return e.selected;
            });
        },
        select: function(e) {
            this.deselectAll(), null != e && (e.selected = !0);
        },
        selectAll: function() {
            for (var e = 0, t = this.edges; e < t.length; ) {
                var n = t[e];
                ++e, n.selected = !0;
            }
            for (var r = 0, i = this.polygons; r < i.length; ) {
                var s = i[r];
                ++r, s.selected = !0;
            }
        },
        deselectAll: function() {
            for (var e = 0, t = this.edges; e < t.length; ) {
                var n = t[e];
                ++e, n.selected = !1;
            }
            for (var r = 0, i = this.polygons; r < i.length; ) {
                var s = i[r];
                ++r, s.selected = !1;
            }
        },
        translateSelected: function(e, t) {
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n, i.selected && i.translate(e, t);
            }
            for (var s = 0, a = this.polygons; s < a.length; ) {
                var l = a[s];
                ++s, l.selected && l.translate(e, t);
            }
        },
        translateVertex: function(e, t, n) {
            for (var r = 0, i = this.edges; r < i.length; ) {
                var s = i[r];
                ++r, s.translateVertex(e, t, n);
            }
            for (var a = 0, l = this.polygons; a < l.length; ) {
                var o = l[a];
                ++a, o.translateVertex(e, t, n);
            }
        },
        removeSelected: function() {
            for (var e = u.exists(this.edges, function(e) {
                return e.selected;
            }), t = 0; t < this.edges.length; ) this.edges[t].selected ? this.edges.splice(t, 1) : t++;
            for (var n = 0; n < this.polygons.length; ) this.polygons[n].selected ? this.polygons.splice(n, 1) : n++;
            e && En.mergeByCommonEdges(this.polygons, this.edges);
        },
        getPolygonAtPos: function(e) {
            for (var t = 0, n = this.polygons; t < n.length; ) {
                var r = n[t];
                if (++t, r.isPointInside(e.x, e.y)) return r;
            }
            return null;
        },
        getSameEdges: function(e) {
            var t = [];
            if (null == e) return t;
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n, i.equ(e) && t.push(i);
            }
            for (var s = 0, a = this.polygons; s < a.length; ) {
                var l = a[s];
                ++s;
                for (var o = 0, u = l.contours; o < u.length; ) {
                    var h = u[o];
                    ++o;
                    for (var c = 0, f = h.edges; c < f.length; ) {
                        var g = f[c];
                        ++c, g.equ(e) && t.push(g);
                    }
                }
            }
            return t;
        },
        getNearestStrokeEdge: function(e) {
            for (var t = {
                edge: null,
                dist: 1e100,
                point: null,
                t: 0
            }, n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n;
                var s = new _n(i.x1, i.y1, i.x2, i.y2, i.x3, i.y3).getNearestPoint(e.x, e.y), a = wn.getDistP(e, s.point);
                a < t.dist && (t.edge = i, t.dist = a, t.point = s.point, t.t = s.t);
            }
            return null != t.edge ? t : null;
        },
        getNearestPolygonEdge: function(e) {
            for (var t = [], n = 0, r = this.polygons; n < r.length; ) {
                var i = r[n];
                ++n, i.getEdges(t);
            }
            for (var s = null, a = 1e100, l = null, o = null, u = 0; u < t.length; ) {
                var h = t[u];
                ++u;
                var c = h.getNearestPoint(e.x, e.y), f = wn.getSqrDistP(e, c.point);
                a > f && (s = h, a = f, l = c.point, o = c.t);
            }
            return null != s ? {
                edge: s,
                dist: Math.sqrt(a),
                point: l,
                t: o
            } : null;
        },
        getNearestVertex: function(e, t) {
            null == t && (t = !1);
            for (var n = null, r = 1e100, i = 1e100, s = 0, a = this.edges; s < a.length; ) {
                var l = a[s];
                ++s;
                var o = {
                    x: l.x1,
                    y: l.y1
                };
                if (!t || o.x != e.x || o.y != e.y) {
                    var u = wn.getDist(e.x, e.y, o.x, o.y);
                    r > u && (n = o, r = u, i = Math.max(0, u - l.stroke.thickness / 2));
                }
                var h = {
                    x: l.x3,
                    y: l.y3
                };
                if (!t || h.x != e.x || h.y != e.y) {
                    var c = wn.getSqrDist(e.x, e.y, h.x, h.y);
                    r > c && (n = h, r = c, i = Math.max(0, c - l.stroke.thickness / 2));
                }
            }
            for (var f = 0, g = this.polygons; f < g.length; ) {
                var m = g[f];
                ++f;
                for (var d = 0, p = m.getEdges(); d < p.length; ) {
                    var v = p[d];
                    ++d;
                    var y = {
                        x: v.x1,
                        y: v.y1
                    };
                    if (!t || y.x != e.x || y.y != e.y) {
                        var _ = wn.getDist(e.x, e.y, y.x, y.y);
                        r > _ && (n = y, r = _, i = _);
                    }
                    var x = {
                        x: v.x3,
                        y: v.y3
                    };
                    if (!t || x.x != e.x || x.y != e.y) {
                        var A = wn.getDist(e.x, e.y, x.x, x.y);
                        r > A && (n = x, r = A, i = A);
                    }
                }
            }
            return null != n ? {
                point: n,
                dist: r,
                distMinusEdgeThickness: i
            } : null;
        },
        setSelectedEdgesStroke: function(e) {
            for (var t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                ++t, r.selected && (r.stroke = e);
            }
        },
        setSelectedEdgesStrokeParams: function(e) {
            for (var t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                if (++t, r.selected) {
                    var i = r.stroke.clone();
                    null != e.thickness && (i.thickness = e.thickness), null != e.ignoreScale && (i.ignoreScale = e.ignoreScale), 
                    null != e.caps && (i.caps = e.caps), null != e.joints && (i.joints = e.joints), 
                    null != e.miterLimit && (i.miterLimit = e.miterLimit);
                    var s = i.getTyped();
                    switch (s[1]) {
                      case 0:
                        var a = s[2];
                        null != e.color && (a.color = e.color);
                        break;

                      case 1:
                        var l = s[2];
                        null != e.colors && (l.colors = e.colors), null != e.ratios && (l.ratios = e.ratios), 
                        null != e.x0 && (l.x0 = e.x0), null != e.y0 && (l.y0 = e.y0), null != e.x1 && (l.x1 = e.x1), 
                        null != e.y1 && (l.y1 = e.y1);
                        break;

                      case 2:
                        var o = s[2];
                        null != e.colors && (o.colors = e.colors), null != e.ratios && (o.ratios = e.ratios), 
                        null != e.x0 && (o.fx = e.x0), null != e.y0 && (o.fy = e.y0), null != e.x1 && (o.cx = e.x1), 
                        null != e.y1 && (o.cy = e.y1), null != e.r && (o.r = e.r);
                        break;

                      case 3:
                        var u = s[2];
                        null != e.bitmapPath && (u.bitmapPath = e.bitmapPath);
                    }
                    r.stroke = i;
                }
            }
        },
        getSelectedEdgesStrokeParams: function() {
            for (var e = {
                type: null,
                thickness: null,
                ignoreScale: null,
                color: null,
                colors: null,
                ratios: null,
                x0: null,
                y0: null,
                x1: null,
                y1: null,
                r: null,
                bitmapPath: null,
                caps: null,
                joints: null,
                miterLimit: null
            }, t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                if (++t, r.selected) {
                    e.thickness = null == e.thickness || e.thickness == r.stroke.thickness ? r.stroke.thickness : -1, 
                    e.ignoreScale = null == e.ignoreScale || e.ignoreScale == r.stroke.ignoreScale ? r.stroke.ignoreScale : !1, 
                    e.caps = null == e.caps || e.caps == r.stroke.caps ? r.stroke.caps : "mixed", e.joints = null == e.joints || e.joints == r.stroke.joints ? r.stroke.joints : "mixed", 
                    e.miterLimit = null == e.miterLimit || e.miterLimit == r.stroke.miterLimit ? r.stroke.miterLimit : -1;
                    var i = r.stroke.getTyped();
                    switch (i[1]) {
                      case 0:
                        var s = i[2];
                        e.type = null == e.type || "solid" == e.type ? "solid" : "mixed", e.color = s.color;
                        break;

                      case 1:
                        var a = i[2];
                        e.type = null == e.type || "linear" == e.type ? "linear" : "mixed", e.colors = a.colors, 
                        e.ratios = a.ratios, e.x0 = a.x0, e.y0 = a.y0, e.x1 = a.x1, e.y1 = a.y1;
                        break;

                      case 2:
                        var l = i[2];
                        e.type = null == e.type || "radial" == e.type ? "radial" : "mixed", e.colors = l.colors, 
                        e.ratios = l.ratios, e.x0 = l.fx, e.y0 = l.fy, e.x1 = l.cx, e.y1 = l.cy, e.r = l.r;
                        break;

                      case 3:
                        var o = i[2];
                        e.type = null == e.type || "bitmap" == e.type ? "bitmap" : "mixed", e.bitmapPath = o.bitmapPath;
                    }
                }
            }
            return e;
        },
        setSelectedPolygonsFill: function(e, t, n, r, i) {
            for (var s = 0, a = this.polygons; s < a.length; ) {
                var l = a[s];
                ++s, l.selected && l.applyFill(e, t, n, r, i);
            }
        },
        setSelectedPolygonsFillParams: function(e) {
            for (var t = 0, n = this.polygons; t < n.length; ) {
                var r = n[t];
                if (++t, r.selected) {
                    var i = r.fill.clone(), s = i.getTyped();
                    switch (s[1]) {
                      case 0:
                        var a = s[2];
                        null != e.color && (a.color = e.color);
                        break;

                      case 1:
                        var l = s[2];
                        null != e.colors && (l.colors = e.colors), null != e.ratios && (l.ratios = e.ratios), 
                        null != e.x0 && (l.x0 = e.x0), null != e.y0 && (l.y0 = e.y0), null != e.x1 && (l.x1 = e.x1), 
                        null != e.y1 && (l.y1 = e.y1);
                        break;

                      case 2:
                        var o = s[2];
                        null != e.colors && (o.colors = e.colors), null != e.ratios && (o.ratios = e.ratios), 
                        null != e.x0 && (o.fx = e.x0), null != e.y0 && (o.fy = e.y0), null != e.x1 && (o.cx = e.x1), 
                        null != e.y1 && (o.cy = e.y1), null != e.r && (o.r = e.r);
                        break;

                      case 3:
                        var u = s[2];
                        null != e.bitmapPath && (u.bitmapPath = e.bitmapPath), null != e.matrix && (u.matrix = e.matrix), 
                        null != e.repeat && (u.repeat = e.repeat);
                    }
                    r.fill = i;
                }
            }
        },
        getSelectedPolygonsFillParams: function() {
            for (var e = {
                type: null,
                color: null,
                colors: null,
                ratios: null,
                x0: null,
                y0: null,
                x1: null,
                y1: null,
                r: null,
                bitmapPath: null,
                matrix: null,
                repeat: null
            }, t = 0, n = this.polygons; t < n.length; ) {
                var r = n[t];
                if (++t, r.selected) {
                    var i = r.fill.getTyped();
                    switch (i[1]) {
                      case 0:
                        var s = i[2];
                        e.type = null == e.type || "solid" == e.type ? "solid" : "mixed", e.color = s.color;
                        break;

                      case 1:
                        var a = i[2];
                        e.type = null == e.type || "linear" == e.type ? "linear" : "mixed", e.colors = a.colors, 
                        e.ratios = a.ratios, e.x0 = a.x0, e.y0 = a.y0, e.x1 = a.x1, e.y1 = a.y1;
                        break;

                      case 2:
                        var l = i[2];
                        e.type = null == e.type || "radial" == e.type ? "radial" : "mixed", e.colors = l.colors, 
                        e.ratios = l.ratios, e.x0 = l.fx, e.y0 = l.fy, e.x1 = l.cx, e.y1 = l.cy, e.r = l.r;
                        break;

                      case 3:
                        var o = i[2];
                        e.type = null == e.type || "bitmap" == e.type ? "bitmap" : "mixed", e.bitmapPath = o.bitmapPath, 
                        e.matrix = o.matrix, e.repeat = o.repeat;
                    }
                }
            }
            return "mixed" == e.type && (e.type = null), e;
        },
        floodFill: function(e, t, n, r, i) {
            var s = this.findOrCreatePolygonByPoint((t + r) / 2, (n + i) / 2);
            null != s && s.applyFill(e, t, n, r, i);
        },
        getBounds: function(e, t) {
            if (null == t && (t = !0), this.edges.length > 0 || this.polygons.length > 0) {
                null == e && (e = {
                    minX: 1e100,
                    minY: 1e100,
                    maxX: -1e100,
                    maxY: -1e100
                }), t ? Pn.getBounds(this.edges, e) : xn.getBounds(this.edges, e);
                for (var n = 0, r = this.polygons; n < r.length; ) {
                    var i = r[n];
                    ++n, i.getBounds(e);
                }
            }
            return e;
        },
        getSelectedBounds: function(e, t) {
            null == t && (t = !0);
            for (var n = [], r = 0, i = this.edges; r < i.length; ) {
                var s = i[r];
                ++r, s.selected && n.push(s);
            }
            for (var a = [], l = 0, o = this.polygons; l < o.length; ) {
                var u = o[l];
                ++l, u.selected && a.push(u);
            }
            if (n.length > 0 || a.length > 0) {
                null == e && (e = {
                    minX: 1e100,
                    minY: 1e100,
                    maxX: -1e100,
                    maxY: -1e100
                }), t ? Pn.getBounds(n, e) : xn.getBounds(n, e);
                for (var h = 0; h < a.length; ) {
                    var c = a[h];
                    ++h, c.getBounds(e);
                }
            }
            return e;
        },
        findOrCreatePolygonByPoint: function(e, t, n) {
            var r = En.findByPoint(this.polygons, e, t);
            if (null != r) return r;
            var i = this.getEdges();
            Vn.assert(!xn.hasDuplicates(i), i.toString(), {
                fileName: "ShapeElement.hx",
                lineNumber: 734,
                className: "nanofl.engine.elements.ShapeElement",
                methodName: "findOrCreatePolygonByPoint"
            });
            for (var s = yn.fromEdges(i), a = [], l = [], o = 0; o < s.length; ) {
                var u = s[o];
                ++o, u.isPointInside(e, t) ? a.push(u) : l.push(u);
            }
            for (var h = 0; h < a.length; ) {
                for (var c = 0; c < a.length; ) h != c && a[h].isNestedTo(a[c]) && (a.splice(c, 1), 
                h > c && h--, c--), c++;
                h++;
            }
            if (0 == a.length) return null;
            var f = a[0];
            l = l.filter(function(e) {
                return e.isNestedTo(f);
            });
            for (var g = 0; g < l.length; ) {
                for (var m = 0; m < l.length; ) g != m && l[m].isNestedTo(l[g]) && (l.splice(m, 1), 
                g > m && g--, m--), m++;
                g++;
            }
            Vn.assert(f.isClockwise(), null, {
                fileName: "ShapeElement.hx",
                lineNumber: 788,
                className: "nanofl.engine.elements.ShapeElement",
                methodName: "findOrCreatePolygonByPoint"
            }), r = new Nn(n), r.contours.push(f);
            for (var d = 0; d < l.length; ) {
                var p = l[d];
                ++d, p.reverse(), Vn.assert(p.isCounterClockwise(), null, {
                    fileName: "ShapeElement.hx",
                    lineNumber: 795,
                    className: "nanofl.engine.elements.ShapeElement",
                    methodName: "findOrCreatePolygonByPoint"
                }), r.contours.push(p);
            }
            return this.polygons.push(r), r;
        },
        transform: function(e, t) {
            if (null == t && (t = !0), !e.isIdentity()) {
                for (var n = 0, r = this.edges; n < r.length; ) {
                    var i = r[n];
                    ++n, i.transform(e, t);
                }
                for (var s = 0, a = this.polygons; s < a.length; ) {
                    var l = a[s];
                    ++s, l.transform(e, t);
                }
                this.normalize();
            }
        },
        transformSelected: function(e, t) {
            null == t && (t = !0);
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n, i.selected && i.transform(e, t);
            }
            for (var s = 0, a = this.polygons; s < a.length; ) {
                var l = a[s];
                ++s, l.selected && l.transform(e);
            }
            this.normalize();
        },
        extractSelected: function() {
            return new nn(mt.clone(this.edges.filter(function(e) {
                return e.selected;
            })), mt.clone(this.polygons.filter(function(e) {
                return e.selected;
            })));
        },
        assertCorrect: function() {},
        getEdges: function() {
            for (var e = this.edges.slice(), t = 0, n = this.polygons; t < n.length; ) {
                var r = n[t];
                ++t, r.getEdges(e);
            }
            return Vn.assert(!xn.hasDuplicates(e), null, {
                fileName: "ShapeElement.hx",
                lineNumber: 1013,
                className: "nanofl.engine.elements.ShapeElement",
                methodName: "getEdges"
            }), e;
        },
        replaceEdge: function(e, t) {
            Pn.replace(this.edges, e, t), Vn.assert(e.indexIn(this.edges) < 0, "\nsearch = " + y.string(e) + "\nreplacement = " + y.string(t), {
                fileName: "ShapeElement.hx",
                lineNumber: 1020,
                className: "nanofl.engine.elements.ShapeElement",
                methodName: "replaceEdge"
            });
            for (var n = 0, r = this.polygons; n < r.length; ) {
                var i = r[n];
                ++n, i.replaceEdge(e, t), Vn.assert(e.indexIn(i.getEdges()) < 0, "\nsearch = " + y.string(e) + "\nreplacement = " + y.string(t), {
                    fileName: "ShapeElement.hx",
                    lineNumber: 1025,
                    className: "nanofl.engine.elements.ShapeElement",
                    methodName: "replaceEdge"
                });
            }
            Vn.assert(e.indexIn(this.getEdges()) < 0, "\nsearch = " + y.string(e) + "\nreplacement = " + y.string(t), {
                fileName: "ShapeElement.hx",
                lineNumber: 1028,
                className: "nanofl.engine.elements.ShapeElement",
                methodName: "replaceEdge"
            });
        },
        normalize: function() {
            xn.normalize(this.edges), En.normalize(this.polygons);
        },
        swapInstance: function(e, t) {
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n, i.stroke.swapInstance(e, t);
            }
            for (var s = 0, a = this.polygons; s < a.length; ) {
                var l = a[s];
                ++s, l.fill.swapInstance(e, t);
            }
        },
        applyStrokeAlpha: function(e) {
            if (1 != e) for (var t = new R(), n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n, null == t.h.__keys__[i.stroke.__id__] && (i.stroke.applyAlpha(e), t.set(i.stroke, !0));
            }
        },
        applyFillAlpha: function(e) {
            if (1 != e) for (var t = new R(), n = 0, r = this.polygons; n < r.length; ) {
                var i = r[n];
                ++n, null == t.h.__keys__[i.fill.__id__] && (i.fill.applyAlpha(e), t.set(i.fill, !0));
            }
        },
        getEdgeCount: function() {
            for (var e = this.edges.length, t = 0, n = this.polygons; t < n.length; ) {
                var r = n[t];
                ++t, e += r.getEdges().length;
            }
            return e;
        },
        setLibrary: function(e) {
            for (var t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                ++t, r.stroke.setLibrary(e);
            }
            for (var i = 0, s = this.polygons; i < s.length; ) {
                var a = s[i];
                ++i, a.fill.setLibrary(e);
            }
        },
        equ: function(e) {
            return Kt.prototype.equ.call(this, e) && mt.equ(e.edges, this.edges) && mt.equ(e.polygons, this.polygons) ? !0 : !1;
        },
        getNearestPointsLocal: function(e) {
            for (var t = 0, n = this.polygons; t < n.length; ) {
                var r = n[t];
                if (++t, r.isPointInside(e.x, e.y)) return [ e ];
            }
            for (var i = [], s = 0, a = this.polygons; s < a.length; ) {
                var l = a[s];
                ++s, i = i.concat(l.getEdges().map(function(t) {
                    return t.getNearestPoint(e.x, e.y).point;
                }));
            }
            return i = i.concat(this.edges.map(function(t) {
                return t.getNearestPointUseStrokeSize(e.x, e.y).point;
            }));
        },
        toString: function() {
            return (null != this.parent ? this.parent.toString() + " / " : "") + "Shape";
        },
        __class__: nn
    });
    var rn = function(e, t) {
        Kt.call(this), this.sprite = e, this.index = t;
    };
    s["nanofl.engine.elements.SpriteFrameElement"] = rn, rn.__name__ = [ "nanofl", "engine", "elements", "SpriteFrameElement" ], 
    rn.__super__ = Kt, rn.prototype = n(Kt.prototype, {
        sprite: null,
        index: null,
        getType: function() {
            return "spriteFrame";
        },
        loadProperties: function() {
            return Vn.methodNotSupported(this, {
                fileName: "SpriteFrameElement.hx",
                lineNumber: 24,
                className: "nanofl.engine.elements.SpriteFrameElement",
                methodName: "loadProperties"
            });
        },
        save: function() {
            Vn.methodNotSupported(this, {
                fileName: "SpriteFrameElement.hx",
                lineNumber: 26,
                className: "nanofl.engine.elements.SpriteFrameElement",
                methodName: "save"
            });
        },
        clone: function() {
            return Vn.methodNotSupported(this, {
                fileName: "SpriteFrameElement.hx",
                lineNumber: 28,
                className: "nanofl.engine.elements.SpriteFrameElement",
                methodName: "clone"
            });
        },
        createDisplayObject: function() {
            var e = this.sprite.createDisplayObject(this.index, null);
            return this.updateDisplayObjectProperties(e), e;
        },
        updateDisplayObject: function(e, t) {
            return this.updateDisplayObjectProperties(e), this.sprite.updateDisplayObject(e, t), 
            e;
        },
        getNearestPointsLocal: function(e) {
            return [ this.sprite.getNearestPoint(e) ];
        },
        equ: function() {
            return Vn.methodNotSupported(this, {
                fileName: "SpriteFrameElement.hx",
                lineNumber: 58,
                className: "nanofl.engine.elements.SpriteFrameElement",
                methodName: "equ"
            });
        },
        toString: function() {
            return "SpriteFrameElement(" + this.sprite.namePath + ":" + this.index + ")";
        },
        __class__: rn
    });
    var sn = function(e, t, n, r, i, s, a) {
        Kt.call(this), this.name = e, this.width = t, this.height = n, this.selectable = r, 
        this.border = i, this.textRuns = s, this.newTextFormat = a;
    };
    s["nanofl.engine.elements.TextElement"] = sn, sn.__name__ = [ "nanofl", "engine", "elements", "TextElement" ], 
    sn.__super__ = Kt, sn.prototype = n(Kt.prototype, {
        name: null,
        width: null,
        height: null,
        selectable: null,
        border: null,
        textRuns: null,
        newTextFormat: null,
        loadProperties: function(e, t) {
            if (!Kt.prototype.loadProperties.call(this, e, t)) return !1;
            this.name = U.getAttr(e, "name", ""), this.width = U.getAttr(e, "width", 0), this.height = U.getAttr(e, "height", 0), 
            this.selectable = U.getAttr(e, "selectable", !1), this.border = U.getAttr(e, "border", !1), 
            this.textRuns = [];
            for (var n = 0, r = e.children; n < r.length; ) {
                var i = r[n];
                ++n, "text-run" == i.name && this.textRuns.push(gt.create(rr.htmlUnescape(U.getAttr(i, "characters")), U.getAttr(i, "fillColor", "#000000"), U.getAttr(i, "family", "Times"), U.getAttr(i, "style", ""), U.getAttr(i, "size", 12), U.getAttr(i, "align", "left"), U.getAttr(i, "strokeSize", 0), U.getAttr(i, "strokeColor", "#000000"), U.getAttr(i, "kerning", !0), U.getAttr(i, "letterSpacing", 0), U.getAttr(i, "lineSpacing", 2)));
            }
            return !0;
        },
        save: function(e) {
            e.begin("text"), e.attr("name", this.name, ""), this.saveProperties(e), e.attr("width", this.width), 
            e.attr("height", this.height), e.attr("selectable", this.selectable, !1), e.attr("border", this.border, !1);
            for (var t = 0, n = this.textRuns; t < n.length; ) {
                var r = n[t];
                ++t, e.begin("text-run"), e.attr("characters", rr.htmlEscape(r.characters, '"\r\n')), 
                e.attr("fillColor", r.fillColor), e.attr("align", r.align, "left"), e.attr("size", r.size), 
                e.attr("style", r.style, ""), e.attr("family", r.family, "Times"), e.attr("strokeSize", r.strokeSize, 0), 
                e.attr("strokeColor", r.strokeColor, "#000000"), e.attr("kerning", r.kerning, !0), 
                e.attr("letterSpacing", r.letterSpacing, 0), e.attr("lineSpacing", r.lineSpacing, 2), 
                e.end();
            }
            e.end();
        },
        getText: function() {
            return this.textRuns.map(function(e) {
                return e.characters;
            }).join("");
        },
        createDisplayObject: function() {
            var e = new ft();
            return this.updateDisplayObject(e, null), "" != this.name && (e.name = this.name), 
            e;
        },
        updateDisplayObject: function(e) {
            Vn.assert(K.__instanceof(e, ft), null, {
                fileName: "TextElement.hx",
                lineNumber: 121,
                className: "nanofl.engine.elements.TextElement",
                methodName: "updateDisplayObject"
            }), this.updateDisplayObjectProperties(e);
            var t = e;
            return t.width = this.width, t.height = this.height, t.selectable = this.selectable, 
            t.border = this.border, t.textRuns = mt.clone(this.textRuns), t.newTextFormat = this.newTextFormat, 
            t.setBounds(.5, .5, this.width, this.height), t;
        },
        getMinSize: function(e) {
            return Vn.assert(K.__instanceof(e, ft), null, {
                fileName: "TextElement.hx",
                lineNumber: 145,
                className: "nanofl.engine.elements.TextElement",
                methodName: "getMinSize"
            }), {
                width: e.minWidth,
                height: e.minHeight
            };
        },
        getNearestPointsLocal: function(e) {
            var t = {
                minX: 0,
                minY: 0,
                maxX: this.width,
                maxY: this.height
            };
            return [ pn.getNearestPoint(t, e) ];
        },
        equ: function(e) {
            return Kt.prototype.equ.call(this, e) ? e.name != this.name ? !1 : e.width != this.width ? !1 : e.height != this.height ? !1 : e.selectable != this.selectable ? !1 : e.border != this.border ? !1 : mt.equ(e.textRuns, this.textRuns) ? !0 : !1 : !1;
        },
        clone: function() {
            var e = new sn(this.name, this.width, this.height, this.selectable, this.border, mt.clone(this.textRuns), null != this.newTextFormat ? this.newTextFormat.clone() : null);
            return this.copyBaseProperties(e), e;
        },
        __class__: sn
    });
    var an = function() {};
    s["nanofl.engine.fills.BaseFill"] = an, an.__name__ = [ "nanofl", "engine", "fills", "BaseFill" ], 
    an.prototype = {
        setLibrary: function() {},
        __class__: an
    };
    var ln = function() {};
    s["nanofl.engine.fills.IFill"] = ln, ln.__name__ = [ "nanofl", "engine", "fills", "IFill" ], 
    ln.prototype = {
        begin: null,
        clone: null,
        equ: null,
        applyAlpha: null,
        getTransformed: null,
        getTyped: null,
        save: null,
        swapInstance: null,
        setLibrary: null,
        toString: null,
        __class__: ln
    };
    var on = function(e, t, n) {
        this.bitmapPath = e, this.repeat = t, this.matrix = n;
    };
    s["nanofl.engine.fills.BitmapFill"] = on, on.__name__ = [ "nanofl", "engine", "fills", "BitmapFill" ], 
    on.__interfaces__ = [ ln ], on.load = function(e) {
        return new on(U.getAttr(e, "bitmapPath"), U.getAttr(e, "repeat", "repeat"), bn.load(e));
    }, on.__super__ = an, on.prototype = n(an.prototype, {
        library: null,
        bitmapPath: null,
        repeat: null,
        matrix: null,
        save: function(e) {
            e.begin("fill").attr("type", "bitmap"), e.attr("bitmapPath", this.bitmapPath), e.attr("repeat", this.repeat, "repeat"), 
            this.matrix.save(e), e.end();
        },
        clone: function() {
            var e = new on(this.bitmapPath, this.repeat, this.matrix.clone());
            return e.library = this.library, e;
        },
        applyAlpha: function() {},
        getTyped: function() {
            return mn.BITMAP(this);
        },
        begin: function(e) {
            if (this.library.hasItem(this.bitmapPath)) {
                var t;
                t = K.__cast(this.library.getItem(this.bitmapPath), kn).image, e.beginBitmapFill(t, this.repeat, this.matrix.toMatrix2D());
            } else e.beginFill("rgba(0,0,0,0)");
        },
        getBitmapWidth: function() {
            var e = this.library.getItem(this.bitmapPath);
            return null != e && K.__instanceof(e, kn) ? e.image.width : 1;
        },
        equ: function(e) {
            if (e == this) return !0;
            if (K.__instanceof(e, on)) {
                var t = e;
                return t.bitmapPath == this.bitmapPath && t.matrix.equ(this.matrix) && t.repeat == this.repeat;
            }
            return !1;
        },
        swapInstance: function(e, t) {
            this.bitmapPath == e && (this.bitmapPath = t);
        },
        setLibrary: function(e) {
            this.library = e;
        },
        getTransformed: function(e) {
            var t = this.clone();
            return t.matrix.prependMatrix(e), t;
        },
        toString: function() {
            return 'new BitmapFill("red")';
        },
        __class__: on
    });
    var un = function() {};
    s["nanofl.engine.fills.EraseFill"] = un, un.__name__ = [ "nanofl", "engine", "fills", "EraseFill" ], 
    un.__interfaces__ = [ ln ], un.__super__ = an, un.prototype = n(an.prototype, {
        save: function() {
            Vn.methodNotSupported(this, {
                fileName: "EraseFill.hx",
                lineNumber: 12,
                className: "nanofl.engine.fills.EraseFill",
                methodName: "save"
            });
        },
        clone: function() {
            return new un();
        },
        applyAlpha: function() {
            Vn.methodNotSupported(this, {
                fileName: "EraseFill.hx",
                lineNumber: 14,
                className: "nanofl.engine.fills.EraseFill",
                methodName: "applyAlpha"
            });
        },
        getTyped: function() {
            return Vn.methodNotSupported(this, {
                fileName: "EraseFill.hx",
                lineNumber: 15,
                className: "nanofl.engine.fills.EraseFill",
                methodName: "getTyped"
            });
        },
        begin: function() {
            Vn.methodNotSupported(this, {
                fileName: "EraseFill.hx",
                lineNumber: 16,
                className: "nanofl.engine.fills.EraseFill",
                methodName: "begin"
            });
        },
        equ: function(e) {
            return K.__instanceof(e, un);
        },
        swapInstance: function() {
            Vn.methodNotSupported(this, {
                fileName: "EraseFill.hx",
                lineNumber: 18,
                className: "nanofl.engine.fills.EraseFill",
                methodName: "swapInstance"
            });
        },
        getTransformed: function() {
            return this.clone();
        },
        toString: function() {
            return "new EraseFill";
        },
        __class__: un
    });
    var hn = function(e, t, n, r, i, s) {
        this.colors = e, this.ratios = t, this.x0 = n, this.y0 = r, this.x1 = i, this.y1 = s;
    };
    s["nanofl.engine.fills.LinearFill"] = hn, hn.__name__ = [ "nanofl", "engine", "fills", "LinearFill" ], 
    hn.__interfaces__ = [ ln ], hn.load = function(e, t) {
        return Ut.handle(t, function() {
            var t, n = new O();
            return null != vr["1.0.0"] ? n.setReserved("1.0.0", function() {
                var t = bn.load(e), n = t.transformPoint(-1, 0), r = t.transformPoint(1, 0);
                return new hn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), U.getAttr(e, "x0", n.x), U.getAttr(e, "y0", n.y), U.getAttr(e, "x1", r.x), U.getAttr(e, "y1", r.y));
            }) : n.h["1.0.0"] = function() {
                var t = bn.load(e), n = t.transformPoint(-1, 0), r = t.transformPoint(1, 0);
                return new hn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), U.getAttr(e, "x0", n.x), U.getAttr(e, "y0", n.y), U.getAttr(e, "x1", r.x), U.getAttr(e, "y1", r.y));
            }, null != vr["2.0.0"] ? n.setReserved("2.0.0", function() {
                return new hn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), U.getAttr(e, "x0", 0), U.getAttr(e, "y0", 0), U.getAttr(e, "x1", 0), U.getAttr(e, "y1", 0));
            }) : n.h["2.0.0"] = function() {
                return new hn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), U.getAttr(e, "x0", 0), U.getAttr(e, "y0", 0), U.getAttr(e, "x1", 0), U.getAttr(e, "y1", 0));
            }, t = n;
        }(this));
    }, hn.__super__ = an, hn.prototype = n(an.prototype, {
        colors: null,
        ratios: null,
        x0: null,
        y0: null,
        x1: null,
        y1: null,
        save: function(e) {
            e.begin("fill").attr("type", "linear"), e.attr("colors", this.colors), e.attr("ratios", this.ratios), 
            e.attr("x0", this.x0), e.attr("y0", this.y0), e.attr("x1", this.x1), e.attr("y1", this.y1), 
            e.end();
        },
        clone: function() {
            return new hn(this.colors.slice(), this.ratios.slice(), this.x0, this.y0, this.x1, this.y1);
        },
        applyAlpha: function(e) {
            for (var t = 0, n = this.colors.length; n > t; ) {
                var r = t++, i = dt.parse(this.colors[r]);
                i.a *= e, this.colors[r] = dt.rgbaToString(i);
            }
        },
        getTyped: function() {
            return mn.LINEAR(this);
        },
        begin: function(e) {
            e.beginLinearGradientFill(this.colors, this.ratios, this.x0, this.y0, this.x1, this.y1);
        },
        equ: function(e) {
            if (e == this) return !0;
            if (K.__instanceof(e, hn)) {
                var t = e;
                return this.arrEqu(t.colors, this.colors) && this.arrEqu(t.ratios, this.ratios) && t.x0 == this.x0 && t.y0 == this.y0 && t.x1 == this.x1 && t.y1 == this.y1;
            }
            return !1;
        },
        arrEqu: function(e, t) {
            if (e.length != t.length) return !1;
            for (var n = 0, r = e.length; r > n; ) {
                var i = n++;
                if (e[i] != t[i]) return !1;
            }
            return !0;
        },
        swapInstance: function() {},
        getTransformed: function(e) {
            var t = this.clone(), n = e.transformPoint(this.x0, this.y0);
            t.x0 = n.x, t.y0 = n.y;
            var r = e.transformPoint(this.x1, this.y1);
            return t.x1 = r.x, t.y1 = r.y, t;
        },
        toString: function() {
            return "new LinearFill(" + y.string(this.colors.map(function(e) {
                return '"' + e + '"';
            })) + (", " + y.string(this.ratios) + ", " + this.x0 + ", " + this.y0 + ", " + this.x1 + ", " + this.y1 + ")");
        },
        __class__: hn
    });
    var cn = function(e, t, n, r, i, s, a) {
        this.colors = e, this.ratios = t, this.cx = n, this.cy = r, this.r = i, this.fx = s, 
        this.fy = a;
    };
    s["nanofl.engine.fills.RadialFill"] = cn, cn.__name__ = [ "nanofl", "engine", "fills", "RadialFill" ], 
    cn.__interfaces__ = [ ln ], cn.load = function(e, t) {
        return Ut.handle(t, function() {
            var t, n = new O();
            return null != vr["1.0.0"] ? n.setReserved("1.0.0", function() {
                var t = bn.load(e), n = t.decompose();
                return new cn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), n.x, n.y, (n.scaleX + n.scaleY) / 2, n.x, n.y);
            }) : n.h["1.0.0"] = function() {
                var t = bn.load(e), n = t.decompose();
                return new cn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), n.x, n.y, (n.scaleX + n.scaleY) / 2, n.x, n.y);
            }, null != vr["2.0.0"] ? n.setReserved("2.0.0", function() {
                var t = U.getAttr(e, "cx", 0), n = U.getAttr(e, "cy", 0);
                return new cn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), t, n, U.getAttr(e, "r", 0), U.getAttr(e, "fx", t), U.getAttr(e, "fy", n));
            }) : n.h["2.0.0"] = function() {
                var t = U.getAttr(e, "cx", 0), n = U.getAttr(e, "cy", 0);
                return new cn(U.getAttr(e, "colors", []), U.getAttr(e, "ratios", [ 0 ]), t, n, U.getAttr(e, "r", 0), U.getAttr(e, "fx", t), U.getAttr(e, "fy", n));
            }, t = n;
        }(this));
    }, cn.__super__ = an, cn.prototype = n(an.prototype, {
        colors: null,
        ratios: null,
        cx: null,
        cy: null,
        r: null,
        fx: null,
        fy: null,
        save: function(e) {
            e.begin("fill").attr("type", "radial"), e.attr("colors", this.colors), e.attr("ratios", this.ratios), 
            e.attr("cx", this.cx), e.attr("cy", this.cy), e.attr("r", this.r), e.attr("fx", this.fx, this.cx), 
            e.attr("fy", this.fy, this.cy), e.end();
        },
        clone: function() {
            return new cn(this.colors.slice(), this.ratios.slice(), this.cx, this.cy, this.r, this.fx, this.fy);
        },
        applyAlpha: function(e) {
            for (var t = 0, n = this.colors.length; n > t; ) {
                var r = t++, i = dt.parse(this.colors[r]);
                i.a *= e, this.colors[r] = dt.rgbaToString(i);
            }
        },
        getTyped: function() {
            return mn.RADIAL(this);
        },
        begin: function(e) {
            e.beginRadialGradientFill(this.colors, this.ratios, this.fx, this.fy, 0, this.cx, this.cy, this.r);
        },
        equ: function(e) {
            if (e == this) return !0;
            if (K.__instanceof(e, cn)) {
                var t = e;
                return this.arrEqu(t.colors, this.colors) && this.arrEqu(t.ratios, this.ratios) && t.cx == this.cx && t.cy == this.cy && t.r == this.r && t.fx == this.fx && t.fy == this.fy;
            }
            return !1;
        },
        arrEqu: function(e, t) {
            if (e.length != t.length) return !1;
            for (var n = 0, r = e.length; r > n; ) {
                var i = n++;
                if (e[i] != t[i]) return !1;
            }
            return !0;
        },
        swapInstance: function() {},
        getTransformed: function(e) {
            var t = this.clone(), n = e.transformPoint(this.cx, this.cy);
            t.cx = n.x, t.cy = n.y;
            var r = e.transformPoint(this.fx, this.fy);
            return t.fx = r.x, t.fy = r.y, t.r *= e.getAverageScale(), t;
        },
        toString: function() {
            return "new RadialFill(" + y.string(this.colors) + ", " + y.string(this.ratios) + ", " + this.cx + ", " + this.cy + ", " + this.r + ", " + this.fx + ", " + this.fy + ")";
        },
        __class__: cn
    });
    var fn = function(e) {
        null == fn.pattern && (fn.pattern = new createjs.Shape(), fn.pattern.graphics.beginFill("rgba(0,0,0,0.75)").rect(0, 0, 1, 1).rect(2, 2, 1, 1).endFill().beginFill("rgba(255,255,255,0.75)").rect(2, 0, 1, 1).rect(0, 2, 1, 1).endFill(), 
        fn.pattern.cache(0, 0, 4, 4)), this.scale = e;
    };
    s["nanofl.engine.fills.SelectionFill"] = fn, fn.__name__ = [ "nanofl", "engine", "fills", "SelectionFill" ], 
    fn.__interfaces__ = [ ln ], fn.__super__ = an, fn.prototype = n(an.prototype, {
        scale: null,
        save: function() {
            throw new J("Unsupported.");
        },
        clone: function() {
            throw new J("Unsupported.");
        },
        applyAlpha: function() {},
        getTransformed: function() {
            return this;
        },
        getTyped: function() {
            throw new J("Unsupported.");
        },
        begin: function(e) {
            e.beginBitmapFill(fn.pattern.cacheCanvas, "repeat", new createjs.Matrix2D(this.scale, 0, 0, this.scale));
        },
        equ: function() {
            throw new J("Unsupported.");
        },
        swapInstance: function() {},
        toString: function() {
            return "new SelectionFill()";
        },
        __class__: fn
    });
    var gn = function(e) {
        this.color = e;
    };
    s["nanofl.engine.fills.SolidFill"] = gn, gn.__name__ = [ "nanofl", "engine", "fills", "SolidFill" ], 
    gn.__interfaces__ = [ ln ], gn.load = function(e) {
        return new gn(U.getAttr(e, "color", "#000000"));
    }, gn.__super__ = an, gn.prototype = n(an.prototype, {
        color: null,
        save: function(e) {
            e.begin("fill").attr("type", "solid"), e.attr("color", this.color), e.end();
        },
        clone: function() {
            return new gn(this.color);
        },
        applyAlpha: function(e) {
            var t = dt.parse(this.color);
            t.a *= e, this.color = dt.rgbaToString(t);
        },
        getTransformed: function() {
            return this;
        },
        getTyped: function() {
            return mn.SOLID(this);
        },
        begin: function(e) {
            e.beginFill(this.color);
        },
        equ: function(e) {
            if (e == this) return !0;
            if (K.__instanceof(e, gn)) {
                var t = e;
                return t.color == this.color;
            }
            return !1;
        },
        swapInstance: function() {},
        toString: function() {
            return 'new SolidFill("' + this.color + '")';
        },
        __class__: gn
    });
    var mn = s["nanofl.engine.fills.TypedFill"] = {
        __ename__: [ "nanofl", "engine", "fills", "TypedFill" ],
        __constructs__: [ "SOLID", "LINEAR", "RADIAL", "BITMAP" ]
    };
    mn.SOLID = function(e) {
        var t = [ "SOLID", 0, e ];
        return t.__enum__ = mn, t.toString = a, t;
    }, mn.LINEAR = function(e) {
        var t = [ "LINEAR", 1, e ];
        return t.__enum__ = mn, t.toString = a, t;
    }, mn.RADIAL = function(e) {
        var t = [ "RADIAL", 2, e ];
        return t.__enum__ = mn, t.toString = a, t;
    }, mn.BITMAP = function(e) {
        var t = [ "BITMAP", 3, e ];
        return t.__enum__ = mn, t.toString = a, t;
    };
    var dn = function(e, t, n, r, i, s) {
        this.p1 = {
            x: e,
            y: t
        }, this.p2 = {
            x: n,
            y: r
        }, this.p3 = {
            x: i,
            y: s
        };
    };
    s["nanofl.engine.geom.BezierCurve"] = dn, dn.__name__ = [ "nanofl", "engine", "geom", "BezierCurve" ], 
    dn.isTrianglesIntersect = function(e, t) {
        for (var n = new vn(e.getTriangle()), r = new vn(t.getTriangle()), i = 0, s = n.edges; i < s.length; ) {
            var a = s[i];
            ++i;
            for (var l = 0, o = r.edges; l < o.length; ) {
                var u = o[l];
                if (++l, null != a.asStraightLine().getIntersection_straightSection(u.asStraightLine())) return !0;
            }
        }
        return !n.hasPoint(t.p1.x, t.p1.y) && n.isPointInside(t.p1.x, t.p1.y) || !n.hasPoint(t.p2.x, t.p2.y) && n.isPointInside(t.p2.x, t.p2.y) || !n.hasPoint(t.p3.x, t.p3.y) && n.isPointInside(t.p3.x, t.p3.y) || !r.hasPoint(e.p1.x, e.p1.y) && r.isPointInside(e.p1.x, e.p1.y) || !r.hasPoint(e.p2.x, e.p2.y) && r.isPointInside(e.p2.x, e.p2.y) || !r.hasPoint(e.p3.x, e.p3.y) && r.isPointInside(e.p3.x, e.p3.y) ? !0 : !1;
    }, dn.getIntersection_bezierCurve_inner = function(e, t) {
        if (e.equ(t)) return null;
        var n = dn.getIntersection_bezierCurve_getT(0, 1, e, 0, 1, t, 0);
        if (null == n) return null;
        if (Vn.assert(n.a.length == n.b.length, "I.a.length=" + n.a.length + " != I.b.length=" + n.b.length, {
            fileName: "BezierCurve.hx",
            lineNumber: 434,
            className: "nanofl.engine.geom.BezierCurve",
            methodName: "getIntersection_bezierCurve_inner"
        }), n.a.length > 4) return dn.log("I.a.length = " + n.a.length + " ON:\ngetIntersection_bezierCurve_inner(" + y.string(e) + ", " + y.string(t) + ")", {
            fileName: "BezierCurve.hx",
            lineNumber: 438,
            className: "nanofl.engine.geom.BezierCurve",
            methodName: "getIntersection_bezierCurve_inner"
        }), null;
        if (0 == n.a.length) return null;
        for (var r, i = [], s = 0, a = n.a.length; a > s; ) {
            var l = s++;
            i.push(l);
        }
        r = i, dn.parallelSort(n.a, r), dn.parallelSort(n.b, r, !0);
        for (var o = {
            a: e.split(n.a),
            b: t.split(n.b)
        }, u = 0, h = o.a.length - 1; h > u; ) {
            var c = u++;
            o.a[c].p3.x = o.a[c + 1].p1.x = o.b[r[c]].p3.x, o.a[c].p3.y = o.a[c + 1].p1.y = o.b[r[c]].p3.y;
        }
        return dn.excludeDegenerated(o.a), dn.excludeDegenerated(o.b), o;
    }, dn.excludeDegenerated = function(e) {
        for (var t = 0; t < e.length; ) e[t].isDegenerated() ? e.splice(t, 1) : t++;
        return e;
    }, dn.getIntersection_bezierCurve_getT = function(e, t, n, r, i, s, a) {
        if (a++, !pn.isIntersect(n.getBounds(), s.getBounds())) return null;
        if (!dn.isTrianglesIntersect(n, s)) return null;
        var l = n.isTiny(), o = s.isTiny(), u = null, h = null, c = null, f = null;
        if (l || o) if (!l && o) {
            var g = n.split([ .5 ]);
            u = dn.getIntersection_bezierCurve_getT(e, (e + t) / 2, g[0], r, i, s, a), h = dn.getIntersection_bezierCurve_getT((e + t) / 2, t, g[1], r, i, s, a);
        } else {
            if (!l || o) {
                var m = new Sn(n.p1.x, n.p1.y, n.p3.x, n.p3.y), d = new Sn(s.p1.x, s.p1.y, s.p3.x, s.p3.y);
                return null != m.getIntersection_straightSection(d) ? {
                    a: [ (e + t) / 2 ],
                    b: [ (r + i) / 2 ]
                } : null;
            }
            var p = s.split([ .5 ]);
            u = dn.getIntersection_bezierCurve_getT(e, t, n, r, (r + i) / 2, p[0], a), h = dn.getIntersection_bezierCurve_getT(e, t, n, (r + i) / 2, i, p[1], a);
        } else {
            var v = n.split([ .5 ]), y = s.split([ .5 ]);
            u = dn.getIntersection_bezierCurve_getT(e, (e + t) / 2, v[0], r, (r + i) / 2, y[0], a), 
            h = dn.getIntersection_bezierCurve_getT(e, (e + t) / 2, v[0], (r + i) / 2, i, y[1], a), 
            c = dn.getIntersection_bezierCurve_getT((e + t) / 2, t, v[1], r, (r + i) / 2, y[0], a), 
            f = dn.getIntersection_bezierCurve_getT((e + t) / 2, t, v[1], (r + i) / 2, i, y[1], a);
        }
        if (null == u && null == h && null == c && null == f) return null;
        var _ = {
            a: [],
            b: []
        };
        if (null != u) {
            for (var x = 0, A = u.a; x < A.length; ) {
                var b = A[x];
                ++x, _.a.push(b);
            }
            for (var w = 0, N = u.b; w < N.length; ) {
                var E = N[w];
                ++w, _.b.push(E);
            }
        }
        if (null != h) {
            for (var S = 0, C = h.a; S < C.length; ) {
                var P = C[S];
                ++S, _.a.push(P);
            }
            for (var I = 0, T = h.b; I < T.length; ) {
                var k = T[I];
                ++I, _.b.push(k);
            }
        }
        if (null != c) {
            for (var M = 0, R = c.a; M < R.length; ) {
                var F = R[M];
                ++M, _.a.push(F);
            }
            for (var O = 0, B = c.b; O < B.length; ) {
                var j = B[O];
                ++O, _.b.push(j);
            }
        }
        if (null != f) {
            for (var D = 0, L = f.a; D < L.length; ) {
                var z = L[D];
                ++D, _.a.push(z);
            }
            for (var H = 0, q = f.b; H < q.length; ) {
                var X = q[H];
                ++H, _.b.push(X);
            }
        }
        return Vn.assert(_.a.length == _.b.length, null, {
            fileName: "BezierCurve.hx",
            lineNumber: 587,
            className: "nanofl.engine.geom.BezierCurve",
            methodName: "getIntersection_bezierCurve_getT"
        }), _;
    }, dn.parallelSort = function(e, t, n) {
        null == n && (n = !1);
        for (var r = 0, i = e.length - 1; i > r; ) for (var s = (r++, 0), a = e.length - 1; a > s; ) {
            var l = s++;
            if (e[l] > e[l + 1]) {
                var u = e[l];
                if (e[l] = e[l + 1], e[l + 1] = u, n) {
                    var h = o.indexOf(t, l, 0), c = o.indexOf(t, l + 1, 0);
                    t[h] = l + 1, t[c] = l;
                } else {
                    var f = t[l];
                    t[l] = t[l + 1], t[l + 1] = f;
                }
            }
        }
    }, dn.log = function() {}, dn.prototype = {
        p1: null,
        p2: null,
        p3: null,
        getNearestPoint: function(e, t) {
            var n = this.p2.x - this.p1.x, r = this.p2.y - this.p1.y, i = this.p1.x - 2 * this.p2.x + this.p3.x, s = this.p1.y - 2 * this.p2.y + this.p3.y, a = this.p1.x - e, l = this.p1.y - t, o = An.solveCube(i * i + s * s, 3 * (n * i + r * s), 2 * (n * n + r * r) + a * i + l * s, a * n + l * r), u = wn.getSqrDist(e, t, this.p1.x, this.p1.y), h = wn.getSqrDist(e, t, this.p3.x, this.p3.y);
            if (o.length > 0) {
                for (var c = null, f = 1e100, g = null, m = 0; m < o.length; ) {
                    var d = o[m];
                    if (++m, d >= 0 && 1 >= d) {
                        var p = this.getPoint(d), v = wn.getSqrDist(e, t, p.x, p.y);
                        f > v && (c = d, f = v, g = p);
                    }
                }
                if (null != c && u > f && h > f) {
                    var y = {
                        x: r + c * s,
                        y: -(n + c * i)
                    };
                    wn.normalize(y);
                    var _ = Math.sqrt(f), x = _;
                    return (e - g.x) * y.x + (t - g.y) * y.y < 0 && (y.x *= -1, y.y *= -1, x *= -1), 
                    {
                        t: c,
                        point: g,
                        nor: y,
                        dist: _,
                        orientedDist: x
                    };
                }
            }
            if (h > u) {
                var A = Math.sqrt(u);
                return {
                    t: 0,
                    point: wn.clone(this.p1),
                    nor: wn.normalize({
                        x: e - this.p1.x,
                        y: t - this.p1.y
                    }),
                    dist: A,
                    orientedDist: A
                };
            }
            var b = Math.sqrt(h);
            return {
                t: 1,
                point: wn.clone(this.p3),
                nor: wn.normalize({
                    x: e - this.p3.x,
                    y: t - this.p3.y
                }),
                dist: b,
                orientedDist: b
            };
        },
        getNearestPointP: function(e) {
            return this.getNearestPoint(e.x, e.y);
        },
        getPoint: function(e) {
            if (0 == e) return wn.clone(this.p1);
            if (1 == e) return wn.clone(this.p3);
            var t = 1 - e, n = t * t, r = 2 * e * t, i = e * e;
            return {
                x: n * this.p1.x + r * this.p2.x + i * this.p3.x,
                y: n * this.p1.y + r * this.p2.y + i * this.p3.y
            };
        },
        getPointX: function(e) {
            if (0 == e) return this.p1.x;
            if (1 == e) return this.p3.x;
            var t = 1 - e, n = t * t, r = 2 * e * t, i = e * e;
            return n * this.p1.x + r * this.p2.x + i * this.p3.x;
        },
        getNor: function(e) {
            var t = this.p2.x - this.p1.x, n = this.p2.y - this.p1.y, r = this.p1.x - 2 * this.p2.x + this.p3.x, i = this.p1.y - 2 * this.p2.y + this.p3.y, s = {
                x: n + e * i,
                y: -(t + e * r)
            };
            return wn.normalize(s), s;
        },
        getBounds: function() {
            var e = {
                minX: Math.min(this.p1.x, Math.min(this.p2.x, this.p3.x)),
                maxX: Math.max(this.p1.x, Math.max(this.p2.x, this.p3.x)),
                minY: Math.min(this.p1.y, Math.min(this.p2.y, this.p3.y)),
                maxY: Math.max(this.p1.y, Math.max(this.p2.y, this.p3.y))
            }, t = this.p2.x - this.p1.x, n = this.p2.y - this.p1.y, r = this.p1.x - 2 * this.p2.x + this.p3.x, i = this.p1.y - 2 * this.p2.y + this.p3.y;
            if (Math.abs(r) > 1e-10 && (e.minX == this.p2.x || e.maxX == this.p2.x)) {
                var s = -t / r;
                s = (1 - s) * (1 - s) * this.p1.x + 2 * s * (1 - s) * this.p2.x + s * s * this.p3.x, 
                e.minX == this.p2.x ? e.minX = s : e.maxX = s;
            }
            if (Math.abs(i) > 1e-10 && (e.minY == this.p2.y || e.maxY == this.p2.y)) {
                var a = -n / i;
                a = (1 - a) * (1 - a) * this.p1.y + 2 * a * (1 - a) * this.p2.y + a * a * this.p3.y, 
                e.minY == this.p2.y ? e.minY = a : e.maxY = a;
            }
            return e;
        },
        getIntersectionPointsX_rightRay: function(e, t) {
            var n = [];
            if (t >= Math.min(this.p1.y, Math.min(this.p2.y, this.p3.y)) && t <= Math.max(this.p1.y, Math.max(this.p2.y, this.p3.y)) && e <= Math.max(this.p1.x, Math.max(this.p2.x, this.p3.x))) {
                for (var r = this.p2.y - this.p1.y, i = this.p1.y - 2 * this.p2.y + this.p3.y, s = 0, a = 0, l = An.solveQuadratic(i, 2 * r, this.p1.y - t); a < l.length; ) {
                    var o = l[a];
                    if (++a, o > 0 && 1 > o) {
                        var u = this.getPointX(o);
                        u > e && n.push(u), s++;
                    }
                }
                if (1 == s && (this.p1.y < t && this.p3.y < t || this.p1.y > t && this.p3.y > t)) return [];
            }
            return n;
        },
        getIntersectionCount_rightRay: function(e, t) {
            return this.getIntersectionPointsX_rightRay(e, t).length;
        },
        getIntersections_horizontalStraightSection: function(e, t, n) {
            var r = [];
            if (t >= Math.min(this.p1.y, Math.min(this.p2.y, this.p3.y)) && t <= Math.max(this.p1.y, Math.max(this.p2.y, this.p3.y))) {
                for (var i = this.p2.y - this.p1.y, s = this.p1.y - 2 * this.p2.y + this.p3.y, a = An.solveQuadratic(s, 2 * i, this.p1.y - t), l = 0; l < a.length; ) {
                    var o = a[l];
                    if (++l, o >= 0 && 1 >= o) {
                        var u = (1 - o) * (1 - o) * this.p1.x + 2 * (1 - o) * o * this.p2.x + o * o * this.p3.x;
                        u > Math.min(e, n) && u < Math.max(e, n) && r.push({
                            t: o,
                            x: u,
                            y: t
                        });
                    }
                }
                if (2 == r.length && r[0].t > r[1].t) {
                    var h = r[0];
                    r[0] = r[1], r[1] = h;
                }
            }
            return r;
        },
        getIntersection_straightSection: function(e) {
            if (!pn.isIntersect(this.getBounds(), e.getBounds())) return null;
            var t = this.getIntersection_straightSection_getT(e);
            if (null == t) return null;
            if (1 == t.length) {
                var n = this.split(t), r = n[0].p3, i = [ new Sn(e.x1, e.y1, r.x, r.y), new Sn(r.x, r.y, e.x2, e.y2) ];
                return {
                    curves: dn.excludeDegenerated(n),
                    lines: dn.excludeDegenerated(i)
                };
            }
            if (2 == t.length) {
                var s = this.split(t), a = s[1].p1, l = s[1].p3;
                if (wn.getSqrDist(e.x1, e.y1, a.x, a.y) < wn.getSqrDist(e.x1, e.y1, l.x, l.y)) {
                    var o = [ new Sn(e.x1, e.y1, a.x, a.y), new Sn(a.x, a.y, l.x, l.y), new Sn(l.x, l.y, e.x2, e.y2) ];
                    return {
                        curves: dn.excludeDegenerated(s),
                        lines: dn.excludeDegenerated(o)
                    };
                }
                var u = [ new Sn(e.x1, e.y1, l.x, l.y), new Sn(l.x, l.y, a.x, a.y), new Sn(a.x, a.y, e.x2, e.y2) ];
                return {
                    curves: dn.excludeDegenerated(s),
                    lines: dn.excludeDegenerated(u)
                };
            }
            return null;
        },
        getIntersection_straightSection_getT: function(e) {
            if (!pn.isIntersect(this.getBounds(), e.getBounds())) return null;
            for (var t = e.x2 - e.x1, n = e.y2 - e.y1, r = Math.sqrt(t * t + n * n), i = Math.atan2(n, t), s = this.clone().translate(-e.x1, -e.y1).rotate(-i), a = s.getIntersections_horizontalStraightSection(0, 0, r), l = 0; l < a.length; ) {
                var o = a[l];
                ++l;
                var u = wn.rotate(o.x, o.y, i);
                o.x = u.x + e.x1, o.y = u.y + e.y1;
            }
            return 1 == a.length ? [ a[0].t ] : 2 == a.length ? [ a[0].t, a[1].t ] : null;
        },
        getIntersection_bezierCurve: function(e) {
            var t = dn.getIntersection_bezierCurve_inner(this, e);
            return t;
        },
        isDegenerated: function() {
            return wn.equ(this.p1, this.p2) && wn.equ(this.p2, this.p3);
        },
        getFirstPart: function(e) {
            var t = this.getPoint(e);
            return new dn(this.p1.x, this.p1.y, this.p1.x + e * (this.p2.x - this.p1.x), this.p1.y + e * (this.p2.y - this.p1.y), t.x, t.y);
        },
        getSecondPart: function(e) {
            var t = this.getPoint(e);
            return new dn(t.x, t.y, this.p2.x + e * (this.p3.x - this.p2.x), this.p2.y + e * (this.p3.y - this.p2.y), this.p3.x, this.p3.y);
        },
        getPart: function(e, t) {
            return this.getSecondPart(e).getFirstPart((t - e) / (1 - e));
        },
        split: function(e) {
            if (0 == e.length) return [ this.clone() ];
            if (1 == e.length) {
                var t = this.getPoint(e[0]);
                return [ new dn(this.p1.x, this.p1.y, this.p1.x + e[0] * (this.p2.x - this.p1.x), this.p1.y + e[0] * (this.p2.y - this.p1.y), t.x, t.y), new dn(t.x, t.y, this.p2.x + e[0] * (this.p3.x - this.p2.x), this.p2.y + e[0] * (this.p3.y - this.p2.y), this.p3.x, this.p3.y) ];
            }
            if (2 == e.length) {
                var n = this.split([ e[0] ]), r = [ n[0], n[1].getFirstPart((e[1] - e[0]) / (1 - e[0])), this.getSecondPart(e[1]) ];
                return Vn.assert(r[0].p3.x == r[1].p1.x && r[0].p3.y == r[1].p1.y, null, {
                    fileName: "BezierCurve.hx",
                    lineNumber: 632,
                    className: "nanofl.engine.geom.BezierCurve",
                    methodName: "split"
                }), r[1].p3.x = r[2].p1.x, r[1].p3.y = r[2].p1.y, Vn.assert(r[1].p3.x == r[2].p1.x && r[1].p3.y == r[2].p1.y, null, {
                    fileName: "BezierCurve.hx",
                    lineNumber: 635,
                    className: "nanofl.engine.geom.BezierCurve",
                    methodName: "split"
                }), r;
            }
            var i = [];
            i.push(this.getFirstPart(e[0]));
            for (var s = 0, a = e.length - 1; a > s; ) {
                var l = s++;
                i.push(this.getPart(e[l], e[l + 1]));
            }
            i.push(this.getSecondPart(e[e.length - 1]));
            for (var o = 0, u = e.length; u > o; ) {
                var h = o++;
                i[h].p3.x = i[h + 1].p1.x, i[h].p3.y = i[h + 1].p1.y;
            }
            return i;
        },
        translate: function(e, t) {
            return this.p1.x += e, this.p1.y += t, this.p2.x += e, this.p2.y += t, this.p3.x += e, 
            this.p3.y += t, this;
        },
        rotate: function(e) {
            return this.p1 = wn.getRotated(this.p1, e), this.p2 = wn.getRotated(this.p2, e), 
            this.p3 = wn.getRotated(this.p3, e), this;
        },
        clone: function() {
            return new dn(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
        },
        isTiny: function() {
            return Math.abs(this.p1.x - this.p2.x) < .01 && Math.abs(this.p1.y - this.p2.y) < .01 && Math.abs(this.p3.x - this.p2.x) < .01 && Math.abs(this.p3.y - this.p2.y) < .01;
        },
        equ: function(e) {
            return wn.equ(this.p2, e.p2) && (wn.equ(this.p1, e.p1) && wn.equ(this.p3, e.p3) || wn.equ(this.p1, e.p3) && wn.equ(this.p3, e.p1));
        },
        getReversed: function() {
            return new dn(this.p3.x, this.p3.y, this.p2.x, this.p2.y, this.p1.x, this.p1.y);
        },
        reverse: function() {
            this.p1;
            this.p1 = this.p3, this.p3 = this.p1;
        },
        getLength: function() {
            var e = this.p2.x - this.p1.x, t = this.p2.y - this.p1.y, n = this.p1.x - 2 * this.p2.x + this.p3.x, r = this.p1.y - 2 * this.p2.y + this.p3.y, i = 2 * e, s = 2 * t, a = 4 * (n * n + r * r), l = 4 * (n * i + r * s), o = i * i + s * s, u = 2 * Math.sqrt(a + l + o), h = Math.sqrt(a), c = 2 * a * h, f = 2 * Math.sqrt(o), g = l / h;
            return (c * u + h * l * (u - f) + (4 * o * a - l * l) * Math.log((2 * h + g + u) / (g + f))) / (4 * c);
        },
        getTangent: function(e) {
            var t = (this.p2.x - this.p1.x) * e + this.p1.x, n = (this.p2.y - this.p1.y) * e + this.p1.y, r = (this.p3.x - this.p2.x) * e + this.p2.x, i = (this.p3.y - this.p2.y) * e + this.p2.y;
            return Math.atan2(i - n, r - t);
        },
        getTriangle: function() {
            return [ new _n(this.p1.x, this.p1.y, this.p2.x, this.p2.y), new _n(this.p2.x, this.p2.y, this.p3.x, this.p3.y), new _n(this.p3.x, this.p3.y, this.p1.x, this.p1.y) ];
        },
        toString: function() {
            return "curve(" + this.p1.x + ", " + this.p1.y + ", " + this.p2.x + ", " + this.p2.y + ", " + this.p3.x + ", " + this.p3.y + ")";
        },
        getMonotoneT: function(e) {
            if (0 == e) return 0;
            if (1 == e) return 1;
            for (var t = .005, n = this.getLength() * e, r = .5, i = .5; ;) {
                var s = this.getFirstPart(r), a = s.getLength();
                if (Math.abs(n - a) < t) return r;
                i /= 2, a > n ? r -= i : r += i;
            }
        },
        __class__: dn
    };
    var pn = function() {};
    s["nanofl.engine.geom.BoundsTools"] = pn, pn.__name__ = [ "nanofl", "engine", "geom", "BoundsTools" ], 
    pn.extendR = function(e, t) {
        return e.minX = Math.min(e.minX, t.x), e.minY = Math.min(e.minY, t.y), e.maxX = Math.max(e.maxX, t.x + t.width), 
        e.maxY = Math.max(e.maxY, t.y + t.height), e;
    }, pn.extend = function(e, t) {
        return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), 
        e.maxY = Math.max(e.maxY, t.maxY), e;
    }, pn.isIntersect = function(e, t, n) {
        return null == n && (n = 0), null != e && null != t && e.maxX > t.minX - n && e.maxY > t.minY - n && t.maxX > e.minX - n && t.maxY > e.minY - n;
    }, pn.isPointInside = function(e, t, n, r) {
        return null == r && (r = 0), t > e.minX - r && n > e.minY - r && t < e.maxX + r && n < e.maxY + r;
    }, pn.isPointInsideP = function(e, t, n) {
        return null == n && (n = 0), pn.isPointInside(e, t.x, t.y, n);
    }, pn.getNearestPoint = function(e, t) {
        if (pn.isPointInsideP(e, t)) return wn.clone(t);
        var n = [ new Sn(e.minX, e.minY, e.maxX, e.minY).getNearestPoint(t.x, t.y).point, new Sn(e.maxX, e.minY, e.maxX, e.maxY).getNearestPoint(t.x, t.y).point, new Sn(e.maxX, e.maxY, e.minX, e.maxY).getNearestPoint(t.x, t.y).point, new Sn(e.minX, e.maxY, e.minX, e.minY).getNearestPoint(t.x, t.y).point ];
        return n.sort(function(e, n) {
            return f.compare(wn.getDist(t.x, t.y, e.x, e.y), wn.getDist(t.x, t.y, n.x, n.y));
        }), n[0];
    }, pn.clone = function(e) {
        return null == e ? null : {
            minX: e.minX,
            minY: e.minY,
            maxX: e.maxX,
            maxY: e.maxY
        };
    }, pn.toBounds = function(e) {
        return {
            minX: e.x,
            minY: e.y,
            maxX: e.x + e.width,
            maxY: e.y + e.height
        };
    }, pn.toString = function(e) {
        return null == e ? "null" : e.minX + "," + e.minY + ", " + e.maxX + ", " + e.maxY;
    }, pn.toRectangle = function(e) {
        return null == e ? null : new createjs.Rectangle(e.minX, e.minY, e.maxX - e.minX, e.maxY - e.minY);
    }, pn.transform = function(e, t) {
        if (null == e) return null;
        var n, r, i = e.width * t.a, s = e.width * t.b, a = e.height * t.c, l = e.height * t.d, o = t.tx + (e.x * t.a + e.y * t.c), u = t.ty + (e.x * t.b + e.y * t.d), h = o, c = u, f = o, g = u;
        return n = i + o, h > n ? h = n : n > f && (f = n), n = i + a + o, h > n ? h = n : n > f && (f = n), 
        n = a + o, h > n ? h = n : n > f && (f = n), r = s + u, c > r ? c = r : r > g && (g = r), 
        r = s + l + u, c > r ? c = r : r > g && (g = r), r = l + u, c > r ? c = r : r > g && (g = r), 
        e.x = h, e.y = c, e.width = f - h, e.height = g - c, e;
    };
    var vn = function(e) {
        this.edges = e;
    };
    s["nanofl.engine.geom.Contour"] = vn, vn.__name__ = [ "nanofl", "engine", "geom", "Contour" ], 
    vn.fromRectangle = function(e) {
        return new vn([ new _n(e.x, e.y, e.x + e.width, e.y), new _n(e.x + e.width, e.y, e.x + e.width, e.y + e.height), new _n(e.x + e.width, e.y + e.height, e.x, e.y + e.height), new _n(e.x, e.y + e.height, e.x, e.y) ]);
    }, vn.prototype = {
        edges: null,
        save: function(e) {
            e.begin("contour"), e.attr("edges", xn.save(this.edges)), e.end();
        },
        draw: function(e) {
            xn.draw(this.edges, e, !1);
        },
        translate: function(e, t) {
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                ++n, i.translate(e, t);
            }
        },
        transform: function(e) {
            for (var t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                ++t, r.transform(e);
            }
        },
        isPointInside: function(e, t) {
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                if (++n, Math.abs(i.y3 - t) < vn.EPS) return this.isPointInside(e, t + 2 * vn.EPS);
            }
            for (var s = 0, a = 0, l = this.edges; a < l.length; ) {
                var o = l[a];
                ++a;
                var u = o.getIntersectionCount_rightRay(e, t);
                s += u;
            }
            return s % 2 != 0;
        },
        isPointInsideP: function(e) {
            return this.isPointInside(e.x, e.y);
        },
        hasPoint: function(e, t) {
            for (var n = 0, r = this.edges; n < r.length; ) {
                var i = r[n];
                if (++n, i.x1 == e && i.y1 == t || i.x3 == e && i.y3 == t) return !0;
            }
            return !1;
        },
        hasEdge: function(e) {
            return e.indexIn(this.edges) >= 0;
        },
        isEdgeInside: function(e) {
            return (this.hasPoint(e.x1, e.y1) || this.isPointInside(e.x1, e.y1)) && (this.hasPoint(e.x3, e.y3) || this.isPointInside(e.x3, e.y3)) ? this.isPointInsideP(e.getMiddlePoint()) : !1;
        },
        isNestedTo: function(e) {
            Vn.assert(e != this, null, {
                fileName: "Contour.hx",
                lineNumber: 94,
                className: "nanofl.engine.geom.Contour",
                methodName: "isNestedTo"
            }), Vn.assert(this.edges[0].x1 == this.edges[this.edges.length - 1].x3, null, {
                fileName: "Contour.hx",
                lineNumber: 95,
                className: "nanofl.engine.geom.Contour",
                methodName: "isNestedTo"
            }), Vn.assert(this.edges[0].y1 == this.edges[this.edges.length - 1].y3, null, {
                fileName: "Contour.hx",
                lineNumber: 96,
                className: "nanofl.engine.geom.Contour",
                methodName: "isNestedTo"
            });
            for (var t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                if (++t, !e.hasPoint(r.x3, r.y3) && !e.isPointInside(r.x3, r.y3)) return !1;
            }
            for (var i = 0, s = this.edges; i < s.length; ) {
                var a = s[i];
                if (++i, a.indexIn(e.edges) >= 0) return !1;
                var l = a.getMiddlePoint();
                if (!e.isPointInside(l.x, l.y)) return !1;
            }
            return !0;
        },
        clone: function() {
            return new vn(mt.clone(this.edges));
        },
        isClockwise: function() {
            return this.getClockwiseProduct() >= -vn.EPS;
        },
        isCounterClockwise: function() {
            return this.getClockwiseProduct() <= vn.EPS;
        },
        getClockwiseProduct: function() {
            for (var e = 0, t = 0, n = this.edges; t < n.length; ) {
                var r = n[t];
                ++t, e += (r.x2 - r.x1) * (r.y2 + r.y1), e += (r.x3 - r.x2) * (r.y3 + r.y2);
            }
            return e;
        },
        normalize: function() {
            xn.roundPoints(this.edges), xn.removeDegenerated(this.edges, !0);
            for (var e = 0; e < this.edges.length; ) {
                var t = this.edges[e], n = this.edges[(e + 1) % this.edges.length];
                t.x1 == n.x3 && t.y1 == n.y3 && (t.isStraight() && n.isStraight() || t.x2 == n.x2 && t.y2 == n.y2) ? e + 1 < this.edges.length ? this.edges.splice(e, 2) : (this.edges.splice(e, 1), 
                this.edges.splice(0, 1), e--) : e++;
            }
        },
        reverse: function() {
            this.edges.reverse();
            for (var e = 0, t = this.edges.length; t > e; ) {
                var n = e++;
                this.edges[n] = this.edges[n].clone().reverse();
            }
            return this;
        },
        indexIn: function(e) {
            for (var t = this, n = 0, r = e.length; r > n; ) {
                var i = n++;
                if (e[i].edges.length == this.edges.length && u.foreach(e[i].edges, function(e) {
                    return e.indexIn(t.edges) >= 0;
                })) return i;
            }
            return -1;
        },
        equ: function(e) {
            return xn.equIgnoreOrder(this.edges, e.edges);
        },
        toString: function() {
            return "new Contour(" + y.string(this.edges) + ")";
        },
        assertCorrect: function() {},
        __class__: vn
    };
    var yn = function() {};
    s["nanofl.engine.geom.Contours"] = yn, yn.__name__ = [ "nanofl", "engine", "geom", "Contours" ], 
    yn.fromEdges = function(e) {
        yn.log(function() {
            return "Contours.find(1): edges = " + e.length;
        }, {
            fileName: "Contours.hx",
            lineNumber: 14,
            className: "nanofl.engine.geom.Contours",
            methodName: "fromEdges"
        }), Vn.assert(!xn.hasDegenerated(e), "Degenerated edges detected.", {
            fileName: "Contours.hx",
            lineNumber: 16,
            className: "nanofl.engine.geom.Contours",
            methodName: "fromEdges"
        }), Vn.assert(!xn.hasDuplicates(e), "Duplicated edges detected.", {
            fileName: "Contours.hx",
            lineNumber: 17,
            className: "nanofl.engine.geom.Contours",
            methodName: "fromEdges"
        }), e = e.slice(), yn.removeTailEdges(e), yn.log(function() {
            return "Contours.find(2): edges = " + e.length + "; " + y.string(e);
        }, {
            fileName: "Contours.hx",
            lineNumber: 23,
            className: "nanofl.engine.geom.Contours",
            methodName: "fromEdges"
        });
        for (var t = yn.getSequencesFromEdges(e), n = e.slice(), r = 0; r < e.length; ) {
            var i = e[r];
            ++r, n.push(i.clone().reverse());
        }
        var s, a, l = yn.getConnections(n);
        a = new Array(n.length), s = a;
        for (var o = [], u = 0; u < t.length; ) {
            var h = t[u];
            ++u, yn.find(h[0], n, l, s, o), yn.find(h[0].clone().reverse(), n, l, s, o), h.length > 1 && (yn.find(h[h.length - 1], n, l, s, o), 
            yn.find(h[h.length - 1].clone().reverse(), n, l, s, o));
        }
        yn.log(function() {
            return "Contours.find(3): r =\n" + o.join("\n");
        }, {
            fileName: "Contours.hx",
            lineNumber: 48,
            className: "nanofl.engine.geom.Contours",
            methodName: "fromEdges"
        });
        for (var c = 0; c < o.length; ) {
            var f = o[c];
            ++c, Vn.assert(f.isClockwise(), null, {
                fileName: "Contours.hx",
                lineNumber: 50,
                className: "nanofl.engine.geom.Contours",
                methodName: "fromEdges"
            });
        }
        return o;
    }, yn.fromVectors = function(e) {
        e = e.slice(), yn.removeTailEdges(e);
        var t, n, r = yn.getSequencesFromVectors(e), i = yn.getConnections(e);
        n = new Array(e.length), t = n;
        for (var s = [], a = 0; a < r.length; ) {
            var l = r[a];
            ++a, yn.find(l[0], e, i, t, s), l.length > 1 && yn.find(l[l.length - 1], e, i, t, s);
        }
        return s;
    }, yn.find = function(e, t, n, r, i) {
        var s = function(e) {
            return function(t) {
                return Jn.findIndex(e, t);
            };
        }(t)(function(t) {
            return t.equDirected(e);
        });
        if (r[s]) return void yn.log("exclude(1) " + s, {
            fileName: "Contours.hx",
            lineNumber: 87,
            className: "nanofl.engine.geom.Contours",
            methodName: "find"
        });
        var a = [ s ];
        yn.log(function() {
            return "!!!!!!!!!!! startIndex = " + s + "; start = " + y.string(e) + "; contours = " + i.length;
        }, {
            fileName: "Contours.hx",
            lineNumber: 93,
            className: "nanofl.engine.geom.Contours",
            methodName: "find"
        });
        for (var l = null; ;) {
            var u = [ yn.findNext(a[a.length - 1], t, n, r, l) ];
            if (null == u[0]) break;
            l = null, yn.log(function(e) {
                return function() {
                    return "	nextIndex = " + e[0] + "; next = " + y.string(t[e[0]]);
                };
            }(u), {
                fileName: "Contours.hx",
                lineNumber: 101,
                className: "nanofl.engine.geom.Contours",
                methodName: "find"
            }), Vn.assert(o.indexOf(a, u[0], 0) < 0, null, {
                fileName: "Contours.hx",
                lineNumber: 103,
                className: "nanofl.engine.geom.Contours",
                methodName: "find"
            });
            var h = [ t[u[0]] ];
            if (h[0].x3 == e.x1 && h[0].y3 == e.y1) {
                a.push(u[0]), yn.contourFound(a, t, r, i);
                break;
            }
            var c = [ function() {
                return function(e) {
                    return function() {
                        return function(t) {
                            return Jn.findIndex(e, t);
                        };
                    }();
                };
            }()(a)(function(e) {
                return function(n) {
                    return t[n].x1 == e[0].x3 && t[n].y1 == e[0].y3;
                };
            }(h)) ];
            c[0] >= 0 ? (Vn.assert(c[0] >= 1, null, {
                fileName: "Contours.hx",
                lineNumber: 118,
                className: "nanofl.engine.geom.Contours",
                methodName: "find"
            }), a.push(u[0]), l = a[c[0]], yn.contourFound(a.slice(c[0]), t, r, i), a = a.slice(0, c[0]), 
            yn.log(function(e) {
                return function() {
                    return "Found inner loop n = " + e[0] + "; lastBestVectorIndex = " + l;
                };
            }(c), {
                fileName: "Contours.hx",
                lineNumber: 123,
                className: "nanofl.engine.geom.Contours",
                methodName: "find"
            })) : a.push(u[0]);
        }
    }, yn.contourFound = function(e, t, n, r) {
        var i = new vn(e.map(function(e) {
            return t[e].clone();
        }));
        if (i.isClockwise() && !function(e) {
            return function(t) {
                return u.exists(e, t);
            };
        }(r)(function(e) {
            return e.equ(i);
        })) {
            r.push(i);
            for (var s = 0; s < e.length; ) {
                var a = e[s];
                ++s, n[a] = !0;
            }
        }
    }, yn.findNext = function(e, t, n, r, i) {
        var s = n[e];
        Vn.assert(s.length > 0, function() {
            return "nexts = " + y.string(s) + "; vectors = " + y.string(t);
        }, {
            fileName: "Contours.hx",
            lineNumber: 149,
            className: "nanofl.engine.geom.Contours",
            methodName: "findNext"
        });
        for (var a = t[e], l = a.getTangent(1) + Math.PI, u = 0; u < s.length; ) {
            var h = s[u];
            ++u;
            for (var c = t[h].getTangent(0); l >= c; ) c += 2 * Math.PI;
        }
        s.sort(function(e, n) {
            for (var r = t[e].getTangent(0); l >= r; ) r += 2 * Math.PI;
            for (var i = t[n].getTangent(0); l >= i; ) i += 2 * Math.PI;
            return f.compare(r - l, i - l);
        }), Vn.assert(null == i || o.indexOf(s, i, 0) >= 0, null, {
            fileName: "Contours.hx",
            lineNumber: 170,
            className: "nanofl.engine.geom.Contours",
            methodName: "findNext"
        });
        var g;
        for (g = null == i ? 0 : o.indexOf(s, i, 0) + 1; g < s.length && r[s[g]]; ) yn.log("exclude(2) " + s[g], {
            fileName: "Contours.hx",
            lineNumber: 175,
            className: "nanofl.engine.geom.Contours",
            methodName: "findNext"
        }), g++;
        return s[g];
    }, yn.mergeByCommonEdges = function(e, t) {
        for (var n = 0; n < e.length; ) {
            for (var r = n + 1; r < e.length; ) {
                Vn.assert(e[n].edges.length > 0, null, {
                    fileName: "Contours.hx",
                    lineNumber: 191,
                    className: "nanofl.engine.geom.Contours",
                    methodName: "mergeByCommonEdges"
                }), Vn.assert(e[r].edges.length > 0, null, {
                    fileName: "Contours.hx",
                    lineNumber: 192,
                    className: "nanofl.engine.geom.Contours",
                    methodName: "mergeByCommonEdges"
                });
                var i = xn.getCommon(e[n].edges, e[r].edges);
                if (i.length > 0) {
                    var s = xn.exclude(xn.concatUnique(e[n].edges, e[r].edges), i);
                    if (s.length > 0) {
                        var a = yn.fromEdges(s);
                        a.sort(function(e, t) {
                            return e.isNestedTo(t) ? 1 : -1;
                        }), e[n] = a[0], t && e[n].reverse();
                    } else Vn.assert(!1, "Two contours with same edges = " + y.string(e[n]), {
                        fileName: "Contours.hx",
                        lineNumber: 208,
                        className: "nanofl.engine.geom.Contours",
                        methodName: "mergeByCommonEdges"
                    });
                    e.splice(r, 1), n--;
                    break;
                }
                r++;
            }
            n++;
        }
    }, yn.removeNested = function(e) {
        for (var t = 0; t < e.length; ) {
            for (var n = 0; n < e.length; ) t != n && e[n].isNestedTo(e[t]) ? (e.splice(n, 1), 
            t > n && t--) : n++;
            t++;
        }
    }, yn.removeTailEdges = function(e) {
        for (xn.removeDublicates(e), xn.removeDegenerated(e, !0); ;) {
            for (var t = e.length, n = 0; n < e.length; ) {
                var r = e[n];
                1 == xn.getPointUseCount(e, r.x1, r.y1) || 1 == xn.getPointUseCount(e, r.x3, r.y3) ? e.splice(n, 1) : n++;
            }
            if (e.length == t) break;
        }
    }, yn.getEdges = function(e) {
        for (var t = [], n = 0; n < e.length; ) {
            var r = e[n];
            ++n, t = t.concat(r.edges);
        }
        return t;
    }, yn.getConnections = function(e) {
        for (var t = [], n = 0, r = e.length; r > n; ) {
            for (var i = n++, s = e[i], a = [], l = 0, o = e.length; o > l; ) {
                var u = l++;
                s.x3 != e[u].x1 || s.y3 != e[u].y1 || s.equ(e[u]) || a.push(u);
            }
            Vn.assert(a.length > 0, function() {
                return "edges = " + y.string(e.slice(0, e.length >> 1));
            }, {
                fileName: "Contours.hx",
                lineNumber: 300,
                className: "nanofl.engine.geom.Contours",
                methodName: "getConnections"
            }), t.push(a);
        }
        return t;
    }, yn.isPointUsed = function(e, t, n, r) {
        if (e[t[0]].x1 == n && e[t[0]].y1 == r) return !0;
        for (var i = 0; i < t.length; ) {
            var s = t[i];
            if (++i, e[s].x3 == n && e[s].y3 == r) return !0;
        }
        return !1;
    }, yn.getSequencesFromEdges = function(e) {
        var t = [];
        e = e.filter(function(e) {
            return !e.isDegenerated();
        });
        for (var n = e.slice(); n.length > 0; ) {
            for (var r = n.pop(), i = r.clone(), s = [ r ], a = 0; a < n.length; ) {
                var l = n[a];
                i.x3 == l.x1 && i.y3 == l.y1 && yn.isSimplePoint(e, l.x1, l.y1) ? (s.push(l), i.x3 = l.x3, 
                i.y3 = l.y3, n.splice(a, 1), a = 0) : i.x3 == l.x3 && i.y3 == l.y3 && yn.isSimplePoint(e, l.x3, l.y3) ? (s.push(l.clone().reverse()), 
                i.x3 = l.x1, i.y3 = l.y1, n.splice(a, 1), a = 0) : i.x1 == l.x1 && i.y1 == l.y1 && yn.isSimplePoint(e, l.x1, l.y1) ? (s.unshift(l.clone().reverse()), 
                i.x1 = l.x3, i.y1 = l.y3, n.splice(a, 1), a = 0) : i.x1 == l.x3 && i.y1 == l.y3 && yn.isSimplePoint(e, l.x3, l.y3) ? (s.unshift(l), 
                i.x1 = l.x1, i.y1 = l.y1, n.splice(a, 1), a = 0) : a++;
            }
            t.push(s);
        }
        return t;
    }, yn.getSequencesFromVectors = function(e) {
        var t = [];
        e = e.filter(function(e) {
            return !e.isDegenerated();
        });
        for (var n = e.slice(); n.length > 0; ) {
            for (var r = n.pop(), i = r.clone(), s = [ r ], a = 0; a < n.length; ) {
                var l = n[a];
                i.x3 == l.x1 && i.y3 == l.y1 && yn.isSimplePoint(e, l.x1, l.y1) ? (s.push(l), i.x3 = l.x3, 
                i.y3 = l.y3, n.splice(a, 1), a = 0) : i.x1 == l.x3 && i.y1 == l.y3 && yn.isSimplePoint(e, l.x3, l.y3) ? (s.unshift(l), 
                i.x1 = l.x1, i.y1 = l.y1, n.splice(a, 1), a = 0) : a++;
            }
            t.push(s);
        }
        return t;
    }, yn.isSimplePoint = function(e, t, n) {
        for (var r = 0, i = 0; i < e.length; ) {
            var s = e[i];
            if (++i, s.x1 == t && s.y1 == n && (r++, r > 2)) return !1;
            if (s.x3 == t && s.y3 == n && (r++, r > 2)) return !1;
        }
        return !0;
    }, yn.log = function() {};
    var _n = function(e, t, n, r, i, s) {
        Vn.assert(!isNaN(e), null, {
            fileName: "Edge.hx",
            lineNumber: 30,
            className: "nanofl.engine.geom.Edge",
            methodName: "new"
        }), Vn.assert(!isNaN(t), null, {
            fileName: "Edge.hx",
            lineNumber: 31,
            className: "nanofl.engine.geom.Edge",
            methodName: "new"
        }), Vn.assert(!isNaN(n), null, {
            fileName: "Edge.hx",
            lineNumber: 32,
            className: "nanofl.engine.geom.Edge",
            methodName: "new"
        }), Vn.assert(!isNaN(r), null, {
            fileName: "Edge.hx",
            lineNumber: 33,
            className: "nanofl.engine.geom.Edge",
            methodName: "new"
        }), this.x1 = e, this.y1 = t, null == i ? (this.x2 = (e + n) / 2, this.y2 = (t + r) / 2, 
        this.x3 = n, this.y3 = r) : (this.x2 = n, this.y2 = r, this.x3 = i, this.y3 = s);
    };
    s["nanofl.engine.geom.Edge"] = _n, _n.__name__ = [ "nanofl", "engine", "geom", "Edge" ], 
    _n.fromStraightLine = function(e) {
        return new _n(e.x1, e.y1, e.x2, e.y2);
    }, _n.fromBezierCurve = function(e) {
        return new _n(e.p1.x, e.p1.y, e.p2.x, e.p2.y, e.p3.x, e.p3.y);
    }, _n.getIntersection = function(e, t) {
        if (!pn.isIntersect(e.getBoundsRO(), t.getBoundsRO(), _n.GAP)) return null;
        if (e.equ(t)) return null;
        var n = _n.getIntersectionInner(e, t);
        return null != n && (xn.normalize(n.a), xn.normalize(n.b), 1 == n.a.length && 1 == n.b.length && n.a[0].equ(e) && n.b[0].equ(t) && (n = null)), 
        n;
    }, _n.getIntersectionInner = function(e, t) {
        _n.log("Edge.getIntersection " + y.string(e) + " AND " + y.string(t), {
            fileName: "Edge.hx",
            lineNumber: 305,
            className: "nanofl.engine.geom.Edge",
            methodName: "getIntersectionInner"
        });
        var n = e.isStraight(), r = t.isStraight();
        if (n && r) {
            _n.log("straightA && straightB", {
                fileName: "Edge.hx",
                lineNumber: 312,
                className: "nanofl.engine.geom.Edge",
                methodName: "getIntersectionInner"
            });
            var i = e.asStraightLine().getIntersection_straightSection(t.asStraightLine());
            return null == i ? null : {
                a: [ new _n(e.x1, e.y1, i.x, i.y), new _n(i.x, i.y, e.x3, e.y3) ],
                b: [ new _n(t.x1, t.y1, i.x, i.y), new _n(i.x, i.y, t.x3, t.y3) ]
            };
        }
        if (n && !r) {
            _n.log("straightA && !straightB", {
                fileName: "Edge.hx",
                lineNumber: 324,
                className: "nanofl.engine.geom.Edge",
                methodName: "getIntersectionInner"
            });
            var s = t.asBezierCurve().getIntersection_straightSection(e.asStraightLine());
            return _n.log("p = " + y.string(null != s), {
                fileName: "Edge.hx",
                lineNumber: 326,
                className: "nanofl.engine.geom.Edge",
                methodName: "getIntersectionInner"
            }), null == s ? null : {
                a: s.lines.map(_n.fromStraightLine),
                b: s.curves.map(_n.fromBezierCurve)
            };
        }
        if (!n && r) {
            _n.log("!straightA && straightB", {
                fileName: "Edge.hx",
                lineNumber: 337,
                className: "nanofl.engine.geom.Edge",
                methodName: "getIntersectionInner"
            });
            var a = e.asBezierCurve().getIntersection_straightSection(t.asStraightLine());
            return _n.log("p = " + y.string(null != a), {
                fileName: "Edge.hx",
                lineNumber: 339,
                className: "nanofl.engine.geom.Edge",
                methodName: "getIntersectionInner"
            }), null == a ? null : {
                a: a.curves.map(_n.fromBezierCurve),
                b: a.lines.map(_n.fromStraightLine)
            };
        }
        _n.log("!straightA && !straightB", {
            fileName: "Edge.hx",
            lineNumber: 349,
            className: "nanofl.engine.geom.Edge",
            methodName: "getIntersectionInner"
        });
        var l = e.asBezierCurve().getIntersection_bezierCurve(t.asBezierCurve());
        return null == l ? null : {
            a: l.a.map(_n.fromBezierCurve),
            b: l.b.map(_n.fromBezierCurve)
        };
    }, _n.log = function() {}, _n.prototype = {
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        x3: null,
        y3: null,
        cachedBounds: null,
        cachedBoundsEdge: null,
        isStraight: function() {
            var e = this.asStraightLine().getOrthogonalRayIntersection(this.x2, this.y2).point;
            return wn.getSqrDist(e.x, e.y, this.x2, this.y2) < _n.GAP * _n.GAP;
        },
        getIntersectionCount_rightRay: function(e, t) {
            return this.isStraight() ? this.asStraightLine().isIntersect_rightRay(e, t) ? 1 : 0 : this.asBezierCurve().getIntersectionCount_rightRay(e, t);
        },
        getIntersectionDirectedCount_rightRay: function(e, t) {
            if (this.isStraight()) return this.y1 == this.y3 || null == this.asStraightLine().getIntersectionPointX_rightRay(e, t) ? 0 : this.y1 < this.y3 ? 1 : -1;
            var n = this.asBezierCurve().getIntersectionCount_rightRay(e, t);
            return 0 == n || 2 == n ? 0 : this.y1 < t && this.y3 > t ? 1 : this.y1 > t && this.y3 < t ? -1 : this.y1 < t && this.y3 < t ? -1 : 1;
        },
        getIntersectionPointsX_rightRay: function(e, t) {
            if (this.isStraight()) {
                var n = this.asStraightLine().getIntersectionPointX_rightRay(e, t);
                return null != n ? [ n ] : [];
            }
            return this.asBezierCurve().getIntersectionPointsX_rightRay(e, t);
        },
        drawTo: function(e) {
            this.isStraight() ? e.lineTo(this.x3, this.y3) : e.curveTo(this.x2, this.y2, this.x3, this.y3);
        },
        equ: function(e) {
            return e.x2 == this.x2 && e.y2 == this.y2 && (e.x1 == this.x1 && e.y1 == this.y1 && e.x3 == this.x3 && e.y3 == this.y3 || e.x1 == this.x3 && e.y1 == this.y3 && e.x3 == this.x1 && e.y3 == this.y1);
        },
        equDirected: function(e) {
            return e.x2 == this.x2 && e.y2 == this.y2 && e.x1 == this.x1 && e.y1 == this.y1 && e.x3 == this.x3 && e.y3 == this.y3;
        },
        getNearestPoint: function(e, t) {
            var n;
            return n = this.isStraight() ? this.asStraightLine().getNearestPoint(e, t) : this.asBezierCurve().getNearestPoint(e, t), 
            Vn.assert(null != n.point, this.toString() + "; x = " + e + ", y = " + t, {
                fileName: "Edge.hx",
                lineNumber: 134,
                className: "nanofl.engine.geom.Edge",
                methodName: "getNearestPoint"
            }), Vn.assert(!isNaN(n.point.x), this.toString() + "; x = " + e + ", y = " + t, {
                fileName: "Edge.hx",
                lineNumber: 135,
                className: "nanofl.engine.geom.Edge",
                methodName: "getNearestPoint"
            }), Vn.assert(!isNaN(n.point.y), this.toString() + "; x = " + e + ", y = " + t, {
                fileName: "Edge.hx",
                lineNumber: 136,
                className: "nanofl.engine.geom.Edge",
                methodName: "getNearestPoint"
            }), Vn.assert(!isNaN(n.t), this.toString() + "; x = " + e + ", y = " + t, {
                fileName: "Edge.hx",
                lineNumber: 137,
                className: "nanofl.engine.geom.Edge",
                methodName: "getNearestPoint"
            }), n;
        },
        translate: function(e, t) {
            this.x1 += e, this.y1 += t, this.x2 += e, this.y2 += t, this.x3 += e, this.y3 += t;
        },
        translateVertex: function(e, t, n) {
            this.x1 == e.x && this.y1 == e.y ? this.translateStart(t, n) : this.x3 == e.x && this.y3 == e.y && this.translateEnd(t, n);
        },
        translateStart: function(e, t) {
            if (this.isStraight()) this.x1 += e, this.y1 += t, this.x2 = (this.x1 + this.x3) / 2, 
            this.y2 = (this.y1 + this.y3) / 2; else {
                {
                    var n = Math.atan2(this.y1 - this.y3, this.x1 - this.x3);
                    this.asStraightLine().getLength();
                }
                this.x1 += e, this.y1 += t;
                var r = Math.atan2(this.y1 - this.y3, this.x1 - this.x3), i = (this.asStraightLine().getLength(), 
                wn.rotate(this.x2 - this.x3, this.y2 - this.y3, r - n));
                this.x2 = i.x + this.x3, this.y2 = i.y + this.y3;
            }
        },
        translateEnd: function(e, t) {
            if (this.isStraight()) this.x3 += e, this.y3 += t, this.x2 = (this.x1 + this.x3) / 2, 
            this.y2 = (this.y1 + this.y3) / 2; else {
                {
                    var n = Math.atan2(this.y3 - this.y1, this.x3 - this.x1);
                    this.asStraightLine().getLength();
                }
                this.x3 += e, this.y3 += t;
                var r = Math.atan2(this.y3 - this.y1, this.x3 - this.x1), i = (this.asStraightLine().getLength(), 
                wn.rotate(this.x2 - this.x1, this.y2 - this.y1, r - n));
                this.x2 = i.x + this.x1, this.y2 = i.y + this.y1;
            }
        },
        reverse: function() {
            var e = this.x1;
            return this.x1 = this.x3, this.x3 = e, e = this.y1, this.y1 = this.y3, this.y3 = e, 
            this;
        },
        getBounds: function(e) {
            return null == e ? pn.clone(this.getBoundsRO()) : pn.extend(e, this.getBoundsRO());
        },
        getBoundsRO: function() {
            return null != this.cachedBounds && this.cachedBoundsEdge.equ(this) || (this.cachedBounds = this.isStraight() ? this.asStraightLine().getBounds() : this.asBezierCurve().getBounds(), 
            this.cachedBoundsEdge = this.clone()), this.cachedBounds;
        },
        toString: function() {
            return this.isStraight() ? "new Edge(" + this.x1 + "," + this.y1 + ", " + this.x3 + "," + this.y3 + ")" : "new Edge(" + this.x1 + "," + this.y1 + ", " + this.x2 + "," + this.y2 + ", " + this.x3 + "," + this.y3 + ")";
        },
        getMiddlePoint: function() {
            return this.isStraight() ? {
                x: this.x2,
                y: this.y2
            } : this.asBezierCurve().getPoint(.5);
        },
        hasCommonVertices: function(e) {
            return this.x1 == e.x1 && this.y1 == e.y1 || this.x1 == e.x3 && this.y1 == e.y3 || this.x3 == e.x1 && this.y3 == e.y1 || this.x3 == e.x3 && this.y3 == e.y3;
        },
        transform: function(e, t) {
            null == t && (t = !0);
            var n = this.isStraight(), r = e.transformPoint(this.x1, this.y1);
            this.x1 = wn.roundGap(r.x), this.y1 = wn.roundGap(r.y);
            var i = e.transformPoint(this.x3, this.y3);
            if (this.x3 = wn.roundGap(i.x), this.y3 = wn.roundGap(i.y), n) this.x2 = (this.x1 + this.x3) / 2, 
            this.y2 = (this.y1 + this.y3) / 2; else {
                var s = e.transformPoint(this.x2, this.y2);
                this.x2 = wn.roundGap(s.x), this.y2 = wn.roundGap(s.y);
            }
        },
        splitByClosePoint: function(e, t) {
            if (this.x1 == e && this.y1 == t) return null;
            if (this.x3 == e && this.y3 == t) return null;
            if (!pn.isPointInside(this.getBoundsRO(), e, t, _n.GAP)) return null;
            var n = this.getNearestPoint(e, t), r = wn.roundGapP(n.point);
            if (!(r.x != e || r.y != t || r.x == this.x1 && r.y == this.y1 || r.x == this.x3 && r.y == this.y3)) {
                Vn.assert(n.t > 0 && n.t < 1, "t = " + n.t, {
                    fileName: "Edge.hx",
                    lineNumber: 373,
                    className: "nanofl.engine.geom.Edge",
                    methodName: "splitByClosePoint"
                });
                var i = this.split([ n.t ]);
                return i[0].x3 = i[1].x1 = e, i[0].y3 = i[1].y1 = t, xn.normalize(i), Vn.assert(i.length > 1, "this = " + this.toString() + "; r = " + y.string(i), {
                    fileName: "Edge.hx",
                    lineNumber: 380,
                    className: "nanofl.engine.geom.Edge",
                    methodName: "splitByClosePoint"
                }), i;
            }
            return null;
        },
        asStraightLine: function() {
            return new Sn(this.x1, this.y1, this.x3, this.y3);
        },
        asBezierCurve: function() {
            return new dn(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        },
        clone: function() {
            return new _n(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        },
        duplicate: function(e) {
            return new _n(e.x1, e.y1, e.x2, e.y2, e.x3, e.y3);
        },
        indexIn: function(e) {
            for (var t = 0, n = e.length; n > t; ) {
                var r = t++;
                if (this.equ(e[r])) return r;
            }
            return -1;
        },
        isDegenerated: function() {
            return this.x1 == this.x2 && this.x2 == this.x3 && this.y1 == this.y2 && this.y2 == this.y3;
        },
        roundPoints: function() {
            var e = this.isStraight();
            this.x1 = wn.roundGap(this.x1), this.y1 = wn.roundGap(this.y1), this.x3 = wn.roundGap(this.x3), 
            this.y3 = wn.roundGap(this.y3), e ? (this.x2 = (this.x1 + this.x3) / 2, this.y2 = (this.y1 + this.y3) / 2) : (this.x2 = wn.roundGap(this.x2), 
            this.y2 = wn.roundGap(this.y2), this.isStraight() && (this.x2 = (this.x1 + this.x3) / 2, 
            this.y2 = (this.y1 + this.y3) / 2));
        },
        getLength: function() {
            return this.isStraight() ? this.asStraightLine().getLength() : this.asBezierCurve().getLength();
        },
        getPart: function(e) {
            return this.isStraight() ? _n.fromStraightLine(this.asStraightLine().getFirstPart(e)) : _n.fromBezierCurve(this.asBezierCurve().getFirstPart(e));
        },
        getPoint: function(e) {
            return this.isStraight() ? this.asStraightLine().getPoint(e) : this.asBezierCurve().getPoint(e);
        },
        getTangent: function(e) {
            return this.isStraight() ? this.asStraightLine().getTangent(e) : this.asBezierCurve().getTangent(e);
        },
        split: function(e) {
            return this.isStraight() ? this.asStraightLine().split(e).map(_n.fromStraightLine) : this.asBezierCurve().split(e).map(_n.fromBezierCurve);
        },
        isInRectangle: function(e, t, n, r) {
            if (this.x1 >= e && this.y1 >= t && this.x1 <= e + n && this.y1 <= t + r && this.x3 >= e && this.y3 >= t && this.x3 <= e + n && this.y3 <= t + r) {
                if (this.isStraight()) return !0;
                if (this.x2 >= e && this.y2 >= t && this.x2 <= e + n && this.y2 <= t + r) return !0;
                var i = this.asBezierCurve();
                return null != i.getIntersection_straightSection(new Sn(e, t, e + n, t)) ? !1 : null != i.getIntersection_straightSection(new Sn(e, t, e, t + r)) ? !1 : null != i.getIntersection_straightSection(new Sn(e, t + r, e + n, t + r)) ? !1 : null != i.getIntersection_straightSection(new Sn(e + n, t, e + n, t + r)) ? !1 : !0;
            }
            return !1;
        },
        getMonotoneT: function(e) {
            return this.isStraight() ? e : this.asBezierCurve().getMonotoneT(e);
        },
        __class__: _n
    };
    var xn = function() {};
    s["nanofl.engine.geom.Edges"] = xn, xn.__name__ = [ "nanofl", "engine", "geom", "Edges" ], 
    xn.hasDuplicates = function(e) {
        for (var t = 0, n = e.length; n > t; ) for (var r = t++, i = r + 1, s = e.length; s > i; ) {
            var a = i++;
            if (e[r].equ(e[a])) return !0;
        }
        return !1;
    }, xn.removeDublicates = function(e) {
        for (var t = 0; t < e.length; ) {
            for (var n = t + 1; n < e.length; ) e[t].equ(e[n]) ? e.splice(n, 1) : n++;
            t++;
        }
    }, xn.concatUnique = function(e, t) {
        for (var n = e.slice(), r = 0; r < t.length; ) {
            var i = t[r];
            ++r, i.indexIn(e) < 0 && n.push(i);
        }
        return n;
    }, xn.appendUnique = function(e, t) {
        for (var n = 0; n < t.length; ) {
            var r = t[n];
            ++n, r.indexIn(e) < 0 && e.push(r);
        }
        return e;
    }, xn.exclude = function(e, t) {
        for (var n = 0; n < t.length; ) {
            var r = t[n];
            ++n;
            var i = r.indexIn(e);
            i >= 0 && (e.splice(i, 1), Vn.assert(r.indexIn(e) < 0, null, {
                fileName: "Edges.hx",
                lineNumber: 66,
                className: "nanofl.engine.geom.Edges",
                methodName: "exclude"
            }));
        }
        return e;
    }, xn.draw = function(e, t, n) {
        for (var r = 1e100, i = 1e100, s = null, a = 0; a < e.length; ) {
            var l = e[a];
            ++a, (l.x1 != r || l.y1 != i) && (n && null != s && s.x1 == r && s.y1 == i && s.drawTo(t), 
            s = l, t.moveTo(l.x1, l.y1)), l.drawTo(t), r = l.x3, i = l.y3;
        }
        n && null != s && s.x1 == r && s.y1 == i && s.drawTo(t);
    }, xn.getBounds = function(e, t) {
        if (e.length > 0) {
            null == t && (t = {
                minX: 1e100,
                minY: 1e100,
                maxX: -1e100,
                maxY: -1e100
            });
            for (var n = 0; n < e.length; ) {
                var r = e[n];
                ++n, r.getBounds(t);
            }
            return t;
        }
        return t;
    }, xn.export = function(e, t) {
        if (0 != e.length) for (var n = null, r = null, i = 0; i < e.length; ) {
            var s = e[i];
            ++i, (s.x1 != n || s.y1 != r) && t.begin("move").attr("x", s.x1).attr("y", s.y1).end(), 
            s.isStraight() ? t.begin("line").attr("x", s.x3).attr("y", s.y3).end() : t.begin("curve").attr("x1", s.x2).attr("y1", s.y2).attr("x2", s.x3).attr("y2", s.y3).end(), 
            n = s.x3, r = s.y3;
        }
    }, xn.exportStroked = function(e, t) {
        if (0 != e.length) {
            for (var n = [], r = [], i = 0; i < e.length; ) {
                var s = e[i];
                ++i;
                for (var a = -1, l = 0, o = n.length; o > l; ) {
                    var u = l++;
                    if (n[u].equ(s.stroke)) {
                        a = u;
                        break;
                    }
                }
                -1 == a && (a = n.length, n.push(s.stroke), r.push([])), r[a].push(s);
            }
            for (var h = 0, c = r.length; c > h; ) {
                var f = h++;
                t.begin("edges").attr("strokeIndex", f), xn.export(r[f], t), t.end();
            }
        }
    }, xn.load = function(e) {
        for (var t = [], n = 0, r = 0, i = 0; i < e.length; ) {
            var s = e.charAt(i);
            if (i++, "M" == s) {
                if (!xn.reFloat2.matchSub(e, i)) throw new J("Cannot parse " + o.substr(e, i, 20) + "'.");
                n = y.parseFloat(xn.reFloat2.matched(1)), r = y.parseFloat(xn.reFloat2.matched(2)), 
                i += xn.reFloat2.matchedPos().len;
            } else if ("L" == s) {
                if (!xn.reFloat2.matchSub(e, i)) throw new J("Cannot parse " + o.substr(e, i, 20) + "'.");
                var a = y.parseFloat(xn.reFloat2.matched(1)), l = y.parseFloat(xn.reFloat2.matched(2));
                t.push(new _n(n, r, a, l)), n = a, r = l, i += xn.reFloat2.matchedPos().len;
            } else {
                if ("C" != s) throw new J("Unexpected command '" + s + "'.");
                if (!xn.reFloat4.matchSub(e, i)) throw new J("Cannot parse " + o.substr(e, i, 20) + "'.");
                var u = y.parseFloat(xn.reFloat4.matched(3)), h = y.parseFloat(xn.reFloat4.matched(4));
                t.push(new _n(n, r, y.parseFloat(xn.reFloat4.matched(1)), y.parseFloat(xn.reFloat4.matched(2)), u, h)), 
                n = u, r = h, i += xn.reFloat4.matchedPos().len;
            }
        }
        return t;
    }, xn.save = function(e) {
        for (var t = "", n = null, r = null, i = 0; i < e.length; ) {
            var s = e[i];
            ++i, (s.x1 != n || s.y1 != r) && (t += y.string("M" + s.x1 + "," + s.y1)), t += y.string(s.isStraight() ? "L" + s.x3 + "," + s.y3 : "C" + s.x2 + "," + s.y2 + "," + s.x3 + "," + s.y3), 
            n = s.x3, r = s.y3;
        }
        return t;
    }, xn.replace = function(e, t, n) {
        if (Vn.assert(!xn.hasDuplicates(e), "Edges must be unique.", {
            fileName: "Edges.hx",
            lineNumber: 248,
            className: "nanofl.engine.geom.Edges",
            methodName: "replace"
        }), Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 249,
            className: "nanofl.engine.geom.Edges",
            methodName: "replace"
        }), Vn.assert(o.indexOf(n, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 250,
            className: "nanofl.engine.geom.Edges",
            methodName: "replace"
        }), 1 == n.length && n[0].equ(t)) return -1;
        Vn.assert(t.indexIn(n) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 254,
            className: "nanofl.engine.geom.Edges",
            methodName: "replace"
        });
        var r = t.indexIn(e);
        if (r >= 0) {
            for (var i = 0; i < n.length; ) {
                var s = n[i];
                ++i, Vn.assert(s.indexIn(e) < 0, s.toString(), {
                    fileName: "Edges.hx",
                    lineNumber: 259,
                    className: "nanofl.engine.geom.Edges",
                    methodName: "replace"
                });
            }
            var a = e[r];
            xn.replaceAt(e, r, n, a.x1 == t.x3 && a.y1 == t.y3);
        }
        return Vn.assert(!xn.hasDuplicates(e), "Edges must be unique.", {
            fileName: "Edges.hx",
            lineNumber: 265,
            className: "nanofl.engine.geom.Edges",
            methodName: "replace"
        }), r;
    }, xn.replaceAll = function(e, t, n) {
        Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 272,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAll"
        }), Vn.assert(o.indexOf(n, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 273,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAll"
        }), Vn.assert(t.indexIn(n) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 274,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAll"
        });
        for (var r = 0; r < e.length; ) {
            var i = e[r];
            i.equ(t) ? (xn.replaceAt(e, r, n, t.x1 == i.x3 && t.y1 == i.y3), r += n.length) : r++;
        }
        Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 290,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAll"
        });
    }, xn.replaceAt = function(e, t, n, r) {
        Vn.assert(t >= 0 && t < e.length, "n = " + t + "; edges.length = " + e.length, {
            fileName: "Edges.hx",
            lineNumber: 295,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAt"
        }), Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 296,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAt"
        }), Vn.assert(o.indexOf(n, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 297,
            className: "nanofl.engine.geom.Edges",
            methodName: "replaceAt"
        });
        var i = e[t];
        if (e.splice(t, 1), n = n.map(function(e) {
            var t = i.clone();
            return t.x1 = e.x1, t.y1 = e.y1, t.x2 = e.x2, t.y2 = e.y2, t.x3 = e.x3, t.y3 = e.y3, 
            t;
        }), r) {
            n.reverse();
            for (var s = 0; s < n.length; ) {
                var a = n[s];
                ++s, a.reverse();
            }
        }
        Zn.insertRange(e, t, n);
    }, xn.intersect = function(e, t, n) {
        Vn.assert(e != t, "Must not be the same edges array.", {
            fileName: "Edges.hx",
            lineNumber: 326,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 327,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(o.indexOf(t, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 328,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDuplicates(e), "Must not have duplicated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 329,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDuplicates(t), "Must not have duplicated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 330,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDegenerated(e), "Must not have degenerated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 331,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDegenerated(t), "Must not have degenerated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 332,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), xn.intersectByClosePoints(e, t, n), Vn.assert(!xn.hasDuplicates(e), "Must not have duplicated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 342,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDuplicates(t), "Must not have duplicated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 343,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        });
        for (var r = 0; r < e.length; ) {
            for (var i = [ 0 ]; i[0] < t.length; ) {
                Vn.assert(r < e.length, function() {
                    return function() {
                        return "i = " + r + "; edgesA.length = " + e.length;
                    };
                }(), {
                    fileName: "Edges.hx",
                    lineNumber: 351,
                    className: "nanofl.engine.geom.Edges",
                    methodName: "intersect"
                }), Vn.assert(i[0] < t.length, function(e) {
                    return function() {
                        return "j = " + e[0] + "; edgesB.length = " + t.length;
                    };
                }(i), {
                    fileName: "Edges.hx",
                    lineNumber: 352,
                    className: "nanofl.engine.geom.Edges",
                    methodName: "intersect"
                });
                var s = e[r], a = t[i[0]], l = _n.getIntersection(s, a);
                if (null != l) {
                    var u = !1;
                    if (1 != l.a.length || !l.a[0].equ(s)) {
                        null != n && n(s, l.a), e.splice(r, 1);
                        for (var h = 0, c = l.a; h < c.length; ) {
                            var f = c[h];
                            ++h, f.indexIn(e) < 0 && e.push(s.duplicate(f));
                        }
                        r--, u = !0;
                        var g = s.indexIn(t);
                        if (g >= 0) {
                            t.splice(g, 1);
                            for (var m = 0, d = l.a; m < d.length; ) {
                                var p = d[m];
                                ++m, p.indexIn(t) < 0 && t.push(a.duplicate(p));
                            }
                            i[0] > g && i[0]--;
                        }
                    }
                    if (1 != l.b.length || !l.b[0].equ(a)) {
                        null != n && n(a, l.b), t.splice(i[0], 1);
                        for (var v = 0, y = l.b; v < y.length; ) {
                            var _ = y[v];
                            ++v, _.indexIn(t) < 0 && t.push(a.duplicate(_));
                        }
                        i[0]--;
                        var x = a.indexIn(e);
                        if (x >= 0) {
                            e.splice(x, 1);
                            for (var A = 0, b = l.b; A < b.length; ) {
                                var w = b[A];
                                ++A, w.indexIn(e) < 0 && e.push(s.duplicate(w));
                            }
                            r > x && (r--, u = !0);
                        }
                    }
                    if (u) break;
                } else i[0]++;
            }
            r++;
        }
        Vn.assert(e != t, "Must not be the same edges array.", {
            fileName: "Edges.hx",
            lineNumber: 413,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 414,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(o.indexOf(t, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 415,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDuplicates(e), "Must not have duplicated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 416,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDuplicates(t), "Must not have duplicated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 417,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasIntersections(e, t), "After intersection must not be intersections (" + xn.getFirstIntersectionString(e, t) + ").", {
            fileName: "Edges.hx",
            lineNumber: 418,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDegenerated(e), "Must not have degenerated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 419,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        }), Vn.assert(!xn.hasDegenerated(t), "Must not have degenerated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 420,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersect"
        });
    }, xn.intersectByClosePoints = function(e, t, n) {
        xn.intersectByClosePointsInner(e, t, n), xn.intersectByClosePointsInner(t, e, n);
    }, xn.intersectByClosePointsInner = function(e, t, n) {
        Vn.assert(e != t, "Must not be the same edges array.", {
            fileName: "Edges.hx",
            lineNumber: 432,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 433,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(o.indexOf(t, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 434,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDuplicates(e), "Must not have duplicated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 435,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDuplicates(t), "Must not have duplicated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 436,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDegenerated(e), "Must not have degenerated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 437,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDegenerated(t), "Must not have degenerated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 438,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        });
        for (var r = 0; r < e.length; ) {
            var i = e[r];
            ++r;
            for (var s = 0; s < t.length; ) {
                var a = t[s];
                if (pn.isIntersect(i.getBoundsRO(), a.getBoundsRO(), xn.GAP) && !i.equ(a)) {
                    var l = a.splitByClosePoint(i.x1, i.y1);
                    if (null == l && (l = a.splitByClosePoint(i.x3, i.y3)), null != l) {
                        null != n && n(a, l), t.splice(s, 1);
                        for (var u = 0; u < l.length; ) {
                            var h = l[u];
                            ++u, h.indexIn(t) < 0 && t.push(a.duplicate(h));
                        }
                        s--;
                    }
                }
                s++;
            }
        }
        Vn.assert(e != t, "Must not be the same edges array.", {
            fileName: "Edges.hx",
            lineNumber: 465,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(o.indexOf(e, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 466,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(o.indexOf(t, null, 0) < 0, null, {
            fileName: "Edges.hx",
            lineNumber: 467,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDuplicates(e), "Must not have duplicated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 468,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDuplicates(t), "Must not have duplicated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 469,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDegenerated(e), "Must not have degenerated in edgesA.", {
            fileName: "Edges.hx",
            lineNumber: 470,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        }), Vn.assert(!xn.hasDegenerated(t), "Must not have degenerated in edgesB.", {
            fileName: "Edges.hx",
            lineNumber: 471,
            className: "nanofl.engine.geom.Edges",
            methodName: "intersectByClosePointsInner"
        });
    }, xn.intersectSelf = function(e, t) {
        xn.intersect(e, e.slice(), t);
    }, xn.normalize = function(e) {
        return xn.roundPoints(e), xn.removeDegenerated(e), xn.removeDublicates(e), e;
    }, xn.roundPoints = function(e) {
        for (var t = 0; t < e.length; ) {
            var n = e[t];
            ++t, n.roundPoints();
        }
        return e;
    }, xn.removeDegenerated = function(e, t) {
        if (null == t && (t = !1), t) for (var n = 0; n < e.length; ) {
            var r = e[n];
            r.x1 == r.x3 && r.y1 == r.y3 ? e.splice(n, 1) : n++;
        } else for (var i = 0; i < e.length; ) e[i].isDegenerated() ? e.splice(i, 1) : i++;
        return e;
    }, xn.isPointInside = function(e, t, n, r) {
        if (r) {
            for (var i = 0, s = 0; s < e.length; ) {
                var a = e[s];
                ++s, i += a.getIntersectionCount_rightRay(t, n);
            }
            return i % 2 == 1;
        }
        for (var l = 0, o = 0; o < e.length; ) {
            var u = e[o];
            ++o, l += u.getIntersectionDirectedCount_rightRay(t, n);
        }
        return 0 != l;
    }, xn.hasIntersections = function(e, t) {
        for (var n = 0; n < e.length; ) {
            var r = e[n];
            ++n;
            for (var i = 0; i < t.length; ) {
                var s = t[i];
                ++i;
                var a = _n.getIntersection(r, s);
                if (null != a) return !0;
            }
        }
        return !1;
    }, xn.getFirstIntersectionString = function(e, t) {
        for (var n = 0; n < e.length; ) {
            var r = e[n];
            ++n;
            for (var i = 0; i < t.length; ) {
                var s = t[i];
                ++i;
                var a = _n.getIntersection(r, s);
                if (null != a) return r.toString() + ", " + s.toString();
            }
        }
        return "";
    }, xn.isSequence = function(e) {
        for (var t = 1, n = e.length; n > t; ) {
            var r = t++;
            if (e[r - 1].x3 != e[r].x1) return !1;
            if (e[r - 1].y3 != e[r].y1) return !1;
        }
        return !0;
    }, xn.hasDegenerated = function(e) {
        for (var t = 0; t < e.length; ) {
            var n = e[t];
            if (++t, n.isDegenerated()) return !0;
        }
        return !1;
    }, xn.getPointUseCount = function(e, t, n) {
        for (var r = 0, i = 0; i < e.length; ) {
            var s = e[i];
            ++i, s.x1 == t && s.y1 == n && r++, s.x3 == t && s.y3 == n && r++;
        }
        return r;
    }, xn.equIgnoreOrder = function(e, t) {
        if (e.length != t.length) return !1;
        for (var n = 0; n < e.length; ) {
            var r = e[n];
            if (++n, r.indexIn(t) < 0) return !1;
        }
        return !0;
    }, xn.getCommon = function(e, t) {
        for (var n = [], r = 0; r < e.length; ) {
            var i = e[r];
            ++r, i.indexIn(t) >= 0 && n.push(i);
        }
        return n;
    }, xn.getDifferent = function(e, t) {
        for (var n = [], r = 0; r < e.length; ) {
            var i = e[r];
            ++r, i.indexIn(t) < 0 && n.push(i);
        }
        for (var s = 0; s < t.length; ) {
            var a = t[s];
            ++s, a.indexIn(e) < 0 && n.push(a);
        }
        return n;
    }, xn.getNearestVertex = function(e, t, n) {
        for (var r = {
            x: -1e10,
            y: -1e10
        }, i = 0; i < e.length; ) {
            var s = e[i];
            ++i, wn.getSqrDist(r.x, r.y, t, n) > wn.getSqrDist(s.x1, s.y1, t, n) && (r.x = s.x1, 
            r.y = s.y1), wn.getSqrDist(r.x, r.y, t, n) > wn.getSqrDist(s.x3, s.y3, t, n) && (r.x = s.x3, 
            r.y = s.y3);
        }
        return r;
    }, xn.getTailPoints = function(e) {
        for (var t = [], n = 0; n < e.length; ) {
            var r = [ e[n] ];
            ++n, 1 != xn.getPointUseCount(e, r[0].x1, r[0].y1) || u.exists(t, function(e) {
                return function(t) {
                    return t.x == e[0].x1 && t.y == e[0].y1;
                };
            }(r)) || t.push({
                x: r[0].x1,
                y: r[0].y1
            }), 1 != xn.getPointUseCount(e, r[0].x3, r[0].y3) || u.exists(t, function(e) {
                return function(t) {
                    return t.x == e[0].x3 && t.y == e[0].y3;
                };
            }(r)) || t.push({
                x: r[0].x3,
                y: r[0].y3
            });
        }
        return t;
    }, xn.smoothStraightLineSequence = function(e, t) {
        for (var n = 0; n < e.length; ) {
            var r = e[n], i = e[(n + 1) % e.length];
            if (r.x3 == i.x1 && r.y3 == i.y1) {
                var s = r.split([ 1 - t / 2 ]), a = i.split([ t / 2 ]);
                e[n] = s[0], e[n + 1] = a[1], s[1].x2 = r.x3, s[1].y2 = r.y3, s[1].x3 = a[0].x3, 
                s[1].y3 = a[0].y3, e.splice(n + 1, 0, s[1]), n++;
            }
            n++;
        }
    }, xn.assertHasNoIntersections = function(e) {
        for (var t = 0, n = e.length; n > t; ) for (var r = t++, i = r + 1, s = e.length; s > i; ) {
            var a = i++, l = e[r].hasCommonVertices(e[a]), o = _n.getIntersection(e[r], e[a]);
            Vn.assert(l || null == o || 1 == o.a.length || 1 == o.b.length, "hasCV = " + (null == l ? "null" : "" + l) + "\nI = " + y.string(null != o) + "\nedges[" + r + "] = " + y.string(e[r]) + "\nedges[" + a + "] = " + y.string(e[a]), {
                fileName: "Edges.hx",
                lineNumber: 742,
                className: "nanofl.engine.geom.Edges",
                methodName: "assertHasNoIntersections"
            });
        }
    }, xn.log = function() {};
    var An = function() {};
    s["nanofl.engine.geom.Equation"] = An, An.__name__ = [ "nanofl", "engine", "geom", "Equation" ], 
    An.solveCube = function(e, t, n, r) {
        if (Math.abs(e) < 1e-10) return An.solveQuadratic(t, n, r);
        var i = e;
        e = t / i, t = n / i, n = r / i;
        var s = t - e * e / 3, a = e * (2 * e * e - 9 * t) / 27 + n, l = s * s * s, o = a * a + 4 * l / 27, u = -e / 3;
        if (o > 1e-10) {
            i = Math.sqrt(o);
            var h = (-a + i) / 2, c = (-a - i) / 2;
            return h = h >= 0 ? Math.pow(h, .3333333333333333) : -Math.pow(-h, .3333333333333333), 
            c = c >= 0 ? Math.pow(c, .3333333333333333) : -Math.pow(-c, .3333333333333333), 
            [ h + c + u ];
        }
        if (-1e-10 > o) {
            var f = 2 * Math.sqrt(-s / 3), g = Math.acos(-Math.sqrt(-27 / l) * a / 2) / 3;
            return [ f * Math.cos(g) + u, f * Math.cos(g + 2 * Math.PI / 3) + u, f * Math.cos(g + 4 * Math.PI / 3) + u ];
        }
        var m;
        return m = 0 > a ? Math.pow(-a / 2, .3333333333333333) : -Math.pow(a / 2, .3333333333333333), 
        [ 2 * m + u, -m + u ];
    }, An.solveQuadratic = function(e, t, n) {
        if (Math.abs(e) <= 1e-10) return Math.abs(t) > 1e-10 ? [ -n / t ] : [];
        var r = t * t - 4 * e * n;
        return r > 1e-10 ? (r = Math.sqrt(r), [ (-t - r) / (2 * e), (-t + r) / (2 * e) ]) : r > -1e-10 ? [ -t / (2 * e) ] : [];
    };
    var bn = function(e, t, n, r, i, s) {
        null == s && (s = 0), null == i && (i = 0), null == r && (r = 1), null == n && (n = 0), 
        null == t && (t = 0), null == e && (e = 1), this.a = e, this.b = t, this.c = n, 
        this.d = r, this.tx = i, this.ty = s;
    };
    s["nanofl.engine.geom.Matrix"] = bn, bn.__name__ = [ "nanofl", "engine", "geom", "Matrix" ], 
    bn.load = function(e) {
        var t = U.getAttr(e, "matrix", [ 0 ]);
        return null != t ? new bn(t[0], t[1], t[2], t[3], U.getAttr(e, "x", 0), U.getAttr(e, "y", 0)) : new bn(1, 0, 0, 1, U.getAttr(e, "x", 0), U.getAttr(e, "y", 0));
    }, bn.fromMatrix2D = function(e) {
        return new bn(e.a, e.b, e.c, e.d, e.tx, e.ty);
    }, bn.prototype = {
        a: null,
        b: null,
        c: null,
        d: null,
        tx: null,
        ty: null,
        save: function(e) {
            (0 != this.tx || 0 != this.ty) && (e.attr("x", this.tx), e.attr("y", this.ty)), 
            (1 != this.a || 0 != this.b || 0 != this.c || 1 != this.d) && e.attr("matrix", [ this.a, this.b, this.c, this.d ].join(","));
        },
        decompose: function() {
            var e = {};
            e.x = this.tx, e.y = this.ty, e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), 
            e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
            var t = Math.atan2(-this.c, this.d), n = Math.atan2(this.b, this.a);
            return t == n ? (e.rotation = 180 * n / Math.PI, this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180), 
            e.skewX = e.skewY = 0) : (e.rotation = 0, e.skewX = 180 * t / Math.PI, e.skewY = 180 * n / Math.PI), 
            e;
        },
        setMatrix: function(e) {
            return this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.tx = e.tx, this.ty = e.ty, 
            this;
        },
        isIdentity: function() {
            return 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d && 0 == this.tx && 0 == this.ty;
        },
        invert: function() {
            var e = this.a, t = this.b, n = this.c, r = this.d, i = this.tx, s = e * r - t * n;
            return this.a = r / s, this.b = -t / s, this.c = -n / s, this.d = e / s, this.tx = (n * this.ty - r * i) / s, 
            this.ty = -(e * this.ty - t * i) / s, this;
        },
        transformPoint: function(e, t) {
            return {
                x: e * this.a + t * this.c + this.tx,
                y: e * this.b + t * this.d + this.ty
            };
        },
        transformPointP: function(e) {
            return {
                x: e.x * this.a + e.y * this.c + this.tx,
                y: e.x * this.b + e.y * this.d + this.ty
            };
        },
        clone: function() {
            return new bn(this.a, this.b, this.c, this.d, this.tx, this.ty);
        },
        translate: function(e, t) {
            return this.tx += e, this.ty += t, this;
        },
        equ: function(e) {
            return e.a == this.a && e.b == this.b && e.c == this.c && e.d == this.d && e.tx == this.tx && e.ty == this.ty;
        },
        setTransform: function(e, t, n, r, i, s, a, l, o) {
            return this.setMatrix(new bn().appendTransform(e, t, n, r, i, s, a, l, o));
        },
        appendMatrix: function(e) {
            return this.append(e.a, e.b, e.c, e.d, e.tx, e.ty);
        },
        prependMatrix: function(e) {
            return this.prepend(e.a, e.b, e.c, e.d, e.tx, e.ty);
        },
        append: function(e, t, n, r, i, s) {
            var a = this.a, l = this.b, o = this.c, u = this.d;
            return this.a = e * a + t * o, this.b = e * l + t * u, this.c = n * a + r * o, this.d = n * l + r * u, 
            this.tx = i * a + s * o + this.tx, this.ty = i * l + s * u + this.ty, this;
        },
        prepend: function(e, t, n, r, i, s) {
            var a = this.tx;
            if (1 != e || 0 != t || 0 != n || 1 != r) {
                var l = this.a, o = this.c;
                this.a = l * e + this.b * n, this.b = l * t + this.b * r, this.c = o * e + this.d * n, 
                this.d = o * t + this.d * r;
            }
            return this.tx = a * e + this.ty * n + i, this.ty = a * t + this.ty * r + s, this;
        },
        appendTransform: function(e, t, n, r, i, s, a, l, o) {
            null == o && (o = 0), null == l && (l = 0), null == a && (a = 0), null == s && (s = 0), 
            null == i && (i = 0), null == r && (r = 1), null == n && (n = 1);
            var u, h;
            if (i % 360 != 0) {
                var c = i * bn.DEG_TO_RAD;
                h = Math.cos(c), u = Math.sin(c);
            } else h = 1, u = 0;
            return 0 != s || 0 != a ? (s *= bn.DEG_TO_RAD, a *= bn.DEG_TO_RAD, this.append(Math.cos(a), Math.sin(a), -Math.sin(s), Math.cos(s), e, t), 
            this.append(h * n, u * n, -u * r, h * r, 0, 0)) : this.append(h * n, u * n, -u * r, h * r, e, t), 
            (0 != l || 0 != o) && (this.tx -= l * this.a + o * this.c, this.ty -= l * this.b + o * this.d), 
            this;
        },
        prependTransform: function(e, t, n, r, i, s, a, l, o) {
            null == o && (o = 0), null == l && (l = 0), null == a && (a = 0), null == s && (s = 0), 
            null == i && (i = 0), null == r && (r = 1), null == n && (n = 1);
            var u, h;
            if (i % 360 != 0) {
                var c = i * bn.DEG_TO_RAD;
                h = Math.cos(c), u = Math.sin(c);
            } else h = 1, u = 0;
            return this.tx -= l, this.ty -= o, 0 != s || 0 != a ? (s *= bn.DEG_TO_RAD, a *= bn.DEG_TO_RAD, 
            this.prepend(h * n, u * n, -u * r, h * r, 0, 0), this.prepend(Math.cos(a), Math.sin(a), -Math.sin(s), Math.cos(s), e, t)) : this.prepend(h * n, u * n, -u * r, h * r, e, t), 
            this;
        },
        rotate: function(e) {
            var t = Math.cos(e), n = Math.sin(e), r = this.a, i = this.c, s = this.tx;
            return this.a = r * t - this.b * n, this.b = r * n + this.b * t, this.c = i * t - this.d * n, 
            this.d = i * n + this.d * t, this.tx = s * t - this.ty * n, this.ty = s * n + this.ty * t, 
            this;
        },
        skew: function(e, t) {
            return e *= bn.DEG_TO_RAD, t *= bn.DEG_TO_RAD, this.append(Math.cos(t), Math.sin(t), -Math.sin(e), Math.cos(e), 0, 0), 
            this;
        },
        scale: function(e, t) {
            return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, 
            this;
        },
        createGradientBox: function(e, t, n, r, i) {
            if (null == i && (i = 0), null == r && (r = 0), null == n && (n = 0), this.a = e / 1638.4, 
            this.d = t / 1638.4, 0 != n) {
                var s = Math.cos(n), a = Math.sin(n);
                this.b = a * this.d, this.c = -a * this.a, this.a *= s, this.d *= s;
            } else this.b = 0, this.c = 0;
            return this.tx = r + e / 2, this.ty = i + t / 2, this;
        },
        getAverageScale: function() {
            return (Math.sqrt(this.a * this.a + this.c * this.c) + Math.sqrt(this.b * this.b + this.d * this.d)) / 2;
        },
        toMatrix2D: function() {
            return new createjs.Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
        },
        toArray: function() {
            return [ this.a, this.b, this.c, this.d, this.tx, this.ty ];
        },
        toString: function() {
            return "Matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
        },
        __class__: bn
    };
    var wn = function() {};
    s["nanofl.engine.geom.PointTools"] = wn, wn.__name__ = [ "nanofl", "engine", "geom", "PointTools" ], 
    wn.half = function(e) {
        var t = 0 | e.x;
        e.x = t + (t > e.x ? -.5 : .5);
        var n = 0 | e.y;
        return e.y = n + (n > e.y ? -.5 : .5), e;
    }, wn.round = function(e) {
        return e.x = Math.round(e.x), e.y = Math.round(e.y), e;
    }, wn.normalize = function(e) {
        var t = wn.getLength(e);
        return 0 != t && (e.x /= t, e.y /= t), e;
    }, wn.getLength = function(e) {
        return Math.sqrt(e.x * e.x + e.y * e.y);
    }, wn.getDist = function(e, t, n, r) {
        var i = n - e, s = r - t;
        return Math.sqrt(i * i + s * s);
    }, wn.getSqrDist = function(e, t, n, r) {
        var i = n - e, s = r - t;
        return i * i + s * s;
    }, wn.getDistP = function(e, t) {
        return wn.getDist(e.x, e.y, t.x, t.y);
    }, wn.getSqrDistP = function(e, t) {
        return wn.getSqrDist(e.x, e.y, t.x, t.y);
    }, wn.rotate = function(e, t, n) {
        return {
            x: e * Math.cos(n) - t * Math.sin(n),
            y: t * Math.cos(n) + e * Math.sin(n)
        };
    }, wn.getRotated = function(e, t) {
        return wn.rotate(e.x, e.y, t);
    }, wn.moveInDirection = function(e, t, n, r) {
        var i = {
            x: t - e.x,
            y: n - e.y
        }, s = wn.getLength(i);
        wn.normalize(i);
        var a = Math.min(r, s);
        return e.x = i.x * a + e.x, e.y = i.y * a + e.y, e;
    }, wn.equ = function(e, t) {
        return e.x == t.x && e.y == t.y;
    }, wn.clone = function(e) {
        return {
            x: e.x,
            y: e.y
        };
    }, wn.roundGap = function(e) {
        return Math.round(100 * e) / 100;
    }, wn.roundGapP = function(e) {
        return e.x = wn.roundGap(e.x), e.y = wn.roundGap(e.y), e;
    }, wn.getNearest = function(e, t) {
        if (null == t || 0 == t.length) return null;
        for (var n = t[0], r = wn.getSqrDist(e.x, e.y, n.x, n.y), i = 0; i < t.length; ) {
            var s = t[i];
            ++i;
            var a = wn.getSqrDist(e.x, e.y, s.x, s.y);
            r > a && (n = s, r = a);
        }
        return n;
    }, wn.toString = function(e) {
        return null != e ? e.x + "," + e.y : "null";
    };
    var Nn = function(e, t, n) {
        null == n && (n = !1), this.fill = e, this.contours = null != t ? t : [], this.selected = n;
    };
    s["nanofl.engine.geom.Polygon"] = Nn, Nn.__name__ = [ "nanofl", "engine", "geom", "Polygon" ], 
    Nn.__interfaces__ = [ Tt ], Nn.load = function(e, t) {
        Vn.assert("polygon" == e.name, null, {
            fileName: "Polygon.hx",
            lineNumber: 35,
            className: "nanofl.engine.geom.Polygon",
            methodName: "load"
        });
        var n = y.int(U.getAttr(e, "fillIndex", -1));
        Vn.assert(null != n, null, {
            fileName: "Polygon.hx",
            lineNumber: 38,
            className: "nanofl.engine.geom.Polygon",
            methodName: "load"
        }), Vn.assert(n >= 0, null, {
            fileName: "Polygon.hx",
            lineNumber: 39,
            className: "nanofl.engine.geom.Polygon",
            methodName: "load"
        }), Vn.assert(n < t.length, null, {
            fileName: "Polygon.hx",
            lineNumber: 40,
            className: "nanofl.engine.geom.Polygon",
            methodName: "load"
        });
        for (var r = [], i = 0, s = e.children; i < s.length; ) {
            var a = s[i];
            ++i, "contour" == a.name && r.push(new vn(xn.load(U.getAttr(a, "edges"))));
        }
        return new Nn(t[n], r);
    }, Nn.prototype = {
        contours: null,
        fill: null,
        selected: null,
        save: function(e, t) {
            t.begin("polygon").attr("fillIndex", this.getFillIndex(e));
            for (var n = 0, r = this.contours; n < r.length; ) {
                var i = r[n];
                ++n, i.save(t);
            }
            t.end();
        },
        draw: function(e, t) {
            this.fill.begin(e);
            for (var n = 0, r = this.contours; n < r.length; ) {
                var i = r[n];
                ++n, i.draw(e);
            }
            if (e.endFill(), Nn.showSelection && this.selected) {
                new fn(t).begin(e);
                for (var s = 0, a = this.contours; s < a.length; ) {
                    var l = a[s];
                    ++s, l.draw(e);
                }
                e.endFill();
            }
        },
        translate: function(e, t) {
            null != this.fill && (this.fill = this.fill.getTransformed(new bn(1, 0, 0, 1, e, t)));
            for (var n = 0, r = this.contours; n < r.length; ) {
                var i = r[n];
                ++n, i.translate(e, t);
            }
        },
        isPointInside: function(e, t) {
            return this.contours[0].isPointInside(e, t) && function(e) {
                return function(t) {
                    return u.foreach(e, t);
                };
            }(this.contours.slice(1))(function(n) {
                return !n.isPointInside(e, t);
            });
        },
        getFillIndex: function(e) {
            var t = this, n = Jn.findIndex(e, function(e) {
                return e.equ(t.fill);
            });
            return 0 > n && (n = e.length, e.push(this.fill)), n;
        },
        hasPoint: function(e, t) {
            for (var n = 0, r = this.contours; n < r.length; ) {
                var i = r[n];
                if (++n, i.hasPoint(e, t)) return !0;
            }
            return !1;
        },
        hasEdge: function(e) {
            for (var t = 0, n = this.contours; t < n.length; ) {
                var r = n[t];
                if (++t, r.hasEdge(e)) return !0;
            }
            return !1;
        },
        isEdgeInside: function(e) {
            return Vn.assert(this.contours.length > 0, null, {
                fileName: "Polygon.hx",
                lineNumber: 113,
                className: "nanofl.engine.geom.Polygon",
                methodName: "isEdgeInside"
            }), this.contours[0].isEdgeInside(e) && u.foreach(this.contours.slice(1), function(t) {
                return !t.isEdgeInside(e);
            });
        },
        isEdgeAtLeastPartiallyInside: function(e) {
            var t = e.getMiddlePoint();
            return !this.hasPoint(t.x, t.y) && this.isPointInside(t.x, t.y) || !this.hasPoint(e.x1, e.y1) && this.isPointInside(e.x1, e.y1) || !this.hasPoint(e.x3, e.y3) && this.isPointInside(e.x3, e.y3);
        },
        isPolygonInside: function(e) {
            Vn.assert(this.contours.length > 0, null, {
                fileName: "Polygon.hx",
                lineNumber: 127,
                className: "nanofl.engine.geom.Polygon",
                methodName: "isPolygonInside"
            }), Vn.assert(e.contours.length > 0, null, {
                fileName: "Polygon.hx",
                lineNumber: 128,
                className: "nanofl.engine.geom.Polygon",
                methodName: "isPolygonInside"
            });
            for (var t = 0, n = e.contours[0].edges; t < n.length; ) {
                var r = n[t];
                if (++t, !this.isEdgeInside(r)) return !1;
            }
            for (var i = 1, s = this.contours.length; s > i; ) for (var a = i++, l = 0, o = this.contours[a].edges; l < o.length; ) {
                var u = o[l];
                if (++l, e.isEdgeInside(u)) return !1;
            }
            return !0;
        },
        translateVertex: function(e, t, n) {
            for (var r = 0, i = this.contours; r < i.length; ) {
                var s = i[r];
                ++r;
                for (var a = 0, l = s.edges; a < l.length; ) {
                    var o = l[a];
                    ++a, o.translateVertex(e, t, n);
                }
            }
        },
        getBounds: function(e) {
            if (this.contours.length > 0) {
                null == e && (e = {
                    minX: 1e10,
                    minY: 1e10,
                    maxX: -1e10,
                    maxY: -1e10
                });
                for (var t = 0, n = this.contours; t < n.length; ) {
                    var r = n[t];
                    ++t, xn.getBounds(r.edges, e);
                }
                return e;
            }
            return null != e ? e : {
                minX: 0,
                minY: 0,
                maxX: 0,
                maxY: 0
            };
        },
        applyFill: function(e, t, n, r, i) {
            var s = e.getTyped();
            switch (s[1]) {
              case 0:
                var a = s[2];
                this.fill = a.clone();
                break;

              case 1:
                var l = s[2];
                if (l = l.clone(), null == this.fill || b.enumIndex(this.fill.getTyped()) != b.enumIndex(l.getTyped()) || null != t) {
                    var o;
                    if (null == t || t == r && n == i) {
                        var u = this.getBounds();
                        o = u.maxX - u.minX, t = u.minX, r = u.maxX, n = i = u.minY;
                    } else o = wn.getDist(t, n, r, i);
                    l.x0 = t, l.y0 = n, l.x1 = r, l.y1 = i;
                } else {
                    var h;
                    h = K.__cast(this.fill, hn), l.x0 = h.x0, l.y0 = h.y0, l.x1 = h.x1, l.y1 = h.y1;
                }
                this.fill = l;
                break;

              case 2:
                var c = s[2];
                if (c = c.clone(), null == this.fill || b.enumIndex(this.fill.getTyped()) != b.enumIndex(c.getTyped()) || null != t) {
                    var f;
                    if (null == t || t == r && n == i) {
                        var g = this.getBounds();
                        f = Math.max(g.maxX - g.minX, g.maxY - g.minY) / 2, t = (g.minX + g.maxX) / 2, n = (g.minY + g.maxY) / 2;
                    } else f = wn.getDist(t, n, r, i);
                    c.cx = t, c.cy = n, c.r = f, c.fx = t, c.fy = n;
                } else {
                    var m;
                    m = K.__cast(this.fill, cn), c.cx = m.cx, c.cy = m.cy, c.r = m.r, c.fx = m.fx, c.fy = m.fy;
                }
                this.fill = c;
                break;

              case 3:
                var d = s[2];
                d = d.clone();
                var p;
                d.repeat = null != t ? "repeat" : "no-repeat";
                var v = d.getBitmapWidth();
                if (null == t || t == r && n == i) {
                    var y = this.getBounds();
                    p = y.maxX - y.minX, t = y.minX, r = y.minX + v, n = i = y.minY;
                } else p = wn.getDist(t, n, r, i);
                d.matrix = new bn(), d.matrix.scale(p / v, p / v), (t != r || n != i) && d.matrix.rotate(Math.atan2(i - n, r - t)), 
                d.matrix.translate(t, n), this.fill = d;
            }
        },
        transform: function(e, t) {
            null == t && (t = !0);
            for (var n = 0, r = this.contours; n < r.length; ) {
                var i = r[n];
                ++n;
                for (var s = 0, a = i.edges; s < a.length; ) {
                    var l = a[s];
                    ++s, l.transform(e);
                }
            }
            t && null != this.fill && (this.fill = this.fill.getTransformed(e));
        },
        getEdges: function(e) {
            null == e && (e = []);
            for (var t = 0, n = this.contours; t < n.length; ) {
                var r = n[t];
                ++t, xn.appendUnique(e, r.edges);
            }
            return e;
        },
        getPointInside: function() {
            for (var e = this.getBounds(), t = [ e.minY, e.maxY ], n = 0, r = this.getEdges(); n < r.length; ) {
                var i = r[n];
                ++n, t.push(i.y1);
            }
            t.sort(f.compare);
            for (var s = 0, a = t[0], l = 1, o = t.length; o > l; ) {
                var u = l++;
                t[u] - t[u - 1] > s && (s = t[u] - t[u - 1], a = (t[u] + t[u - 1]) / 2);
            }
            for (var h = [], c = 0, g = this.contours; c < g.length; ) {
                var m = g[c];
                ++c;
                for (var d = 0, p = m.edges; d < p.length; ) {
                    var v = p[d];
                    ++d;
                    for (var _ = 0, x = v.getIntersectionPointsX_rightRay(-1e100, a); _ < x.length; ) {
                        var A = x[_];
                        ++_, h.push(A);
                    }
                }
                Vn.assert(h.length % 2 == 0, "Polygon.getPointInside() error\nxx = " + y.string(h) + "\nrY = " + a + "\nedges = " + y.string(m.edges), {
                    fileName: "Polygon.hx",
                    lineNumber: 336,
                    className: "nanofl.engine.geom.Polygon",
                    methodName: "getPointInside"
                });
            }
            h.sort(f.compare);
            for (var b = 0, w = h[0], N = 1; N < h.length; ) h[N] - h[N - 1] > b && (b = h[N] - h[N - 1], 
            w = (h[N] + h[N - 1]) / 2), N += 2;
            return {
                x: w,
                y: a
            };
        },
        clone: function() {
            return new Nn(this.fill.clone(), mt.clone(this.contours), this.selected);
        },
        replaceEdge: function(e, t) {
            for (var n = 0, r = this.contours; n < r.length; ) {
                var i = r[n];
                ++n, xn.replaceAll(i.edges, e, t);
            }
        },
        export: function(e, t) {
            for (var n = -1, r = 0, i = t.length; i > r; ) {
                var s = r++;
                if (t[s].equ(this.fill)) {
                    n = s;
                    break;
                }
            }
            -1 == n && (n = t.length, t.push(this.fill)), e.begin("polygon").attr("fillIndex", n);
            for (var a = 0, l = this.contours; a < l.length; ) {
                var o = l[a];
                ++a, e.begin("contour"), xn.export(o.edges, e), e.end();
            }
            e.end();
        },
        split: function() {
            for (var e = [], t = 0, n = this.contours; t < n.length; ) {
                var r = [ n[t] ];
                ++t, u.foreach(this.contours, function(e) {
                    return function(t) {
                        return t == e[0] || !e[0].isNestedTo(t);
                    };
                }(r)) && e.push(r[0]);
            }
            if (1 == e.length) return [ this ];
            for (var i = [], s = 0; s < e.length; ) {
                var a = [ e[s] ];
                ++s;
                var l = this.contours.filter(function(e) {
                    return function(t) {
                        return t != e[0] && t.isNestedTo(e[0]);
                    };
                }(a));
                l.unshift(a[0]), i.push(new Nn(this.fill, l));
            }
            return i;
        },
        equ: function(e) {
            return e.contours.length != this.contours.length ? !1 : u.foreach(this.contours, function(t) {
                return u.exists(e.contours, function(e) {
                    return t.equ(e);
                });
            });
        },
        normalize: function() {
            for (var e = 0; e < this.contours.length; ) this.contours[e].normalize(), this.contours[e].edges.length <= 1 ? this.contours.splice(e, 1) : e++;
        },
        isInRectangle: function(e, t, n, r) {
            for (var i = 0, s = this.contours[0].edges; i < s.length; ) {
                var a = s[i];
                if (++i, !a.isInRectangle(e, t, n, r)) return !1;
            }
            return !0;
        },
        assertCorrect: function() {},
        isContourOutside: function(e) {
            for (var t = this.getEdges(), n = 0, r = e.edges; n < r.length; ) {
                var i = [ r[n] ];
                if (++n, !this.hasPoint(i[0].x3, i[0].y3) && !u.exists(t, function(e) {
                    return function(t) {
                        return t.y3 == e[0].y3;
                    };
                }(i)) && this.isPointInside(i[0].x3, i[0].y3)) return !1;
            }
            return !0;
        },
        fixErrors: function() {
            for (var e = !1, t = 1, n = this.contours.length; n > t; ) {
                var r = t++;
                if (this.contours[0].isNestedTo(this.contours[r])) {
                    var i = this.contours[0];
                    this.contours[0] = this.contours[r], this.contours[r] = i, e = !0;
                }
            }
            this.contours[0].getClockwiseProduct() < 0 && this.contours[0].reverse();
            for (var s = 0, a = this.contours.slice(1); s < a.length; ) {
                var l = a[s];
                ++s, l.getClockwiseProduct() > 0 && l.reverse();
            }
            return e;
        },
        toString: function() {
            return "new Polygon(" + y.string(this.fill) + ", " + y.string(this.contours) + ")";
        },
        __class__: Nn
    };
    var En = function() {};
    s["nanofl.engine.geom.Polygons"] = En, En.__name__ = [ "nanofl", "engine", "geom", "Polygons" ], 
    En.findByPoint = function(e, t, n) {
        for (var r = 0; r < e.length; ) {
            var i = e[r];
            if (++r, i.isPointInside(t, n)) return i;
        }
        return null;
    }, En.isEdgeInside = function(e, t) {
        for (var n = 0; n < e.length; ) {
            var r = e[n];
            if (++n, r.isEdgeInside(t)) return !0;
        }
        return !1;
    }, En.mergeByCommonEdges = function(e, t) {
        Vn.assert(!En.hasDublicates(e), null, {
            fileName: "Polygons.hx",
            lineNumber: 32,
            className: "nanofl.engine.geom.Polygons",
            methodName: "mergeByCommonEdges"
        }), En.assertCorrect(e, !1), En.log(function() {
            return "mergeByCommonEdges\npolygons =\n" + e.map(function(e) {
                return "	" + y.string(e);
            }).join("\n") + "\nedges = " + t.join("; ");
        }, {
            fileName: "Polygons.hx",
            lineNumber: 35,
            className: "nanofl.engine.geom.Polygons",
            methodName: "mergeByCommonEdges"
        });
        for (var n = 0; n < e.length; ) {
            for (var r = [ n + 1 ]; r[0] < e.length; ) {
                if (En.log(function(t) {
                    return function() {
                        return "test i=" + n + " and j=" + t[0] + "\n		" + e[n].toString() + "\n		" + y.string(e[t[0]]);
                    };
                }(r), {
                    fileName: "Polygons.hx",
                    lineNumber: 42,
                    className: "nanofl.engine.geom.Polygons",
                    methodName: "mergeByCommonEdges"
                }), e[n].fill.equ(e[r[0]].fill)) {
                    En.log(function() {
                        return function() {
                            return "	fill match!";
                        };
                    }(), {
                        fileName: "Polygons.hx",
                        lineNumber: 45,
                        className: "nanofl.engine.geom.Polygons",
                        methodName: "mergeByCommonEdges"
                    }), Vn.assert(e[n].contours.length > 0, null, {
                        fileName: "Polygons.hx",
                        lineNumber: 46,
                        className: "nanofl.engine.geom.Polygons",
                        methodName: "mergeByCommonEdges"
                    }), Vn.assert(e[r[0]].contours.length > 0, null, {
                        fileName: "Polygons.hx",
                        lineNumber: 47,
                        className: "nanofl.engine.geom.Polygons",
                        methodName: "mergeByCommonEdges"
                    });
                    var i = [ xn.getCommon(e[n].contours[0].edges, e[r[0]].contours[0].edges) ];
                    if (En.log(function(e) {
                        return function() {
                            return "	commonEdges = " + y.string(e[0]);
                        };
                    }(i), {
                        fileName: "Polygons.hx",
                        lineNumber: 50,
                        className: "nanofl.engine.geom.Polygons",
                        methodName: "mergeByCommonEdges"
                    }), i[0].length > 0 && u.foreach(i[0], function() {
                        return function(e) {
                            return e.indexIn(t) < 0;
                        };
                    }())) {
                        var s = xn.exclude(xn.concatUnique(e[n].contours[0].edges, e[r[0]].contours[0].edges), i[0]);
                        if (En.log("	MERGE!", {
                            fileName: "Polygons.hx",
                            lineNumber: 55,
                            className: "nanofl.engine.geom.Polygons",
                            methodName: "mergeByCommonEdges"
                        }), s.length > 0) {
                            var a = yn.fromEdges(s);
                            a.sort(function() {
                                return function(e, t) {
                                    return e.isNestedTo(t) ? 1 : -1;
                                };
                            }());
                            for (var l = 1, o = a.length; o > l; ) {
                                var h = l++;
                                a[h].reverse();
                            }
                            var c = a.slice(1).concat(e[n].contours.slice(1)).concat(e[r[0]].contours.slice(1));
                            yn.removeNested(c), yn.mergeByCommonEdges(c, !0), e[n] = new Nn(e[n].fill, [ a[0] ].concat(c)), 
                            e[n].assertCorrect();
                        } else Vn.assert(!1, function() {
                            return function() {
                                return "Two polygons with same outer contour = " + y.string(e[n].contours[0]);
                            };
                        }(), {
                            fileName: "Polygons.hx",
                            lineNumber: 78,
                            className: "nanofl.engine.geom.Polygons",
                            methodName: "mergeByCommonEdges"
                        });
                        En.log("	Remove polygon " + r[0], {
                            fileName: "Polygons.hx",
                            lineNumber: 82,
                            className: "nanofl.engine.geom.Polygons",
                            methodName: "mergeByCommonEdges"
                        }), e.splice(r[0], 1), s.length > 0 ? r[0] = n : r[0]--, En.log("	j = " + r[0], {
                            fileName: "Polygons.hx",
                            lineNumber: 88,
                            className: "nanofl.engine.geom.Polygons",
                            methodName: "mergeByCommonEdges"
                        });
                    }
                }
                r[0]++;
            }
            n++;
        }
        En.log("==================================== in the middle ==========================", {
            fileName: "Polygons.hx",
            lineNumber: 96,
            className: "nanofl.engine.geom.Polygons",
            methodName: "mergeByCommonEdges"
        }), En.log(function() {
            return "// SOURCE:\n	" + e.join("\n	");
        }, {
            fileName: "Polygons.hx",
            lineNumber: 97,
            className: "nanofl.engine.geom.Polygons",
            methodName: "mergeByCommonEdges"
        }), En.assertCorrect(e, !1);
        for (var f = 0; f < e.length; ) {
            for (var g = [ 0 ]; g[0] < e.length; ) {
                if (f != g[0] && e[f].fill.equ(e[g[0]].fill)) {
                    Vn.assert(e[f].contours.length > 0, null, {
                        fileName: "Polygons.hx",
                        lineNumber: 108,
                        className: "nanofl.engine.geom.Polygons",
                        methodName: "mergeByCommonEdges"
                    }), Vn.assert(e[g[0]].contours.length > 0, null, {
                        fileName: "Polygons.hx",
                        lineNumber: 109,
                        className: "nanofl.engine.geom.Polygons",
                        methodName: "mergeByCommonEdges"
                    });
                    for (var m = e[g[0]].contours[0], d = 1, p = e[f].contours.length; p > d; ) {
                        var v = d++, _ = e[f].contours[v], x = [ xn.getCommon(_.edges, m.edges) ];
                        if (En.log(function(e) {
                            return function() {
                                return "	commonEdges = " + y.string(e[0]);
                            };
                        }(x), {
                            fileName: "Polygons.hx",
                            lineNumber: 118,
                            className: "nanofl.engine.geom.Polygons",
                            methodName: "mergeByCommonEdges"
                        }), x[0].length > 0 && u.foreach(x[0], function() {
                            return function(e) {
                                return e.indexIn(t) < 0;
                            };
                        }())) {
                            var A = [ xn.exclude(xn.concatUnique(_.edges, m.edges), x[0]) ];
                            if (En.log(function(e) {
                                return function() {
                                    return "	innerEdges = " + y.string(e[0]);
                                };
                            }(A), {
                                fileName: "Polygons.hx",
                                lineNumber: 122,
                                className: "nanofl.engine.geom.Polygons",
                                methodName: "mergeByCommonEdges"
                            }), En.log(function(t) {
                                return function() {
                                    return "// MERGE " + f + " and " + t[0] + "\n	" + y.string(e[f]) + "\n	" + y.string(e[t[0]]);
                                };
                            }(g), {
                                fileName: "Polygons.hx",
                                lineNumber: 124,
                                className: "nanofl.engine.geom.Polygons",
                                methodName: "mergeByCommonEdges"
                            }), e[f].contours.splice(v, 1), A[0].length > 0) {
                                for (var b = yn.fromEdges(A[0]), w = 0; w < b.length; ) {
                                    var N = b[w];
                                    ++w, N.reverse();
                                }
                                b = b.concat(e[g[0]].contours.slice(1)), e[f].contours = e[f].contours.concat(b), 
                                e[f].assertCorrect();
                            } else e[f].contours = e[f].contours.concat(e[g[0]].contours.slice(1)), e[f].assertCorrect();
                            En.log(function() {
                                return function() {
                                    return "// RESULT\n	" + y.string(e[f]);
                                };
                            }(), {
                                fileName: "Polygons.hx",
                                lineNumber: 142,
                                className: "nanofl.engine.geom.Polygons",
                                methodName: "mergeByCommonEdges"
                            }), e.splice(g[0], 1), f > g[0] && f--, g[0] = -1;
                            break;
                        }
                    }
                }
                g[0]++;
            }
            f++;
        }
        En.assertCorrect(e, !0);
    }, En.removeDublicates = function(e) {
        for (var t = 0; t < e.length; ) {
            for (var n = t + 1; n < e.length; ) e[t].equ(e[n]) ? (e[t].fill = e[n].fill, e.splice(n, 1)) : n++;
            t++;
        }
    }, En.hasDublicates = function(e) {
        for (var t = 0, n = e.length; n > t; ) for (var r = t++, i = r + 1, s = e.length; s > i; ) {
            var a = i++;
            if (e[r].equ(e[a])) return !0;
        }
        return !1;
    }, En.normalize = function(e) {
        for (var t = 0; t < e.length; ) e[t].normalize(), 0 == e[t].contours.length ? e.splice(t, 1) : t++;
        En.log("normalize > removeDublicates vvvvvvvvvvv", {
            fileName: "Polygons.hx",
            lineNumber: 200,
            className: "nanofl.engine.geom.Polygons",
            methodName: "normalize"
        }), En.removeDublicates(e), En.log("normalize > removeDublicates ^^^^^^^^^^^", {
            fileName: "Polygons.hx",
            lineNumber: 202,
            className: "nanofl.engine.geom.Polygons",
            methodName: "normalize"
        }), En.hasDublicates(e) && C.trace("normalize > DUPS DETECTED!!!!!!!", {
            fileName: "Polygons.hx",
            lineNumber: 204,
            className: "nanofl.engine.geom.Polygons",
            methodName: "normalize"
        });
    }, En.getEdges = function(e) {
        for (var t = [], n = 0; n < e.length; ) {
            var r = e[n];
            ++n;
            for (var i = 0, s = r.contours; i < s.length; ) {
                var a = s[i];
                ++i, xn.appendUnique(t, a.edges);
            }
        }
        return t;
    }, En.getByPoint = function(e, t) {
        for (var n = e.length - 1; n >= 0; ) {
            if (e[n].isPointInside(t.x, t.y)) return e[n];
            n--;
        }
        return null;
    }, En.fromEdges = function(e, t, n) {
        Vn.assert(!xn.hasDegenerated(e), "Degenerated edges detected.", {
            fileName: "Polygons.hx",
            lineNumber: 234,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromEdges"
        }), Vn.assert(!xn.hasDuplicates(e), "Duplicated edges detected.", {
            fileName: "Polygons.hx",
            lineNumber: 235,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromEdges"
        }), Vn.assert(!xn.hasDuplicates(t), "Duplicated strokeEdges detected.", {
            fileName: "Polygons.hx",
            lineNumber: 236,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromEdges"
        }), En.log(function() {
            return "Polygons.getReconstructed vvvvvvvvvvvvvvvvvvvvvvvv";
        }, {
            fileName: "Polygons.hx",
            lineNumber: 238,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromEdges"
        });
        var r = yn.fromEdges(e), i = En.fromContours(r, t, function(e) {
            var t = e.getPointInside(), r = En.getByPoint(n, t);
            return null != r ? r.fill : null;
        });
        return En.log(function() {
            return "Polygons.getReconstructed ^^^^^^^^^^^^^^^^^^^^^^^^ result =\n	" + i.join(";\n	");
        }, {
            fileName: "Polygons.hx",
            lineNumber: 249,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromEdges"
        }), i;
    }, En.fromContours = function(e, t, n) {
        for (var r = [], i = 0; i < e.length; ) {
            var s = e[i];
            ++i;
            for (var a = [], l = 0; l < e.length; ) {
                var o = e[l];
                ++l, o != s && o.isNestedTo(s) && a.push(o.clone().reverse());
            }
            yn.removeNested(a), yn.mergeByCommonEdges(a, !0);
            var u = new Nn(null, [ s ].concat(a));
            u.assertCorrect();
            var h = n(u);
            null != h && (u.fill = h, r.push(u));
        }
        return En.mergeByCommonEdges(r, t), r;
    }, En.fromRawContours = function(e, t, n) {
        return En.fromRawContoursInner(e, t, n);
    }, En.fromRawContoursInner = function(e, t, n) {
        var r = yn.getEdges(e);
        En.log(function() {
            return "\n\nPolygons.fromContours vvvvvvvvvvvvvvvvvvvvvvvvv edges = " + r.length;
        }, {
            fileName: "Polygons.hx",
            lineNumber: 312,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromRawContoursInner"
        });
        for (var i = new R(), s = 0; s < e.length; ) {
            var a = e[s];
            ++s;
            var l = a.edges.slice();
            xn.normalize(l), xn.intersectSelf(l);
            var h = yn.fromEdges(l);
            i.set(a, h);
        }
        Vn.assert(o.indexOf(r, null, 0) < 0, null, {
            fileName: "Polygons.hx",
            lineNumber: 323,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromRawContoursInner"
        }), xn.normalize(r), xn.intersectSelf(r);
        var c = yn.fromEdges(r), f = En.fromContours(c, [], function(r) {
            for (var s = r.getPointInside(), a = [], l = 0; l < e.length; ) {
                var o = e[l];
                ++l, u.exists(i.h[o.__id__], function(e) {
                    return e.isPointInsideP(s);
                }) && (a = a.concat(o.edges));
            }
            return xn.isPointInside(a, s.x, s.y, n) ? t : null;
        });
        return En.log(function() {
            return "Polygons.fromContours ^^^^^^^^^^^^^^^^^^^^^^^^^";
        }, {
            fileName: "Polygons.hx",
            lineNumber: 348,
            className: "nanofl.engine.geom.Polygons",
            methodName: "fromRawContoursInner"
        }), f;
    }, En.getEdgesToTestFilling = function(e, t) {
        for (var n = [], r = 0; r < e.length; ) {
            var i = e[r];
            ++r, o.indexOf(n, i, 0) < 0 && i.indexIn(t) >= 0 && n.push(i);
        }
        return n;
    }, En.assertCorrect = function() {}, En.removeErased = function(e) {
        for (var t = 0; t < e.length; ) K.__instanceof(e[t].fill, un) ? e.splice(t, 1) : t++;
    }, En.equ = function(e, t) {
        return mt.equ(e, t) && mt.equ(e.map(function(e) {
            return e.fill;
        }), t.map(function(e) {
            return e.fill;
        }));
    }, En.log = function() {};
    var Sn = function(e, t, n, r) {
        this.x1 = e, this.y1 = t, this.x2 = n, this.y2 = r;
    };
    s["nanofl.engine.geom.StraightLine"] = Sn, Sn.__name__ = [ "nanofl", "engine", "geom", "StraightLine" ], 
    Sn.prototype = {
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        clone: function() {
            return new Sn(this.x1, this.y1, this.x2, this.y2);
        },
        getBounds: function() {
            return {
                minX: Math.min(this.x1, this.x2),
                maxX: Math.max(this.x1, this.x2),
                minY: Math.min(this.y1, this.y2),
                maxY: Math.max(this.y1, this.y2)
            };
        },
        getNearestPoint: function(e, t) {
            var n = this.x2 - this.x1, r = this.y2 - this.y1;
            if (0 == n && 0 == r) return {
                t: 0,
                point: {
                    x: this.x1,
                    y: this.y1
                }
            };
            var i = Math.min(1, Math.max(0, ((e - this.x1) * n + (t - this.y1) * r) / (n * n + r * r)));
            return 1 == i ? {
                t: 1,
                point: {
                    x: this.x2,
                    y: this.y2
                }
            } : {
                t: i,
                point: {
                    x: this.x1 + i * n,
                    y: this.y1 + i * r
                }
            };
        },
        getOrthogonalRayIntersection: function(e, t) {
            var n = this.x2 - this.x1, r = this.y2 - this.y1;
            if (0 == n && 0 == r) return {
                t: 0,
                point: {
                    x: this.x1,
                    y: this.y1
                }
            };
            var i = ((e - this.x1) * n + (t - this.y1) * r) / (n * n + r * r);
            return 1 == i ? {
                t: 1,
                point: {
                    x: this.x2,
                    y: this.y2
                }
            } : {
                t: i,
                point: {
                    x: this.x1 + i * n,
                    y: this.y1 + i * r
                }
            };
        },
        getOrthogonalVector: function() {
            return {
                x: this.y1 - this.y2,
                y: this.x2 - this.x1
            };
        },
        getLength: function() {
            return wn.getDist(this.x1, this.y1, this.x2, this.y2);
        },
        getIntersectionPointX_rightRay: function(e, t) {
            if (Math.max(this.y1, this.y2) >= t && Math.min(this.y1, this.y2) <= t) {
                var n = (t - this.y1) / (this.y2 - this.y1);
                if (this.y1 <= this.y2 && n >= 0 && 1 > n || this.y1 > this.y2 && n > 0 && 1 >= n) {
                    var r = this.x1 + (this.x2 - this.x1) * n;
                    if (r > e) return r;
                }
            }
            return null;
        },
        isIntersect_rightRay: function(e, t) {
            return null != this.getIntersectionPointX_rightRay(e, t);
        },
        getIntersection_straightSection: function(e) {
            if (this.x1 == e.x1 && this.y1 == e.y1 || this.x1 == e.x2 && this.y1 == e.y2) return null;
            if (this.x2 == e.x1 && this.y2 == e.y1 || this.x2 == e.x2 && this.y2 == e.y2) return null;
            var t = this.x1 - this.x2, n = e.x1 - e.x2, r = this.y1 - this.y2, i = e.y1 - e.y2, s = t * i - r * n;
            if (Math.abs(s) < 1e-10) return null;
            var a = this.x1 * this.y2 - this.y1 * this.x2, l = e.x1 * e.y2 - e.y1 * e.x2, o = {
                x: (a * n - t * l) / s,
                y: (a * i - r * l) / s
            };
            return this.inRect(o) && e.inRect(o) ? o : null;
        },
        getIntersection_infinityLine: function(e) {
            var t = this.x1 - this.x2, n = e.x1 - e.x2, r = this.y1 - this.y2, i = e.y1 - e.y2, s = t * i - r * n;
            if (Math.abs(s) < 1e-10) return null;
            var a = this.x1 * this.y2 - this.y1 * this.x2, l = e.x1 * e.y2 - e.y1 * e.x2;
            return {
                x: (a * n - t * l) / s,
                y: (a * i - r * l) / s
            };
        },
        inRect: function(e) {
            return this.x1 == this.x2 ? e.y >= Math.min(this.y1, this.y2) && e.y <= Math.max(this.y1, this.y2) : this.y1 == this.y2 ? e.x >= Math.min(this.x1, this.x2) && e.x <= Math.max(this.x1, this.x2) : e.x >= Math.min(this.x1, this.x2) && e.x <= Math.max(this.x1, this.x2) && e.y >= Math.min(this.y1, this.y2) && e.y <= Math.max(this.y1, this.y2);
        },
        isDegenerated: function() {
            return this.x1 == this.x2 && this.y1 == this.y2;
        },
        getFirstPart: function(e) {
            return new Sn(this.x1, this.y1, this.x1 + (this.x2 - this.x1) * e, this.y1 + (this.y2 - this.y1) * e);
        },
        getSecondPart: function(e) {
            return new Sn(this.x1 + (this.x2 - this.x1) * e, this.y1 + (this.y2 - this.y1) * e, this.x2, this.y2);
        },
        split: function(e) {
            for (var t = 0; t < e.length; ) {
                var n = e[t];
                ++t, Vn.assert(!isNaN(n), "t = " + n, {
                    fileName: "StraightLine.hx",
                    lineNumber: 157,
                    className: "nanofl.engine.geom.StraightLine",
                    methodName: "split"
                });
            }
            if (0 == e.length) return [ this.clone() ];
            if (1 == e.length) {
                var r = this.getPoint(e[0]);
                return [ new Sn(this.x1, this.y1, r.x, r.y), new Sn(r.x, r.y, this.x2, this.y2) ];
            }
            for (var i = [], s = {
                x: this.x1,
                y: this.y1
            }, a = 0; a < e.length; ) {
                var l = e[a];
                ++a;
                var o = this.getPoint(l);
                i.push(new Sn(s.x, s.y, o.x, o.y)), s = o;
            }
            return i.push(new Sn(s.x, s.y, this.x2, this.y2)), i;
        },
        getPoint: function(e) {
            return {
                x: this.x1 + (this.x2 - this.x1) * e,
                y: this.y1 + (this.y2 - this.y1) * e
            };
        },
        getTangent: function() {
            return Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
        },
        toString: function() {
            return "line(" + this.x1 + ", " + this.y1 + ", " + this.x2 + ", " + this.y2 + ")";
        },
        __class__: Sn
    };
    var Cn = function(e, t, n, r, i, s, a, l) {
        null == l && (l = !1), _n.call(this, e, t, n, r, i, s), this.stroke = a, this.selected = l;
    };
    s["nanofl.engine.geom.StrokeEdge"] = Cn, Cn.__name__ = [ "nanofl", "engine", "geom", "StrokeEdge" ], 
    Cn.__interfaces__ = [ Tt ], Cn.fromEdge = function(e, t, n) {
        return null == n && (n = !1), new Cn(e.x1, e.y1, e.x2, e.y2, e.x3, e.y3, t, n);
    }, Cn.__super__ = _n, Cn.prototype = n(_n.prototype, {
        stroke: null,
        selected: null,
        getNearestPointUseStrokeSize: function(e, t) {
            var n = this.getNearestPoint(e, t);
            return wn.moveInDirection(n.point, e, t, null != this.stroke ? this.stroke.thickness / 2 : 0), 
            n;
        },
        addTo: function(e) {
            var t = this.indexIn(e);
            t >= 0 ? e[t].stroke = this.stroke : e.push(this);
        },
        transform: function(e, t) {
            null == t && (t = !0), _n.prototype.transform.call(this, e), null != this.stroke && (this.stroke = this.stroke.getTransformed(e, t));
        },
        translate: function(e, t) {
            _n.prototype.translate.call(this, e, t), null != this.stroke && (this.stroke = this.stroke.getTransformed(new bn(1, 0, 0, 1, e, t), !1));
        },
        clone: function() {
            return new Cn(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.stroke.clone(), this.selected);
        },
        duplicate: function(e) {
            return new Cn(e.x1, e.y1, e.x2, e.y2, e.x3, e.y3, this.stroke, this.selected);
        },
        split: function(e) {
            return _n.prototype.split.call(this, e).map(function(e, t, n) {
                return function(r) {
                    return e(r, t, n);
                };
            }(Cn.fromEdge, this.stroke, this.selected));
        },
        toString: function() {
            return this.isStraight() ? "new StrokeEdge(" + this.x1 + "," + this.y1 + ", " + this.x3 + "," + this.y3 + ", " + y.string(this.stroke) + ", " + y.string(this.selected) + ")" : "new StrokeEdge(" + this.x1 + "," + this.y1 + ", " + this.x2 + "," + this.y2 + ", " + this.x3 + "," + this.y3 + ", " + y.string(this.stroke) + ", " + y.string(this.selected) + ")";
        },
        __class__: Cn
    });
    var Pn = function() {};
    s["nanofl.engine.geom.StrokeEdges"] = Pn, Pn.__name__ = [ "nanofl", "engine", "geom", "StrokeEdges" ], 
    Pn.load = function(e, t) {
        Vn.assert("edge" == e.name, null, {
            fileName: "StrokeEdges.hx",
            lineNumber: 15,
            className: "nanofl.engine.geom.StrokeEdges",
            methodName: "load"
        });
        var n = y.int(U.getAttr(e, "strokeIndex", -1));
        return Vn.assert(n >= 0, null, {
            fileName: "StrokeEdges.hx",
            lineNumber: 18,
            className: "nanofl.engine.geom.StrokeEdges",
            methodName: "load"
        }), Vn.assert(n < t.length, null, {
            fileName: "StrokeEdges.hx",
            lineNumber: 19,
            className: "nanofl.engine.geom.StrokeEdges",
            methodName: "load"
        }), xn.load(e.getAttribute("edges")).map(function(e) {
            return Cn.fromEdge(e, t[n]);
        });
    }, Pn.save = function(e, t, n) {
        for (var r = Pn.getStrokeGroups(e, t), i = 0, s = r.length; s > i; ) {
            var a = i++;
            n.begin("edge").attr("strokeIndex", a), n.attr("edges", xn.save(r[a])), n.end();
        }
    }, Pn.getStrokeGroups = function(e, t) {
        for (var n = [], r = 0, i = t.length; i > r; ) {
            {
                r++;
            }
            n.push([]);
        }
        for (var s = 0; s < e.length; ) {
            var a = [ e[s] ];
            ++s;
            var l = Jn.findIndex(t, function(e) {
                return function(t) {
                    return t.equ(e[0].stroke);
                };
            }(a));
            n[l].push(a[0]);
        }
        return n;
    }, Pn.getBounds = function(e, t) {
        if (e.length > 0) {
            null == t && (t = {
                minX: 1e100,
                minY: 1e100,
                maxX: -1e100,
                maxY: -1e100
            });
            for (var n = 0; n < e.length; ) {
                var r = e[n];
                ++n;
                var i = r.getBounds(), s = r.stroke.thickness / 2;
                t.minX = Math.min(t.minX, i.minX - s), t.minY = Math.min(t.minY, i.minY - s), t.maxX = Math.max(t.maxX, i.maxX + s), 
                t.maxY = Math.max(t.maxY, i.maxY + s);
            }
        }
        return t;
    }, Pn.processStrokes = function(e, t) {
        for (var n = new R(), r = 0; r < e.length; ) {
            var i = e[r];
            ++r;
            var s = n.h[i.stroke.__id__];
            null == s && (s = i.stroke.clone(), t(s), n.set(i.stroke, s)), i.stroke = s;
        }
    }, Pn.drawSorted = function(e, t, n) {
        Pn.sort(e);
        for (var r = 0; r < e.length; ) {
            for (var i = r + 1; i < e.length && e[r].stroke.equ(e[i].stroke); ) i++;
            e[r].stroke.begin(t), xn.draw(e.slice(r, i), t, !0), t.endStroke(), r = i;
        }
        if (xn.showSelection && (e = e.filter(function(e) {
            return e.selected;
        }), e.length > 0)) for (var s = 0; s < e.length; ) {
            for (var a = s + 1; a < e.length && e[s].stroke.equ(e[a].stroke); ) a++;
            new Yn(e[s].stroke, n).begin(t), xn.draw(e.slice(s, a), t, !0), t.endStroke(), s = a;
        }
    }, Pn.sort = function(e) {
        for (var t = 1; t < e.length; ) {
            for (;t < e.length && e[t - 1].stroke.equ(e[t].stroke); ) t++;
            for (var n = t, r = e.length; r > n; ) {
                var i = n++;
                if (e[t].stroke.equ(e[i].stroke)) {
                    var s = e[t];
                    e[t] = e[i], e[i] = s, t++;
                }
            }
            t++;
        }
        for (var a = 0; a < e.length; ) {
            for (var l = a + 1; l < e.length && e[a].stroke.equ(e[l].stroke); ) l++;
            Pn.sortToProduceSequences(e, a, l), a = l;
        }
    }, Pn.sortToProduceSequences = function(e, t, n) {
        for (var r = t, i = r + 1; n > i; ) if (n > r + 1 && e[r].x3 == e[i].x1 && e[r].y3 == e[i].y1) mt.swap(e, r + 1, i), 
        r++, i = r + 1; else if (n > r + 1 && e[r].x3 == e[i].x3 && e[r].y3 == e[i].y3) e[i].reverse(), 
        mt.swap(e, r + 1, i), r++, i = r + 1; else if (e[t].x1 == e[i].x3 && e[t].y1 == e[i].y3) {
            for (var s = e[i], a = i; a > t; ) e[a] = e[a - 1], a--;
            e[t] = s, r++, i = r + 1;
        } else if (e[i].x1 == e[t].x1 && e[i].y1 == e[t].y1) {
            e[i].reverse();
            for (var l = e[i], o = i; o > t; ) e[o] = e[o - 1], o--;
            e[t] = l, r++, i = r + 1;
        } else i++;
        n > r + 2 && Pn.sortToProduceSequences(e, r + 1, n);
    }, Pn.fromEdges = function(e, t, n) {
        return null == n && (n = !1), e.map(function(e) {
            return Cn.fromEdge(e, t, n);
        });
    }, Pn.replace = function(e, t, n) {
        xn.replace(e, t, n.filter(function(t) {
            return t.indexIn(e) < 0;
        }));
    }, Pn.equ = function(e, t) {
        return mt.equ(e, t) && mt.equ(e.map(function(e) {
            return e.stroke;
        }), t.map(function(e) {
            return e.stroke;
        }));
    };
    var In = function(e) {
        this.namePath = e;
    };
    s["nanofl.engine.libraryitems.LibraryItem"] = In, In.__name__ = [ "nanofl", "engine", "libraryitems", "LibraryItem" ], 
    In.parse = function(e, t) {
        var n = On.parse(e, t);
        if (null != n) return n;
        var r = kn.parse(e, t);
        if (null != r) return r;
        var i = Fn.parse(e, t);
        if (null != i) return i;
        var s = Rn.parse(e, t);
        if (null != s) return s;
        var a = Bn.parse(e, t);
        if (null != a) return a;
        var l = jn.parse(e, t);
        if (null != l) return l;
        var o = Mn.parse(e, t);
        return null != o ? o : null;
    }, In.prototype = {
        library: null,
        namePath: null,
        getType: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "LibraryItem.hx",
                lineNumber: 22,
                className: "nanofl.engine.libraryitems.LibraryItem",
                methodName: "getType"
            });
        },
        getIcon: function() {
            return "";
        },
        copyBaseProperties: function(e) {
            e.library = this.library, e.namePath = this.namePath;
        },
        clone: function() {
            return Vn.methodNotSupported(this, {
                fileName: "LibraryItem.hx",
                lineNumber: 32,
                className: "nanofl.engine.libraryitems.LibraryItem",
                methodName: "clone"
            });
        },
        loadProperties: function() {},
        saveProperties: function() {},
        save: function() {},
        hasXmlToSave: function() {
            return !1;
        },
        saveToXml: function() {},
        preload: function(e) {
            e();
        },
        setLibrary: function(e) {
            this.library = e;
        },
        duplicate: function(e) {
            var t = this.clone();
            return t.namePath = e, null != this.library && this.library.addItem(t), t;
        },
        remove: function() {
            null != this.library && this.library.removeItem(this.namePath);
        },
        getNotSerializableFields: function() {
            return [];
        },
        hxSerialize: function(e) {
            for (var t = f.fields(this), n = this.getNotSerializableFields(), r = [], i = 0; i < t.length; ) {
                var s = t[i];
                ++i;
                var a = f.field(this, s);
                null != a && !f.isFunction(a) && o.indexOf(n, s, 0) < 0 && (r.push(s), r.push(a));
            }
            e.serialize(r);
        },
        hxUnserialize: function(e) {
            for (var t = e.unserialize(), n = 0, r = t.length >> 1; r > n; ) {
                var i = n++;
                f.setField(this, t[2 * i], t[2 * i + 1]);
            }
        },
        equ: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "LibraryItem.hx",
                lineNumber: 131,
                className: "nanofl.engine.libraryitems.LibraryItem",
                methodName: "equ"
            });
        },
        toString: function() {
            return "Item(" + this.namePath + ")";
        },
        __class__: In
    };
    var Tn = function(e) {
        this.linkedClass = "", In.call(this, e);
    };
    s["nanofl.engine.libraryitems.InstancableItem"] = Tn, Tn.__name__ = [ "nanofl", "engine", "libraryitems", "InstancableItem" ], 
    Tn.__super__ = In, Tn.prototype = n(In.prototype, {
        linkedClass: null,
        hasXmlToSave: function() {
            return In.prototype.hasXmlToSave.call(this) || "" != this.linkedClass;
        },
        loadProperties: function(e) {
            In.prototype.loadProperties.call(this, e), this.linkedClass = U.getAttr(e, "linkedClass", "");
        },
        saveProperties: function(e) {
            In.prototype.saveProperties.call(this, e), e.attr("linkedClass", this.linkedClass, "");
        },
        copyBaseProperties: function(e) {
            In.prototype.copyBaseProperties.call(this, e), e.linkedClass = this.linkedClass;
        },
        newInstance: function() {
            Vn.assert(null != this.library, "You must add symbol '" + this.namePath + "' to library before newInstance() call.", {
                fileName: "InstancableItem.hx",
                lineNumber: 37,
                className: "nanofl.engine.libraryitems.InstancableItem",
                methodName: "newInstance"
            });
            var e = new tn(this.namePath);
            return e.setLibrary(this.library), e;
        },
        getDisplayObjectClassName: function() {
            return Vn.methodMustBeOverriden(this, {
                fileName: "InstancableItem.hx",
                lineNumber: 43,
                className: "nanofl.engine.libraryitems.InstancableItem",
                methodName: "getDisplayObjectClassName"
            });
        },
        createDisplayObject: function() {
            if ("" != this.linkedClass) {
                var e = window[this.linkedClass];
                if (null != e) return new e(this);
                C.trace("Linkage class '" + this.linkedClass + "' is not found.", {
                    fileName: "InstancableItem.hx",
                    lineNumber: 54,
                    className: "nanofl.engine.libraryitems.InstancableItem",
                    methodName: "createDisplayObject"
                });
            }
            return null;
        },
        updateDisplayObject: function() {
            Vn.methodMustBeOverriden(this, {
                fileName: "InstancableItem.hx",
                lineNumber: 60,
                className: "nanofl.engine.libraryitems.InstancableItem",
                methodName: "updateDisplayObject"
            });
        },
        getNearestPoint: function() {
            return {
                x: 1e100,
                y: 1e100
            };
        },
        __class__: Tn
    });
    var kn = function(e, t) {
        Tn.call(this, e), this.ext = t;
    };
    s["nanofl.engine.libraryitems.BitmapItem"] = kn, kn.__name__ = [ "nanofl", "engine", "libraryitems", "BitmapItem" ], 
    kn.__interfaces__ = [ Mt ], kn.parse = function(e, t) {
        if ("bitmap" != t.name) return null;
        var n = new kn(e, t.getAttribute("ext"));
        return n.loadProperties(t), n;
    }, kn.__super__ = Tn, kn.prototype = n(Tn.prototype, {
        ext: null,
        textureAtlas: null,
        image: null,
        getNotSerializableFields: function() {
            return Tn.prototype.getNotSerializableFields.call(this).concat([ "image" ]);
        },
        getType: function() {
            return "bitmap";
        },
        clone: function() {
            var e = new kn(this.namePath, this.ext);
            return e.textureAtlas = this.textureAtlas, e.image = this.image, this.copyBaseProperties(e), 
            e;
        },
        getIcon: function() {
            return "custom-icon-picture";
        },
        save: function(e) {
            var t = this.library.libraryDir + "/" + this.namePath + ".xml";
            if (this.hasXmlToSave()) {
                var n = new V();
                this.saveToXml(n), e.saveContent(t, n.toString());
            } else e.remove(t);
        },
        hasXmlToSave: function() {
            return Tn.prototype.hasXmlToSave.call(this) || null != this.textureAtlas && "" != this.textureAtlas;
        },
        saveToXml: function(e) {
            e.begin("bitmap").attr("version", Ut.document), this.saveProperties(e), e.end();
        },
        loadProperties: function(e) {
            Tn.prototype.loadProperties.call(this, e), this.textureAtlas = U.getAttr(e, "textureAtlas", null);
        },
        saveProperties: function(e) {
            Tn.prototype.saveProperties.call(this, e), e.attr("ext", this.ext, null), e.attr("textureAtlas", this.textureAtlas, null);
        },
        getUrl: function() {
            return this.library.realUrl(this.namePath + "." + this.ext);
        },
        preload: function(e) {
            var t = this;
            Vn.assert(null != this.library, "You need to add item '" + this.namePath + "' to the library before preload call.", {
                fileName: "BitmapItem.hx",
                lineNumber: 106,
                className: "nanofl.engine.libraryitems.BitmapItem",
                methodName: "preload"
            }), null == Yt.getSpriteSheet(this) ? Bt.image(this.getUrl(), function(n) {
                t.image = n, e();
            }) : Yt.preload(this, e);
        },
        createDisplayObject: function(e, t) {
            var n = Tn.prototype.createDisplayObject.call(this, e, t);
            if (null == n) {
                var r = Yt.getSpriteSheet(this);
                n = null == r ? new nt(this) : new createjs.Sprite(r);
            }
            return n.setBounds(0, 0, this.image.width, this.image.height), n;
        },
        updateDisplayObject: function(e) {
            Vn.assert(K.__instanceof(e, createjs.Bitmap), null, {
                fileName: "BitmapItem.hx",
                lineNumber: 142,
                className: "nanofl.engine.libraryitems.BitmapItem",
                methodName: "updateDisplayObject"
            }), e.image = this.image, e.setBounds(0, 0, this.image.width, this.image.height);
        },
        getDisplayObjectClassName: function() {
            return "nanofl.Bitmap";
        },
        equ: function(e) {
            return e.namePath != this.namePath ? !1 : K.__instanceof(e, kn) ? e.ext != this.ext ? !1 : !0 : !1;
        },
        getNearestPoint: function(e) {
            var t = {
                minX: 0,
                minY: 0,
                maxX: this.image.width + 0,
                maxY: this.image.height + 0
            };
            return pn.getNearestPoint(t, e);
        },
        toString: function() {
            return "BitmapItem(" + this.namePath + ")";
        },
        __class__: kn
    });
    var Mn = function(e) {
        this.opened = !1, In.call(this, e);
    };
    s["nanofl.engine.libraryitems.FolderItem"] = Mn, Mn.__name__ = [ "nanofl", "engine", "libraryitems", "FolderItem" ], 
    Mn.parse = function(e, t) {
        return "folder" != t.name ? null : new Mn(e);
    }, Mn.__super__ = In, Mn.prototype = n(In.prototype, {
        opened: null,
        clone: function() {
            var e = new Mn(this.namePath);
            return e.opened = this.opened, this.copyBaseProperties(e), e;
        },
        save: function(e) {
            e.createDirectory(this.library.libraryDir + "/" + this.namePath);
        },
        hasXmlToSave: function() {
            return !0;
        },
        saveToXml: function(e) {
            e.begin("folder").attr("version", Ut.document), this.saveProperties(e), e.end();
        },
        getIcon: function() {
            return this.opened ? "custom-icon-folder-open" : "custom-icon-folder-close";
        },
        toString: function() {
            return "FolderItem(" + this.namePath + ")";
        },
        equ: function(e) {
            return e.namePath != this.namePath ? !1 : K.__instanceof(e, Mn) ? !0 : !1;
        },
        __class__: Mn
    });
    var Rn = function(e, t) {
        In.call(this, e), this.variants = t;
    };
    s["nanofl.engine.libraryitems.FontItem"] = Rn, Rn.__name__ = [ "nanofl", "engine", "libraryitems", "FontItem" ], 
    Rn.parse = function(e, t) {
        if ("font" != t.name) return null;
        var n = t.getAttribute("version");
        (null == n || "" == n) && (n = "1.0.0");
        for (var r = [], i = 0, s = t.children; i < s.length; ) {
            var a = [ s[i] ];
            if (++i, "variant" == a[0].name) {
                var l = [ new At(U.getAttr(a[0], "style", "normal"), U.getAttr(a[0], "weight", 400), U.getAttr(a[0], "locals", "").split(",").map(x.trim).filter(function() {
                    return function(e) {
                        return "" != e;
                    };
                }())) ];
                Ut.handle(n, function() {
                    var e, t = new O();
                    return null != vr["1.0.0"] ? t.setReserved("1.0.0", function(e, t) {
                        return function() {
                            var n = U.getAttr(t[0], "format", ""), r = U.getAttr(t[0], "url", "");
                            e[0].urls.set(n, r);
                        };
                    }(l, a)) : t.h["1.0.0"] = function(e, t) {
                        return function() {
                            var n = U.getAttr(t[0], "format", ""), r = U.getAttr(t[0], "url", "");
                            e[0].urls.set(n, r);
                        };
                    }(l, a), null != vr["2.0.0"] ? t.setReserved("2.0.0", function(e, t) {
                        return function() {
                            for (var n = 0, r = t[0].children; n < r.length; ) {
                                var i = r[n];
                                ++n;
                                var s = U.getAttr(i, "format", ""), a = U.getAttr(i, "url", "");
                                e[0].urls.set(s, a);
                            }
                        };
                    }(l, a)) : t.h["2.0.0"] = function(e, t) {
                        return function() {
                            for (var n = 0, r = t[0].children; n < r.length; ) {
                                var i = r[n];
                                ++n;
                                var s = U.getAttr(i, "format", ""), a = U.getAttr(i, "url", "");
                                e[0].urls.set(s, a);
                            }
                        };
                    }(l, a), e = t;
                }(this)), r.push(l[0]);
            }
        }
        return new Rn(e, r);
    }, Rn.__super__ = In, Rn.prototype = n(In.prototype, {
        variants: null,
        getType: function() {
            return "font";
        },
        clone: function() {
            var e = new Rn(this.namePath, this.variants.slice());
            return this.copyBaseProperties(e), e;
        },
        getIcon: function() {
            return "icon-font";
        },
        save: function(e) {
            var t = new V();
            this.saveToXml(t), e.saveContent(this.library.libraryDir + "/" + this.namePath + ".xml", t.toString());
        },
        hasXmlToSave: function() {
            return !0;
        },
        saveToXml: function(e) {
            e.begin("font").attr("version", Ut.document);
            for (var t = 0, n = this.variants; t < n.length; ) {
                var r = n[t];
                ++t, e.begin("variant").attr("style", r.style).attr("weight", r.weight).attr("locals", r.locals.join(", "));
                for (var i = r.urls.keys(); i.hasNext(); ) {
                    var s = i.next();
                    e.begin("file").attr("format", s).attr("url", r.urls.get(s)), e.end();
                }
                e.end();
            }
            e.end();
        },
        toFont: function() {
            return {
                family: L.withoutDirectory(this.namePath),
                fallbacks: [],
                variants: this.variants
            };
        },
        preload: function(e) {
            Vn.assert(null != this.library, "You need to add item '" + this.namePath + "' to the library before preload call.", {
                fileName: "FontItem.hx",
                lineNumber: 116,
                className: "nanofl.engine.libraryitems.FontItem",
                methodName: "preload"
            });
            for (var t = L.withoutDirectory(this.namePath), n = this.variants.length, r = 0, i = this.variants; r < i.length; ) {
                var s = [ i[r] ];
                ++r, this.getExistsSupportedFormat(s[0], function(r) {
                    return function(i) {
                        if (null != i) {
                            var s = new FontFace(t, "url(" + r[0].urls.get(i) + ') format("' + i + '")', {
                                style: r[0].style,
                                weight: null == r[0].weight ? "null" : "" + r[0].weight
                            });
                            s.load().then(function() {
                                return function(t) {
                                    n--, window.document.fonts.add(t), 0 == n && e();
                                };
                            }(), function(r) {
                                return function(s) {
                                    C.trace("Font '" + t + "' loading error ('" + r[0].urls.get(i) + "'):", {
                                        fileName: "FontItem.hx",
                                        lineNumber: 143,
                                        className: "nanofl.engine.libraryitems.FontItem",
                                        methodName: "preload"
                                    }), C.trace(s, {
                                        fileName: "FontItem.hx",
                                        lineNumber: 144,
                                        className: "nanofl.engine.libraryitems.FontItem",
                                        methodName: "preload"
                                    }), n--, 0 == n && e();
                                };
                            }(r));
                        } else C.trace("Can't found suitable font file format ('" + t + " " + r[0].style + " " + r[0].weight + "').", {
                            fileName: "FontItem.hx",
                            lineNumber: 152,
                            className: "nanofl.engine.libraryitems.FontItem",
                            methodName: "preload"
                        }), n--, 0 == n && e();
                    };
                }(s));
            }
        },
        getExistsSupportedFormat: function(e, t) {
            window.fontSupport(function(n) {
                t(n.woff2 && e.urls.exists("woff2") ? "woff2" : n.woff && e.urls.exists("woff") ? "woff" : n.ttf && e.urls.exists("truetype") ? "truetype" : n.svg && e.urls.exists("svg") ? "svg" : e.urls.exists("eot") ? "eot" : null);
            });
        },
        addVariant: function(e) {
            var t = function(e) {
                return function(t) {
                    return u.find(e, t);
                };
            }(this.variants)(function(t) {
                return e.style == t.style && e.weight == t.weight;
            });
            if (null != t) for (var n = e.urls.keys(); n.hasNext(); ) {
                var r = n.next(), i = e.urls.get(r);
                t.urls.set(r, i);
            } else this.variants.push(e);
        },
        equ: function(e) {
            return e.namePath != this.namePath ? !1 : K.__instanceof(e, Rn) && mt.equ(e.variants, this.variants) ? !0 : !1;
        },
        toString: function() {
            return "FontItem(" + this.namePath + ")";
        },
        __class__: Rn
    });
    var Fn = function(e, t, n) {
        this.size = 100, Tn.call(this, e), this.ext = t, this.originalExt = n;
    };
    s["nanofl.engine.libraryitems.MeshItem"] = Fn, Fn.__name__ = [ "nanofl", "engine", "libraryitems", "MeshItem" ], 
    Fn.__interfaces__ = [ Mt ], Fn.parse = function(e, t) {
        if ("three" != t.name) return null;
        var n = new Fn(e, t.getAttribute("ext"), t.getAttribute("originalExt"));
        return n.loadProperties(t), n;
    }, Fn.__super__ = Tn, Fn.prototype = n(Tn.prototype, {
        ext: null,
        originalExt: null,
        textureAtlas: null,
        size: null,
        data: null,
        getNotSerializableFields: function() {
            return Tn.prototype.getNotSerializableFields.call(this).concat([ "data" ]);
        },
        getType: function() {
            return "three";
        },
        clone: function() {
            var e = new Fn(this.namePath, this.ext, this.originalExt);
            return e.textureAtlas = this.textureAtlas, e.size = this.size, e.data = this.data, 
            this.copyBaseProperties(e), e;
        },
        getIcon: function() {
            return "custom-icon-cube";
        },
        save: function(e) {
            var t = this.library.libraryDir + "/" + this.namePath + ".xml";
            if (this.hasXmlToSave()) {
                var n = new V();
                this.saveToXml(n), e.saveContent(t, n.toString());
            } else e.remove(t);
        },
        hasXmlToSave: function() {
            return Tn.prototype.hasXmlToSave.call(this) || null != this.originalExt && "" != this.originalExt || null != this.textureAtlas && "" != this.textureAtlas;
        },
        saveToXml: function(e) {
            e.begin("three").attr("version", Ut.document), this.saveProperties(e), e.end();
        },
        loadProperties: function(e) {
            Tn.prototype.loadProperties.call(this, e), this.originalExt = U.getAttr(e, "originalExt", null), 
            this.textureAtlas = U.getAttr(e, "textureAtlas", null);
        },
        saveProperties: function(e) {
            Tn.prototype.saveProperties.call(this, e), e.attr("ext", this.ext, null), e.attr("originalExt", this.originalExt, null), 
            e.attr("textureAtlas", this.textureAtlas, null);
        },
        getUrl: function() {
            return this.library.realUrl(this.namePath + "." + this.ext);
        },
        preload: function(e) {
            Vn.assert(null != this.library, "You need to add item '" + this.namePath + "' to the library before preload call.", {
                fileName: "MeshItem.hx",
                lineNumber: 134,
                className: "nanofl.engine.libraryitems.MeshItem",
                methodName: "preload"
            }), null == Yt.getSpriteSheet(this) ? this.preloadInner(e) : Yt.preload(this, e);
        },
        preloadInner: function(e) {
            var t = this;
            Bt.file(this.getUrl(), function(n) {
                var r = t.ext.toLowerCase();
                switch (r) {
                  case "json":
                    var i = ir.parse(n), s = new THREE.JSONLoader();
                    t.data = s.parse(i, t.library.libraryDir), t.data.geometry.computeBoundingSphere();
                }
                e();
            });
        },
        createDisplayObject: function(e, t) {
            var n = Tn.prototype.createDisplayObject.call(this, e, t);
            if (null == n) {
                var r = Yt.getSpriteSheet(this);
                n = null == r ? new lt(this) : new createjs.Sprite(r);
            }
            return n;
        },
        updateDisplayObject: function(e) {
            Vn.assert(K.__instanceof(e, lt), null, {
                fileName: "MeshItem.hx",
                lineNumber: 186,
                className: "nanofl.engine.libraryitems.MeshItem",
                methodName: "updateDisplayObject"
            }), e.update();
        },
        getDisplayObjectClassName: function() {
            return "nanofl.Mesh";
        },
        equ: function(e) {
            return e.namePath != this.namePath ? !1 : K.__instanceof(e, Fn) ? e.ext != this.ext ? !1 : !0 : !1;
        },
        getNearestPoint: function(e) {
            var t = {
                minX: 0,
                minY: 0,
                maxX: this.size + 0,
                maxY: this.size + 0
            };
            return pn.getNearestPoint(t, e);
        },
        toString: function() {
            return "MeshItem(" + this.namePath + ")";
        },
        __class__: Fn
    });
    var On = function(e) {
        this.exportAsSpriteSheet = !1, this.loop = !0, this.autoPlay = !0, this.likeButton = !1, 
        this._layers = [];
        var t = this;
        Object.defineProperty(this, "layers", {
            get: function() {
                return t._layers;
            }
        }), Tn.call(this, e), this._layers = [];
    };
    s["nanofl.engine.libraryitems.MovieClipItem"] = On, On.__name__ = [ "nanofl", "engine", "libraryitems", "MovieClipItem" ], 
    On.__interfaces__ = [ Mt, kt, Ct, Rt, Pt ], On.parse = function(e, t) {
        if ("movieclip" != t.name) return null;
        var n = t.getAttribute("version");
        (null == n || "" == n) && (n = "1.0.0");
        var r = new On(e);
        r.loadProperties(t);
        for (var i = [], s = 0, a = t.children; s < a.length; ) {
            var l = a[s];
            ++s, "layer" == l.name && i.push(Ft.parse(l, n));
        }
        return r.addLayersBlock(i), r;
    }, On.createWithFrame = function(e, t, n) {
        null == n && (n = "Layer 0");
        var r = new On(e), i = new Ft(n);
        return r.addLayer(i), i.addKeyFrame(new Nt(null, null, null, t)), r;
    }, On.__super__ = Tn, On.prototype = n(Tn.prototype, {
        _layers: null,
        layers: null,
        get_layers: function() {
            return this._layers;
        },
        likeButton: null,
        autoPlay: null,
        loop: null,
        exportAsSpriteSheet: null,
        textureAtlas: null,
        getType: function() {
            return "movieclip";
        },
        clone: function() {
            var e = new On(this.namePath);
            e._layers = [];
            for (var t = o.iter(this.layers); t.hasNext(); ) {
                var n = t.next();
                e.addLayer(n.clone());
            }
            return e.likeButton = this.likeButton, e.autoPlay = this.autoPlay, e.loop = this.loop, 
            e.exportAsSpriteSheet = this.exportAsSpriteSheet, e.textureAtlas = this.textureAtlas, 
            this.copyBaseProperties(e), e;
        },
        addLayer: function(e) {
            e.layersContainer = this, this._layers.push(e);
        },
        addLayersBlock: function(e, t) {
            (null == t || 0 > t || t > this.layers.length) && (t = this.layers.length);
            for (var n = o.iter(this.layers); n.hasNext(); ) {
                var r = n.next();
                null != r.parentIndex && r.parentIndex >= t && (r.parentIndex += e.length);
            }
            for (var i = t, s = 0; s < e.length; ) {
                var a = e[s];
                ++s, a.layersContainer = this, null != a.parentIndex && (a.parentIndex += t), this._layers.splice(i, 0, a), 
                i++;
            }
        },
        removeLayer: function(e) {
            this._layers.splice(e, 1);
            for (var t = o.iter(this.layers); t.hasNext(); ) {
                var n = t.next();
                null != n.parentIndex && (n.parentIndex == e ? n.parentIndex = null : n.parentIndex > e && n.parentIndex--);
            }
        },
        removeLayerWithChildren: function(e) {
            for (var t = e + 1; t < this.layers.length && this.isLayerChildOf(t, e); ) t++;
            for (var n = 0, r = this.layers.slice(t); n < r.length; ) {
                var i = r[n];
                ++n, null != i.parentIndex && (i.parentIndex -= t - e);
            }
            for (var s = this._layers.splice(e, t - e), a = 0; a < s.length; ) {
                var l = s[a];
                ++a, l.parentIndex -= e;
            }
            return s[0].parentIndex = null, s;
        },
        isLayerChildOf: function(e, t) {
            var n = this.layers[e].parentIndex;
            return null == n ? !1 : n == t ? !0 : this.isLayerChildOf(n, t);
        },
        getFramesAt: function(e) {
            for (var t = [], n = this.layers.length - 1; n >= 0; ) {
                if (this.layers[n].visible) {
                    var r = this.layers[n].getFrame(e);
                    null != r && t.push(r);
                }
                n--;
            }
            return t;
        },
        getIcon: function() {
            return this.namePath == Ot.SCENE_NAME_PATH ? "custom-icon-scene" : this.likeButton ? "custom-icon-button" : "custom-icon-film";
        },
        save: function(e) {
            var t = new V();
            this.saveToXml(t), e.saveContent(this.library.libraryDir + "/" + this.namePath + ".xml", t.toString());
        },
        loadProperties: function(e) {
            this.likeButton = U.getAttr(e, "likeButton", !1), this.exportAsSpriteSheet = U.getAttr(e, "exportAsSpriteSheet", !1), 
            this.autoPlay = U.getAttr(e, "autoPlay", !0), this.loop = U.getAttr(e, "loop", !0), 
            this.textureAtlas = U.getAttr(e, "textureAtlas", null), Tn.prototype.loadProperties.call(this, e);
        },
        saveProperties: function(e) {
            e.attr("likeButton", this.likeButton, !1), e.attr("exportAsSpriteSheet", this.exportAsSpriteSheet, !1), 
            e.attr("autoPlay", this.autoPlay, !0), e.attr("loop", this.loop, !0), e.attr("textureAtlas", this.textureAtlas, null), 
            Tn.prototype.saveProperties.call(this, e);
        },
        hasXmlToSave: function() {
            return !0;
        },
        saveToXml: function(e) {
            e.begin("movieclip").attr("version", Ut.document), this.saveProperties(e);
            for (var t = o.iter(this.layers); t.hasNext(); ) {
                var n = t.next();
                n.save(e);
            }
            e.end();
        },
        getTotalFrames: function() {
            for (var e = 0, t = o.iter(this.layers); t.hasNext(); ) {
                var n = t.next();
                e = er.max(e, n.getTotalFrames());
            }
            return e;
        },
        setLibrary: function(e) {
            Tn.prototype.setLibrary.call(this, e);
            for (var t = o.iter(this.layers); t.hasNext(); ) {
                var n = t.next();
                n.setLibrary(e);
            }
        },
        createDisplayObject: function(e, t) {
            var n = Tn.prototype.createDisplayObject.call(this, e, t);
            if (null != n) return n;
            var r = Yt.getSpriteSheet(this);
            return null == r && this.exportAsSpriteSheet && (r = this.asSpriteSheet()), null == r ? this.likeButton ? new it(this) : new rt(this, e, t) : this.likeButton ? new ht(r) : new createjs.Sprite(r, e);
        },
        updateDisplayObject: function(e, t) {
            if (this.exportAsSpriteSheet) ; else {
                Vn.assert(K.__instanceof(e, rt), null, {
                    fileName: "MovieClipItem.hx",
                    lineNumber: 295,
                    className: "nanofl.engine.libraryitems.MovieClipItem",
                    methodName: "updateDisplayObject"
                });
                var n = e;
                n.removeAllChildren(), n.alpha = 1;
                for (var r = null, i = null, s = this.layers.length - 1; s >= 0; ) {
                    for (var a = 0, l = this.layers[s].getTweenedElements(n.currentFrame); a < l.length; ) {
                        var o = l[a];
                        if (++a, null == t || 0 == t.length || t[0].element != o.original) {
                            var u = o.current.createDisplayObject(t);
                            u.visible = "normal" == this.layers[s].type, n.addChildToLayer(u, s);
                        } else null != t && 0 != t.length && t[0].element == o.original && (r = o.current, 
                        i = s);
                    }
                    s--;
                }
                null != r && n.addChildToLayer(r.createDisplayObject(t), i);
            }
        },
        spriteSheet: null,
        asSpriteSheet: function() {
            if (null == this.spriteSheet) {
                var e = new createjs.SpriteSheetBuilder(), t = this.exportAsSpriteSheet;
                this.exportAsSpriteSheet = !1;
                for (var n = 0, r = this.getTotalFrames(); r > n; ) {
                    var i = n++, s = new rt(this, i, null);
                    e.addFrame(s);
                }
                this.exportAsSpriteSheet = t, this.spriteSheet = e.build();
            }
            return this.spriteSheet;
        },
        getNearestPoint: function(e) {
            for (var t = [], n = o.iter(this.layers); n.hasNext(); ) {
                var r = n.next();
                if (r.keyFrames.length > 0) for (var i = o.iter(r.keyFrames[0].elements); i.hasNext(); ) {
                    var s = i.next();
                    t.push(s.getNearestPoint(e));
                }
            }
            return t.sort(function(t, n) {
                return f.compare(wn.getDist(e.x, e.y, t.x, t.y), wn.getDist(e.x, e.y, n.x, n.y));
            }), t.length > 0 ? t[0] : {
                x: 1e100,
                y: 1e100
            };
        },
        getDisplayObjectClassName: function() {
            return this.likeButton ? "nanofl.Button" : "nanofl.MovieClip";
        },
        transform: function(e) {
            for (var t = o.iter(this.layers); t.hasNext(); ) for (var n = t.next(), r = o.iter(n.keyFrames); r.hasNext(); ) for (var i = r.next(), s = o.iter(i.elements); s.hasNext(); ) {
                var a = s.next();
                a.transform(e);
            }
        },
        preload: function(e) {
            Yt.preload(this, e);
        },
        equ: function(e) {
            return e.namePath != this.namePath ? !1 : K.__instanceof(e, On) ? e.linkedClass != this.linkedClass ? !1 : mt.equ(e._layers, this._layers) ? e.likeButton != this.likeButton ? !1 : e.autoPlay != this.autoPlay ? !1 : e.loop != this.loop ? !1 : e.exportAsSpriteSheet != this.exportAsSpriteSheet ? !1 : e.textureAtlas != this.textureAtlas ? !1 : !0 : !1 : !1;
        },
        toString: function() {
            return "MovieClipItem(" + this.namePath + ")";
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "layers", {
                get: function() {
                    return t._layers;
                }
            }), Tn.prototype.hxUnserialize.call(this, e);
        },
        __class__: On
    });
    var Bn = function(e, t) {
        this.linkage = "", In.call(this, e), this.ext = t;
    };
    s["nanofl.engine.libraryitems.SoundItem"] = Bn, Bn.__name__ = [ "nanofl", "engine", "libraryitems", "SoundItem" ], 
    Bn.parse = function(e, t) {
        return "sound" != t.name ? null : new Bn(e, t.getAttribute("ext"));
    }, Bn.__super__ = In, Bn.prototype = n(In.prototype, {
        ext: null,
        linkage: null,
        getType: function() {
            return "sound";
        },
        clone: function() {
            var e = new Bn(this.namePath, this.ext);
            return e.linkage = this.linkage, this.copyBaseProperties(e), e;
        },
        getIcon: function() {
            return "custom-icon-sound";
        },
        save: function(e) {
            var t = this.library.libraryDir + "/" + this.namePath + ".xml";
            if (this.hasXmlToSave()) {
                var n = new V();
                this.saveToXml(n), e.saveContent(t, n.toString());
            } else e.remove(t);
        },
        hasXmlToSave: function() {
            return In.prototype.hasXmlToSave.call(this) || "" != this.linkage;
        },
        saveToXml: function(e) {
            e.begin("sound").attr("version", Ut.document), this.saveProperties(e), e.end();
        },
        saveProperties: function(e) {
            In.prototype.saveProperties.call(this, e), e.attr("linkage", this.linkage, "");
        },
        loadProperties: function(e) {
            In.prototype.loadProperties.call(this, e), this.linkage = U.getAttr(e, "linkage", "");
        },
        getUrl: function() {
            return this.library.realUrl(this.namePath + "." + this.ext);
        },
        equ: function(e) {
            return e.namePath != this.namePath ? !1 : K.__instanceof(e, Bn) ? e.ext != this.ext ? !1 : e.linkage != this.linkage ? !1 : !0 : !1;
        },
        toString: function() {
            return "SoundItem(" + this.namePath + ")";
        },
        __class__: Bn
    });
    var jn = function(e, t) {
        this.loop = !0, this.autoPlay = !0, this.likeButton = !1;
        var n = this;
        Object.defineProperty(this, "layers", {
            get: function() {
                return n.get_layers();
            }
        }), Tn.call(this, e), this.frames = t;
    };
    s["nanofl.engine.libraryitems.SpriteItem"] = jn, jn.__name__ = [ "nanofl", "engine", "libraryitems", "SpriteItem" ], 
    jn.__interfaces__ = [ Mt, Pt ], jn.parse = function(e, t) {
        if ("sprite" != t.name) return null;
        var n = new jn(e, t.children.map(function(e) {
            return {
                image: U.getAttrString(e, "image"),
                x: U.getAttrInt(e, "x"),
                y: U.getAttrInt(e, "y"),
                width: U.getAttrInt(e, "width"),
                height: U.getAttrInt(e, "height"),
                regX: U.getAttrFloat(e, "regX"),
                regY: U.getAttrFloat(e, "regY")
            };
        }));
        return n.loadProperties(t), n;
    }, jn.__super__ = Tn, jn.prototype = n(Tn.prototype, {
        frames: null,
        _layers: null,
        layers: null,
        get_layers: function() {
            if (null == this._layers) {
                var e = new Ft("auto");
                e.layersContainer = this;
                for (var t = 0, n = this.frames.length; n > t; ) {
                    var r = t++;
                    e.addKeyFrame(new Nt(null, 1, null, [ new rn(this, r) ]));
                }
                this._layers = [ e ];
            }
            return this._layers;
        },
        likeButton: null,
        autoPlay: null,
        loop: null,
        textureAtlas: null,
        spriteSheet: null,
        getNotSerializableFields: function() {
            return Tn.prototype.getNotSerializableFields.call(this).concat([ "_layers", "spriteSheet" ]);
        },
        getType: function() {
            return "sprite";
        },
        clone: function() {
            var e = new jn(this.namePath, this.frames);
            return e.likeButton = this.likeButton, e.autoPlay = this.autoPlay, e.loop = this.loop, 
            e.textureAtlas = this.textureAtlas, e.spriteSheet = this.spriteSheet, this.copyBaseProperties(e), 
            e;
        },
        getIcon: function() {
            return "custom-icon-picture";
        },
        loadProperties: function(e) {
            this.likeButton = U.getAttr(e, "likeButton", !1), this.autoPlay = U.getAttr(e, "autoPlay", !0), 
            this.loop = U.getAttr(e, "loop", !0), this.textureAtlas = U.getAttr(e, "textureAtlas", null), 
            Tn.prototype.loadProperties.call(this, e);
        },
        saveProperties: function(e) {
            e.attr("likeButton", this.likeButton, !1), e.attr("autoPlay", this.autoPlay, !0), 
            e.attr("loop", this.loop, !0), e.attr("textureAtlas", this.textureAtlas, null), 
            Tn.prototype.saveProperties.call(this, e);
        },
        hasXmlToSave: function() {
            return !0;
        },
        saveToXml: function(e) {
            e.begin("sprite").attr("version", Ut.document), this.saveProperties(e);
            for (var t = 0, n = this.frames; t < n.length; ) {
                var r = n[t];
                ++t, e.begin("frame"), e.attr("image", r.image), e.attr("x", r.x), e.attr("y", r.y), 
                e.attr("width", r.width), e.attr("height", r.height), e.attr("regX", r.regX), e.attr("regY", r.regY), 
                e.end();
            }
            e.end();
        },
        preload: function(e) {
            Vn.assert(null != this.library, "You need to add item '" + this.namePath + "' to the library before preload call.", {
                fileName: "SpriteItem.hx",
                lineNumber: 148,
                className: "nanofl.engine.libraryitems.SpriteItem",
                methodName: "preload"
            }), null == Yt.getSpriteSheet(this) ? this.ensureSpriteSheet(e) : Yt.preload(this, e);
        },
        createDisplayObject: function(e, t) {
            var n = Tn.prototype.createDisplayObject.call(this, e, t);
            if (null != n) return n;
            var r = Yt.getSpriteSheet(this);
            null == r && (r = this.spriteSheet), Vn.assert(null != r, null, {
                fileName: "SpriteItem.hx",
                lineNumber: 167,
                className: "nanofl.engine.libraryitems.SpriteItem",
                methodName: "createDisplayObject"
            }), Vn.assert(r.complete, null, {
                fileName: "SpriteItem.hx",
                lineNumber: 168,
                className: "nanofl.engine.libraryitems.SpriteItem",
                methodName: "createDisplayObject"
            });
            var i = new createjs.Sprite(r);
            return i.gotoAndStop(e), i;
        },
        updateDisplayObject: function() {},
        ensureSpriteSheet: function(e) {
            var t = this;
            if (null == this.spriteSheet) {
                for (var n = [], r = 0, i = this.frames; r < i.length; ) {
                    var s = i[r];
                    ++r, o.indexOf(n, s.image, 0) < 0 && n.push(s.image);
                }
                var a = {
                    images: n.map(function(e) {
                        return t.library.realUrl(e);
                    }),
                    frames: this.frames.map(function(e) {
                        return [ e.x, e.y, e.width, e.height, o.indexOf(n, e.image, 0), e.regX, e.regY ];
                    })
                };
                this.spriteSheet = new createjs.SpriteSheet(a);
            }
            this.spriteSheet.complete ? e() : this.spriteSheet.addEventListener("complete", function() {
                e();
            }, null);
        },
        getNearestPoint: function(e) {
            if (0 == this.frames.length) return {
                x: 1e100,
                y: 1e100
            };
            var t = this.frames[0], n = {
                minX: -t.regX,
                minY: -t.regY,
                maxX: t.width - t.regX,
                maxY: t.height - t.regY
            };
            return pn.getNearestPoint(n, e);
        },
        getDisplayObjectClassName: function() {
            return this.likeButton ? "nanofl.SpriteButton" : "nanofl.Sprite";
        },
        toString: function() {
            return "SpriteItem(" + this.namePath + ")";
        },
        hxUnserialize: function(e) {
            var t = this;
            Object.defineProperty(this, "layers", {
                get: function() {
                    return t.get_layers();
                }
            }), Tn.prototype.hxUnserialize.call(this, e);
        },
        __class__: jn
    });
    var Dn = t.nanofl.engine.plugins.IFilterPlugin = function() {};
    s["nanofl.engine.plugins.IFilterPlugin"] = Dn, Dn.__name__ = [ "nanofl", "engine", "plugins", "IFilterPlugin" ], 
    Dn.prototype = {
        name: null,
        label: null,
        properties: null,
        getFilter: null,
        __class__: Dn
    };
    var Ln = function(e, t, n, r, i) {
        null == i && (i = !1), null == r && (r = 3), null == n && (n = "round"), null == t && (t = "round"), 
        null == e && (e = 1), this.thickness = e, this.caps = t, this.joints = n, this.miterLimit = r, 
        this.ignoreScale = i;
    };
    s["nanofl.engine.strokes.BaseStroke"] = Ln, Ln.__name__ = [ "nanofl", "engine", "strokes", "BaseStroke" ], 
    Ln.load = function(e) {
        var t, n = U.getAttr(e, "type");
        switch (n) {
          case "solid":
            t = new Un();
            break;

          case "linear":
            t = new qn([], [], 0, 0, 0, 0);
            break;

          case "bitmap":
            t = new Hn();
            break;

          default:
            throw new J("Unknow stroke type '" + y.string(U.getAttr(e, "type")) + "'.");
        }
        return t.loadProperties(e), t;
    }, Ln.prototype = {
        thickness: null,
        caps: null,
        joints: null,
        miterLimit: null,
        ignoreScale: null,
        loadProperties: function(e) {
            this.thickness = U.getAttr(e, "thickness", 1), this.caps = U.getAttr(e, "caps", "round"), 
            this.joints = U.getAttr(e, "joints", "round"), this.miterLimit = U.getAttr(e, "miterLimit", 3), 
            this.ignoreScale = U.getAttr(e, "ignoreScale", !1);
        },
        saveProperties: function(e) {
            e.attr("thickness", this.thickness, 1), e.attr("caps", this.caps, "round"), e.attr("joints", this.joints, "round"), 
            e.attr("miterLimit", this.miterLimit, 3), e.attr("ignoreScale", this.ignoreScale, !1);
        },
        setStrokeStyle: function(e) {
            e.setStrokeStyle(this.thickness, this.caps, this.joints, this.miterLimit, this.ignoreScale);
        },
        clone: function() {
            throw new J("Cloning of " + b.getClassName(K.getClass(this)) + " is not supported.");
        },
        equ: function(e) {
            var t = e;
            return t.thickness == this.thickness && t.caps == this.caps && t.joints == this.joints && t.miterLimit == this.miterLimit && t.ignoreScale == this.ignoreScale;
        },
        setLibrary: function() {},
        getTransformed: function(e, t) {
            var n = this.clone();
            return t && (n.thickness *= e.getAverageScale()), n;
        },
        __class__: Ln
    };
    var zn = function() {};
    s["nanofl.engine.strokes.IStroke"] = zn, zn.__name__ = [ "nanofl", "engine", "strokes", "IStroke" ], 
    zn.prototype = {
        thickness: null,
        caps: null,
        joints: null,
        miterLimit: null,
        ignoreScale: null,
        begin: null,
        clone: null,
        equ: null,
        applyAlpha: null,
        getTransformed: null,
        getTyped: null,
        save: null,
        swapInstance: null,
        setLibrary: null,
        toString: null,
        __class__: zn
    };
    var Hn = function(e, t, n, r, i, s, a) {
        null == a && (a = !1), null == s && (s = 3), null == i && (i = "round"), null == r && (r = "round"), 
        null == n && (n = 1), null == t && (t = "repeat"), Ln.call(this, n, r, i, s, a), 
        this.bitmapPath = e, this.repeat = t;
    };
    s["nanofl.engine.strokes.BitmapStroke"] = Hn, Hn.__name__ = [ "nanofl", "engine", "strokes", "BitmapStroke" ], 
    Hn.__interfaces__ = [ zn ], Hn.__super__ = Ln, Hn.prototype = n(Ln.prototype, {
        library: null,
        bitmapPath: null,
        repeat: null,
        loadProperties: function(e) {
            Ln.prototype.loadProperties.call(this, e), this.bitmapPath = U.getAttr(e, "bitmapPath"), 
            this.repeat = U.getAttr(e, "repeat");
        },
        save: function(e) {
            e.begin("stroke").attr("type", "bitmap"), this.saveProperties(e), e.end();
        },
        saveProperties: function(e) {
            e.attr("bitmapPath", this.bitmapPath), e.attr("repeat", this.repeat, "repeat"), 
            Ln.prototype.saveProperties.call(this, e);
        },
        begin: function(e) {
            if (this.library.hasItem(this.bitmapPath)) {
                var t;
                t = K.__cast(this.library.getItem(this.bitmapPath), kn).image, e.beginBitmapStroke(t, this.repeat), 
                this.setStrokeStyle(e);
            } else e.beginStroke("rgba(0,0,0,0)");
        },
        clone: function() {
            var e = new Hn(this.bitmapPath, this.repeat, this.thickness, this.caps, this.joints, this.miterLimit, this.ignoreScale);
            return e.library = this.library, e;
        },
        equ: function(e) {
            if (e == this) return !0;
            if (!K.__instanceof(e, Hn) || !Ln.prototype.equ.call(this, e)) return !1;
            var t = e;
            return t.bitmapPath == this.bitmapPath && t.repeat == this.repeat;
        },
        swapInstance: function(e, t) {
            this.bitmapPath == e && (this.bitmapPath = t);
        },
        setLibrary: function(e) {
            this.library = e;
        },
        applyAlpha: function() {},
        getTyped: function() {
            return Gn.BITMAP(this);
        },
        toString: function() {
            return 'new BitmapStroke("' + this.bitmapPath + '")';
        },
        __class__: Hn
    });
    var qn = function(e, t, n, r, i, s, a, l, o, u, h) {
        null == h && (h = !1), null == u && (u = 3), null == o && (o = "round"), null == l && (l = "round"), 
        null == a && (a = 1), Ln.call(this, a, l, o, u, h), this.colors = e, this.ratios = t, 
        this.x0 = n, this.y0 = r, this.x1 = i, this.y1 = s;
    };
    s["nanofl.engine.strokes.LinearStroke"] = qn, qn.__name__ = [ "nanofl", "engine", "strokes", "LinearStroke" ], 
    qn.__interfaces__ = [ zn ], qn.__super__ = Ln, qn.prototype = n(Ln.prototype, {
        colors: null,
        ratios: null,
        x0: null,
        y0: null,
        x1: null,
        y1: null,
        loadProperties: function(e) {
            Ln.prototype.loadProperties.call(this, e), this.colors = U.getAttr(e, "colors", []), 
            this.ratios = U.getAttr(e, "ratios", [ 0 ]), this.x0 = U.getAttr(e, "x0", 0), this.y0 = U.getAttr(e, "y0", 0), 
            this.x1 = U.getAttr(e, "x1", 0), this.y1 = U.getAttr(e, "y1", 0);
        },
        save: function(e) {
            e.begin("stroke").attr("type", "linear"), this.saveProperties(e), e.end();
        },
        saveProperties: function(e) {
            e.attr("colors", this.colors), e.attr("ratios", this.ratios), e.attr("x0", this.x0), 
            e.attr("y0", this.y0), e.attr("x1", this.x1), e.attr("y1", this.y1), Ln.prototype.saveProperties.call(this, e);
        },
        begin: function(e) {
            e.beginLinearGradientStroke(this.colors, this.ratios, this.x0, this.y0, this.x1, this.y1), 
            this.setStrokeStyle(e);
        },
        clone: function() {
            return new qn(this.colors, this.ratios, this.x0, this.y0, this.x1, this.y1, this.thickness, this.caps, this.joints, this.miterLimit, this.ignoreScale);
        },
        equ: function(e) {
            if (e == this) return !0;
            if (!K.__instanceof(e, qn) || !Ln.prototype.equ.call(this, e)) return !1;
            var t = e;
            return this.arrEqu(t.colors, this.colors) && this.arrEqu(t.ratios, this.ratios) && t.x0 == this.x0 && t.y0 == this.y0 && t.x1 == this.x1 && t.y1 == this.y1;
        },
        swapInstance: function() {},
        applyAlpha: function(e) {
            for (var t = 0, n = this.colors.length; n > t; ) {
                var r = t++, i = dt.parse(this.colors[r]);
                i.a *= e, this.colors[r] = dt.rgbaToString(i);
            }
        },
        getTransformed: function(e, t) {
            var n = Ln.prototype.getTransformed.call(this, e, t), r = e.transformPoint(this.x0, this.y0);
            n.x0 = r.x, n.y0 = r.y;
            var i = e.transformPoint(this.x1, this.y1);
            return n.x1 = i.x, n.y1 = i.y, n;
        },
        getTyped: function() {
            return Gn.LINEAR(this);
        },
        toString: function() {
            return "new LinearStroke(" + y.string(this.colors.map(function(e) {
                return '"' + e + '"';
            })) + (", " + y.string(this.ratios) + ", " + this.x0 + ", " + this.y0 + ", " + this.x1 + ", " + this.y1 + ")");
        },
        arrEqu: function(e, t) {
            if (e.length != t.length) return !1;
            for (var n = 0, r = e.length; r > n; ) {
                var i = n++;
                if (e[i] != t[i]) return !1;
            }
            return !0;
        },
        __class__: qn
    });
    var Xn = function(e, t, n, r, i, s, a, l, o, u, h, c) {
        null == c && (c = !1), null == h && (h = 3), null == u && (u = "round"), null == o && (o = "round"), 
        null == l && (l = 1), Ln.call(this, l, o, u, h, c), this.colors = e, this.ratios = t, 
        this.cx = n, this.cy = r, this.r = i, this.fx = s, this.fy = a;
    };
    s["nanofl.engine.strokes.RadialStroke"] = Xn, Xn.__name__ = [ "nanofl", "engine", "strokes", "RadialStroke" ], 
    Xn.__interfaces__ = [ zn ], Xn.__super__ = Ln, Xn.prototype = n(Ln.prototype, {
        colors: null,
        ratios: null,
        cx: null,
        cy: null,
        r: null,
        fx: null,
        fy: null,
        loadProperties: function(e) {
            Ln.prototype.loadProperties.call(this, e), this.colors = U.getAttr(e, "colors", []), 
            this.ratios = U.getAttr(e, "ratios", [ 0 ]), this.cx = U.getAttr(e, "cx", 0), this.cy = U.getAttr(e, "cy", 0), 
            this.r = U.getAttr(e, "r", 0), this.fx = U.getAttr(e, "fx", this.cx), this.fy = U.getAttr(e, "fy", this.cy);
        },
        save: function(e) {
            e.begin("stroke").attr("type", "linear"), this.saveProperties(e), e.end();
        },
        saveProperties: function(e) {
            e.attr("colors", this.colors), e.attr("ratios", this.ratios), e.attr("cx", this.cx), 
            e.attr("cy", this.cy), e.attr("r", this.r), e.attr("fx", this.fx, this.cx), e.attr("fy", this.fy, this.cy), 
            Ln.prototype.saveProperties.call(this, e);
        },
        begin: function(e) {
            e.beginRadialGradientStroke(this.colors, this.ratios, this.fx, this.fy, 0, this.cx, this.cy, this.r), 
            this.setStrokeStyle(e);
        },
        clone: function() {
            return new Xn(this.colors, this.ratios, this.cx, this.cy, this.r, this.fx, this.fy, this.thickness, this.caps, this.joints, this.miterLimit, this.ignoreScale);
        },
        equ: function(e) {
            if (e == this) return !0;
            if (!K.__instanceof(e, Xn) || !Ln.prototype.equ.call(this, e)) return !1;
            var t = e;
            return this.arrEqu(t.colors, this.colors) && this.arrEqu(t.ratios, this.ratios) && t.cx == this.cx && t.cy == this.cy && t.r == this.r && t.fx == this.fx && t.fy == this.fy;
        },
        swapInstance: function() {},
        applyAlpha: function(e) {
            for (var t = 0, n = this.colors.length; n > t; ) {
                var r = t++, i = dt.parse(this.colors[r]);
                i.a *= e, this.colors[r] = dt.rgbaToString(i);
            }
        },
        getTransformed: function(e, t) {
            var n = Ln.prototype.getTransformed.call(this, e, t), r = e.transformPoint(this.cx, this.cy);
            n.cx = r.x, n.cy = r.y;
            var i = e.transformPoint(this.fx, this.fy);
            return n.fx = i.x, n.fy = i.y, n.r *= e.getAverageScale(), n;
        },
        getTyped: function() {
            return Gn.RADIAL(this);
        },
        toString: function() {
            return "new RadialStroke(" + y.string(this.colors.map(function(e) {
                return '"' + e + '"';
            })) + (", " + y.string(this.ratios) + ", " + this.cx + ", " + this.cy + ", " + this.r + ", " + this.fx + ", " + this.fy + ")");
        },
        arrEqu: function(e, t) {
            if (e.length != t.length) return !1;
            for (var n = 0, r = e.length; r > n; ) {
                var i = n++;
                if (e[i] != t[i]) return !1;
            }
            return !0;
        },
        __class__: Xn
    });
    var Yn = function(e, t) {
        null == Yn.pattern && (Yn.pattern = new createjs.Shape(), Yn.pattern.graphics.beginFill("rgba(0,0,0,0.75)").rect(0, 0, 2, 2).rect(2, 2, 2, 2).endFill().beginFill("rgba(255,255,255,0.75)").rect(2, 0, 2, 2).rect(0, 2, 2, 2).endFill(), 
        Yn.pattern.cache(0, 0, 4, 4)), Ln.call(this, Math.max(4, e.ignoreScale ? e.thickness : e.thickness / t), e.caps, e.joints, e.miterLimit, !0);
    };
    s["nanofl.engine.strokes.SelectionStroke"] = Yn, Yn.__name__ = [ "nanofl", "engine", "strokes", "SelectionStroke" ], 
    Yn.__interfaces__ = [ zn ], Yn.__super__ = Ln, Yn.prototype = n(Ln.prototype, {
        save: function() {
            throw new J("Unsupported.");
        },
        begin: function(e) {
            e.beginBitmapStroke(Yn.pattern.cacheCanvas, "repeat"), this.setStrokeStyle(e);
        },
        swapInstance: function() {},
        applyAlpha: function() {},
        getTyped: function() {
            return null;
        },
        toString: function() {
            return "new SelectionStroke()";
        },
        __class__: Yn
    });
    var Un = function(e, t, n, r, i, s) {
        null == s && (s = !1), null == i && (i = 3), null == r && (r = "round"), null == n && (n = "round"), 
        null == t && (t = 1), null == e && (e = "black"), Ln.call(this, t, n, r, i, s), 
        this.color = e;
    };
    s["nanofl.engine.strokes.SolidStroke"] = Un, Un.__name__ = [ "nanofl", "engine", "strokes", "SolidStroke" ], 
    Un.__interfaces__ = [ zn ], Un.__super__ = Ln, Un.prototype = n(Ln.prototype, {
        color: null,
        loadProperties: function(e) {
            Ln.prototype.loadProperties.call(this, e), this.color = U.getAttr(e, "color", "#000000");
        },
        save: function(e) {
            e.begin("stroke").attr("type", "solid"), this.saveProperties(e), e.end();
        },
        saveProperties: function(e) {
            e.attr("color", this.color), Ln.prototype.saveProperties.call(this, e);
        },
        begin: function(e) {
            e.beginStroke(this.color), this.setStrokeStyle(e);
        },
        clone: function() {
            return new Un(this.color, this.thickness, this.caps, this.joints, this.miterLimit, this.ignoreScale);
        },
        equ: function(e) {
            if (e == this) return !0;
            if (!K.__instanceof(e, Un) || !Ln.prototype.equ.call(this, e)) return !1;
            var t = e;
            return t.color == this.color;
        },
        swapInstance: function() {},
        applyAlpha: function(e) {
            var t = dt.parse(this.color);
            if (null == t) throw new J(new Wn("Can't parse color '" + this.color + "'."));
            t.a *= e, this.color = dt.rgbaToString(t);
        },
        getTyped: function() {
            return Gn.SOLID(this);
        },
        toString: function() {
            return 'new SolidStroke("' + this.color + '")';
        },
        __class__: Un
    });
    var Gn = s["nanofl.engine.strokes.TypedStroke"] = {
        __ename__: [ "nanofl", "engine", "strokes", "TypedStroke" ],
        __constructs__: [ "SOLID", "LINEAR", "RADIAL", "BITMAP" ]
    };
    Gn.SOLID = function(e) {
        var t = [ "SOLID", 0, e ];
        return t.__enum__ = Gn, t.toString = a, t;
    }, Gn.LINEAR = function(e) {
        var t = [ "LINEAR", 1, e ];
        return t.__enum__ = Gn, t.toString = a, t;
    }, Gn.RADIAL = function(e) {
        var t = [ "RADIAL", 2, e ];
        return t.__enum__ = Gn, t.toString = a, t;
    }, Gn.BITMAP = function(e) {
        var t = [ "BITMAP", 3, e ];
        return t.__enum__ = Gn, t.toString = a, t;
    };
    var Vn = function() {};
    s["stdlib.Debug"] = Vn, Vn.__name__ = [ "stdlib", "Debug" ], Vn.getDump = function(e, t, n, r) {
        if (null == r && (r = ""), null == n && (n = 0), null == t && (t = 10), n >= t) return "...\n";
        r += "	";
        var i = "?\n", s = b.typeof(e);
        switch (s[1]) {
          case 3:
            i = "BOOL(" + (e ? "true" : "false") + ")\n";
            break;

          case 0:
            i = "NULL\n";
            break;

          case 6:
            var a = s[2];
            if (a == String) i = "STRING(" + y.string(e) + ")\n"; else if (a == Array) {
                i = "ARRAY(" + y.string(e.length) + ")\n";
                var l, o = 0;
                for (l = K.__cast(e, Array); o < l.length; ) {
                    var c = l[o];
                    ++o, i += r + Vn.getDump(c, t, n + 1, r);
                }
            } else if (a == h) {
                i = "LIST(" + u.count(e) + ")\n";
                for (var f = K.__cast(e, h).iterator(); null != f.head; ) {
                    var g;
                    f.val = f.head[0], f.head = f.head[1], g = f.val, i += r + Vn.getDump(g, t, n + 1, r);
                }
            } else if (a == O) {
                i = "StringMap\n";
                var m;
                m = K.__cast(e, O);
                for (var d = m.keys(); d.hasNext(); ) {
                    var p = d.next();
                    i += r + p + " => " + Vn.getDump(null != vr[p] ? m.getReserved(p) : m.h[p], t, n + 1, r);
                }
            } else i = "CLASS(" + b.getClassName(a) + ")\n" + Vn.getObjectDump(e, t, n + 1, r);
            break;

          case 7:
            var v = s[2];
            i = "ENUM(" + b.getEnumName(v) + ") = " + b.enumConstructor(e) + "\n";
            break;

          case 2:
            i = "FLOAT(" + y.string(e) + ")\n";
            break;

          case 1:
            i = "INT(" + y.string(e) + ")\n";
            break;

          case 4:
            i = "OBJECT\n" + Vn.getObjectDump(e, t, n + 1, r);
            break;

          case 5:
          case 8:
            i = "FUNCTION OR UNKNOW\n";
        }
        return i;
    }, Vn.getObjectDump = function(e, t, n, r) {
        for (var i = "", s = 0, a = f.fields(e); s < a.length; ) {
            var l = a[s];
            ++s, i += r + l + " : " + Vn.getDump(f.field(e, l), t, n, r);
        }
        return i;
    }, Vn.assert = function(e, t, n) {
        if (!e) {
            null == t ? t = "error" : f.isFunction(t) && (t = t());
            var r = "ASSERT " + y.string(t) + " in " + n.fileName + " at line " + n.lineNumber, i = new Wn(r);
            throw i.stack.shift(), new J(i);
        }
    }, Vn.traceStack = function(e, t) {
        for (var n = tr.trim(tr.replace(N.toString(N.callStack()), "prototype<.", "")), r = n.split("\n").filter(function(e) {
            return "Called from module" != e;
        }).map(function(e) {
            return e.split("@").map(function(e) {
                return tr.rtrim(e, "</");
            }).join("@");
        }), i = 0, s = 0; s < r.length; ) {
            var a = r[s];
            ++s, i = er.max(i, a.indexOf("@"));
        }
        r = r.map(function(e) {
            var t = e.split("@");
            return t[0] + x.rpad("", " ", i - t[0].length + 1) + t[1];
        }), n = r.slice(1).join("\n"), C.trace("TRACE " + ("string" == typeof e ? e : tr.trim(Vn.getDump(e))) + "\nStack trace:\n" + n, {
            fileName: "Debug.hx",
            lineNumber: 136,
            className: "stdlib.Debug",
            methodName: "traceStack",
            customParams: [ t ]
        });
    }, Vn.methodMustBeOverriden = function(e, t) {
        throw new J(new Wn("Method " + t.methodName + "() must be overriden in class " + b.getClassName(b.getClass(e)) + "."));
    }, Vn.methodNotSupported = function(e, t) {
        throw new J(new Wn("Method " + t.methodName + "() is not supported by class " + b.getClassName(b.getClass(e)) + "."));
    };
    var Qn = function(e) {
        this.target = e, this.handlers = [];
    };
    s["stdlib.Event"] = Qn, Qn.__name__ = [ "stdlib", "Event" ], Qn.prototype = {
        target: null,
        handlers: null,
        bind: function(e) {
            this.handlers.push(e);
        },
        unbind: function(e) {
            for (;o.remove(this.handlers, e); ) ;
        },
        unbindAll: function() {
            this.handlers = [];
        },
        call: function(e) {
            for (var t = 0, n = this.handlers; t < n.length; ) {
                var r = n[t];
                ++t, r.apply(null, [ this.target, e ]);
            }
        },
        __class__: Qn
    };
    var Wn = function(e) {
        this.message = null == e ? "" : e, this.stack = N.callStack(), this.stack.shift(), 
        this.stack.shift();
    };
    s["stdlib.Exception"] = Wn, Wn.__name__ = [ "stdlib", "Exception" ], Wn.string = function(e) {
        return y.string(e);
    }, Wn.rethrow = function(e) {
        throw new J(Wn.wrap(e));
    }, Wn.wrap = function(e) {
        if (!K.__instanceof(e, Wn)) {
            var t = new Wn(y.string(e));
            return t.stack = N.exceptionStack(), t;
        }
        return e;
    }, Wn.prototype = {
        message: null,
        stack: null,
        toString: function() {
            return this.message;
        },
        __class__: Wn
    };
    var Zn = function() {};
    s["stdlib.LambdaArray"] = Zn, Zn.__name__ = [ "stdlib", "LambdaArray" ], Zn.insertRange = function(e, t, n) {
        for (var r = 0; r < n.length; ) {
            var i = n[r];
            ++r;
            var s = t++;
            e.splice(s, 0, i);
        }
    }, Zn.extract = function(e, t) {
        for (var n = [], r = 0; r < e.length; ) t(e[r]) ? (n.push(e[r]), e.splice(r, 1)) : r++;
        return n;
    };
    var Jn = function() {};
    s["stdlib.LambdaIterable"] = Jn, Jn.__name__ = [ "stdlib", "LambdaIterable" ], Jn.findIndex = function(e, t) {
        for (var n = 0, i = r(e)(); i.hasNext(); ) {
            var s = i.next();
            if (t(s)) return n;
            n++;
        }
        return -1;
    }, Jn.sorted = function(e, t) {
        var n = u.array(e);
        return n.sort(null != t ? t : f.compare), n;
    };
    var Kn = function() {};
    s["stdlib.LambdaIterator"] = Kn, Kn.__name__ = [ "stdlib", "LambdaIterator" ], Kn.array = function(e) {
        for (var t = []; e.hasNext(); ) {
            var n = e.next();
            t.push(n);
        }
        return t;
    }, Kn.map = function(e, t) {
        for (var n = []; e.hasNext(); ) {
            var r = e.next();
            n.push(t(r));
        }
        return n;
    }, Kn.filter = function(e, t) {
        for (var n = []; e.hasNext(); ) {
            var r = e.next();
            t(r) && n.push(r);
        }
        return n;
    }, Kn.exists = function(e, t) {
        for (;e.hasNext(); ) {
            var n = e.next();
            if (t(n)) return !0;
        }
        return !1;
    }, Kn.count = function(e, t) {
        var n = 0;
        if (null == t) for (;e.hasNext(); ) {
            {
                e.next();
            }
            n++;
        } else for (;e.hasNext(); ) {
            var r = e.next();
            t(r) && n++;
        }
        return n;
    }, Kn.findIndex = function(e, t) {
        for (var n = 0; e.hasNext(); ) {
            var r = e.next();
            if (t(r)) return n;
            n++;
        }
        return -1;
    }, Kn.sorted = function(e, t) {
        var n = Kn.array(e);
        return n.sort(null != t ? t : f.compare), n;
    };
    var $n = function() {
        P.call(this);
    };
    s["stdlib.Serializer"] = $n, $n.__name__ = [ "stdlib", "Serializer" ], $n.run = function(e, t) {
        null == t && (t = !1);
        var n = new P();
        return n.useCache = t, n.serialize(e), n.toString();
    }, $n.__super__ = P, $n.prototype = n(P.prototype, {
        __class__: $n
    });
    var er = function() {};
    s["stdlib.Std"] = er, er.__name__ = [ "stdlib", "Std" ], er.parseInt = function(e, t) {
        return null != e && new l("^\\s*[+-]?\\s*((?:0x[0-9a-fA-F]{1,7})|(?:\\d{1,9}))\\s*$", "").match(e) ? y.parseInt(e) : t;
    }, er.parseFloat = function(e, t) {
        return null != e && new l("^\\s*[+-]?\\s*\\d{1,9}(?:[.]\\d+)?(?:e[+-]?\\d{1,9})?\\s*$", "").match(e) ? parseFloat(e) : t;
    }, er.bool = function(e) {
        return 0 != e && null != e && 0 != e && "" != e && "0" != e && (!("string" == typeof e) || "false" != K.__cast(e, String).toLowerCase() && "off" != K.__cast(e, String).toLowerCase() && "null" != K.__cast(e, String).toLowerCase());
    }, er.parseValue = function(e) {
        var t, n = e;
        t = null != n ? n.toLowerCase() : null;
        var r;
        return "true" == t ? n = !0 : "false" == t ? n = !1 : "null" == t ? n = null : null != (r = er.parseInt(n)) ? n = r : null != (r = er.parseFloat(n)) && (n = r), 
        n;
    }, er.hash = function(e) {
        for (var t = new O(), n = 0, r = f.fields(e); n < r.length; ) {
            var i = r[n];
            ++n;
            var s = f.field(e, i);
            t.set(i, s);
        }
        return t;
    }, er.min = function(e, t) {
        return t > e ? e : t;
    }, er.max = function(e, t) {
        return e > t ? e : t;
    }, er.abs = function(e) {
        return e >= 0 ? e : -e;
    }, er.sign = function(e) {
        return e > 0 ? 1 : 0 > e ? -1 : 0;
    }, er.is = function(e, t) {
        return K.__instanceof(e, t);
    }, er.instance = function(e, t) {
        return e instanceof t ? e : null;
    }, er.string = function(e) {
        return y.string(e);
    }, er.int = function(e) {
        return 0 | e;
    }, er.random = function(e) {
        return y.random(e);
    };
    var tr = function() {};
    s["stdlib.StringTools"] = tr, tr.__name__ = [ "stdlib", "StringTools" ], tr.ltrim = function(e, t) {
        if (null == t) return x.ltrim(e);
        for (;e.length > 0 && t.indexOf(o.substr(e, 0, 1)) >= 0; ) e = o.substr(e, 1, null);
        return e;
    }, tr.rtrim = function(e, t) {
        if (null == t) return x.rtrim(e);
        for (;e.length > 0 && t.indexOf(o.substr(e, e.length - 1, 1)) >= 0; ) e = o.substr(e, 0, e.length - 1);
        return e;
    }, tr.trim = function(e, t) {
        return null == t ? x.trim(e) : tr.rtrim(tr.ltrim(e, t), t);
    }, tr.hexdec = function(e) {
        return er.parseInt("0x" + e);
    }, tr.addcslashes = function(e) {
        return new l("['\"	\r\n\\\\]", "g").map(e, function(e) {
            return "\\" + e.matched(0);
        });
    }, tr.stripTags = function(e, t) {
        null == t && (t = "");
        var n = [];
        if ("" != t) for (var r = new l("[a-zA-Z0-9]+", "i"), i = 0; r.matchSub(t, i); ) n.push(r.matched(0)), 
        i = r.matchedPos().pos + r.matchedPos().len;
        var s = new l("</?[\\S][^>]*>", "g");
        return e = s.map(e, function() {
            var e = s.matched(0), t = !1;
            if (n.length > 0) for (var r = e.toLowerCase(), i = 0; i < n.length; ) {
                var a = n[i];
                if (++i, x.startsWith(r, "<" + a + ">") || x.startsWith(r, "<" + a + " ") || x.startsWith(r, "</" + a)) {
                    t = !0;
                    break;
                }
            }
            return t ? e : "";
        });
    }, tr.regexEscape = function(e) {
        return new l("([\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|])", "g").replace(e, "\\$1");
    }, tr.jsonEscape = function(e) {
        if (null == e) return "null";
        var t = new rr(e.length + (e.length / 5 | 0));
        return t.__b += '"', k.iter(e, function(e) {
            switch (e) {
              case 92:
                t.__b += "\\", t.__b += "\\";
                break;

              case 34:
                t.__b += "\\", t.__b += '"';
                break;

              case 9:
                t.__b += "\\", t.__b += "t";
                break;

              case 10:
                t.__b += "\\", t.__b += "n";
                break;

              case 13:
                t.__b += "\\", t.__b += "r";
                break;

              default:
                if (32 > e) {
                    t.__b += "\\", t.__b += "u";
                    var n = x.hex(e, 4);
                    t.addChar(n.charCodeAt(0)), t.addChar(n.charCodeAt(1)), t.addChar(n.charCodeAt(2)), 
                    t.addChar(n.charCodeAt(3));
                } else t.__b += String.fromCharCode(e);
            }
        }), t.__b += '"', t.__b;
    }, tr.isEmpty = function(e) {
        return null == e || "" == e;
    }, tr.capitalize = function(e) {
        return tr.isEmpty(e) ? e : o.substr(e, 0, 1).toUpperCase() + o.substr(e, 1, null);
    }, tr.urlEncode = function(e) {
        return encodeURIComponent(e);
    }, tr.urlDecode = function(e) {
        return decodeURIComponent(e.split("+").join(" "));
    }, tr.htmlEscape = function(e, t) {
        return x.htmlEscape(e, t);
    }, tr.htmlUnescape = function(e) {
        return x.htmlUnescape(e);
    }, tr.startsWith = function(e, t) {
        return x.startsWith(e, t);
    }, tr.endsWith = function(e, t) {
        return x.endsWith(e, t);
    }, tr.isSpace = function(e, t) {
        return x.isSpace(e, t);
    }, tr.lpad = function(e, t, n) {
        return x.lpad(e, t, n);
    }, tr.rpad = function(e, t, n) {
        return x.rpad(e, t, n);
    }, tr.replace = function(e, t, n) {
        return x.replace(e, t, n);
    }, tr.hex = function(e, t) {
        return x.hex(e, t);
    }, tr.fastCodeAt = function(e, t) {
        return e.charCodeAt(t);
    }, tr.isEof = function(e) {
        return e != e;
    };
    var nr = function(e) {
        T.call(this, e);
    };
    s["stdlib.Unserializer"] = nr, nr.__name__ = [ "stdlib", "Unserializer" ], nr.run = function(e, t) {
        var n = new T(e);
        return null != t && n.setResolver(t), n.unserialize();
    }, nr.__super__ = T, nr.prototype = n(T.prototype, {
        __class__: nr
    });
    var rr = function(e) {
        k.call(this, e);
    };
    s["stdlib.Utf8"] = rr, rr.__name__ = [ "stdlib", "Utf8" ], rr.replace = function(e, t, n) {
        var r = [];
        k.iter(e, function(e) {
            r.push(e);
        });
        var i = new rr(), s = t.length;
        if (r.length < s) return e;
        for (var a = 0, l = r.length - s + 1; l > a; ) {
            var o = [ a++ ], u = [ !0 ], h = [ 0 ];
            k.iter(t, function(e, t, n) {
                return function(i) {
                    t[0] && (r[n[0] + e[0]] != i && (t[0] = !1), e[0]++);
                };
            }(h, u, o)), u[0] ? i.addString(n) : i.__b += String.fromCharCode(r[o[0]]);
        }
        for (var c = r.length - s + 1, f = r.length; f > c; ) {
            var g = c++;
            i.__b += String.fromCharCode(r[g]);
        }
        return i.__b;
    }, rr.compactSpaces = function(e) {
        var t = new rr(), n = !1;
        return k.iter(e, function(e) {
            32 == e || 13 == e || 10 == e || 9 == e ? n || (t.__b += " ", n = !0) : (t.__b += String.fromCharCode(e), 
            n = !1);
        }), t.__b;
    }, rr.htmlUnescape = function(e) {
        var t = new rr(), n = null;
        return k.iter(e, function(e) {
            if (null != n) if (59 == e) {
                var r = rr.htmlUnescapeChar(n);
                null != r && (t.__b += String.fromCharCode(r)), n = null;
            } else n += String.fromCharCode(e); else 38 == e ? n = "" : t.__b += String.fromCharCode(e);
        }), t.__b;
    }, rr.htmlEscape = function(e, t) {
        null == t && (t = ""), t = "&<>" + t;
        var n = new rr();
        return k.iter(e, function(e) {
            var r, i = rr.get_htmlEscapeMap();
            r = i.get(e), null != r && e >= 0 && 255 >= e && t.indexOf(String.fromCharCode(e)) >= 0 ? n.addString(r) : n.__b += String.fromCharCode(e);
        }), n.__b;
    }, rr.htmlUnescapeChar = function(e) {
        if (x.startsWith(e, "#x")) return er.parseInt("0x" + o.substr(e, 2, null));
        if (x.startsWith(e, "#")) return er.parseInt(o.substr(e, 1, null));
        var t, n = rr.get_htmlUnescapeMap();
        return t = n.get(e), null != t ? t : (C.trace("Unknow escape sequence: " + e, {
            fileName: "Utf8.hx",
            lineNumber: 131,
            className: "stdlib.Utf8",
            methodName: "htmlUnescapeChar"
        }), null);
    }, rr.get_htmlEscapeMap = function() {
        if (null == rr.htmlEscapeMap) {
            var e = new M();
            e.h[32] = "&nbsp;", e.h[38] = "&amp;", e.h[60] = "&lt;", e.h[62] = "&gt;", e.h[34] = "&quot;", 
            e.h[39] = "&apos;", e.h[13] = "&#xD;", e.h[10] = "&#xA;", rr.htmlEscapeMap = e;
        }
        return rr.htmlEscapeMap;
    }, rr.get_htmlUnescapeMap = function() {
        if (null == rr.htmlUnescapeMap) {
            var e = new O();
            null != vr.nbsp ? e.setReserved("nbsp", 32) : e.h.nbsp = 32, null != vr.amp ? e.setReserved("amp", 38) : e.h.amp = 38, 
            null != vr.lt ? e.setReserved("lt", 60) : e.h.lt = 60, null != vr.gt ? e.setReserved("gt", 62) : e.h.gt = 62, 
            null != vr.quot ? e.setReserved("quot", 34) : e.h.quot = 34, null != vr.apos ? e.setReserved("apos", 39) : e.h.apos = 39, 
            null != vr.euro ? e.setReserved("euro", 8364) : e.h.euro = 8364, null != vr.iexcl ? e.setReserved("iexcl", 161) : e.h.iexcl = 161, 
            null != vr.cent ? e.setReserved("cent", 162) : e.h.cent = 162, null != vr.pound ? e.setReserved("pound", 163) : e.h.pound = 163, 
            null != vr.curren ? e.setReserved("curren", 164) : e.h.curren = 164, null != vr.yen ? e.setReserved("yen", 165) : e.h.yen = 165, 
            null != vr.brvbar ? e.setReserved("brvbar", 166) : e.h.brvbar = 166, null != vr.sect ? e.setReserved("sect", 167) : e.h.sect = 167, 
            null != vr.uml ? e.setReserved("uml", 168) : e.h.uml = 168, null != vr.copy ? e.setReserved("copy", 169) : e.h.copy = 169, 
            null != vr.ordf ? e.setReserved("ordf", 170) : e.h.ordf = 170, null != vr.not ? e.setReserved("not", 172) : e.h.not = 172, 
            null != vr.shy ? e.setReserved("shy", 173) : e.h.shy = 173, null != vr.reg ? e.setReserved("reg", 174) : e.h.reg = 174, 
            null != vr.macr ? e.setReserved("macr", 175) : e.h.macr = 175, null != vr.deg ? e.setReserved("deg", 176) : e.h.deg = 176, 
            null != vr.plusmn ? e.setReserved("plusmn", 177) : e.h.plusmn = 177, null != vr.sup2 ? e.setReserved("sup2", 178) : e.h.sup2 = 178, 
            null != vr.sup3 ? e.setReserved("sup3", 179) : e.h.sup3 = 179, null != vr.acute ? e.setReserved("acute", 180) : e.h.acute = 180, 
            null != vr.micro ? e.setReserved("micro", 181) : e.h.micro = 181, null != vr.para ? e.setReserved("para", 182) : e.h.para = 182, 
            null != vr.middot ? e.setReserved("middot", 183) : e.h.middot = 183, null != vr.cedil ? e.setReserved("cedil", 184) : e.h.cedil = 184, 
            null != vr.sup1 ? e.setReserved("sup1", 185) : e.h.sup1 = 185, null != vr.ordm ? e.setReserved("ordm", 186) : e.h.ordm = 186, 
            null != vr.raquo ? e.setReserved("raquo", 187) : e.h.raquo = 187, null != vr.frac14 ? e.setReserved("frac14", 188) : e.h.frac14 = 188, 
            null != vr.frac12 ? e.setReserved("frac12", 189) : e.h.frac12 = 189, null != vr.frac34 ? e.setReserved("frac34", 190) : e.h.frac34 = 190, 
            null != vr.iquest ? e.setReserved("iquest", 191) : e.h.iquest = 191, null != vr.Agrave ? e.setReserved("Agrave", 192) : e.h.Agrave = 192, 
            null != vr.Aacute ? e.setReserved("Aacute", 193) : e.h.Aacute = 193, null != vr.Acirc ? e.setReserved("Acirc", 194) : e.h.Acirc = 194, 
            null != vr.Atilde ? e.setReserved("Atilde", 195) : e.h.Atilde = 195, null != vr.Auml ? e.setReserved("Auml", 196) : e.h.Auml = 196, 
            null != vr.Aring ? e.setReserved("Aring", 197) : e.h.Aring = 197, null != vr.AElig ? e.setReserved("AElig", 198) : e.h.AElig = 198, 
            null != vr.Ccedil ? e.setReserved("Ccedil", 199) : e.h.Ccedil = 199, null != vr.Egrave ? e.setReserved("Egrave", 200) : e.h.Egrave = 200, 
            null != vr.Eacute ? e.setReserved("Eacute", 201) : e.h.Eacute = 201, null != vr.Ecirc ? e.setReserved("Ecirc", 202) : e.h.Ecirc = 202, 
            null != vr.Euml ? e.setReserved("Euml", 203) : e.h.Euml = 203, null != vr.Igrave ? e.setReserved("Igrave", 204) : e.h.Igrave = 204, 
            null != vr.Iacute ? e.setReserved("Iacute", 205) : e.h.Iacute = 205, null != vr.Icirc ? e.setReserved("Icirc", 206) : e.h.Icirc = 206, 
            null != vr.Iuml ? e.setReserved("Iuml", 207) : e.h.Iuml = 207, null != vr.ETH ? e.setReserved("ETH", 208) : e.h.ETH = 208, 
            null != vr.Ntilde ? e.setReserved("Ntilde", 209) : e.h.Ntilde = 209, null != vr.Ograve ? e.setReserved("Ograve", 210) : e.h.Ograve = 210, 
            null != vr.Oacute ? e.setReserved("Oacute", 211) : e.h.Oacute = 211, null != vr.Ocirc ? e.setReserved("Ocirc", 212) : e.h.Ocirc = 212, 
            null != vr.Otilde ? e.setReserved("Otilde", 213) : e.h.Otilde = 213, null != vr.Ouml ? e.setReserved("Ouml", 214) : e.h.Ouml = 214, 
            null != vr.times ? e.setReserved("times", 215) : e.h.times = 215, null != vr.Oslash ? e.setReserved("Oslash", 216) : e.h.Oslash = 216, 
            null != vr.Ugrave ? e.setReserved("Ugrave", 217) : e.h.Ugrave = 217, null != vr.Uacute ? e.setReserved("Uacute", 218) : e.h.Uacute = 218, 
            null != vr.Ucirc ? e.setReserved("Ucirc", 219) : e.h.Ucirc = 219, null != vr.Uuml ? e.setReserved("Uuml", 220) : e.h.Uuml = 220, 
            null != vr.Yacute ? e.setReserved("Yacute", 221) : e.h.Yacute = 221, null != vr.THORN ? e.setReserved("THORN", 222) : e.h.THORN = 222, 
            null != vr.szlig ? e.setReserved("szlig", 223) : e.h.szlig = 223, null != vr.agrave ? e.setReserved("agrave", 224) : e.h.agrave = 224, 
            null != vr.aacute ? e.setReserved("aacute", 225) : e.h.aacute = 225, null != vr.acirc ? e.setReserved("acirc", 226) : e.h.acirc = 226, 
            null != vr.atilde ? e.setReserved("atilde", 227) : e.h.atilde = 227, null != vr.auml ? e.setReserved("auml", 228) : e.h.auml = 228, 
            null != vr.aring ? e.setReserved("aring", 229) : e.h.aring = 229, null != vr.aelig ? e.setReserved("aelig", 230) : e.h.aelig = 230, 
            null != vr.ccedil ? e.setReserved("ccedil", 231) : e.h.ccedil = 231, null != vr.egrave ? e.setReserved("egrave", 232) : e.h.egrave = 232, 
            null != vr.eacute ? e.setReserved("eacute", 233) : e.h.eacute = 233, null != vr.ecirc ? e.setReserved("ecirc", 234) : e.h.ecirc = 234, 
            null != vr.euml ? e.setReserved("euml", 235) : e.h.euml = 235, null != vr.igrave ? e.setReserved("igrave", 236) : e.h.igrave = 236, 
            null != vr.iacute ? e.setReserved("iacute", 237) : e.h.iacute = 237, null != vr.icirc ? e.setReserved("icirc", 238) : e.h.icirc = 238, 
            null != vr.iuml ? e.setReserved("iuml", 239) : e.h.iuml = 239, null != vr.eth ? e.setReserved("eth", 240) : e.h.eth = 240, 
            null != vr.ntilde ? e.setReserved("ntilde", 241) : e.h.ntilde = 241, null != vr.ograve ? e.setReserved("ograve", 242) : e.h.ograve = 242, 
            null != vr.oacute ? e.setReserved("oacute", 243) : e.h.oacute = 243, null != vr.ocirc ? e.setReserved("ocirc", 244) : e.h.ocirc = 244, 
            null != vr.otilde ? e.setReserved("otilde", 245) : e.h.otilde = 245, null != vr.ouml ? e.setReserved("ouml", 246) : e.h.ouml = 246, 
            null != vr.divide ? e.setReserved("divide", 247) : e.h.divide = 247, null != vr.oslash ? e.setReserved("oslash", 248) : e.h.oslash = 248, 
            null != vr.ugrave ? e.setReserved("ugrave", 249) : e.h.ugrave = 249, null != vr.uacute ? e.setReserved("uacute", 250) : e.h.uacute = 250, 
            null != vr.ucirc ? e.setReserved("ucirc", 251) : e.h.ucirc = 251, null != vr.uuml ? e.setReserved("uuml", 252) : e.h.uuml = 252, 
            null != vr.yacute ? e.setReserved("yacute", 253) : e.h.yacute = 253, null != vr.thorn ? e.setReserved("thorn", 254) : e.h.thorn = 254, 
            rr.htmlUnescapeMap = e;
        }
        return rr.htmlUnescapeMap;
    }, rr.iter = function(e, t) {
        k.iter(e, t);
    }, rr.encode = function(e) {
        return k.encode(e);
    }, rr.decode = function(e) {
        return k.decode(e);
    }, rr.charCodeAt = function(e, t) {
        return o.cca(e, t);
    }, rr.validate = function() {
        return !0;
    }, rr.$length = function(e) {
        return e.length;
    }, rr.compare = function(e, t) {
        return k.compare(e, t);
    }, rr.sub = function(e, t, n) {
        return o.substr(e, t, n);
    }, rr.__super__ = k, rr.prototype = n(k.prototype, {
        addString: function(e) {
            var t = this;
            k.iter(e, function(e) {
                t.__b += String.fromCharCode(e);
            });
        },
        __class__: rr
    });
    var ir = function() {};
    s["tjson.TJSON"] = ir, ir.__name__ = [ "tjson", "TJSON" ], ir.parse = function(e, t, n) {
        null == t && (t = "JSON Data");
        var r = new sr(e, t, n);
        return r.doParse();
    }, ir.encode = function(e, t, n) {
        null == n && (n = !0);
        var r = new ar(n);
        return r.doEncode(e, t);
    };
    var sr = function(e, t, n) {
        null == t && (t = "JSON Data"), this.json = e, this.fileName = t, this.currentLine = 1, 
        this.lastSymbolQuoted = !1, this.pos = 0, this.floatRegex = new l("^-?[0-9]*\\.[0-9]+$", ""), 
        this.intRegex = new l("^-?[0-9]+$", ""), this.strProcessor = null == n ? i(this, this.defaultStringProcessor) : n, 
        this.cache = [];
    };
    s["tjson.TJSONParser"] = sr, sr.__name__ = [ "tjson", "TJSONParser" ], sr.prototype = {
        pos: null,
        json: null,
        lastSymbolQuoted: null,
        fileName: null,
        currentLine: null,
        cache: null,
        floatRegex: null,
        intRegex: null,
        strProcessor: null,
        doParse: function() {
            try {
                var e = this.getNextSymbol(), t = e;
                switch (e) {
                  case "{":
                    return this.doObject();

                  case "[":
                    return this.doArray();

                  default:
                    return this.convertSymbolToProperType(t);
                }
            } catch (e) {
                throw N.lastException = e, e instanceof J && (e = e.val), K.__instanceof(e, String) ? new J(this.fileName + " on line " + this.currentLine + ": " + e) : e;
            }
        },
        doObject: function() {
            var e, t = {}, n = "", r = !1;
            for (this.cache.push(t); this.pos < this.json.length; ) if (e = this.getNextSymbol(), 
            "," != e || this.lastSymbolQuoted) {
                if ("}" == e && !this.lastSymbolQuoted) return r && null != t.TJ_unserialize && t.TJ_unserialize(), 
                t;
                var i = this.getNextSymbol();
                if (":" != i) throw new J("Expected ':' but got '" + i + "' instead.");
                var s = this.getNextSymbol();
                if ("_hxcls" != e) n = "{" != s || this.lastSymbolQuoted ? "[" != s || this.lastSymbolQuoted ? this.convertSymbolToProperType(s) : this.doArray() : this.doObject(), 
                t[e] = n; else {
                    var a = b.resolveClass(s);
                    if (null == a) throw new J("Invalid class name - " + s);
                    t = b.createEmptyInstance(a), this.cache.pop(), this.cache.push(t), r = !0;
                }
            }
            throw new J("Unexpected end of file. Expected '}'");
        },
        doArray: function() {
            for (var e, t = []; this.pos < this.json.length; ) if (e = this.getNextSymbol(), 
            "," != e || this.lastSymbolQuoted) {
                if ("]" == e && !this.lastSymbolQuoted) return t;
                e = "{" != e || this.lastSymbolQuoted ? "[" != e || this.lastSymbolQuoted ? this.convertSymbolToProperType(e) : this.doArray() : this.doObject(), 
                t.push(e);
            }
            throw new J("Unexpected end of file. Expected ']'");
        },
        convertSymbolToProperType: function(e) {
            if (this.lastSymbolQuoted) {
                if (x.startsWith(e, ir.OBJECT_REFERENCE_PREFIX)) {
                    var t = y.parseInt(o.substr(e, ir.OBJECT_REFERENCE_PREFIX.length, null));
                    return this.cache[t];
                }
                return e;
            }
            return this.looksLikeFloat(e) ? parseFloat(e) : this.looksLikeInt(e) ? y.parseInt(e) : "true" == e.toLowerCase() ? !0 : "false" == e.toLowerCase() ? !1 : "null" == e.toLowerCase() ? null : e;
        },
        looksLikeFloat: function(e) {
            return this.floatRegex.match(e) || this.intRegex.match(e) && function(e) {
                var t, n = e.intRegex.matched(0);
                return t = 45 == o.cca(n, 0) ? n > "-2147483648" : n > "2147483647";
            }(this);
        },
        looksLikeInt: function(e) {
            return this.intRegex.match(e);
        },
        getNextSymbol: function() {
            this.lastSymbolQuoted = !1;
            for (var e = "", t = !1, n = "", r = "", i = !1, s = !1, a = !1, l = !1; this.pos < this.json.length; ) if (e = this.json.charAt(this.pos++), 
            "\n" != e || s || this.currentLine++, a) ("\n" == e || "\r" == e) && (a = !1, this.pos++); else if (l) "*" == e && "/" == this.json.charAt(this.pos) && (l = !1, 
            this.pos++); else if (t) {
                if (i) {
                    if (i = !1, "'" == e || '"' == e) {
                        r += e;
                        continue;
                    }
                    if ("t" == e) {
                        r += "	";
                        continue;
                    }
                    if ("n" == e) {
                        r += "\n";
                        continue;
                    }
                    if ("\\" == e) {
                        r += "\\";
                        continue;
                    }
                    if ("r" == e) {
                        r += "\r";
                        continue;
                    }
                    if ("/" == e) {
                        r += "/";
                        continue;
                    }
                    if ("u" == e) {
                        for (var u = 0, h = 0; 4 > h; ) {
                            {
                                h++;
                            }
                            if (this.pos >= this.json.length) throw new J("Unfinished UTF8 character");
                            var c, f = this.pos++;
                            if (c = o.cca(this.json, f), u <<= 4, c >= 48 && 57 >= c) u += c - 48; else if (c >= 65 && 70 >= c) u += 10 + c - 65; else {
                                if (!(c >= 97 && 102 >= c)) throw new J("Not a hex digit");
                                u += 10 + c - 95;
                            }
                        }
                        var g = new k();
                        g.__b += String.fromCharCode(u), r += g.__b;
                        continue;
                    }
                    throw new J("Invalid escape sequence '\\" + e + "'");
                }
                if ("\\" == e) {
                    i = !0;
                    continue;
                }
                if (e == n) return r;
                r += e;
            } else {
                if ("/" == e) {
                    var m = this.json.charAt(this.pos);
                    if ("/" == m) {
                        a = !0, this.pos++;
                        continue;
                    }
                    if ("*" == m) {
                        l = !0, this.pos++;
                        continue;
                    }
                }
                if (s) {
                    if (" " == e || "\n" == e || "\r" == e || "	" == e || "," == e || ":" == e || "}" == e || "]" == e) return this.pos--, 
                    r;
                    r += e;
                } else if (" " != e && "	" != e && "\n" != e && "\r" != e) {
                    if ("{" == e || "}" == e || "[" == e || "]" == e || "," == e || ":" == e) return e;
                    "'" != e && '"' != e ? (s = !0, r = e) : (t = !0, n = e, this.lastSymbolQuoted = !0);
                }
            }
            if (t) throw new J("Unexpected end of data. Expected ( " + n + " )");
            return r;
        },
        defaultStringProcessor: function(e) {
            return e;
        },
        __class__: sr
    };
    var ar = function(e) {
        null == e && (e = !0), this.uCache = e, this.uCache && (this.cache = []);
    };
    s["tjson.TJSONEncoder"] = ar, ar.__name__ = [ "tjson", "TJSONEncoder" ], ar.prototype = {
        cache: null,
        uCache: null,
        doEncode: function(e, t) {
            if (!f.isObject(e)) throw new J("Provided object is not an object.");
            var n;
            n = K.__instanceof(t, lr) ? t : "fancy" == t ? new ur() : new or();
            var r = new _();
            return e instanceof Array && null == e.__enum__ || K.__instanceof(e, h) ? r.add(this.encodeIterable(e, n, 0)) : K.__instanceof(e, O) ? r.add(this.encodeMap(e, n, 0)) : (this.cacheEncode(e), 
            r.add(this.encodeObject(e, n, 0))), r.b;
        },
        encodeObject: function(e, t, n) {
            var r = new _();
            r.add(t.beginObject(n));
            var i, s = 0, a = null, l = b.getClass(e);
            i = null != l ? b.getInstanceFields(l) : f.fields(e);
            var u = b.typeof(e);
            switch (u[1]) {
              case 6:
                var h = u[2];
                r.add(s++ > 0 ? t.entrySeperator(n) : t.firstEntry(n)), r.add('"_hxcls"' + t.keyValueSeperator(n)), 
                r.add(this.encodeValue(b.getClassName(h), t, n)), null != e.TJ_noEncode && (a = e.TJ_noEncode());
            }
            for (var c = 0; c < i.length; ) {
                var g = i[c];
                if (++c, !(null != a && o.indexOf(a, g, 0) >= 0)) {
                    var m = f.field(e, g), d = this.encodeValue(m, t, n);
                    null != d && (r.add(s++ > 0 ? t.entrySeperator(n) : t.firstEntry(n)), r.add('"' + g + '"' + t.keyValueSeperator(n) + d));
                }
            }
            return r.add(t.endObject(n)), r.b;
        },
        encodeMap: function(e, t, n) {
            var r = new _();
            r.add(t.beginObject(n));
            for (var i = 0, s = e.keys(); s.hasNext(); ) {
                var a = s.next();
                r.add(i++ > 0 ? t.entrySeperator(n) : t.firstEntry(n));
                var l = e.get(a);
                r.add('"' + a + '"' + t.keyValueSeperator(n)), r.add(this.encodeValue(l, t, n));
            }
            return r.add(t.endObject(n)), r.b;
        },
        encodeIterable: function(e, t, n) {
            var i = new _();
            i.add(t.beginArray(n));
            for (var s = 0, a = r(e)(); a.hasNext(); ) {
                var l = a.next();
                i.add(s++ > 0 ? t.entrySeperator(n) : t.firstEntry(n)), i.add(this.encodeValue(l, t, n));
            }
            return i.add(t.endArray(n)), i.b;
        },
        cacheEncode: function(e) {
            if (!this.uCache) return null;
            for (var t = 0, n = this.cache.length; n > t; ) {
                var r = t++;
                if (this.cache[r] == e) return '"' + ir.OBJECT_REFERENCE_PREFIX + r + '"';
            }
            return this.cache.push(e), null;
        },
        encodeValue: function(e, t, n) {
            if ((0 | e) === e || "number" == typeof e) return e;
            if (e instanceof Array && null == e.__enum__ || K.__instanceof(e, h)) {
                var r = e;
                return this.encodeIterable(r, t, n + 1);
            }
            if (K.__instanceof(e, h)) {
                var i = e;
                return this.encodeIterable(i, t, n + 1);
            }
            if (K.__instanceof(e, O)) return this.encodeMap(e, t, n + 1);
            if ("string" == typeof e) return '"' + x.replace(x.replace(x.replace(x.replace(y.string(e), "\\", "\\\\"), "\n", "\\n"), "\r", "\\r"), '"', '\\"') + '"';
            if ("boolean" == typeof e) return e;
            if (f.isObject(e)) {
                var s = this.cacheEncode(e);
                return null != s ? s : this.encodeObject(e, t, n + 1);
            }
            return null == e ? "null" : null;
        },
        __class__: ar
    };
    var lr = function() {};
    s["tjson.EncodeStyle"] = lr, lr.__name__ = [ "tjson", "EncodeStyle" ], lr.prototype = {
        beginObject: null,
        endObject: null,
        beginArray: null,
        endArray: null,
        firstEntry: null,
        entrySeperator: null,
        keyValueSeperator: null,
        __class__: lr
    };
    var or = function() {};
    s["tjson.SimpleStyle"] = or, or.__name__ = [ "tjson", "SimpleStyle" ], or.__interfaces__ = [ lr ], 
    or.prototype = {
        beginObject: function() {
            return "{";
        },
        endObject: function() {
            return "}";
        },
        beginArray: function() {
            return "[";
        },
        endArray: function() {
            return "]";
        },
        firstEntry: function() {
            return "";
        },
        entrySeperator: function() {
            return ",";
        },
        keyValueSeperator: function() {
            return ":";
        },
        __class__: or
    };
    var ur = function(e) {
        null == e && (e = "    "), this.tab = e, this.charTimesNCache = [ "" ];
    };
    s["tjson.FancyStyle"] = ur, ur.__name__ = [ "tjson", "FancyStyle" ], ur.__interfaces__ = [ lr ], 
    ur.prototype = {
        tab: null,
        beginObject: function() {
            return "{\n";
        },
        endObject: function(e) {
            return "\n" + this.charTimesN(e) + "}";
        },
        beginArray: function() {
            return "[\n";
        },
        endArray: function(e) {
            return "\n" + this.charTimesN(e) + "]";
        },
        firstEntry: function(e) {
            return this.charTimesN(e + 1) + " ";
        },
        entrySeperator: function(e) {
            return "\n" + this.charTimesN(e + 1) + ",";
        },
        keyValueSeperator: function() {
            return " : ";
        },
        charTimesNCache: null,
        charTimesN: function(e) {
            return e < this.charTimesNCache.length ? this.charTimesNCache[e] : this.charTimesNCache[e] = this.charTimesN(e - 1) + this.tab;
        },
        __class__: ur
    };
    var hr = 0;
    Array.prototype.indexOf && (o.indexOf = function(e, t, n) {
        return Array.prototype.indexOf.call(e, t, n);
    }), s.Math = Math, String.prototype.__class__ = s.String = String, String.__name__ = [ "String" ], 
    s.Array = Array, Array.__name__ = [ "Array" ], Date.prototype.__class__ = s.Date = Date, 
    Date.__name__ = [ "Date" ];
    var cr = s.Int = {
        __name__: [ "Int" ]
    }, fr = s.Dynamic = {
        __name__: [ "Dynamic" ]
    }, gr = s.Float = Number;
    gr.__name__ = [ "Float" ];
    var mr = s.Bool = Boolean;
    mr.__ename__ = [ "Bool" ];
    var dr = s.Class = {
        __name__: [ "Class" ]
    }, pr = {};
    null == Array.prototype.map && (Array.prototype.map = function(e) {
        for (var t = [], n = 0, r = this.length; r > n; ) {
            var i = n++;
            t[i] = e(this[i]);
        }
        return t;
    }), null == Array.prototype.filter && (Array.prototype.filter = function(e) {
        for (var t = [], n = 0, r = this.length; r > n; ) {
            var i = n++, s = this[i];
            e(s) && t.push(s);
        }
        return t;
    }), createjs.DisplayObject.prototype.setBounds = function(e, t, n, r) {
        this._bounds = null != e ? (this._bounds || new createjs.Rectangle()).setValues(e, t, n, r) : null;
    };
    var vr = {};
    !function(e, t) {
        t(function() {
            function t(e) {
                var t;
                if (e) if ("string" == typeof e) t = v[e]; else {
                    t = [];
                    for (var n = 0, r = e.length; r > n; ) !function(e) {
                        v[e] && t.push(e);
                    }(e[n++]);
                    t = 0 in t && t[0] || null;
                } else t = v;
                return t;
            }
            function n() {
                for (var e; p.length; ) e = p.shift(), e.callback(t(e.option));
            }
            function r() {
                d = !0, s = h.body, a = s || h.createElement("body"), l = h.createElement("div"), 
                o = h.createElement("span"), o.innerHTML = ".", (s ? l : a).innerHTML += f, a.appendChild(l), 
                s || (a.style.background = "", a.style.overflow = "hidden", u = c.style.overflow, 
                c.style.overflow = "hidden", c.appendChild(a));
                for (var e, t = 0, n = g.length, r = [], p = new Date(), y = 2e3; n > t; ) !function(e, t) {
                    t.className = "test-" + e, r.push(t), l.appendChild(t);
                }(g[t++], o.cloneNode(!0));
                !function t() {
                    for (var s = 0; n > s; ) 10 == r[s].offsetWidth && (e = !0, v[g[s]] = !0), s++;
                    e ? (m = !0, i()) : new Date() - p > y ? i() : setTimeout(t, 100);
                }();
            }
            function i() {
                s ? l.parentNode.removeChild(l) : (a.parentNode.removeChild(a), c.style.overflow = u), 
                n(), d = !1;
            }
            var s, a, l, o, u, h = e.document, c = h.documentElement, f = '&#173;<style>@font-face{font-family:test-woff2;src:url(data:font/woff2;base64,d09GMgABAAAAAAIkAAoAAAAABVwAAAHcAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlYAgloKLEoBNgIkAxgLDgAEIAWDcgc1G7IEyB6SJAFID5YA3nAHC6h4+H7s27nP1kTyOoQkGuJWtNGIJKYznRI3VEL7IaHq985ZUuKryZKcAtJsi5eULwUybm9KzajBBhywZ5ZwoJNuwDX5C/xBjvz5DbsoNsvG1NGQiqp0NMLZ7JlnW+5MaM3HwcHheUQeiVokekHkn/FRdefvJaTp2PczN+I1Sc3k9VuX51Tb0Tqqf1deVXGdJsDOhz0/EffMOPOzHNH06pYkDDjs+P8fb/z/8n9Iq8ITzWywkP6PBMMN9L/O7vY2FNoTAkp5PpD6g1nV9WmyQnM5uPpAMHR2fe06jbfvzPriekVTQxC6lpKr43oDtRZfCATl5OVAUKykqwm9o8R/kg37cxa6eZikS7cjK4aIwoyh6jOFplhFrz2b833G3Jii9AjDUiAZ9AxZtxdEYV6imvRF0+0Nej3wu6nPZrTLh81AVcV3kmMVdQj6Qbe9qetzbuDZ7vXOlRrqooFSxCv6SfrDICA6rnHZXQPVcUHJYGcoqa3jVH7ATrjWBNYYkEqF3RFpVIl0q2JvMOJd7/TyjXHw2NyAuJpNaEbz8RTEVtCbSH7JrwQQOqwGl7sTUOtdBZIY2DKqKlvOmPvUxJaURAZZcviTT0SKHCXqzwc=) format("woff2");font-weight:400}@font-face{font-family:test-woff;src:url(data:font/woff;base64,d09GRgABAAAAAAOEAAoAAAAABVwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAA9AAAAEEAAABWXgxFo2NtYXAAAAE4AAAASQAAAVrCBCIvZ2x5ZgAAAYQAAAApAAAALBOjUapoZWFkAAABsAAAAC0AAAA2BMSve2hoZWEAAAHgAAAAHgAAACQG0gUHaG10eAAAAgAAAAATAAAAGBfUAABsb2NhAAACFAAAAA4AAAAOACwAJG1heHAAAAIkAAAAHwAAACABEQAQbmFtZQAAAkQAAAEeAAAB8l01citwb3N0AAADZAAAAB8AAAA1AyQCCHicY2Bk/sk4gYGVgYP5O0sCAwPDAwjNzMDgxziHgYGJgRXIxAYC0lxTGByAGoCa/x1gmMDKwAjkMTCC5AAZ5wtJAAAAeJxjYGBgZoBgGQZGBhAIAfIYwXwWBgsgzcXAwcAEhAwMvAx6Dxj+/wergrP/f/l/RYEZqhcKGNkYUAEjAwHAREjBkAMAewYLEAAAAHicY2BkAAJGB1YGBmYGBkFFQUVGh38HWBn+HQAJM8AAUM6SGQBoaQSxAAAAeJxjYGRgYABiE72TQvH8Nl8ZuNkcgCIMl4yN5yPTjA6sIIqDgQlEAQDiBwcuAAAAeJxjYGRgYGX4d4BhApsDAxAwOjAwMqACNgBPYgLjAAB4nGP8wsDA5gDBzAoIDAAiXAHrAAAAAAAAAAAOABYAFgAWAAB4nGNgZGBgYGNgYQDRDAxMQMwFhAwM/8F8BgAJZwEiAHicXY6/bsIwEMa/QEhbkFqkSu1qdWCplAAjDwBzGdgDOAGUxJFjkFg7duxTdOxT9Ln6xT064JPvfvfdHxvAED8I0J4At963p4MbZn/cRYgH4ZD2KNzDAM/CEfUX4T5eMRIesPuNG4LwjsoQW+EO7uGEu3zpXTgkfwj38IRP4Yj6l3AfK3wLDzAKosxUTheFWer8WKTW6ca1d6VtszeVmsTjNl3oStvU6a1an1VzyqfOZSqzplRzmVe1NQe9cfHOuXqWJJe98caUyGBQ8c8aBc1gScpxJKewXm/oL3HFaEl7P6UwQYzxf3XBWPmO1Gtbdqxxpm9w4tap35Qxz9hjUJLmV+8r1L52oLKhHmPnp2rMkNCu/xuzi5t+Abr4U+YAAHicY2BigAABBuyAjYGBkYmRmZGFkZWRDSoGAATyADIA) format("woff");font-weight:400}@font-face{font-family:test-ttf;src:url(data:font/ttf;base64,AAEAAAAKAIAAAwAgT1MvMl4MRaMAAAEoAAAAVmNtYXDCBCIvAAABmAAAAVpnbHlmE6NRqgAAAwQAAAAsaGVhZATEr3sAAADQAAAANmhoZWEG0gUHAAAArAAAACRobXR4F9QAAAAAAYAAAAAYbG9jYQAsACQAAAL0AAAADm1heHABEQAQAAABCAAAACBuYW1lXTVyKwAAAzAAAAHycG9zdAMkAggAAAUkAAAANQABAAAFAP7AAJAGQAAAAAABQAABAAAAAAAAAAAAAAAAAAAABgABAAAAAQAANC7Orl8PPPUACwZAAAAAANIzM58AAAAA0jMznwAAAAABQAUAAAAACAACAAAAAAAAAAEAAAAGAAQAAQAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQP5AZAABQAAA/cEYAAAAOAD9wRgAAADAABOAZwAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABAAADgAAUA/sAAkAUAAUAAAAABAAAAAAAAAfQAAAZAAAAGQAAAAyAAAAMgAAADIAAAAAAAAwAAAAMAAAAcAAEAAAAAAFQAAwABAAAAHAAEADgAAAAKAAgAAgACAAAADQAu4AD//wAAAAAADQAu4AD//wAA//T/1CADAAEAAAAAAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AFgAWABYAAAABAAAAAAFABQAAAwAAESERIQFA/sAFAP7AAAAAAQAAAAAAAAAAAAMAADkDAAAAEADGAAEAAAAAAAEACAAAAAEAAAAAAAIABwAIAAEAAAAAAAMABAAPAAEAAAAAAAQABAATAAEAAAAAAAUACwAXAAEAAAAAAAYABAAiAAEAAAAAAAoAKwAmAAEAAAAAAAsAEwBRAAMAAQQJAAEAEABkAAMAAQQJAAIADgB0AAMAAQQJAAMACACCAAMAAQQJAAQACACKAAMAAQQJAAUAFgCSAAMAAQQJAAYACACoAAMAAQQJAAoAVgCwAAMAAQQJAAsAJgEGZm9udGVsbG9SZWd1bGFydGVzdHRlc3RWZXJzaW9uIDEuMHRlc3RHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBmAG8AbgB0AGUAbABsAG8AUgBlAGcAdQBsAGEAcgB0AGUAcwB0AHQAZQBzAHQAVgBlAHIAcwBpAG8AbgAgADEALgAwAHQAZQBzAHQARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAABAgEDAQQBBQEGAAAAAAAAAAAAAA==) format("truetype");font-weight:400}@font-face{font-family:test-svg;src:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGZvbnQgaWQ9InRlc3QiIGhvcml6LWFkdi14PSIxNjAwIiA+Cjxmb250LWZhY2UgdW5pdHMtcGVyLWVtPSIxNjAwIiBhc2NlbnQ9IjEyODAiIGRlc2NlbnQ9Ii0zMjAiIC8+CjxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSI1MDAiIC8+CjxnbHlwaCBob3Jpei1hZHYteD0iODAwIiAvPgo8Z2x5cGggaG9yaXotYWR2LXg9IjgwMCIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGQ7IiAvPgo8Z2x5cGggdW5pY29kZT0iLiIgZD0iTTAgMTI4MGgzMjB2LTMyMGgtMzIwdjMyMHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlMDAwOyIgaG9yaXotYWR2LXg9IjgwMCIgZD0iTTAgMHYwdjB2MHYweiIgLz4KPC9mb250Pgo8L2RlZnM+PC9zdmc+IA==) format("svg");font-weight:400}.test-woff2,.test-woff,.test-ttf,.test-svg{font-size:10px;font-weight:400}.test-woff2{font-family:test-woff2}.test-woff{font-family:test-woff}.test-ttf{font-family:test-ttf}.test-svg{font-family:test-svg}</style>', g = [ "woff2", "woff", "ttf", "svg" ], m = !1, d = !1, p = [], v = {};
            return function(e, t) {
                if (p.push({
                    callback: e,
                    option: t || null
                }), m) n(); else {
                    if (d) return;
                    r();
                }
            };
        });
    }(window, "function" == typeof define && define.amd ? define : function(e) {
        window.fontSupport = e();
    });
    var yr = window.jQuery, _r = _r || {};
    _r.JQuery = yr;
    var xr = Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null")() || $;
    null == xr.prototype.slice && (xr.prototype.slice = $.sliceImpl);
    var Ar = (Function("return typeof DataView != 'undefined' ? DataView : null")() || et, 
    Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null")() || tt._new);
    THREE.SpriteCanvasMaterial = function(e) {
        THREE.Material.call(this), this.type = "SpriteCanvasMaterial", this.color = new THREE.Color(16777215), 
        this.program = function() {}, this.setValues(e);
    }, THREE.SpriteCanvasMaterial.prototype = Object.create(THREE.Material.prototype), 
    THREE.SpriteCanvasMaterial.prototype.constructor = THREE.SpriteCanvasMaterial, THREE.SpriteCanvasMaterial.prototype.clone = function() {
        var e = new THREE.SpriteCanvasMaterial();
        return e.copy(this), e.color.copy(this.color), e.program = this.program, e;
    }, THREE.CanvasRenderer = function(t) {
        function n() {
            yt.setRGB(0, 0, 0), _t.setRGB(0, 0, 0), xt.setRGB(0, 0, 0);
            for (var e = 0, t = w.length; t > e; e++) {
                var n = w[e], r = n.color;
                n instanceof THREE.AmbientLight ? yt.add(r) : n instanceof THREE.DirectionalLight ? _t.add(r) : n instanceof THREE.PointLight && xt.add(r);
            }
        }
        function r(e, t, n) {
            for (var r = 0, i = w.length; i > r; r++) {
                var s = w[r];
                if (gt.copy(s.color), s instanceof THREE.DirectionalLight) {
                    var a = At.setFromMatrixPosition(s.matrixWorld).normalize(), l = t.dot(a);
                    if (0 >= l) continue;
                    l *= s.intensity, n.add(gt.multiplyScalar(l));
                } else if (s instanceof THREE.PointLight) {
                    var a = At.setFromMatrixPosition(s.matrixWorld), l = t.dot(At.subVectors(a, e).normalize());
                    if (0 >= l) continue;
                    if (l *= 0 == s.distance ? 1 : 1 - Math.min(e.distanceTo(a) / s.distance, 1), 0 == l) continue;
                    l *= s.intensity, n.add(gt.multiplyScalar(l));
                }
            }
        }
        function i(e, t, n) {
            g(n.opacity), m(n.blending);
            var r = t.scale.x * G, i = t.scale.y * V, s = .5 * Math.sqrt(r * r + i * i);
            if (vt.min.set(e.x - s, e.y - s), vt.max.set(e.x + s, e.y + s), n instanceof THREE.SpriteMaterial) {
                var a = n.map;
                if (null !== a) {
                    var l = mt[a.id];
                    if ((void 0 === l || l.version !== a.version) && (l = h(a), mt[a.id] = l), void 0 !== l.canvas) {
                        _(l.canvas);
                        var o = a.image, u = o.width * a.offset.x, c = o.height * a.offset.y, f = o.width * a.repeat.x, d = o.height * a.repeat.y, p = r / f, v = i / d;
                        $.save(), $.translate(e.x, e.y), 0 !== n.rotation && $.rotate(n.rotation), $.translate(-r / 2, -i / 2), 
                        $.scale(p, v), $.translate(-u, -c), $.fillRect(u, c, f, d), $.restore();
                    }
                } else _(n.color.getStyle()), $.save(), $.translate(e.x, e.y), 0 !== n.rotation && $.rotate(n.rotation), 
                $.scale(r, -i), $.fillRect(-.5, -.5, 1, 1), $.restore();
            } else n instanceof THREE.SpriteCanvasMaterial && (y(n.color.getStyle()), _(n.color.getStyle()), 
            $.save(), $.translate(e.x, e.y), 0 !== n.rotation && $.rotate(n.rotation), $.scale(r, i), 
            n.program($), $.restore());
        }
        function s(e, t, n, r) {
            if (g(r.opacity), m(r.blending), $.beginPath(), $.moveTo(e.positionScreen.x, e.positionScreen.y), 
            $.lineTo(t.positionScreen.x, t.positionScreen.y), r instanceof THREE.LineBasicMaterial) {
                if (d(r.linewidth), p(r.linecap), v(r.linejoin), r.vertexColors !== THREE.VertexColors) y(r.color.getStyle()); else {
                    var i = n.vertexColors[0].getStyle(), s = n.vertexColors[1].getStyle();
                    if (i === s) y(i); else {
                        try {
                            var a = $.createLinearGradient(e.positionScreen.x, e.positionScreen.y, t.positionScreen.x, t.positionScreen.y);
                            a.addColorStop(0, i), a.addColorStop(1, s);
                        } catch (e) {
                            a = i;
                        }
                        y(a);
                    }
                }
                $.stroke(), vt.expandByScalar(2 * r.linewidth);
            } else r instanceof THREE.LineDashedMaterial && (d(r.linewidth), p(r.linecap), v(r.linejoin), 
            y(r.color.getStyle()), x([ r.dashSize, r.gapSize ]), $.stroke(), vt.expandByScalar(2 * r.linewidth), 
            x([]));
        }
        function a(e, t, n, i, s, a, h, f) {
            if (H.info.render.vertices += 3, H.info.render.faces++, g(f.opacity), m(f.blending), 
            P = e.positionScreen.x, I = e.positionScreen.y, T = t.positionScreen.x, k = t.positionScreen.y, 
            M = n.positionScreen.x, R = n.positionScreen.y, l(P, I, T, k, M, R), (f instanceof THREE.MeshLambertMaterial || f instanceof THREE.MeshPhongMaterial) && null === f.map) ct.copy(f.color), 
            ft.copy(f.emissive), f.vertexColors === THREE.FaceColors && ct.multiply(h.color), 
            ht.copy(yt), bt.copy(e.positionWorld).add(t.positionWorld).add(n.positionWorld).divideScalar(3), 
            r(bt, h.normalModel, ht), ht.multiply(ct).add(ft), f.wireframe === !0 ? o(ht, f.wireframeLinewidth, f.wireframeLinecap, f.wireframeLinejoin) : u(ht); else if (f instanceof THREE.MeshBasicMaterial || f instanceof THREE.MeshLambertMaterial || f instanceof THREE.MeshPhongMaterial) if (null !== f.map) {
                var d = f.map.mapping;
                d === THREE.UVMapping && (F = h.uvs, c(P, I, T, k, M, R, F[i].x, F[i].y, F[s].x, F[s].y, F[a].x, F[a].y, f.map));
            } else null !== f.envMap ? f.envMap.mapping === THREE.SphericalReflectionMapping && (wt.copy(h.vertexNormalsModel[i]).applyMatrix3(Nt), 
            O = .5 * wt.x + .5, B = .5 * wt.y + .5, wt.copy(h.vertexNormalsModel[s]).applyMatrix3(Nt), 
            j = .5 * wt.x + .5, D = .5 * wt.y + .5, wt.copy(h.vertexNormalsModel[a]).applyMatrix3(Nt), 
            L = .5 * wt.x + .5, z = .5 * wt.y + .5, c(P, I, T, k, M, R, O, B, j, D, L, z, f.envMap)) : (ht.copy(f.color), 
            f.vertexColors === THREE.FaceColors && ht.multiply(h.color), f.wireframe === !0 ? o(ht, f.wireframeLinewidth, f.wireframeLinecap, f.wireframeLinejoin) : u(ht)); else f instanceof THREE.MeshNormalMaterial ? (wt.copy(h.normalModel).applyMatrix3(Nt), 
            ht.setRGB(wt.x, wt.y, wt.z).multiplyScalar(.5).addScalar(.5), f.wireframe === !0 ? o(ht, f.wireframeLinewidth, f.wireframeLinecap, f.wireframeLinejoin) : u(ht)) : (ht.setRGB(1, 1, 1), 
            f.wireframe === !0 ? o(ht, f.wireframeLinewidth, f.wireframeLinecap, f.wireframeLinejoin) : u(ht));
        }
        function l(e, t, n, r, i, s) {
            $.beginPath(), $.moveTo(e, t), $.lineTo(n, r), $.lineTo(i, s), $.closePath();
        }
        function o(e, t, n, r) {
            d(t), p(n), v(r), y(e.getStyle()), $.stroke(), vt.expandByScalar(2 * t);
        }
        function u(e) {
            _(e.getStyle()), $.fill();
        }
        function h(e) {
            if (0 === e.version || e instanceof THREE.CompressedTexture || e instanceof THREE.DataTexture) return {
                canvas: void 0,
                version: e.version
            };
            var t = e.image, n = document.createElement("canvas");
            n.width = t.width, n.height = t.height;
            var r = n.getContext("2d");
            r.setTransform(1, 0, 0, -1, 0, t.height), r.drawImage(t, 0, 0);
            var i = e.wrapS === THREE.RepeatWrapping, s = e.wrapT === THREE.RepeatWrapping, a = "no-repeat";
            return i === !0 && s === !0 ? a = "repeat" : i === !0 ? a = "repeat-x" : s === !0 && (a = "repeat-y"), 
            {
                canvas: $.createPattern(n, a),
                version: e.version
            };
        }
        function c(e, t, n, r, i, s, a, l, o, u, c, f, g) {
            var m = mt[g.id];
            if ((void 0 === m || m.version !== g.version) && (m = h(g), mt[g.id] = m), void 0 === m.canvas) return _("rgba( 0, 0, 0, 1)"), 
            void $.fill();
            _(m.canvas);
            var d, p, v, y, x, A, b, w, N = g.offset.x / g.repeat.x, E = g.offset.y / g.repeat.y, S = g.image.width * g.repeat.x, C = g.image.height * g.repeat.y;
            a = (a + N) * S, l = (l + E) * C, o = (o + N) * S, u = (u + E) * C, c = (c + N) * S, 
            f = (f + E) * C, n -= e, r -= t, i -= e, s -= t, o -= a, u -= l, c -= a, f -= l, 
            b = o * f - c * u, 0 !== b && (w = 1 / b, d = (f * n - u * i) * w, p = (f * r - u * s) * w, 
            v = (o * i - c * n) * w, y = (o * s - c * r) * w, x = e - d * a - v * l, A = t - p * a - y * l, 
            $.save(), $.transform(d, p, v, y, x, A), $.fill(), $.restore());
        }
        function f(e, t, n) {
            var r, i = t.x - e.x, s = t.y - e.y, a = i * i + s * s;
            0 !== a && (r = n / Math.sqrt(a), i *= r, s *= r, t.x += i, t.y += s, e.x -= i, 
            e.y -= s);
        }
        function g(e) {
            nt !== e && ($.globalAlpha = e, nt = e);
        }
        function m(e) {
            rt !== e && (e === THREE.NormalBlending ? $.globalCompositeOperation = "source-over" : e === THREE.AdditiveBlending ? $.globalCompositeOperation = "lighter" : e === THREE.SubtractiveBlending && ($.globalCompositeOperation = "darker"), 
            rt = e);
        }
        function d(e) {
            at !== e && ($.lineWidth = e, at = e);
        }
        function p(e) {
            lt !== e && ($.lineCap = e, lt = e);
        }
        function v(e) {
            ot !== e && ($.lineJoin = e, ot = e);
        }
        function y(e) {
            it !== e && ($.strokeStyle = e, it = e);
        }
        function _(e) {
            st !== e && ($.fillStyle = e, st = e);
        }
        function x(e) {
            ut.length !== e.length && ($.setLineDash(e), ut = e);
        }
        t = t || {};
        var A, b, w, N, E, S, C, P, I, T, k, M, R, F, O, B, j, D, L, z, H = this, q = new THREE.Projector(), X = void 0 !== t.canvas ? t.canvas : document.createElement("canvas"), Y = X.width, U = X.height, G = Math.floor(Y / 2), V = Math.floor(U / 2), Q = 0, W = 0, Z = Y, J = U, K = 1, $ = X.getContext("2d", {
            alpha: t.alpha === !0
        }), et = new THREE.Color(0), tt = t.alpha === !0 ? 0 : 1, nt = 1, rt = 0, it = null, st = null, at = null, lt = null, ot = null, ut = [], ht = (new THREE.RenderableVertex(), 
        new THREE.RenderableVertex(), new THREE.Color()), ct = (new THREE.Color(), new THREE.Color(), 
        new THREE.Color(), new THREE.Color(), new THREE.Color()), ft = new THREE.Color(), gt = new THREE.Color(), mt = {}, dt = new THREE.Box2(), pt = new THREE.Box2(), vt = new THREE.Box2(), yt = new THREE.Color(), _t = new THREE.Color(), xt = new THREE.Color(), At = new THREE.Vector3(), bt = new THREE.Vector3(), wt = new THREE.Vector3(), Nt = new THREE.Matrix3();
        void 0 === $.setLineDash && ($.setLineDash = function() {}), this.domElement = X, 
        this.autoClear = !0, this.sortObjects = !0, this.sortElements = !0, this.info = {
            render: {
                vertices: 0,
                faces: 0
            }
        }, this.supportsVertexTextures = function() {}, this.setFaceCulling = function() {}, 
        this.getContext = function() {
            return $;
        }, this.getContextAttributes = function() {
            return $.getContextAttributes();
        }, this.getPixelRatio = function() {
            return K;
        }, this.setPixelRatio = function(e) {
            void 0 !== e && (K = e);
        }, this.setSize = function(e, t, n) {
            Y = e * K, U = t * K, X.width = Y, X.height = U, G = Math.floor(Y / 2), V = Math.floor(U / 2), 
            n !== !1 && (X.style.width = e + "px", X.style.height = t + "px"), dt.min.set(-G, -V), 
            dt.max.set(G, V), pt.min.set(-G, -V), pt.max.set(G, V), nt = 1, rt = 0, it = null, 
            st = null, at = null, lt = null, ot = null, this.setViewport(0, 0, e, t);
        }, this.setViewport = function(e, t, n, r) {
            Q = e * K, W = t * K, Z = n * K, J = r * K;
        }, this.setScissor = function() {}, this.enableScissorTest = function() {}, this.setClearColor = function(e, t) {
            et.set(e), tt = void 0 !== t ? t : 1, pt.min.set(-G, -V), pt.max.set(G, V);
        }, this.setClearColorHex = function(t, n) {
            e.warn("THREE.CanvasRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead."), 
            this.setClearColor(t, n);
        }, this.getClearColor = function() {
            return et;
        }, this.getClearAlpha = function() {
            return tt;
        }, this.getMaxAnisotropy = function() {
            return 0;
        }, this.clear = function() {
            pt.empty() === !1 && (pt.intersect(dt), pt.expandByScalar(2), pt.min.x = pt.min.x + G, 
            pt.min.y = -pt.min.y + V, pt.max.x = pt.max.x + G, pt.max.y = -pt.max.y + V, 1 > tt && $.clearRect(0 | pt.min.x, 0 | pt.max.y, pt.max.x - pt.min.x | 0, pt.min.y - pt.max.y | 0), 
            tt > 0 && (m(THREE.NormalBlending), g(1), _("rgba(" + Math.floor(255 * et.r) + "," + Math.floor(255 * et.g) + "," + Math.floor(255 * et.b) + "," + tt + ")"), 
            $.fillRect(0 | pt.min.x, 0 | pt.max.y, pt.max.x - pt.min.x | 0, pt.min.y - pt.max.y | 0)), 
            pt.makeEmpty());
        }, this.clearColor = function() {}, this.clearDepth = function() {}, this.clearStencil = function() {}, 
        this.render = function(t, r) {
            if (r instanceof THREE.Camera == !1) return void e.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
            this.autoClear === !0 && this.clear(), H.info.render.vertices = 0, H.info.render.faces = 0, 
            $.setTransform(Z / Y, 0, 0, -J / U, Q, U - W), $.translate(G, V), A = q.projectScene(t, r, this.sortObjects, this.sortElements), 
            b = A.elements, w = A.lights, N = r, Nt.getNormalMatrix(r.matrixWorldInverse), n();
            for (var l = 0, o = b.length; o > l; l++) {
                var u = b[l], h = u.material;
                if (void 0 !== h && 0 !== h.opacity) {
                    if (vt.makeEmpty(), u instanceof THREE.RenderableSprite) E = u, E.x *= G, E.y *= V, 
                    i(E, u, h); else if (u instanceof THREE.RenderableLine) E = u.v1, S = u.v2, E.positionScreen.x *= G, 
                    E.positionScreen.y *= V, S.positionScreen.x *= G, S.positionScreen.y *= V, vt.setFromPoints([ E.positionScreen, S.positionScreen ]), 
                    dt.isIntersectionBox(vt) === !0 && s(E, S, u, h); else if (u instanceof THREE.RenderableFace) {
                        if (E = u.v1, S = u.v2, C = u.v3, E.positionScreen.z < -1 || E.positionScreen.z > 1) continue;
                        if (S.positionScreen.z < -1 || S.positionScreen.z > 1) continue;
                        if (C.positionScreen.z < -1 || C.positionScreen.z > 1) continue;
                        E.positionScreen.x *= G, E.positionScreen.y *= V, S.positionScreen.x *= G, S.positionScreen.y *= V, 
                        C.positionScreen.x *= G, C.positionScreen.y *= V, h.overdraw > 0 && (f(E.positionScreen, S.positionScreen, h.overdraw), 
                        f(S.positionScreen, C.positionScreen, h.overdraw), f(C.positionScreen, E.positionScreen, h.overdraw)), 
                        vt.setFromPoints([ E.positionScreen, S.positionScreen, C.positionScreen ]), dt.isIntersectionBox(vt) === !0 && a(E, S, C, 0, 1, 2, u, h);
                    }
                    pt.union(vt);
                }
            }
            $.setTransform(1, 0, 0, 1, 0, 0);
        };
    }, THREE.RenderableObject = function() {
        this.id = 0, this.object = null, this.z = 0, this.renderOrder = 0;
    }, THREE.RenderableFace = function() {
        this.id = 0, this.v1 = new THREE.RenderableVertex(), this.v2 = new THREE.RenderableVertex(), 
        this.v3 = new THREE.RenderableVertex(), this.normalModel = new THREE.Vector3(), 
        this.vertexNormalsModel = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ], 
        this.vertexNormalsLength = 0, this.color = new THREE.Color(), this.material = null, 
        this.uvs = [ new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2() ], this.z = 0, 
        this.renderOrder = 0;
    }, THREE.RenderableVertex = function() {
        this.position = new THREE.Vector3(), this.positionWorld = new THREE.Vector3(), this.positionScreen = new THREE.Vector4(), 
        this.visible = !0;
    }, THREE.RenderableVertex.prototype.copy = function(e) {
        this.positionWorld.copy(e.positionWorld), this.positionScreen.copy(e.positionScreen);
    }, THREE.RenderableLine = function() {
        this.id = 0, this.v1 = new THREE.RenderableVertex(), this.v2 = new THREE.RenderableVertex(), 
        this.vertexColors = [ new THREE.Color(), new THREE.Color() ], this.material = null, 
        this.z = 0, this.renderOrder = 0;
    }, THREE.RenderableSprite = function() {
        this.id = 0, this.object = null, this.x = 0, this.y = 0, this.z = 0, this.rotation = 0, 
        this.scale = new THREE.Vector2(), this.material = null, this.renderOrder = 0;
    }, THREE.Projector = function() {
        function t() {
            if (u === x) {
                var e = new THREE.RenderableObject();
                return _.push(e), x++, u++, e;
            }
            return _[u++];
        }
        function n() {
            if (c === b) {
                var e = new THREE.RenderableVertex();
                return A.push(e), b++, c++, e;
            }
            return A[c++];
        }
        function r() {
            if (g === N) {
                var e = new THREE.RenderableFace();
                return w.push(e), N++, g++, e;
            }
            return w[g++];
        }
        function i() {
            if (d === S) {
                var e = new THREE.RenderableLine();
                return E.push(e), S++, d++, e;
            }
            return E[d++];
        }
        function s() {
            if (v === P) {
                var e = new THREE.RenderableSprite();
                return C.push(e), P++, v++, e;
            }
            return C[v++];
        }
        function a(e, t) {
            return e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id !== t.id ? e.id - t.id : 0;
        }
        function l(e, t) {
            var n = 0, r = 1, i = e.z + e.w, s = t.z + t.w, a = -e.z + e.w, l = -t.z + t.w;
            return i >= 0 && s >= 0 && a >= 0 && l >= 0 ? !0 : 0 > i && 0 > s || 0 > a && 0 > l ? !1 : (0 > i ? n = Math.max(n, i / (i - s)) : 0 > s && (r = Math.min(r, i / (i - s))), 
            0 > a ? n = Math.max(n, a / (a - l)) : 0 > l && (r = Math.min(r, a / (a - l))), 
            n > r ? !1 : (e.lerp(t, n), t.lerp(e, 1 - r), !0));
        }
        var o, u, h, c, f, g, m, d, p, v, y, _ = [], x = 0, A = [], b = 0, w = [], N = 0, E = [], S = 0, C = [], P = 0, I = {
            objects: [],
            lights: [],
            elements: []
        }, T = new THREE.Vector3(), k = new THREE.Vector4(), M = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)), R = new THREE.Box3(), F = new Array(3), O = (new Array(4), 
        new THREE.Matrix4()), B = new THREE.Matrix4(), j = new THREE.Matrix4(), D = new THREE.Matrix3(), L = new THREE.Frustum(), z = new THREE.Vector4(), H = new THREE.Vector4();
        this.projectVector = function(t, n) {
            e.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(n);
        }, this.unprojectVector = function(t, n) {
            e.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), t.unproject(n);
        }, this.pickingRay = function() {
            e.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().");
        };
        var q = function() {
            var e = [], t = [], s = null, a = null, l = new THREE.Matrix3(), o = function(n) {
                s = n, a = s.material, l.getNormalMatrix(s.matrixWorld), e.length = 0, t.length = 0;
            }, u = function(e) {
                var t = e.position, n = e.positionWorld, r = e.positionScreen;
                n.copy(t).applyMatrix4(y), r.copy(n).applyMatrix4(B);
                var i = 1 / r.w;
                r.x *= i, r.y *= i, r.z *= i, e.visible = r.x >= -1 && r.x <= 1 && r.y >= -1 && r.y <= 1 && r.z >= -1 && r.z <= 1;
            }, c = function(e, t, r) {
                h = n(), h.position.set(e, t, r), u(h);
            }, g = function(t, n, r) {
                e.push(t, n, r);
            }, d = function(e, n) {
                t.push(e, n);
            }, p = function(e, t, n) {
                return e.visible === !0 || t.visible === !0 || n.visible === !0 ? !0 : (F[0] = e.positionScreen, 
                F[1] = t.positionScreen, F[2] = n.positionScreen, M.isIntersectionBox(R.setFromPoints(F)));
            }, v = function(e, t, n) {
                return (n.positionScreen.x - e.positionScreen.x) * (t.positionScreen.y - e.positionScreen.y) - (n.positionScreen.y - e.positionScreen.y) * (t.positionScreen.x - e.positionScreen.x) < 0;
            }, _ = function(e, t) {
                var n = A[e], r = A[t];
                m = i(), m.id = s.id, m.v1.copy(n), m.v2.copy(r), m.z = (n.positionScreen.z + r.positionScreen.z) / 2, 
                m.renderOrder = s.renderOrder, m.material = s.material, I.elements.push(m);
            }, x = function(n, i, o) {
                var u = A[n], h = A[i], c = A[o];
                if (p(u, h, c) !== !1 && (a.side === THREE.DoubleSide || v(u, h, c) === !0)) {
                    f = r(), f.id = s.id, f.v1.copy(u), f.v2.copy(h), f.v3.copy(c), f.z = (u.positionScreen.z + h.positionScreen.z + c.positionScreen.z) / 3, 
                    f.renderOrder = s.renderOrder, f.normalModel.fromArray(e, 3 * n), f.normalModel.applyMatrix3(l).normalize();
                    for (var g = 0; 3 > g; g++) {
                        var m = f.vertexNormalsModel[g];
                        m.fromArray(e, 3 * arguments[g]), m.applyMatrix3(l).normalize();
                        var d = f.uvs[g];
                        d.fromArray(t, 2 * arguments[g]);
                    }
                    f.vertexNormalsLength = 3, f.material = s.material, I.elements.push(f);
                }
            };
            return {
                setObject: o,
                projectVertex: u,
                checkTriangleVisibility: p,
                checkBackfaceCulling: v,
                pushVertex: c,
                pushNormal: g,
                pushUv: d,
                pushLine: _,
                pushTriangle: x
            };
        }, X = new q();
        this.projectScene = function(e, h, _, x) {
            g = 0, d = 0, v = 0, I.elements.length = 0, e.autoUpdate === !0 && e.updateMatrixWorld(), 
            null === h.parent && h.updateMatrixWorld(), O.copy(h.matrixWorldInverse.getInverse(h.matrixWorld)), 
            B.multiplyMatrices(h.projectionMatrix, O), L.setFromMatrix(B), u = 0, I.objects.length = 0, 
            I.lights.length = 0, e.traverseVisible(function(e) {
                if (e instanceof THREE.Light) I.lights.push(e); else if (e instanceof THREE.Mesh || e instanceof THREE.Line || e instanceof THREE.Sprite) {
                    var n = e.material;
                    if (n.visible === !1) return;
                    (e.frustumCulled === !1 || L.intersectsObject(e) === !0) && (o = t(), o.id = e.id, 
                    o.object = e, T.setFromMatrixPosition(e.matrixWorld), T.applyProjection(B), o.z = T.z, 
                    o.renderOrder = e.renderOrder, I.objects.push(o));
                }
            }), _ === !0 && I.objects.sort(a);
            for (var b = 0, w = I.objects.length; w > b; b++) {
                var N = I.objects[b].object, E = N.geometry;
                if (X.setObject(N), y = N.matrixWorld, c = 0, N instanceof THREE.Mesh) {
                    if (E instanceof THREE.BufferGeometry) {
                        var S = E.attributes, C = E.groups;
                        if (void 0 === S.position) continue;
                        for (var P = S.position.array, M = 0, R = P.length; R > M; M += 3) X.pushVertex(P[M], P[M + 1], P[M + 2]);
                        if (void 0 !== S.normal) for (var F = S.normal.array, M = 0, R = F.length; R > M; M += 3) X.pushNormal(F[M], F[M + 1], F[M + 2]);
                        if (void 0 !== S.uv) for (var q = S.uv.array, M = 0, R = q.length; R > M; M += 2) X.pushUv(q[M], q[M + 1]);
                        if (null !== E.index) {
                            var Y = E.index.array;
                            if (C.length > 0) for (var b = 0; b < C.length; b++) for (var U = C[b], M = U.start, R = U.start + U.count; R > M; M += 3) X.pushTriangle(Y[M], Y[M + 1], Y[M + 2]); else for (var M = 0, R = Y.length; R > M; M += 3) X.pushTriangle(Y[M], Y[M + 1], Y[M + 2]);
                        } else for (var M = 0, R = P.length / 3; R > M; M += 3) X.pushTriangle(M, M + 1, M + 2);
                    } else if (E instanceof THREE.Geometry) {
                        var G = E.vertices, V = E.faces, Q = E.faceVertexUvs[0];
                        D.getNormalMatrix(y);
                        for (var W = N.material, Z = W instanceof THREE.MeshFaceMaterial, J = Z === !0 ? N.material : null, K = 0, $ = G.length; $ > K; K++) {
                            var et = G[K];
                            if (T.copy(et), W.morphTargets === !0) for (var tt = E.morphTargets, nt = N.morphTargetInfluences, rt = 0, it = tt.length; it > rt; rt++) {
                                var st = nt[rt];
                                if (0 !== st) {
                                    var at = tt[rt], lt = at.vertices[K];
                                    T.x += (lt.x - et.x) * st, T.y += (lt.y - et.y) * st, T.z += (lt.z - et.z) * st;
                                }
                            }
                            X.pushVertex(T.x, T.y, T.z);
                        }
                        for (var ot = 0, ut = V.length; ut > ot; ot++) {
                            var ht = V[ot];
                            if (W = Z === !0 ? J.materials[ht.materialIndex] : N.material, void 0 !== W) {
                                var ct = W.side, ft = A[ht.a], gt = A[ht.b], mt = A[ht.c];
                                if (X.checkTriangleVisibility(ft, gt, mt) !== !1) {
                                    var dt = X.checkBackfaceCulling(ft, gt, mt);
                                    if (ct !== THREE.DoubleSide) {
                                        if (ct === THREE.FrontSide && dt === !1) continue;
                                        if (ct === THREE.BackSide && dt === !0) continue;
                                    }
                                    f = r(), f.id = N.id, f.v1.copy(ft), f.v2.copy(gt), f.v3.copy(mt), f.normalModel.copy(ht.normal), 
                                    dt !== !1 || ct !== THREE.BackSide && ct !== THREE.DoubleSide || f.normalModel.negate(), 
                                    f.normalModel.applyMatrix3(D).normalize();
                                    for (var pt = ht.vertexNormals, vt = 0, yt = Math.min(pt.length, 3); yt > vt; vt++) {
                                        var _t = f.vertexNormalsModel[vt];
                                        _t.copy(pt[vt]), dt !== !1 || ct !== THREE.BackSide && ct !== THREE.DoubleSide || _t.negate(), 
                                        _t.applyMatrix3(D).normalize();
                                    }
                                    f.vertexNormalsLength = pt.length;
                                    var xt = Q[ot];
                                    if (void 0 !== xt) for (var At = 0; 3 > At; At++) f.uvs[At].copy(xt[At]);
                                    f.color = ht.color, f.material = W, f.z = (ft.positionScreen.z + gt.positionScreen.z + mt.positionScreen.z) / 3, 
                                    f.renderOrder = N.renderOrder, I.elements.push(f);
                                }
                            }
                        }
                    }
                } else if (N instanceof THREE.Line) {
                    if (E instanceof THREE.BufferGeometry) {
                        var S = E.attributes;
                        if (void 0 !== S.position) {
                            for (var P = S.position.array, M = 0, R = P.length; R > M; M += 3) X.pushVertex(P[M], P[M + 1], P[M + 2]);
                            if (null !== E.index) for (var Y = E.index.array, M = 0, R = Y.length; R > M; M += 2) X.pushLine(Y[M], Y[M + 1]); else for (var bt = N instanceof THREE.LineSegments ? 2 : 1, M = 0, R = P.length / 3 - 1; R > M; M += bt) X.pushLine(M, M + 1);
                        }
                    } else if (E instanceof THREE.Geometry) {
                        j.multiplyMatrices(B, y);
                        var G = N.geometry.vertices;
                        if (0 === G.length) continue;
                        ft = n(), ft.positionScreen.copy(G[0]).applyMatrix4(j);
                        for (var bt = N instanceof THREE.LineSegments ? 2 : 1, K = 1, $ = G.length; $ > K; K++) ft = n(), 
                        ft.positionScreen.copy(G[K]).applyMatrix4(j), (K + 1) % bt > 0 || (gt = A[c - 2], 
                        z.copy(ft.positionScreen), H.copy(gt.positionScreen), l(z, H) === !0 && (z.multiplyScalar(1 / z.w), 
                        H.multiplyScalar(1 / H.w), m = i(), m.id = N.id, m.v1.positionScreen.copy(z), m.v2.positionScreen.copy(H), 
                        m.z = Math.max(z.z, H.z), m.renderOrder = N.renderOrder, m.material = N.material, 
                        N.material.vertexColors === THREE.VertexColors && (m.vertexColors[0].copy(N.geometry.colors[K]), 
                        m.vertexColors[1].copy(N.geometry.colors[K - 1])), I.elements.push(m)));
                    }
                } else if (N instanceof THREE.Sprite) {
                    k.set(y.elements[12], y.elements[13], y.elements[14], 1), k.applyMatrix4(B);
                    var wt = 1 / k.w;
                    k.z *= wt, k.z >= -1 && k.z <= 1 && (p = s(), p.id = N.id, p.x = k.x * wt, p.y = k.y * wt, 
                    p.z = k.z, p.renderOrder = N.renderOrder, p.object = N, p.rotation = N.rotation, 
                    p.scale.x = N.scale.x * Math.abs(p.x - (k.x + h.projectionMatrix.elements[0]) / (k.w + h.projectionMatrix.elements[12])), 
                    p.scale.y = N.scale.y * Math.abs(p.y - (k.y + h.projectionMatrix.elements[5]) / (k.w + h.projectionMatrix.elements[13])), 
                    p.material = N.material, I.elements.push(p));
                }
            }
            return x === !0 && I.elements.sort(a), I;
        };
    }, t.$extend = n, P.USE_CACHE = !1, P.USE_ENUM_INDEX = !1, P.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:", 
    T.DEFAULT_RESOLVER = b, T.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:", 
    R.count = 0, D.i64tmp = function() {
        var e, t = new S(0, 0);
        return e = t;
    }(this), Y.SELF_CLOSING_TAGS_HTML = {
        img: 1,
        br: 1,
        input: 1,
        meta: 1,
        link: 1,
        hr: 1,
        base: 1,
        embed: 1,
        spacer: 1,
        source: 1,
        param: 1
    }, Y.reID = "[a-z](?:-?[_a-z0-9])*", Y.reNamespacedID = Y.reID + "(?::" + Y.reID + ")?", 
    Y.reCDATA = "[<]!\\[CDATA\\[[\\s\\S]*?\\]\\][>]", Y.reScript = "[<]\\s*script\\s*([^>]*)>([\\s\\S]*?)<\\s*/\\s*script\\s*>", 
    Y.reStyle = "<\\s*style\\s*([^>]*)>([\\s\\S]*?)<\\s*/\\s*style\\s*>", Y.reElementOpen = "<\\s*(" + Y.reNamespacedID + ")", 
    Y.reAttr = Y.reNamespacedID + "\\s*=\\s*(?:'[^']*'|\"[^\"]*\"|[-_a-z0-9]+)", Y.reElementEnd = "(/)?\\s*>", 
    Y.reElementClose = "<\\s*/\\s*(" + Y.reNamespacedID + ")\\s*>", Y.reComment = "<!--[\\s\\S]*?-->", 
    Y.reMain = new l("(" + Y.reCDATA + ")|(" + Y.reScript + ")|(" + Y.reStyle + ")|(" + Y.reElementOpen + "((?:\\s+" + Y.reAttr + ")*)\\s*" + Y.reElementEnd + ")|(" + Y.reElementClose + ")|(" + Y.reComment + ")", "ig"), 
    Y.reParseAttrs = new l("(" + Y.reNamespacedID + ")\\s*=\\s*('[^']*'|\"[^\"]*\"|[-_a-z0-9]+)", "ig"), 
    K.__toStr = {}.toString, tt.BYTES_PER_ELEMENT = 1, at.autoHitArea = !1, ot.spriteSheets = {}, 
    ft.PADDING = 2, ft.fontHeightCache = new O(), ft.fontBaselineCoefCache = new O(), 
    ft.editing = !1, ft.selectionStart = 0, ft.selectionEnd = 0, dt.colors = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        "indianred ": "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
        transparent: "rgba(0,0,0,0)"
    }, yt.console = new pt(), Ot.SCENE_NAME_PATH = "scene", Ht.filters = new O(), Xt.noScale = "noScale", 
    Xt.fit = "fit", Xt.fill = "fill", Xt.stretch = "stretch", Xt.custom = "custom", 
    Ut.ide = "3.0.0", Ut.player = "3.0.0", Ut.document = "2.1.0", dn.EPS = 1e-10, dn.GAP = .01, 
    vn.EPS = 1e-7, _n.GAP = .01, xn.GAP = .01, xn.reFloat2 = new l("([-+0-9.]+),([-+0-9.]+)", ""), 
    xn.reFloat4 = new l("([-+0-9.]+),([-+0-9.]+),([-+0-9.]+),([-+0-9.]+)", ""), xn.showSelection = !0, 
    An.EPS = 1e-10, bn.DEG_TO_RAD = Math.PI / 180, Nn.showSelection = !0, Sn.EPS = 1e-10, 
    ir.OBJECT_REFERENCE_PREFIX = "@~obRef#";
}("undefined" != typeof console ? console : {
    log: function() {}
}, "undefined" != typeof window ? window : exports);