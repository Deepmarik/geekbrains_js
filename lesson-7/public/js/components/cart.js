Vue.component('cart', {
    data() {
        return {
            //cartUrl: `/getBasket.json`,
            isVisibleCart: false,
            cartItems: [],
            imgCart: 'https://via.placeholder.com/150',
            cartCounter: 0,
            cartTotalPrice: 0,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                            this.cartTotalPrice += find.price;
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`api/cart/${ product.id_product }/${ product.product_name }`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                            this.cartTotalPrice += prod.price;
                        }
                    })
                this.cartCounter++;
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.cartTotalPrice -= product.price;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ product.id_product }/${ product.product_name }`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            this.cartTotalPrice -= product.price;
                            this.cartCounter--;
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
					this.cartCounter++;
					this.cartTotalPrice += el.price;
                }
            });
    },
    template: `<div class="dropdown">
                    <button class="btn btn-info" type="button" @click='isVisibleCart = !isVisibleCart'>
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart <span class="badge badge-pill badge-danger">{{cartCounter}}</span>
                    </button>
                    <div class="dropdown-menu" v-show="isVisibleCart">
                        <div class="row total-header-section">
                            <div class="col-lg-6 col-sm-6 col-6">
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> <span class="badge badge-pill badge-danger">{{cartCounter}}</span>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-6 total-section text-right">
                                <p>Total: <span class="text-info">{{cartTotalPrice}} $</span></p>
                            </div>
                        </div>
                        <div class="cart-block">
                            <div class="row cart-detail cart-empty" v-if="!cartItems.length">Cart is empty</div>
                            <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :cart-item="item"
                            :img="imgCart"
                            @remove="remove"></cart-item>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-sm-12 col-12 text-center checkout">
                                <button class="btn btn-primary btn-block">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>`
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="row cart-detail">
                    <div class="col-lg-4 col-sm-4 col-4 cart-detail-img">
                        <img :src="img" :alt="cartItem.product_name">
                    </div>
                    <div class="col-lg-6 col-sm-6 col-6 cart-detail-product">
                        <p>{{cartItem.product_name}}</p>
                        <span class="price text-info">{{cartItem.quantity*cartItem.price}} $</span>
                        <span class="count">Quantity: {{cartItem.quantity}}</span>
                    </div>
                    <div class="col-lg-2 col-sm-2 col-2 cart-detail-delete">
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>`
})