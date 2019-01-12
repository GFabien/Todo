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
        <button v-on:click="deleteOne" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity">
            <img :src="imageGarbage" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity" alt="tick" />
        </button>
        <button v-if="done" v-on:click="deleteDone" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity">
            <img :src="imageCross" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity" alt="cross" class="move"/>
        </button>
        <button v-if="!done" v-on:click="deleteTodo" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity">
            <img :src="imageTick" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity" alt="tick" class="move"/>
        </button>
        <p>{{ name }}</p>
    </div>
    `,
  data() {
    return {
      imageCross: "./cross.png",
      imageTick: "./tick.png",
      imageGarbage: "./garbage.png"
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("todo-deleted", this.index);
    },
    deleteDone() {
      this.$emit("done-deleted", this.index);
    },
    deleteOne() {
        this.$emit("deletion", this.index);
    },
    increaseOpacity(e) {
        if (e.target.childNodes.length) e.target.childNodes[0].style.opacity = 1;
        else e.target.style.opacity = 1;
    },
    decreaseOpacity(e) {
        if (e.target.childNodes.length) e.target.childNodes[0].style.opacity = 0.3;
        else e.target.style.opacity = 0.3;
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
          <input type="submit" value="Add to-do">  
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
        @deletion=deleteOne
        @todo-deleted=deleteTodo
        @done-deleted=deleteDone></todo>
      </li>
    </ul>
    <button v-if="todos.length" v-on:click="deleteAllTodos" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity">
        <img :src="imageGarbage" v-on:mouseenter="increaseOpacity" v-on:mouseout="decreaseOpacity" alt="garbage" class="big"/>
    </button>
  </div>
      `,
  data() {
    return {
        imageGarbage: "./garbage.png"
    };
  },
  methods: {
    deleteTodo(index) {
      this.$emit("todo-deleted", this.todos[index]);
      this.todos.splice(index, 1);
    },
    deleteDone(index) {
      this.$emit("done-deleted", this.todos[index]);
      this.todos.splice(index, 1);
    },
    deleteAllTodos() {
        this.$emit("all-deleted", this.done);
    },
    deleteOne(index) {
        this.todos.splice(index, 1);
    },
    increaseOpacity(e) {
        if (e.target.childNodes.length) e.target.childNodes[0].style.opacity = 1;
        else e.target.style.opacity = 1;
    },
    decreaseOpacity(e) {
        if (e.target.childNodes.length) e.target.childNodes[0].style.opacity = 0.6;
        else e.target.style.opacity = 0.6;
    }
  },
  computed: {
    title() {
      if (this.done) {
        return "My done list";
      } else {
        return "My to-do list";
      }
    },
    legend() {
      if (this.done) {
        return "No done yet";
      } else {
        return "No to-do yet";
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
    },
    deleteAll(done) {
        if (done) {
            this.doneList = [];
        } else {
            this.todoList = [];
        }
    }
  }
});
