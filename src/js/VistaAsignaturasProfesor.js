const asignaturasImpartidas = [{
        id: "curso_1",
        nombre: "1º Desarrollo Multiplataforma",
        asignaturas: [
            { id: "asig_1", nombre: "Bases de Datos" },
            { id: "asig_2", nombre: "Entornos de Desarrollo" } // Menos asignaturas, solo las que imparte el profe
        ]
    },
    {
        id: "curso_2",
        nombre: "2º Desarrollo Multiplataforma",
        asignaturas: [
            { id: "asig_4", nombre: "Desarrollo de Interfaces" }
        ]
    }
];

function obtenerNombreAsignatura(idBuscado) {
    let nombreEncontrado = "Asignatura";

    // Recorremos los arrays de forma limpia con forEach
    asignaturasImpartidas.forEach(function(curso) {
        curso.asignaturas.forEach(function(asig) {
            if (asig.id === idBuscado) {
                nombreEncontrado = asig.nombre;
            }
        });
    });

    return nombreEncontrado;
}

function cargarMenu() {
    const contenedorMenu = document.getElementById("lista-asignaturas");
    if (!contenedorMenu) return;

    contenedorMenu.innerHTML = "";

    asignaturasImpartidas.forEach(function(curso) {
        // 1. Creamos el botón del curso
        const btnCurso = document.createElement("button");
        btnCurso.className = "btn-curso-menu";
        btnCurso.innerText = curso.nombre;
        btnCurso.id = "btn_" + curso.id;

        btnCurso.addEventListener("click", function() {
            abrirCurso(curso.id);
        });

        // 2. Creamos el contenedor del acordeón
        const divAsignaturas = document.createElement("div");
        divAsignaturas.className = "contenedor-asignaturas-menu";
        divAsignaturas.id = "contenedor_" + curso.id;

        // 3. Rellenamos las asignaturas
        curso.asignaturas.forEach(function(asig) {
            const btnAsig = document.createElement("button");
            btnAsig.className = "btn-asignatura";
            btnAsig.innerText = asig.nombre;
            btnAsig.id = "btn_" + asig.id;

            btnAsig.addEventListener("click", function() {
                seleccionarAsignatura(asig.id, curso.id);
            });

            divAsignaturas.appendChild(btnAsig);
        });

        contenedorMenu.appendChild(btnCurso);
        contenedorMenu.appendChild(divAsignaturas);
    });
}

function abrirCurso(idCursoBuscado) {
    const todosLosContenedores = document.querySelectorAll(".contenedor-asignaturas-menu");
    const todosLosBotonesCurso = document.querySelectorAll(".btn-curso-menu");

    todosLosContenedores.forEach(function(contenedor, index) {
        const botonCorrespondiente = todosLosBotonesCurso[index];

        if (contenedor.id === "contenedor_" + idCursoBuscado) {
            contenedor.classList.toggle("abierto");
            botonCorrespondiente.classList.toggle("activo");
        } else {
            contenedor.classList.remove("abierto");
            botonCorrespondiente.classList.remove("activo");
        }
    });

    localStorage.setItem("cursoActivo", idCursoBuscado);
}

function seleccionarAsignatura(idAsignatura, idCurso) {
    // Guardamos la asignatura actual en la memoria del navegador
    localStorage.setItem('asignaturaActiva', idAsignatura);
    localStorage.setItem('cursoActivo', idCurso);

    const nombreAsig = obtenerNombreAsignatura(idAsignatura);

    // Cambiamos el H2 central
    const tituloPrincipal = document.getElementById("nombre-asignatura-central");
    if (tituloPrincipal) {
        tituloPrincipal.innerText = nombreAsig;
    }

    // Actualizamos las migas de pan apuntando a la vista del profesor
    const ruta = document.getElementById("migas-pan");
    if (ruta) {
        ruta.innerHTML = "<a href='#'>Página principal</a> > Asignaturas Impartidas > <span>" + nombreAsig + "</span>";
    }

    // Gestionamos la clase 'activa' visual en el menú
    const todosBotonesAsig = document.querySelectorAll(".btn-asignatura");
    todosBotonesAsig.forEach(function(boton) {
        boton.classList.remove("activa");
    });

    const botonSeleccionado = document.getElementById("btn_" + idAsignatura);
    if (botonSeleccionado) {
        botonSeleccionado.classList.add("activa");
    }

    // Cerramos el menú en móvil al seleccionar para mejorar la UX
    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        if (menu) {
            menu.classList.remove("abierto");
            localStorage.setItem("estadoMenuMovil", "cerrado");
        }
    }
}

function restaurarEstadoMenu() {
    const menu = document.getElementById("menu-lateral");
    if (!menu) return;

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

function toggleMenu() {
    const menu = document.getElementById("menu-lateral");
    if (menu) {
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
}
window.toggleMenu = toggleMenu;

// === INICIALIZACIÓN DE LA PÁGINA ===
document.addEventListener("DOMContentLoaded", function() {
    cargarMenu();
    restaurarEstadoMenu();

    // Leemos el localStorage o cogemos la primera asignatura por defecto
    const asigGuardada = localStorage.getItem("asignaturaActiva") || asignaturasImpartidas[0].asignaturas[0].id;
    const cursoGuardado = localStorage.getItem("cursoActivo") || asignaturasImpartidas[0].id;

    // Forzamos abrir el acordeón del curso en el que estábamos
    const contenedorCurso = document.getElementById("contenedor_" + cursoGuardado);
    const botonCurso = document.getElementById("btn_" + cursoGuardado);

    if (contenedorCurso && botonCurso) {
        contenedorCurso.classList.add("abierto");
        botonCurso.classList.add("activo");
    }

    // Activamos la asignatura
    seleccionarAsignatura(asigGuardada, cursoGuardado);
});

// Cierre del menú lateral si pulsamos fuera (solo en móvil)
document.addEventListener("click", function(event) {
    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        const btnHamburguesa = document.querySelector(".menu-hamburguesa-movil");

        if (menu && menu.classList.contains("abierto")) {
            if (!menu.contains(event.target) && btnHamburguesa && !btnHamburguesa.contains(event.target)) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    }
});