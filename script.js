document.getElementById("button").addEventListener('click', function () {
  const taksName = document.getElementById("lista_Tarefa").value.trim();
  const priority = document.getElementById("importancia").value;

  if (!taksName) {
    alert('Prencha o nome da tarefa!');
    document.getElementById("lista_Tarefa").focus()
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.classList.add('task-item', priority);

  // Cria a div info (flex container)
  const infoDiv = document.createElement("div");
  infoDiv.classList.add('info');

  // Texto da tarefa à esquerda
  const textoDiv = document.createElement('div');
  textoDiv.classList.add('texto');
  textoDiv.innerText = taksName;

  // Ações à direita
  const acoesDiv = document.createElement('div');
  acoesDiv.classList.add('acoes');

  // Botão concluir
  const completeButton = document.createElement('button');
  completeButton.classList.add('button-confirmar');
  completeButton.innerText = 'Concluir';

  // Botão excluir
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button-excluir');
  deleteButton.innerText = 'Excluir';

  deleteButton.onclick = () => taskItem.remove();

  completeButton.onclick = () => {
    taskItem.classList.add('completed');
    completeButton.remove();

    // Data de conclusão à direita
    const time = document.createElement('span');
    time.classList.add('data-termino');
    time.style.fontSize = '0.8em';
    time.innerText = `Concluída em ${new Date().toLocaleString()}`;
    acoesDiv.appendChild(time);

    document.getElementById('task_concluida').appendChild(taskItem);
  }

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
  document.getElementById("buscar_tarefa").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const tarefas = document.querySelectorAll("#task_pendente li");

  tarefas.forEach((tarefa) => {
    const texto = tarefa.querySelector(".texto").innerText.toLowerCase();
    tarefa.style.display = texto.includes(termo) ? "flex" : "none";
    // Salvar no localStorage
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
}

// Carregar ao iniciar
window.onload = function () {
  const salvas = JSON.parse(localStorage.getItem("tarefas"));
  if (salvas) {
    tarefasArray = salvas;
    renderizarTarefas();
  }
};
  });
});
 });
  // Monta as ações
  acoesDiv.appendChild(completeButton);
  acoesDiv.appendChild(deleteButton);

  // Monta a estrutura info
  infoDiv.appendChild(textoDiv);
  infoDiv.appendChild(acoesDiv);

  // Adiciona infoDiv ao item da lista
  taskItem.appendChild(infoDiv);

  document.getElementById('task_pendente').appendChild(taskItem);

  document.getElementById('lista_Tarefa').value = '';
  document.getElementById('importancia').value = 'alta';
  
});