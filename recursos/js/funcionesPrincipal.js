// ########################################################
// ignorar este fragmento de codigo hasta nuevo aviso
// ########################################################
// //console.log(contenedores)
// class Ajax {
//     constructor(url, metodo, data) {
//         this.respuesta;
//         this.url = url;
//         this.data = data;
//         this.metodo = metodo;

//         let metodo_final = this.metodo.toUpperCase();
//         var ajax = new XMLHttpRequest();
//         ajax.open(metodo_final, this.url);
//         // ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
//         ajax.send(this.data);   
//         ajax.onreadystatechange = function () {
//             if (ajax.readyState == 4) {
//                 if (ajax.status == 200) {
//                     //console.log("200 Respuesta Exitosa");
//                     this.respuesta = ajax.responseText
//                 }
//                 if (ajax.status == 400) {
//                     //console.log("400 El servidor no entendió la petición");
//                 }
//                 if (ajax.status == 404) {
//                     //console.log("404 Página no encontrada");
//                 }
//                 if (ajax.status == 500) {
//                     //console.log("500 Error interno de servidor");
//                 }
//             }
//             else {
//                 //console.log("conectando...");
//             }
//         };
//         this.listo = function ()
//         {
//             //console.log( this.respuesta)
//             return this.respuesta
//         }
//     }   
// }

// ########################################################
// ignorar este fragmento de codigo hasta nuevo aviso
// ########################################################


var navegador = window.navigator.vendor || window.navigator.userAgent


var info_cookie

window.onload= function()
{
    if(navegador.includes("Mozilla"))
    {
        let elemento_cookie = document.getElementById("info-cookies")
        let cookies = elemento_cookie.value
        //console.log(cookies)
        info_cookie = cookies
        mostrarVista(cookies)
    }
    if(navegador.includes("Google"))
    {
        let elemento_cookie = document.getElementById("info-cookies")
        let cookies = elemento_cookie.value
        //console.log(cookies)
        info_cookie = cookies
        mostrarVista(cookies)
    }
}


function limpiar_formulario_empleado()
{
    let elementos = document.querySelectorAll(".input_text_empleado")
    for(let i =0; i<elementos.length;i++)
    {
        elementos[i].value=""
    }
}
function limpiar_formulario_empresas()
{
    let elementos = document.querySelectorAll(".input_text_empresa")
    for(let i =0; i<elementos.length;i++)
    {
        elementos[i].value=""
    }
}
function limpiar_formulario_adn()
{
    let elementos = document.querySelectorAll(".input_text_administrador")
    for(let i =0; i<elementos.length;i++)
    {
        elementos[i].value=""
    }
}

function limpiar_formulario_ticket()
{
    let elementos = document.querySelectorAll(".input_tickets")
    for(let i =0; i<elementos.length;i++)
    {
        elementos[i].value=""
    }
}


// crear cookie

function crearCookie(metodo,url,datos)
{
    let ajax = new XMLHttpRequest()

       ajax.open(metodo,url)

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    // respuesta = ajax.responseText
                    // return respuesta
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) 
                {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
}

//Variables para desplazamiento del menus

let contenedores = document.querySelectorAll(".seccion")
let contenedor_dashboard= document.querySelectorAll(".seccion_tabla")
let contenedores_tickets = document.querySelectorAll(".seccion_tickets")
let contenedores_empresas = document.querySelectorAll(".seccion_empresa")
let contenedores_empleado = document.querySelectorAll(".seccion_empleado")
let contenedores_inicio_sesion = document.querySelectorAll(".seccion_empleado")
let contenedores_administradores = document.querySelectorAll(".seccion_administradores")



//INICIO DESPLAZAMIENTO ENTRE MENUS
//Ocultar secciones del menu 
function ocultarSecciones()
{
    for(let i = 0; i<contenedores.length;i++)
    {
        contenedores[i].style.display="none";
    }
}

//Mostrar secciones del menu 
function mostrarVista(elemento)
{
    ocultarSecciones()
    let contenedor = document.getElementById(elemento)
    contenedor.style.display="flex"

    if(elemento=="contenedor_dashboard")
    {
        tomar_datos_tickets_pendientes_dashboard();    
    }
    if(elemento=="contenedor_tickets")
    {
        tomar_datos_tickets_pendientes();
    }
    if(elemento=="contenedor_empresas")
    {
        tomar_datos_empresas();
    }
    if(elemento=="contenedor_empleado")
    {
        tomar_datos_empleado();
    }
    if(elemento=="contenedor_administradores")
    {
        tomar_datos_administradores();
    }
    
}

// mostrarVista(contenedores[0])



//Desplazamiento secciones del menu en pagina principal 
function mostrarSeccion(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexDashboard = /dashboard/
    let regexTicket = /ticket/
    let regexEmpresa = /empresas/
    let regexEmpleado = /empleado/
    let regexAdministrador = /administrador/
    let regexContrasena = /contrasena/
    // //console.log(navegador)

    ////console.log(identificador)
    if(regexDashboard.test(identificador))
    {
        // //console.log("coincide dashboard")
        let nombre_elemento = "contenedor_dashboard"
        mostrarVista(nombre_elemento)
        tomar_datos_tickets_pendientes_dashboard()
        info_cookie = nombre_elemento

        // alert("Es mozilla")
        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)

        
    }
    if(regexTicket.test(identificador))
    {
        // //console.log("coincide ticket")
        let nombre_elemento = "contenedor_tickets"
        mostrarVista(nombre_elemento)
        tomar_datos_tickets_pendientes()
        info_cookie = nombre_elemento
        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)
    }
    if(regexEmpresa.test(identificador))
    {
        ////console.log("coincide empresa")
        let nombre_elemento = "contenedor_empresas"
        mostrarVista(nombre_elemento)
        tomar_datos_empresas()
        info_cookie = nombre_elemento
        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)
        
    }
    if(regexEmpleado.test(identificador))
    {
        ////console.log("coincide empleado")
        let nombre_elemento = "contenedor_empleado"
        mostrarVista(nombre_elemento)
        
        tomar_datos_empleado()
        info_cookie = nombre_elemento

        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)
    }
    if(regexAdministrador.test(identificador))
    {
        ////console.log("coincide empleado")
        let nombre_elemento = "contenedor_administradores"
        mostrarVista(nombre_elemento)
        tomar_datos_administradores()
        info_cookie = nombre_elemento

        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)

    }
    if(regexContrasena.test(identificador))
    {
        ////console.log("coincide contrasena")
        let nombre_elemento = "contenedor_cambio_contrasena"
        mostrarVista(nombre_elemento)
        info_cookie = nombre_elemento
        
        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)
    }
}

/////TERMINO DESPLAZAMIENTO ENTRE MENUS



///INICIO DESPLAZAMIENTO OPCIONES DEL DASHBOARD
//Ocultar secciones del dashboard  
function ocultarSeccionesDashboard()
{
    
    for(let i =0;i<contenedor_dashboard.length;i++)
    {
        contenedor_dashboard[i].style.display="none"
    }

}

//Mostrar secciones del dashboard 
function mostrarVistaDashboard(elemento)
{
    ocultarSeccionesDashboard()
    let contenedor_dashboard = document.getElementById(elemento)
    contenedor_dashboard.style.display="flex"
}

function mostrarSeccionDashboard(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexPendiente = /pendiente/

    let regexPeticion = /peticion/

    ////console.log(identificador)
    if(regexPendiente.test(identificador))
    {
        ////console.log("coincide pendiente")
        let nombre_elemento = "contenedor_tickets_pendientes"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_tickets_pendientes_dashboard()
    }
    
    if(regexPeticion.test(identificador))
    {
        //console.log("coincide peticiones")
        let nombre_elemento = "contenedor_peticion"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_empresas_peticion_dashboard()
        
    }

}
///TERMINO DESPLAZAMIENTO OPCIONES DEL DASHBOARD

//INICIO DESPLAZAMIENTO ENTRE TICKETS

//Ocultar secciones del menu 
function ocultarSeccionesTickets()
{
    for(let i = 0; i<contenedores_tickets.length;i++)
    {
        contenedores_tickets[i].style.display="none";
    }
}
//Mostrar secciones del menu 
function mostrarVistaTickets(elemento)
{
    ocultarSeccionesTickets()
    let contenedor = document.getElementById(elemento)
    contenedor.style.display="flex"
}

// mostrarVista(contenedores[0])
//Desplazamiento secciones del menu en pagina principal 
function mostrarSeccionTickets(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexTicketsPendientes = /ticketsPendientes/
    let regexTicketsNoResueltos = /ticketsNoResuelto/
    let regexTicketsResueltos = /ticketsResuelto/
    let regexTicketsAgregar = /ticketsAgergar/ 
    ////console.log(identificador)
    if(regexTicketsPendientes.test(identificador))
    {
        ////console.log("coincide dashboard")
        let nombre_elemento = "contenedor_contenido_ticketsPendientes"
        mostrarVistaTickets(nombre_elemento)
        tomar_datos_tickets_pendientes()
    }
    if(regexTicketsNoResueltos.test(identificador))
    {
        ////console.log("coincide ticket")
        let nombre_elemento = "contenedor_contenido_ticketsNoResueltos"
        mostrarVistaTickets(nombre_elemento)
        tomar_datos_tickets_NoResuelto()
    }
    if(regexTicketsResueltos.test(identificador))
    {
        ////console.log("coincide empresa")
        let nombre_elemento = "contenedor_contenido_ticketsResueltos"
        mostrarVistaTickets(nombre_elemento)
        tomar_datos_tickets_Resuelto()

    }
    if(regexTicketsAgregar.test(identificador))
    {
        ////console.log("coincide empleado")
        let nombre_elemento = "contenedor_contenido_ticketsAgregarTicket"
        mostrarVistaTickets(nombre_elemento)
    }
}

