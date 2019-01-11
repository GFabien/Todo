Vue.component('todo', {
    props: {
        name: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    template: `
    <p>{{ name }}</p>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    }
})

const app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
    }
})