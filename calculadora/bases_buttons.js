var modo = "hex";
let input = document.getElementById('saidas');

function obterBase() {
    switch (modo) {
        case "dec":
            return 10;

        case "bin":
            return 2;

        case "oct":
            return 8;

        case "hex":
            return 16;

        default:
            throw new Error("Base não selecionada");
    }
}

function alterarModo(modoSelecionado, limite) {
  modo = modoSelecionado;
  // Habilita todos os botões
  for (let index = 0; index < 16; index++) {
    let botao = document.getElementsByClassName("btn-" + index)[0];

    if (botao) {
      botao.removeAttribute("disabled");
    }
  }

  // Desabilita os botões acima do limite
  for (let index = limite; index < 16; index++) {
    let botao = document.getElementsByClassName("btn-" + index)[0];

    if (botao) {
      botao.setAttribute("disabled", "true");
    }
  }

  try {
    // Altera o modo selecionado
    document
      .getElementsByClassName("modo_selecionado")[0]
      .classList.remove("modo_selecionado");
  } catch (error) {
    console.log(error.message);
  }
  document.getElementsByClassName(modo)[0].classList.add("modo_selecionado");
}

document
  .getElementsByClassName("dec")[0]
  .addEventListener("click", function () {
    input.value = document.querySelectorAll('#visor_modo .dec .resultado')[0].innerHTML;
    alterarModo("dec", 10);
  });

document
  .getElementsByClassName("oct")[0]
  .addEventListener("click", function () {
    input.value = document.querySelectorAll('#visor_modo .oct .resultado')[0].innerHTML;
    alterarModo("oct", 8);
  });

document
  .getElementsByClassName("bin")[0]
  .addEventListener("click", function () {
    input.value = document.querySelectorAll('#visor_modo .bin .resultado')[0].innerHTML;
    alterarModo("bin", 2);
  });

document
  .getElementsByClassName("hex")[0]
  .addEventListener("click", function () {
    input.value = document.querySelectorAll('#visor_modo .hex .resultado')[0].innerHTML;
    alterarModo("hex", 16);
  });
