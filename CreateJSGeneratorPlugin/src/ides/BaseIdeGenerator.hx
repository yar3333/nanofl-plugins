package ides;

import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.textureatlas.TextureAtlas;

class BaseIdeGenerator
{
	var fileApi : FileApi;
	var supportDir : String;
	
	public function new(fileApi:FileApi, supportDir:String)
	{
		this.fileApi = fileApi;
		this.supportDir = supportDir;
	}
	
	public function generate(language:String, dir:String, name:String) {}
}