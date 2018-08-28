const express = require('express')
const app = express()

app.set('views', './pages/')
app.set('view engine', 'ejs')
app.use(express.static('build')) //把运行路径下的build给开放到http://xxx里面。build/bundle.js 到http://xxx/bundle.js

app.get('/', (req, res) => {
  res.render('index')
})

app.use((req, res, next) => {
  console.log('before next');
  next()
  console.log('after next');
}, (req, res, next) => {
  console.log('before next 1');
  next()
  console.log('after next 1');
})

app.listen('8080')
