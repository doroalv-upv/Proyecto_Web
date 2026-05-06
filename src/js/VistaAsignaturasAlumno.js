// Usamos 'const' para los datos porque no van a cambiar durante la ejecución
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

// Función de apoyo para sacar el nombre de la asignatura sabiendo solo su ID
function obtenerNombreAsignatura(idBuscado) {
    let nombreEncontrado = "Asignatura no encontrada";

    // Recorremos los cursos y dentro de cada curso, sus asignaturas
    estructuraCursos.forEach(function(curso) {
        curso.asignaturas.forEach(function(asig) {
            if (asig.id === idBuscado) {
                nombreEncontrado = asig.nombre;
            }
        });
    });

    return nombreEncontrado;
}

// Pinta el menú de la izquierda leyendo el array de datos
function cargarMenu() {
    const contenedorMenu = document.getElementById("lista-asignaturas");
    if (!contenedorMenu) return; // Si no existe el contenedor, salimos para no dar error

    contenedorMenu.innerHTML = ""; // Limpiamos por si acaso

    // Iteramos sobre cada curso
    estructuraCursos.forEach(function(curso) {
        // 1. Creamos el botón principal del curso
        const btnCurso = document.createElement("button");
        btnCurso.className = "btn-curso-menu";
        btnCurso.innerText = curso.nombre;
        btnCurso.id = "btn_" + curso.id;

        // Al hacer clic, ejecuta la función del acordeón
        btnCurso.addEventListener("click", function() {
            abrirCurso(curso.id);
        });

        // 2. Creamos el div que contendrá las asignaturas (el que se oculta/muestra)
        const divAsignaturas = document.createElement("div");
        divAsignaturas.className = "contenedor-asignaturas-menu";
        divAsignaturas.id = "contenedor_" + curso.id;

        // 3. Iteramos las asignaturas de este curso concreto
        curso.asignaturas.forEach(function(asig) {
            const btnAsig = document.createElement("button");
            btnAsig.className = "btn-asignatura";
            btnAsig.innerText = asig.nombre;
            btnAsig.id = "btn_" + asig.id;

            // Al hacer clic, seleccionamos la asignatura
            btnAsig.addEventListener("click", function() {
                seleccionarAsignatura(asig.id, curso.id);
            });

            divAsignaturas.appendChild(btnAsig);
        });

        // Metemos el botón del curso y su caja de asignaturas en el menú
        contenedorMenu.appendChild(btnCurso);
        contenedorMenu.appendChild(divAsignaturas);
    });
}

// Controla el efecto acordeón: abre el curso pulsado y cierra los demás
function abrirCurso(idCursoBuscado) {
    const todosLosContenedores = document.querySelectorAll(".contenedor-asignaturas-menu");
    const todosLosBotonesCurso = document.querySelectorAll(".btn-curso-menu");

    // Recorremos todos los contenedores usando el índice para coincidir con su botón
    todosLosContenedores.forEach(function(contenedor, index) {
        const botonCorrespondiente = todosLosBotonesCurso[index];

        if (contenedor.id === "contenedor_" + idCursoBuscado) {
            // Alternamos las clases (si está abierto lo cierra y viceversa)
            contenedor.classList.toggle("abierto");
            botonCorrespondiente.classList.toggle("activo");
        } else {
            // Cerramos forzosamente los que no hemos tocado
            contenedor.classList.remove("abierto");
            botonCorrespondiente.classList.remove("activo");
        }
    });

    // Guardamos en memoria qué curso hemos dejado abierto
    localStorage.setItem("cursoActivo", idCursoBuscado);
}

