<?php

class Conexion{

    private $con;

    public function __construct()
    {
        $this->con = new mysqli('localhost', 'root', '', 'super');
    }

    public function getUsers(){
        $query = $this->con->query('SELECT * FROM cliente');

        $retorno = [];

        $i = 0;
        while($fila = $query->fetch_assoc()){
            $retorno[$i] = $fila;
            $i++;
        }

        return $retorno;
    }


    public function crearUsuario($nombre, $apellido, $telefono, $correo, $dni){
        $fecha = date('Y-m-d');
        $sql = "INSERT INTO cliente (nombre, apellido, telefono, correo, dni, fecha) VALUES ('$nombre', '$apellido', '$telefono', '$correo', '$dni', '$fecha')";
        if ($this->con->query($sql) === TRUE) {
            return true; 
        } else {
            return false; 
        }
    }


    public function buscar($nombre){
        $sql = "SELECT * FROM cliente WHERE nombre LIKE '%$nombre%'";
        $query = $this->con->query($sql);
        // Convertir los resultados a un array asociativo para enviarlos como JSON
        $resultados = [];
        while ($fila = $query->fetch_assoc()) {
            $resultados[] = $fila;
        }
        return $resultados;
    }
    
    public function cambiarEstado($status, $id){
        $sql = "UPDATE cliente SET estado = '$status' WHERE id_cliente =  '$id' ";
        if ($this->con->query($sql) === TRUE) {
            return true; 
        } else {
            return false; 
        }
    }

    public function eliminarUsuario($id){
        $sql = "DELETE FROM  cliente  WHERE id_cliente =  '$id' ";
        if ($this->con->query($sql) === TRUE) {
            return true; 
        } else {
            return false; 
        }
    }

    public function editar($id){
        $sql = "SELECT * FROM cliente WHERE id_cliente =  '$id' ";
        $query = $this->con->query($sql);
        $retorno = [];
        $i = 0;
        while($fila = $query->fetch_assoc()){
            $retorno[$i] = $fila;
            $i++;
        }

        return $retorno;
    }
    
    public function actualizarUsuario($nombre, $apellido, $telefono, $correo, $dni, $id){
        $sql = "UPDATE cliente SET nombre = '$nombre', apellido = '$apellido', telefono = '$telefono', correo = '$correo', dni = '$dni' WHERE id_cliente = '$id' ";
        if ($this->con->query($sql) === TRUE) {
            return true; 
        } else {
            return false; 
        }
    }


   


}

?>