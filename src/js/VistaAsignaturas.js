var datosAsignaturas = {
    "asignatura_1": { nombre: "Matemáticas Avanzadas" },
    "asignatura_2": { nombre: "Lengua Castellana" },
    "asignatura_3": { nombre: "Historia del Arte" },
    "asignatura_4": { nombre: "Programación Web" }
};

function cargarMenu() {
    var contenedorMenu = document.getElementById("lista-asignaturas");
    if (!contenedorMenu) return;

    contenedorMenu.innerHTML = "";
    var keys = Object.keys(datosAsignaturas);

    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var boton = document.createElement("button");
        boton.className = "btn-asignatura";
        boton.innerText = datosAsignaturas[id].nombre;

        boton.onclick = (function(idSeleccionado) {
            return function() {
                seleccionarAsignatura(idSeleccionado);
            };
        })(id);

        contenedorMenu.appendChild(boton);
    }
}

function seleccionarAsignatura(id) {
    localStorage.setItem('asignaturaActiva', id);

    var asignatura = datosAsignaturas[id];

    if (asignatura) {
        var tituloPrincipal = document.getElementById("nombre-asignatura-central");
        if (tituloPrincipal) {
            tituloPrincipal.innerText = asignatura.nombre;
        }

        var ruta = document.getElementById("migas-pan");
        if (ruta) {
            ruta.innerHTML = "<a href='#'>Página principal</a> > <a href='VistaAsignaturas.html'>Asignaturas</a> > <span>" + asignatura.nombre + "</span>";
        }
    }

    // Cerramos el menú en móvil y actualizamos la memoria
    if (window.innerWidth <= 768) {
        var menu = document.getElementById("menu-lateral");
        if (menu) {
            menu.classList.remove("abierto");
            localStorage.setItem("estadoMenuMovil", "cerrado");
        }
    }
}

// Función que aplica el estado del menú guardado al cargar la página
function restaurarEstadoMenu() {
    var menu = document.getElementById("menu-lateral");
    if (!menu) return;

    if (window.innerWidth <= 768) {
        var estadoMovil = localStorage.getItem("estadoMenuMovil");
        if (estadoMovil === "abierto") {
            menu.classList.add("abierto");
            menu.classList.remove("cerrado");
        } else {
            menu.classList.remove("abierto");
        }
    } else {
        var estadoPC = localStorage.getItem("estadoMenuPC");
        if (estadoPC === "cerrado") {
            menu.classList.add("cerrado");
            menu.classList.remove("abierto");
        } else {
            menu.classList.remove("cerrado");
        }
    }
}

// Guarda en memoria si el usuario abre o cierra el menú
function toggleMenu() {
    var menu = document.getElementById("menu-lateral");
    if (menu) {
        if (window.innerWidth <= 768) {
            menu.classList.remove("cerrado");
            menu.classList.toggle("abierto");
            var estaAbierto = menu.classList.contains("abierto");
            localStorage.setItem("estadoMenuMovil", estaAbierto ? "abierto" : "cerrado");
        } else {
            menu.classList.remove("abierto");
            menu.classList.toggle("cerrado");
            var estaCerrado = menu.classList.contains("cerrado");
            localStorage.setItem("estadoMenuPC", estaCerrado ? "cerrado" : "abierto");
        }
    }
}

window.toggleMenu = toggleMenu;

document.addEventListener("DOMContentLoaded", function() {
    cargarMenu();
    restaurarEstadoMenu();

    var asignaturaGuardada = localStorage.getItem('asignaturaActiva');
    if (!asignaturaGuardada || !datosAsignaturas[asignaturaGuardada]) {
        asignaturaGuardada = Object.keys(datosAsignaturas)[0];
    }

    seleccionarAsignatura(asignaturaGuardada);
});