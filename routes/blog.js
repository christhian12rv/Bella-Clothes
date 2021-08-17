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

router.get("/busca", (req, res) => {
    const buscar = req.query.buscar;
    res.render("blog/busca", {
        css: "blog/busca.css",
        js: "blog/busca.js",
        title: 'Blog - Resultados para "' + buscar + '" | Bella Clothes',
        buscar: buscar,
        paginaBlog: true
    })
})

router.get("/:categoria", (req, res) => {
    res.render("blog/verTodos", {
        css: "blog/verTodos.css",
        js: "blog/verTodos.js",
        title: "Blog - Lifestyle | Bella Clothes",
        paginaBlog: true
    })
})

router.get("/:categoria/:post", (req, res) => {
    res.render("blog/post", {
        css: "blog/post.css",
        js: "blog/post.js",
        title: "Dicas para deixar seu tênis limpinho | Bella Clothes",
        paginaBlog: true
    })
})

module.exports = router;