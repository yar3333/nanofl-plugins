import flashimport.DocumentImporter;
import flashimport.Macro;
import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.ide.DocumentProperties;
import nanofl.ide.Library;
import nanofl.ide.NanoApi;
import nanofl.ide.plugins.IImporterPlugin;
import nanofl.ide.plugins.ImporterPlugins;
import stdlib.Uuid;

class FlashImporterPlugin implements IImporterPlugin
{
	static var IMPORT_MEDIA_SCRIPT_TEMPLATE = Macro.embedFile("../bin/FlashMediaImporter.jsfl");
	
	static function main() ImporterPlugins.register(new FlashImporterPlugin());
	
	public function new() { }
	
	public var name = "FlashImporter";
	
	public var menuItemName = "Adobe Flash Document (*.fla;*.xfl)";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAACNUlEQVQoz21Qz0uUURQ997033zhjZvhjapps1RAkqYt0U1O4MAiLwUWEhEEQtKl2LdoEIkR/gFsX1S4iZgjbJiFEizSwTCgoYhgtSUTnm5nP+d47LWZGgzxwuffCORzOEZKYm5szw8PDvel0+nilUqEAAhIAAKUoIiYMwz/FYnEhl8v52WxWQBL5fB4jIyOTJFmtVnf4D6y1liQLhcLP0dHR6wAi+XweBgBmZ2fR0tIiALDt+64WBI5fv8FqjSB1FFok7O7u7pmenn5sjGE2m81hdXVVAODGxMQUSW5tbOxUnzzjzoP7LN+5xw3f59bmJq21oXOO6+vrhVQqdd6ICACA1tb38xeQd2/haiHcwQ5EvAjCIIDv+7pSqYSJRCKltT5k2ChB2tqAtd9QS4tgZxfkyhi8k2lY60BjEIYhrLUKAEjWDwBgtQosfEC4tAz2n4EaGoRKJqGVQiQSQTQaRSwWa9KVYq2mAcB8/uKwsgxvsI/hzAyCh5OAtVBKQWsNrTWMMU0hjBMJz7W2tt+OxQf4aQnOiWJnArrnWJ3R6EBEoJTaEyYXP2beDAxdCFKHLweVCvXYNR29OgZXKoEk6NyucLdIEsafevQyTCQ6zHZJSV8/vEsXQRFgL8++jspVgy7v+w8XP5Isyfg42HbA2XLZ0dVB0pHNr2EPULW/fnX2/a2bQ3d/rT2Nne4Fg8B68biKeJ7y9pmGO4Uk5ufnJZPJnEqn0yfK5bKVZpj/QRFhsVhc+QuQDi4zdLU6egAAAABJRU5ErkJggg==)";
	public var fileFilterDescription = "Adobe Flash Documents (*.fla;*.xfl)";
	public var fileFilterExtensions = [ "fla", "xfl" ];
	
	public var properties : Array<CustomProperty> =
	[
		{
			type: "bool",
			name: "importMedia",
			label: "Import media (Adobe Flash CS5+ must be installed)",
			defaultValue: true
		}
	];
	
	public function importDocument(api:NanoApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, callb:Bool->Void)
	{
		if (Path.extension(srcFilePath) == "fla")
		{
			var dir = api.fileSystem.getTempDirectory() + "/unsaved/" + Uuid.newUuid();
			api.fileSystem.unzip(srcFilePath, dir);
			
			var xflFiles = api.fileSystem.readDirectory(dir).filter(function(s) return Path.extension(s).toLowerCase() == "xfl");
			if (xflFiles.length == 0) throw "XFL file is not found";
			
			DocumentImporter.process
			(
				api,
				IMPORT_MEDIA_SCRIPT_TEMPLATE,
				dir + "/" + xflFiles[0],
				destFilePath,
				documentProperties,
				library,
				params.importMedia,
				function(success:Bool)
				{
					api.fileSystem.remove(dir);
					callb(success);
				}
			);
		}
		else
		{
			DocumentImporter.process
			(
				api,
				IMPORT_MEDIA_SCRIPT_TEMPLATE,
				srcFilePath,
				destFilePath,
				documentProperties,
				library,
				params.importMedia,
				callb
			);
		}
	}
}
