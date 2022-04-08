type RouteType = {
    name: string;
    path: string;
}

type ModuleType = {
    moduleName: string;
    init: any;
}

var routes: [RouteType];
class Route {
    constructor(name: string, path: string){
        routes.push({name,path})
    }

    getRoutes(): [RouteType]{
        var routes_: [{name: string, path: string}];
        for(var x=0;x<routes.length;x++){
            const route = routes[x]
            routes_.push(route);
        }
        return routes_;
    }

    getRoute(routeName: string): RouteType{
        var route_: {name: string, path: string};
        const routes = this.getRoutes();
        for(var x=0;x<routes.length;x++){
            const route = routes[x];
            if(route.name == routeName) route_ = route;
        }
        return route_;
    }
}

var modules: [ModuleType]
class GlobalModule {
    moduleName: string;
    init: any;

    constructor(moduleName: string,init: any){
        this.moduleName = moduleName;
        this.init = init;
    }

    getModule(moduleName: string): ModuleType{
        var module_: ModuleType;
        for(var x=0;x<modules.length;x++){
            const module = modules[x]
            if(module && module.moduleName == moduleName)
                module_ = module;
            else
                throw new Error("E: Module not found");
        }
        return module_;
    }

    linkModule(){
        modules.push({moduleName: this.moduleName, init: this.init});
    }

    runModule(moduleName: string){
        const module = this.getModule(moduleName)
        if(typeof module.init=="function" || typeof module.init=="object" || typeof module.init=="boolean" || typeof module.init=="string" || typeof module.init=="symbol"){
            if(typeof module.init!=="function"){
                return module.init;
            }
            module.init();
        }else {
            throw new Error("E: Module is not a available type, please chage the type.");
        }
    }

    run(moduleName: string): any{
        // is url?
        const isURL = (moduleName.split(/^\./).length == 2?true:false);
        // Get
        var run: any;
        const scripts =document.querySelectorAll("script")
        for(var x=0;x<scripts.length;x++){
            const script = scripts[x]
            if(script.src && script.src !== moduleName){
                if(isURL){
                    const node = document.createElement("script");
                    node.src = moduleName;
                    node.addEventListener("error",err=>{throw err});
                    run = this.runModule(moduleName);
                }else {
                    const route = Route.prototype.getRoute(moduleName);
                    const node = document.createElement("script");
                    node.src = route.path;
                    node.addEventListener("error",err=>{throw err});
                    run = this.runModule(route.name);
                }
                break;
            }
        }
        return run;
    }
}

class module {
    CreateNew(moduleName: string, init: any){
        new GlobalModule(moduleName,init).linkModule();
    }

    Get(moduleName: string){
        return GlobalModule.prototype.run(moduleName);
    }
}

class route {
    Route(routeName: string, path: string){
        new Route(routeName,path);
    }
}

export default {module, route};