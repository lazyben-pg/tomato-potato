import React from 'react'
import Tomatoinput from './tomatoinput'
import './tomato.scss'

class Tomato extends React.Component {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <div id="tomato">
        <Tomatoinput />
      </div>
    )
  }
}

export default Tomato