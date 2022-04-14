// Get the structure

var structure_root = globalThis.getComplex("jarJS_DOM_structure");
var final_struct = "";
structure_root.forEach(path=>{
    globalThis.get(path,html=>{
        final_struct += html;
    });
})

function render(html){
    const root = document.body;
    const head = document.head;
    const defaultStyles = document.createElement("link");
    defaultStyles.rel = "styleshet";
    defaultStyles.href = "./default_packages/jarJS/default.css";
    head.appendChild(defaultStyles);
    root.innerHTML = html+root.innerHTML;
}

globalThis.module("./defaut_packages/jarJS/loader",{
    render
});