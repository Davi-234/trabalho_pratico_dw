document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    switch (event.key) {

        // números
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            event.preventDefault();
            document.querySelector(`.btn-${event.key}`)?.click();
            break;

        // operadores
        case "+":
            event.preventDefault();
            document.querySelector(".btn-add")?.click();
            break;

        case "-":
            event.preventDefault();
            document.querySelector(".btn-subtract")?.click();
            break;

        case "*":
            event.preventDefault();
            document.querySelector(".btn-multiple")?.click();
            break;

        case "/":
            event.preventDefault();
            document.querySelector(".btn-divide")?.click();
            break;

        // igualdade
        case "Enter":
        case "=":
            event.preventDefault();
            document.querySelector(".btn-igual")?.click();
            break;

        // apagar
        case "Backspace":
            event.preventDefault();
            document.querySelector(".btn-apagar")?.click();
            break;

        // limpar
        case "Escape":
        case " ":
            event.preventDefault();
            document.querySelector(".btn-limpar")?.click();
            break;

        // hexadecimal
        case "a":
        case "b":
        case "c":
        case "d":
        case "e":
        case "f":
            if (
                document.body.id === "calculadora_programador" &&
                document.querySelectorAll(".hex .modo_selecionado").length > 0
            ) {
                event.preventDefault();
                document.querySelector(`.btn-${event.key}`)?.click();
            }
            break;
    }
});