<?php
include_once("../modelo/acciones.php");
$idAdmin = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$idUsuario = $_POST['id_adn'];

$modelo = new Acciones();
$peticion = $modelo->eliminar_adn($idAdmin,$idSesion,$idUsuario);
echo $peticion;
?>