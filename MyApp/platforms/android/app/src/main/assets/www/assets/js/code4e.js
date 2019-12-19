function reinicio(){
    location.href="menu.html";
    
}

var jugador1= localStorage.getItem("apodo1");
var jugador2= localStorage.getItem("apodo2");


//JUEGO
var score4l=[0,0];
var player= 0; // 0 = X | 1 = O
var jugadorActual;
var altura = 6;
var columnas;
var turn = true;
var h3Turn = $("#turn");

var turnsInARow = 0;
var tamanoFicha = 50;
var ganador;
var lugaresLibres;

function vaciarTablero() {
    $(".casillero").html("");
    jugadorActual = 0;
    columnas = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    lugaresLibres = columnas.length * altura;
    ganador = null;
    $("#jugadoruno").html(jugadores[0].apodo);
    $("#jugadordos").html(jugadores[1].apodo);
    $("mensaje").addClass("hide");
    turnoColor();
    $("#msgBox").empty();
    $("#msgBox").addClass("none");
    $("#msgBox").removeClass("sureAbout");
    $("#winner").empty();
    $("#winner").addClass("none");

}


function actualizarPuntajes(){
    var puntajeJ1 = parseInt(localStorage.getItem("puntajeGlobal1"));
    var puntajeJ2 = parseInt(localStorage.getItem("puntajeGlobal2"));
    
    localStorage.setItem("puntajeGlobal1",puntajeJ1 + score4l[0]);
    localStorage.setItem("puntajeGlobal2",puntajeJ2 + score4l[1]);
    
    location.href ="menu.html";
}


function areYouSure()
{
    $("#msgBox").removeClass("none");
     $("#msgBox").append('<div><h3>¿Seguro que quieren reiniciar?</h3><button onclick="vaciarTablero()">Sí, deseamos reiniciar</button><button onclick="msgBoxDone2()">No, queremos seguir jugando</button></div>');
    $("#msgBox").addClass("sureAbout");
}



function msgBoxDone2(num)
{
    $("#msgBox").addClass("none");
}

function ponerFicha(col) {

    if (columnas[col].length < altura && ganador === null) {
//fichas
        columnas[col].push(jugadorActual);
        var casilleroCompletado = columnas[col].length - 1;
        lugaresLibres--;
        ganador = chequearGanador();
        cambiarTurno();
        return casilleroCompletado;
    } else {
        return null;
    }
}

function turnoColor() {
    if (jugadorActual == 0) {
        $("#jugadoruno").addClass("turnoactivado");
        $("#jugadordos").removeClass("turnoactivado");
    }
    else {
        $("#jugadordos").addClass("turnoactivado");
        $("#jugadoruno").removeClass("turnoactivado");
    }
}

function obtenerClaseFicha(jugadorActual) {
    if (jugadorActual == 0) {
        return "ficha-j0"
    } else {
        return "ficha-j1"
    }
}

function cambiarTurno() {
    turn = !turn;
    if (turn) {
        h3Turn.text("Turno de: " + jugador1);
    } else {
        h3Turn.text("Turno de: " + jugador2);
    }

    if (jugadorActual === 0) {
        jugadorActual = 1;
        turnoColor();
    } else {
        jugadorActual = 0;
        turnoColor();
    }
}


function chequearGanador() {

    // VERIFICAR VERTICALES
    var textoColumnas = [];
    var ganador = null;
    for (var i = 0; i < columnas.length; i++) {
        // CONVIERTO EN UN STRING (son para ser identificadas, luego las paso a num)
        var textoColumna = columnas[i].join("");
        textoColumnas.push(textoColumna);
    }

    // CUENTO LA CANTIDAD DE COLUMNAS
    cantCols = columnas.length;
    // CUENTO LA CANTIDAD DE FILAS
    cantFilas = altura;


    //DIAGONALES DE ARRIBA
    for (var i = 0; i < cantCols; i++) {
        // POSICION DE ARRANQUE PARA CADA VUELTA
        var col = i,
            fila = 0;
        textoColumnas.push(obtenerDiagonal(col, fila, "ascendente"));
    }

    //DIAGONALES IZQUIERDAS
    for (var i = 0; i < cantFilas; i++) {
        var col = 0,
            fila = i;
        textoColumnas.push(obtenerDiagonal(col, fila, "ascendente"));
    }

    // DIAGONALES DE ABAJO
    for (var i = 0; i < cantCols; i++) {
        // POSICION DE ARRANQUE PARA CADA VUELTA
        var col = i,
            fila = cantFilas - 1;
        textoColumnas.push(obtenerDiagonal(col, fila, "descendente"));
    }

    // DIAGONALES IZQUIERDAS
    for (var i = 0; i < cantFilas; i++) {
        var col = 0,
            fila = i;
        textoColumnas.push(obtenerDiagonal(col, fila, "descendente"));
    }

    for (var i = 0; i < cantFilas; i++) {
        var col = 0,
            fila = i;
        textoColumnas.push(obtenerDiagonal(col, fila, "horizontal"));
    }

    var ganador = chequearStringFichas(textoColumnas);
 
    // SI HAY GANADOR TERMINO
    
    if (ganador != null) {
        console.log(ganador);


        if(player == 0)
        {          
   
            score4l [0]= score4l [0] + 100;
             setTimeout (function(){

                $("#container").append('<div id="winner" class="none"></div>');
                $("#winner").removeClass("none");
                
             },3000);
               
            
           

            console.log( jugador1 + ": "+ score4l [0]);
            $("#winner").append('<div><p>¡' + jugador1 + ' gana!</p><button onclick="javascript:$(\'#winner\').remove()">Ver el tablero</button><button onclick="vaciarTablero()">Jugar de nuevo</button></div>');
        }
        else
        {
            score4l [1]= score4l [1] + 100;

            console.log( jugador2 +  ": " + score4l [1]);
            $("#winner").append('<div><p>¡' + jugador2 + ' gana!</p><button onclick="javascript:$(\'#winner\').remove()">Ver el tablero</button><button onclick="vaciarTablero()">Jugar de nuevo</button></div>');
        }
        $("#handPlayer").remove();

        return ganador;
    }
    // Empate (podria ir alert)
    return null;
    
}



