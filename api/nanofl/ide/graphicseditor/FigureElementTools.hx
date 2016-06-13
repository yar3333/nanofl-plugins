package nanofl.ide.graphicseditor;

extern class FigureElementTools
{
	static function select(figureElement:nanofl.ide.graphicseditor.FigureElement) : Void;
	static function processLinearGradient(figureElement:nanofl.ide.graphicseditor.FigureElement, handler:nanofl.ide.gradients.ILinearGradient -> Void) : Void;
	static function processRadialGradient(figureElement:nanofl.ide.graphicseditor.FigureElement, handler:nanofl.ide.gradients.IRadialGradient -> Void) : Void;
	static function processBitmapGradient(figureElement:nanofl.ide.graphicseditor.FigureElement, handler:nanofl.ide.gradients.IBitmapGradient -> Void) : Void;
}