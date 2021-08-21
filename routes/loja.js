const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/* router.get("/:categoria?/:subcategoria?", (req, res) => {

    res.render("loja/index", { css: "loja.css", js: "loja.js", title: "Loja" });
}) */

router.get("/a/b", (req, res) => {

    res.render("loja/index", { css: "loja.css", js: "loja.js", title: "Loja" });
})

router.get("/testeLoja", (req, res) => {
    res.render("loja/testeLoja", { css: "testeLoja.css", js: "testeLoja.js", title: "testeLoja" });
})

module.exports = router;