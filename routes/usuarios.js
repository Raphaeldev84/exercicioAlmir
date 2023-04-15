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
        const { matricula, nome, media } = req.body

        if (!matricula || !nome || !media) {
            return res.status(400).json({ mensagem: "Preencha os campos obrigatórios" });

        }
        //retorna o banco de dados
        const db = lerBancoDados();

        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)

        if (alunoEncontrado) {
            return res.status(400).json({ mensagem: "O aluno já existe" })
        }

        const novoAluno = {
            matricula,
            nome,
            media
        }

        db.push(novoAluno);

        gravarBancoDados(db);

        res.status(200).json({ mensagem: "Aluno criado com sucesso!" })


    })
    .put((req, res) => {
        const {matricula, nome, media} = req.body;

        if(!matricula || !nome || !media){
            return res.status(400).json({mensagem: "Campos obrigatórios não informados."});
        }

        const db = lerBancoDados();

        const alunoEncontrado= db.find(aluno => aluno.matricula === matricula);

        if (!alunoEncontrado) {
        return res.status(404).json({mensagem: " Aluno inexistente."});
        }
        //gera um array sem o objeto que queremos modificar
        const dbModificado = db.filter(aluno => aluno.matricula !== matricula);
        
        //gera um novo objeto com as informações enviadas na requisição
        const alunoModificado = {
            matricula,
            nome,
            media
        }

        //adiciona o novo objeto ao array modificado
        dbModificado.push(alunoModificado);

        gravarBancoDados(dbModificado);

        res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" })
    })
    .delete((req, res) => {
        const { matricula, nome, media } = req.body;

        if (!matricula || !nome || !media) {
            return res.status(400).json({ mensagem: "Preencha os campos obrigatórios" });
        }

        const db = lerBancoDados();

        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula);


        if (!alunoEncontrado) {
            return res.status(404).json({ mensagem: "Aluno inexitente." });
        }

        //remove o aluno do array do banco de dados
        const dbModificado = db.filter(aluno => aluno.matricula !== matricula);

        //graa o array modficado no banco de dados
        gravarBancoDados(dbModificado);

        res.status(200).json({ mensagem: "Aluno deletado com sucesso." });
    });

function lerBancoDados() { // função que retorna o banco de dados
    const arquivo = fs.readFileSync("./db/db.json"); //leitura do arquivo
    const db = JSON.parse(arquivo); //converte para objeto
    return db;
}

function gravarBancoDados(db) { //grava o array modificado em formato json no arquivo db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 2));
}

module.exports = usuarios;