const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/*", isLoggedIn);

router.get("/:id/favoritos", (req, res) => {
    res.render("usuario/conta/favoritos", { css: "/usuario/favoritos.css", js: "/usuario/conta/favoritos.js", paginaUsuario: true, title: "Favoritos" });
})

router.get("/:id/compras", (req, res) => {
    res.render("usuario/conta/compras", { css: "/usuario/compras.css", js: "/usuario/conta/compras.js", paginaUsuario: true, title: "Compras" });
})

router.get("/:id/compras/:idCompra", (req, res) => {
    res.render("usuario/conta/verCompra", { css: "/usuario/verCompra.css", js: "/usuario/conta/verCompra.js", paginaUsuario: true, title: "Ver Compra" });
})

router.get("/:id/meus-dados", UsuarioController.meusDados);

router.get("/:id/seguranca", (req, res) => {
    res.render("usuario/conta/seguranca", { css: "/usuario/seguranca.css", js: "/usuario/conta/seguranca.js", paginaUsuario: true, title: "Segurança" });
})

router.get("/:id/privacidade", (req, res) => {
    res.render("usuario/conta/privacidade", { css: "/usuario/privacidade.css", js: "/usuario/conta/privacidade.js", paginaUsuario: true, title: "Privacidade" });
})

router.post("/:id/alterarFoto", UsuarioController.alterarFoto);

module.exports = router;