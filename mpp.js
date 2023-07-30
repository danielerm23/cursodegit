let frio=document.getElementById("frio")
let fuego=document.getElementById("fuego")
frio.addEventListener('click', funcionEnfriar)
fuego.addEventListener('click', funcionCalentar)

function funcionEnfriar(){
    alert ("soplandote")
    encuesta
}
function funcionCalentar(){
    alert ("te estoy calentando 🥵")
    encuesta
}
function encuesta(){
    let con=0
    while (con==0){
        let respuesta=prompt ("te gustó ? 😏 si o no?")
        if (respuesta=="si"){
            alert("que rico que te haya gustado 😏")
            con=1
        } else if (respuesta == "no"){
            alert("ni modo que me importara gonorrea pirob@")
            con=1
        } 
    }
}
function funcionCalentar(){
    alert ("te estoy calentando 🥵")
}