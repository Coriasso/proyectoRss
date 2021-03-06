$(document).ready(
  function(){
    // los canales los almacenamos en un array, cada objeto será un
    // canal con nombre, tipo y url.

    let canales = (JSON.parse(localStorage.getItem('marcadores')) || []);
    let predefinidos = (JSON.parse(localStorage.getItem('predefinidos')) || []);

    /////*******JS de Marialize********\\\\\\


    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.tabs').tabs();
    $('select').formSelect();
    $(".dropdown-trigger").dropdown();



    var modal_predeterminados = M.Modal.getInstance($('#modal_predeterminados'));
    var modal_editar = M.Modal.getInstance($('#modal_editar_nombre'));
    var modal_borrar = M.Modal.getInstance($('#modal_confirmar_borrar'));
    var modal_personalizado = M.Modal.getInstance($('#modal_personalizar'));
    var sidenav_comprimido = M.Sidenav.getInstance($('#movil_colapsado'));



    $('[id^="menu_"]').each(function () {
      var $this = $(this);
      var menu_id = $this.attr('id');
      var panel_id = menu_id.replace('menu_', 'panel_');

      $("#" + menu_id).click(function () {
        $(".panel").hide();
        $("#" + panel_id).show();
      });
      //  console.log("id_menu::" + menu_id + "  id_panel" + panel_id);
    });

    $(".panel").hide();

    $("#contenedor_botones_alimentadores").hide();

    //Funcion simple para abrir el modal al pulsar en el elemento de la lista con dicho id y esconder el sidenav
    $('#boton_modal_favoritos').on('click', function(){
      modal_predeterminados.open();

    });
    $('#men_alimentadores_copalsado').on('click', function(){
      $('.panel').hide();
      sidenav_comprimido.close();
      $('#panel_alimentadores').show();
    });


    $('#boton_editar').on('click', function(){
      modal_editar.open();
    });

    $('#boton_borrar_modal').on("click", function(){
      //Coge lo que hay entro de las etiquetas html de la opcion seleccionada en ese momento
      let nombre = $("#select_favoritos>option:selected").html()

      let html="<h5>¿Seguro que quiere borrar el canal "+ nombre +" ?</h5>"
      $('#confirmacion_borrado').html(html);

      modal_borrar.open();
    });
    //Además de lo anterior también resetea el modal, borrando los datos introducidos
    $('#boton_modal_personalizado').on("click", function(){
      $('#boton_add_canal_personalizado').removeClass("disabled");
      $('#input_nombre').val("");
      $('#input_url').val("");
      $('#texto_add_canal').html("");
      modal_personalizado.open();
    });
    $('#boton_modal_personalizado_colapsado').on("click", function(){
      $('#boton_add_canal_personalizado').removeClass("disabled");
      $('#input_nombre').val("");
      $('#input_url').val("");
      $('#texto_add_canal').html("");
      modal_personalizado.open();
    });

    $('#men_ayuda_copalsado').on("click", function(){
      $('.panel').hide();
      sidenav_comprimido.close();
      $('#panel_ayuda').show();
    });

    $('#men_acercade_copalsado').on("click", function(){
      $('.panel').hide();
      sidenav_comprimido.close();
      $('#panel_acercade').show();
    });


    ////****Fin de js de materialize****\\\\\


    // Cargamos 10 canales por defecto si es la primera vez que se inicia la aplicación
    if(predefinidos.length == 0){
      marcador =[
        {
          nombre:"SlashDot",
          tipo: "ATOM",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20atom%20where%20url=%22http://rss.slashdot.org/Slashdot/slashdotMainatom%22&format=json"
        },
        {
          nombre:"Marca",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22estaticos.marca.com/rss/futbol/primera-division.xml%22&format=json"
        },
        {
          nombre:"El Mundo",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22http://estaticos.elmundo.es/elmundo/rss/portada.xml%22&format=json"
        },
        {
          nombre:"ABC",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22http://www.abc.es/rss/feeds/abcPortada.xml%22&format=json"
        },
        {
          nombre:"New York Times",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml%22&format=json"
        },
        {
          nombre:"BBC",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22http://rss.cnn.com/rss/cnn_topstories.rss%22&format=json"
        },
        {
          nombre:"Xataka Móvil",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22http://feeds.weblogssl.com/xatakamovil%22&format=json"
        },
        {
          nombre:"Eurogamers",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22https://www.eurogamer.es/?format=rss%22&format=json"
        },
        {
          nombre:"AS",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22as.com/rss/tags/ultimas_noticias.xml%22&format=json"
        },
        {
          nombre:"Antena 3",
          tipo:"RSS",
          url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url=%22http://www.antena3.com/rss/348683.xml%22&format=json"
        }

      ];




      function add_channel_automatically(){

        localStorage.setItem('predefinidos', JSON.stringify(marcador));


      }


      add_channel_automatically();

    }

    //Parte JavaScript del panel de alimentadores
    // definimos la función cargarCanales()
    // esta función carga de localStorage los canales disponibles y
    // actualiza el SELECT con la lista de canales
    function cargarCanalesPredefinidos(){
      predefinidos = JSON.parse(localStorage.getItem('predefinidos'))
      if(predefinidos != null){
        let select = $('#select_canal_predefinidos');
        select.empty();
        let opcion = '';
        for (let i=0; i< predefinidos.length; i++) {
          opcion += '<option value="'+i+'">'+predefinidos[i].nombre+'</option>';
        }
        select.html(opcion);
      }
    }
    // llamamos a la función para forzar su ejecución al cargar la página
    cargarCanalesPredefinidos();
    // mostrar un canal del array
    function mostrarCanal(posicion){
      let html='<div class="progress"><div class="indeterminate"></div></div>';

      $('#listado_noticias').html(html);
      let consultar_canal = (JSON.parse(localStorage.getItem('marcadores')));

      $.ajax({
        url:consultar_canal[posicion].url,
        success:function(datos){
          let salida='';
          salida+='<h4>Hay '+datos.query.count+' noticias.</h4>';
          salida+='<ol>';
          for (let i=0; i<datos.query.count; i++){
            if (canales[posicion].tipo=="RSS") {
              salida+='<li>'+datos.query.results.item[i].title +'</li>';
            } else {
              salida+='<li>'+datos.query.results.entry[i].title +'</li>';
            }
          }
          salida+='</ol>';
          $("#listado_noticias").html(salida);
        },
        timeout: 5000,
        error:function(xhr, ajaxOptions, thrownError){
          let salida = "<h4>Error: No hay conexión a Internet</h4>";
          salida += "<p>Compruebe su conexión e inténtelo de nuevo</p>";
          $("#listado_noticias").html(salida);
          salida += "<p>Error códido: "+xhr.status+"</p>";
        }
      });
    }





    function crear_select_favoritos(){
      let panel = $('#contenedor_favoritos');
      canales = (JSON.parse(localStorage.getItem('marcadores')) || []);
      let html = '';
      $('#panel_alimentadores').show();
      if(canales.length == 0){
        panel.html('<h3 class="center">Aun no se ha añadido ningún alimentador a favoritos</h3>')
        $('#contenedor_botones_alimentadores').hide();
        $('#listado_noticias').html("");
      }
      else {
        html += '<select id="select_favoritos" class="browser-default">'
        for (let i=0; i< canales.length; i++) {
          html += '<option value="'+i+'">'+canales[i].nombre+'</option>';
        }
        html +='</select>'
        panel.html(html);

        $('#contenedor_botones_alimentadores').show();

      }
    }
    crear_select_favoritos();




    /*
    Función que comprueba si el nombre o la url ya están guardadas. Como añadido comprueba
    si hay algo escrito para asegurar que no se puedan nombrar canales en blanco
    */
    function comprobarNombreURl(urlCanal, nombreCanal){
      let resultado = true;


      canales = JSON.parse(localStorage.getItem('marcadores'));
      if(!nombreCanal){
        $('#texto_add_canal').html("<h5> No se puede dejar el nombre en blanco </h5>");
        return resultado = false;
      }
      //Si no hay canales en el localStorage se salta la comprobación de estar repetidos
      if(canales != null){
        for (var i = 0; i < canales.length; i++) {
          if(canales[i].nombre == nombreCanal){
            $('#texto_add_canal').html("<h5> Nombre ya en uso</h5>");
            return resultado = false;
          }
          if(canales[i].url == urlCanal){
            $('#texto_add_canal').html("<h5> URL ya en uso</h5>");
            return resultado = false;
          }

        }
      }
      return resultado;

    }

    /**
    Esta función guarda en localStorage los marcadores.
    Devuelve verdadero si lo consigue y falso si error.
    */
    function salvarCanal(urlCanal, tipoCanal, nombreCanal) {
      let returnValue=true;

      if (localStorage!=undefined) {
        // en verdad no hace falta hacer el getItem, ya tenemos guardado en
        // la variable "canales" el array...
        let marcadores = JSON.parse(localStorage.getItem('marcadores'));
        if (marcadores == null) {
          marcadores = [];
        }
        let marcador = {
          nombre: nombreCanal ,
          tipo: tipoCanal,
          url: urlCanal
        };
        marcadores.push(marcador);
        localStorage.setItem('marcadores', JSON.stringify(marcadores) );
        crear_select_favoritos();
      } else {
        returnValue=false;
      }
      return returnValue;
    }


    $('#boton_add_canal_personalizado').on('click', function(){
      let url =  'https://query.yahooapis.com/v1/public/yql?q=';
      url += 'select * from rss where url="'+ $("#input_url").val() +'"&format=json';
      url = encodeURI(url);

      if(comprobarNombreURl(url,$("#input_nombre").val())){
        $('#boton_add_canal_personalizado').addClass("disabled")
        $.ajax({
          url: url,
          success: function(datos){

            if (datos.query.count>0) { // es RSS

              salvarCanal(url, "RSS", $("#input_nombre").val());
              $("#texto_add_canal").html("<h4> Canal RSS almacenado </h4>");
              $('#boton_add_canal_personalizado').removeClass("disabled");
            }

            else {
              let url =  'https://query.yahooapis.com/v1/public/yql?q=';
              url += 'select * from atom where url="'+ $("#input_url").val() +'"&format=json';
              url = encodeURI(url);

              $.ajax({
                url: url,
                success: function(datosAtom){
                  if (datosAtom.query.count>0) { // es ATOM
                    salvarCanal(url, "ATOM", $("#input_nombre").val());
                    $("#texto_add_canal").html("<h4> Canal ATOM almacenado </h4>");
                    $('#boton_add_canal_personalizado').removeClass("disabled");
                  }
                },
                timeout: 4000,
                error: function(error){
                  $("#texto_add_canal").html("<h4>Sin conexión a Internet </h4>");
                  $('#boton_add_canal_personalizado').removeClass("disabled");
                }
              });
            }


          },
          timeout: 4000,
          error: function (error){
            $("#texto_add_canal").html("<h4>Sin conexión a Internet</h4>");
          }
        });
      }
    });


    // al hacer click en el botón consultar...
    $("#boton_consultar").on("click", function(){
      let pos = +$("#select_favoritos").val();
      mostrarCanal(pos);
    });


    //Genera el select con los canales favoritos
    $('#menu_alimentadores').on('click',function (){
      crear_select_favoritos();
    });


    //Funcion que mete el canal predefinido seleccionado en ese momendo
    //y lo mete en 'marcadores' para usarlo en la pestaña favoritos
    $('#boton_add_channel_predeterminado').on('click',function(){
      let pos = +$("#select_canal_predefinidos").val();
      let canales_add = (JSON.parse(localStorage.getItem('marcadores')) || []);
      let predefinidos_add = (JSON.parse(localStorage.getItem('predefinidos')));

      if(comprobarNombreURl(predefinidos_add[pos].url,predefinidos_add[pos].nombre)){
        canales_add.push(predefinidos_add[pos]);
        localStorage.setItem('marcadores', JSON.stringify(canales_add));
        //  alert("Canal añadido a favoritos")
        M.toast({html: 'Canal añadido a favoritos'})
        crear_select_favoritos();
      }
      else {
        //  alert("Este canal ya está en favoritos")
        M.toast({html: "Este canal ya está en favoritos"})
      }
    });



    // al hacer click con el botón actualizar...
    // este evento actualiza con el texto del INPUT para el nombre
    // del alimentador el canal seleccionado.
    $("#boton_actualizar").on("click", function(){
      let pos = +$("#select_favoritos").val();

      if($("#nuevo_nombre").val()){
        canales[pos].nombre=$("#nuevo_nombre").val();
        $("#nuevo_nombre").val("");
        modal_editar.close();
        localStorage.setItem('marcadores', JSON.stringify(canales) );
        crear_select_favoritos();
      }
      else {
        M.toast({html: 'Nombre vacío'});
      }
    });


    $("#boton_borrar_confirmar").on("click", function(){
      canales = JSON.parse(localStorage.getItem('marcadores'))
      let pos = +$("#select_favoritos").val();
      canales.splice(pos, 1);
      localStorage.setItem('marcadores', JSON.stringify(canales) );
      M.toast({html: 'Canal borrado'})
      crear_select_favoritos();
      modal_borrar.close();
    });


  });
