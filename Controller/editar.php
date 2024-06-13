<?php
require('../Model/Conexion.php');

$con = new Conexion();
$id 				= $_POST["id"];

$usuarios = $con->editar($id);
echo json_encode($usuarios)


?>