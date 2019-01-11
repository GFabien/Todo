Vue.component("todo", {
  props: {
    name: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    done: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="todo">
        <button v-if="done" v-on:click="deleteDone"><img :src="imageCross" alt="cross"/></button>
        <button v-if="!done" v-on:click="deleteTodo"><img :src="imageTick" alt="tick"/></button>
        <p>{{ name }}</p>
    </div>
    `,
  data() {
    return {
      imageCross: "./cross.png",
      imageTick: "./tick.png"
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("todo-deleted", this.index);
    },
    deleteDone() {
      this.$emit("done-deleted", this.index);
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
        name: this.newTodo
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
    todos: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },
  template: `
  <div>
    <h1>{{ title }}</h1>
    <p v-if="!todos.length">{{ legend }}</p>
    <ul>
      <li v-for="(todo, index) in todos">
        <todo :name="todo.name" 
        :key="index"
        :index="index"
        :done="done"
        @todo-deleted=deleteTodo
        @done-deleted=deleteDone></todo>
      </li>
    </ul>
  </div>
      `,
  data() {
    return {};
  },
  methods: {
    deleteTodo(index) {
      this.$emit("todo-deleted", this.todos[index]);
      this.todos.splice(index, 1);
    },
    deleteDone(index) {
      this.$emit("done-deleted", this.todos[index]);
      this.todos.splice(index, 1);
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
    todoList: [],
    doneList: []
  },
  methods: {
    addTodo(todo) {
      this.todoList.push(todo);
    },
    addDone(todo) {
        this.doneList.push(todo);
    }
  }
});
