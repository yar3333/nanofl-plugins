package nanofl.engine;

extern interface ILayersContainer
{
	var layers(default, never) : nanofl.engine.ArrayRO<nanofl.engine.Layer>;
	function toString() : String;
}