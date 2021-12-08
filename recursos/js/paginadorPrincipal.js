//funciones para tomar empleados activos
var datos_empleados
var boton_primero = document.getElementById("boton_paginador_primero")
var boton_anterior = document.getElementById("boton_paginador_anterior")
var boton_siguiente = document.getElementById("boton_paginador_siguiente")
var boton_ultimo = document.getElementById("boton_paginador_ultimo")
var cuerpo = document.getElementById("tabla_empleado_activo")
var indicador_pagina= document.getElementById("boton_paginador_cantidad")
var cantidad_vistas
var pagina_actual_empleados_activos 

function tomar_datos_empleado()
{
    let contenedor = document.getElementById("tabla_empleado_activo")
    cantidad_vistas = document.getElementById("cantidad_empleados_activos").value
    pagina_actual_empleados_activos = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_empleados_activos.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_empleados = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_empleado(datos_empleados,pagina_actual_empleados_activos,cantidad_vistas,boton_anterior,boton_siguiente,boton_primero,boton_ultimo,cuerpo,indicador_pagina)
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

//agregar evento a botones de paginacion

boton_siguiente.addEventListener("click", function(){
    pagina_actual_empleados_activos++
    paginador_siguiente_empleado(datos_empleados,pagina_actual_empleados_activos,cantidad_vistas,boton_anterior,boton_siguiente,boton_primero,boton_ultimo,cuerpo,indicador_pagina)
})

boton_anterior.addEventListener("click", function(){
    pagina_actual_empleados_activos--
    paginador_anterior_empleado(datos_empleados,pagina_actual_empleados_activos,cantidad_vistas,boton_anterior,boton_siguiente,boton_primero,boton_ultimo,cuerpo,indicador_pagina)
})

boton_primero.addEventListener("click", function(){
    pagina_actual_empleados_activos = 1 
    paginador_primera_empleado(datos_empleados,pagina_actual_empleados_activos,cantidad_vistas,boton_anterior,boton_siguiente,boton_primero,boton_ultimo,cuerpo,indicador_pagina)
})

boton_ultimo.addEventListener("click", function(){

    var tamano = datos_empleados.length;
    var numero_paginas=tamano/cantidad_vistas;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_empleados_activos = numero_paginas

    paginador_ultima_empleado(datos_empleados,pagina_actual_empleados_activos,cantidad_vistas,boton_anterior,boton_siguiente,boton_primero,boton_ultimo,cuerpo,indicador_pagina)
})

function paginador_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    if(arreglo_rutas=="error 400" || arreglo_rutas.length==0)
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
                console.log("esta vacioooo")
                cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="13">NO HAY DATOS</td></tr>'
            }
            else
            {

                //crear columnas por cada json con arreglo_rutas[inicio]
                       
                        let id = arreglo_rutas[inicio].id
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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
                        // columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        // columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)


                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")
                        columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)


                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/baja.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","desactivar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","editar_empleado(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"
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
function paginador_siguiente_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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
                        // columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)


                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")
                        columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)


                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/baja.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","desactivar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","editar_empleado(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_anterior_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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
                        // columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)

                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")                        
                        let input_tipo_usuario = document.createElement("input")
                        input_tipo_usuario.setAttribute("type","text")
                        input_tipo_usuario.setAttribute("value",tipo_usuario)
                        input_tipo_usuario.setAttribute("class","input_paginador")
                        input_tipo_usuario.setAttribute("disabled","true")
                        
                        columna_tipo_usuario.appendChild(input_tipo_usuario)
                        //columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/baja.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","desactivar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","desactivar_usuario(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_primera_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
    let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
    let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
    let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
    let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
    let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
    let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
    let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
    let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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
    // columna_id.appendChild(input_id)
    columna_id.innerHTML = id
    fila.appendChild(columna_id)

    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreEmpleado)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreEmpleado
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopEmpleado)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopEmpleado
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomEmpleado)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomEmpleado
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioEmpleado)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioEmpleado
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextEmpleado)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextEmpleado
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaEmpleado)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaEmpleado
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoEmpleado)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoEmpleado
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoEmpleado)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoEmpleado
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoEmpleado)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoEmpleado
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/baja.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","desactivar_empleado(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/editar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","editar_empleado(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
function paginador_ultima_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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
                        // columna_id.appendChild(input_id)
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)


                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")
                        columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)


                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/baja.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","desactivar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","editar_empleado(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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


//funciones para tomar empleados no activos
var datos_empleadosNO
var boton_primeroNO = document.getElementById("boton_paginador_primeroNo")
var boton_anteriorNO = document.getElementById("boton_paginador_anteriorNo")
var boton_siguienteNO = document.getElementById("boton_paginador_siguienteNo")
var boton_ultimoNO = document.getElementById("boton_paginador_ultimoNo")
var cuerpoNO = document.getElementById("tabla_empleado_noactivo")
var indicador_paginaNO  = document.getElementById("boton_paginador_cantidadNo")
var cantidad_vistasNO 
var pagina_actual_empleados_activosNO 

function tomar_datos_empleado_noactivos()
{
    let contenedor = document.getElementById("tabla_empleado_noactivo")
    cantidad_vistasNO = document.getElementById("cantidad_empleados_noactivos").value
    pagina_actual_empleados_activosNO = 1

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_empleados_noactivos.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_empleadosNO = JSON.parse(ajax.responseText)
                    // console.log(datos_empleadosNO)
                    paginador_empleadoNo(datos_empleadosNO,pagina_actual_empleados_activosNO,cantidad_vistasNO,boton_anteriorNO,boton_siguienteNO,boton_primeroNO,boton_ultimoNO,cuerpoNO,indicador_paginaNO)

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

boton_siguienteNO.addEventListener("click", function(){
    pagina_actual_empleados_activosNO++
    paginador_siguiente_empleadoNo(datos_empleadosNO,pagina_actual_empleados_activosNO,cantidad_vistasNO,boton_anteriorNO,boton_siguienteNO,boton_primeroNO,boton_ultimoNO,cuerpoNO,indicador_paginaNO)
})

boton_anteriorNO.addEventListener("click", function(){
    pagina_actual_empleados_activosNO--
    paginador_anterior_empleadoNo(datos_empleadosNO,pagina_actual_empleados_activosNO,cantidad_vistasNO,boton_anteriorNO,boton_siguienteNO,boton_primeroNO,boton_ultimoNO,cuerpoNO,indicador_paginaNO)
})

boton_primeroNO.addEventListener("click", function(){
    pagina_actual_empleados_activosNO = 1 
    paginador_primera_empleadoNo(datos_empleadosNO,pagina_actual_empleados_activosNO,cantidad_vistasNO,boton_anteriorNO,boton_siguienteNO,boton_primeroNO,boton_ultimoNO,cuerpoNO,indicador_paginaNO)
})

boton_ultimoNO.addEventListener("click", function(){

    var tamano = datos_empleadosNO.length;
    var numero_paginas=tamano/cantidad_vistasNO;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_empleados_activosNO = numero_paginas
    paginador_ultima_empleadoNo(datos_empleadosNO,pagina_actual_empleados_activosNO,cantidad_vistasNO,boton_anteriorNO,boton_siguienteNO,boton_primeroNO,boton_ultimoNO,cuerpoNO,indicador_paginaNO)
})

function paginador_empleadoNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
    

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
        //console.log(arreglo_rutas)

        if (arreglo_rutas[inicio]!=undefined) 
        {
            
            

                //crear columnas por cada json con arreglo_rutas[inicio]
                       
                        let id = arreglo_rutas[inicio].id
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)

                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")                        
                        let input_tipo_usuario = document.createElement("input")
                        input_tipo_usuario.setAttribute("type","text")
                        input_tipo_usuario.setAttribute("value",tipo_usuario)
                        input_tipo_usuario.setAttribute("class","input_paginador")
                        input_tipo_usuario.setAttribute("disabled","true")
                        
                        columna_tipo_usuario.appendChild(input_tipo_usuario)
                        //columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/alta.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","activar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","eliminar_empleado(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

                        fila.appendChild(columna_editar)
                        cuerpo_paginador.appendChild(fila)    
            	
            // console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}
}
function paginador_siguiente_empleadoNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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


    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
                        let id = arreglo_rutas[inicio].id
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)

                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")                        
                        let input_tipo_usuario = document.createElement("input")
                        input_tipo_usuario.setAttribute("type","text")
                        input_tipo_usuario.setAttribute("value",tipo_usuario)
                        input_tipo_usuario.setAttribute("class","input_paginador")
                        input_tipo_usuario.setAttribute("disabled","true")
                        
                        columna_tipo_usuario.appendChild(input_tipo_usuario)
                        //columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/alta.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","activar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","desactivar_usuario(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_anterior_empleadoNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
    let id = arreglo_rutas[inicio].id
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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


                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)

                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")                        
                        let input_tipo_usuario = document.createElement("input")
                        input_tipo_usuario.setAttribute("type","text")
                        input_tipo_usuario.setAttribute("value",tipo_usuario)
                        input_tipo_usuario.setAttribute("class","input_paginador")
                        input_tipo_usuario.setAttribute("disabled","true")
                        
                        columna_tipo_usuario.appendChild(input_tipo_usuario)
                        //columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/alta.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","activar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","desactivar_usuario(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_primera_empleadoNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
    let id = arreglo_rutas[inicio].id
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)

                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")                        
                        let input_tipo_usuario = document.createElement("input")
                        input_tipo_usuario.setAttribute("type","text")
                        input_tipo_usuario.setAttribute("value",tipo_usuario)
                        input_tipo_usuario.setAttribute("class","input_paginador")
                        input_tipo_usuario.setAttribute("disabled","true")
                        
                        columna_tipo_usuario.appendChild(input_tipo_usuario)
                        //columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/alta.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","activar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","desactivar_usuario(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_ultima_empleadoNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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

