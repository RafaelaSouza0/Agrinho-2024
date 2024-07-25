document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    let cart = []; // Array para armazenar o carrinho

    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}
                <button class="increase-quantity">+</button>
                <button class="decrease-quantity">-</button>
                <button class="remove-from-cart">Remover</button>
            `;

            // Botões de aumento e diminuição de quantidade
            cartItem.querySelector('.increase-quantity').addEventListener('click', () => increaseQuantity(index));
            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => decreaseQuantity(index));
            cartItem.querySelector('.remove-from-cart').addEventListener('click', () => removeFromCart(index));

            cartItems.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2).replace('.', ',');
    }

    function addToCart(productName, productPrice) {
        const itemIndex = cart.findIndex(item => item.name === productName);
        if (itemIndex > -1) {
            cart[itemIndex].quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function increaseQuantity(index) {
        cart[index].quantity++;
        updateCart();
    }

    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            removeFromCart(index);
        }
        updateCart();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product');
            const productName = productElement.querySelector('h2').textContent;
            const productPriceText = productElement.querySelector('.produto-preco').textContent;
            const productPrice = parseFloat(productPriceText.replace('R$', '').replace(',', '.'));

            addToCart(productName, productPrice);
        });
    });
});
