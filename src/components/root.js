import React from 'react'
class Root extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {

    // fetch('/api/test1', {
    //   headers: new Headers({
    //     custom: new Date().toString()
    //   }),
    // })
    // .then((res) => {
    //   console.log('response1', res);
    // })

    // fetch('/api/test2', {
    //   headers: new Headers({
    //     custom: new Date().toString()
    //   }),
    // })
    // .then((res) => {
    //   console.log('response2', res);
    // })

    fetch('/api/add').then((res) => {
      res.json().then((count) => {
        this.setState({count})
      })
      // this.setState({ count: res })
    })

  }

  onAdd = () => {
    fetch('/api/add').then((res) => {
      res.json().then((count) => {
        this.setState({count})
      })
    })
  }

  render() {
    return (
      <div>
        <div>side</div>
        <div>
          <span>count: {this.state.count}</span>
          <button onClick={this.onAdd}>Add</button>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Root