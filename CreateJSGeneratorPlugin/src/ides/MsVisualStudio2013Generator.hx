package ides;

class MsVisualStudio2013Generator extends BaseIdeGenerator
{
	override public function generate(language:String, dir:String, name:String)
	{
		trace("MsVisualStudio2013Generator language = " + language + "; dir = " + dir + "; name = " + name);
		
		var guid = newGuid();
		for (ext in [".sln", ".csproj"])
		{
			var destFile = dir + "/" + name + ext;
			if (!fileApi.exists(destFile))
			{
				var template = fileApi.getContent(supportDir + "/ides/MsVisualStudio2013/" + language + "/project" + ext);
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
			var r = Std.int(d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return StringTools.hex(re.matched(0) == "x" ? r : (r & 0x3 | 0x8));
		});
		return uuid.toUpperCase();
	}
}
