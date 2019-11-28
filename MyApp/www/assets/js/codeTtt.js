function reinicio(){
    location.href="menu.html";
}

var jugador1= localStorage.getItem("apodo1");
var jugador2= localStorage.getItem("apodo2");




var count = 1;
var player= 0; // 0 = X | 1 = O
var tableGame = [ [-1, -2, -3], [-4, -5, -6], [-7, -8, -9]];
//var winPl1 = 0;
//var winPl2 = 0;
var scorettt=[0,0];
var flagGaming = true; //Si alguien gana, que no se pueda hacer más clicks en el tablero pasandolo a FALSE
var winnerCells = []; //Cuando un jugador gana, sus celdas ganadoras se colorean
var savingCells = [];

var turn = true;
var h3Turn = $("#turn");


function actualizarPuntajes(){

    location.href="menu.html";



    localStorage.setItem("puntajeGlobal1",scorettt[0]);
    localStorage.setItem("puntajeGlobal2",scorettt[1]);
  
    scorettt[0]=JSON.stringify(scorettt[0]);
    scorettt[1]=JSON.stringify(scorettt[1]);

  //  puntajeGlobal1=JSON.stringify(puntajeGlobal1);
    //puntajeGlobal2=JSON.stringify(puntajeGlobal2);
    
    
}

function loadLocalStorage()
{
    if(localStorage.length > 0)
    {

        scorettt[0]= parseInt(localStorage.getItem('player1PointsTtt'));
        scorettt[1]= parseInt(localStorage.getItem('player2PointsTtt'));
        //turn
        player= parseInt(localStorage.getItem('playerTurnTtt'));

        if(localStorage.getItem('gameClean') != 'true')
        {
            flagGaming= localStorage.getItem('clickTtt');
            if(flagGaming == 'true')
            {
                flagGaming = true; // true no es lo mismo que 'true', por eso. Ahora que hice que false y true sean booleans y no textos, funciono
            }
            else if(flagGaming == 'false')
            {
                flagGaming = false;
                winnerCells = localStorage.getItem('cellsWinTtt');
                winnerCells = winnerCells.split(',');
            }
        }
        //table
        savingCells = localStorage.getItem('matrixPos');
        if(savingCells !== "undefined" && savingCells !== null)
        {
            savingCells = savingCells.split(',');
            reloadTableData();
        }
    }
    buildGame();
}

function reloadTableData()
{
    var counting=0;
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
        {
            tableGame[i][j] = parseInt(savingCells[counting]);
            counting++;
        }
    }
}



//Generar el cartel "¿Estás seguro?" con un parámetro para saber si es del reiniciar o salir
function areYouSure()
{
    $("#msgBox").removeClass("none");
     $("#msgBox").append('<div><h3>¿Seguro que quieren reiniciar?</h3><button onclick="msgBoxDone1()">Sí, deseamos reiniciar</button><button onclick="msgBoxDone2()">No, queremos seguir jugando</button></div>');
    $("#msgBox").addClass("sureAbout");
}

//Cerrar el cartel con un parámetro según si es para reiniciar o salir del juego
function msgBoxDone1(num)
{
    $("#msgBox").empty();
    $("#msgBox").addClass("none");
    $("#msgBox").removeClass("sureAbout");

    restartGame();
    localStorage.setItem('gameClean', 'true');
    localStorage.setItem('clickTtt', 'true');
    localStorage.removeItem('matrixPos');
    saveLocalPoints();
}

function msgBoxDone2(num)
{
    $("#msgBox").addClass("none");


   // restartGame();
}

function buildButtons()
{
    $("#game").append("<div id='btns'></div>");
    $("#btns").append("<button id='reiniciottt'onclick='areYouSure(1)'>Reiniciar</button>");
    $("#btns").append("<button id='test'onclick='restartPoints()'>Reiniciar puntos</button>")
}

function buildInfo(num)
{
    if(num == 0)
    {
        //$("#game").append("<div id='info'></div>");
    }
    var classHand = 1;
    if(player == 1)
    {
        classHand = 2;
    }
    $("#info").append("<div id='players'><img id='handPlayer' class='pointing"+classHand+"' src='assets/img/imgTtt/hand.png' alt='hand'><p id='point1'></p><p id='point2'></p></div>");
    if(flagGaming == false)
    {
        $("#handPlayer").remove();
    }
}



