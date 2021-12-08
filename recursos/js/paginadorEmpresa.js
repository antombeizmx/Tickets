//funciones para tomar empleados activos
var datos_tickets_empresa
var boton_primero_tickets_pendientes_empresa = document.getElementById("boton_paginador_primero_tickets_pendientes_empresa")
var boton_anterior_tickets_pendientes_empresa = document.getElementById("boton_paginador_anterior_tickets_pendientes_empresa")
var boton_siguiente_tickets_pendientes_empresa = document.getElementById("boton_paginador_siguiente_tickets_pendientes_empresa")
var boton_ultimo_tickets_pendientes_empresa = document.getElementById("boton_paginador_ultimo_tickets_pendientes_empresa")
var cuerpo_tickets_pendientes_empresa = document.getElementById("tabla_tickets_pendientes_empresa")
var indicador_pagina_tickets_pendientes_empresa= document.getElementById("boton_paginador_cantidad_tickets_pendientes_empresa")
var cantidad_vistas_tickets_pendientes_empresa
var pagina_actual_tickets_pendientes_empresa 

function tomar_datos_tickets_pendientes_empresa()
{
    let contenedor = document.getElementById("tabla_tickets_pendientes_empresa")
    cantidad_vistas_tickets_pendientes_empresa = document.getElementById("cantidad_tickets_pendientes_empresa").value
    pagina_actual_tickets_pendientes_empresa = 1
    //alert(cantidad_vistas_tickets_pendientes_dashboard)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/traer_datos_empresa_pendientes.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    //console.log("200 Respuesta Exitosa");
                    console.log(ajax.responseText)
                    datos_tickets_empresa = JSON.parse(ajax.responseText)
                    paginador_tickets_pendientes_empresa(datos_tickets_empresa,pagina_actual_tickets_pendientes_empresa,cantidad_vistas_tickets_pendientes_empresa,boton_anterior_tickets_pendientes_empresa,boton_siguiente_tickets_pendientes_empresa,boton_primero_tickets_pendientes_empresa,boton_ultimo_tickets_pendientes_empresa,cuerpo_tickets_pendientes_empresa,indicador_pagina_tickets_pendientes_empresa)
                }
                if (ajax.status == 400) 
                {
                    console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    console.log("500 Error interno de servidor");
                }
            }            
        }   
}
// agregar evento a botones de paginacion
boton_siguiente_tickets_pendientes_empresa.addEventListener("click", function(){
    pagina_actual_tickets_pendientes_empresa++
    paginador_siguiente_tickets_pendientes_empresa(datos_tickets_empresa,pagina_actual_tickets_pendientes_empresa,cantidad_vistas_tickets_pendientes_empresa,boton_anterior_tickets_pendientes_empresa,boton_siguiente_tickets_pendientes_empresa,boton_primero_tickets_pendientes_empresa,boton_ultimo_tickets_pendientes_empresa,cuerpo_tickets_pendientes_empresa,indicador_pagina_tickets_pendientes_empresa)
})

boton_anterior_tickets_pendientes_empresa.addEventListener("click", function(){
    pagina_actual_tickets_pendientes_empresa--
    paginador_anterior_tickets_pendientes_empresa(datos_tickets_empresa,pagina_actual_tickets_pendientes_empresa,cantidad_vistas_tickets_pendientes_empresa,boton_anterior_tickets_pendientes_empresa,boton_siguiente_tickets_pendientes_empresa,boton_primero_tickets_pendientes_empresa,boton_ultimo_tickets_pendientes_empresa,cuerpo_tickets_pendientes_empresa,indicador_pagina_tickets_pendientes_empresa)
})

boton_primero_tickets_pendientes_empresa.addEventListener("click", function(){
    pagina_actual_tickets_pendientes_empresa = 1 
    paginador_primera_tickets_pendientes_empresa(datos_tickets_empresa,pagina_actual_tickets_pendientes_empresa,cantidad_vistas_tickets_pendientes_empresa,boton_anterior_tickets_pendientes_empresa,boton_siguiente_tickets_pendientes_empresa,boton_primero_tickets_pendientes_empresa,boton_ultimo_tickets_pendientes_empresa,cuerpo_tickets_pendientes_empresa,indicador_pagina_tickets_pendientes_empresa)
})

boton_ultimo_tickets_pendientes_empresa.addEventListener("click", function(){

    var tamano = datos_tickets_empresa.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_pendientes_empresa;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_pendientes_empresa = numero_paginas

    paginador_ultima_tickets_pendientes_empresa(datos_tickets_empresa,pagina_actual_tickets_pendientes_empresa,cantidad_vistas_tickets_pendientes_empresa,boton_anterior_tickets_pendientes_empresa,boton_siguiente_tickets_pendientes_empresa,boton_primero_tickets_pendientes_empresa,boton_ultimo_tickets_pendientes_empresa,cuerpo_tickets_pendientes_empresa,indicador_pagina_tickets_pendientes_empresa)
})

