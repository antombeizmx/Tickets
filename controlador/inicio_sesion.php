<?php
include_once("../modelo/acciones.php");

$correo = $_POST['correo'];
$pass = $_POST['contra'];
$modelo = new Acciones();
$iniciar_sesion = $modelo->inicio_sesion($correo,$pass);
echo $iniciar_sesion;
// var_dump($iniciar_sesion);

?>