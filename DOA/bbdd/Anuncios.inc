<?php

$anuncios = [
    [
        "id" => "anuncio_1",
        "asignatura" => "Programación Web",
        "titulo" => "Cambio de fecha del examen",
        "autor" => "Alfonso",
        "fecha" => "03/05/2026",
        "contenido" => "El examen de Programación Web cambia de fecha. La nueva fecha será comunicada en clase y en la plataforma."
    ],
    [
        "id" => "anuncio_2",
        "asignatura" => "Programación Web",
        "titulo" => "Nueva tarea disponible",
        "autor" => "Alfonso",
        "fecha" => "06/05/2026",
        "contenido" => "Ya está disponible la nueva tarea de la asignatura. Revisad los requisitos antes de realizar la entrega."
    ],
    [
        "id" => "anuncio_3",
        "asignatura" => "Bases de Datos",
        "titulo" => "Material de repaso",
        "autor" => "María Gómez",
        "fecha" => "10/05/2026",
        "contenido" => "Se ha añadido material de repaso para preparar la próxima prueba de la asignatura."
    ],
    [
        "id" => "anuncio_4",
        "asignatura" => "Diseño de Interfaces",
        "titulo" => "Recordatorio de entrega",
        "autor" => "Ana López",
        "fecha" => "12/05/2026",
        "contenido" => "Recordad revisar el formato de entrega antes de subir la actividad a la plataforma."
    ]
];

function obtenerAnuncios()
{
    global $anuncios;
    return $anuncios;
}

?>