<?php
include_once("modelo/acciones.php");
// echo $_GET['token'];
if(isset($_GET['token'])){
    $token = $_GET['token'];
    $datos = explode('---', $token);
    $tipo_empleado = $datos[1];
    $codigo = $datos[0];
    $correo = $datos[2];
    $_SESSION['correoUsuario'] = $correo;
    $_SESSION['token'] = $codigo;
    $_SESSION['tipoUsuario'] = $tipo_empleado;
    $modelo = new Acciones();
    $comprobacion =$modelo->comprobar_codigo($codigo,$tipo_empleado);
    if($comprobacion==$codigo)
    {
        // echo "El codigo validado";
        include_once ("reset_password.php");
    }
    else
    {
        echo "El codigo es incorrecto";
    }   
}
else
{
    echo "no disponible";
}
?>