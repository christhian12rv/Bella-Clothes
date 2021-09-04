const { validationResult } = require('express-validator');

const UsuarioService = require("../services/usuario");

exports.createUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        return res.redirect("/registrar/fisica");
    } else {
        try {
            await UsuarioService.createUsuario(req.body);
            req.flash("success_msg", "Usuário cadastrado com sucesso! Por favor verifique seu email. (verifique também sua caixa de spam). O email será expirado em 1 dia, após isso será necessário cadastrar novamente.");
            return res.redirect("/login");
        } catch (error) {
            req.flash("error_msg", "Houve um erro interno ao registrar. " + error);
            console.log(error);
            return res.redirect("/registrar/fisica");
        }
    }
}