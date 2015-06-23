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
						gradients.push(g);
						g.write(xml);
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
						gradients.push(g);
						g.write(xml);
					}
					fills.push(polygon.fill);
				}
			}
		}
	}
	
	public function exportPaths(shape:ShapeElement, xml:XmlWriter)
	{
		shape.draw(new ShapePathsRender(gradients, xml), null);
	}
}