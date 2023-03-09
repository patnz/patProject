const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')
const server = express()
const bodyParser = require('body-parser')

const quoteData = require('./data/quoteData.json')
const { stringify } = require('node:querystring')

// Server config

const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// Middleware

server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// server.use(express.static(__dirname + '/public'))

// Routes

server.get('/', (req, res) => {
  res.render('home', quoteData)
})

server.post('/blah', (req, res) => {
  fs.writeFile('./server/data/test.txt', req.body.name)
    .then((data) => {
      console.log(data)
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err.message)
    })
})

server.get('/quote', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1
  fs.readFile('./server/data/quoteData.json', 'utf-8')
    .then((data) => {
      console.log(data)
      const parsedData = JSON.parse(data)
      const randomQuote = parsedData.quotes.find(
        (quote) => quote.id === randomNumber
      )
      console.log(randomQuote)
      res.render('quote', { quotes: [randomQuote] })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

server.get('/addQuote', (req, res) => {
  res.render('addQuote')
})

server.post('/addQuote', (req, res) => {
  console.log(req.body)
  res.render('addQuote')
})

module.exports = server
