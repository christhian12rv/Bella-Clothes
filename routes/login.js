const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

const UsuarioValidator = require("../middlewares/validators/usuario");

router.get("/", (req, res) => {
    res.render("usuario/login", {
        css: "login.css",
        title: "Login",
        message: req.flash("error_msg")
    });
})
    .post("/", UsuarioController.login)

module.exports = router;