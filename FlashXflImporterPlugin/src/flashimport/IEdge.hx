package flashimport;

import models.common.geom.Point;

interface IEdge
{
	var from(get, null) : Point;
	var to(get, null) : Point;
	var lineStyleIdx(get, null) : Int;
	var fillStyleIdx(get, null) : Int;
	
	function reverseWithNewFillStyle(newFillStyleIdx:Int) : IEdge;
}
