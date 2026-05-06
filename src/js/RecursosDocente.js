var datosAsignaturas = {
    "asignatura_1": { nombre: "Matemáticas Avanzadas" },
    "asignatura_2": { nombre: "Lengua Castellana" },
    "asignatura_3": { nombre: "Historia del Arte" },
    "asignatura_4": { nombre: "Programación Web" }
};

var mockRecursos = [
    { tipo: 'PDF', nombre: '"Introducción al Arte Clásico"', autor: 'María Gómez', fecha: '10/05/2026' },
    { tipo: 'DOCX', nombre: '"Apuntes de repaso"', autor: 'Juan Pérez', fecha: '12/05/2026' },
    { tipo: 'ZIP', nombre: '"Material extra del tema 1"', autor: 'María Gómez', fecha: '15/05/2026' },
    { tipo: 'JPG', nombre: '"Esquema visual"', autor: 'Ana López', fecha: '18/05/2026' },
    { tipo: 'PNG', nombre: '"Diagrama de fases"', autor: 'Juan Pérez', fecha: '20/05/2026' }
];

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
    var contenedor = document.getElementById("lista-asignaturas");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    var keys = Object.keys(datosAsignaturas);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var boton = document.createElement("button");
        boton.className = "btn-asignatura";
        boton.innerText = datosAsignaturas[id].nombre;

        boton.onclick = (function(idSeleccionado) {
            return function() {
                // REDIRIGIMOS AUTOMÁTICAMENTE a la vista general de la asignatura
                localStorage.setItem('asignaturaActiva', idSeleccionado);
                window.location.href = 'VistaAsignaturas.html';
            };
        })(id);

        contenedor.appendChild(boton);
    }
}

function inicializarRecursos() {
    var asignaturaGuardada = localStorage.getItem('asignaturaActiva');
    if (!asignaturaGuardada || !datosAsignaturas[asignaturaGuardada]) {
        asignaturaGuardada = Object.keys(datosAsignaturas)[0];
    }

    var asignatura = datosAsignaturas[asignaturaGuardada];
    if (asignatura) {
        var ruta = document.getElementById("migas-pan");
        if (ruta) {
            // Construcción exacta solicitada: Página principal > Asignaturas > LA asignatura > Recursos
            ruta.innerHTML = "<a href='#'>Página principal</a> > <a href='VistaAsignaturas.html'>Asignaturas</a> > <a href='VistaAsignaturas.html'>" + asignatura.nombre + "</a> > <span>Recursos</span>";
        }
    }
    renderizarRecursos();
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
    inicializarRecursos();

    var buscador = document.getElementById("buscador-recursos");
    if (buscador) buscador.addEventListener("input", renderizarRecursos);

    var filtro = document.getElementById("filtro-recursos");
    if (filtro) filtro.addEventListener("change", renderizarRecursos);
});