function paginador_tickets_pendientes_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

    var cuerpo = "";
    cuerpo_paginador.innerHTML = "";
    var tamano = arreglo_rutas.length;
    var inicio=pagina_actual-1;
    inicio=inicio*cantidad_vistas;
    var final=pagina_actual*cantidad_vistas;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);

    if (numero_paginas==0) 
    {
        numero_paginas=1;
    }
    if (pagina_actual==1)
    {

        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";

    }
    else
    {

        btn_atras.style="visibility:visible;";
        btn_primera.style="visibility:visible;";
        
    }

    if (pagina_actual==numero_paginas) 
    {
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
    }
    else{
        btn_adelante.style="visibility:visible;";
        btn_ultima.style="visibility:visible;";
    }

    var numero_clase=1;

    //console.log(inicio)
    //console.log(final)
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
    }
    else
    {
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            if(arreglo_rutas[inicio]=="error 400")
            {
                cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
            }
            else
            {

                //crear columnas por cada json con arreglo_rutas[inicio]
                       
                        let id = arreglo_rutas[inicio].id
                        let referencia = arreglo_rutas[inicio].referencia
                        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                        let fechaRegistro = arreglo_rutas[inicio].fechaRegistro
                        let horaRegistro = arreglo_rutas[inicio].horaRegistro
                        let tipoServicio = arreglo_rutas[inicio].tipoServicio
                        let prioridad = arreglo_rutas[inicio].prioridad
                        let estatus = arreglo_rutas[inicio].estatus


                        let fila = document.createElement("tr")

                        let cadena_id = "id_"+id
                        fila.setAttribute("id",id)

                        

                        let columna_id = document.createElement("td")
                        columna_id.setAttribute("class","texto")
                        let input_id = document.createElement("input")
                        input_id.setAttribute("type","text")
                        input_id.setAttribute("value",id)
                        input_id.setAttribute("class","input_paginador")
                        input_id.setAttribute("disabled","true")
                        //columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_folio = document.createElement("td")
                        columna_folio.setAttribute("class","texto")
                        let input_folio = document.createElement("input")
                        input_folio.setAttribute("type","text")
                        input_folio.setAttribute("value",referencia)
                        input_folio.setAttribute("class","input_paginador")
                        input_folio.setAttribute("disabled","true")
                        columna_folio.appendChild(input_folio)
                        //columna_folio.innerHTML = nombreAdministrador
                        fila.appendChild(columna_folio)

                        let columna_nombrempresa = document.createElement("td")
                        columna_nombrempresa.setAttribute("class","texto")
                        let input_nombrempresa = document.createElement("input")
                        input_nombrempresa.setAttribute("type","text")
                        input_nombrempresa.setAttribute("value",nombreEmpresa)
                        input_nombrempresa.setAttribute("class","input_paginador")
                        input_nombrempresa.setAttribute("disabled","true")
                        columna_nombrempresa.appendChild(input_nombrempresa)
                        //columna_nombrempresa.innerHTML = apellidopAdministrador
                        fila.appendChild(columna_nombrempresa)


                        let columna_rfcempresa = document.createElement("td")
                        columna_rfcempresa.setAttribute("class","texto")
                        let input_rfcempresa = document.createElement("input")
                        input_rfcempresa.setAttribute("type","text")
                        input_rfcempresa.setAttribute("value",rfcEmpresa)
                        input_rfcempresa.setAttribute("class","input_paginador")
                        input_rfcempresa.setAttribute("disabled","true")
                        columna_rfcempresa.appendChild(input_rfcempresa)
                        //columna_rfcempresa.innerHTML = apellidomAdministrador
                        fila.appendChild(columna_rfcempresa)

                        let columna_fechaRegistro = document.createElement("td")
                        columna_fechaRegistro.setAttribute("class","texto")
                        let input_fechaRegistro = document.createElement("input")
                        input_fechaRegistro.setAttribute("type","text")
                        input_fechaRegistro.setAttribute("value",fechaRegistro)
                        input_fechaRegistro.setAttribute("class","input_paginador")
                        input_fechaRegistro.setAttribute("disabled","true")
                        columna_fechaRegistro.appendChild(input_fechaRegistro)
                        //columna_fechaRegistro.innerHTML = domicilioAdministrador
                        fila.appendChild(columna_fechaRegistro)

                        let columna_horaRegistro = document.createElement("td")
                        columna_horaRegistro.setAttribute("class","texto")
                        let input_horaRegistro = document.createElement("input")
                        input_horaRegistro.setAttribute("type","text")
                        input_horaRegistro.setAttribute("value",horaRegistro)
                        input_horaRegistro.setAttribute("class","input_paginador")
                        input_horaRegistro.setAttribute("disabled","true")
                        columna_horaRegistro.appendChild(input_horaRegistro)
                        //columna_horaRegistro.innerHTML = numeroextAdministrador
                        fila.appendChild(columna_horaRegistro)

                        let columna_tipo_servicio = document.createElement("td")
                        columna_tipo_servicio.setAttribute("class","texto")
                        let input_tipo_sercivio = document.createElement("input")
                        input_tipo_sercivio.setAttribute("type","text")
                        input_tipo_sercivio.setAttribute("value",tipoServicio)
                        input_tipo_sercivio.setAttribute("class","input_paginador")
                        input_tipo_sercivio.setAttribute("disabled","true")
                        columna_tipo_servicio.appendChild(input_tipo_sercivio)
                        //columna_tipo_servicio.innerHTML = coloniaAdministrador
                        fila.appendChild(columna_tipo_servicio)

                        
                        let columna_prioridad = document.createElement("td")
                        columna_prioridad.setAttribute("class","texto")
                        let input_prioridad = document.createElement("input")
                        input_prioridad.setAttribute("type","text")
                        input_prioridad.setAttribute("value",prioridad)
                        input_prioridad.setAttribute("class","input_paginador")
                        input_prioridad.setAttribute("disabled","true")
                        columna_prioridad.appendChild(input_prioridad)
                        //columna_prioridad.innerHTML = telefonoAdministrador
                        fila.appendChild(columna_prioridad)
                        
                        let columna_estatus = document.createElement("td")
                        columna_estatus.setAttribute("class","texto")
                        let input_estatus = document.createElement("input")
                        input_estatus.setAttribute("type","text")
                        input_estatus.setAttribute("value",estatus)
                        input_estatus.setAttribute("class","input_paginador")
                        input_estatus.setAttribute("disabled","true")
                        columna_estatus.appendChild(input_estatus)
                        //columna_estatus.innerHTML = puestoAdministrador
                        fila.appendChild(columna_estatus)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/editar.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","editar_ticket(event);")
                        columna_editar.appendChild(imagen_editar)
                        fila.appendChild(columna_editar)
                        cuerpo_paginador.appendChild(fila)    
            }	
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    }
}
function paginador_siguiente_tickets_pendientes_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
    // pagina_actual++;
    var cuerpo = "";
    cuerpo_paginador.innerHTML = "";

    var tamano = arreglo_rutas.length;
    var inicio=pagina_actual-1;
    inicio=inicio*cantidad_vistas;
    var final=pagina_actual*cantidad_vistas;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);


    if (pagina_actual==1)
    {
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
    }
    else{
        btn_atras.style="visibility:visible;";
        btn_primera.style="visibility:visible;";
    }

    if (pagina_actual==numero_paginas) 
    {
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
    }
    else{
        btn_adelante.style="visibility:visible;";
        btn_ultima.style="visibility:visible;";
    }

    console.log(inicio)
    console.log(final)
    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
                                   
            let id = arreglo_rutas[inicio].id
            let referencia = arreglo_rutas[inicio].referencia
            let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
            let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
            let fechaRegistro = arreglo_rutas[inicio].fechaRegistro
            let horaRegistro = arreglo_rutas[inicio].horaRegistro
            let tipoServicio = arreglo_rutas[inicio].tipoServicio
            let prioridad = arreglo_rutas[inicio].prioridad
            let estatus = arreglo_rutas[inicio].estatus


            let fila = document.createElement("tr")

            let cadena_id = "id_"+id
            fila.setAttribute("id",id)

            

            let columna_id = document.createElement("td")
            columna_id.setAttribute("class","texto")
            let input_id = document.createElement("input")
            input_id.setAttribute("type","text")
            input_id.setAttribute("value",id)
            input_id.setAttribute("class","input_paginador")
            input_id.setAttribute("disabled","true")
            //columna_id.appendChild(input_id)
            columna_id.innerHTML = id
            fila.appendChild(columna_id)

            let columna_folio = document.createElement("td")
            columna_folio.setAttribute("class","texto")
            let input_folio = document.createElement("input")
            input_folio.setAttribute("type","text")
            input_folio.setAttribute("value",referencia)
            input_folio.setAttribute("class","input_paginador")
            input_folio.setAttribute("disabled","true")
            columna_folio.appendChild(input_folio)
            //columna_folio.innerHTML = nombreAdministrador
            fila.appendChild(columna_folio)

            let columna_nombrempresa = document.createElement("td")
            columna_nombrempresa.setAttribute("class","texto")
            let input_nombrempresa = document.createElement("input")
            input_nombrempresa.setAttribute("type","text")
            input_nombrempresa.setAttribute("value",nombreEmpresa)
            input_nombrempresa.setAttribute("class","input_paginador")
            input_nombrempresa.setAttribute("disabled","true")
            columna_nombrempresa.appendChild(input_nombrempresa)
            //columna_nombrempresa.innerHTML = apellidopAdministrador
            fila.appendChild(columna_nombrempresa)


            let columna_rfcempresa = document.createElement("td")
            columna_rfcempresa.setAttribute("class","texto")
            let input_rfcempresa = document.createElement("input")
            input_rfcempresa.setAttribute("type","text")
            input_rfcempresa.setAttribute("value",rfcEmpresa)
            input_rfcempresa.setAttribute("class","input_paginador")
            input_rfcempresa.setAttribute("disabled","true")
            columna_rfcempresa.appendChild(input_rfcempresa)
            //columna_rfcempresa.innerHTML = apellidomAdministrador
            fila.appendChild(columna_rfcempresa)

            let columna_fechaRegistro = document.createElement("td")
            columna_fechaRegistro.setAttribute("class","texto")
            let input_fechaRegistro = document.createElement("input")
            input_fechaRegistro.setAttribute("type","text")
            input_fechaRegistro.setAttribute("value",fechaRegistro)
            input_fechaRegistro.setAttribute("class","input_paginador")
            input_fechaRegistro.setAttribute("disabled","true")
            columna_fechaRegistro.appendChild(input_fechaRegistro)
            //columna_fechaRegistro.innerHTML = domicilioAdministrador
            fila.appendChild(columna_fechaRegistro)

            let columna_horaRegistro = document.createElement("td")
            columna_horaRegistro.setAttribute("class","texto")
            let input_horaRegistro = document.createElement("input")
            input_horaRegistro.setAttribute("type","text")
            input_horaRegistro.setAttribute("value",horaRegistro)
            input_horaRegistro.setAttribute("class","input_paginador")
            input_horaRegistro.setAttribute("disabled","true")
            columna_horaRegistro.appendChild(input_horaRegistro)
            //columna_horaRegistro.innerHTML = numeroextAdministrador
            fila.appendChild(columna_horaRegistro)

            let columna_tipo_servicio = document.createElement("td")
            columna_tipo_servicio.setAttribute("class","texto")
            let input_tipo_sercivio = document.createElement("input")
            input_tipo_sercivio.setAttribute("type","text")
            input_tipo_sercivio.setAttribute("value",tipoServicio)
            input_tipo_sercivio.setAttribute("class","input_paginador")
            input_tipo_sercivio.setAttribute("disabled","true")
            columna_tipo_servicio.appendChild(input_tipo_sercivio)
            //columna_tipo_servicio.innerHTML = coloniaAdministrador
            fila.appendChild(columna_tipo_servicio)

            
            let columna_prioridad = document.createElement("td")
            columna_prioridad.setAttribute("class","texto")
            let input_prioridad = document.createElement("input")
            input_prioridad.setAttribute("type","text")
            input_prioridad.setAttribute("value",prioridad)
            input_prioridad.setAttribute("class","input_paginador")
            input_prioridad.setAttribute("disabled","true")
            columna_prioridad.appendChild(input_prioridad)
            //columna_prioridad.innerHTML = telefonoAdministrador
            fila.appendChild(columna_prioridad)
            
            let columna_estatus = document.createElement("td")
            columna_estatus.setAttribute("class","texto")
            let input_estatus = document.createElement("input")
            input_estatus.setAttribute("type","text")
            input_estatus.setAttribute("value",estatus)
            input_estatus.setAttribute("class","input_paginador")
            input_estatus.setAttribute("disabled","true")
            columna_estatus.appendChild(input_estatus)
            //columna_estatus.innerHTML = puestoAdministrador
            fila.appendChild(columna_estatus)

            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/editar.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","editar_ticket(event);")
            columna_editar.appendChild(imagen_editar)
            fila.appendChild(columna_editar)
            cuerpo_paginador.appendChild(fila)   
                            
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }

    // cuerpo_paginador.innerHTML=cuerpo;
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    
}
function paginador_anterior_tickets_pendientes_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
{
// pagina_actual--;
var cuerpo = "";
cuerpo_paginador.innerHTML = "";
var tamano = arreglo_rutas.length;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);
if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}
console.log(inicio)
console.log(final)

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaRegistro = arreglo_rutas[inicio].fechaRegistro
    let horaRegistro = arreglo_rutas[inicio].horaRegistro
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaRegistro = document.createElement("td")
    columna_fechaRegistro.setAttribute("class","texto")
    let input_fechaRegistro = document.createElement("input")
    input_fechaRegistro.setAttribute("type","text")
    input_fechaRegistro.setAttribute("value",fechaRegistro)
    input_fechaRegistro.setAttribute("class","input_paginador")
    input_fechaRegistro.setAttribute("disabled","true")
    columna_fechaRegistro.appendChild(input_fechaRegistro)
    //columna_fechaRegistro.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaRegistro)

    let columna_horaRegistro = document.createElement("td")
    columna_horaRegistro.setAttribute("class","texto")
    let input_horaRegistro = document.createElement("input")
    input_horaRegistro.setAttribute("type","text")
    input_horaRegistro.setAttribute("value",horaRegistro)
    input_horaRegistro.setAttribute("class","input_paginador")
    input_horaRegistro.setAttribute("disabled","true")
    columna_horaRegistro.appendChild(input_horaRegistro)
    //columna_horaRegistro.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaRegistro)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/editar.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}

// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
function paginador_primera_tickets_pendientes_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

cuerpo_paginador.innerHTML = "";
var cuerpo = "";
pagina_actual=1;
var tamano = arreglo_rutas.length;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);

if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}

console.log(inicio)
console.log(final)

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaRegistro = arreglo_rutas[inicio].fechaRegistro
    let horaRegistro = arreglo_rutas[inicio].horaRegistro
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaRegistro = document.createElement("td")
    columna_fechaRegistro.setAttribute("class","texto")
    let input_fechaRegistro = document.createElement("input")
    input_fechaRegistro.setAttribute("type","text")
    input_fechaRegistro.setAttribute("value",fechaRegistro)
    input_fechaRegistro.setAttribute("class","input_paginador")
    input_fechaRegistro.setAttribute("disabled","true")
    columna_fechaRegistro.appendChild(input_fechaRegistro)
    //columna_fechaRegistro.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaRegistro)

    let columna_horaRegistro = document.createElement("td")
    columna_horaRegistro.setAttribute("class","texto")
    let input_horaRegistro = document.createElement("input")
    input_horaRegistro.setAttribute("type","text")
    input_horaRegistro.setAttribute("value",horaRegistro)
    input_horaRegistro.setAttribute("class","input_paginador")
    input_horaRegistro.setAttribute("disabled","true")
    columna_horaRegistro.appendChild(input_horaRegistro)
    //columna_horaRegistro.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaRegistro)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/editar.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
function paginador_ultima_tickets_pendientes_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
var cuerpo = "";
cuerpo_paginador.innerHTML="";
var tamano = arreglo_rutas.length;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);
pagina_actual=numero_paginas;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;


if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}

console.log(inicio)
console.log(final)
var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaRegistro = arreglo_rutas[inicio].fechaRegistro
    let horaRegistro = arreglo_rutas[inicio].horaRegistro
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaRegistro = document.createElement("td")
    columna_fechaRegistro.setAttribute("class","texto")
    let input_fechaRegistro = document.createElement("input")
    input_fechaRegistro.setAttribute("type","text")
    input_fechaRegistro.setAttribute("value",fechaRegistro)
    input_fechaRegistro.setAttribute("class","input_paginador")
    input_fechaRegistro.setAttribute("disabled","true")
    columna_fechaRegistro.appendChild(input_fechaRegistro)
    //columna_fechaRegistro.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaRegistro)

    let columna_horaRegistro = document.createElement("td")
    columna_horaRegistro.setAttribute("class","texto")
    let input_horaRegistro = document.createElement("input")
    input_horaRegistro.setAttribute("type","text")
    input_horaRegistro.setAttribute("value",horaRegistro)
    input_horaRegistro.setAttribute("class","input_paginador")
    input_horaRegistro.setAttribute("disabled","true")
    columna_horaRegistro.appendChild(input_horaRegistro)
    //columna_horaRegistro.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaRegistro)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/editar.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}

//funciones para tomar empleados activos
var datos_tickets_NoResuelto_empresa
var boton_primero_tickets_NoResuelto_empresa = document.getElementById("boton_paginador_primero_tickets_NoResuelto_empresa")
var boton_anterior_tickets_NoResuelto_empresa = document.getElementById("boton_paginador_anterior_tickets_NoResuelto_empresa")
var boton_siguiente_tickets_NoResuelto_empresa = document.getElementById("boton_paginador_siguiente_tickets_NoResuelto_empresa")
var boton_ultimo_tickets_NoResuelto_empresa = document.getElementById("boton_paginador_ultimo_tickets_NoResuelto_empresa")
var cuerpo_tickets_NoResuelto_empresa = document.getElementById("tabla_tickets_NoResuelto_empresa")
var indicador_pagina_tickets_NoResuelto_empresa= document.getElementById("boton_paginador_cantidad_tickets_NoResuelto_empresa")
var cantidad_vistas_tickets_NoResuelto_empresa
var pagina_actual_tickets_NoResuelto_empresa 


