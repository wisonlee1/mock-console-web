import React from 'react'
import { Router, browserHistory } from "react-router"

import Root from './root'
import Pipe from './pipeline'
// import Dynamic1 from './dynamic1'

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
        // {
        //   path: 'another',
        //   getComponents(location, cb) {
        //     require.ensure([], require => {
        //       // https://github.com/gaearon/react-hot-loader/issues/288#issuecomment-245988695
        //       console.log(require('@caicloud/compass-devops'));
        //       cb(null, require('@caicloud/compass-devops').default);
        //     });
        //   },
        // },
        {
          path: 'require-module',
          getComponents(location, cb) {
            require.ensure([], require => {
              cb(null, require('./dynamic').default)
            })
          }
        },
        {
          path: 'require-module1',
          getComponents(location, cb) {
            require.ensure([], require => {
              cb(null, require('./dynamic1').default)
            })
          }
        },
        // {
        //   path: 'import-module',
        //   getComponents(location, cb) {
        //     require.ensure([], () => {
        //       cb(null, Dynamic1)
        //     })
        //   }
        // },
      ]
    }

    return (
      <Router history={browserHistory} routes={routes} />
    )
  }
}

export default Main