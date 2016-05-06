package nanofl.ide.plugins;

extern class GeneratorPlugins
{
	static var plugins(default, null) : Map<String, nanofl.ide.plugins.IGeneratorPlugin>;
	static function register(plugin:nanofl.ide.plugins.IGeneratorPlugin) : Void;
}