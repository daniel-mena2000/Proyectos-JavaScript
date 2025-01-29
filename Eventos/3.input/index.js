

const busqueda = document.querySelector('.busqueda');

// El evento keydown se activa cuando presiona una tecla
busqueda.addEventListener('keydown', () => {
    console.log("ejecutando al presionar una tecla....");

})

busqueda.addEventListener('keyup', () => {
    console.log("ejecutando cuando presionamos y soltamos una tecla....");

});


busqueda.addEventListener('blur', () => {
    console.log("ejecutando cuando salimos del input....");
})

busqueda.addEventListener('blur', () => {
    console.log("ejecutando cuando copiamos el texto dentro del input....");
})

busqueda.addEventListener('paste', () => {
    console.log("ejecutando cuando pegamos algo dentro del input....");
})

busqueda.addEventListener('cut', () => {
    console.log("ejecutando cuando cortamos el texto dentro del input....");
})


busqueda.addEventListener('input', () => {
    console.log("ejecutando cuando haces cualquiera de las accionaes anteriores ecepto el blur....");
})
