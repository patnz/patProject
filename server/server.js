const express = require('express')
const hbs = require('express-handlebars')
const { fs } = require('file-system')
const server = express()
const bodyParser = require('body-parser')

// const bigData = require('./data/bigData.json')

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
  res.render('home')
})

server.post('/', (req, res) => {
  console.log(req.body)
  fs.writeFile(
    'server/data/data.json',
    JSON.stringify(req.body, null, 2),
    'utf-8'
  )
})

server.get('/blah', (req, res) => {
  res.render('home')
})

module.exports = server
