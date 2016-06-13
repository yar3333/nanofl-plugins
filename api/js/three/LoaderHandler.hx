package js.three;

@:native("THREE.LoaderHandler") extern interface LoaderHandler
{
	var handlers : Array<Dynamic>;
	function add(regex:String, loader:js.three.Loader) : Void;
	function get(file:String) : js.three.Loader;
}