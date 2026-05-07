<?php

session_start();

require_once __DIR__ . "/../bbdd/Usuario.inc";

$userName = trim($_POST["nombre"] ?? "");
$password = trim($_POST["clave"] ?? "");
$origen = trim($_POST["origen"] ?? "");

/* Función auxiliar para redirigir y cortar ejecución */
function redirigir($ruta)
{
    header("Location: " . $ruta);
    exit();
}

/* Si faltan datos mínimos, devuelve al login correspondiente */
if ($userName === "" || $password === "") {
    if ($origen === "gti") {
        redirigir("../pages/GTI/login/login_GTI.html?error=1");
    }

    redirigir("../pages/general/login/inicio-sesion-doa.html?error=1");
}

/* Validación de usuario */
if (validarUsuario($userName, $password)) {

    $idUsuario = obtenerIdentificadorUsuario($userName);
    $rol = obtenerRolUsuario($userName);

    $_SESSION["usuario"] = $userName;
    $_SESSION["idUsuario"] = $idUsuario;
    $_SESSION["rol"] = $rol;

    /* Login desde GTI */
    if ($origen === "gti") {
        redirigir("../pages/GTI/home/home.html");
    }

    /* Login desde DOA */
    if ($origen === "doa") {

        if ($rol === "alumno") {
            redirigir("../pages/alumno/mis-asignaturas/asignaturas/index.php");
        }
    
        if ($rol === "docente" || $rol === "profesor") {
            redirigir("../pages/docente/mis-asignaturas/asignaturas/index.php");
        }

        if ($rol === "pas") {
            redirigir("../pages/secretaria/gestor-cursos/index.php");
        }

        if ($rol === "centro-docente" || $rol === "") {
            redirigir("../pages/centro-docente/panel/index.php");
        }

        /* Rol no reconocido */
        redirigir("../pages/general/login/inicio-sesion-doa.html?error=rol");
    }

    /* Origen no reconocido */
    redirigir("../pages/general/login/inicio-sesion-doa.html?error=origen");

} else {

    /* Usuario o contraseña incorrectos */
    if ($origen === "gti") {
        redirigir("../pages/GTI/login/login_GTI.html?error=1");
    }

    redirigir("../pages/general/login/inicio-sesion-doa.html?error=1");
}