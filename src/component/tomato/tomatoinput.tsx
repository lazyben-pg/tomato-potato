import React from 'react'
import { Button } from 'antd'

interface ITomatoinputProps {
  addTomato: (params: any) => any
}

class Tomatoinput extends React.Component<ITomatoinputProps> {
  constructor(props: any) {
    super(props)
  }

  addTomato = () => {
    this.props.addTomato({ 'duration': 60 * 1000 })
  }

  render() {
    return (
      <div id="tomatoinput">
        <Button onClick={this.addTomato}>开始番茄</Button>
      </div>
    )
  }
}

export default Tomatoinput