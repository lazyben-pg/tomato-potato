import * as React from 'react'
import axios from '../../config/axios'
import { Button } from 'antd'

interface IIndexProps {
  history: any
}

interface IIndexState {
  user: any
}

class Index extends React.Component<IIndexProps, IIndexState> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }
  getMe = async () => {
    await axios.get('/me').then(res => { this.setState({ user: res.data }) })
  }
  logout = () => {
    localStorage.setItem('x-token', '')
    this.props.history.push('/login')
  }
  async componentDidMount() {
    await this.getMe()
  }
  render() {
    return (
      <div>
        <p>hello {this.state && this.state.user.account}</p>
        <Button onClick={this.logout}>登出</Button>
      </div>
    )
  }
}

export default Index