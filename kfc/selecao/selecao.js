let total = 0;

function adicionarAoCarrinho(botao) {
  var preco = parseFloat(botao.value);
  total += preco;
  document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);
}

function IrParaOPagamento() {
  window.location.href = "../pagamento/pagamento.html";
}

function limparCarrinho() {
  total = 0;
  quantidade = 0;
  document.getElementById("total").innerHTML = "R$ 0.00";
  document.getElementById("quantidade").innerHTML = "0 itens";
  document.getElementById("resumo-carrinho").innerHTML = "";
}