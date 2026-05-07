<?php
session_start();

require_once __DIR__ . "/../../../../componentes/config.php";
require_once __DIR__ . "/../../../../bbdd/Cursos.inc";
require_once __DIR__ . "/../../../../bbdd/GestionSecretaria.inc";

if (!isset($_SESSION["cursos_secretaria"])) {
    $_SESSION["cursos_secretaria"] = obtenerCursosSecretaria();
}

if (!isset($_SESSION["asignaturas_secretaria"])) {
    $_SESSION["asignaturas_secretaria"] = obtenerAsignaturasSecretaria();
}

function e($valor)
{
    return htmlspecialchars($valor ?? "", ENT_QUOTES, "UTF-8");
}

$idCurso = $_GET["curso"] ?? ($_POST["curso"] ?? "");
$idAsignatura = $_GET["asignatura"] ?? ($_POST["asignatura"] ?? "");

function redirigirListado($idCurso, $idAsignatura)
{
    header("Location: index.php?curso=" . urlencode($idCurso) . "&asignatura=" . urlencode($idAsignatura));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $accion = $_POST["accion"] ?? "";
    $idUsuario = $_POST["usuario"] ?? "";

    foreach ($_SESSION["asignaturas_secretaria"] as $indice => $asignatura) {
        if ($asignatura["id"] === $idAsignatura) {

            if (!isset($_SESSION["asignaturas_secretaria"][$indice]["usuarios"])) {
                $_SESSION["asignaturas_secretaria"][$indice]["usuarios"] = [];
            }

            if ($accion === "anadir" && $idUsuario !== "") {
                if (!in_array($idUsuario, $_SESSION["asignaturas_secretaria"][$indice]["usuarios"])) {
                    $_SESSION["asignaturas_secretaria"][$indice]["usuarios"][] = $idUsuario;
                }
            }

            if ($accion === "eliminar" && $idUsuario !== "") {
                foreach ($_SESSION["asignaturas_secretaria"][$indice]["usuarios"] as $posicion => $idAsignado) {
                    if ($idAsignado === $idUsuario) {
                        unset($_SESSION["asignaturas_secretaria"][$indice]["usuarios"][$posicion]);
                        $_SESSION["asignaturas_secretaria"][$indice]["usuarios"] = array_values($_SESSION["asignaturas_secretaria"][$indice]["usuarios"]);
                        break;
                    }
                }
            }

            break;
        }
    }

    redirigirListado($idCurso, $idAsignatura);
}

$cursoActual = null;

foreach ($_SESSION["cursos_secretaria"] as $curso) {
    if ($curso["id"] === $idCurso) {
        $cursoActual = $curso;
        break;
    }
}

$asignaturaActual = null;

foreach ($_SESSION["asignaturas_secretaria"] as $asignatura) {
    if ($asignatura["id"] === $idAsignatura) {
        $asignaturaActual = $asignatura;
        break;
    }
}

$usuarios = obtenerUsuariosSecretaria();

$usuariosAsignados = [];
$usuariosDisponibles = [];

if ($asignaturaActual !== null) {
    $idsAsignados = $asignaturaActual["usuarios"] ?? [];

    foreach ($usuarios as $usuario) {
        if (in_array($usuario["id"], $idsAsignados)) {
            $usuariosAsignados[] = $usuario;
        } else {
            $usuariosDisponibles[] = $usuario;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOA | Usuarios de asignatura</title>

    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/cabecera/cabecera.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/breadcrumbs/breadcrumbs.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/general/menu_lateral/css_general.css">
    <link rel="stylesheet" href="<?php echo $rutaBase; ?>assets/css/secretaria/gestor-asignaturas/styles.css">
</head>

<body>

<?php include __DIR__ . "/../../../../componentes/cabecera.php"; ?>

<div class="layout-principal">

    <?php include __DIR__ . "/../../../../componentes/menu_lateral.php"; ?>

    <main class="contenido-principal">

        <div class="cabecera-asignaturas">
            <div>
                <h1 class="titulo-asignaturas">Usuarios de la asignatura</h1>

                <?php if ($cursoActual !== null && $asignaturaActual !== null) { ?>
                    <p class="subtitulo-pagina">
                        <?php echo e($cursoActual["nombre"]); ?> · <?php echo e($asignaturaActual["nombre"]); ?>
                    </p>
                <?php } ?>
            </div>

            <div class="acciones-asignaturas">
                <a href="../index.php?curso=<?php echo e($idCurso); ?>" class="btn-secundario">
                    Volver a asignaturas
                </a>
            </div>
        </div>

        <?php if ($asignaturaActual === null) { ?>

            <p class="estado-vacio">No se ha encontrado la asignatura seleccionada.</p>

        <?php } else { ?>

            <section class="bloque-formulario-anadir">
                <h2>Añadir usuario</h2>

                <form method="post" class="formulario-anadir-usuario">
                    <input type="hidden" name="accion" value="anadir">
                    <input type="hidden" name="curso" value="<?php echo e($idCurso); ?>">
                    <input type="hidden" name="asignatura" value="<?php echo e($idAsignatura); ?>">

                    <select name="usuario" required>
                        <option value="">Selecciona un usuario</option>

                        <?php foreach ($usuariosDisponibles as $usuario) { ?>
                            <option value="<?php echo e($usuario["id"]); ?>">
                                <?php echo e($usuario["nombre"] . " " . $usuario["apellido1"] . " " . $usuario["apellido2"]); ?>
                                -
                                <?php echo e($usuario["rol"]); ?>
                            </option>
                        <?php } ?>
                    </select>

                    <button type="submit" class="btn-azul">Añadir</button>
                </form>
            </section>

            <section class="tabla-usuarios">
                <h2>Usuarios asignados</h2>

                <?php if (count($usuariosAsignados) > 0) { ?>

                    <div class="contenedor-tabla">
                        <table>
                            <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                            </thead>

                            <tbody>
                            <?php foreach ($usuariosAsignados as $usuario) { ?>
                                <tr>
                                    <td><?php echo e($usuario["dni"]); ?></td>
                                    <td><?php echo e($usuario["nombre"] . " " . $usuario["apellido1"] . " " . $usuario["apellido2"]); ?></td>
                                    <td><?php echo e($usuario["email"]); ?></td>
                                    <td><?php echo e($usuario["rol"]); ?></td>
                                    <td>
                                        <form method="post" class="form-eliminar">
                                            <input type="hidden" name="accion" value="eliminar">
                                            <input type="hidden" name="curso" value="<?php echo e($idCurso); ?>">
                                            <input type="hidden" name="asignatura" value="<?php echo e($idAsignatura); ?>">
                                            <input type="hidden" name="usuario" value="<?php echo e($usuario["id"]); ?>">

                                            <button type="submit" class="btn-mini btn-mini-peligro">
                                                <img src="<?php echo $rutaBase; ?>assets/iconos/Icono_Basura.svg" alt="">
                                                Eliminar
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>

                <?php } else { ?>

                    <p class="estado-vacio">Esta asignatura todavía no tiene usuarios asignados.</p>

                <?php } ?>

            </section>

        <?php } ?>

    </main>

</div>

<script src="<?php echo $rutaBase; ?>assets/js/secretaria/gestor-asignaturas/script.js"></script>

</body>
</html>