// Se ejecuta al pulsar una asignatura concreta
function seleccionarAsignatura(idAsignatura, idCurso) {
    // Guardamos la info en localStorage para que la recuerde si cambiamos de página
    localStorage.setItem('asignaturaActiva', idAsignatura);
    localStorage.setItem('cursoActivo', idCurso);

    const nombreAsig = obtenerNombreAsignatura(idAsignatura);

    // Pintamos el título en el centro de la pantalla
    const tituloPrincipal = document.getElementById("nombre-asignatura-central");
    if (tituloPrincipal) {
        tituloPrincipal.innerText = nombreAsig;
    }

    // Actualizamos las migas de pan (breadcrumb)
    const ruta = document.getElementById("migas-pan");
    if (ruta) {
        ruta.innerHTML = "<a href='#'>Página principal</a> > Asignaturas > <span>" + nombreAsig + "</span>";
    }

    // Quitamos la clase 'activa' a todos los botones de asignatura
    const todosBotonesAsig = document.querySelectorAll(".btn-asignatura");
    todosBotonesAsig.forEach(function(boton) {
        boton.classList.remove("activa");
    });

    // Se la ponemos solo al que hemos clicado
    const botonSeleccionado = document.getElementById("btn_" + idAsignatura);
    if (botonSeleccionado) {
        botonSeleccionado.classList.add("activa");
    }

    // Detalle importante para móvil: Cerramos el menú al elegir para que no moleste
    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        if (menu) {
            menu.classList.remove("abierto");
            localStorage.setItem("estadoMenuMovil", "cerrado");
        }
    }
}

// Revisa si el menú estaba abierto o cerrado al cargar la página
function restaurarEstadoMenu() {
    const menu = document.getElementById("menu-lateral");
    if (!menu) return;

    if (window.innerWidth <= 768) {
        // En móvil lo obligamos a empezar cerrado siempre para evitar bugs con el botón 'atrás'
        menu.classList.remove("abierto");
        localStorage.setItem("estadoMenuMovil", "cerrado");
    } else {
        // En PC leemos qué hizo el usuario por última vez
        const estadoPC = localStorage.getItem("estadoMenuPC");
        if (estadoPC === "cerrado") {
            menu.classList.add("cerrado");
        } else {
            menu.classList.remove("cerrado");
        }
    }
}

// Abre y cierra el menú lateral
function toggleMenu() {
    const menu = document.getElementById("menu-lateral");
    if (menu) {
        if (window.innerWidth <= 768) {
            menu.classList.toggle("abierto");
            // Guardamos el nuevo estado
            const estaAbierto = menu.classList.contains("abierto");
            localStorage.setItem("estadoMenuMovil", estaAbierto ? "abierto" : "cerrado");
        } else {
            menu.classList.toggle("cerrado");
            // Guardamos el nuevo estado
            const estaCerrado = menu.classList.contains("cerrado");
            localStorage.setItem("estadoMenuPC", estaCerrado ? "cerrado" : "abierto");
        }
    }
}

// Necesario para que el HTML pueda llamar a esta función desde el onclick
window.toggleMenu = toggleMenu;

// === EVENTOS INICIALES ===
// Cuando el HTML termina de cargar, arrancamos la aplicación
document.addEventListener("DOMContentLoaded", function() {
    cargarMenu();
    restaurarEstadoMenu();

    // Leemos la memoria. Si no hay nada (primera vez), cogemos la primera asig del primer curso
    const asigGuardada = localStorage.getItem("asignaturaActiva") || estructuraCursos[0].asignaturas[0].id;
    const cursoGuardado = localStorage.getItem("cursoActivo") || estructuraCursos[0].id;

    // Desplegamos el curso guardado en el acordeón
    const contenedorCurso = document.getElementById("contenedor_" + cursoGuardado);
    const botonCurso = document.getElementById("btn_" + cursoGuardado);

    if (contenedorCurso && botonCurso) {
        contenedorCurso.classList.add("abierto");
        botonCurso.classList.add("activo");
    }

    // Seleccionamos la asignatura guardada
    seleccionarAsignatura(asigGuardada, cursoGuardado);
});

// === MEJORA DE UX MÓVIL ===
// Cierra el menú si el usuario toca la pantalla fuera del propio menú
document.addEventListener("click", function(event) {
    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        const btnHamburguesa = document.querySelector(".menu-hamburguesa-movil");

        if (menu && menu.classList.contains("abierto")) {
            // Si el clic NO fue dentro del menú Y TAMPOCO en la hamburguesa...
            if (!menu.contains(event.target) && btnHamburguesa && !btnHamburguesa.contains(event.target)) {
                menu.classList.remove("abierto");
                localStorage.setItem("estadoMenuMovil", "cerrado");
            }
        }
    }
});