import React from 'react'
import { Input } from 'antd'
import { EnterOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { addTodo } from '../../redux/reducers/actions'
import axios from '../../config/axios'

interface ITodoinputState {
  description: string,
}

interface ITodeInputProps {
  addTodo: (params: any) => {}
}


class Todoinput extends React.Component<any, ITodoinputState> {
  constructor(props: any) {
    super(props)
    this.state = {
      description: ''
    }
  }

  onKeyUp = (e: any) => {
    const { description } = this.state
    if (e.keyCode === 13 && description !== '') {
      this.postTodo()
    }
  }

  postTodo = async () => {
    if (this.state.description === '') return
    await axios.post('/todos', { description: this.state.description })
      .then(res => {
        this.props.addTodo(res.data.resource)
        this.setState({ description: '' })
      })
      .catch(e => { throw new Error(e) })
  }

  render() {
    const { description } = this.state
    const suffix = this.state.description ? <EnterOutlined onClick={this.postTodo} /> : <span />;
    return (
      <Input
        placeholder="输入想要开始的任务"
        suffix={suffix}
        onChange={e => { this.setState({ 'description': e.target.value }) }}
        onKeyUp={this.onKeyUp}
        value={description}
      />
    )
  }
}

const mapStateToProps = (state: any, ownState: any) => ({
  ...ownState
})

const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todoinput)
