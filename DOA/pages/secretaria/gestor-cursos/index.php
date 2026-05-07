<?php

require_once __DIR__ . "/../../../componentes/config.php";
require_once __DIR__ . "/../../../bbdd/Cursos.inc";

$cursos = obtenerCursosSecretaria();

$idCursoSeleccionado = $_GET["curso"] ?? "";
$cursoSeleccionado = null;

if ($idCursoSeleccionado !== "") {
    $cursoSeleccionado = obtenerCursoSecretariaPorId($idCursoSeleccionado);
}

function e($valor)
{
    return htmlspecialchars($valor ?? "", ENT_QUOTES, "UTF-8");
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Metadatos de la página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOA | Gestor de cursos</title>

    <!-- Hojas de estilo -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/secretaria/gestor-cursos/styles.css">
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
        <main class="contenido-principal">

            <!-- Cabecera página -->
            <section class="cabecera-cursos">
                <h1>Gestor de cursos</h1>
                <p>Selecciona un curso para ver su alumnado.</p>
            </section>
            <!-- fin cabecera página -->

            <!-- Listado de cursos -->
            <section class="contenedor-cursos" aria-label="Listado de cursos">

                <?php foreach ($cursos as $curso) { ?>

                    <!-- Tarjeta curso -->
                    <a href="index.php?curso=<?php echo e($curso["id"]); ?>" class="tarjeta-curso">
                        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Carpeta.svg" alt="Carpeta">

                        <div>
                            <h2><?php echo e($curso["nombre"] ?? "Curso sin nombre"); ?></h2>

                            <?php if (!empty($curso["descripcion"])) { ?>
                                <p><?php echo e($curso["descripcion"]); ?></p>
                            <?php } ?>
                        </div>
                    </a>
                    <!-- fin tarjeta curso -->

                <?php } ?>

            </section>
            <!-- fin listado de cursos -->

            <?php if ($cursoSeleccionado !== null) { ?>

                <!-- Listado alumnos -->
                <section class="contenedor-alumnos">

                    <div class="cabecera-alumnos">
                        <h2><?php echo e($cursoSeleccionado["nombre"] ?? "Curso seleccionado"); ?></h2>
                        <p>Listado de alumnos del curso.</p>
                    </div>

                    <?php if (!empty($cursoSeleccionado["alumnos"])) { ?>

                        <div class="contenedor-tabla-alumnos">
                            <table class="tabla-alumnos">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <?php foreach ($cursoSeleccionado["alumnos"] as $alumno) { ?>
                                        <tr>
                                            <td><?php echo e($alumno["dni"] ?? ""); ?></td>
                                            <td><?php echo e($alumno["nombre"] ?? ""); ?></td>
                                            <td><?php echo e($alumno["email"] ?? ""); ?></td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>

                    <?php } else { ?>

                        <p class="estado-vacio">
                            Este curso todavía no tiene alumnos asignados.
                        </p>

                    <?php } ?>

                </section>
                <!-- fin listado alumnos -->
            <?php } ?>

        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal -->

    <!-- Script -->
    <script src="<?php echo $rutaBase; ?>assets/js/secretaria/gestor-cursos/script.js"></script>

</body>

</html>