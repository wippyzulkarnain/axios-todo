import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import TodoDetail from "./TodoDetail";
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      inputDescription: ""
    };
  }
  componentDidMount() {
    this.getAllTodos();
  }
  deleteTodo = async index => {
    await axios
      .delete(`https://ib-api-todo-list.herokuapp.com/todos/${index}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.getAllTodos()
  };

  submitTodo = async () => {
    await axios
      .post("https://ib-api-todo-list.herokuapp.com/todos",{
        description: this.state.inputDescription,
        done: false
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.getAllTodos()
  };
  getAllTodos = () => {
    axios
      .get("https://ib-api-todo-list.herokuapp.com/todos")
      .then(res => this.setState({ todos: res.data.data }))
      .catch(err => console.log(err));
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        Description :
        <input
          type="text"
          name="inputDescription"
          value={this.state.inputDescription}
          onChange={this.handleOnChange}
        />
        <button onClick={() => this.submitTodo()}>Submit</button>
        {this.state.todos.map((todo, index) => (
          <TodoDetail
            description={todo.description}
            done={JSON.stringify(todo.done)}
            key={index}
            index={index}
            deleteTodo={this.deleteTodo}
          />
        ))}
      </div>
    );
  }
}

export default App;
