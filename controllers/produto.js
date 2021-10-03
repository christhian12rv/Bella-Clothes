const { validationResult } = require('express-validator');
const ProdutoService = require("../services/produto");

exports.addCategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({ status: 400, errors: errors.array() });
    try {
        let categoria = await ProdutoService.addCategoria(req.body);
        return res.json({ status: 200, categoria: categoria });
    } catch (error) {
        return res.redirect("/erro-500");
    }
}