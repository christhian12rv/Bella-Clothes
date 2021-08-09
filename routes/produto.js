const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/:id", (req, res) => {
    res.render("produto/index", { css: "produto.css", js: "produto.js", title: "Produto" });
})

module.exports = router;