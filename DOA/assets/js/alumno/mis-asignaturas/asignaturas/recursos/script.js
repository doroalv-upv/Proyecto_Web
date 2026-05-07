// Filtra los recursos que ya pinta PHP desde Recursos.inc
function filtrarRecursos() {
    const buscador = document.getElementById("buscador-recursos");
    const filtro = document.getElementById("filtro-recursos");
    const estadoVacio = document.getElementById("estado-vacio");
    const tarjetas = document.querySelectorAll(".tarjeta-recurso");

    if (!buscador || !filtro || !estadoVacio) {
        return;
    }

    const textoBusqueda = buscador.value.trim().toLowerCase();
    const tipoFiltro = filtro.value.trim();

    let recursosVisibles = 0;

    tarjetas.forEach(function (tarjeta) {
        const tipo = (tarjeta.getAttribute("data-tipo") || "").trim();
        const nombre = (tarjeta.getAttribute("data-nombre") || "").toLowerCase();
        const autor = (tarjeta.getAttribute("data-autor") || "").toLowerCase();

        const coincideTexto =
            nombre.includes(textoBusqueda) ||
            autor.includes(textoBusqueda);

        const coincideTipo =
            tipoFiltro === "" || tipo === tipoFiltro;

        if (coincideTexto && coincideTipo) {
            tarjeta.style.display = "flex";
            recursosVisibles++;
        } else {
            tarjeta.style.display = "none";
        }
    });

    if (recursosVisibles === 0) {
        estadoVacio.style.display = "block";
    } else {
        estadoVacio.style.display = "none";
    }
}


// Abre y cierra un curso del menú lateral
function abrirCurso(idCursoBuscado) {
    const todosLosContenedores = document.querySelectorAll(".contenedor-asignaturas-menu");
    const todosLosBotonesCurso = document.querySelectorAll(".btn-curso-menu");

    todosLosContenedores.forEach(function (contenedor, index) {
        const botonCorrespondiente = todosLosBotonesCurso[index];

        if (contenedor.id === "contenedor_" + idCursoBuscado) {
            contenedor.classList.toggle("abierto");

            if (botonCorrespondiente) {
                botonCorrespondiente.classList.toggle("activo");
            }
        } else {
            contenedor.classList.remove("abierto");

            if (botonCorrespondiente) {
                botonCorrespondiente.classList.remove("activo");
            }
        }
    });

    localStorage.setItem("cursoActivo", idCursoBuscado);
}


// Selecciona una asignatura desde recursos
function seleccionarAsignatura(idAsignatura, idCurso) {
    localStorage.setItem("asignaturaActiva", idAsignatura);
    localStorage.setItem("cursoActivo", idCurso);

    // Desde recursos vuelve a la pantalla principal de asignaturas
    window.location.href = "../index.php";
}


// Restaura si el menú lateral estaba abierto o cerrado
function restaurarEstadoMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

    if (window.innerWidth <= 768) {
        // En móvil el menú debe empezar cerrado
        menu.classList.remove("abierto");
        localStorage.setItem("estadoMenuMovil", "cerrado");
    } else {
        const estadoPC = localStorage.getItem("estadoMenuPC");

        if (estadoPC === "cerrado") {
            menu.classList.add("cerrado");
        } else {
            menu.classList.remove("cerrado");
        }
    }
}


// Restaura el curso abierto y la asignatura activa sin redirigir
function restaurarAsignaturaActiva() {
    const primeraAsignatura = document.querySelector(".btn-asignatura");
    const primerCurso = document.querySelector(".btn-curso-menu");

    const asigGuardada = localStorage.getItem("asignaturaActiva");
    const cursoGuardado = localStorage.getItem("cursoActivo");

    const idAsignatura = asigGuardada || (primeraAsignatura ? primeraAsignatura.id.replace("btn_", "") : "");
    const idCurso = cursoGuardado || (primerCurso ? primerCurso.id.replace("btn_", "") : "");

    const contenedorCurso = document.getElementById("contenedor_" + idCurso);
    const botonCurso = document.getElementById("btn_" + idCurso);
    const botonAsignatura = document.getElementById("btn_" + idAsignatura);

    if (contenedorCurso) {
        contenedorCurso.classList.add("abierto");
    }

    if (botonCurso) {
        botonCurso.classList.add("activo");
    }

    if (botonAsignatura) {
        botonAsignatura.classList.add("activa");
    }
}


// Abre y cierra el menú lateral completo
function toggleMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

    if (window.innerWidth <= 768) {
        menu.classList.toggle("abierto");

        const estaAbierto = menu.classList.contains("abierto");
        localStorage.setItem("estadoMenuMovil", estaAbierto ? "abierto" : "cerrado");
    } else {
        menu.classList.toggle("cerrado");

        const estaCerrado = menu.classList.contains("cerrado");
        localStorage.setItem("estadoMenuPC", estaCerrado ? "cerrado" : "abierto");
    }
}


// Necesario para poder usar onclick desde HTML/PHP
window.toggleMenu = toggleMenu;
window.abrirCurso = abrirCurso;
window.seleccionarAsignatura = seleccionarAsignatura;


// Al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador-recursos");
    const filtro = document.getElementById("filtro-recursos");

    restaurarEstadoMenu();
    restaurarAsignaturaActiva();
    filtrarRecursos();

    if (buscador) {
        buscador.addEventListener("input", filtrarRecursos);
    }

    if (filtro) {
        filtro.addEventListener("change", filtrarRecursos);
    }
});


// Cierra el menú en móvil si se pulsa fuera
document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        const botonMenuMovil = document.querySelector(".boton-menu-movil");

        if (menu && menu.classList.contains("abierto")) {
            if (!menu.contains(event.target) && botonMenuMovil && !botonMenuMovil.contains(event.target)) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    }
});