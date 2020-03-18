import React from 'react'
import { format } from 'date-fns'
import './tomatolist.scss'

interface ITomatolistProps {
  finishedTomatoes: any
}

class Tomatolist extends React.Component<ITomatolistProps> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  get date() {
    return Object.keys(this.props.finishedTomatoes)
  }

  tomatoItem = (tomato: any) => {
    return (
      <div className="tomatoitem" key={tomato.id}>
        <span className="time">{format(Date.parse(tomato.started_at), 'HH:mm')} - {format(Date.parse(tomato.ended_at), 'HH:mm')}</span>
        <span className="description">{tomato.description}</span>
      </div>
    )
  }

  get tomatoesList() {
    return this.date.map(date => {
      const dailyTomatoes = this.props.finishedTomatoes[date]
      return (
        <div key={date} className='daliytomatoes'>
          <div className="title">
            <span className="date">{format(Date.parse(date), 'M月dd日')}</span>
            <span className="finishedcount">完成了{dailyTomatoes.length}个番茄时间</span>
          </div>
          <div className="details">
            {dailyTomatoes.map((ts: any) => this.tomatoItem(ts))}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="tomatolist" id='tomatolist'>
        {this.tomatoesList}
      </div>
    )
  }
}

export default Tomatolist