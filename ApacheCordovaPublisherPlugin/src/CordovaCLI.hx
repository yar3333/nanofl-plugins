import nanofl.engine.FileApi;

class CordovaCLI
{
	var fileApi : FileApi;
	var directory : String;

	public function new(fileApi:FileApi, directory:String) 
	{
		this.fileApi = fileApi;
		this.directory = directory;
		
	}
	
	public function run(args:Array<String>) : { exitCode:Int, output:String, error:String }
	{
		var r = fileApi.runCaptured("cordova", args, null, directory);
		if (r.exitCode != 0) error("not zero exit code when run with args: " + args.join(" ") + "\n\texit code = " + r.exitCode + "\n\toutput = " + r.output + "\n\terror = " + r.error);
		return r;
	}
	
	public function createApplication(domain:String, title:String)
	{
		run([ "create", ".", domain, title ]);
	}
	
	public function getPlatforms() : { installed:Array<String>, available:Array<String> }
	{
		var re = ~/Installed\s+platforms:([^\r\n]+).+?Available\s+platforms:([^\r\n]+)/s;
		var s = run([ "platforms", "ls" ]).output;
		if (re.match(s))
		{
			return
			{
				installed: re.matched(1).split(",").map(StringTools.trim).filter(function(s) return s != "").map(function(s) return s.split(" ")[0]),
				available: re.matched(2).split(",").map(StringTools.trim).filter(function(s) return s != "")
			};
		}
		error("can't detect platforms.");
		return null;
	}
	
	public function addPlatform(platform:String)
	{
		run([ "platform", "add", platform ]);
	}
	
	public function removePlatform(platform:String)
	{
		run([ "platform", "remove", platform ]);
	}
	
	public function build() : { exitCode:Int, output:String, error:String }
	{
		return run([ "build" ]);
	}
	
	function error(s:String, ?infos:haxe.PosInfos)
	{
		haxe.Log.trace("Cordova CLI error: " + s, infos);
		throw s;
	}
}