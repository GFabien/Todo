Vue.component('todo', {
    props: {
        name: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    template: `
    <div>
        <p>{{ name }}</p>
        <input type="checkbox" v-model="done">
        <button v-on:click="deleteTodo">Delete todo</button>
    </div>
    `,
    data() {
        return {
            done: false
        }
    },
    methods: {
        deleteTodo() {
            this.$emit('todo-deleted', this.index);
        }
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
            let todo = {
                name: this.newTodo,
                done: false
            }
            this.$emit('add-todo-submitted', todo);
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
        },
        deleteTodo(index) {
            this.todoList.splice(index, 1);
        }
    }
})