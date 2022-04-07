// sn.net.ts

// Module Get
/** @private */
var modulesCJS: [{name: string, initAfterDOM: boolean | undefined, init: any}];

class GModule {
    /** @private */
    name: string;
    /** @private */
    initAfterDOM: boolean | undefined;
    /** @private */
    init: any;

    /**
     * Create a abstract module to execute automaticaly or manualy
     * 
     * @param {string} moduleName 
     * @param {boolean | undefined} initAfterDOM 
     * @param {()=>{}} init 
     */
    constructor(moduleName: string, initAfterDOM: boolean | undefined, init: any){
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
    getModule(moduleName: string){
        for(var x=0;x<modulesCJS.length;x++){
            const name = modulesCJS[x].name;
            if(name == moduleName){
                return modulesCJS[x];
            }else if((x+1) == moduleName.length){
                throw new Error("E: Module not found");
            }
        }
    }

    /**
     *  This method white the new module
     * 
     * @public
     */
    asyncModule(){
        modulesCJS.push({name: this.name, initAfterDOM: this.initAfterDOM, init: this.init});
    }

    /**
     * This method start the module
     * 
     * @param {string} moduleName 
     */
    execute(moduleName: string){
        const module_ = this.getModule(moduleName);
        if(module_)
            if(typeof module_.init == "function")
                if(!module_.initAfterDOM)
                    module_.init();
                else if(module_.initAfterDOM && typeof module_.initAfterDOM != "undefined")
                    window.addEventListener("DOMContendLoaded",module_.init, false);
            else if(typeof module_.init == "object" || typeof module_.init == "string" || typeof module_.init == "number" || typeof module_.init == "symbol")
                return module_.init
            else
                throw new Error("E: Module dont's a function, object, string, number or a symbol.")
    }
}

export function CreateModule(moduleName: string, initAfterDOM: boolean | undefined, init: any) {
    new GModule(moduleName,initAfterDOM,init).asyncModule()
}

export function get(moduleName: string){
    return GModule.prototype.execute(moduleName)
}
