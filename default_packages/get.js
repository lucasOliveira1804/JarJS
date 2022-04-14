const production = false;

var context = {
    modules: [],
    routes: [],
    complexRoutes: [],
    default_routes: false,
    get: get,
    module: createModule,
    route: createRoute,
    getRoute: getRoute,
    complex: createComplexRoute,
    getComplex: getComplexRoute
};

function createModule(moduleName, callback){
    moduleName += ".js";
    if(!production) console.log(`Get.createModule: creating[${moduleName}]`)
    context.modules.push({moduleName,callback});
}

function getModule(moduleName){
    var moduleGetted;
    context.modules.forEach(module=>{
        if(module.moduleName == moduleName) moduleGetted = module;
    });
    if(!moduleGetted) throw new Error("Module not found.");
    return moduleGetted;
}

function createInstance(moduleName){
    var origin = moduleName;
    const isPath = moduleName.indexOf("/") == 0 || moduleName.indexOf(".") == 0;
    if(!isPath) moduleName = getRoute(moduleName).path; else moduleName += ".js";
    const node = document.createElement("script");
    node.src = moduleName;
    node.async = false;
    document.head.appendChild(node);
    if(!production) console.log(`Get.createInstance: Loading[${moduleName}]`);
    node.addEventListener("error",err=>{
        if(!production) console.log("Get.createInstance: Error")
        node.remove();
    });
    node.addEventListener("load",()=>{
        node.remove();
        if(!production) console.log("Get.createInstance: Loaded");
        const callback = getModule(moduleName).callback;
        document.dispatchEvent(new CustomEvent(origin,{detail: callback}));
    });
}

function get(moduleName, callback){
    document.addEventListener("DRLoaded",()=>{
        createInstance(moduleName);
        document.addEventListener(moduleName,ev=>callback(ev.detail));
    })
}

// Route

function createRoute(routeName, path){
    path += ".js";
    context.routes.push({routeName,path});
}

function getRoute(routeName){
    var routeGetted;
    context.routes.forEach(route=>{
        if(route.routeName == routeName) routeGetted = route;
    });
    if(!routeGetted) throw new Error("Route not found");
    return routeGetted;
}

// Complex Route

function createComplexRoute(routeName, paths){
    paths.forEach(path=>{
        path += ".js";
    });
    context.complexRoutes.push({routeName, paths});
}

function getComplexRoute(routeName){
    var routeGetted;
    context.complexRoutes.forEach(route=>{
        if(route.routeName == routeName) routeGetted = route;
    });
    if(!routeGetted) throw new Error("Complex Route not found");
    return routeGetted;
}

export default {
    get: context.get,
    module: context.module,
    route: context.route,
    getRoute: context.getRoute,
    complex: context.complex,
    getComplex: context.getComplex
}