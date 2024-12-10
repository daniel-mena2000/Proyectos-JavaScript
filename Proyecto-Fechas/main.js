
//aqui guardaremos toda la informacion de nuestros eventos
let events = [];
let arr = []; //cargar informacion para que despues la asignemos a eventos

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsConteiner = document.querySelector("#eventsConteiner");

const json = load();
try {

    arr = JSON.parse(json);

} catch (error) {
    arr = [];
}
events = arr? [...arr] : [];
renderEvents();


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    agregarEvento();
})

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();
    agregarEvento();
})


function agregarEvento(){
//Si esta vacio que retorne para que no haga nada
    if (eventName.value === '' || eventDate.value === '') {
        return;
    }
//Recordar que no queremos que se ingresen fechas pasadas para eso es este if
    if (dateDiff(eventDate.value) < 0) {
        return;
    }
    
    const newEvent = {
//Esta línea genera un identificador único alfanumérico utilizando el método random generara un numero aleatoria entre 1 y 100
//El argumento 36 se utiliza para indicar que el número se debe convertir en base 36, lo que significa que se utilizarán los dígitos del 0 al 9 y las letras de la "a" a la "z" para representar el número
//El efecto de aplicar .slice(3) es eliminar los primeros tres caracteres de la cadena generada en el paso anterior.
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
    };
//Agregamos el objetos a nuestro arreglo "events"
//unshift: Agregue nuevos elementos a una matriz
    events.unshift(newEvent)

    save(JSON.stringify(events));
//Al final cuando se halla echo el submit que deje nuestro input vacio
    eventName.value = "";

    renderEvents();
}

//Creando funcion dateDif();
//Recordar que en la funcion "agregar evento" el "dateDif" apunta a nuestro input date
function dateDiff(dato){
//Recordar que newDate() nos da la fecha actual
    const date1 = new Date(dato);
    const date2 = new Date();
//Diferencia de fechas
//
    const difference =  date1.getTime() - date2.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

//Funcion para renderizar nuestros eventos
function renderEvents(){
//Recordar que dentro de event ya tenemos nuestro objeto y "item" ya representa cada uno de estos
    const eventsHTML = events.map(item => {
        return `
            <div class="events">
                <div class="days">
                    <span class="days-number">${dateDiff(item.date)}</span> 
                    <span class="days-text">dias</span> 
                </div> 

                <div class="event-name">${item.name}</div> 
                <div class="event-date">${item.date}</div> 
                <div class="actions">
                    <button class="bDelete" data-id="${item.id}">Eliminar</button>
                </div> 
            </div>        
        `;
    });
//Recordar que "eventsHTML" sigue siendo un arreglo para eso es el "join"  para que nos una todos los htmls
    eventsConteiner.innerHTML = eventsHTML.join("");

    document.querySelectorAll(".bDelete").forEach(item => {
        item.addEventListener("click", (e) => {
//Lo primero al hacer click es obtener el id de ese boton
            const id = item.getAttribute("data-id");
//Ahora si lo eliminamos
            events = events.filter((item)=> item.id !== id);

            save(JSON.stringify(events));
//Después de eliminar un evento, debes llamar a la función renderEvents() para actualizar la visualización de los eventos en el contenedor. Agrega esta línea después de filtrar los eventos:        
            renderEvents();
        })
    })
}


function save(data){
//Hay que darle un valor a lo que vallamos a guardar en este caso "items" y el valor "data"
    localStorage.setItem("items", data)
}
//En esta funcion haremos lo contrario es decir regresaremos la informacion
function load(){
    return localStorage.getItem("items")
}

