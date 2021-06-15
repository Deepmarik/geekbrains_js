const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        isVisibleCart: false,
        searchLine: '',
        imgCart: 'https://via.placeholder.com/150',
        imgCatalog: 'https://via.placeholder.com/150',
        filteredProducts: [],
        cartItems: [],
        products: [],
        cartCounter: 0,
        cartTotalPrice: 0,

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                            this.cartTotalPrice += find.price;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod);
                            this.cartCounter++;
                            this.cartTotalPrice += prod.price;
                        }
                    }
                })
        },
        remove(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        this.cartTotalPrice -= product.price;

                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            this.cartCounter--;
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartCounter++;
                    this.cartItems.push(el);
                    this.cartTotalPrice += el.price;
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
    }
})

// 'use strict';

// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let app = new Vue({
//     el: '#app',
//     data: {
//         catalogUrl: '/catalogData.json',
//         products: [],
//         imgCatalog: 'https://via.placeholder.com/150',
//         searchLine: '',
//         filteredProducts: [],
//         isVisibleCart: false,
//     },
//     methods: {
//         getJson(url) {
//             return fetch(url)
//                 .then(result => result.json())
//                 .catch(error => {
//                     console.log(error)
//                 })
//         },
//         addProduct(product) {
//             console.log(product.id_product);
//         },

//         filterGoods() {
//             let text = this.searchLine.toLowerCase().trim();

//             if (text === '') {
//                 this.filteredProducts = this.products;
//             } else {
//                 this.filteredProducts = this.products.filter((el) => {
//                     return el.product_name.toLowerCase().includes(text);
//                 });
//             }
//         }
//     },
//     mounted() {
//         this.getJson(`${API + this.catalogUrl}`)
//             .then(data => {
//                 for (let el of data) {
//                     this.products.push(el)
//                 }
//             });
//         this.filteredProducts = this.products;
//     }
// });

//[
//     {
//       "id_product": 123,
//       "product_name": "Ноутбук",
//       "price": 45600
//     },
//     {
//       "id_product": 456,
//       "product_name": "Мышка",
//       "price": 1000
//     }
//   ]