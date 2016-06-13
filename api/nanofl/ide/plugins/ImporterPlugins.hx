package nanofl.ide.plugins;

extern class ImporterPlugins
{
	static var plugins(default, null) : Map<String, nanofl.ide.plugins.IImporterPlugin>;
	static function register(plugin:nanofl.ide.plugins.IImporterPlugin) : Void;
	static function getByExtension(ext:String) : nanofl.ide.plugins.IImporterPlugin;
}