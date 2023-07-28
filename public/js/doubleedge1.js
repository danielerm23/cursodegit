//CREACION DE  VARIABLES

const botonanimales = document.getElementById('boton-animales')
const seccionReinicio = document.getElementById("reinicio")
const seccionAtaque = document.getElementById("seleccion-ataques")
const botonReinicio = document.getElementById("boton-reinicio")

const seccionAnimales = document.getElementById("seleccion-animales")

const animalUsuario=document.getElementById("animal-jugador")
const animalUsuario1=document.getElementById("animal-jugador1")
const animalEnemigo=document.getElementById("animal-rival")

const resultadoFinal=document.getElementById("span-combate")

const ataqueUsuario=document.getElementById("ataque-jugador")
const ataqueEnemigo=document.getElementById("ataque-rival")
const victoriasUsuario=document.getElementById("victorias-jugador")
const victoriasEnemigo=document.getElementById("victorias-rival")
const tarjetas=document.getElementById("opcionesTarjetas")
const tarjetaAtaques=document.getElementById("botones-jugador")
const spanCombate = document.getElementById("span-combate")
const combateRes = document.getElementById("combate")

const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let animalesEnemigos=[]
let jugadorId=null
let enemigoId=null
let guardarCombate
let animales = []
let opcionesAnimales
let opcionesAtaques 
let animalRival
let animalJugador
let ataqueJugador=[]
let ataqueRival=[]
let victoriasJugador=0
let victoriasRival=0
let animalJugadorspike
let animalJugadortom
let animalJugadorjerry
let pc
let personajeJugador=[]
let personajeEnemigo=[]
let enemigo=[]
let ataques
let ataquesE=[]
let ataquesEnemigo=[]
let botonesAtaques = []
let con=0
let nAtaques=0
let lienzo = mapa.getContext("2d")
let intervalo
let intervalo1
let mapaBackground=new Image
mapaBackground.src='./imgdouble/fondotomjerry3.jpg'

const anchoMaximoMapa=450
let anchoMapa=window.innerWidth-20
if(anchoMapa>anchoMaximoMapa){
    anchoMapa=anchoMaximoMapa-20
}

let alturaMapa=anchoMapa*300/450

mapa.width=anchoMapa
mapa.height=alturaMapa

class propiedades {
    constructor(nombre, foto, vida, fotoCara, id=null){
        this.id=id
        this.nombre = nombre
        this. foto = foto
        this.vida = vida
        this.ataques= []
        this.ancho = 70
        this.alto = 70
        this.x = aleatorio(mapa.width - this.ancho, 0)
        this.y = aleatorio(mapa.height - this.alto, 0)
        this.fotoCara=new Image()
        this.fotoCara.src=fotoCara
        this.animalX=0
        this.animalY=0
        
    }
    pintarAnimal(){
        lienzo.drawImage(
            this.fotoCara,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let spike = new propiedades ('spike', './imgdouble/spike.png', 5, './imgdouble/caraspike.png')
let tom = new propiedades ('tom', './imgdouble/tomtom.png', 5, './imgdouble/caratomtom.png')
let jerry = new propiedades ('jerry', './imgdouble/jerry.png', 5,'./imgdouble/carajerry.png')

const SPIKE_ATAQUES = [
    { nombre: '🔥', id:'boton-fuego'},
    { nombre: '🔥', id:'boton-fuego'},
    { nombre: '🔥', id:'boton-fuego'},
    { nombre: '💧', id:'boton-agua'},
    { nombre: '🌱', id:'boton-tierra'},
]
spike.ataques.push(...SPIKE_ATAQUES)

const TOM_ATAQUES=[
    { nombre: '💧', id:'boton-agua'},
    { nombre: '💧', id:'boton-agua'},
    { nombre: '💧', id:'boton-agua'},
    { nombre: '🔥', id:'boton-fuego'},
    { nombre: '🌱', id:'boton-tierra'},
]
tom.ataques.push(...TOM_ATAQUES)

const JERRY_ATAQUES=[
    { nombre: '🌱', id:'boton-tierra'},
    { nombre: '🌱', id:'boton-tierra'},
    { nombre: '🌱', id:'boton-tierra'},
    { nombre: '💧', id:'boton-agua'},
    { nombre: '🔥', id:'boton-fuego'},
]
jerry.ataques.push(...JERRY_ATAQUES)

animales.push(spike,tom,jerry)

//CARGA DE ANIMALES EN HTML

function iniciarJuego () {

    seccionReinicio.style.display='none'
    seccionAtaque.style.display='none'
    seccionVerMapa.style.display='none'

    animales.forEach ((propiedades) => {

        opcionesAnimales = ` 
            <input type="radio" name="animales" id=${propiedades.nombre} />
            <label class="tarjeta-animal" for=${propiedades.nombre}>
                <p>${propiedades.nombre}</p>
                <img src=${propiedades.foto} alt=${propiedades.nombre}>
            </label>
           `
        tarjetas.innerHTML += opcionesAnimales

        animalJugadorspike=document.getElementById("spike")
        animalJugadortom=document.getElementById("tom")
        animalJugadorjerry=document.getElementById("jerry")    
    })

    botonanimales.addEventListener ('click', seleccionAnimalJugador)
    botonReinicio.addEventListener('click', reiniciar)
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.1.193:8080/unirse")
        .then(function(res){
            if (res.ok){
                res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorId=respuesta
                })
            }
        })
}

function seleccionAnimalJugador () {
    
    if (animalJugadorspike.checked){

        animalJugador=animalJugadorspike.id
        personajeJugador=spike
        
    } else if (animalJugadortom.checked){

        animalJugador=animalJugadortom.id
        personajeJugador=tom
        
    } else if (animalJugadorjerry.checked){
        
        animalJugador=animalJugadorjerry.id
        personajeJugador=jerry
           
    } else {
        alert ("no has seleccionado nada")
        return
    }
    extraerAtaques (animalJugador)
    selecionarAnimal(animalJugador)
    animalUsuario.innerHTML=animalJugador
    seccionAnimales.style.display='none'
    seccionVerMapa.style.display='flex'
    iniciarMapa()
}

function selecionarAnimal(animalJugador){
    fetch (`http://192.168.1.193:8080/animal/${jugadorId}`, {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },    
        body: JSON.stringify({
            animal: animalJugador
        })
    })
}


