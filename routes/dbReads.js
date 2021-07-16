const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/usuarios", (req, res) => {
    var clientes = [];
    var max = req.body.max;
    if (!max)
        max = 53;

    for (let i = 0; i < max; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            cpf_cnpj: "12345678912" + i,
            status: "Ativo",
            data_registro: "21/02/2020"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            cpf_cnpj: "12345678912" + i,
            status: "Inativo",
            data_registro: "21/02/2020"
        });
    }

    var { start, length } = req.query;
    console.log(req.query);
    res.send(clientes);
})

module.exports = router;