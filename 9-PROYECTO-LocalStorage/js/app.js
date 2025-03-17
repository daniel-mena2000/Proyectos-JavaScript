const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const container = document.querySelector('.container');

let misTweets = [];

eventListeners()
function eventListeners(params) {
    formulario.addEventListener('submit',  agregarTweet)

//Obtener el localStorage
    document.addEventListener('DOMContentLoaded', () => {
//Cuando el documento este listo vamos a obtener del local storage en este caso 'losTweets', no olvidar volver a convertirlo
//Ahora el array de misTweets sera igual a lo que tengamos en localStorage
//Recordar que generalHTML tiene un foreach y si el localStorage NO tiene nada y esta vacio se marca como null, y foreach no recorre nulls, es por eso que se decimos que si no hay nada en localStorage le asige un array vacio [].
        misTweets = JSON.parse(localStorage.getItem('losTweets')) || [];
        generarHTML()

    })
}

function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

//Si el usuario quiere agregar sin que el campo este lleno mandamos un mensaje
    if (tweet.length == 0) {
        const p = document.createElement('p');
        p.textContent = 'El campo no puede ir vacio';
        p.classList.add('error')
        container.appendChild(p)

        setTimeout(() => {
            container.removeChild(p)
        }, 3000);
        return
    }
//Para poder identificar mejor el tweet le agregamos un id
    const objetTweet = {
        id: Date.now(),
        texto: tweet
    }
//Iremos agregando los tweets del usuario al array, no olvidar hacer una copia para que vaya adjuntando los elementos en vez de irlos sobreescribiendo
misTweets = [...misTweets, objetTweet];
generarHTML();

//Reiniciamos el formulario y asi cuando agreguemos algo, el textArea se limpiara
formulario.reset()
}

function generarHTML() {
//Como por cada iteracion se van agregando y juntando los elementos anteriores con los nuevos es importante limpiar primeo lo anterior y ya luego generar nuevamente la lista
    limpiarHTML()
    misTweets.forEach(item => {

        //BTN eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.textContent = 'X'
        //funcion de eliminar
        btnEliminar.addEventListener('click', () => borrarTweet(item.id))

        const li = document.createElement('li');
        li.textContent = item.texto;
        li.appendChild(btnEliminar)

        listaTweets.appendChild(li);
    })
    miLocalStorage()
}

function miLocalStorage() {
//Ya con el array lleno ahora asi podemos pasarlo a localStorage
    localStorage.setItem('losTweets', JSON.stringify(misTweets))
}

function borrarTweet(id) {
    misTweets = misTweets.filter(item => item.id !== id);
    generarHTML()
}
function limpiarHTML() {
    listaTweets.innerHTML = '';
}
