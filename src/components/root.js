import React from 'react'
class Root extends React.Component {
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
  }

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