function inserirDados(conteudo) {
  const campo = document.getElementById("saidas");

  campo.value += conteudo;

  const id_body = document.getElementsByTagName("body")[0].id;

  if (id_body === "calculadora_programador") {
    const operadores = ["+", "-"];

    if (campo.value && !operadores.some((op) => campo.value.includes(op))) {
      converter(campo.value);
    }

    return;
  }
}

function limpar() {
  const campo = document.getElementById("saidas");

  campo.value = "";

  const selecionados = Array.from(document.getElementsByClassName("resultado"));

  selecionados.forEach((element) => {
    element.innerHTML = "";
  });
}

function resultado() {
  const id_body = document.getElementsByTagName("body")[0].id;

  const campo = document.getElementById("saidas");

  if (id_body === "calculadora_programador") {
    try {
      const resultado = aritmetica_bases(campo.value);

      if (!isFinite(resultado)) {
        campo.value = "Math Error";
      } else {
        const resultadoConvertido = converter(resultado, true);

        campo.value = resultadoConvertido;
      }

      return;
    } catch (erro) {
      console.error(erro);
      campo.value = "Syntax Error";
    }

    return;
  }

  let input = campo.value
    .replaceAll("x", "*")
    .replaceAll("−", "-")
    .replaceAll("^", "**");

  if (input !== "") {
    try {
      if (input.includes("√")) {
        input = input.replace(/√(\d+(?:\.\d+)?)/g, "Math.sqrt($1)");
      }

      const inputAUX = eval(input);

      if (!isFinite(inputAUX)) {
        campo.value = "Math Error";
      } else {
        campo.value = inputAUX;
      }
    } catch (erro) {
      console.error(erro);
      campo.value = "Syntax Error";
    }
  }
}
function apagarChar() {
  const campo = document.getElementById("saidas");

  campo.value = campo.value.slice(0, -1);

  const operadores = ["+", "-"];

  if (campo.value && !operadores.some((op) => campo.value.includes(op))) {
    converter(campo.value);
  }
}
