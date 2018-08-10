const app = require('express')()

app.set('views', './pages/')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen('8080')

