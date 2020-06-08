const express = require('express')
const db = require('./database/db')

const server = express()

// Config public files
server.use(express.static('public'))

// Using template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

server.get('/', (request, response) => {
  return response.render('index.html')
})

server.get('/create-point', (request, response) => {
  return response.render('create-point.html')
})

server.get('/search-results', (request, response) => {
  // Get data in the database
  db.all(`SELECT name FROM places`, function(err, rows) {
    if (err) {
      return console.log(err)
    }

    // Show the html page with the data from the database
    return response.render('search-results.html', { places: rows })
  })

})

server.listen(3333, () => {
  console.log('🚀 Server running on port 3333.')
})