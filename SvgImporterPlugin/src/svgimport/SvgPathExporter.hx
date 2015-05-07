package svgimport;

import nanofl.engine.geom.Bounds;
import nanofl.engine.elements.Element;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.geom.BoundsTools;
import nanofl.engine.geom.StrokeEdges;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import svgimport.gradients.GradientType;
import svgimport.StrokeType;

class SvgPathExporter extends BaseExporter
{
	static var EPS = 1e-10;
	
	var path : SvgPath;
	
	public function new(svg:Svg, library:Library, path:SvgPath)
	{
		super(svg, library);
		this.path = path;
	}
	
	public function exportAsElement() : Element
	{
		trace("SvgPathexporter.exportAsElement " + path.id);
		return applyMaskToElement(exportAsElementInner(), path.clipPathID, path.id);
	}
	
	function exportAsElementInner() : Element
	{
		var shapeAndBounds = path.toElement();
		
		if (shapeAndBounds == null) return null;
		
		var shape = shapeAndBounds.shape;
		var bounds = shapeAndBounds.bounds;
		
		var canIgnoreStroke = shape.edges.length == 0 || path.stroke == StrokeType.StrokeNone || Type.enumIndex(path.stroke) == Type.enumIndex(StrokeType.StrokeSolid(""));
		var canIgnoreFill = shape.polygons.length == 0 || path.fill == FillType.FillNone || Type.enumIndex(path.fill) == Type.enumIndex(FillType.FillSolid(""));
		
		//trace('pathToElement canIgnoreStroke = $canIgnoreStroke, canIgnoreFill = $canIgnoreFill');
		
		var aspectRatio = 1.0;
		
		var strokeMatrix = new Matrix();
		if (!canIgnoreStroke)
		{
			switch (path.stroke)
			{
				case StrokeType.StrokeGrad(gradType):
					switch (gradType)
					{
						case GradientType.LINEAR(grad):
							strokeMatrix = grad.matrix;
							aspectRatio = getApsectRatio(bounds, grad);
							
						case GradientType.RADIAL(grad):
							strokeMatrix = grad.matrix;
							aspectRatio = getApsectRatio(bounds, grad);
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
						case GradientType.LINEAR(grad):
							fillMatrix = grad.matrix;
							aspectRatio = getApsectRatio(bounds, grad);
							
						case GradientType.RADIAL(grad):
							fillMatrix = grad.matrix;
							aspectRatio = getApsectRatio(bounds, grad);
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
				var instance = shapeToInstance(shape, bounds, fillMatrix, aspectRatio, getNextFreeID(path.id));
				if (!instance.matrix.isIdentity()) instance = elementsToLibraryItem([instance], getNextFreeID(path.id)).newInstance();
				instance.matrix.prependMatrix(path.matrix);
				return instance;
			}
			else
			if (canIgnoreFill)
			{
				//trace("(3)");
				stdlib.Debug.assert(!strokeMatrix.isIdentity());
				var instance = shapeToInstance(shape, bounds, strokeMatrix, aspectRatio, getNextFreeID(path.id));
				if (!instance.matrix.isIdentity()) instance = elementsToLibraryItem([instance], getNextFreeID(path.id)).newInstance();
				instance.matrix.prependMatrix(path.matrix);
				return instance;
			}
			else
			{
				//trace("(4)");
				var item = elementsToLibraryItem
				(
					[
						shapeToInstance(new ShapeElement(shape.polygons), bounds, fillMatrix, aspectRatio, getNextFreeID(path.id)),
						shapeToInstance(new ShapeElement(shape.edges), bounds, strokeMatrix, aspectRatio, getNextFreeID(path.id))
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
		if (element == null) return null;
		return Std.is(element, ShapeElement)
			? elementsToLibraryItem([element], path.id)
			: cast(library.getItem(cast(element, Instance).namePath), MovieClipItem);
	}
	
	function shapeToInstance(shape:ShapeElement, bounds:Bounds, matrix:Matrix, aspectRatio:Float, id:String) : Instance
	{
		shape = cast shape.clone();
		
		matrix = matrix.clone();
		if (aspectRatio != 1.0)
		{
			matrix.translate(-(bounds.minX+bounds.maxX)/2, -(bounds.minY+bounds.maxY)/2);
			matrix.scale(1, aspectRatio);
			matrix.translate( (bounds.minX+bounds.maxX)/2,  (bounds.minY+bounds.maxY)/2);
		}
		
		var invertMatrix = matrix.clone().invert();
		shape.transform(invertMatrix, false);
		
		var k = invertMatrix.getAverageScale();
		StrokeEdges.processStrokes(shape.edges, function(stroke) stroke.thickness *= k);
		
		var item = elementsToLibraryItem([shape], id);
		var instance = item.newInstance();
		instance.matrix = matrix.clone();
		return instance;
	}
	
	function getApsectRatio(bounds:Bounds, grad:{ gradientUnits:String }) : Float
	{
		if (grad.gradientUnits != "userSpaceOnUse" && bounds.maxX - bounds.minX > EPS)
		{
			return (bounds.maxY - bounds.minY) / (bounds.maxX - bounds.minX);
		}
		return 1.0;
	}
}