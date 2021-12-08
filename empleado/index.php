<?php
include_once("../modelo/acciones.php");
// session_start();
if(isset($_SESSION['idSesion']))
{
    $modelo = new Acciones();
    $verificacion = $modelo->checarSesionEmpleado($_SESSION['idUsuario'],$_SESSION['idSesion']);
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
            <title>Empleado</title>
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
                </div>
                <div id="contenedor_bienvenida" class="seccion_menu">
                    <p>Bienvenido a tu dashboard empleado</p>
                </div>
            </div>
            
            <div id="seccion_principal">
                <div id="menu_control">
                    <div id="c_boton_dashboard" class="boton_control" onclick="mostrarSeccion(event);">
                        <img src="../recursos/img/hogar.png" alt="" class="imagen_menu" id="imagen_dashboard">
                        <p class="texto_menu" id="parrafo_dashboard">Dashboard</p>
                    </div>
                    <div id="c_boton_contrasena" class="boton_control" onclick="mostrarSeccion(event);">
                           <img id="imagen_contrasena" src="../recursos/img/contrasena.png" alt="" class="imagen_menu">
                           <p id="parrafo_contrasena" class="texto_menu">Cambiar Contraseña</p>
                       </div>
                       <div  class="boton_control"onclick="cerrar_sesion();" >
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
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_pendientes_empleado" onchange="tomar_datos_tickets_pendientes_empleado();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_pendiente_empleado(event);">       
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
                                       <div id="contenedor_tabla_ticket_empleado">
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
                                           <tbody id="tabla_tickets_pendientes_empleado">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_pendientes_empleado">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_pendientes_empleado">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_pendientes_empleado">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_pendientes_empleado">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_pendientes_empleado">Ultimo</div>
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
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_NoResuelto_empleado" onchange="tomar_datos_tickets_NoResuelto_empleado();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_NoResuelto_empleado(event);">       
                                                </div>      
                                            </div>
                                        </div>

                                   <div id="contenedor_tabla_ticketsNo_empleado">

                                   
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
                                           <tbody id="tabla_tickets_NoResuelto_empleado">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_NoResuelto_empleado">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_NoResuelto_empleado">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_NoResuelto_empleado">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_NoResuelto_empleado">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_NoResuelto_empleado">Ultimo</div>
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
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_Resuelto_empleado" onchange="tomar_datos_tickets_Resuelto_empleado();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_Resuelto_empleado(event);">       
                                                </div>      
                                            </div>
                                        </div>

                                    <div id="contendor_tabla_ticketResuelto_empleado">
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
                                           <tbody id="tabla_tickets_Resuelto_empleado">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                            <div class="controladores_paginador" id="boton_paginador_primero_tickets_Resuelto_empleado">Primero</div>
                                            <div class="controladores_paginador" id="boton_paginador_anterior_tickets_Resuelto_empleado">Anterior</div>
                                            <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_Resuelto_empleado">1 de 1</div>
                                            <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_Resuelto_empleado">Siguiente</div>
                                            <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_Resuelto_empleado">Ultimo</div>
                                        </div>
                                    </div>
                            </div>

                            <!--Contenedor tabla de tickets no resueltos-->
                            <div class="seccion_tabla" id="contenedor_peticion">
                                <h1>Peticiones</h1>
                                <div id="contenedor_tabla_peticion">
                                    <table class="tablas">
                                        <thead>
                                            <tr>
                                                <th>RFC</th>
                                                <th>Nombre Empresa</th>
                                                <th>Razon Social</th>
                                                <th>Domicilio</th>
                                                <th>N° exterior</th>
                                                <th>Colonia</th>
                                                <th>C.P</th>
                                                <th>Telefono</th>
                                                <th>Correo electronico</th>
                                                <th>Contraseña</th>
                                                <th>Estatus</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- terminar seccion dasshboard -->
                        <div id="contenedor_cambio_contrasena" class="seccion">
                            <div id="contenedor_formulario_cambio_contrasena">
                                <h1>Cambio de contraseña</h1>
                                <div class="cambio_contrasena">
                                    <p>Ingrese la nueva contrasena</p>
                                    <input type="password" id="input_contrasena_nueva" class="input_cambio_contrasena" placeholder="Nueva contraseña">
                                </div>
                                <div class="cambio_contrasena">
                                    <p>Confirme la contraseña</p>
                                    <input type="password" id="input_confirmacion_contrasena" class="input_cambio_contrasena" placeholder="Confirme la nueva contraseña">
                                </div>
                                <div class="cambio_contrasena">
                                    <button class="boton" onclick="cambiar_contrasena();">Cambiar contraseña</button>
                                </div>
                            </div> 
                        </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../recursos/js/funcionesEmpleado.js">
    </script>
    <script src="../recursos/js/paginadorEmpleado.js">
    </script>

    </body>
</html>
        ';
    }
    else
    {
        header("Location: ../");
        return ("sin coincidencia");
    }

}
else{
    header("Location: ../");
    return("no disponible");
}
?>


