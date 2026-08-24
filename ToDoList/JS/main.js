// ============================================================
// SELETORES
// Obtém elementos do HTML para podermos manipulá-los com JavaScript.
// ============================================================

const clienteEntrada = document.querySelector(".todo-input");
const diaMarcado = document.querySelector(".diaMarcado");
const endereco = document.querySelector(".endereco");
const botaoTarefa = document.querySelector(".todo-btn");
const listaTarefas = document.querySelector(".todo-list");

// ============================================================
// OUVINTES DE EVENTOS (EVENT LISTENERS)
// ============================================================

// Quando o botão de adicionar for clicado, executa a função adicionarTarefa.
botaoTarefa.addEventListener("click", adicionarTarefa);

// Quando houver um clique dentro da lista de tarefas,
// executa a função verificarTarefa.
// Isso permite detectar cliques nos botões de concluir e excluir.
listaTarefas.addEventListener("click", verificarTarefa);

// Quando o documento HTML terminar de ser carregado,
// recupera as tarefas que estavam salvas no Local Storage.
document.addEventListener("DOMContentLoaded", obterTarefas);

// ============================================================
// TEMA
// ============================================================

// Tenta recuperar o tema anteriormente salvo no Local Storage.
let temaSalvo = localStorage.getItem("savedTheme");

// Se nenhum tema tiver sido salvo, utiliza o tema padrão.
// Caso contrário, utiliza o tema que já estava salvo.
temaSalvo === null
  ? alterarTema("standard")
  : alterarTema(localStorage.getItem("savedTheme"));

// ============================================================
// ADICIONAR TAREFA
// ============================================================

function adicionarTarefa(evento) {
  // Impede o comportamento padrão do formulário.
  evento.preventDefault();

  // --------------------------------------------------------
  // VALIDAÇÃO DOS INPUTS
  // --------------------------------------------------------

  // Verifica se algum dos campos está vazio.
  if (
    clienteEntrada.value.trim() === "" ||
    diaMarcado.value === "" ||
    endereco.value.trim() === ""
  ) {
    alert("Você deve preencher todos os inputs!");

    return;
  }

  // --------------------------------------------------------
  // CRIA O OBJETO DA TAREFA
  // --------------------------------------------------------

  // Em vez de guardar tudo como uma única string,
  // cada informação é armazenada separadamente.
  const tarefa = {
    cliente: clienteEntrada.value.trim(),

    data: diaMarcado.value,

    endereco: endereco.value.trim(),
  };

  // --------------------------------------------------------
  // CRIA A DIV DA TAREFA
  // --------------------------------------------------------

  const divTarefa = document.createElement("div");

  divTarefa.classList.add("todo", `${temaSalvo}-todo`);

  // --------------------------------------------------------
  // CRIA O CONTEÚDO DA TAREFA
  // --------------------------------------------------------

  const novaTarefa = document.createElement("li");

  novaTarefa.classList.add("todo-item");

  // --------------------------------------------------------
  // CLIENTE
  // --------------------------------------------------------

  const cliente = document.createElement("p");

  cliente.innerText = `Cliente: ${tarefa.cliente}`;

  // --------------------------------------------------------
  // DATA
  // --------------------------------------------------------

  const data = document.createElement("p");

  data.innerText = `Data: ${tarefa.data}`;

  // --------------------------------------------------------
  // ENDEREÇO
  // --------------------------------------------------------

  const enderecoTarefa = document.createElement("p");

  enderecoTarefa.innerText = `Endereço: ${tarefa.endereco}`;

  // --------------------------------------------------------
  // ADICIONA OS INPUTS AO <LI>
  // --------------------------------------------------------

  novaTarefa.appendChild(cliente);

  novaTarefa.appendChild(data);

  novaTarefa.appendChild(enderecoTarefa);

  // Coloca o <li> dentro da DIV.
  divTarefa.appendChild(novaTarefa);

  // --------------------------------------------------------
  // SALVA A TAREFA NO LOCAL STORAGE
  // --------------------------------------------------------

  salvarLocalmente(tarefa);

  // --------------------------------------------------------
  // BOTÃO DE CONCLUSÃO
  // --------------------------------------------------------

  const botaoConcluir = document.createElement("button");

  botaoConcluir.innerHTML = '<i class="fas fa-check"></i>';

  botaoConcluir.classList.add("check-btn", `${temaSalvo}-button`);

  divTarefa.appendChild(botaoConcluir);

  // --------------------------------------------------------
  // BOTÃO DE EXCLUSÃO
  // --------------------------------------------------------

  const botaoExcluir = document.createElement("button");

  botaoExcluir.innerHTML = '<i class="fas fa-trash"></i>';

  botaoExcluir.classList.add("delete-btn", `${temaSalvo}-button`);

  divTarefa.appendChild(botaoExcluir);

  // --------------------------------------------------------
  // ADICIONA A TAREFA À LISTA
  // --------------------------------------------------------

  listaTarefas.appendChild(divTarefa);

  // --------------------------------------------------------
  // LIMPA OS INPUTS
  // --------------------------------------------------------

  clienteEntrada.value = "";

  diaMarcado.value = "";

  endereco.value = "";
}