function tomar_datos_tickets_NoResuelto_empresa()
{
    let contenedor = document.getElementById("tabla_tickets_NoResuelto_empresa")
    cantidad_vistas_tickets_NoResuelto_empresa = document.getElementById("cantidad_tickets_NoResuelto_empresa").value
    pagina_actual_tickets_NoResuelto_empresa = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_datos_tickets_noresuelto_empresa.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_tickets_NoResuelto_empresa = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_tickets_NoResuelto_empresa(datos_tickets_NoResuelto_empresa,pagina_actual_tickets_NoResuelto_empresa,cantidad_vistas_tickets_NoResuelto_empresa,boton_anterior_tickets_NoResuelto_empresa,boton_siguiente_tickets_NoResuelto_empresa,boton_primero_tickets_NoResuelto_empresa,boton_ultimo_tickets_NoResuelto_empresa,cuerpo_tickets_NoResuelto_empresa,indicador_pagina_tickets_NoResuelto_empresa)
                }
                if (ajax.status == 400) 
                {
                    console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    console.log("500 Error interno de servidor");
                }
            }            
        }   
}
// agregar evento a botones de paginacion
boton_siguiente_tickets_NoResuelto_empresa.addEventListener("click", function(){
    pagina_actual_tickets_NoResuelto_empresa++
    paginador_siguiente_tickets_NoResuelto_empresa(datos_tickets_NoResuelto,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
})

boton_anterior_tickets_NoResuelto_empresa.addEventListener("click", function(){
    pagina_actual_tickets_NoResuelto_empresa--
    paginador_anterior_tickets_NoResuelto_empresa(datos_tickets_NoResuelto_empresa,pagina_actual_tickets_NoResuelto_empresa,cantidad_vistas_tickets_NoResuelto_empresa,boton_anterior_tickets_NoResuelto_empresa,boton_siguiente_tickets_NoResuelto_empresa,boton_primero_tickets_NoResuelto_empresa,boton_ultimo_tickets_NoResuelto_empresa,cuerpo_tickets_NoResuelto_empresa,indicador_pagina_tickets_NoResuelto_empresa)
})

boton_primero_tickets_NoResuelto_empresa.addEventListener("click", function(){
    pagina_actual_tickets_NoResuelto_empresa = 1 
    paginador_primera_tickets_NoResuelto_empresa(datos_tickets_NoResuelto_empresa,pagina_actual_tickets_NoResuelto_empresa,cantidad_vistas_tickets_NoResuelto_empresa,boton_anterior_tickets_NoResuelto_empresa,boton_siguiente_tickets_NoResuelto_empresa,boton_primero_tickets_NoResuelto_empresa,boton_ultimo_tickets_NoResuelto_empresa,cuerpo_tickets_NoResuelto_empresa,indicador_pagina_tickets_NoResuelto_empresa)
})

boton_ultimo_tickets_NoResuelto_empresa.addEventListener("click", function(){

    var tamano = datos_tickets_NoResuelto_empresa.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_NoResuelto_empresa;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_NoResuelto_empresa = numero_paginas

    paginador_ultima_tickets_NoResuelto_empresa(datos_tickets_NoResuelto_empresa,pagina_actual_tickets_NoResuelto_empresa,cantidad_vistas_tickets_NoResuelto_empresa,boton_anterior_tickets_NoResuelto_empresa,boton_siguiente_tickets_NoResuelto_empresa,boton_primero_tickets_NoResuelto_empresa,boton_ultimo_tickets_NoResuelto_empresa,cuerpo_tickets_NoResuelto_empresa,indicador_pagina_tickets_NoResuelto_empresa)
})

function paginador_tickets_NoResuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

    var cuerpo = "";
    cuerpo_paginador.innerHTML = "";
    var tamano = arreglo_rutas.length;
    var inicio=pagina_actual-1;
    inicio=inicio*cantidad_vistas;
    var final=pagina_actual*cantidad_vistas;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);

    if (numero_paginas==0) 
    {
        numero_paginas=1;
    }
    if (pagina_actual==1)
    {

        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";

    }
    else
    {

        btn_atras.style="visibility:visible;";
        btn_primera.style="visibility:visible;";
        
    }

    if (pagina_actual==numero_paginas) 
    {
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
    }
    else{
        btn_adelante.style="visibility:visible;";
        btn_ultima.style="visibility:visible;";
    }

    var numero_clase=1;

    //console.log(inicio)
    //console.log(final)
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
    }
    else
    {
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            if(arreglo_rutas[inicio]=="error 400")
            {
                cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
            }
            else
            {

                //crear columnas por cada json con arreglo_rutas[inicio]
                       
                        let id = arreglo_rutas[inicio].id
                        let referencia = arreglo_rutas[inicio].referencia
                        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                        let fechaCierre = arreglo_rutas[inicio].fechaCierre
                        let horaCierre = arreglo_rutas[inicio].horaCierre
                        let tipoServicio = arreglo_rutas[inicio].tipoServicio
                        let prioridad = arreglo_rutas[inicio].prioridad
                        let estatus = arreglo_rutas[inicio].estatus


                        let fila = document.createElement("tr")

                        let cadena_id = "id_"+id
                        fila.setAttribute("id",id)

                        

                        let columna_id = document.createElement("td")
                        columna_id.setAttribute("class","texto")
                        let input_id = document.createElement("input")
                        input_id.setAttribute("type","text")
                        input_id.setAttribute("value",id)
                        input_id.setAttribute("class","input_paginador")
                        input_id.setAttribute("disabled","true")
                        //columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_folio = document.createElement("td")
                        columna_folio.setAttribute("class","texto")
                        let input_folio = document.createElement("input")
                        input_folio.setAttribute("type","text")
                        input_folio.setAttribute("value",referencia)
                        input_folio.setAttribute("class","input_paginador")
                        input_folio.setAttribute("disabled","true")
                        columna_folio.appendChild(input_folio)
                        //columna_folio.innerHTML = nombreAdministrador
                        fila.appendChild(columna_folio)

                        let columna_nombrempresa = document.createElement("td")
                        columna_nombrempresa.setAttribute("class","texto")
                        let input_nombrempresa = document.createElement("input")
                        input_nombrempresa.setAttribute("type","text")
                        input_nombrempresa.setAttribute("value",nombreEmpresa)
                        input_nombrempresa.setAttribute("class","input_paginador")
                        input_nombrempresa.setAttribute("disabled","true")
                        columna_nombrempresa.appendChild(input_nombrempresa)
                        //columna_nombrempresa.innerHTML = apellidopAdministrador
                        fila.appendChild(columna_nombrempresa)


                        let columna_rfcempresa = document.createElement("td")
                        columna_rfcempresa.setAttribute("class","texto")
                        let input_rfcempresa = document.createElement("input")
                        input_rfcempresa.setAttribute("type","text")
                        input_rfcempresa.setAttribute("value",rfcEmpresa)
                        input_rfcempresa.setAttribute("class","input_paginador")
                        input_rfcempresa.setAttribute("disabled","true")
                        columna_rfcempresa.appendChild(input_rfcempresa)
                        //columna_rfcempresa.innerHTML = apellidomAdministrador
                        fila.appendChild(columna_rfcempresa)

                        let columna_fechaCierre = document.createElement("td")
                        columna_fechaCierre.setAttribute("class","texto")
                        let input_fechaCierre = document.createElement("input")
                        input_fechaCierre.setAttribute("type","text")
                        input_fechaCierre.setAttribute("value",fechaCierre)
                        input_fechaCierre.setAttribute("class","input_paginador")
                        input_fechaCierre.setAttribute("disabled","true")
                        columna_fechaCierre.appendChild(input_fechaCierre)
                        //columna_fechaCierre.innerHTML = domicilioAdministrador
                        fila.appendChild(columna_fechaCierre)

                        let columna_horaCierre = document.createElement("td")
                        columna_horaCierre.setAttribute("class","texto")
                        let input_horaCierre = document.createElement("input")
                        input_horaCierre.setAttribute("type","text")
                        input_horaCierre.setAttribute("value",horaCierre)
                        input_horaCierre.setAttribute("class","input_paginador")
                        input_horaCierre.setAttribute("disabled","true")
                        columna_horaCierre.appendChild(input_horaCierre)
                        //columna_horaCierre.innerHTML = numeroextAdministrador
                        fila.appendChild(columna_horaCierre)

                        let columna_tipo_servicio = document.createElement("td")
                        columna_tipo_servicio.setAttribute("class","texto")
                        let input_tipo_sercivio = document.createElement("input")
                        input_tipo_sercivio.setAttribute("type","text")
                        input_tipo_sercivio.setAttribute("value",tipoServicio)
                        input_tipo_sercivio.setAttribute("class","input_paginador")
                        input_tipo_sercivio.setAttribute("disabled","true")
                        columna_tipo_servicio.appendChild(input_tipo_sercivio)
                        //columna_tipo_servicio.innerHTML = coloniaAdministrador
                        fila.appendChild(columna_tipo_servicio)

                        
                        let columna_prioridad = document.createElement("td")
                        columna_prioridad.setAttribute("class","texto")
                        let input_prioridad = document.createElement("input")
                        input_prioridad.setAttribute("type","text")
                        input_prioridad.setAttribute("value",prioridad)
                        input_prioridad.setAttribute("class","input_paginador")
                        input_prioridad.setAttribute("disabled","true")
                        columna_prioridad.appendChild(input_prioridad)
                        //columna_prioridad.innerHTML = telefonoAdministrador
                        fila.appendChild(columna_prioridad)
                        
                        let columna_estatus = document.createElement("td")
                        columna_estatus.setAttribute("class","texto")
                        let input_estatus = document.createElement("input")
                        input_estatus.setAttribute("type","text")
                        input_estatus.setAttribute("value",estatus)
                        input_estatus.setAttribute("class","input_paginador")
                        input_estatus.setAttribute("disabled","true")
                        columna_estatus.appendChild(input_estatus)
                        //columna_estatus.innerHTML = puestoAdministrador
                        fila.appendChild(columna_estatus)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/ver.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","editar_ticket(event);")
                        columna_editar.appendChild(imagen_editar)
                        fila.appendChild(columna_editar)
                        cuerpo_paginador.appendChild(fila)    
            }	
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    }
}
function paginador_siguiente_tickets_NoResuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
    // pagina_actual++;
    var cuerpo = "";
    cuerpo_paginador.innerHTML = "";

    var tamano = arreglo_rutas.length;
    var inicio=pagina_actual-1;
    inicio=inicio*cantidad_vistas;
    var final=pagina_actual*cantidad_vistas;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);


    if (pagina_actual==1)
    {
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
    }
    else{
        btn_atras.style="visibility:visible;";
        btn_primera.style="visibility:visible;";
    }

    if (pagina_actual==numero_paginas) 
    {
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
    }
    else{
        btn_adelante.style="visibility:visible;";
        btn_ultima.style="visibility:visible;";
    }

    console.log(inicio)
    console.log(final)
    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
                                   
            let id = arreglo_rutas[inicio].id
            let referencia = arreglo_rutas[inicio].referencia
            let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
            let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
            let fechaCierre = arreglo_rutas[inicio].fechaCierre
            let horaCierre = arreglo_rutas[inicio].horaCierre
            let tipoServicio = arreglo_rutas[inicio].tipoServicio
            let prioridad = arreglo_rutas[inicio].prioridad
            let estatus = arreglo_rutas[inicio].estatus


            let fila = document.createElement("tr")

            let cadena_id = "id_"+id
            fila.setAttribute("id",id)

            

            let columna_id = document.createElement("td")
            columna_id.setAttribute("class","texto")
            let input_id = document.createElement("input")
            input_id.setAttribute("type","text")
            input_id.setAttribute("value",id)
            input_id.setAttribute("class","input_paginador")
            input_id.setAttribute("disabled","true")
            //columna_id.appendChild(input_id)
            columna_id.innerHTML = id
            fila.appendChild(columna_id)

            let columna_folio = document.createElement("td")
            columna_folio.setAttribute("class","texto")
            let input_folio = document.createElement("input")
            input_folio.setAttribute("type","text")
            input_folio.setAttribute("value",referencia)
            input_folio.setAttribute("class","input_paginador")
            input_folio.setAttribute("disabled","true")
            columna_folio.appendChild(input_folio)
            //columna_folio.innerHTML = nombreAdministrador
            fila.appendChild(columna_folio)

            let columna_nombrempresa = document.createElement("td")
            columna_nombrempresa.setAttribute("class","texto")
            let input_nombrempresa = document.createElement("input")
            input_nombrempresa.setAttribute("type","text")
            input_nombrempresa.setAttribute("value",nombreEmpresa)
            input_nombrempresa.setAttribute("class","input_paginador")
            input_nombrempresa.setAttribute("disabled","true")
            columna_nombrempresa.appendChild(input_nombrempresa)
            //columna_nombrempresa.innerHTML = apellidopAdministrador
            fila.appendChild(columna_nombrempresa)


            let columna_rfcempresa = document.createElement("td")
            columna_rfcempresa.setAttribute("class","texto")
            let input_rfcempresa = document.createElement("input")
            input_rfcempresa.setAttribute("type","text")
            input_rfcempresa.setAttribute("value",rfcEmpresa)
            input_rfcempresa.setAttribute("class","input_paginador")
            input_rfcempresa.setAttribute("disabled","true")
            columna_rfcempresa.appendChild(input_rfcempresa)
            //columna_rfcempresa.innerHTML = apellidomAdministrador
            fila.appendChild(columna_rfcempresa)

            let columna_fechaCierre = document.createElement("td")
            columna_fechaCierre.setAttribute("class","texto")
            let input_fechaCierre = document.createElement("input")
            input_fechaCierre.setAttribute("type","text")
            input_fechaCierre.setAttribute("value",fechaCierre)
            input_fechaCierre.setAttribute("class","input_paginador")
            input_fechaCierre.setAttribute("disabled","true")
            columna_fechaCierre.appendChild(input_fechaCierre)
            //columna_fechaCierre.innerHTML = domicilioAdministrador
            fila.appendChild(columna_fechaCierre)

            let columna_horaCierre = document.createElement("td")
            columna_horaCierre.setAttribute("class","texto")
            let input_horaCierre = document.createElement("input")
            input_horaCierre.setAttribute("type","text")
            input_horaCierre.setAttribute("value",horaCierre)
            input_horaCierre.setAttribute("class","input_paginador")
            input_horaCierre.setAttribute("disabled","true")
            columna_horaCierre.appendChild(input_horaCierre)
            //columna_horaCierre.innerHTML = numeroextAdministrador
            fila.appendChild(columna_horaCierre)

            let columna_tipo_servicio = document.createElement("td")
            columna_tipo_servicio.setAttribute("class","texto")
            let input_tipo_sercivio = document.createElement("input")
            input_tipo_sercivio.setAttribute("type","text")
            input_tipo_sercivio.setAttribute("value",tipoServicio)
            input_tipo_sercivio.setAttribute("class","input_paginador")
            input_tipo_sercivio.setAttribute("disabled","true")
            columna_tipo_servicio.appendChild(input_tipo_sercivio)
            //columna_tipo_servicio.innerHTML = coloniaAdministrador
            fila.appendChild(columna_tipo_servicio)

            
            let columna_prioridad = document.createElement("td")
            columna_prioridad.setAttribute("class","texto")
            let input_prioridad = document.createElement("input")
            input_prioridad.setAttribute("type","text")
            input_prioridad.setAttribute("value",prioridad)
            input_prioridad.setAttribute("class","input_paginador")
            input_prioridad.setAttribute("disabled","true")
            columna_prioridad.appendChild(input_prioridad)
            //columna_prioridad.innerHTML = telefonoAdministrador
            fila.appendChild(columna_prioridad)
            
            let columna_estatus = document.createElement("td")
            columna_estatus.setAttribute("class","texto")
            let input_estatus = document.createElement("input")
            input_estatus.setAttribute("type","text")
            input_estatus.setAttribute("value",estatus)
            input_estatus.setAttribute("class","input_paginador")
            input_estatus.setAttribute("disabled","true")
            columna_estatus.appendChild(input_estatus)
            //columna_estatus.innerHTML = puestoAdministrador
            fila.appendChild(columna_estatus)

            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/ver.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","editar_ticket(event);")
            columna_editar.appendChild(imagen_editar)
            fila.appendChild(columna_editar)
            cuerpo_paginador.appendChild(fila)   
                            
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }

    // cuerpo_paginador.innerHTML=cuerpo;
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    
}
function paginador_anterior_tickets_NoResuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
{
// pagina_actual--;
var cuerpo = "";
cuerpo_paginador.innerHTML = "";
var tamano = arreglo_rutas.length;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);
if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}
console.log(inicio)
console.log(final)

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaCierre = arreglo_rutas[inicio].fechaCierre
    let horaCierre = arreglo_rutas[inicio].horaCierre
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaCierre = document.createElement("td")
    columna_fechaCierre.setAttribute("class","texto")
    let input_fechaCierre = document.createElement("input")
    input_fechaCierre.setAttribute("type","text")
    input_fechaCierre.setAttribute("value",fechaCierre)
    input_fechaCierre.setAttribute("class","input_paginador")
    input_fechaCierre.setAttribute("disabled","true")
    columna_fechaCierre.appendChild(input_fechaCierre)
    //columna_fechaCierre.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaCierre)

    let columna_horaCierre = document.createElement("td")
    columna_horaCierre.setAttribute("class","texto")
    let input_horaCierre = document.createElement("input")
    input_horaCierre.setAttribute("type","text")
    input_horaCierre.setAttribute("value",horaCierre)
    input_horaCierre.setAttribute("class","input_paginador")
    input_horaCierre.setAttribute("disabled","true")
    columna_horaCierre.appendChild(input_horaCierre)
    //columna_horaCierre.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaCierre)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/ver.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}

// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
function paginador_primera_tickets_NoResuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

cuerpo_paginador.innerHTML = "";
var cuerpo = "";
pagina_actual=1;
var tamano = arreglo_rutas.length;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);

if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}

console.log(inicio)
console.log(final)

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaCierre = arreglo_rutas[inicio].fechaCierre
    let horaCierre = arreglo_rutas[inicio].horaCierre
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaCierre = document.createElement("td")
    columna_fechaCierre.setAttribute("class","texto")
    let input_fechaCierre = document.createElement("input")
    input_fechaCierre.setAttribute("type","text")
    input_fechaCierre.setAttribute("value",fechaCierre)
    input_fechaCierre.setAttribute("class","input_paginador")
    input_fechaCierre.setAttribute("disabled","true")
    columna_fechaCierre.appendChild(input_fechaCierre)
    //columna_fechaCierre.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaCierre)

    let columna_horaCierre = document.createElement("td")
    columna_horaCierre.setAttribute("class","texto")
    let input_horaCierre = document.createElement("input")
    input_horaCierre.setAttribute("type","text")
    input_horaCierre.setAttribute("value",horaCierre)
    input_horaCierre.setAttribute("class","input_paginador")
    input_horaCierre.setAttribute("disabled","true")
    columna_horaCierre.appendChild(input_horaCierre)
    //columna_horaCierre.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaCierre)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/ver.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
function paginador_ultima_tickets_NoResuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
var cuerpo = "";
cuerpo_paginador.innerHTML="";
var tamano = arreglo_rutas.length;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);
pagina_actual=numero_paginas;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;


if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}

console.log(inicio)
console.log(final)
var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaCierre = arreglo_rutas[inicio].fechaCierre
    let horaCierre = arreglo_rutas[inicio].horaCierre
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaCierre = document.createElement("td")
    columna_fechaCierre.setAttribute("class","texto")
    let input_fechaCierre = document.createElement("input")
    input_fechaCierre.setAttribute("type","text")
    input_fechaCierre.setAttribute("value",fechaCierre)
    input_fechaCierre.setAttribute("class","input_paginador")
    input_fechaCierre.setAttribute("disabled","true")
    columna_fechaCierre.appendChild(input_fechaCierre)
    //columna_fechaCierre.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaCierre)

    let columna_horaCierre = document.createElement("td")
    columna_horaCierre.setAttribute("class","texto")
    let input_horaCierre = document.createElement("input")
    input_horaCierre.setAttribute("type","text")
    input_horaCierre.setAttribute("value",horaCierre)
    input_horaCierre.setAttribute("class","input_paginador")
    input_horaCierre.setAttribute("disabled","true")
    columna_horaCierre.appendChild(input_horaCierre)
    //columna_horaCierre.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaCierre)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/ver.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}



