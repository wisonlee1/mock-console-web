import React from 'react'
import { Router, Route, browserHistory } from "react-router"

import Root from './root'

class Main extends React.Component {
  render() {
    const routes = {
      path: '/',
      component: Root, // Root include <Side />
      // indexRoute: {
      //   onEnter: (nextState, replace) => {
      //     replace('node') // redirect from '/' to '/node' 
      //   }
      // },
      childRoutes: [
        {
          path: 'node',
          component: () => (
            <div>node</div>
          )
        },
      ]
    }

    return (
      <Router history={browserHistory} routes={routes} />
    )
  }
}

export default Main