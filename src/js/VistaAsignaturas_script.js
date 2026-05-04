// 1. NUESTRA BASE DE DATOS FICTICIA (Mock Data)
var datosAsignaturas = {
    "asignatura_1": { nombre: "Matemáticas Avanzadas" },
    "asignatura_2": { nombre: "Lengua Castellana" },
    "asignatura_3": { nombre: "Historia del Arte" },
    "asignatura_4": { nombre: "Programación Web" }
};

// 2. FUNCIÓN PARA GENERAR LOS BOTONES DEL MENÚ AUTOMÁTICAMENTE
function cargarMenu() {
    var contenedorMenu = document.getElementById("lista-asignaturas");

    if (!contenedorMenu) return;

    contenedorMenu.innerHTML = "";

    Object.keys(datosAsignaturas).forEach(function(id) {
        var asignatura = datosAsignaturas[id];

        var boton = document.createElement("button");
        boton.className = "btn-asignatura";
        boton.innerText = asignatura.nombre;

        boton.onclick = function() {
            seleccionarAsignatura(id);
        };

        contenedorMenu.appendChild(boton);
    });
}

// 3. FUNCIÓN PARA ABRIR Y CERRAR EL MENÚ (Blindada)
function toggleMenu() {
    var menu = document.getElementById("menu-lateral");

    if (menu) {
        if (window.innerWidth <= 768) {
            // En móvil: nos aseguramos de que no tenga la clase de PC y activamos el Bottom Sheet
            menu.classList.remove("cerrado");
            menu.classList.toggle("abierto");
        } else {
            // En PC: quitamos la clase de móvil por si acaso y activamos la compresión
            menu.classList.remove("abierto");
            menu.classList.toggle("cerrado");
        }
    }
}

// 4. FUNCIÓN PARA CAMBIAR EL CONTENIDO DINÁMICAMENTE
function seleccionarAsignatura(id) {
    var asignatura = datosAsignaturas[id];

    if (asignatura) {
        var tituloPrincipal = document.getElementById("nombre-asignatura-central");
        if (tituloPrincipal) {
            tituloPrincipal.innerText = asignatura.nombre;
        }

        var ruta = document.getElementById("migas-pan");
        if (ruta) {
            ruta.innerText = "Página principal > " + asignatura.nombre;
        }
    }

    // Si estamos en móvil, cerramos el menú al hacer clic en una asignatura
    if (window.innerWidth <= 768) {
        var menu = document.getElementById("menu-lateral");
        if (menu) {
            menu.classList.remove("abierto");
        }
    }
}

// 5. INICIAR LA PÁGINA
window.onload = function() {
    cargarMenu();
    seleccionarAsignatura("asignatura_1");
};