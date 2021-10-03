const Categoria = require("../models/produto/Categoria");

exports.addCategoria = async (body) => {
    try {
        const novaCategoria = new Categoria({
            nome: body.categoria,
            descricao: body.descricao,
            slug: body.slug,
            ativo: true
        })
        await novaCategoria.save();
        return novaCategoria;
    } catch (error) {
        throw new Error(error);
    }
}