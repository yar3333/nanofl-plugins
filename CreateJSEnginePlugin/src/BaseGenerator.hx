import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;

class BaseGenerator
{
	var fileApi : FileApi;
	var documentProperties : DocumentProperties;
	var library : Library;
	var supportDir : String;
	
	public function new(fileApi:FileApi, documentProperties:DocumentProperties, library:Library, supportDir:String)
	{
		this.fileApi = fileApi;
		this.documentProperties = documentProperties;
		this.library = library;
		this.supportDir = supportDir;
	}
}