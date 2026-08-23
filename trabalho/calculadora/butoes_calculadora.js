document
  .getElementsByClassName("btn-limpar")[0]
  .addEventListener("click", () => {
    limpar();
  });
document
  .getElementsByClassName("btn-apagar")[0]
  .addEventListener("click", () => {
    apagarChar();
  });
document
  .getElementsByClassName("btn-igual")[0]
  .addEventListener("click", () => {
    resultado();
  });
const btns_numerics = Array.from(
  document.getElementsByClassName("numeric-btn"),
);
btns_numerics.forEach((element) => {
  element.addEventListener("click", function () {
    inserirDados(element.innerHTML);
  });
});
const btns_operators = Array.from(
  document.getElementsByClassName("operator-btn"),
);
btns_operators.forEach((element) => {
  element.addEventListener("click", function () {
    if (element.classList.contains('btn-potencia')) {
      inserirDados('^')
      return;
    }
    inserirDados(element.innerHTML);
  });
});

const btn_numeric_hex = Array.from(
  document.getElementsByClassName("btn-numeric-hex"),
);

btn_numeric_hex.forEach((element) => {
  element.addEventListener("click", function () {
    inserirDados(element.innerHTML);
  });
});