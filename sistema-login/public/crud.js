function carregarUsuarios() {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(usuarios => {
        const lista = document.getElementById('listaUsuarios');
        lista.innerHTML = '';
  
        usuarios.forEach(usuario => {
          const li = document.createElement('li');
          li.textContent = `Nome: ${usuario.nome} | Senha: ${usuario.senha}`;
  
          const btnExcluir = document.createElement('button');
          btnExcluir.textContent = 'Excluir';
          btnExcluir.onclick = () => excluirUsuario(usuario.nome);
  
          li.appendChild(btnExcluir);
          lista.appendChild(li);
        });
      });
  }
  
  function excluirUsuario(nome) {
    fetch(`/api/usuarios/${nome}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        carregarUsuarios();
      });
  }
  
  carregarUsuarios();
  
