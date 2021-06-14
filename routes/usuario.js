const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



router.get("/:id/favoritos", (req, res) => {
    res.render("usuario/conta/favoritos", { css: "/usuario/favoritos.css", js: "/usuario/conta/favoritos.js", paginaUsuario: true });
})

router.get("/:id/compras", (req, res) => {
    res.render("usuario/conta/compras", { css: "/usuario/compras.css", js: "/usuario/conta/compras.js", paginaUsuario: true });
})

router.get("/:id/compras/:idCompra", (req, res) => {
    res.render("usuario/conta/verCompra", { css: "/usuario/verCompra.css", js: "/usuario/conta/verCompra.js", paginaUsuario: true });
})

module.exports = router;