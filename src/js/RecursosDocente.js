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

var mockRecursos = [
    { tipo: 'PDF', nombre: '"Introducción al Arte Clásico"', autor: 'María Gómez', fecha: '10/05/2026' },
    { tipo: 'DOCX', nombre: '"Apuntes de repaso"', autor: 'Juan Pérez', fecha: '12/05/2026' },
    { tipo: 'ZIP', nombre: '"Material extra del tema 1"', autor: 'María Gómez', fecha: '15/05/2026' },
    { tipo: 'JPG', nombre: '"Esquema visual"', autor: 'Ana López', fecha: '18/05/2026' },
    { tipo: 'PNG', nombre: '"Diagrama de fases"', autor: 'Juan Pérez', fecha: '20/05/2026' }
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

function obtenerIconoSVG(tipo) {
    var color = "#333";
    if (tipo === 'PDF') color = "#C62828";
    if (tipo === 'DOCX') color = "#1565C0";
    if (tipo === 'ZIP') color = "#F9A825";
    if (tipo === 'JPG') color = "#2E7D32";
    if (tipo === 'PNG') color = "#C62828";
    return '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="4" stroke="' + color + '" stroke-width="2" fill="white"/><text x="20" y="24" fill="' + color + '" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">' + tipo + '</text></svg>';
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
                    localStorage.setItem('asignaturaActiva', idAsig);
                    localStorage.setItem('cursoActivo', idCurso);
                    window.location.href = 'VistaAsignaturas.html';
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

function renderizarRecursos() {
    var contenedor = document.getElementById("contenedor-recursos");
    var vacio = document.getElementById("estado-vacio");
    var buscador = document.getElementById("buscador-recursos");
    var filtro = document.getElementById("filtro-recursos");

    if (!contenedor || !vacio) return;

    var textoBusqueda = buscador ? buscador.value.toLowerCase() : "";
    var valorFiltro = filtro ? filtro.value : "";

    contenedor.innerHTML = "";
    var filtrados = mockRecursos.filter(function(r) {
        var textoOk = r.nombre.toLowerCase().indexOf(textoBusqueda) !== -1 || r.autor.toLowerCase().indexOf(textoBusqueda) !== -1;
        var filtroOk = valorFiltro === "" || r.tipo === valorFiltro;
        return textoOk && filtroOk;
    });

    if (filtrados.length === 0) {
        vacio.classList.remove("oculto");
    } else {
        vacio.classList.add("oculto");
        for (var j = 0; j < filtrados.length; j++) {
            var r = filtrados[j];
            var html = '<div class="tarjeta-recurso"><div class="tarjeta-izq"><div class="icono">' + obtenerIconoSVG(r.tipo) + '</div><div class="info-principal"><span class="texto-tipo">Archivo ' + r.tipo + '</span><span class="texto-nombre">' + r.nombre + '</span></div></div><div class="tarjeta-der"><span class="texto-autor">' + r.autor + '</span><span class="texto-fecha">' + r.fecha + '</span></div></div>';
            contenedor.innerHTML += html;
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
    var nombreAsig = obtenerNombreAsignatura(asigGuardada);

    document.getElementById("migas-pan").innerHTML = "<a href='#'>Página principal</a> > <a href='VistaAsignaturas.html'>Asignaturas</a> > <a href='VistaAsignaturas.html'>" + nombreAsig + "</a> > <span>Recursos</span>";

    var contenedorCurso = document.getElementById("contenedor_" + cursoGuardado);
    var botonCurso = document.getElementById("btn_" + cursoGuardado);
    if (contenedorCurso && botonCurso) {
        contenedorCurso.classList.add("abierto");
        botonCurso.classList.add("activo");
    }

    var btnActivo = document.getElementById("btn_" + asigGuardada);
    if (btnActivo) btnActivo.classList.add("activa");

    renderizarRecursos();

    var buscador = document.getElementById("buscador-recursos");
    if (buscador) buscador.addEventListener("input", renderizarRecursos);
    var filtro = document.getElementById("filtro-recursos");
    if (filtro) filtro.addEventListener("change", renderizarRecursos);
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