// ============================================================
// VERIFICAR TAREFA
// ============================================================

function verificarTarefa(evento) {
  // Obtém o elemento que recebeu o clique.
  const itemClicado = evento.target;

  // --------------------------------------------------------
  // EXCLUIR TAREFA
  // --------------------------------------------------------

  // Verifica se o elemento clicado possui a classe "delete-btn".
  if (itemClicado.classList[0] === "delete-btn") {
    // Adiciona a classe "fall", responsável pela animação
    // de desaparecimento da tarefa.
    itemClicado.parentElement.classList.add("fall");

    // Remove a tarefa também do Local Storage.
    removerTarefaLocalmente(itemClicado.parentElement);

    // Espera a animação terminar antes de remover
    // definitivamente o elemento da página.
    itemClicado.parentElement.addEventListener("transitionend", function () {
      // Remove a tarefa do HTML.
      itemClicado.parentElement.remove();
    });
  }

  // --------------------------------------------------------
  // CONCLUIR / DESMARCAR TAREFA
  // --------------------------------------------------------

  // Verifica se o elemento clicado possui a classe "check-btn".
  if (itemClicado.classList[0] === "check-btn") {
    // Adiciona ou remove a classe "completed".
    //
    // Se a tarefa não estiver concluída:
    //     adiciona "completed".
    //
    // Se já estiver concluída:
    //     remove "completed".
    itemClicado.parentElement.classList.toggle("completed");
  }
}

// ============================================================
// SALVAR TAREFAS NO LOCAL STORAGE
// ============================================================

function salvarLocalmente(tarefa) {
  // Declara a variável que armazenará todas as tarefas.
  let tarefas;

  // Verifica se já existe uma lista de tarefas no Local Storage.
  if (localStorage.getItem("todos") === null) {
    // Caso não exista, cria uma lista vazia.
    tarefas = [];
  } else {
    // Caso exista, recupera os dados armazenados.

    // JSON.parse() transforma o texto armazenado em um
    // objeto/array JavaScript.
    tarefas = JSON.parse(localStorage.getItem("todos"));
  }

  // Adiciona a nova tarefa ao array.
  tarefas.push(tarefa);

  // JSON.stringify() transforma o array em texto JSON,
  // permitindo que ele seja armazenado no Local Storage.
  localStorage.setItem("todos", JSON.stringify(tarefas));
}

// ============================================================
// OBTER TAREFAS
// ============================================================
function obterTarefas() {
  // Declara a variável que armazenará as tarefas.
  let tarefas;

  // Verifica se existem tarefas armazenadas.
  if (localStorage.getItem("todos") === null) {
    // Caso não existam, utiliza um array vazio.
    tarefas = [];
  } else {
    // Recupera as tarefas armazenadas.
    tarefas = JSON.parse(localStorage.getItem("todos"));
  }

  // Percorre todas as tarefas armazenadas.
  tarefas.forEach(function (tarefa) {
    // ----------------------------------------------------
    // CRIA A DIV DA TAREFA
    // ----------------------------------------------------

    const divTarefa = document.createElement("div");

    divTarefa.classList.add("todo", `${temaSalvo}-todo`);

    // ----------------------------------------------------
    // CRIA O ELEMENTO <LI>
    // ----------------------------------------------------

    const novaTarefa = document.createElement("li");

    novaTarefa.classList.add("todo-item");

    // ----------------------------------------------------
    // CLIENTE
    // ----------------------------------------------------

    const cliente = document.createElement("p");

    cliente.innerText = `Cliente: ${tarefa.cliente}`;

    // ----------------------------------------------------
    // DATA
    // ----------------------------------------------------

    const data = document.createElement("p");

    data.innerText = `Data: ${tarefa.data}`;

    // ----------------------------------------------------
    // ENDEREÇO
    // ----------------------------------------------------

    const enderecoTarefa = document.createElement("p");

    enderecoTarefa.innerText = `Endereço: ${tarefa.endereco}`;

    // ----------------------------------------------------
    // ADICIONA OS DADOS AO <LI>
    // ----------------------------------------------------

    novaTarefa.appendChild(cliente);

    novaTarefa.appendChild(data);

    novaTarefa.appendChild(enderecoTarefa);

    // Coloca o <li> dentro da DIV.
    divTarefa.appendChild(novaTarefa);

    // ----------------------------------------------------
    // BOTÃO DE CONCLUSÃO
    // ----------------------------------------------------

    const botaoConcluir = document.createElement("button");

    botaoConcluir.innerHTML = '<i class="fas fa-check"></i>';

    botaoConcluir.classList.add("check-btn", `${temaSalvo}-button`);

    divTarefa.appendChild(botaoConcluir);

    // ----------------------------------------------------
    // BOTÃO DE EXCLUSÃO
    // ----------------------------------------------------

    const botaoExcluir = document.createElement("button");

    botaoExcluir.innerHTML = '<i class="fas fa-trash"></i>';

    botaoExcluir.classList.add("delete-btn", `${temaSalvo}-button`);

    divTarefa.appendChild(botaoExcluir);

    // ----------------------------------------------------
    // ADICIONA A TAREFA À LISTA
    // ----------------------------------------------------

    listaTarefas.appendChild(divTarefa);
  });
}
// ============================================================
// REMOVER TAREFA DO LOCAL STORAGE
// ============================================================

