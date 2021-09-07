const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

router.get("/", UsuarioController.emailVerificado);

module.exports = router;