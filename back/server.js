const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const csvPath = path.join(__dirname, 'usuarios.csv');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

function lerUsuarios() {
    if (!fs.existsSync(csvPath)) return [];
    const data = fs.readFileSync(csvPath, 'utf8').trim();
    if (!data) return [];
    const linhas = data.split('\n');

    let inicio = 0;
    const primeiraLinha = linhas[0].toLowerCase();
    if (primeiraLinha.startsWith('id') && primeiraLinha.includes('nome') && primeiraLinha.includes('senha')) {
        inicio = 1;
    }

    return linhas.slice(inicio)
        .map(linha => {
            const partes = linha.split(',');
            if (partes.length !== 3) return null; // ignora linhas quebradas

            const [id, nome, senha] = partes;
            const idNum = parseInt(id);
            if (isNaN(idNum) || !nome || !senha) return null; // ignora inválidos

            return { id: idNum, nome, senha };
        })
        .filter(u => u !== null); // remove os nulos
}


function salvarUsuarios(usuarios) {
    const linhas = usuarios.map(u => `${u.id},${u.nome},${u.senha}`).join('\n');
    fs.writeFileSync(csvPath, linhas + '\n', 'utf8');
}

// Cadastrar novo usuário
app.post('/registrar', (req, res) => {
    const { nome, senha } = req.body;
    if (!nome || !senha) return res.status(400).send('Nome e senha obrigatórios');

    let usuarios = lerUsuarios();
    if (usuarios.find(u => u.nome === nome))
        return res.status(409).send('Usuário já existe');

    const novoId = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
    usuarios.push({ id: novoId, nome, senha });
    salvarUsuarios(usuarios);

    res.send('Registrado com sucesso!');
});

// Login
app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);

    if (!usuario) return res.status(404).json({ erro: 'NAOEXISTE' });

    // devolve dados do usuário logado
    res.status(200).json({ id: usuario.id, nome: usuario.nome });
});

// Listar usuários
app.get('/usuarios', (req, res) => {
    const usuarios = lerUsuarios();
    res.json(usuarios);
});

// Deletar usuário
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let usuarios = lerUsuarios();
    const inicial = usuarios.length;
    usuarios = usuarios.filter(u => u.id !== id);

    if (usuarios.length === inicial)
        return res.status(404).send('Usuário não encontrado');

    salvarUsuarios(usuarios);
    res.send('Usuário removido');
});

// Alterar senha
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { novaSenha } = req.body;
    if (!novaSenha) return res.status(400).send('Nova senha obrigatória');

    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).send('Usuário não encontrado');

    usuario.senha = novaSenha;
    salvarUsuarios(usuarios);
    res.send('Senha atualizada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
