package svgexporter;

import nanofl.engine.elements.ShapeElement;
import nanofl.engine.fills.IFill;
import nanofl.engine.strokes.IStroke;
import nanofl.engine.XmlWriter;
import svgexporter.ShapeExporter;
using Slambda;

class ShapeExporter
{
	var strokes = new Array<IStroke>();
	var fills = new Array<IFill>();
	var gradients = new Array<Gradient>();

	public function new() {}
	
	public function exportGradients(shape:ShapeElement, xml:XmlWriter)
	{
		for (edge in shape.edges)
		{
			if (!strokes.exists.fn(_.equ(edge.stroke)))
			{
				var g = Gradient.fromStroke(edge.stroke);
				if (g != null)
				{
					if (!gradients.exists.fn(_.equ(g)))
					{
						g.write(gradients.length, xml);
						gradients.push(g);
					}
					strokes.push(edge.stroke);
				}
			}
		}
		
		for (polygon in shape.polygons)
		{
			if (!fills.exists.fn(_.equ(polygon.fill)))
			{
				var g = Gradient.fromFill(polygon.fill);
				if (g != null)
				{
					if (!gradients.exists.fn(_.equ(g)))
					{
						g.write(gradients.length, xml);
						gradients.push(g);
					}
					fills.push(polygon.fill);
				}
			}
		}
	}
	
	public function export(idPrefix:String, shape:ShapeElement, xml:XmlWriter) : Array<String>
	{
		var render = new ShapePathsRender(idPrefix, gradients, xml);
		shape.draw(render, null);
		return render.ids;
	}
}