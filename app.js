// Função para criar um cartão de pastel
function createCartItemCard(item) {
    const cartItemCard = document.createElement('div');
    cartItemCard.classList.add('cart-item-card'); // Adicione uma classe para estilização CSS
    
    // Cria e adiciona o título do pastel
    const itemName = document.createElement('h2');
    itemName.textContent = item.name;
    cartItemCard.appendChild(itemName);
    
    // Cria e adiciona a imagem do pastel
    const itemImage = document.createElement('img');
    itemImage.src = item.imageSrc;
    itemImage.alt = item.name;
    cartItemCard.appendChild(itemImage);
    
    // Cria e adiciona o preço do pastel
    const itemPrice = document.createElement('p');
    itemPrice.textContent = item.price;
    cartItemCard.appendChild(itemPrice);

    return cartItemCard;
}

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões "Adicionar ao Carrinho" pela classe
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Adiciona um evento de clique a cada botão
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtém os dados do pastel
            const itemName = button.parentElement.querySelector('.coluna__card__titulo').textContent;
            const itemImageSrc = button.parentElement.querySelector('img').src;
            const itemPrice = button.parentElement.querySelector('.coluna__card__preco').textContent;

            // Armazena os dados do pastel no localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push({ name: itemName, imageSrc: itemImageSrc, price: itemPrice });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Exibe o nome do pastel adicionado ao carrinho
            alert(itemName + ' Adicionado ao Carrinho');

            // Redireciona para a página do carrinho
            window.location.href = 'carrinho.html';
        });
    });

    // Recupera os itens do carrinho do localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Seleciona o elemento onde os itens do carrinho serão exibidos
    const cartItemsContainer = document.getElementById('itens-carrinho');

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Seu carrinho está vazio.';
        emptyCartMessage.classList.add('empty-cart-message');
        cartItemsContainer.appendChild(emptyCartMessage);
    } else {
        // Itera sobre os itens do carrinho e cria cartões de pastel correspondentes
        cartItems.forEach(item => {
            // Cria o cartão de pastel utilizando a função createCartItemCard
            const cartItemCard = createCartItemCard(item);
            
            // Adiciona o cartão do pastel ao contêiner do carrinho
            cartItemsContainer.appendChild(cartItemCard);
        });

        // Exibe o botão de pagar
        const pagarBtn = document.createElement('button');
        pagarBtn.textContent = 'Pagar';
        pagarBtn.id = 'pagar-btn';
        cartItemsContainer.appendChild(pagarBtn);

        // Exibe o botão de esvaziar carrinho
        const esvaziarBtn = document.createElement('button');
        esvaziarBtn.textContent = 'Esvaziar Carrinho';
        esvaziarBtn.id = 'esvaziar-btn';
        cartItemsContainer.appendChild(esvaziarBtn);
    }
});

//funções para pagar e esvaziar o carrinho
document.addEventListener('DOMContentLoaded', function() {
    const pagarBtn = document.getElementById('pagar-btn');
    const esvaziarBtn = document.getElementById('esvaziar-btn');

    pagarBtn.addEventListener('click', function() {
        localStorage.removeItem('cartItems');
        alert('Compra realizada com sucesso!');
    })

    esvaziarBtn.addEventListener('click', function() {
        localStorage.removeItem('cartItems');
        location.reload();
    });
});
