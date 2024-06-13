<?php
require('../Model/Conexion.php');
$con = new Conexion();

$nombre = $_POST["filtro"];
$usuarios = $con->buscar($nombre);

// Devolver los resultados como JSON
echo json_encode($usuarios);




?>