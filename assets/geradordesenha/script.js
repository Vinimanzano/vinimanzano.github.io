function gerarSenha() {
    var comprimento = document.getElementById("comprimento").value;
    var incluirMaiusculas = document.getElementById("maiusculas").checked;
    var incluirMinusculas = document.getElementById("minusculas").checked;
    var incluirNumeros = document.getElementById("numeros").checked;
    var incluirSimbolos = document.getElementById("simbolos").checked;

    var caracteres = "";
    var senha = "";

    if (incluirMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incluirMinusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
    if (incluirNumeros) caracteres += "0123456789";
    if (incluirSimbolos) caracteres += "!@#$%^&*()_+{}[];:<>,.?/~";

    for (var i = 0; i < comprimento; i++) {
      var randomIndex = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(randomIndex);
    }

    document.getElementById("resultado").value = senha;
  }