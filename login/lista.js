// Inicia com 1 admin, se não existir
if (!localStorage.getItem("usuarios")) {
    let usuarios = [
      { usuario: "admin", senha: "123", tipo: "admin" },
      { usuario: "joao", senha: "456", tipo: "usuario" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
  
  // Função de login
  function login() {
    let usuario = document.getElementById("loginUser").value;
    let senha = document.getElementById("loginSenha").value;
  
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let user = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  
    if (!user) {
      alert("Usuário ou senha inválidos!");
      return;
    }
  
    if (user.tipo !== "admin") {
      alert("Apenas administradores podem acessar!");
      return;
    }
  
    sessionStorage.setItem("usuarioLogado", JSON.stringify(user));
    window.location.href = "admin.html";
  }
  
  // Carregar lista de usuários no admin
  function carregarUsuarios() {
    let user = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (!user || user.tipo !== "admin") {
      window.location.href = "login.html";
      return;
    }
  
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let lista = "";
  
    usuarios.forEach((u, i) => {
      lista += `
        <p>
          ${u.usuario} - ${u.tipo}
          <button onclick="excluirUsuario(${i})">Excluir</button>
          <button onclick="editarUsuario(${i})">Editar</button>
        </p>
      `;
    });
  
    document.getElementById("listaUsuarios").innerHTML = lista;
  }
  
  // Excluir usuário
  function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
  }
  
  // Editar usuário
  function editarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let novoNome = prompt("Novo nome de usuário:", usuarios[index].usuario);
    let novaSenha = prompt("Nova senha:", usuarios[index].senha);
    let novoTipo = prompt("Novo tipo (admin/usuario):", usuarios[index].tipo);
  
    if (novoNome && novaSenha && (novoTipo === "admin" || novoTipo === "usuario")) {
      usuarios[index].usuario = novoNome;
      usuarios[index].senha = novaSenha;
      usuarios[index].tipo = novoTipo;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      carregarUsuarios();
    } else {
      alert("Dados inválidos.");
    }
  }
  
  // Logout
  function logout() {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
  }
  