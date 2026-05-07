// Gestión visual de anuncios del docente para demo

document.addEventListener("DOMContentLoaded", function () {
    const contenedorAnuncios = document.getElementById("contenedor-anuncios-docente");

    const botonAbrirAnadir = document.getElementById("abrir-modal-anadir");

    const modalAnuncio = document.getElementById("modal-anuncio-docente");
    const formularioAnuncio = document.getElementById("formulario-anuncio-docente");
    const tituloModal = document.getElementById("titulo-modal-anuncio");
    const modoModal = document.getElementById("modo-modal-anuncio");

    const campoTitulo = document.getElementById("campo-titulo-anuncio");
    const campoAsignatura = document.getElementById("campo-asignatura-anuncio");
    const campoContenido = document.getElementById("campo-contenido-anuncio");

    const botonCerrarModal = document.getElementById("cerrar-modal-anuncio");

    const modalEliminar = document.getElementById("modal-eliminar-anuncio");
    const botonCancelarEliminar = document.getElementById("cancelar-eliminar-anuncio");
    const botonConfirmarEliminar = document.getElementById("confirmar-eliminar-anuncio");

    let tarjetaEditando = null;
    let tarjetaEliminando = null;

    function obtenerFechaActual() {
        const fecha = new Date();

        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const anio = fecha.getFullYear();

        return `${dia}/${mes}/${anio}`;
    }

    function abrirModalAnadir() {
        tarjetaEditando = null;

        tituloModal.textContent = "Añadir anuncio";
        modoModal.value = "anadir";

        campoTitulo.value = "";
        campoAsignatura.value = "";
        campoContenido.value = "";

        modalAnuncio.showModal();
    }

    function abrirModalEditar(tarjeta) {
        tarjetaEditando = tarjeta;

        const titulo = tarjeta.querySelector(".datos-anuncio-docente h2").textContent.trim();
        const asignatura = tarjeta.querySelector(".datos-anuncio-docente p").textContent.trim();
        const contenido = tarjeta.querySelector(".contenido-anuncio-docente p").textContent.trim();

        tituloModal.textContent = "Editar anuncio";
        modoModal.value = "editar";

        campoTitulo.value = titulo;
        campoAsignatura.value = asignatura;
        campoContenido.value = contenido;

        modalAnuncio.showModal();
    }

    function crearTarjetaAnuncio(titulo, asignatura, contenido) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-anuncio-docente";

        tarjeta.innerHTML = `
            <header class="datos-anuncio-docente">
                <div>
                    <h2></h2>
                    <p></p>
                </div>

                <div class="meta-anuncio-docente">
                    <span>Docente</span>
                    <span>${obtenerFechaActual()}</span>
                </div>
            </header>

            <div class="contenido-anuncio-docente">
                <p></p>
            </div>

            <footer class="acciones-anuncio-docente">
                <button type="button" class="boton-editar-anuncio">
                    Editar
                </button>

                <button type="button" class="boton-eliminar-anuncio">
                    Eliminar
                </button>
            </footer>
        `;

        tarjeta.querySelector(".datos-anuncio-docente h2").textContent = titulo;
        tarjeta.querySelector(".datos-anuncio-docente p").textContent = asignatura;
        tarjeta.querySelector(".contenido-anuncio-docente p").textContent = contenido;

        return tarjeta;
    }

    function guardarAnuncio(evento) {
        evento.preventDefault();

        const titulo = campoTitulo.value.trim();
        const asignatura = campoAsignatura.value.trim();
        const contenido = campoContenido.value.trim();

        if (titulo === "" || asignatura === "" || contenido === "") {
            return;
        }

        if (modoModal.value === "editar" && tarjetaEditando !== null) {
            tarjetaEditando.querySelector(".datos-anuncio-docente h2").textContent = titulo;
            tarjetaEditando.querySelector(".datos-anuncio-docente p").textContent = asignatura;
            tarjetaEditando.querySelector(".contenido-anuncio-docente p").textContent = contenido;
        } else {
            const nuevaTarjeta = crearTarjetaAnuncio(titulo, asignatura, contenido);
            contenedorAnuncios.prepend(nuevaTarjeta);
        }

        modalAnuncio.close();
    }

    function abrirModalEliminar(tarjeta) {
        tarjetaEliminando = tarjeta;
        modalEliminar.showModal();
    }

    function eliminarAnuncio() {
        if (tarjetaEliminando !== null) {
            tarjetaEliminando.remove();
            tarjetaEliminando = null;
        }

        modalEliminar.close();
    }

    if (botonAbrirAnadir) {
        botonAbrirAnadir.addEventListener("click", abrirModalAnadir);
    }

    if (botonCerrarModal) {
        botonCerrarModal.addEventListener("click", function () {
            modalAnuncio.close();
        });
    }

    if (formularioAnuncio) {
        formularioAnuncio.addEventListener("submit", guardarAnuncio);
    }

    if (botonCancelarEliminar) {
        botonCancelarEliminar.addEventListener("click", function () {
            tarjetaEliminando = null;
            modalEliminar.close();
        });
    }

    if (botonConfirmarEliminar) {
        botonConfirmarEliminar.addEventListener("click", eliminarAnuncio);
    }

    if (contenedorAnuncios) {
        contenedorAnuncios.addEventListener("click", function (evento) {
            const botonEditar = evento.target.closest(".boton-editar-anuncio");
            const botonEliminar = evento.target.closest(".boton-eliminar-anuncio");

            if (botonEditar !== null) {
                const tarjeta = botonEditar.closest(".tarjeta-anuncio-docente");
                abrirModalEditar(tarjeta);
            }

            if (botonEliminar !== null) {
                const tarjeta = botonEliminar.closest(".tarjeta-anuncio-docente");
                abrirModalEliminar(tarjeta);
            }
        });
    }

    restaurarEstadoMenu();
});


