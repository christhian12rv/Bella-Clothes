const { validationResult } = require('express-validator');
const ProdutoService = require("../services/produto");

exports.addCategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({ status: 400, errors: errors.array() });
    try {
        await ProdutoService.addCategoria(req.body);
        req.flash("success_msg", "Categoria adicionada com sucesso!");
        return res.json({ status: 200 });
    } catch (error) {
        return res.redirect("/erro-500");
    }
}