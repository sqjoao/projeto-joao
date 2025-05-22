function cadastrar() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;

    if (usuario === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    // Recupera os usuários já cadastrados ou cria um array vazio
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o usuário já existe
    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
      alert("Usuário já existe!");
      return;
    }

    // Adiciona novo usuário
    usuarios.push({ usuario, senha, tipo });

    // Salva no LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login/login.html";
  }