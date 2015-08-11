package languages;

import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.ScaleMode;
import nanofl.engine.VersionInfo;
import nanofl.ide.textureatlas.TextureAtlas;
import Lambda;

class HtmlGenerator extends TextureAtlasGenerator
{
	var serializedLibrary : String;
	var filterCodes : Map<String, String>;
	
	public function new(fileApi:FileApi, documentProperties:DocumentProperties, library:Library, textureAtlases:Map<String, TextureAtlas>, supportDir:String)
	{
		super(fileApi, documentProperties, library, textureAtlases, supportDir);
		
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
		if (fileApi.exists(file))
		{
			var text = fileApi.getContent(file);
			if (text.indexOf("<!--ALLOW_REGENERATION-->") >= 0) defines.push("ALLOW_REGENERATION");
		}
		else
		{
			defines.push("ALLOW_REGENERATION");
		}
		
		if (defines.indexOf("ALLOW_REGENERATION") >= 0)
		{
			var template = fileApi.getContent(supportDir + "/languages/project.html");
			template = template.split("{defines}").join(defines.map(function(s) return "<!--" + s + "-->\n").join(""));
			template = template.split("{title}").join(documentProperties.title != "" ? documentProperties.title : name);
			template = template.split("{width}").join(untyped documentProperties.width);
			template = template.split("{height}").join(untyped documentProperties.height);
			
			var cssStyles = getCssStyleForScaleMode();
			template = template.split("{htmlAttributes}").join(cssStyles.html != "" ? " style=\"" + cssStyles.html + "\"" : "");
			template = template.split("{bodyStyle}").join("margin:0; padding:0; font-size:0; background-color:" + documentProperties.backgroundColor + (cssStyles.body != "" ? "; " + cssStyles.body : ""));
			template = template.split("{canvasAttributes}").join(cssStyles.canvas != "" ? " style=\"" + cssStyles.canvas + "\"" : "");
			
			template = template.split("{createjsUrl}").join(VersionInfo.createjsUrl);
			template = template.split("{playerUrl}").join(VersionInfo.playerUrl);
			
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
			
			fileApi.saveContent(file, template);
		}
	}
	
	function getCssStyleForScaleMode() : { html:String, body:String, canvas:String }
	{
		return switch (documentProperties.scaleMode)
		{
			case ScaleMode.noScale:
				{
					html: "height:100%",
					body: "height:100%; text-align:center; overflow:hidden",
					canvas: "position:relative; top:50%; margin-top:-" + Std.int(documentProperties.height / 2) + "px"
				};
				
			case ScaleMode.fit:
				{
					html: "width:100%; height:100%; display:table",
					body: "width:100%; height:100%; display:table-cell; vertical-align:middle; text-align:center; overflow:hidden",
					canvas: ""
				};
				
			case ScaleMode.fill:
				{
					html: "height:100%",
					body: "height:100%; overflow:hidden",
					canvas: "position:absolute"
				};
				
			case ScaleMode.stretch:
				{
					html: "height:100%",
					body: "height:100%",
					canvas: ""
				};
				
			case _:
				{
					html: "",
					body: "",
					canvas: ""
				};
		};
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
		return [];
	}
}
