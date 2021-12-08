<?php
include_once("../modelo/acciones.php");
// session_start();
if(isset($_SESSION['idSesion']))
{
    $modelo = new Acciones();
    $verificacion = $modelo->checarSesion($_SESSION['idUsuario'],$_SESSION['idSesion']);
    if($verificacion==$_SESSION['idSesion'])
    {
        echo '';
    }
    else
    {
        // header("Location: ../index.php");
        echo "sin coincidencia";
    }

}
else{
    // header("Location: ../");
    echo "no disponible";
}
?>