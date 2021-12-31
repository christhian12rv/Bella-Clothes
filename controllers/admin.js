const { validationResult } = require('express-validator');
const passport = require("passport");
const path = require("path");
const fs = require('fs');

const AdminService = require("../services/admin");
const UsuarioService = require("../services/usuario");
const ProdutoService = require("../services/produto");

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
        return res.redirect("/admin/erro-500");
    }
}

exports.adicionarProdutoGET = async (req, res) => {
    try {
        let categorias = await ProdutoService.getCategorias();
        let subcategorias = await ProdutoService.getSubcategorias();
        return res.render("admin/produtos/adicionarProduto", {
            css: "admin/produtos/adicionarProduto.css",
            js: "admin/produtos/adicionarProduto.js",
            title: "Adicionar Produto | Bella Clothes Admin",
            paginaAdmin: true,
            categorias: categorias,
            subcategorias: subcategorias
        })
    } catch (error) {
        return res.redirect("/admin/erro-500");
    }
}

exports.adicionarProdutoPOST = async (req, res) => {
    req.files.forEach((file) => console.log(file.fieldname));
    console.log(req.body);
    console.log(req.body.variacao[0].parcela_box)
    console.log(req.body.variacao[0].tamanho_box)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        if (req.files)
            req.files.forEach((file) => fs.unlink(path.join(__dirname) + '/../public/img/produtos/' + file.filename, async (error) => {
                if (error) throw error;
            }));
        return res.redirect("/admin/adicionar-produto");
    } else {
        try {
            let serviceResponse = await AdminService.adicionarProduto(req.body, req.files);
            req.flash("success_msg", "Produto " + req.body.nome_produto + " adicionado com sucesso!")
            res.redirect("/admin/ver-produtos");
        } catch (error) {
            console.log(error)
            return res.redirect("/admin/erro-500");
        }
    }
}