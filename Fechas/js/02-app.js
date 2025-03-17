

//LIBRERIA MOMENT.JS
//Hay que importar el CDN de la libreria en el html


//Con format tu puedes crear tu formato de fecha
console.log(moment().format('MMM')); //mar
console.log(moment().format('MMM Do')); //mar. 14
console.log(moment().format('MMM Do YYYY')); //mar. 14 2025
console.log(moment().format('MMM Do YYYY h')); //mar. 14 2025 5
console.log(moment().format('MMM Do YYYY h:mm')); //mar. 14 2025 5:23
console.log(moment().format('MMM Do YYYY h:mm:ss')); //mar. 14 2025 5:23:39
console.log(moment().format('MMM Do YYYY h:mm:ss a')); //mar. 14 2025 5:23:39 pm


console.log(moment().format('LLLL')); //viernes, 14 de marzo de 2025 17:23
