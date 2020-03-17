import React from 'react'

interface ICountdownProps {
  timer: number,
  finish: () => void
}

interface ICountdownState {
  timer: number
}

class Countdown extends React.Component<ICountdownProps, ICountdownState> {
  constructor(props: any) {
    super(props)
    this.state = {
      timer: this.props.timer
    }
  }

  componentDidMount() {
    let timeId: NodeJS.Timeout
    timeId = setInterval(() => {
      this.setState({ timer: this.state.timer - 1000 })
      this.state.timer < 1000 && this.finish(timeId)
    }, 1000)
  }

  finish = (timeId: NodeJS.Timeout) => {
    this.props.finish()
    clearInterval(timeId)
  }

  render() {
    const min = Math.floor(this.state.timer / 1000 / 60)
    const sec = Math.floor(this.state.timer / 1000 % 60)
    const time = `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
    return (
      <div>{time}</div>
    )
  }
}

export default Countdown