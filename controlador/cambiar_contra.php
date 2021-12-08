<?php
require_once('../modelo/acciones.php');

$nueva_contra = $_POST['nueva_contrasena'];
$id = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$tipo_usuario = $_SESSION['tipoUsuario'];

$accion = new Acciones();
$respuesta= $accion->cambiar_contrasena($id,$idSesion,$nueva_contra,$tipo_usuario);

echo $respuesta;
?>