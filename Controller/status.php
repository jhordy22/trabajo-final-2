<?php
require('../Model/Conexion.php');
$con = new Conexion();

$status     = $_POST["status"];
$id 				= $_POST["id"];


$usuarios = $con->cambiarEstado($status, $id);
echo $usuarios;


?>