(function () { "use strict";
var NoneLanguagePlugin = function() {
	this.name = "";
};
NoneLanguagePlugin.__interfaces__ = [models.common.plugins.ILanguagePlugin];
NoneLanguagePlugin.main = function() {
	models.common.Plugins.registerLanguage(new NoneLanguagePlugin());
};
NoneLanguagePlugin.prototype = {
	generateFiles: function(fileApi,filePath,documentProperties,library) {
		var supportDir = fileApi.getPluginsDirectory() + "/NoneLanguagePlugin";
		var parts = filePath.split("/");
		var nameExt = parts.pop();
		var name = nameExt.substring(0,nameExt.lastIndexOf("."));
		var dir = parts.join("/");
		console.log("NoneLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + supportDir + "; dir = " + dir + "; name = " + name);
		var template = fileApi.getContent(supportDir + "/project.html");
		template = template.split("{title}").join(documentProperties.title != ""?documentProperties.title:name);
		template = template.split("{width}").join(documentProperties.width);
		template = template.split("{height}").join(documentProperties.height);
		template = template.split("{backgroundColor}").join(documentProperties.backgroundColor);
		template = template.split("{framerate}").join(documentProperties.framerate);
		template = template.split("{library}").join(library.compile("library"));
		fileApi.saveContent(dir + "/" + name + ".html",template);
	}
};
NoneLanguagePlugin.main();
})();
