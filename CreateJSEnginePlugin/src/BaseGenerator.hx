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
	
	public function generate(dir:String, name:String) : Void { }
	
	function capitalizeClassName(fullClassName:String) : String
	{
		var n = fullClassName.lastIndexOf(".");
		return n < 0
            ? capitalize(fullClassName)
            : fullClassName.substring(0, n + 1) + capitalize(fullClassName.substring(n + 1));
	}
	
	function capitalize(s:String) : String
	{
		return s.substring(0, 1).toUpperCase() + s.substring(1);
	}
}