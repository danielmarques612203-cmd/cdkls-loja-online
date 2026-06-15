const sessao = JSON.parse(
    localStorage.getItem("sessaoCDKLS")
);

if (!sessao) {
    window.location.href = "login.html";
}

const lista = document.getElementById("listaCarrinho");
const total = document.getElementById("valorTotal");

let carrinho = JSON.parse(
    localStorage.getItem("carrinhoCDKLS")
) || [];

function salvarCarrinho() {
    localStorage.setItem(
        "carrinhoCDKLS",
        JSON.stringify(carrinho)
    );
}

function atualizarCarrinho() {

    lista.innerHTML = "";
    let soma = 0;

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="item">
                <div class="info">
                    <h3>Seu carrinho está vazio.</h3>
                </div>
            </div>
        `;

        total.textContent = "R$ 0,00";
        return;
    }

    carrinho.forEach((produto, indice) => {

        let preco = produto.preco;

        // Converte "R$ 189" ou "R$ 189,90" para número
        if (typeof preco === "string") {
            preco = Number(
                preco
                    .replace("R$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .trim()
            );
        }

        const quantidade = Number(produto.quantidade);

        const subtotal = preco * quantidade;

        soma += subtotal;

        lista.innerHTML += `
            <div class="item">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="info">

                    <h3>${produto.nome}</h3>

                    <p>
                        ${preco.toLocaleString(
                            "pt-BR",
                            {
                                style: "currency",
                                currency: "BRL"
                            }
                        )}
                    </p>

                    <strong>
                        Quantidade: ${quantidade}
                    </strong>

                </div>

                <div class="acoes">

                    <button onclick="diminuir(${indice})">
                        -
                    </button>

                    <button onclick="aumentar(${indice})">
                        +
                    </button>

                    <button onclick="remover(${indice})">
                        🗑
                    </button>

                </div>

            </div>
        `;
    });

    total.textContent = soma.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}

function aumentar(indice) {

    carrinho[indice].quantidade++;

    salvarCarrinho();
    atualizarCarrinho();
}

function diminuir(indice) {

    carrinho[indice].quantidade--;

    if (carrinho[indice].quantidade <= 0) {
        carrinho.splice(indice, 1);
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function remover(indice) {

    carrinho.splice(indice, 1);

    salvarCarrinho();
    atualizarCarrinho();
}

atualizarCarrinho();