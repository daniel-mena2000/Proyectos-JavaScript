

const namee = document.querySelector("#name");
const btn = document.querySelector("#btn-asis");
const imprimirInfo = document.querySelector("#info");

const nameAgre = document.querySelector("#nameAgre")
const asistenciasAgre = document.querySelector("#asis");
const btnAgre = document.querySelector("#btnAgre");

const listaAlumnos = [
    {nombre:"Laura" , asistencias:20},
    {nombre:"Jose" , asistencias:25},
    {nombre:"Maria" , asistencias:10},
    {nombre:"Eduardo" , asistencias:15},
    {nombre:"Karina" , asistencias:22},
    {nombre:"Leo" , asistencias:3}
]

console.log(listaAlumnos);

const crearElementoMensaje = (mensaje, color) =>{
    const p = document.createElement("p");
    p.style.color = color
    p.innerText = mensaje
    imprimirInfo.appendChild(p)
}

const filtroDeAlumnos = (alumno) =>{

  for (const iterator of listaAlumnos) {
    if (alumno === iterator.nombre) {
        if ( iterator.asistencias >= 18) {

            crearElementoMensaje(`El alumno ${iterator.nombre} tiene: ${iterator.asistencias} asistencias en el mes `, "green")
        }
        else if(iterator.asistencias < 18){
            crearElementoMensaje(`El alumno ${iterator.nombre} tiene: ${iterator.asistencias} asistencias en el mes REPROBADO`, "red")

        }else{
            return;
        }
    }
  }}

btn.addEventListener("click", ()=>{
    filtroDeAlumnos(namee.value)
    namee.value = ""
})


const agregarAlumno = (nombreAlumnoAgre, asistenciasAgre) =>{
    if (nombreAlumnoAgre == '' || asistenciasAgre == '') {
        crearElementoMensaje(`Agrega los datos requeridos`,"red");


    }else{
    let alumnoExistente = false;

    for (const iteratorAgre of listaAlumnos) {
        const soloNombre = iteratorAgre.nombre
        if (nombreAlumnoAgre === soloNombre) {
            alumnoExistente = true;
            crearElementoMensaje(`EL alumno ${iteratorAgre.nombre} ya existe`,"blue");
            break;
        }
    }
    if(!alumnoExistente){
        const nuevosAlumnos = {nombre:"",asistencias:0}
        nuevosAlumnos.nombre = nombreAlumnoAgre;
        nuevosAlumnos.asistencias = asistenciasAgre;
        listaAlumnos.push(nuevosAlumnos)
        crearElementoMensaje(`El alumno: ${nombreAlumnoAgre} con ${asistenciasAgre} asistencias se agrego con exito a la lista`,"purple")
    }
}
}

btnAgre.addEventListener("click", ()=>{
    agregarAlumno(nameAgre.value, parseInt(asistenciasAgre.value));
    nameAgre.value = "";
    asistenciasAgre.value = ""
})
