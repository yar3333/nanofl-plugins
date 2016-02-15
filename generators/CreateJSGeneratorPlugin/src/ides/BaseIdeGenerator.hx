package ides;

import nanofl.engine.FileSystem;

class BaseIdeGenerator
{
	var fileSystem : FileSystem;
	var supportDir : String;
	
	public function new(fileSystem:FileSystem, supportDir:String)
	{
		this.fileSystem = fileSystem;
		this.supportDir = supportDir;
	}
	
	public function generate(language:String, dir:String, name:String) {}
}