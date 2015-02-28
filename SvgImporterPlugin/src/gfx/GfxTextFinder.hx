package gfx;

import svg.Text;

class GfxTextFinder extends Gfx
{
	public var text : Text;

	override public function geometryOnly() return true;
	override public function renderText(inText:Text) { if (text==null) text = inText; }
}