//funciones para tomar empleados activos
var datos_tickets_Resuelto_empresa
var boton_primero_tickets_Resuelto_empresa = document.getElementById("boton_paginador_primero_tickets_Resuelto_empresa")
var boton_anterior_tickets_Resuelto_empresa = document.getElementById("boton_paginador_anterior_tickets_Resuelto_empresa")
var boton_siguiente_tickets_Resuelto_empresa = document.getElementById("boton_paginador_siguiente_tickets_Resuelto_empresa")
var boton_ultimo_tickets_Resuelto_empresa = document.getElementById("boton_paginador_ultimo_tickets_Resuelto_empresa")
var cuerpo_tickets_Resuelto_empresa = document.getElementById("tabla_tickets_Resuelto_empresa")
var indicador_pagina_tickets_Resuelto_empresa= document.getElementById("boton_paginador_cantidad_tickets_Resuelto_empresa")
var cantidad_vistas_tickets_Resuelto_empresa
var pagina_actual_tickets_Resuelto_empresa 


function tomar_datos_tickets_Resuelto_empresa()
{
    let contenedor = document.getElementById("tabla_tickets_Resuelto_empresa")
    cantidad_vistas_tickets_Resuelto_empresa = document.getElementById("cantidad_tickets_Resuelto_empresa").value
    pagina_actual_tickets_Resuelto_empresa = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_datos_tickets_resuelto_empresa.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_tickets_Resuelto_empresa = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_tickets_Resuelto_empresa(datos_tickets_Resuelto_empresa,pagina_actual_tickets_Resuelto_empresa,cantidad_vistas_tickets_Resuelto_empresa,boton_anterior_tickets_Resuelto_empresa,boton_siguiente_tickets_Resuelto_empresa,boton_primero_tickets_Resuelto_empresa,boton_ultimo_tickets_Resuelto_empresa,cuerpo_tickets_Resuelto_empresa,indicador_pagina_tickets_Resuelto_empresa)
                }
                if (ajax.status == 400) 
                {
                    console.log("400 El servidor no entendió la petición");
                }
                if (ajax.status == 404)
                {
                    console.log("404 Página no encontrada");
                }
                if (ajax.status == 500) {
                    console.log("500 Error interno de servidor");
                }
            }            
        }   
}
// agregar evento a botones de paginacion
boton_siguiente_tickets_Resuelto_empresa.addEventListener("click", function(){
    pagina_actual_tickets_Resuelto_empresa++
    paginador_siguiente_tickets_Resuelto_empresa(datos_tickets_Resuelto_empresa,pagina_actual_tickets_Resuelto_empresa,cantidad_vistas_tickets_Resuelto_empresa,boton_anterior_tickets_Resuelto_empresa,boton_siguiente_tickets_Resuelto_empresa,boton_primero_tickets_Resuelto_empresa,boton_ultimo_tickets_Resuelto_empresa,cuerpo_tickets_Resuelto_empresa,indicador_pagina_tickets_Resuelto_empresa)
})

boton_anterior_tickets_Resuelto_empresa.addEventListener("click", function(){
    pagina_actual_tickets_Resuelto_empresa--
    paginador_anterior_tickets_Resuelto_empresa(datos_tickets_Resuelto_empresa,pagina_actual_tickets_Resuelto_empresa,cantidad_vistas_tickets_Resuelto_empresa,boton_anterior_tickets_Resuelto_empresa,boton_siguiente_tickets_Resuelto_empresa,boton_primero_tickets_Resuelto_empresa,boton_ultimo_tickets_Resuelto_empresa,cuerpo_tickets_Resuelto_empresa,indicador_pagina_tickets_Resuelto_empresa)
})

boton_primero_tickets_Resuelto_empresa.addEventListener("click", function(){
    pagina_actual_tickets_Resuelto_empresa = 1 
    paginador_primera_tickets_Resuelto_empresa(datos_tickets_Resuelto_empresa,pagina_actual_tickets_Resuelto_empresa,cantidad_vistas_tickets_Resuelto_empresa,boton_anterior_tickets_Resuelto_empresa,boton_siguiente_tickets_Resuelto_empresa,boton_primero_tickets_Resuelto_empresa,boton_ultimo_tickets_Resuelto_empresa,cuerpo_tickets_Resuelto_empresa,indicador_pagina_tickets_Resuelto_empresa)
})

boton_ultimo_tickets_Resuelto_empresa.addEventListener("click", function(){

    var tamano = datos_tickets_Resuelto_empresa.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_Resuelto_empresa;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_Resuelto_empresa = numero_paginas

    paginador_ultima_tickets_Resuelto_empresa(datos_tickets_Resuelto_empresa,pagina_actual_tickets_Resuelto_empresa,cantidad_vistas_tickets_Resuelto_empresa,boton_anterior_tickets_Resuelto_empresa,boton_siguiente_tickets_Resuelto_empresa,boton_primero_tickets_Resuelto_empresa,boton_ultimo_tickets_Resuelto_empresa,cuerpo_tickets_Resuelto_empresa,indicador_pagina_tickets_Resuelto_empresa)
})

