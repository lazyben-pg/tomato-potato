import React from 'react'

interface ITomatolistProps {
  finishedTomatoes: any
}

class Tomatolist extends React.Component<ITomatolistProps> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="tomatolist">
        tomato
      </div>
    )
  }
}

export default Tomatolist