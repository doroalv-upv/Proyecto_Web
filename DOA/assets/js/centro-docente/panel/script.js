// Menú lateral funcional y seguro para panel de centro docente

function toggleMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

    if (window.innerWidth <= 768) {
        menu.classList.toggle("abierto");
    } else {
        menu.classList.toggle("cerrado");
    }
}

function abrirCurso(idCursoBuscado) {
    const contenedor = document.getElementById("contenedor_" + idCursoBuscado);
    const boton = document.getElementById("btn_" + idCursoBuscado);

    if (!contenedor) {
        return;
    }

    contenedor.classList.toggle("abierto");

    if (boton) {
        boton.classList.toggle("activo");
    }
}

function seleccionarAsignatura(idAsignatura, idCurso) {
    const botonSeleccionado = document.getElementById("btn_" + idAsignatura);

    if (botonSeleccionado) {
        const botonesAsignatura = document.querySelectorAll(".btn-asignatura");

        botonesAsignatura.forEach(function (boton) {
            boton.classList.remove("activa");
        });

        botonSeleccionado.classList.add("activa");
    }

    return;
}

function cerrarMenuMovilSiPulsaFuera(evento) {
    const menu = document.getElementById("menu-lateral");
    const botonMenuMovil = document.querySelector(".boton-menu-movil");

    if (!menu || window.innerWidth > 768) {
        return;
    }

    if (!menu.classList.contains("abierto")) {
        return;
    }

    if (menu.contains(evento.target)) {
        return;
    }

    if (botonMenuMovil && botonMenuMovil.contains(evento.target)) {
        return;
    }

    menu.classList.remove("abierto");
}

window.toggleMenu = toggleMenu;
window.abrirCurso = abrirCurso;
window.seleccionarAsignatura = seleccionarAsignatura;

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", cerrarMenuMovilSiPulsaFuera);
});