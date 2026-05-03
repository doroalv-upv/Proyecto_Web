<?php

    $usuarios = [
        //poner en php: "correo@correo.es" => "contraseña",
        "admin" => "admin"
    ];
    function validarUsuario($userName, $password){
        global $usuarios; // las varaibls globales en php no sereconocen en las funciones, y se reconocen como esta puesto en esta linea.
        if(!array_key_exists($userName,$usuarios)) return false;


        //Se comprueba si la contraseña del usuario escogido es verdadera
        if($usuarios[$userName] == $password){
            return true;
        }
        return false;

        /*
        Conexion a la BBDD

        Select * FROM usuarios WHERE nombre = $nombreUsuario AND password = $password
        */

    }
?>