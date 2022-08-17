//Declarando variaveis
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const Mnome = document.querySelector('#m-nome');
const Mfuncao = document.querySelector('#m-funcao');
const Msalario = document.querySelector('#m-salario');
const save = document.querySelector('#save');

let itens;
let id;

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []; //pegar os itens do banco atraves do getIten, senao tiver mais vai retornar um array vazio
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)); //para setar os itens para dentro do banco de dados

function loadItens(){ //pegar os itens do banco, fazer um for em cada dado para que seja criado a cada linha atraves da funcao insertItem
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}
loadItens();

function insertItem(item, index) {
    let tr = document.createElement('tr');
//criando os td de nome, funcao, salario e as funcoes de editar e deletar 
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash' ></i></button>
    </td>
    `
    tbody.appendChild(tr); //conforme cada item for carregado 
}

function editItem(index) {
    openModal(true, index);
}
function deleteItem(index){
    itens.splce(index, 1); //passado o index do item e vai ser feito um splice removendo um item do array
    setItensBD(); //atualizar o banco
    loadItens(); //carregadr os dados em tela
}

function openModal(edit = false, index = 0) {
    modal.classList.remove('active'); 
    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active');
        }
    }

    if(edit){
       Mnome.value = itens[index].nome;
       Mfuncao.value = itens[index].funcao;
       Msalario.value = itens[index].salario;
       id = index; 
    }else{
        Mnome.value = '';
        Mfuncao.value = '';
        Msalario.value = '';
    }

}

save.onclick = e => {
    if(Mnome.value == '' || Mfuncao.value == '' || Msalario.value == '') {
        return;
    }
    
    e.preventDefault();
    if(id !== undefined) {
        itens[id].nome = Mnome.value;
        itens[id].funcao = Mfuncao.value;
        itens[id].salario = Msalario.value;
    }else{
        itens.push({'nome': Mnome.value, 'funcao': Mfuncao.value, 'salario': Msalario.value});
    }

    setItensBD();

    modal.classList.remove('active');
    loadItens();
    id = undefined;
}