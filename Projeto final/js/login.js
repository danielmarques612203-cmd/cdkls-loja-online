const form = document.getElementById("formLogin");

const toast = document.getElementById("toast");

function mostrarToast(msg, tipo = "erro") {

    toast.textContent = msg;

    toast.className = "toast " + tipo;

    setTimeout(() => {

        toast.className = "toast";

        toast.textContent = "";

    }, 3000);

}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const login = document.getElementById("login").value.trim();

    const senha = document.getElementById("senha").value.trim();

    const usuarios = JSON.parse(

        localStorage.getItem("usuariosCDKLS")

    ) || [];

    const usuario = usuarios.find(

        u =>

            u.login === login &&

            u.senha === senha

    );

    if (!usuario) {

        mostrarToast(

            "Login ou senha inválidos."

        );

        return;

    }

    localStorage.setItem(

        "sessaoCDKLS",

        JSON.stringify(usuario)

    );

    mostrarToast(

        "Login realizado com sucesso.",

        "sucesso"

    );

    setTimeout(() => {

        window.location.href =

            "dashboard.html";

    }, 1500);

});