package ides;

import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;

class MsVisualStudio2013Generator
{
	public function new() {}
	
	public function generate(language:String, fileApi:FileApi, dir:String, name:String)
	{
		trace("MsVisualStudio2013Generator: dir = " + dir + "; name = " + name);

		var guid = this.newGuid();

		var self = this;
		for (ext in [".sln", ".csproj"])
		{
			var destFile = dir + "/" + name + ext;
			if (!fileApi.exists(destFile))
			{
				var srcFile = fileApi.getPluginsDirectory() + "/MsVisualStudio2013IdePlugin/" + language + "/project" + ext;
				var template = fileApi.getContent(srcFile);
				template = template.split("{name}").join(name);
				template = template.split("{guid}").join(guid);
				fileApi.saveContent(destFile, template);
			}
		}
	}

	function newGuid()
	{
		var d = Date.now().getTime();
		var uuid = ~/[xy]/g.map("{xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}", function(re)
		{
			var r = Std.int(d + Math.random()*16)%16 | 0;
			d = Math.floor(d / 16);
			return StringTools.hex(re.matched(0) == "x" ? r : (r & 0x3 | 0x8));
		});
		return uuid.toUpperCase();
	}
}
