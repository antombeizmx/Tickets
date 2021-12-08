<?php
include_once("../modelo/acciones.php");

$idUsuario = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$nombreEmpresa = $_POST['nombreEmpresa'];
$rfcEmpresa = $_POST['rfcEmpresa'];
$tipoServicio = $_POST['tipoServicio'];
$prioridad = $_POST['prioridad'];
$descripcion = $_POST['descripcion'];


$modelo = new Acciones();
$registrar_ticket= $modelo->agregar_ticket($idUsuario,$idSesion,$nombreEmpresa,$rfcEmpresa,$tipoServicio,$prioridad,$descripcion);
echo $registrar_ticket;

?>