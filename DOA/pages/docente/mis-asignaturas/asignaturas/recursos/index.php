<?php
include __DIR__ . "/../../../../../componentes/config.php";
include __DIR__ . "/../../../../../bbdd/Recursos.inc";

$idAsignatura = $_GET["asignatura"] ?? "asig_1";
$recursos = obtenerRecursos();?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Metadatos de la página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma DOA - Recursos</title>

    <!-- Hojas de estilo generales -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/docente/mis-asignaturas/asignaturas/recursos/Recursos_Subir_Archivo.css">

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
        <main class="contenido-principal">

            <!-- Botón volver solo móvil -->
            <button type="button" class="boton-volver-solo-movil" onclick="window.location.href='../index.php'">
                <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Flecha_izquierda.svg" alt="Volver">
            </button>

            <!-- Título de recursos -->
            <h2 class="titulo-recursos">Recursos</h2>


            <!-- Acciones del profesor -->
            <div class="acciones-recursos-docente">

                <!-- Botón subir recurso -->
                <label for="input-subir-archivo" class="btn-subir-recurso">
                    Subir archivo
                </label>

                <input
                    type="file"
                    id="input-subir-archivo"
                    class="input-subir-archivo"
                    accept=".pdf,.docx,.zip,.jpg,.png">

                <!-- Botón activar borrado -->
                <button type="button" id="btn-activar-borrado" class="btn-borrar-recursos">
                    Eliminar recursos
                </button>

            </div>
            <!-- fin acciones del profesor -->
            
            <!-- Barra de búsqueda y filtros -->
            <div class="barra-busqueda-filtros">

                <!-- Buscador de recursos -->
                <div class="input-busqueda-wrapper">
                    <svg class="icono-lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>

                    <input type="text" id="buscador-recursos" class="input-busqueda" placeholder="Buscar...">
                </div>

                <!-- Filtro de recursos -->
                <div class="select-filtro-wrapper">
                    <select id="filtro-recursos" class="select-filtro">
                        <option value="">Filtrar</option>
                        <option value="PDF">PDF</option>
                        <option value="DOCX">DOCX</option>
                        <option value="ZIP">ZIP</option>
                        <option value="JPG">JPG</option>
                        <option value="PNG">PNG</option>
                    </select>
                </div>

            </div>
            <!-- fin barra de búsqueda y filtros -->

            <!-- Contenedor de recursos -->
            <div id="contenedor-recursos" class="contenedor-recursos">

                <?php foreach ($recursos as $recurso) { ?>

                <div
                    class="tarjeta-recurso"
                    data-id="<?php echo htmlspecialchars($recurso["id"]); ?>"
                    data-tipo="<?php echo htmlspecialchars($recurso["tipo"]); ?>"
                    data-nombre="<?php echo htmlspecialchars($recurso["nombre"]); ?>"
                    data-autor="<?php echo htmlspecialchars($recurso["autor"]); ?>">

                        <div class="tarjeta-izq">

                            <div class="icono-recurso tipo-<?php echo strtolower($recurso["tipo"]); ?>">
                                <span class="tipo-recurso">
                                    <?php echo $recurso["tipo"]; ?>
                                </span>
                            </div>

                            <div class="info-principal">
                                <span class="texto-tipo">
                                    Archivo <?php echo $recurso["tipo"]; ?>
                                </span>

                                <span class="texto-nombre">
                                    <?php echo $recurso["nombre"]; ?>
                                </span>
                            </div>

                        </div>

                        <div class="tarjeta-der">
                            <span class="texto-autor">
                                <?php echo $recurso["autor"]; ?>
                            </span>

                            <span class="texto-fecha">
                                <?php echo $recurso["fecha"]; ?>
                            </span>
                        </div>

                    </div>

                <?php } ?>

            </div>
            <!-- fin contenedor de recursos -->

            <!-- Estado vacío -->
            <div id="estado-vacio" class="estado-vacio <?php if (count($recursos) > 0) { echo "oculto"; } ?>">
                No hay recursos disponibles
            </div>
            <!-- fin estado vacío -->

        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal con menú lateral -->

    <!-- Scripts -->
    <script src="<?php echo $rutaBase; ?>assets/js/docente/mis-asignaturas/asignaturas/recursos/script.js"></script>
</body>

</html>