



const btnmenu = document.querySelector(".btn-menu") ;
const opc = document.getElementById("opciones")
const resultadoOperaciones = document.getElementById("resultado-operaciones")
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2")

const sumar = document.querySelector(".btn-sumar")
const resta = document.querySelector(".btn-restar")
const multi = document.querySelector(".btn-multi")
const divi = document.querySelector(".btn-divi")
const pote = document.querySelector(".btn-pote")
const raizC = document.querySelector(".btn-raiz")
const raizCubica = document.querySelector(".btn-raizCubica")





class Calculadora{
    constructor(){
      
    }
    suma(num1,num2){


        if (num1 === '' || num2 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"
        }else{
        let resultadoSuma = parseInt(num1) + parseInt(num2)
        resultadoOperaciones.style.color = "green"

        resultadoOperaciones.innerText = `El resultado de la suma es: ${resultadoSuma}`
        }
    }
    restar(num1,num2){

        if (num1 === '' || num2 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"
        }
            else{
                let resultadoResta = parseInt(num1) - parseInt(num2);
                resultadoOperaciones.style.color = "green"

                resultadoOperaciones.innerText = `El resultado de la resta es: ${resultadoResta}`
            }
       
    }
   
    multiplicar(num1,num2){
        if (num1 === '' || num2 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"}
        else{
            let resultadoMulti = parseInt(num1) * parseInt(num2);
            resultadoOperaciones.style.color = "green"

        resultadoOperaciones.innerText = `El resultado de la multiplicacion es: ${resultadoMulti}`
        }
        
    }

    dividir(num1,num2){
        if (num1 === '' || num2 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"
        }
            else{
                let resultadoDiv = parseInt(num1) / parseInt(num2);
                resultadoOperaciones.style.color = "green"

                resultadoOperaciones.innerText = `El resultado de la divicion es: ${resultadoDiv}`
            }
      
    }

    potencia(num1,num2){
        if (num1 === '' || num2 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"
        }
            else{
                let resultadoPote = parseInt(num1) ** parseInt(num2);
                resultadoOperaciones.style.color = "green"

                resultadoOperaciones.innerText = `El resultado de la potencia es: ${resultadoPote}`
            }
       
    }

    raizCuadrada(num1){
        if (num1 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"
        }
        else{
            let resultadoRaizC = Math.sqrt(num1)
            resultadoOperaciones.style.color = "green"

        resultadoOperaciones.innerText = `El resultado de la Raiz Cuadrada es: ${resultadoRaizC}`
        }
        
    }

    raizCubica(num1){
        if (num1 === '') {
            resultadoOperaciones.innerText = "Escribe un digito valido";
            resultadoOperaciones.style.color = "red"
        }else{
            let resultadoRaizCubica = Math.cbrt(num1)
            resultadoOperaciones.style.color = "green"

            resultadoOperaciones.innerText = `El resultado de la Raiz Cubica es: ${resultadoRaizCubica}`
        }
       
    }



    
}

const miCalculadora = new Calculadora();

sumar.addEventListener("click", e =>{
        miCalculadora.suma(num1.value,num2.value)
})

resta.addEventListener("click", e =>{
    
        miCalculadora.restar(num1.value,num2.value)
})

multi.addEventListener("click", e =>{
    miCalculadora.multiplicar(num1.value,num2.value)
})

divi.addEventListener("click", e =>{
    miCalculadora.dividir(num1.value,num2.value)
})

pote.addEventListener("click", e =>{
    miCalculadora.potencia(num1.value,num2.value)
})

raizC.addEventListener("click", e =>{
    miCalculadora.raizCuadrada(num1.value)
})

raizCubica.addEventListener("click", e =>{
    miCalculadora.raizCubica(num1.value)
})



function menu(){

    if (opc.style.display === "none") {
        opc.style.display = "block";
        btnmenu.innerText = 'Ocultar Menú'
        
    }else {
            opc.style.display = "none";
            btnmenu.innerText = "Mostrar Menú"

        }
}



btnmenu.addEventListener("click", e => {
  menu()

})