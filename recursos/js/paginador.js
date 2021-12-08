function paginador_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){

    var cuerpo = "";
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
    
    for (inicio; inicio < final; inicio++) 
    {
        if (arreglo_rutas[inicio]!=undefined) 
        {
            if(arreglo_rutas[inicio]=="NO HAY CÓDIGOS POSTALES")
            {
                cuerpo_paginador.innerHTML='<tr><td style="text-align: center;" colspan="3">NO HAY DATOS</td></tr>'
            }
            else
            {

                //crear columnas por cada json con arreglo_rutas[inicio]
                //console.log(info)
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

                        let cadena_id = "id_"+id
                        let fila = document.createElement("tr")
                        fila.setAttribute("id",id)

                        let columna_id = document.createElement("td")
                        columna_id.setAttribute("class","texto")
                        columna_id.innerHTML = id
                        fila.appendChild(columna_id)

                        let columna_nombre = document.createElement("td")
                        columna_nombre.setAttribute("class","texto")
                        columna_nombre.innerHTML = nombreEmpleado
                        fila.appendChild(columna_nombre)

                        let columna_apellidop = document.createElement("td")
                        columna_apellidop.setAttribute("class","texto")
                        columna_apellidop.innerHTML = apellidopEmpleado
                        fila.appendChild(columna_apellidop)

                        let columna_apellidom = document.createElement("td")
                        columna_apellidom.setAttribute("class","texto")
                        columna_apellidom.innerHTML = apellidomEmpleado
                        fila.appendChild(columna_apellidom)

                        let columna_domicilio = document.createElement("td")
                        columna_domicilio.setAttribute("class","texto")
                        columna_domicilio.innerHTML = domicilioEmpleado
                        fila.appendChild(columna_domicilio)

                        let columna_numeroext = document.createElement("td")
                        columna_numeroext.setAttribute("class","texto")
                        columna_numeroext.innerHTML = numeroextEmpleado
                        fila.appendChild(columna_numeroext)

                        let columna_colonia = document.createElement("td")
                        columna_colonia.setAttribute("class","texto")
                        columna_colonia.innerHTML = coloniaEmpleado
                        fila.appendChild(columna_colonia)

                        
                        let columna_telefono = document.createElement("td")
                        columna_telefono.setAttribute("class","texto")
                        columna_telefono.innerHTML = telefonoEmpleado
                        fila.appendChild(columna_telefono)
                        
                        let columna_puesto = document.createElement("td")
                        columna_puesto.setAttribute("class","texto")
                        columna_puesto.innerHTML = puestoEmpleado
                        fila.appendChild(columna_puesto)

                        let columna_correo = document.createElement("td")
                        columna_correo.setAttribute("class","texto")
                        columna_correo.innerHTML = correoEmpleado
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
                        columna_editar.setAttribute("class","boton_tabla")
                        columna_editar.setAttribute("onclick","desactivar_usuario(event);")
                        // columna_editar.setAttribute("style","cursor:pointer;")
                        columna_editar.innerHTML = "activar"
                        fila.appendChild(columna_editar)
                        cuerpo_paginador.appendChild(fila)
               
            }	
            //// console.log(arreglo_rutas[inicio]);
            var paso = true;
            if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
            if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }
    // cuerpo_paginador.innerHTML=cuerpo;
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}

function paginador_siguiente_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
    // pagina_actual++;
    var cuerpo = "";
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
            // arreglos

        var paso = true;
        if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
        if (numero_clase==2&&paso==true){numero_clase=1;}
        }
    }

    // cuerpo_paginador.innerHTML=cuerpo;
    pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
    
}

function paginador_anterior_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
// pagina_actual--;
var cuerpo = "";
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
// arreglos

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}

// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}


function paginador_primera_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
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
  
//    console.log(fila)
//    console.log(padre)
    
    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
cuerpo_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}

function paginador_ultima_empleado(arreglo_rutas,pagina_actual,cantidad_vistas,btn_atras,btn_adelante,btn_primera,btn_ultima,cuerpo_paginador,pagina_paginador){
var cuerpo = "";
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

    var paso = true;
    if (numero_clase==1&&paso==true){numero_clase=2; paso =false;}
    if (numero_clase==2&&paso==true){numero_clase=1;}
}
}
// cuerpo_elemento_paginador.innerHTML=cuerpo;
pagina_paginador.innerHTML= pagina_actual+" de "+numero_paginas;
}