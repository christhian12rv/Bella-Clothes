const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");
const UsuarioValidator = require("../middlewares/validators/usuario");

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

router.get("/meus-dados", UsuarioController.meusDados);

router.get("/seguranca", UsuarioController.seguranca);


router.get("/adicionarEndereco", (req, res) => {
    res.render("usuario/conta/adicionarEndereco", {
        css: "/usuario/adicionarEndereco.css",
        js: "/usuario/conta/adicionarEndereco.js",
        paginaUsuario: true,
        title: "Adicionar Endereço"
    });
})
    .post("/adicionarEndereco", UsuarioValidator.alterarEndereco, UsuarioController.adicionarEndereco);

router.post("/excluirEndereco", UsuarioController.excluirEndereco);

router.get("/editarEndereco", UsuarioController.editarEndereco)
    .post("/editarEndereco", UsuarioValidator.alterarEndereco, UsuarioController.editarEnderecoPOST);

router.get("/privacidade", (req, res) => {
    res.render("usuario/conta/privacidade", { css: "/usuario/privacidade.css", js: "/usuario/conta/privacidade.js", paginaUsuario: true, title: "Privacidade" });
})

router.post("/alterarEnderecoPrincipal", UsuarioController.alterarEnderecoPrincipal);

router.get("/adicionarCartao", (req, res) => {
    res.render("usuario/adicionarCartao", {
        css: "/usuario/adicionarCartao.css",
        js: "/usuario/adicionarCartao.js",
        paginaUsuario: true,
        title: "Adicionar Cartão"
    });
})
    .post("/adicionarCartao", UsuarioValidator.adicionarCartao, UsuarioController.adicionarCartao);

router.post("/excluirCartao", UsuarioController.excluirCartao);

router.post("/alterarReceberOfertasEmail", UsuarioController.updateOfertasEmail);

router.post("/alterarFoto", UsuarioController.alterarFoto);

router.post("/alterarEmail", UsuarioValidator.alterarEmail, UsuarioController.alterarEmail);

router.post("/alterarTelefone", UsuarioValidator.alterarTelefone, UsuarioController.alterarTelefone);

module.exports = router;