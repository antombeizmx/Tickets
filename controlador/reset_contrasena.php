<?php
require_once('../modelo/acciones.php');
$nueva_contra = $_POST['contrasena_nueva'];

$correo = $_SESSION['correoUsuario'];
$codigo = $_SESSION['token'];
$tipo_usuario = $_SESSION['tipoUsuario'];

$accion = new Acciones();
$respuesta= $accion->reset_contrasena($correo,$codigo,$tipo_usuario,$nueva_contra);

echo $respuesta;

?>