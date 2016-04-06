import haxe.io.Path;
import ides.*;
import languages.*;
import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileSystem;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.engine.libraryitems.InstancableItem;
import nanofl.ide.plugins.IGeneratorPlugin;
import nanofl.ide.NanoApi;
import nanofl.ide.textureatlas.TextureAtlas;
using stdlib.StringTools;
using stdlib.Lambda;

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
				"JavaScript/MsVisualStudio",
				"TypeScript",
				"TypeScript/MsVisualStudio", 
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
		},
		{
			type:"bool", name:"useLocalScripts", label:"Use local scripts for Player/CreateJS/ThreeJS", defaultValue:false,
			description:"Check to prevent loading scripts from CDN. Local copies will be used. This increase document folder size."
		},
		{
			type:"bool", name:"forceSoftwareRenderer", label:"Force software renderer for ThreeJS", defaultValue:false,
			description:"Don't check to have 3D acceleration autodetection. In code: nanofl.Mesh.forceSoftwareRenderer."
		},
	];
	
	public function generate(api:NanoApi, params:Params, filePath:String, documentProperties:DocumentProperties, library:Library, textureAtlases:Map<String, TextureAtlas>) : Array<String>
	{
		var supportDir = api.fileSystem.getPluginsDirectory() + "/generators/CreateJSGeneratorPlugin";
		
		var languageAndIde = params.mode.split("/");
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
		var generator : BaseGenerator = switch (languageAndIde[0])
		{
			case "HTML":		new HtmlGenerator(api.fileSystem, params, documentProperties, library, textureAtlases, supportDir);
			case "JavaScript":	new JavaScriptGenerator(api.fileSystem, params, documentProperties, library, textureAtlases, supportDir);
			case "TypeScript":	new TypeScriptGenerator(api.fileSystem, params, documentProperties, library, textureAtlases, supportDir);
			case "Haxe":		new HaxeGenerator(api.fileSystem, params, documentProperties, library, textureAtlases, supportDir);
			case "TextureAtlas":new TextureAtlasGenerator(api.fileSystem, params, documentProperties, library, textureAtlases, supportDir);
			case _: throw "Unsupported language '" + languageAndIde[0] + "'."; null;
		}
		trace("CreateJSGeneratorPlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		generator.generate(dir, name);
		
		if (languageAndIde.length > 1)
		{
			var generator : BaseIdeGenerator = switch (languageAndIde[1])
			{
				case "FlashDevelop": new FlashDevelopGenerator(api.fileSystem, supportDir);
				case "MsVisualStudio": new MsVisualStudioGenerator(api.fileSystem, supportDir);
				case _: throw "Unsupported IDE '" + languageAndIde[1] + "'."; null;
			};
			generator.generate(languageAndIde[0], dir, name);
		}
		
		if (api.fileSystem.exists(dir + "/bin") && api.fileSystem.readDirectory(dir + "/bin").length == 0)
		{
			api.fileSystem.remove(dir + "/bin");
		}
		
		var r = [ name + ".html" ];
		if (api.fileSystem.exists(dir + "/bin")) r.push("bin");
		return r;
	}
	
	#if js
	public function test(api:NanoApi, params:Dynamic, filePath:String) : String
	{
		var htmlFilePath = Path.withoutExtension(filePath) + ".html";
		if (api.fileSystem != null && !api.fileSystem.exists(htmlFilePath)) return "File \"" + htmlFilePath + "\" not found.";
		api.serverUtils.openInBrowser(htmlFilePath);
		return null;
	}
	#end
	
	public function getCodeFilePath(params:Params, symbol:InstancableItem) : String
	{
		var language = params.mode.split("/")[0];
		
		var exts =
		[
			"JavaScript" => ".js",
			"TypeScript" => ".hx",
			"Haxe"       => ".hx"
		];
		
		if (exts.keys().indexOf(language) >= 0)
		{
			if (symbol.linkedClass == "")
			{
				symbol.linkedClass = (Path.directory(symbol.namePath) + "/" + Path.withoutDirectory(symbol.namePath).capitalize()).ltrim("/").replace("/", ".");
			}
			return "src/" + symbol.linkedClass.replace(".", "/") + exts.get(language);
		}
		
		return null;
	}
}
