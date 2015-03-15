import nanofl.engine.Plugins;

class Main
{
	static function main() 
	{
		Plugins.registerExporter(new PngImageExporterPlugin());
		Plugins.registerExporter(new JpegImageExporterPlugin());
	}
}