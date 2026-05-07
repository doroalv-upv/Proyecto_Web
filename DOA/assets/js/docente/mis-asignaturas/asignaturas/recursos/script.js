// Estado del modo borrado

let modoBorradoActivado = false;
let contadorRecursosTemporales = 1000;

function filtrarRecursos() {
    const buscador = document.getElementById("buscador-recursos");
    const filtro = document.getElementById("filtro-recursos");
    const estadoVacio = document.getElementById("estado-vacio");
    const tarjetas = document.querySelectorAll(".tarjeta-recurso");

    if (!buscador || !filtro || !estadoVacio) {
        return;
    }

    const textoBusqueda = buscador.value.trim().toLowerCase();
    const tipoFiltro = filtro.value.trim();

    let recursosVisibles = 0;

    tarjetas.forEach(function (tarjeta) {
        const tipo = (tarjeta.getAttribute("data-tipo") || "").trim();
        const nombre = (tarjeta.getAttribute("data-nombre") || "").toLowerCase();
        const autor = (tarjeta.getAttribute("data-autor") || "").toLowerCase();

        const coincideTexto =
            nombre.includes(textoBusqueda) ||
            autor.includes(textoBusqueda);

        const coincideTipo =
            tipoFiltro === "" || tipo === tipoFiltro;

        if (coincideTexto && coincideTipo) {
            tarjeta.style.display = "flex";
            recursosVisibles++;
        } else {
            tarjeta.style.display = "none";
        }
    });

    if (recursosVisibles === 0) {
        estadoVacio.style.display = "block";
    } else {
        estadoVacio.style.display = "none";
    }
}


// Devuelve la fecha actual

function obtenerFechaActual() {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();

    return dia + "/" + mes + "/" + anio;
}


// Crea una tarjeta nueva desde un archivo subido

function crearTarjetaRecurso(tipo, nombre, autor, fecha) {
    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta-recurso";
    tarjeta.setAttribute("data-id", "temp_" + contadorRecursosTemporales++);
    tarjeta.setAttribute("data-tipo", tipo);
    tarjeta.setAttribute("data-nombre", nombre);
    tarjeta.setAttribute("data-autor", autor);

    tarjeta.innerHTML = `
        <div class="tarjeta-izq">

            <div class="icono-recurso tipo-${tipo.toLowerCase()}">
                <span class="tipo-recurso">${tipo}</span>
            </div>

            <div class="info-principal">
                <span class="texto-tipo">Archivo ${tipo}</span>
                <span class="texto-nombre">${nombre}</span>
            </div>

        </div>

        <div class="tarjeta-der">
            <span class="texto-autor">${autor}</span>
            <span class="texto-fecha">${fecha}</span>
        </div>
    `;

    return tarjeta;
}


// Gestiona la subida visual de archivo

function manejarSubidaArchivo(archivo) {
    const partesNombre = archivo.name.split(".");

    if (partesNombre.length < 2) {
        return;
    }

    const extension = partesNombre[partesNombre.length - 1].toLowerCase();
    const contenedor = document.getElementById("contenedor-recursos");

    if (!contenedor) {
        return;
    }

    const tipo = extension.toUpperCase();
    const nombre = archivo.name;
    const autor = "Profesor";
    const fecha = obtenerFechaActual();

    const nuevaTarjeta = crearTarjetaRecurso(tipo, nombre, autor, fecha);

    contenedor.prepend(nuevaTarjeta);

    filtrarRecursos();
}


// Inicializa acciones de profesor: subir y borrar

function inicializarModoProfesor() {
    const botonBorrado = document.getElementById("btn-activar-borrado");
    const contenedorRecursos = document.getElementById("contenedor-recursos");
    const inputSubir = document.getElementById("input-subir-archivo");

    if (botonBorrado && contenedorRecursos) {
        botonBorrado.addEventListener("click", function () {
            modoBorradoActivado = !modoBorradoActivado;

            if (modoBorradoActivado) {
                botonBorrado.classList.add("activo");
                contenedorRecursos.classList.add("modo-borrado-activo");
            } else {
                botonBorrado.classList.remove("activo");
                contenedorRecursos.classList.remove("modo-borrado-activo");
            }
        });

        contenedorRecursos.addEventListener("click", function (evento) {
            if (!modoBorradoActivado) {
                return;
            }

            const tarjeta = evento.target.closest(".tarjeta-recurso");

            if (tarjeta) {
                tarjeta.remove();
                filtrarRecursos();
            }
        });
    }

    if (inputSubir) {
        inputSubir.addEventListener("change", function (evento) {
            const archivo = evento.target.files[0];

            if (!archivo) {
                return;
            }

            manejarSubidaArchivo(archivo);
            inputSubir.value = "";
        });
    }
}


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

function seleccionarAsignatura(idAsignatura, idCurso) {
    localStorage.setItem("asignaturaActiva", idAsignatura);
    localStorage.setItem("cursoActivo", idCurso);

    const estaEnPantallaPrincipal = document.getElementById("nombre-asignatura-central") !== null;

    if (estaEnPantallaPrincipal) {
        const botonSeleccionado = document.getElementById("btn_" + idAsignatura);
        const nombreAsig = botonSeleccionado ? botonSeleccionado.dataset.nombre : "Asignatura no encontrada";

        const tituloPrincipal = document.getElementById("nombre-asignatura-central");

        if (tituloPrincipal) {
            tituloPrincipal.innerText = nombreAsig;
        }

        const todosBotonesAsig = document.querySelectorAll(".btn-asignatura");

        todosBotonesAsig.forEach(function (boton) {
            boton.classList.remove("activa");
        });

        if (botonSeleccionado) {
            botonSeleccionado.classList.add("activa");
        }

        if (window.innerWidth <= 768) {
            const menu = document.getElementById("menu-lateral");

            if (menu) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    } else {
        window.location.href = "../index.php";
    }
}


// Restaura si el menú lateral estaba abierto o cerrado

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
}


// Restaura curso abierto y asignatura activa

function restaurarAsignaturaActiva() {
    const primeraAsignatura = document.querySelector(".btn-asignatura");
    const primerCurso = document.querySelector(".btn-curso-menu");

    const asigGuardada = localStorage.getItem("asignaturaActiva");
    const cursoGuardado = localStorage.getItem("cursoActivo");

    const idAsignatura = asigGuardada || (primeraAsignatura ? primeraAsignatura.id.replace("btn_", "") : "");
    const idCurso = cursoGuardado || (primerCurso ? primerCurso.id.replace("btn_", "") : "");

    const contenedorCurso = document.getElementById("contenedor_" + idCurso);
    const botonCurso = document.getElementById("btn_" + idCurso);
    const botonAsignatura = document.getElementById("btn_" + idAsignatura);

    if (contenedorCurso) {
        contenedorCurso.classList.add("abierto");
    }

    if (botonCurso) {
        botonCurso.classList.add("activo");
    }

    if (botonAsignatura) {
        botonAsignatura.classList.add("activa");
    }
}


// Abre y cierra menú lateral

function toggleMenu() {
    const menu = document.getElementById("menu-lateral");

    if (!menu) {
        return;
    }

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


// Funciones para onclick de PHP

window.toggleMenu = toggleMenu;
window.abrirCurso = abrirCurso;
window.seleccionarAsignatura = seleccionarAsignatura;


// Inicialización

document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador-recursos");
    const filtro = document.getElementById("filtro-recursos");

    restaurarEstadoMenu();
    restaurarAsignaturaActiva();
    inicializarModoProfesor();
    filtrarRecursos();

    if (buscador) {
        buscador.addEventListener("input", filtrarRecursos);
    }

    if (filtro) {
        filtro.addEventListener("change", filtrarRecursos);
    }
});


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