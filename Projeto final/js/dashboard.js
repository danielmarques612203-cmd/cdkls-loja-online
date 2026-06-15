const sessao = JSON.parse(

    localStorage.getItem("sessaoCDKLS")

);

if (!sessao) {

    window.location.href = "login.html";

}

const sessao = JSON.parse(
    localStorage.getItem("sessaoCDKLS")
);

if (!sessao) {

    window.location.href = "login.html";

}

const usuario = JSON.parse(

    localStorage.getItem("sessaoCDKLS")

);

if (!usuario) {

    window.location.href =

        "login.html";

}

document.getElementById(

    "nomeUsuario"

).textContent = usuario.nome;

document.getElementById(

    "logout"

).addEventListener("click", () => {

    localStorage.removeItem(

        "sessaoCDKLS"

    );

    window.location.href =

        "login.html";

});