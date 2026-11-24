// Pegando os elementos da página
const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoQuantidade = document.querySelector("#quantidade");
const campoPreco = document.querySelector("#preco");
const campoTipo = document.querySelector("#tipo");
const mensagem = document.querySelector("#mensagem");
const resultado = document.querySelector("#resultado");
const listaResultado = document.querySelector("#lista-resultado");

// Formata um número como dinheiro: 270.5 vira "R$ 270,50"
function reais(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Mostra a mensagem de erro ou de sucesso
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

// Quando o formulário for enviado
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  try {
    // Lendo os campos 
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const quantidade = Number(campoQuantidade.value);
    const preco = Number(campoPreco.value);
    const tipo = campoTipo.value;

    // Validando os campos
    if (nome === "") {
      throw new Error("Informe seu nome ou apelido.");
    }

    if (email === "" || !email.includes("@")) {
      throw new Error("Informe um e-mail válido, com @");
    }

    if (campoQuantidade.value === "") {
      throw new Error("Informe quantos Robux você quer comprar");
    }

    if (quantidade < 100 || quantidade > 100000) {
      throw new Error("A quantidade deve ficar entre 100 e 100.000 Robux");
    }

    if (campoPreco.value === "") {
      throw new Error("Informe o preço que você paga por 100 Robux");
    }

    if (preco < 1 || preco > 50) {
      throw new Error("O preço por 100 Robux deve ficar entre R$ 1,00 e R$ 50,00");
    }

    if (tipo === "") {
      throw new Error("Escolha o tipo de conta");
    }

    //  Fazendo a conta
    const pacotes = quantidade / 100;
    const bruto = pacotes * preco;

    let desconto = 0;
    if (quantidade >= 20000) {
      desconto = bruto * 0.15;
    } else if (quantidade >= 5000) {
      desconto = bruto * 0.10;
    }

    let bonus = 0;
    if (tipo === "premium") {
      bonus = bruto * 0.05;
    }

    const total = bruto - desconto - bonus;

    listaResultado.innerHTML =
      "<li>Cliente: " + nome + "</li>" +
      "<li>Quantidade: " + quantidade + " Robux</li>" +
      "<li>Valor sem desconto: " + reais(bruto) + "</li>" +
      "<li>Desconto: " + reais(desconto) + "</li>" +
      "<li>Bônus Premium: " + reais(bonus) + "</li>" +
      "<li class='destaque'>Total a pagar: " + reais(total) + "</li>";

    resultado.style.display = "block";
    mostrarMensagem("Cálculo feito com sucesso!", "sucesso");

    console.log("Total calculado:", total);
  } catch (erro) {
    resultado.style.display = "none";
    mostrarMensagem(erro.message, "erro");
    console.error("Erro:", erro.message);
  }

  campoNome.focus();
});

formulario.addEventListener("reset", function () {
  mensagem.textContent = "";
  mensagem.className = "mensagem";
  resultado.style.display = "none";
  listaResultado.innerHTML = "";
});