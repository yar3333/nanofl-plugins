package flashimport;

import haxe.ds.StringMap;
import models.common.geom.Point;
using models.common.geom.PointTools;
using Lambda;

typedef EdgeMap = haxe.ds.IntMap<Array<IEdge>>;
typedef CoordMap = StringMap<Array<IEdge>>;

class ContoursParser
{
	static inline var INT_MAX_VALUE = 2000000000;
	static inline var FLOAT_MAX_VALUE = 1e10;
	
	var fillEdgeMap : EdgeMap;
	var lineEdgeMap : EdgeMap;
	
	public function new(contours:Array<ContourParser>)
	{
		var xPos = 0.0;
		var yPos = 0.0;
		
		fillEdgeMap = new EdgeMap();
		lineEdgeMap = new EdgeMap();
		
		for (contour in contours)
		{
			var subPath = new Array<IEdge>();
			
			for (drawOp in contour.drawOps)
			{
				switch(drawOp)
				{
					case DrawOp.move(x, y):
						xPos = x;
						yPos = y;
					
					case DrawOp.line(x, y):
						var from = { x:xPos, y:yPos };
						xPos = x;
						yPos = y;
						var to = { x:xPos, y:yPos };
						subPath.push(new StraightEdge(from, to, contour.strokeStyle, contour.fillStyle1));
						
					case DrawOp.curve(x1, y1, x2, y2):
						var from = { x:xPos, y:yPos };
						var xPosControl = x1;
						var yPosControl = y1;
						xPos = x2;
						yPos = y2;
						var control = { x:xPosControl, y:yPosControl };
						var to = { x:xPos, y:yPos };
						subPath.push(new CurvedEdge(from, control, to, contour.strokeStyle, contour.fillStyle1));
				}
			}
			
			processSubPath(subPath, contour.strokeStyle, contour.fillStyle0, contour.fillStyle1);
		}
		
		cleanEdgeMap(fillEdgeMap);
		cleanEdgeMap(lineEdgeMap);
	}
	
	public function parse(handler:ContoursExporter)
	{
		handler.beginShape();
		
		exportFillPath(handler);
		exportLinePath(handler);
		
		handler.endShape();
	}
	
	function processSubPath(subPath:Array<IEdge>, lineStyleIdx:Int, fillStyleIdx0:Int, fillStyleIdx1:Int) : Void
	{
		if (fillStyleIdx0 != 0)
		{
			var path = fillEdgeMap.get(fillStyleIdx0);
			if (path == null) fillEdgeMap.set(fillStyleIdx0, path = []);
			var j = subPath.length - 1;
			while (j >= 0)
			{
				path.push(subPath[j].reverseWithNewFillStyle(fillStyleIdx0));
				j--;
			}
		}
		
		if (fillStyleIdx1 != 0)
		{
			var path = fillEdgeMap.get(fillStyleIdx1);
			if (path == null) fillEdgeMap.set(fillStyleIdx1, path = []);
			appendEdges(path, subPath);
		}

		if (lineStyleIdx != 0)
		{
			var path = lineEdgeMap.get(lineStyleIdx);
			if (path == null) lineEdgeMap.set(lineStyleIdx, path = []);
			appendEdges(path, subPath);
		}
	}
	
	function cleanEdgeMap(edgeMap:EdgeMap)
	{
		for (styleIdx in edgeMap.keys())
		{
			var subPath:Array<IEdge> = edgeMap.get(styleIdx);
			if (subPath != null && subPath.length > 0)
			{
				var prevEdge : IEdge = null;
				var tmpPath = new Array<IEdge>();
				var coordMap = createCoordMap(subPath);
				while (subPath.length > 0)
				{
					var idx = 0;
					while (idx < subPath.length)
					{
						if (prevEdge == null || PointTools.equ(prevEdge.to, subPath[idx].from))
						{
							var edge:IEdge = subPath.splice(idx, 1)[0];
							tmpPath.push(edge);
							removeEdgeFromCoordMap(coordMap, edge);
							prevEdge = edge;
						}
						else
						{
							var edge = findNextEdgeInCoordMap(coordMap, prevEdge);
							if (edge != null) idx = subPath.indexOf(edge);
							else            { idx = 0; prevEdge = null; }
						}
					}
				}
				edgeMap.set(styleIdx, tmpPath);
			}
		}
	}
	
