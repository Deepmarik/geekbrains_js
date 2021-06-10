'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'http://placehold.it/250x150',
        searchLine: '',
        filteredProducts: [],
        isVisibleCart: false,
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
            console.log(product.id_product);
        },

        filterGoods() {
            let text = this.searchLine.toLowerCase().trim();

            if (text === '') {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter((el) => {
                    return el.product_name.toLowerCase().includes(text);
                });
            }
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el)
                }
            });
        this.filteredProducts = this.products;
    }
});

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