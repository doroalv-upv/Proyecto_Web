
/* =================== SCRIPT DE GESTIÓN DE USUARIOS =================== */

const USUARIOS = [
    { id: 1, nombre: "Lief", apellidos: "Simants Dredge", dni: "01-9218611", email: "l.simdre@epsg.upv.es", rol: "alumno" },
    { id: 2, nombre: "Merline", apellidos: "Kirdsch Kampshell", dni: "04-1320191", email: "m.kirkam@epsg.upv.es", rol: "alumno" },
    { id: 3, nombre: "Debora", apellidos: "Rawstorne", dni: "05-9971924", email: "d.rawabc@epsg.upv.es", rol: "alumno" },
    { id: 4, nombre: "Kevan", apellidos: "Pounds Mainston", dni: "60-4525956", email: "k.poumai@upv.es", rol: "profesor" },
    { id: 5, nombre: "Luelle", apellidos: "Pridmore Starsmeare", dni: "64-6055365", email: "l.prista@upv.es", rol: "profesor" },
    { id: 6, nombre: "Eolande", apellidos: "Merriton Mizzi", dni: "64-6738133", email: "e.mermiz@upv.es", rol: "profesor" },
    { id: 7, nombre: "Ondrea", apellidos: "Brezlaw Sherwill", dni: "88-1316390", email: "o.breshe@upv.es", rol: "secretaria" },
    { id: 8, nombre: "Brooke", apellidos: "Malimoe Thomerson", dni: "91-1970980", email: "b.maltho@upv.es", rol: "secretaria" },
    { id: 9, nombre: "Daniel", apellidos: "Palacio", dni: "Sin DNI", email: "dapasa@har.upv.es", rol: "profesor" },
    { id: 10, nombre: "José Luis", apellidos: "Gimenez", dni: "Sin DNI", email: "jogilo@upvnet.upv.es", rol: "profesor" }
];

// Avatar
const AVATAR_SVG = `
<img src="img/icono_perfil.svg"
     style="width:40px;height:40px;flex-shrink:0;border-radius:50%;"
     alt="Avatar">
`;

document.addEventListener("DOMContentLoaded", function () {

    const inputBusqueda = document.getElementById("input-busqueda");
    const selectRol = document.getElementById("select-rol");
    const listaUsuarios = document.getElementById("lista-usuarios");
    const mensajeVacio = document.getElementById("mensaje-vacio");

    const btnHamburguesa = document.getElementById("btn-hamburguesa");
    const sidebar = document.getElementById("sidebar");

    const popupFicha = document.getElementById("popup-ficha-usuario");
    const btnCerrarPopup = document.getElementById("btn-cerrar-popup");
    const popupInfo = document.getElementById("popup-info-usuario");

    // Menú hamburguesa (solo si existe)
    if (btnHamburguesa && sidebar) {
        btnHamburguesa.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle("abierto");
            } else {
                sidebar.classList.toggle("cerrado");
            }
        });
    }

    function pintarUsuarios(usuarios) {
        listaUsuarios.innerHTML = "";

        if (usuarios.length === 0) {
            mensajeVacio.classList.remove("oculto");
            return;
        }

        mensajeVacio.classList.add("oculto");

        usuarios.forEach(function (usuario) {
            const li = document.createElement("li");
            li.className = "tarjeta-usuario";

            let inicialRol = "";
            if (usuario.rol === "alumno") inicialRol = "A";
            if (usuario.rol === "profesor") inicialRol = "P";
            if (usuario.rol === "secretaria") inicialRol = "S";

            const textoUsuario = `${usuario.nombre} ${usuario.apellidos}. ${usuario.dni}. ${inicialRol}`;

            li.innerHTML = `
                ${AVATAR_SVG}
                <span class="info-tarjeta" style="flex-grow:1;text-align:center;">
                    ${textoUsuario}
                </span>
            `;

            li.addEventListener("click", function () {
                abrirFichaUsuario(usuario);
            });

            listaUsuarios.appendChild(li);
        });
    }

    function filtrarUsuarios() {
        const texto = inputBusqueda.value.trim().toLowerCase();
        const rol = selectRol.value.trim().toLowerCase();

        const filtrados = USUARIOS.filter(function (usuario) {
            if (rol !== "" && usuario.rol !== rol) return false;

            if (texto !== "") {
                const nombreCompleto = (usuario.nombre + " " + usuario.apellidos).toLowerCase();
                const dniLower = usuario.dni.toLowerCase();
                const emailLower = usuario.email.toLowerCase();

                if (
                    !nombreCompleto.includes(texto) &&
                    !dniLower.includes(texto) &&
                    !emailLower.includes(texto)
                ) {
                    return false;
                }
            }
            return true;
        });

        pintarUsuarios(filtrados);
    }

    function abrirFichaUsuario(usuario) {
        if (popupInfo) {
            popupInfo.innerHTML = `
                <strong>Nombre:</strong> ${usuario.nombre}<br>
                <strong>Apellidos:</strong> ${usuario.apellidos}<br>
                <strong>DNI:</strong> ${usuario.dni}<br>
                <strong>Correo:</strong> ${usuario.email}<br>
                <strong>Rol:</strong> <span style="text-transform:capitalize;">${usuario.rol}</span>
            `;
        }

        popupFicha.showModal();
    }

    if (btnCerrarPopup) {
        btnCerrarPopup.addEventListener("click", function () {
            popupFicha.close();
        });
    }

    popupFicha.addEventListener("click", function (evento) {
        if (evento.target === popupFicha) {
            popupFicha.close();
        }
    });

    inputBusqueda.addEventListener("input", filtrarUsuarios);
    selectRol.addEventListener("change", filtrarUsuarios);

    pintarUsuarios(USUARIOS);
});

/* ====== ESTADO ACTIVO / INACTIVO ====== */
document.addEventListener("DOMContentLoaded", function () {

    const btnAlta = document.querySelector(".btn-accion.alta");
    const btnBaja = document.querySelector(".btn-accion.baja");
    const estadoTexto = document.querySelector(".estado");

    if (btnAlta && btnBaja && estadoTexto) {
        btnAlta.addEventListener("click", function () {
            estadoTexto.textContent = "Estado: Activo";
        });

        btnBaja.addEventListener("click", function () {
            estadoTexto.textContent = "Estado: Inactivo";
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {

    const btnEditar = document.querySelector(".btn-editar");
    const inputsFicha = document.querySelectorAll(".ficha-formulario input");

    if (btnEditar && inputsFicha.length > 0) {

        let editando = false;

        btnEditar.addEventListener("click", function () {
            editando = !editando;

            inputsFicha.forEach(input => {
                input.disabled = !editando;
            });
        });

    }

});
