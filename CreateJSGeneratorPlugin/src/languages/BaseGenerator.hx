package languages;

import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.textureatlas.TextureAtlas;

class BaseGenerator
{
	var fileApi : FileApi;
	var params : Params;
	var documentProperties : DocumentProperties;
	var library : Library;
	var textureAtlases : Map<String, TextureAtlas>;
	var supportDir : String;
	
	public function new(fileApi:FileApi, params:Params, documentProperties:DocumentProperties, library:Library, textureAtlases:Map<String, TextureAtlas>, supportDir:String)
	{
		this.fileApi = fileApi;
		this.params = params;
		this.documentProperties = documentProperties;
		this.library = library;
		this.textureAtlases = textureAtlases;
		this.supportDir = supportDir;
	}
	
	public function generate(dir:String, name:String) {}
}