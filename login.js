function loginForm() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  console.log(usuario, clave);

  const urlApi =
    "http://168.194.207.98:8081/tp/login.php?user=" +
    usuario +
    "&pass=" +
    clave;
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      if (data.respuesta === "OK") {
        window.location.href = "lista.html";
      } else {
        alert(data.mje);
      }
    })
    .catch((error) => {
      console.error("Error al obtener datos de la api:", error);
    });
}
