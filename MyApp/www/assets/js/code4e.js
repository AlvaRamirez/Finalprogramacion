function reinicio(){
    location.href="menu.html";
    
}

//jugadores[0].primeravez = 2;

//COSAS DEL JUEGO
var jugadorActual;
var altura = 6;
var columnas;

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
}

function ponerFicha(col) {

    // SI ME QUEDA ESPACIO
    if (columnas[col].length < altura && ganador === null) {
        // PONGO LA FICHA
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
        // CONVIERTO EN UN STRING
        var textoColumna = columnas[i].join("");
        textoColumnas.push(textoColumna);
    }

    // CUENTO LA CANTIDAD DE COLUMNAS
    cantCols = columnas.length;
    // CUENTO LA CANTIDAD DE FILAS
    cantFilas = altura;


    // RECORRO LAS COLUMNAS, DIAGONALES QUE PARTEN EN UN CASILLERO DE ARRIBA
    for (var i = 0; i < cantCols; i++) {
        // POSICION DE ARRANQUE PARA CADA VUELTA
        var col = i,
            fila = 0;
        textoColumnas.push(obtenerDiagonal(col, fila, "ascendente"));
    }

    // RECORRO LAS COLUMNAS, DIAGONALES QUE PARTEN EN UN CASILLERO DEL COSTADO IZQUIERDO
    for (var i = 0; i < cantFilas; i++) {
        var col = 0,
            fila = i;
        textoColumnas.push(obtenerDiagonal(col, fila, "ascendente"));
    }

    // RECORRO LAS COLUMNAS, DIAGONALES QUE PARTEN EN UN CASILLERO DE ABAJO
    for (var i = 0; i < cantCols; i++) {
        // POSICION DE ARRANQUE PARA CADA VUELTA
        var col = i,
            fila = cantFilas - 1;
        textoColumnas.push(obtenerDiagonal(col, fila, "descendente"));
    }

    // RECORRO LAS COLUMNAS, DIAGONALES QUE PARTEN EN UN CASILLERO DEL COSTADO IZQUIERDO
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
        return ganador;
    }
    // SI LLEGUE HASTA ACA ES PORUQUE NO HAY GANADOR
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

// FUNCION QUE DA EL STRING ARMADO DE LA DIAGONAL
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
                fila++; //0-0 1-1 2-2 ETC 
                break;
            case "descendente":
                col++;
                fila--; //0-6 1-5 2-4 3-3 4-2.. ETC 
                break;
            case "horizontal":
                col++;
                break;
        }

    }
    return diagonal;
}

//COSAS DEL DOM

jQuery(function ($) {

    // CLICK EN COLUMNA
    $(".col").click(function () {

        var claseFicha = obtenerClaseFicha(jugadorActual);

        // TOMO EL ATRIBUTO DATA-COLUMNA DE LA COLUMNA CLICKEADA
        var numeroColumna = $(this).data("columna");

        console.log("click en columna", numeroColumna);

        // CONVIERTO EL TEXTO A NUMERO
        numeroColumna = parseInt(numeroColumna);

        // PONGO LA FICHA EN EL CASILLERO QUE CORRESPONDE
        var casilleroCompletado = ponerFicha(numeroColumna);
        console.log("casilleroCompletado", casilleroCompletado);

        // SI CASILLERO HUBO LUGAR EN EL TABLERO
        if (casilleroCompletado != null) {

            // CREO LA FICHA
            var $ficha = $("<div class='ficha'>");

            $ficha.addClass(claseFicha);

            // BUSCO EL ULTIMO CASILLERO
            // AGARRO LA COLUMNA CLICKEADA, BUSCA TODOS LOS CASILLEROS Y CON EQ ME QUEDO CON EL QUE ETSA EN LA POSICION CORRECTA
            var $casillero = $(this).find(".casillero").eq(altura - 1 - casilleroCompletado);

            // AGREGO FICHA EN LA COLUMNA
            $casillero.append($ficha);

            // ANIMO LA CAIDA DE LA FICHA

            $ficha.css("marginTop", -350).animate({
                "marginTop": 0
            }, {
                duration: 250,
                complete: function () {
                    if (ganador !== null) {
                        // FIN POR GANADOR
                        jugadores[ganador].puntaje += 60;
                        $("#mensaje").removeClass("hide");
                        $("#mensaje-p").html("Ganador " + jugadores[ganador].apodo);
                        guardarJugadores();
                    } else if (lugaresLibres === 0) {
                        // FIN POR EMPATE
                        jugadores[0].puntaje += 30;
                        jugadores[1].puntaje += 30;
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