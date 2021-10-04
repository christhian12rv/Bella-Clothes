const moment = require("moment");
moment.locale("pt-br");
require("moment-timezone");
const Categoria = require("../models/produto/Categoria");

exports.getCategorias = async (body) => {
    try {
        let categorias = await Categoria.find().sort({ nome: 1 }).lean();
        categorias.forEach((categoria) => {
            categoria.createdAt = moment(categoria.createdAt).tz('America/Sao_Paulo').format('D MMMM YYYY');
        });
        return categorias;
    } catch (error) {
        throw new Error(error);
    }
}

exports.addCategoria = async (body) => {
    try {
        const novaCategoria = new Categoria({
            nome: body.nome,
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

exports.updateCategoria = async (body) => {
    try {
        let categoria = await Categoria.findByIdAndUpdate(body.id_categoria, body.categoriaToUpdate, { new: true }).lean();
        if (!categoria)
            return { status: 400, errors: [{ msg: 'Categoria não encontrada' }] }

        return { status: 200, categoria: categoria };
    } catch (error) {
        throw new Error(error);
    }
}