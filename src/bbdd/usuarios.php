<?php
$usuarios = [
    "l.simdre@epsg.upv.es"	=> [
        "nombre" => "l.simdre@epsg.upv.es",
        "asignaturas" => "Programacion"
    ],
    "m.kirkam@epsg.upv.es"	=> [
        "nombre" => "",
        "asignaturas" => ""
    ],
    "d.rawabc@epsg.upv.es"	=> [
        "nombre" => "",
        "asignaturas" => ""
    ],
    "k.poumai@upv.es"	 => [
        "nombre" => "",
        "asignaturas" => ""
    ],
    "l.prista@upv.es"   => [
        "nombre" => "",
        "asignaturas" => ""
    ], 
    "e.mermiz@upv.es"   => [
        "nombre" => "",
        "asignaturas" => ""
    ],     

];


function existeUsuarioAsignatura($nombre, $asignatura){
    global $usuarios;

    if(isset($usuarios[$nombre]) && $usuarios[$nombre]["asignaturas"] === $asignatura){
        return true;
        }

    return false;
}


?>