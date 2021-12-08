<?php
include_once("../modelo/acciones.php");

$sesion = $_SESSION['idSesion'];
$idUsuario = $_SESSION['idUsuario'];

$modelo = new Acciones();
$resultado = $modelo->tomarAdnNoActivos($idUsuario, $sesion);
echo $resultado;

?>