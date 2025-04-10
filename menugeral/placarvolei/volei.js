let pontosTime1 = 0;
let pontosTime2 = 0;
let setsTime1 = 0;
let setsTime2 = 0;
const setsNecessarios = 3;

function atualizarPlacar() {
    // Atualiza os pontos e sets no HTML
    document.getElementById('pontos-time1').textContent = pontosTime1;
    document.getElementById('sets-time1').textContent = `Sets: ${setsTime1}`;
    document.getElementById('pontos-time2').textContent = pontosTime2;
    document.getElementById('sets-time2').textContent = `Sets: ${setsTime2}`;

    verificarVencedor();
}

function adicionarPontos(time, pontos) {
    if (time === 1) {
        pontosTime1 += pontos;
    } else if (time === 2) {
        pontosTime2 += pontos;
    }

    verificarVitoriaSet();
    atualizarPlacar();
}

function diminuirPontos(time, pontos) {
    if (time === 1) {
        pontosTime1 = Math.max(0, pontosTime1 - pontos);
    } else if (time === 2) {
        pontosTime2 = Math.max(0, pontosTime2 - pontos);
    }

    atualizarPlacar();
}

function adicionarSet(time) {
    if (time === 1) {
        setsTime1 += 1;
    } else if (time === 2) {
        setsTime2 += 1;
    }
    reiniciarPontos();
    atualizarPlacar();
}

function reiniciarJogo() {
    pontosTime1 = 0;
    pontosTime2 = 0;
    setsTime1 = 0;
    setsTime2 = 0;
    document.getElementById('vencedor').textContent = '';
    atualizarPlacar();
}

function reiniciarPontos() {
    pontosTime1 = 0;
    pontosTime2 = 0;
}

function verificarVitoriaSet() {
    if (pontosTime1 >= 25 && pontosTime1 - pontosTime2 >= 2) {
        setsTime1 += 1;
        reiniciarPontos();
        atualizarPlacar();
    } else if (pontosTime2 >= 25 && pontosTime2 - pontosTime1 >= 2) {
        setsTime2 += 1;
        reiniciarPontos();
        atualizarPlacar();
    }
}

function verificarVencedor() {
    if (setsTime1 >= setsNecessarios) {
        document.getElementById('vencedor').textContent = 'Time 1 Venceu o Jogo!';
    } else if (setsTime2 >= setsNecessarios) {
        document.getElementById('vencedor').textContent = 'Time 2 Venceu o Jogo!';
    }
}
