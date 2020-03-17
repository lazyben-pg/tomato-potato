import React from 'react'
import { Button, Input, Popconfirm } from 'antd'
import Countdown from './countdown'
import axios from '../../config/axios'
import './tomatoinput.scss'
import { CloseCircleOutlined } from '@ant-design/icons'

interface ITomatoinputProps {
  addTomato: (params: any) => any,
  updateTomato: (layload: any) => void,
  unfishedTomato: any
}

interface ITomatoinputState {
  description: string,
  duration: number
}

class Tomatoinput extends React.Component<ITomatoinputProps, ITomatoinputState> {
  constructor(props: any) {
    super(props)
    this.state = {
      description: '',
      duration: 60 * 1000
    }
  }

  addTomato = () => {
    this.props.addTomato({ 'duration': this.state.duration })
  }

  updateTomato = async (params: any) => {
    await axios.put(`tomatoes/${this.props.unfishedTomato.id}`, params)
      .then(res => { this.props.updateTomato(res.data.resource) })
      .catch(err => { throw new Error(err) })
  }

  abortTomato = () => {
    this.updateTomato({ aborted: true })
  }

  addDescription = () => {
    this.updateTomato({
      'description': this.state.description,
      'ended_at': new Date()
    })
    this.setState({ 'description': '' })
  }

  countDownFinish = () => {                    //for countdown component
    this.forceUpdate()
  }

  confirm = () => {
    return (
      <Popconfirm
        title="你确定要终止这项任务吗？"
        onConfirm={this.abortTomato}
        okText="是"
        cancelText="否"
      >
        <CloseCircleOutlined style={{ position: 'absolute', right: '-5px', top: '-5px', background: '#fff' }} />
      </Popconfirm>
    )
  }

  showStartBtn = () => {
    return <Button className="starttomatobtn" onClick={this.addTomato}>开始番茄</Button>
  }

  showInputTomato = () => {
    return (
      <div className="inputwrapper">
        <Input placeholder="请输入你刚刚完成的任务"
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          onPressEnter={this.addDescription}
        />
        {this.confirm()}
      </div>
    )
  }

  showCountDown = (startedAt: number, duration: number, now: number) => {
    return (
      <div className="countdownwrapper">
        <Countdown timer={duration - now + startedAt} finish={this.countDownFinish} duration={this.state.duration} />
        {this.confirm()}
      </div>
    )
  }

  showWhich = () => {
    let html = <div />
    if (this.props.unfishedTomato === undefined) {
      html = this.showStartBtn()
    } else {
      const startedAt = Date.parse(this.props.unfishedTomato.started_at)
      const duration = this.props.unfishedTomato.duration
      const now = new Date().getTime()
      html = now - startedAt > duration ?
        this.showInputTomato() :
        this.showCountDown(startedAt, duration, now)
    }
    return html
  }

  render() {
    return (
      <div id="tomatoinput">
        {this.showWhich()}
      </div>
    )
  }
}

export default Tomatoinput