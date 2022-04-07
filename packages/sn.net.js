"use strict";
// sn.net.ts
exports.__esModule = true;
/** @private */
var modulesCJS;
var GModule = /** @class */ (function () {
    /**
     * Create a abstract module to execute automaticaly or manualy
     *
     * @param {string} moduleName
     * @param {boolean | undefined} initAfterDOM
     * @param {()=>{}} init
     */
    function GModule(moduleName, initAfterDOM, init) {
        this.name = moduleName;
        this.init = init;
        this.initAfterDOM = initAfterDOM;
    }
    /**
     * This method return a module with all propertys(name, initBeforeDOM, init)
     *
     * @param {string} moduleName
     * @returns
     */
    GModule.prototype.getModule = function (moduleName) {
        for (var x = 0; x < modulesCJS.length; x++) {
            var name_1 = modulesCJS[x].name;
            if (name_1 == moduleName) {
                return modulesCJS[x];
            }
            else if ((x + 1) == moduleName.length) {
                throw new Error("E: Module not found");
            }
        }
    };
    /**
     *  This method white the new module
     *
     * @public
     */
    GModule.prototype.asyncModule = function () {
        modulesCJS.push({ name: this.name, initAfterDOM: this.initAfterDOM, init: this.init });
    };
    /**
     * This method start the module
     *
     * @param {string} moduleName
     */
    GModule.prototype.get = function (moduleName) {
        var module_ = this.getModule(moduleName);
        if (module_.initAfterDOM && typeof module_.initAfterDOM != "undefined")
            window.addEventListener("DOMContendLoaded", module_.init, false);
        else if (!module_.initAfterDOM && typeof module_.initAfterDOM != "undefined")
            module_.init();
    };
    return GModule;
}());
exports["default"] = GModule;
