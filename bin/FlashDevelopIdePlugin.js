(function () { "use strict";
var FlashDevelopIdePlugin = function() {
	this.languages = ["JavaScript","Haxe"];
	this.name = "FlashDevelop";
};
FlashDevelopIdePlugin.__interfaces__ = [models.common.plugins.IIdePlugin];
FlashDevelopIdePlugin.main = function() {
	models.common.Plugins.registerIde(new FlashDevelopIdePlugin());
};
FlashDevelopIdePlugin.prototype = {
	generateFiles: function(language,fileApi,filePath,documentProperties,library) {
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0,pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name;
		if(nameExt.lastIndexOf(".") > 0) name = nameExt.substring(0,nameExt.lastIndexOf(".")); else name = nameExt;
		var ext;
		switch(language) {
		case "JavaScript":
			ext = ".fdproj";
			break;
		case "Haxe":
			ext = ".hxproj";
			break;
		default:
			ext = null;
		}
		models.common.Log.trace("FlashDevelopIdePlugin.generateFiles language = " + language + "; dir = " + dir + "; name = " + name + "; ext = " + ext);
		var destProjectFile = dir + "/" + name + ext;
		if(!fileApi.exists(destProjectFile)) {
			var sourceDir = fileApi.getPluginsDirectory() + "/FlashDevelopIdePlugin/" + language;
			var template = fileApi.getContent(sourceDir + "/project" + ext);
			template = template.split("{name}").join(name);
			fileApi.saveContent(destProjectFile,template);
			fileApi.copy(sourceDir + "/files",dir);
		}
	}
};
FlashDevelopIdePlugin.main();
})();
