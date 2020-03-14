import * as React from 'react'
import axios from '../../config/axios'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons';
import history from '../../config/history'
import IconFont from '../../iconfont/iconfont'
import Todo from '../todo/todo'
import './index.scss'

interface IIndexProps {
  history: any
}

interface IIndexState {
  user: any
}

const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item>
      <span><SettingOutlined />个人设置</span>
    </Menu.Item>
    <Menu.Item>
      <span onClick={logout}><LoginOutlined />注销</span>
    </Menu.Item>
  </Menu>
);

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
  async componentDidMount() {
    await this.getMe()
  }
  render() {
    return (
      <div id='index'>
        <header>
          <span className="logo-wraper">
            <IconFont type='icon-time' className="logo" />
            <span className='logo-text'>Tomato-Potato</span>
          </span>
          <Dropdown overlay={menu}>
            <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {this.state.user.account} <DownOutlined />
            </span>
          </Dropdown>
        </header>
        <Todo />
      </div>
    )
  }
}

export default Index