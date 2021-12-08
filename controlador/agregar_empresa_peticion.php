<?php
include_once("../modelo/acciones.php");

$rfcEmpresa = $_POST['rfcEmpresa'];
$nombreEmpresa = $_POST['nombreEmpresa'];
$razonsocialEmpresa = $_POST['razonsocialEmpresa'];
$domicilioEmpresa = $_POST['domicilioEmpresa'];
$numerocalleEmpresa = $_POST['numerocalleEmpresa'];
$coloniaEmpresa = $_POST['coloniaEmpresa'];
$cpEmpresa = $_POST['cpEmpresa'];
$municipioEmpresa = $_POST['municipioEmpresa'];
$estadoEmpresa = $_POST['estadoEmpresa'];
$telefonoEmpresa = $_POST['telefonoEmpresa'];
$correoEmpresa = $_POST['correoEmpresa'];
$contrasenaEmpresa = $_POST['contrasenaEmpresa'];

$modelo = new Acciones();
$registrar_peticion_empresa = $modelo->agregar_peticion_empresa($rfcEmpresa,$nombreEmpresa,$razonsocialEmpresa,$domicilioEmpresa,$numerocalleEmpresa,$coloniaEmpresa,$cpEmpresa,$municipioEmpresa,$estadoEmpresa,$telefonoEmpresa,$correoEmpresa,$contrasenaEmpresa);
echo $registrar_peticion_empresa;
//var_dump($registrar_empleado);

?>