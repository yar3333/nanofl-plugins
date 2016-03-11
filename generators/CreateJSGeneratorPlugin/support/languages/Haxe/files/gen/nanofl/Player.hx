package nanofl;

extern class Player
{
	static var library : Library;
	static var stage : createjs.Stage;
	static var scene : nanofl.MovieClip;
	static var spriteSheets : Dynamic<createjs.SpriteSheet>;
	
	static function init(canvas:js.html.CanvasElement, library:Library, ?framerate:Float, ?scaleMode:String, ?textureAtlasesData:Array<Dynamic<{ images:Array<String>, frames:Array<Array<Int>> }>>) : Void;
}