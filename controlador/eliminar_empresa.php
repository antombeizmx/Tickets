<?php
include_once("../modelo/acciones.php");
$idAdmin = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$idUsuario = $_POST['id_empresa'];

$modelo = new Acciones();
$peticion = $modelo->eliminar_empresa($idAdmin,$idSesion,$idUsuario);
echo $peticion;
?>