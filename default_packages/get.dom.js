const thisE = document.querySelector("script[attr-node-function=callback_instruction]")

const reqEXP = /([\w*]+)\/([\w*]+)\.([\w*]+)/

function getDefaultRoutes(){
    const DRoutes = document.createElement("script");
    DRoutes.src = "./default_packages/jarjs_default_routes.js";
    DRoutes.async = false;
    document.head.appendChild(DRoutes);
    DRoutes.addEventListener("load",()=>{
        DRoutes.remove();
        document.dispatchEvent(new Event("DRLoaded"));
    });
}

import globals from "./get.js"

globalThis = globals;

getDefaultRoutes();
thisE.remove();