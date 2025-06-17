// Carregar carrinho e total da página anterior
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
//  carrinho contém os itens do carrinho e vazio
let total = parseFloat(localStorage.getItem("total")) || 0;
// total pega o preço que esta no storage do navegador e vazio

// Preencher lista de pedidos
function exibirPedidos() {
  let lista = document.getElementById("listaPedidos");
  carrinho.forEach(item => {
    let div = document.createElement("div");
    div.textContent = item;
    lista.appendChild(div);
  });
  document.getElementById("totalFinal").textContent = total.toFixed(2);
}

// Retornar para pedidos sem apagar carrinho
function voltarParaPedidos() {
  window.location.href = "../Page2/Page2.html";
}

function mostrarOpcoesPagamento() {
  document.getElementById("opcoesPagamento").style.display = "block";
}

function selecionarPagamento(metodo) {
  localStorage.setItem("pagamentoEscolhido", metodo);
  document.getElementById("botaoConfirmar").disabled = false;
}

function confirmarPedido() {
  document.getElementById("opcoesConsumo").style.display = "block";
}

function finalizarConsumo(opcao) {
  let pagamento = localStorage.getItem("pagamentoEscolhido") || "Não selecionado";
  let mensagem = `Pedido confirmado!\nConsumo: ${opcao}\nPagamento: ${pagamento}`;
  alert(mensagem);
}

exibirPedidos();
