package languages;

import nanofl.ide.textureatlas.TextureAtlas;

class TextureAtlasGenerator extends BaseGenerator
{
	override public function generate(dir:String, name:String)
	{
		generateTextureAtlases(dir);
	}
	
	function generateTextureAtlases(dir:String)
	{
		for (textureAtlasName in textureAtlases.keys())
		{
			var textureAtlas = textureAtlases.get(textureAtlasName);
			
			var imageUrl = "bin/" + textureAtlasName + ".png";
			fileSystem.saveBinary(dir + "/" + imageUrl, textureAtlas.imagePng);
			
			var spriteSheetJsons = [];
			var namePaths = Reflect.fields(textureAtlas.itemFrames);
			namePaths.sort(Reflect.compare);
			for (namePath in namePaths)
			{
				spriteSheetJsons.push("\t'" + namePath + "': { 'images':[ \"" + imageUrl + "\" ], 'frames':[ " + getSpriteSheetFrames(textureAtlas, namePath).join(", ") + " ] }");
			}
			fileSystem.saveContent(dir + "/" + getTextureAtlasJsonUrl(textureAtlasName), "{\n" + spriteSheetJsons.join(",\n") + "\n}");
		}
	}
	
	function getTextureAtlasJsonUrl(textureAtlasName:String) return "bin/" + textureAtlasName + ".json";
	
	function getSpriteSheetFrames(textureAtlas:TextureAtlas, namePath:String) : Array<Array<Float>>
	{
		var r = new Array<Array<Float>>();
		var frameIndexes : Array<Int> = Reflect.field(textureAtlas.itemFrames, namePath);
		for (frameIndex in frameIndexes)
		{
			if (frameIndex != null)
			{
				var frame = textureAtlas.frames[frameIndex];
				r.push([ frame.x, frame.y, frame.width, frame.height, 0, frame.regX, frame.regY ]);
			}
			else
			{
				r.push([]);
			}
		}
		return r;
	}
}