// EN BASE A UN ARRAY DE TEXTOS DE FICHAS BUSCO EL PATRO GANADOR
function chequearStringFichas(stringsDeFichas) {
    var regexpGanador = /(\d)\1{3}/;
    for (var i = 0; i < stringsDeFichas.length; i++) {
        var textoDiagonal = stringsDeFichas[i];
        // VERDADERO SI ENCONTRO ALGO Y SI NO FALSE
        var resultadoMatch = textoDiagonal.match(regexpGanador);
        if (resultadoMatch) {
            // PASO DE TEXTO A NUMERO Y TOMO EL PRIMER CARACTER PARA SABER EL JUGADOR QUE GANO Y LO DEVUELVO
            // "1" => 1             
            return parseInt(resultadoMatch[0][0]);
        }
    }
    return null;
}

//ARMADO DE LA DIAGONAL
function obtenerDiagonal(col, fila, direccion) {
    // LE AGREGA LO QUE VA ENCONTRANDO 
    var diagonal = "";
    // IF QUE SE REPITE HASTA DONDE YO QUIERA
    // SI ESTOY DENTRO DEL TABLERO
    while (col < cantCols && fila < cantFilas && col >= 0) {
        // SI HAY UNA FICHA PUESTSA
        if (columnas[col][fila] !== undefined) {
            // AGREGO LA FICHA LA STRING
            diagonal += columnas[col][fila];
        } else {
            // AGREGO UN X AL STRING
            diagonal += "X";
        }
        // ME MUEVO AL PROXIMO LUGAR EN DIAGONAL
        switch (direccion) {
            case "ascendente":
                col++;
                fila++; 
                break;
            case "descendente":
                col++;
                fila--; 
                break;
            case "horizontal":
                col++;
                break;
        }

    }
    return diagonal;
}

//DOM

jQuery(function ($) {

    // CLICK EN COLUMNA
    $(".col").click(function () {

        var claseFicha = obtenerClaseFicha(jugadorActual);

        var numeroColumna = $(this).data("columna");

        console.log("click en columna", numeroColumna);

        // las paso a numero para ser identificacles como tal
        numeroColumna = parseInt(numeroColumna);

        var casilleroCompletado = ponerFicha(numeroColumna);
        console.log("casilleroCompletado", casilleroCompletado);

        // para que no se pisen
        if (casilleroCompletado != null) {

            // CREO LA FICHA
            var $ficha = $("<div class='ficha'>");

            $ficha.addClass(claseFicha);

            // BUSCO EL ULTIMO CASILLERO
            // AGARRO LA COLUMNA CLICKEADA, BUSCA TODOS LOS CASILLEROS Y CON EQ ME QUEDO CON EL QUE ETSA EN LA POSICION CORRECTA
            var $casillero = $(this).find(".casillero").eq(altura - 1 - casilleroCompletado);

            // AGREGO FICHA EN LA COLUMNA
            $casillero.append($ficha);

            //Animacion (la cual esta disponible en versiones anteriores de JQ)

            $ficha.css("marginTop", -350).animate({
                "marginTop": 0
            }, {
                duration: 250,
                complete: function () {
                    if (ganador !== null) {
                        // cuando hay GANADOR
                        jugadores[ganador].puntaje += 100;
                        $("#mensaje").removeClass("hide");
                        $("#mensaje-p").html("Ganador " + jugadores[ganador].apodo);
                        guardarJugadores();
                    } else if (lugaresLibres === 0) {
                        // cuando EMPATE
                        jugadores[0].puntaje += 0;
                        jugadores[1].puntaje += 0;
                        $("#mensaje").removeClass("hide");
                        $("#mensaje-p").html("Empate");
                        guardarJugadores();
                    }
                }
            });


        }
    });
})

vaciarTablero();