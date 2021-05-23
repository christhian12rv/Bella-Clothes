const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/parametro", (req, res) => {
    res.render("produto/index", { css: "produto.css", js: "produto.js" });
})

module.exports = router;