// Abre y cierra un curso del menú lateral

function abrirCurso(idCursoBuscado) {
    const todosLosContenedores = document.querySelectorAll(".contenedor-asignaturas-menu");
    const todosLosBotonesCurso = document.querySelectorAll(".btn-curso-menu");

    todosLosContenedores.forEach(function (contenedor, index) {
        const botonCorrespondiente = todosLosBotonesCurso[index];

        if (contenedor.id === "contenedor_" + idCursoBuscado) {
            contenedor.classList.toggle("abierto");

            if (botonCorrespondiente) {
                botonCorrespondiente.classList.toggle("activo");
            }
        } else {
            contenedor.classList.remove("abierto");

            if (botonCorrespondiente) {
                botonCorrespondiente.classList.remove("activo");
            }
        }
    });

    localStorage.setItem("cursoActivo", idCursoBuscado);
}


// Selecciona una asignatura del menú lateral

// Selecciona una asignatura del menú lateral

function seleccionarAsignatura(idAsignatura, idCurso) {
    localStorage.setItem("asignaturaActiva", idAsignatura);
    localStorage.setItem("cursoActivo", idCurso);

    window.location.href = "../index.php";
}


// Restaura el estado del menú lateral

function restaurarEstadoMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

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

    const cursoGuardado = localStorage.getItem("cursoActivo");
    const asigGuardada = localStorage.getItem("asignaturaActiva");

    if (cursoGuardado) {
        const contenedorCurso = document.getElementById("contenedor_" + cursoGuardado);
        const botonCurso = document.getElementById("btn_" + cursoGuardado);

        if (contenedorCurso) {
            contenedorCurso.classList.add("abierto");
        }

        if (botonCurso) {
            botonCurso.classList.add("activo");
        }
    }

    if (asigGuardada) {
        const botonAsignatura = document.getElementById("btn_" + asigGuardada);

        if (botonAsignatura) {
            botonAsignatura.classList.add("activa");
        }
    }
}


// Abre y cierra el menú lateral

function toggleMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

    if (window.innerWidth <= 768) {
        menu.classList.toggle("abierto");

        if (menu.classList.contains("abierto")) {
            localStorage.setItem("estadoMenuMovil", "abierto");
        } else {
            localStorage.setItem("estadoMenuMovil", "cerrado");
        }
    } else {
        menu.classList.toggle("cerrado");

        if (menu.classList.contains("cerrado")) {
            localStorage.setItem("estadoMenuPC", "cerrado");
        } else {
            localStorage.setItem("estadoMenuPC", "abierto");
        }
    }
}


// Dejar funciones disponibles para los onclick del PHP

window.toggleMenu = toggleMenu;
window.abrirCurso = abrirCurso;
window.seleccionarAsignatura = seleccionarAsignatura;


// Cierra el menú en móvil si se pulsa fuera

document.addEventListener("click", function (evento) {
    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        const botonMenuMovil = document.querySelector(".boton-menu-movil");

        if (menu && menu.classList.contains("abierto")) {
            if (!menu.contains(evento.target) && botonMenuMovil && !botonMenuMovil.contains(evento.target)) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    }
});