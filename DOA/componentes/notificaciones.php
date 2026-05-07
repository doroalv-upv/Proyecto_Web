<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DOA · Notificaciones</title>
  <link rel="stylesheet" href="../assets/css/general/notificaciones/notificaciones_movil.css">
</head>

<body>
  <!-- Sección notificaciones móvil -->
  <div class="app-movil">
    <!-- Sección header -->
    <?php include __DIR__ . "/cabecera.php"; ?>
    <!-- fin seccion header -->

    <!-- Sección contenido -->
    <main class="pantalla" role="main">
      <!-- Botón volver -->
      <a class="volver" href="#" aria-label="Volver">
        <img src="../assets/iconos/Icono_Flecha_izquierda.svg" alt="Volver">
      </a>

      <!-- Panel notificaciones -->
      <section class="panel" aria-label="Notificaciones">
        <h1 class="panel__titulo">Notificaciones</h1>

        <!-- LISTA (con notificaciones) -->
        <ul class="lista-notificaciones" aria-label="Historial de notificaciones">

          <li class="notificacion">
            <article class="notificacion__card">
              <header class="notificacion__header">
                <div class="notificacion__izq">
                  <p class="notificacion__meta">Asignatura: <strong>Matematicas</strong></p>
                  <p class="notificacion__meta">Autor: <strong>Juan alberto</strong></p>
                </div>
                <div class="notificacion__der">
                  <p class="notificacion__meta">Tipo: <strong>Anuncio</strong></p>
                  <time class="notificacion__fecha" datetime="2026-04-29">29/04/2026</time>
                </div>
              </header>

              <p class="notificacion__contenido">Primer parcial</p>
            </article>

          </li>

          <li class="notificacion">
            <article class="notificacion__card">
              <header class="notificacion__header">
                <div class="notificacion__izq">
                  <p class="notificacion__meta">Asignatura: <strong>Física</strong></p>
                  <p class="notificacion__meta">Autor: <strong>Salvador salva</strong></p>
                </div>
                <div class="notificacion__der">
                  <p class="notificacion__meta">Tipo: <strong>Anuncio</strong></p>
                  <time class="notificacion__fecha" datetime="2026-04-12">12/04/2026</time>
                </div>
              </header>

              <p class="notificacion__contenido">Revisión del primer parcial - 20:00</p>
            </article>
          </li>

          <li class="notificacion">
            <article class="notificacion__card">
              <header class="notificacion__header">
                <div class="notificacion__izq">
                  <p class="notificacion__meta">Asignatura: <strong>CDIO</strong></p>
                  <p class="notificacion__meta">Autor: <strong>Carlos calvo</strong></p>
                </div>
                <div class="notificacion__der">
                  <p class="notificacion__meta">Tipo: <strong>Nueva tarea</strong></p>
                  <time class="notificacion__fecha" datetime="2026-03-28">28/03/2026</time>
                </div>
              </header>

              <p class="notificacion__contenido">Salinidad</p>
            </article>
          </li>

        </ul>

        <!-- ESTADO VACÍO (actívalo si no hay notificaciones)
        <div class="estado-vacio" role="status">
          No hay notificaciones
        </div>
        -->
      </section>
    </main>
    <!-- fin seccion contenido -->

    <!-- Sección barra inferior -->
    <nav class="barra-inferior" aria-label="Navegación inferior">
      <a href="#" class="barra-inferior__item" aria-label="Notificaciones">🔔</a>
      <a href="#" class="barra-inferior__item" aria-label="Menú">☰</a>
    </nav>
    <!-- fin seccion barra inferior -->

  </div>
  <!-- fin seccion notificaciones móvil -->
</body>
</html>