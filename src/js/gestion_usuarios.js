
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


const AVATAR_SVG = `
  <img 
    src="../imagenes/icono_perfil.svg"
    alt="Avatar"
    style="width:40px;height:40px;border-radius:50%;"
  >
`;


document.addEventListener("DOMContentLoaded", function () {

    const inputBusqueda = document.getElementById("input-busqueda");
    const selectRol = document.getElementById("select-rol");
    const listaUsuarios = document.getElementById("lista-usuarios");
    const mensajeVacio = document.getElementById("mensaje-vacio");

    const popupFicha = document.getElementById("popup-ficha-usuario");
    const btnCerrarPopup = document.getElementById("btn-cerrar-popup");

    // FICHA inputs
    const fichaNombre = document.getElementById("ficha-nombre");
    const fichaApellidos = document.getElementById("ficha-apellidos");
    const fichaDni = document.getElementById("ficha-dni");
    const fichaEmail = document.getElementById("ficha-email");
    const fichaRol = document.getElementById("ficha-rol");

    function pintarUsuarios(usuarios) {
        listaUsuarios.innerHTML = "";

        if (usuarios.length === 0) {
            mensajeVacio.classList.remove("oculto");
            return;
        }

        mensajeVacio.classList.add("oculto");

        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.className = "tarjeta-usuario";

            let inicialRol = usuario.rol[0].toUpperCase();

            li.innerHTML = `
                ${AVATAR_SVG}
                <span style="flex-grow:1;text-align:center">
                  ${usuario.nombre} ${usuario.apellidos}. ${usuario.dni}. ${inicialRol}
                </span>
            `;

            li.addEventListener("click", () => abrirFichaUsuario(usuario));
            listaUsuarios.appendChild(li);
        });
    }

    function filtrarUsuarios() {
        const texto = inputBusqueda.value.toLowerCase();
        const rol = selectRol.value;

        const filtrados = USUARIOS.filter(u => {
            if (rol && u.rol !== rol) return false;
            return (
                u.nombre.toLowerCase().includes(texto) ||
                u.apellidos.toLowerCase().includes(texto) ||
                u.dni.toLowerCase().includes(texto) ||
                u.email.toLowerCase().includes(texto)
            );
        });

        pintarUsuarios(filtrados);
    }

    function abrirFichaUsuario(usuario) {
        fichaNombre.value = usuario.nombre;
        fichaApellidos.value = usuario.apellidos;
        fichaDni.value = usuario.dni;
        fichaEmail.value = usuario.email;
        fichaRol.value = usuario.rol;

        popupFicha.showModal();
    }

    btnCerrarPopup.addEventListener("click", () => popupFicha.close());

    inputBusqueda.addEventListener("input", filtrarUsuarios);
    selectRol.addEventListener("change", filtrarUsuarios);

    pintarUsuarios(USUARIOS);
});

/* Permite editar al pulsar el icono del lapiz */
document.addEventListener("DOMContentLoaded", function () {

    const btnEditar = document.querySelector(".btn-editar");
    const inputs = document.querySelectorAll(".ficha-formulario input, .ficha-formulario select");

    if (!btnEditar || inputs.length === 0) return;

    let modoEdicion = false;

    btnEditar.addEventListener("click", function () {
        modoEdicion = !modoEdicion;

        inputs.forEach(input => {
            input.disabled = !modoEdicion;
        });
    });

});
/*Dar de alta/baja para cambiar de activo a inactivo*/

document.addEventListener("DOMContentLoaded", function () {

    const btnAlta = document.querySelector(".btn-accion.alta");
    const btnBaja = document.querySelector(".btn-accion.baja");
    const estadoTexto = document.querySelector(".estado");

    if (!btnAlta || !btnBaja || !estadoTexto) return;

    btnAlta.addEventListener("click", function () {
        estadoTexto.textContent = "Estado: Activo";
    });

    btnBaja.addEventListener("click", function () {
        estadoTexto.textContent = "Estado: Inactivo";
    });

});
