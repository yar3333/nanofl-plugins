package nanofl.engine;

extern class Plugins
{
	static var filters(default, null) : Map<String, nanofl.engine.plugins.IFilterPlugin>;
	static var documentImporters(default, null) : Map<String, nanofl.ide.plugins.IDocumentImporterPlugin>;
	static var documentExporters(default, null) : Map<String, nanofl.ide.plugins.IDocumentExporterPlugin>;
	static var libraryItemImporters(default, null) : Map<String, nanofl.ide.plugins.ILibraryItemImporterPlugin>;
	static var libraryItemExporters(default, null) : Map<String, nanofl.ide.plugins.ILibraryItemExporterPlugin>;
	static var languages(default, null) : Map<String, nanofl.ide.plugins.ILanguagePlugin>;
	static var ides(default, null) : Map<String, nanofl.ide.plugins.IIdePlugin>;
	static function registerFilter(plugin:nanofl.engine.plugins.IFilterPlugin) : Void;
	static function registerDocumentImporter(plugin:nanofl.ide.plugins.IDocumentImporterPlugin) : Void;
	static function registerDocumentExporter(plugin:nanofl.ide.plugins.IDocumentExporterPlugin) : Void;
	static function registerLibraryItemImporter(plugin:nanofl.ide.plugins.ILibraryItemImporterPlugin) : Void;
	static function registerLibraryItemExporter(plugin:nanofl.ide.plugins.ILibraryItemExporterPlugin) : Void;
	static function registerLanguage(plugin:nanofl.ide.plugins.ILanguagePlugin) : Void;
	static function registerIde(plugin:nanofl.ide.plugins.IIdePlugin) : Void;
}