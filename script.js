
//================ C O N S T A N T E S      D E     H T M L ================

const buscador = document.getElementById('buscador');
const botonBuscar = document.getElementById('boton-buscar');
const resultado = document.getElementById('p-resultado');
const recuadro = document.getElementById('contenedor-busqueda');
const relojCifra = document.getElementById('reloj-cifra');
const botonStart = document.getElementById('start');
const iluminacion = document.getElementById('div-iluminacion');
const score = document.getElementById('puntaje-actual-cifra');
// const scoreRecord = document.getElementById('puntaje-record-cifra');
const vidas = document.getElementById('contenedor-vidas');
const advertenciaUnaVida = document.getElementById('mensaje-advertencia-vida');
const divGameOver = document.getElementById('contenedor-nuevo-juego');
const botonJugarOtraVez = document.getElementById('boton-jugar-otravez');
const spanScoreFinal = document.getElementById('puntaje-juego-acabado-cifra');
const divObjetos = document.getElementById('contenedor-objeto');
const reloj = document.getElementById('reloj');
const presentacion = document.getElementById('contenedor-presentacion');
const todoJuego = document.getElementById('todo');
const contenedorHistoria = document.getElementById('contenedor-historia');
const dialogoParrafo = document.getElementById('p-dialogo');
const cuadroAceptarNegar = document.getElementById('cuadro-aceptacion-negacion');
const botonAceptarReto = document.getElementById('p-aceptar-reto');
const botonNegarReto = document.getElementById('p-negar-reto');
const contenedorTutorial = document.getElementById('contenedor-tutorial');
const corazones = document.getElementsByClassName('icon-vida');
const divGanaste = document.getElementById('contenedor-ganaste');
const pEmpezarJuego = document.getElementById('p-empezar-juego');

//================ V A R I A B L E S ================

let juegoActivo = true;
let tiempo = 30;
let valorScore = 0;
const valorBusqueda = buscador.value;
let numeroDeVida = 3;
let valorRecord;
let switchEjecutado = false;
let switchEjecutado2 = false;
let switchEjecutado3 = false;
let dialogoGanarBoleano = false;
let booleanoFinal = false;
let dialogoPosicion = 0;
let dialogoPosicionAceptacion = 0;
let dialogoPosicionNegacion = 0;
let dialogoPosicionGanar = 0;
let clickNegarReto = false;
let clickAceptarReto = false;
let contador;
let idArray;
let whileBuscador = false;
// let recordDeStorage = localStorage.getItem('scoreRecordStorage');
// scoreRecord.innerHTML = recordDeStorage;



//=============== L I S T A     D E     O B J E T O S ===============

let numeroDeObjetos = [];
const objetos = [
    {
        respuesta:'microondas',
        id:'objeto-01',
        imagen:'img/microondas.jpg'
    },
    {
        respuesta:'celular',
        id:'objeto-02',
        imagen:'img/celular.jpg'
    },
    {
        respuesta:'arbol',
        id:'objeto-03',
        imagen:'img/arbol.jpg'
    },
    {
        respuesta:'cuchillo' ,
        id:'objeto-04',
        imagen:'img/cuchillo.jpg'
    },
    {
        respuesta:'espejo',
        id:'objeto-05',
        imagen:'img/espejo.jpg'
    },
    {
        respuesta:'lampara',
        id:'objeto-06',
        imagen:'img/lampara.jpg'
    },
    {
        respuesta:'mesa',
        id:'objeto-07',
        imagen:'img/mesa.jpg'
    },
    {
        respuesta:'pantalla',
        id:'objeto-08',
        imagen:'img/pantalla.jpg'
    },
    {
        respuesta:'peine',
        id:'objeto-09',
        imagen:'img/peine.jpg'
    },
    {
        respuesta:'ventilador',
        id:'objeto-10',
        imagen:'img/ventilador.jpg'
    },
];

