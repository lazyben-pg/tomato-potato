import * as React from 'react'
import { Button } from 'antd'
interface Ilogin {
  history: any
}

class Login extends React.Component<Ilogin> {
  constructor(props: any) {
    super(props)
  }
  goLogin() {
    this.props.history.push('index')
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.goLogin.bind(this)}>login</Button>
      </React.Fragment>
    )
  }
}

export default Login