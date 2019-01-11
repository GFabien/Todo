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
    <form @submit.prevent="onSubmit">
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
        onSubmit() {
            this.$emit('add-todo-submitted', newTodo);
            this.name = null;
        }
    },
    computed: {

    }
})

const app = new Vue({
    el: '#app',
    data: {
        todoList: []
    },
    methods: {
        addTodo(todo) {
            this.todoList.push(todo);
        }
    }
})