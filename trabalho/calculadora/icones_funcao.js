const body = document.getElementsByTagName("body")[0];
// =================== Comportamento do menu ============================ //
let titulos_modos = document.getElementsByClassName("titulo_modo");
let count = 0;
document
  .querySelectorAll(".icone.menu")[0]
  .addEventListener("click", function () {
    document.querySelectorAll(".icone.menu button")[0].style.rotate = "90deg";

    if (body.id == "calculadora_cientifica") {
      body.style.gridTemplateColumns = "0.7fr repeat(4, 0.8fr)";
    } else {
      body.style.gridTemplateColumns = "0.7fr repeat(5, 0.7fr)";
    }

    for (let index = 0; index < titulos_modos.length; index++) {
      titulos_modos[index].style.visibility = "visible";
    }

    if (count >= 1) {
      document.querySelectorAll(".icone.menu button")[0].style.rotate = "0deg";
      document.getElementsByTagName("body")[0].style = "";

      for (let index = 0; index < titulos_modos.length; index++) {
        titulos_modos[index].style.visibility = "collapse";
      }

      count = 0;
    } else count++;
  });
// ======================================================================= //

document
  .querySelectorAll(".icone.modo_cientifico")[0]
  .addEventListener("click", function () {
    body.id = "calculadora_cientifica";
  });

document
  .querySelectorAll(".icone.modo_programador")[0]
  .addEventListener("click", function () {
    body.id = "calculadora_programador";
  });
