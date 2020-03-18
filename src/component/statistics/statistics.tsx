import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { format } from 'date-fns'
import './statistics.scss'
import Polygon from './polygon'
import { Progress } from 'antd';

class Statistics extends React.Component<any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  get finishedTodos() {
    return this.props.todos.filter((t: any) => t.completed && !t.deleted)
  }

  get finishedTomatoes() {
    return this.props.tomatoes.filter((t: any) => !t.aborted && t.ended_at)
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, todos => {
      return format(Date.parse(todos.updated_at), 'yyyy/MM/dd')
    })
  }

  get dailyTomatoes() {
    return _.groupBy(this.finishedTomatoes, tomato => {
      return format(Date.parse(tomato.ended_at), 'yyyy/MM/dd')
    })
  }

  getTodayTomatoesCount = () => {
    const tomatoesdates = Object.keys(this.dailyTomatoes)
    const today = format(new Date(), 'yyyy/MM/dd')
    return today !== tomatoesdates[0] ?
      0 :
      this.dailyTomatoes[tomatoesdates[0]] && this.dailyTomatoes[tomatoesdates[0]].length
  }


  render() {
    return (
      <div id='statistics'>
        <ul>
          <li>
            <div className='title'>目标</div>
            <div className='description'>今日目标</div>
            <div className='progress'>
              <span className='progress-text'>{this.getTodayTomatoesCount()}/8</span>
              <Progress className='progress-img'
                type="circle"
                percent={this.getTodayTomatoesCount() / 8 * 100}
                width={85}
                strokeColor='rgba(215,78,78,0.5)' />
            </div>
          </li>
          <li>
            <div className='history'>
              <div>
                <div>番茄历史</div>
                <div className='description'>累计完成个任务</div>
              </div>
              <span className='count'>{this.finishedTomatoes.length}</span>
            </div>
            <Polygon data={this.dailyTomatoes} finishedCount={this.finishedTomatoes.length} />
          </li>
          <li>
            <div className='history'>
              <div>
                <div>任务历史</div>
                <div className='description'>累计完成个任务</div>
              </div>
              <span className='count'>{this.finishedTodos.length}</span>
            </div>
            <Polygon data={this.dailyTodos} finishedCount={this.finishedTodos.length} />
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  tomatoes: state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics)