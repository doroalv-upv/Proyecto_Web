var estructuraCursos = [{
        id: "curso_1",
        nombre: "1º Desarrollo Multiplataforma",
        asignaturas: [
            { id: "asig_1", nombre: "Bases de Datos" },
            { id: "asig_2", nombre: "Lenguaje de Marcas" },
            { id: "asig_3", nombre: "Programación Web" }
        ]
    },
    {
        id: "curso_2",
        nombre: "2º Desarrollo Multiplataforma",
        asignaturas: [
            { id: "asig_4", nombre: "Desarrollo de Interfaces" },
            { id: "asig_5", nombre: "Sistemas de Gestión" },
            { id: "asig_6", nombre: "Matemáticas Avanzadas" }
        ]
    }
];

function obtenerNombreAsignatura(idBuscado) {
    for (var i = 0; i < estructuraCursos.length; i++) {
        for (var j = 0; j < estructuraCursos[i].asignaturas.length; j++) {
            if (estructuraCursos[i].asignaturas[j].id === idBuscado) {
                return estructuraCursos[i].asignaturas[j].nombre;
            }
        }
    }
    return "Asignatura";
}

function cargarMenu() {
    var contenedorMenu = document.getElementById("lista-asignaturas");
    if (!contenedorMenu) return;

    contenedorMenu.innerHTML = "";

    for (var i = 0; i < estructuraCursos.length; i++) {
        var curso = estructuraCursos[i];

        var btnCurso = document.createElement("button");
        btnCurso.className = "btn-curso-menu";
        btnCurso.innerText = curso.nombre;
        btnCurso.id = "btn_" + curso.id;

        btnCurso.onclick = (function(idCurso) {
            return function() {
                abrirCurso(idCurso);
            };
        })(curso.id);

        var divAsignaturas = document.createElement("div");
        divAsignaturas.className = "contenedor-asignaturas-menu";
        divAsignaturas.id = "contenedor_" + curso.id;

        for (var j = 0; j < curso.asignaturas.length; j++) {
            var asig = curso.asignaturas[j];
            var btnAsig = document.createElement("button");
            btnAsig.className = "btn-asignatura";
            btnAsig.innerText = asig.nombre;
            btnAsig.id = "btn_" + asig.id;

            btnAsig.onclick = (function(idAsig, idCurso) {
                return function() {
                    seleccionarAsignatura(idAsig, idCurso);
                };
            })(asig.id, curso.id);

            divAsignaturas.appendChild(btnAsig);
        }

        contenedorMenu.appendChild(btnCurso);
        contenedorMenu.appendChild(divAsignaturas);
    }
}

function abrirCurso(idCursoBuscado) {
    var todosLosContenedores = document.getElementsByClassName("contenedor-asignaturas-menu");
    var todosLosBotonesCurso = document.getElementsByClassName("btn-curso-menu");

    for (var i = 0; i < todosLosContenedores.length; i++) {
        var idContenedorActual = todosLosContenedores[i].id;

        if (idContenedorActual === "contenedor_" + idCursoBuscado) {
            if (todosLosContenedores[i].classList.contains("abierto")) {
                todosLosContenedores[i].classList.remove("abierto");
                todosLosBotonesCurso[i].classList.remove("activo");
            } else {
                todosLosContenedores[i].classList.add("abierto");
                todosLosBotonesCurso[i].classList.add("activo");
            }
        } else {
            todosLosContenedores[i].classList.remove("abierto");
            todosLosBotonesCurso[i].classList.remove("activo");
        }
    }
    localStorage.setItem("cursoActivo", idCursoBuscado);
}

function seleccionarAsignatura(idAsignatura, idCurso) {
    localStorage.setItem('asignaturaActiva', idAsignatura);
    localStorage.setItem('cursoActivo', idCurso);

    var nombreAsig = obtenerNombreAsignatura(idAsignatura);

    var tituloPrincipal = document.getElementById("nombre-asignatura-central");
    if (tituloPrincipal) {
        tituloPrincipal.innerText = nombreAsig;
    }

    var ruta = document.getElementById("migas-pan");
    if (ruta) {
        ruta.innerHTML = "<a href='#'>Página principal</a> > Asignaturas > <span>" + nombreAsig + "</span>";
    }

    var todosBotonesAsig = document.getElementsByClassName("btn-asignatura");
    for (var i = 0; i < todosBotonesAsig.length; i++) {
        todosBotonesAsig[i].classList.remove("activa");
    }

    var botonSeleccionado = document.getElementById("btn_" + idAsignatura);
    if (botonSeleccionado) {
        botonSeleccionado.classList.add("activa");
    }

    // Cerramos explícitamente en móvil sin alternar para evitar fallos de la flecha atrás
    if (window.innerWidth <= 768) {
        var menu = document.getElementById("menu-lateral");
        if (menu) {
            menu.classList.remove("abierto");
            localStorage.setItem("estadoMenuMovil", "cerrado");
        }
    }
}

function restaurarEstadoMenu() {
    var menu = document.getElementById("menu-lateral");
    if (!menu) return;

    if (window.innerWidth <= 768) {
        menu.classList.remove("abierto");
        localStorage.setItem("estadoMenuMovil", "cerrado");
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

    var asigGuardada = localStorage.getItem("asignaturaActiva") || estructuraCursos[0].asignaturas[0].id;
    var cursoGuardado = localStorage.getItem("cursoActivo") || estructuraCursos[0].id;

    var contenedorCurso = document.getElementById("contenedor_" + cursoGuardado);
    var botonCurso = document.getElementById("btn_" + cursoGuardado);
    if (contenedorCurso && botonCurso) {
        contenedorCurso.classList.add("abierto");
        botonCurso.classList.add("activo");
    }

    seleccionarAsignatura(asigGuardada, cursoGuardado);
});

// Cerrar el menú al tocar fuera
document.addEventListener("click", function(event) {
    if (window.innerWidth <= 768) {
        var menu = document.getElementById("menu-lateral");
        var btnHamburguesa = document.querySelector(".menu-hamburguesa-movil");

        if (menu && menu.classList.contains("abierto")) {
            if (!menu.contains(event.target) && btnHamburguesa && !btnHamburguesa.contains(event.target)) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    }
});