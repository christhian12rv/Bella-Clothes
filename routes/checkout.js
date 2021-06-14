const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Receber Compra
router.get("/:idCheckout/receberCompra", (req, res) => {
    res.render("checkout/receberCompra", { css: "/checkout/receberCompra.css", js: "/checkout/receberCompra.js" })
})

// Escolher Endereço
router.get("/:idCheckout/escolherEndereco", (req, res) => {
    res.render("checkout/escolherEndereco", { css: "/checkout/escolherEndereco.css", js: "/checkout/escolherEndereco.js" })
})

// Editar Endereço
router.get("/:idCheckout/:idEndereco/editarEndereco", (req, res) => {
    res.render("checkout/editarEndereco", { css: "/checkout/editarEndereco.css", js: "/checkout/editarEndereco.js" })
})

// Adicionar Endereço
router.get("/:idCheckout/adicionarEndereco", (req, res) => {
    res.render("checkout/adicionarEndereco", { css: "/checkout/adicionarEndereco.css", js: "/checkout/adicionarEndereco.js" })
})

// Metodo Pagamento
router.get("/:idCheckout/metodoPagamento", (req, res) => {
    res.render("checkout/metodoPagamento", { css: "/checkout/metodoPagamento.css", js: "/checkout/metodoPagamento.js" })
})

// Editar Cartão
router.get("/:idCheckout/:idCartao/editarCartao", (req, res) => {
    res.render("checkout/editarCartao", { css: "/checkout/editarCartao.css", js: "/checkout/editarCartao.js" })
})

// Adicionar Cartão
router.get("/:idCheckout/adicionarCartao", (req, res) => {
    res.render("checkout/adicionarCartao", { css: "/checkout/adicionarCartao.css", js: "/checkout/adicionarCartao.js" })
})

// Parcelas
router.get("/:idCheckout/parcelas", (req, res) => {
    res.render("checkout/parcelas", { css: "/checkout/parcelas.css", js: "/checkout/parcelas.js" })
})

// Confirmar Compra
router.get("/:idCheckout/confirmarCompra", (req, res) => {
    res.render("checkout/confirmarCompra", { css: "/checkout/confirmarCompra.css" })
})

module.exports = router;