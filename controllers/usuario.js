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
        req.flash("success_msg", "Email reenviado com sucesso! O email pode demorar alguns minutos para chegar. Lembre-se de checar a pasta de spam.");
        return res.redirect("/verificarEmail?email=" + serviceResponse.email + "&id=" + serviceResponse.id);
    } catch (error) {
        res.redirect("/erro-500");
    }
}

exports.trocarSenha = async (req, res) => {
    try {
        let email = req.body.email;
        let serviceResponse = await UsuarioService.trocarSenha(email);
        if (serviceResponse.status === 200) {
            req.flash("success_msg", "Um email foi enviado para " + email + ". Clique no link desse email para iniciar a troca de sua senha.");
            res.redirect("/trocarSenha");
        } else if (serviceResponse.status === "incorrect") {
            req.flash("error_msg", "O email informado não está cadastrado no nosso site.");
            return res.redirect("/trocarSenha");
        } else if (serviceResponse.status === "token_exists") {
            req.flash("error_msg", "Um email de troca de senha já foi enviado para " + email + ". Clique no link desse email para iniciar a troca de sua senha ou espere 60 minutos e tente reenviar o email.");
            return res.redirect("/trocarSenha");
        } else return res.redirect("/erro-404");
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.verificarEscolhaNovaSenha = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.verificarEscolhaNovaSenha(req.query);
        if (serviceResponse.status === 200) {
            res.render("usuario/escolhaNovaSenha", {
                css: "usuario/escolhaNovaSenha.css",
                title: "Digite uma nova senha || Bella Clothes",
                navbarSimple: true,
                email: req.query.email,
                token: req.query.token,
                erro: req.flash("error_trocaSenha")
            });
        } else return res.redirect("/erro-404");
    } catch (error) {
        return res.redirect("/erro-400");
    }
}

exports.escolhaNovaSenha = async (req, res) => {
    try {
        if (req.body.senha.length < 8) {
            req.flash("error_trocaSenha", "A senha precisa ter no mínimo 8 caracteres");
            return res.redirect("/escolhaNovaSenha?email=" + req.body.email + "&token=" + req.body.token);
        }
        let serviceResponse = await UsuarioService.escolhaNovaSenha(req.body);
        if (serviceResponse.status === 200) {
            req.flash("success_msg", "Senha alterada. Faça login para continuar.");
            return res.redirect("/login");
        } else return res.redirect("/erro-404");
    } catch (error) {
        return res.redirect("/erro-500");
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
        res.redirect("/erro-500");
    }
}

exports.meusDados = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.getUsuarioById(req.user._id);
        if (serviceResponse && serviceResponse.status === 200) {
            return res.render("usuario/conta/meusDados", {
                css: "/usuario/meusDados.css",
                js: "/usuario/conta/meusDados.js",
                paginaUsuario: true,
                title: "Meus Dados",
                usuario: serviceResponse.usuario,
                usuarioTipo: serviceResponse.usuarioTipo,
                enderecos: serviceResponse.enderecos
            });
        } else {
            return res.redirect("/404");
        }
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.alterarFoto = async (req, res) => {
    try {
        let foto = (req.files && req.files.foto) ? req.files.foto : undefined;
        await UsuarioService.changeFotoPerfil(req.user._id, foto);

        return res.redirect("/usuario/meus-dados");
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.alterarEmail = async (req, res) => {
    try {
        const errors = validationResult(req);
        let errorsResponse = [];
        if (!errors.isEmpty()) {
            errors.array().forEach(value => {
                errorsResponse.push(value.msg);
            });
            return res.json({ status: "incorrect", error: errorsResponse });
        }
        let { id_usuario, novo_email, senha } = req.body;
        let serviceResponse = await UsuarioService.changeEmail(id_usuario, novo_email, senha);
        return res.json(serviceResponse);
    } catch (error) {
        return res.redirect("/erro-500");
    }
}