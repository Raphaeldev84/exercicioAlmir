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
    const {matricula, nome, media} = req.body

    if(!matricula || !nome || !media) {
        return res.status(400).json({mensagem: "Preencha os campos obrigatórios"});
        
    }
    //retorna o banco de dados
    const db =lerBancoDados();

    const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)

    if(alunoEncontrado) {
        res.status(400).json({mensagem:"O aluno já existe"})
    }

    const novoAluno = {
        matricula,
        nome,
        media
    }
    
    db.push(novoAluno);

    gravarBancoDados(db);

    res.json({mensagem: "Aluno criado com sucesso!"})
    
   
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
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 2));
}

module.exports = usuarios;