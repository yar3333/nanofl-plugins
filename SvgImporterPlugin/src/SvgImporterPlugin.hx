import nanofl.engine.DocumentProperties;
import nanofl.engine.elements.Element;
import nanofl.engine.elements.GroupElement;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.FileApi;
import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IDocumentImporterPlugin;
import svgimport.Svg;
import svgimport.SvgElement;
import svgimport.SvgGroup;
import svgimport.SvgPath;
import svgimport.SvgPathExporter;
using StringTools;

class SvgImporterPlugin implements IDocumentImporterPlugin
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
	
	static function main() Plugins.registerDocumentImporter(new SvgImporterPlugin());
	
	public function new() { }
	
	public var name = "SvgImporter";
	
	public var menuItemName = "Scalable Vector Graphics (*.svg)";
	public var menuItemIcon = "url(data:image/png;base64," + embeddedIcon.replace("\r", "").replace("\n", "") + ")";
	public var fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	public var fileFilterExtensions = [ "svg" ];
	
	public var isImportDocumentSupported = true;
	public var isImportSymbolSupported = false;
	
	public function importDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, fonts:Array<String>, callb:Bool->Void)
	{
		var xml = Xml.parse(fileApi.getContent(srcFilePath));
		var svg = new Svg(xml);
		var scene = loadFromSvg(svg, Library.SCENE_NAME_PATH);
		library.addItem(scene);
		documentProperties.width = Math.round(svg.width);
		documentProperties.height = Math.round(svg.height);
		callb(true);
	}
	
	public function importSymbol(fileApi:FileApi, srcFilePath:String, libraryDir:String, fonts:Array<String>, callb:LibraryItem->Void)
	{
		
	}
	
	public function loadFromXml(xml:Xml, namePath:String) : MovieClipItem
	{
		return loadFromSvg(new Svg(xml), namePath);
	}
	
	public function loadFromSvg(svg:Svg, namePath:String) : MovieClipItem
	{
		var lastLayerIsGlobal = false;
		var layers = [];
		
		for (child in svg.children)
		{
			switch (child)
			{
				case SvgElement.DisplayGroup(group):
					if (group.name != null && group.name != "")
					{
						lastLayerIsGlobal = false;
						var frame = createLayerWithFrame(layers, group.name);
						for (elem in loadElements(group)) frame.addElement(elem);
					}
					else
					{
						if (!lastLayerIsGlobal)
						{
							lastLayerIsGlobal = true;
							createLayerWithFrame(layers, "auto_" + layers.length);
						}
						
						var frame = layers[layers.length - 1].keyFrames[0];
						for (elem in loadElements(group)) frame.addElement(elem);
					}
					
				case SvgElement.DisplayPath(path):
					if (!lastLayerIsGlobal)
					{
						lastLayerIsGlobal = true;
						createLayerWithFrame(layers, "auto_" + layers.length);
					}
					
					var frame = layers[layers.length - 1].keyFrames[0];
					var shape = path.toElement();
					if (shape != null) frame.addElement(new GroupElement([ shape ]));
					
				case SvgElement.DisplayText(text):
					if (!lastLayerIsGlobal)
					{
						lastLayerIsGlobal = true;
						createLayerWithFrame(layers, "auto_" + layers.length);
					}
					
					var frame = layers[layers.length - 1].keyFrames[0];
					frame.addElement(text.toElement());
			}
		}
		
		var r = new MovieClipItem(namePath);
		for (layer in layers) r.addLayer(layer);
		return r;
	}
	
	function loadElements(g:SvgGroup) : Array<Element>
	{
		var r = new Array<Element>();
		
		for (child in g.children)
		{
			switch (child)
			{
				case SvgElement.DisplayGroup(group):
					var group = new GroupElement(loadElements(group));
					group.name = group.name;
					r.push(group);
					
				case SvgElement.DisplayPath(path):
					var shape = path.toElement();
					if (shape != null) r.push(shape);
					
				case SvgElement.DisplayText(text):
					r.push(text.toElement());
			}
		}
		
		return r;
	}
	
	function createLayerWithFrame(parent:Array<Layer>, name:String) : KeyFrame
	{
		var layer = new Layer(name);
		var keyFrame = new KeyFrame();
		layer.addKeyFrame(keyFrame);
		parent.unshift(layer);
		return keyFrame;
	}
}
