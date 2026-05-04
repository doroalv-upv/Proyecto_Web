<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOA Sección de anuncios</title>
    <link rel="stylesheet" href="../css/seccion_anuncios.css">
</head>
<body>

    <h1> Anuncios </h1>


    <?php
    include "../bbdd/anuncios_bbdd.php";
    include "../bbdd/usuarios.php";
    $nombre = $_POST["nombreEnviar"];
    $asignatura = $_POST["asignaturaEnviar"] ?? null;
    //$nombre = "l.simdre@epsg.upv.es";
    //$asignatura = "Programacion";


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

</body>
</html>