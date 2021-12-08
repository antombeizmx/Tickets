<?php
include_once("../modelo/acciones.php");

$idUsuario = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$comentario = $_POST['comentario'];
$id_ticket = $_POST['id_ticket'];


$modelo = new Acciones();
$registrar_ticket= $modelo->agregar_comentario($idUsuario,$idSesion,$id_ticket,$comentario);
echo $registrar_ticket;
?>