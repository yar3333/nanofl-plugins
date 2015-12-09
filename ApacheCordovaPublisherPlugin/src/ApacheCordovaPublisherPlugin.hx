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
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAC5ElEQVQozz2LbUxbZQBGn7ctLVDpZQKi4KJjAYTGLBIEYU2gxTlKhAhZ0MQxZupMNoPBBbP5gX/QaKIGTDSaiM5snciHwB0lHTKENWxZMAxi1LBunSKDNh2jwAps7e199kPnv5Occ0ASqqoKkiIWi2lIoqev356akhJ4cFty8JSz6wWSuO/+a/E/THgmnz7cfLx1QB62PZmf+/tIaxbPt2XTnLvD2z/oqjjy5tvvjY5NlNyfQRKeyYuFaQ8I5WhlAh/dplVMRr0S6itVNwd3q6lSvJJu0igt9kSmGcGfz43vJgkNAJwZGrXWW5O0n31ftfXlG3lifSOi9c1viL9ubInltTvaz1/PFZ+csG81ViVDPjNSAeDfsbj4qdne8XW4v5qLr9mbLj4++DiUGBGJqmjb/xherH5EnPvGa3CeXcUzxQUzAIDu3p+qzE/s9D6UbFABsOPQTvK8jVHZwqhsIT02fn0kmwCYJhnU/JwdvpOnfqgVGRmZvvaXdFkFWYkcuxwQkiTBkmeEMcEAIQQ2Nu/g4pVN3AqFUL4rnVeWIuK1724vaQXUD2eurug12ytF7aEP8OPZWQSTrHBOLGPwchSRjGpc+OMmDhz9AkPTW6Ld6WFg5W68ABC2WCzGru5eDMgu7LFasBlew6h7COHwbdTVvwytzoBL07/heftzeNXxCtxut6IF8K61vDyupKQYDfvsmByToY1LQEFhISSThLsRBaYkI/bvq8HUr1NY8gcQDAYJvT4uLIRgT3cXSbLj049oNpu5eOMfeuf+ZMtbx3jpgofvNDtIkgcaGwkgCiFEODMzkznZ2Xw41US/389nK2y8dtVLv3+J9sq9vO7zEQBH3MNsbX2fACIA4CstLWUoFFI7O7/lwsICkyWJ47+McXZmhvEGPf+en6fz9Gn6/QHVZrMRwCI0Gs1BAKt1dXUxl8sVLSsrUwAoDodDaWpqUgAoRUVFiizL0YaGhhiAdZ1O57gHue+ALxPHGYEAAAAASUVORK5CYII=)";
	public var fileFilterDescription = "Apache Cordova destination folder";
	public var fileFilterExtensions = [ "" ];
	
	public var properties : Array<CustomProperty> =
	[
		{ type:"string", name:"outPath", 				label:"Output folder", defaultValue:"publishers/cordova", description:"Folder to store cordova files related to document folder." },
		{ type:"delimiter", label:"Platforms" },
		{ type:"bool", name:"platform_amazon_fireos",	label:"Amazon Fire OS",				defaultValue:false },
		{ type:"bool", name:"platform_android", 		label:"Android", 					defaultValue:false },
		{ type:"bool", name:"platform_blackberry10",	label:"Blackberry 10", 				defaultValue:false },
		{ type:"bool", name:"platform_firefoxos",		label:"Firefox OS", 				defaultValue:false },
		{ type:"bool", name:"platform_ubuntu",			label:"Ubuntu", 					defaultValue:false },
		{ type:"bool", name:"platform_windows",			label:"Windows 8.0+, Phone 8.1",	defaultValue:false },
		{ type:"bool", name:"platform_wp8", 			label:"Windows Phone 8", 			defaultValue:false },
		{ type:"delimiter", label:"Plugins" },
		{ type:"bool", name:"cordova-plugin-device",				label:"Basic device information (Device API)",	defaultValue:false },
		{ type:"bool", name:"cordova-plugin-network-information",	label:"Network Connection",						defaultValue:false },
		{ type:"bool", name:"cordova-plugin-battery-status",		label:"Battery Events",							defaultValue:false },
		{ type:"bool", name:"cordova-plugin-device-motion",			label:"Accelerometer",							defaultValue:false },
		{ type:"bool", name:"cordova-plugin-device-orientation",	label:"Compass",								defaultValue:false },
		{ type:"bool", name:"cordova-plugin-geolocation",			label:"Geolocation",							defaultValue:false },
		{ type:"bool", name:"cordova-plugin-camera",				label:"Camera",									defaultValue:false },
		{ type:"bool", name:"cordova-plugin-media-capture",			label:"Media playback",							defaultValue:false },
		{ type:"bool", name:"cordova-plugin-media",					label:"Capture",								defaultValue:false },
		{ type:"bool", name:"cordova-plugin-file",					label:"Access files on device",					defaultValue:false },
		{ type:"bool", name:"cordova-plugin-file-transfer",			label:"Access files in network",				defaultValue:false },
		{ type:"bool", name:"cordova-plugin-dialogs",				label:"Notification via dialog",				defaultValue:false },
		{ type:"bool", name:"cordova-plugin-vibration",				label:"Notification via vibration",				defaultValue:false },
		{ type:"bool", name:"cordova-plugin-contacts",				label:"Contacts",								defaultValue:false },
		{ type:"bool", name:"cordova-plugin-globalization",			label:"Globalization",							defaultValue:false },
		{ type:"bool", name:"cordova-plugin-splashscreen",			label:"Splashscreen",							defaultValue:false },
		{ type:"bool", name:"cordova-plugin-inappbrowser",			label:"Open new browser windows (InAppBrowser)",defaultValue:false },
		{ type:"bool", name:"cordova-plugin-console",				label:"Debug console",							defaultValue:false },
		
		/*
		var type : String; // int / float / string / color / bool / list
		var name : String;
		@:optional var label : String;
		@:optional var description : String;
		var defaultValue : Dynamic;
		@:optional var neutralValue : Dynamic;
		@:optional var units : String;
		@:optional var minValue : Dynamic;
		@:optional var maxValue : Dynamic;
		@:optional var values : Array<String>;
		*/
	];
	
	public function publish(fileApi:FileApi, params:Dynamic, files:Array<String>) : { success:Bool, message:String }
	{
		console.log("Plugin.publish " + files);
		
		
		
		return { success:true, message:"OK" };
	}
}