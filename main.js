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
    props: {
        done: {
          type: Boolean,
          required: true
        },
    },
  template: `
  <div>
    <h1>{{ title }}</h1>
    <p v-if="!todoList.length">{{ legend }}</p>
    <ul>
      <li v-for="(todo, index) in todoList">
        <todo :name="todo.name" 
        :key="index"
        :index="index"
        @todo-deleted=deleteTodo></todo>
      </li>
    </ul>
    <add-todo v-if="!done" @add-todo-submitted="addTodo"></add-todo>
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
  computed: {
      title() {
          if (this.done) {
              return "My done list";
          } else {
              return "My todo list";
          }
      },
      legend() {
          if (this.done) {
              return "No done yet";
          } else {
              return "No todo yet";
          }
      }
  }
});

const app = new Vue({
  el: "#app",
  data: {
  },
  methods: {
  }
});