/////TERMINO DESPLAZAMIENTO ENTRE TICKETS




//INICIO DESPLAZAMIENTO ENTRE EMPRESAS
//Ocultar secciones del menu 
function ocultarSeccionesEmpresas()
{
    for(let i = 0; i<contenedores_empresas.length;i++)
    {
        contenedores_empresas[i].style.display="none";
    }
}
//Mostrar secciones del menu 
function mostrarVistaEmpresas(elemento)
{
    ocultarSeccionesEmpresas()
    let contenedor = document.getElementById(elemento)
    contenedor.style.display="flex"
}

// mostrarVista(contenedores[0])
//Desplazamiento secciones del menu en pagina principal 
function mostrarSeccionEmpresas(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexEmpresaActiva = /activa/
    let regexEmpresaNoActiva = /noactiva/
    let regexPeticionEmpresa = /peticion/
    let regexEmpresaAgregar = /agregar/ 
    ////console.log(identificador)
    if(regexEmpresaActiva.test(identificador))
    {
        // //console.log("coincide dashboard")
        let nombre_elemento = "contenedor_empresas_activas"
        mostrarVistaEmpresas(nombre_elemento)
        tomar_datos_empresas()
    }
    if(regexEmpresaNoActiva.test(identificador))
    {
        // //console.log("coincide ticket")
        let nombre_elemento = "contenedor_empresas_noactivas"
        mostrarVistaEmpresas(nombre_elemento)
        tomar_datos_empresas_noactivas()
    }
    if(regexPeticionEmpresa.test(identificador))
    {
        ////console.log("coincide empresa")
        let nombre_elemento = "contenedor_peticion_empresas"
        mostrarVistaEmpresas(nombre_elemento)
        tomar_datos_empresas_peticion()
    }
    if(regexEmpresaAgregar.test(identificador))
    {
        ////console.log("coincide empleado")
        let nombre_elemento = "contenedor_agregar_empresas"
        mostrarVistaEmpresas(nombre_elemento)
    }
}

/////TERMINO DESPLAZAMIENTO ENTRE EMPRESA





//INICIO DESPLAZAMIENTO ENTRE Empleado
//Ocultar secciones del menu 
function ocultarSeccionesEmpleado()
{
    for(let i = 0; i<contenedores_empleado.length;i++)
    {
        contenedores_empleado[i].style.display="none";
    }
}
//Mostrar secciones del menu 
function mostrarVistaEmpleado(elemento)
{
    ocultarSeccionesEmpleado()
    let contenedor = document.getElementById(elemento)
    contenedor.style.display="flex"
}

// mostrarVista(contenedores[0])
//Desplazamiento secciones del menu en pagina principal 
function mostrarSeccionEmpleado(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexEmpleadoActiva = /activo/
    let regexEmpleadoNoActiva = /noactivo/
    let regexEmpleadoAgregar = /agregar/ 
    ////console.log(identificador)
    if(regexEmpleadoActiva.test(identificador))
    {
        // //console.log("coincide dashboard")
        let nombre_elemento = "contenedor_empleado_activas"
        mostrarVistaEmpleado(nombre_elemento)
        tomar_datos_empleado()
    }
    if(regexEmpleadoNoActiva.test(identificador))
    {
        // //console.log("coincide ticket")
        let nombre_elemento = "contenedor_empleado_noactivo"
        mostrarVistaEmpleado(nombre_elemento)
        tomar_datos_empleado_noactivos()
    }
    if(regexEmpleadoAgregar.test(identificador))
    {
        ////console.log("coincide empresa")
        let nombre_elemento = "contenedor_form_agregar_empleado"
        mostrarVistaEmpleado(nombre_elemento)
    }
}

/////TERMINO DESPLAZAMIENTO ENTRE EMPRESA


//INICIO DESPLAZAMIENTO ENTRE Administradores
//Ocultar secciones del menu 
function ocultarSeccionesAdministradores()
{
    for(let i = 0; i<contenedores_administradores.length;i++)
    {
        contenedores_administradores[i].style.display="none";
    }
}
//Mostrar secciones del menu 
function mostrarVistaAdministradores(elemento)
{
    ocultarSeccionesAdministradores()
    let contenedor = document.getElementById(elemento)
    contenedor.style.display="flex"
}

// mostrarVista(contenedores[0])
//Desplazamiento secciones del menu en pagina principal 
function mostrarSeccionAdministradores(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexAdministradoresActiva = /activo/
    let regexAdministradoresNoActiva = /noactivos/
    let regexAdministradoresAgregar = /agregar/ 
    //console.log(identificador)
    if(regexAdministradoresActiva.test(identificador))
    {
        // //console.log("coincide dashboard")
        let nombre_elemento = "contenedor_administradores_activos"
        mostrarVistaAdministradores(nombre_elemento)
        tomar_datos_administradores()
    }
    if(regexAdministradoresNoActiva.test(identificador))
    {
        // //console.log("coincide ticket")
        let nombre_elemento = "contenedor_administradores_noactivos"
        mostrarVistaAdministradores(nombre_elemento)
        tomar_datos_administradores_noactivos()
    }
    if(regexAdministradoresAgregar.test(identificador))
    {
        ////console.log("coincide empresa")
        let nombre_elemento = "contenedor_administradores_agregar"
        mostrarVistaAdministradores(nombre_elemento)
    }
}

/////TERMINO DESPLAZAMIENTO ENTRE EMPRESA

///Formulario agrega Empleado en dashboard admin
var boton_agrega_empleado = document.getElementById("boton_agrega_empleado")

function agregar_empleado()
{
    
    var input_nombre_empleado = document.getElementById("input_nombre_empleado").value.trim()
    var input_apellidoP_empleado = document.getElementById("input_apellidoP_empleado").value.trim()
    var input_apellidoM_empleado = document.getElementById("input_apellidoM_empleado").value.trim()
    var input_domicilo_empleado = document.getElementById("input_domicilo_empleado").value.trim()
    var input_numero_exterior_empleado = document.getElementById("input_numero_exterior_empleado").value.trim()
    var input_colonia_empleado = document.getElementById("input_colonia_empleado").value.trim()
    var input_telefono_empleado = document.getElementById("input_telefono_empleado").value
    var input_puesto_empleado = document.getElementById("input_puesto_empleado").value.trim()
    var input_correo_empleado = document.getElementById("input_correo_empleado").value.trim()
    var input_contrasena_empleado = document.getElementById("input_contrasena_empleado").value.trim()


    if( input_nombre_empleado.length==0 || 
        input_apellidoP_empleado.length ==0 || 
        input_apellidoM_empleado.length==0 || 
        input_domicilo_empleado.length==0 || 
        input_numero_exterior_empleado.length==0 || 
        input_colonia_empleado.length==0 || 
        input_telefono_empleado.length==0 ||  
        input_puesto_empleado.length==0 ||
        input_correo_empleado.length==0 ||
        input_contrasena_empleado.length==0) 
    {
        dialogo("Los campos se encuentran vacio, favor de ingresar todos los datos...")
    }
    else
    {
       let datos = new FormData()

       datos.append("nombreEmpleado",input_nombre_empleado)
       datos.append("apellidopEmpleado",input_apellidoP_empleado)
       datos.append("apellidomEmpleado",input_apellidoM_empleado)
       datos.append("domicilioEmpleado",input_domicilo_empleado)
       datos.append("numeroextEmpleado",input_numero_exterior_empleado)
       datos.append("coloniaEmpleado",input_colonia_empleado)
       datos.append("telefonoEmpleado",input_telefono_empleado)
       datos.append("puestoEmpleado",input_puesto_empleado)
       datos.append("correoEmpleado",input_correo_empleado)
       datos.append("contrasenaEmpleado",input_contrasena_empleado)


    //    //console.log(select_tipo_empleado)
    //    //console.log("-------")

       let ajax = new XMLHttpRequest()

       ajax.open("POST","../controlador/agregar_empleado.php")

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    limpiar_formulario_empleado()
                    dialogo(ajax.responseText)
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
    }
}

///Formulario agrega Empleado en dashboard admin
var boton_agrega_administrador = document.getElementById("boton_agrega_administrador")

