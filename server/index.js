const server = require('./server')

const port = 3000

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('I AM ALLLLIIIIVE! Listening on http://localhost:' + port)
})
