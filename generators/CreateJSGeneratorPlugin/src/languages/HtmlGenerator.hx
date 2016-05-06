package languages;

import nanofl.engine.FileSystem;
import nanofl.engine.Library;
import nanofl.engine.Version;
import nanofl.ide.DocumentProperties;
import nanofl.ide.textureatlas.TextureAtlas;

class HtmlGenerator extends TextureAtlasGenerator
{
	static var scriptUrls =
	{
		createjs: { local:"createjs-0.8.0.js", remote:"http://code.createjs.com/createjs-2014.12.12.combined.js" },
		threejs:  { local:"three-r73.js", remote:"http://cdnjs.cloudflare.com/ajax/libs/three.js/r73/three.min.js" },
		player:   { local:"nanofl-" + Version.player + ".js", remote:"http://player.nanofl.com/nanofl-" + Version.player + ".js" }
	};
	
	var serializedLibrary : String;
	var filterCodes : Map<String, String>;
	
	public function new(fileSystem:FileSystem, params:Params, documentProperties:DocumentProperties, library:Library, textureAtlases:Map<String, TextureAtlas>, supportDir:String)
	{
		super(fileSystem, params, documentProperties, library, textureAtlases, supportDir);
		
		var data = library.compile("library");
		serializedLibrary = data.serializedLibrary;
		filterCodes = data.filterCodes;
	}
	
	override public function generate(dir:String, name:String)
	{
		generateHtml(dir, name);
		generateTextureAtlases(dir);
	}
	
	function generateHtml(dir:String, name:String)
	{
		var file = dir + "/" + name + ".html";
		
		var defines = [];
		if (fileSystem.exists(file))
		{
			var text = fileSystem.getContent(file);
			if (text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		}
		else
		{
			defines.push("ALLOW_REGENERATION");
		}
		
		if (defines.indexOf("ALLOW_REGENERATION") >= 0)
		{
			var template = fileSystem.getContent(supportDir + "/languages/project.html");
			template = template.split("{defines}").join(defines.map(function(s) return "<!--" + s + "-->\n").join(""));
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			template = template.split("{bodyStyle}").join("background-color:" + documentProperties.backgroundColor + "; margin:0; padding:0; font-size:0; overflow:hidden");
			template = template.split("{preCanvas}").join(params.urlOnClick != "" ? "<a href='" + params.urlOnClick + "' target='_blank'>\n\t\t\t" : "");
			template = template.split("{postCanvas}").join(params.urlOnClick != "" ? "\n\t\t</a>" : "");
			
			var scriptUrls = getScriptUrls(dir, name).map(function(s) return "<script src=\"" + s + "\"></script>").join("\n\t\t");
			template = template.split("{scriptUrls}").join(scriptUrls + (scriptUrls != "" ? "\n\t\t" : ""));
			
			var inlineScripts = getInlineScripts()
									.filter(function(s) return s != null && s != "")
									.map(function(s) return s.split("\n").join("\n\t\t\t"))
									.join("\n\t\t\t\n\t\t\t");
			template = template.split("{inlineScripts}").join
			(
				inlineScripts + (inlineScripts != "" ? "\n\t\t\t\n\t\t\t" : "")
				+ getPlayerInitCode().split("\n").join("\n\t\t\t")
			);
			
			fileSystem.saveContent(file, template);
		}
		
		prepareLocalScriptFiles(dir);
	}
	
	function prepareLocalScriptFiles(dir:String)
	{
		var localScripts = [ scriptUrls.createjs.local, scriptUrls.player.local ];
		if (library.getMeshes().length > 0)
		{
			localScripts.push(scriptUrls.threejs.local);
		}
		for (localScript in localScripts)
		{
			if (params.useLocalScripts)
			{
				fileSystem.copy(supportDir + "/scripts/" + localScript, dir + "/bin/" + localScript);
			}
			else
			{
				fileSystem.remove(dir + "/bin/" + localScript);
			}
		}
	}
	
	function getInlineScripts() : Array<String>
	{
		var r = [];
		r.push("var serializedLibrary = '" + serializedLibrary + "';");
		for (filterCode in filterCodes)
		{
			r.push(filterCode);
		}
		return r;
	}
	
	function getPlayerInitCode() : String
	{
		var r = [];
		
		if (documentProperties.useTextureAtlases && textureAtlases.iterator().hasNext())
		{
			var textureAtlasJsonUrls = [];
			for (textureAltasName in textureAtlases.keys())
			{
				textureAtlasJsonUrls.push(getTextureAtlasJsonUrl(textureAltasName));
			}
			
			r.push("var loader = new createjs.LoadQueue(true);");
			r.push("loader.on('complete', run, this);");
			for (textureAltasName in textureAtlases.keys())
			{
				r.push("loader.loadFile('" + getTextureAtlasJsonUrl(textureAltasName) + "', false);");
			}
			r.push("loader.load();");
			r.push("");
			r.push("function run()");
			r.push("{");
			if (params.forceSoftwareRenderer) r.push("nanofl.Mesh.forceSoftwareRenderer = true;");
			r.push("\t" + getBasePlayerInitCode("[ " + textureAtlasJsonUrls.map(function(url) return "loader.getResult('" + url + "')").join(", ") + " ]"));
			r.push("}");
		}
		else
		{
			r.push(getBasePlayerInitCode(null));
		}
		
		return r.join("\n");
	}
	
	function getBasePlayerInitCode(textureAtlases:String)
	{
		return "nanofl.Player.init"
				+ "(" + "document.getElementById(\"mainCanvas\")"
					+ ", nanofl.DataTools.unserialize(serializedLibrary)"
					+ ", " + documentProperties.framerate 
					+ ", '" + documentProperties.scaleMode + "'"
					+ (textureAtlases != null ? ", " + textureAtlases : "")
				+ ");";
	}
	
	function getScriptUrls(dir:String, name:String) : Array<String> 
	{
		var r = [];
		
		r.push(params.useLocalScripts ? "bin/" + scriptUrls.createjs.local : scriptUrls.createjs.remote);
		
		if (library.getMeshes().length > 0)
		{
			r.push(params.useLocalScripts ? "bin/" + scriptUrls.threejs.local : scriptUrls.threejs.remote);
		}
		
		r.push(params.useLocalScripts ? "bin/" + scriptUrls.player.local : scriptUrls.player.remote);
		
		return r;
	}
}
