var TypeScriptLanguagePlugin = (function () {
    function TypeScriptLanguagePlugin() {
        this.name = "TypeScript";
    }
    TypeScriptLanguagePlugin.prototype.generateFiles = function (fileApi, filePath, documentProperties, library) {
        this.fileApi = fileApi;
        this.library = library;
        this.supportDir = fileApi.getPluginsDirectory() + "/TypeScriptLanguagePlugin";
        var pathParts = filePath.split("/");
        var dir = pathParts.slice(0, pathParts.length - 1).join("/");
        var nameExt = pathParts[pathParts.length - 1];
        var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
        console.log("TypeScriptLanguagePlugin.generateFiles filePath = " + filePath + "; supportDir = " + this.supportDir + "; dir= " + dir + "; name = " + name);
        this.generateLibrary(dir, name);
        this.generateHtml(dir, name, documentProperties);
        this.generateClasses(dir, name);
        this.generateSoundsClass(dir, name);
    };
    TypeScriptLanguagePlugin.prototype.generateLibrary = function (dir, name) {
        this.fileApi.saveContent(dir + "/bin/library.js", this.library.compile("library"));
    };
    TypeScriptLanguagePlugin.prototype.generateHtml = function (dir, name, documentProperties) {
        var destFile = dir + "/" + name + ".html";
        if (!this.fileApi.exists(destFile)) {
            var template = this.fileApi.getContent(this.supportDir + "/project.html");
            var params = {
                title: documentProperties.title != "" ? documentProperties.title : name,
                width: documentProperties.width,
                height: documentProperties.height,
                backgroundColor: documentProperties.backgroundColor,
                libraryUrl: "bin/library.js",
                codeUrl: "bin/" + name + ".js",
                framerate: documentProperties.framerate
            };
            template = template.replace(/\{([_a-zA-Z0-9]+)\}/g, function (match, group) {
                return params[group];
            });
            this.fileApi.saveContent(destFile, template);
        }
    };
    TypeScriptLanguagePlugin.prototype.generateClasses = function (dir, name) {
        var linkedItems = this.library.getInstancableItems().filter(function (item) {
            return item.linkedClass != "";
        });
        this.fileApi.remove(dir + "/gen/*");
        if (linkedItems.length > 0) {
            this.fileApi.copy(this.supportDir + "/files", dir);
            var baseMovieClipTemplate = this.fileApi.getContent(this.supportDir + "/BaseMovieClip.ts");
            var movieClipTemplate = this.fileApi.getContent(this.supportDir + "/MovieClip.ts");
            var self = this;
            linkedItems.forEach(function (item) {
                var linkedClass = self.capitalizeClassName(item.linkedClass);
                var dotPos = linkedClass.lastIndexOf(".");
                var pack = dotPos >= 0 ? linkedClass.substring(0, dotPos) : "";
                var klass = dotPos >= 0 ? linkedClass.substring(dotPos + 1) : linkedClass;
                var text = baseMovieClipTemplate.split("{pack}").join("base" + (pack != "" ? "." + pack : "")).split("{klass}").join(klass).split("{base}").join(item.getDisplayObjectClassName()).split("{namePath}").join(item.namePath);
                self.fileApi.saveContent(dir + "/gen/base/" + linkedClass.replace(".", "/") + ".ts", text);
                var classFile = dir + "/src/" + linkedClass.replace(".", "/") + ".ts";
                if (!self.fileApi.exists(classFile)) {
                    var text = "";
                    if (pack != "")
                        text += "module " + pack + "\n{\n";
                    text += movieClipTemplate.split("{klass}").join(klass).split("{base}").join("base." + linkedClass);
                    if (pack != "")
                        text += "\n}";
                    self.fileApi.saveContent(classFile, text);
                }
            });
        }
    };
    TypeScriptLanguagePlugin.prototype.generateSoundsClass = function (dir, name) {
        var classFilePath = dir + "/gen/Sounds.ts";
        var sounds = this.library.getSounds();
        if (sounds.length > 0) {
            var text = [];
            text.push("type AbstractSoundInstance = createjs.AbstractSoundInstance;");
            text.push("type SoundOptions = createjs.SoundOptions;");
            text.push("");
            text.push("class Sounds");
            text.push("{");
            sounds.forEach(function (sound) {
                if (sound.linkage != "" && sound.linkage != null) {
                    text.push("\tpublic static " + sound.linkage + "(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play(\"" + sound.linkage + "\", options); }");
                }
            });
            text.push("}");
            this.fileApi.saveContent(classFilePath, text.join("\n"));
        }
        else {
            this.fileApi.remove(classFilePath);
        }
    };
    TypeScriptLanguagePlugin.prototype.capitalizeClassName = function (fullClassName) {
        var n = fullClassName.lastIndexOf(".");
        return n < 0 ? this.capitalize(fullClassName) : fullClassName.substring(0, n + 1) + this.capitalize(fullClassName.substring(n + 1));
    };
    TypeScriptLanguagePlugin.prototype.capitalize = function (s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    };
    return TypeScriptLanguagePlugin;
})();
models.common.Plugins.registerLanguage(new TypeScriptLanguagePlugin());
