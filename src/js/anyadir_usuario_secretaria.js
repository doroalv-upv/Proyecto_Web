
document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioSeleccionado"));
    if (!usuario) return;

    document.getElementById("nombre").value = usuario.nombre || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("rol").value = usuario.rol || "";
    
document.getElementById("estado").value = usuario.estado || "activo";


    if (usuario.apellidos) {
        const partes = usuario.apellidos.split(" ");
        document.getElementById("apellido1").value = partes[0] || "";
        document.getElementById("apellido2").value = partes.slice(1).join(" ") || "";
    }

    document.getElementById("usuario").value =
        usuario.email ? usuario.email.split("@")[0] : "";
        

});

document.getElementById("form-alta-usuario")
  .addEventListener("submit", function (e) {

      e.preventDefault();

      const nuevoUsuario = {
          nombre: document.getElementById("nombre").value,
          apellido1: document.getElementById("apellido1").value,
          apellido2: document.getElementById("apellido2").value,
          email: document.getElementById("email").value,
          usuario: document.getElementById("usuario").value,
          password: document.getElementById("password").value,
          rol: document.getElementById("rol").value,
          
          estado: "activo"
      };

      console.log("Usuario creado:", nuevoUsuario);

      // 👉 AQUÍ LA LÍNEA CLAVE
      window.location.href = "../secretaria/gestion_usuarios.html";
  });
