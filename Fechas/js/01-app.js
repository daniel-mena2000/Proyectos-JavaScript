//Las fechas JS la toma como objetos
const diaHoy = new Date();
console.log(diaHoy);

//newDate en otro formato
const nueva2 = new Date().toLocaleString();
console.log(nueva2);


//Metodos de las fechas
//Estos metodos empiezan con get ya que los estamos obteniendo, pero hay metodos que empiezan con "set" para poder modificar valores de fechas

añoActual = diaHoy.getFullYear();
console.log(añoActual);

//Los meses empiezan en 0 enero = 0
mesActual = diaHoy.getMonth();
console.log(mesActual);

obtenerMinutosActuales = diaHoy.getMinutes();
console.log(obtenerMinutosActuales);


obtenerHoraActual = diaHoy.getHours();
console.log(obtenerHoraActual);

//getTime nos trae los segundos que han pasado desde el 1 de enero de 1970 hasta hoy
obtenerSegundos = diaHoy.getTime();
console.log(obtenerSegundos);


//SET
añoQueYoQuiera = diaHoy.setFullYear(2010);
console.log(añoQueYoQuiera);
