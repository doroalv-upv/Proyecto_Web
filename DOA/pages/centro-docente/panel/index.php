<?php
require_once __DIR__ . "/../../../componentes/config.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Metadatos de la página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOA | Panel centro docente</title>

    <!-- Hojas de estilo generales -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">

    <!-- Hoja de estilo del panel -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/centro-docente/panel/styles.css">
</head>

<body>

    <!-- Cabecera -->
    <?php include __DIR__ . "/../../../componentes/cabecera.php"; ?>
    <!-- fin cabecera -->

    <!-- Contenedor principal -->
    <div class="layout-principal">

        <!-- Menú lateral -->
        <?php include __DIR__ . "/../../../componentes/menu_lateral.php"; ?>
        <!-- fin menú lateral -->

        <!-- Contenido principal -->
        <main class="contenido-principal panel-centro-docente">

            <!-- Cabecera del panel -->
            <section class="cabecera-panel-centro">
                <h1>Panel centro docente</h1>
                <p>Accede a la gestión de anuncios, recursos y cursos desde un único panel.</p>
            </section>
            <!-- fin cabecera del panel -->

            <!-- Opciones del panel -->
            <section class="contenedor-opciones-centro" aria-label="Opciones de gestión del centro docente">

                <!-- Gestión de anuncios -->
                <a class="tarjeta-opcion-centro" href="<?php echo $rutaBase; ?>pages/docente/mis-asignaturas/asignaturas/anuncios/index.php">
                    <div class="icono-opcion-centro">
                        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Megafono.svg" alt="Icono de anuncios">
                    </div>

                    <div class="texto-opcion-centro">
                        <h2>Gestión de anuncios</h2>
                        <p>Crear, editar y eliminar anuncios visibles para el alumnado.</p>
                    </div>
                </a>
                <!-- fin gestión de anuncios -->

                <!-- Gestión de recursos -->
                <a class="tarjeta-opcion-centro" href="<?php echo $rutaBase; ?>pages/docente/mis-asignaturas/asignaturas/recursos/index.php">
                    <div class="icono-opcion-centro">
                        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Carpeta.svg" alt="Icono de recursos">
                    </div>

                    <div class="texto-opcion-centro">
                        <h2>Gestión de recursos</h2>
                        <p>Consultar y gestionar archivos o recursos asociados a las asignaturas.</p>
                    </div>
                </a>
                <!-- fin gestión de recursos -->

                <!-- Gestión de cursos -->
                <a class="tarjeta-opcion-centro" href="<?php echo $rutaBase; ?>pages/secretaria/gestor-cursos/index.php">
                    <div class="icono-opcion-centro">
                        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Comunidad_Azul.svg" alt="Icono de cursos">
                    </div>

                    <div class="texto-opcion-centro">
                        <h2>Gestión de cursos</h2>
                        <p>Ver cursos del centro y consultar el listado de alumnos.</p>
                    </div>
                </a>
                <!-- fin gestión de cursos -->

            </section>
            <!-- fin opciones del panel -->

        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal -->

    <!-- Script del panel -->
    <script src="<?php echo $rutaBase; ?>assets/js/centro-docente/panel/script.js"></script>

</body>

</html>