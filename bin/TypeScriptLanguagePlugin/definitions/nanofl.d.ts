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
		static smartUncache(obj:createjs.DisplayObject) : void;
	}
	
	export class MovieClip extends createjs.Container
	{
		paused : boolean;
		loop : boolean;
		
		currentFrame(default, null) : number;
		
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
	
	export class Player
	{
		static library : { getItem(namePath:string) : any; };
		static stage : createjs.Stage;
		static scene : nanofl.MovieClip;
	}
	
	export class SeamlessSoundLoop
	{
		constructor(sound:createjs.AbstractSoundInstance);
		stop() : void;
	}
	
	export class TextField extends createjs.Container
	{
		border(default, set) : boolean;
		change(default, null) : stdlib.Event<{}>;
		dashedBorder(default, set) : boolean;
		editing(default, set) : boolean;
		height(default, set) : number;
		minHeight(default, null) : number;
		minWidth(default, null) : number;
		newTextFormat(default, set) : TextRun;
		resize(default, null) : stdlib.Event<{ width : number, height:number }>;
		selectable : boolean;
		selectionEnd(null, set) : number;
		selectionStart(null, set) : number;
		text(get, set) : string;
		textRuns : TextRun[];
		width(default, set) : number;
		constructor(width:number=0.0, height:number=0.0, selectable:boolean=false, border:boolean=false, dashedBorder:boolean=false, textRuns?:TextRun[], newTextFormat?:TextRun);
		dispose() : void;
		getSelectionFormat() : TextRun;
		setSelectionFormat(format:TextRun) : void;
		update() : void;
	}
	
	export class TextRun
	{
		align : string;
		backgroundColor : string;
		characters : string;
		family : string;
		fillColor : string;
		size : number;
		style : string;
		constructor(characters:string, fillColor:string, family:string, style:string, size:number, align:string, backgroundColor:string);
		clone() : TextRun;
		duplicate(characters?:string) : TextRun;
		equ(textRun:TextRun) : boolean;
		static optimize(textRuns:TextRun[]) : TextRun[];
	}
}