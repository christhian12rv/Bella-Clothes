const Categoria = require("../models/produto/Categoria");

exports.addCategoria = async (body) => {
    try {
        const novaCategoria = new Categoria({
            nome: body.categoria,
            descricao: body.descricao,
            slug: body.slug
        })
        await novaCategoria.save();
    } catch (error) {
        throw new Error(error);
    }
}