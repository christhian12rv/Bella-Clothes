const { validationResult } = require('express-validator');
const passport = require("passport");

const UsuarioService = require("../services/usuario");

exports.createUsuarioFisico = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        return res.redirect("/registrar/fisica");
    } else {
        try {
            let serviceResponse = await UsuarioService.createUsuarioFisico(req.body);
            res.redirect("/verificarEmail?email=" + serviceResponse.usuario.email + "&id=" + serviceResponse.emailToken._id);
        } catch (error) {
            req.flash("error_msg", "Houve um erro interno ao registrar. " + error.message);
            return res.redirect("/registrar/fisica");
        }
    }
}

exports.createUsuarioJuridico = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        return res.redirect("/registrar/juridica");
    } else {
        try {
            let serviceResponse = await UsuarioService.createUsuarioJuridico(req.body);
            res.redirect("/verificarEmail?email=" + serviceResponse.usuario.email + "&id=" + serviceResponse.emailToken._id);
        } catch (error) {
            req.flash("error_msg", "Houve um erro interno ao registrar. " + error.message);
            return res.redirect("/registrar/juridica");
        }
    }
}

exports.verificarEmail = async (req, res) => {
    try {
        let email = req.query.email;
        let emailTokenId = req.query.id;
        let serviceResponse = await UsuarioService.verificarEmail(email, emailTokenId);
        if (serviceResponse.status === 200) {
            return res.render("usuario/verificarEmail", {
                css: "verificarEmail.css",
                title: "Verifique sua conta || Bella Clothes",
                navbarSimple: true,
                email: email,
                emailTokenId: emailTokenId
            });
        } else return res.redirect("/erro-404");
    } catch (error) {
        req.flash("error_msg", "Houve um erro interno. " + error.message);
        return res.redirect("/erro-500");
    }
}

exports.emailVerificado = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.emailVerificado(req.query);
        if (serviceResponse.nome) {
            return res.render("usuario/emailVerificado", {
                css: "emailVerificado.css",
                title: "Verificação de Conta || Bella Clothes",
                navbarSimple: true,
                nome: serviceResponse.nome
            });
        } else {
            return res.redirect("/error-404");
        }
    } catch (error) {
        req.flash("error_msg", error.message);
        return res.redirect("/");
    }
}

exports.reenviarEmail = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.reenviarEmail(req.query);
        console.log(serviceResponse);
        req.flash("success_msg", "Email reenviado com sucesso! O email pode demorar alguns minutos para chegar. Lembre-se de checar a pasta de spam.");
        return res.redirect("/verificarEmail?email=" + serviceResponse.email + "&id=" + serviceResponse.id);
    } catch (error) {
        res.redirect("/500");
    }
}

exports.login = async (req, res, next) => {
    try {
        await passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next)
    } catch (error) {
        res.redirect("/500");
    }
}

exports.meusDados = async (req, res, next) => {
    try {
        let serviceResponse = await UsuarioService.meusDados();
        if (serviceResponse) {
            return res.render("usuario/conta/meusDados", {
                css: "/usuario/meusDados.css",
                js: "/usuario/conta/meusDados.js",
                paginaUsuario: true,
                title: "Meus Dados"
            });
        } else {
            return res.redirect("/500");
        }
    } catch (error) {
        return res.redirect("/500");
    }
}