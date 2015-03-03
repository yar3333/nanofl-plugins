import flashimport.DocumentImporter;
import flashimport.Macro;
import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Plugins;
import models.common.plugins.IImporterPlugin;
using StringTools;

class FlashXflImporterPlugin implements IImporterPlugin
{
	static var embeddedIcon = "
iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAAB
7klEQVQoz2WQu2pUURSGv305l7mAJiliJARyURAxhShYiUVALGKjhW/gA1j7DBY21oKQykYLEUHQ
2sJKJdEiRGOwmIRk5pyZs9daFhOSGIt/rerjv7jV1VUWivaNJ7PzH5NpnWWFI0TADHNZP6bNR1vr
d3/1+l+Dd1HUEoA/PLlTiyqpg/OHCl2CzzqSXXh67/rr89PdBVFL3rlwBCoGoaDIOqCACJiCw9Mf
SjY3ufjs8e130xPtJTUT55wfgwYkAdHxH6Rj+RB219blz4vv8w8X5t6UIUybmXoAM6NJwmgkEBTu
t+BBG656uJVztvFhais113bLxeV2d+U4qhmVCFUjSFCYAN4ewGYDs+OdfBk9eSQzjjsaUCUZw3WC
Xg2XDbIE2zUmCk2CJo1rAfHIMQmqkItCr2bvvdAqPfmSMEyAekqnqNlJEAZJMCDUnslvI3b7MBgq
M5tA8AxGSulAToKGMUiC80ZTeXqfA+3ckcSx8ckooxC8Y5Dc/46VKE4hOMGlimbkCEBR5JjL8aJk
5v51VIxKBQfEGJhZvkIMgfaZLnsbP9j/vUNeFMQkp6IaDFXx3lPVfW7eWSFkgYPtHcrJKb68fEWK
SnR2uiM6NENTIyEU7sPzNVrdDvs/tzl36SKjdouqqoUshmSmAH8B3SIVwuWULP8AAAAASUVORK5C
YII=
";
	
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
	public var fileFilterPattern = "*.xfl";
	
	public function importDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, fonts:Array<String>, callb:Bool->Void)
	{
		DocumentImporter.process(IMPORT_MEDIA_SCRIPT_TEMPLATE, fileApi, srcFilePath, destFilePath, documentProperties, library, fonts, true, null, callb);
	}
}