const dialogos = [
    '...','Hola!','ahh... perdon...','no recuerdo tu nombre','de hecho','no recuerdo muchas palabras','creo que','caerme de cabeza aquel dia','me afecto un poco...','puedes ayudarme a recordar','el nombre de algunos objetos?'
]
const dialogosAceptacion = [
    'Genial!!','gracias por ayudarme','solo nesesito recordar','10 objetos que olvide como se llaman','bien, empezemos;)'
];
const dialogosNegacion = [
    'Ohh...','bueno disculpa por la molestia','ire a buscar a alguien que me ayude'
]
const dialogoGanar = [
    'vaya!','gracias por recordarme lo olvidado','creo que mi memoria esta volviendo','pero aun no recuerdo tu nombre...','bueno, muchas gracias por ayudarme','cuidate!, nos vemos luego...creo','por ultimo...','puedes seguir a mi amigo SUBNORMALYNX en youtube?','te lo agradeceria mucho...bye'
]
//================ F U N C I O N E S ================

function quitaEstilos() {
    recuadro.style.animationName = '';
    iluminacion.style.animationName = '';
    recuadro.style.animationDuration = '';
    iluminacion.style.animationDuration = '';
    vidas.style.animation = ''; 

}
function poneAnimacionReloj() {
    reloj.style.animation = 'rotate-scale-up 0.4s linear both';
}
function quitaAnimacionReloj() {
    reloj.style.animation = '';
}
function poneEstilos() {
    recuadro.style.animationName = 'cambioDeColor';
    iluminacion.style.animationName = 'cambioDeColorShadow';
    recuadro.style.animationDuration = '0.4s';
    iluminacion.style.animationDuration = '0.4s';
    setTimeout(quitaEstilos,500);
}
function poneEstilosSecundario() {
    recuadro.style.animation = 'vibrate2 0.2s linear';
    iluminacion.style.animation = 'vibrate2 0.2s linear';
    setTimeout(quitaEstilos,190);
}
function poneEstilosCorrecto() {
    recuadro.style.animationName = 'cambioDeColorCorrecto';
    iluminacion.style.animationName = 'cambioDeColorCorrectoShadow';
    recuadro.style.animationDuration = '1s';
    iluminacion.style.animationDuration = '1s';
    setTimeout(quitaEstilos,1000);
}
function poneEstilosIncorrecto() {
    recuadro.style.animationName = 'cambioDeColorIncorrecto';
    iluminacion.style.animationName = 'cambioDeColorIncorrectoShadow';
    recuadro.style.animationDuration = '1s';
    iluminacion.style.animationDuration = '1s';
    vidas.style.animation = 'vibrate 0.7s linear both'; 
    setTimeout(quitaEstilos,1000);
}
function poneAnimacionTyping() {
   dialogoParrafo.style.animation = 'typing 2s steps(300, end)';
}
function quitaAnimacionTyping() {
   dialogoParrafo.style.animation = '';
}
function quitaCorazon() {
    let primerCorazon = vidas.firstElementChild;
    vidas.removeChild(primerCorazon);
    numeroDeVida--;
    console.log(corazones);
    comprobacionDePartida();
}
function quitaCorazones() {
    vidas.innerHTML = '';
    numeroDeVida = 0;
    comprobacionDePartida();
}
function agregarCorazonesNuevos() {
    let corazonesNuevos = `
    <i class="bi bi-suit-heart-fill icon-vida" id="vida-1"></i>
    <i class="bi bi-suit-heart-fill icon-vida" id="vida-2"></i>
    <i class="bi bi-suit-heart-fill icon-vida" id="vida-3"></i>
    `;
    vidas.innerHTML = corazonesNuevos;
}
function comprobacionDePartida() {
    if(numeroDeVida == 0){
        aparicionDeGameOver();
        // if (valorRecord >= recordDeStorage) {
        //     localStorage.setItem('scoreRecordStorage',valorRecord);
            
        // }
        clearInterval(contador);
        valorScore = 0;
        score.innerHTML = valorScore;
        tiempo = 30;
        relojCifra.innerHTML = tiempo;
        numeroDeVida = 3;
        switchEjecutado3 = true;
        pEmpezarJuego.style.display = 'block';
        numeroDeObjetos.splice(0, numeroDeObjetos.length);
    }
}
function aparicionDeGameOver() {
    divGameOver.style = 'display: flex';
    spanScoreFinal.innerHTML = valorScore;
    // valorRecord = valorScore;
    botonJugarOtraVez.addEventListener('click',() => {
        agregarCorazonesNuevos();       
        buscador.value = '';
        divGameOver.style.animation = 'desaparecerLentamente 1s linear';
        setTimeout(() => {
            divGameOver.style.animation = '';
            divGameOver.style.display = 'none';
            
        },1000)
    })
}
function aparicionDeObjetos() {
    idArray = Math.round(Math.random() * (9 - 0));
    cambiaNumero:
    while (numeroDeObjetos.includes(idArray)) {
        idArray = Math.round(Math.random() * (9 - 0));
        if (idArray > 9) {
            break cambiaNumero;
        }
        if (numeroDeObjetos.length == 10) {
            break cambiaNumero;
        }
    }
    divObjetos.innerHTML = `<img src="${objetos[idArray].imagen}" alt="" class="imagen-objeto" id='${objetos[idArray].id}' data-respuesta='${objetos[idArray].respuesta}'>`;
    console.log(numeroDeObjetos);
}
function removerObjetos() {
    let objetoARemover = divObjetos.firstElementChild;
    divObjetos.removeChild(objetoARemover);
}

