const uri = "http://localhost:3000/destinos";
let itens = [];

function loadItens() {
    fetch(uri)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar destinos');
            }
            return response.json();
        })
        .then(data => {
            itens = data;
            displayData('destinos', itens);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function displayData(destinos, data) {
    const tableBody = document.getElementById(`${destinos}TableBody`);
    if (!tableBody) {
        console.error(`Elemento ${destinos}TableBody não encontrado.`);
        return;
    }
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.valor}</td>
            <td>${formatDate(item.data)}</td>
            <td>
                <button onclick="editarItemForm('${destinos}', ${item.id}, '${item.nome}')">Editar</button>
                <button onclick="excluirItem(${item.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

function editarItemForm(destinos, id, nome) {
    const novoNome = prompt("Digite o novo nome:", nome);
    if (novoNome !== null) {
        editarItem(destinos, id, { nome: novoNome });
    }
}

async function editarItem(destinos, id, novoItem) {
    try {
        const response = await fetch(`${uri}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoItem)
        });
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText} ao editar o item com ID ${id} em ${destinos}`);
        }
        loadItens(); // Corrigido para recarregar os itens após a edição
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function excluirItem(id) {
    try {
        const response = await fetch(`${uri}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText} ao excluir o item com ID ${id}`);
        }
        loadItens(); // Corrigido para recarregar os itens após a exclusão
    } catch (error) {
        console.error('Erro:', error);
    }
}

function adicionarItemForm(destinos) {
    const nome = document.getElementById("nomeDestino").value;
    const valor = document.getElementById("valorDestino").value;
    const data = document.getElementById("dataDestino").value;
    
    const novoItem = { nome, valor, data };
    fetch(uri + "/hoteis", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoItem)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar hotel');
        }
        return response.json();
    })
    .then(responseData => {
        hoteis.push(responseData);
        displayData(destinos, hoteis); // Corrigido para passar 'destinos' e 'hoteis'
    })
    .catch(error => {
        console.error('Erro ao adicionar hotel:', error);
    });
}


loadItens();
