function aritmetica_bases(expressao) {
  let tokens = tokenizar(expressao);
  let numero = "";
  let base = obterBase();

  tokens.forEach((element) => {
    if (
      typeof element === "string" &&
      element !== "+" &&
      element !== "-"
    ) {
      numero += basequalquer_decimal(element, base);
    } else {
      numero += element;
    }
  });

  console.log(tokens);
  console.log(numero);

  const resultado = eval(numero);
  return resultado;
}

const OPERADORES = ["+", "-"];
const SINAIS = ["+", "-"];
function tokenizar(expressao) {
  const tokensExpressao = [];
  let numero = "";
  let tokenAnterior = null;

  for (const c of expressao.replace(/\s/g, "")) {
    if (!isNaN(c) && c !== "") {
      numero += c;
    } else if (SINAIS.includes(c) && OPERADORES.includes(tokenAnterior)) {
      numero += c;
    } else if (OPERADORES.includes(c)) {
      if (numero) {
        tokensExpressao.push(numero);
        numero = "";
      }

      tokensExpressao.push(c);
    } else {
      // Aqui você precisará permitir A-F no hexadecimal
      if (/[a-fA-F]/.test(c)) {
        numero += c;
      } else {
        throw new Error("Syntax Error");
      }
    }

    tokenAnterior = c;
  }

  if (numero) {
    tokensExpressao.push(numero);
  }

  return tokensExpressao;
}
