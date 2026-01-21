const STORAGE_KEY = 'productData';
let products = [];

const productForm = document.getElementById('product-form');
const inputNome = document.getElementById('nome');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('valor');
const messageArea = document.getElementById('message-area');
const productsTbody = document.getElementById('products-tbody');

const detailsModal = document.getElementById('details-modal');
const productDetails = document.getElementById('product-details');
const detailsCloseBtn = detailsModal.querySelector('.close-btn');

const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editId = document.getElementById('edit-id');
const editNome = document.getElementById('edit-nome');
const editDescricao = document.getElementById('edit-descricao');
const editValor = document.getElementById('edit-valor');
const editCloseBtn = editModal.querySelector('.close-btn');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
let filteredProducts = [];

function searchProducts() {
    const query = searchInput.value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.nome.toLowerCase().includes(query) || 
        product.descricao.toLowerCase().includes(query)
    );
}

searchBtn.addEventListener('click', () => {
    renderProductsTable();
});


function loadProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        products = JSON.parse(data);
    } else {
        products = [];
    }
}

function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}


function showMessage(message, type) {
    messageArea.textContent = message;
    messageArea.className = `message ${type}`;
    setTimeout(() => {
        messageArea.textContent = '';
        messageArea.className = 'message';
    }, 4000);
}

function validateProduct(nome, descricao, valor) {
    let message = '';
    
    if (nome.trim() === '') {
        message = 'O nome do produto não pode ser vazio.';
    } else if (descricao.trim() === '') {
        message = 'A descrição do produto não pode ser vazia.';
    } else if (isNaN(valor) || valor <= 0) {
        message = 'O valor deve ser um número positivo.';
    }

    return message;
}

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProductsTable() {
    productsTbody.innerHTML = ''; 

    searchProducts();
    filteredProducts.forEach(product => {
        const row = productsTbody.insertRow();
        row.dataset.id = product.id; 
        
        const nameCell = row.insertCell();
        const nameLink = document.createElement('span');
        nameLink.textContent = product.nome;
        nameLink.classList.add('product-name-link');
        nameLink.onclick = () => showDetailsModal(product.id);
        nameCell.appendChild(nameLink);

        const valueCell = row.insertCell();
        valueCell.textContent = formatCurrency(product.valor);

        const editCell = row.insertCell();
        editCell.innerHTML = `<i class="fas fa-edit action-icon" onclick="showEditModal('${product.id}')"></i>`;

        const deleteCell = row.insertCell();
        deleteCell.innerHTML = `<i class="fas fa-trash-alt action-icon" onclick="deleteProduct('${product.id}')"></i>`;
    });
}


productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = inputNome.value;
    const descricao = inputDescricao.value;
    const valor = parseFloat(inputValor.value);
    
    const validationError = validateProduct(nome, descricao, valor);

    if (validationError) {
        showMessage(`Falha no cadastro do produto! Motivo: ${validationError}`, 'error');
        return;
    }

    const newProduct = {
        id: Date.now().toString(), 
        nome,
        descricao,
        valor
    };

    products.push(newProduct);
    saveProducts();
    renderProductsTable();

    showMessage(`Produto ${newProduct.nome} incluído com sucesso!`, 'success');

    productForm.reset();
});

window.deleteProduct = function(productId) {
    const initialLength = products.length;
    products = products.filter(p => p.id !== productId);
    
    if (products.length < initialLength) {
        saveProducts();
        renderProductsTable();
    }
};

window.showEditModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    editId.value = product.id;
    editNome.value = product.nome;
    editDescricao.value = product.descricao;
    editValor.value = product.valor;

    editModal.style.display = 'block';
};

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = editId.value;
    const nome = editNome.value;
    const descricao = editDescricao.value;
    const valor = parseFloat(editValor.value);
    
    const validationError = validateProduct(nome, descricao, valor);

    if (validationError) {
        alert(`Falha ao salvar edição! Motivo: ${validationError}`);
        return;
    }

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products[productIndex].nome = nome;
        products[productIndex].descricao = descricao;
        products[productIndex].valor = valor;
        
        saveProducts();
        renderProductsTable();
        editModal.style.display = 'none'; 
    }
});

function showDetailsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productDetails.innerHTML = `
        <p><strong>ID:</strong> ${product.id}</p>
        <p><strong>Nome:</strong> ${product.nome}</p>
        <p><strong>Descrição:</strong> ${product.descricao}</p>
        <p><strong>Valor:</strong> ${formatCurrency(product.valor)}</p>
    `;

    detailsModal.style.display = 'block';
}


function setupModalClosers(modal, closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    renderProductsTable();
    setupModalClosers(detailsModal, detailsCloseBtn);
    setupModalClosers(editModal, editCloseBtn);
});