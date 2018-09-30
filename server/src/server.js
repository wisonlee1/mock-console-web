const express = require('express')
const app = express()

app.set('views', './pages/')
app.set('view engine', 'ejs')
app.use(express.static('build')) //把运行路径下的build给开放到http://xxx里面。build/bundle.js 到http://xxx/bundle.js

// app.get('/', (req, res) => {
//   res.render('index')
// })

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
