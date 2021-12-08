<?php
    include_once("../modelo/acciones.php");

    $sesion = $_SESSION['idSesion'];
    $id_usuario = $_SESSION['idUsuario'];

    $modelo = new Acciones();
    $resultado = $modelo -> tomar_datos_ticket_empresa($id_usuario,$sesion);
    $resultado = $resultado[0];
    $nombreEmpresa = $resultado['nombreEmpresa'];
    $rfcEmpresa = $resultado['rfcEmpresa'];

    if(isset($_SESSION['idSesion']))
    {
    $verificacion = $modelo->checarSesionEmpresa($_SESSION['idUsuario'],$_SESSION['idSesion']);
    if($verificacion==$_SESSION['idSesion'])
    {
        echo '
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../recursos/css/estilos.css" type="text/css">
    <link rel="shortcut icon" href="../recursos/img/logo.ico" type="image/x-icon">
    <title>Empresa</title>
</head>
<body> ';
     
    if(isset($_COOKIE['vista-actual']))
    {  
         echo '<input type="hidden" id="info-cookies" value="'.$_COOKIE['vista-actual'].'">';
    }
    else
    {
         echo '<input type="hidden" id="info-cookies" value="no">';
    }
    echo'
    <div id="contenedor">
            <div id="menu">
                <div id="contenedor_logo" class="seccion_menu">
                    <img src="../recursos/img/logo.png" alt="" id="logo_inicio">
                    <img src="../recursos/img/logo_recorte.png" alt="" id="logo_inicio_menu">
                    <p class="texto"></p>
                </div>
                <div id="contenedor_bienvenida" class="seccion_menu">
                    <p class="">Bienvenido a tu dashboard Empresa</p>
                </div>
            </div>
            <div id="seccion_principal">
                <div id="menu_control">
                    <div id="c_boton_dashboard" class="boton_control" onclick="mostrarSeccion(event);">
                        <img src="../recursos/img/hogar.png" alt="" class="imagen_menu" id="imagen_dashboard">
                        <p class="texto_menu" id="parrafo_dashboard">Dashboard</p>
                    </div>
                    <div id="c_boton_ticket" class="boton_control" onclick="mostrarSeccion(event);">
                        <img id="imagen_ticket" src="../recursos/img/hoja.png" alt="" class="imagen_menu">
                        <p id="parrafo_ticket" class="texto_menu">Tickets</p>
                    </div>
                    <div id="c_boton_contrasena" class="boton_control" onclick="mostrarSeccion(event);">
                           <img id="imagen_contrasena" src="../recursos/img/contrasena.png" alt="" class="imagen_menu">
                           <p id="parrafo_contrasena" class="texto_menu">Cambiar Contraseña</p>
                    </div>
                    <div  class="boton_control" onclick="cerrar_sesion();">
                        <img src="../recursos/img/salida.png" alt="" class="imagen_menu">
                        <p class="texto_menu">Cerrar Sesion</p>
                    </div>
                </div>
                <div class="contenedor_seccion" id="">
                        <!-- empoieza es la seccion de dashboar -->
                            <div class="seccion" id="contenedor_dashboard">
                                <h1 class="titulo_seccion">Dashboard</h1>
                                <div class="contador_seccion" id="contenedor_contador">
                                    <div id="c_boton_pendiente" class="seccion_contador" onclick="mostrarSeccionDashboard(event);">
                                        <img src="../recursos/img/tickets_pendientes.png" id="imagen_pendiente" class="imagen_contador">
                                        <p id="parrafo_pendiente" class="parrafo_contador">Tickets Pendientes</p>
                                    </div>
                                    <div id="c_boton_noResuelto" class="seccion_contador" onclick="mostrarSeccionDashboard(event);">
                                        <img src="../recursos/img/tickets_cancelar.png" id="imagen_noResuelto" class="imagen_contador">
                                        <p id="parrafo_noResuelto" class="parrafo_contador">Tickets No Resueltos</p>
                                    </div>

                                    <div id="c_boton_resuelto" class="seccion_contador" onclick="mostrarSeccionDashboard(event);">
                                        <img src="../recursos/img/ticket_resulto.png" id="imagen_resuelto" class="imagen_contador">
                                        <p id="parrafo_resuelto" class="parrafo_contador">Tickets Resueltos</p>
                                    </div>
                                </div>

                            <!--Contenedor tabla de tickets pendientes-->
                            <div class="seccion_tabla" id="contenedor_tickets_pendientes">
                            <h1 class="titulo_seccion">Listado de tickets pendientes</h1>
                                <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de tickets</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_pendientes_empresa" onchange="tomar_datos_tickets_pendientes_empresa();"> 
                                                        <option value="5">5</option> 
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="barra_buscadora">
                                                <div class="buscador1">
                                                    <p class="titulo_buscar">Buscar:</p>
                                                </div>
                                                <div class="buscador2">
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_pendiente_empresa(event);">       
                                                </div>      
                                            </div>
                                        </div>
                                   <div class="contenedor_tabla_ticketsPendientes">
                                       <div class="contenedor_informacion">
                                           <p>Valor de la prioridad</p>
                                       <table class="info_tablas">
                                           <tr>
                                               <td style="background-color: green;">Bajo = 1</td>
                                               <td style="background-color: yellow;">Medio = 2</td>
                                               <td style="background-color: orange;">Alto = 3</td>
                                               <td style="background-color: red;">Muy alto = 4</td>
                                           </tr>
                                       </table>
                                       </div>
                                       <div id="contenedor_tabla_tickets_empresa">
                                       <table class="tablas">
                                           <thead>
                                               <tr>
                                                   <td>ID</td>
                                                   <td>Folio</td>
                                                   <td>Nombre empresa</td>
                                                   <td>RFC</td>
                                                   <td>Fecha de solicitud</td>
                                                   <td>Hora de solicitud</td>
                                                   <td>Servicio</td>
                                                   <td>Prioridad</td>
                                                   <td>Estatus</td>
                                                   <td>Acciones</td>
                                               </tr>
                                           </thead>
                                           <tbody id="tabla_tickets_pendientes_empresa">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_pendientes_empresa">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_pendientes_empresa">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_pendientes_empresa">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_pendientes_empresa">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_pendientes_empresa">Ultimo</div>
                                        </div>
                                   </div>
                                </div>

                            </div>
                            
                            <!--Contenedor tabla de tickets no resueltos-->
                            <div class="seccion_tabla" id="contenedor_tickets_no_resueltos">
                            <h1 class="titulo_seccion">Listado de tickets no resueltos</h1>

                                    <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de tickets</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_NoResuelto_empresa" onchange="tomar_datos_tickets_NoResuelto_empresa();"> 
                                                        <option value="5">5</option> 
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="barra_buscadora">
                                                <div class="buscador1">
                                                <p class="titulo_buscar">Buscar:</p>
                                                </div>
                                                <div class="buscador2">
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_NoResuelto_empresa(event);">       
                                                </div>      
                                            </div>
                                        </div>

                                    <div id="contendor_tabla_noresuelto_empresa">
                                       <table class="tablas">
                                           <thead>
                                               <tr>
                                                   <td>ID</td>
                                                   <td>Folio</td>
                                                   <td>Nombre empresa</td>
                                                   <td>RFC</td>
                                                   <td>Fecha de cierre</td>
                                                   <td>Hora de cierre</td>
                                                   <td>Servicio</td>
                                                   <td>Prioridad</td>
                                                   <td>Estatus</td>
                                                   <td>Acciones</td>
                                               </tr>
                                           </thead>
                                           <tbody id="tabla_tickets_NoResuelto_empresa">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_NoResuelto_empresa">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_NoResuelto_empresa">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_NoResuelto_empresa">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_NoResuelto_empresa">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_NoResuelto_empresa">Ultimo</div>
                                        </div>
                                    </div>
                            </div>

                            <!--Contenedor tabla de tickets no resueltos-->
                            <div class="seccion_tabla" id="contenedor_tickets_resuelto">
                            <h1 class="titulo_seccion">Listado de tickets resueltos</h1>

                            <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de tickets</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_Resuelto_empresa" onchange="tomar_datos_tickets_Resuelto_empresa();"> 
                                                        <option value="5">5</option> 
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="barra_buscadora">
                                                <div class="buscador1">
                                                <p class="titulo_buscar">Buscar:</p>
                                                </div>
                                                <div class="buscador2">
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_Resuelto_empresa(event);">       
                                                </div>      
                                            </div>
                                        </div>

                                    <div id="contenedor_tabla_resuelto_empresa">
                                       <table class="tablas">
                                           <thead>
                                               <tr>
                                                   <td>ID</td>
                                                   <td>Folio</td>
                                                   <td>Nombre empresa</td>
                                                   <td>RFC</td>
                                                   <td>Fecha de cierre</td>
                                                   <td>Hora de cierre</td>
                                                   <td>Servicio</td>
                                                   <td>Prioridad</td>
                                                   <td>Estatus</td>
                                                   <td>Acciones</td>
                                               </tr>
                                           </thead>
                                           <tbody id="tabla_tickets_Resuelto_empresa">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                            <div class="controladores_paginador" id="boton_paginador_primero_tickets_Resuelto_empresa">Primero</div>
                                            <div class="controladores_paginador" id="boton_paginador_anterior_tickets_Resuelto_empresa">Anterior</div>
                                            <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_Resuelto_empresa">1 de 1</div>
                                            <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_Resuelto_empresa">Siguiente</div>
                                            <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_Resuelto_empresa">Ultimo</div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <!-- terminar seccion dasshboard -->
                        <!-- empieza seccion ticket -->
                            <div class="seccion" id="contenedor_tickets">
                                <h1 class="titulo_seccion">Agregar ticket</h1>
                                   <div class="contendor_from_tickets">
                                       <div class="agregarTickets" id="contenedo_nombre_ticket">
                                            <p>Nombre empresa:</p>
                                           <input type="text" id="input_nombreTicket" class="input_tickets" placeholder="Nombre Empresa" value="'.$nombreEmpresa.'" onkeydown="mostrar_nombre(event);" disabled>
                                           <div id="contendor_opciones_nombre">
                                               <p class="opcion_nombre">Nombre empmresa</p>
                                           </div>
                                           
                                       </div>
                                       <div class="agregarTickets1">
                                           <p>RFC Empresa:</p>
                                           <input type="text" id="input_RFCTicket" class="input_tickets" value="'.$rfcEmpresa.'" placeholder="RFC Empresa" disabled>
                                           </div>
                                           
                                   </div>
                                   <div class="contendor_from_tickets">
                                        <!-- <div class="agregarTickets">
                                            <p>Fecha y Hora:</p>
                                           <input type="date" id="input_fecha" class="input_time">
                                       </div> -->
                                        <div class="agregarTickets1">
                                            <p>Tipo de servicio:</p>
                                           <select id="select_servicio" class="input_tickets">
                                               <option selected>Selecciona alguna opcion...</option>
                                               <option value="SOPORTE TECNICO">Soporte tecnico</option>
                                               <option value="CABLEADO">Cableado</option>
                                               <option value="CAMARAS">Revision camaras</option>
                                               <option value="POLIZA">Servicio por poliza</option>
                                               <option value="TONERS">Toners</option>
                                               <option value="COTIZACIONES">Cotizaciones</option>                                               
                                           </select>
                                       </div>
                                       <div class="agregarTickets2">
                                           <p>Prioridad del servicio:</p>
                                            <select id="select_prioridad" class="input_tickets">
                                               <option selected>Selecciona alguna opcion...</option>
                                               <option value="4" style="background-color: red; color: white;">Muy Alto</option>
                                               <option value="3" style="background-color: orange; color: black;">Alto</option>
                                               <option value="2" style="background-color: yellow; color: black;">Medio</option>
                                               <option value="1" style="background-color: green; color: black;" >Bajo</option>                                             
                                            </select>
                                       </div>
                                   </div>
                                   <div class="contenedor_box">
                                       <p>Descripcion del problema</p>
                                       <textarea class="input_tickets" id="txt_problematica" cols="10" rows="10" placeholder="Describa detalladamente la problematica presentada"></textarea>
                                   </div>
                                   <div class="contenedor_botonTickets">
                                       <button class="boton" id="btn_agregar_ticket" onclick="agregar_ticket();">Dar de alta ticket</button>
                                   </div>
                                
                            </div>
                        <!-- terminar seccion tickets -->

                        <div id="contenedor_cambio_contrasena" class="seccion">
                            <div id="contenedor_formulario_cambio_contrasena">
                                <h1>Cambio de contraseña</h1>
                                <div class="cambio_contrasena">
                                    <p>Ingrese la nueva contrasena</p>
                                    <input type="password" id="input_contrasena_nueva_empresa" class="input_cambio_contrasena" placeholder="Nueva contraseña">
                                </div>
                                <div class="cambio_contrasena">
                                    <p>Confirme la contraseña</p>
                                    <input type="password" id="input_confirmacion_contrasena_empresa" class="input_cambio_contrasena" placeholder="Confirme la nueva contraseña">
                                </div>
                                <div class="cambio_contrasena">
                                    <button class="boton" onclick="cambiar_contrasena();">Cambiar contraseña</button>
                                </div>
                            </div>
                </div>
            </div>
        </div>

    <script src="../recursos/js/funcionesEmpresa.js">
    </script>
    <script src="../recursos/js/paginadorEmpresa.js">
    </script>
    
    </body>
</html>
        ';
    }
    else
    {
        header("Location: ../");
        echo "sin coincidencia";
    }

}
else{
    header("Location: ../");
    echo "no disponible";
}

?>

