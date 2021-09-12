const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

router.get("/", UsuarioController.verificarEscolhaNovaSenha)
    .post("/", UsuarioController.escolhaNovaSenha);

module.exports = router;