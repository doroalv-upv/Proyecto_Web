<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOA Sección de anuncios</title>
    <link rel="stylesheet" href="../css/VistaAsignaturas_Y_Recursos_estilos.css">
    <script src="../js/seccion_anuncios.js" defer></script>
</head>
<body id="vista-anuncios">
    <?php
        include("../alumno/seccion_anuncios.php");
    ?>
                <!--Boton de eliminar anuncio-->
               <div id="modificar-anuncios">
                <button class="opener-dialog"><img src="../imagenes/icono_eliminar.svg" alt="icono-eliminar"></button>
                <dialog class="popup eliminar-anuncios">

                <h2> ¿ Esta seguro que quiere eliminar este anuncio? </h2>

                <div class="boton-decision boton-eliminar">
                    <button class="cerrar-popup"><h4>Cancelar</h4></button>
                    <button class="cerrar-popup"><h4>Confirmar</h4></button>
                </div>
                </dialog>

                <!--Boton de editar anuncio-->
                <button class="opener-dialog"><img src="../imagenes/icono_lapiz.svg" alt="icono-lapiz"></button>
                <dialog class="popup">
                    <form class="campos-texto">

                    <!-- Titulo del anuncio -->
                    <label for="titulo">
                        <p>Introduce el título del anuncio</p>
                        <input 
                            type="text" 
                            id="titulo" 
                            name="titulo" 
                            placeholder="<?php echo $datos_anuncios["Titulo"]; ?>"
                        <?php echo $datos_anuncios["Titulo"]; ?>>
                    </label>

                    <!-- Descripcion del anuncio -->
                    <label for="descripcion">
                        <p>Introduce la descripción del anuncio</p>
                        <textarea 
                            id="descripcion" 
                            name="descripcion" 
                            placeholder=""
                            rows="26"
                        ><?php echo $datos_anuncios["Contenido"]; ?> ?></textarea>
                    </label>
                </form>

                <!--Boton de confirmacion y Cancelar-->
                <div class="boton-decision">
                    <button class="cerrar-popup"><h4>Cancelar</h4></button>
                    <button class="cerrar-popup"><h4>Confirmar</h4></button>
                </div>
            
        

                </dialog>

                <!--Boton de añadir anuncio-->
                <button class="opener-dialog" ><img src="../imagenes/icono_mas.svg" alt="icono-mas"></button>
                <dialog class="popup" >

             
                <form class="campos-texto">

                    <!-- Titulo del anuncio -->
                    <label for="titulo">
                        <p>Introduce el título del anuncio</p>
                        <input 
                            type="text" 
                            id="titulo" 
                            name="titulo" 
                            placeholder="Título"
                        >
                    </label>

                    <!-- Descripcion del anuncio -->
                    <label for="descripcion">
                        <p>Introduce la descripción del anuncio</p>
                        <textarea 
                            id="descripcion" 
                            name="descripcion" 
                            placeholder="Descripción"
                            rows="26"
                        ></textarea>
                    </label>
                </form>

                <!--Boton de confirmacion y Cancelar-->
                <div class="boton-decision">
                    <button class="cerrar-popup"><h4>Cancelar</h4></button>
                    <button class="cerrar-popup"><h4>Confirmar</h4></button>
                </div>
            
                </dialog>
            </div>
</body>
</html>