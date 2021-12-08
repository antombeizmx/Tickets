<?php
include_once("../modelo/acciones.php");


$idUsuario = $_SESSION['idUsuario'];
$idSesion = $_SESSION['idSesion'];
$nombreAdministrador = $_POST['nombreAdministrador'];
$apellidopAdministrador = $_POST['apellidopAdministrador'];
$apellidomAdministrador = $_POST['apellidomAdministrador'];
$domicilioAdministrador = $_POST['domicilioAdministrador'];
$numeroextAdministrador = $_POST['numeroextAdministrador'];
$coloniaAdministrador = $_POST['coloniaAdministrador'];
$telefonoAdministrador = $_POST['telefonoAdministrador'];
$puestoAdministrador = $_POST['puestoAdministrador'];
$correoAdministrador = $_POST['correoAdministrador'];
$contrasenaAdministrador = $_POST['contrasenaAdministrador'];

$modelo = new Acciones();
$registrar_Administrador = $modelo->agregar_Administrador($idUsuario,$idSesion,$nombreAdministrador,$apellidopAdministrador,$apellidomAdministrador,$domicilioAdministrador,$numeroextAdministrador,$coloniaAdministrador,$telefonoAdministrador,$puestoAdministrador,$correoAdministrador,$contrasenaAdministrador);
echo $registrar_Administrador;
//var_dump($registrar_empleado);

?>