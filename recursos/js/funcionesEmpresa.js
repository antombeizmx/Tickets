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

// crear cookie

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


function limpiar_formulario_ticket()
{
    let elementos = document.querySelectorAll(".input_tickets")
    for(let i =0; i<elementos.length;i++)
    {
        elementos[i].value=""
    }
}

let contenedores = document.querySelectorAll(".seccion")
let contenedor_dashboard= document.querySelectorAll(".seccion_tabla")

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
        tomar_datos_tickets_pendientes_empresa();    
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
    let regexContrasena = /contrasena/

    // //console.log(navegador)

    ////console.log(identificador)
    if(regexDashboard.test(identificador))
    {
        // //console.log("coincide dashboard")
        let nombre_elemento = "contenedor_dashboard"
        mostrarVista(nombre_elemento)
        tomar_datos_tickets_pendientes_empresa()
        info_cookie = nombre_elemento

        // alert("Es mozilla")
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

        // alert("Es mozilla")
        let datos = new FormData()
        datos.append("valor",nombre_elemento);
        setCookie("vista-actual",nombre_elemento,1)
        crearCookie("POST","../controlador/crear_cookie_vista.php",datos)
        
    }

    if(regexTicket.test(identificador))
    {
        ////console.log("coincide contrasena")
        let nombre_elemento = "contenedor_tickets"
        mostrarVista(nombre_elemento) 
        info_cookie = nombre_elemento

        // alert("Es mozilla")
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
    let regexNoResuelto = /noResuelto/
    let regexResuelto = /resuelto/


    ////console.log(identificador)
    if(regexPendiente.test(identificador))
    {
        ////console.log("coincide pendiente")
        let nombre_elemento = "contenedor_tickets_pendientes"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_tickets_pendientes_empresa()
    }
    if(regexNoResuelto.test(identificador))
    {
        ////console.log("coincide no resuelto")
        let nombre_elemento = "contenedor_tickets_no_resueltos"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_tickets_NoResuelto_empresa()
    }
    if(regexResuelto.test(identificador))
    {
        ////console.log("coincide resuelto")
        let nombre_elemento = "contenedor_tickets_resuelto"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_tickets_Resuelto_empresa()
    }
    

}
///TERMINO DESPLAZAMIENTO OPCIONES DEL DASHBOARD

function editar_ticket(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_elemento = padre.id

    let enlace = "../Ticket/?info="+id_elemento

    window.open(enlace,"_blank")

    ////console.log(padre)
}


function buscar_ticket_pendiente_empresa(event)
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
                for (let objeto of datos_tickets_empresa)
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
                    pagina_actual_tickets_pendientes_empresa = 1
                    paginador_tickets_pendientes_empresa(datos_empleados,pagina_actual_tickets_pendientes_empresa,cantidad_vistas_tickets_pendientes_empresa,boton_anterior_tickets_pendientes_empresa,boton_siguiente_tickets_pendientes_empresa,boton_primero_tickets_pendientes_empresa,boton_ultimo_tickets_pendientes_empresa,cuerpo_tickets_pendientes_empresa,indicador_pagina_tickets_pendientes_empresa)
                }
            }
            else
            {
                tomar_datos_tickets_pendientes_empresa()
            }
        }
}

function buscar_ticket_NoResuelto_empresa(event)
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
                for (let objeto of datos_tickets_NoResuelto_empresa)
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
                    pagina_actual_tickets_NoResuelto_empresa = 1
                    paginador_tickets_NoResuelto_empresa(datos_empleados,pagina_actual_tickets_NoResuelto_empresa,cantidad_vistas_tickets_NoResuelto_empresa,boton_anterior_tickets_NoResuelto_empresa,boton_siguiente_tickets_NoResuelto_empresa,boton_primero_tickets_NoResuelto_empresa,boton_ultimo_tickets_NoResuelto_empresa,cuerpo_tickets_NoResuelto_empresa,indicador_pagina_tickets_NoResuelto_empresa)
                }
            }
            else
            {
                tomar_datos_tickets_NoResuelto_empresa()
            }
        }
}


function buscar_ticket_Resuelto_empresa(event)
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
                for (let objeto of datos_tickets_Resuelto_empresa)
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
                    pagina_actual_tickets_Resuelto_empresa = 1
                    paginador_tickets_Resuelto_empresa(datos_empleados,pagina_actual_tickets_Resuelto_empresa,cantidad_vistas_tickets_Resuelto_empresa,boton_anterior_tickets_Resuelto_empresa,boton_siguiente_tickets_Resuelto_empresa,boton_primero_tickets_Resuelto_empresa,boton_ultimo_tickets_Resuelto_empresa,cuerpo_tickets_Resuelto_empresa,indicador_pagina_tickets_Resuelto_empresa)
                }
            }
            else
            {
                tomar_datos_tickets_Resuelto_empresa()
            }
        }
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

////////// Alertas

function dialogo(mensaje)
{
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
function quitar_alerta(event)
{
    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_elemento = padre.id
    let borrado = document.getElementById(id_elemento)
    borrado.parentNode.removeChild(borrado)
    window.location.reload()
}

function cambiar_contrasena()
{
    let nueva_contrasena = document.getElementById("input_contrasena_nueva_empresa").value.trim()
    let confirmar_contrasena = document.getElementById("input_confirmacion_contrasena_empresa").value.trim()
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

