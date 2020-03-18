import React from 'react'

interface IPolygonProps {
  data: any,
  finishedCount: number
}

class Polygon extends React.Component<IPolygonProps> {
  constructor(props: any) {
    super(props)
  }

  points = () => {
    const dates = Object.keys(this.props.data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b)
    })
    const firstDay = dates[0]
    if (!firstDay) return '0,60 240,60'
    const lastDay = dates[dates.length - 1]
    const range = Date.parse(lastDay) - Date.parse(firstDay)
    let finishedCount = 0
    const pointslist = dates.map(d => {
      const x = (Date.parse(d) - Date.parse(firstDay)) / range * 240
      finishedCount += this.props.data[d].length
      const y = (1 - finishedCount / this.props.finishedCount) * 60
      return `${x},${y}`
    })
    return ['0,60', ...pointslist, '240,60'].join(' ')
  }

  public render() {
    return (
      <div className="polygon">
        <svg>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1" points={this.points()} />
        </svg>
      </div>
    )
  }
}


export default Polygon