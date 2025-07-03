let total = parseFloat(localStorage.getItem("total")) || 0;
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(botao) {
  var preco = parseFloat(botao.value);
  total += preco;
  carrinho.push(botao.parentNode.querySelector("h3").textContent); // pega o nome do produto
  // Quando o botão "Adicionar" é clicado, botao.parentNode pega a <div class="card"> inteira.
  //Dentro desse elemento pai (o .card), ele procura o primeiro elemento <h3> que encontrar.

  // Atualiza na tela
  document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);

  // Salva no localStorage
  localStorage.setItem("total", total);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function IrParaOPagamento() {
  window.location.href = "../Page3/Page3.html";
}

function limparCarrinho() {
  total = 0;
  carrinho = [];

  // Atualiza na tela
  document.getElementById("total").innerHTML = "R$ 0.00";
  if (document.getElementById("quantidade")) {
    document.getElementById("quantidade").innerHTML = "0 itens";
  }
  if (document.getElementById("resumo-carrinho")) {
    document.getElementById("resumo-carrinho").innerHTML = "";
  }

  // Limpa localStorage
  localStorage.removeItem("total");
  localStorage.removeItem("carrinho");
}

// Atualiza o total na tela ao carregar a página
window.onload = function() {
  document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);
}

function IrParaLogin(){
  window.location.href = "../../back/public/login.html"
}