//CANVAS
function iniciarMapa(){
    intervalo=setInterval(mapaCanvas, 50)
    
    window.addEventListener('keydown', moverTecla)
    window.addEventListener('keyup', detener)
}

function mapaCanvas(){

    personajeJugador.x=personajeJugador.x+personajeJugador.animalX
    personajeJugador.y=personajeJugador.y+personajeJugador.animalY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )   
    personajeJugador.pintarAnimal()

    enviarPosicion(personajeJugador.x, personajeJugador.y)
    animalesEnemigos.forEach(function(enemigo){
        enemigo.pintarAnimal()
        revisarColision(enemigo)
    })

}

function enviarPosicion(x, y){
    fetch(`http://192.168.1.193:8080/animal/${jugadorId}/posicion`, {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok) {
            res.json()
                .then(function({enemigos}) {
                    console.log(enemigos)
                    animalesEnemigos=enemigos.map(function(enemigo){
                        const animalNombre =enemigo.animal.nombre || ""
                        console.log(animalNombre)
                        let personajeRival=[]
                        if(animalNombre=="spike"){
                            personajeRival = new propiedades ('spike', './imgdouble/spike.png', 5, './imgdouble/caraspike.png', enemigo.id)
                        } else if (animalNombre=="tom"){
                            personajeRival = new propiedades ('tom', './imgdouble/tomtom.png', 5, './imgdouble/caratomtom.png', enemigo.id)
                        } else if (animalNombre=="jerry"){
                            personajeRival = new propiedades ('jerry', './imgdouble/jerry.png', 5, './imgdouble/carajerry.png', enemigo.id)
                        }
                        personajeRival.x=enemigo.x
                        personajeRival.y=enemigo.y

                        return personajeRival
                    })    
                })
        }
    })               
}
function moverDerecha(){
    if((personajeJugador.x+personajeJugador.ancho)<anchoMapa){
        personajeJugador.animalX= 5
    }
}
function moverIzquierda(){
    if(personajeJugador.x>0){
        personajeJugador.animalX= -5
    }
    
}
function moverArriba(){
    if(personajeJugador.y>0){
        personajeJugador.animalY= -5
    }
}
function moverAbajo(){
    if((personajeJugador.y+personajeJugador.alto)<alturaMapa){
        personajeJugador.animalY= 5
    }
}

function detener (){
    personajeJugador.animalX=0
    personajeJugador.animalY=0
}

function moverTecla(event){
    console.log(event.key)
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()    
            break
        default:
            break;
    }
}

function revisarColision(enemigo){
    const arribaJugador=personajeJugador.y
    const abajoJugador=personajeJugador.y+personajeJugador.alto
    const derechaJugador=personajeJugador.x+personajeJugador.ancho
    const izquierdaJugador=personajeJugador.x

    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y+enemigo.alto
    const derechaEnemigo=enemigo.x+enemigo.ancho
    const izquierdaEnemigo=enemigo.x
    if (enemigo.x==undefined || enemigo.y==undefined){
        return
    }
    if(
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return
    } else {
        alert("hay colision")
        detener()
        clearInterval(intervalo)
        enemigoId=enemigo.id
        seccionAtaque.style.display='flex'
        seccionVerMapa.style.display='none'
        personajeEnemigo=enemigo
        seleccionAnimalRival (personajeEnemigo)
    }
}

