/* ===========================================
   CDKL's - Cadastro
=========================================== */

const form = document.getElementById("formCadastro");

const toast = document.getElementById("toast");

/* ===========================================
   TOAST
=========================================== */

function mostrarToast(mensagem, tipo = "erro") {

    toast.textContent = mensagem;

    toast.className = "toast " + tipo;

    setTimeout(() => {

        toast.className = "toast";

        toast.textContent = "";

    }, 3000);

}

/* ===========================================
   VALIDA NOME
=========================================== */

function validarNome(nome) {

    nome = nome.trim();

    if (nome.length < 15 || nome.length > 80) {

        return false;

    }

    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regex.test(nome)) {

        return false;

    }

    const partes = nome.split(" ");

    return partes.length >= 2;

}

/* ===========================================
   CPF
=========================================== */

function validarCPF(cpf) {

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {

        return false;

    }

    if (/^(\d)\1+$/.test(cpf)) {

        return false;

    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {

        soma += Number(cpf.charAt(i)) * (10 - i);

    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {

        resto = 0;

    }

    if (resto !== Number(cpf.charAt(9))) {

        return false;

    }

    soma = 0;

    for (let i = 0; i < 10; i++) {

        soma += Number(cpf.charAt(i)) * (11 - i);

    }

    resto = (soma * 10) % 11;

    if (resto === 10) {

        resto = 0;

    }

    return resto === Number(cpf.charAt(10));

}

/* ===========================================
   MÁSCARA CPF
=========================================== */

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", () => {

    let valor = cpfInput.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");

    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpfInput.value = valor;

});

/* ===========================================
   MÁSCARA CEP
=========================================== */

const cepInput = document.getElementById("cep");

cepInput.addEventListener("input", () => {

    let valor = cepInput.value.replace(/\D/g, "");

    valor = valor.substring(0, 8);

    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    cepInput.value = valor;

});

/* ===========================================
   MÁSCARA TELEFONE
=========================================== */

function mascaraTelefone(idCampo) {

    const campo = document.getElementById(idCampo);

    campo.addEventListener("input", () => {

        let valor = campo.value.replace(/\D/g, "");

        // máximo 11 dígitos
        valor = valor.substring(0, 11);

        if (valor.length > 10) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
        } else if (valor.length > 6) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}-${valor.substring(6)}`;
        } else if (valor.length > 2) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
        }

        campo.value = valor;
    });

}

mascaraTelefone("telefone");
mascaraTelefone("celular");

/* ===========================================
   CONSULTA CEP - VIACEP
=========================================== */

cepInput.addEventListener("blur", async () => {

    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {

        mostrarToast("CEP inválido.");

        return;

    }

    try {

        const resposta = await fetch(

            `https://viacep.com.br/ws/${cep}/json/`

        );

        if (!resposta.ok) {

            throw new Error();

        }

        const dados = await resposta.json();

        if (dados.erro) {

            mostrarToast("CEP não encontrado.");

            return;

        }

        document.getElementById("rua").value =
            dados.logradouro || "";

        document.getElementById("bairro").value =
            dados.bairro || "";

        document.getElementById("cidade").value =
            dados.localidade || "";

        document.getElementById("uf").value =
            dados.uf || "";

    } catch {

        mostrarToast(

            "Erro ao consultar o CEP."

        );

    }

});

/* ===========================================
   ENVIO DO FORMULÁRIO
=========================================== */

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const cpf = document.getElementById("cpf").value.trim();

    const cep = document.getElementById("cep").value.trim();

    const rua = document.getElementById("rua").value.trim();

    const bairro = document.getElementById("bairro").value.trim();

    const cidade = document.getElementById("cidade").value.trim();

    const uf = document.getElementById("uf").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const celular = document.getElementById("celular").value.trim();

    const login = document.getElementById("login").value.trim();

    const senha = document.getElementById("senha").value.trim();

    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

    /* ===========================
       VALIDAÇÕES
    =========================== */

    if (!validarNome(nome)) {

        mostrarToast(
            "O nome deve conter entre 15 e 80 caracteres e apenas letras."
        );

        return;

    }

    if (!validarCPF(cpf)) {

        mostrarToast("CPF inválido.");

        return;

    }

    if (!/^[A-Za-z]{6}$/.test(login)) {

        mostrarToast(
            "O login deve possuir exatamente 6 letras."
        );

        return;

    }

    if (!/^[A-Za-z]{8}$/.test(senha)) {

        mostrarToast(
            "A senha deve possuir exatamente 8 letras."
        );

        return;

    }

    if (senha !== confirmarSenha) {

        mostrarToast(
            "A confirmação da senha está diferente."
        );

        return;

    }

    /* ===========================
       VERIFICAR LOGIN DUPLICADO
    =========================== */

    const usuarios = JSON.parse(

        localStorage.getItem("usuariosCDKLS")

    ) || [];

    const existeLogin = usuarios.find(

        usuario => usuario.login === login

    );

    if (existeLogin) {

        mostrarToast(

            "Este login já está cadastrado."

        );

        return;

    }

    /* ===========================
       SALVAR USUÁRIO
    =========================== */

    const novoUsuario = {

        nome,

        cpf,

        cep,

        rua,

        bairro,

        cidade,

        uf,

        telefone,

        celular,

        login,

        senha

    };

    usuarios.push(novoUsuario);

    localStorage.setItem(

        "usuariosCDKLS",

        JSON.stringify(usuarios)

    );

    mostrarToast(

        "Cadastro realizado com sucesso!",

        "sucesso"

    );

    form.reset();

    setTimeout(() => {

        window.location.href = "login.html";

    }, 2000);

});