import htmlparser.XmlBuilder;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IExporterPlugin;
import svgexporter.SvgExporter;
using StringTools;
using Slambda;

class SvgExporterPlugin implements IExporterPlugin
{
	static var embeddedIcon = "
iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC
5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/Q
aKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lI
oqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy
5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkN
AJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne
8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQ
TvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2
Nu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMm
Dhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXx
Ctxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRg
T3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8
dtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz
9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gH
ue+ALxPHGYEAAAAASUVORK5CYII=
";
	
	static function main() Plugins.registerExporter(new SvgExporterPlugin());
	
	public function new() { }
	
	public var name = "SvgExporter";
	
	public var menuItemName = "Scalable Vector Graphics (*.svg)";
	public var menuItemIcon = "url(data:image/png;base64," + embeddedIcon.replace("\r", "").replace("\n", "") + ")";
	public var fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	public var fileFilterExtensions = [ "svg" ];
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		trace("Plugin.exportDocument " + srcFilePath + " => " + destFilePath);
		
		var xml = new XmlBuilder();
		xml.begin("svg")
			.attr("xmlns", "http://www.w3.org/2000/svg")
			.attr("width", documentProperties.width)
			.attr("height", documentProperties.height)
			.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
			
			new SvgExporter(library).export(xml);
			
		xml.end();
		
		fileApi.saveContent(destFilePath, xml.toString());
		
		return true;
	}
}