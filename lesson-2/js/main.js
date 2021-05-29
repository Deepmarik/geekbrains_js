var goodsListSection = document.getElementById('goods-list-section');

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
        this.switchButton = 0;
    }

    render() {
        let button = (this.switchButton === 0) ? '<button class="buy-btn">Купить</button>' : '<button class="buy-btn">Удалить из корзины</button>';

        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  ${button}
              </div>
          </div>`;
    }
}

class Cart {
    constructor() {
        this.goods = [];
        this.allProducts = [];
    }

    addCartItem(cartItem) {
        this.goods.push(cartItem);
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
        const block = document.getElementById('goods-list__product-box');

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            productObject.switchButton = 1;

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

var renderCart = () => {
    document.getElementById('goods-list__product-box').innerHTML = '';
    const list = new ProductList();
    const cart = new Cart();

    list.fetchGoods();
    cart.addCartItem(list.goods[0]);
    cart.addCartItem(list.goods[1]);
    cart.addCartItem(list.goods[2]);
    cart.render();

    cart.totalCartPrice();
    goodsListSection.style.display = 'block';
};

const catalog = new ProductList();
catalog.render();

document.querySelectorAll('.btn-cart')[0].addEventListener('click', () => {
    renderCart();
});

document.querySelectorAll('.goods-list-section__delete')[0].addEventListener('click', function() {
    document.getElementById('goods-list-section').style.display = 'none';
});

// class ProductList {
//   constructor(container = '.products') {
//     this.container = container;
//     this._goods = [];
//     this._allProducts = [];
//
//     this._fetchGoods();
//     this._render();
//   }
//
//   _fetchGoods() {
//     this._goods = [
//       {id: 1, title: 'Notebook', price: 20000},
//       {id: 2, title: 'Mouse', price: 1500},
//       {id: 3, title: 'Keyboard', price: 5000},
//       {id: 4, title: 'Gamepad', price: 4500},
//     ];
//   }
//
//   _render() {
//     const block = document.querySelector(this.container);
//
//     for (let product of this._goods) {
//       const productObject = new ProductItem(product);
//
//       this._allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());
//     }
//   }
// }
//
// class ProductItem {
//   constructor(product, img='https://via.placeholder.com/200x150') {
//     this.title = product.title;
//     this.price = product.price;
//     this.id = product.id;
//     this.img = img;
//   }
//
//   render() {
//     return `<div class="product-item" data-id="${this.id}">
//               <img src="${this.img}" alt="Some img">
//               <div class="desc">
//                   <h3>${this.title}</h3>
//                   <p>${this.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//   }
// }
//
// const catalog = new ProductList();
// catalog.fetchGoods();
// catalog.render();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);