function removerTarefaLocalmente(tarefaElemento) {
  let tarefas;

  if (localStorage.getItem("todos") === null) {
    tarefas = [];
  } else {
    tarefas = JSON.parse(localStorage.getItem("todos"));
  }

  // Obtém os dados exibidos no HTML.
  const cliente = tarefaElemento.children[0].children[0].innerText.replace(
    "Cliente: ",
    "",
  );

  const data = tarefaElemento.children[0].children[1].innerText.replace(
    "Data: ",
    "",
  );

  const endereco = tarefaElemento.children[0].children[2].innerText.replace(
    "Endereço: ",
    "",
  );

  // Procura o objeto correspondente.
  const indiceTarefa = tarefas.findIndex(function (tarefa) {
    return (
      tarefa.cliente === cliente &&
      tarefa.data === data &&
      tarefa.endereco === endereco
    );
  });

  // Remove somente se encontrou a tarefa.
  if (indiceTarefa !== -1) {
    tarefas.splice(indiceTarefa, 1);
  }

  localStorage.setItem("todos", JSON.stringify(tarefas));
}
// ============================================================
// ALTERAR TEMA
// ============================================================

function alterarTema() {
  // Define o tema que será utilizado.
  //
  // Atenção: no código original o tema é sempre definido
  // como "standard-theme", independentemente do argumento
  // passado para changeTheme().
  let cor = "standard-theme";

  // Salva o tema escolhido no Local Storage.
  localStorage.setItem("savedTheme", cor);

  // Recupera novamente o tema salvo.
  temaSalvo = localStorage.getItem("savedTheme");

  // Altera a classe do <body>.
  // Isso permite que o CSS altere a aparência da página.
  document.body.className = cor;

  // --------------------------------------------------------
  // ALTERA O CURSOR / TÍTULO PARA TEMAS ESCUROS
  // --------------------------------------------------------

  // Se o tema for "darker", adiciona a classe
  // "darker-title" ao título.
  //
  // Caso contrário, remove essa classe.
  cor === "darker"
    ? document.getElementById("title").classList.add("darker-title")
    : document.getElementById("title").classList.remove("darker-title");

  // --------------------------------------------------------
  // ALTERA A COR DO CAMPO DE ENTRADA
  // --------------------------------------------------------

  // Obtém o primeiro elemento <input> da página
  // e altera sua classe CSS.
  document.querySelector("input").className = `${cor}-input`;

  // --------------------------------------------------------
  // ALTERA A COR DAS TAREFAS
  // --------------------------------------------------------

  // Obtém todas as tarefas existentes.
  document.querySelectorAll(".todo").forEach((tarefa) => {
    // Verifica se a tarefa possui a classe "completed".
    const estaConcluida = Array.from(tarefa.classList).some(
      (classe) => classe === "completed",
    );

    // Se estiver concluída, mantém a classe "completed".
    if (estaConcluida) {
      tarefa.className = `todo ${cor}-todo completed`;
    } else {
      // Caso contrário, utiliza apenas as classes
      // correspondentes ao tema.
      tarefa.className = `todo ${cor}-todo`;
    }
  });

  // --------------------------------------------------------
  // ALTERA A COR DOS BOTÕES
  // --------------------------------------------------------

  // Obtém todos os botões da página.
  document.querySelectorAll("button").forEach((botao) => {
    // Verifica qual é o tipo do botão.
    Array.from(botao.classList).some((classe) => {
      // Botão de concluir tarefa.
      if (classe === "check-btn") {
        botao.className = `check-btn ${cor}-button`;
      }

      // Botão de excluir tarefa.
      else if (classe === "delete-btn") {
        botao.className = `delete-btn ${cor}-button`;
      }

      // Botão utilizado para adicionar tarefa.
      else if (classe === "todo-btn") {
        botao.className = `todo-btn ${cor}-button`;
      }
    });
  });
}
