<?php
include __DIR__ . "/config.php";
include __DIR__ . "/../bbdd/Asignaturas.inc";

$cursos = obtenerCursos();
?>

<!-- Menú lateral -->
<aside id="menu-lateral" class="sidebar">

    <!-- Botón hamburguesa del menú lateral en PC -->
    <button type="button" class="menu-lateral-soloPC" onclick="toggleMenu()">
        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Hamburguesa.svg" alt="Abrir o cerrar menú lateral">
    </button>

    <!-- Contenido del menú lateral -->
    <div class="contenido-menu">

        <div class="titula-seccion-menu">Mis asignaturas</div>

        <nav id="lista-asignaturas" class="nav-asignaturas">

            <?php foreach ($cursos as $curso) { ?>

                <!-- Botón del curso -->
                <button
                    type="button"
                    class="btn-curso-menu"
                    id="btn_<?php echo $curso["id"]; ?>"
                    onclick="abrirCurso('<?php echo $curso["id"]; ?>')">
                    <?php echo $curso["nombre"]; ?>
                </button>

                <!-- Asignaturas del curso -->
                <div
                    class="contenedor-asignaturas-menu"
                    id="contenedor_<?php echo $curso["id"]; ?>">

                    <?php foreach ($curso["asignaturas"] as $asignatura) { ?>

                        <button
                            type="button"
                            class="btn-asignatura"
                            id="btn_<?php echo $asignatura["id"]; ?>"
                            data-nombre="<?php echo $asignatura["nombre"]; ?>"
                            onclick="seleccionarAsignatura('<?php echo $asignatura["id"]; ?>', '<?php echo $curso["id"]; ?>')">
                            <?php echo $asignatura["nombre"]; ?>
                        </button>

                    <?php } ?>

                </div>

            <?php } ?>

        </nav>

        <button type="button" class="btn-anuncios">Anuncios</button>

    </div>
    <!-- fin contenido del menú lateral -->

</aside>
<!-- fin menú lateral -->