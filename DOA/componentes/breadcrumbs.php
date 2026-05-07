<?php

// Obtener la ruta actual
$rutaActual = $_SERVER["PHP_SELF"];

// Separar la ruta por partes
$partesRuta = explode("/", $rutaActual);

// Secciones desde las que queremos empezar las migas
$seccionesPermitidas = ["administrador", "alumno", "docente", "secretaria", "centro-docente", "cliente", "general", "GTI"];

// Buscar desde qué sección empieza la ruta importante
$posicionInicio = false;

foreach ($seccionesPermitidas as $seccion) {
    $posicionEncontrada = array_search($seccion, $partesRuta);

    if ($posicionEncontrada !== false) {
        $posicionInicio = $posicionEncontrada;
        break;
    }
}

// Si no encuentra ninguna sección, no muestra nada
if ($posicionInicio === false) {
    return;
}

// Quedarse solo desde la sección importante hacia adelante
$migas = array_slice($partesRuta, $posicionInicio);

// Quitar archivos y partes vacías
$migas = array_filter($migas, function ($miga) {

    if ($miga === "") {
        return false;
    }

    if ($miga === "pages") {
        return false;
    }

    if (substr($miga, -4) === ".php") {
        return false;
    }

    if (substr($miga, -5) === ".html") {
        return false;
    }

    return true;
});

// Reordenar índices
$migas = array_values($migas);

// Formatear texto visible
function formatearTextoMiga($miga)
{
    $textoMiga = str_replace("-", " ", $miga);
    $textoMiga = str_replace("_", " ", $textoMiga);
    $textoMiga = ucfirst($textoMiga);

    return $textoMiga;
}

// Crear enlace automático hacia index.php o index.html de cada carpeta
function obtenerUrlMigaAutomatica($rutaBase, $rutaAcumulada)
{
    $rutaWebPhp = $rutaBase . "pages" . $rutaAcumulada . "/index.php";
    $rutaWebHtml = $rutaBase . "pages" . $rutaAcumulada . "/index.html";

    $rutaFisicaPhp = __DIR__ . "/../pages" . $rutaAcumulada . "/index.php";
    $rutaFisicaHtml = __DIR__ . "/../pages" . $rutaAcumulada . "/index.html";

    if (file_exists($rutaFisicaPhp)) {
        return $rutaWebPhp;
    }

    if (file_exists($rutaFisicaHtml)) {
        return $rutaWebHtml;
    }

    return "#";
}

?>

<!-- Migas de pan -->
<nav id="breadcrumbs" role="navigation">

    <?php
        $rutaAcumulada = "";

        foreach ($migas as $indice => $miga) {

            $rutaAcumulada .= "/" . $miga;

            $textoMiga = formatearTextoMiga($miga);
            $esUltima = $indice === count($migas) - 1;
            $urlMiga = obtenerUrlMigaAutomatica($rutaBase, $rutaAcumulada);
    ?>

        <div>
            <?php if (!$esUltima && $urlMiga !== "#") { ?>
                <a href="<?php echo $urlMiga; ?>">
                    <?php echo htmlspecialchars($textoMiga); ?>
                </a>
            <?php } else { ?>
                <span><?php echo htmlspecialchars($textoMiga); ?></span>
            <?php } ?>
        </div>

    <?php } ?>

</nav>
<!-- fin migas de pan -->