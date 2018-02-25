$(function(){
var overlay = $('<div id="overlay"></div>');
overlay.show();
overlay.appendTo(document.body);
$('.popup').show();
$('.cerrar').click(function(){
$('.popup').hide();
overlay.appendTo(document.body).remove();
return false;
});


$('.x').click(function(){
$('.popup').hide();
overlay.appendTo(document.body).remove();
return false;
});

// funcion que se aplicará cuando se consigan los 7 items
//registra tiempo y usuario y los mete en un array

function registroRanking(){

  var tiempo =$("#cuentaAtras").text();
  var arrayTiempo = tiempo.split(":");
  var min = parseInt(arrayTiempo[0])*60;
  var seg = parseInt(arrayTiempo[1]);
  var marca = min+seg;
  var player =$(".playername").text();
  //alert(marca);
  //alert(player);

  var array =new Array();
  array["nombre"]=player;
  array["puntuacion"]=marca;

};

var contadorItem=0;
var errores =0;
var incorrecta = $('<p> RESPUESTA INCORRECTA, SE TE RESTARA 1 VIDA </p>').css({backgroundColor: 'red'});



$('.item').click(function(){
  overlay.show();
  overlay.appendTo(document.body);
  console.log("activado")
  var elem = $(this).text();
  $(' .popup-pc').show();

  $.post("connection.php",{item: elem}, function (item) {
    item = $.parseJSON(item);
    console.log(item[0].correcta);
    $("#tituloPopup").text(elem);
    $('#preguntas-pc').text(item[0].pregunta);
    $('#opciones-pc').append($('<input type="radio" id="res-pc1" name="opciones" value="1"><span id="pc1">' + item[0].res1 + '</span></input><br/>'));
    $('#opciones-pc').append($('<input type="radio" id="res-pc2" name="opciones" value="2"><span id="pc2">' + item[0].res2 + '</span></input><br />'));
    $('#opciones-pc').append($('<input type="radio" id="res-pc3" name="opciones" value="3"><span id="pc3">' + item[0].res3 + '</span></input><br />'));
    $('input[type=radio][name=opciones]').change(function() {
      if (this.value == item[0].correcta) {
        contadorItem++;
        $("#itemsactuales").text(contadorItem);
        if(contadorItem==7){
          registroRanking();
          var tiempo =$("#cuentaAtras").text();
          $("#puntosactuales").text(tiempo);
          $('#tituloPopup').empty();
          $('#opciones-pc').empty();
          $('#preguntas-pc').empty();
          $('#preguntas-pc').text("ENHORABUENA!!! HAS CONSEGUIDO FINALIZAR A TIEMPO!!!'<br>'TIEMPO RESTANTE: "+tiempo);
          $('#tituloPopup').append($('<input type="button" class="btn btn-primary start" id="comenzar" name="comenzar" value="VOLVER A COMENZAR"></input><br/><br/>'));       
        }else{         
          console.log("ok");
          $('#opciones-pc').empty();
          $('#preguntas-pc').empty();
          $('#preguntas-pc').text("FELICIDADES");
          $('#opciones-pc').append($('<p> ITEM ADQUIRIDO </p>').css({backgroundColor: 'green'}));
          setTimeout("$('.popup-pc').hide();", 2000);
          overlay.appendTo(document.body).remove();
        }
      }else{
        console.log("error");
        $('#opciones-pc').empty();
        errores++;
        $("#vida"+errores).hide();
          if(errores==3){
            $('#tituloPopup').empty();
            $('#opciones-pc').empty();
            $('#preguntas-pc').empty();
            $('#opciones-pc').append($('<p> TE QUEDASTE SIN VIDAS </p>'));
            $('#tituloPopup').append($('<input type="button" class="btn btn-primary start" id="comenzar" name="comenzar" value="VOLVER A COMENZAR"></input><br/><br/>'));
          }else{
        alert("RESPUESTA INCORRECTA, SE TE RESTARA 1 VIDA");
        $('#preguntas-pc').text(item[1].pregunta);
        console.log(item[1].correcta);
        $('#opciones-pc').append($('<input type="radio" id="res-pc1" name="opciones" value="1"><span id="pc1">' + item[1].res1 + '</span></input><br/>'));
        $('#opciones-pc').append($('<input type="radio" id="res-pc2" name="opciones" value="2"><span id="pc2">' + item[1].res2 + '</span></input><br />'));
        $('#opciones-pc').append($('<input type="radio" id="res-pc3" name="opciones" value="3"><span id="pc3">' + item[1].res3 + '</span></input><br />'));
        $('input[type=radio][name=opciones]').change(function() {
          if (this.value == item[1].correcta) {
            contadorItem++;
            $("#itemsactuales").text(contadorItem);
            if(contadorItem==7){
              registroRanking();
              var tiempo =$("#cuentaAtras").text();
              $('#tituloPopup').empty();
              $('#opciones-pc').empty();
              $('#preguntas-pc').empty();
              $('#preguntas-pc').text("ENHORABUENA!!! HAS CONSEGUIDO FINALIZAR A TIEMPO!!!'<br>'TIEMPO RESTANTE: "+tiempo);
              $('#tituloPopup').append($('<input type="button" class="btn btn-primary start" id="comenzar" name="comenzar" value="VOLVER A COMENZAR"></input><br/><br/>'));       
            }else{         
              console.log("ok");
              $('#opciones-pc').empty();
              $('#preguntas-pc').empty();
              $('#preguntas-pc').text("FELICIDADES");
              $('#opciones-pc').append($('<p> ITEM ADQUIRIDO </p>').css({backgroundColor: 'green'}));
              setTimeout("$('.popup-pc').hide();", 2000);
              overlay.appendTo(document.body).remove();
            }
          }
          else {
           console.log("error");
        $('#opciones-pc').empty();
        errores++;
        $("#vida"+errores).hide();
          if(errores==3){
            $('#tituloPopup').empty();
            $('#opciones-pc').empty();
            $('#preguntas-pc').empty();
            $('#opciones-pc').append($('<p> TE QUEDASTE SIN VIDAS </p>'));
            $('#tituloPopup').append($('<input type="button" class="btn btn-primary start" id="comenzar" name="comenzar" value="VOLVER A COMENZAR"></input><br/><br/>'));
          }else{
            alert("RESPUESTA INCORRECTA, SE TE RESTARA 1 VIDA");
            $('#preguntas-pc').text(item[2].pregunta);
            console.log(item[2].correcta);
            $('#opciones-pc').append($('<input type="radio" id="res-pc1" name="opciones" value="1"><span id="pc1">' + item[2].res1 + '</span></input><br/>'));
            $('#opciones-pc').append($('<input type="radio" id="res-pc2" name="opciones" value="2"><span id="pc2">' + item[2].res2 + '</span></input><br />'));
            $('#opciones-pc').append($('<input type="radio" id="res-pc3" name="opciones" value="3"><span id="pc3">' + item[2].res3 + '</span></input><br />'));
            }
            $('input[type=radio][name=opciones]').change(function() {
             if (this.value == item[2].correcta) {
                 contadorItem++;
            $("#itemsactuales").text(contadorItem);
            if(contadorItem==7){
              registroRanking();
              var tiempo =$("#cuentaAtras").text();
              $('#tituloPopup').empty();
              $('#opciones-pc').empty();
              $('#preguntas-pc').empty();
              $('#preguntas-pc').text("ENHORABUENA!!! HAS CONSEGUIDO FINALIZAR A TIEMPO!!!'<br>'TIEMPO RESTANTE: "+tiempo);
              $('#tituloPopup').append($('<input type="button" class="btn btn-primary start" id="comenzar" name="comenzar" value="VOLVER A COMENZAR"></input><br/><br/>'));       
            }else{         
              console.log("ok");
              $('#opciones-pc').empty();
              $('#preguntas-pc').empty();
              $('#preguntas-pc').text("FELICIDADES");
              $('#opciones-pc').append($('<p> ITEM ADQUIRIDO </p>').css({backgroundColor: 'green'}));
              setTimeout("$('.popup-pc').hide();", 2000);
              overlay.appendTo(document.body).remove();
            }
              }
              else {
                $('#tituloPopup').empty();
                $('#opciones-pc').empty();
                $('#preguntas-pc').empty();
                $('#opciones-pc').append($('<p> TE QUEDASTE SIN VIDAS </p>'));
                $('#tituloPopup').append($('<input type="button" class="btn btn-primary start comenzar" id="comenzar" name="comenzar" value="VOLVER A COMENZAR"></input><br/><br/>'));
          
              }
            });
          }
        });
      }
    }
    });
  });
});


//metodo para que se recargue la pagina cuando se acabe el juego (no funciona)
  
$('#comenzar').click(function() {
            // Recargo la página
            location.reload();
        });
    

});
