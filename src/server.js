const express = require('express')
const db = require('./database/db')

const server = express()

// Config public files
server.use(express.static('public'))

// Enable the use of request.body in the application
server.use(express.urlencoded({ extended: true }))

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

server.post('/save-point', (request, response) => {
  // Insert data in the database
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    request.body.image,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items,
  ]

  function afterInsertData(err) {
    if (err) {
      return response.send('Erro no cadastro!')
    }

    console.log('Cadastro realizado com sucesso!')
    console.log(this)

    return response.render('create-point.html', { saved: true })
  }

  db.run(query, values, afterInsertData)
})

server.get('/search-results', (request, response) => {
  const search = request.query.search

  if (search == '') {
    // Empty search 
    return response.render('search-results.html', { total: 0 })
  }

  // Get data in the database
  db.all(`SELECT name FROM places WHERE city LIKE = '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    // Show the html page with the data from the database
    return response.render('search-results.html', { places: rows, total })
  })

})

server.listen(3333, () => {
  console.log('🚀 Server running on port 3333.')
})