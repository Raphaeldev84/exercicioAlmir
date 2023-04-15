const express = require("express");

const usuarios = express.Router();

usuarios.route("/")
.get((req, res) => [])
.post((req, res) => [])
.put((req, res) => [])
.delete((req, res) => []);

module.exports = usuarios;