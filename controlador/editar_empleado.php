<?php
include_once("../modelo/acciones.php");
$idAdmin = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$idUsuario = $_POST['id'];
$tipo_dato = $_POST['tipo'];
$valor_dato = $_POST['valor'];

$modelo = new Acciones();
$editar = $modelo->editar_empleado($idAdmin,$idSesion,$idUsuario,$tipo_dato,$valor_dato);
echo $editar;

?>