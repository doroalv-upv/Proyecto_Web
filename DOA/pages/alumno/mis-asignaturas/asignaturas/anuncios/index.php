<?php
include __DIR__ . "/../../../../../componentes/config.php";
include __DIR__ . "/../../../../../bbdd/Anuncios.inc";

$anuncios = obtenerAnuncios();
?>

<!-- Página de anuncios del alumno -->
<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Metadatos de la página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anuncios</title>

    <!-- Hojas de estilo -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/alumno/mis-asignaturas/asignaturas/anuncios/styles.css">
</head>

<body>

    <!-- Cabecera -->
    <?php include __DIR__ . "/../../../../../componentes/cabecera.php"; ?>
    <!-- fin cabecera -->

    <!-- Contenedor principal con menú lateral -->
    <div class="layout-principal">

        <!-- Menú lateral -->
        <?php include __DIR__ . "/../../../../../componentes/menu_lateral.php"; ?>
        <!-- fin menú lateral -->

        <!-- Contenido principal -->
        <main class="contenido-principal pagina-anuncios">

            <!-- Botón volver solo móvil -->
            <button type="button" class="boton-volver-solo-movil" onclick="window.history.back()">
                <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Flecha_izquierda.svg" alt="Volver">
            </button>

            <!-- Cabecera de la sección -->
            <section class="cabecera-anuncios">
                <h1>Anuncios</h1>
                <p>Consulta los anuncios publicados en las asignaturas.</p>
                
            </section>
            <!-- fin cabecera de la sección -->

            <!-- Lista de anuncios -->
            <section class="contenedor-anuncios" aria-label="Lista de anuncios">

                <?php if (count($anuncios) > 0) { ?>

                    <?php foreach ($anuncios as $anuncio) { ?>

                        <!-- Tarjeta de anuncio -->
                        <article class="tarjeta-anuncio">

                            <!-- Datos principales del anuncio -->
                            <header class="datos-anuncio">
                                <div>
                                    <h2><?php echo htmlspecialchars($anuncio["titulo"]); ?></h2>
                                    <p><?php echo htmlspecialchars($anuncio["asignatura"]); ?></p>
                                </div>

                                <div class="meta-anuncio">
                                    <span><?php echo htmlspecialchars($anuncio["autor"]); ?></span>
                                    <span><?php echo htmlspecialchars($anuncio["fecha"]); ?></span>
                                </div>
                            </header>
                            <!-- fin datos principales del anuncio -->

                            <!-- Contenido del anuncio -->
                            <div class="contenido-anuncio">
                                <p><?php echo htmlspecialchars($anuncio["contenido"]); ?></p>
                            </div>
                            <!-- fin contenido del anuncio -->

                        </article>
                        <!-- fin tarjeta de anuncio -->

                    <?php } ?>

                <?php } else { ?>

                    <!-- Estado vacío -->
                    <p class="estado-vacio">No hay anuncios disponibles.</p>
                    <!-- fin estado vacío -->

                <?php } ?>

            </section>
            <!-- fin lista de anuncios -->

        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal con menú lateral -->

    <!-- Script del menú lateral -->
    <script src="<?php echo $rutaBase; ?>assets/js/alumno/mis-asignaturas/asignaturas/script.js"></script>

</body>

</html>