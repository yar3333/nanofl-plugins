import flashimport.DocumentImporter;
import flashimport.Macro;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IImporterPlugin;
using StringTools;

class FlashXflImporterPlugin implements IImporterPlugin
{
	static var embeddedIcon = "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAACNUlEQVQoz21Qz0uUURQ997033zhjZvhjapps1RAkqYt0U1O4MAiLwUWEhEEQtKl2LdoEIkR/gFsX1S4iZgjbJiFEizSwTCgoYhgtSUTnm5nP+d47LWZGgzxwuffCORzOEZKYm5szw8PDvel0+nilUqEAAhIAAKUoIiYMwz/FYnEhl8v52WxWQBL5fB4jIyOTJFmtVnf4D6y1liQLhcLP0dHR6wAi+XweBgBmZ2fR0tIiALDt+64WBI5fv8FqjSB1FFok7O7u7pmenn5sjGE2m81hdXVVAODGxMQUSW5tbOxUnzzjzoP7LN+5xw3f59bmJq21oXOO6+vrhVQqdd6ICACA1tb38xeQd2/haiHcwQ5EvAjCIIDv+7pSqYSJRCKltT5k2ChB2tqAtd9QS4tgZxfkyhi8k2lY60BjEIYhrLUKAEjWDwBgtQosfEC4tAz2n4EaGoRKJqGVQiQSQTQaRSwWa9KVYq2mAcB8/uKwsgxvsI/hzAyCh5OAtVBKQWsNrTWMMU0hjBMJz7W2tt+OxQf4aQnOiWJnArrnWJ3R6EBEoJTaEyYXP2beDAxdCFKHLweVCvXYNR29OgZXKoEk6NyucLdIEsafevQyTCQ6zHZJSV8/vEsXQRFgL8++jspVgy7v+w8XP5Isyfg42HbA2XLZ0dVB0pHNr2EPULW/fnX2/a2bQ3d/rT2Nne4Fg8B68biKeJ7y9pmGO4Uk5ufnJZPJnEqn0yfK5bKVZpj/QRFhsVhc+QuQDi4zdLU6egAAAABJRU5ErkJggg==";
	
	#if ide // compilation with ide
	static var IMPORT_MEDIA_SCRIPT_TEMPLATE = Macro.embedFile("../tools/FlashMediaImporter/bin/FlashMediaImporter.jsfl");
	#else // compilaplugin
	static var IMPORT_MEDIA_SCRIPT_TEMPLATE = Macro.embedFile("../../tools/FlashMediaImporter/bin/FlashMediaImporter.jsfl");
	#end
	
	static function main() Plugins.registerImporter(new FlashXflImporterPlugin());
	
	public function new() { }
	
	public var name = "FlashXflImporter";
	
	public var menuItemName = "Adobe Flash Uncompressed Document (*.xfl)";
	public var menuItemIcon = "url(data:image/png;base64," + embeddedIcon.replace("\r", "").replace("\n", "") + ")";
	public var fileFilterDescription = "Adobe Flash Uncompressed Document (*.xfl)";
	public var fileFilterExtensions = [ "xfl" ];
	
	public function importDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, fonts:Array<String>, callb:Bool->Void)
	{
		DocumentImporter.process(IMPORT_MEDIA_SCRIPT_TEMPLATE, fileApi, srcFilePath, destFilePath, documentProperties, library, fonts, true, null, callb);
	}
}