	function createCoordMap(path:Array<IEdge>) : CoordMap
	{
		var r = new CoordMap();
		for (edge in path)
		{
			var from = edge.from;
			var key = from.x + "_" + from.y;
			var coordMapArray = r.get(key);
			if (coordMapArray == null)
			{
				r.set(key, [edge]);
			}
			else
			{
				coordMapArray.push(edge);
			}
		}
		return r;
	}
	
	function removeEdgeFromCoordMap(coordMap:CoordMap, edge:IEdge)
	{
		var key = edge.from.x + "_" + edge.from.y;
		var coordMapArray = coordMap.get(key);
		if (coordMapArray != null)
		{
			if (coordMapArray.length == 1)
			{
				coordMap.remove(key);
			}
			else
			{
				var i = coordMapArray.indexOf(edge);
				if (i >= 0)
				{
					coordMapArray.splice(i, 1);
				}
			}
		}
	}
	
	function findNextEdgeInCoordMap(coordMap:CoordMap, edge:IEdge) : IEdge
	{
		var key = edge.to.x + "_" + edge.to.y;
		var coordMapArray = coordMap.get(key);
		if (coordMapArray != null && coordMapArray.length > 0)
		{
			return coordMapArray[0];
		}
		return null;
	}
	
	function exportFillPath(handler:ContoursExporter)
	{
		var path = createPathFromEdgeMap(fillEdgeMap);
		var pos = { x:FLOAT_MAX_VALUE, y:FLOAT_MAX_VALUE };
		var fillStyleIdx = INT_MAX_VALUE;
		
		if (path.length > 0)
		{
			handler.beginFills();
			
			for (e in path)
			{
				if (fillStyleIdx != e.fillStyleIdx)
				{
					if (fillStyleIdx != INT_MAX_VALUE)
					{
						handler.endFill();
					}
					fillStyleIdx = e.fillStyleIdx;
					pos = { x:FLOAT_MAX_VALUE, y:FLOAT_MAX_VALUE };
					handler.beginFill(fillStyleIdx - 1);
				}
				
				if (!PointTools.equ(pos, e.from))
				{
					handler.moveTo(e.from.x, e.from.y);
				}
				
				if (Std.is(e, CurvedEdge))
				{
					var c = cast (e, CurvedEdge);
					handler.curveTo(c.control.x, c.control.y, c.to.x, c.to.y);
				}
				else
				{
					handler.lineTo(e.to.x, e.to.y);
				}
				
				pos = e.to;
			}
			
			if (fillStyleIdx != INT_MAX_VALUE)
			{
				handler.endFill();
			}
			
			handler.endFills();
		}
	}
	
	function exportLinePath(handler:ContoursExporter)
	{
		var path = createPathFromEdgeMap(lineEdgeMap);
		var pos = { x:FLOAT_MAX_VALUE, y:FLOAT_MAX_VALUE };
		var lineStyleIdx = INT_MAX_VALUE;
		
		if (path.length > 0)
		{
			handler.beginStrokes();
			
			for (e in path)
			{
				if (lineStyleIdx != e.lineStyleIdx)
				{
					if (lineStyleIdx != INT_MAX_VALUE)
					{
						handler.endStroke();
					}
					lineStyleIdx = e.lineStyleIdx;
					pos = { x:FLOAT_MAX_VALUE, y:FLOAT_MAX_VALUE };
					handler.beginStroke(lineStyleIdx - 1);
				}
				
				if (!PointTools.equ(e.from, pos))
				{
					handler.moveTo(e.from.x, e.from.y);
				}
				
				if (Std.is(e, CurvedEdge))
				{
					var c = cast(e, CurvedEdge);
					handler.curveTo(c.control.x, c.control.y, c.to.x, c.to.y);
				}
				else
				{
					handler.lineTo(e.to.x, e.to.y);
				}
				
				pos = e.to;
			}
			
			if (lineStyleIdx != INT_MAX_VALUE)
			{
				handler.endStroke();
			}
			
			handler.endStrokes();
		}
	}

	function createPathFromEdgeMap(edgeMap:EdgeMap) : Array<IEdge>
	{
		var styleIndexes = { iterator:edgeMap.keys }.array();
		styleIndexes.sort(function(a, b) return a - b);
		
		var path = new Array<IEdge>();
		for (styleIndex in styleIndexes)
		{
			appendEdges(path, edgeMap.get(styleIndex));
		}
		return path;
	}
	
	function appendEdges(v1:Array<IEdge>, v2:Array<IEdge>)
	{
		for (e in v2) v1.push(e);
	}
}