var numero_clase=1;
for (inicio; inicio < final; inicio++) 
{
if (arreglo_rutas[inicio]!=undefined) 
{
// arreglos
let id = arreglo_rutas[inicio].id
                        let nombreEmpleado = arreglo_rutas[inicio].nombreEmpleado
                        let apellidopEmpleado = arreglo_rutas[inicio].apellidopEmpleado
                        let apellidomEmpleado = arreglo_rutas[inicio].apellidomEmpleado
                        let domicilioEmpleado = arreglo_rutas[inicio].domicilioEmpleado
                        let numeroextEmpleado = arreglo_rutas[inicio].numeroextEmpleado
                        let coloniaEmpleado = arreglo_rutas[inicio].coloniaEmpleado
                        let telefonoEmpleado = arreglo_rutas[inicio].telefonoEmpleado
                        let puestoEmpleado = arreglo_rutas[inicio].puestoEmpleado
                        let correoEmpleado = arreglo_rutas[inicio].correoEmpleado
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreEmpleado)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopEmpleado)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomEmpleado)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioEmpleado)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextEmpleado)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaEmpleado)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoEmpleado)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoEmpleado)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoEmpleado)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoEmpleado
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)

                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")                        
                        let input_tipo_usuario = document.createElement("input")
                        input_tipo_usuario.setAttribute("type","text")
                        input_tipo_usuario.setAttribute("value",tipo_usuario)
                        input_tipo_usuario.setAttribute("class","input_paginador")
                        input_tipo_usuario.setAttribute("disabled","true")
                        
                        columna_tipo_usuario.appendChild(input_tipo_usuario)
                        //columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)

                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/alta.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","activar_empleado(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","desactivar_usuario(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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


var datos_empresas
var boton_primeroEmpresas = document.getElementById("boton_paginador_primeroEmpresas")
var boton_anteriorEmpresas = document.getElementById("boton_paginador_anteriorEmpresas")
var boton_siguienteEmpresas = document.getElementById("boton_paginador_siguienteEmpresas")
var boton_ultimoEmpresas = document.getElementById("boton_paginador_ultimoEmpresas")
var cuerpoEmpresas = document.getElementById("tabla_empresas_activas")
var indicador_paginaEmpresas= document.getElementById("boton_paginador_cantidadEmpresas")
var cantidad_vistasEmpresas
var pagina_actual_empresas_activos = 1

function tomar_datos_empresas()
{
    let contenedor = document.getElementById("tabla_empresas_activas")
    cantidad_vistasEmpresas = document.getElementById("cantidad_empresas_activas").value
    pagina_actual_empresas_activos = 1


    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_empresas_activas.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_empresas = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_empresas(datos_empresas,pagina_actual_empresas_activos,cantidad_vistasEmpresas,boton_anteriorEmpresas,boton_siguienteEmpresas,boton_primeroEmpresas,boton_ultimoEmpresas,cuerpoEmpresas,indicador_paginaEmpresas)

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

boton_siguienteEmpresas.addEventListener("click", function(){
    pagina_actual_empresas_activos++
    paginador_siguiente_empresas(datos_empresas,pagina_actual_empresas_activos,cantidad_vistasEmpresas,boton_anteriorEmpresas,boton_siguienteEmpresas,boton_primeroEmpresas,boton_ultimoEmpresas,cuerpoEmpresas,indicador_paginaEmpresas)
})

boton_anteriorEmpresas.addEventListener("click", function(){
    pagina_actual_empresas_activos--
    paginador_anterior_empresas(datos_empresas,pagina_actual_empresas_activos,cantidad_vistasEmpresas,boton_anteriorEmpresas,boton_siguienteEmpresas,boton_primeroEmpresas,boton_ultimoEmpresas,cuerpoEmpresas,indicador_paginaEmpresas)
})

boton_primeroEmpresas.addEventListener("click", function(){
    pagina_actual_empresas_activos = 1 
    paginador_primera_empresas(datos_empresas,pagina_actual_empresas_activos,cantidad_vistasEmpresas,boton_anteriorEmpresas,boton_siguienteEmpresas,boton_primeroEmpresas,boton_ultimoEmpresas,cuerpoEmpresas,indicador_paginaEmpresas)
})

boton_ultimoEmpresas.addEventListener("click", function(){

    var tama = datos_empresas.length;
    var numero_paginas=tama/cantidad_vistasEmpresas;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_empresas_activos = numero_paginas
    paginador_ultima_empresas(datos_empresas,pagina_actual_empresas_activos,cantidad_vistasEmpresas,boton_anteriorEmpresas,boton_siguienteEmpresas,boton_primeroEmpresas,boton_ultimoEmpresas,cuerpoEmpresas,indicador_paginaEmpresas)
})

function paginador_empresas(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="15">NO HAY DATOS</td></tr>'
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
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/baja.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","editar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_siguiente_empresas(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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


    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            let id = arreglo_rutas[inicio].id
            let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
            let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
            let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
            let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
            let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
            let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
            let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
            let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
            let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
            let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
            let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
            let activo  = arreglo_rutas[inicio].activo
            let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
            
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
            
            let columna_rfcEmpresa = document.createElement("td")
            columna_rfcEmpresa.setAttribute("class","texto")
            let input_rfcEmpresa = document.createElement("input")
            input_rfcEmpresa.setAttribute("type","text")
            input_rfcEmpresa.setAttribute("value",rfcEmpresa)
            input_rfcEmpresa.setAttribute("class","input_paginador")
            input_rfcEmpresa.setAttribute("disabled","true")
            columna_rfcEmpresa.appendChild(input_rfcEmpresa)
            //columna_rfcEmpresa.innerHTML = rfcEmpresa
            fila.appendChild(columna_rfcEmpresa)
            
            let columna_nombreEmpresa = document.createElement("td")
            columna_nombreEmpresa.setAttribute("class","texto")
            let input_nombreEmpresa = document.createElement("input")
            input_nombreEmpresa.setAttribute("type","text")
            input_nombreEmpresa.setAttribute("value",nombreEmpresa)
            input_nombreEmpresa.setAttribute("class","input_paginador")
            input_nombreEmpresa.setAttribute("disabled","true")
            columna_nombreEmpresa.appendChild(input_nombreEmpresa)
            //columna_nombreEmpresa.innerHTML = nombreEmpresa
            fila.appendChild(columna_nombreEmpresa)
            
            let columna_razonsocialEmpresa = document.createElement("td")
            columna_razonsocialEmpresa.setAttribute("class","texto")
            let input_razonsocialEmpresa = document.createElement("input")
            input_razonsocialEmpresa.setAttribute("type","text")
            input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
            input_razonsocialEmpresa.setAttribute("class","input_paginador")
            input_razonsocialEmpresa.setAttribute("disabled","true")
            columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
            //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
            fila.appendChild(columna_razonsocialEmpresa)
            
            let columna_domicilioEmpresa = document.createElement("td")
            columna_domicilioEmpresa.setAttribute("class","texto")
            let input_domicilioEmpresa = document.createElement("input")
            input_domicilioEmpresa.setAttribute("type","text")
            input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
            input_domicilioEmpresa.setAttribute("class","input_paginador")
            input_domicilioEmpresa.setAttribute("disabled","true")
            columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
            //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
            fila.appendChild(columna_domicilioEmpresa)
            
            let columna_numerocalleEmpresa = document.createElement("td")
            columna_numerocalleEmpresa.setAttribute("class","texto")
            let input_numerocalleEmpresa = document.createElement("input")
            input_numerocalleEmpresa.setAttribute("type","text")
            input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
            input_numerocalleEmpresa.setAttribute("class","input_paginador")
            input_numerocalleEmpresa.setAttribute("disabled","true")
            columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
            //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
            fila.appendChild(columna_numerocalleEmpresa)
            
            let columna_coloniaEmpresa = document.createElement("td")
            columna_coloniaEmpresa.setAttribute("class","texto")
            let input_coloniaEmpresa = document.createElement("input")
            input_coloniaEmpresa.setAttribute("type","text")
            input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
            input_coloniaEmpresa.setAttribute("class","input_paginador")
            input_coloniaEmpresa.setAttribute("disabled","true")
            columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
            //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
            fila.appendChild(columna_coloniaEmpresa)
            
            let columna_cpEmpresa = document.createElement("td")
            columna_cpEmpresa.setAttribute("class","texto")
            let input_cpEmpresa = document.createElement("input")
            input_cpEmpresa.setAttribute("type","text")
            input_cpEmpresa.setAttribute("value",cpEmpresa)
            input_cpEmpresa.setAttribute("class","input_paginador")
            input_cpEmpresa.setAttribute("disabled","true")
            columna_cpEmpresa.appendChild(input_cpEmpresa)
            //columna_cpEmpresa.innerHTML = cpEmpresa
            fila.appendChild(columna_cpEmpresa)
            
            let columna_municipioEmpresa = document.createElement("td")
            columna_municipioEmpresa.setAttribute("class","texto")
            let input_municipioEmpresa = document.createElement("input")
            input_municipioEmpresa.setAttribute("type","text")
            input_municipioEmpresa.setAttribute("value",municipioEmpresa)
            input_municipioEmpresa.setAttribute("class","input_paginador")
            input_municipioEmpresa.setAttribute("disabled","true")
            columna_municipioEmpresa.appendChild(input_municipioEmpresa)
            //columna_municipioEmpresa.innerHTML = municipioEmpresa
            fila.appendChild(columna_municipioEmpresa)
            
            let columna_estadoEmpresa = document.createElement("td")
            columna_estadoEmpresa.setAttribute("class","texto")
            let input_estadoEmpresa = document.createElement("input")
            input_estadoEmpresa.setAttribute("type","text")
            input_estadoEmpresa.setAttribute("value",estadoEmpresa)
            input_estadoEmpresa.setAttribute("class","input_paginador")
            input_estadoEmpresa.setAttribute("disabled","true")
            columna_estadoEmpresa.appendChild(input_estadoEmpresa)
            //columna_estadoEmpresa.innerHTML = estadoEmpresa
            fila.appendChild(columna_estadoEmpresa)
            
            let columna_telefonoEmpresa = document.createElement("td")
            columna_telefonoEmpresa.setAttribute("class","texto")
            let input_telefonoEmpresa = document.createElement("input")
            input_telefonoEmpresa.setAttribute("type","text")
            input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
            input_telefonoEmpresa.setAttribute("class","input_paginador")
            input_telefonoEmpresa.setAttribute("disabled","true")
            columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
            //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
            fila.appendChild(columna_telefonoEmpresa)
            
            
            let columna_correoEmpresa = document.createElement("td")
            columna_correoEmpresa.setAttribute("class","texto")
            let input_correoEmpresa = document.createElement("input")
            input_correoEmpresa.setAttribute("type","text")
            input_correoEmpresa.setAttribute("value",correoEmpresa)
            input_correoEmpresa.setAttribute("class","input_paginador")
            input_correoEmpresa.setAttribute("disabled","true")
            columna_correoEmpresa.appendChild(input_correoEmpresa)
            //columna_correoEmpresa.innerHTML = correoEmpresa
            fila.appendChild(columna_correoEmpresa)
            
            let columna_activo = document.createElement("td")
            columna_activo.setAttribute("class","texto")
            columna_activo.innerHTML = activo
            fila.appendChild(columna_activo)
            
            let columna_tipo_usuario = document.createElement("td")
            columna_tipo_usuario.setAttribute("class","texto")
            columna_tipo_usuario.innerHTML = tipo_usuario
            fila.appendChild(columna_tipo_usuario)
            
            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/baja.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","desactivar_empresas(event);")
            columna_editar.appendChild(imagen_editar)
            
            let imagen_editar2 = document.createElement("img")
            imagen_editar2.setAttribute("src","../recursos/img/editar.png")
            imagen_editar2.setAttribute("class","img_accion")
            imagen_editar2.setAttribute("onclick","editar_empresas(event);")
            columna_editar.appendChild(imagen_editar2)
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
function paginador_anterior_empresas(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
        let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
        let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
        let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
        let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
        let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
        let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
        let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
        let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
        let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
        let activo  = arreglo_rutas[inicio].activo
        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
        
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
        
        let columna_rfcEmpresa = document.createElement("td")
        columna_rfcEmpresa.setAttribute("class","texto")
        let input_rfcEmpresa = document.createElement("input")
        input_rfcEmpresa.setAttribute("type","text")
        input_rfcEmpresa.setAttribute("value",rfcEmpresa)
        input_rfcEmpresa.setAttribute("class","input_paginador")
        input_rfcEmpresa.setAttribute("disabled","true")
        columna_rfcEmpresa.appendChild(input_rfcEmpresa)
        //columna_rfcEmpresa.innerHTML = rfcEmpresa
        fila.appendChild(columna_rfcEmpresa)
        
        let columna_nombreEmpresa = document.createElement("td")
        columna_nombreEmpresa.setAttribute("class","texto")
        let input_nombreEmpresa = document.createElement("input")
        input_nombreEmpresa.setAttribute("type","text")
        input_nombreEmpresa.setAttribute("value",nombreEmpresa)
        input_nombreEmpresa.setAttribute("class","input_paginador")
        input_nombreEmpresa.setAttribute("disabled","true")
        columna_nombreEmpresa.appendChild(input_nombreEmpresa)
        //columna_nombreEmpresa.innerHTML = nombreEmpresa
        fila.appendChild(columna_nombreEmpresa)
        
        let columna_razonsocialEmpresa = document.createElement("td")
        columna_razonsocialEmpresa.setAttribute("class","texto")
        let input_razonsocialEmpresa = document.createElement("input")
        input_razonsocialEmpresa.setAttribute("type","text")
        input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
        input_razonsocialEmpresa.setAttribute("class","input_paginador")
        input_razonsocialEmpresa.setAttribute("disabled","true")
        columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
        //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
        fila.appendChild(columna_razonsocialEmpresa)
        
        let columna_domicilioEmpresa = document.createElement("td")
        columna_domicilioEmpresa.setAttribute("class","texto")
        let input_domicilioEmpresa = document.createElement("input")
        input_domicilioEmpresa.setAttribute("type","text")
        input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
        input_domicilioEmpresa.setAttribute("class","input_paginador")
        input_domicilioEmpresa.setAttribute("disabled","true")
        columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
        //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
        fila.appendChild(columna_domicilioEmpresa)
        
        let columna_numerocalleEmpresa = document.createElement("td")
        columna_numerocalleEmpresa.setAttribute("class","texto")
        let input_numerocalleEmpresa = document.createElement("input")
        input_numerocalleEmpresa.setAttribute("type","text")
        input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
        input_numerocalleEmpresa.setAttribute("class","input_paginador")
        input_numerocalleEmpresa.setAttribute("disabled","true")
        columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
        //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
        fila.appendChild(columna_numerocalleEmpresa)
        
        let columna_coloniaEmpresa = document.createElement("td")
        columna_coloniaEmpresa.setAttribute("class","texto")
        let input_coloniaEmpresa = document.createElement("input")
        input_coloniaEmpresa.setAttribute("type","text")
        input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
        input_coloniaEmpresa.setAttribute("class","input_paginador")
        input_coloniaEmpresa.setAttribute("disabled","true")
        columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
        //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
        fila.appendChild(columna_coloniaEmpresa)
        
        let columna_cpEmpresa = document.createElement("td")
        columna_cpEmpresa.setAttribute("class","texto")
        let input_cpEmpresa = document.createElement("input")
        input_cpEmpresa.setAttribute("type","text")
        input_cpEmpresa.setAttribute("value",cpEmpresa)
        input_cpEmpresa.setAttribute("class","input_paginador")
        input_cpEmpresa.setAttribute("disabled","true")
        columna_cpEmpresa.appendChild(input_cpEmpresa)
        //columna_cpEmpresa.innerHTML = cpEmpresa
        fila.appendChild(columna_cpEmpresa)
        
        let columna_municipioEmpresa = document.createElement("td")
        columna_municipioEmpresa.setAttribute("class","texto")
        let input_municipioEmpresa = document.createElement("input")
        input_municipioEmpresa.setAttribute("type","text")
        input_municipioEmpresa.setAttribute("value",municipioEmpresa)
        input_municipioEmpresa.setAttribute("class","input_paginador")
        input_municipioEmpresa.setAttribute("disabled","true")
        columna_municipioEmpresa.appendChild(input_municipioEmpresa)
        //columna_municipioEmpresa.innerHTML = municipioEmpresa
        fila.appendChild(columna_municipioEmpresa)
        
        let columna_estadoEmpresa = document.createElement("td")
        columna_estadoEmpresa.setAttribute("class","texto")
        let input_estadoEmpresa = document.createElement("input")
        input_estadoEmpresa.setAttribute("type","text")
        input_estadoEmpresa.setAttribute("value",estadoEmpresa)
        input_estadoEmpresa.setAttribute("class","input_paginador")
        input_estadoEmpresa.setAttribute("disabled","true")
        columna_estadoEmpresa.appendChild(input_estadoEmpresa)
        //columna_estadoEmpresa.innerHTML = estadoEmpresa
        fila.appendChild(columna_estadoEmpresa)
        
        let columna_telefonoEmpresa = document.createElement("td")
        columna_telefonoEmpresa.setAttribute("class","texto")
        let input_telefonoEmpresa = document.createElement("input")
        input_telefonoEmpresa.setAttribute("type","text")
        input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
        input_telefonoEmpresa.setAttribute("class","input_paginador")
        input_telefonoEmpresa.setAttribute("disabled","true")
        columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
        //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
        fila.appendChild(columna_telefonoEmpresa)
        
        
        let columna_correoEmpresa = document.createElement("td")
        columna_correoEmpresa.setAttribute("class","texto")
        let input_correoEmpresa = document.createElement("input")
        input_correoEmpresa.setAttribute("type","text")
        input_correoEmpresa.setAttribute("value",correoEmpresa)
        input_correoEmpresa.setAttribute("class","input_paginador")
        input_correoEmpresa.setAttribute("disabled","true")
        columna_correoEmpresa.appendChild(input_correoEmpresa)
        //columna_correoEmpresa.innerHTML = correoEmpresa
        fila.appendChild(columna_correoEmpresa)
        
        let columna_activo = document.createElement("td")
        columna_activo.setAttribute("class","texto")
        columna_activo.innerHTML = activo
        fila.appendChild(columna_activo)
        
        let columna_tipo_usuario = document.createElement("td")
        columna_tipo_usuario.setAttribute("class","texto")
        columna_tipo_usuario.innerHTML = tipo_usuario
        fila.appendChild(columna_tipo_usuario)
        
        let columna_editar = document.createElement("td")
        let imagen_editar = document.createElement("img")
        imagen_editar.setAttribute("src","../recursos/img/baja.png")
        imagen_editar.setAttribute("class","img_accion")
        imagen_editar.setAttribute("onclick","desactivar_empresas(event);")
        columna_editar.appendChild(imagen_editar)
        
        let imagen_editar2 = document.createElement("img")
        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
        imagen_editar2.setAttribute("class","img_accion")
        imagen_editar2.setAttribute("onclick","editar_empresas(event);")
        columna_editar.appendChild(imagen_editar2)
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
function paginador_primera_empresas(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
        let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
        let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
        let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
        let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
        let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
        let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
        let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
        let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
        let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
        let activo  = arreglo_rutas[inicio].activo
        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
        
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
        
        let columna_rfcEmpresa = document.createElement("td")
        columna_rfcEmpresa.setAttribute("class","texto")
        let input_rfcEmpresa = document.createElement("input")
        input_rfcEmpresa.setAttribute("type","text")
        input_rfcEmpresa.setAttribute("value",rfcEmpresa)
        input_rfcEmpresa.setAttribute("class","input_paginador")
        input_rfcEmpresa.setAttribute("disabled","true")
        columna_rfcEmpresa.appendChild(input_rfcEmpresa)
        //columna_rfcEmpresa.innerHTML = rfcEmpresa
        fila.appendChild(columna_rfcEmpresa)
        
        let columna_nombreEmpresa = document.createElement("td")
        columna_nombreEmpresa.setAttribute("class","texto")
        let input_nombreEmpresa = document.createElement("input")
        input_nombreEmpresa.setAttribute("type","text")
        input_nombreEmpresa.setAttribute("value",nombreEmpresa)
        input_nombreEmpresa.setAttribute("class","input_paginador")
        input_nombreEmpresa.setAttribute("disabled","true")
        columna_nombreEmpresa.appendChild(input_nombreEmpresa)
        //columna_nombreEmpresa.innerHTML = nombreEmpresa
        fila.appendChild(columna_nombreEmpresa)
        
        let columna_razonsocialEmpresa = document.createElement("td")
        columna_razonsocialEmpresa.setAttribute("class","texto")
        let input_razonsocialEmpresa = document.createElement("input")
        input_razonsocialEmpresa.setAttribute("type","text")
        input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
        input_razonsocialEmpresa.setAttribute("class","input_paginador")
        input_razonsocialEmpresa.setAttribute("disabled","true")
        columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
        //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
        fila.appendChild(columna_razonsocialEmpresa)
        
        let columna_domicilioEmpresa = document.createElement("td")
        columna_domicilioEmpresa.setAttribute("class","texto")
        let input_domicilioEmpresa = document.createElement("input")
        input_domicilioEmpresa.setAttribute("type","text")
        input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
        input_domicilioEmpresa.setAttribute("class","input_paginador")
        input_domicilioEmpresa.setAttribute("disabled","true")
        columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
        //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
        fila.appendChild(columna_domicilioEmpresa)
        
        let columna_numerocalleEmpresa = document.createElement("td")
        columna_numerocalleEmpresa.setAttribute("class","texto")
        let input_numerocalleEmpresa = document.createElement("input")
        input_numerocalleEmpresa.setAttribute("type","text")
        input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
        input_numerocalleEmpresa.setAttribute("class","input_paginador")
        input_numerocalleEmpresa.setAttribute("disabled","true")
        columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
        //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
        fila.appendChild(columna_numerocalleEmpresa)
        
        let columna_coloniaEmpresa = document.createElement("td")
        columna_coloniaEmpresa.setAttribute("class","texto")
        let input_coloniaEmpresa = document.createElement("input")
        input_coloniaEmpresa.setAttribute("type","text")
        input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
        input_coloniaEmpresa.setAttribute("class","input_paginador")
        input_coloniaEmpresa.setAttribute("disabled","true")
        columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
        //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
        fila.appendChild(columna_coloniaEmpresa)
        
        let columna_cpEmpresa = document.createElement("td")
        columna_cpEmpresa.setAttribute("class","texto")
        let input_cpEmpresa = document.createElement("input")
        input_cpEmpresa.setAttribute("type","text")
        input_cpEmpresa.setAttribute("value",cpEmpresa)
        input_cpEmpresa.setAttribute("class","input_paginador")
        input_cpEmpresa.setAttribute("disabled","true")
        columna_cpEmpresa.appendChild(input_cpEmpresa)
        //columna_cpEmpresa.innerHTML = cpEmpresa
        fila.appendChild(columna_cpEmpresa)
        
        let columna_municipioEmpresa = document.createElement("td")
        columna_municipioEmpresa.setAttribute("class","texto")
        let input_municipioEmpresa = document.createElement("input")
        input_municipioEmpresa.setAttribute("type","text")
        input_municipioEmpresa.setAttribute("value",municipioEmpresa)
        input_municipioEmpresa.setAttribute("class","input_paginador")
        input_municipioEmpresa.setAttribute("disabled","true")
        columna_municipioEmpresa.appendChild(input_municipioEmpresa)
        //columna_municipioEmpresa.innerHTML = municipioEmpresa
        fila.appendChild(columna_municipioEmpresa)
        
        let columna_estadoEmpresa = document.createElement("td")
        columna_estadoEmpresa.setAttribute("class","texto")
        let input_estadoEmpresa = document.createElement("input")
        input_estadoEmpresa.setAttribute("type","text")
        input_estadoEmpresa.setAttribute("value",estadoEmpresa)
        input_estadoEmpresa.setAttribute("class","input_paginador")
        input_estadoEmpresa.setAttribute("disabled","true")
        columna_estadoEmpresa.appendChild(input_estadoEmpresa)
        //columna_estadoEmpresa.innerHTML = estadoEmpresa
        fila.appendChild(columna_estadoEmpresa)
        
        let columna_telefonoEmpresa = document.createElement("td")
        columna_telefonoEmpresa.setAttribute("class","texto")
        let input_telefonoEmpresa = document.createElement("input")
        input_telefonoEmpresa.setAttribute("type","text")
        input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
        input_telefonoEmpresa.setAttribute("class","input_paginador")
        input_telefonoEmpresa.setAttribute("disabled","true")
        columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
        //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
        fila.appendChild(columna_telefonoEmpresa)
        
        
        let columna_correoEmpresa = document.createElement("td")
        columna_correoEmpresa.setAttribute("class","texto")
        let input_correoEmpresa = document.createElement("input")
        input_correoEmpresa.setAttribute("type","text")
        input_correoEmpresa.setAttribute("value",correoEmpresa)
        input_correoEmpresa.setAttribute("class","input_paginador")
        input_correoEmpresa.setAttribute("disabled","true")
        columna_correoEmpresa.appendChild(input_correoEmpresa)
        //columna_correoEmpresa.innerHTML = correoEmpresa
        fila.appendChild(columna_correoEmpresa)
        
        let columna_activo = document.createElement("td")
        columna_activo.setAttribute("class","texto")
        columna_activo.innerHTML = activo
        fila.appendChild(columna_activo)
        
        let columna_tipo_usuario = document.createElement("td")
        columna_tipo_usuario.setAttribute("class","texto")
        columna_tipo_usuario.innerHTML = tipo_usuario
        fila.appendChild(columna_tipo_usuario)
        
        let columna_editar = document.createElement("td")
        let imagen_editar = document.createElement("img")
        imagen_editar.setAttribute("src","../recursos/img/baja.png")
        imagen_editar.setAttribute("class","img_accion")
        imagen_editar.setAttribute("onclick","desactivar_empresas(event);")
        columna_editar.appendChild(imagen_editar)
        
        let imagen_editar2 = document.createElement("img")
        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
        imagen_editar2.setAttribute("class","img_accion")
        imagen_editar2.setAttribute("onclick","editar_empresas(event);")
        columna_editar.appendChild(imagen_editar2)
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
function paginador_ultima_empresas(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
    // arreglos
                   let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/baja.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","editar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
var datos_empresasNo
var boton_primeroEmpresasNo = document.getElementById("boton_paginador_primeroEmpresasNo")
var boton_anteriorEmpresasNo = document.getElementById("boton_paginador_anteriorEmpresasNo")
var boton_siguienteEmpresasNo = document.getElementById("boton_paginador_siguienteEmpresasNo")
var boton_ultimoEmpresasNo = document.getElementById("boton_paginador_ultimoEmpresasNo")
var cuerpoEmpresasNo = document.getElementById("tabla_empresas_noactivas")
var indicador_paginaEmpresasNo= document.getElementById("boton_paginador_cantidadEmpresasNo")
var cantidad_vistasEmpresasNo
var pagina_actual_empresas_noactivos = 1

function tomar_datos_empresas_noactivas()
{
    let contenedor = document.getElementById("tabla_empresas_noactivas")
    cantidad_vistasEmpresasNo = document.getElementById("cantidad_empresas_noactivos").value
    pagina_actual_empresas_noactivos = 1


    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_empresas_noactivas.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_empresasNo = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_empresasNo(datos_empresasNo,pagina_actual_empresas_noactivos,cantidad_vistasEmpresasNo,boton_anteriorEmpresasNo,boton_siguienteEmpresasNo,boton_primeroEmpresasNo,boton_ultimoEmpresasNo,cuerpoEmpresasNo,indicador_paginaEmpresasNo)

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

boton_siguienteEmpresasNo.addEventListener("click", function(){
    pagina_actual_empresas_noactivos++
    paginador_siguiente_empresasNo(datos_empresasNo,pagina_actual_empresas_noactivos,cantidad_vistasEmpresasNo,boton_anteriorEmpresasNo,boton_siguienteEmpresasNo,boton_primeroEmpresasNo,boton_ultimoEmpresasNo,cuerpoEmpresasNo,indicador_paginaEmpresasNo)
})

boton_anteriorEmpresasNo.addEventListener("click", function(){
    pagina_actual_empresas_noactivos--
    paginador_anterior_empresasNo(datos_empresasNo,pagina_actual_empresas_noactivos,cantidad_vistasEmpresasNo,boton_anteriorEmpresasNo,boton_siguienteEmpresasNo,boton_primeroEmpresasNo,boton_ultimoEmpresasNo,cuerpoEmpresasNo,indicador_paginaEmpresasNo)
})

boton_primeroEmpresasNo.addEventListener("click", function(){
    pagina_actual_empresas_noactivos = 1 
    paginador_primera_empresasNo(datos_empresasNo,pagina_actual_empresas_noactivos,cantidad_vistasEmpresasNo,boton_anteriorEmpresasNo,boton_siguienteEmpresasNo,boton_primeroEmpresasNo,boton_ultimoEmpresasNo,cuerpoEmpresasNo,indicador_paginaEmpresasNo)
})

boton_ultimoEmpresasNo.addEventListener("click", function(){

    var tamano = datos_empresasNo.length;
    var numero_paginas=tamano/cantidad_vistasEmpresasNo;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_empresas_noactivos = numero_paginas
    paginador_ultima_empresasNo(datos_empresasNo,pagina_actual_empresas_noactivos,cantidad_vistasEmpresasNo,boton_anteriorEmpresasNo,boton_siguienteEmpresasNo,boton_primeroEmpresasNo,boton_ultimoEmpresasNo,cuerpoEmpresasNo,indicador_paginaEmpresasNo)
})

function paginador_empresasNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="15">NO HAY DATOS</td></tr>'
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
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","eliminar_empresa(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_siguiente_empresasNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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


    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            let id = arreglo_rutas[inicio].id
            let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
            let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
            let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
            let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
            let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
            let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
            let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
            let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
            let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
            let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
            let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
            let activo  = arreglo_rutas[inicio].activo
            let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
            
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
            
            let columna_rfcEmpresa = document.createElement("td")
            columna_rfcEmpresa.setAttribute("class","texto")
            let input_rfcEmpresa = document.createElement("input")
            input_rfcEmpresa.setAttribute("type","text")
            input_rfcEmpresa.setAttribute("value",rfcEmpresa)
            input_rfcEmpresa.setAttribute("class","input_paginador")
            input_rfcEmpresa.setAttribute("disabled","true")
            columna_rfcEmpresa.appendChild(input_rfcEmpresa)
            //columna_rfcEmpresa.innerHTML = rfcEmpresa
            fila.appendChild(columna_rfcEmpresa)
            
            let columna_nombreEmpresa = document.createElement("td")
            columna_nombreEmpresa.setAttribute("class","texto")
            let input_nombreEmpresa = document.createElement("input")
            input_nombreEmpresa.setAttribute("type","text")
            input_nombreEmpresa.setAttribute("value",nombreEmpresa)
            input_nombreEmpresa.setAttribute("class","input_paginador")
            input_nombreEmpresa.setAttribute("disabled","true")
            columna_nombreEmpresa.appendChild(input_nombreEmpresa)
            //columna_nombreEmpresa.innerHTML = nombreEmpresa
            fila.appendChild(columna_nombreEmpresa)
            
            let columna_razonsocialEmpresa = document.createElement("td")
            columna_razonsocialEmpresa.setAttribute("class","texto")
            let input_razonsocialEmpresa = document.createElement("input")
            input_razonsocialEmpresa.setAttribute("type","text")
            input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
            input_razonsocialEmpresa.setAttribute("class","input_paginador")
            input_razonsocialEmpresa.setAttribute("disabled","true")
            columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
            //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
            fila.appendChild(columna_razonsocialEmpresa)
            
            let columna_domicilioEmpresa = document.createElement("td")
            columna_domicilioEmpresa.setAttribute("class","texto")
            let input_domicilioEmpresa = document.createElement("input")
            input_domicilioEmpresa.setAttribute("type","text")
            input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
            input_domicilioEmpresa.setAttribute("class","input_paginador")
            input_domicilioEmpresa.setAttribute("disabled","true")
            columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
            //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
            fila.appendChild(columna_domicilioEmpresa)
            
            let columna_numerocalleEmpresa = document.createElement("td")
            columna_numerocalleEmpresa.setAttribute("class","texto")
            let input_numerocalleEmpresa = document.createElement("input")
            input_numerocalleEmpresa.setAttribute("type","text")
            input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
            input_numerocalleEmpresa.setAttribute("class","input_paginador")
            input_numerocalleEmpresa.setAttribute("disabled","true")
            columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
            //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
            fila.appendChild(columna_numerocalleEmpresa)
            
            let columna_coloniaEmpresa = document.createElement("td")
            columna_coloniaEmpresa.setAttribute("class","texto")
            let input_coloniaEmpresa = document.createElement("input")
            input_coloniaEmpresa.setAttribute("type","text")
            input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
            input_coloniaEmpresa.setAttribute("class","input_paginador")
            input_coloniaEmpresa.setAttribute("disabled","true")
            columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
            //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
            fila.appendChild(columna_coloniaEmpresa)
            
            let columna_cpEmpresa = document.createElement("td")
            columna_cpEmpresa.setAttribute("class","texto")
            let input_cpEmpresa = document.createElement("input")
            input_cpEmpresa.setAttribute("type","text")
            input_cpEmpresa.setAttribute("value",cpEmpresa)
            input_cpEmpresa.setAttribute("class","input_paginador")
            input_cpEmpresa.setAttribute("disabled","true")
            columna_cpEmpresa.appendChild(input_cpEmpresa)
            //columna_cpEmpresa.innerHTML = cpEmpresa
            fila.appendChild(columna_cpEmpresa)
            
            let columna_municipioEmpresa = document.createElement("td")
            columna_municipioEmpresa.setAttribute("class","texto")
            let input_municipioEmpresa = document.createElement("input")
            input_municipioEmpresa.setAttribute("type","text")
            input_municipioEmpresa.setAttribute("value",municipioEmpresa)
            input_municipioEmpresa.setAttribute("class","input_paginador")
            input_municipioEmpresa.setAttribute("disabled","true")
            columna_municipioEmpresa.appendChild(input_municipioEmpresa)
            //columna_municipioEmpresa.innerHTML = municipioEmpresa
            fila.appendChild(columna_municipioEmpresa)
            
            let columna_estadoEmpresa = document.createElement("td")
            columna_estadoEmpresa.setAttribute("class","texto")
            let input_estadoEmpresa = document.createElement("input")
            input_estadoEmpresa.setAttribute("type","text")
            input_estadoEmpresa.setAttribute("value",estadoEmpresa)
            input_estadoEmpresa.setAttribute("class","input_paginador")
            input_estadoEmpresa.setAttribute("disabled","true")
            columna_estadoEmpresa.appendChild(input_estadoEmpresa)
            //columna_estadoEmpresa.innerHTML = estadoEmpresa
            fila.appendChild(columna_estadoEmpresa)
            
            let columna_telefonoEmpresa = document.createElement("td")
            columna_telefonoEmpresa.setAttribute("class","texto")
            let input_telefonoEmpresa = document.createElement("input")
            input_telefonoEmpresa.setAttribute("type","text")
            input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
            input_telefonoEmpresa.setAttribute("class","input_paginador")
            input_telefonoEmpresa.setAttribute("disabled","true")
            columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
            //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
            fila.appendChild(columna_telefonoEmpresa)
            
            
            let columna_correoEmpresa = document.createElement("td")
            columna_correoEmpresa.setAttribute("class","texto")
            let input_correoEmpresa = document.createElement("input")
            input_correoEmpresa.setAttribute("type","text")
            input_correoEmpresa.setAttribute("value",correoEmpresa)
            input_correoEmpresa.setAttribute("class","input_paginador")
            input_correoEmpresa.setAttribute("disabled","true")
            columna_correoEmpresa.appendChild(input_correoEmpresa)
            //columna_correoEmpresa.innerHTML = correoEmpresa
            fila.appendChild(columna_correoEmpresa)
            
            let columna_activo = document.createElement("td")
            columna_activo.setAttribute("class","texto")
            columna_activo.innerHTML = activo
            fila.appendChild(columna_activo)
            
            let columna_tipo_usuario = document.createElement("td")
            columna_tipo_usuario.setAttribute("class","texto")
            columna_tipo_usuario.innerHTML = tipo_usuario
            fila.appendChild(columna_tipo_usuario)
            
            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/alta.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","activar_empresas(event);")
            columna_editar.appendChild(imagen_editar)
            
            let imagen_editar2 = document.createElement("img")
            imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
            imagen_editar2.setAttribute("class","img_accion")
            imagen_editar2.setAttribute("onclick","eliminar_empresa(event);")
            columna_editar.appendChild(imagen_editar2)
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
function paginador_anterior_empresasNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
                        let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","eliminar_empresa(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_primera_empresasNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
        let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
        let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
        let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
        let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
        let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
        let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
        let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
        let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
        let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
        let activo  = arreglo_rutas[inicio].activo
        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
        
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

        let columna_rfcEmpresa = document.createElement("td")
        columna_rfcEmpresa.setAttribute("class","texto")
        let input_rfcEmpresa = document.createElement("input")
        input_rfcEmpresa.setAttribute("type","text")
        input_rfcEmpresa.setAttribute("value",rfcEmpresa)
        input_rfcEmpresa.setAttribute("class","input_paginador")
        input_rfcEmpresa.setAttribute("disabled","true")
        columna_rfcEmpresa.appendChild(input_rfcEmpresa)
        //columna_rfcEmpresa.innerHTML = rfcEmpresa
        fila.appendChild(columna_rfcEmpresa)
        
        let columna_nombreEmpresa = document.createElement("td")
        columna_nombreEmpresa.setAttribute("class","texto")
        let input_nombreEmpresa = document.createElement("input")
        input_nombreEmpresa.setAttribute("type","text")
        input_nombreEmpresa.setAttribute("value",nombreEmpresa)
        input_nombreEmpresa.setAttribute("class","input_paginador")
        input_nombreEmpresa.setAttribute("disabled","true")
        columna_nombreEmpresa.appendChild(input_nombreEmpresa)
        //columna_nombreEmpresa.innerHTML = nombreEmpresa
        fila.appendChild(columna_nombreEmpresa)
        
        let columna_razonsocialEmpresa = document.createElement("td")
        columna_razonsocialEmpresa.setAttribute("class","texto")
        let input_razonsocialEmpresa = document.createElement("input")
        input_razonsocialEmpresa.setAttribute("type","text")
        input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
        input_razonsocialEmpresa.setAttribute("class","input_paginador")
        input_razonsocialEmpresa.setAttribute("disabled","true")
        columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
        //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
        fila.appendChild(columna_razonsocialEmpresa)
        
        let columna_domicilioEmpresa = document.createElement("td")
        columna_domicilioEmpresa.setAttribute("class","texto")
        let input_domicilioEmpresa = document.createElement("input")
        input_domicilioEmpresa.setAttribute("type","text")
        input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
        input_domicilioEmpresa.setAttribute("class","input_paginador")
        input_domicilioEmpresa.setAttribute("disabled","true")
        columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
        //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
        fila.appendChild(columna_domicilioEmpresa)
        
        let columna_numerocalleEmpresa = document.createElement("td")
        columna_numerocalleEmpresa.setAttribute("class","texto")
        let input_numerocalleEmpresa = document.createElement("input")
        input_numerocalleEmpresa.setAttribute("type","text")
        input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
        input_numerocalleEmpresa.setAttribute("class","input_paginador")
        input_numerocalleEmpresa.setAttribute("disabled","true")
        columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
        //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
        fila.appendChild(columna_numerocalleEmpresa)
        
        let columna_coloniaEmpresa = document.createElement("td")
        columna_coloniaEmpresa.setAttribute("class","texto")
        let input_coloniaEmpresa = document.createElement("input")
        input_coloniaEmpresa.setAttribute("type","text")
        input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
        input_coloniaEmpresa.setAttribute("class","input_paginador")
        input_coloniaEmpresa.setAttribute("disabled","true")
        columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
        //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
        fila.appendChild(columna_coloniaEmpresa)
        
        let columna_cpEmpresa = document.createElement("td")
        columna_cpEmpresa.setAttribute("class","texto")
        let input_cpEmpresa = document.createElement("input")
        input_cpEmpresa.setAttribute("type","text")
        input_cpEmpresa.setAttribute("value",cpEmpresa)
        input_cpEmpresa.setAttribute("class","input_paginador")
        input_cpEmpresa.setAttribute("disabled","true")
        columna_cpEmpresa.appendChild(input_cpEmpresa)
        //columna_cpEmpresa.innerHTML = cpEmpresa
        fila.appendChild(columna_cpEmpresa)
        
        let columna_municipioEmpresa = document.createElement("td")
        columna_municipioEmpresa.setAttribute("class","texto")
        let input_municipioEmpresa = document.createElement("input")
        input_municipioEmpresa.setAttribute("type","text")
        input_municipioEmpresa.setAttribute("value",municipioEmpresa)
        input_municipioEmpresa.setAttribute("class","input_paginador")
        input_municipioEmpresa.setAttribute("disabled","true")
        columna_municipioEmpresa.appendChild(input_municipioEmpresa)
        //columna_municipioEmpresa.innerHTML = municipioEmpresa
        fila.appendChild(columna_municipioEmpresa)
        
        let columna_estadoEmpresa = document.createElement("td")
        columna_estadoEmpresa.setAttribute("class","texto")
        let input_estadoEmpresa = document.createElement("input")
        input_estadoEmpresa.setAttribute("type","text")
        input_estadoEmpresa.setAttribute("value",estadoEmpresa)
        input_estadoEmpresa.setAttribute("class","input_paginador")
        input_estadoEmpresa.setAttribute("disabled","true")
        columna_estadoEmpresa.appendChild(input_estadoEmpresa)
        //columna_estadoEmpresa.innerHTML = estadoEmpresa
        fila.appendChild(columna_estadoEmpresa)
        
        let columna_telefonoEmpresa = document.createElement("td")
        columna_telefonoEmpresa.setAttribute("class","texto")
        let input_telefonoEmpresa = document.createElement("input")
        input_telefonoEmpresa.setAttribute("type","text")
        input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
        input_telefonoEmpresa.setAttribute("class","input_paginador")
        input_telefonoEmpresa.setAttribute("disabled","true")
        columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
        //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
        fila.appendChild(columna_telefonoEmpresa)
        
        
        let columna_correoEmpresa = document.createElement("td")
        columna_correoEmpresa.setAttribute("class","texto")
        let input_correoEmpresa = document.createElement("input")
        input_correoEmpresa.setAttribute("type","text")
        input_correoEmpresa.setAttribute("value",correoEmpresa)
        input_correoEmpresa.setAttribute("class","input_paginador")
        input_correoEmpresa.setAttribute("disabled","true")
        columna_correoEmpresa.appendChild(input_correoEmpresa)
        //columna_correoEmpresa.innerHTML = correoEmpresa
        fila.appendChild(columna_correoEmpresa)
        
        let columna_activo = document.createElement("td")
        columna_activo.setAttribute("class","texto")
        columna_activo.innerHTML = activo
        fila.appendChild(columna_activo)
        
        let columna_tipo_usuario = document.createElement("td")
        columna_tipo_usuario.setAttribute("class","texto")
        columna_tipo_usuario.innerHTML = tipo_usuario
        fila.appendChild(columna_tipo_usuario)
        
        let columna_editar = document.createElement("td")
        let imagen_editar = document.createElement("img")
        imagen_editar.setAttribute("src","../recursos/img/alta.png")
        imagen_editar.setAttribute("class","img_accion")
        imagen_editar.setAttribute("onclick","activar_empresas(event);")
        columna_editar.appendChild(imagen_editar)
        
        let imagen_editar2 = document.createElement("img")
        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
        imagen_editar2.setAttribute("class","img_accion")
        imagen_editar2.setAttribute("onclick","eliminar_empresa(event);")
        columna_editar.appendChild(imagen_editar2)
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
function paginador_ultima_empresasNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
    // arreglos
    let id = arreglo_rutas[inicio].id
    let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
    let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
    let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
    let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
    let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
    let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
    let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
    let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
    let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
    let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
    let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
    
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
    
    let columna_rfcEmpresa = document.createElement("td")
    columna_rfcEmpresa.setAttribute("class","texto")
    let input_rfcEmpresa = document.createElement("input")
    input_rfcEmpresa.setAttribute("type","text")
    input_rfcEmpresa.setAttribute("value",rfcEmpresa)
    input_rfcEmpresa.setAttribute("class","input_paginador")
    input_rfcEmpresa.setAttribute("disabled","true")
    columna_rfcEmpresa.appendChild(input_rfcEmpresa)
    //columna_rfcEmpresa.innerHTML = rfcEmpresa
    fila.appendChild(columna_rfcEmpresa)
    
    let columna_nombreEmpresa = document.createElement("td")
    columna_nombreEmpresa.setAttribute("class","texto")
    let input_nombreEmpresa = document.createElement("input")
    input_nombreEmpresa.setAttribute("type","text")
    input_nombreEmpresa.setAttribute("value",nombreEmpresa)
    input_nombreEmpresa.setAttribute("class","input_paginador")
    input_nombreEmpresa.setAttribute("disabled","true")
    columna_nombreEmpresa.appendChild(input_nombreEmpresa)
    //columna_nombreEmpresa.innerHTML = nombreEmpresa
    fila.appendChild(columna_nombreEmpresa)
    
    let columna_razonsocialEmpresa = document.createElement("td")
    columna_razonsocialEmpresa.setAttribute("class","texto")
    let input_razonsocialEmpresa = document.createElement("input")
    input_razonsocialEmpresa.setAttribute("type","text")
    input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
    input_razonsocialEmpresa.setAttribute("class","input_paginador")
    input_razonsocialEmpresa.setAttribute("disabled","true")
    columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
    //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
    fila.appendChild(columna_razonsocialEmpresa)
    
    let columna_domicilioEmpresa = document.createElement("td")
    columna_domicilioEmpresa.setAttribute("class","texto")
    let input_domicilioEmpresa = document.createElement("input")
    input_domicilioEmpresa.setAttribute("type","text")
    input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
    input_domicilioEmpresa.setAttribute("class","input_paginador")
    input_domicilioEmpresa.setAttribute("disabled","true")
    columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
    //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
    fila.appendChild(columna_domicilioEmpresa)
    
    let columna_numerocalleEmpresa = document.createElement("td")
    columna_numerocalleEmpresa.setAttribute("class","texto")
    let input_numerocalleEmpresa = document.createElement("input")
    input_numerocalleEmpresa.setAttribute("type","text")
    input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
    input_numerocalleEmpresa.setAttribute("class","input_paginador")
    input_numerocalleEmpresa.setAttribute("disabled","true")
    columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
    //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
    fila.appendChild(columna_numerocalleEmpresa)
    
    let columna_coloniaEmpresa = document.createElement("td")
    columna_coloniaEmpresa.setAttribute("class","texto")
    let input_coloniaEmpresa = document.createElement("input")
    input_coloniaEmpresa.setAttribute("type","text")
    input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
    input_coloniaEmpresa.setAttribute("class","input_paginador")
    input_coloniaEmpresa.setAttribute("disabled","true")
    columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
    //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
    fila.appendChild(columna_coloniaEmpresa)
    
    let columna_cpEmpresa = document.createElement("td")
    columna_cpEmpresa.setAttribute("class","texto")
    let input_cpEmpresa = document.createElement("input")
    input_cpEmpresa.setAttribute("type","text")
    input_cpEmpresa.setAttribute("value",cpEmpresa)
    input_cpEmpresa.setAttribute("class","input_paginador")
    input_cpEmpresa.setAttribute("disabled","true")
    columna_cpEmpresa.appendChild(input_cpEmpresa)
    //columna_cpEmpresa.innerHTML = cpEmpresa
    fila.appendChild(columna_cpEmpresa)
    
    let columna_municipioEmpresa = document.createElement("td")
    columna_municipioEmpresa.setAttribute("class","texto")
    let input_municipioEmpresa = document.createElement("input")
    input_municipioEmpresa.setAttribute("type","text")
    input_municipioEmpresa.setAttribute("value",municipioEmpresa)
    input_municipioEmpresa.setAttribute("class","input_paginador")
    input_municipioEmpresa.setAttribute("disabled","true")
    columna_municipioEmpresa.appendChild(input_municipioEmpresa)
    //columna_municipioEmpresa.innerHTML = municipioEmpresa
    fila.appendChild(columna_municipioEmpresa)
    
    let columna_estadoEmpresa = document.createElement("td")
    columna_estadoEmpresa.setAttribute("class","texto")
    let input_estadoEmpresa = document.createElement("input")
    input_estadoEmpresa.setAttribute("type","text")
    input_estadoEmpresa.setAttribute("value",estadoEmpresa)
    input_estadoEmpresa.setAttribute("class","input_paginador")
    input_estadoEmpresa.setAttribute("disabled","true")
    columna_estadoEmpresa.appendChild(input_estadoEmpresa)
    //columna_estadoEmpresa.innerHTML = estadoEmpresa
    fila.appendChild(columna_estadoEmpresa)
    
    let columna_telefonoEmpresa = document.createElement("td")
    columna_telefonoEmpresa.setAttribute("class","texto")
    let input_telefonoEmpresa = document.createElement("input")
    input_telefonoEmpresa.setAttribute("type","text")
    input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
    input_telefonoEmpresa.setAttribute("class","input_paginador")
    input_telefonoEmpresa.setAttribute("disabled","true")
    columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
    //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
    fila.appendChild(columna_telefonoEmpresa)
    
    
    let columna_correoEmpresa = document.createElement("td")
    columna_correoEmpresa.setAttribute("class","texto")
    let input_correoEmpresa = document.createElement("input")
    input_correoEmpresa.setAttribute("type","text")
    input_correoEmpresa.setAttribute("value",correoEmpresa)
    input_correoEmpresa.setAttribute("class","input_paginador")
    input_correoEmpresa.setAttribute("disabled","true")
    columna_correoEmpresa.appendChild(input_correoEmpresa)
    //columna_correoEmpresa.innerHTML = correoEmpresa
    fila.appendChild(columna_correoEmpresa)
    
    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)
    
    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)
    
    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/alta.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","activar_empresas(event);")
    columna_editar.appendChild(imagen_editar)
    
    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","eliminar_empresa(event);")
    columna_editar.appendChild(imagen_editar2)
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
var datos_empresasPendientes
var boton_primeroEmpresasPendientes = document.getElementById("boton_paginador_primeroEmpresasPendientes")
var boton_anteriorEmpresasPendientes = document.getElementById("boton_paginador_anteriorEmpresasPendientes")
var boton_siguienteEmpresasPendientes = document.getElementById("boton_paginador_siguienteEmpresasPendientes")
var boton_ultimoEmpresasPendientes = document.getElementById("boton_paginador_ultimoEmpresasPendientes")
var cuerpoEmpresasPendientes = document.getElementById("tabla_empresas_peticion")
var indicador_paginaEmpresasPendientes= document.getElementById("boton_paginador_cantidadEmpresasPendientes")
var cantidad_vistasEmpresasPendientes
var pagina_actual_empresas_Pendientes

function tomar_datos_empresas_peticion()
{
    let contenedor = document.getElementById("tabla_empresas_peticion")
    cantidad_vistasEmpresasPendientes = document.getElementById("cantidad_empresas_pendientes").value
    pagina_actual_empresas_Pendientes = 1

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_empresas_pendientes.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_empresasPendientes = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_empresasPendientes(datos_empresasPendientes,pagina_actual_empresas_Pendientes,cantidad_vistasEmpresasPendientes,boton_anteriorEmpresasPendientes,boton_siguienteEmpresasPendientes,boton_primeroEmpresasPendientes,boton_ultimoEmpresasPendientes,cuerpoEmpresasPendientes,indicador_paginaEmpresasPendientes)

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
boton_siguienteEmpresasPendientes.addEventListener("click", function(){
    pagina_actual_empresas_Pendientes++
    paginador_siguiente_empresasPendientes(datos_empresasPendientes,pagina_actual_empresas_Pendientes,cantidad_vistasEmpresasPendientes,boton_anteriorEmpresasPendientes,boton_siguienteEmpresasPendientes,boton_primeroEmpresasPendientes,boton_ultimoEmpresasPendientes,cuerpoEmpresasPendientes,indicador_paginaEmpresasPendientes)
})

boton_anteriorEmpresasPendientes.addEventListener("click", function(){
    pagina_actual_empresas_Pendientes--
    paginador_anterior_empresasPendientes(datos_empresasPendientes,pagina_actual_empresas_Pendientes,cantidad_vistasEmpresasPendientes,boton_anteriorEmpresasPendientes,boton_siguienteEmpresasPendientes,boton_primeroEmpresasPendientes,boton_ultimoEmpresasPendientes,cuerpoEmpresasPendientes,indicador_paginaEmpresasPendientes)
})

boton_primeroEmpresasPendientes.addEventListener("click", function(){
    pagina_actual_empresas_Pendientes = 1 
    paginador_primera_empresasPendientes(datos_empresasPendientes,pagina_actual_empresas_Pendientes,cantidad_vistasEmpresasPendientes,boton_anteriorEmpresasPendientes,boton_siguienteEmpresasPendientes,boton_primeroEmpresasPendientes,boton_ultimoEmpresasPendientes,cuerpoEmpresasPendientes,indicador_paginaEmpresasPendientes)
})

boton_ultimoEmpresasPendientes.addEventListener("click", function(){

    var tamano = datos_empresasPendientes.length;
    var numero_paginas=tamano/cantidad_vistasEmpresasPendientes;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_empresas_Pendientes = numero_paginas
    paginador_ultima_empresasPendientes(datos_empresasPendientes,pagina_actual_empresas_Pendientes,cantidad_vistasEmpresasPendientes,boton_anteriorEmpresasPendientes,boton_siguienteEmpresasPendientes,boton_primeroEmpresasPendientes,boton_ultimoEmpresasPendientes,cuerpoEmpresasPendientes,indicador_paginaEmpresasPendientes)
})

function paginador_empresasPendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="15">NO HAY DATOS</td></tr>'
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
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_siguiente_empresasPendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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


    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_anterior_empresasPendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_primera_empresasPendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_ultima_empresasPendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
    // arreglos
    let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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


var datos_empresasPendientesDash
var boton_primeroEmpresasPendientesDash = document.getElementById("boton_paginador_primeroEmpresasPendientesDash")
var boton_anteriorEmpresasPendientesDash = document.getElementById("boton_paginador_anteriorEmpresasPendientesDash")
var boton_siguienteEmpresasPendientesDash = document.getElementById("boton_paginador_siguienteEmpresasPendientesDash")
var boton_ultimoEmpresasPendientesDash = document.getElementById("boton_paginador_ultimoEmpresasPendientesDash")
var cuerpoEmpresasPendientesDash= document.getElementById("tabla_peticion_dashboard")
var indicador_paginaEmpresasPendientesDash = document.getElementById("boton_paginador_cantidadEmpresasPendientesDash")
var cantidad_vistasEmpresasPendientesDash
var pagina_actual_empresas_PendientesDash 

function tomar_datos_empresas_peticion_dashboard()
{
    let contenedor = document.getElementById("tabla_peticion_dashboard")
    cantidad_vistasEmpresasPendientesDash = document.getElementById("cantidad_peticiones_dashboard").value
    pagina_actual_empresas_PendientesDash = 1

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_empresas_pendientes.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_empresasPendientesDash = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_empresasPendientesDash(datos_empresasPendientesDash,pagina_actual_empresas_PendientesDash,cantidad_vistasEmpresasPendientesDash,boton_anteriorEmpresasPendientesDash,boton_siguienteEmpresasPendientesDash,boton_primeroEmpresasPendientesDash,boton_ultimoEmpresasPendientesDash,cuerpoEmpresasPendientesDash,indicador_paginaEmpresasPendientesDash)

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

boton_siguienteEmpresasPendientesDash.addEventListener("click", function(){
    pagina_actual_empresas_PendientesDash++
    paginador_siguiente_empresasPendientesDash(datos_empresasPendientesDash,pagina_actual_empresas_PendientesDash,cantidad_vistasEmpresasPendientesDash,boton_anteriorEmpresasPendientesDash,boton_siguienteEmpresasPendientesDash,boton_primeroEmpresasPendientesDash,boton_ultimoEmpresasPendientesDash,cuerpoEmpresasPendientesDash,indicador_paginaEmpresasPendientesDash)
})

boton_anteriorEmpresasPendientesDash.addEventListener("click", function(){
    pagina_actual_empresas_PendientesDash--
    paginador_anterior_empresasPendientesDash(datos_empresasPendientesDash,pagina_actual_empresas_PendientesDash,cantidad_vistasEmpresasPendientesDash,boton_anteriorEmpresasPendientesDash,boton_siguienteEmpresasPendientesDash,boton_primeroEmpresasPendientesDash,boton_ultimoEmpresasPendientesDash,cuerpoEmpresasPendientesDash,indicador_paginaEmpresasPendientesDash)
})

boton_primeroEmpresasPendientesDash.addEventListener("click", function(){
    pagina_actual_empresas_PendientesDash = 1 
    paginador_primera_empresasPendientesDash(datos_empresasPendientesDash,pagina_actual_empresas_PendientesDash,cantidad_vistasEmpresasPendientesDash,boton_anteriorEmpresasPendientesDash,boton_siguienteEmpresasPendientesDash,boton_primeroEmpresasPendientesDash,boton_ultimoEmpresasPendientesDash,cuerpoEmpresasPendientesDash,indicador_paginaEmpresasPendientesDash)
})

boton_ultimoEmpresasPendientesDash.addEventListener("click", function(){

    var tamano = datos_empresasPendientesDash.length;
    var numero_paginas=tamano/cantidad_vistasEmpresasPendientesDash;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_empresas_PendientesDash = numero_paginas
    paginador_ultima_empresasPendientesDash(datos_empresasPendientesDash,pagina_actual_empresas_PendientesDash,cantidad_vistasEmpresasPendientesDash,boton_anteriorEmpresasPendientesDash,boton_siguienteEmpresasPendientesDash,boton_primeroEmpresasPendientesDash,boton_ultimoEmpresasPendientesDash,cuerpoEmpresasPendientesDash,indicador_paginaEmpresasPendientesDash)
})

function paginador_empresasPendientesDash(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    if(arreglo_rutas=="error 400")
    {
        // alert("no hay datos")
        btn_atras.style="visibility:hidden;";
        btn_primera.style="visibility:hidden;";
        btn_adelante.style="visibility:hidden;";
        btn_ultima.style="visibility:hidden;";
        pagina_paginador.innerHTML="1 de 1";
        cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="15">NO HAY DATOS</td></tr>'
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
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_siguiente_empresasPendientesDash(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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


    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_anterior_empresasPendientesDash(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
function paginador_primera_empresasPendientesDash(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
        let id = arreglo_rutas[inicio].id
        let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
        let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
        let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
        let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
        let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
        let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
        let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
        let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
        let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
        let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
        let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
        let activo  = arreglo_rutas[inicio].activo
        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
        
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
        
        let columna_rfcEmpresa = document.createElement("td")
        columna_rfcEmpresa.setAttribute("class","texto")
        let input_rfcEmpresa = document.createElement("input")
        input_rfcEmpresa.setAttribute("type","text")
        input_rfcEmpresa.setAttribute("value",rfcEmpresa)
        input_rfcEmpresa.setAttribute("class","input_paginador")
        input_rfcEmpresa.setAttribute("disabled","true")
        columna_rfcEmpresa.appendChild(input_rfcEmpresa)
        //columna_rfcEmpresa.innerHTML = rfcEmpresa
        fila.appendChild(columna_rfcEmpresa)
        
        let columna_nombreEmpresa = document.createElement("td")
        columna_nombreEmpresa.setAttribute("class","texto")
        let input_nombreEmpresa = document.createElement("input")
        input_nombreEmpresa.setAttribute("type","text")
        input_nombreEmpresa.setAttribute("value",nombreEmpresa)
        input_nombreEmpresa.setAttribute("class","input_paginador")
        input_nombreEmpresa.setAttribute("disabled","true")
        columna_nombreEmpresa.appendChild(input_nombreEmpresa)
        //columna_nombreEmpresa.innerHTML = nombreEmpresa
        fila.appendChild(columna_nombreEmpresa)
        
        let columna_razonsocialEmpresa = document.createElement("td")
        columna_razonsocialEmpresa.setAttribute("class","texto")
        let input_razonsocialEmpresa = document.createElement("input")
        input_razonsocialEmpresa.setAttribute("type","text")
        input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
        input_razonsocialEmpresa.setAttribute("class","input_paginador")
        input_razonsocialEmpresa.setAttribute("disabled","true")
        columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
        //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
        fila.appendChild(columna_razonsocialEmpresa)
        
        let columna_domicilioEmpresa = document.createElement("td")
        columna_domicilioEmpresa.setAttribute("class","texto")
        let input_domicilioEmpresa = document.createElement("input")
        input_domicilioEmpresa.setAttribute("type","text")
        input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
        input_domicilioEmpresa.setAttribute("class","input_paginador")
        input_domicilioEmpresa.setAttribute("disabled","true")
        columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
        //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
        fila.appendChild(columna_domicilioEmpresa)
        
        let columna_numerocalleEmpresa = document.createElement("td")
        columna_numerocalleEmpresa.setAttribute("class","texto")
        let input_numerocalleEmpresa = document.createElement("input")
        input_numerocalleEmpresa.setAttribute("type","text")
        input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
        input_numerocalleEmpresa.setAttribute("class","input_paginador")
        input_numerocalleEmpresa.setAttribute("disabled","true")
        columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
        //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
        fila.appendChild(columna_numerocalleEmpresa)
        
        let columna_coloniaEmpresa = document.createElement("td")
        columna_coloniaEmpresa.setAttribute("class","texto")
        let input_coloniaEmpresa = document.createElement("input")
        input_coloniaEmpresa.setAttribute("type","text")
        input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
        input_coloniaEmpresa.setAttribute("class","input_paginador")
        input_coloniaEmpresa.setAttribute("disabled","true")
        columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
        //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
        fila.appendChild(columna_coloniaEmpresa)
        
        let columna_cpEmpresa = document.createElement("td")
        columna_cpEmpresa.setAttribute("class","texto")
        let input_cpEmpresa = document.createElement("input")
        input_cpEmpresa.setAttribute("type","text")
        input_cpEmpresa.setAttribute("value",cpEmpresa)
        input_cpEmpresa.setAttribute("class","input_paginador")
        input_cpEmpresa.setAttribute("disabled","true")
        columna_cpEmpresa.appendChild(input_cpEmpresa)
        //columna_cpEmpresa.innerHTML = cpEmpresa
        fila.appendChild(columna_cpEmpresa)
        
        let columna_municipioEmpresa = document.createElement("td")
        columna_municipioEmpresa.setAttribute("class","texto")
        let input_municipioEmpresa = document.createElement("input")
        input_municipioEmpresa.setAttribute("type","text")
        input_municipioEmpresa.setAttribute("value",municipioEmpresa)
        input_municipioEmpresa.setAttribute("class","input_paginador")
        input_municipioEmpresa.setAttribute("disabled","true")
        columna_municipioEmpresa.appendChild(input_municipioEmpresa)
        //columna_municipioEmpresa.innerHTML = municipioEmpresa
        fila.appendChild(columna_municipioEmpresa)
        
        let columna_estadoEmpresa = document.createElement("td")
        columna_estadoEmpresa.setAttribute("class","texto")
        let input_estadoEmpresa = document.createElement("input")
        input_estadoEmpresa.setAttribute("type","text")
        input_estadoEmpresa.setAttribute("value",estadoEmpresa)
        input_estadoEmpresa.setAttribute("class","input_paginador")
        input_estadoEmpresa.setAttribute("disabled","true")
        columna_estadoEmpresa.appendChild(input_estadoEmpresa)
        //columna_estadoEmpresa.innerHTML = estadoEmpresa
        fila.appendChild(columna_estadoEmpresa)
        
        let columna_telefonoEmpresa = document.createElement("td")
        columna_telefonoEmpresa.setAttribute("class","texto")
        let input_telefonoEmpresa = document.createElement("input")
        input_telefonoEmpresa.setAttribute("type","text")
        input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
        input_telefonoEmpresa.setAttribute("class","input_paginador")
        input_telefonoEmpresa.setAttribute("disabled","true")
        columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
        //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
        fila.appendChild(columna_telefonoEmpresa)
        
        
        let columna_correoEmpresa = document.createElement("td")
        columna_correoEmpresa.setAttribute("class","texto")
        let input_correoEmpresa = document.createElement("input")
        input_correoEmpresa.setAttribute("type","text")
        input_correoEmpresa.setAttribute("value",correoEmpresa)
        input_correoEmpresa.setAttribute("class","input_paginador")
        input_correoEmpresa.setAttribute("disabled","true")
        columna_correoEmpresa.appendChild(input_correoEmpresa)
        //columna_correoEmpresa.innerHTML = correoEmpresa
        fila.appendChild(columna_correoEmpresa)
        
        let columna_activo = document.createElement("td")
        columna_activo.setAttribute("class","texto")
        columna_activo.innerHTML = activo
        fila.appendChild(columna_activo)
        
        let columna_tipo_usuario = document.createElement("td")
        columna_tipo_usuario.setAttribute("class","texto")
        columna_tipo_usuario.innerHTML = tipo_usuario
        fila.appendChild(columna_tipo_usuario)
        
        let columna_editar = document.createElement("td")
        let imagen_editar = document.createElement("img")
        imagen_editar.setAttribute("src","../recursos/img/alta.png")
        imagen_editar.setAttribute("class","img_accion")
        imagen_editar.setAttribute("onclick","activar_empresas(event);")
        columna_editar.appendChild(imagen_editar)
        
        let imagen_editar2 = document.createElement("img")
        imagen_editar2.setAttribute("src","../recursos/img/baja.png")
        imagen_editar2.setAttribute("class","img_accion")
        imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
        columna_editar.appendChild(imagen_editar2)
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
function paginador_ultima_empresasPendientesDash(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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

    var numero_clase=1;
    for (inicio; inicio < final; inicio++) 
    {
    if (arreglo_rutas[inicio]!=undefined) 
    {
    // arreglos
    let id = arreglo_rutas[inicio].id
                let rfcEmpresa = arreglo_rutas[inicio].rfcEmpresa
                let nombreEmpresa = arreglo_rutas[inicio].nombreEmpresa
                let razonsocialEmpresa = arreglo_rutas[inicio].razonsocialEmpresa
                let domicilioEmpresa = arreglo_rutas[inicio].domicilioEmpresa
                let numerocalleEmpresa = arreglo_rutas[inicio].numerocalleEmpresa
                let coloniaEmpresa = arreglo_rutas[inicio].coloniaEmpresa
                let cpEmpresa = arreglo_rutas[inicio].cpEmpresa
                let municipioEmpresa = arreglo_rutas[inicio].municipioEmpresa
                let estadoEmpresa = arreglo_rutas[inicio].estadoEmpresa
                let telefonoEmpresa  = arreglo_rutas[inicio].telefonoEmpresa
                let correoEmpresa = arreglo_rutas[inicio].correoEmpresa
                let activo  = arreglo_rutas[inicio].activo
                let tipo_usuario = arreglo_rutas[inicio].tipo_usuario
                
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
                
                let columna_rfcEmpresa = document.createElement("td")
                columna_rfcEmpresa.setAttribute("class","texto")
                let input_rfcEmpresa = document.createElement("input")
                input_rfcEmpresa.setAttribute("type","text")
                input_rfcEmpresa.setAttribute("value",rfcEmpresa)
                input_rfcEmpresa.setAttribute("class","input_paginador")
                input_rfcEmpresa.setAttribute("disabled","true")
                columna_rfcEmpresa.appendChild(input_rfcEmpresa)
                //columna_rfcEmpresa.innerHTML = rfcEmpresa
                fila.appendChild(columna_rfcEmpresa)
                
                let columna_nombreEmpresa = document.createElement("td")
                columna_nombreEmpresa.setAttribute("class","texto")
                let input_nombreEmpresa = document.createElement("input")
                input_nombreEmpresa.setAttribute("type","text")
                input_nombreEmpresa.setAttribute("value",nombreEmpresa)
                input_nombreEmpresa.setAttribute("class","input_paginador")
                input_nombreEmpresa.setAttribute("disabled","true")
                columna_nombreEmpresa.appendChild(input_nombreEmpresa)
                //columna_nombreEmpresa.innerHTML = nombreEmpresa
                fila.appendChild(columna_nombreEmpresa)
                
                let columna_razonsocialEmpresa = document.createElement("td")
                columna_razonsocialEmpresa.setAttribute("class","texto")
                let input_razonsocialEmpresa = document.createElement("input")
                input_razonsocialEmpresa.setAttribute("type","text")
                input_razonsocialEmpresa.setAttribute("value",razonsocialEmpresa)
                input_razonsocialEmpresa.setAttribute("class","input_paginador")
                input_razonsocialEmpresa.setAttribute("disabled","true")
                columna_razonsocialEmpresa.appendChild(input_razonsocialEmpresa)
                //columna_razonsocialEmpresa.innerHTML = razonsocialEmpresa
                fila.appendChild(columna_razonsocialEmpresa)
                
                let columna_domicilioEmpresa = document.createElement("td")
                columna_domicilioEmpresa.setAttribute("class","texto")
                let input_domicilioEmpresa = document.createElement("input")
                input_domicilioEmpresa.setAttribute("type","text")
                input_domicilioEmpresa.setAttribute("value",domicilioEmpresa)
                input_domicilioEmpresa.setAttribute("class","input_paginador")
                input_domicilioEmpresa.setAttribute("disabled","true")
                columna_domicilioEmpresa.appendChild(input_domicilioEmpresa)
                //columna_domicilioEmpresa.innerHTML = domicilioEmpresa
                fila.appendChild(columna_domicilioEmpresa)
                
                let columna_numerocalleEmpresa = document.createElement("td")
                columna_numerocalleEmpresa.setAttribute("class","texto")
                let input_numerocalleEmpresa = document.createElement("input")
                input_numerocalleEmpresa.setAttribute("type","text")
                input_numerocalleEmpresa.setAttribute("value",numerocalleEmpresa)
                input_numerocalleEmpresa.setAttribute("class","input_paginador")
                input_numerocalleEmpresa.setAttribute("disabled","true")
                columna_numerocalleEmpresa.appendChild(input_numerocalleEmpresa)
                //columna_numerocalleEmpresa.innerHTML = numerocalleEmpresa
                fila.appendChild(columna_numerocalleEmpresa)
                
                let columna_coloniaEmpresa = document.createElement("td")
                columna_coloniaEmpresa.setAttribute("class","texto")
                let input_coloniaEmpresa = document.createElement("input")
                input_coloniaEmpresa.setAttribute("type","text")
                input_coloniaEmpresa.setAttribute("value",coloniaEmpresa)
                input_coloniaEmpresa.setAttribute("class","input_paginador")
                input_coloniaEmpresa.setAttribute("disabled","true")
                columna_coloniaEmpresa.appendChild(input_coloniaEmpresa)
                //columna_coloniaEmpresa.innerHTML = coloniaEmpresa
                fila.appendChild(columna_coloniaEmpresa)
                
                let columna_cpEmpresa = document.createElement("td")
                columna_cpEmpresa.setAttribute("class","texto")
                let input_cpEmpresa = document.createElement("input")
                input_cpEmpresa.setAttribute("type","text")
                input_cpEmpresa.setAttribute("value",cpEmpresa)
                input_cpEmpresa.setAttribute("class","input_paginador")
                input_cpEmpresa.setAttribute("disabled","true")
                columna_cpEmpresa.appendChild(input_cpEmpresa)
                //columna_cpEmpresa.innerHTML = cpEmpresa
                fila.appendChild(columna_cpEmpresa)
                
                let columna_municipioEmpresa = document.createElement("td")
                columna_municipioEmpresa.setAttribute("class","texto")
                let input_municipioEmpresa = document.createElement("input")
                input_municipioEmpresa.setAttribute("type","text")
                input_municipioEmpresa.setAttribute("value",municipioEmpresa)
                input_municipioEmpresa.setAttribute("class","input_paginador")
                input_municipioEmpresa.setAttribute("disabled","true")
                columna_municipioEmpresa.appendChild(input_municipioEmpresa)
                //columna_municipioEmpresa.innerHTML = municipioEmpresa
                fila.appendChild(columna_municipioEmpresa)
                
                let columna_estadoEmpresa = document.createElement("td")
                columna_estadoEmpresa.setAttribute("class","texto")
                let input_estadoEmpresa = document.createElement("input")
                input_estadoEmpresa.setAttribute("type","text")
                input_estadoEmpresa.setAttribute("value",estadoEmpresa)
                input_estadoEmpresa.setAttribute("class","input_paginador")
                input_estadoEmpresa.setAttribute("disabled","true")
                columna_estadoEmpresa.appendChild(input_estadoEmpresa)
                //columna_estadoEmpresa.innerHTML = estadoEmpresa
                fila.appendChild(columna_estadoEmpresa)
                
                let columna_telefonoEmpresa = document.createElement("td")
                columna_telefonoEmpresa.setAttribute("class","texto")
                let input_telefonoEmpresa = document.createElement("input")
                input_telefonoEmpresa.setAttribute("type","text")
                input_telefonoEmpresa.setAttribute("value",telefonoEmpresa)
                input_telefonoEmpresa.setAttribute("class","input_paginador")
                input_telefonoEmpresa.setAttribute("disabled","true")
                columna_telefonoEmpresa.appendChild(input_telefonoEmpresa)
                //columna_telefonoEmpresa.innerHTML = telefonoEmpresa
                fila.appendChild(columna_telefonoEmpresa)
                
                
                let columna_correoEmpresa = document.createElement("td")
                columna_correoEmpresa.setAttribute("class","texto")
                let input_correoEmpresa = document.createElement("input")
                input_correoEmpresa.setAttribute("type","text")
                input_correoEmpresa.setAttribute("value",correoEmpresa)
                input_correoEmpresa.setAttribute("class","input_paginador")
                input_correoEmpresa.setAttribute("disabled","true")
                columna_correoEmpresa.appendChild(input_correoEmpresa)
                //columna_correoEmpresa.innerHTML = correoEmpresa
                fila.appendChild(columna_correoEmpresa)
                
                let columna_activo = document.createElement("td")
                columna_activo.setAttribute("class","texto")
                columna_activo.innerHTML = activo
                fila.appendChild(columna_activo)
                
                let columna_tipo_usuario = document.createElement("td")
                columna_tipo_usuario.setAttribute("class","texto")
                columna_tipo_usuario.innerHTML = tipo_usuario
                fila.appendChild(columna_tipo_usuario)
                
                let columna_editar = document.createElement("td")
                let imagen_editar = document.createElement("img")
                imagen_editar.setAttribute("src","../recursos/img/alta.png")
                imagen_editar.setAttribute("class","img_accion")
                imagen_editar.setAttribute("onclick","activar_empresas(event);")
                columna_editar.appendChild(imagen_editar)
                
                let imagen_editar2 = document.createElement("img")
                imagen_editar2.setAttribute("src","../recursos/img/baja.png")
                imagen_editar2.setAttribute("class","img_accion")
                imagen_editar2.setAttribute("onclick","desactivar_empresas(event);")
                columna_editar.appendChild(imagen_editar2)
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
var datos_admin
var boton_primeroAdmin = document.getElementById("boton_paginador_primeroAdmin")
var boton_anteriorAdmin = document.getElementById("boton_paginador_anteriorAdmin")
var boton_siguienteAdmin = document.getElementById("boton_paginador_siguienteAdmin")
var boton_ultimoAdmin = document.getElementById("boton_paginador_ultimoAdmin")
var cuerpoAdmin = document.getElementById("tabla_administradores_activo")
var indicador_paginaAdmin= document.getElementById("boton_paginador_cantidadAdmin")
var cantidad_vistasAdmin
var pagina_actual_Admin_activos 

function tomar_datos_administradores()
{
    let contenedor = document.getElementById("tabla_administradores_activo")
    cantidad_vistasAdmin = document.getElementById("cantidad_administradores_activos").value
    pagina_actual_Admin_activos = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_adn_activos.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_admin = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_admin(datos_admin,pagina_actual_Admin_activos,cantidad_vistasAdmin,boton_anteriorAdmin,boton_siguienteAdmin,boton_primeroAdmin,boton_ultimoAdmin,cuerpoAdmin,indicador_paginaAdmin)
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

boton_siguienteAdmin.addEventListener("click", function(){
    pagina_actual_Admin_activos++
    paginador_siguiente_admin(datos_admin,pagina_actual_Admin_activos,cantidad_vistasAdmin,boton_anteriorAdmin,boton_siguienteAdmin,boton_primeroAdmin,boton_ultimoAdmin,cuerpoAdmin,indicador_paginaAdmin)
})

boton_anteriorAdmin.addEventListener("click", function(){
    pagina_actual_Admin_activos--
    paginador_anterior_admin(datos_admin,pagina_actual_Admin_activos,cantidad_vistasAdmin,boton_anteriorAdmin,boton_siguienteAdmin,boton_primeroAdmin,boton_ultimoAdmin,cuerpoAdmin,indicador_paginaAdmin)
})

boton_primeroAdmin.addEventListener("click", function(){
    pagina_actual_Admin_activos = 1 
    paginador_primera_admin(datos_admin,pagina_actual_Admin_activos,cantidad_vistasAdmin,boton_anteriorAdmin,boton_siguienteAdmin,boton_primeroAdmin,boton_ultimoAdmin,cuerpoAdmin,indicador_paginaAdmin)
})

boton_ultimoAdmin.addEventListener("click", function(){

    var tamano = datos_admin.length;
    var numero_paginas=tamano/cantidad_vistasAdmin;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_Admin_activos = numero_paginas

    paginador_ultima_admin(datos_admin,pagina_actual_Admin_activos,cantidad_vistasAdmin,boton_anteriorAdmin,boton_siguienteAdmin,boton_primeroAdmin,boton_ultimoAdmin,cuerpoAdmin,indicador_paginaAdmin)
})

function paginador_admin(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
                        let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
                        let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
                        let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
                        let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
                        let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
                        let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
                        let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
                        let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
                        let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreAdministrador)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreAdministrador
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopAdministrador)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopAdministrador
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomAdministrador)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomAdministrador
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioAdministrador)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioAdministrador
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextAdministrador)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextAdministrador
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaAdministrador)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaAdministrador
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoAdministrador)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoAdministrador
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoAdministrador)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoAdministrador
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoAdministrador)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoAdministrador
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)


                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")
                        columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)


                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/baja.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","desactivar_adn(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/editar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","editar_adn(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_siguiente_admin(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
            let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
            let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
            let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
            let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
            let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
            let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
            let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
            let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
            let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
            let activo  = arreglo_rutas[inicio].activo
            let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

            let columna_nombre = document.createElement("td")
            columna_nombre.setAttribute("class","texto")
            let input_nombre = document.createElement("input")
            input_nombre.setAttribute("type","text")
            input_nombre.setAttribute("value",nombreAdministrador)
            input_nombre.setAttribute("class","input_paginador")
            input_nombre.setAttribute("disabled","true")
            columna_nombre.appendChild(input_nombre)
            //columna_nombre.innerHTML = nombreAdministrador
            fila.appendChild(columna_nombre)

            let columna_apellidop = document.createElement("td")
            columna_apellidop.setAttribute("class","texto")

            let input_apellidop = document.createElement("input")
            input_apellidop.setAttribute("type","text")
            input_apellidop.setAttribute("value",apellidopAdministrador)
            input_apellidop.setAttribute("class","input_paginador")
            input_apellidop.setAttribute("disabled","true")
            columna_apellidop.appendChild(input_apellidop)
            //columna_apellidop.innerHTML = apellidopAdministrador
            fila.appendChild(columna_apellidop)


            let columna_apellidom = document.createElement("td")
            columna_apellidom.setAttribute("class","texto")
            let input_apellidom = document.createElement("input")
            input_apellidom.setAttribute("type","text")
            input_apellidom.setAttribute("value",apellidomAdministrador)
            input_apellidom.setAttribute("class","input_paginador")
            input_apellidom.setAttribute("disabled","true")
            columna_apellidom.appendChild(input_apellidom)
            //columna_apellidom.innerHTML = apellidomAdministrador
            fila.appendChild(columna_apellidom)

            let columna_domicilio = document.createElement("td")
            columna_domicilio.setAttribute("class","texto")
            let input_domicilio = document.createElement("input")
            input_domicilio.setAttribute("type","text")
            input_domicilio.setAttribute("value",domicilioAdministrador)
            input_domicilio.setAttribute("class","input_paginador")
            input_domicilio.setAttribute("disabled","true")
            columna_domicilio.appendChild(input_domicilio)
            //columna_domicilio.innerHTML = domicilioAdministrador
            fila.appendChild(columna_domicilio)

            let columna_numeroext = document.createElement("td")
            columna_numeroext.setAttribute("class","texto")
            let input_numeroext = document.createElement("input")
            input_numeroext.setAttribute("type","text")
            input_numeroext.setAttribute("value",numeroextAdministrador)
            input_numeroext.setAttribute("class","input_paginador")
            input_numeroext.setAttribute("disabled","true")
            columna_numeroext.appendChild(input_numeroext)
            //columna_numeroext.innerHTML = numeroextAdministrador
            fila.appendChild(columna_numeroext)



            let columna_colonia = document.createElement("td")
            columna_colonia.setAttribute("class","texto")
            let input_colonia = document.createElement("input")
            input_colonia.setAttribute("type","text")
            input_colonia.setAttribute("value",coloniaAdministrador)
            input_colonia.setAttribute("class","input_paginador")
            input_colonia.setAttribute("disabled","true")
            columna_colonia.appendChild(input_colonia)
            //columna_colonia.innerHTML = coloniaAdministrador
            fila.appendChild(columna_colonia)

            
            let columna_telefono = document.createElement("td")
            columna_telefono.setAttribute("class","texto")
            let input_telefono = document.createElement("input")
            input_telefono.setAttribute("type","text")
            input_telefono.setAttribute("value",telefonoAdministrador)
            input_telefono.setAttribute("class","input_paginador")
            input_telefono.setAttribute("disabled","true")
            columna_telefono.appendChild(input_telefono)
            //columna_telefono.innerHTML = telefonoAdministrador
            fila.appendChild(columna_telefono)
            
            let columna_puesto = document.createElement("td")
            columna_puesto.setAttribute("class","texto")
            let input_puesto = document.createElement("input")
            input_puesto.setAttribute("type","text")
            input_puesto.setAttribute("value",puestoAdministrador)
            input_puesto.setAttribute("class","input_paginador")
            input_puesto.setAttribute("disabled","true")
            columna_puesto.appendChild(input_puesto)
            //columna_puesto.innerHTML = puestoAdministrador
            fila.appendChild(columna_puesto)

            let columna_correo = document.createElement("td")
            columna_correo.setAttribute("class","texto")
            let input_correo = document.createElement("input")
            input_correo.setAttribute("type","text")
            input_correo.setAttribute("value",correoAdministrador)
            input_correo.setAttribute("class","input_paginador")
            input_correo.setAttribute("disabled","true")
            columna_correo.appendChild(input_correo)
            //columna_correo.innerHTML = correoAdministrador
            fila.appendChild(columna_correo)

            let columna_activo = document.createElement("td")
            columna_activo.setAttribute("class","texto")
            columna_activo.innerHTML = activo
            fila.appendChild(columna_activo)


            let columna_tipo_usuario = document.createElement("td")
            columna_tipo_usuario.setAttribute("class","texto")
            columna_tipo_usuario.innerHTML = tipo_usuario
            fila.appendChild(columna_tipo_usuario)


            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/baja.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","desactivar_adn(event);")
            columna_editar.appendChild(imagen_editar)

            let imagen_editar2 = document.createElement("img")
            imagen_editar2.setAttribute("src","../recursos/img/editar.png")
            imagen_editar2.setAttribute("class","img_accion")
            imagen_editar2.setAttribute("onclick","editar_adn(event);")
            columna_editar.appendChild(imagen_editar2)

            // columna_editar.setAttribute("class","boton_tabla")
            // // columna_editar.setAttribute("style","cursor:pointer;")
            // columna_editar.innerHTML = "activar"

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
function paginador_anterior_admin(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
    let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
    let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
    let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
    let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
    let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
    let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
    let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
    let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
    let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreAdministrador)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreAdministrador
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopAdministrador)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopAdministrador
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomAdministrador)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomAdministrador
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioAdministrador)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioAdministrador
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextAdministrador)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextAdministrador
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaAdministrador)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaAdministrador
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoAdministrador)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoAdministrador
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoAdministrador)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoAdministrador
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoAdministrador)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoAdministrador
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/baja.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","desactivar_adn(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/editar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","editar_adn(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
function paginador_primera_admin(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
    let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
    let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
    let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
    let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
    let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
    let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
    let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
    let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreAdministrador)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreAdministrador
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopAdministrador)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopAdministrador
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomAdministrador)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomAdministrador
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioAdministrador)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioAdministrador
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextAdministrador)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextAdministrador
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaAdministrador)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaAdministrador
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoAdministrador)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoAdministrador
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoAdministrador)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoAdministrador
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoAdministrador)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoAdministrador
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/baja.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","desactivar_adn(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/editar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","editar_adn(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
function paginador_ultima_admin(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
    let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
    let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
    let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
    let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
    let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
    let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
    let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
    let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
    let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreAdministrador)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreAdministrador
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopAdministrador)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopAdministrador
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomAdministrador)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomAdministrador
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioAdministrador)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioAdministrador
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextAdministrador)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextAdministrador
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaAdministrador)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaAdministrador
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoAdministrador)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoAdministrador
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoAdministrador)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoAdministrador
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoAdministrador)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoAdministrador
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/baja.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","desactivar_adn(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/editar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","editar_adn(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
var datos_adminNo
var boton_primeroAdminNo = document.getElementById("boton_paginador_primeroAdminNo")
var boton_anteriorAdminNo = document.getElementById("boton_paginador_anteriorAdminNo")
var boton_siguienteAdminNo = document.getElementById("boton_paginador_siguienteAdminNo")
var boton_ultimoAdminNo = document.getElementById("boton_paginador_ultimoAdminNo")
var cuerpoAdminNo = document.getElementById("tabla_administradores_noactivo")
var indicador_paginaAdminNo= document.getElementById("boton_paginador_cantidadAdminNo")
var cantidad_vistasAdminNo
var pagina_actual_Admin_Noactivos 

function tomar_datos_administradores_noactivos()
{
    let contenedor = document.getElementById("tabla_administradores_noactivo")
    cantidad_vistasAdminNo = document.getElementById("cantidad_administradores_noactivos").value
    pagina_actual_Admin_Noactivos = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_adn_noactivos.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_adminNo = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_adminNo(datos_adminNo,pagina_actual_Admin_Noactivos,cantidad_vistasAdminNo,boton_anteriorAdminNo,boton_siguienteAdminNo,boton_primeroAdminNo,boton_ultimoAdminNo,cuerpoAdminNo,indicador_paginaAdminNo)
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

boton_siguienteAdminNo.addEventListener("click", function(){
    pagina_actual_Admin_Noactivos++
    paginador_siguiente_adminNo(datos_adminNo,pagina_actual_Admin_Noactivos,cantidad_vistasAdminNo,boton_anteriorAdminNo,boton_siguienteAdminNo,boton_primeroAdminNo,boton_ultimoAdminNo,cuerpoAdminNo,indicador_paginaAdminNo)
})

boton_anteriorAdminNo.addEventListener("click", function(){
    pagina_actual_Admin_Noactivos--
    paginador_anterior_adminNo(datos_adminNo,pagina_actual_Admin_Noactivos,cantidad_vistasAdminNo,boton_anteriorAdminNo,boton_siguienteAdminNo,boton_primeroAdminNo,boton_ultimoAdminNo,cuerpoAdminNo,indicador_paginaAdminNo)
})

boton_primeroAdminNo.addEventListener("click", function(){
    pagina_actual_Admin_Noactivos = 1 
    paginador_primera_adminNo(datos_adminNo,pagina_actual_Admin_Noactivos,cantidad_vistasAdminNo,boton_anteriorAdminNo,boton_siguienteAdminNo,boton_primeroAdminNo,boton_ultimoAdminNo,cuerpoAdminNo,indicador_paginaAdminNo)
})

boton_ultimoAdminNo.addEventListener("click", function(){

    var tamano = datos_adminNo.length;
    var numero_paginas=tamano/cantidad_vistasAdminNo;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_Admin_Noactivos = numero_paginas

    paginador_ultima_adminNo(datos_adminNo,pagina_actual_Admin_Noactivos,cantidad_vistasAdminNo,boton_anteriorAdminNo,boton_siguienteAdminNo,boton_primeroAdminNo,boton_ultimoAdminNo,cuerpoAdminNo,indicador_paginaAdminNo)
})

function paginador_adminNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
                        let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
                        let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
                        let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
                        let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
                        let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
                        let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
                        let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
                        let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
                        let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
                        let activo  = arreglo_rutas[inicio].activo
                        let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        let input_nombre = document.createElement("input")
                        input_nombre.setAttribute("type","text")
                        input_nombre.setAttribute("value",nombreAdministrador)
                        input_nombre.setAttribute("class","input_paginador")
                        input_nombre.setAttribute("disabled","true")
                        columna_nombre.appendChild(input_nombre)
                        //columna_nombre.innerHTML = nombreAdministrador
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")

                        let input_apellidop = document.createElement("input")
                        input_apellidop.setAttribute("type","text")
                        input_apellidop.setAttribute("value",apellidopAdministrador)
                        input_apellidop.setAttribute("class","input_paginador")
                        input_apellidop.setAttribute("disabled","true")
                        columna_apellidop.appendChild(input_apellidop)
                        //columna_apellidop.innerHTML = apellidopAdministrador
                        fila.appendChild(columna_apellidop)


                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        let input_apellidom = document.createElement("input")
                        input_apellidom.setAttribute("type","text")
                        input_apellidom.setAttribute("value",apellidomAdministrador)
                        input_apellidom.setAttribute("class","input_paginador")
                        input_apellidom.setAttribute("disabled","true")
                        columna_apellidom.appendChild(input_apellidom)
                        //columna_apellidom.innerHTML = apellidomAdministrador
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        let input_domicilio = document.createElement("input")
                        input_domicilio.setAttribute("type","text")
                        input_domicilio.setAttribute("value",domicilioAdministrador)
                        input_domicilio.setAttribute("class","input_paginador")
                        input_domicilio.setAttribute("disabled","true")
                        columna_domicilio.appendChild(input_domicilio)
                        //columna_domicilio.innerHTML = domicilioAdministrador
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        let input_numeroext = document.createElement("input")
                        input_numeroext.setAttribute("type","text")
                        input_numeroext.setAttribute("value",numeroextAdministrador)
                        input_numeroext.setAttribute("class","input_paginador")
                        input_numeroext.setAttribute("disabled","true")
                        columna_numeroext.appendChild(input_numeroext)
                        //columna_numeroext.innerHTML = numeroextAdministrador
                        fila.appendChild(columna_numeroext)



                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        let input_colonia = document.createElement("input")
                        input_colonia.setAttribute("type","text")
                        input_colonia.setAttribute("value",coloniaAdministrador)
                        input_colonia.setAttribute("class","input_paginador")
                        input_colonia.setAttribute("disabled","true")
                        columna_colonia.appendChild(input_colonia)
                        //columna_colonia.innerHTML = coloniaAdministrador
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        let input_telefono = document.createElement("input")
                        input_telefono.setAttribute("type","text")
                        input_telefono.setAttribute("value",telefonoAdministrador)
                        input_telefono.setAttribute("class","input_paginador")
                        input_telefono.setAttribute("disabled","true")
                        columna_telefono.appendChild(input_telefono)
                        //columna_telefono.innerHTML = telefonoAdministrador
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        let input_puesto = document.createElement("input")
                        input_puesto.setAttribute("type","text")
                        input_puesto.setAttribute("value",puestoAdministrador)
                        input_puesto.setAttribute("class","input_paginador")
                        input_puesto.setAttribute("disabled","true")
                        columna_puesto.appendChild(input_puesto)
                        //columna_puesto.innerHTML = puestoAdministrador
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        let input_correo = document.createElement("input")
                        input_correo.setAttribute("type","text")
                        input_correo.setAttribute("value",correoAdministrador)
                        input_correo.setAttribute("class","input_paginador")
                        input_correo.setAttribute("disabled","true")
                        columna_correo.appendChild(input_correo)
                        //columna_correo.innerHTML = correoAdministrador
                        fila.appendChild(columna_correo)

                        let columna_activo = document.createElement("td")
                        columna_activo.setAttribute("class","texto")
                        columna_activo.innerHTML = activo
                        fila.appendChild(columna_activo)


                        let columna_tipo_usuario = document.createElement("td")
                        columna_tipo_usuario.setAttribute("class","texto")
                        columna_tipo_usuario.innerHTML = tipo_usuario
                        fila.appendChild(columna_tipo_usuario)


                        let columna_editar = document.createElement("td")
                        let imagen_editar = document.createElement("img")
                        imagen_editar.setAttribute("src","../recursos/img/alta.png")
                        imagen_editar.setAttribute("class","img_accion")
                        imagen_editar.setAttribute("onclick","activar_adn(event);")
                        columna_editar.appendChild(imagen_editar)

                        let imagen_editar2 = document.createElement("img")
                        imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
                        imagen_editar2.setAttribute("class","img_accion")
                        imagen_editar2.setAttribute("onclick","eliminar_adn(event);")
                        columna_editar.appendChild(imagen_editar2)

                        // columna_editar.setAttribute("class","boton_tabla")
                        // // columna_editar.setAttribute("style","cursor:pointer;")
                        // columna_editar.innerHTML = "activar"

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
function paginador_siguiente_adminNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
            let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
            let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
            let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
            let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
            let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
            let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
            let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
            let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
            let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
            let activo  = arreglo_rutas[inicio].activo
            let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

            let columna_nombre = document.createElement("td")
            columna_nombre.setAttribute("class","texto")
            let input_nombre = document.createElement("input")
            input_nombre.setAttribute("type","text")
            input_nombre.setAttribute("value",nombreAdministrador)
            input_nombre.setAttribute("class","input_paginador")
            input_nombre.setAttribute("disabled","true")
            columna_nombre.appendChild(input_nombre)
            //columna_nombre.innerHTML = nombreAdministrador
            fila.appendChild(columna_nombre)

            let columna_apellidop = document.createElement("td")
            columna_apellidop.setAttribute("class","texto")

            let input_apellidop = document.createElement("input")
            input_apellidop.setAttribute("type","text")
            input_apellidop.setAttribute("value",apellidopAdministrador)
            input_apellidop.setAttribute("class","input_paginador")
            input_apellidop.setAttribute("disabled","true")
            columna_apellidop.appendChild(input_apellidop)
            //columna_apellidop.innerHTML = apellidopAdministrador
            fila.appendChild(columna_apellidop)


            let columna_apellidom = document.createElement("td")
            columna_apellidom.setAttribute("class","texto")
            let input_apellidom = document.createElement("input")
            input_apellidom.setAttribute("type","text")
            input_apellidom.setAttribute("value",apellidomAdministrador)
            input_apellidom.setAttribute("class","input_paginador")
            input_apellidom.setAttribute("disabled","true")
            columna_apellidom.appendChild(input_apellidom)
            //columna_apellidom.innerHTML = apellidomAdministrador
            fila.appendChild(columna_apellidom)

            let columna_domicilio = document.createElement("td")
            columna_domicilio.setAttribute("class","texto")
            let input_domicilio = document.createElement("input")
            input_domicilio.setAttribute("type","text")
            input_domicilio.setAttribute("value",domicilioAdministrador)
            input_domicilio.setAttribute("class","input_paginador")
            input_domicilio.setAttribute("disabled","true")
            columna_domicilio.appendChild(input_domicilio)
            //columna_domicilio.innerHTML = domicilioAdministrador
            fila.appendChild(columna_domicilio)

            let columna_numeroext = document.createElement("td")
            columna_numeroext.setAttribute("class","texto")
            let input_numeroext = document.createElement("input")
            input_numeroext.setAttribute("type","text")
            input_numeroext.setAttribute("value",numeroextAdministrador)
            input_numeroext.setAttribute("class","input_paginador")
            input_numeroext.setAttribute("disabled","true")
            columna_numeroext.appendChild(input_numeroext)
            //columna_numeroext.innerHTML = numeroextAdministrador
            fila.appendChild(columna_numeroext)



            let columna_colonia = document.createElement("td")
            columna_colonia.setAttribute("class","texto")
            let input_colonia = document.createElement("input")
            input_colonia.setAttribute("type","text")
            input_colonia.setAttribute("value",coloniaAdministrador)
            input_colonia.setAttribute("class","input_paginador")
            input_colonia.setAttribute("disabled","true")
            columna_colonia.appendChild(input_colonia)
            //columna_colonia.innerHTML = coloniaAdministrador
            fila.appendChild(columna_colonia)

            
            let columna_telefono = document.createElement("td")
            columna_telefono.setAttribute("class","texto")
            let input_telefono = document.createElement("input")
            input_telefono.setAttribute("type","text")
            input_telefono.setAttribute("value",telefonoAdministrador)
            input_telefono.setAttribute("class","input_paginador")
            input_telefono.setAttribute("disabled","true")
            columna_telefono.appendChild(input_telefono)
            //columna_telefono.innerHTML = telefonoAdministrador
            fila.appendChild(columna_telefono)
            
            let columna_puesto = document.createElement("td")
            columna_puesto.setAttribute("class","texto")
            let input_puesto = document.createElement("input")
            input_puesto.setAttribute("type","text")
            input_puesto.setAttribute("value",puestoAdministrador)
            input_puesto.setAttribute("class","input_paginador")
            input_puesto.setAttribute("disabled","true")
            columna_puesto.appendChild(input_puesto)
            //columna_puesto.innerHTML = puestoAdministrador
            fila.appendChild(columna_puesto)

            let columna_correo = document.createElement("td")
            columna_correo.setAttribute("class","texto")
            let input_correo = document.createElement("input")
            input_correo.setAttribute("type","text")
            input_correo.setAttribute("value",correoAdministrador)
            input_correo.setAttribute("class","input_paginador")
            input_correo.setAttribute("disabled","true")
            columna_correo.appendChild(input_correo)
            //columna_correo.innerHTML = correoAdministrador
            fila.appendChild(columna_correo)

            let columna_activo = document.createElement("td")
            columna_activo.setAttribute("class","texto")
            columna_activo.innerHTML = activo
            fila.appendChild(columna_activo)


            let columna_tipo_usuario = document.createElement("td")
            columna_tipo_usuario.setAttribute("class","texto")
            columna_tipo_usuario.innerHTML = tipo_usuario
            fila.appendChild(columna_tipo_usuario)


            let columna_editar = document.createElement("td")
            let imagen_editar = document.createElement("img")
            imagen_editar.setAttribute("src","../recursos/img/alta.png")
            imagen_editar.setAttribute("class","img_accion")
            imagen_editar.setAttribute("onclick","activar_adn(event);")
            columna_editar.appendChild(imagen_editar)

            let imagen_editar2 = document.createElement("img")
            imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
            imagen_editar2.setAttribute("class","img_accion")
            imagen_editar2.setAttribute("onclick","eliminar_adn(event);")
            columna_editar.appendChild(imagen_editar2)

            // columna_editar.setAttribute("class","boton_tabla")
            // // columna_editar.setAttribute("style","cursor:pointer;")
            // columna_editar.innerHTML = "activar"

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
function paginador_anterior_adminNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
    let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
    let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
    let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
    let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
    let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
    let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
    let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
    let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
    let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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
    
    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreAdministrador)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreAdministrador
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopAdministrador)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopAdministrador
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomAdministrador)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomAdministrador
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioAdministrador)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioAdministrador
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextAdministrador)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextAdministrador
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaAdministrador)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaAdministrador
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoAdministrador)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoAdministrador
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoAdministrador)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoAdministrador
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoAdministrador)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoAdministrador
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


        let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/alta.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","activar_adn(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","eliminar_adn(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
function paginador_primera_adminNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
    let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
    let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
    let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
    let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
    let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
    let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
    let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
    let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
    let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreAdministrador)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreAdministrador
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopAdministrador)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopAdministrador
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomAdministrador)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomAdministrador
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioAdministrador)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioAdministrador
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextAdministrador)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextAdministrador
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaAdministrador)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaAdministrador
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoAdministrador)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoAdministrador
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoAdministrador)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoAdministrador
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoAdministrador)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoAdministrador
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/alta.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","activar_adn(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","eliminar_adn(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
function paginador_ultima_adminNo(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
    let nombreAdministrador = arreglo_rutas[inicio].nombreAdministrador
    let apellidopAdministrador = arreglo_rutas[inicio].apellidopAdministrador
    let apellidomAdministrador = arreglo_rutas[inicio].apellidomAdministrador
    let domicilioAdministrador = arreglo_rutas[inicio].domicilioAdministrador
    let numeroextAdministrador = arreglo_rutas[inicio].numeroextAdministrador
    let coloniaAdministrador = arreglo_rutas[inicio].coloniaAdministrador
    let telefonoAdministrador = arreglo_rutas[inicio].telefonoAdministrador
    let puestoAdministrador = arreglo_rutas[inicio].puestoAdministrador
    let correoAdministrador = arreglo_rutas[inicio].correoAdministrador
    let activo  = arreglo_rutas[inicio].activo
    let tipo_usuario = arreglo_rutas[inicio].tipo_usuario

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

    let columna_nombre = document.createElement("td")
    columna_nombre.setAttribute("class","texto")
    let input_nombre = document.createElement("input")
    input_nombre.setAttribute("type","text")
    input_nombre.setAttribute("value",nombreAdministrador)
    input_nombre.setAttribute("class","input_paginador")
    input_nombre.setAttribute("disabled","true")
    columna_nombre.appendChild(input_nombre)
    //columna_nombre.innerHTML = nombreAdministrador
    fila.appendChild(columna_nombre)

    let columna_apellidop = document.createElement("td")
    columna_apellidop.setAttribute("class","texto")

    let input_apellidop = document.createElement("input")
    input_apellidop.setAttribute("type","text")
    input_apellidop.setAttribute("value",apellidopAdministrador)
    input_apellidop.setAttribute("class","input_paginador")
    input_apellidop.setAttribute("disabled","true")
    columna_apellidop.appendChild(input_apellidop)
    //columna_apellidop.innerHTML = apellidopAdministrador
    fila.appendChild(columna_apellidop)


    let columna_apellidom = document.createElement("td")
    columna_apellidom.setAttribute("class","texto")
    let input_apellidom = document.createElement("input")
    input_apellidom.setAttribute("type","text")
    input_apellidom.setAttribute("value",apellidomAdministrador)
    input_apellidom.setAttribute("class","input_paginador")
    input_apellidom.setAttribute("disabled","true")
    columna_apellidom.appendChild(input_apellidom)
    //columna_apellidom.innerHTML = apellidomAdministrador
    fila.appendChild(columna_apellidom)

    let columna_domicilio = document.createElement("td")
    columna_domicilio.setAttribute("class","texto")
    let input_domicilio = document.createElement("input")
    input_domicilio.setAttribute("type","text")
    input_domicilio.setAttribute("value",domicilioAdministrador)
    input_domicilio.setAttribute("class","input_paginador")
    input_domicilio.setAttribute("disabled","true")
    columna_domicilio.appendChild(input_domicilio)
    //columna_domicilio.innerHTML = domicilioAdministrador
    fila.appendChild(columna_domicilio)

    let columna_numeroext = document.createElement("td")
    columna_numeroext.setAttribute("class","texto")
    let input_numeroext = document.createElement("input")
    input_numeroext.setAttribute("type","text")
    input_numeroext.setAttribute("value",numeroextAdministrador)
    input_numeroext.setAttribute("class","input_paginador")
    input_numeroext.setAttribute("disabled","true")
    columna_numeroext.appendChild(input_numeroext)
    //columna_numeroext.innerHTML = numeroextAdministrador
    fila.appendChild(columna_numeroext)



    let columna_colonia = document.createElement("td")
    columna_colonia.setAttribute("class","texto")
    let input_colonia = document.createElement("input")
    input_colonia.setAttribute("type","text")
    input_colonia.setAttribute("value",coloniaAdministrador)
    input_colonia.setAttribute("class","input_paginador")
    input_colonia.setAttribute("disabled","true")
    columna_colonia.appendChild(input_colonia)
    //columna_colonia.innerHTML = coloniaAdministrador
    fila.appendChild(columna_colonia)

    
    let columna_telefono = document.createElement("td")
    columna_telefono.setAttribute("class","texto")
    let input_telefono = document.createElement("input")
    input_telefono.setAttribute("type","text")
    input_telefono.setAttribute("value",telefonoAdministrador)
    input_telefono.setAttribute("class","input_paginador")
    input_telefono.setAttribute("disabled","true")
    columna_telefono.appendChild(input_telefono)
    //columna_telefono.innerHTML = telefonoAdministrador
    fila.appendChild(columna_telefono)
    
    let columna_puesto = document.createElement("td")
    columna_puesto.setAttribute("class","texto")
    let input_puesto = document.createElement("input")
    input_puesto.setAttribute("type","text")
    input_puesto.setAttribute("value",puestoAdministrador)
    input_puesto.setAttribute("class","input_paginador")
    input_puesto.setAttribute("disabled","true")
    columna_puesto.appendChild(input_puesto)
    //columna_puesto.innerHTML = puestoAdministrador
    fila.appendChild(columna_puesto)

    let columna_correo = document.createElement("td")
    columna_correo.setAttribute("class","texto")
    let input_correo = document.createElement("input")
    input_correo.setAttribute("type","text")
    input_correo.setAttribute("value",correoAdministrador)
    input_correo.setAttribute("class","input_paginador")
    input_correo.setAttribute("disabled","true")
    columna_correo.appendChild(input_correo)
    //columna_correo.innerHTML = correoAdministrador
    fila.appendChild(columna_correo)

    let columna_activo = document.createElement("td")
    columna_activo.setAttribute("class","texto")
    columna_activo.innerHTML = activo
    fila.appendChild(columna_activo)


    let columna_tipo_usuario = document.createElement("td")
    columna_tipo_usuario.setAttribute("class","texto")
    columna_tipo_usuario.innerHTML = tipo_usuario
    fila.appendChild(columna_tipo_usuario)


    let columna_editar = document.createElement("td")
    let imagen_editar = document.createElement("img")
    imagen_editar.setAttribute("src","../recursos/img/alta.png")
    imagen_editar.setAttribute("class","img_accion")
    imagen_editar.setAttribute("onclick","activar_adn(event);")
    columna_editar.appendChild(imagen_editar)

    let imagen_editar2 = document.createElement("img")
    imagen_editar2.setAttribute("src","../recursos/img/eliminar.png")
    imagen_editar2.setAttribute("class","img_accion")
    imagen_editar2.setAttribute("onclick","eliminar_adn(event);")
    columna_editar.appendChild(imagen_editar2)

    // columna_editar.setAttribute("class","boton_tabla")
    // // columna_editar.setAttribute("style","cursor:pointer;")
    // columna_editar.innerHTML = "activar"

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
var datos_tickets
var boton_primero_tickets_pendientes = document.getElementById("boton_paginador_primero_tickets_pendientes")
var boton_anterior_tickets_pendientes = document.getElementById("boton_paginador_anterior_tickets_pendientes")
var boton_siguiente_tickets_pendientes = document.getElementById("boton_paginador_siguiente_tickets_pendientes")
var boton_ultimo_tickets_pendientes = document.getElementById("boton_paginador_ultimo_tickets_pendientes")
var cuerpo_tickets_pendientes = document.getElementById("tabla_tickets_pendientes")
var indicador_pagina_tickets_pendientes= document.getElementById("boton_paginador_cantidad_tickets_pendientes")
var cantidad_vistas_tickets_pendientes
var pagina_actual_tickets_pendientes 

function tomar_datos_tickets_pendientes()
{
    let contenedor = document.getElementById("tabla_tickets_pendientes")
    cantidad_vistas_tickets_pendientes = document.getElementById("cantidad_tickets_pendientes").value
    pagina_actual_tickets_pendientes = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_tickets_pendientes.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_tickets = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_tickets_pendientes(datos_tickets,pagina_actual_tickets_pendientes,cantidad_vistas_tickets_pendientes,boton_anterior_tickets_pendientes,boton_siguiente_tickets_pendientes,boton_primero_tickets_pendientes,boton_ultimo_tickets_pendientes,cuerpo_tickets_pendientes,indicador_pagina_tickets_pendientes)
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
boton_siguiente_tickets_pendientes.addEventListener("click", function(){
    pagina_actual_tickets_pendientes++
    paginador_siguiente_tickets_pendientes(datos_tickets,pagina_actual_tickets_pendientes,cantidad_vistas_tickets_pendientes,boton_anterior_tickets_pendientes,boton_siguiente_tickets_pendientes,boton_primero_tickets_pendientes,boton_ultimo_tickets_pendientes,cuerpo_tickets_pendientes,indicador_pagina_tickets_pendientes)
})

boton_anterior_tickets_pendientes.addEventListener("click", function(){
    pagina_actual_tickets_pendientes--
    paginador_anterior_tickets_pendientes(datos_tickets,pagina_actual_tickets_pendientes,cantidad_vistas_tickets_pendientes,boton_anterior_tickets_pendientes,boton_siguiente_tickets_pendientes,boton_primero_tickets_pendientes,boton_ultimo_tickets_pendientes,cuerpo_tickets_pendientes,indicador_pagina_tickets_pendientes)
})

boton_primero_tickets_pendientes.addEventListener("click", function(){
    pagina_actual_tickets_pendientes = 1 
    paginador_primera_tickets_pendientes(datos_tickets,pagina_actual_tickets_pendientes,cantidad_vistas_tickets_pendientes,boton_anterior_tickets_pendientes,boton_siguiente_tickets_pendientes,boton_primero_tickets_pendientes,boton_ultimo_tickets_pendientes,cuerpo_tickets_pendientes,indicador_pagina_tickets_pendientes)
})

boton_ultimo_tickets_pendientes.addEventListener("click", function(){

    var tamano = datos_tickets.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_pendientes;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_pendientes = numero_paginas

    paginador_ultima_tickets_pendientes(datos_tickets,pagina_actual_tickets_pendientes,cantidad_vistas_tickets_pendientes,boton_anterior_tickets_pendientes,boton_siguiente_tickets_pendientes,boton_primero_tickets_pendientes,boton_ultimo_tickets_pendientes,cuerpo_tickets_pendientes,indicador_pagina_tickets_pendientes)
})

function paginador_tickets_pendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_siguiente_tickets_pendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
function paginador_anterior_tickets_pendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
function paginador_primera_tickets_pendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_ultima_tickets_pendientes(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
var datos_tickets_dashboard
var boton_primero_tickets_pendientes_dashboard = document.getElementById("boton_paginador_primero_tickets_pendientes_dashboard")
var boton_anterior_tickets_pendientes_dashboard = document.getElementById("boton_paginador_anterior_tickets_pendientes_dashboard")
var boton_siguiente_tickets_pendientes_dashboard = document.getElementById("boton_paginador_siguiente_tickets_pendientes_dashboard")
var boton_ultimo_tickets_pendientes_dashboard = document.getElementById("boton_paginador_ultimo_tickets_pendientes_dashboard")
var cuerpo_tickets_pendientes_dashboard = document.getElementById("tabla_tickets_pendientes_dashboard")
var indicador_pagina_tickets_pendientes_dashboard= document.getElementById("boton_paginador_cantidad_tickets_pendientes_dashboard")
var cantidad_vistas_tickets_pendientes_dashboard
var pagina_actual_tickets_pendientes_dashboard 

function tomar_datos_tickets_pendientes_dashboard()
{
    let contenedor = document.getElementById("tabla_tickets_pendientes_dashboard")
    cantidad_vistas_tickets_pendientes_dashboard = document.getElementById("cantidad_tickets_pendientes_dashboard").value
    pagina_actual_tickets_pendientes_dashboard = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_datos_tickets_pendientes_dashboard.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_tickets_dashboard = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_tickets_pendientes_dashboard(datos_tickets_dashboard,pagina_actual_tickets_pendientes_dashboard,cantidad_vistas_tickets_pendientes_dashboard,boton_anterior_tickets_pendientes_dashboard,boton_siguiente_tickets_pendientes_dashboard,boton_primero_tickets_pendientes_dashboard,boton_ultimo_tickets_pendientes_dashboard,cuerpo_tickets_pendientes_dashboard,indicador_pagina_tickets_pendientes_dashboard)
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
boton_siguiente_tickets_pendientes_dashboard.addEventListener("click", function(){
    pagina_actual_tickets_pendientes_dashboard++
    paginador_siguiente_tickets_pendientes_dashboard(datos_tickets_dashboard,pagina_actual_tickets_pendientes_dashboard,cantidad_vistas_tickets_pendientes_dashboard,boton_anterior_tickets_pendientes_dashboard,boton_siguiente_tickets_pendientes_dashboard,boton_primero_tickets_pendientes_dashboard,boton_ultimo_tickets_pendientes_dashboard,cuerpo_tickets_pendientes_dashboard,indicador_pagina_tickets_pendientes_dashboard)
})

boton_anterior_tickets_pendientes_dashboard.addEventListener("click", function(){
    pagina_actual_tickets_pendientes_dashboard--
    paginador_anterior_tickets_pendientes_dashboard(datos_tickets_dashboard,pagina_actual_tickets_pendientes_dashboard,cantidad_vistas_tickets_pendientes_dashboard,boton_anterior_tickets_pendientes_dashboard,boton_siguiente_tickets_pendientes_dashboard,boton_primero_tickets_pendientes_dashboard,boton_ultimo_tickets_pendientes_dashboard,cuerpo_tickets_pendientes_dashboard,indicador_pagina_tickets_pendientes_dashboard)
})

boton_primero_tickets_pendientes_dashboard.addEventListener("click", function(){
    pagina_actual_tickets_pendientes_dashboard = 1 
    paginador_primera_tickets_pendientes_dashboard(datos_tickets_dashboard,pagina_actual_tickets_pendientes_dashboard,cantidad_vistas_tickets_pendientes_dashboard,boton_anterior_tickets_pendientes_dashboard,boton_siguiente_tickets_pendientes_dashboard,boton_primero_tickets_pendientes_dashboard,boton_ultimo_tickets_pendientes_dashboard,cuerpo_tickets_pendientes_dashboard,indicador_pagina_tickets_pendientes_dashboard)
})

boton_ultimo_tickets_pendientes_dashboard.addEventListener("click", function(){

    var tamano = datos_tickets_dashboard.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_pendientes_dashboard;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_pendientes_dashboard = numero_paginas

    paginador_ultima_tickets_pendientes_dashboard(datos_tickets_dashboard,pagina_actual_tickets_pendientes_dashboard,cantidad_vistas_tickets_pendientes_dashboard,boton_anterior_tickets_pendientes_dashboard,boton_siguiente_tickets_pendientes_dashboard,boton_primero_tickets_pendientes_dashboard,boton_ultimo_tickets_pendientes_dashboard,cuerpo_tickets_pendientes_dashboard,indicador_pagina_tickets_pendientes_dashboard)
})

function paginador_tickets_pendientes_dashboard(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_siguiente_tickets_pendientes_dashboard(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
function paginador_anterior_tickets_pendientes_dashboard(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
function paginador_primera_tickets_pendientes_dashboard(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_ultima_tickets_pendientes_dashboard(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
var datos_tickets_NoResuelto
var boton_primero_tickets_NoResuelto = document.getElementById("boton_paginador_primero_tickets_NoResuelto")
var boton_anterior_tickets_NoResuelto = document.getElementById("boton_paginador_anterior_tickets_NoResuelto")
var boton_siguiente_tickets_NoResuelto = document.getElementById("boton_paginador_siguiente_tickets_NoResuelto")
var boton_ultimo_tickets_NoResuelto = document.getElementById("boton_paginador_ultimo_tickets_NoResuelto")
var cuerpo_tickets_NoResuelto = document.getElementById("tabla_tickets_NoResuelto")
var indicador_pagina_tickets_NoResuelto= document.getElementById("boton_paginador_cantidad_tickets_NoResuelto")
var cantidad_vistas_tickets_NoResuelto
var pagina_actual_tickets_NoResuelto 


function tomar_datos_tickets_NoResuelto()
{
    let contenedor = document.getElementById("tabla_tickets_NoResuelto")
    cantidad_vistas_tickets_NoResuelto = document.getElementById("cantidad_tickets_NoResuelto").value
    pagina_actual_tickets_NoResuelto = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_tickets_NoResuelto.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_tickets_NoResuelto = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_tickets_NoResuelto(datos_tickets_NoResuelto,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
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
boton_siguiente_tickets_NoResuelto.addEventListener("click", function(){
    pagina_actual_tickets_NoResuelto++
    paginador_siguiente_tickets_NoResuelto(datos_tickets_NoResuelto,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
})

boton_anterior_tickets_NoResuelto.addEventListener("click", function(){
    pagina_actual_tickets_NoResuelto--
    paginador_anterior_tickets_NoResuelto(datos_tickets_NoResuelto,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
})

boton_primero_tickets_NoResuelto.addEventListener("click", function(){
    pagina_actual_tickets_NoResuelto = 1 
    paginador_primera_tickets_NoResuelto(datos_tickets_NoResuelto,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
})

boton_ultimo_tickets_NoResuelto.addEventListener("click", function(){

    var tamano = datos_tickets_NoResuelto.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_NoResuelto;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_NoResuelto = numero_paginas

    paginador_ultima_tickets_NoResuelto(datos_tickets_NoResuelto,pagina_actual_tickets_NoResuelto,cantidad_vistas_tickets_NoResuelto,boton_anterior_tickets_NoResuelto,boton_siguiente_tickets_NoResuelto,boton_primero_tickets_NoResuelto,boton_ultimo_tickets_NoResuelto,cuerpo_tickets_NoResuelto,indicador_pagina_tickets_NoResuelto)
})

function paginador_tickets_NoResuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_siguiente_tickets_NoResuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
function paginador_anterior_tickets_NoResuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
function paginador_primera_tickets_NoResuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_ultima_tickets_NoResuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
var datos_tickets_Resuelto
var boton_primero_tickets_Resuelto = document.getElementById("boton_paginador_primero_tickets_Resuelto")
var boton_anterior_tickets_Resuelto = document.getElementById("boton_paginador_anterior_tickets_Resuelto")
var boton_siguiente_tickets_Resuelto = document.getElementById("boton_paginador_siguiente_tickets_Resuelto")
var boton_ultimo_tickets_Resuelto = document.getElementById("boton_paginador_ultimo_tickets_Resuelto")
var cuerpo_tickets_Resuelto = document.getElementById("tabla_tickets_Resuelto")
var indicador_pagina_tickets_Resuelto= document.getElementById("boton_paginador_cantidad_tickets_Resuelto")
var cantidad_vistas_tickets_Resuelto
var pagina_actual_tickets_Resuelto 


function tomar_datos_tickets_Resuelto()
{
    let contenedor = document.getElementById("tabla_tickets_Resuelto")
    cantidad_vistas_tickets_Resuelto = document.getElementById("cantidad_tickets_Resuelto").value
    pagina_actual_tickets_Resuelto = 1
    // alert(cantidad_vistas)   

    contenedor.innerHTML = ""
    let ajax = new XMLHttpRequest()
       ajax.open("POST","../controlador/tomar_tickets_Resuelto.php")
       ajax.send()
       ajax.onreadystatechange =function () 
       {
            if (ajax.readyState == 4) 
            {
                if (ajax.status == 200) 
                {
                    // console.log("200 Respuesta Exitosa");
                    //console.log(ajax.responseText)
                    datos_tickets_Resuelto = JSON.parse(ajax.responseText)
                    // console.log(datos)
                    paginador_tickets_Resuelto(datos_tickets_Resuelto,pagina_actual_tickets_Resuelto,cantidad_vistas_tickets_Resuelto,boton_anterior_tickets_Resuelto,boton_siguiente_tickets_Resuelto,boton_primero_tickets_Resuelto,boton_ultimo_tickets_Resuelto,cuerpo_tickets_Resuelto,indicador_pagina_tickets_Resuelto)
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
boton_siguiente_tickets_Resuelto.addEventListener("click", function(){
    pagina_actual_tickets_Resuelto++
    paginador_siguiente_tickets_Resuelto(datos_tickets_Resuelto,pagina_actual_tickets_Resuelto,cantidad_vistas_tickets_Resuelto,boton_anterior_tickets_Resuelto,boton_siguiente_tickets_Resuelto,boton_primero_tickets_Resuelto,boton_ultimo_tickets_Resuelto,cuerpo_tickets_Resuelto,indicador_pagina_tickets_Resuelto)
})

boton_anterior_tickets_Resuelto.addEventListener("click", function(){
    pagina_actual_tickets_Resuelto--
    paginador_anterior_tickets_Resuelto(datos_tickets_Resuelto,pagina_actual_tickets_Resuelto,cantidad_vistas_tickets_Resuelto,boton_anterior_tickets_Resuelto,boton_siguiente_tickets_Resuelto,boton_primero_tickets_Resuelto,boton_ultimo_tickets_Resuelto,cuerpo_tickets_Resuelto,indicador_pagina_tickets_Resuelto)
})

boton_primero_tickets_Resuelto.addEventListener("click", function(){
    pagina_actual_tickets_Resuelto = 1 
    paginador_primera_tickets_Resuelto(datos_tickets_Resuelto,pagina_actual_tickets_Resuelto,cantidad_vistas_tickets_Resuelto,boton_anterior_tickets_Resuelto,boton_siguiente_tickets_Resuelto,boton_primero_tickets_Resuelto,boton_ultimo_tickets_Resuelto,cuerpo_tickets_Resuelto,indicador_pagina_tickets_Resuelto)
})

boton_ultimo_tickets_Resuelto.addEventListener("click", function(){

    var tamano = datos_tickets_Resuelto.length;
    var numero_paginas=tamano/cantidad_vistas_tickets_Resuelto;
    numero_paginas=Math.ceil(numero_paginas);
    pagina_actual_tickets_Resuelto = numero_paginas

    paginador_ultima_tickets_Resuelto(datos_tickets_Resuelto,pagina_actual_tickets_Resuelto,cantidad_vistas_tickets_Resuelto,boton_anterior_tickets_Resuelto,boton_siguiente_tickets_Resuelto,boton_primero_tickets_Resuelto,boton_ultimo_tickets_Resuelto,cuerpo_tickets_Resuelto,indicador_pagina_tickets_Resuelto)
})

function paginador_tickets_Resuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_siguiente_tickets_Resuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
function paginador_anterior_tickets_Resuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador)
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
function paginador_primera_tickets_Resuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

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
function paginador_ultima_tickets_Resuelto(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
