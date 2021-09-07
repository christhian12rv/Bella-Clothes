const { validationResult } = require('express-validator');

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