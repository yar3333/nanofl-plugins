package flashimport;

import nanofl.engine.libraryitems.SoundItem;
import nanofl.engine.libraryitems.FolderItem;
import haxe.io.Path;
import htmlparser.XmlDocument;
import nanofl.engine.FileSystem;
import nanofl.ide.DocumentProperties;
import nanofl.ide.Library;
import nanofl.ide.NanoApi;
using htmlparser.HtmlParserTools;
using StringTools;

class DocumentImporter
{
	public static function process(api:NanoApi, importMediaScriptTemplate:String, srcFilePath:String, destFilePath:String, destDocProp:DocumentProperties, destLibrary:Library, runFlashToImportMedia:Bool, callb:Bool->Void) : Void
	{
		log("DocumentImporter.process");
		
		if (runFlashToImportMedia && hasMedia(api.fileSystem, srcFilePath))
		{
			importMedia
			(
				api,
				importMediaScriptTemplate,
				srcFilePath, destFilePath, destLibrary,
				function(success)
				{
					if (success) importXmlFiles(api, srcFilePath, destDocProp, destLibrary, callb);
					else         callb(false);
				}
			);
		}
		else
		{
			importXmlFiles(api, srcFilePath, destDocProp, destLibrary, callb);
		}
	}
	
	static function hasMedia(fileSystem:FileSystem, srcFilePath:String) : Bool
	{
		var doc = new XmlDocument(fileSystem.getContent(Path.directory(srcFilePath) + "/DOMDocument.xml"));
		return doc.findOne(">DOMDocument>media>*") != null;
	}
	
	static function importMedia(api:NanoApi, importMediaScriptTemplate:String, srcFilePath:String, destFilePath:String, destLibrary:Library, callb:Bool->Void)
	{
		log("DocumentImporter.importMedia");
		
		var destDir = Path.directory(destFilePath);
		
		var scriptFilePath = api.fileSystem.getTempDirectory() + "/flashImporter.jsfl";
		
		var script = importMediaScriptTemplate
			.replace("{SRC_FILE}", srcFilePath.replace("\\", "/"))
			.replace("{DEST_DIR}", destDir.replace("\\", "/"));
		
		api.fileSystem.saveContent(scriptFilePath, script);
		
		var doneFile = destDir + "/.done-import-media";
		api.fileSystem.remove(doneFile);
		api.fileSystem.run(scriptFilePath, [], false);
		waitFor(600, function() return api.fileSystem.exists(doneFile), function(success:Bool)
		{
			if (success)
			{
				api.fileSystem.remove(doneFile);
				destLibrary.loadItems(api);
				callb(true);
			}
			else
			{
				callb(false);
			}
		});
	}
	
	static function importXmlFiles(api:NanoApi, srcFilePath:String, destDocProp:DocumentProperties, destLibrary:Library, callb:Bool->Void)
	{
		log("DocumentImporter.importXmlFiles BEGIN");
		
		var srcDir = Path.directory(srcFilePath);
		
		var srcDoc = new XmlDocument(api.fileSystem.getContent(srcDir + "/DOMDocument.xml"));
		
		var srcLibDir = srcDir + "/LIBRARY";
		var symbolLoader = new SymbolLoader(api, srcDoc, srcLibDir, destLibrary);
		var docPropNode = srcDoc.findOne(">DOMDocument");
		destDocProp.width = docPropNode.getAttr("width", 550);
		destDocProp.height = docPropNode.getAttr("height", 400);
		destDocProp.backgroundColor = docPropNode.getAttr("backgroundColor", "#ffffff");
		destDocProp.framerate = docPropNode.getAttr("frameRate", 24);
		
		log("DocumentImporter.importXmlFiles load media");
		for (node in docPropNode.find(">media>DOMSoundItem"))
		{
			var soundItem = destLibrary.getItem(node.getAttr("name"));
			if (Std.is(soundItem, SoundItem))
			{
				if (node.getAttr("linkageExportForAS", false))
				{
					(cast soundItem:SoundItem).linkage = node.getAttr("linkageIdentifier");
				}
			}
		}
		
		log("DocumentImporter.importXmlFiles load folders");
		for (node in docPropNode.find(">folders>DOMFolderItem"))
		{
			if (node.hasAttribute("name"))
			{
				var namePath = node.getAttr("name", "");
				if (namePath != "")
				{
					destLibrary.addItem(new FolderItem(namePath));
				}
			}
		}
		
		log("DocumentImporter.importXmlFiles load document");
		symbolLoader.loadFromXml(Library.SCENE_NAME_PATH, srcDoc);
		
		log("DocumentImporter.importXmlFiles load symbols");
		var hrefs = docPropNode.find(">symbols>Include").map(function(node) return node.getAttrString("href"));
		
		log("DocumentImporter.importXmlFiles load library");
		#if !sys
			function loadNext()
			{
				if (hrefs.length == 0)
				{
					log("DocumentImporter.importXmlFiles END");
					callb(true);
				}
				else
				{
					symbolLoader.loadFromFile(hrefs.shift());
					haxe.Timer.delay(loadNext, 10);
				}
			}
			loadNext();
		#else
			for (href in hrefs)
			{
				symbolLoader.loadFromFile(href);
			}
			log("DocumentImporter.importXmlFiles END");
			callb(true);
		#end
	}
	
	#if !sys
	
	static function waitFor(maxSeconds=0, condition:Void->Bool, finish:Bool->Void)
	{
		if (condition()) finish(true);
		else
		{
			var start = Date.now().getTime();
			var timer = new haxe.Timer(200);
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
	
	static function log(s:String, ?infos:haxe.PosInfos)
	{
		//haxe.Log.trace(s, infos);
	}
}