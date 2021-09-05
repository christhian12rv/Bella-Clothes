const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

const UsuarioValidator = require("../validators/usuario")

router.get("/fisica", (req, res) => {
    res.render("usuario/registrarFisica", {
        css: "registrar.css",
        js: "usuario/registrarFisica.js",
        title: "Registrar || Bella Clothes"
    })
})
    .post("/fisica", UsuarioValidator.createUsuarioFisico, UsuarioController.createUsuarioFisico);


router.get("/juridica", (req, res) => {
    res.render("usuario/registrarJuridica", {
        css: "registrar.css",
        js: "usuario/registrarJuridica.js",
        title: "Registrar || Bella Clothes"
    })
})
    .post("/juridica", UsuarioValidator.createUsuarioJuridico, UsuarioController.createUsuarioJuridico);

module.exports = router;