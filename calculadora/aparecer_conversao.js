function converter(expressao, resultadoDecimal = false) {
    const baseSelecionada =
        document.getElementsByClassName("modo_selecionado")[0];

    if (!baseSelecionada) {
        return;
    }

    let decimal;

    // Se vier de aritmetica_bases(), o valor já está em decimal.
    if (resultadoDecimal) {
        decimal = Number(expressao);
    }

    // Caso contrário, converte a expressão da base selecionada para decimal.
    else if (baseSelecionada.classList.contains("dec")) {
        decimal = Number(expressao);
    }

    else if (baseSelecionada.classList.contains("bin")) {
        decimal = basequalquer_decimal(expressao, 2);
    }

    else if (baseSelecionada.classList.contains("oct")) {
        decimal = basequalquer_decimal(expressao, 8);
    }

    else if (baseSelecionada.classList.contains("hex")) {
        decimal = basequalquer_decimal(expressao, 16);
    }

    else {
        return;
    }

    // Converte o decimal para as demais bases.
    const binario = decimal_binaria(decimal);
    const octal = decimal_octal(decimal);
    const hexadecimal = decimal_hexadecimal(decimal);

    const campoBinario =
        document.querySelector("#visor_modo .bin .resultado");

    const campoDecimal =
        document.querySelector("#visor_modo .dec .resultado");

    const campoOctal =
        document.querySelector("#visor_modo .oct .resultado");

    const campoHexadecimal =
        document.querySelector("#visor_modo .hex .resultado");

    if (campoBinario) {
        campoBinario.innerHTML = binario;
    }

    if (campoDecimal) {
        campoDecimal.innerHTML = decimal;
    }

    if (campoOctal) {
        campoOctal.innerHTML = octal;
    }

    if (campoHexadecimal) {
        campoHexadecimal.innerHTML = hexadecimal;
    }

    // Retorna o resultado na base selecionada.
    if (baseSelecionada.classList.contains("dec")) {
        return String(decimal);
    }

    if (baseSelecionada.classList.contains("bin")) {
        return binario;
    }

    if (baseSelecionada.classList.contains("oct")) {
        return octal;
    }

    if (baseSelecionada.classList.contains("hex")) {
        return hexadecimal;
    }
}