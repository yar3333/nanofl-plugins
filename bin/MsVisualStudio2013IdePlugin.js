var MsVisualStudio2013IdePlugin = (function () {
    function MsVisualStudio2013IdePlugin() {
        this.name = "MS Visual Studio 2013";
        this.languages = ["JavaScript", "TypeScript"];
    }
    MsVisualStudio2013IdePlugin.prototype.generateFiles = function (language, fileApi, filePath, documentProperties, library) {
        var pathParts = filePath.split("/");
        var dir = pathParts.slice(0, pathParts.length - 1).join("/");
        var nameExt = pathParts[pathParts.length - 1];
        var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
        var guid = this.newGuid();
        var self = this;
        [".sln", ".csproj"].forEach(function (ext) {
            var destFile = dir + "/" + name + ext;
            if (!fileApi.exists(destFile)) {
                var srcFile = fileApi.getPluginsDirectory() + "/MsVisualStudio2013IdePlugin/" + language + "/project" + ext;
                var template = fileApi.getContent(srcFile);
                template = template.split("{name}").join(name);
                template = template.split("{guid}").join(guid);
                fileApi.saveContent(destFile, template);
            }
        });
    };
    MsVisualStudio2013IdePlugin.prototype.newGuid = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    return MsVisualStudio2013IdePlugin;
})();
models.common.Plugins.registerIde(new MsVisualStudio2013IdePlugin());
//# sourceMappingURL=MsVisualStudio2013IdePlugin.js.map