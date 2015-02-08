package models.client.plugins;

typedef FilterProperty =
{
	/**
	 * Like 123, 10.3, "#00aaff", "rgb(1,2,3)" or "rgba(12,32,255,128)".
	 */
	var defaultValue : Dynamic;
	/**
	 * Used to display in form. If not specified then name will be used.
	 */
	@:optional
	var label : String;
	/**
	 * Maximum value to validate on input. Used for int/float only.
	 */
	@:optional
	var maxValue : Dynamic;
	/**
	 * Minimum value to validate on input. Used for int/float only.
	 */
	@:optional
	var minValue : Dynamic;
	/**
	 * Used as field name in params.
	 */
	var name : String;
	/**
	 * Value for neutral case.
	 * Used to detect finish value in tween when finish filter is absent.
	 * Don't specify or set to null if not need.
	 */
	@:optional
	var neutralValue : Dynamic;
	/**
	 * int / float / string / color / bool
	 */
	var type : String;
	/**
	 * Units to display ("px", "%").
	 */
	@:optional
	var units : String;
};