import * as React from 'react'
import axios from '../../config/axios'
import { Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './login.scss'

interface ISignupState {
  account: string,
  password: string,
}

interface ISignupProps {
  history: any
}

class Login extends React.Component<ISignupProps, ISignupState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
  }

  inputOnChange = (item: keyof ISignupState, value: string) => {
    const newState: any = {}
    newState[item] = value
    this.setState(newState)

  }

  submit = async () => {
    const { account, password } = this.state
    await axios.post('sign_in/user', {
      account,
      password,
    })
      .then((res) => { this.props.history.push('index') })
      .catch(err => { throw new (err) })
  }

  render() {
    const { account, password } = this.state
    return (
      <div className="login" id="login">
        <h1>登 陆</h1>
        <Input
          placeholder="请输入用户名字"
          prefix={<UserOutlined />}
          value={account}
          onChange={e => { this.inputOnChange('account', e.target.value) }}
        />
        <Input.Password
          placeholder="请输入密码"
          value={password}
          onChange={e => { this.inputOnChange('password', e.target.value) }}
        />
        <Button type="primary" className="login-btn" onClick={this.submit} >登 陆</Button>
        <p>如果没有账号，请 <Link to='/signup'>注册</Link></p>
      </div>
    )
  }
}

export default Login