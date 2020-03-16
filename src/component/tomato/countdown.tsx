import React from 'react'

interface ICountdownProps {
  timer: number
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
    const timeId = setInterval(() => {
      this.setState({ timer: this.state.timer - 1000 })
      this.state.timer <= 0 && clearInterval(timeId)
    }, 1000)
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