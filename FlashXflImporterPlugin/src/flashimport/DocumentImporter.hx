package flashimport;

import haxe.io.Path;
import haxe.Timer;
import htmlparser.XmlDocument;
import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
using htmlparser.HtmlParserTools;
using StringTools;

class DocumentImporter
{
	public static function process(importMediaScriptTemplate:String, fileApi:FileApi, srcFilePath:String, destFilePath:String, destDocProp:DocumentProperties, destLibrary:Library, runFlashToImportMedia:Bool, log:Dynamic->Void, callb:Bool->Void) : Void
	{
		if (runFlashToImportMedia)
		{
			importMedia
			(
				importMediaScriptTemplate,
				fileApi, srcFilePath, destFilePath, destLibrary,
				function(success)
				{
					if (success) importXmlFiles(fileApi, srcFilePath, destDocProp, destLibrary, log);
					callb(success);
				}
			);
		}
		else
		{
			importXmlFiles(fileApi, srcFilePath, destDocProp, destLibrary, log);
			callb(true);
		}
	}
	
	static function importMedia(importMediaScriptTemplate:String, fileApi:FileApi, srcFilePath:String, destFilePath:String, destLibrary:Library, callb:Bool->Void)
	{
		var destDir = Path.directory(destFilePath);
		
		var scriptFilePath = fileApi.getTempDirectory() + "/flashImporter.jsfl";
		
		var script = importMediaScriptTemplate
			.replace("{SRC_FILE}", srcFilePath.replace("\\", "/"))
			.replace("{DEST_DIR}", destDir.replace("\\", "/"));
		
		fileApi.saveContent(scriptFilePath, script);
		
		var doneFile = destDir + "/.done-import-media";
		fileApi.remove(doneFile);
		fileApi.run(scriptFilePath, [], false);
		waitFor(600, function() return fileApi.exists(doneFile), function(success:Bool)
		{
			if (success)
			{
				fileApi.remove(doneFile);
				destLibrary.loadItems(fileApi);
				callb(true);
			}
			else
			{
				callb(false);
			}
		});
	}
	
	static function importXmlFiles(fileApi:FileApi, srcFilePath:String, destDocProp:DocumentProperties, destLibrary:Library, log:Dynamic->Void)
	{
		var srcDir = Path.directory(srcFilePath);
		
		var srcDoc = new XmlDocument(fileApi.getContent(srcDir + "/DOMDocument.xml"));
		
		var srcLibDir = srcDir + "/LIBRARY";
		var symbolLoader = new SymbolLoader(fileApi, srcDoc, srcLibDir, destLibrary, log);
		var docPropNode = srcDoc.findOne(">DOMDocument");
		destDocProp.width = docPropNode.getAttr("width", 550);
		destDocProp.height = docPropNode.getAttr("height", 400);
		destDocProp.backgroundColor = docPropNode.getAttr("backgroundColor", "#ffffff");
		destDocProp.framerate = docPropNode.getAttr("frameRate", 24);
		
		symbolLoader.loadFromXml(Library.SCENE_NAME_PATH, srcDoc);
		
		fileApi.findFiles(srcLibDir, function(file)
		{
			var namePath = Path.withoutExtension(file.substr(srcLibDir.length + 1));
			symbolLoader.loadFromLibrary(namePath);
		});
	}
	
	#if !sys
	
	static function waitFor(maxSeconds=0, condition:Void->Bool, finish:Bool->Void)
	{
		if (condition()) finish(true);
		else
		{
			var start = Date.now().getTime();
			var timer = new Timer(200);
			timer.run = function()
			{
				if (condition())
				{
					timer.stop();
					finish(true);
				}
				else
				if (maxSeconds > 0 && Date.now().getTime() - start > maxSeconds * 1000)
				{
					timer.stop();
					finish(false);
				}
			};
		}
	}	
	
	#else
	
	static function waitFor(maxSeconds=0, condition:Void->Bool, finish:Bool->Void)
	{
		var start = Date.now().getTime();
		var success = false;
		while (maxSeconds == 0 || Date.now().getTime() - start < maxSeconds * 1000)
		{
			if (condition()) { success = true; break; }
			Sys.sleep(0.2);
		}
		finish(success);
	}
	
	#end
}