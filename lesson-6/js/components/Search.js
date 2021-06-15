Vue.component('searchform', {
    props: ['value'],
    template: `
        <input type="text" class="form-control mr-sm-2" placeholder="Search word" 
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)">
    `
})