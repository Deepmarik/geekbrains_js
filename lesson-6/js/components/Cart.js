Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility', 'counter', 'totalPrice'],
    template: `<div class="dropdown-menu" v-show="visibility">
                <div class="row total-header-section">
                    <div class="col-lg-6 col-sm-6 col-6">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i> <span class="badge badge-pill badge-danger">{{counter}}</span>
                    </div>
                    <div class="col-lg-6 col-sm-6 col-6 total-section text-right">
                        <p>Total: <span class="text-info">{{totalPrice}} $</span></p>
                    </div>
                </div>
                <div class="cart-block">
                    <div class="row cart-detail cart-empty" v-if="!cartItems.length">Cart is empty</div>
                    <cart-item 
                    v-for="product of cartItems"  
                    :key="product.id_product"
                    :img="img"
                    :cart-item="product"></cart-item>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-12 text-center checkout">
                        <button class="btn btn-primary btn-block">Checkout</button>
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
                        <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>`
})

// EventBus
// Vuex