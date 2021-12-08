<?php
include_once("../modelo/acciones.php");
$sesion = $_SESSION['idSesion'];
$idUsuario = $_SESSION['idUsuario'];
$nombreEmpresa = $_SESSION['nombreEmpresa'];
$modelo = new Acciones();
$resultado = $modelo->tomar_tickets_pendientes_empresas($idUsuario,$sesion,$nombreEmpresa);
echo $resultado;
?>
