const { validationResult } = require('express-validator');
const EmpresaService = require("../services/empresa");

exports.viewEmpresa = async (req, res) => {
    try {
        res.render("admin/configuracoes/empresa", {
            css: "admin/configuracoes/empresa.css",
            js: "admin/configuracoes/empresa.js",
            title: "Empresa | Bella Clothes Admin",
            paginaAdmin: true
        })
    } catch (error) {
        return res.redirect("/admin/erro-500")
    }
}

exports.updateEmpresa = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
    } else {
        try {
            await EmpresaService.updateEmpresa(req.body);
        } catch (error) {
            return res.redirect("/admin/erro-500");
        }
    }
    return res.redirect("/admin/empresa");
}