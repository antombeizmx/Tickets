<?php
require_once('../modelo/acciones.php');

$id = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$tipo_usuario = $_SESSION['tipoUsuario'];

$accion = new Acciones();
$respuesta= $accion->cerrar_sesion($id,$idSesion,$tipo_usuario);
echo $respuesta;

?>