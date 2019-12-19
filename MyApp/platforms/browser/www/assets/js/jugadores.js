//Variable global para guardar los datos de los jugadores.
var jugadores;
//Funcion para leer del localStorage los datos de los jugadores, 
//reestablecerlos en la variable global 
//y cargarlos en pantalla

// VERIFICAR LOCAL STORAGE

function inicializarJugadores() {

    //Leo localStorage
    var textoJugadores = localStorage.getItem("jugadores");

    // VERIFICAR LOCAL STORAGE

    //Si tiene inforacion
    if (textoJugadores) {
        //restablezco la informacion existente (paso de texto a objeto)
        jugadores = JSON.parse(textoJugadores);
    }
    else {
        //Si el localStorage estaba vacio, creo jugadores nuevos vacios
        jugadores = [{
            "nombre": null,
            "apodo": null,
            "puntaje": 0,
            "fotoperfil": null,
            "perfilcompleto": 0,
            "juegosganados": 0,
            "tateti": 0,
            "generala": 0,
            "4enlinea": 0,
            "primeravez": 0
        },
        {
            "nombre": null,
            "apodo": null,
            "puntaje": 0,
            "fotoperfil": null,
            "perfilcompleto": 0,
            "juegosganados": 0,
            "tateti": 0,
            "generala": 0,
            "4enlinea": 0
        }];
    }

    // <p id="nombre0">NOMBRE0</p>
    // <p id="apodo0">Apodo0</p>
    // <p id="puntaje0">Puntaje0</p>

    // <p id="nombre1">Nombre1</p>
    // <p id="apodo1">Apodo1</p>
    // <p id="puntaje1">Puntaje1</p>

    //Busco en la pantalla el elemento que muestra el nombre del jugador 0
    var pNombreJugador0 = document.getElementById("nombre0");
    //Le cargo el nombre del jugador 0
    if (pNombreJugador0) {
        if (jugadores[0].nombre != null) {
            pNombreJugador0.innerHTML = jugadores[0].nombre;
        }
        else {
            pNombreJugador0.innerHTML = "NOMBRE";
        }
    }

    var pNombreJugador1 = document.getElementById("nombre1");
    if (pNombreJugador1) {
        if (jugadores[1].nombre != null) {
            pNombreJugador1.innerHTML = jugadores[1].nombre;
        }
        else {
            pNombreJugador1.innerHTML = "NOMBRE";
        }
    }

    var pApodoJugador0 = document.getElementById("apodo0");
    if (pApodoJugador0) {
        pApodoJugador0.innerHTML = jugadores[0].apodo + ":";
    }

    var pApodoJugador1 = document.getElementById("apodo1");
    if (pApodoJugador1) {
        pApodoJugador1.innerHTML = jugadores[1].apodo + ":";
    }

    var pApodoJugador0users = document.getElementById("apodo0users");
    if (pApodoJugador0users) {
        if (jugadores[0].apodo != null) {
            pApodoJugador0users.innerHTML = jugadores[0].apodo;
        }
        else {
            pApodoJugador0users.innerHTML = "APODO";
        }
    }

    var pApodoJugador1users = document.getElementById("apodo1users");
    if (pApodoJugador1users) {
        if (jugadores[1].apodo != null) {
            pApodoJugador1users.innerHTML = jugadores[1].apodo;
        }
        else {
            pApodoJugador1users.innerHTML = "APODO";
        }
    }
    
    var fotoperfil0 = document.getElementById("fotoperfil0");
    //si existe el image para mostrar la foto perfil y ademas el usuario tiene una foto peril
    if (fotoperfil0 && jugadores[0].fotoperfil) {
        fotoperfil0.src = jugadores[0].fotoperfil;
    }

    var fotoperfil1 = document.getElementById("fotoperfil1");
    //si existe el image para mostrar la foto perfil y ademas el usuario tiene una foto peril
    if (fotoperfil1 && jugadores[1].fotoperfil) {
        fotoperfil1.src = jugadores[1].fotoperfil;
    }

    var pPuntajeJugador0 = document.getElementById("puntaje0");
    if (pPuntajeJugador0) {
        pPuntajeJugador0.innerHTML = jugadores[0].puntaje + " <i class='fas fa-copyright'>";
    }

    var pPuntajeJugador1 = document.getElementById("puntaje1");
    if (pPuntajeJugador1) {
        pPuntajeJugador1.innerHTML = jugadores[1].puntaje + " <i class='fas fa-copyright'>";
    }
}

// Guardar los datos de "jugadores" y actualizar pantalla
function guardarJugadores() {
    //Convierto los datos de los jugadores a texto
    var textoJugadores = JSON.stringify(jugadores);

    //Los grabo el en el localStorage
    localStorage.setItem("jugadores", textoJugadores);

    //Recargo datos (pantalla)
    inicializarJugadores();
}

function ponerContadorEnCero() {
    jugadores[0].hola = 0;
    guardarJugadores();
}
inicializarJugadores();
setTimeout('ponerContadorEnCero()', 1000);