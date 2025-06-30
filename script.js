document.getElementById("button").addEventListener('click', function () {

const taksName = document.getElementById("lista_Tarefa").value.trim();
const priority = document.getElementById("importancia").value;

if (!taksName) {
  alert('Prencha o nome da tarefa!');
  return;
}

const taskItem = document.createElement("li");
taskItem.classList.add('task-item', priority);

const infoDiv = document.createElement("div");
infoDiv.classList.add('info');
infoDiv.innerText = `${taksName}`;


const deleteButton = document.createElement('button');
deleteButton.classList.add('button-excluir');
deleteButton.innerText = 'Excluir';
deleteButton.onclick = () => taskItem.remove();

const completeButton = document.createElement('button');
completeButton.classList.add('button-confirmar');
completeButton.innerText = 'Concluir';
completeButton.onclick = () => {
  taskItem.classList.add('completed');
  completeButton.remove();
  deleteButton.remove();
  const time = document.createElement('div');
  time.style.fontSize = '0.8em';
  time.innerText = `Concluida em ${new Date().toLocaleDateString()}`;
  taskItem.appendChild(time)
  document.getElementById('task_concluida').appendChild(taskItem);

}

const actionsDiv = document.createElement('div');
actionsDiv.classList.add('actions');
actionsDiv.appendChild(completeButton);
actionsDiv.appendChild(deleteButton);

taskItem.appendChild(infoDiv);
taskItem.appendChild(actionsDiv);
taskItem.appendChild(infoDiv);
taskItem.appendChild(deleteButton);
taskItem.appendChild(completeButton);
document.getElementById('task_pendente').appendChild(taskItem);

document.getElementById('lista_Tarefa').value = '';
document.getElementById('importancia').value = 'alta';


});