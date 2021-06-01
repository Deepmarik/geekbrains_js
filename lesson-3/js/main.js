var goodsListSection = document.getElementById('goods-list-section');
const toCookie = (name, value) => {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
}

const fromCookie = (name) => {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
    }

    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
        this.openFromCart = 0;
        this.quantity = 0;
    }

    render() {
        let button = (this.openFromCart === 0) ?
            `<button class="buy-btn" onclick="addItemToCart(${this.id})">Купить</button>` :
            `<button class="buy-btn" onclick="deleteItemFromCart(${this.id})">Удалить из корзины</button>`;
        let quantity = (this.openFromCart === 1) ? `<span class="quantity">${this.quantity}</span>` : '';

        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                ${button}
                ${quantity}
              </div>
          </div>`;
    }
}

class Cart {
    constructor() {
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
    }

    // В данной простой реализации, список добавленных товаров и кол-во хронятся в cookie
    fetchGoods() {
        const cart = fromCookie('cart');
        this.goods = [];

        if (cart && cart.length !== 0) {
            // Из-за отсутствия бекенда, код далее эмулирует получение данных о товарах с него, по идентификатору товара
            for (let product of cart) {
                this.goods.push(this.returnProductsfromBackend(product));
            }
        }
    }


    // Эмитация получения данных о товаре с бэкенда
    returnProductsfromBackend(product) {
        let productId = product.id;
        let productQuantity = product.quantity;

        let backendGoods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];

        let findProduct = backendGoods.filter(el => el.id == productId)[0];

        findProduct['quantity'] = productQuantity;

        return findProduct;
    }

    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    render() {
        let listHtml = '';
        const block = document.getElementById('goods-list__product-box');
        block.innerHTML = '';

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            productObject.openFromCart = 1;
            productObject.quantity = product.quantity;

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }


        this.totalCartPrice();
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price * good.quantity;
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    // Добавление товара в корзину
    addItemToCart(id) {
        const cartProducts = fromCookie('cart');

        if (cartProducts) {
            const cartItemIndex = cartProducts.findIndex(el => el.id == id);

            if (cartItemIndex !== -1) {
                // Если товар уже есть в корзине, увеличиваем его кол-во
                cartProducts[cartItemIndex]['quantity'] = cartProducts[cartItemIndex]['quantity'] += 1;
                toCookie("cart", cartProducts);
            } else {
                // Если товара нет в к корзине, добавляем его в корзину
                cartProducts.push({ 'id': id, 'quantity': 1 });
                toCookie("cart", cartProducts);
            }
        } else {
            // Если еще нет добавленных товаров
            let cart = [];
            cart.push({ 'id': id, 'quantity': 1 });
            toCookie("cart", cart);
        }

        this.fetchGoods();
    }

    // Удаление товара из корзины
    deleteItemFromCart(id) {
        let cartProducts = fromCookie('cart');
        cartProducts = cartProducts.filter(el => el.id !== id);
        toCookie("cart", cartProducts);

        this.fetchGoods();
        this.render();
    }
}

// var renderCart = () => {
//     document.getElementById('goods-list__product-box').innerHTML = '';
//     const list = new ProductList();
//     const cart = new Cart();

//     list.fetchGoods();
//     cart.addCartItem(list.goods[0]);
//     cart.addCartItem(list.goods[1]);
//     cart.addCartItem(list.goods[2]);
//     cart.render();

//     cart.totalCartPrice();
//     goodsListSection.style.display = 'block';
// };


// Рендер каталога
const catalog = new ProductList();
catalog.render();

const cart = new Cart();
var openBasket = () => {
    cart.render();
    goodsListSection.style.display = 'block';
};
document.querySelectorAll('.btn-cart')[0].addEventListener('click', () => {
    openBasket();
});

document.querySelectorAll('.goods-list-section__delete')[0].addEventListener('click', function() {
    document.getElementById('goods-list-section').style.display = 'none';
});

const addItemToCart = (id) => {
    cart.addItemToCart(id);
}

const deleteItemFromCart = (id) => {
    cart.deleteItemFromCart(id);
}