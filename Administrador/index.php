<?php
include_once("../modelo/acciones.php");
// session_start();
if(isset($_SESSION['idSesion']))
{
    $modelo = new Acciones();
    $verificacion = $modelo->checarSesion($_SESSION['idUsuario'],$_SESSION['idSesion']);
    if($verificacion==$_SESSION['idSesion'])
    {
        echo '
        <!DOCTYPE html>
   <html lang="es-Mx">
       <head>
           <meta charset="UTF-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Administrador</title>
           <link rel="stylesheet" href="../recursos/css/estilos.css" type="text/css">
           <link rel="shortcut icon" href="../recursos/img/logo.ico" type="image/x-icon">
       </head>
       <body>';
           
           if(isset($_COOKIE['vista-actual']))
           {  
                echo '<input type="hidden" id="info-cookies" value="'.$_COOKIE['vista-actual'].'">';
           }
           else
           {
                echo '<input type="hidden" id="info-cookies" value="no">';
           }
        echo '
           <div id="contenedor">
               <div id="menu">
                   <div id="contenedor_logo" class="seccion_menu">
                       <img src="../recursos/img/logo.png" alt="" id="logo_inicio">
                       <img src="../recursos/img/logo_recorte.png" alt="" id="logo_inicio_menu">
                       <p class="texto"></p>
                   </div>
                   <div id="contenedor_bienvenida" class="seccion_menu">
                       <p class="">Bienvenido a tu dashboard administrador</p>
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
                       <div id="c_boton_empresas" class="boton_control" onclick="mostrarSeccion(event);">
                           <img id="imagen_empresas" src="../recursos/img/empresa.png" alt="" class="imagen_menu">
                           <p id="parrafo_empresas" class="texto_menu">Empresas</p>
                       </div>
                       <div id="c_boton_empleado" class="boton_control" onclick="mostrarSeccion(event);">
                           <img id="imagen_empleado" src="../recursos/img/usuario.png" alt="" class="imagen_menu">
                           <p id="parrafo_empleado" class="texto_menu">Empleados</p>
                       </div>
                       <div id="c_boton_administrador" class="boton_control" onclick="mostrarSeccion(event);">
                           <img id="imagen_administrador" src="../recursos/img/administrador.png" alt="" class="imagen_menu">
                           <p id="parrafo_administrador" class="texto_menu">Admin</p>
                       </div>
                       <div id="c_boton_contrasena" class="boton_control" onclick="mostrarSeccion(event);">
                           <img id="imagen_contrasena" src="../recursos/img/contrasena.png" alt="" class="imagen_menu">
                           <p id="parrafo_contrasena" class="texto_menu">Cambiar Contraseña</p>
                       </div>
                       <div  class="boton_control" onclick="cerrar_sesion();" >
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
                                       <div id="c_boton_peticion" class="seccion_contador" onclick="mostrarSeccionDashboard(event);">
                                           <img src="../recursos/img/Peticion.png" id="imagen_peticion" class="imagen_contador">
                                           <p id="parrafo_peticion" class="parrafo_contador">Peticiones</p>
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
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_pendientes_dashboard" onchange="tomar_datos_tickets_pendientes_dashboard();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_pendiente_dashboard(event);">       
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
                                       <div id ="contenedor_tablas_tickets_pendientes">
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
                                                <tbody id="tabla_tickets_pendientes_dashboard">
                                                </tbody>
                                            </table>
                                            <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_pendientes_dashboard">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_pendientes_dashboard">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_pendientes_dashboard">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_pendientes_dashboard">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_pendientes_dashboard">Ultimo</div>
                                            </div>
                                        </div> 
                                    </div>    
                               </div>
                               <!--Contenedor tabla de tickets no resueltos-->
                               <div class="seccion_tabla" id="contenedor_peticion">
                                <h1 class="titulo_seccion">Lista de peticiones de empresas</h1>
                                        <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de peticiones</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_peticiones_dashboard" onchange="tomar_datos_empresas_peticion_dashboard();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..."onkeypress="buscar_empresas_peticion_dash(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>
                                   <div id="contenedor_tabla_peticion">
                                       <table class="tablas">
                                           <thead>
                                               <tr>
                                                    <th>ID</th>
                                                    <th>RFC</th>
                                                    <th>Nombre Empresa</th>
                                                    <th>Razon Social</th>
                                                    <th>Domicilio</th>
                                                    <th>N° exterior</th>
                                                    <th>Colonia</th>
                                                    <th>C.P</th>
                                                    <th>Municipio</th>
                                                    <th>Estado</th>
                                                    <th>Telefono</th>
                                                    <th>Correo electronico</th>
                                                    <th>Activo</th>
                                                    <th>Tipo Usuario</th>
                                                    <th>Acciones</th>
                                               </tr>
                                           </thead>
                                           <tbody id="tabla_peticion_dashboard">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primeroEmpresasPendientesDash">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anteriorEmpresasPendientesDash">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidadEmpresasPendientesDash">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguienteEmpresasPendientesDash">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimoEmpresasPendientesDash">Ultimo</div>
                                        </div>
                                   </div>
                               </div>
   
                            </div>
                           <!-- terminar seccion dasshboard -->
                           
                           <!-- empieza seccion ticket -->
                           <div class="seccion" id="contenedor_tickets">
                               <h1 class="titulo_seccion">Tickets</h1>
                               <div class="contador_seccion" id="contenedor_contador_tickets">
                                   <div id="c_boton_ticketsPendientes" class="seccion_contador" onclick="mostrarSeccionTickets(event);">
                                       <img src="../recursos/img/tickets_pendientes.png" id="imagen_ticketsPendientes" class="imagen_contador">
                                       <p id="parrafo_ticketsPendientes" class="parrafo_contador">Tickets Pendientes</p>
                                   </div>
                                   <div id="c_boton_ticketsNoResuelto" class="seccion_contador" onclick="mostrarSeccionTickets(event);">
                                       <img src="../recursos/img/tickets_cancelar.png" id="imagen_ticketsNoResuelto" class="imagen_contador">
                                       <p id="parrafo_ticketsNoResuelto" class="parrafo_contador">Tickets No Resueltos</p>
                                   </div>
   
                                   <div id="c_boton_ticketsResuelto" class="seccion_contador" onclick="mostrarSeccionTickets(event);">
                                       <img src="../recursos/img/ticket_resulto.png" id="imagen_ticketsResuelto" class="imagen_contador">
                                       <p id="parrafo_ticketsResuelto" class="parrafo_contador">Tickets Resueltos</p>
                                   </div>
                                   <div id="c_boton_ticketsAgergar" class="seccion_contador" onclick="mostrarSeccionTickets(event);">
                                       <img src="../recursos/img/agregar_tickets.png" id="imagen_ticketsAgergar" class="imagen_contador">
                                       <p id="parrafo_ticketsAgergar" class="parrafo_contador">Agregar Ticket</p>
                                   </div>
                               </div>
   
                               <div class="seccion_tickets" id="contenedor_contenido_ticketsPendientes">
                                   <h1 class="titulo_seccion">Listado de tickets pendientes</h1>
                                   <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de tickets</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_pendientes" onchange="tomar_datos_tickets_pendientes();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_pendiente(event);">       
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
                                       <div id="contenedor_tablas_peticiones">
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
                                           <tbody id="tabla_tickets_pendientes">
                                           </tbody>
                                       </table>
                                            <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_pendientes">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_pendientes">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_pendientes">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_pendientes">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_pendientes">Ultimo</div>
                                            </div>
                                        </div>
                                   </div>
                               </div>
                               <div class="seccion_tickets" id="contenedor_contenido_ticketsNoResueltos">
                                   <h1 class="titulo_seccion">Listado de tickets no resueltos</h1>
                                   <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de tickets</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_NoResuelto" onchange="tomar_datos_tickets_NoResuelto();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_NoResuelto(event);">       
                                                </div>      
                                            </div>
                                        </div>

                                   <div id="contenedor_tablas_tickets_seccion">
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
                                           <tbody id="tabla_tickets_NoResuelto">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primero_tickets_NoResuelto">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anterior_tickets_NoResuelto">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_NoResuelto">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_NoResuelto">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_NoResuelto">Ultimo</div>
                                        </div>
                                    </div>
                                </div>
                               <div class="seccion_tickets" id="contenedor_contenido_ticketsResueltos">
                                   <h1 class="titulo_seccion">Listado de tickets resueltos</h1>
                                   <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de tickets</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_tickets_Resuelto" onchange="tomar_datos_tickets_Resuelto();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_ticket_Resuelto(event);">       
                                                </div>      
                                            </div>
                                        </div>
                                        <div id="contenedor_tablas_ticketsNo">
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
                                           <tbody id="tabla_tickets_Resuelto">
                                           </tbody>
                                       </table>
                                       <div class="contenedor_paginador">
                                            <div class="controladores_paginador" id="boton_paginador_primero_tickets_Resuelto">Primero</div>
                                            <div class="controladores_paginador" id="boton_paginador_anterior_tickets_Resuelto">Anterior</div>
                                            <div class="controladores_paginador" id="boton_paginador_cantidad_tickets_Resuelto">1 de 1</div>
                                            <div class="controladores_paginador" id="boton_paginador_siguiente_tickets_Resuelto">Siguiente</div>
                                            <div class="controladores_paginador" id="boton_paginador_ultimo_tickets_Resuelto">Ultimo</div>
                                        </div>
                                    </div>   
                               </div>
                               <div class="seccion_tickets" id="contenedor_contenido_ticketsAgregarTicket">
                                   <h1 class="titulo_seccion">Agregar ticket</h1>
                                   <div class="contendor_from_tickets">
                                       <div class="agregarTickets" id="contenedo_nombre_ticket">
                                            <p>Nombre empresa:</p>
                                           <input type="text" id="input_nombreTicket" class="input_tickets" placeholder="Nombre Empresa" onkeydown="mostrar_nombre(event);">
                                           <div id="contendor_opciones_nombre">
                                               <p class="opcion_nombre">Nombre empmresa</p>
                                           </div>
                                           
                                       </div>
                                       <div class="agregarTickets1">
                                           <p>RFC Empresa:</p>
                                           <input type="text" id="input_RFCTicket" class="input_tickets" placeholder="RFC Empresa" disabled>
                                           </div>
                                           
                                   </div>
                                   <div class="contendor_from_tickets">
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
                                       <button class="boton" id="btn_agregar_ticket" onclick="agregar_ticket();">Dar de alta</button>
                                   </div>
                               </div>
                                   
                           </div>
                           <!-- terminar seccion tickets -->



                           <!-- empiexa contenedor Empresas -->
                               <div class="seccion" id="contenedor_empresas">
                               <h1 class="titulo_seccion">Empresas</h1>
                                   <div class="contador_seccion" id="contenedor_contador_empresas">
                                       <div id="c_boton_empresas_activas" class="seccion_contador" onclick="mostrarSeccionEmpresas(event);">
                                           <img src="../recursos/img/empresa_activa.png" id="imagen_empresas_activas" class="imagen_contador">
                                           <p id="parrafo_empresas_activas" class="parrafo_contador">Empresas Activas</p>
                                       </div>
                                       <div id="c_boton_empresa_noactiva" class="seccion_contador" onclick="mostrarSeccionEmpresas(event);">
                                           <img src="../recursos/img/empresa_baja.png" id="imagen_empresa_noactiva" class="imagen_contador">
                                           <p id="parrafo_empresa_noactiva" class="parrafo_contador">Empresas Bajas</p>
                                       </div>
   
                                       <div id="c_boton_peticion" class="seccion_contador" onclick="mostrarSeccionEmpresas(event);">
                                           <img src="../recursos/img/Peticion.png" id="imagen_peticion" class="imagen_contador">
                                           <p id="parrafo_peticion" class="parrafo_contador">Peticion Empresas</p>
                                       </div>
                                       <div id="c_boton_agregar_empresa" class="seccion_contador" onclick="mostrarSeccionEmpresas(event);">
                                           <img src="../recursos/img/empresa_agregar.png" id="imagen_agregar_empresa" class="imagen_contador">
                                           <p id="parrafo_agregar_empresa" class="parrafo_contador">Agregar Empresa</p>
                                       </div>
                                   </div>
                                   <div class="seccion_empresa" id="contenedor_empresas_activas">
                                       <h1 class="titulo_seccion">Listado de empresas activas</h1>

                                       <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de empresas</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_empresas_activas" onchange="tomar_datos_empresas();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_empresas(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>  
                                       <div id="contenedor_tabla_empresas_activas">
                                           <table class="tablas">
                                               <thead>
                                                   <tr>
                                                       <th>ID</th>
                                                       <th>RFC</th>
                                                       <th>Nombre Empresa</th>
                                                       <th>Razon Social</th>
                                                       <th>Domicilio</th>
                                                       <th>N° exterior</th>
                                                       <th>Colonia</th>
                                                       <th>C.P</th>
                                                       <th>Municipio</th>
                                                       <th>Estado</th>
                                                       <th>Telefono</th>
                                                       <th>Correo electronico</th>
                                                       <th>Activo</th>
                                                       <th>Tipo Usuario</th>
                                                       <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_empresas_activas">
                                               </tbody>
                                           </table>
                                           <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primeroEmpresas">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anteriorEmpresas">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidadEmpresas">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguienteEmpresas">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimoEmpresas">Ultimo</div>
                                            </div>
                                       </div>
                                   </div>
   
                                   <div class="seccion_empresa" id="contenedor_empresas_noactivas">
                                       <h1 class="titulo_seccion">Listado de empresas dadas de baja</h1>
                                        <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de empresas</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_empresas_noactivos" onchange="tomar_datos_empresas_noactivas();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_empresasNo(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>   
                                       <div id="contenedor_tabla_empresas_noactivas">
                                       <table class="tablas">
                                               <thead>
                                                   <tr>
                                                   <th>ID</th>
                                                       <th>RFC</th>
                                                       <th>Nombre Empresa</th>
                                                       <th>Razon Social</th>
                                                       <th>Domicilio</th>
                                                       <th>N° exterior</th>
                                                       <th>Colonia</th>
                                                       <th>C.P</th>
                                                       <th>Municipio</th>
                                                       <th>Estado</th>
                                                       <th>Telefono</th>
                                                       <th>Correo electronico</th>
                                                       <th>Activo</th>
                                                       <th>Tipo Usuario</th>
                                                       <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_empresas_noactivas">
                                               </tbody>
                                           </table>
                                           <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primeroEmpresasNo">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anteriorEmpresasNo">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidadEmpresasNo">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguienteEmpresasNo">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimoEmpresasNo">Ultimo</div>
                                            </div>
                                       </div>
                                   </div>
   
                                   <div class="seccion_empresa" id="contenedor_peticion_empresas">
                                       <h1 class="titulo_seccion">Peticion de empresas</h1>
                                        <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de peticiones</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_empresas_pendientes" onchange="tomar_datos_empresas_peticion();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_empresas_peticion(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>   
                                       <div id="contenedor_tabla_peticion_empresas">
                                       <table class="tablas">
                                               <thead>
                                                   <tr>
                                                       <th>ID</th>
                                                       <th>RFC</th>
                                                       <th>Nombre Empresa</th>
                                                       <th>Razon Social</th>
                                                       <th>Domicilio</th>
                                                       <th>N° exterior</th>
                                                       <th>Colonia</th>
                                                       <th>C.P</th>
                                                       <th>Municipio</th>
                                                       <th>Estado</th>
                                                       <th>Telefono</th>
                                                       <th>Correo electronico</th>
                                                       <th>Activo</th>
                                                       <th>Tipo Usuario</th>
                                                       <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_empresas_peticion">
                                               </tbody>
                                           </table>
                                           <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primeroEmpresasPendientes">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anteriorEmpresasPendientes">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidadEmpresasPendientes">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguienteEmpresasPendientes">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimoEmpresasPendientes">Ultimo</div>
                                            </div>
                                       </div>
                                   </div>
   
                                   <div class="seccion_empresa" id="contenedor_agregar_empresas">
                                       <h1 class="titulo_seccion">Agregar nueva empresa</h1>
                                       
                                        <div class="contenedor_general_formulario">
                                            <div class="contenedor_formulario1">
                                                    <input id="input_rfcEmpresa" type="text" class="input_text_empresa" placeholder="RFC" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <input id="input_nombreEmpresa" type="text" class="input_text_empresa"  placeholder="Nombre Empresa">
                                            </div>
                                        </div> 

                                        <div class="contenedor_general_formulario">
                                            <div class="contenedor_formulario1">
                                                <input id="input_razonsocialEmpresa" type="text" class="input_text_empresa" placeholder="Razon Social" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <input id="input_domicilioEmpresa" type="text" class="input_text_empresa"  placeholder="Domicilio">
                                            </div>
                                        </div>

                                            <div class="contenedor_general_formulario">
                                                <div class="contenedor_formulario1">
                                                    <input id="input_numerocalleEmpresa" type="text" class="input_text_empresa" placeholder="N° Ext Calle" value="">
                                                </div>        
                                                <div class="contenedor_formulario2">
                                                    <input id="input_coloniaEmpresa" type="text" class="input_text_empresa"  placeholder="Colonia">
                                                </div>
                                            </div>

                                            <div class="contenedor_general_formulario">
                                                <div class="contenedor_formulario1">
                                                    <input id="input_cpEmpresa" type="text" class="input_text_empresa" placeholder="Codigo Postal" value="">
                                                </div>        
                                                <div class="contenedor_formulario2">
                                                    <input id="input_municipioEmpresa" type="text" class="input_text_empresa"  placeholder="Municipio">
                                                </div>
                                            </div> 

                                            <div class="contenedor_general_formulario">
                                                <div class="contenedor_formulario1">
                                                    <input id="input_estadoEmpresa" type="text" class="input_text_empresa" placeholder="Estado" value="">
                                                </div>        
                                                <div class="contenedor_formulario2">
                                                    <input id="input_telefonoEmpresa" type="text" class="input_text_empresa"  placeholder="Telefono">
                                                </div>
                                            </div>

                                            <div class="contenedor_general_formulario">
                                                <div class="contenedor_formulario1">
                                                    <input id="input_correoEmpresa" type="text" class="input_text_empresa" placeholder="Correo" value="">
                                                </div>        
                                                <div class="contenedor_formulario2">
                                                    <input id="input_contrasenaEmpresa" type="text" class="input_text_empresa"  placeholder="Contraseña ">
                                                </div>
                                            </div>
                                            
                                            <div class="contenedor_formulario_agregar">
                                                <button class="boton" id="boton_agrega_empresa_dash" onclick="agregar_empresa_dashboard()">Agregar Empresa</button>
                                            </div>
                                   </div>
                               </div>
                           <!-- terminar contenedor Empresas -->   
                           <!-- empieza contenedor Empleado -->
                           <div class="seccion" id="contenedor_empleado">
                                   <h1 class="titulo_seccion">Empleados</h1>
                                   <div class="contador_seccion" id="contenedor_contador_empleado">
                                       <div id="c_boton_empleado_activo" class="seccion_contador" onclick="mostrarSeccionEmpleado(event);">
                                           <img src="../recursos/img/empleadoactivo.png" id="imagen_empleado_activo" class="imagen_contador">
                                           <p id="parrafo_empleado_activo" class="parrafo_contador">Empleados Activos</p>
                                       </div>
                                       <div id="c_boton_empleado_noactivo" class="seccion_contador" onclick="mostrarSeccionEmpleado(event);">
                                           <img src="../recursos/img/empleadobaja.png" id="imagen_empleado_noactivo" class="imagen_contador">
                                           <p id="parrafo_empleado_noactivo" class="parrafo_contador">Empleados baja</p>
                                       </div>
   
                                       <div id="c_boton_empleado_agregar" class="seccion_contador" onclick="mostrarSeccionEmpleado(event);">
                                           <img src="../recursos/img/agregarempleado.png" id="imagen_empleado_agregar" class="imagen_contador">
                                           <p id="parrafo_empleado_agregar" class="parrafo_contador">Agregar Empleado</p>
                                       </div>
                                   </div>
   
                                   <div class="seccion_empleado" id="contenedor_empleado_activas">
                                       <h1 class="titulo_seccion">Listado de empleados activos</h1>
                                       <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de empleados</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_empleados_activos" onchange="tomar_datos_empleado();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_empleado(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>
   
                                       <div id="contenedor_tabla_empleado_activas">
                                           <table class="tablas" id="tabla_empleado_activa">
                                               <thead>
                                                   <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido Paterno</th>
                                                    <th>Apellido Materno </th>
                                                    <th>Domicilio</th>
                                                    <th>N° Ext</th>
                                                    <th>Colonia</th>
                                                    <th>Telefono</th>
                                                    <th>Puesto</th>
                                                    <th>Correo</th>
                                                    <th>Estatus</th>
                                                    <th>Tipo Empleado</th>
                                                    <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_empleado_activo">
                                               </tbody>
                                            </table>
                                            <div class="contenedor_paginador">
                                                    <div class="controladores_paginador" id="boton_paginador_primero">Primero</div>
                                                    <div class="controladores_paginador" id="boton_paginador_anterior">Anterior</div>
                                                    <div class="controladores_paginador" id="boton_paginador_cantidad">1 de 1</div>
                                                    <div class="controladores_paginador" id="boton_paginador_siguiente">Siguiente</div>
                                                    <div class="controladores_paginador" id="boton_paginador_ultimo">Ultimo</div>
                                            </div>
                                       </div>
                                   </div>
                                   <div class="seccion_empleado" id="contenedor_empleado_noactivo">
                                       <h1 class="titulo_seccion">Listado de empleados dados de baja</h1>
                                       <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de empleados</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_empleados_noactivos" onchange="tomar_datos_empleado_noactivos();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_empleadoNO(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>  
                                       <div id="contenedor_tabla_empleado_noactivo">
                                            <table class="tablas">
                                               <thead>
                                                   <tr>
                                                   <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido Paterno</th>
                                                    <th>Apellido Materno </th>
                                                    <th>Domicilio</th>
                                                    <th>N° Ext</th>
                                                    <th>Colonia</th>
                                                    <th>Telefono</th>
                                                    <th>Puesto</th>
                                                    <th>Correo</th>
                                                    <th>Estatus</th>
                                                    <th>Tipo Empleado</th>
                                                    <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_empleado_noactivo">
                                               </tbody>
                                            </table>
                                            <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primeroNo">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anteriorNo">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidadNo">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguienteNo">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimoNo">Ultimo</div>
                                            </div>
                                        </div>
                                    </div>
                               
                                   
                                    <div class="seccion_empleado" id="contenedor_form_agregar_empleado">
                                       <h1 class="titulo_seccion">Agregar Empleados</h1>
                                       <div class="contenedor_general_formulario">

                                        <div class="contenedor_formulario1">
                                                <input id="input_nombre_empleado" type="text" class="input_text_empleado" placeholder="Nombre Empleado" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <input id="input_apellidoP_empleado" type="text" class="input_text_empleado" placeholder="Apellido Paterno Empleado" value="">
                                            </div>
                                        </div>                                        
                                        <div class="contenedor_general_formulario">
                                        
                                            <div class="contenedor_formulario1">
                                                <input id="input_apellidoM_empleado" type="text" class="input_text_empleado" placeholder="Apellido Materno Empleado" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <input id="input_domicilo_empleado" type="text" class="input_text_empleado" placeholder="Domicilio Empleado" value="">
                                            </div>
                                        </div>

                                        <div class="contenedor_general_formulario">
                                            <div class="contenedor_formulario1">
                                                <input id="input_numero_exterior_empleado" type="text" class="input_text_empleado" placeholder="N° exterior" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <input id="input_colonia_empleado" type="text" class="input_text_empleado" placeholder="Colonia" value="">
                                            </div>
                                        </div>
                                        
                                        <div class="contenedor_general_formulario">
                                            <div class="contenedor_formulario1">
                                                <input id="input_telefono_empleado" type="text" class="input_text_empleado" placeholder="Telefono Empleado" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <select id="input_puesto_empleado" class="input_text_empleado">
                                                    <option selected>Seleccione el puesto...</option>
                                                    <option value="ADMINISTRACION">Administracion</option>
                                                    <option value="GERENCIA">Gerencia</option>
                                                    <option value="INFRAESTRUCTURA">Infraestructura</option>
                                                    <option value="CONTABILIDAD">Contabilidad</option>
                                                    <option value="SOPORTE TECNICO">Soporte Tenico</option>
                                                </select>
                                            </div>
                                        </div> 
                                        
                                        <div class="contenedor_general_formulario">
                                            <div class="contenedor_formulario1">
                                                <input id="input_correo_empleado" type="text" class="input_text_empleado" placeholder="Correo Empleado" value="">
                                            </div>        
                                            <div class="contenedor_formulario2">
                                                <input id="input_contrasena_empleado" type="text" class="input_text_empleado" placeholder="Contraseña Empleado" value="">
                                            </div>
                                        </div>
                                           <div class="contenedor_formulario_agregar">
                                               <button class="boton" id="boton_agrega_empleado" onclick="agregar_empleado()">Agregar Empleado</button>
                                           </div>
                                        
                                        </div>
                                    </div>    
                           <!-- terminar contenedor Empresas -->
                           <div class="seccion" id="contenedor_administradores">
                                   <h1 class="titulo_seccion">Administradores</h1>

                                   <div class="contador_seccion" id="contenedor_contador_administradores">
                                       <div id="c_boton_administradores_activo" class="seccion_contador" onclick="mostrarSeccionAdministradores(event);">
                                           <img src="../recursos/img/activo.png" id="imagen_administradores_activo" class="imagen_contador">
                                           <p id="parrafo_administradores_activo" class="parrafo_contador">Administradores activos</p>
                                       </div>
                                       <div id="c_boton_administradores_noactivos" class="seccion_contador" onclick="mostrarSeccionAdministradores(event);">
                                           <img src="../recursos/img/empleadobaja.png" id="imagen_administradores_noactivos" class="imagen_contador">
                                           <p id="parrafo_administradores_noactivos" class="parrafo_contador">Administradores baja</p>
                                       </div>
   
                                       <div id="c_boton_administradores_agregar" class="seccion_contador" onclick="mostrarSeccionAdministradores(event);">
                                           <img src="../recursos/img/agregarempleado.png" id="imagen_administradores_agregar" class="imagen_contador">
                                           <p id="parrafo_administradores_agregar" class="parrafo_contador">Agregar administrador</p>
                                       </div>
                                   </div>
   
                                   <div class="seccion_administradores" id="contenedor_administradores_activos">
                                       <h1 class="titulo_seccion">Listado de administradores activos</h1>
                                       <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de administradores</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_administradores_activos" onchange="tomar_datos_administradores();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..." onkeypress="buscar_adn(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>  
                                       <div id="contenedor_tabla_administradores_activo">
                                           <table class="tablas">
                                               <thead>
                                                   <tr>
                                                   <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido Paterno</th>
                                                    <th>Apellido Materno </th>
                                                    <th>Domicilio</th>
                                                    <th>N° Ext</th>
                                                    <th>Colonia</th>
                                                    <th>Telefono</th>
                                                    <th>Puesto</th>
                                                    <th>Correo</th>
                                                    <th>Estatus</th>
                                                    <th>Tipo Empleado</th>
                                                    <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_administradores_activo">
                                               </tbody>
                                            </table>
                                            <div class="contenedor_paginador">
                                                    <div class="controladores_paginador" id="boton_paginador_primeroAdmin">Primero</div>
                                                    <div class="controladores_paginador" id="boton_paginador_anteriorAdmin">Anterior</div>
                                                    <div class="controladores_paginador" id="boton_paginador_cantidadAdmin">1 de 1</div>
                                                    <div class="controladores_paginador" id="boton_paginador_siguienteAdmin">Siguiente</div>
                                                    <div class="controladores_paginador" id="boton_paginador_ultimoAdmin">Ultimo</div>
                                            </div>
                                       </div>
                                   </div>
                                   
                                   <div class="seccion_administradores" id="contenedor_administradores_noactivos">
                                       <h1 class="titulo_seccion">Listado de administradores dados de baja</h1>
                                       <div class="contenedor_busqueda">
                                            <div class="cantidad_lista">
                                                <div class="lista1">
                                                    <p class="titulo_cantidad">Cantidad de administradores</p>
                                                </div>
                                                <div class="lista2">
                                                    <select name="" class="select_cantidad" id="cantidad_administradores_noactivos" onchange="tomar_datos_administradores_noactivos();"> 
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
                                                    <input type="text" class="input_barra_buscadora" placeholder="Buscar..."  onkeypress="buscar_AdnNO(event);">       
                                                </div>    
                                                    
                                            </div>
                                        </div>  
                                        
                                       <div id="contenedor_tabla_administradores_noactivo">
                                            <table class="tablas">
                                               <thead>
                                                   <tr>
                                                   <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido Paterno</th>
                                                    <th>Apellido Materno </th>
                                                    <th>Domicilio</th>
                                                    <th>N° Ext</th>
                                                    <th>Colonia</th>
                                                    <th>Telefono</th>
                                                    <th>Puesto</th>
                                                    <th>Correo</th>
                                                    <th>Estatus</th>
                                                    <th>Tipo Empleado</th>
                                                    <th>Acciones</th>
                                                   </tr>
                                               </thead>
                                               <tbody id="tabla_administradores_noactivo">
                                               </tbody>
                                            </table>
                                            <div class="contenedor_paginador">
                                                <div class="controladores_paginador" id="boton_paginador_primeroAdminNo">Primero</div>
                                                <div class="controladores_paginador" id="boton_paginador_anteriorAdminNo">Anterior</div>
                                                <div class="controladores_paginador" id="boton_paginador_cantidadAdminNo">1 de 1</div>
                                                <div class="controladores_paginador" id="boton_paginador_siguienteAdminNo">Siguiente</div>
                                                <div class="controladores_paginador" id="boton_paginador_ultimoAdminNo">Ultimo</div>
                                            </div>
                                        </div>
                                    </div>
                               
                                   
                                    <div class="seccion_administradores" id="contenedor_administradores_agregar">
                                       <h1 class="titulo_seccion">Agregar nuevo administrador</h1>
                                       <div id="contenedor_general_agregar_administrador">
                                            <div class="contenedor_general_formulario_administrador">
                                                    <div class="contenedor_formulario_admin1">
                                                        <input id="input_nombre_administrador" type="text" class="input_text_administrador" placeholder="Nombre" value="">
                                                    </div>        
                                                    <div class="contenedor_formulario_admin2">
                                                        <input id="input_apellidoP_administrador" type="text" class="input_text_administrador" placeholder="Apellido Paterno" value="">
                                                    </div>
                                                </div>
                                                <div class="contenedor_general_formulario_administrador">
                                                    <div class="contenedor_formulario_admin1">
                                                        <input id="input_apellidoM_administrador" type="text" class="input_text_administrador" placeholder="Apellido Materno" value="">
                                                    </div>
                                                    <div class="contenedor_formulario_admin2">
                                                        <input id="input_domicilo_administrador" type="text" class="input_text_administrador" placeholder="Domicilio" value="">
                                                    </div>
                                                </div>    
                                                <div class="contenedor_general_formulario_administrador">  
                                                    <div class="contenedor_formulario_admin1">
                                                        <input id="input_numero_exterior_administrador" type="text" class="input_text_administrador" placeholder="N° exterior" value="">
                                                    </div>
                                                    <div class="contenedor_formulario_admin2">
                                                        <input id="input_colonia_administrador" type="text" class="input_text_administrador" placeholder="Colonia" value="">
                                                    </div>        
                                                </div>
                                                <div class="contenedor_general_formulario_administrador">
                                                    <div class="contenedor_formulario_admin1">
                                                        <input id="input_telefono_administrador" type="text" class="input_text_administrador" placeholder="Telefono" value="">
                                                    </div>        
                                                    <div class="contenedor_formulario_admin2">
                                                        <select id="input_puesto_administrador" class="input_text_administrador">
                                                            <option selected>Seleccione el puesto...</option>
                                                            <option value="ADMINISTRACION">Administracion</option>
                                                            <option value="GERENCIA">Gerencia</option>
                                                            <option value="INFRAESTRUCTURA">Infraestructura</option>
                                                            <option value="CONTABILIDAD">Contabilidad</option>
                                                            <option value="SOPORTE TECNICO">Soporte Tenico</option>
                                                        </select>
                                                    </div>
                                                </div> 
                                                
                                                <div class="contenedor_general_formulario_administrador">
                                                    <div class="contenedor_formulario_admin1">
                                                        <input id="input_correo_administrador" type="text" class="input_text_administrador" placeholder="Correo" value="">
                                                    </div>        
                                                    <div class="contenedor_formulario_admin2">
                                                        <input id="input_contrasena_administrador" type="text" class="input_text_administrador" placeholder="Contraseña" value="">
                                                    </div>
                                                </div>
                                                <div class="contenedor_formulario_agregar">
                                                    <button class="boton" id="boton_agrega_administrador" onclick="agregar_administrador()">Agrega nuevo administrador</button>
                                                </div>
                                            </div>

                                       </div>
                                    </div>
                                                
                                    <div id="contenedor_cambio_contrasena" class="seccion">
                                        <div id="contenedor_formulario_cambio_contrasena">
                                            <h1 class="titulo_seccion">Cambio de contraseña</h1>
                                            <!-- <div class="cambio_contrasena">
                                                <p>Ingrese la contrasena actual</p>
                                                <input type="password" id="input_contrasena_actual" class="input_cambio_contrasena" placeholder="Contraseña actual">
                                            </div> -->
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
   
       <script src="../recursos/js/funcionesPrincipal.js"></script>
       <script src="../recursos/js/paginadorPrincipal.js"></script>

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

