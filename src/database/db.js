// import sqlite3 dependencies
const sqlite = require('sqlite3').verbose()

// Creates objects that do operations in the database
const db = new sqlite.Database('./src/database/database.db')

// Using database object in operations

// db.serialize(() => {
//   // Create table with SQL commands
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)

//   // Insert datas in table
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?,?,?,?,?,?,?);
//   `

//   const values = [
//     'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80',
//     'Papersider',
//     'Guilherme Gemballa, Jardim América',
//     'Nº 260',
//     'Santa Catarina',
//     'Rio do Sul',
//     'Resíduos Eletrônicos, Lâmpadas'
//   ]

//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err)
//     }

//     console.log('Cadastro realizado com sucesso!')
//     console.log(this)
//   }

//   db.run(query, values, afterInsertData)

//   // Query data in the table
//   db.all(`SELECT name FROM places`, function(err, rows) {
//     if (err) {
//       return console.log(err)
//     }

//     console.log('Registros encontrados ')
//     console.log(rows)
//   })

//   // Delete data table
//   /**
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//      if (err) {
//        return console.log(err)
//       }
  
//       console.log('Registro deletado com sucesso!')
//     })
//    */
     
// })

module.exports = db