const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.render("blog/blog", {
        css: "blog/blog.css",
        js: "blog/blog.js",
        title: "Blog | Bella Clothes",
        paginaBlog: true
    })
})

module.exports = router;