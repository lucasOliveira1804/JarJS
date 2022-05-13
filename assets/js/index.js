const btn_scroll = document.querySelector(".btn-down")
const topDiv = document.querySelector(".top")

btn_scroll.addEventListener("click",()=>{
    window.scrollTo(0,topDiv.clientHeight)
})