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


    if(isset($anuncio_asignaturas[$_POST["asignatura"]])){
    // Confirmar si el usuario tiene la asignatura matriculada
    if(existeUsuarioAsignatura($_POST("$nombre"),$_POST("$asignatura")) == true){

    ?>
    <section>
        <!--Caja del anuncio-->
        <?php
            foreach($asignaturas["Programacion"] as $id => $datos_anuncios){

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
       }
    ?>
    <?php
       else{
            if(!isset($anuncio_asignaturas["$asignatura"]["$id"])){
    ?>
                <h4></h4> 
    <?php
            }
       }
    ?>
</body>
</html>