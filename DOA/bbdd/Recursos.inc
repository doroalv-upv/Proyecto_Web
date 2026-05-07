<?php

$recursos = [
    [
        "id" => 1,
        "asignatura" => "asig_1",
        "tipo" => "PDF",
        "nombre" => "Introducción al Arte Clásico",
        "autor" => "María Gómez",
        "fecha" => "10/05/2026"
    ],
    [
        "id" => 2,
        "asignatura" => "asig_1",
        "tipo" => "DOCX",
        "nombre" => "Apuntes de repaso",
        "autor" => "Juan Pérez",
        "fecha" => "12/05/2026"
    ],
    [
        "id" => 3,
        "asignatura" => "asig_1",
        "tipo" => "ZIP",
        "nombre" => "Material extra del tema 1",
        "autor" => "María Gómez",
        "fecha" => "15/05/2026"
    ],
    [
        "id" => 4,
        "asignatura" => "asig_2",
        "tipo" => "JPG",
        "nombre" => "Esquema visual",
        "autor" => "Ana López",
        "fecha" => "18/05/2026"
    ],
    [
        "id" => 5,
        "asignatura" => "asig_2",
        "tipo" => "PNG",
        "nombre" => "Diagrama de fases",
        "autor" => "Juan Pérez",
        "fecha" => "20/05/2026"
    ]
];

function obtenerRecursos()
{
    global $recursos;
    return $recursos;
}

function obtenerRecursosPorAsignatura($idAsignatura)
{
    global $recursos;

    $recursosAsignatura = [];

    foreach ($recursos as $recurso) {
        if ($recurso["asignatura"] == $idAsignatura) {
            $recursosAsignatura[] = $recurso;
        }
    }

    return $recursosAsignatura;
}

?>