function agregar_administrador()
{
    
    var input_nombre_administrador = document.getElementById("input_nombre_administrador").value.trim()
    var input_apellidoP_administrador = document.getElementById("input_apellidoP_administrador").value.trim()
    var input_apellidoM_administrador = document.getElementById("input_apellidoM_administrador").value.trim()
    var input_domicilo_administrador = document.getElementById("input_domicilo_administrador").value.trim()
    var input_numero_exterior_administrador = document.getElementById("input_numero_exterior_administrador").value.trim()
    var input_colonia_administrador = document.getElementById("input_colonia_administrador").value.trim()
    var input_telefono_administrador = document.getElementById("input_telefono_administrador").value.trim()
    var input_puesto_administrador = document.getElementById("input_puesto_administrador").value
    var input_correo_administrador = document.getElementById("input_correo_administrador").value.trim()
    var input_contrasena_administrador = document.getElementById("input_contrasena_administrador").value.trim()


    if( input_nombre_administrador.length==0 || 
        input_apellidoP_administrador.length ==0 || 
        input_apellidoM_administrador.length==0 || 
        input_domicilo_administrador.length==0 || 
        input_numero_exterior_administrador.length==0 || 
        input_colonia_administrador.length==0 || 
        input_telefono_administrador.length==0 ||  
        input_puesto_administrador.length==0 ||
        input_correo_administrador.length==0 ||
        input_contrasena_administrador.length==0) 
    {
        dialogo("Los campos se encuentran vacio, favor de ingresar todos los datos...")
    }
    else
    {
       let datos = new FormData()

       datos.append("nombreAdministrador",input_nombre_administrador)
       datos.append("apellidopAdministrador",input_apellidoP_administrador)
       datos.append("apellidomAdministrador",input_apellidoM_administrador)
       datos.append("domicilioAdministrador",input_domicilo_administrador)
       datos.append("numeroextAdministrador",input_numero_exterior_administrador)
       datos.append("coloniaAdministrador",input_colonia_administrador)
       datos.append("telefonoAdministrador",input_telefono_administrador)
       datos.append("puestoAdministrador",input_puesto_administrador)
       datos.append("correoAdministrador",input_correo_administrador)
       datos.append("contrasenaAdministrador",input_contrasena_administrador)


    //    //console.log(select_tipo_empleado)
    //    //console.log("-------")

       let ajax = new XMLHttpRequest()

       ajax.open("POST","../controlador/agregar_adn.php")

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    limpiar_formulario_adn()
                    dialogo(ajax.responseText)
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
    }
}

//funcion para desactivar empleado

function desactivar_adn(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    // alert(padre)
    // //console.log(elemento)    
    let estado  = "0"
    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    datos.append("estado",estado)

    let confirmacion = confirm("¿Esta seguro de desactivar este administrador?")
    // confirmacion = false
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/desactivar_adn.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);        
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    //console.log(padre)
}
/////// Activar Empleado
function activar_adn(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    let estado  = "1"

    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    datos.append("estado",estado)

    let confirmacion = confirm("¿Esta seguro de activar nuevamente este administrador?")
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/activar_adn.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);        
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    //console.log(padre)
}

//funcion para desactivar empleado
function desactivar_empleado(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    // alert(padre)
    // //console.log(elemento)    
    let estado  = "0"
    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    datos.append("estado",estado)

    let confirmacion = confirm("¿Esta seguro de desactivar este empleado?")
    // confirmacion = false
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/desactivar_empleado.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);        
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    //console.log(padre)
}
/////// Activar Empleado
function activar_empleado(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    let estado  = "1"

    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    datos.append("estado",estado)

    let confirmacion = confirm("¿Esta seguro de activar nuevamente este empleado?")
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/activar_empleado.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);        
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    ////console.log(padre)
}


//funcion para desactivar empresas
function desactivar_empresas(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    let estado  = "0"
    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    datos.append("estado",estado)

    let confirmacion = confirm("¿Esta seguro de desactivar esta empresa?")
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/desactivar_empresa.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);        
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    ////console.log(padre)
}
/////// Activar empresas
function activar_empresas(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    let estado  = "1"

    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    datos.append("estado",estado)

    let confirmacion = confirm("¿Esta seguro de activar esta empresa?")
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/activar_empresa.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);        
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    ////console.log(padre)
}

var boton_agrega_empresas_adn= document.getElementById("boton_agrega_empresa_dash")

function agregar_empresa_dashboard()
{
    
    var input_rfcEmpresa = document.getElementById("input_rfcEmpresa").value.trim()
    var input_nombreEmpresa = document.getElementById("input_nombreEmpresa").value.trim()
    var input_razonsocialEmpresa = document.getElementById("input_razonsocialEmpresa").value.trim()
    var input_domicilioEmpresa = document.getElementById("input_domicilioEmpresa").value.trim()
    var input_numerocalleEmpresa = document.getElementById("input_numerocalleEmpresa").value.trim()
    var input_coloniaEmpresa = document.getElementById("input_coloniaEmpresa").value.trim()
    var input_cpEmpresa = document.getElementById("input_cpEmpresa").value.trim()
    var input_municipioEmpresa = document.getElementById("input_municipioEmpresa").value.trim()
    var input_estadoEmpresa = document.getElementById("input_estadoEmpresa").value.trim()
    var input_telefonoEmpresa = document.getElementById("input_telefonoEmpresa").value.trim()
    var input_correoEmpresa = document.getElementById("input_correoEmpresa").value.trim()
    var input_contrasenaEmpresa = document.getElementById("input_contrasenaEmpresa").value.trim()


    if( 
        input_rfcEmpresa.length ==0 ||
        input_nombreEmpresa.length ==0 ||
        input_razonsocialEmpresa.length ==0 ||
        input_domicilioEmpresa.length ==0 ||
        input_numerocalleEmpresa.length ==0 ||
        input_coloniaEmpresa.length ==0 ||
        input_cpEmpresa.length ==0 ||
        input_municipioEmpresa.length ==0 ||
        input_estadoEmpresa.length ==0 ||
        input_telefonoEmpresa.length ==0 ||
        input_correoEmpresa.length ==0 ||
        input_contrasenaEmpresa.length ==0 
    ) 
    {
        dialogo("Los campos se encuentran vacio, favor de ingresar todos los datos...")
    }
    else
    {
    let datos = new FormData()

    datos.append("rfcEmpresa",input_rfcEmpresa)
    datos.append("nombreEmpresa",input_nombreEmpresa)
    datos.append("razonsocialEmpresa",input_razonsocialEmpresa)
    datos.append("domicilioEmpresa",input_domicilioEmpresa)
    datos.append("numerocalleEmpresa",input_numerocalleEmpresa)
    datos.append("coloniaEmpresa",input_coloniaEmpresa)
    datos.append("cpEmpresa",input_cpEmpresa)
    datos.append("municipioEmpresa",input_municipioEmpresa)
    datos.append("estadoEmpresa",input_estadoEmpresa)
    datos.append("telefonoEmpresa",input_telefonoEmpresa)
    datos.append("correoEmpresa",input_correoEmpresa)
    datos.append("contrasenaEmpresa",input_contrasenaEmpresa)



    ////console.log(datos)
    let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/agregar_empresa.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    limpiar_formulario_empresas()
                    dialogo(ajax.responseText)
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
}


function setCookie(nombreCookie, contenido, fechaFinal) 
{
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (fechaFinal * 24 * 60 * 60 * 1000));
    var caducidad = "expires}="+fecha.toUTCString();
    document.cookie = nombreCookie + "=" + contenido + ";"+"SameSite=None; Secure"+ + caducidad + ";path=/";
}

