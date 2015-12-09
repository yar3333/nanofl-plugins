import nanofl.engine.CustomProperty;
import nanofl.engine.Debug.console;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IPublisherPlugin;

class ApacheCordovaPublisherPlugin implements IPublisherPlugin
{
	static function main() Plugins.registerPublisher(new ApacheCordovaPublisherPlugin());
	
	public function new() { }
	
	public var name = "ApacheCordovaPublisher";
	
	public var menuItemName = "Apache Cordova";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAACv0lEQVQokSXBzWtcVRwG4Pece+Kdmc6XIZO2SgPB2jrWpn5V3IouBVGEuBEEEeqiddFtV+JfYAQhJepCDAguKrVg1VjFoKiYkFrT1jTp3Gk7na/MzJ2Pm7nn/s7rwudRJJEkiVFKJSLyehzHp0SkJSIQESUi4pybBvAlgEUAGoBTJD2SQvJR59xXnucdV0pJp9PxrLWYLBYdFXSz2aqSfEVrvUbS0wBEKQWl1Nta6+ObN7fiP/5a14VCgaVSid//vKoufXclzmQyh7TnvZeIpEgKSEJEXiApt4M7yamz59yb757lpcsrvPjtD3zupVdZmH2SP63+HktiGQTBa7VaDYZk3pHva0D/uf63S/u+ejCTxteXVzCK9jCdy+CWc/hw6XPzzIljyGazHwyHQ9+IyL5+GD6bJNbZeKyfOPYYJh6YQNjpopjP4bdr19EaC4zE6n6t5kgpt3e7L2oAIxG56qczerded7VwgMyJOdy4voWLF75B6qmnsb98FPe3K6Si7nS621EU/WqUUnsi8q/n6ZOjfp/r95pwhw/j6rVNVG9XEJ98HnebLUylJmhtrKIo2rHWbhiS4/5gsJVO+UgXC/xx6Qv+cmVV+UwQQ2Hlo4/R7fZ4+q15N+r39WA43CZ50xhjUCwWt+uNBh4vH+G5M+8oG+3BTRiQhLYWDlo99PB+tNq7iKLolta6ZxqNBhYWFnbm599APpNKyo8c6k1Nl/b5xqRskiAMw3G93hrkC7l0p9cz+Vx+x1oL3W63sby8HB48eMCl0unU+aVPK/9s3ojCYaR6/ZEK7ty15z/5bGs42ovKR45icXGxFgQBVKVSwezs7NTc3NzLSZKUq9WqnpyczPq+r0kijmM2m81uqVRyuVxuZ2Nj48La2lpDBUGAmZkZ3/O8gogcAJAFkAAg/qcAGAAjrfU951xYrVbH/wGrY6Tm/qMTkAAAAABJRU5ErkJggg==)";
	public var fileFilterDescription = "Apache Cordova destination folder";
	public var fileFilterExtensions = [ "" ];
	
	public var properties : Array<CustomProperty> =
	[
		{ type:"string", name:"outPath",	label:"Output folder",	defaultValue:"publish/cordova",		description:"Folder to store cordova files." },
		{ type:"string", name:"domain", 	label:"Project domain",	defaultValue:"com.example.hello",	description:"Project name in domain notation." },
		{ type:"string", name:"title", 		label:"Title",			defaultValue:"MyProject",			description:"Application's display title" },
		
		{ type:"delimiter", label:"Platforms" },
		{ type:"bool", name:"platform_amazon_fireos",	label:"Amazon Fire OS",			defaultValue:false },
		{ type:"bool", name:"platform_android", 		label:"Android", 				defaultValue:false },
		{ type:"bool", name:"platform_blackberry10",	label:"Blackberry 10", 			defaultValue:false },
		{ type:"bool", name:"platform_firefoxos",		label:"Firefox OS", 			defaultValue:false },
		{ type:"bool", name:"platform_ios",				label:"iOS",					defaultValue:false },
		{ type:"bool", name:"platform_ubuntu",			label:"Ubuntu", 				defaultValue:false },
		{ type:"bool", name:"platform_windows",			label:"Windows 8+, Phone 8.1",	defaultValue:false },
		{ type:"bool", name:"platform_wp8", 			label:"Windows Phone 8", 		defaultValue:false },
		
		{ type:"delimiter", label:"Plugins" },
		{ type:"bool", name:"cordova_plugin_device",				label:"Basic device information (Device API)",	defaultValue:false },
		{ type:"bool", name:"cordova_plugin_network_information",	label:"Network Connection",						defaultValue:false },
		{ type:"bool", name:"cordova_plugin_battery_status",		label:"Battery Events",							defaultValue:false },
		{ type:"bool", name:"cordova_plugin_device_motion",			label:"Accelerometer",							defaultValue:false },
		{ type:"bool", name:"cordova_plugin_device_orientation",	label:"Compass",								defaultValue:false },
		{ type:"bool", name:"cordova_plugin_geolocation",			label:"Geolocation",							defaultValue:false },
		{ type:"bool", name:"cordova_plugin_camera",				label:"Camera",									defaultValue:false },
		{ type:"bool", name:"cordova_plugin_media_capture",			label:"Media playback",							defaultValue:false },
		{ type:"bool", name:"cordova_plugin_media",					label:"Capture",								defaultValue:false },
		{ type:"bool", name:"cordova_plugin_file",					label:"Access files on device",					defaultValue:false },
		{ type:"bool", name:"cordova_plugin_file_transfer",			label:"Access files in network",				defaultValue:false },
		{ type:"bool", name:"cordova_plugin_dialogs",				label:"Notification via dialog",				defaultValue:false },
		{ type:"bool", name:"cordova_plugin_vibration",				label:"Notification via vibration",				defaultValue:false },
		{ type:"bool", name:"cordova_plugin_contacts",				label:"Contacts",								defaultValue:false },
		{ type:"bool", name:"cordova_plugin_globalization",			label:"Globalization",							defaultValue:false },
		{ type:"bool", name:"cordova_plugin_splashscreen",			label:"Splashscreen",							defaultValue:false },
		{ type:"bool", name:"cordova_plugin_inappbrowser",			label:"Open new browser windows (InAppBrowser)",defaultValue:false },
		{ type:"bool", name:"cordova_plugin_console",				label:"Debug console",							defaultValue:false },
	];
	
	public function publish(fileApi:FileApi, params:Dynamic, files:Array<String>) : { success:Bool, message:String }
	{
		console.log("Plugin.publish " + files);
		
		if (params.outPath == null || params.outPath == "") return error("Output folder must be specified. Check publish settings.");
		
		if (!fileApi.exists(params.outPath) || fileApi.readDirectory(params.outPath).length == 0)
		{
			fileApi.createDirectory(params.outPath);
			var r = fileApi.runCaptured("cordova", [ "create", ".", params.domain, params.title ]);
			if (r.exitCode != 0) return error("Run cordova CLI error (" + r.exitCode + "): " + r.output + "\n" + r.error);
		}
		
		return { success:true, message:"OK" };
	}
	
	function error(message:String) : { success:Bool, message:String }
	{
		return { success:false, message:message };
	}
}