
const titulo = document.querySelector(".titulo");
const btn = document.querySelector(".btn")

// Cuando el mause pase por encima del boton mostrara el texto

btn.addEventListener("mouseenter", () => {
    console.log("Entrando al area del boton");

})

// Cuando el mause pase por encima del titulo el boton sera negro
titulo.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "black"
})

// ..... Mouseout

// Cuando salga del area se pintara verder
titulo.addEventListener("mouseout", () => {
    btn.style.backgroundColor = "green"
})
