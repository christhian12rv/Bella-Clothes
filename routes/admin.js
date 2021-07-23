const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require('fs')

router.get("/login", (req, res) => {
    res.render("admin/login", {
        css: "admin/login.css",
        js: "admin/login.js",
        title: "Login | Bella Clothes Admin",
        paginaAdmin: true,
        loginAdmin: true
    })
})

router.get("/configurar-imagem-sidebar", (req, res) => {
    res.render("admin/painel de controle/imagemSidebar", {
        css: "admin/imagemSidebar.css",
        js: "admin/imagemSidebar.js",
        title: "Configurar Barra Lateral | Bella Clothes Admin",
        paginaAdmin: true
    })
})
router.get("/painel-de-controle", (req, res) => {
    res.render("admin/painel de controle/painelControle", {
        css: "admin/painel de controle/painelControle.css",
        js: "admin/painel de controle/painelControle.js",
        title: "Painel de Controle | Bella Clothes Admin",
        paginaAdmin: true
    })
})
router.get("/painel-de-controle/pedidos", (req, res) => {
    res.render("admin/painel de controle/painelControlePedidos", {
        css: "admin/painel de controle/painelControlePedidos.css",
        js: "admin/painel de controle/painelControlePedidos.js",
        title: "Painel de Controle - Pedidos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/receita-de-vendas", (req, res) => {
    res.render("admin/painel de controle/painelControleReceitaVendas", {
        css: "admin/painel de controle/painelControleReceitaVendas.css",
        js: "admin/painel de controle/painelControleReceitaVendas.js",
        title: "Painel de Controle - Receita de Vendas | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/quantidade-de-vendas", (req, res) => {
    res.render("admin/painel de controle/painelControleQuantidadeVendas", {
        css: "admin/painel de controle/painelControleQuantidadeVendas.css",
        js: "admin/painel de controle/painelControleQuantidadeVendas.js",
        title: "Painel de Controle - Quantidade de Vendas | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/usuarios", (req, res) => {
    res.render("admin/painel de controle/painelControleUsuarios", {
        css: "admin/painel de controle/painelControleUsuarios.css",
        js: "admin/painel de controle/painelControleUsuarios.js",
        title: "Painel de Controle - Usuários | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/ver-usuarios", (req, res) => {
    res.render("admin/usuarios/verUsuarios", {
        css: "admin/usuarios/verUsuarios.css",
        js: "admin/usuarios/verUsuarios.js",
        title: "Usuários | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/usuario/:id", (req, res) => {
    res.render("admin/usuarios/usuario", {
        css: "admin/usuarios/usuario.css",
        js: "admin/usuarios/usuario.js",
        title: "Detalhes do Usuário | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/ver-pedidos", (req, res) => {
    res.render("admin/usuarios/verPedidos", {
        css: "admin/usuarios/verPedidos.css",
        js: "admin/usuarios/verPedidos.js",
        title: "Pedidos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/pedido/:id", (req, res) => {
    res.render("admin/usuarios/pedido", {
        css: "admin/usuarios/pedido.css",
        js: "admin/usuarios/pedido.js",
        title: "Detalhes do Pedido | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/ver-produtos", (req, res) => {
    res.render("admin/produtos/verProdutos", {
        css: "admin/produtos/verProdutos.css",
        js: "admin/produtos/verProdutos.js",
        title: "Produtos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/produto/:id", (req, res) => {
    res.render("admin/produtos/produto", {
        css: "admin/produtos/produto.css",
        js: "admin/produtos/produto.js",
        title: "Detalhes do Produto | Bella Clothes Admin",
        paginaAdmin: true
    })
})

module.exports = router;