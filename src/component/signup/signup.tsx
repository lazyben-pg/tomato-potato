import * as React from 'react'
import axios from '../../config/axios'
import { Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './signup.scss'

interface ISignupState {
  account: string,
  password: string,
  password_confirmation: string
}

interface ISignupProps {
  history: any
}

class Signup extends React.Component<ISignupProps, ISignupState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: '',
      password_confirmation: ''
    }
  }

  inputOnChange = (item: keyof ISignupState, value: string) => {
    const newState: any = {}
    newState[item] = value
    this.setState(newState)

  }

  submit = async () => {
    const { account, password, password_confirmation } = this.state
    await axios.post('sign_up/user', {
      account,
      password,
      password_confirmation
    })
      .then(() => { this.props.history.push('index') })
      .catch(err => { console.log(err) })
  }

  render() {
    const { account, password, password_confirmation } = this.state
    return (
      <div className="signup" id="signup">
        <h1>注 册</h1>
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
        <Input.Password
          placeholder="请重复密码"
          value={password_confirmation}
          onChange={e => { this.inputOnChange('password_confirmation', e.target.value) }}
        />
        <Button className="signup-btn" type="primary" onClick={this.submit} >注 册</Button>
        <p>如果已有账号，请 <Link to='/login'>登陆</Link></p>
      </div>
    )
  }
}

export default Signup