function buildGame()
{
    $("#game").empty();
    //Create <table>
    $("#game").append("<div id='ttt'></div>");
    buildTable();
    buildInfo(0);
    buildButtons();
    showPoints();

    
}

function buildTable()
{
    $("#ttt").append("<table></table>");
    for(var i=0; i < 3; i++) //rows
    {
        //En cada fila generada, recibe 3 columnas generadas en la función "generateCol"
        $("#ttt table").append("<tr>"+generateCol(i)+"</tr>");
    }
    //Cuando se termina de construir la tabla, vuelvo el contador 1 para cuando se necesite reconstruir la tabla, las celdas sigan siendo del 1 a 9
    count=1;
    if(flagGaming == false)
    {
        paintCellsWin();
        noOneIsClickable();
    }
}

function generateCol(row)
{
    var txt ="";
    for(var j = 0; j < 3; j++)
    {

        if(tableGame[j][row] == 0)
        {
            txt += "<td id='col" +count+"' class='dontClick'><img src='assets/img/imgTtt/x.svg' alt=' X'></td>";
        }
        else if(tableGame[j][row] == 1)
        {
            txt += "<td id='col" +count+"' class='dontClick'><img src='assets/img/imgTtt/o.svg' alt=' O'></td>";    

        }
        else
        {
            txt += "<td id='col" +count+"' class='pointingActive' onclick='putSymbol("+count+")'></td>";    
        }
        count++;
    }
    return txt;
}

function restartGame(num)
{
    if(num==1)
    {
        localStorage.setItem('clickTtt', 'true');
        localStorage.setItem('gameClean', 'true');
        localStorage.removeItem('matrixPos');
    }
    localStorage.removeItem('cellsWinTtt');
    flagGaming = true;  
    $("#ttt").empty();
    player = 0;
    tableGame = [ [-1, -2, -3], [-4, -5, -6], [-7, -8, -9]];
    buildTable();
    $("#info").empty();
    buildInfo(1);
    showPoints();
    $("#winner").remove();
}

function putSymbol(num)
{
    if(flagGaming)
    {
        saveLocalPoints();
        localStorage.setItem('gameClean', 'false');
        var col = $('#col'+num);
        if(col.is(':empty') ) { 
            col.removeClass('pointingActive');
            col.addClass('dontClick');
            //If its empty, put X or O
            //Put the number in the dimensional array matrix
            if(num == 1 || num == 4 || num == 7)
            {
                //col 0
                var result = parseInt(num / 3);
                tableGame[0][result] = player;
            }
            else if(num == 2 || num == 5 || num == 8)
            {
                //col 1
                var result = parseInt(num / 3);
                tableGame[1][result] = player;
            }
            else
            {
                //col 2
                var result = (parseInt(num / 3))-1;
                tableGame[2][result] = player;
    
            }
            
            //Append PNG
            if(player == 0)
            {
                
                col.append('<img src="assets/img/imgTtt/x.svg" alt="mark X">');
            }
            else
            {
                col.append('<img src="assets/img/imgTtt/o.svg" alt="mark O">');
            }
            localStorage.setItem('matrixPos', tableGame);
            validateWin();
        }
    }
    
}

