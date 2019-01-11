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

Vue.component('add-todo', {
    template: `
    <form>
        <p>
            <label for="newTodo">New todo:</label>
            <input id="newTodo" v-model="newTodo" required>
        </p>
        <p>
          <input type="submit" value="Submit">  
        </p>
    </form>
    `,
    data() {
        return {
            newTodo: null
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