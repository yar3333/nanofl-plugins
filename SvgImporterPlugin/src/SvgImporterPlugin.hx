import models.common.elements.Element;
import models.common.elements.GroupElement;
import models.common.elements.ShapeElement;
import models.common.elements.TextElement;
import models.common.KeyFrame;
import models.common.Layer;
import models.common.libraryitems.MovieClipItem;
import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Plugins;
import models.common.plugins.IImporterPlugin;
import svgimport.PathSegment;

class SvgImporterPlugin implements IImporterPlugin
{
	static function main() Plugins.registerImporter(new SvgImporterPlugin());
	
	public function new() { }
	
	public var name = "SvgImporter";
	
	public var menuItemName = "Scalable Vector Graphics (*.svg)";
	public var fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	public var fileFilterPattern = "*.svg";
	
	public function importDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, fonts:Array<String>, callb:Bool->Void)
	{
		var xml = Xml.parse(fileApi.getContent(srcFilePath));
		library.addItem(load(xml, Library.SCENE_NAME_PATH));
		
		callb(true);
	}
	
	
	public function load(xml:Xml, namePath:String) : MovieClipItem
	{
		var doc = new svgimport.SVGData(xml, false);
		
		var r = new MovieClipItem(namePath);
		
		var lastLayerIsGlobal = false;
		
		for (child in doc.children)
		{
			switch (child)
			{
				case svgimport.DisplayElement.DisplayGroup(group):
					if (group.name != null && group.name != "")
					{
						lastLayerIsGlobal = false;
						var frame = createLayerWithFrame(r, group.name);
						for (elem in loadElements(group)) frame.addElement(elem);
					}
					else
					{
						if (!lastLayerIsGlobal)
						{
							lastLayerIsGlobal = true;
							createLayerWithFrame(r, "auto_" + r.layers.length);
						}
						
						var frame = r.layers[r.layers.length - 1].keyFrames[0];
						for (elem in loadElements(group)) frame.addElement(elem);
					}
					
				case svgimport.DisplayElement.DisplayPath(path):
					if (!lastLayerIsGlobal)
					{
						lastLayerIsGlobal = true;
						createLayerWithFrame(r, "auto_" + r.layers.length);
					}
					
					var frame = r.layers[r.layers.length - 1].keyFrames[0];
					frame.addElement(new GroupElement([ loadShape(path) ]));
					
				case svgimport.DisplayElement.DisplayText(text):
					if (!lastLayerIsGlobal)
					{
						lastLayerIsGlobal = true;
						createLayerWithFrame(r, "auto_" + r.layers.length);
					}
					
					var frame = r.layers[r.layers.length - 1].keyFrames[0];
					frame.addElement(loadText(text));
			}
		}
		
		return r;
	}
	
	function loadElements(g:svgimport.Group) : Array<Element>
	{
		return g.children.map(function(child) : Element
		{
			switch (child)
			{
				case svgimport.DisplayElement.DisplayGroup(group):
					var r = new GroupElement(loadElements(group));
					//r.name = group.name;
					return r;
					
				case svgimport.DisplayElement.DisplayPath(path):
					return loadShape(path);
					
				case svgimport.DisplayElement.DisplayText(text):
					return loadText(text);
			}
		});
	}
	
	function loadShape(path:svgimport.Path) : ShapeElement
	{
		for (segment in path.segments)
		{
			/*switch (segment.getType())
			{
				case svgimport.PathSegmentType.MOVE:
					var seg : MoveSegment = cast segment;
					seg.
			}*/
		}
		
		return new ShapeElement();
	}
	
	function loadText(text:svgimport.Text) : TextElement
	{
		return new TextElement("", 10, 10, false, false, [], null);
	}
	
	function createLayerWithFrame(parent:MovieClipItem, name:String) : KeyFrame
	{
		var layer = new Layer(name);
		var keyFrame = new KeyFrame();
		layer.addKeyFrame(keyFrame);
		parent.addLayer(layer);
		return keyFrame;
	}
}
