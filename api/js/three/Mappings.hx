package js.three;

@:native("THREE") extern class Mappings
{
	static function UVMapping() : js.three.Mapping;
	static function CubeReflectionMapping() : js.three.Mapping;
	static function CubeRefractionMapping() : js.three.Mapping;
	static function SphericalReflectionMapping() : js.three.Mapping;
	static function SphericalRefractionMapping() : js.three.Mapping;
}