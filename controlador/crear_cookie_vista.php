<?php
include_once("../modelo/acciones.php");

$dato_cookie = $_POST['valor'];
$idUsuario = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$modelo = new Acciones();
$peticion = $modelo->crear_cookie_vista($idUsuario,$idSesion,$dato_cookie);
echo $peticion;
?>