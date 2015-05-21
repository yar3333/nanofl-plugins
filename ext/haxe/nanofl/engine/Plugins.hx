package nanofl.engine;

extern class Plugins
{
	static var filters(default, null) : Map<String, nanofl.engine.plugins.IFilterPlugin>;
	static var importers(default, null) : Map<String, nanofl.ide.plugins.IImporterPlugin>;
	static var exporters(default, null) : Map<String, nanofl.ide.plugins.IExporterPlugin>;
	static var engines(default, null) : Map<String, nanofl.ide.plugins.IEnginePlugin>;
	static var ides(default, null) : Map<String, nanofl.ide.plugins.IIdePlugin>;
	static function registerFilter(plugin:nanofl.engine.plugins.IFilterPlugin) : Void;
	static function registerImporter(plugin:nanofl.ide.plugins.IImporterPlugin) : Void;
	static function registerExporter(plugin:nanofl.ide.plugins.IExporterPlugin) : Void;
	static function registerEngine(plugin:nanofl.ide.plugins.IEnginePlugin) : Void;
	static function registerIde(plugin:nanofl.ide.plugins.IIdePlugin) : Void;
}