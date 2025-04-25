// Variável para armazenar o preço total
let precoTotal = 0;

// Função para adicionar o preço do item ao carrinho
function adicionarAoCarrinho(preco) {
    // Atualiza o preço total somando o valor do item
    precoTotal += preco;

    // Atualiza o conteúdo do preço total no HTML
    // A atualização é feita em um elemento com id 'preco-total'
    document.getElementById("preco-total").textContent = `R$ ${precoTotal.toFixed(2)}`;
}

// Obtém todos os botões de "Adicionar ao Carrinho" e adiciona o evento de click
window.onload = function() {
    // Definindo preços dos produtos
    const produtos = [
        { button: "button-balde", preco: 39.99 },
        { button: "button-combo", preco: 69.99 },
        { button: "button-bebida", preco: 6.99 },
        { button: "button-molho", preco: 3.99 }
    ];

    // Atribui a função de adicionar ao carrinho a cada botão de produto
    produtos.forEach(produto => {
        document.getElementById(produto.button).onclick = function() {
            adicionarAoCarrinho(produto.preco);
        };
    });
};

function IrParaOPagamento(){
        window.location.href = "../pagamento/pagamento.html";
}
