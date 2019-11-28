var app={
initialize: function(){
    console.log("initialize");
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    var photodata1=localStorage.getItem("myapp-photo1");
    var photodata2=localStorage.getItem("myapp-photo2");

    if(photodata1){
        app.updatePicture1(photodata1);
    }

    if(photodata2){
        app.updatePicture2(photodata2);
    }
},

 onDeviceReady: function() {
     console.log("onDeviceREady");
    this.receivedEvent('deviceready');
   // takePicture();
 },
    receivedEvent: function(id) {
        console.log("receivedEvent");
        document.getElementById("foto1").addEventListener("click", app.takePicture1, false);
        document.getElementById("foto2").addEventListener("click", app.takePicture2, false);
        
    },


 takePicture2:function(){
    console.log("takePicture2");

    document.getElementById("foto2").setAttribute("disabled","disabled"); 


navigator.camera.getPicture(function(imageData2){
    //foto tomada OK

    document.getElementById("foto2").removeAttribute("disabled");

    app.updatePicture2(imageData2);
    localStorage.setItem("myapp-photo2", imageData2);

}, function(){
    //foto NO tomada

    document.getElementById("foto2").removeAttribute("disabled");

    alert("No se puede tomar la foto");
}, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum:true
    
});

/*function onSuccess(picData2) {
    document.getElementById("foto2");
    image2.src="data:image/jpeg;base64,"+picData2;
}

function onFail(message) {
    alert('Failed because: ' + message);
}*/

},

 takePicture1:function(){
    console.log("takePicture1");

    document.getElementById("foto1").setAttribute("disabled","disabled"); 


navigator.camera.getPicture(function(imageData2){
    //foto tomada OK

    document.getElementById("foto1").removeAttribute("disabled");

    app.updatePicture2(imageData2);
    localStorage.setItem("myapp-photo1", imageData2);

}, function(){
    //foto NO tomada

    document.getElementById("foto1").removeAttribute("disabled");

    alert("No se puede tomar la foto");
}, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum:true

    
});
/*function onSuccess(picData1) {
    document.getElementById("foto2");
    image1.src="data:image/jpeg;base64,"+picData1;
}
function onFail(message) {
    alert('Failed because: ' + message);
}*/
},

updatePicture1: function(picData1){
    var image1= document.getElementById("foto1");
    image1.src="data:image/jpeg;base64,"+picData1;
    console.log(image1);
},

updatePicture2: function(picData2){
    var image2= document.getElementById("foto2");
    image2.src="data:image/jpeg;base64,"+picData2;
}

};

console.log("antes de empezar la app");
app.initialize();


//navigator.mediaDevices.getUserMedia