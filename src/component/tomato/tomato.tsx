import React from 'react'
import Tomatoinput from './tomatoinput'
import axios from '../../config/axios'
import { addTomato } from '../../redux/reducers/actions'
import { connect } from 'react-redux'
import './tomato.scss'

interface ITomatoProps {
  addTomato: (payload: any) => void,
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

  render() {
    return (
      <div id="tomato">
        <Tomatoinput addTomato={this.addTomato} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  addTomato
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps)(Tomato)