function getCookie(nombreCookie) 
{
    var nCookie = nombreCookie + "=";
    var arregloCookie = document.cookie.split(';');
    for(var i = 0; i < arregloCookie.length; i++) 
    {
        var c = arregloCookie[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
    if (c.indexOf(nCookie) == 0) 
    {
        return c.substring(nCookie.length, c.length);
    }
    }
    return "";
}

var array_editar_empleados = []
var array_editados_empleados = []
var checar_editar_usuarios = true

var nombre2
var apellidoP2
var apellidoM2
var domicilio2
var numExt2
var colonia2
var telefono2
var puesto2
var correo2

var nombre
var apellidoP
var apellidoM
var domicilio
var numExt
var colonia
var telefono
var puesto
var correo

var id_input

function editar_empleado(event)
{ 
    

    let elemento=event.target
    let padre = elemento.parentNode.parentNode
    let hijos = padre.children

    
    // //console.log(hijos)
    if(checar_editar_usuarios)
    {
        // let nombre_input = hijos[1].children[0].value
        id_input = hijos[0].innerHTML
        nombre =hijos[1].children[0].value.trim()
        apellidoP = hijos[2].children[0].value.trim()
        apellidoM =hijos[3].children[0].value.trim()
        domicilio =hijos[4].children[0].value.trim()
        numExt = hijos[5].children[0].value.trim()
        colonia = hijos[6].children[0].value.trim()
        telefono = hijos[7].children[0].value.trim()
        puesto = hijos[8].children[0].value.trim()
        correo = hijos[9].children[0].value.trim()

        ////console.log("primera coincidencia")
        ////console.log(nombre)
        ////console.log("------------")


        for(let i=0; i<hijos.length;i++)
        {
            let inputs = hijos[i].children
            let numero_input= inputs.length
            if(numero_input==1)
            {
                let valorID = inputs[0].value.trim()
                // let valorNombre inputs[1]
                inputs[0].style.border= "solid 2px red"
                inputs[0].disabled=false
                // //console.log(inputs) 
                // array_editar_empleados.push(valor)
            }
            if(numero_input==2)
            {
                let hijos_editar = hijos[i].children
                hijos_editar[1].src = "../recursos/img/alta.png"
                ////console.log(hijos_editar)
            }
        }
        checar_editar_usuarios=false
    }
    else
    {
        nombre2 =hijos[1].children[0].value.trim()
        apellidoP2 = hijos[2].children[0].value.trim()
        apellidoM2 =hijos[3].children[0].value.trim()
        domicilio2 =hijos[4].children[0].value.trim()
        numExt2 = hijos[5].children[0].value.trim()
        colonia2 = hijos[6].children[0].value.trim()
        telefono2 = hijos[7].children[0].value.trim()
        puesto2 = hijos[8].children[0].value.trim()
        correo2 = hijos[9].children[0].value.trim()

        ////console.log("Segunda coincidencia")
        ////console.log(nombre2)
        ////console.log("------------")

        for(let i=0; i<hijos.length;i++)
        {
            let inputs = hijos[i].children
            let numero_input= inputs.length
            if(numero_input==1)
            {
                let valor = inputs[0].value
                inputs[0].style.border= "none"
                inputs[0].disabled=true
                // //console.log(valor) 
                // array_editados_empleados.push(valor)
            }
            if(numero_input==2)
            {
                let hijos_editar = hijos[i].children
                hijos_editar[1].src = "../recursos/img/editar.png"
                ////console.log(hijos_editar)
            }
        }

        if(nombre!=nombre2)
        {
            ////console.log("se edito nombre")

            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","nombre")
            info.append("valor",nombre2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)

        }
        if(apellidoP!=apellidoP2)
        {
            ////console.log("se edito apellido P")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","apellidoP")
            info.append("valor",apellidoP2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(apellidoM!=apellidoM2)
        {
            ////console.log("se edito apellido M")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","apellidoM")
            info.append("valor",apellidoM2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(domicilio!=domicilio2)
        {
            ////console.log("se edito domicilio")

            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","domicilio")
            info.append("valor",domicilio2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(numExt!=numExt2)
        {
            ////console.log("se edito numExt")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","numExt")
            info.append("valor",numExt2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(colonia!=colonia2)
        {
            ////console.log("se edito colonia")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","colonia")
            info.append("valor",colonia2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(telefono!=telefono2)
        {
            ////console.log("se edito telefono")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","telefono")
            info.append("valor",telefono2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(puesto!=puesto2)
        {
            ////console.log("se edito puesto")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","puesto")
            info.append("valor",puesto2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        if(correo!=correo2)
        {
            ////console.log("se edito correo")
            let info = new FormData()

            info.append("id",id_input)
            info.append("tipo","correo")
            info.append("valor",correo2)
            enviarDatos("POST","../controlador/editar_empleado.php",info)
        }
        tomar_datos_empleado()
        checar_editar_usuarios=true
    }
    ////console.log(array_editar_empleados)
    ////console.log(array_editados_empleados)
}

// var respuesta

function enviarDatos(metodo,url,datos)
{
    let ajax = new XMLHttpRequest()

       ajax.open(metodo,url)

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    ////console.log(ajax.responseText)
                    // respuesta = ajax.responseText
                    // return respuesta
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) 
                {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
}



var array_editar_empresas = []
var array_editados_empresas = []
var checar_editar_empresas = true

var rfcEmpresa2
var nombreEmpresa2
var razonsocialEmpresa2
var domicilioEmpresa2
var numerocalleEmpresa2
var coloniaEmpresa2
var cpEmpresa2
var municipioEmpresa2
var estadoEmpresa2
var telefonoEmpresa2
var correoEmpresa2


var rfcEmpresa
var nombreEmpresa
var razonsocialEmpresa
var domicilioEmpresa
var numerocalleEmpresa
var coloniaEmpresa
var cpEmpresa
var municipioEmpresa
var estadoEmpresa
var telefonoEmpresa
var correoEmpresa

var id_input_empresas

function editar_empresas(event)
{ 
    let elemento=event.target
    let padre = elemento.parentNode.parentNode
    let hijos = padre.children

    // //console.log(hijos)
    if(checar_editar_empresas)
    {

        // let nombre_input = hijos[1].children[0].value
        id_input_empresas = hijos[0].innerHTML
        rfcEmpresa =hijos[1].children[0].value.trim()
        nombreEmpresa = hijos[2].children[0].value.trim()
        razonsocialEmpresa =hijos[3].children[0].value.trim()
        domicilioEmpresa =hijos[4].children[0].value.trim()
        numerocalleEmpresa = hijos[5].children[0].value.trim()
        coloniaEmpresa = hijos[6].children[0].value.trim()
        cpEmpresa = hijos[7].children[0].value.trim()
        municipioEmpresa = hijos[8].children[0].value.trim()
        estadoEmpresa = hijos[9].children[0].value.trim()
        telefonoEmpresa = hijos[10].children[0].value.trim()
        correoEmpresa = hijos[11].children[0].value.trim()


        ////console.log("primera coincidencia")
        ////console.log(nombreEmpresa)
        ////console.log("------------")


        for(let i=0; i<hijos.length;i++)
        {
            let inputs = hijos[i].children
            let numero_input= inputs.length
            if(numero_input==1)
            {
                let valorID = inputs[0].value.trim()
                // let valorNombre inputs[1]
                inputs[0].style.border= "solid 2px red"
                inputs[0].disabled=false
                // //console.log(inputs) 
                // array_editar_empleados.push(valor)
            }
            if(numero_input==2)
            {
                let hijos_editar = hijos[i].children
                hijos_editar[1].src = "../recursos/img/alta.png"
                ////console.log(hijos_editar)
            }
        }
        checar_editar_empresas=false
    }
    else
    {
        rfcEmpresa2 =hijos[1].children[0].value.trim()
        nombreEmpresa2 = hijos[2].children[0].value.trim()
        razonsocialEmpresa2 =hijos[3].children[0].value.trim()
        domicilioEmpresa2 =hijos[4].children[0].value.trim()
        numerocalleEmpresa2 = hijos[5].children[0].value.trim()
        coloniaEmpresa2 = hijos[6].children[0].value.trim()
        cpEmpresa2 = hijos[7].children[0].value.trim()
        municipioEmpresa2 = hijos[8].children[0].value.trim()
        estadoEmpresa2 = hijos[9].children[0].value.trim()
        telefonoEmpresa2 = hijos[10].children[0].value.trim()
        correoEmpresa2 = hijos[11].children[0].value.trim()

        ////console.log("Segunda coincidencia")
        ////console.log(nombreEmpresa)
        ////console.log("------------")

        for(let i=0; i<hijos.length;i++)
        {
            let inputs = hijos[i].children
            let numero_input= inputs.length
            if(numero_input==1)
            {
                let valor = inputs[0].value
                inputs[0].style.border= "none"
                inputs[0].disabled=true
                // //console.log(valor) 
                // array_editados_empleados.push(valor)
            }
            if(numero_input==2)
            {
                let hijos_editar = hijos[i].children
                hijos_editar[1].src = "../recursos/img/editar.png"
                ////console.log(hijos_editar)
            }
        }

        if(rfcEmpresa!=rfcEmpresa2)
        {
            ////console.log("se edito RFC")

            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","rfcEmpresa")
            info.append("valor",rfcEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)

        }
        if(nombreEmpresa!=nombreEmpresa2)
        {
            ////console.log("se edito nombre empresa")
            
            let info = new FormData()
            info.append("id",id_input_empresas)
            info.append("tipo","nombreEmpresa")
            info.append("valor",nombreEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(razonsocialEmpresa!=razonsocialEmpresa2)
        {
            ////console.log("se edito  razon social")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","razonsocialEmpresa")
            info.append("valor",razonsocialEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(domicilioEmpresa!=domicilioEmpresa2)
        {
            ////console.log("se edito domicilio empresa")

            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","domicilioEmpresa")
            info.append("valor",domicilioEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(numerocalleEmpresa!=numerocalleEmpresa2)
        {
            ////console.log("se edito numExt empresa")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","numerocalleEmpresa")
            info.append("valor",numerocalleEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(coloniaEmpresa!=coloniaEmpresa2)
        {
            ////console.log("se edito colonia empresa")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","coloniaEmpresa")
            info.append("valor",coloniaEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(cpEmpresa!=cpEmpresa2)
        {
            ////console.log("se edito CP")

            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","cpEmpresa")
            info.append("valor",cpEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(municipioEmpresa!=municipioEmpresa2)
        {
            ////console.log("se edito municipio")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","municipioEmpresa")
            info.append("valor",municipioEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(estadoEmpresa!=estadoEmpresa2)
        {
            ////console.log("se edito estado")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","estadoEmpresa")
            info.append("valor",estadoEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(telefonoEmpresa!=telefonoEmpresa2)
        {
            ////console.log("se edito telefono empresa")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","telefonoEmpresa")
            info.append("valor",telefonoEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        if(correoEmpresa!=correoEmpresa2)
        {
            ////console.log("se edito correo")
            let info = new FormData()

            info.append("id",id_input_empresas)
            info.append("tipo","correoEmpresa")
            info.append("valor",correoEmpresa2)
            enviarDatosEmpresas("POST","../controlador/editar_empresas.php",info)
        }
        tomar_datos_empresas()
        checar_editar_empresas=true

    }
    ////console.log(array_editar_empresas)
    ////console.log(array_editados_empresas)
}
// var respuesta

function enviarDatosEmpresas(metodo,url,datos)
{
    let ajax = new XMLHttpRequest()

       ajax.open(metodo,url)

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    ////console.log(ajax.responseText)
                    // respuesta = ajax.responseText
                    // return respuesta
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) 
                {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
}



var array_editar_admin = []
var array_editados_admin = []
var checar_editar_admin = true

var nombreAdministrador2
var apellidoPAdministrador2
var apellidoMAdministrador2
var domicilioAdministrador2
var numExtAdministrador2
var coloniaAdministrador2
var telefonoAdministrador2
var puestoAdministrador2
var correoAdministrador2

var nombreAdministrador
var apellidoPAdministrador
var apellidoMAdministrador
var domicilioAdministrador
var numExtAdministrador
var coloniaAdministrador
var telefonoAdministrador
var puestoAdministrador
var correoAdministrador

var id_input_administrador

function editar_adn(event)
{ 
    

    let elemento=event.target
    let padre = elemento.parentNode.parentNode
    let hijos = padre.children

    
    // //console.log(hijos)
    if(checar_editar_admin)
    {
        // let nombre_input = hijos[1].children[0].value
        id_input_administrador = hijos[0].innerHTML
        nombreAdministrador =hijos[1].children[0].value.trim()
        apellidoPAdministrador = hijos[2].children[0].value.trim()
        apellidoMAdministrador =hijos[3].children[0].value.trim()
        domicilioAdministrador =hijos[4].children[0].value.trim()
        numExtAdministrador = hijos[5].children[0].value.trim()
        coloniaAdministrador = hijos[6].children[0].value.trim()
        telefonoAdministrador = hijos[7].children[0].value.trim()
        puestoAdministrador = hijos[8].children[0].value.trim()
        correoAdministrador = hijos[9].children[0].value.trim()

        ////console.log("primera coincidencia")
        ////console.log(nombreAdministrador)
        ////console.log("------------")


        for(let i=0; i<hijos.length;i++)
        {
            let inputs = hijos[i].children
            let numero_input= inputs.length
            if(numero_input==1)
            {
                let valorID = inputs[0].value.trim()
                // let valorNombre inputs[1]
                inputs[0].style.border= "solid 2px red"
                inputs[0].disabled=false
                // //console.log(inputs) 
                // array_editar_empleados.push(valor)
            }
            if(numero_input==2)
            {
                let hijos_editar = hijos[i].children
                hijos_editar[1].src = "../recursos/img/alta.png"
                //console.log(hijos_editar)
            }
        }
        checar_editar_admin=false
    }
    else
    {
        nombreAdministrador2 =hijos[1].children[0].value.trim()
        apellidoPAdministrador2 = hijos[2].children[0].value.trim()
        apellidoMAdministrador2 =hijos[3].children[0].value.trim()
        domicilioAdministrador2 =hijos[4].children[0].value.trim()
        numExtAdministrador2 = hijos[5].children[0].value.trim()
        coloniaAdministrador2 = hijos[6].children[0].value.trim()
        telefonoAdministrador2 = hijos[7].children[0].value.trim()
        puestoAdministrador2 = hijos[8].children[0].value.trim()
        correoAdministrador2 = hijos[9].children[0].value.trim()

        ////console.log("Segunda coincidencia")
        /////console.log(nombreAdministrador2)
        ////console.log("------------")

        for(let i=0; i<hijos.length;i++)
        {
            let inputs = hijos[i].children
            let numero_input= inputs.length
            if(numero_input==1)
            {
                let valor = inputs[0].value
                inputs[0].style.border= "none"
                inputs[0].disabled=true
                // //console.log(valor) 
                // array_editados_empleados.push(valor)
            }
            if(numero_input==2)
            {
                let hijos_editar = hijos[i].children
                hijos_editar[1].src = "../recursos/img/editar.png"
                //console.log(hijos_editar)
            }
        }

        if(nombreAdministrador!=nombreAdministrador2)
        {
            ////console.log("se edito nombre")

            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","nombreAdministrador")
            info.append("valor",nombreAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)

        }
        if(apellidoPAdministrador!=apellidoPAdministrador2)
        {
            ////console.log("se edito apellido P")
            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","apellidoPAdministrador")
            info.append("valor",apellidoPAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(apellidoMAdministrador!=apellidoMAdministrador2)
        {
            ////console.log("se edito apellido M")
            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","apellidoMAdministrador")
            info.append("valor",apellidoMAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(domicilioAdministrador!=domicilioAdministrador2)
        {
            ////console.log("se edito domicilio")

            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","domicilioAdministrador")
            info.append("valor",domicilioAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(numExtAdministrador!=numExtAdministrador2)
        {
            ////console.log("se edito numExtAdministrador")
            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","numExtAdministrador")
            info.append("valor",numExtAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(coloniaAdministrador!=coloniaAdministrador2)
        {
            ////console.log("se edito coloniaAdministrador")
            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","coloniaAdministrador")
            info.append("valor",coloniaAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(telefonoAdministrador!=telefonoAdministrador2)
        {
            ////console.log("se edito telefonoAdministrador")

            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","telefonoAdministrador")
            info.append("valor",telefonoAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(puestoAdministrador!=puestoAdministrador2)
        {
            ////console.log("se edito puestoAdministrador")
            let info = new FormData()
            info.append("id",id_input_administrador)
            info.append("tipo","puestoAdministrador")
            info.append("valor",puestoAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        if(correoAdministrador!=correoAdministrador2)
        {
            ////console.log("se edito correoAdministrador")
            let info = new FormData()

            info.append("id",id_input_administrador)
            info.append("tipo","correoAdministrador")
            info.append("valor",correoAdministrador2)
            enviarDatosAdmin("POST","../controlador/editar_adn.php",info)
        }
        tomar_datos_administradores()
        checar_editar_admin=true
    }
    ////console.log(array_editar_admin)
    ////console.log(array_editados_admin)
}

// var respuesta

function enviarDatosAdmin(metodo,url,datos)
{
    let ajax = new XMLHttpRequest()

       ajax.open(metodo,url)

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    // respuesta = ajax.responseText
                    // return respuesta
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) 
                {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
}




function eliminar_empresa(event)
{   
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    // alert(padre)
    // //console.log(id_objetivo)    
    // let estado  = "0"
    let datos = new FormData()
    datos.append("id_empresa",id_objetivo)
    // datos.append("estado",estado)
    let confirmacion = confirm("¿Esta seguro de elimiar a este empresa de la base de datos?"+"\nSe borrar toda la informacion deporvida!!!!" )
    // confirmacion = false
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/eliminar_empresa.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);  
                    // tomar_datos_empleado_noactivos()      
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    ////console.log(padre)

}

function eliminar_empleado(event)
{   
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    // alert(padre)
    // //console.log(id_objetivo)    
    // let estado  = "0"
    let datos = new FormData()
    datos.append("id_empleado",id_objetivo)
    // datos.append("estado",estado)
    let confirmacion = confirm("¿Esta seguro de elimiar a este empleado?")
    // confirmacion = false
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/eliminar_empleado.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);  
                    // tomar_datos_empleado_noactivos()      
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    ////console.log(padre)

}

function eliminar_adn(event)
{   
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_objetivo = padre.id
    // alert(padre)
    // //console.log(id_objetivo)    
    // let estado  = "0"
    let datos = new FormData()
    datos.append("id_adn",id_objetivo)
    // datos.append("estado",estado)
    let confirmacion = confirm("¿Esta seguro de elimiar a este administrador de la base de datos?"+"\nSe borrar toda la informacion deporvida!!!!" )
    // confirmacion = false
    if(confirmacion)
    {
        let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/eliminar_adn.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    dialogo(ajax.responseText)
                    let elementId =id_objetivo
                    let node=document.getElementById(elementId);
                    node.parentNode.removeChild(node);  
                    // tomar_datos_empleado_noactivos()      
                }
                if (ajax.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
    }
    
    //console.log(padre)

}



function buscar_empleado(event)
{
    var datos_filtrados = []

    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_empleados)
                {

                    //console.log(objeto)
                    let nombreE = objeto.nombreEmpleado.toLowerCase()
                    let apellidoM = objeto.apellidomEmpleado.toLowerCase()
                    let apellidoP = objeto.apellidopEmpleado.toLowerCase()
                    let domicilioE = objeto.domicilioEmpleado.toLowerCase()
                    let numeroextE = objeto.numeroextEmpleado.toLowerCase()
                    let coloniaE = objeto.coloniaEmpleado.toLowerCase()
                    let telefonoE = objeto.telefonoEmpleado.toLowerCase()
                    let puestoE = objeto.correoEmpleado.toLowerCase()
                    let correoE = objeto.correoEmpleado.toLowerCase()
                    let tipo = objeto.tipo_usuario.toLowerCase()

                    if(nombreE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(apellidoM.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(apellidoP.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                    if(domicilioE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(numeroextE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(coloniaE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(telefonoE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(puestoE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                    if(correoE.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }  
                }

                
                if(datos_filtrados.length>0)
                {
                    datos_empleados = datos_filtrados
                    pagina_actual_empleados_activos = 1
                    paginador_empleado(datos_empleados,pagina_actual_empleados_activos,cantidad_vistas,boton_anterior,boton_siguiente,boton_primero,boton_ultimo,cuerpo,indicador_pagina)
                }
            }
            else
            {
                tomar_datos_empleado()
            }
        }
}
function buscar_empleadoNO(event)
{
    var datos_filtradosNo = []
    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_empleadosNO)
                {

                    //console.log(objeto)
                    let nombreE = objeto.nombreEmpleado.toLowerCase()
                    let apellidoM = objeto.apellidomEmpleado.toLowerCase()
                    let apellidoP = objeto.apellidopEmpleado.toLowerCase()
                    let domicilioE = objeto.domicilioEmpleado.toLowerCase()
                    let numeroextE = objeto.numeroextEmpleado.toLowerCase()
                    let coloniaE = objeto.coloniaEmpleado.toLowerCase()
                    let telefonoE = objeto.telefonoEmpleado.toLowerCase()
                    let puestoE = objeto.correoEmpleado.toLowerCase()
                    let correoE = objeto.correoEmpleado.toLowerCase()
                    let tipo = objeto.tipo_usuario.toLowerCase()

                    if(nombreE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(apellidoM.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(apellidoP.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    }
                    if(domicilioE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(numeroextE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(coloniaE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(telefonoE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(puestoE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    }
                    if(correoE.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    } 
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtradosNo.includes(objeto))
                        {
                            datos_filtradosNo.push(objeto)
                        }
                    }  
                }
                //console.log(datos_filtradosNo)
                if(datos_filtradosNo.length>0)
                {
                    datos_empleados = datos_filtradosNo
                    pagina_actual_empleados_activos = 1
                    paginador_empleadoNo(datos_empleados,pagina_actual_empleados_activosNO,cantidad_vistasNO,boton_anteriorNO,boton_siguienteNO,boton_primeroNO,boton_ultimoNO,cuerpoNO,indicador_paginaNO)                
                }
            }
            else
            {
                tomar_datos_empleado_noactivos()
            }
        }
}

function buscar_empresas(event)
{
    var datos_filtradosEmpresa = []
    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_empresas)
                {

                    //console.log(objeto)
                    let rfcEmpresa = objeto.rfcEmpresa.toLowerCase()
                    let nombreEmpresa = objeto.nombreEmpresa.toLowerCase()
                    let razonsocialEmpresa = objeto.razonsocialEmpresa.toLowerCase()
                    let domicilioEmpresa = objeto.domicilioEmpresa.toLowerCase()
                    let numerocalleEmpresa = objeto.numerocalleEmpresa.toLowerCase()
                    let coloniaEmpresa = objeto.coloniaEmpresa.toLowerCase()
                    let cpEmpresa = objeto.cpEmpresa.toLowerCase()
                    let municipioEmpresa = objeto.municipioEmpresa.toLowerCase()
                    let estadoEmpresa = objeto.estadoEmpresa.toLowerCase()
                    let telefonoEmpresa = objeto.telefonoEmpresa.toLowerCase()
                    let correoEmpresa = objeto.correoEmpresa.toLowerCase()
                    let tipo_usuario = objeto.tipo_usuario.toLowerCase()

                   if(rfcEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(nombreEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(razonsocialEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    }
                    if(domicilioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(numerocalleEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(coloniaEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(cpEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(municipioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    }
                    if(estadoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    } 
                    if(telefonoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    }
                    if(correoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    }  
                    if(tipo_usuario.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresa.includes(objeto))
                        {
                            datos_filtradosEmpresa.push(objeto)
                        }
                    }    
                }
                //console.log(datos_filtradosEmpresa)
                if(datos_filtradosEmpresa.length>0)
                {
                    datos_empleados = datos_filtradosEmpresa
                    pagina_actual_empresas_activos = 1
                    paginador_empresas(datos_empleados,pagina_actual_empresas_activos,cantidad_vistasEmpresas,boton_anteriorEmpresas,boton_siguienteEmpresas,boton_primeroEmpresas,boton_ultimoEmpresas,cuerpoEmpresas,indicador_paginaEmpresas)
                }
            }
            else
            {
                tomar_datos_empresas()
            }
        }
}

function buscar_empresasNo(event)
{
    var datos_filtradosEmpresaNo = []
    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_empresasNo)
                {

                    //console.log(objeto)
                    let rfcEmpresa = objeto.rfcEmpresa.toLowerCase()
                    let nombreEmpresa = objeto.nombreEmpresa.toLowerCase()
                    let razonsocialEmpresa = objeto.razonsocialEmpresa.toLowerCase()
                    let domicilioEmpresa = objeto.domicilioEmpresa.toLowerCase()
                    let numerocalleEmpresa = objeto.numerocalleEmpresa.toLowerCase()
                    let coloniaEmpresa = objeto.coloniaEmpresa.toLowerCase()
                    let cpEmpresa = objeto.cpEmpresa.toLowerCase()
                    let municipioEmpresa = objeto.municipioEmpresa.toLowerCase()
                    let estadoEmpresa = objeto.estadoEmpresa.toLowerCase()
                    let telefonoEmpresa = objeto.telefonoEmpresa.toLowerCase()
                    let correoEmpresa = objeto.correoEmpresa.toLowerCase()
                    let tipo_usuario = objeto.tipo_usuario.toLowerCase()

                   if(rfcEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(nombreEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(razonsocialEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    }
                    if(domicilioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(numerocalleEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(coloniaEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(cpEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(municipioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    }
                    if(estadoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    } 
                    if(telefonoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    }
                    if(correoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    }  
                    if(tipo_usuario.includes(valor_buscar))
                    {
                        if(!datos_filtradosEmpresaNo.includes(objeto))
                        {
                            datos_filtradosEmpresaNo.push(objeto)
                        }
                    }    
                }
                //console.log(datos_filtradosEmpresaNo)
                if(datos_filtradosEmpresaNo.length>0)
                {
                    datos_empleados = datos_filtradosEmpresaNo
                    pagina_actual_empresas_noactivos = 1
                    paginador_empresasNo(datos_empleados,pagina_actual_empresas_noactivos,cantidad_vistasEmpresasNo,boton_anteriorEmpresasNo,boton_siguienteEmpresasNo,boton_primeroEmpresasNo,boton_ultimoEmpresasNo,cuerpoEmpresasNo,indicador_paginaEmpresasNo)
                }
            }
            else
            {
                tomar_datos_empresas_noactivas()
            }
        }
}

function buscar_empresas_peticion(event)
{
    var datos_filtradosPeticion= []

    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_empresasPendientes)
                {

                    //console.log(objeto)
                    let rfcEmpresa = objeto.rfcEmpresa.toLowerCase()
                    let nombreEmpresa = objeto.nombreEmpresa.toLowerCase()
                    let razonsocialEmpresa = objeto.razonsocialEmpresa.toLowerCase()
                    let domicilioEmpresa = objeto.domicilioEmpresa.toLowerCase()
                    let numerocalleEmpresa = objeto.numerocalleEmpresa.toLowerCase()
                    let coloniaEmpresa = objeto.coloniaEmpresa.toLowerCase()
                    let cpEmpresa = objeto.cpEmpresa.toLowerCase()
                    let municipioEmpresa = objeto.municipioEmpresa.toLowerCase()
                    let estadoEmpresa = objeto.estadoEmpresa.toLowerCase()
                    let telefonoEmpresa = objeto.telefonoEmpresa.toLowerCase()
                    let correoEmpresa = objeto.correoEmpresa.toLowerCase()
                    let tipo_usuario = objeto.tipo_usuario.toLowerCase()

                   if(rfcEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(nombreEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(razonsocialEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    }
                    if(domicilioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(numerocalleEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(coloniaEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(cpEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(municipioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    }
                    if(estadoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    } 
                    if(telefonoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    }
                    if(correoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    }  
                    if(tipo_usuario.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticion.includes(objeto))
                        {
                            datos_filtradosPeticion.push(objeto)
                        }
                    }    
                }
                //console.log(datos_filtradosPeticion)
                if(datos_filtradosPeticion.length>0)
                {
                    datos_empleados = datos_filtradosPeticion
                    pagina_actual_empresas_Pendientes = 1
                    paginador_empresasPendientes(datos_empleados,pagina_actual_empresas_Pendientes,cantidad_vistasEmpresasPendientes,boton_anteriorEmpresasPendientes,boton_siguienteEmpresasPendientes,boton_primeroEmpresasPendientes,boton_ultimoEmpresasPendientes,cuerpoEmpresasPendientes,indicador_paginaEmpresasPendientes)
                }
            }
            else
            {
                tomar_datos_empresas_peticion()
            }
        }
}

function buscar_empresas_peticion_dash(event)
{
    var datos_filtradosPeticionDash = []
    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_empresasPendientesDash)
                {

                    //console.log(objeto)
                    let rfcEmpresa = objeto.rfcEmpresa.toLowerCase()
                    let nombreEmpresa = objeto.nombreEmpresa.toLowerCase()
                    let razonsocialEmpresa = objeto.razonsocialEmpresa.toLowerCase()
                    let domicilioEmpresa = objeto.domicilioEmpresa.toLowerCase()
                    let numerocalleEmpresa = objeto.numerocalleEmpresa.toLowerCase()
                    let coloniaEmpresa = objeto.coloniaEmpresa.toLowerCase()
                    let cpEmpresa = objeto.cpEmpresa.toLowerCase()
                    let municipioEmpresa = objeto.municipioEmpresa.toLowerCase()
                    let estadoEmpresa = objeto.estadoEmpresa.toLowerCase()
                    let telefonoEmpresa = objeto.telefonoEmpresa.toLowerCase()
                    let correoEmpresa = objeto.correoEmpresa.toLowerCase()
                    let tipo_usuario = objeto.tipo_usuario.toLowerCase()

                   if(rfcEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(nombreEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(razonsocialEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    }
                    if(domicilioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(numerocalleEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(coloniaEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(cpEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(municipioEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    }
                    if(estadoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    } 
                    if(telefonoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    }
                    if(correoEmpresa.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    }  
                    if(tipo_usuario.includes(valor_buscar))
                    {
                        if(!datos_filtradosPeticionDash.includes(objeto))
                        {
                            datos_filtradosPeticionDash.push(objeto)
                        }
                    }    
                }
                //console.log(datos_filtradosPeticionDash)
                if(datos_filtradosPeticionDash.length>0)
                {
                    datos_empleados = datos_filtradosPeticionDash
                    pagina_actual_empresas_PendientesDash = 1
                    paginador_empresasPendientesDash(datos_empleados,pagina_actual_empresas_PendientesDash,cantidad_vistasEmpresasPendientesDash,boton_anteriorEmpresasPendientesDash,boton_siguienteEmpresasPendientesDash,boton_primeroEmpresasPendientesDash,boton_ultimoEmpresasPendientesDash,cuerpoEmpresasPendientesDash,indicador_paginaEmpresasPendientesDash)
                }
            }
            else
            {
                tomar_datos_empresas_peticion_dashboard()
            }
        }
}


function buscar_adn(event)
{
    var datos_filtradosAdn = []
    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_admin)
                {

                    //console.log(objeto)
                    let nombreAdministrador = objeto.nombreAdministrador.toLowerCase()
                    let apellidomAdministrador = objeto.apellidomAdministrador.toLowerCase()
                    let apellidopAdministrador = objeto.apellidopAdministrador.toLowerCase()
                    let domicilioAdministrador = objeto.domicilioAdministrador.toLowerCase()
                    let numeroextAdministrador = objeto.numeroextAdministrador.toLowerCase()
                    let coloniaAdministrador = objeto.coloniaAdministrador.toLowerCase()
                    let telefonoAdministrador = objeto.telefonoAdministrador.toLowerCase()
                    let puestoAdministrador = objeto.puestoAdministrador.toLowerCase()
                    let correoAdministrador = objeto.correoAdministrador.toLowerCase()
                    let tipo = objeto.tipo_usuario.toLowerCase()

                    if(nombreAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(apellidomAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(apellidopAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    }
                    if(domicilioAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(numeroextAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(coloniaAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(telefonoAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(puestoAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    }
                    if(correoAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    } 
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdn.includes(objeto))
                        {
                            datos_filtradosAdn.push(objeto)
                        }
                    }  
                }
                //console.log(datos_filtradosAdn)
                if(datos_filtradosAdn.length>0)
                {
                    datos_empleados = datos_filtradosAdn
                    pagina_actual_Admin_activos = 1
                    paginador_admin(datos_empleados,pagina_actual_Admin_activos,cantidad_vistasAdmin,boton_anteriorAdmin,boton_siguienteAdmin,boton_primeroAdmin,boton_ultimoAdmin,cuerpoAdmin,indicador_paginaAdmin)
                }
            }
            else
            {
                tomar_datos_administradores()
            }
        }
}

function buscar_AdnNO(event)
{
    var datos_filtradosAdnNO = []
    let codigo_tecla = event.keyCode
    ////console.log(datos_adminNo)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_adminNo)
                {

                    //console.log(objeto)
                    let nombreAdministrador = objeto.nombreAdministrador.toLowerCase()
                    let apellidomAdministrador = objeto.apellidomAdministrador.toLowerCase()
                    let apellidopAdministrador = objeto.apellidopAdministrador.toLowerCase()
                    let domicilioAdministrador = objeto.domicilioAdministrador.toLowerCase()
                    let numeroextAdministrador = objeto.numeroextAdministrador.toLowerCase()
                    let coloniaAdministrador = objeto.coloniaAdministrador.toLowerCase()
                    let telefonoAdministrador = objeto.telefonoAdministrador.toLowerCase()
                    let puestoAdministrador = objeto.puestoAdministrador.toLowerCase()
                    let correoAdministrador = objeto.correoAdministrador.toLowerCase()
                    let tipo = objeto.tipo_usuario.toLowerCase()

                    if(nombreAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(apellidomAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(apellidopAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    }
                    if(domicilioAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(numeroextAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(coloniaAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(telefonoAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(puestoAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    }
                    if(correoAdministrador.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    } 
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtradosAdnNO.includes(objeto))
                        {
                            datos_filtradosAdnNO.push(objeto)
                        }
                    }  
                }
                //console.log(datos_filtradosAdnNO)
                if(datos_filtradosAdnNO.length>0)
                {
                    datos_empleados = datos_filtradosAdnNO
                    pagina_actual_Admin_Noactivos = 1
                    paginador_adminNo(datos_empleados,pagina_actual_Admin_Noactivos,cantidad_vistasAdminNo,boton_anteriorAdminNo,boton_siguienteAdminNo,boton_primeroAdminNo,boton_ultimoAdminNo,cuerpoAdminNo,indicador_paginaAdminNo)
                }
            }
            else
            {
                tomar_datos_administradores_noactivos()
            }
        }
}



/////seccion tickets
var btn_agregar_ticket= document.getElementById("btn_agregar_ticket")
function agregar_ticket()
{
    
    var input_RFCTicket = document.getElementById("input_RFCTicket").value.trim()
    var input_nombreTicket = document.getElementById("input_nombreTicket").value.trim()
    var select_servicio = document.getElementById("select_servicio").value
    var select_prioridad = document.getElementById("select_prioridad").value
    var txt_problematica = document.getElementById("txt_problematica").value

    if( 
        input_RFCTicket.length ==0 ||
        input_nombreTicket.length ==0 ||
        select_servicio.length ==0 ||
        select_prioridad.length ==0 ||
        txt_problematica.length ==0 
    ) 
    {
        dialogo("Los campos se encuentran vacio, favor de ingresar todos los datos...")
    }
    else
    {
    let datos = new FormData()

    datos.append("nombreEmpresa",input_nombreTicket)
    datos.append("rfcEmpresa",input_RFCTicket)
    datos.append("tipoServicio",select_servicio)
    datos.append("prioridad",select_prioridad)
    datos.append("descripcion",txt_problematica)

    ////console.log(datos)
    let ajax = new XMLHttpRequest()

    ajax.open("POST","../controlador/agregar_ticket.php")

    ajax.send(datos)

    ajax.onreadystatechange =function () 
    {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    limpiar_formulario_ticket()
                    dialogo(ajax.responseText)
                }
                if (ajax.status == 400) 
                {
                    ////console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    ////console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    ////console.log("500 Error interno de servidor");
                }
            }            
        }
    }
}


function mostrar_nombre(event)
{
    let contenedor_opciones = document.getElementById("contendor_opciones_nombre")
    let valor = event.target.value.trim()
    if(valor!="")
    {
        // ////console.log(valor)
        let datos = new FormData();
        datos.append("coincidencia",valor)
        let peticion = new XMLHttpRequest();
        peticion.open("POST","../controlador/tomar_nombres_empresas.php")
        peticion.send(datos)

        peticion.onreadystatechange =function () 
        {
            if (peticion.readyState == 4) 
            {
                if (peticion.status == 200) 
                {
                    // //console.log("200 Respuesta Exitosa");
                    // //console.log(peticion.responseText)
                    let datos = JSON.parse(peticion.responseText)
                    contenedor_opciones.style.display="flex"
                    contenedor_opciones.innerHTML=""                    
                    if(!datos.includes("sin coincidencias"))
                    {
                        for (let objeto of datos)
                        {
                            let nombre = objeto.nombreEmpresa
                            let rfc = objeto.rfcEmpresa
                            //console.log(rfc)

                            let opcion = document.createElement("div")
                            opcion.setAttribute("class","opcion_nombre")
                            // opcion.setAttribute("onclick","agregar_nombres(event);")

                            let texto = document.createElement("p")
                            texto.setAttribute("class","opcion_texto")
                            texto.setAttribute("onclick","agregar_nombres(event);")
                            texto.innerHTML = nombre

                            let input = document.createElement("input")
                            input.setAttribute("type","hidden")
                            input.value = rfc

                            // opcion.setAttribute("value",rfc)
                            opcion.appendChild(texto)
                            opcion.appendChild(input)

                            contenedor_opciones.appendChild(opcion)
                        }
                    }
                    

                }
                if (peticion.status == 400) 
                {
                    //console.log("400 El servidor no entendió la petición");
                }
                if (peticion.status == 404)
                {
                    //console.log("404 Página no encontrada");
                }
                if (peticion.status == 500) {
                    //console.log("500 Error interno de servidor");
                }
            }            
        }
        // contenedor_opciones.innerHTML='<p class="opcion_nombre" onclick="agregar_nombres(event);">'+valor+'</p>' 
    }
    else
    {
        contenedor_opciones.style.display="none"
    }
}

function agregar_nombres(event)
{ 
    let contenedor_opciones = document.getElementById("contendor_opciones_nombre")
    let contenedor_rfc = document.getElementById("input_RFCTicket")
    let contenecor_nombre = document.getElementById("input_nombreTicket")

    let elemento = event.target
    let input = elemento.nextElementSibling
    
    let valor_nombre = elemento.innerHTML
    let valor_rfc = input.value
    // //console.log(input.value)

    contenedor_rfc.value=valor_rfc
    contenecor_nombre.value= valor_nombre
    contenedor_opciones.style.display="none"
}



////////// Alertas
var check_boton = true
function dialogo(mensaje)
{
    if(check_boton){
    check_boton = false
    let dialogo_mensaje = document.createElement("div")
    dialogo_mensaje.setAttribute("class","contenedor_dialogo")
    dialogo_mensaje.innerHTML=mensaje

    let boton  = document.createElement("div")
    boton.setAttribute("class","boton_alerta")
    boton.setAttribute("onclick","quitar_alerta(event);")
    boton.innerHTML="Aceptar"

    dialogo_mensaje.appendChild(boton)

    let contenedor = document.getElementById("contenedor")
    let fondo = document.createElement("div")
    fondo.setAttribute("class","contenedor_alerta")
    fondo.setAttribute("id","elemento_dialogo")
    fondo.appendChild(dialogo_mensaje)
    contenedor.appendChild(fondo)

    }
}
function quitar_alerta(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_elemento = padre.id
    let borrado = document.getElementById(id_elemento)
    borrado.parentNode.removeChild(borrado)
    window.location.reload()
}



function buscar_ticket_pendiente(event)
{
    var datos_filtrados = []

    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_tickets)
                {

                    //console.log(objeto)
                    let referenciaTicket = objeto.referencia.toLowerCase()
                    let nombreEmpre = objeto.nombreEmpresa.toLowerCase()
                    let rfcEmpre = objeto.rfcEmpresa.toLowerCase()
                    let tipo = objeto.tipoServicio.toLowerCase()
                    let prioridad_ticket = objeto.prioridad.toLowerCase()
                    

                    if(referenciaTicket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(nombreEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(rfcEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(prioridad_ticket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                }

                
                if(datos_filtrados.length>0)
                {
                    datos_empleados = datos_filtrados
                    pagina_actual_tickets_pendientes = 1
                    paginador_tickets_pendientes(datos_empleados,pagina_actual_tickets_pendientes,cantidad_vistas_tickets_pendientes,boton_anterior_tickets_pendientes,boton_siguiente_tickets_pendientes,boton_primero_tickets_pendientes,boton_ultimo_tickets_pendientes,cuerpo_tickets_pendientes,indicador_pagina_tickets_pendientes)
                }
            }
            else
            {
                tomar_datos_tickets_pendientes()
            }
        }
}

function buscar_ticket_NoResuelto(event)
{
    var datos_filtrados = []

    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_tickets_NoResuelto)
                {

                    //console.log(objeto)
                    let referenciaTicket = objeto.referencia.toLowerCase()
                    let nombreEmpre = objeto.nombreEmpresa.toLowerCase()
                    let rfcEmpre = objeto.rfcEmpresa.toLowerCase()
                    let tipo = objeto.tipoServicio.toLowerCase()
                    let prioridad_ticket = objeto.prioridad.toLowerCase()
                    

                    if(referenciaTicket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(nombreEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(rfcEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(prioridad_ticket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                }

                
                if(datos_filtrados.length>0)
                {
                    datos_empleados = datos_filtrados
                    pagina_actual_tickets_NoResuelto = 1
                    paginador_tickets_NoResuelto(datos_empleados,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
                }
            }
            else
            {
                tomar_datos_tickets_NoResuelto()
            }
        }
}


function buscar_ticket_Resuelto(event)
{
    var datos_filtrados = []

    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_tickets_Resuelto)
                {

                    ////console.log(objeto)
                    let referenciaTicket = objeto.referencia.toLowerCase()
                    let nombreEmpre = objeto.nombreEmpresa.toLowerCase()
                    let rfcEmpre = objeto.rfcEmpresa.toLowerCase()
                    let tipo = objeto.tipoServicio.toLowerCase()
                    let prioridad_ticket = objeto.prioridad.toLowerCase()
                    

                    if(referenciaTicket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(nombreEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(rfcEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(prioridad_ticket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                }

                
                if(datos_filtrados.length>0)
                {
                    datos_empleados = datos_filtrados
                    pagina_actual_tickets_Resuelto = 1
                    paginador_tickets_Resuelto(datos_empleados,pagina_actual_tickets_Resuelto,cantidad_vistas_tickets_Resuelto,boton_anterior_tickets_Resuelto,boton_siguiente_tickets_Resuelto,boton_primero_tickets_Resuelto,boton_ultimo_tickets_Resuelto,cuerpo_tickets_Resuelto,indicador_pagina_tickets_Resuelto)
                }
            }
            else
            {
                tomar_datos_tickets_Resuelto()
            }
        }
}


function buscar_ticket_pendiente_dashboard(event)
{
    var datos_filtrados = []

    let codigo_tecla = event.keyCode
    // //console.log(datos_empleados)
        if(codigo_tecla==13)
        {
            let valor_buscar = event.target.value.trim()
            valor_buscar.toLowerCase()
            if(valor_buscar.length>0)
            {
                // alert("funciona")
                // //console.log(valor_buscar)
                for (let objeto of datos_tickets_dashboard)
                {

                    //console.log(objeto)
                    let referenciaTicket = objeto.referencia.toLowerCase()
                    let nombreEmpre = objeto.nombreEmpresa.toLowerCase()
                    let rfcEmpre = objeto.rfcEmpresa.toLowerCase()
                    let tipo = objeto.tipoServicio.toLowerCase()
                    let prioridad_ticket = objeto.prioridad.toLowerCase()
                    

                    if(referenciaTicket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(nombreEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(rfcEmpre.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                    if(tipo.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    } 
                    if(prioridad_ticket.includes(valor_buscar))
                    {
                        if(!datos_filtrados.includes(objeto))
                        {
                            datos_filtrados.push(objeto)
                        }
                    }
                }

                
                if(datos_filtrados.length>0)
                {
                    datos_empleados = datos_filtrados
                    pagina_actual_tickets_pendientes_dashboard = 1
                    paginador_tickets_pendientes_dashboard(datos_empleados,pagina_actual_tickets_pendientes_dashboard,cantidad_vistas_tickets_pendientes_dashboard,boton_anterior_tickets_pendientes_dashboard,boton_siguiente_tickets_pendientes_dashboard,boton_primero_tickets_pendientes_dashboard,boton_ultimo_tickets_pendientes_dashboard,cuerpo_tickets_pendientes_dashboard,indicador_pagina_tickets_pendientes_dashboard)
                }
            }
            else
            {
                tomar_datos_tickets_pendientes_dashboard()
            }
        }
}



function editar_ticket(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_elemento = padre.id

    let enlace = "../Ticket/?info="+id_elemento

    window.open(enlace,"_blank")

    ////console.log(padre)
}

var check_cerrar_sesion = true
function cerrar_sesion()
{
    if(check_cerrar_sesion)
    {
        let peticion = new XMLHttpRequest();
        peticion.open("POST","../controlador/cerrar_sesion.php",true)
        peticion.send()
        peticion.onreadystatechange = function()
        {
            if(peticion.readyState == 4 && peticion.status == 200)
            {
                let respuesta = peticion.responseText
                //console.log(respuesta)
                check_cerrar_sesion = false
                if(respuesta == "Sesion cerrada")
                {
                    window.location.href = "../"
                }
            }
        }

    }
}
function cambiar_contrasena()
{
    let nueva_contrasena = document.getElementById("input_contrasena_nueva").value
    let confirmar_contrasena = document.getElementById("input_confirmacion_contrasena").value
    //console.log(nueva_contrasena.length)
    //console.log(confirmar_contrasena.length)
    if(nueva_contrasena.length>0 && confirmar_contrasena.length>0)
    {
        if(nueva_contrasena == confirmar_contrasena)
        {
            let peticion = new XMLHttpRequest();
            peticion.open("POST","../controlador/cambiar_contra.php",true)
            peticion.setRequestHeader("Content-type","application/x-www-form-urlencoded")
            peticion.send("nueva_contrasena="+nueva_contrasena)
            peticion.onreadystatechange = function()
            {
                if(peticion.readyState == 4 && peticion.status == 200)
                {
                    let respuesta = peticion.responseText
                    //console.log(respuesta)
                    if(respuesta == "se cambio correctamente")
                    {
                        dialogo("Contraseña cambiada")
                        window.location.href = "../"
                    }
                    else
                    {
                        dialogo("Contraseña actual incorrecta")
                    }
                }
            }
        }
        else
        {
            dialogo("Las contraseñas no coinciden")
        }
    }
    else
    {
        dialogo("Campos vacios")
    }
}

////////// Alertas

