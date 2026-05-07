<?php

$cursos = [
    [
        "id" => "curso_1",
        "nombre" => "1º Desarrollo Multiplataforma",
        "asignaturas" => [
            [
                "id" => "asig_1",
                "nombre" => "Bases de Datos"
            ],
            [
                "id" => "asig_2",
                "nombre" => "Lenguaje de Marcas"
            ],
            [
                "id" => "asig_3",
                "nombre" => "Programación Web"
            ]
        ]
    ],
    [
        "id" => "curso_2",
        "nombre" => "2º Desarrollo Multiplataforma",
        "asignaturas" => [
            [
                "id" => "asig_4",
                "nombre" => "Desarrollo de Interfaces"
            ],
            [
                "id" => "asig_5",
                "nombre" => "Sistemas de Gestión"
            ],
            [
                "id" => "asig_6",
                "nombre" => "Matemáticas Avanzadas"
            ]
        ]
    ]
];

function obtenerCursos()
{
    global $cursos;
    return $cursos;
}

function obtenerNombreAsignatura($idAsignatura)
{
    global $cursos;

    foreach ($cursos as $curso) {
        foreach ($curso["asignaturas"] as $asignatura) {
            if ($asignatura["id"] == $idAsignatura) {
                return $asignatura["nombre"];
            }
        }
    }

    return "Asignatura no encontrada";
}

?>