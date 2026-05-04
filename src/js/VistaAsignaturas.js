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
    // IMPORTANTE: Guardamos la asignatura en la memoria del navegador
    localStorage.setItem('asignaturaActiva', id);

    var asignatura = datosAsignaturas[id];

    if (asignatura) {
        var tituloPrincipal = document.getElementById("nombre-asignatura-central");
        if (tituloPrincipal) {
            tituloPrincipal.innerText = asignatura.nombre;
        }

        // Construcción de la ruta dinámica y clicable
        var ruta = document.getElementById("migas-pan");
        if (ruta) {
            ruta.innerHTML = "<a href='#'>Página principal</a> > <a href='VistaAsignaturas.html'>Asignaturas</a> > <span>" + asignatura.nombre + "</span>";
        }
    }

    if (window.innerWidth <= 768) {
        var menu = document.getElementById("menu-lateral");
        if (menu) {
            menu.classList.remove("abierto");
        }
    }
}

function toggleMenu() {
    var menu = document.getElementById("menu-lateral");
    if (menu) {
        if (window.innerWidth <= 768) {
            menu.classList.remove("cerrado");
            menu.classList.toggle("abierto");
        } else {
            menu.classList.remove("abierto");
            menu.classList.toggle("cerrado");
        }
    }
}

window.toggleMenu = toggleMenu;

document.addEventListener("DOMContentLoaded", function() {
    cargarMenu();

    // Leemos la memoria al entrar a la página para mantener la asignatura anterior si existe
    var asignaturaGuardada = localStorage.getItem('asignaturaActiva');
    if (!asignaturaGuardada || !datosAsignaturas[asignaturaGuardada]) {
        asignaturaGuardada = Object.keys(datosAsignaturas)[0]; // Selecciona la primera por defecto
    }

    seleccionarAsignatura(asignaturaGuardada);
});