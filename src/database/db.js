//Importar a dependência do SQLite 3
const sqlite3 = require("sqlite3").verbose();

//Criar o objeto que irá fazer as operações de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
//Utilizar o objeto de banco de dados, para nossas operações
// db.serialize(() => {
//   //Criar uma tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `);

//   // //Inserir dados na tabela
//   const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;

//   const values = [
//     "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=874&q=80",
//     "Colectoria",
//     "Vega, Jardim das Estrelas",
//     "Nº 1001, Condomínio Vale Verde",
//     "Minas Gerais",
//     "Passos",
//     "Resíduos Eletrônicos, Lâmpadas"
//   ];

//   function afterInsertData(err){
//     if(err){
//       return console.log(err);
//     }

//     console.log("Cadastrado com sucesso");
//     console.log(this);
//   }

//   db.run(query, values, afterInsertData);

//   //Consultar os dados da tabela
//   db.all(`SELECT id, image, name, address, address2, state, city, items FROM places`, function(err, rows){
//     if(err){
//       return console.log(err);
//     }

//     console.log("Aqui estão seus registros: ");
//     console.log(rows);
//   });

//   //Deletar um dado da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
//     if(err){
//       console.log(err);
//     }

//     console.log("Registro deletado com sucesso");
//   });

// });