function paginador_tickets_Resuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

    var cuerpo = "";
    cuerpo_paginador.innerHTML = "";
    var tamano = arreglo_rutas.length;
    var inicio=pagina_actual-1;
    inicio=inicio*cantidad_vistas;
    var final=pagina_actual*cantidad_vistas;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);

    if (numero_paginas==0) 
    {
        numero_paginas=1;
    }
    if (pagina_actual==1)
    {

        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";

    }
    else
    {

        btn_atras.style="visibility:visible;";
        btn_primera.style="visibility:visible;";
        
    }

    if (pagina_actual==numero_paginas) 
    {
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
    }
    else{
        btn_adelante.style="visibility:visible;";
        btn_ultima.style="visibility:visible;";
    }

    var numero_clase=1;

    //console.log(inicio)
    //console.log(final)
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
    }
    else
    {
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            if(arreglo_rutas[inicio]=="error 400")
            {
                cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
            }
            else
            {

                //crear columnas por cada json con arreglo_rutas[inicio]
                       
                        let id = arreglo_rutas[inicio].id
                        let referencia = arreglo_rutas[inicio].referencia
                        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                        let fechaCierre = arreglo_rutas[inicio].fechaCierre
                        let horaCierre = arreglo_rutas[inicio].horaCierre
                        let tipoServicio = arreglo_rutas[inicio].tipoServicio
                        let prioridad = arreglo_rutas[inicio].prioridad
                        let estatus = arreglo_rutas[inicio].estatus


                        let fila = document.createElement("tr")

                        let cadena_id = "id_"+id
                        fila.setAttribute("id",id)

                        

                        let columna_id = document.createElement("td")
                        columna_id.setAttribute("class","texto")
                        let input_id = document.createElement("input")
                        input_id.setAttribute("type","text")
                        input_id.setAttribute("value",id)
                        input_id.setAttribute("class","input_paginador")
                        input_id.setAttribute("disabled","true")
                        //columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_folio = document.createElement("td")
                        columna_folio.setAttribute("class","texto")
                        let input_folio = document.createElement("input")
                        input_folio.setAttribute("type","text")
                        input_folio.setAttribute("value",referencia)
                        input_folio.setAttribute("class","input_paginador")
                        input_folio.setAttribute("disabled","true")
                        columna_folio.appendChild(input_folio)
                        //columna_folio.innerHTML = nombreAdministrador
                        fila.appendChild(columna_folio)

                        let columna_nombrempresa = document.createElement("td")
                        columna_nombrempresa.setAttribute("class","texto")
                        let input_nombrempresa = document.createElement("input")
                        input_nombrempresa.setAttribute("type","text")
                        input_nombrempresa.setAttribute("value",nombreEmpresa)
                        input_nombrempresa.setAttribute("class","input_paginador")
                        input_nombrempresa.setAttribute("disabled","true")
                        columna_nombrempresa.appendChild(input_nombrempresa)
                        //columna_nombrempresa.innerHTML = apellidopAdministrador
                        fila.appendChild(columna_nombrempresa)


                        let columna_rfcempresa = document.createElement("td")
                        columna_rfcempresa.setAttribute("class","texto")
                        let input_rfcempresa = document.createElement("input")
                        input_rfcempresa.setAttribute("type","text")
                        input_rfcempresa.setAttribute("value",rfcEmpresa)
                        input_rfcempresa.setAttribute("class","input_paginador")
                        input_rfcempresa.setAttribute("disabled","true")
                        columna_rfcempresa.appendChild(input_rfcempresa)
                        //columna_rfcempresa.innerHTML = apellidomAdministrador
                        fila.appendChild(columna_rfcempresa)

                        let columna_fechaCierre = document.createElement("td")
                        columna_fechaCierre.setAttribute("class","texto")
                        let input_fechaCierre = document.createElement("input")
                        input_fechaCierre.setAttribute("type","text")
                        input_fechaCierre.setAttribute("value",fechaCierre)
                        input_fechaCierre.setAttribute("class","input_paginador")
                        input_fechaCierre.setAttribute("disabled","true")
                        columna_fechaCierre.appendChild(input_fechaCierre)
                        //columna_fechaCierre.innerHTML = domicilioAdministrador
                        fila.appendChild(columna_fechaCierre)

                        let columna_horaCierre = document.createElement("td")
                        columna_horaCierre.setAttribute("class","texto")
                        let input_horaCierre = document.createElement("input")
                        input_horaCierre.setAttribute("type","text")
                        input_horaCierre.setAttribute("value",horaCierre)
                        input_horaCierre.setAttribute("class","input_paginador")
                        input_horaCierre.setAttribute("disabled","true")
                        columna_horaCierre.appendChild(input_horaCierre)
                        //columna_horaCierre.innerHTML = numeroextAdministrador
                        fila.appendChild(columna_horaCierre)

                        let columna_tipo_servicio = document.createElement("td")
                        columna_tipo_servicio.setAttribute("class","texto")
                        let input_tipo_sercivio = document.createElement("input")
                        input_tipo_sercivio.setAttribute("type","text")
                        input_tipo_sercivio.setAttribute("value",tipoServicio)
                        input_tipo_sercivio.setAttribute("class","input_paginador")
                        input_tipo_sercivio.setAttribute("disabled","true")
                        columna_tipo_servicio.appendChild(input_tipo_sercivio)
                        //columna_tipo_servicio.innerHTML = coloniaAdministrador
                        fila.appendChild(columna_tipo_servicio)

                        
                        let columna_prioridad = document.createElement("td")
                        columna_prioridad.setAttribute("class","texto")
                        let input_prioridad = document.createElement("input")
                        input_prioridad.setAttribute("type","text")
                        input_prioridad.setAttribute("value",prioridad)
                        input_prioridad.setAttribute("class","input_paginador")
                        input_prioridad.setAttribute("disabled","true")
                        columna_prioridad.appendChild(input_prioridad)
                        //columna_prioridad.innerHTML = telefonoAdministrador
                        fila.appendChild(columna_prioridad)
                        
                        let columna_estatus = document.createElement("td")
                        columna_estatus.setAttribute("class","texto")
                        let input_estatus = document.createElement("input")
                        input_estatus.setAttribute("type","text")
                        input_estatus.setAttribute("value",estatus)
                        input_estatus.setAttribute("class","input_paginador")
                        input_estatus.setAttribute("disabled","true")
                        columna_estatus.appendChild(input_estatus)
                        //columna_estatus.innerHTML = puestoAdministrador
                        fila.appendChild(columna_estatus)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/ver.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","editar_ticket(event);")
                        columna_editar.appendChild(imagen_editar)
                        fila.appendChild(columna_editar)
                        cuerpo_paginador.appendChild(fila)    
            }	
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    }
}
function paginador_siguiente_tickets_Resuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
    // pagina_actual++;
    var cuerpo = "";
    cuerpo_paginador.innerHTML = "";

    var tamano = arreglo_rutas.length;
    var inicio=pagina_actual-1;
    inicio=inicio*cantidad_vistas;
    var final=pagina_actual*cantidad_vistas;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);


    if (pagina_actual==1)
    {
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
    }
    else{
        btn_atras.style="visibility:visible;";
        btn_primera.style="visibility:visible;";
    }

    if (pagina_actual==numero_paginas) 
    {
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
    }
    else{
        btn_adelante.style="visibility:visible;";
        btn_ultima.style="visibility:visible;";
    }

    console.log(inicio)
    console.log(final)
    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
                                   
            let id = arreglo_rutas[inicio].id
            let referencia = arreglo_rutas[inicio].referencia
            let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
            let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
            let fechaCierre = arreglo_rutas[inicio].fechaCierre
            let horaCierre = arreglo_rutas[inicio].horaCierre
            let tipoServicio = arreglo_rutas[inicio].tipoServicio
            let prioridad = arreglo_rutas[inicio].prioridad
            let estatus = arreglo_rutas[inicio].estatus


            let fila = document.createElement("tr")

            let cadena_id = "id_"+id
            fila.setAttribute("id",id)

            

            let columna_id = document.createElement("td")
            columna_id.setAttribute("class","texto")
            let input_id = document.createElement("input")
            input_id.setAttribute("type","text")
            input_id.setAttribute("value",id)
            input_id.setAttribute("class","input_paginador")
            input_id.setAttribute("disabled","true")
            //columna_id.appendChild(input_id)
            columna_id.innerHTML = id
            fila.appendChild(columna_id)

            let columna_folio = document.createElement("td")
            columna_folio.setAttribute("class","texto")
            let input_folio = document.createElement("input")
            input_folio.setAttribute("type","text")
            input_folio.setAttribute("value",referencia)
            input_folio.setAttribute("class","input_paginador")
            input_folio.setAttribute("disabled","true")
            columna_folio.appendChild(input_folio)
            //columna_folio.innerHTML = nombreAdministrador
            fila.appendChild(columna_folio)

            let columna_nombrempresa = document.createElement("td")
            columna_nombrempresa.setAttribute("class","texto")
            let input_nombrempresa = document.createElement("input")
            input_nombrempresa.setAttribute("type","text")
            input_nombrempresa.setAttribute("value",nombreEmpresa)
            input_nombrempresa.setAttribute("class","input_paginador")
            input_nombrempresa.setAttribute("disabled","true")
            columna_nombrempresa.appendChild(input_nombrempresa)
            //columna_nombrempresa.innerHTML = apellidopAdministrador
            fila.appendChild(columna_nombrempresa)


            let columna_rfcempresa = document.createElement("td")
            columna_rfcempresa.setAttribute("class","texto")
            let input_rfcempresa = document.createElement("input")
            input_rfcempresa.setAttribute("type","text")
            input_rfcempresa.setAttribute("value",rfcEmpresa)
            input_rfcempresa.setAttribute("class","input_paginador")
            input_rfcempresa.setAttribute("disabled","true")
            columna_rfcempresa.appendChild(input_rfcempresa)
            //columna_rfcempresa.innerHTML = apellidomAdministrador
            fila.appendChild(columna_rfcempresa)

            let columna_fechaCierre = document.createElement("td")
            columna_fechaCierre.setAttribute("class","texto")
            let input_fechaCierre = document.createElement("input")
            input_fechaCierre.setAttribute("type","text")
            input_fechaCierre.setAttribute("value",fechaCierre)
            input_fechaCierre.setAttribute("class","input_paginador")
            input_fechaCierre.setAttribute("disabled","true")
            columna_fechaCierre.appendChild(input_fechaCierre)
            //columna_fechaCierre.innerHTML = domicilioAdministrador
            fila.appendChild(columna_fechaCierre)

            let columna_horaCierre = document.createElement("td")
            columna_horaCierre.setAttribute("class","texto")
            let input_horaCierre = document.createElement("input")
            input_horaCierre.setAttribute("type","text")
            input_horaCierre.setAttribute("value",horaCierre)
            input_horaCierre.setAttribute("class","input_paginador")
            input_horaCierre.setAttribute("disabled","true")
            columna_horaCierre.appendChild(input_horaCierre)
            //columna_horaCierre.innerHTML = numeroextAdministrador
            fila.appendChild(columna_horaCierre)

            let columna_tipo_servicio = document.createElement("td")
            columna_tipo_servicio.setAttribute("class","texto")
            let input_tipo_sercivio = document.createElement("input")
            input_tipo_sercivio.setAttribute("type","text")
            input_tipo_sercivio.setAttribute("value",tipoServicio)
            input_tipo_sercivio.setAttribute("class","input_paginador")
            input_tipo_sercivio.setAttribute("disabled","true")
            columna_tipo_servicio.appendChild(input_tipo_sercivio)
            //columna_tipo_servicio.innerHTML = coloniaAdministrador
            fila.appendChild(columna_tipo_servicio)

            
            let columna_prioridad = document.createElement("td")
            columna_prioridad.setAttribute("class","texto")
            let input_prioridad = document.createElement("input")
            input_prioridad.setAttribute("type","text")
            input_prioridad.setAttribute("value",prioridad)
            input_prioridad.setAttribute("class","input_paginador")
            input_prioridad.setAttribute("disabled","true")
            columna_prioridad.appendChild(input_prioridad)
            //columna_prioridad.innerHTML = telefonoAdministrador
            fila.appendChild(columna_prioridad)
            
            let columna_estatus = document.createElement("td")
            columna_estatus.setAttribute("class","texto")
            let input_estatus = document.createElement("input")
            input_estatus.setAttribute("type","text")
            input_estatus.setAttribute("value",estatus)
            input_estatus.setAttribute("class","input_paginador")
            input_estatus.setAttribute("disabled","true")
            columna_estatus.appendChild(input_estatus)
            //columna_estatus.innerHTML = puestoAdministrador
            fila.appendChild(columna_estatus)

            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/ver.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","editar_ticket(event);")
            columna_editar.appendChild(imagen_editar)
            fila.appendChild(columna_editar)
            cuerpo_paginador.appendChild(fila)   
                            
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }

    // cuerpo_paginador.innerHTML=cuerpo;
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    
}
function paginador_anterior_tickets_Resuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
{
// pagina_actual--;
var cuerpo = "";
cuerpo_paginador.innerHTML = "";
var tamano = arreglo_rutas.length;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);
if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}
console.log(inicio)
console.log(final)

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaCierre = arreglo_rutas[inicio].fechaCierre
    let horaCierre = arreglo_rutas[inicio].horaCierre
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaCierre = document.createElement("td")
    columna_fechaCierre.setAttribute("class","texto")
    let input_fechaCierre = document.createElement("input")
    input_fechaCierre.setAttribute("type","text")
    input_fechaCierre.setAttribute("value",fechaCierre)
    input_fechaCierre.setAttribute("class","input_paginador")
    input_fechaCierre.setAttribute("disabled","true")
    columna_fechaCierre.appendChild(input_fechaCierre)
    //columna_fechaCierre.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaCierre)

    let columna_horaCierre = document.createElement("td")
    columna_horaCierre.setAttribute("class","texto")
    let input_horaCierre = document.createElement("input")
    input_horaCierre.setAttribute("type","text")
    input_horaCierre.setAttribute("value",horaCierre)
    input_horaCierre.setAttribute("class","input_paginador")
    input_horaCierre.setAttribute("disabled","true")
    columna_horaCierre.appendChild(input_horaCierre)
    //columna_horaCierre.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaCierre)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/ver.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}

// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
function paginador_primera_tickets_Resuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

cuerpo_paginador.innerHTML = "";
var cuerpo = "";
pagina_actual=1;
var tamano = arreglo_rutas.length;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);

if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}

console.log(inicio)
console.log(final)

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaCierre = arreglo_rutas[inicio].fechaCierre
    let horaCierre = arreglo_rutas[inicio].horaCierre
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaCierre = document.createElement("td")
    columna_fechaCierre.setAttribute("class","texto")
    let input_fechaCierre = document.createElement("input")
    input_fechaCierre.setAttribute("type","text")
    input_fechaCierre.setAttribute("value",fechaCierre)
    input_fechaCierre.setAttribute("class","input_paginador")
    input_fechaCierre.setAttribute("disabled","true")
    columna_fechaCierre.appendChild(input_fechaCierre)
    //columna_fechaCierre.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaCierre)

    let columna_horaCierre = document.createElement("td")
    columna_horaCierre.setAttribute("class","texto")
    let input_horaCierre = document.createElement("input")
    input_horaCierre.setAttribute("type","text")
    input_horaCierre.setAttribute("value",horaCierre)
    input_horaCierre.setAttribute("class","input_paginador")
    input_horaCierre.setAttribute("disabled","true")
    columna_horaCierre.appendChild(input_horaCierre)
    //columna_horaCierre.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaCierre)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/ver.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
function paginador_ultima_tickets_Resuelto_empresa(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
var cuerpo = "";
cuerpo_paginador.innerHTML="";
var tamano = arreglo_rutas.length;
var numero_paginas=tamano/cantidad_vistas;
numero_paginas=Math.ceil(numero_paginas);
pagina_actual=numero_paginas;
var inicio=pagina_actual-1;
inicio=inicio*cantidad_vistas;
var final=pagina_actual*cantidad_vistas;


if (pagina_actual==1)
{
btn_atras.style="visibility:hidden;";
btn_primera.style="visibility:hidden;";
}
else{
btn_atras.style="visibility:visible;";
btn_primera.style="visibility:visible;";
}

if (pagina_actual==numero_paginas) 
{
btn_adelante.style="visibility:hidden;";
btn_ultima.style="visibility:hidden;";
}
else{
btn_adelante.style="visibility:visible;";
btn_ultima.style="visibility:visible;";
}

console.log(inicio)
console.log(final)
var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
                           
    let id = arreglo_rutas[inicio].id
    let referencia = arreglo_rutas[inicio].referencia
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let fechaCierre = arreglo_rutas[inicio].fechaCierre
    let horaCierre = arreglo_rutas[inicio].horaCierre
    let tipoServicio = arreglo_rutas[inicio].tipoServicio
    let prioridad = arreglo_rutas[inicio].prioridad
    let estatus = arreglo_rutas[inicio].estatus


    let fila = document.createElement("tr")

    let cadena_id = "id_"+id
    fila.setAttribute("id",id)

    

    let columna_id = document.createElement("td")
    columna_id.setAttribute("class","texto")
    let input_id = document.createElement("input")
    input_id.setAttribute("type","text")
    input_id.setAttribute("value",id)
    input_id.setAttribute("class","input_paginador")
    input_id.setAttribute("disabled","true")
    //columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_folio = document.createElement("td")
    columna_folio.setAttribute("class","texto")
    let input_folio = document.createElement("input")
    input_folio.setAttribute("type","text")
    input_folio.setAttribute("value",referencia)
    input_folio.setAttribute("class","input_paginador")
    input_folio.setAttribute("disabled","true")
    columna_folio.appendChild(input_folio)
    //columna_folio.innerHTML = nombreAdministrador
    fila.appendChild(columna_folio)

    let columna_nombrempresa = document.createElement("td")
    columna_nombrempresa.setAttribute("class","texto")
    let input_nombrempresa = document.createElement("input")
    input_nombrempresa.setAttribute("type","text")
    input_nombrempresa.setAttribute("value",nombreEmpresa)
    input_nombrempresa.setAttribute("class","input_paginador")
    input_nombrempresa.setAttribute("disabled","true")
    columna_nombrempresa.appendChild(input_nombrempresa)
    //columna_nombrempresa.innerHTML = apellidopAdministrador
    fila.appendChild(columna_nombrempresa)


    let columna_rfcempresa = document.createElement("td")
    columna_rfcempresa.setAttribute("class","texto")
    let input_rfcempresa = document.createElement("input")
    input_rfcempresa.setAttribute("type","text")
    input_rfcempresa.setAttribute("value",rfcEmpresa)
    input_rfcempresa.setAttribute("class","input_paginador")
    input_rfcempresa.setAttribute("disabled","true")
    columna_rfcempresa.appendChild(input_rfcempresa)
    //columna_rfcempresa.innerHTML = apellidomAdministrador
    fila.appendChild(columna_rfcempresa)

    let columna_fechaCierre = document.createElement("td")
    columna_fechaCierre.setAttribute("class","texto")
    let input_fechaCierre = document.createElement("input")
    input_fechaCierre.setAttribute("type","text")
    input_fechaCierre.setAttribute("value",fechaCierre)
    input_fechaCierre.setAttribute("class","input_paginador")
    input_fechaCierre.setAttribute("disabled","true")
    columna_fechaCierre.appendChild(input_fechaCierre)
    //columna_fechaCierre.innerHTML = domicilioAdministrador
    fila.appendChild(columna_fechaCierre)

    let columna_horaCierre = document.createElement("td")
    columna_horaCierre.setAttribute("class","texto")
    let input_horaCierre = document.createElement("input")
    input_horaCierre.setAttribute("type","text")
    input_horaCierre.setAttribute("value",horaCierre)
    input_horaCierre.setAttribute("class","input_paginador")
    input_horaCierre.setAttribute("disabled","true")
    columna_horaCierre.appendChild(input_horaCierre)
    //columna_horaCierre.innerHTML = numeroextAdministrador
    fila.appendChild(columna_horaCierre)

    let columna_tipo_servicio = document.createElement("td")
    columna_tipo_servicio.setAttribute("class","texto")
    let input_tipo_sercivio = document.createElement("input")
    input_tipo_sercivio.setAttribute("type","text")
    input_tipo_sercivio.setAttribute("value",tipoServicio)
    input_tipo_sercivio.setAttribute("class","input_paginador")
    input_tipo_sercivio.setAttribute("disabled","true")
    columna_tipo_servicio.appendChild(input_tipo_sercivio)
    //columna_tipo_servicio.innerHTML = coloniaAdministrador
    fila.appendChild(columna_tipo_servicio)

    
    let columna_prioridad = document.createElement("td")
    columna_prioridad.setAttribute("class","texto")
    let input_prioridad = document.createElement("input")
    input_prioridad.setAttribute("type","text")
    input_prioridad.setAttribute("value",prioridad)
    input_prioridad.setAttribute("class","input_paginador")
    input_prioridad.setAttribute("disabled","true")
    columna_prioridad.appendChild(input_prioridad)
    //columna_prioridad.innerHTML = telefonoAdministrador
    fila.appendChild(columna_prioridad)
    
    let columna_estatus = document.createElement("td")
    columna_estatus.setAttribute("class","texto")
    let input_estatus = document.createElement("input")
    input_estatus.setAttribute("type","text")
    input_estatus.setAttribute("value",estatus)
    input_estatus.setAttribute("class","input_paginador")
    input_estatus.setAttribute("disabled","true")
    columna_estatus.appendChild(input_estatus)
    //columna_estatus.innerHTML = puestoAdministrador
    fila.appendChild(columna_estatus)

    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/ver.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","editar_ticket(event);")
    columna_editar.appendChild(imagen_editar)
    fila.appendChild(columna_editar)
    cuerpo_paginador.appendChild(fila)   

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}