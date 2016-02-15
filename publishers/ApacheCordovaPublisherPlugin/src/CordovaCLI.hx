import nanofl.engine.FileSystem;

class CordovaCLI
{
	var fileSystem : FileSystem;
	var directory : String;

	public function new(fileSystem:FileSystem, directory:String) 
	{
		this.fileSystem = fileSystem;
		this.directory = directory;
	}
	
	public function run(args:Array<String>) : { exitCode:Int, output:String, error:String }
	{
		var r = fileSystem.runCaptured("cordova", args, null, directory);
		if (r.exitCode != 0) error("none zero exit code", r);
		return r;
	}
	
	public function createApplication(domain:String, title:String)
	{
		run([ "create", ".", domain, title ]);
	}
	
	public function getPlatforms() : { installed:Array<String>, available:Array<String> }
	{
		var re = ~/Installed\s+platforms:([^\r\n]+)(?:.|[\r\n])+?Available\s+platforms:([^\r\n]+)/;
		var result = run([ "platforms", "ls" ]);
		
		if (re.match(result.output))
		{
			return
			{
				installed: re.matched(1).split(",").map(StringTools.trim).filter(function(s) return s != "").map(function(s) return s.split(" ")[0]),
				available: re.matched(2).split(",").map(StringTools.trim).filter(function(s) return s != "")
			};
		}
		error("can't detect platforms.", result);
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
	
	public function isProjectDirectory() : Bool
	{
		var r = fileSystem.runCaptured("cordova", [ "info" ], null, directory);
		return r.exitCode == 0;
	}
	
	public function build() : { exitCode:Int, output:String, error:String }
	{
		return run([ "build" ]);
	}
	
	function error(message:String, result:{ exitCode:Int, output:String, error:String }, ?infos:haxe.PosInfos)
	{
		throw (infos != null && infos.fileName != null ? infos.fileName + ":" + infos.lineNumber + ": " : "")
				+ "Cordova CLI error (" + result.exitCode + "): " + message
				+ "\n\toutput = " + result.output
				+ "\n\t error = " + result.error;
	}
}