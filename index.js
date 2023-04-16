const express = require("express");
const usuarios= require("./routes/usuarios");
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');


//Configuração do app express
const app = express();
app.use(express.json());


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'morgan.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

// configura o método de recebimento das requisições para JSON
app.use(express.json());


app.use("/usuarios", usuarios);


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
  });