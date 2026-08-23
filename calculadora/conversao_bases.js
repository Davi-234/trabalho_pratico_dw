function decimal_binaria(numero) {
  numero_binario = "";
  while (numero > 0) {
    numero_binario = (numero % 2) + numero_binario;
    numero = Math.floor(numero / 2);
  }
  return numero_binario;
}

function decimal_octal(numero) {
  numero_octal = "";
  while (numero > 0) {
    numero_octal = (numero % 8) + numero_octal;
    numero = Math.floor(numero / 8);
  }
  return numero_octal;
}

function decimal_hexadecimal(numero) {
  numero_hex = "";
  while (numero > 0) {
    resto = numero % 16;
    switch (resto) {
      case 10:
        resto = "A";
        break;
      case 11:
        resto = "B";
        break;
      case 12:
        resto = "C";
        break;
      case 13:
        resto = "D";
        break;
      case 14:
        resto = "E";
        break;
      case 15:
        resto = "F";
        break;
    }
    numero_hex = resto + numero_hex;
    numero = Math.floor(numero / 16);
  }
  return numero_hex;
}

function basequalquer_decimal(numero, base) {
  let decimal = 0;

  for (let i = 0; i < numero.length; i++) {
    let digito = numero[i];

    if (digito >= "A" && digito <= "F") {
      digito = digito.charCodeAt(0) - "A".charCodeAt(0) + 10;
    } else {
      digito = Number(digito);
    }

    decimal = decimal * base + digito;
  }

  return decimal;
}
