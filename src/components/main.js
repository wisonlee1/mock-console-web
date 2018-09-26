import React from 'react'
import { Router, browserHistory } from "react-router"

import Root from './root'
import Pipe from './pipeline'

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
          component: Pipe
        },
        {
          path: 'another',
          getComponents(location, cb) {
            require.ensure([], require => {
              // https://github.com/gaearon/react-hot-loader/issues/288#issuecomment-245988695
              cb(null, require('./pipeline').default);
            });
          },
        }
      ]
    }

    return (
      <Router history={browserHistory} routes={routes} />
    )
  }
}

export default Main