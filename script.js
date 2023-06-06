const inputTarefas = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefas.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
       if(!inputTarefas.value) return;
    criaTarefa(inputTarefas.value);
    }
});

function limpaInput() {
    inputTarefas.value = ''; 
    inputTarefas.focus();
}

function CriaBotãoApagar(li) {
    li.innerText += ' ';
    const btn = document.createElement('button');
    btn.innerText = 'Apagar';
    li.appendChild(btn);
    btn.setAttribute('class', 'apagar')
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    CriaBotãoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function (e) {
    if(!inputTarefas.value) return;
    criaTarefa(inputTarefas.value); 
});

document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listasDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listasDeTarefas.push(tarefaTexto);
    }

    const TarefasJSON = JSON.stringify(listasDeTarefas);
    localStorage.setItem('tarefas', TarefasJSON);
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listasDeTarefas = JSON.parse(tarefas);

    for (let tarefas of listasDeTarefas){
        criaTarefa(tarefas);
    }
}

addTarefasSalvas();

