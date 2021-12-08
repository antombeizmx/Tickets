<?php
include_once("../modelo/acciones.php");
$sesion = $_SESSION['idSesion'];
$idUsuario = $_SESSION['idUsuario'];
$coincidencia = $_POST['coincidencia'];
$modelo = new Acciones();
$resultado = $modelo->tomar_nombre_empresas($idUsuario,$sesion,$coincidencia);
echo $resultado;

?>
