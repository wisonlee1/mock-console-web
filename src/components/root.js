import React from 'react'

class Root extends React.Component {
  render() {
    return (
      <div>
        <div>side</div>
        {this.props.children}
      </div>
    )
  }
}

export default Root