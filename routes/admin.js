const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.render("admin/admin", {
        css: "admin/admin.css",
        js: "admin/admin.js",
        title: "Admin",
        paginaAdmin: true
    })
})

module.exports = router;