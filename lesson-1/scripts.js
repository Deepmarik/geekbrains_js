'use strict';

const products = [
    { id: 1, title: 'Coke Cola, 0.5l', price: 80 },
    { id: 2, title: 'Sprite, 0.5l', price: 80 },
    { id: 3, title: 'Fanta, 1l', price: 150 },
    { id: 4, title: 'Bounty, 100g', price: 55 },
    { id: 5, title: 'Mars, 100g', price: 55 },
    { id: 6, title: 'Twix', price: 55 },
    { id: 7, title: 'Diroll, cold mint, 10g', price: 25 },
    { id: 8, title: 'Halls, colors, 40g', price: 100 },
    { id: 9, title: 'Bubble gum, 2g', price: 10},
    { id: 10, title: 'Cheetos, texas grill,300g', price: 300 },
];

const renderProduct = (item, img ='https://trydev.ru/placeholder.png') =>
             `<div class="product-item">
                <img src="${img}" alt="image" class="product-img">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-price">${item.price} руб</p>
                <button class="by-btn">В корзину</button>
            </div>`;

const renderProducts = list => {
    document.querySelector('.mainContainer').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item, item.img)).join(''));
};

renderProducts(products);
