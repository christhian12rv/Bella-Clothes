const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Receber Compra
router.get("/:idCompra/receberCompra", (req, res) => {
    res.render("compra/receberCompra", { css: "/compra/receberCompra.css", js: "/compra/receberCompra.js", title: "Compra" })
})

// Escolher Endereço
router.get("/:idCompra/escolherEndereco", (req, res) => {
    res.render("compra/escolherEndereco", { css: "/compra/escolherEndereco.css", js: "/compra/escolherEndereco.js", title: "Compra" })
})

// Editar Endereço
router.get("/:idCompra/:idEndereco/editarEndereco", (req, res) => {
    res.render("compra/editarEndereco", { css: "/compra/editarEndereco.css", js: "/compra/editarEndereco.js", title: "Compra" })
})

// Adicionar Endereço
router.get("/:idCompra/adicionarEndereco", (req, res) => {
    res.render("compra/adicionarEndereco", { css: "/compra/adicionarEndereco.css", js: "/compra/adicionarEndereco.js", title: "Compra" })
})

// Metodo Pagamento
router.get("/:idCompra/metodoPagamento", (req, res) => {
    res.render("compra/metodoPagamento", { css: "/compra/metodoPagamento.css", js: "/compra/metodoPagamento.js", title: "Compra" })
})

// Editar Cartão
router.get("/:idCompra/:idCartao/editarCartao", (req, res) => {
    res.render("compra/editarCartao", { css: "/compra/editarCartao.css", js: "/compra/editarCartao.js", title: "Compra" })
})

// Adicionar Cartão
router.get("/:idCompra/adicionarCartao", (req, res) => {
    res.render("compra/adicionarCartao", { css: "/compra/adicionarCartao.css", js: "/compra/adicionarCartao.js", title: "Compra" })
})

// Parcelas
router.get("/:idCompra/parcelas", (req, res) => {
    res.render("compra/parcelas", { css: "/compra/parcelas.css", js: "/compra/parcelas.js", title: "Compra" })
})

// Confirmar Compra
router.get("/:idCompra/confirmarCompra", (req, res) => {
    res.render("compra/confirmarCompra", { css: "/compra/confirmarCompra.css", title: "Confirmar Compra" })
})

module.exports = router;