const express = require("express");
const fs = require("fs")// importando biblioteca que manipula os arquivos
const usuarios = express.Router();

usuarios.route("/")
.get((req, res) => {
    //retorna o banco de dados
    const db = lerBancoDados();
    res.status(200).json(db)
})
.post((req, res) => {
    res.json({mensagem: "post realizado com sucesso!"})
})
.put((req, res) => {
    res.json({mensagem: "put realizado com sucesso!"})
})
.delete((req, res) => {
    res.json({mensagem: "delete realizado com sucesso!"})
});

function lerBancoDados(){ // função que retorna o banco de dados
    const arquivo = fs.readFileSync("./db/db.json"); //leitura do arquivo
    const db = JSON.parse(arquivo); //converte para objeto
    return db;
}

function gravarBancoDados(db) { //grava o array modificado em formato json no arquivo db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
}

module.exports = usuarios;