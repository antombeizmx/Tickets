
function agregar_comentario()
{
    let input_elemento = document.getElementById("textarea_comentario")
    let input_id = document.getElementById("id_ticket")
    let input_nombre = document.getElementById("id_nombre")
    let input_tipo = document.getElementById("id_tipo")
    let valor = input_elemento.value
    let id_valor = input_id.value
    let usuario = input_nombre.value
    let tipo = input_tipo.value

    if(valor.length==0)
    {
        dialogo("Comentario vacio, favor de escribir alguna anotacion")
    }
    else
    {

    // crear funcion para tomar fecha actual
    let fecha = new Date()
    let dia = fecha.getDate()
    let mes = fecha.getMonth()
    let anio = fecha.getFullYear()
    let hora = fecha.getHours()
    let minutos = fecha.getMinutes()
    let segundos = fecha.getSeconds()

    let fecha_actual = dia+"/"+mes+"/"+anio+" "+hora+":"+minutos+":"+segundos


    let cadena_comentario = valor+" ||****"+usuario+"****"+tipo+"****"+fecha_actual+'<br>'

    let datos= new FormData()
    datos.append("comentario",cadena_comentario);
    datos.append("id_ticket",id_valor);

    let ajax = new XMLHttpRequest()

       ajax.open("POST","../controlador/agregar_comentario.php")

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    console.log(ajax.responseText)
                    dialogo(ajax.responseText)
                    // respuesta = ajax.responseText
                    // return respuesta
                }
                if (ajax.status == 400) 
                {
                    console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) 
                {
                    console.log("500 Error interno de servidor");
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


function dialogos_cerrar()
{
    let dialogo_mensaje = document.createElement("div")
    dialogo_mensaje.setAttribute("class","contenedor_dialogo_cerrar")
    dialogo_mensaje.innerHTML="Cerrar Ticket"

    let selector = document.createElement("select")
    selector.setAttribute("class", "input_tickets")
    selector.setAttribute("id","selector_motivo")
    let opcion = document.createElement("option")
    opcion.setAttribute("value","NO RESUELTO")
    opcion.innerHTML = "No resuelto"
    let opcion1 = document.createElement("option")
    opcion1.setAttribute("value","RESUELTO")
    opcion1.innerHTML = "Resuelto"
    selector.appendChild(opcion)
    selector.appendChild(opcion1)
    dialogo_mensaje.appendChild(selector)

    let comentario = document.createElement("textarea")
    comentario.setAttribute("id","id_comentario")
    comentario.setAttribute("class", "input_tickets")
    dialogo_mensaje.appendChild(comentario)

    let boton  = document.createElement("div")
    boton.setAttribute("class","boton_alerta")
    boton.setAttribute("onclick","cerrar_alerta(event);")
    boton.innerHTML="Aceptar"
    dialogo_mensaje.appendChild(boton)


    let contenedor = document.getElementById("contenedor")
    let fondo = document.createElement("div")
    fondo.setAttribute("class","contenedor_alerta")
    fondo.setAttribute("id","elemento_dialogo")

    fondo.appendChild(dialogo_mensaje)
    contenedor.appendChild(fondo)

}
function cerrar_alerta(event)
{
    let input_selector = document.getElementById("selector_motivo").value
    let input_comentario = document.getElementById("id_comentario").value.trim()
    let input_ticket = document.getElementById("id_ticket").value
    

    console.log(input_selector)
    console.log(input_comentario)
    console.log(input_ticket)

    if(input_selector.length == 0 || input_comentario == 0)
    {
        dialogo("Ingrese el motivo del cierre de ticket y la justificacion del cierre.")
    }
    else
    {
    let datos= new FormData()
    datos.append("id_ticket",input_ticket);
    datos.append("comentario",input_comentario);
    datos.append("motivo",input_selector);


    let ajax = new XMLHttpRequest()

       ajax.open("POST","../controlador/ticket_cierre.php")

       ajax.send(datos)

       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    console.log(ajax.responseText)
                    dialogo(ajax.responseText)
                    // respuesta = ajax.responseText
                    // return respuesta
                }
                if (ajax.status == 400) 
                {
                    console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) 
                {
                    console.log("500 Error interno de servidor");
                }
            }
        }            
    }

    let elemento = event.target
    let padre = elemento.parentNode.parentNode
    let id_elemento = padre.id
    let borrado = document.getElementById(id_elemento)
    borrado.parentNode.removeChild(borrado)
}


function descargar_ticket()
{
    let referencia = document.getElementById("id_ticket")
    let valor = referencia.value
    window.location.href = "../controlador/crear_pdf.php?token="+valor
}
