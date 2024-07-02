//Necesitan estar acá arriba porque se declaran al inicio, la función les da los valores
let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;

//Declaramos el arreglo/lista
let listaNumeroSorteados = [];

//Para asignar texto a las etiquetas html
function asignarTextoElemento(elemento, texto) {

    let elementoHTML = document.querySelector(elemento);//es un objeto
    elementoHTML.innerHTML = texto;
    return; //es una buena practica
}

//Realiza la lógica para los intentos de adivinar el número
function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    //Verifica que el número que ingresa el usuario coincida con el generado aleatoriamente 
    if (numeroUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
        //removemos el atributo del botón nuevo juego
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        //El usuario no acertó el número
        if (numeroSecreto > numeroUsuario) {
            asignarTextoElemento('p', 'El número es mayor');
        }else{
            asignarTextoElemento('p', 'El número secreto es menor')
        }
        intentos++;
        limpiarCaja();
    }
    return;
    
}

//limpia el input
function limpiarCaja() {
    //cuando usamos querySelector con un id se debe colocar #
    document.querySelector('#valorUsuario').value = '';
    return;
}

//Genera el número a adivinar de forma aleatoria 
function generarNumeroSecreto() {

    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);

    //Si ya sorteamos todos los números
    if (listaNumeroSorteados.length === numeroMaximo) {
    //Esta es la condición de salida para solucionar el problema de recursividad
    
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    }else{
        //Si el número generado está incluido en la lista, includes sirve para verfificar si en
        //la lista está incluido el número
        if (listaNumeroSorteados.includes(numeroGenerado)) {

            //recursividad = la función se llama a sí misma
            return generarNumeroSecreto();
            //Si el número que genera existe en la lista, la función se llama a si misma
            //como se llama a sí misma vuelve a generar un número aleatorio 
            //Y vuelve a comprobar que no esté en la lista, si no está no se llama a sí misma
            //Debemos tener una condición de salida para que la recursividad se salga y no se cree un ciclo infinito

        }else {
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Genera las condiciones cuando el juego inicia
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);

    //Genera el nuevo aleatorio nuevamente
    numeroSecreto = generarNumeroSecreto();

    //inicializa el número de intentos
    intentos = 1;
}

//Función para reiniciar el juego
function reiniciarJuego() {
    //limpiamos la caja primero
    limpiarCaja();

    //Inicializar las condiciones inciales
    condicionesIniciales();

    //Inhabilitar el botón de juego nuevo
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();