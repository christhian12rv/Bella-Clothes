const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

router.get("/", (req, res) => {
    res.render("usuario/trocarSenha", {
        css: "usuario/trocarSenha.css",
        title: "Trocar senha || Bella Clothes",
        navbarSimple: true
    });
})
    .post("/", UsuarioController.trocarSenha);

module.exports = router;