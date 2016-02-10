import React from 'react'
import ReactDOM from 'react-dom'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { count: 0 }
  }
  render () {
    return <div>
      <button id='plus' onClick={ e => this.setState({ count: this.state.count + 1 }) }>+</button>
      <button id='minus' onClick={ e => this.setState({ count: this.state.count - 1 }) }>-</button>
      <div>count: { this.state.count }</div>
    </div>
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'))
