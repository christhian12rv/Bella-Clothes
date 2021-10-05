const { validationResult } = require('express-validator');
const ProdutoService = require("../services/produto");

exports.getCategorias = async (req, res) => {
    try {
        let categorias = await ProdutoService.getCategorias();
        return res.render("admin/produtos/verCategorias", {
            css: "admin/produtos/verCategorias.css",
            js: "admin/produtos/verCategorias.js",
            title: "Produtos Categorias | Bella Clothes Admin",
            paginaAdmin: true,
            categorias: categorias
        })
    } catch (error) {
        return res.redirect("/admin/erro-500");
    }
}

exports.addCategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({ status: 400, errors: errors.array() });
    try {
        let categoria = await ProdutoService.addCategoria(req.body);
        return res.json({ status: 200, categoria: categoria });
    } catch (error) {
        return res.redirect("/admin/erro-500");
    }
}

exports.updateCategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({ status: 400, errors: errors.array() });
    try {
        let serviceResponse = await ProdutoService.updateCategoria(req.body);
        return res.json(serviceResponse);
    } catch (error) {
        return res.redirect("/admin/erro-500");
    }
}

exports.getCategorias = async (req, res) => {
    try {
        let categorias = await ProdutoService.getCategorias();
        return res.render("admin/produtos/verCategorias", {
            css: "admin/produtos/verCategorias.css",
            js: "admin/produtos/verCategorias.js",
            title: "Produtos Categorias | Bella Clothes Admin",
            paginaAdmin: true,
            categorias: categorias
        })
    } catch (error) {
        return res.redirect("/admin/erro-500");
    }
}

exports.getSubcategorias = async (req, res) => {
    try {
        let subcategorias = await ProdutoService.getSubcategorias();
        let categorias = await ProdutoService.getCategorias();
        console.log(subcategorias)
        return res.render("admin/produtos/verSubcategorias", {
            css: "admin/produtos/verSubcategorias.css",
            js: "admin/produtos/verSubcategorias.js",
            title: "Produtos Subcategorias | Bella Clothes Admin",
            paginaAdmin: true,
            subcategorias: subcategorias,
            categorias: categorias
        })
    } catch (error) {
        console.log(error);
        return res.redirect("/admin/erro-500");
    }
}

exports.addSubcategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({ status: 400, errors: errors.array() });
    try {
        let subcategoria = await ProdutoService.addSubcategoria(req.body);
        return res.json({ status: 200, subcategoria: subcategoria });
    } catch (error) {
        console.log(error);
        return res.redirect("/admin/erro-500");
    }
}

exports.updateSubcategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({ status: 400, errors: errors.array() });
    try {
        let serviceResponse = await ProdutoService.updateSubcategoria(req.body);
        return res.json(serviceResponse);
    } catch (error) {
        return res.redirect("/admin/erro-500");
    }
}