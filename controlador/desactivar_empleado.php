<?php
require_once('../modelo/acciones.php');

$id_empleado = $_POST['id_empleado'];
$estado = $_POST['estado'];
$id = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];

$accion = new Acciones();
$respuesta= $accion->desactivar_empleado($id,$idSesion,$id_empleado, $estado);
echo $respuesta;
?>