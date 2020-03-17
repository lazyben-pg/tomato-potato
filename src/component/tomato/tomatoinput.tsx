import React from 'react'
import { Button, Input } from 'antd'
import Countdown from './countdown'
import axios from '../../config/axios'

interface ITomatoinputProps {
  addTomato: (params: any) => any,
  updateTomato: (layload: any) => void,
  unfishedTomato: any
}

interface ITomatoinputState {
  description: string
}

class Tomatoinput extends React.Component<ITomatoinputProps, ITomatoinputState> {
  constructor(props: any) {
    super(props)
    this.state = {
      description: ''
    }
  }

  componentDidMount() {
    console.log(this.props.unfishedTomato)
  }

  addTomato = () => {
    this.props.addTomato({ 'duration': 60 * 1000 })
  }

  updateTomato = async (params: any) => {
    await axios.put(`tomatoes/${this.props.unfishedTomato.id}`, params)
      .then(res => { this.props.updateTomato(res.data.resource) })
      .catch(err => { throw new Error(err) })
  }

  addDescription = () => {
    this.updateTomato({
      'description': this.state.description,
      'ended_at': new Date()
    })
    this.setState({ 'description': '' })
  }

  finish = () => {
    this.forceUpdate()
  }

  render() {
    let html = <div />
    if (this.props.unfishedTomato === undefined) {
      html = <Button onClick={this.addTomato}>开始番茄</Button>
    } else {
      const startedAt = Date.parse(this.props.unfishedTomato.started_at)
      const duration = this.props.unfishedTomato.duration
      const now = new Date().getTime()
      if (now - startedAt > duration) {
        html = (
          <div className="inputwrapper">
            <Input placeholder="请输入你刚刚完成的任务"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              onPressEnter={this.addDescription}
            />
          </div>)
      } else {
        html = (
          <div className="countdownwrapper">
            <Countdown timer={duration - now + startedAt} finish={this.finish} />
          </div>
        )
      }
    }
    return (
      <div id="tomatoinput">
        {html}
      </div>
    )
  }
}

export default Tomatoinput