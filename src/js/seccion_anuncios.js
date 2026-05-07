const button = document.querySelectorAll(".opener-dialog");
const popup = document.querySelectorAll(".popup");
const botonesCerrar = document.querySelectorAll(".cerrar-popup");
const eliminarPopup = document.querySelectorAll(".eliminar-popup");

let accionActiva = null;
let anuncioSeleccionado = null;

/* ======================
   ICONOS EDITAR / ELIMINAR
   ====================== */
document.querySelectorAll(".icono-accion").forEach(icono => {
    icono.addEventListener("click", () => {

        accionActiva = icono.dataset.accion;

        // Feedback visual icono
        document.querySelectorAll(".icono-accion")
            .forEach(i => i.classList.remove("activo"));
        icono.classList.add("activo");

        activarModoSeleccion();
    });
});

/* ======================
   MODO SELECCIÓN
   ====================== */
function activarModoSeleccion() {
    document.querySelectorAll(".caja-anuncio").forEach(anuncio => {
        anuncio.classList.add("modo-seleccion");

        anuncio.onclick = () => {
            seleccionarAnuncio(anuncio);
        };
    });
}

function seleccionarAnuncio(anuncio) {

    anuncioSeleccionado = {
        id: anuncio.dataset.id,
        titulo: anuncio.dataset.titulo,
        contenido: anuncio.dataset.contenido
    };

    document.querySelectorAll(".caja-anuncio")
        .forEach(a => a.classList.remove("seleccionado"));
    anuncio.classList.add("seleccionado");

    abrirPopup();
}

/* ======================
   POPUPS
   ====================== */
function abrirPopup() {

    if (accionActiva === "eliminar") {
        document.getElementById("popup-eliminar").showModal();
    }

    if (accionActiva === "editar") {
        document.getElementById("editar-titulo").value =
            anuncioSeleccionado.titulo;

        document.getElementById("editar-contenido").value =
            anuncioSeleccionado.contenido;

        document.getElementById("popup-editar").showModal();
    }
}

/* ======================
   CERRAR POPUPS
   ====================== */
document.querySelectorAll(".cerrar-popup").forEach(boton => {
    boton.addEventListener("click", () => {
        boton.closest("dialog").close();
        salirModoSeleccion();
    });
});

/* ======================
   Desactivar estado
   ====================== */
function salirModoSeleccion() {
    accionActiva = null;
    anuncioSeleccionado = null;

    document.querySelectorAll(".icono-accion")
        .forEach(i => i.classList.remove("activo"));

    document.querySelectorAll(".caja-anuncio").forEach(a => {
        a.classList.remove("modo-seleccion", "seleccionado");
        a.onclick = null;
    });
}