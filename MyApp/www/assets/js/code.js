
function registrar(){
    location.href="formulario.html";
}


function go(){
    if(localStorage.getItem("usuario1")==null){
        console.log("usuario1:null");
        $("#formulario").css("display","block");
        localStorage.clear();
        
    }
    else{
        //localStorage.clear();
        console.log("usuario1 y usuario2: distinto de null");
        document.getElementById("usuario1").value=localStorage.getItem("usuario1");
        document.getElementById("apodo1").value=localStorage.getItem("apodo1");
        document.getElementById("foto1").value=localStorage.getItem("foto1");

        document.getElementById("usuario2").value=localStorage.getItem("usuario2");
        document.getElementById("apodo2").value=localStorage.getItem("apodo2");
        document.getElementById("foto2").value=localStorage.getItem("foto2");
        
        $("#formulario").css("display","block");
        $("#formulario2").css("display","none");
    }
}

function validaryguardar(jugador){

    var usuario;
    var apodo;
    var foto;
    var puntaje;

    console.log("validaryguardar: " + jugador);

    if (jugador == 1){

        if(document.getElementById("usuario1").value == ""){
            alert ("Complete el Usuario");
        }

        else if (document.getElementById("apodo1").value == ""){
            alert ("Complete el Apodo");
        }

       else if (document.getElementById("foto1").src.includes("assets/img/plataforma/user.png")) {
            alert ("Proceda a sacarse la foto");}

        else{

            console.log("completa los datos y devuelve true");

            usuario=document.getElementById("usuario1").value;
            apodo=document.getElementById("apodo1").value;
            foto=document.getElementById("foto1").src;
            puntaje=localStorage.getItem("puntajeglobal1");

            localStorage.setItem("usuario1", usuario);
            localStorage.setItem("apodo1", apodo);
            localStorage.setItem("foto1", foto);
            if(puntaje==null){

                localStorage.setItem("puntajeglobal1", 0);
                console.log("puntajeglobal1: " + puntaje);
            }
            
            $("#formulario").css("display","none");
            $("#formulario2").css("display","block");
        }
    }

    else{

        if(document.getElementById("usuario2").value == ""){
            alert ("Complete el Usuario");
        }

        else if (document.getElementById("apodo2").value == ""){
            alert ("Complete el Apodo");
        }

        else if (document.getElementById("foto2").src.includes("assets/img/plataforma/user.png")) {
            alert ("Proceda a sacarse la foto");}

        else{

            console.log("completa los datos y devuelve true");

            usuario=document.getElementById("usuario2").value;
            apodo=document.getElementById("apodo2").value;
            foto=document.getElementById("foto2").src;
            puntaje=localStorage.getItem("puntajeglobal2");

            localStorage.setItem("usuario2", usuario);
            localStorage.setItem("apodo2", apodo);
            localStorage.setItem("foto2", foto);
           
           
           
            /*if(puntaje==null){

                localStorage.setItem("puntajeglobal2", 0);
                console.log("puntajeglobal2: " + puntaje);
            }*/
            location.href="menu.html";
        }   

    }

}


