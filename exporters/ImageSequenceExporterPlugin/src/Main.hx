import nanofl.engine.Plugins;

class Main
{
	static function main() 
	{
		Plugins.registerExporter(new PngImageSequenceExporterPlugin());
		Plugins.registerExporter(new JpegImageSequenceExporterPlugin());
	}
}