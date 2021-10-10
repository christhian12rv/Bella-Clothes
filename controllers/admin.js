const passport = require("passport");
const AdminService = require("../services/admin");
const UsuarioService = require("../services/usuario");

exports.login = async (req, res, next) => {
    try {
        await passport.authenticate("admin-local", {
            successRedirect: "/admin/painel-de-controle",
            failureRedirect: "/admin/login",
            failureFlash: true
        })(req, res, next)
    } catch (error) {
        res.redirect("/erro-500");
    }
}

exports.verUsuario = async (req, res) => {
    try {
        let serviceResponseGetUsuario = await UsuarioService.getUsuarioById(req.params.id);
        let serviceResponseGetEndereco = await UsuarioService.getEnderecoByUsuarioId(req.params.id);
        let serviceResponseGetCartao = await UsuarioService.getCartaoByUsuarioId(req.params.id);

        if (serviceResponseGetUsuario.status === 200 && serviceResponseGetEndereco.status === 200 &&
            serviceResponseGetCartao.status === 200) {
            let nomeUsuario = serviceResponseGetUsuario.usuarioTipo.nome ? serviceResponseGetUsuario.usuarioTipo.nome + " " +
                serviceResponseGetUsuario.usuarioTipo.sobrenome : serviceResponseGetUsuario.usuarioTipo.razao_social;
            return res.render("admin/usuarios/usuario", {
                css: "admin/usuarios/usuario.css",
                js: "admin/usuarios/usuario.js",
                title: nomeUsuario + " | Bella Clothes Admin",
                paginaAdmin: true,
                usuario: serviceResponseGetUsuario.usuario,
                usuarioTipo: serviceResponseGetUsuario.usuarioTipo,
                enderecos: serviceResponseGetEndereco.enderecos,
                cartoes: serviceResponseGetCartao.cartoes
            })
        } else {
            return res.redirect("/admin/erro-404");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/admin/erro-500");
    }
}

exports.excluirUsuario = async (req, res) => {
    try {
        let serviceResponse = await AdminService.excluirUsuario(req.params.id);
        if (serviceResponse.status == 200 && ((req.user) && req.user._id === req.params.id))
            req.logOut();
        return res.json(serviceResponse);
    } catch (error) {
        console.log(error);
        return res.redirect("/erro-500");
    }
}