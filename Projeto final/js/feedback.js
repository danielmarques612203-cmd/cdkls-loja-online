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

const form = document.getElementById("formFeedback");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const satisfacao =

        document.getElementById(

            "satisfacao"

        ).value;

    const categoria =

        document.getElementById(

            "categoria"

        ).value;

    const compraria =

        document.querySelector(

            'input[name="compraria"]:checked'

        ).value;

    const checks =

        document.querySelectorAll(

            '.checkGroup input:checked'

        );

    const interesses = [];

    checks.forEach(item => {

        interesses.push(item.value);

    });

    const comentario =

        document.getElementById(

            "comentario"

        ).value;

    const feedback = {

        satisfacao,

        categoria,

        compraria,

        interesses,

        comentario

    };

    localStorage.setItem(

        "feedbackCDKLS",

        JSON.stringify(feedback)

    );

    window.location.href =

        "visualizacao.html";

});