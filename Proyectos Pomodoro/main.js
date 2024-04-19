


const inicio = document.querySelector(".btnInicio").disabled = true;

const contar = document.querySelector(".contador")
const fin = document.querySelector(".btnFinal").disabled = true;
const inputTarea = document.querySelector(".ing_tarea");

const mensaje = document.querySelector(".mensaje_err");


let segundos = 0;
let minutos = 0;

//Para mostrar los segundos como si fueran un reloj, puedes utilizar la función padStart() 
function formatTime(time) {
    return time.toString().padStart(2, "0");
  }
  

function iniciaEstudio(){
    let alarmaTempo;
    const alarma = document.createElement("audio")
    alarma.src = "/img/alarma.mp3";

    document.addEventListener("keyup", e =>{
        if (e.target.matches(".ing_tarea")) {
            document.querySelector(".btnInicio").disabled = false;

            if (inputTarea.value == null || inputTarea.value == "") {
                document.querySelector(".btnInicio").disabled = true;
            }
        }
    })

    let time;
    document.addEventListener("click", e => {
        if (e.target.matches(".btnInicio")) {

            if (inputTarea.value !== "" ) {

                const divConteiner = document.createElement("div");
                divConteiner.classList.add("contenedor_inp");

                const p = document.createElement("p");
                p.classList.add("texto_tarea")
                p.textContent = inputTarea.value

                const botonDel = document.createElement("button");
                botonDel.textContent = "❌";
                botonDel.classList.add("delet_Boton")

                const contenedorTareas = document.querySelector(".tareas_guardadas");
                contenedorTareas.appendChild(divConteiner)

                divConteiner.appendChild(p);
                divConteiner.appendChild(botonDel);


                document.querySelector(".ing_tarea").value = "";
                document.querySelector(".btnFinal").disabled = false;

            }
            time = setInterval(() => {

                let cont = ++segundos;
                let formattedSeconds = formatTime(segundos);
                let formattedMinutes = formatTime(minutos);
                contar.innerHTML = `<h4>${formattedMinutes}:${formattedSeconds}</h4>`;
               
                if (segundos >= 9) {
                    segundos = -1;
                    minutos++;
                    if (minutos === 2){
                        alarmaTempo = setTimeout(() => {
                            alarma.play()
                        }, 1000);
                       clearInterval(time) 
                       contar.innerHTML = `<h4>Fin de tu tiempo de estudio :)<h4/>`

                       minutos = 0;
                       segundos = 0;
                       return

                    }
                }
                renderTime();

            }, 1000);
            e.target.disabled = true;
        }
        if (e.target.matches(".btnFinal")){
            clearInterval(time) 
            contar.innerHTML = '';
            minutos = 0;
            segundos = 0;

        }
        if (e.target.matches(".btnParar")) {
            alarma.pause()

        }
        if (e.target.matches(".delet_Boton")) {
            const container = e.target.closest(".contenedor_inp"); // Obtener el contenedor padre del botón de eliminación
            container.remove(); // Eliminar el contenedor completo
            clearInterval(time) 
            contar.innerHTML = '';
            minutos = 0;
            segundos = 0;
            if (inputTarea.textContent !== "") {
                console.log("hola");
            }
        }
        if((e.target.matches(".ing_tarea") && contar.innerHTML !== "")){
            document.querySelector(".btnInicio").disabled = true;
            document.querySelector(".ing_tarea").disabled = true;
            mensaje.style.display = "block";
          setTimeout(() => {
            mensaje.style.display = "none";
          }, 4000);

        }else{
            document.querySelector(".ing_tarea").disabled = false;
            mensaje.style.display = "none";


        }
    })


}

document.addEventListener("DOMContentLoaded", iniciaEstudio);


