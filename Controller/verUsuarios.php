<?php

require('../Model/Conexion.php');

$con = new Conexion();

$usuarios = $con->getUsers();

echo json_encode($usuarios);

?>