function validateWin()
{
    var winner = false;

    //Vertical
    if(tableGame[0][0] == tableGame[0][1] && tableGame[0][1] == tableGame[0][2])
    {
        winner = true;
        winnerCells = [1, 4, 7];
    }

    if(tableGame[1][0] == tableGame[1][1] && tableGame[1][1] == tableGame[1][2])
    {
        winner = true;
        winnerCells = [2, 5, 8];
    }

    if(tableGame[2][0] == tableGame[2][1] && tableGame[2][1] == tableGame[2][2])
    {
        winner = true;
        winnerCells = [3, 6, 9];
    }

    //Horizontal
    if(tableGame[0][0] == tableGame[1][0] && tableGame[1][0] == tableGame[2][0])
    {
        winner = true;
        winnerCells = [1, 2, 3];
    }

    if(tableGame[0][1] == tableGame[1][1] && tableGame[1][1] == tableGame[2][1] )
    {
        winner = true;
        winnerCells = [4, 5, 6];
    }
    
    if(tableGame[0][2] == tableGame[1][2] && tableGame[1][2] == tableGame[2][2])
    {
        winner = true;
        winnerCells = [7, 8, 9];
    }

    //Diagonal
    if(tableGame[0][0] == tableGame[2][2] && tableGame[0][0] == tableGame[1][1])
    {
        winner = true;
        winnerCells = [1, 5, 9];
    }

    if(tableGame[2][0] == tableGame[0][2] && tableGame[1][1] == tableGame[2][0])
    {
        winner = true;
        winnerCells = [3, 5, 7];
    }

    $("#game").append('<div id="winner"></div>');

    if(winner== false)
    {
        if(tieGame())
        {
            $("#winner").append('<div><p>¡Empate!</p><button onclick="restartGame(1)">Jugar de nuevo</button></div>');
            $("#winner div").css("background-color='black'");
        }
        else
        {
            changePlayer();
            $("#winner").remove();
            localStorage.setItem('playerTurnTtt',player);
        }

    }
    else
    {
        flagGaming = false;
        let imgPlayerWin;
        //Player winner! *claps claps*
        paintCellsWin();
        if(player == 0)
        {
            //LOCALSTORAGE: Podríamos meter aquí los localStorage de victorias de jugadores
            scorettt [0]= scorettt [0] + 50;
            //scorettt[0]=JSON.stringify(scorettt[0]);
            //loadLocalStorage.setItem();
            console.log( jugador1 + ": "+ scorettt [0]);
            $("#winner").append('<div><p>¡' + jugador1 + ' gana!</p><button onclick="javascript:$(\'#winner\').remove()">Ver el tablero</button><button onclick="restartGame(1)">Jugar de nuevo</button></div>');
        }
        else
        {
            scorettt [1]= scorettt [1] + 50;
            //scorettt[1]=JSON.stringify(scorettt[1]);
            console.log( jugador2 +  ": " + scorettt [1]);
            changePlayer();
            $("#winner").append('<div><p>¡' + jugador2 + ' gana!</p><button onclick="javascript:$(\'#winner\').remove()">Ver el tablero</button><button onclick="restartGame(1)">Jugar de nuevo</button></div>');
        }
        $("#handPlayer").remove();
        noOneIsClickable();
        saveLocalPoints();
        localStorage.setItem('cellsWinTtt', winnerCells);
        showPoints();
        //$("#winner").append('<div><p>¡Jugador ' + (player + 1) + ' gana!</p><button onclick="javascript:$(\'#winner\').remove()">Ver el tablero</button><button onclick="restartGame(1)">Jugar de nuevo</button></div>');
        $("#winner div").css("background-image",imgPlayerWin);

    }
    //No one wins
    localStorage.setItem('clickTtt',flagGaming);
}


function showPoints()
{
    
    $("#point1").empty();
    $("#point2").empty();
    $("#point1").append("Jugador Uno: <span>" + scorettt[0]+"</span>");
    $("#point2").append("Jugador Dos: <span>" + scorettt[1]+"</span>");
}

function restartPoints()
{
    scorettt[0] = 0;
    scorettt[1] = 0;
    saveLocalPoints();
    showPoints();
}

function changePlayer()
{
    if(player == 0)
    {
       $("#handPlayer").removeClass('pointing1');
        $("#handPlayer").addClass('pointing2');
        player++;
    }
    else
    {
        player--;
        $("#handPlayer").removeClass('pointing2');
        $("#handPlayer").addClass('pointing1');
    }
}

function tieGame()
{
    var tie = true;
    for(var i=0; i < 3; i++)
    {
        for(var j=0; j < 3; j++)
        {
            if(tableGame[i][j] < 0)
            {
                tie = false;
            }
        }
    }
    return tie;
}

function paintCellsWin()
{
    var classWinner;
    classWinner = (1+player);
    for(i=0; i < 3; i++)
    {
        $("#col"+winnerCells[i]).addClass('cellWinner'+classWinner);
    }
}

function saveLocalPoints()
{
    localStorage.setItem('player1PointsTtt',scorettt[0]);
    localStorage.setItem('player2PointsTtt',scorettt[1]);
}

function noOneIsClickable()
{
    for(i=1;i<10;i++)
    {
        $('#col'+i).removeClass('pointingActive');
        $('#col'+i).addClass('dontClick');
    }
}