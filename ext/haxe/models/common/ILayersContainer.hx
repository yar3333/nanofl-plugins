package models.common;

extern interface ILayersContainer
{
	var layers(default, never) : models.common.ArrayRO<models.common.Layer>;
	function toString() : String;
}