const button = document.querySelector('.botao-add')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('#listaDeTarefas')
const listaConcluida = document.querySelector('#listaDeTarefasConcluidas')

let minhaListaDeItens = []
let minhaListaDeItensConcluidos = []

button.addEventListener('click', adicionarNovaTarefa)
input.addEventListener("keydown", adicionarNovaTarefaEnter)

function adicionarNovaTarefa() {
    minhaListaDeItens.push(input.value)

    input.value = ''

    mostrarTarefas()
}

function adicionarNovaTarefaEnter (e) {
    if (e.key === "Enter") {
        minhaListaDeItens.push(input.value)
    
        input.value = ''
    
        mostrarTarefas()
    }
}

function mostrarTarefas() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, index) => {
        novaLi = novaLi + `

        <li class="task">
            <img src="./img/check.png" alt="check" onclick="concluirTarefa(${index})">
            <p>${item}</p>
            <img src="./img/lixeira.png" alt="lixeira" onclick="deletarItem(${index})">
        </li>

         `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function mostrarTarefasConcluidas() {

    let novaLi = ''

    minhaListaDeItensConcluidos.forEach((item, index) => {
        novaLi = novaLi + `
        <li class="task done">
            <p>${item}</p>
            <img src="./img/lixeira.png" alt="lixeira" onclick="deletar(${index})">
        </li>

        `
    })

    listaConcluida.innerHTML = novaLi
    
    //localStorage
}

function concluirTarefa(index) {
    minhaListaDeItensConcluidos.push(minhaListaDeItens.splice(index, 1))

    mostrarTarefas()
    mostrarTarefasConcluidas()
}

function deletarItem(index) {
    minhaListaDeItens.splice(index, 1)

    mostrarTarefas()
}

function deletar(index) {
    minhaListaDeItensConcluidos.splice(index, 1)

    mostrarTarefasConcluidas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

recarregarTarefas()