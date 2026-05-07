<?php include __DIR__ . "/../../../../componentes/config.php"; ?>

<!-- Página de la vista del contenido de las asignaturas -->
<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Metadatos de la página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma DOA - Asignaturas</title>

    <!-- Hojas de estilo -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
</head>

<body>

    <!-- Cabecera -->
    <?php include __DIR__ . "/../../../../componentes/cabecera.php"; ?>
    <!-- fin cabecera -->

    <!-- Contenedor principal con menú lateral -->
    <div class="layout-principal">

        <!-- Menú lateral -->
        <?php include __DIR__ . "/../../../../componentes/menu_lateral.php"; ?>
        <!-- fin menú lateral -->

        <!-- Contenido principal -->
        <main class="contenido-principal">

            <!-- Botón volver solo móvil -->
            <button type="button" class="boton-volver-solo-movil" onclick="window.history.back()">
                <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Flecha_izquierda.svg" alt="Volver">
            </button>

            <!-- Botón de asignatura seleccionada -->
            <button type="button" id="btn-curso-actual" class="btn-curso-azul">
                <span id="nombre-asignatura-central">Selecciona asignatura</span>
            </button>

            <!-- Opciones de la asignatura -->
            <div class="recursos">

                <button type="button" class="btn-recurso" onclick="window.location.href='anuncios/index.php'">
                    <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Megafono.svg" alt="Icono de anuncios">
                    Anuncios asignatura
                </button>

                <button type="button" class="btn-recurso" onclick="window.location.href='recursos/index.php'">
                    <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Carpeta.svg" alt="Icono de carpeta">
                    Archivos/Recursos
                </button>

            </div>
            <!-- fin opciones de la asignatura -->

        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal con menú lateral -->

    <!-- Script -->
    <script src="<?php echo $rutaBase; ?>assets/js/docente/mis-asignaturas/asignaturas/script.js"></script>

</body>

</html>