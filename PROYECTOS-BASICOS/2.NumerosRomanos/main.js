const miInput = document.querySelector(".inputRom");
const miButton = document.querySelector(".btn-ver");
const miResultado = document.querySelector(".resultado")

miButton.addEventListener("click", () => {
    function enteroRomano() {
        let result = "";
        miResultado.classList.add("color")

        const caracteresRomanos = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
        const valoresDecimales = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
        for (let index = 0; index < valoresDecimales.length; index++) {


            while (miInput.value >= valoresDecimales[index]) {
                result += caracteresRomanos[index];

                miInput.value -= valoresDecimales[index]
            }
        }
        miResultado.innerText =  "Tu numero Romando es: " + result;
    }

    enteroRomano()
})
