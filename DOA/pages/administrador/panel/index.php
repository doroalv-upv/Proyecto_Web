<?php include "../../../componentes/config.php"; ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel administrador | DOA</title>

    <!-- Hoja de estilos -->
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/administrador/panel/administrador_panel.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
</head>
<body>

    <!-- Cabecera -->
    <?php include __DIR__ . "/../../../componentes/cabecera.php"; ?>
    <!-- fin cabecera -->

    <!-- Contenedor principal con menú lateral -->
    <div class="layout-principal">

        <!-- Menú lateral -->
        <?php include __DIR__ . "/../../../componentes/menu_lateral.php"; ?>
        <!-- fin menú lateral -->

        <!-- Contenido principal -->
        <main class="contenido">
            <h1>Soy administrador</h1>
        </main>
        <!-- fin contenido principal -->

    </div>
    <!-- fin contenedor principal con menú lateral -->

    <!-- Script del menú lateral -->
    <script src="<?php echo $rutaBase; ?>assets/js/alumno/mis-asignaturas/asignaturas/script.js"></script>

</body>
</html>