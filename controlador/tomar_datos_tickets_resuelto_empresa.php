<?php
include_once("../modelo/acciones.php");

$sesion = $_SESSION['idSesion'];
$idUsuario = $_SESSION['idUsuario'];
$modelo = new Acciones();
$resultado = $modelo->tomarTicketsResueltoEmpresa($idUsuario,$sesion);
echo $resultado;

?>
