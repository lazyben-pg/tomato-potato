import React from 'react'
import Todoinput from './todoinput'
import Todoitem from './todoitem'
import axios from '../../config/axios'
import './todo.scss'

interface ITodoState {
  todos: any
}

class Todo extends React.Component<any, ITodoState> {
  constructor(props: any) {
    super(props)
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    axios.get('/todos')
      .then(res => {
        let todos = res.data.resources
        const newTodos = todos.map((t: any) => Object.assign({}, t, { 'editing': false }))
        this.setState({ todos: newTodos })
        console.log(this.state.todos)
      })
  }

  addTodo = async (params: any) => {
    await axios.post('todos', params)
      .catch((err) => { throw new (err) })
  }

  get unDeletedTodos() {
    return this.state.todos.filter((t: any) => !t.deleted)
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t: any) => !t.completed)
  }

  get completedTodos() {
    return this.state.todos.filter((t: any) => t.completed)
  }

  onEditing = (id: number) => {
    const todos = this.state.todos
    const newTodos = todos.map((t: any) => {
      if (id === t.id) {
        return Object.assign({}, t, { editing: true })
      } else {
        return Object.assign({}, t, { editing: false })
      }
    })
    this.setState({ todos: newTodos })
  }


  updateTodo = async (id: number, params: any) => {
    await axios.put(`todos/${id}`, params)
      .then(res => {
        const todos = this.state.todos
        const newTodos = todos.map((t: any) => {
          if (id === t.id) {
            return res.data.resource
          } else {
            return t
          }
        })
        this.setState({ todos: newTodos })
      })
      .catch(err => { throw new (err) })
  }

  render() {
    const { todos } = this.state
    return (
      <div id='todos'>
        <Todoinput addTodo={this.addTodo} />

        <div className="todolist">
          {
            this.unCompletedTodos.map((todo: any) => {
              return <Todoitem onEditing={this.onEditing} updateTodo={this.updateTodo} key={todo.id} {...todo} />
            })
          }
          {
            this.completedTodos.map((todo: any) => {
              return <Todoitem onEditing={this.onEditing} updateTodo={this.updateTodo} key={todo.id} {...todo} />
            })
          }
        </div>
      </div>
    )
  }
}

export default Todo