function extraerAtaques (animalJugador){
    for (let i = 0; i < animales.length; i++) {
        if(animalJugador===animales[i].nombre)
        ataques=animales[i].ataques
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach ((ataques)=>{
        opcionesAtaques=`<button class="boton-ataque BAtaque" id=${ataques.id}>${ataques.nombre}</button>
        `
        tarjetaAtaques.innerHTML+=opcionesAtaques
    })
    
    botonesAtaques=document.querySelectorAll(".BAtaque")
}
function seleccionAnimalRival () {
    animalRival=personajeEnemigo.nombre
    ataquesE= personajeEnemigo.ataques
    animalEnemigo.innerHTML=animalRival 
    animalUsuario1.innerHTML=animalJugador 
    const fotoJugador=document.getElementById('foto-jugador')
    const fotoRival=document.getElementById('foto-rival')  
    fotoJugador.innerHTML= `<label class='tarjeta-animales'><img src=${personajeJugador.foto}></label>`
    fotoRival.innerHTML=`<label class='tarjeta-animales'><img src=${personajeEnemigo.foto}></label>`
    secuenciaAtaque ()
}
function secuenciaAtaque () {
    botonesAtaques.forEach ((boton) => {
        boton.addEventListener('click', (e)=> {
            if (e.target.textContent=== '🔥'){
                ataqueJugador.push ('fuego')
                boton.style.background='#112f58'
                boton.disabled=true
            } else if (e.target.textContent=== '🌱'){
                ataqueJugador.push ('tierra')
                boton.style.background='#112f58'
                boton.disabled=true
            } else if (e.target.textContent=== '💧'){
                ataqueJugador.push ('agua')
                boton.style.background='#112f58' 
                boton.disabled=true
            }
            if(ataqueJugador.length==5){
                enviarAtaques()
            }
        })     
    })
}

function enviarAtaques(){
    fetch(`http://192.168.1.193:8080/animal/${jugadorId}/ataques`, {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify ({
            ataques:ataqueJugador

        })
    })
    intervalo1 = setInterval(obtenerAtaques,50)
}

function obtenerAtaques(){
    fetch(`http://192.168.1.193:8080/animal/${enemigoId}/ataques`)
        .then (function (res){
            if (res.ok){
                res.json()
                    .then (function ({ataques}){
                        if (ataques.length==5){
                            ataquesEnemigo=ataques
                            console.log(ataquesEnemigo)
                            combate()
                        }
                    })
            }
        })
}

function funcionAtaqueRival () {

    aleatorio ((ataquesE.length -1), 0)

    if (ataquesE[pc].nombre=='💧'){
        ataqueRival.push('agua')
    } else if (ataquesE[pc].nombre=='🔥'){
        ataqueRival.push('fuego')
    } else if (ataquesE[pc].nombre=='🌱'){
        ataqueRival.push('tierra')
    }
    console.log (ataqueJugador)
    console.log (ataqueRival)
    nAtaques++

    if (nAtaques==ataques.length ){
        combate()
    }
   
}

function combate (){

    if(ataqueJugador==undefined || ataquesEnemigo==undefined){
        return
    }
    clearInterval(intervalo1)
    
    if (ataqueJugador[con]==ataquesEnemigo[con]){
        resultado = "EMPATE"
        
    } else if ((ataqueJugador[con]=="fuego" && ataquesEnemigo[con] =="tierra") || (ataqueJugador[con]=="agua" && ataquesEnemigo[con]=="fuego") || (ataqueJugador[con]=="tierra" && ataquesEnemigo[con]=="agua")){
        resultado = "GANASTE"
        victoriasJugador++
    } else {
        resultado = "PERDISTE"
        victoriasRival++
    } 
    resumen()
}   

function resumen (){
    //ataque jugador

    let pataqueUsuario=document.createElement('p')
    pataqueUsuario.innerHTML=ataqueJugador[con]

    ataqueUsuario.appendChild(pataqueUsuario)

    //ataque enemigo

    let pataqueEnemigo=document.createElement('p')
    pataqueEnemigo.innerHTML=ataquesEnemigo[con]

    ataqueEnemigo.appendChild(pataqueEnemigo)

    //resultado combate

    guardarCombate=document.createElement('p')
    guardarCombate.innerHTML=resultado
    combateRes.appendChild(guardarCombate)

    while (con<4){
        con++
        combate ()
    }

    if (victoriasJugador > victoriasRival){
        resultado = "GANASTE"
        resultadoFinal.innerHTML=resultado + "🎉"
    } else if (victoriasJugador < victoriasRival){
        resultado = "PERDISTE"
        resultadoFinal.innerHTML=resultado + "😢"
    } else if (victoriasJugador==victoriasRival){
        resultado = 'EMPATE'
        resultadoFinal.innerHTML=resultado
    }
    victoriasUsuario.innerHTML=victoriasJugador
    victoriasEnemigo.innerHTML=victoriasRival
    seccionReinicio.style.display='flex'
}

function reiniciar () {
    location.reload()
}

function aleatorio (max,min) {

    pc = Math.floor (Math.random ()*(max-min+1)+min)
    return pc
}

window.addEventListener ('load', iniciarJuego) 