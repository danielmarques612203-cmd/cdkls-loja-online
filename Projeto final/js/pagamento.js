const sessao = JSON.parse(
    localStorage.getItem("sessaoCDKLS")
);

if (!sessao) {
    window.location.href = "login.html";
}

const forma = document.getElementById("forma");
const dadosCartao = document.getElementById("dadosCartao");
const form = document.getElementById("formPagamento");
const toast = document.getElementById("toast");
const listaResumo = document.getElementById("listaResumo");
const totalResumo = document.getElementById("totalResumo");

let carrinho = JSON.parse(
    localStorage.getItem("carrinhoCDKLS")
) || [];

dadosCartao.style.display = "none";

forma.addEventListener("change", () => {

    if (forma.value === "Cartão de Crédito") {

        dadosCartao.style.display = "block";

    } else {

        dadosCartao.style.display = "none";

    }

});

function mostrarToast(msg, tipo = "sucesso") {

    toast.textContent = msg;

    toast.className = "toast " + tipo;

    setTimeout(() => {

        toast.className = "toast";

        toast.textContent = "";

    }, 3000);

}

if (sessao) {

    document.getElementById("nome").value =
        sessao.nome;

}

let soma = 0;

listaResumo.innerHTML = "";

carrinho.forEach(produto => {

    let preco = produto.preco;

    if (typeof preco === "string") {

        preco = Number(
            preco
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        );

    }

    const quantidade = Number(
        produto.quantidade
    );

    const subtotal =
        preco * quantidade;

    soma += subtotal;

    listaResumo.innerHTML += `
        <div class="resumoItem">

            <span>
                ${produto.nome}
                x${quantidade}
            </span>

            <span>
                ${subtotal.toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                )}
            </span>

        </div>
    `;

});

totalResumo.textContent = soma.toLocaleString(
    "pt-BR",
    {
        style: "currency",
        currency: "BRL"
    }
);

form.addEventListener("submit", (e) => {

    e.preventDefault();

    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio.",
            "erro"
        );

        return;

    }

    if (
        forma.value ===
        "Cartão de Crédito"
    ) {

        const numero =
            document
                .getElementById(
                    "numeroCartao"
                )
                .value
                .trim();

        const validade =
            document
                .getElementById(
                    "validade"
                )
                .value
                .trim();

        const cvv =
            document
                .getElementById(
                    "cvv"
                )
                .value
                .trim();

        if (
            numero === "" ||
            validade === "" ||
            cvv === ""
        ) {

            mostrarToast(
                "Preencha os dados do cartão.",
                "erro"
            );

            return;

        }

    }

    localStorage.removeItem(
        "carrinhoCDKLS"
    );

    carrinho = [];

    mostrarToast(
        "Pagamento realizado com sucesso!",
        "sucesso"
    );

    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 2000);

});