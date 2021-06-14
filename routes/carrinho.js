const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req , res) => {
    res.render("carrinho/index", {css: "carrinho.css", js: "carrinho.js"})
})

module.exports = router;