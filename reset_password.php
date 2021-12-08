<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambiar contrasena</title>
    <link rel="stylesheet" href="recursos/css/inicio_sesion.css" type="text/css">
    <link rel="stylesheet" href="recursos/css/estilos.css" type="text/css">
    <link rel="shortcut icon" href="recursos/img/logo.ico" type="image/x-icon">

</head>
<body>
    <div id="contenedor_formulario_cambio_contrasena">
        <h1 class="titulo">Cambio de contraseña</h1>
        <div class="cambio_contrasena">
            <p class="p_reset">Ingrese la nueva contrasena</p>
            <input type="password" id="input_contrasena_nueva" class="input_cambio_contrasena" placeholder="Nueva contraseña">
        </div>
        <div class="cambio_contrasena">
            <p class="p_reset">Confirme la contraseña</p>
            <input type="password" id="input_confirmacion_contrasena" class="input_cambio_contrasena" placeholder="Confirme la nueva contraseña">
        </div>
        <div class="cambio_contrasena">
            <button class="boton_login" onclick="cambiar_contrasena();">Cambiar contraseña</button>
        </div>
    </div>
    <script>
        function limpiar_formulario_empleado()
        {
            let elementos = document.querySelectorAll(".input_cambio_contrasena")
            for(let i =0; i<elementos.length;i++)
            {
                elementos[i].value=""
            }
        }
        function cambiar_contrasena()
        {
            var contrasena_nueva = document.getElementById("input_contrasena_nueva").value.trim();
            var contrasena_nueva2 = document.getElementById("input_confirmacion_contrasena").value.trim();
            // alert(contrasena_nueva)
            if(contrasena_nueva.length ==0 || contrasena_nueva2.length ==0) 
            {
                dialogo("Los campos se encuentran vacio, favor de ingresar todos los datos...")
            }
            else
            {
                if(contrasena_nueva == contrasena_nueva2)
                {
                let peticion = new XMLHttpRequest();
                peticion.open('POST', 'controlador/reset_contrasena.php', true);
                peticion.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                peticion.onload = function()
                {
                    if(peticion.status == 200)
                    {
                        let respuesta = peticion.responseText;
                        console.log(respuesta);
                        if(respuesta == 'se cambio correctamente')
                        {
                            dialogo(respuesta);
                            window.location.href = '/';
                        }
                        else
                        {
                            dialogo(respuesta);
                        }
                    }
                    else
                    {
                        dialogo('Error ' + peticion.status);
                    }

                }
                peticion.send('contrasena_nueva=' + contrasena_nueva);
                }
                else
                {
                    dialogo("Las contraseñas no coinciden");
                    limpiar_formulario_empleado()

                }
            }
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

            let contenedor = document.getElementById("contenedor_formulario_cambio_contrasena")
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
    </script>
</body>
</html>