package nanofl.ide.textureatlas;

typedef TextureAtlas =
{
	var frames : Array<nanofl.ide.textureatlas.TextureAtlasFrame>;
	var imagePng : nanofl.engine.Bytes;
	var itemFrames : Dynamic<Array<Int>>;
};