//================ E V E N T O S ================

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'Enter':
            let valor = buscador.value;
            valor = buscador.value.toUpperCase();
            
            objetoRespuesta = document.querySelector('[data-respuesta]');
            respuestaCorrecta = objetoRespuesta.getAttribute('data-respuesta').toUpperCase();

            if (valor == respuestaCorrecta) {
                buscador.setAttribute('placeholder',`${valor} es correcto`);
                buscador.classList.add('placeholder-correcto');
                valorScore++;
                score.innerHTML = valorScore;
                poneEstilosCorrecto();
                numeroDeObjetos.push(idArray);

                if (valorScore == 10) {
                    // booleanoFinal = true;
                    clearInterval(contador);
                    divGanaste.style.display = 'block';
                    divGanaste.style.animation = 'parpadeoGanaste 0.2s infinite'
                    todoJuego.style.display = 'none';
                    todoJuego.style.animation = '';
                    dialogoParrafo.innerHTML = '...';
                    contenedorHistoria.style.display = 'flex';
                    setTimeout(() => {
                        divGanaste.style.animation = 'desaparecerLentamente 2s linear';
                        setTimeout(() => {
                            divGanaste.style.display = 'none';
                            divGanaste.style.animation = ''
                            dialogoGanarBoleano = true;
                        },1800);
                    },1000)
                }
        
                    
            }
            else{
                buscador.setAttribute('placeholder',`${valor} es incorrecto`);
                buscador.classList.add('placeholder-incorrecto');
                quitaCorazon();
                poneEstilosIncorrecto();
            }
            buscador.value = '';
            setTimeout(() => {
                removerObjetos();
                aparicionDeObjetos();
                buscador.setAttribute('placeholder','');
                buscador.classList.remove('placeholder-correcto');
                
            },1000);
            
            break;
            
    
        default:
            break;
    }
    switch (e.key) {
        case ' ':
            if(!switchEjecutado){
                switchEjecutado = true;
                presentacion.style.animation = 'desaparecerLentamente 2s linear';
                setTimeout(() => {
                    presentacion.style.display = 'none';
                    // buscador.blur();
                    // todoJuego.style.display = 'flex';
                },2000);
            }
            if (dialogoPosicion < 11) {
                poneAnimacionTyping();
                dialogoParrafo.innerHTML = dialogos[dialogoPosicion];
                dialogoPosicion++;
                setTimeout(() => {
                    quitaAnimacionTyping();
                },500);
                if (dialogoPosicion == 11) {
                    setTimeout(() => {
                        cuadroAceptarNegar.style.display = 'flex';
                    },1000);
                } 
            }
            if (clickAceptarReto == true) {
                if (dialogoPosicionAceptacion < 5) {
                    poneAnimacionTyping();
                    dialogoParrafo.innerHTML = dialogosAceptacion[dialogoPosicionAceptacion];
                    dialogoPosicionAceptacion++;
                    setTimeout(() => {
                        quitaAnimacionTyping();
                    },500);
                    if (dialogoPosicionAceptacion == 5) {
                        setTimeout(() => {
                            contenedorHistoria.style.animation = 'desaparecerLentamente 2s linear';
                            setTimeout(() => {
                                contenedorTutorial.style.display = 'flex';
                                contenedorHistoria.style.display = 'none';
                                contenedorHistoria.style.animation = '';
                                switchEjecutado2 = true;
                               
                            },1800);
                        },1000);
                    }
                }    
            }
            if (switchEjecutado3 == true) {
                switchEjecutado3 = false;
                pEmpezarJuego.style.display = 'none';
                buscador.focus();
                contador = setInterval(() => {
                    tiempo--;
                    relojCifra.innerHTML = tiempo;
                    poneAnimacionReloj();
                    setTimeout(() => {
                        quitaAnimacionReloj();
                    },700);
                    if (tiempo == 0) {
                        clearInterval(contador);
                        quitaCorazones();
                    }
                },1000);
            }



            if (clickNegarReto == true) {
                if (dialogoPosicionNegacion < 3) {
                    poneAnimacionTyping();
                    dialogoParrafo.innerHTML = dialogosNegacion[dialogoPosicionNegacion];
                    dialogoPosicionNegacion++;
                    setTimeout(() => {
                        quitaAnimacionTyping();
                    },500);
                    if (dialogoPosicionNegacion == 3) {
                        setTimeout(() => {
                            contenedorHistoria.style.animation = 'desaparecerLentamente 2s linear';
                            setTimeout(() => {
                                contenedorHistoria.style.display = 'none';
                                location.reload();
                            },1800);
                        },1000);
                    }
                }
            }
            if (switchEjecutado2 == true) {
                contenedorTutorial.style.animation = 'desaparecerLentamente 2s linear';
                todoJuego.style.display = 'flex';
                setTimeout(() => {
                    contenedorTutorial.style.display = 'none';
                    contenedorTutorial.style.animation = '';
                    switchEjecutado2 == false;
                    switchEjecutado3 = true;
                },1800);
            }
            if (dialogoGanarBoleano == true) {
                if (dialogoPosicionGanar < 9) {
                    poneAnimacionTyping();
                    dialogoParrafo.innerHTML = dialogoGanar[dialogoPosicionGanar];
                    dialogoPosicionGanar++;
                    setTimeout(() => {
                        quitaAnimacionTyping();
                    },500);
                    if (dialogoPosicionGanar == 9) {
                        setTimeout(() => {
                            contenedorHistoria.style.animation = 'desaparecerLentamente 2s linear';
                            todoJuego.style.display = 'none'
                            setTimeout(() => {
                                contenedorHistoria.style.display = 'none';
                            },1800);
                            location.reload();
                        },1000);
                    }
                }
            }


            break;
    
        default:
            break;
    }
});
buscador.addEventListener('focus',() => {
    poneEstilos();
});
botonAceptarReto.addEventListener('click',() => {
    poneAnimacionTyping();
    dialogoParrafo.innerHTML = dialogosAceptacion[dialogoPosicionAceptacion];
    dialogoPosicionAceptacion++;
    setTimeout(() => {
        quitaAnimacionTyping();
        clickAceptarReto = true;
    },500);
    cuadroAceptarNegar.style.display = 'none';

})
botonNegarReto.addEventListener('click',() => {
    poneAnimacionTyping();
    dialogoParrafo.innerHTML = dialogosNegacion[dialogoPosicionNegacion];
    dialogoPosicionNegacion++;
    setTimeout(() => {
        quitaAnimacionTyping();
        clickNegarReto = true;
    },500);
    cuadroAceptarNegar.style.display = 'none';
})

aparicionDeObjetos();
var objetoRespuesta = document.querySelector('[data-respuesta]');
let respuestaCorrecta = objetoRespuesta.getAttribute('data-respuesta').toUpperCase();

//=============== L O C A L  S T O R A G E ===============
// if (booleanoFinal == true) {
//     todoJuego.style.display = 'none';
//     todoJuego.style.animation = '';
// }
