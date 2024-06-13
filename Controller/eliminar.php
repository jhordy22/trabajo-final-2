<?php
require('../Model/Conexion.php');
$con = new Conexion();


$id = $_POST["id"];

$usuarios = $con->eliminarUsuario($id);
echo $usuarios;


?>