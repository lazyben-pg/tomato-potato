import React from 'react'
import Todoinput from './todoinput'
import Todoitem from './todoitem'
import { connect } from 'react-redux'
import { initTodos } from '../../redux/reducers/actions'
import './todo.scss'

interface ITodoProps {
  todos: any[]
}

class Todo extends React.Component<ITodoProps> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  get unDeletedTodos() {
    return this.props.todos.filter((t: any) => !t.deleted)
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t: any) => !t.completed)
  }

  get completedTodos() {
    return this.unDeletedTodos.filter((t: any) => t.completed)
  }

  render() {
    return (
      <div id='todos'>
        <Todoinput />
        <div className="todolist">
          {
            this.unCompletedTodos.map((todo: any) => {
              return <Todoitem key={todo.id} {...todo} />
            })
          }
          {
            this.completedTodos.map((todo: any) => {
              return <Todoitem key={todo.id} {...todo} />
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  initTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)