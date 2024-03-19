function buscar() {
  let buscarUsuario = document.getElementById("buscador").value;
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" +
    buscarUsuario;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let tabla = document.getElementById("tablaUsuario");
      tabla.innerHTML = "";

      if (data.length === 0) {
        alert("Usuario no encontrado.");
      } else {
        data.forEach((user) => {
          let registro = document.createElement("tr");
          registro.innerHTML = `
            <td>${user.id}</td>
            <td>${user.usuario}</td>
            <td class="${
              user.bloqueado === "N" ? "desbloqueado" : "bloquedado"
            }">${user.bloqueado}</td>
            <td>${user.apellido}</td>
            <td>${user.nombre}</td>
            <td><button onclick="bloquearUsuario(${
              user.id
            })">Bloquear</button></td>
            <td><button onclick="desbloquearUsuario(${
              user.id
            })">Desbloquear</button></td>
          `;
          tabla.appendChild(registro);
        });
      }
    })
    .catch((error) => console.error("Error al listar usuarios:", error));
}

function bloquearUsuario(userId) {
  cambiarEstadoUser(userId, "Y");
}

function desbloquearUsuario(userId) {
  cambiarEstadoUser(userId, "N");
}

function cambiarEstadoUser(userId, estado) {
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=" +
    userId +
    "&estado=" +
    estado;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.respuesta === "OK") {
        buscar();
      } else {
        alert("Error al cambiar el estado del usuario");
      }
    })
    .catch((error) => console.error("Error:", error));
}

window.onload = buscar;
