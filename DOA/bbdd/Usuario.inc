<?php

$usuarios = [
    "l.simdre@epsg.upv.es" => [
        "dni" => "01-9218611",
        "nombre" => "Lief",
        "apellido1" => "Simants",
        "apellido2" => "Dredge",
        "email" => "l.simdre@epsg.upv.es",
        "password" => "9218611",
        "rol" => "alumno"
    ],
    "m.kirkam@epsg.upv.es" => [
        "dni" => "04-1320191",
        "nombre" => "Merline",
        "apellido1" => "Kirdsch",
        "apellido2" => "Kampshell",
        "email" => "m.kirkam@epsg.upv.es",
        "password" => "1320191",
        "rol" => "alumno"
    ],
    "d.rawabc@epsg.upv.es" => [
        "dni" => "05-9971924",
        "nombre" => "Debora",
        "apellido1" => "Rawstorne",
        "apellido2" => "",
        "email" => "d.rawabc@epsg.upv.es",
        "password" => "9971924",
        "rol" => "alumno"
    ],
    "k.poumai@upv.es" => [
        "dni" => "60-4525956",
        "nombre" => "Kevan",
        "apellido1" => "Pounds",
        "apellido2" => "Mainston",
        "email" => "k.poumai@upv.es",
        "password" => "4525956",
        "rol" => "profesor"
    ],
    "l.prista@upv.es" => [
        "dni" => "64-6055365",
        "nombre" => "Luelle",
        "apellido1" => "Pridmore",
        "apellido2" => "Starsmeare",
        "email" => "l.prista@upv.es",
        "password" => "6055365",
        "rol" => "profesor"
    ],
    "e.mermiz@upv.es" => [
        "dni" => "64-6738133",
        "nombre" => "Eolande",
        "apellido1" => "Merriton",
        "apellido2" => "Mizzi",
        "email" => "e.mermiz@upv.es",
        "password" => "6738133",
        "rol" => "profesor"
    ],
    "o.breshe@upv.es" => [
        "dni" => "88-1316390",
        "nombre" => "Ondrea",
        "apellido1" => "Brezlaw",
        "apellido2" => "Sherwill",
        "email" => "o.breshe@upv.es",
        "password" => "1316390",
        "rol" => "pas"
    ],
    "b.maltho@upv.es" => [
        "dni" => "91-1970980",
        "nombre" => "Brooke",
        "apellido1" => "Malimoe",
        "apellido2" => "Thomerson",
        "email" => "b.maltho@upv.es",
        "password" => "1970980",
        "rol" => "pas"
    ],
    "dapasa@har.upv.es" => [
        "dni" => "",
        "nombre" => "Daniel",
        "apellido1" => "Palacio",
        "apellido2" => "",
        "email" => "dapasa@har.upv.es",
        "password" => "1234",
        "rol" => ""
    ],
    "jogilo@upvnet.upv.es" => [
        "dni" => "",
        "nombre" => "José Luis",
        "apellido1" => "Gimenez",
        "apellido2" => "",
        "email" => "jogilo@upvnet.upv.es",
        "password" => "4567",
        "rol" => ""
    ]
];

function validarUsuario($userName, $password)
{
    global $usuarios;

    if (!array_key_exists($userName, $usuarios)) {
        return false;
    }

    return $usuarios[$userName]["password"] == $password;
}

function obtenerIdentificadorUsuario($userName)
{
    global $usuarios;

    if (!array_key_exists($userName, $usuarios)) {
        return false;
    }

    return $usuarios[$userName]["dni"];
}

function obtenerRolUsuario($userName)
{
    global $usuarios;

    if (!array_key_exists($userName, $usuarios)) {
        return false;
    }

    return $usuarios[$userName]["rol"];
}

function obtenerNombreUsuario($userName)
{
    global $usuarios;

    if (!array_key_exists($userName, $usuarios)) {
        return false;
    }

    return $usuarios[$userName]["nombre"];
}

?>