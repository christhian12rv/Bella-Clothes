const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const frete = require('frete');
const ApiController = require("../controllers/api");

router.get("/usuarios", ApiController.getUsuarios);

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

router.get("/avaliacoes", (req, res) => {
    var clientes = [];
    var max = req.body.max;
    if (!max)
        max = 53;

    for (let i = 0; i < max; i++) {
        clientes.push({
            id: i + 1,
            fotoUsuario: "menina.jpg",
            usuario: "Alexander Pierce" + i,
            fotoProduto: "tenisTeste.jpg",
            produto: "Tênis Branco Nike" + i,
            avaliacao: 3,
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            fotoUsuario: "menina.jpg",
            usuario: "Alexander Pierce" + i,
            fotoProduto: "tenisTeste.jpg",
            produto: "Tênis Branco Nike" + i,
            avaliacao: 1,
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            fotoUsuario: "menina.jpg",
            usuario: "Alexander Pierce" + i,
            fotoProduto: "tenisTeste.jpg",
            produto: "Tênis Branco Nike" + i,
            avaliacao: 5,
            data: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            fotoUsuario: "menina.jpg",
            usuario: "Alexander Pierce" + i,
            fotoProduto: "tenisTeste.jpg",
            produto: "Tênis Branco Nike" + i,
            avaliacao: 0,
            data: "21/02/2020, 14:21"
        });
    }

    var { start, length } = req.query;
    console.log(req.query);
    res.send(clientes);
})

router.get("/posts", (req, res) => {
    var clientes = [];
    var max = req.body.max;
    if (!max)
        max = 53;

    for (let i = 0; i < max; i++) {
        clientes.push({
            id: i + 1,
            titulo: "Dicas para deixar seu tênis limpinho",
            categoria: "Lifestyle",
            fotoAdmin: "menina.jpg",
            postadoPor: "Alexander Pierce" + i,
            data: "21/02/2020, 14:21",
            slug: "dicas-para-deixar-seu-tenis-limpinho"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            titulo: "Como andar de skate",
            categoria: "Esportes",
            fotoAdmin: "menina.jpg",
            postadoPor: "Alexander Pierce" + i,
            data: "21/02/2020, 14:21",
            slug: "como-andar-de-skate"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            titulo: "Posso fazer exercícios tendo escoliose?",
            categoria: "Saúde",
            fotoAdmin: "menina.jpg",
            postadoPor: "Alexander Pierce" + i,
            data: "21/02/2020, 14:21",
            slug: "posso-fazer-exercicios-tendo-escoliose"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            titulo: "Como prevenir lesões durante o treino",
            categoria: "Treino",
            fotoAdmin: "menina.jpg",
            postadoPor: "Alexander Pierce" + i,
            data: "21/02/2020, 14:21",
            slug: "como-prevenir-lesoes-durante-o-treino"
        });
    }

    var { start, length } = req.query;
    console.log(req.query);
    res.send(clientes);
})

router.get("/frete", (req, res) => {
    var { cepDestino, peso, comprimento, altura, largura, diametro, tipoFrete } = req.query;
    console.log(tipoFrete);
    if (tipoFrete == "pac")
        tipoFrete = frete.servicos.pac;
    else if (tipoFrete == "sedex")
        tipoFrete = frete.servicos.sedex;

    console.log(tipoFrete);
    frete()
        .cepOrigem('30672772')
        .cepDestino(cepDestino)
        .peso(parseFloat(peso))
        .formato(frete.formatos.caixaPacote)
        .comprimento(parseFloat(comprimento))
        .altura(parseFloat(altura))
        .largura(parseFloat(largura))
        .diametro(parseFloat(diametro))
        .maoPropria('N')
        .valorDeclarado(0)
        .avisoRecebimento('S')
        .servico(tipoFrete)
        .precoPrazo('13466321', function (err, results) {
            if (err)
                res.send({ erro: err });
            else if (results)
                res.send(results);
        });
})

router.get("/categorias", ApiController.getCategorias);
router.get("/subcategorias-by-categoria/:idCategoria", ApiController.getSubcategoriasByCategoria);

module.exports = router;