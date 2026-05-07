<?php include __DIR__ . "/config.php"; ?>

<!-- Cabecera -->
<header class="encabezado" role="banner">

    <!-- Logotipo -->
    <img src="<?php echo $rutaBase; ?>assets/imagenes/Logo_DOA.svg" alt="logo de DOA" class="logo">
    <!-- fin logotipo -->

    <!-- Botón menú móvil -->
    <button type="button" class="boton-menu-movil" onclick="toggleMenu()">
        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Hamburguesa_blanco.svg" alt="Abrir menú">
    </button>
    <!-- fin botón menú móvil -->

    <!-- Migas de pan -->
    <div class="zona-migas-pan">
        <?php include __DIR__ . "/breadcrumbs.php"; ?>
    </div>
    <!-- fin migas de pan -->

    <!-- Iconos usuario -->
    <div class="iconos-usuario">

        <!-- Notificaciones -->
        <button type="button" class="boton-notificaciones" id="boton-notificaciones" aria-label="Abrir notificaciones">
            <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Notificación.svg" alt="notificaciones">
        </button>
        <!-- fin notificaciones -->

        <!-- Perfil -->
        <div class="contenedor-perfil">

            <button type="button" class="perfil" id="boton-perfil" aria-label="Abrir menú de perfil">
                <img src="<?php echo $rutaBase; ?>assets/imagenes/Perfil.svg" alt="perfil de usuario">
            </button>

            <!-- Menú desplegable de perfil -->
            <div class="menu-perfil" id="menu-perfil" hidden>
                <a href="<?php echo $rutaBase; ?>pages/general/login/inicio-sesion-doa.html">
                    Cerrar Sesión
                </a>
            </div>
            <!-- fin menú desplegable de perfil -->

        </div>
        <!-- fin perfil -->

    </div>
    <!-- fin iconos usuario -->

</header>
<!-- fin cabecera -->
<!-- Panel de notificaciones -->
<aside class="panel-notificaciones" id="panel-notificaciones" hidden>

    <!-- Botón cerrar notificaciones en móvil -->
    <button type="button" class="cerrar-notificaciones-movil" id="cerrar-notificaciones-movil" aria-label="Cerrar notificaciones">
        <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Flecha_izquierda.svg" alt="Cerrar notificaciones">
    </button>

    <h2>Notificaciones</h2>

    <!-- Lista de notificaciones -->
    <div class="lista-notificaciones">

        <!-- Notificación -->
        <article class="tarjeta-notificacion">
            <header class="cabecera-notificacion">
                <div>
                    <p>Asignatura: <strong>Matemáticas</strong></p>
                    <p>Autor: <strong>Juan alberto</strong></p>
                </div>

                <div>
                    <p>Tipo: <strong>Anuncio</strong></p>
                    <p><strong>29/04/2026</strong></p>
                </div>
            </header>

            <div class="contenido-notificacion">
                <p>Primer parcial</p>
            </div>
        </article>
        <!-- fin notificación -->

        <!-- Notificación -->
        <article class="tarjeta-notificacion">
            <header class="cabecera-notificacion">
                <div>
                    <p>Asignatura: <strong>Física</strong></p>
                    <p>Autor: <strong>Salvador salva</strong></p>
                </div>

                <div>
                    <p>Tipo: <strong>Anuncio</strong></p>
                    <p><strong>12/04/2026</strong></p>
                </div>
            </header>

            <div class="contenido-notificacion">
                <p>Revisión del primer parcial - 20:00</p>
            </div>
        </article>
        <!-- fin notificación -->

        <!-- Notificación -->
        <article class="tarjeta-notificacion">
            <header class="cabecera-notificacion">
                <div>
                    <p>Asignatura: <strong>CDIO</strong></p>
                    <p>Autor: <strong>Carlos calvo</strong></p>
                </div>

                <div>
                    <p>Tipo: <strong>Nueva tarea</strong></p>
                    <p><strong>28/03/2026</strong></p>
                </div>
            </header>

            <div class="contenido-notificacion">
                <p>Salinidad</p>
            </div>
        </article>
        <!-- fin notificación -->

    </div>
    <!-- fin lista de notificaciones -->

</aside>
<!-- fin panel de notificaciones -->
<script>
    const botonPerfil = document.getElementById("boton-perfil");
    const menuPerfil = document.getElementById("menu-perfil");

    if (botonPerfil && menuPerfil) {
        botonPerfil.addEventListener("click", function (evento) {
            evento.stopPropagation();
            menuPerfil.hidden = !menuPerfil.hidden;
        });

        document.addEventListener("click", function (evento) {
            if (!menuPerfil.contains(evento.target) && !botonPerfil.contains(evento.target)) {
                menuPerfil.hidden = true;
            }
        });

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                menuPerfil.hidden = true;
            }
        });
    }
    const botonNotificaciones = document.getElementById("boton-notificaciones");
    const panelNotificaciones = document.getElementById("panel-notificaciones");
    const cerrarNotificacionesMovil = document.getElementById("cerrar-notificaciones-movil");

    if (botonNotificaciones && panelNotificaciones) {
        botonNotificaciones.addEventListener("click", function (evento) {
            evento.stopPropagation();
            panelNotificaciones.hidden = !panelNotificaciones.hidden;
        });

        if (cerrarNotificacionesMovil) {
            cerrarNotificacionesMovil.addEventListener("click", function () {
                panelNotificaciones.hidden = true;
            });
        }

        document.addEventListener("click", function (evento) {
            const clickDentroPanel = panelNotificaciones.contains(evento.target);
            const clickEnBoton = botonNotificaciones.contains(evento.target);

            if (!clickDentroPanel && !clickEnBoton) {
                panelNotificaciones.hidden = true;
            }
        });

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                panelNotificaciones.hidden = true;
            }
        });
    }
</script>