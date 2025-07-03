let tarefasArray = [];

// Função para salvar tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
}

// Função para renderizar tarefas na tela
function renderizarTarefas() {
  document.getElementById('task_pendente').innerHTML = '';
  document.getElementById('task_concluida').innerHTML = '';

  tarefasArray.forEach((tarefa) => {
    const itemTarefa = document.createElement("li");
    itemTarefa.classList.add('task-item', tarefa.prioridade);
    if (tarefa.concluida) itemTarefa.classList.add('completed');

    const divInfo = document.createElement("div");
    divInfo.classList.add('info');

    const divTexto = document.createElement('div');
    divTexto.classList.add('texto');
    divTexto.innerText = tarefa.nome;

    const divAcoes = document.createElement('div');
    divAcoes.classList.add('acoes');

    if (!tarefa.concluida) {
      const botaoConcluir = document.createElement('button');
      botaoConcluir.classList.add('button-confirmar');
      botaoConcluir.innerText = 'Concluir';
      botaoConcluir.onclick = () => {
        tarefa.concluida = true;
        tarefa.dataConclusao = new Date().toLocaleString();
        salvarTarefas();
        renderizarTarefas();
      };
      divAcoes.appendChild(botaoConcluir);
    } else {
      const data = document.createElement('span');
      data.classList.add('data-termino');
      data.style.fontSize = '0.8em';
      data.innerText = `Concluída em ${tarefa.dataConclusao}`;
      divAcoes.appendChild(data);
    }

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('button-excluir');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.onclick = () => {
      tarefasArray = tarefasArray.filter((t) => t !== tarefa);
      salvarTarefas();
      renderizarTarefas();
    };

    divAcoes.appendChild(botaoExcluir);
    divInfo.appendChild(divTexto);
    divInfo.appendChild(divAcoes);
    itemTarefa.appendChild(divInfo);

    if (tarefa.concluida) {
      document.getElementById('task_concluida').appendChild(itemTarefa);
    } else {
      document.getElementById('task_pendente').appendChild(itemTarefa);
    }
  });
}

// Evento para adicionar nova tarefa
document.getElementById("button").addEventListener('click', function () {
  const nomeTarefa = document.getElementById("lista_Tarefa").value.trim();
  const prioridade = document.getElementById("importancia").value;

  if (!nomeTarefa) {
    alert('Preencha o nome da tarefa!');
    document.getElementById("lista_Tarefa").focus();
    return;
  }

  const novaTarefa = {
    nome: nomeTarefa,
    prioridade: prioridade,
    concluida: false,
    dataConclusao: null
  };

  tarefasArray.push(novaTarefa);
  salvarTarefas();
  renderizarTarefas();

  document.getElementById('lista_Tarefa').value = '';
  document.getElementById('importancia').value = 'alta';
});

// Filtro por prioridade nas concluídas
document.getElementById("filtro_prioridade").addEventListener("change", function () {
  const valorFiltro = this.value;
  const tarefas = document.querySelectorAll("#task_concluida li");

  tarefas.forEach((tarefa) => {
    if (valorFiltro === "todas" || tarefa.classList.contains(valorFiltro)) {
      tarefa.style.display = "flex";
    } else {
      tarefa.style.display = "none";
    }
  });
});

// Busca por texto nas pendentes e concluídas
document.getElementById("buscar_tarefa").addEventListener("input", function () {
  const termo = this.value.toLowerCase();

  const filtrar = (seletor) => {
    const tarefas = document.querySelectorAll(seletor);
    tarefas.forEach((tarefa) => {
      const texto = tarefa.querySelector(".texto").innerText.toLowerCase();
      tarefa.style.display = texto.includes(termo) ? "flex" : "none";
    });
  };

  filtrar("#task_pendente li");
  filtrar("#task_concluida li");
});

// Carregar tarefas do localStorage ao iniciar
window.onload = function () {
  const salvas = JSON.parse(localStorage.getItem("tarefas"));
  if (salvas) {
    tarefasArray = salvas;
    renderizarTarefas();
  }
};