package js.three;

@:native("THREE.WireframeGeometry") extern class WireframeGeometry extends js.three.BufferGeometry
{
	function new(geometry:haxe.extern.EitherType<js.three.Geometry, js.three.BufferGeometry>) : Void;
}