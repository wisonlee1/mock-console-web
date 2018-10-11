const express = require('express')
const app = express()
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware') // only for auto rebuild
const hotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../../webpack.config')
const compiler = webpack(webpackConfig)

app.set('views', './pages/')
app.set('view engine', 'ejs')
// 用了 webpack-dev-middleware 后，不需要设置这个了
app.use(express.static('build')) //把运行路径下的build给开放到http://xxx里面。build/bundle.js 到http://xxx/bundle.js

console.log('publicPath',  webpackConfig.output.publicPath);

app.use(middleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}))

app.use(hotMiddleware(compiler, {
  'log': false, 
       'path': '/__webpack_hmr', 
       'heartbeat': 10 * 1000
}))

app.get('/api/test1', (req, res, next) => {
  if (req.headers.custom) {
    res.set('custom', req.headers.custom)
  }
  next()
})

app.get('/api/test1', (req, res, next) => {
  res.send('hello1')
})

app.get('/api/test2', (req, res, next) => {
  res.send('hello2')
})

app.get('*', (req, res) => {
  res.render('index')
})

app.listen('8080', () => {
  console.log('listen on: 8080');
})
