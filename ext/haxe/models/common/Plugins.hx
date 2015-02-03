package models.common;

extern class Plugins
{
	static var filters(default, null) : Map<String, models.client.plugins.IFilterPlugin>;
	static var importers(default, null) : Map<String, models.common.plugins.IImporterPlugin>;
	static var exporters(default, null) : Map<String, models.common.plugins.IExporterPlugin>;
	static var languages(default, null) : Map<String, models.common.plugins.ILanguagePlugin>;
	static var ides(default, null) : Map<String, models.common.plugins.IIdePlugin>;
	static function registerFilter(plugin:models.client.plugins.IFilterPlugin) : Void;
	static function registerImporter(plugin:models.common.plugins.IImporterPlugin) : Void;
	static function registerExporter(plugin:models.common.plugins.IExporterPlugin) : Void;
	static function registerLanguage(plugin:models.common.plugins.ILanguagePlugin) : Void;
	static function registerIde(plugin:models.common.plugins.IIdePlugin) : Void;
}