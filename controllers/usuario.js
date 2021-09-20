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
        } else if (serviceResponse.status === 400) {
            req.flash("error_msg", serviceResponse.error);
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

exports.seguranca = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.getUsuarioById(req.user._id);
        if (serviceResponse && serviceResponse.status === 200) {
            return res.render("usuario/conta/seguranca", {
                css: "/usuario/seguranca.css",
                js: "/usuario/conta/seguranca.js",
                paginaUsuario: true,
                title: "Segurança",
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
            return res.json({ status: 400, error: errorsResponse });
        }
        let { novo_email, senha } = req.body;
        let serviceResponse = await UsuarioService.changeEmail(req.user._id, novo_email, senha);
        return res.json(serviceResponse);
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.alterarTelefone = async (req, res) => {
    const errors = validationResult(req);
    let errorsResponse = [];
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            errorsResponse.push(value.msg);
        });
        return res.json({ status: 400, error: errorsResponse });
    }
    try {
        let { novo_telefone, campo_telefone } = req.body;
        let campoToUpdate = (campo_telefone === "telefone") ? { telefone: novo_telefone } : { outro_telefone: novo_telefone };
        let serviceResponse = await UsuarioService.changeTelefone(req.user._id, novo_telefone, campoToUpdate);
        return res.json(serviceResponse);
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.adicionarEndereco = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        return res.redirect("/usuario/adicionarEndereco");
    }
    try {
        await UsuarioService.adicionarEndereco(req.user._id, req.body);
        return res.redirect("/usuario/meus-dados");
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.excluirEndereco = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.excluirEndereco(req.user._id, req.body.id_endereco);
        if (serviceResponse && serviceResponse.status === 400) {
            req.flash("error_msg", serviceResponse.error);
            return res.redirect("/usuario/meus-dados");
        }

        req.flash("success_msg", "Endereço excluido com sucesso!");
        return res.redirect("/usuario/meus-dados");
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.editarEndereco = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.editarEndereco(req.user._id, req.query.id);
        if (serviceResponse.status === 400) {
            req.flash("error_msg", "O endereço informado é inválido");
            return res.redirect("/usuario/meus-dados");
        }
        return res.render("usuario/conta/editarEndereco", {
            css: "/usuario/editarEndereco.css",
            js: "/usuario/conta/editarEndereco.js",
            paginaUsuario: true,
            title: "Editar Endereço",
            endereco: serviceResponse.endereco
        });
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.editarEnderecoPOST = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        return res.redirect("/usuario/editarEndereco?id=" + req.body.id_endereco);
    }
    try {
        await UsuarioService.editarEnderecoPOST(req.user._id, req.body);
        return res.redirect("/usuario/meus-dados");
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.alterarEnderecoPrincipal = async (req, res) => {
    try {
        let serviceResponse = await UsuarioService.alterarEnderecoPrincipal(req.user._id, req.body.id_endereco);
        res.json(serviceResponse);
    } catch (error) {
        return res.redirect("/erro-500");
    }
}