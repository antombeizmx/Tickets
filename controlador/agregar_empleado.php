<?php
include_once("../modelo/acciones.php");

$idUsuario = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$nombreEmpleado = $_POST['nombreEmpleado'];
$apellidopEmpleado = $_POST['apellidopEmpleado'];
$apellidomEmpleado = $_POST['apellidomEmpleado'];
$domicilioEmpleado = $_POST['domicilioEmpleado'];
$numeroextEmpleado = $_POST['numeroextEmpleado'];
$coloniaEmpleado = $_POST['coloniaEmpleado'];
$telefonoEmpleado = $_POST['telefonoEmpleado'];
$puestoEmpleado = $_POST['puestoEmpleado'];
$correoEmpleado = $_POST['correoEmpleado'];
$contrasenaEmpleado = $_POST['contrasenaEmpleado'];

$modelo = new Acciones();
$registrar_empleado = $modelo->agregar_empleado($idUsuario,$idSesion,$nombreEmpleado,$apellidopEmpleado,$apellidomEmpleado,$domicilioEmpleado,$numeroextEmpleado,$coloniaEmpleado,$telefonoEmpleado,$puestoEmpleado,$correoEmpleado,$contrasenaEmpleado);
echo $registrar_empleado;
//var_dump($registrar_empleado);

?>