import React from 'react'
import { Input } from 'antd'
import { EnterOutlined } from '@ant-design/icons'

interface ITodoinputState {
  description: string
}

interface ITodoinputProps {
  addTodo: any
}

class Todoinput extends React.Component<ITodoinputProps, ITodoinputState> {
  constructor(props: any) {
    super(props)
    this.state = {
      description: ''
    }
  }

  addTodo = (e: any) => {
    const { description } = this.state
    if (e.keyCode === 13 && description !== '') {
      this.postTodo()
    }
  }

  postTodo = async () => {
    const { description } = this.state
    await this.props.addTodo({ description })
    this.setState({ 'description': '' })
  }

  render() {
    const { description } = this.state
    const suffix = this.state.description ? <EnterOutlined onClick={this.postTodo} /> : <span />;
    return (
      <Input
        placeholder="输入想要开始的任务"
        suffix={suffix}
        onChange={e => { this.setState({ 'description': e.target.value }) }}
        onKeyUp={this.addTodo}
        value={description}
      />
    )
  }
}

export default Todoinput