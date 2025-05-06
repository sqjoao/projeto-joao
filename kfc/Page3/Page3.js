// Carregar carrinho e total da página anterior
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

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

  // Gerar QR Code com a mensagem
  let qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = ""; // Limpa se já tiver algum
  new QRCode(qrDiv, {
    text: mensagem,
    width: 200,
    height: 200
  });

  // Aqui poderia limpar o carrinho se quiser
}

// Executar ao carregar página
exibirPedidos();
