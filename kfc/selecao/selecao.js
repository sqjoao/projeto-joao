let total = 0;

function adicionarAoCarrinho(botao) {
  var preco = parseFloat(botao.value);
  total += preco;
  document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);
}

function IrParaOPagamento() {
  window.location.href = "../pagamento/pagamento.html";
}