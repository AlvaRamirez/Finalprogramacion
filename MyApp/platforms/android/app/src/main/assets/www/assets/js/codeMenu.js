
var mostrarapodo1=localStorage.getItem("apodo1");
var mostrarapodo2=localStorage.getItem("apodo2");

var puntajeGlobal1= localStorage.getItem("puntajeGlobal1");
var puntajeGlobal2= localStorage.getItem("puntajeGlobal2");

//puntajeGlobal1= puntajeGlobal1||0;
//puntajeGlobal2=puntajeGlobal2||0;

//puntajeGlobal1=puntajeGlobal1 ? puntajeGlobal1 :0;
//puntajeGlobal2=puntajeGlobal2 ? puntajeGlobal2 :0;

    function go(){
        
        console.log("puntaje total1:" + puntajeGlobal1);
        $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");

        console.log("puntaje total2:" + puntajeGlobal2);
        $("#local2").html(mostrarapodo2 + ": " + puntajeGlobal2 + " ♫");
        

        if(puntajeGlobal1 ===null){
            $("#local1").html(mostrarapodo1 + ": "+ "0" + " ♫");
                }
                else{
                    $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");
                }

                if(puntajeGlobal2 ===null){
                    $("#local2").html(mostrarapodo2 + ": "+ "0" + " ♫");
                        }
                        else{
                            $("#local2").html(mostrarapodo2 + ": " + puntajeGlobal2 + " ♫");
                        }

              
        /*
                        else if(puntajeGlobal1===NaN){
                            $("#local1").html(mostrarapodo1 + ": "+ "0" + " ♫");
                        }
                        else{
                            $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");
                        }*/

                /*if(puntajeGlobal ===null){
                    $("#local1").html("Jugador1" + ": "+ "0" + " ♫");
                        }
                        else{
                            $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");
                        }*/

        // console.log("puntaje total1:" + puntajeGlobal1);
        // console.log("puntaje total2:" + puntajeGlobal2);
      // $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫", "jugador1");
      //$("#local2").html(mostrarapodo2 + ": " + puntajeGlobal2 + " ♫", "jugador2");
            
}

   

        

   

 


   
        





