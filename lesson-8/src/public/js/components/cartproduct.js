const cartproduct = {
    props: ['product', 'img'],
    template: `<div class="product-item" >
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }}</p>
					<span class="count">Quantity: {{product.quantity}}</span><br><br>
                    <button class="buy-btn" @click="$root.$refs.cart.remove(product); $emit('remove', product)">Delete</button>
                </div>
            </div>`
};
export const cartproducts = {
    data(){
      return {
          products: [],
          imgCatalog: `https://placehold.it/200x150`,
          filtered: [],
      }
    },
    components: {
        cartproduct
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
		remove(product){
			let prodIndex = this.filtered.findIndex(x => x.id_product === product.id_product);
			
			if(product.quantity > 1){
                this.filtered[prodIndex].quantity--;
            } else {
				this.filtered.splice(prodIndex, 1);
            }
		},
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
				console.log(data);
				if (data.contents.length) {
					for(let el of data.contents){
						this.products.push(el);
						this.filtered.push(el);
					}
				}
            });
    },
    template: `<div class="products">
						<div class="row products-empty" v-if="!filtered.length">Cart is empty</div>
						<cartproduct
						v-for="product of filtered" 
						:key="product.id_product"
						:product="product"
						:img="imgCatalog"
						@remove="remove"></cartproduct>
					</div>`
};
