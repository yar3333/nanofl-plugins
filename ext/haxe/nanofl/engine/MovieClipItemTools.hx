package nanofl.engine;

extern class MovieClipItemTools
{
	static function findShapes(item:nanofl.engine.libraryitems.MovieClipItem, allFrames:Bool, ?matrix:nanofl.engine.geom.Matrix, callb:nanofl.engine.elements.ShapeElement -> { var matrix : nanofl.engine.geom.Matrix; var layerIndex : Int; var item : nanofl.engine.libraryitems.MovieClipItem; var insideMask : Bool; } -> Void) : Void;
	static function findMovieClipItems(item:nanofl.engine.libraryitems.MovieClipItem, allFrames:Bool, ?matrix:nanofl.engine.geom.Matrix, callb:nanofl.engine.libraryitems.MovieClipItem -> nanofl.engine.geom.Matrix -> Bool -> Void) : Void;
	static function findInstances(item:nanofl.engine.libraryitems.MovieClipItem, allFrames:Bool, ?matrix:nanofl.engine.geom.Matrix, callb:nanofl.engine.elements.Instance -> { var matrix : nanofl.engine.geom.Matrix; var layerIndex : Int; var keyFrameIndex : Int; var item : nanofl.engine.libraryitems.MovieClipItem; var insideMask : Bool; } -> Void, ?insideMask:Bool) : Void;
	static function iterateInstances(item:nanofl.engine.libraryitems.MovieClipItem, allFrames:Bool, ?insideMask:Bool, callb:nanofl.engine.elements.Instance -> { var layerIndex : Int; var keyFrameIndex : Int; var insideMask : Bool; } -> Void) : Void;
	static function iterateElements(item:nanofl.engine.libraryitems.MovieClipItem, allFrames:Bool, ?insideMask:Bool, callb:nanofl.engine.elements.Element -> { var layerIndex : Int; var keyFrameIndex : Int; var insideMask : Bool; } -> Void) : Void;
}