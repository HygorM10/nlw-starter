const express = require("express");
const server = express();

//Habilitar o uso do require.body
server.use(express.urlencoded({extended: true}));

//Configurar Banco de dados
//Pegar banco de dados
const db = require("./database/db");

//Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Configurar pasta public
server.use(express.static("public"));

//Ligar o servidor
server.listen(3000);

//Caminhos da aplicação 

//Pagina Inicial
//Require: Requisição ao Servidor
//Response: Resposta do Servidor
server.get("/", (require, response) => {
    return response.render("index.html");
});

server.get("/create-point", (require, response) => {

    //require.query: Query de strings da nossa url
    console.log(require.query);

    return response.render("create-point.html");
});

server.post("/savepoint", (require, response) => {

    //req.body: O corpo do nosso formulário
    // console.log(require.body);

    //Inserir os dados no bd
    const query = `
        INSERT INTO places 
            (image, name, address, address2, state, city, items) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`;

    const values = [
        require.body.image, require.body.name, require.body.address, require.body.address2, require.body.state, require.body.city, require.body.items
    ];

    function afterInsertData(err){
        if(err){
            console.log(err);
            return response.send("Erro no Cadastro");
        }

        console.log("Cadastrouuuu...");
        console.log(this);

        return response.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData);
});

server.get("/search", (require, response) => {

    const search = require.query.search;

    if(search == ""){
        //Pesquisa Vazia 
        return response.render("search-results.html", { total: 0 });
    }

    db.all( `SELECT image, name, address, address2, state, city, items FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length;

        //Mostrar as paginas HTML com os dados do banco de dados
        return response.render("search-results.html", { places: rows, total });
    });
});