Vue.component("todo", {
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
    <div class="todo">
        <button v-on:click="deleteTodo"><img :src="image" alt="cross"/></button>
        <p>{{ name }}</p>
    </div>
    `,
  data() {
    return {
      done: false,
      image: "./cross.png"
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("todo-deleted", this.index);
    }
  },
  computed: {}
});

Vue.component("add-todo", {
  template: `
    <form @submit.prevent="onSubmit">
        <p>
            <label for="newTodo">New todo:</label>
            <input id="newTodo" v-model="newTodo" required>
        </p>
        <p>
          <input type="submit" value="Add todo">  
        </p>
    </form>
    `,
  data() {
    return {
      newTodo: null
    };
  },
  methods: {
    onSubmit() {
      let todo = {
        name: this.newTodo,
        done: false
      };
      this.$emit("add-todo-submitted", todo);
      this.newTodo = null;
    }
  },
  computed: {}
});

Vue.component("todo-list", {
  template: `
  <div>
    <h1>My todolist</h1>
    <p v-if="!todoList.length">No todo yet</p>
    <ul>
      <li v-for="(todo, index) in todoList">
        <todo :name="todo.name" 
        :key="index"
        :index="index"
        @todo-deleted=deleteTodo></todo>
      </li>
    </ul>
    <add-todo @add-todo-submitted="addTodo"></add-todo>
  </div>
      `,
  data() {
    return {
      todoList: []
    };
  },
  methods: {
    addTodo(todo) {
      this.todoList.push(todo);
    },
    deleteTodo(index) {
      this.todoList.splice(index, 1);
    }
  },
  computed: {}
});

const app = new Vue({
  el: "#app",
  data: {
  },
  methods: {
  }
});
