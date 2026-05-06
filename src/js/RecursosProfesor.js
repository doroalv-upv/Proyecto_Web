// Usamos const porque la estructura general no se va a reasignar
const estructuraCursos = [{
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

// Añadimos 'id' a cada recurso. Esto es vital para saber exactamente cuál borrar después.
const mockRecursos = [
    { id: 1, tipo: 'PDF', nombre: '"Introducción al Arte Clásico"', autor: 'María Gómez', fecha: '10/05/2026' },
    { id: 2, tipo: 'DOCX', nombre: '"Apuntes de repaso"', autor: 'Juan Pérez', fecha: '12/05/2026' },
    { id: 3, tipo: 'ZIP', nombre: '"Material extra del tema 1"', autor: 'María Gómez', fecha: '15/05/2026' },
    { id: 4, tipo: 'JPG', nombre: '"Esquema visual"', autor: 'Ana López', fecha: '18/05/2026' },
    { id: 5, tipo: 'PNG', nombre: '"Diagrama de fases"', autor: 'Juan Pérez', fecha: '20/05/2026' }
];

// Variables de estado (usamos let porque irán cambiando)
let contadorIdRecursos = 6;
let modoBorradoActivado = false;

function obtenerNombreAsignatura(idBuscado) {
    let nombreEncontrado = "Asignatura no encontrada";
    // Usamos forEach para recorrer arrays de forma más limpia que con for (let i = 0...)
    estructuraCursos.forEach(function(curso) {
        curso.asignaturas.forEach(function(asig) {
            if (asig.id === idBuscado) {
                nombreEncontrado = asig.nombre;
            }
        });
    });
    return nombreEncontrado;
}

function obtenerIconoSVG(tipo) {
    let color = "#333";
    if (tipo === 'PDF') color = "#C62828";
    if (tipo === 'DOCX') color = "#1565C0";
    if (tipo === 'ZIP') color = "#F9A825";
    if (tipo === 'JPG') color = "#2E7D32";
    if (tipo === 'PNG') color = "#C62828";

    return '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="4" stroke="' + color + '" stroke-width="2" fill="white"/><text x="20" y="24" fill="' + color + '" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">' + tipo + '</text></svg>';
}

function cargarMenu() {
    const contenedorMenu = document.getElementById("lista-asignaturas");
    if (!contenedorMenu) return;

    contenedorMenu.innerHTML = "";

    estructuraCursos.forEach(function(curso) {
        const btnCurso = document.createElement("button");
        btnCurso.className = "btn-curso-menu";
        btnCurso.innerText = curso.nombre;
        btnCurso.id = "btn_" + curso.id;

        btnCurso.addEventListener("click", function() {
            abrirCurso(curso.id);
        });

        const divAsignaturas = document.createElement("div");
        divAsignaturas.className = "contenedor-asignaturas-menu";
        divAsignaturas.id = "contenedor_" + curso.id;

        curso.asignaturas.forEach(function(asig) {
            const btnAsig = document.createElement("button");
            btnAsig.className = "btn-asignatura";
            btnAsig.innerText = asig.nombre;
            btnAsig.id = "btn_" + asig.id;

            btnAsig.addEventListener("click", function() {
                localStorage.setItem('asignaturaActiva', asig.id);
                localStorage.setItem('cursoActivo', curso.id);
                window.location.href = 'VistaAsignaturasProfesor.html';
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

// Pintar la lista de archivos
function renderizarRecursos() {
    const contenedor = document.getElementById("contenedor-recursos");
    const vacio = document.getElementById("estado-vacio");
    const buscador = document.getElementById("buscador-recursos");
    const filtro = document.getElementById("filtro-recursos");

    if (!contenedor || !vacio) return;

    const textoBusqueda = buscador ? buscador.value.toLowerCase() : "";
    const valorFiltro = filtro ? filtro.value : "";

    contenedor.innerHTML = "";

    // .filter crea un nuevo array solo con los elementos que cumplan la condición (return true)
    const filtrados = mockRecursos.filter(function(recurso) {
        const textoOk = recurso.nombre.toLowerCase().includes(textoBusqueda) || recurso.autor.toLowerCase().includes(textoBusqueda);
        const filtroOk = valorFiltro === "" || recurso.tipo === valorFiltro;
        return textoOk && filtroOk;
    });

    if (filtrados.length === 0) {
        vacio.classList.remove("oculto");
    } else {
        vacio.classList.add("oculto");

        filtrados.forEach(function(recurso) {
            // Inyectamos el data-id en el div para poder rescatarlo al hacer clic (para borrar)
            const html = `
                <div class="tarjeta-recurso" data-id="${recurso.id}">
                    <div class="tarjeta-izq">
                        <div class="icono">${obtenerIconoSVG(recurso.tipo)}</div>
                        <div class="info-principal">
                            <span class="texto-tipo">Archivo ${recurso.tipo}</span>
                            <span class="texto-nombre">${recurso.nombre}</span>
                        </div>
                    </div>
                    <div class="tarjeta-der">
                        <span class="texto-autor">${recurso.autor}</span>
                        <span class="texto-fecha">${recurso.fecha}</span>
                    </div>
                </div>
            `;
            contenedor.insertAdjacentHTML('beforeend', html);
        });
    }
}

// === LÓGICA EXCLUSIVA DEL PROFESOR ===

function inicializarModoProfesor() {
    const btnPapelera = document.getElementById("btn-activar-borrado");
    const contenedorLista = document.getElementById("contenedor-recursos");
    const inputSubir = document.getElementById("input-subir-archivo");

    // 1. Botón para activar/desactivar la destrucción de archivos
    if (btnPapelera) {
        btnPapelera.addEventListener("click", function() {
            modoBorradoActivado = !modoBorradoActivado; // Invertimos el estado (true/false)

            btnPapelera.classList.toggle("activo", modoBorradoActivado);

            // Le pasamos la clase al contenedor. El CSS se encargará de poner rojas las tarjetas
            if (modoBorradoActivado) {
                contenedorLista.classList.add("modo-borrado-activo");
            } else {
                contenedorLista.classList.remove("modo-borrado-activo");
            }
        });
    }

    // 2. Delegación de eventos. Escuchamos al padre en vez de a cada hijo. Ahorra memoria.
    if (contenedorLista) {
        contenedorLista.addEventListener("click", function(event) {
            if (!modoBorradoActivado) return; // Si no está rojo, no borramos nada

            // Buscamos si el clic fue dentro de algo que tenga la clase .tarjeta-recurso
            const tarjetaClicada = event.target.closest(".tarjeta-recurso");

            if (tarjetaClicada) {
                // Recuperamos el ID que guardamos en el HTML (es un string, lo pasamos a Int)
                const idParaBorrar = parseInt(tarjetaClicada.getAttribute("data-id"));
                borrarRecurso(idParaBorrar);
            }
        });
    }

    // 3. Capturamos cuando el profesor selecciona un archivo de su ordenador
    if (inputSubir) {
        inputSubir.addEventListener("change", function(event) {
            const archivo = event.target.files[0];
            if (!archivo) return;

            manejarSubidaArchivo(archivo);
            inputSubir.value = ""; // Vaciamos por si quiere subir el mismo archivo después
        });
    }
}

function borrarRecurso(idBuscado) {
    let indiceEncontrado = -1;
    mockRecursos.forEach(function(recurso, index) {
        if (recurso.id === idBuscado) {
            indiceEncontrado = index;
        }
    });

    // Splice elimina un elemento de un array sabiendo su posición
    if (indiceEncontrado !== -1) {
        mockRecursos.splice(indiceEncontrado, 1);
        renderizarRecursos();
    }
}

function manejarSubidaArchivo(archivo) {
    const tamanioMaximoMB = 20;
    const tamanioMaximoBytes = tamanioMaximoMB * 1024 * 1024; // MB a Bytes
    const formatosPermitidos = ['pdf', 'docx', 'zip', 'jpg', 'png'];

    if (archivo.size > tamanioMaximoBytes) {
        mostrarMensajeToast("El archivo supera el límite de 20 MB");
        return;
    }

    const nombreSeparado = archivo.name.split('.');
    const extension = nombreSeparado[nombreSeparado.length - 1].toLowerCase();

    // .includes verifica si la extensión está dentro de nuestro array de permitidos
    if (!formatosPermitidos.includes(extension)) {
        mostrarMensajeToast("Formato no soportado");
        return;
    }

    const nuevoRecurso = {
        id: contadorIdRecursos++,
        tipo: extension.toUpperCase(),
        nombre: `"${archivo.name}"`,
        autor: 'Profesor (Tú)',
        fecha: new Date().toLocaleDateString('es-ES')
    };

    // unshift lo mete en la posición 0 del array (arriba del todo en la lista)
    mockRecursos.unshift(nuevoRecurso);
    renderizarRecursos();
}

function mostrarMensajeToast(textoMensaje) {
    const contenedor = document.getElementById("contenedor-mensajes");
    if (!contenedor) return;

    const toast = document.createElement("div");
    toast.className = "mensaje-toast";
    toast.innerText = textoMensaje;

    contenedor.appendChild(toast);

    // Borramos el elemento del DOM pasados 3.5 segundos
    setTimeout(function() {
        if (contenedor.contains(toast)) {
            contenedor.removeChild(toast);
        }
    }, 3500);
}

// === CONTROL DEL MENÚ ===
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


document.addEventListener("DOMContentLoaded", function() {
    cargarMenu();
    restaurarEstadoMenu();
    inicializarModoProfesor();

    const asigGuardada = localStorage.getItem("asignaturaActiva") || estructuraCursos[0].asignaturas[0].id;
    const cursoGuardado = localStorage.getItem("cursoActivo") || estructuraCursos[0].id;
    const nombreAsig = obtenerNombreAsignatura(asigGuardada);

    const migas = document.getElementById("migas-pan");
    if (migas) {
        migas.innerHTML = `<a href='#'>Página principal</a> > <a href='VistaAsignaturasProfesor.html'>Asignaturas</a> > <a href='VistaAsignaturasProfesor.html'>${nombreAsig}</a> > <span>Recursos</span>`;
    }

    const contenedorCurso = document.getElementById("contenedor_" + cursoGuardado);
    const botonCurso = document.getElementById("btn_" + cursoGuardado);
    if (contenedorCurso && botonCurso) {
        contenedorCurso.classList.add("abierto");
        botonCurso.classList.add("activo");
    }

    const btnActivo = document.getElementById("btn_" + asigGuardada);
    if (btnActivo) {
        btnActivo.classList.add("activa");
    }

    renderizarRecursos();

    const buscador = document.getElementById("buscador-recursos");
    if (buscador) {
        buscador.addEventListener("input", renderizarRecursos);
    }

    const filtro = document.getElementById("filtro-recursos");
    if (filtro) {
        filtro.addEventListener("change", renderizarRecursos);
    }
});

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