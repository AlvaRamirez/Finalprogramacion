
var mostrarapodo1=localStorage.getItem("apodo1");
var mostrarapodo2=localStorage.getItem("apodo2");

//var puntajeGlobal1= localStorage.getItem("puntajeGlobal1");
//var puntajeGlobal2= localStorage.getItem("puntajeGlobal2");

    var puntajeGlobal1= localStorage.getItem("puntajeGlobal1");
    var puntajeGlobal2= localStorage.getItem("puntajeGlobal2");

/*while(puntajeGlobal1|puntajeGlobal2==null|NaN){
    puntajeGlobal1=0;
    puntajeGlobal2=0;

}
*/


       function go(){
  
            console.log("puntaje total1:" + puntajeGlobal1);
            console.log("puntaje total2:" + puntajeGlobal2);
        
        
            $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");
            $("#local2").html(mostrarapodo2 + ": " + puntajeGlobal2 + " ♫");
        
        
            
        }
        
        





