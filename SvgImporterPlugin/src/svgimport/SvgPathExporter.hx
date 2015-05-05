package svgimport;

import nanofl.engine.elements.Element;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import svgimport.gradients.GradientType;
import svgimport.StrokeType;

class SvgPathExporter extends BaseExporter
{
	var path : SvgPath;
	
	public function new(svg:Svg, library:Library, path:SvgPath)
	{
		super(svg, library);
		this.path = path;
	}
	
	public function exportAsElement() : Element
	{
		return applyMaskToElement(exportAsElementInner(), path.clipPathID, path.id);
	}
	
	function exportAsElementInner() : Element
	{
		var shape = path.toElement();
		
		var canIgnoreStroke = shape.edges.length == 0 || path.stroke == StrokeType.StrokeNone || Type.enumIndex(path.stroke) == Type.enumIndex(StrokeType.StrokeSolid(""));
		var canIgnoreFill = shape.polygons.length == 0 || path.fill == FillType.FillNone || Type.enumIndex(path.fill) == Type.enumIndex(FillType.FillSolid(""));
		
		//trace('pathToElement canIgnoreStroke = $canIgnoreStroke, canIgnoreFill = $canIgnoreFill');
		
		var strokeMatrix = new Matrix();
		if (!canIgnoreStroke)
		{
			switch (path.stroke)
			{
				case StrokeType.StrokeGrad(gradType):
					switch (gradType)
					{
						case GradientType.LINEAR(grad) : strokeMatrix = grad.matrix;
						case GradientType.RADIAL(grad) : strokeMatrix = grad.matrix;
					}
				case _:
			};
		}
		
		var fillMatrix = new Matrix();
		if (!canIgnoreFill)
		{
			switch (path.fill)
			{
				case FillType.FillGrad(gradType):
					switch (gradType)
					{
						case GradientType.LINEAR(grad) : fillMatrix = grad.matrix;
						case GradientType.RADIAL(grad) : fillMatrix = grad.matrix;
					}
				case _:
			};
		}
		
		if ((canIgnoreStroke || strokeMatrix.isIdentity()) && (canIgnoreFill || fillMatrix.isIdentity()))
		{
			//trace("(1) fillMatrix = " + fillMatrix);
			if (path.matrix.isIdentity()) return shape;
			var item = elementsToLibraryItem([shape], getNextFreeID(path.id));
			var instance = item.newInstance();
			instance.matrix = path.matrix;
			return instance;
		}
		else
		{
			if (canIgnoreStroke)
			{
				//trace("(2)");
				stdlib.Debug.assert(!fillMatrix.isIdentity());
				var instance = shapeToInstance(shape, fillMatrix, getNextFreeID(path.id));
				instance.matrix.prependMatrix(path.matrix);
				return instance;
			}
			else
			if (canIgnoreFill)
			{
				//trace("(3)");
				stdlib.Debug.assert(!strokeMatrix.isIdentity());
				var instance = shapeToInstance(shape, strokeMatrix, getNextFreeID(path.id));
				instance.matrix.prependMatrix(path.matrix);
				return instance;
			}
			else
			{
				//trace("(4)");
				var item = elementsToLibraryItem
				(
					[
						shapeToInstance(new ShapeElement(shape.polygons), fillMatrix, getNextFreeID(path.id)),
						shapeToInstance(new ShapeElement(shape.edges), strokeMatrix, getNextFreeID(path.id))
					],
					getNextFreeID(path.id)
				);
				var instance = item.newInstance();
				instance.matrix = path.matrix;
				return instance;
			}
		}
		
		stdlib.Debug.assert(false);
		return null;
	}
	
	public function exportToLibrary() : MovieClipItem
	{
		stdlib.Debug.assert(path.id != null && path.id != "");
		stdlib.Debug.assert(!library.hasItem(path.id));
		
		var element = exportAsElement();
		
		return Std.is(element, ShapeElement)
			? elementsToLibraryItem([element], path.id)
			: cast(library.getItem(cast(element, Instance).namePath), MovieClipItem);
	}
	
	function shapeToInstance(shape:ShapeElement, matrix:Matrix, id:String) : Instance
	{
		shape.transform(matrix.clone().invert(), false);
		var item = elementsToLibraryItem([shape], id);
		var instance = item.newInstance();
		instance.matrix = matrix;
		return instance;
	}
}