// Base de datos de asignaturas para rellenar el menú
var datosAsignaturas = {
    "asignatura_1": { nombre: "Matemáticas Avanzadas" },
    "asignatura_2": { nombre: "Lengua Castellana" },
    "asignatura_3": { nombre: "Historia del Arte" },
    "asignatura_4": { nombre: "Programación Web" }
};

// Base de datos de recursos a mostrar
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
    if (tipo === 'DOCX' || tipo === 'DOC') color = "#1565C0";
    if (tipo === 'ZIP') color = "#F9A825";
    if (tipo === 'JPG') color = "#2E7D32";
    if (tipo === 'PNG') color = "#C62828";

    var svgString = '<svg width="40" height="40" viewBox="0 0 40 40">' +
        '<rect x="2" y="2" width="36" height="36" rx="4" stroke="' + color + '" stroke-width="2" fill="white"/>' +
        '<text x="20" y="24" fill="' + color + '" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">' + tipo + '</text>' +
        '</svg>';

    return svgString;
}

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
        contenedorMenu.appendChild(boton);
    }
}

// Función principal que lee el buscador y el filtro para dibujar la lista
function renderizarRecursos() {
    var contenedor = document.getElementById("contenedor-recursos");
    var vacio = document.getElementById("estado-vacio");
    var inputBusqueda = document.getElementById("buscador-recursos");
    var selectFiltro = document.getElementById("filtro-recursos");

    if (!contenedor || !vacio) return;

    var textoBusqueda = inputBusqueda ? inputBusqueda.value.toLowerCase() : "";
    var valorFiltro = selectFiltro ? selectFiltro.value : "";

    contenedor.innerHTML = "";

    // Lógica para filtrar: cruza el texto de búsqueda con el select
    var recursosFiltrados = mockRecursos.filter(function(r) {
        var coincideTexto = r.nombre.toLowerCase().indexOf(textoBusqueda) !== -1 || r.autor.toLowerCase().indexOf(textoBusqueda) !== -1;
        var coincideFiltro = valorFiltro === "" || r.tipo === valorFiltro;
        return coincideTexto && coincideFiltro;
    });

    if (recursosFiltrados.length === 0) {
        vacio.classList.remove("oculto");
    } else {
        vacio.classList.add("oculto");

        for (var j = 0; j < recursosFiltrados.length; j++) {
            var r = recursosFiltrados[j];

            var html = '<div class="tarjeta-recurso">' +
                '<div class="tarjeta-izq">' +
                '<div class="icono">' + obtenerIconoSVG(r.tipo) + '</div>' +
                '<div class="info-principal">' +
                '<span class="texto-tipo">Archivo ' + r.tipo + '</span>' +
                '<span class="texto-nombre">' + r.nombre + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="tarjeta-der">' +
                '<span class="texto-autor">' + r.autor + '</span>' +
                '<span class="texto-fecha">' + r.fecha + '</span>' +
                '</div>' +
                '</div>';

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
    renderizarRecursos();

    // Eventos para actualizar la lista en tiempo real al escribir o filtrar
    var inputBusqueda = document.getElementById("buscador-recursos");
    var selectFiltro = document.getElementById("filtro-recursos");

    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", renderizarRecursos);
    }
    if (selectFiltro) {
        selectFiltro.addEventListener("change", renderizarRecursos);
    }
});