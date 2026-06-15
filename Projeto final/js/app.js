/* ===========================================
   CDKL's - app.js
   Menos cor, mais estilo.
=========================================== */

/* ===========================
   ACESSIBILIDADE - FONTE
=========================== */

let tamanhoFonte = Number(localStorage.getItem("fonteCDKLS")) || 16;

document.documentElement.style.fontSize = tamanhoFonte + "px";

const btnAumentar = document.getElementById("aumentarFonte");
const btnDiminuir = document.getElementById("diminuirFonte");

if (btnAumentar) {

    btnAumentar.addEventListener("click", () => {

        if (tamanhoFonte < 24) {

            tamanhoFonte++;

            document.documentElement.style.fontSize =
                tamanhoFonte + "px";

            localStorage.setItem(
                "fonteCDKLS",
                tamanhoFonte
            );

        }

    });

}

if (btnDiminuir) {

    btnDiminuir.addEventListener("click", () => {

        if (tamanhoFonte > 12) {

            tamanhoFonte--;

            document.documentElement.style.fontSize =
                tamanhoFonte + "px";

            localStorage.setItem(
                "fonteCDKLS",
                tamanhoFonte
            );

        }

    });

}

/* ===========================
   TEMA
=========================== */

const botaoTema = document.getElementById("tema");

const temaSalvo = localStorage.getItem("temaCDKLS");

if (temaSalvo === "escuro") {

    document.body.classList.add("dark");

}

if (botaoTema) {

    botaoTema.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem(
                "temaCDKLS",
                "escuro"
            );

        } else {

            localStorage.setItem(
                "temaCDKLS",
                "claro"
            );

        }

    });

}

/* ===========================
   CARRINHO
=========================== */

if (!localStorage.getItem("carrinhoCDKLS")) {

    localStorage.setItem(

        "carrinhoCDKLS",

        JSON.stringify([])

    );

}

function atualizarContador() {

    const contador = document.getElementById(
        "contadorCarrinho"
    );

    if (!contador) {

        return;

    }

    const carrinho = JSON.parse(

        localStorage.getItem(
            "carrinhoCDKLS"
        )

    ) || [];

    let quantidadeTotal = 0;

    carrinho.forEach(produto => {

        quantidadeTotal += produto.quantidade;

    });

    contador.textContent = quantidadeTotal;

}

atualizarContador();

/* ===========================
   TOAST
=========================== */

function criarToast(mensagem) {

    const toast = document.createElement("div");

    toast.className = "toastCDKLS";

    toast.innerText = mensagem;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("mostrar");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("mostrar");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

/* ===========================
   BOTÕES COMPRAR
=========================== */

const botoesComprar = document.querySelectorAll(".comprar");

botoesComprar.forEach((botao) => {

    botao.addEventListener("click", () => {

        const card = botao.closest(".card");

        const nome =
            card.querySelector("h3").textContent;

        const preco =
            card.querySelector("span").textContent;

        const imagem =
            card.querySelector("img").getAttribute("src");

        let carrinho = JSON.parse(

            localStorage.getItem("carrinhoCDKLS")

        ) || [];

        const indice = carrinho.findIndex(

            produto => produto.nome === nome

        );

        if (indice !== -1) {

            carrinho[indice].quantidade++;

        } else {

            carrinho.push({

                nome,

                preco,

                imagem,

                quantidade: 1

            });

        }

        localStorage.setItem(

            "carrinhoCDKLS",

            JSON.stringify(carrinho)

        );

        atualizarContador();

        criarToast(

            "Produto adicionado ao carrinho."

        );

    });

});

/* ===========================
   USUÁRIO LOGADO
=========================== */

const sessao = JSON.parse(

    localStorage.getItem("sessaoCDKLS")

);

const nomeUsuario =
    document.getElementById("nomeUsuario");

if (sessao && nomeUsuario) {

    nomeUsuario.textContent =

        sessao.nome;

}

/* ===========================
   LOGOUT
=========================== */

const logout =
    document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", () => {

        localStorage.removeItem(

            "sessaoCDKLS"

        );

        window.location.href =

            "login.html";

    });

}