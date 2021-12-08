<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
    <link rel="stylesheet" href="recursos/css/estilos.css">
    <link rel="stylesheet" href="recursos/css/inicio_sesion.css">
    <link rel="shortcut icon" href="recursos/img/logo.ico" type="image/x-icon">
</head>
<body>
    <div id="contenedor_inicio_sesion">

        <div id="opciones_inicio_sesion">
            <div id="c_boton_login" class="opciones_login" onclick="mostrarSeccionLogin(event);">
                <img id="imagen_login" src="recursos/img/ingreso.png" class="img_login" alt="">
                <p id="parrafo_login" class="parrafo_contador">INICIAR SESION</p>
            </div>
            <div id="c_boton_inicioSesion_registrar" class="opciones_login" onclick="mostrarSeccionLogin(event);">
                <img id="imagen_inicioSesion_registrar" src="recursos/img/Peticion.png" class="img_login" alt="">
                <p id="parrafo_inicioSesion_registrar" class="parrafo_contador">REGISTRAR PETICION EMPRESAS</p>
            </div>
        </div>

        <div class="seccion_login" id="contenedor_formulario_login" >
            <img src="recursos/img/logo.png" id="logo_inicio_sesion" alt="">
            <h1 class="titulo">
                INICIAR SESION
            </h1>
            <input id="input_correo" type="email" class="input_text_login" placeholder="Ingrese el correo electronico..." value="">
            <input id="input_contra" type="password" class="input_text_login"  placeholder="Ingrese la contraseña...">
            <p id="c_boton_recuperar" class="titulo_recuperar" onclick="mostrarSeccionLogin(event);" >¿Olvidaste tu contraseña?</p>
            <button class="boton_login" id="boton_inicio" onclick="inicio_sesion();">INGRESAR</button>
        </div>

        <div class="seccion_login" id="contenedor_formulario_registrar">
        <h1 class="titulo">Registro de peticion</h1>
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
                    <input id="input_contrasenaEmpresa" type="password" class="input_text_empresa"  placeholder="Contraseña ">
                </div>
            </div>
                <button class="boton_login" id="boton_registro_iniciosesion" onclick="agregar_peticion_empresa()">Enviar petición</button>
        </div>

        <div id="contenedor_recuperar_contrasena" class="seccion_login">
            <div class="opciones_recuperar">
                <h1 class="titulo">Recuperacion de contraseña</h1>
            </div>
            <div class="opciones_recuperar">
                <input type="text" class="input_text_login" id="input_correo_verificar" placeholder="Ingerese su correo electronico...">
            </div>
            <div class="opciones_recuperar">
                <button class="boton_login" onclick="enviar_correo();">Buscar correo</button>
            </div>

        </div>
    </div>
    <script src="recursos/js/funcionesInicio.js"></script>
</body>
</html>