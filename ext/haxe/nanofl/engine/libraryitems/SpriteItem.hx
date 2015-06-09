package nanofl.engine.libraryitems;

extern class SpriteItem extends nanofl.engine.libraryitems.InstancableItem implements nanofl.engine.ITextureItem implements nanofl.engine.ILayersContainer
{
	function new(namePath:String, frames:Array<nanofl.engine.SpriteItemFrame>) : Void;
	var layers(default, never) : nanofl.engine.ArrayRO<nanofl.engine.Layer>;
	var likeButton : Bool;
	var autoPlay : Bool;
	var loop : Bool;
	var textureAtlas : String;
	var spriteSheet(default, null) : createjs.SpriteSheet;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function saveToXml(out:nanofl.engine.XmlWriter) : Void;
	override function preload(ready:Void -> Void) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
	override function getDisplayObjectClassName() : String;
	override function toString() : String;
}