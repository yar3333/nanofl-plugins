package nanofl.engine;

extern class Plugins
{
	static var filters(default, null) : Map<String, nanofl.engine.plugins.IFilterPlugin>;
	static var importers(default, null) : Map<String, nanofl.ide.plugins.IImporterPlugin>;
	static var exporters(default, null) : Map<String, nanofl.ide.plugins.IExporterPlugin>;
	static var generators(default, null) : Map<String, nanofl.ide.plugins.IGeneratorPlugin>;
	static var loaders(default, null) : Map<String, nanofl.ide.plugins.ILoaderPlugin>;
	static var publishers(default, null) : Map<String, nanofl.ide.plugins.IPublisherPlugin>;
	static function registerFilter(plugin:nanofl.engine.plugins.IFilterPlugin) : Void;
	static function registerImporter(plugin:nanofl.ide.plugins.IImporterPlugin) : Void;
	static function registerExporter(plugin:nanofl.ide.plugins.IExporterPlugin) : Void;
	static function registerGenerator(plugin:nanofl.ide.plugins.IGeneratorPlugin) : Void;
	static function registerLoader(plugin:nanofl.ide.plugins.ILoaderPlugin) : Void;
	static function registerPublisher(plugin:nanofl.ide.plugins.IPublisherPlugin) : Void;
	static function getImporterByExtension(ext:String) : nanofl.ide.plugins.IImporterPlugin;
	static function getExporterByExtension(ext:String) : nanofl.ide.plugins.IExporterPlugin;
}