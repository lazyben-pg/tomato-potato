import React from 'react'
import { Checkbox } from 'antd'
import classnames from 'classnames'
import { DeleteOutlined, EnterOutlined } from '@ant-design/icons'
import './todoitem.scss'

interface ITodoItemProps {
  id: number,
  description: string,
  editing: boolean,
  completed: boolean,
  updateTodo: (id: number, params: any) => void,
  onEditing: (id: number) => void
}

interface ITodoItemState {
  editText: string
}

class Todoitem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: any) {
    super(props)
    this.state = {
      editText: this.props.description
    }
  }

  onChecked = (e: any) => {
    this.props.updateTodo(this.props.id, { 'completed': e.target.checked })
  }

  onEditing = () => {
    this.props.onEditing(this.props.id)
  }

  onDeleted = () => {
    this.props.updateTodo(this.props.id, { 'deleted': true })
  }

  onUpdateDescription = () => {
    if (this.state.editText !== '' && this.props.description !== this.state.editText)
      this.props.updateTodo(this.props.id, { 'description': this.state.editText })
  }


  onKeyupUpdateDescription = (e: any) => {
    if (e.keyCode === 13) {
      console.log('update')
      this.onUpdateDescription()
    }
  }

  render() {
    const { editText } = this.state
    const { description, editing } = this.props

    const editingElement = (
      <div className="editing">
        <input
          type="text"
          value={editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={e => { this.onKeyupUpdateDescription(e) }}
          onBlur={this.onUpdateDescription}
        />
        <div className="options">
          <EnterOutlined className="item-icon" onClick={this.onUpdateDescription} />
          <DeleteOutlined className="item-icon" onClick={this.onDeleted} />
        </div>
      </div>

    )

    const textElement = (
      <span className='text' onDoubleClick={this.onEditing}>{description}</span>
    )

    const todoitemclass = classnames({
      todoitem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })

    return (
      <div className={todoitemclass}>
        <Checkbox onChange={this.onChecked} checked={this.props.completed} />
        {editing ? editingElement : textElement}
      </div>
    )
  }
}

export default Todoitem