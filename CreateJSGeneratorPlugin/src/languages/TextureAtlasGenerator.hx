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
		var jsonFilePath = dir + "/bin/textureatlases.js";
		
		if (textureAtlases.iterator().hasNext())
		{
			var textureAtlasesJson = "";
			
			for (textureAtlasName in textureAtlases.keys())
			{
				var textureAtlas = textureAtlases.get(textureAtlasName);
				
				var imageUrl = "bin/" + textureAtlasName + ".png";
				fileApi.saveBinary(dir + "/" + imageUrl, textureAtlas.imagePng);
				
				textureAtlasesJson += "(function() {\n";
				textureAtlasesJson += "\tvar images = [ '" + imageUrl + "' ];\n";
				var namePaths = Reflect.fields(textureAtlas.itemFrames);
				namePaths.sort(Reflect.compare);
				for (namePath in namePaths)
				{
					textureAtlasesJson += "\tnanofl.Player.spriteSheets['" + namePath + "'] = new createjs.SpriteSheet({ images:images, frames:[ " + getSpriteSheetFrames(textureAtlas, namePath).join(", ") + " ] });\n";
				}
				textureAtlasesJson += "})();\n\n";
			}
			
			fileApi.saveContent(jsonFilePath, textureAtlasesJson);
		}
		else
		{
			fileApi.remove(jsonFilePath);
		}
	}
	
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