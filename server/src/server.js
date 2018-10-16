const express = require('express')
const app = express()
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware') // only for auto rebuild
const hotMiddleware = require('webpack-hot-middleware')
const mongoose = require('mongoose')

const webpackConfig = require('../../webpack.config')

const compiler = webpack(webpackConfig)
const { MONGO_URL, MONGO_PORT } = process.env

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

mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/count`)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info('Connected to mongodb:', `${MONGO_URL}:${MONGO_PORT}/count`)
});

const countSchema = new mongoose.Schema({
  name: String,
  value: {
    type: Number,
    default: 0
  }
})
const Count = mongoose.model('Count', countSchema)

app.get('/api/add', (req, res) => {
  Count.findOne({ name: 'count' }, (err, obj) => {
    if (!obj) {
      const countObj = new Count({ name: 'count' })
      countObj.save((err, obj) => {
        res.json(`${countObj.value}`)
      })
    } else {
      obj.set({value: ++obj.value})
      obj.save((err, obj) => {
        res.json(`${obj.value}`)
      })
    }
  })
})

app.get('*', (req, res) => {
  res.render('index')
})

app.listen('8080', () => {
  console.log('listen on: 8080');
})
