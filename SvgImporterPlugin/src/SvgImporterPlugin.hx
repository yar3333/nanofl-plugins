import htmlparser.XmlDocument;
import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.LibraryTools;
import nanofl.ide.plugins.IImporterPlugin;
import nanofl.ide.NanoApi;
import stdlib.Debug;
import svgimport.Svg;
import svgimport.SvgElement;
import svgimport.SvgGroupExporter;
import svgimport.SvgPathExporter;

class SvgImporterPlugin implements IImporterPlugin
{
	static function main() Plugins.registerImporter(new SvgImporterPlugin());
	
	public function new() { }
	
	public var name = "SvgImporter";
	
	public var menuItemName = "Scalable Vector Graphics (*.svg)";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/QaKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lIoqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkNAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2Nu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMmDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXxCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRgT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8dtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gHue+ALxPHGYEAAAAASUVORK5CYII=)";
	public var fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	public var fileFilterExtensions = [ "svg" ];
	
	public var properties : Array<CustomProperty> =
	[
		{
			type: "bool",
			name: "optimize",
			label: "Remove unused items and simplificate document after loading.",
			defaultValue: true
		}
	];
	
	public function importDocument(api:NanoApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, callb:Bool->Void)
	{
		trace("Load");
		
		var xml = new XmlDocument(api.fileSystem.getContent(srcFilePath));
		
		trace("Parse");
		
		var svg = new Svg(xml);
		
		documentProperties.width = Math.round(svg.width);
		documentProperties.height = Math.round(svg.height);
		
		if (svg.id != Library.SCENE_NAME_PATH)
		{
			Debug.assert(svg.id == "" || svg.elements.exists(svg.id));
			svg.elements.remove(svg.id);
			svg.id = Library.SCENE_NAME_PATH;
			svg.elements.set(Library.SCENE_NAME_PATH, SvgElement.DisplayGroup(svg));
		}
		
		trace("Convert");
		
		for (elementID in svg.elements.keys())
		{
			if (!library.hasItem(elementID))
			{
				switch (svg.elements.get(elementID))
				{
					case SvgElement.DisplayGroup(group):
						new SvgGroupExporter(svg, library, group).exportToLibrary();
						
					case SvgElement.DisplayPath(path):
						new SvgPathExporter(svg, library, path).exportToLibrary();
						
					case _:
						trace("ID for item type '" + svg.elements.get(elementID).getName() + "' is not supported.");
				}
			}
		}
		
		if (params.optimize)
		{
			LibraryTools.optimize(library);
		}
		
		callb(true);
	}
}
