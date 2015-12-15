import haxe.io.Path;
import ides.*;
import languages.*;
import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IGeneratorPlugin;
import nanofl.ide.textureatlas.TextureAtlas;

class CreateJSGeneratorPlugin implements IGeneratorPlugin
{
	static function main() Plugins.registerGenerator(new CreateJSGeneratorPlugin());
	
	public function new() { }
	
	public var name = "CreateJS";
	
	public var properties : Array<CustomProperty> =
	[
		{
			type:"list", name:"mode", label:"Mode", defaultValue:"HTML",
			values:
			[
				"HTML",
				"JavaScript",
				"JavaScript/FlashDevelop",
				"JavaScript/MsVisualStudio2013",
				"TypeScript",
				"TypeScript/MsVisualStudio2013", 
				"Haxe",
				"Haxe/FlashDevelop",
				"TextureAtlas"
			] 
		},
		//{
		//	type:"bool", name:"graphicsAcceleration", label:"Graphics acceleration", defaultValue:false,
		//	description:"Use WebGL acceleration (classes SpriteStage, Sprite, SpriteContainer and so on)."
		//},
		{
			type:"string", name:"urlOnClick", label:"URL on click", defaultValue:"",
			description:"Useful for Banner Ads. Keep field empty to disable this feature."
		}
	];
	
	public function generate(fileApi:FileApi, params:Params, filePath:String, documentProperties:DocumentProperties, library:Library, textureAtlases:Map<String, TextureAtlas>) : Array<String>
	{
		var supportDir = fileApi.getPluginsDirectory() + "/CreateJSGeneratorPlugin";
		
		var languageAndIde = params.mode.split("/");
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
		var generator : BaseGenerator = switch (languageAndIde[0])
		{
			case "HTML":		new HtmlGenerator(fileApi, params, documentProperties, library, textureAtlases, supportDir);
			case "JavaScript":	new JavaScriptGenerator(fileApi, params, documentProperties, library, textureAtlases, supportDir);
			case "TypeScript":	new TypeScriptGenerator(fileApi, params, documentProperties, library, textureAtlases, supportDir);
			case "Haxe":		new HaxeGenerator(fileApi, params, documentProperties, library, textureAtlases, supportDir);
			case "TextureAtlas":new TextureAtlasGenerator(fileApi, params, documentProperties, library, textureAtlases, supportDir);
			case _: throw "Unsupported language '" + languageAndIde[0] + "'."; null;
		}
		trace("CreateJSGeneratorPlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		generator.generate(dir, name);
		
		if (languageAndIde.length > 1)
		{
			var generator : BaseIdeGenerator = switch (languageAndIde[1])
			{
				case "FlashDevelop": new FlashDevelopGenerator(fileApi, supportDir);
				case "MsVisualStudio2013": new MsVisualStudio2013Generator(fileApi, supportDir);
				case _: throw "Unsupported IDE '" + languageAndIde[1] + "'."; null;
			};
			generator.generate(languageAndIde[0], dir, name);
		}
		
		var files =
		[
			"bin",
			name + ".html"
		];
		for (item in library.getItems())
		{
			for (file in item.getFilePathsToPublish())
			{
				files.push("library/" + file);
			}
		}

		return files;
	}
	
	#if js
	public function test(serverApi:nanofl.ide.ServerApi, fileApi:FileApi, params:Dynamic, filePath:String) : String
	{
		var htmlFilePath = Path.withoutExtension(filePath) + ".html";
		if (fileApi != null && !fileApi.exists(htmlFilePath)) return "File \"" + htmlFilePath + "\" not found.";
		serverApi.openInBrowser(htmlFilePath);
		return null;
	}
	#end
}
