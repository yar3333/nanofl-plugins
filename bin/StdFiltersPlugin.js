(function ($hx_exports) { "use strict";
$hx_exports.createjs = $hx_exports.createjs || {};
var AdjustColorFilterPlugin = function() {
	this.properties = [{ type : "int", name : "brightness", label : "Brightness", defaultValue : 0, minValue : -100, maxValue : 100, units : "%"},{ type : "int", name : "contrast", label : "Contrast", defaultValue : 0, minValue : -100, maxValue : 100, units : "%"},{ type : "int", name : "saturation", label : "Saturation", defaultValue : 0, minValue : -100, maxValue : 100, units : "%"},{ type : "int", name : "hue", label : "Hue", defaultValue : 0, minValue : -180, maxValue : 180, units : "deg"}];
	this.label = "Adjust Color";
	this.name = "AdjustColorFilter";
};
AdjustColorFilterPlugin.__interfaces__ = [models.client.plugins.IFilterPlugin];
AdjustColorFilterPlugin.prototype = {
	getFilter: function(params) {
		return new createjs.ColorMatrixFilter(new createjs.ColorMatrix(Math.round(params.brightness / 100 * 255 * 0.4),params.contrast,params.saturation,params.hue).toArray());
	}
};
var BlurFilterPlugin = function() {
	this.properties = [{ type : "float", name : "blurX", label : "Blur X", defaultValue : 5, neutralValue : 0, units : "px", minValue : 0},{ type : "float", name : "blurY", label : "Blur Y", defaultValue : 5, neutralValue : 0, units : "px", minValue : 0},{ type : "int", name : "quality", label : "Quality", defaultValue : 1, minValue : 1, maxValue : 3}];
	this.label = "Blur";
	this.name = "BlurFilter";
};
BlurFilterPlugin.__interfaces__ = [models.client.plugins.IFilterPlugin];
BlurFilterPlugin.prototype = {
	getFilter: function(params) {
		return new createjs.BlurFilter(params.blurX * 2,params.blurY * 2,params.quality);
	}
};
var DropShadowFilterPlugin = function() {
	this.properties = [{ type : "float", name : "blurX", label : "Blur X", defaultValue : 5, units : "px", minValue : 0},{ type : "float", name : "blurY", label : "Blur Y", defaultValue : 5, units : "px", minValue : 0},{ type : "int", name : "strength", label : "Strength", defaultValue : 100, units : "%", minValue : 0, maxValue : 100},{ type : "int", name : "quality", label : "Quality", defaultValue : 1, minValue : 1, maxValue : 3},{ type : "float", name : "angle", label : "Angle", defaultValue : 45, units : "deg", minValue : 0, maxValue : 360},{ type : "float", name : "distance", label : "Distance", defaultValue : 5, units : "px", minValue : 0},{ type : "bool", name : "knockout", label : "Knockout", defaultValue : false},{ type : "bool", name : "inner", label : "Inner shadow", defaultValue : false},{ type : "bool", name : "hideObject", label : "Hide object", defaultValue : false},{ type : "color", name : "color", label : "Color", defaultValue : "#000000"},{ type : "int", name : "alpha", label : "Alpha", defaultValue : 100, neutralValue : 0, units : "%", minValue : 0, maxValue : 100}];
	this.label = "Drop Shadow";
	this.name = "DropShadowFilter";
};
DropShadowFilterPlugin.__interfaces__ = [models.client.plugins.IFilterPlugin];
DropShadowFilterPlugin.prototype = {
	getFilter: function(params) {
		var rgb = models.common.ColorTools.parse(params.color);
		var color = rgb.r << 16 | rgb.g << 8 | rgb.b;
		return new createjs.DropShadowFilter(params.distance * 2,params.angle,color,params.alpha / 100 * (params.strength / 100),params.blurX * 2,params.blurY * 2,1,params.quality,params.inner,params.knockout,params.hideObject);
	}
};
var GlowFilterPlugin = function() {
	this.properties = [{ type : "float", name : "blurX", label : "Blur X", defaultValue : 5, units : "px", minValue : 0},{ type : "float", name : "blurY", label : "Blur Y", defaultValue : 5, units : "px", minValue : 0},{ type : "int", name : "strength", label : "Strength", defaultValue : 100, units : "%", minValue : 0, maxValue : 100},{ type : "int", name : "quality", label : "Quality", defaultValue : 1, minValue : 1, maxValue : 3},{ type : "color", name : "color", label : "Color", defaultValue : "#000000"},{ type : "int", name : "alpha", label : "Alpha", defaultValue : 100, neutralValue : 0, units : "%", minValue : 0, maxValue : 100},{ type : "bool", name : "knockout", label : "Knockout", defaultValue : false},{ type : "bool", name : "inner", label : "Inner shadow", defaultValue : false}];
	this.label = "Glow";
	this.name = "GlowFilter";
};
GlowFilterPlugin.__interfaces__ = [models.client.plugins.IFilterPlugin];
GlowFilterPlugin.prototype = {
	getFilter: function(params) {
		var rgb = models.common.ColorTools.parse(params.color);
		var color = rgb.r << 16 | rgb.g << 8 | rgb.b;
		return new createjs.GlowFilter(color,params.alpha / 100 * (params.strength / 100),params.blurX * 2,params.blurY * 2,1,params.quality,params.inner,params.knockout);
	}
};
var StdFiltersPlugin = function() { };
StdFiltersPlugin.main = function() {
	models.common.Plugins.registerFilter(new DropShadowFilterPlugin());
	models.common.Plugins.registerFilter(new BlurFilterPlugin());
	models.common.Plugins.registerFilter(new GlowFilterPlugin());
	models.common.Plugins.registerFilter(new AdjustColorFilterPlugin());
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
/*
DropShadowFilter for EaselJS
GitHub : https://github.com/u-kudox/Filters_for_EaselJS
Contact and Bug reports : http://kudox.jp/contact or http://twitter.com/u_kudox
License : public domain
*/

/**
* @namespace createjs
**/
createjs = createjs || {};

(function(window) {
	"use strict";

	/**
	* Applies a DropShadowFilter to DisplayObjects of EaselJS. This filter has inherited the Filter class of EaselJS and has used BlurFilter of EaselJS at the blurring process.
	* @class DropShadowFilter
	* @extends Filter
	* @constructor
	* @param [distance=4] {Number} The offset distance for the shadow. The default value is 4.
	* @param [angle=45] {Number} The angle of the shadow. Valid values are 0 to 360 degrees. The default value is 45.
	* @param [color=0x000000] {uint} The color of the shadow. The default value is 0x000000. Valid values are in the hexadecimal format 0xRRGGBB.
	* @param [alpha=1] {Number} The alpha transparency value for the shadow color. Valid values are 0 to 1. The default value is 1.
	* @param [blurX=0] {Number} The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [blurY=0] {Number} The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [strength=1] {uint} The strength of the shadow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @param [quality=1] {Number} The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
	* @param [inner=false] {Boolean} Specifies whether or not the shadow is an inner shadow. The default value is false, expressing outer shadow.
	* @param [knockout=false] {Boolean} Specifies whether or not the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @param [hideObject=false] {Boolean} Specifies whether or not the object is hidden. If the value is true, the object is hidden and only the shadow is visible. The default value is false, expressing the object is visible.
	* @example
	* <pre><code>_text = new createjs.Text("DropShadowFilter", "bold 64px Arial", "#CC0000");
_text.set({x:centerX, y:centerY, textAlign:"center", textBaseline:"middle"});
var distance = 3;
var angle = 90;
var color = 0x000000;
var alpha = 0.5;
var blurX = 4;
var blurY = 4;
var strength = 1;
var quality = 2;
var inner = false;
var knockout = false;
var hideObject = false;
_dropShadowFilter = new createjs.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject);
_text.filters = [_dropShadowFilter];
var bounds = _text.getBounds();
_text.cache(bounds.x, bounds.y, bounds.width, bounds.height);
_stage.addChild(_text);</code></pre>
	**/
	function DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
		if (distance !== undefined) this._distance = distance;
		if (angle !== undefined) this._angle = (angle % 360 + 360) % 360;
		setOffset.call(this, this._distance, this._angle);
		if (!isNaN(color)) this.color = color;
		if (alpha !== undefined) this.alpha = alpha;
		this._blurFilter = new createjs.BlurFilter(blurX, blurY, quality);
		if (strength !== undefined) this.strength = strength >> 0;
		this.inner = !!inner;
		this.knockout = !!knockout;
		this.hideObject = !!hideObject;
	}

	var p = DropShadowFilter.prototype = Object.create(createjs.Filter.prototype);
	p.constructor = DropShadowFilter;

	/**
	* The alpha transparency value for the shadow color. Valid values are 0 to 1. The default value is 1.
	* @property alpha
	* @type Number
	* @default 1
	**/
	p.alpha = 1;

	/**
	* The strength of the shadow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @property strength
	* @type uint
	* @default 1
	**/
	p.strength = 1;

	/**
	* Specifies whether or not the shadow is an inner shadow. The default value is false, expressing outer shadow.
	* @property inner
	* @type Boolean
	* @default false
	**/
	p.inner = false;

	/**
	* Specifies whether or not the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @property knockout
	* @type Boolean
	* @default false
	**/
	p.knockout = false;

	/**
	* Specifies whether or not the object is hidden. If the value is true, the object is hidden and only the shadow is visible. The default value is false, expressing the object is visible.
	* @property hideObject
	* @type Boolean
	* @default false
	**/
	p.hideObject = false;

	Object.defineProperties(p, {
		/**
		* The angle of the shadow. Valid values are 0 to 360 degrees. The default value is 45.
		* @property angle
		* @type Number
		* @default 45
		**/
		"angle" : {
			get : function() {
				return this._angle;
			},
			set : function(value) {
				value = (value % 360 + 360) % 360;
				setOffset.call(this, this._distance, value);
				return this._angle = value;
			},
			enumerable : true
		},

		/**
		* The offset distance for the shadow. The default value is 4.
		* @property distance
		* @type Number
		* @default 4
		**/
		"distance" : {
			get : function() {
				return this._distance;
			},
			set : function(value) {
				setOffset.call(this, value, this._angle);
				return this._distance = value;
			},
			enumerable : true
		},

		/**
		* The color of the shadow. The default value is 0x000000. Valid values are in the hexadecimal format 0xRRGGBB.
		* @property color
		* @type uint
		* @default 0x000000
		**/
		"color" : {
			get : function() {
				return this._red << 16 | this._green << 8 | this._blue;
			},
			set : function(value) {
				this._red = value >> 16 & 0xFF;
				this._green = value >> 8 & 0xFF;
				this._blue = value & 0xFF;
				return this.color;
			},
			enumerable : true
		},

		/**
		* The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurX
		* @type Number
		* @default 0
		**/
		"blurX" : {
			get : function() {
				return this._blurFilter.blurX;
			},
			set : function(value) {
				return this._blurFilter.blurX = value;
			},
			enumerable : true
		},

		/**
		* The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurY
		* @type Number
		* @default 0
		**/
		"blurY" : {
			get : function() {
				return this._blurFilter.blurY;
			},
			set : function(value) {
				return this._blurFilter.blurY = value;
			},
			enumerable : true
		},

		/**
		* The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
		* @property quality
		* @type Number
		* @default 1
		**/
		"quality" : {
			get : function() {
				return this._blurFilter.quality;
			},
			set : function(value) {
				return this._blurFilter.quality = value;
			},
			enumerable : true
		}
	});

	p._angle = 45;

	p._distance = 4;

	p._offsetX = 0;

	p._offsetY = 0;

	p._red = 0;

	p._green = 0;

	p._blue = 0;

	p._blurFilter = null;

	/**
	* Returns a rectangle with values indicating the margins required to draw the filter or null.
	* For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
	* (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
	* @method getBounds
	* @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
	**/
	p.getBounds = function(rect) {
		rect = this._blurFilter.getBounds(rect);
		var ox = this._offsetX;
		var oy = this._offsetY;
		if (ox !== 0) {
			if (ox < 0) {
				rect.x += ox;
				rect.width += -ox;
			} else {
				rect.width += ox;
			}
		}
		if (oy !== 0) {
			if (oy < 0) {
				rect.y += oy;
				rect.height += -oy;
			} else {
				rect.height += oy;
			}
		}
		return rect;
	};

	/**
	* Applies the DropShadowFilter to the specified context.
	* @method applyFilter
	* @param ctx {CanvasRenderingContext2D} The 2D context to use as the source.
	* @param x {Number} The x position to use for the source rect.
	* @param y {Number} The y position to use for the source rect.
	* @param width {Number} The width to use for the source rect.
	* @param height {Number} The height to use for the source rect.
	* @param [targetCtx] {CanvasRenderingContext2D} The 2D context to draw the result to. Defaults to the context passed to ctx.
	* @param [targetX] {Number} The x position to draw the result to. Defaults to the value passed to x.
	* @param [targetY] {Number} The y position to draw the result to. Defaults to the value passed to y.
	* @return {Boolean} If the filter was applied successfully.
	**/
	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
		if ((this.alpha <= 0 || this.strength <= 0) && (!this.knockout && !this.hideObject)) {
			return true;
		}
		targetCtx = targetCtx || ctx;
		if (targetX === undefined) targetX = x;
		if (targetY === undefined) targetY = y;
		var tImgData = targetCtx.getImageData(targetX, targetY, width, height);
		var tData = tImgData.data;
		var dCvs = document.createElement("canvas");
		dCvs.width = width;
		dCvs.height = height;
		var dCtx = dCvs.getContext("2d");
		var dImgData = dCtx.getImageData(0, 0, width, height);
		var dData = dImgData.data;
		var inner = this.inner;
		var red = this._red;
		var green = this._green;
		var blue = this._blue;
		for (var i = 0, l = dData.length; i < l; i += 4) {
			var ia = i + 3;
			var alpha = tData[ia];
			if (!inner) {
				if (alpha !== 0) {
					dData[i] = red;
					dData[i + 1] = green;
					dData[i + 2] = blue;
					dData[ia] = alpha;
				}
			} else {
				if (alpha !== 255) {
					dData[i] = red;
					dData[i + 1] = green;
					dData[i + 2] = blue;
					dData[ia] = 255 - alpha;
				}
			}
		}
		dCtx.putImageData(dImgData, 0, 0);
		var strength = this.strength;
		if (0 < strength) {
			this._blurFilter.applyFilter(dCtx, 0, 0, width, height);
			if (255 < strength) strength = 255;
			for (var j = 1; j < strength; j++) {
				dCtx.drawImage(dCvs, 0, 0);
			}
		}
		var ga = this.alpha;
		if (ga < 0) ga = 0;
		else if (1 < ga) ga = 1;
		var gco;
		if (this.knockout) {
			if (inner) gco = "source-in";
			else gco = "source-out";
		} else {
			if (this.hideObject) {
				if (inner) gco = "source-in";
				else gco = "copy";
			} else {
				if (inner) gco = "source-atop";
				else gco = "destination-over";
			}
		}
		targetCtx.save();
		targetCtx.setTransform(1, 0, 0, 1, 0, 0);
		targetCtx.globalAlpha = ga;
		targetCtx.globalCompositeOperation = gco;
		targetCtx.drawImage(dCvs, targetX + this._offsetX, targetY + this._offsetY);
		targetCtx.restore();
		return true;
	};

	/**
	* Returns a clone of this DropShadowFilter instance.
	* @method clone
	* @return {DropShadowFilter} A clone of this DropShadowFilter instance.
	**/
	p.clone = function() {
		var f = this._blurFilter;
		return new createjs.DropShadowFilter(this._distance, this._angle, this.color, this.alpha, f.blurX, f.blurY, this.strength, f.quality, this.inner, this.knockout, this.hideObject);
	};

	/**
	* Returns a string representation of this filter.
	* @method toString
	* @return {String} A string representation of this filter.
	**/
	p.toString = function() {
		return "[DropShadowFilter]";
	};

	function setOffset(distance, angle) {
		var r = (angle) * createjs.Matrix2D.DEG_TO_RAD;
		this._offsetX = Math.cos(r) * distance;
		this._offsetY = Math.sin(r) * distance;
	}

	createjs.DropShadowFilter = DropShadowFilter;
}(window));;
/*
GlowFilter for EaselJS
GitHub : https://github.com/u-kudox/Filters_for_EaselJS
Contact and Bug reports : http://kudox.jp/contact or http://twitter.com/u_kudox
License : public domain
*/

/**
* @namespace createjs
**/
createjs = createjs || {};

(function(window) {
	"use strict";

	/**
	* Applies a GlowFilter to DisplayObjects of EaselJS. This filter has inherited the Filter class of EaselJS and has used BlurFilter of EaselJS at the blurring process.
	* @class GlowFilter
	* @extends Filter
	* @constructor
	* @param [color=0xFF0000] {uint} The color of the glow. The default value is 0xFF0000. Valid values are in the hexadecimal format 0xRRGGBB.
	* @param [alpha=1] {Number} The alpha transparency value for the glow color. Valid values are 0 to 1.
	* @param [blurX=0] {Number} The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [blurY=0] {Number} The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [strength=1] {uint} The strength of the glow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @param [quality=1] {Number} The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
	* @param [inner=false] {Boolean} Specifies whether the glow is an inner glow. The default value is false, expressing outer glow.
	* @param [knockout=false] {Boolean} Specifies whether the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @example
	* <pre><code>_shape = new createjs.Shape().set({x:centerX, y:centerY});
_shape.graphics.f("rgba(0,0,255,1)").dp(0, 0, 100, 5, 0.6, -90).ef();
var color = 0x00FFFF;
var alpha = 1;
var blurX = 32;
var blurY = 32;
var strength = 1;
var quality = 1;
var inner = false;
var knockout = false;
_glowFilter = new createjs.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
_shape.filters = [_glowFilter];
_shape.cache(-100, -100, 200, 200);
_stage.addChild(_shape);</code></pre>
	**/
	function GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout) {
		if (!isNaN(color)) this.color = color;
		if (alpha !== undefined) this.alpha = alpha;
		this._blurFilter = new createjs.BlurFilter(blurX, blurY, quality);
		if (strength !== undefined) this.strength = strength;
		this.inner = !!inner;
		this.knockout = !!knockout;
	}

	var p = GlowFilter.prototype = Object.create(createjs.Filter.prototype);
	p.constructor = GlowFilter;

	/**
	* The alpha transparency value for the glow color. Valid values are 0 to 1.
	* @property alpha
	* @type Number
	* @default 1
	**/
	p.alpha = 1;

	/**
	* The strength of the glow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @property strength
	* @type uint
	* @default 1
	**/
	p.strength = 1;

	/**
	* Specifies whether the glow is an inner glow. The default value is false, expressing outer glow.
	* @property inner
	* @type Boolean
	* @default false
	**/
	p.inner = false;

	/**
	* Specifies whether the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @property knockout
	* @type Boolean
	* @default false
	**/
	p.knockout = false;

	Object.defineProperties(p, {
		/**
		* The color of the glow. The default value is 0xFF0000. Valid values are in the hexadecimal format 0xRRGGBB.
		* @property color
		* @type uint
		* @default 0xFF0000
		**/
		"color" : {
			get : function() {
				return this._red << 16 | this._green << 8 | this._blue;
			},
			set : function(value) {
				this._red = value >> 16 & 0xFF;
				this._green = value >> 8 & 0xFF;
				this._blue = value & 0xFF;
				return this.color;
			},
			enumerable : true
		},

		/**
		* The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurX
		* @type Number
		* @default 0
		**/
		"blurX" : {
			get : function() {
				return this._blurFilter.blurX;
			},
			set : function(value) {
				return this._blurFilter.blurX = value;
			},
			enumerable : true
		},

		/**
		* The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurY
		* @type Number
		* @default 0
		**/
		"blurY" : {
			get : function() {
				return this._blurFilter.blurY;
			},
			set : function(value) {
				return this._blurFilter.blurY = value;
			},
			enumerable : true
		},

		/**
		* The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
		* @property quality
		* @type Number
		* @default 1
		**/
		"quality" : {
			get : function() {
				return this._blurFilter.quality;
			},
			set : function(value) {
				return this._blurFilter.quality = value;
			},
			enumerable : true
		}
	});

	p._red = 255;

	p._green = 0;

	p._blue = 0;

	p._blurFilter = null;

	/**
	* Returns a rectangle with values indicating the margins required to draw the filter or null.
	* For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
	* (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
	* @method getBounds
	* @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
	**/
	p.getBounds = function(rect) {
		if (this.inner) {
			return rect;
		} else {
			return this._blurFilter.getBounds(rect);
		}
	};

	/**
	* Applies the GlowFilter to the specified context.
	* @method applyFilter
	* @param ctx {CanvasRenderingContext2D} The 2D context to use as the source.
	* @param x {Number} The x position to use for the source rect.
	* @param y {Number} The y position to use for the source rect.
	* @param width {Number} The width to use for the source rect.
	* @param height {Number} The height to use for the source rect.
	* @param [targetCtx] {CanvasRenderingContext2D} The 2D context to draw the result to. Defaults to the context passed to ctx.
	* @param [targetX] {Number} The x position to draw the result to. Defaults to the value passed to x.
	* @param [targetY] {Number} The y position to draw the result to. Defaults to the value passed to y.
	* @return {Boolean} If the filter was applied successfully.
	**/
	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
		if ((this.alpha <= 0 || this.strength <= 0) && !this.knockout) {
			return true;
		}
		targetCtx = targetCtx || ctx;
		if (targetX === undefined) targetX = x;
		if (targetY === undefined) targetY = y;
		var tImgData = targetCtx.getImageData(targetX, targetY, width, height);
		var tData = tImgData.data;
		var dCvs = document.createElement("canvas");
		dCvs.width = width;
		dCvs.height = height;
		var dCtx = dCvs.getContext("2d");
		var dImgData = dCtx.getImageData(0, 0, width, height);
		var dData = dImgData.data;
		var inner = this.inner;
		var red = this._red;
		var green = this._green;
		var blue = this._blue;
		for (var i = 0, l = dData.length; i < l; i += 4) {
			var ia = i + 3;
			var alpha = tData[ia];
			if (!inner) {
				if (alpha !== 0) {
					dData[i] = red;
					dData[i + 1] = green;
					dData[i + 2] = blue;
					dData[ia] = alpha;
				}
			} else {
				if (alpha !== 255) {
					dData[i] = red;
					dData[i + 1] = green;
					dData[i + 2] = blue;
					dData[ia] = 255 - alpha;
				}
			}
		}
		dCtx.putImageData(dImgData, 0, 0);
		var strength = this.strength;
		if (0 < strength) {
			this._blurFilter.applyFilter(dCtx, 0, 0, width, height);
			if (255 < strength) strength = 255;
			for (var j = 1; j < strength; j++) {
				dCtx.drawImage(dCvs, 0, 0);
			}
		}
		var ga = this.alpha;
		if (ga < 0) ga = 0;
		else if (1 < ga) ga = 1;
		var gco;
		if (this.knockout) {
			if (inner) gco = "source-in";
			else gco = "source-out";
		} else {
			if (inner) gco = "source-atop";
			else gco = "destination-over";
		}
		targetCtx.save();
		targetCtx.setTransform(1, 0, 0, 1, 0, 0);
		targetCtx.globalAlpha = ga;
		targetCtx.globalCompositeOperation = gco;
		targetCtx.drawImage(dCvs, targetX, targetY);
		targetCtx.restore();
		return true;
	};

	/**
	* Returns a clone of this GlowFilter instance.
	* @method clone
	* @return {GlowFilter} A clone of this GlowFilter instance.
	**/
	p.clone = function() {
		var f = this._blurFilter;
		return new createjs.GlowFilter(this.color, this.alpha, f.blurX, f.blurY, this.strength, f.quality, this.inner, this.knockout);
	};

	/**
	* Returns a string representation of this filter.
	* @method toString
	* @return {String} A string representation of this filter.
	**/
	p.toString = function() {
		return "[GlowFilter]";
	};

	createjs.GlowFilter = GlowFilter;
}(window));;
StdFiltersPlugin.main();
})(typeof window != "undefined" ? window : exports);
