const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Cadastrar usuário
app.post('/api/usuarios', (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) return res.status(400).json({ message: 'Nome e senha são obrigatórios' });

  const newUser = `${nome},${senha}\n`;
  fs.appendFile('usuarios.csv', newUser, err => {
    if (err) return res.status(500).json({ message: 'Erro ao salvar usuário' });
    res.json({ message: 'Usuário cadastrado!' });
  });
});

// Listar usuários
app.get('/api/usuarios', (req, res) => {
  fs.readFile('usuarios.csv', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Erro ao ler usuários' });

    const usuarios = data.trim() ? data.trim().split('\n').map(line => {
      const [nome, senha] = line.split(',');
      return { nome, senha };
    }) : [];

    res.json(usuarios);
  });
});

// Deletar usuário pelo nome
app.delete('/api/usuarios/:nome', (req, res) => {
  const { nome } = req.params;

  fs.readFile('usuarios.csv', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Erro ao ler usuários' });

    const linhas = data.trim().split('\n');
    const novasLinhas = linhas.filter(line => line.split(',')[0] !== nome);

    fs.writeFile('usuarios.csv', novasLinhas.join('\n') + (novasLinhas.length ? '\n' : ''), err => {
      if (err) return res.status(500).json({ message: 'Erro ao deletar usuário' });
      res.json({ message: 'Usuário removido com sucesso' });
    });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
