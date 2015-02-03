package createjs;

/**
 * Used for calculating and encapsulating display related properties.
 */
extern class DisplayProps
{
	function new(?visible:Float, ?alpha:Float, ?shadow:Float, ?compositeOperation:Float, ?matrix:Float) : Void;
	/**
	 * Property representing the alpha that will be applied to a display object.
	 */
	var alpha : Float;
	/**
	 * Property representing the shadow that will be applied to a display object.
	 */
	var shadow : createjs.Shadow;
	/**
	 * Property representing the compositeOperation that will be applied to a display object.
	 * You can find a list of valid composite operations at:
	 * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
	 */
	var compositeOperation : String;
	/**
	 * Property representing the value for visible that will be applied to a display object.
	 */
	var visible : Bool;
	/**
	 * The transformation matrix that will be applied to a display object.
	 */
	var matrix : createjs.Matrix2D;
	/**
	 * Reinitializes the instance with the specified values.
	 */
	function setValues(?visible:Float, ?alpha:Float, ?shadow:Float, ?compositeOperation:Float, ?matrix:Float) : createjs.DisplayProps;
	/**
	 * Appends the specified display properties. This is generally used to apply a child's properties its parent's.
	 */
	function append(visible:Bool, alpha:Float, shadow:createjs.Shadow, compositeOperation:String, ?matrix:createjs.Matrix2D) : createjs.DisplayProps;
	/**
	 * Prepends the specified display properties. This is generally used to apply a parent's properties to a child's.
	 * For example, to get the combined display properties that would be applied to a child, you could use:
	 *
	 * 	var o = myDisplayObject;
	 * 	var props = new createjs.DisplayProps();
	 * 	do {
	 * 		// prepend each parent's props in turn:
	 * 		props.prepend(o.visible, o.alpha, o.shadow, o.compositeOperation, o.getMatrix());
	 * 	} while (o = o.parent);
	 */
	function prepend(visible:Bool, alpha:Float, shadow:createjs.Shadow, compositeOperation:String, ?matrix:createjs.Matrix2D) : createjs.DisplayProps;
	/**
	 * Resets this instance and its matrix to default values.
	 */
	function identity() : createjs.DisplayProps;
	/**
	 * Returns a clone of the DisplayProps instance. Clones the associated matrix.
	 */
	function clone() : createjs.DisplayProps;
}