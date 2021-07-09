const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/usuarios", (req, res) => {
    var clientes = [];
    var max = req.body.max;
    if (!max)
        max = 200;

    for (let i = 0; i < max; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            cpf_cnpj: "12345678912" + i,
            telefone: "(37) 91234-1234",
            data_registro: "21/02/2020"

        });
    }
    res.send(clientes);
})

module.exports = router;