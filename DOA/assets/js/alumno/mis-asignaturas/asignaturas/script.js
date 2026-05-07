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


// Selecciona una asignatura del menú lateral
// Selecciona una asignatura del menú lateral
function seleccionarAsignatura(idAsignatura, idCurso) {
    localStorage.setItem("asignaturaActiva", idAsignatura);
    localStorage.setItem("cursoActivo", idCurso);

    const estaEnPantallaPrincipal = document.getElementById("nombre-asignatura-central") !== null;

    if (estaEnPantallaPrincipal) {
        const botonSeleccionado = document.getElementById("btn_" + idAsignatura);
        const nombreAsig = botonSeleccionado ? botonSeleccionado.dataset.nombre : "Asignatura no encontrada";

        const tituloPrincipal = document.getElementById("nombre-asignatura-central");

        if (tituloPrincipal) {
            tituloPrincipal.innerText = nombreAsig;
        }

        const todosBotonesAsig = document.querySelectorAll(".btn-asignatura");

        todosBotonesAsig.forEach(function (boton) {
            boton.classList.remove("activa");
        });

        if (botonSeleccionado) {
            botonSeleccionado.classList.add("activa");
        }

        if (window.innerWidth <= 768) {
            const menu = document.getElementById("menu-lateral");

            if (menu) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    } else {
        window.location.href = "../index.php";
    }
}

// Restaura el estado del menú lateral
function restaurarEstadoMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

    if (window.innerWidth <= 768) {
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
    restaurarEstadoMenu();

    const primeraAsignatura = document.querySelector(".btn-asignatura");
    const primerCurso = document.querySelector(".btn-curso-menu");

    const asigGuardada = localStorage.getItem("asignaturaActiva");
    const cursoGuardado = localStorage.getItem("cursoActivo");

    const idAsignatura = asigGuardada || (primeraAsignatura ? primeraAsignatura.id.replace("btn_", "") : "");
    const idCurso = cursoGuardado || (primerCurso ? primerCurso.id.replace("btn_", "") : "");

    const contenedorCurso = document.getElementById("contenedor_" + idCurso);
    const botonCurso = document.getElementById("btn_" + idCurso);

    if (contenedorCurso && botonCurso) {
        contenedorCurso.classList.add("abierto");
        botonCurso.classList.add("activo");
    }

const estaEnPantallaPrincipal = document.getElementById("nombre-asignatura-central") !== null;

if (idAsignatura && idCurso && estaEnPantallaPrincipal) {
    seleccionarAsignatura(idAsignatura, idCurso);
}

if (idAsignatura && !estaEnPantallaPrincipal) {
    const botonAsignatura = document.getElementById("btn_" + idAsignatura);

    if (botonAsignatura) {
        botonAsignatura.classList.add("activa");
    }
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