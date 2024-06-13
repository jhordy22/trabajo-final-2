<?php
require('../Model/Conexion.php');
$con = new Conexion();

$nombre     = $_POST["nombre"];
$apellido   = $_POST["apellido"];    
$telefono   = $_POST["telefono"];    
$correo     = $_POST["correo"];    
$dni        = $_POST["dni"];
$id 				= $_POST["id"];

$usuarios = $con->actualizarUsuario($nombre,$apellido, $telefono, $correo, $dni, $id);
echo $usuarios;


?>