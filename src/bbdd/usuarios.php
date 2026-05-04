<?php
$usuarios = [
    "l.simdre@epsg.upv.es"	=> [
        "nombre" => "l.simdre@epsg.upv.es",
        "asignaturas" => ["Programacion", "Redes"]
    ],
    "m.kirkam@epsg.upv.es"	=> [
        "nombre" => "",
        "asignaturas" => ["Redes"]
    ],   

];


function existeUsuarioAsignatura($nombre, $asignatura){
    global $usuarios;

    if(isset($usuarios[$nombre]) && in_array($asignatura, $usuarios[$nombre]["asignaturas"])){
        return true;
        }

    return false;
}


?>