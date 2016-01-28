declare module nanofl
{
	export class Bitmap extends createjs.Bitmap
	{
		constructor(symbol:any);
	}
	
	export class Button extends MovieClip
	{
		constructor(symbol:any);
	}
	
	export class DisplayObjectTools
	{
		static cache(obj:createjs.DisplayObject) : void;
		static uncache(obj:createjs.DisplayObject) : void;
		static getBounds(obj:createjs.DisplayObject, ignoreSelf?:boolean) : createjs.Rectangle;
	}
	
	export class MovieClip extends createjs.Container
	{
		paused : boolean;
		loop : boolean;
		
		currentFrame : number;
		
		constructor(symbol:any);
		
		play() : void;
		stop() : void;
		gotoAndStop(labelOrIndex:any) : void;
		gotoAndPlay(labelOrIndex:any) : void;
		getTotalFrames() : number;
		
		onEnterFrame() : void;
		onMouseDown(e:createjs.MouseEvent) : void;
		onMouseMove(e:createjs.MouseEvent) : void;
		onMouseUp(e:createjs.MouseEvent) : void;
	}
	
	export class Library
	{
		getItem(namePath:string) : any;
	}
	
	export class Player
	{
		static library : Library;
		static stage : createjs.Stage;
		static scene : nanofl.MovieClip;
		static spriteSheets : { [name:string]: createjs.SpriteSheet; };
	
		static function init(canvas:js.html.CanvasElement, library:Library, ?framerate:number, ?scaleMode:string, ?textureAtlasesData:Array<{ [name:string]: { images:Array<string>, frames:Array<Array<number>> }}>) : void;
	}
	
	export class SeamlessSoundLoop
	{
		constructor(sound:createjs.AbstractSoundInstance);
		stop() : void;
	}
	
	export class TextField extends createjs.Container
	{
		border : boolean;
		height : number;
		minHeight : number;
		minWidth : number;
		text : string;
		textRuns : TextRun[];
		width : number;
		
		constructor();
	}
	
	export class TextRun
	{
		align : string;
		characters : string;
		family : string;
		fillColor : string;
		kerning : boolean;
		letterSpacing : number;
		lineSpacing : number;
 		size : number;
		strokeColor : string;
		strokeSize : number;
		style : string;
		
		constructor(characters?:string, fillColor?:string, size?:number);
		clone() : TextRun;
	}
	
	export class Mesh extends createjs.Container
	{
		static forceSoftwareRenderer : boolean;
		
		//rotationX : number;
		//rotationY : number;
		
		mesh : js.three.Mesh;
		
		ambientLight : js.three.AmbientLight;
		directionalLight : js.three.DirectionalLight;
		camera : js.three.PerspectiveCamera;
		
		renderer : js.three.Renderer;
		
		constructor(symbol:any) : void;
		update() : void;
	}
}