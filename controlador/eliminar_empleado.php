<?php
include_once("../modelo/acciones.php");
$idAdmin = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$idUsuario = $_POST['id_empleado'];

$modelo = new Acciones();
$peticion = $modelo->eliminar_usuario($idAdmin,$idSesion,$idUsuario);
echo $peticion;
?>