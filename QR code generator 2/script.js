const inputEl = document.getElementById("input")
const generateEl = document.getElementById("generate")
const image = document.getElementById("image")
const download = document.getElementById("download")
const thethree = document.getElementById("thethree")
const savebtn = document.getElementById("save")
const sizeEl = document.getElementById("size")
const nametosave = document.getElementById("nametosave")
const backbtn = document.getElementById("back")
const inside = document.getElementById("inside")

function generate(){
    let qr = `https://api.qrserver.com/v1/create-qr-code/?&size=${size}x${size}&data=` + encodeURIComponent (inputEl.value)
    image.src = qr
}
generateEl.addEventListener("click", ()=>{
    let input = inputEl.value

        if(!input){
        inputEl.classList.add("error")
        setTimeout(() => {
            inputEl.classList.remove("error")
        }, 1000);
    }else{
        generate()
        download.style.display = "block"
        generateEl.style.display = "none"
    }  
})

download.addEventListener("click", ()=>{
    thethree.style.display = "block"
    download.style.display = "none"

})
savebtn.addEventListener("click", async()=>{
    let size = sizeEl.value || "150"
    let name = nametosave.value.trim() || inputEl.value.trim()

    let qr = `https://api.qrserver.com/v1/create-qr-code/?&size=${size}x${size}&data=` + encodeURIComponent(inputEl.value)

    try{
        let response = await fetch(qr)
        let blob = await response.blob()
        let link = document.createElement("a")
        let blobURL = URL.createObjectURL(blob)
        link.href = blobURL
        link.download = name + ".png"
        
        link.click()
        link.remove()

        nametosave.value = ""
        
    }
    catch{
       alert("Failed to download QR code. Try again.")
    }
    
})
backbtn.addEventListener("click", ()=>{
    
    inside.style.display = "none"
    inputEl.value = ""
    generateEl.style.display = "block"
})