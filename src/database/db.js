//Importar a dependência do SQLite 3
const sqlite3 = require("sqlite3").verbose();

//Criar o objeto que irá fazer as operações de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//Utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
  //Criar uma tabela
  db.run(`
    
  `);
  //Inserir dados na tabela

  //Consultar os dados da tabela

  //Deletar um dado da tabela
})