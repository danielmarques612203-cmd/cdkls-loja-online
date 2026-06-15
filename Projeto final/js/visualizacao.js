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

const feedback = JSON.parse(

    localStorage.getItem("feedbackCDKLS")

);

const dados = document.getElementById("dados");

if (!feedback) {

    dados.innerHTML = `

        <div class="item">

            <strong>Nenhum feedback encontrado.</strong>

        </div>

    `;

} else {

    dados.innerHTML = `

        <div class="item">

            <strong>Nível de satisfação</strong>

            ${feedback.satisfacao}

        </div>

        <div class="item">

            <strong>Categoria favorita</strong>

            ${feedback.categoria}

        </div>

        <div class="item">

            <strong>Compraria novamente?</strong>

            ${feedback.compraria}

        </div>

        <div class="item">

            <strong>O que mais chamou atenção?</strong>

            ${feedback.interesses.join(", ")}

        </div>

        <div class="item">

            <strong>Comentário</strong>

            ${feedback.comentario || "Nenhum comentário informado."}

        </div>

    `;

}