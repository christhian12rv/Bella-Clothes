const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/:categoria?/:subcategoria?", (req, res) => {

    res.render("loja/index", { css: "loja.css", js: "loja.js", title: "Loja" });
})

module.exports = router;