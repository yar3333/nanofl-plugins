package models.common.geom;

extern class Matrix
{
	function new(?a:Float, ?b:Float, ?c:Float, ?d:Float, ?tx:Float, ?ty:Float) : Void;
	var a : Float;
	var b : Float;
	var c : Float;
	var d : Float;
	var tx : Float;
	var ty : Float;
	function save(out:models.common.XmlWriter) : Void;
	function decompose() : { var rotation : Float; var scaleX : Float; var scaleY : Float; var skewX : Float; var skewY : Float; var x : Float; var y : Float; };
	function setMatrix(m:{ var a : Float; var b : Float; var c : Float; var d : Float; var tx : Float; var ty : Float; }) : models.common.geom.Matrix;
	function isIdentity() : Bool;
	function invert() : models.common.geom.Matrix;
	function transformPoint(x:Float, y:Float) : models.common.geom.Point;
	function clone() : models.common.geom.Matrix;
	function translate(tx:Float, ty:Float) : models.common.geom.Matrix;
	function equ(m:models.common.geom.Matrix) : Bool;
	function setTransform(x:Float, y:Float, scaleX:Float, scaleY:Float, rotation:Float, skewX:Float, skewY:Float, ?regX:Float, ?regY:Float) : models.common.geom.Matrix;
	function appendMatrix(m:models.common.geom.Matrix) : models.common.geom.Matrix;
	function prependMatrix(m:models.common.geom.Matrix) : models.common.geom.Matrix;
	function append(a:Float, b:Float, c:Float, d:Float, tx:Float, ty:Float) : models.common.geom.Matrix;
	function prepend(a:Float, b:Float, c:Float, d:Float, tx:Float, ty:Float) : models.common.geom.Matrix;
	function appendTransform(x:Float, y:Float, ?scaleX:Float, ?scaleY:Float, ?rotation:Float, ?skewX:Float, ?skewY:Float, ?regX:Float, ?regY:Float) : models.common.geom.Matrix;
	function prependTransform(x:Float, y:Float, ?scaleX:Float, ?scaleY:Float, ?rotation:Float, ?skewX:Float, ?skewY:Float, ?regX:Float, ?regY:Float) : models.common.geom.Matrix;
	function rotate(angle:Float) : models.common.geom.Matrix;
	function skew(skewX:Float, skewY:Float) : models.common.geom.Matrix;
	function scale(kx:Float, ky:Float) : models.common.geom.Matrix;
	/**
	 * Creates the specific style of matrix expected by the
	 * <code>beginGradientFill()</code> and <code>lineGradientStyle()</code>
	 * methods of the Graphics class. Width and height are scaled to a
	 * <code>scaleX</code>/<code>scaleY</code> pair and the
	 * <code>tx</code>/<code>ty</code> values are offset by half the width and
	 * height.
	 *
	 * <p>For example, consider a gradient with the following
	 * characteristics:</p>
	 *
	 * <ul>
	 *   <li><code>GradientType.LINEAR</code></li>
	 *   <li>Two colors, green and blue, with the ratios array set to <code>[0,255]</code></li>
	 *   <li><code>SpreadMethod.PAD</code></li>
	 *   <li><code>InterpolationMethod.LINEAR_RGB</code></li>
	 * </ul>
	 *
	 * <p>The following illustrations show gradients in which the matrix was
	 * defined using the <code>createGradientBox()</code> method with different
	 * parameter settings:</p>
	 *
	 * @param width    The width of the gradient box.
	 * @param height   The height of the gradient box.
	 * @param rotation The amount to rotate, in radians.
	 * @param tx       The distance, in pixels, to translate to the right along
	 *                 the <i>x</i> axis. This value is offset by half of the
	 *                 <code>width</code> parameter.
	 * @param ty       The distance, in pixels, to translate down along the
	 *                 <i>y</i> axis. This value is offset by half of the
	 *                 <code>height</code> parameter.
	 */
	function createGradientBox(width:Float, height:Float, ?rotation:Float, ?tx:Float, ?ty:Float) : models.common.geom.Matrix;
	function toMatrix2D() : createjs.Matrix2D;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.geom.Matrix;
	static function fromMatrix2D(m:createjs.Matrix2D) : models.common.geom.Matrix;
}