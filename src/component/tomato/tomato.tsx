import React from 'react'
import Tomatoinput from './tomatoinput'
import axios from '../../config/axios'
import { addTomato, updateTomato } from '../../redux/reducers/actions'
import { connect } from 'react-redux'
import './tomato.scss'

interface ITomatoProps {
  addTomato: (payload: any) => void,
  updateTomato: (patload: any) => void,
  tomatoes: any[]
}

class Tomato extends React.Component<ITomatoProps> {
  constructor(props: any) {
    super(props)
  }

  addTomato = async (params: any) => {
    await axios.post('/tomatoes', params)
      .then(res => { console.log(res.data); this.props.addTomato(res.data.resource) })
      .catch(err => { throw new Error(err) })
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter((t: any) => !t.description && !t.ended_at && !t.aborted)[0]
  }

  upDateTomato = (payload: any) => {
    this.props.updateTomato(payload)
  }

  render() {
    return (
      <div id="tomato">
        <Tomatoinput addTomato={this.addTomato} unfishedTomato={this.unfinishedTomato} updateTomato={this.upDateTomato} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  addTomato,
  updateTomato
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps)(Tomato)

