<?php
include __DIR__ . "/../../../../../componentes/config.php";
include __DIR__ . "/../../../../../bbdd/Anuncios.inc";

$anuncios = obtenerAnuncios();
?>

<!-- Página de gestión de anuncios del docente -->
<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Metadatos de la página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de anuncios</title>

    <!-- Hojas de estilo -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/docente/mis-asignaturas/asignaturas/anuncios/styles.css">
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
        <main class="contenido-principal pagina-anuncios-docente">

            <!-- Botón volver solo móvil -->
            <button type="button" class="boton-volver-solo-movil" onclick="window.history.back()">
                <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Flecha_izquierda.svg" alt="Volver">
            </button>

            <!-- Cabecera de la sección -->
            <section class="cabecera-anuncios-docente">
                <div>
                    <h1>Gestión de anuncios</h1>
                    <p>Consulta, crea, edita o elimina anuncios visibles para el alumnado.</p>
                </div>

                <button type="button" class="boton-anadir-anuncio" id="abrir-modal-anadir">
                    <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Mas.svg" alt="">
                    Añadir anuncio
                </button>
            </section>
            <!-- fin cabecera de la sección -->

            <!-- Lista de anuncios -->
            <section class="contenedor-anuncios-docente" id="contenedor-anuncios-docente" aria-label="Lista de anuncios gestionados por el docente">

                <?php if (count($anuncios) > 0) { ?>

                    <?php foreach ($anuncios as $anuncio) { ?>

                        <!-- Tarjeta de anuncio -->
                        <article class="tarjeta-anuncio-docente">

                            <!-- Datos principales del anuncio -->
                            <header class="datos-anuncio-docente">
                                <div>
                                    <h2><?php echo htmlspecialchars($anuncio["titulo"]); ?></h2>
                                    <p><?php echo htmlspecialchars($anuncio["asignatura"]); ?></p>
                                </div>

                                <div class="meta-anuncio-docente">
                                    <span><?php echo htmlspecialchars($anuncio["autor"]); ?></span>
                                    <span><?php echo htmlspecialchars($anuncio["fecha"]); ?></span>
                                </div>
                            </header>
                            <!-- fin datos principales del anuncio -->

                            <!-- Contenido del anuncio -->
                            <div class="contenido-anuncio-docente">
                                <p><?php echo htmlspecialchars($anuncio["contenido"]); ?></p>
                            </div>
                            <!-- fin contenido del anuncio -->

                            <!-- Acciones del anuncio -->
                            <footer class="acciones-anuncio-docente">
                                <button type="button" class="boton-editar-anuncio">
                                    <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Lapiz.svg" alt="">
                                    Editar
                                </button>

                                <button type="button" class="boton-eliminar-anuncio">
                                    <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Basura.svg" alt="">
                                    Eliminar
                                </button>
                            </footer>
                            <!-- fin acciones del anuncio -->

                        </article>
                        <!-- fin tarjeta de anuncio -->

                    <?php } ?>

                <?php } else { ?>

                    <!-- Estado vacío -->
                    <p class="estado-vacio-docente" id="estado-vacio-docente">No hay anuncios disponibles.</p>
                    <!-- fin estado vacío -->

                <?php } ?>

            </section>
            <!-- fin lista de anuncios -->

        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal con menú lateral -->

    <!-- Modal añadir/editar anuncio -->
    <dialog class="modal-anuncio-docente" id="modal-anuncio-docente">

        <!-- Formulario del anuncio -->
        <form class="formulario-anuncio-docente" id="formulario-anuncio-docente">

            <h2 id="titulo-modal-anuncio">Añadir anuncio</h2>

            <input type="hidden" id="modo-modal-anuncio" value="anadir">

            <label for="campo-titulo-anuncio">
                Título del anuncio
                <input type="text" id="campo-titulo-anuncio" name="titulo" required>
            </label>

            <label for="campo-asignatura-anuncio">
                Asignatura
                <input type="text" id="campo-asignatura-anuncio" name="asignatura" required>
            </label>

            <label for="campo-contenido-anuncio">
                Descripción del anuncio
                <textarea id="campo-contenido-anuncio" name="contenido" rows="8" required></textarea>
            </label>

            <!-- Botones del formulario -->
            <div class="acciones-modal-anuncio">
                <button type="button" class="boton-cancelar-modal" id="cerrar-modal-anuncio">
                    Cancelar
                </button>

                <button type="submit" class="boton-confirmar-modal">
                    Guardar
                </button>
            </div>
            <!-- fin botones del formulario -->

        </form>
        <!-- fin formulario del anuncio -->

    </dialog>
    <!-- fin modal añadir/editar anuncio -->

    <!-- Modal eliminar anuncio -->
    <dialog class="modal-anuncio-docente modal-eliminar-docente" id="modal-eliminar-anuncio">

        <div class="contenido-modal-eliminar">
            <h2>Eliminar anuncio</h2>
            <p>¿Seguro que quieres eliminar este anuncio?</p>

            <div class="acciones-modal-anuncio">
                <button type="button" class="boton-cancelar-modal" id="cancelar-eliminar-anuncio">
                    Cancelar
                </button>

                <button type="button" class="boton-confirmar-eliminar" id="confirmar-eliminar-anuncio">
                    Eliminar
                </button>
            </div>
        </div>

    </dialog>
    <!-- fin modal eliminar anuncio -->

    <!-- Script de anuncios docente -->
    <script src="<?php echo $rutaBase; ?>assets/js/docente/mis-asignaturas/asignaturas/anuncios/script.js"></script>

</body>

</html>