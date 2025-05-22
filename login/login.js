function logar() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura o usuário e senha no localStorage
    const achou = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (achou) {
      alert("Login bem-sucedido!");

      // Redireciona conforme o tipo de usuário
      if (achou.tipo === "admin") {
        window.location.href = "../projeto joao/Page1/Page1.html";
      } else {
        window.location.href = "../projeto joao/Page1/Page1.html";
      }
    } else {
      alert("Usuário não encontrado. Faça o cadastro.");
      window.location.href = "../cadastro/cadastro.html";
    }
  }