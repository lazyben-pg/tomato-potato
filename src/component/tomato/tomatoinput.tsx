import React from 'react'
import { Button } from 'antd'

class Tomatoinput extends React.Component {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <div id="tomatoinput">
        <Button>开始番茄</Button>
      </div>
    )
  }
}

export default Tomatoinput