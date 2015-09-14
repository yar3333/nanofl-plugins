import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IExporterPlugin;

class ZippedNanoFLExporterPlugin implements IExporterPlugin
{
	static function main() Plugins.registerExporter(new ZippedNanoFLExporterPlugin());
	
	public function new() {}
	
	public var name = "ZippedNanoFLExporter";
	
	public var menuItemName = "Zipped NanoFL document (*.nflz)";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4zjOaXUAAAAexJREFUOE+Fkd9LU2Ecxk/4h8TUbU5ZZjTzMgqUY3PLsZBt79aVFIg3tVHp7McisrroIuki10Vac5QRdFVhnGIXRUXQxSBsjkFEZTe1YDs7+/HpnMMEl6APPHy/7/P9Pu8LzytthhABPCMyR4YHW2hokXCQ5tpWHBsTVBpQLDf4q2LyT6mOBvjHQq1GZeE0rxZjvE6dJT0zQOXdeUpvpnXGKb+Nm732/gLLFwfIpM6hLEZRFqJIP+45OBVwMB/rQbnhpPS0n18PXXxfclF/dkCv+1l/5OLDXC8zx7v4lupHfexE+p2yI+ROInI7H2/3cnPCzvWTds6ErCxNdTMdtpKMOvic3Es8YmU9vY/6k26kr0kbiXEH/sMWrp2wEwvYuDLexWWdEz4rtyYdxII2fqb7mPR3kp3vQ13uQcomD7J6f1DnEKt39lB76UZ7IescpvpcprEiU19x82nOSe7BEF/03ezdQ61BBYNBVLVCuazqVUOraJRLql6rGLPm2laIsNCDh7V8Ho93hFHfUQqFgqkJIbYx6kMDicQl2tp2mZydvWpqQvz3j5uxYVQUBYtlNx0d7WQyGVPb0VitVqnVauRyOfL5tea5vpMxhKZpFItF07DRGxcJsU04RnI+3yherwePx23S6A2t9UVJ+geBrYA9LDubuQAAAABJRU5ErkJggg==)";
	public var fileFilterDescription = "Zipped NanoFL documents (*.nflz)";
	public var fileFilterExtensions = [ "nflz" ];
	
	public var properties : Array<CustomProperty> = null;
	
	public function exportDocument(fileApi:FileApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		trace("ZippedNanoFLExporter " + srcFilePath + " => " + destFilePath);
		return fileApi.zip(Path.directory(srcFilePath), destFilePath);
	}
}