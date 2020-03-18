import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { format } from 'date-fns'
import './statistics.scss'
import Polygon from './polygon'

class Statistics extends React.Component<any> {
  constructor(props: any) {
    super(props)
  }

  get finishedTodos() {
    return this.props.todos.filter((t: any) => t.completed && !t.deleted)
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, todos => {
      return format(Date.parse(todos.updated_at), 'yyyy/MM/dd')
    })
  }

  render() {
    return (
      <div id='statistics'>
        <ul>
          <li>统计</li>
          <li>统计</li>
          <li>统计</li>
          <li>统计 共完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} finishedCount={this.finishedTodos.length} />
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics)