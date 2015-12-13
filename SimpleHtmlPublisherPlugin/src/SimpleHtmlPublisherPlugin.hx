import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.Debug.console;
import nanofl.engine.FileApi;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IPublisherPlugin;

class SimpleHtmlPublisherPlugin implements IPublisherPlugin
{
	static function main() Plugins.registerPublisher(new SimpleHtmlPublisherPlugin());
	
	public function new() { }
	
	public var name = "SimpleHtmlPublisher";
	
	public var menuItemName = "Simple HTML";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAACXBIWXMAAAsSAAALEgHS3X78AAAB80lEQVQokT3QzUtUYRgF8PM873vvfN2ZuffOR+VImWNpplQwCkEfC/+DcJW7FhH0H1T7YCCiiIIIKaJNqyiobdGiFlMuwj4ksd2oIxozWt7rvO/TYtL9j8M5h4wxzLy0uHhxZqZaHVxrreVyuVar1Vxe7qtU6vV6rVaz1jArTUQAlOseHh0fGRk+1F9xXffrwsLm1p+VZvP+7OO7x0a9TFpESERgbTTfIEUCMnEEgU4k2XHjdruz2ckFQWpsAswkImK6K5fOx78WmIksQFBJKxClHSY2hcHyo7ektYYIKc2Ffby+qobGRYQZ2bJLTCDa+TEn+TJpDRENERBxykPKc248BDEBad8nZpj499XTlPIA7FJABSW0NxBHO7M37Yc37YGACeQ4Zn2Fj07tUggADooS/SXT1dNXMDmV3l8ga+3q0vaDayofAgBEAwCgwjLEdl89QX+VE0nbWXeGJ7nUJ1GkglLPaIAAsF9EHCEoyfe5+OmtrQDe9Vk9dMJGEfs9ShoEAOwXAHC5wtOX1ZHjXjHvnrnQ/fhCWLMfAgDtpXo5Smd3nt3mn1/0xBSH2fjlnW7jNRJZzuT3Uqn3gDpw0Cx9M/MN8/xep0Cms2lUBuGADosAQEQi0mttNlrxfGP78/vo0zswuSfPJU+dTYzVVPh/1j8fH8MU32fu3AAAAABJRU5ErkJggg==)";
	
	public var properties : Array<CustomProperty> =
	[
		{ type:"string", name:"outPath", label:"Output folder", defaultValue:"publish/html", description:"Folder to store cordova files." }
	];
	
	public function publish(fileApi:FileApi, params:Dynamic, srcFilePath:String, files:Array<String>) : Void
	{
		console.log("SimpleHtmlPublisherPlugin.publish " + files);
		
		if (params.outPath == "") throw "Output folder must be specified. Check publish settings.";
		
		var baseSrcDir = Path.directory(srcFilePath);
		var outPath = Path.join([ baseSrcDir, params.outPath ]);
		
		if (fileApi.exists(outPath))
		{
			for (file in fileApi.readDirectory(outPath))
			{
				fileApi.remove(outPath + "/" + file);
			}
		}
		else
		{
			fileApi.createDirectory(outPath);
		}
		
		log("COPY");
		
		removeDirectoryContent(fileApi, outPath);
		for (file in files)
		{
			log("copy " + baseSrcDir + "/" + file + " => " + outPath + "/" + file);
			fileApi.copy(baseSrcDir + "/" + file, outPath + "/" + file);
		}
	}
	
	function removeDirectoryContent(fileApi:FileApi, dir:String)
	{
		for (file in fileApi.readDirectory(dir))
		{
			fileApi.remove(dir + "/" + file);
		}
	}
	
	static function log(s:Dynamic, ?infos:haxe.PosInfos)
	{
		haxe.Log.trace(s, infos);
	}
}