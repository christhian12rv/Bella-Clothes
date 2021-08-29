const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');

router.get("/fisica", (req, res) => {
    res.render("usuario/registrarFisica", {
        css: "registrar.css",
        js: "usuario/registrarFisica.js",
        title: "Registrar"
    })
})

/* router.post("/fisica", [
    body("tipoPessoa")
        .isEmpty()
        .withMessage("O tipo de pessoa deve ser especificado"),
    body("nome")
        .trim()
        .isString()
        .withMessage("O campo nome é inválido")
        .isEmpty()
        .withMessage("O campo nome é obrigatório"),
    body("sobrenome")
        .trim()
        .isString()
        .withMessage("O campo sobrenome é inválido")
        .isEmpty()
        .withMessage("O campo sobrenome é obrigatório"),
    body("sexo")
        .trim()
        .isString()
        .isIn(["Masculino", "Feminino"])

](req, res) => {

}) */

router.get("/juridica", (req, res) => {
    res.render("usuario/registrarJuridica", {
        css: "registrar.css",
        js: "usuario/registrarJuridica.js",
        title: "Registrar"
    })
})

module.exports = router;