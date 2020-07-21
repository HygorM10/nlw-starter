const express = require("express");
const server = express();

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
    return response.render("create-point.html");
});

server.get("/search", (require, response) => {
    return response.render("search-results.html");
});