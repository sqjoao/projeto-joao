function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
  
    fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, senha })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = 'crud.html';
    });
  }
  
