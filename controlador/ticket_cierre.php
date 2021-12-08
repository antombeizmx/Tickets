<?php
include_once("../modelo/acciones.php");

$id_ticket = $_POST['id_ticket'];
$comentario = $_POST['comentario'];
$motivo = $_POST['motivo'];
$sesion = $_SESSION['idSesion'];
$idUsuario = $_SESSION['idUsuario'];
$tipoUsuario = $_SESSION['tipoUsuario'];

$modelo = new Acciones();
$resultado = $modelo->cierreTicket($idUsuario, $sesion, $tipoUsuario,$id_ticket,$comentario,$motivo);
echo $resultado;

?>
