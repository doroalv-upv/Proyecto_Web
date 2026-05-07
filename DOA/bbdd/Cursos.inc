<?php

$cursosSecretaria = [
    [
        "id" => "curso_1",
        "nombre" => "1º Desarrollo Multiplataforma",
        "descripcion" => "Primer curso de Desarrollo Multiplataforma",
        "alumnos" => [
            [
                "dni" => "01-9218611",
                "nombre" => "Lucía Simó Díaz",
                "email" => "l.simdre@epsg.upv.es"
            ],
            [
                "dni" => "04-1320191",
                "nombre" => "Carlos Martínez Soler",
                "email" => "c.martinez@epsg.upv.es"
            ],
            [
                "dni" => "05-9971924",
                "nombre" => "Marta García Pérez",
                "email" => "m.garcia@epsg.upv.es"
            ],
            [
                "dni" => "60-4525956",
                "nombre" => "Ana López Ferrando",
                "email" => "a.lopez@epsg.upv.es"
            ]
        ]
    ],
    [
        "id" => "curso_2",
        "nombre" => "2º Desarrollo Multiplataforma",
        "descripcion" => "Segundo curso de Desarrollo Multiplataforma",
        "alumnos" => [
            [
                "dni" => "64-6055365",
                "nombre" => "Javier Navarro Ruiz",
                "email" => "j.navarro@epsg.upv.es"
            ],
            [
                "dni" => "64-6738133",
                "nombre" => "Alfonso Romero Vidal",
                "email" => "a.romero@epsg.upv.es"
            ],
            [
                "dni" => "72-1145098",
                "nombre" => "Paula Torres Molina",
                "email" => "p.torres@epsg.upv.es"
            ]
        ]
    ]
];

function obtenerCursosSecretaria()
{
    global $cursosSecretaria;
    return $cursosSecretaria;
}

function obtenerCursoSecretariaPorId($idCurso)
{
    global $cursosSecretaria;

    foreach ($cursosSecretaria as $curso) {
        if ($curso["id"] === $idCurso) {
            return $curso;
        }
    }

    return null;
}

?>