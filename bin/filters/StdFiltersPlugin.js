(function (console, $hx_exports) { "use strict";
$hx_exports.createjs = $hx_exports.createjs || {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AdjustColorFilterPlugin = function() {
	this.properties = [{ type : "int", name : "brightness", label : "Brightness", defaultValue : 0, minValue : -100, maxValue : 100, units : "%"},{ type : "int", name : "contrast", label : "Contrast", defaultValue : 0, minValue : -100, maxValue : 100, units : "%"},{ type : "int", name : "saturation", label : "Saturation", defaultValue : 0, minValue : -100, maxValue : 100, units : "%"},{ type : "int", name : "hue", label : "Hue", defaultValue : 0, minValue : -180, maxValue : 180, units : "deg"}];
	this.label = "Adjust Color";
	this.name = "AdjustColorFilter";
};
AdjustColorFilterPlugin.__interfaces__ = [nanofl.engine.plugins.IFilterPlugin];
AdjustColorFilterPlugin.prototype = {
	getFilter: function(params) {
		return new createjs.ColorMatrixFilter(new createjs.ColorMatrix(Math.round(params.brightness / 100 * 255 * 0.4),params.contrast,params.saturation,params.hue).toArray());
	}
};
var BoxBlurFilterPlugin = function() {
	this.properties = [{ type : "float", name : "blurX", label : "Blur X", defaultValue : 10, neutralValue : 0, units : "px", minValue : 0},{ type : "float", name : "blurY", label : "Blur Y", defaultValue : 10, neutralValue : 0, units : "px", minValue : 0},{ type : "int", name : "quality", label : "Quality", defaultValue : 1, minValue : 1, maxValue : 3}];
	this.label = "Box Blur";
	this.name = "BoxBlurFilter";
};
BoxBlurFilterPlugin.__interfaces__ = [nanofl.engine.plugins.IFilterPlugin];
BoxBlurFilterPlugin.prototype = {
	getFilter: function(params) {
		return new createjs.BoxBlurFilter(params.blurX,params.blurY,params.quality);
	}
};
var DropShadowFilterPlugin = function() {
	this.properties = [{ type : "float", name : "blurX", label : "Blur X", defaultValue : 5, units : "px", minValue : 0},{ type : "float", name : "blurY", label : "Blur Y", defaultValue : 5, units : "px", minValue : 0},{ type : "int", name : "strength", label : "Strength", defaultValue : 100, units : "%", minValue : 0, maxValue : 100},{ type : "int", name : "quality", label : "Quality", defaultValue : 1, minValue : 1, maxValue : 3},{ type : "float", name : "angle", label : "Angle", defaultValue : 45, units : "deg", minValue : 0, maxValue : 360},{ type : "float", name : "distance", label : "Distance", defaultValue : 5, units : "px", minValue : 0},{ type : "bool", name : "knockout", label : "Knockout", defaultValue : false},{ type : "bool", name : "inner", label : "Inner shadow", defaultValue : false},{ type : "bool", name : "hideObject", label : "Hide object", defaultValue : false},{ type : "color", name : "color", label : "Color", defaultValue : "#000000"},{ type : "int", name : "alpha", label : "Alpha", defaultValue : 100, neutralValue : 0, units : "%", minValue : 0, maxValue : 100}];
	this.label = "Drop Shadow";
	this.name = "DropShadowFilter";
};
DropShadowFilterPlugin.__interfaces__ = [nanofl.engine.plugins.IFilterPlugin];
DropShadowFilterPlugin.prototype = {
	getFilter: function(params) {
		var rgb = nanofl.engine.ColorTools.parse(params.color);
		var color = rgb.r << 16 | rgb.g << 8 | rgb.b;
		return new createjs.DropShadowFilter(params.distance * 2,params.angle,color,params.alpha / 100 * (params.strength / 100),params.blurX * 2,params.blurY * 2,1,params.quality,params.inner,params.knockout,params.hideObject);
	}
};
var GaussianBlurFilterPlugin = function() {
	this.properties = [{ type : "int", name : "radius", label : "Radius", defaultValue : 10, neutralValue : 0, units : "px", minValue : 0}];
	this.label = "Gaussian Blur";
	this.name = "GaussianBlurFilterPlugin";
};
GaussianBlurFilterPlugin.__interfaces__ = [nanofl.engine.plugins.IFilterPlugin];
GaussianBlurFilterPlugin.prototype = {
	getFilter: function(params) {
		return new createjs_GaussianBlurFilter(params.radius);
	}
};
var GlowFilterPlugin = function() {
	this.properties = [{ type : "float", name : "blurX", label : "Blur X", defaultValue : 5, units : "px", minValue : 0},{ type : "float", name : "blurY", label : "Blur Y", defaultValue : 5, units : "px", minValue : 0},{ type : "int", name : "strength", label : "Strength", defaultValue : 100, units : "%", minValue : 0, maxValue : 100},{ type : "int", name : "quality", label : "Quality", defaultValue : 1, minValue : 1, maxValue : 3},{ type : "color", name : "color", label : "Color", defaultValue : "#000000"},{ type : "int", name : "alpha", label : "Alpha", defaultValue : 100, neutralValue : 0, units : "%", minValue : 0, maxValue : 100},{ type : "bool", name : "knockout", label : "Knockout", defaultValue : false},{ type : "bool", name : "inner", label : "Inner shadow", defaultValue : false}];
	this.label = "Glow";
	this.name = "GlowFilter";
};
GlowFilterPlugin.__interfaces__ = [nanofl.engine.plugins.IFilterPlugin];
GlowFilterPlugin.prototype = {
	getFilter: function(params) {
		var rgb = nanofl.engine.ColorTools.parse(params.color);
		var color = rgb.r << 16 | rgb.g << 8 | rgb.b;
		return new createjs.GlowFilter(color,params.alpha / 100 * (params.strength / 100),params.blurX * 2,params.blurY * 2,1,params.quality,params.inner,params.knockout);
	}
};
var StdFiltersPlugin = function() { };
StdFiltersPlugin.main = function() {
	nanofl.engine.plugins.FilterPlugins.register(new DropShadowFilterPlugin());
	nanofl.engine.plugins.FilterPlugins.register(new BoxBlurFilterPlugin());
	nanofl.engine.plugins.FilterPlugins.register(new GlowFilterPlugin());
	nanofl.engine.plugins.FilterPlugins.register(new AdjustColorFilterPlugin());
	nanofl.engine.plugins.FilterPlugins.register(new GaussianBlurFilterPlugin());
};
var createjs_GaussianBlurFilter = $hx_exports.createjs.GaussianBlurFilter = function(radius) {
	createjs.Filter.call(this);
	this.radius = radius;
};
createjs_GaussianBlurFilter.__super__ = createjs.Filter;
createjs_GaussianBlurFilter.prototype = $extend(createjs.Filter.prototype,{
	applyFilter: function(ctx,x,y,width,height,targetCtx,targetX,targetY) {
		StackBlur.stackBlurCanvasRGBA(ctx.canvas,x,y,width,height,this.radius);
		return true;
	}
	,getBounds: function(rect) {
		if(rect != null) {
			rect.x -= this.radius;
			rect.y -= this.radius;
			rect.width += this.radius * 2;
			rect.height += this.radius * 2;
			return rect;
		}
		return new createjs.Rectangle(-this.radius,-this.radius,this.radius * 2,this.radius * 2);
	}
	,clone: function() {
		return new createjs_GaussianBlurFilter(this.radius);
	}
	,toString: function() {
		return "[GaussianBlurFilter]";
	}
});
/*

StackBlur - a fast almost Gaussian Blur For Canvas

Version: 	0.5
Author:		Mario Klingemann
Contact: 	mario@quasimondo.com
Website:	http://www.quasimondo.com/StackBlurForCanvas
Twitter:	@quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr: 
https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

(function(window) {

var mul_table = [
        512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
        454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
        482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
        437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
        497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
        320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
        446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
        329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
        505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
        399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
        324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
        268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
        451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
        385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
        332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
        289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
        
   
var shg_table = [
	     9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 
		17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 
		19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
		20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
		21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
		21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 
		22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
		22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 
		23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
		23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
		23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 
		23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];

function premultiplyAlpha(imageData)
{
	var pixels = imageData.data;
	var size = imageData.width * imageData.height * 4;
	
	for (var i=0; i<size; i+=4)
	{
		var a = pixels[i+3] / 255;
		pixels[i  ] *= a;
		pixels[i+1] *= a;
		pixels[i+2] *= a;
	}
}

function unpremultiplyAlpha(imageData)
{
	var pixels = imageData.data;
	var size = imageData.width * imageData.height * 4;
	
	for (var i=0; i<size; i+=4)
	{
		var a = pixels[i+3];
		if (a != 0)
		{
			a = 255 / a;
			pixels[i  ] *= a;
			pixels[i+1] *= a;
			pixels[i+2] *= a;
		}
	}
}

function stackBlurCanvasRGBA( canvas, top_x, top_y, width, height, radius )
{
	if ( isNaN(radius) || radius < 1 ) return;
	radius |= 0;
	
	var context = canvas.getContext("2d");
	var imageData;
	
	try
	{
	  try
	  {
		imageData = context.getImageData( top_x, top_y, width, height );
	  }
	  catch(e)
	  {
		// NOTE: this part is supposedly only needed if you want to work with local files
		// so it might be okay to remove the whole try/catch block and just use
		// imageData = context.getImageData( top_x, top_y, width, height );
		try
		{
			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
			imageData = context.getImageData( top_x, top_y, width, height );
		}
		catch(e)
		{
			alert("Cannot access local image");
			throw new Error("unable to access local image data: " + e);
			return;
		}
	  }
	}
	catch(e)
	{
	  alert("Cannot access image");
	  throw new Error("unable to access image data: " + e);
	}
	
	premultiplyAlpha(imageData);
	
	var pixels = imageData.data;
	
	var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, 
	r_out_sum, g_out_sum, b_out_sum, a_out_sum,
	r_in_sum, g_in_sum, b_in_sum, a_in_sum, 
	pr, pg, pb, pa, rbs;
			
	var div = radius + radius + 1;
	var w4 = width << 2;
	var widthMinus1  = width - 1;
	var heightMinus1 = height - 1;
	var radiusPlus1  = radius + 1;
	var sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2;
	
	var stackStart = new BlurStack();
	var stack = stackStart;
	for ( i = 1; i < div; i++ )
	{
		stack = stack.next = new BlurStack();
		if ( i == radiusPlus1 ) var stackEnd = stack;
	}
	stack.next = stackStart;
	var stackIn = null;
	var stackOut = null;
	
	yw = yi = 0;
	
	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];
	
	for ( y = 0; y < height; y++ )
	{
		r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
		
		r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
		g_out_sum = radiusPlus1 * ( pg = pixels[yi+1] );
		b_out_sum = radiusPlus1 * ( pb = pixels[yi+2] );
		a_out_sum = radiusPlus1 * ( pa = pixels[yi+3] );
		
		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		a_sum += sumFactor * pa;
		
		stack = stackStart;
		
		for( i = 0; i < radiusPlus1; i++ )
		{
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack.a = pa;
			stack = stack.next;
		}
		
		for( i = 1; i < radiusPlus1; i++ )
		{
			p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
			rbs = radiusPlus1 - i;
			r_sum += ( stack.r = ( pr = pixels[p  ])) * rbs;
			g_sum += ( stack.g = ( pg = pixels[p+1])) * rbs;
			b_sum += ( stack.b = ( pb = pixels[p+2])) * rbs;
			a_sum += ( stack.a = ( pa = pixels[p+3])) * rbs;
			
			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			a_in_sum += pa;
			
			stack = stack.next;
		}
		
		
		stackIn = stackStart;
		stackOut = stackEnd;
		for ( x = 0; x < width; x++ )
		{
			pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
			pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
			pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;
			pixels[yi+3] = (a_sum * mul_sum) >> shg_sum;
			
			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			a_sum -= a_out_sum;
			
			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			a_out_sum -= stackIn.a;
			
			p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;
			
			r_in_sum += ( stackIn.r = pixels[p]);
			g_in_sum += ( stackIn.g = pixels[p+1]);
			b_in_sum += ( stackIn.b = pixels[p+2]);
			a_in_sum += ( stackIn.a = pixels[p+3]);
			
			r_sum += r_in_sum;
			g_sum += g_in_sum;
			b_sum += b_in_sum;
			a_sum += a_in_sum;
			
			stackIn = stackIn.next;
			
			r_out_sum += ( pr = stackOut.r );
			g_out_sum += ( pg = stackOut.g );
			b_out_sum += ( pb = stackOut.b );
			a_out_sum += ( pa = stackOut.a );
			
			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			a_in_sum -= pa;
			
			stackOut = stackOut.next;
			
			yi += 4;
		}
		yw += width;
	}
	
	for ( x = 0; x < width; x++ )
	{
		g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
		
		yi = x << 2;
		r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
		g_out_sum = radiusPlus1 * ( pg = pixels[yi+1]);
		b_out_sum = radiusPlus1 * ( pb = pixels[yi+2]);
		a_out_sum = radiusPlus1 * ( pa = pixels[yi+3]);
		
		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		a_sum += sumFactor * pa;
		
		stack = stackStart;
		
		for( i = 0; i < radiusPlus1; i++ )
		{
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack.a = pa;
			stack = stack.next;
		}
		
		yp = width;
		
		for( i = 1; i <= radius; i++ )
		{
			yi = ( yp + x ) << 2;
			rbs = radiusPlus1 - i;
			
			r_sum += ( stack.r = ( pr = pixels[yi  ])) * rbs;
			g_sum += ( stack.g = ( pg = pixels[yi+1])) * rbs;
			b_sum += ( stack.b = ( pb = pixels[yi+2])) * rbs;
			a_sum += ( stack.a = ( pa = pixels[yi+3])) * rbs;
		   
			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			a_in_sum += pa;
			
			stack = stack.next;
		
			if( i < heightMinus1 )
			{
				yp += width;
			}
		}
		
		yi = x;
		stackIn = stackStart;
		stackOut = stackEnd;
		for ( y = 0; y < height; y++ )
		{
			p = yi << 2;
			pixels[p]   = (r_sum * mul_sum) >> shg_sum;
			pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
			pixels[p+2] = (b_sum * mul_sum) >> shg_sum;
			pixels[p+3] = (a_sum * mul_sum) >> shg_sum;
			
			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			a_sum -= a_out_sum;
		   
			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			a_out_sum -= stackIn.a;
			
			p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;
			
			r_sum += ( r_in_sum += ( stackIn.r = pixels[p]));
			g_sum += ( g_in_sum += ( stackIn.g = pixels[p+1]));
			b_sum += ( b_in_sum += ( stackIn.b = pixels[p+2]));
			a_sum += ( a_in_sum += ( stackIn.a = pixels[p+3]));
		   
			stackIn = stackIn.next;
			
			r_out_sum += ( pr = stackOut.r );
			g_out_sum += ( pg = stackOut.g );
			b_out_sum += ( pb = stackOut.b );
			a_out_sum += ( pa = stackOut.a );
			
			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			a_in_sum -= pa;
			
			stackOut = stackOut.next;
			
			yi += width;
		}
	}
	
	unpremultiplyAlpha(imageData);
	
	context.putImageData( imageData, top_x, top_y );
}

function BlurStack()
{
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 0;
	this.next = null;
}

window.StackBlur = {
	stackBlurCanvasRGBA: stackBlurCanvasRGBA
};

})(window);;
/*
 * BoxBlurFilter
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 * 
 * BoxBlur Algorithm by Mario Klingemann, quasimondo.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module EaselJS
 */

// namespace:
createjs = createjs || {};

(function() {
	"use strict";


// constructor:
	/**
	 * Applies a box blur to DisplayObjects. Note that this filter is fairly CPU intensive, particularly if the quality is
	 * set higher than 1.
	 *
	 * <h4>Example</h4>
	 * This example creates a red circle, and then applies a 5 pixel blur to it. It uses the {{#crossLink "Filter/getBounds"}}{{/crossLink}}
	 * method to account for the spread that the blur causes.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      var blurFilter = new createjs.BoxBlurFilter(5, 5, 1);
	 *      shape.filters = [blurFilter];
	 *      var bounds = blurFilter.getBounds();
	 *
	 *      shape.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 * @class BoxBlurFilter
	 * @extends Filter
	 * @constructor
	 * @param {Number} [blurX=0] The horizontal blur radius in pixels.
	 * @param {Number} [blurY=0] The vertical blur radius in pixels.
	 * @param {Number} [quality=1] The number of blur iterations.
	 **/
	function BoxBlurFilter( blurX, blurY, quality) {
		if ( isNaN(blurX) || blurX < 0 ) blurX = 0;
		if ( isNaN(blurY) || blurY < 0 ) blurY = 0;
		if ( isNaN(quality) || quality < 1  ) quality = 1;


		// public properties:
		/**
		 * Horizontal blur radius in pixels
		 * @property blurX
		 * @default 0
		 * @type Number
		 **/
		this.blurX = blurX | 0;

		/**
		 * Vertical blur radius in pixels
		 * @property blurY
		 * @default 0
		 * @type Number
		 **/
		this.blurY = blurY | 0;

		/**
		 * Number of blur iterations. For example, a value of 1 will produce a rough blur. A value of 2 will produce a
		 * smoother blur, but take twice as long to run.
		 * @property quality
		 * @default 1
		 * @type Number
		 **/
		this.quality = quality | 0;
	}
	var p = createjs.extend(BoxBlurFilter, createjs.Filter);



// constants:
	/**
	 * Array of multiply values for blur calculations.
	 * @property MUL_TABLE
	 * @type Array
	 * @protected
	 * @static
	 **/
	BoxBlurFilter.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];

	/**
	 * Array of shift values for blur calculations.
	 * @property SHG_TABLE
	 * @type Array
	 * @protected
	 * @static
	 **/
	BoxBlurFilter.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];

// public methods:
	/** docced in super class **/
	p.getBounds = function (rect) {
		var x = this.blurX|0, y = this.blurY| 0;
		if (x <= 0 && y <= 0) { return rect; }
		var q = Math.pow(this.quality, 0.2);
		return (rect || new createjs.Rectangle()).pad(x*q+1,y*q+1,x*q+1,y*q+1);
	};

	/** docced in super class **/
	p.clone = function() {
		return new BoxBlurFilter(this.blurX, this.blurY, this.quality);
	};

	/** docced in super class **/
	p.toString = function() {
		return "[BoxBlurFilter]";
	};


// private methods:

	/** docced in super class **/
	p._applyFilter = function (imageData) {

		premultiplyAlpha(imageData);
		
		var radiusX = this.blurX >> 1;
		if (isNaN(radiusX) || radiusX < 0) return false;
		var radiusY = this.blurY >> 1;
		if (isNaN(radiusY) || radiusY < 0) return false;
		if (radiusX == 0 && radiusY == 0) return false;

		var iterations = this.quality;
		if (isNaN(iterations) || iterations < 1) iterations = 1;
		iterations |= 0;
		if (iterations > 3) iterations = 3;
		if (iterations < 1) iterations = 1;

		var px = imageData.data;
		var x=0, y=0, i=0, p=0, yp=0, yi=0, yw=0, r=0, g=0, b=0, a=0, pr=0, pg=0, pb=0, pa=0;

		var divx = (radiusX + radiusX + 1) | 0;
		var divy = (radiusY + radiusY + 1) | 0;
		var w = imageData.width | 0;
		var h = imageData.height | 0;

		var w1 = (w - 1) | 0;
		var h1 = (h - 1) | 0;
		var rxp1 = (radiusX + 1) | 0;
		var ryp1 = (radiusY + 1) | 0;

		var ssx = {r:0,b:0,g:0,a:0};
		var sx = ssx;
		for ( i = 1; i < divx; i++ )
		{
			sx = sx.n = {r:0,b:0,g:0,a:0};
		}
		sx.n = ssx;

		var ssy = {r:0,b:0,g:0,a:0};
		var sy = ssy;
		for ( i = 1; i < divy; i++ )
		{
			sy = sy.n = {r:0,b:0,g:0,a:0};
		}
		sy.n = ssy;

		var si = null;


		var mtx = BoxBlurFilter.MUL_TABLE[radiusX] | 0;
		var stx = BoxBlurFilter.SHG_TABLE[radiusX] | 0;
		var mty = BoxBlurFilter.MUL_TABLE[radiusY] | 0;
		var sty = BoxBlurFilter.SHG_TABLE[radiusY] | 0;

		while (iterations-- > 0) {

			yw = yi = 0;
			var ms = mtx;
			var ss = stx;
			for (y = h; --y > -1;) {
				r = rxp1 * (pr = px[(yi) | 0]);
				g = rxp1 * (pg = px[(yi + 1) | 0]);
				b = rxp1 * (pb = px[(yi + 2) | 0]);
				a = rxp1 * (pa = px[(yi + 3) | 0]);

				sx = ssx;

				for( i = rxp1; --i > -1; )
				{
					sx.r = pr;
					sx.g = pg;
					sx.b = pb;
					sx.a = pa;
					sx = sx.n;
				}

				for( i = 1; i < rxp1; i++ )
				{
					p = (yi + ((w1 < i ? w1 : i) << 2)) | 0;
					r += ( sx.r = px[p]);
					g += ( sx.g = px[p+1]);
					b += ( sx.b = px[p+2]);
					a += ( sx.a = px[p+3]);

					sx = sx.n;
				}

				si = ssx;
				for ( x = 0; x < w; x++ )
				{
					px[yi++] = (r * ms) >>> ss;
					px[yi++] = (g * ms) >>> ss;
					px[yi++] = (b * ms) >>> ss;
					px[yi++] = (a * ms) >>> ss;

					p = ((yw + ((p = x + radiusX + 1) < w1 ? p : w1)) << 2);

					r -= si.r - ( si.r = px[p]);
					g -= si.g - ( si.g = px[p+1]);
					b -= si.b - ( si.b = px[p+2]);
					a -= si.a - ( si.a = px[p+3]);

					si = si.n;

				}
				yw += w;
			}

			ms = mty;
			ss = sty;
			for (x = 0; x < w; x++) {
				yi = (x << 2) | 0;

				r = (ryp1 * (pr = px[yi])) | 0;
				g = (ryp1 * (pg = px[(yi + 1) | 0])) | 0;
				b = (ryp1 * (pb = px[(yi + 2) | 0])) | 0;
				a = (ryp1 * (pa = px[(yi + 3) | 0])) | 0;

				sy = ssy;
				for( i = 0; i < ryp1; i++ )
				{
					sy.r = pr;
					sy.g = pg;
					sy.b = pb;
					sy.a = pa;
					sy = sy.n;
				}

				yp = w;

				for( i = 1; i <= radiusY; i++ )
				{
					yi = ( yp + x ) << 2;

					r += ( sy.r = px[yi]);
					g += ( sy.g = px[yi+1]);
					b += ( sy.b = px[yi+2]);
					a += ( sy.a = px[yi+3]);

					sy = sy.n;

					if( i < h1 )
					{
						yp += w;
					}
				}

				yi = x;
				si = ssy;
				if ( iterations > 0 )
				{
					for ( y = 0; y < h; y++ )
					{
						p = yi << 2;
						px[p]   = (r * ms) >>> ss;
						px[p+1] = (g * ms) >>> ss;
						px[p+2] = (b * ms) >>> ss;
						px[p+3] = (a * ms) >>> ss;

						p = ( x + (( ( p = y + ryp1) < h1 ? p : h1 ) * w )) << 2;

						r -= si.r - ( si.r = px[p]);
						g -= si.g - ( si.g = px[p+1]);
						b -= si.b - ( si.b = px[p+2]);
						a -= si.a - ( si.a = px[p+3]);

						si = si.n;

						yi += w;
					}
				} else {
					for ( y = 0; y < h; y++ )
					{
						p = yi << 2;
						px[p]   = (r * ms) >>> ss;
						px[p+1] = (g * ms) >>> ss;
						px[p+2] = (b * ms) >>> ss;
						px[p+3] = (a * ms) >>> ss;

						p = ( x + (( ( p = y + ryp1) < h1 ? p : h1 ) * w )) << 2;

						r -= si.r - ( si.r = px[p]);
						g -= si.g - ( si.g = px[p+1]);
						b -= si.b - ( si.b = px[p+2]);
						a -= si.a - ( si.a = px[p+3]);

						si = si.n;

						yi += w;
					}
				}
			}

		}
		
		unpremultiplyAlpha(imageData);
		
		return true;
	};
	
	function premultiplyAlpha(imageData)
	{
		var pixels = imageData.data;
		var size = imageData.width * imageData.height * 4;
		
		for (var i=0; i<size; i+=4)
		{
			var a = pixels[i+3] / 255;
			pixels[i  ] *= a;
			pixels[i+1] *= a;
			pixels[i+2] *= a;
		}
	}

	function unpremultiplyAlpha(imageData)
	{
		var pixels = imageData.data;
		var size = imageData.width * imageData.height * 4;
		
		for (var i=0; i<size; i+=4)
		{
			var a = pixels[i+3];
			if (a != 0)
			{
				a = 255 / a;
				pixels[i  ] *= a;
				pixels[i+1] *= a;
				pixels[i+2] *= a;
			}
		}
	}
	
	createjs.BoxBlurFilter = createjs.promote(BoxBlurFilter, "Filter");
}());
;
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
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
