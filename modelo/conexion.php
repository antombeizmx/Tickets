<?php
date_default_timezone_set('America/Mexico_City');
class Servidor
{
	public function conectar()
	{
		$usuario="root";
		$password="";
		$host="localhost";
		$db="tickets_db";
		$conexion= new PDO("mysql:host=$host;dbname=$db;charset=utf8",$usuario,$password);
		return $conexion;
	}
}
?>