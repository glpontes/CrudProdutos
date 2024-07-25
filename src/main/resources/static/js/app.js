async function fetchProdutos() {
    const response = await fetch('/api/produtos');
    const produtos = await response.json();
    const produtoList = document.getElementById('produtoList');
    produtoList.innerHTML = '';
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto';
        produtoDiv.innerHTML = `
            <strong>${produto.nome}</strong> Valor: R$${produto.preco} | ${produto.estoque || 0} em estoque  <!-- Atualizado para 'estoque' -->
            <button class="edit-btn" onclick="editProduto(${produto.id})">Editar</button>
            <button class="delete-btn" onclick="deleteProduto(${produto.id})">Deletar</button>
        `;
        produtoList.appendChild(produtoDiv);
    });
}

async function createOrUpdateProduto() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const estoque = parseInt(document.getElementById('estoque').value, 10);  // Atualizado para 'estoque'

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/produtos/${id}` : '/api/produtos';
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, preco, estoque })  // Atualizado para 'estoque'
    });

    if (response.ok) {
        document.getElementById('produtoForm').reset();
        fetchProdutos();
    }
}

async function editProduto(id) {
    const response = await fetch(`/api/produtos/${id}`);
    const produto = await response.json();

    document.getElementById('id').value = produto.id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('estoque').value = produto.estoque;  // Atualizado para 'estoque'
}

async function deleteProduto(id) {
    const response = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchProdutos();
    }
}

document.addEventListener('DOMContentLoaded', fetchProdutos);
F
