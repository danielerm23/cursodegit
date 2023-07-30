let frio=document.getElementById("frio")
frio.addEventListener('click', funcionRespuesta)

function funcionRespuesta(){
    alert ("soplandote")
    
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