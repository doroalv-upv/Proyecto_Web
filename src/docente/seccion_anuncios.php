<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOA Sección de anuncios</title>
    <link rel="stylesheet" href="../css/VistaAsignaturas_Y_Recursos_estilos.css">
    <script src="../js/seccion_anuncios.js" defer></script>
</head>
<body id="vista-anuncios">
<div id="modificar-recursos">

    <div id="toolbar-acciones">
    <!-- ELIMINAR -->
        <button class="icono-accion" data-accion="eliminar">
            <img src="../imagenes/icono_eliminar.svg" alt="Eliminar">
        </button>

        <!-- EDITAR -->
        <button class="icono-accion" data-accion="editar">
            <img src="../imagenes/icono_lapiz.svg" alt="Editar">
        </button>

        <!-- AÑADIR (independiente) -->
        <button class="opener-dialog" data-accion="anadir">
            <img src="../imagenes/icono_mas.svg" alt="Añadir">
        </button>
    </div>

    <h1> Anuncios </h1>


    <?php
    include "../bbdd/anuncios_bbdd.php";
    include "../bbdd/usuarios.php";
    //$nombre = $_POST["nombreEnviar"];
    //$asignatura = $_POST["asignaturaEnviar"] ?? null;
    $nombre = "l.simdre@epsg.upv.es";
    $asignatura = "Programacion";


        if (isset($_POST["todos"]) || isset($anuncio_asignaturas[$asignatura])) {    // Confirmar si el usuario tiene la asignatura matriculada 
            if (!isset($_POST["todos"]) && empty($anuncio_asignaturas[$asignatura])) {
            echo "<h4>No hay anuncios</h4>";
            }
            else{

            if (isset($_POST["todos"]) || existeUsuarioAsignatura($nombre,$asignatura) == true){

            ?>
            <section>
                <!--Caja del anuncio-->
                <!--Ver solo anuncios de un asignatura especifica-->
                <?php
                    if(!isset($_POST["todos"])){
                        
                ?>
                <?php
                    foreach($anuncio_asignaturas[$asignatura] as $id => $datos_anuncios){

                ?>
                
                <div class="caja-anuncio"
                    data-id="<?= $id ?>"
                    data-titulo="<?= htmlspecialchars($datos_anuncios['Titulo']) ?>"
                    data-contenido="<?= htmlspecialchars($datos_anuncios['Contenido']) ?>">

                    <div id="datos_anuncio">
                        <h6><?= $datos_anuncios["Asignatura"] ?>: <?= $datos_anuncios["Titulo"] ?></h6>
                        <h6><?= $datos_anuncios["Autor"] ?></h6>
                        <h6><?= $datos_anuncios["Fecha"] ?></h6>
                    </div>

                    <p><?= $datos_anuncios["Contenido"] ?></p>
                </div>

                <?php
                    }
                    
                ?>
            </section>
            <?php
                    }
                    else{

                    ?>
            <!--Ver solo anuncios de todas las asignaturas pertenecientes al usuario -->
            <?php ?>

                <?php
                foreach($anuncio_asignaturas as $asignaturaLista => $lista_anuncios){
                    if(existeUsuarioAsignatura($nombre,$asignaturaLista) == true){
                        foreach($lista_anuncios as $id => $datos_anuncios){

                    ?>
                    <div id="caja-anuncio">
                        <!--Parte morada ( Datos del anuncio )-->
                        <div id="datos_anuncio">
                            <h6><?php echo $datos_anuncios["Asignatura"]; ?>: <?php echo $datos_anuncios["Titulo"]; ?> </h6>
                            <h6><?php echo $datos_anuncios["Autor"]; ?> </h6>
                            <h6><?php echo $datos_anuncios["Fecha"]; ?> </h6>

                        </div>
                        <!--Contenido del anuncio-->
                        <p><?php echo $datos_anuncios["Contenido"]; ?> </p>
                    </div>

            <?php
                        }
                    }
                }
            }}}}
            ?>

</div>

<!-- POPUP ELIMINAR -->
<dialog id="popup-eliminar">
    <p>¿Está seguro que quiere eliminar este anuncio?</p>

    <div class="boton-decision">
        <button class="cerrar-popup">Volver atrás</button>
        <button class="cerrar-popup">Confirmar</button>
    </div>
</dialog>

<!-- POPUP EDITAR -->
<dialog id="popup-editar">
    <label>
        <p>Introduce el nuevo título del anuncio</p>
        <input type="text" id="editar-titulo">
    </label>

    <label>
        <p>Introduce la nueva descripción del anuncio</p>
        <textarea id="editar-contenido" rows="10"></textarea>
    </label>

    <div class="boton-decision">
        <button class="cerrar-popup">Cancelar</button>
        <button class="cerrar-popup">Confirmar</button>
    </div>
</dialog>


</body>
</html>