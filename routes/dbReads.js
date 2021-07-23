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
            data_registro: "21/02/2020, 14:21"
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
            data_registro: "21/02/2020, 14:21"
        });
    }

    var { start, length } = req.query;
    console.log(req.query);
    res.send(clientes);
})

router.get("/pedidos", (req, res) => {
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
            produtos: "Tênis Nike All Star, Camisa Bege Gucci, Pulseira Life Infinito" + i,
            total: "91.2" + i,
            status: "Pendente",
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            produtos: "Tênis Nike All Star, Camisa Bege Gucci, Pulseira Life Infinito" + i,
            total: "91.2" + i,
            status: "Entregue",
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            produtos: "Tênis Nike All Star, Camisa Bege Gucci, Pulseira Life Infinito" + i,
            total: "91.2" + i,
            status: "Cancelado",
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            produtos: "Tênis Nike All Star, Camisa Bege Gucci, Pulseira Life Infinito" + i,
            total: "91.2" + i,
            status: "Esperando pagamento",
            data: "21/02/2020, 14:21"
        });
    }

    var { start, length } = req.query;
    console.log(req.query);
    res.send(clientes);
})

router.get("/produtos", (req, res) => {
    var clientes = [];
    var max = req.body.max;
    if (!max)
        max = 53;

    for (let i = 0; i < max; i++) {
        clientes.push({
            id: i + 1,
            produto: "Tênis Nike Preto" + i,
            foto: "tenisTeste.jpg",
            categoria: "Calçados" + i,
            subcategoria: "Tênis" + i,
            preco: "91,2" + i,
            status: "Habilitado",
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            produto: "Tênis Nike Preto" + i,
            foto: "tenisTeste.jpg",
            categoria: "Calçados" + i,
            subcategoria: "Tênis" + i,
            preco: "91,2" + i,
            status: "Desabilitado",
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            produto: "Tênis Nike Preto" + i,
            foto: "tenisTeste.jpg",
            categoria: "Calçados" + i,
            subcategoria: "Tênis" + i,
            preco: "91,2" + i,
            status: "Habilitado",
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            produto: "Tênis Nike Preto" + i,
            foto: "tenisTeste.jpg",
            categoria: "Calçados" + i,
            subcategoria: "Tênis" + i,
            preco: "91,2" + i,
            status: "Desabilitado",
            data: "21/02/2020, 14:21"
        });
    }

    var { start, length } = req.query;
    console.log(req.query);
    res.send(clientes);
})

module.exports = router;