# CDKL's - Documentação do Projeto

## Descrição

A aplicação é uma loja virtual desenvolvida com HTML, CSS e JavaScript,
utilizando armazenamento local do navegador (`localStorage`) para
simular autenticação, carrinho de compras e persistência de dados.

## Funcionalidades principais

-   Cadastro e login de usuários.
-   Sessão do usuário persistida no navegador.
-   Catálogo de produtos.
-   Carrinho de compras.
-   Página de pagamento.
-   Dashboard administrativa.
-   Sistema de feedback.
-   Alternância entre tema claro e escuro.
-   Controle de tamanho da fonte para acessibilidade.
-   Notificações (toast).

## Estrutura do projeto

### Páginas HTML

-   `404.html`
-   `cadastro.html`
-   `carrinho.html`
-   `dashboard.html`
-   `feedback.html`
-   `index.html`
-   `login.html`
-   `pagamento.html`
-   `visualizacao.html`

### CSS

-   `css/404.css`
-   `css/cadastro.css`
-   `css/carrinho.css`
-   `css/dashboard.css`
-   `css/feedback.css`
-   `css/login.css`
-   `css/pagamento.css`
-   `css/style.css`
-   `css/visualizacao.css`

### JavaScript

-   `js/app.js`
-   `js/cadastro.js`
-   `js/carrinho.js`
-   `js/dashboard.js`
-   `js/feedback.js`
-   `js/login.js`
-   `js/pagamento.js`
-   `js/visualizacao.js`

## Persistência

Os dados são armazenados no `localStorage`. Foram identificadas chaves
como:

-   `sessaoCDKLS`
-   `carrinhoCDKLS`
-   `temaCDKLS`
-   `fonteCDKLS`

## Como executar

1.  Baixe ou clone o projeto.
2.  Abra a pasta do projeto.
3.  Execute utilizando um servidor local (Live Server, por exemplo).
4.  Acesse `index.html`.

## Tecnologias

-   HTML5
-   CSS3
-   JavaScript (ES6)
-   localStorage

## Observações

Este projeto não depende de banco de dados ou backend tradicional,
utilizando armazenamento local para fins educacionais ou prototipação.
