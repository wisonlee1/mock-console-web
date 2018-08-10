const express = require('express')
const app = express()

app.set('views', './pages/')
app.set('view engine', 'ejs')
app.use(express.static('build')) //不运行路径下的build给开放到http://xxx里面。build/bundle.js 到http://xxx/bundle.js

app.get('/', (req, res) => {
  res.render('index')
})

app.listen('8080')

