const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

router.get("/", (req, res) => {
    res.render("usuario/login", {
        css: "login.css",
        title: "Login",
        error_login_message: req.flash("error_login_message")
    });
})
    .post("/", UsuarioController.login)

module.exports = router;