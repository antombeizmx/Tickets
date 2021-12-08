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



let contenedores = document.querySelectorAll(".seccion")
let contenedor_dashboard= document.querySelectorAll(".seccion_tabla")

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
        tomar_datos_tickets_pendientes_empleado();    
    }
}


// mostrarVista(contenedores[0])
//Desplazamiento secciones del menu en pagina principal 
function mostrarSeccion(event)
{    
    let elemento = event.target
    let identificador = elemento.id
    let regexDashboard = /dashboard/
    let regexContrasena = /contrasena/

    // //console.log(navegador)

    ////console.log(identificador)
    if(regexDashboard.test(identificador))
    {
        // //console.log("coincide dashboard")
        let nombre_elemento = "contenedor_dashboard"
        mostrarVista(nombre_elemento)
        tomar_datos_tickets_pendientes_empleado()
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
        tomar_datos_tickets_pendientes_empleado()
    }
    if(regexNoResuelto.test(identificador))
    {
        ////console.log("coincide no resuelto")
        let nombre_elemento = "contenedor_tickets_no_resueltos"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_tickets_NoResuelto_empleado()
    }
    if(regexResuelto.test(identificador))
    {
        ////console.log("coincide resuelto")
        let nombre_elemento = "contenedor_tickets_resuelto"
        mostrarVistaDashboard(nombre_elemento)
        tomar_datos_tickets_Resuelto_empleado()
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


function buscar_ticket_pendiente_empleado(event)
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
                for (let objeto of datos_tickets_empleado)
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
                    pagina_actual_tickets_pendientes_empleado = 1
                    paginador_tickets_pendientes_empleado(datos_empleados,pagina_actual_tickets_pendientes_empleado,cantidad_vistas_tickets_pendientes_empleado,boton_anterior_tickets_pendientes_empleado,boton_siguiente_tickets_pendientes_empleado,boton_primero_tickets_pendientes_empleado,boton_ultimo_tickets_pendientes_empleado,cuerpo_tickets_pendientes_empleado,indicador_pagina_tickets_pendientes_empleado)
                }
            }
            else
            {
                tomar_datos_tickets_pendientes_empleado()
            }
        }
}

function buscar_ticket_NoResuelto_empleado(event)
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
                for (let objeto of datos_tickets_NoResuelto_empleado)
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
                    pagina_actual_tickets_NoResuelto_empleado = 1
                    paginador_tickets_NoResuelto_empleado(datos_empleados,pagina_actual_tickets_NoResuelto_empleado,cantidad_vistas_tickets_NoResuelto_empleado,boton_anterior_tickets_NoResuelto_empleado,boton_siguiente_tickets_NoResuelto_empleado,boton_primero_tickets_NoResuelto_empleado,boton_ultimo_tickets_NoResuelto_empleado,cuerpo_tickets_NoResuelto_empleado,indicador_pagina_tickets_NoResuelto_empleado)
                }
            }
            else
            {
                tomar_datos_tickets_NoResuelto_empleado()
            }
        }
}


function buscar_ticket_Resuelto_empleado(event)
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
                for (let objeto of datos_tickets_Resuelto_empleado)
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
                    pagina_actual_tickets_Resuelto_empleado = 1
                    paginador_tickets_Resuelto_empleado(datos_empleados,pagina_actual_tickets_Resuelto_empleado,cantidad_vistas_tickets_Resuelto_empleado,boton_anterior_tickets_Resuelto_empleado,boton_siguiente_tickets_Resuelto_empleado,boton_primero_tickets_Resuelto_empleado,boton_ultimo_tickets_Resuelto_empleado,cuerpo_tickets_Resuelto_empleado,indicador_pagina_tickets_Resuelto_empleado)
                }
            }
            else
            {
                tomar_datos_tickets_Resuelto_empleado()
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
function cambiar_contrasena()
{
    let nueva_contrasena = document.getElementById("input_contrasena_nueva").value.trim()
    let confirmar_contrasena = document.getElementById("input_confirmacion_contrasena").value.trim()
    //console.log(nueva_contrasena)
    //console.log(confirmar_contrasena)
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
                        window.location.href = "../index.php"
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