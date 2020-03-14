import React from 'react'
import Todoinput from './todoinput'
import axios from '../../config/axios'

class Todo extends React.Component {
  addTodo = async (params: any) => {
    await axios.post('todos', params).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
  }
  render() {
    return (
      <div id='todo'>
        <Todoinput addTodo={this.addTodo} />
      </div>
    )
  }
}

export default Todo