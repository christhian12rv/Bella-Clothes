const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/login", (req, res) => {
    res.render("admin/login", {
        css: "admin/login.css",
        js: "admin/login.js",
        title: "Bella Clothes Admin - Login",
        paginaAdmin: true,
        loginAdmin: true
    })
})

router.get("/configurar-imagem-sidebar", (req, res) => {
    res.render("admin/painel de controle/imagemSidebar", {
        css: "admin/imagemSidebar.css",
        js: "admin/imagemSidebar.js",
        title: "Bella Clothes Admin",
        paginaAdmin: true
    })
})
router.get("/painel-de-controle", (req, res) => {
    res.render("admin/painel de controle/painelControle", {
        css: "admin/painelControle.css",
        js: "admin/painelControle.js",
        title: "Painel de Controle",
        paginaAdmin: true
    })
})
router.get("/painel-de-controle/pedidos", (req, res) => {
    res.render("admin/painel de controle/painelControlePedidos", {
        css: "admin/painelControlePedidos.css",
        js: "admin/painelControlePedidos.js",
        title: "Painel de Controle",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/receita-de-vendas", (req, res) => {
    res.render("admin/painel de controle/painelControleReceitaVendas", {
        css: "admin/painelControleReceitaVendas.css",
        js: "admin/painelControleReceitaVendas.js",
        title: "Painel de Controle",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/quantidade-de-vendas", (req, res) => {
    res.render("admin/painel de controle/painelControleQuantidadeVendas", {
        css: "admin/painelControleQuantidadeVendas.css",
        js: "admin/painelControleQuantidadeVendas.js",
        title: "Painel de Controle",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/usuarios", (req, res) => {
    res.render("admin/painel de controle/painelControleUsuarios", {
        css: "admin/painelControleUsuarios.css",
        js: "admin/painelControleUsuarios.js",
        title: "Painel de Controle",
        paginaAdmin: true
    })
})

router.get("/ver-clientes", (req, res) => {
    res.render("admin/verClientes", {
        css: "admin/verClientes.css",
        js: "admin/verClientes.js",
        title: "Bella Clothes Admin",
        paginaAdmin: true
    })
})

module.exports = router;