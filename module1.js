globalThis.module("./module1",()=>{
    const btn = document.getElementById("button")
    btn.addEventListener("mouseenter",()=>{
        btn.innerText = "obrigado."
    })
    btn.addEventListener("mouseleave",()=>{
        btn.innerText = "Passe o mouse em mim!"
    })
});