Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `<form action="#" method="post" class="form-inline mt-2 mt-md-0 mr-5" @submit.prevent="$parent.$refs.products.filter(searchLine)">
                <input type="text" class="form-control mr-sm-2" placeholder="Search word" v-model="searchLine">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>`
});