const Categoria = require("../models/produto/Categoria");

exports.getCategorias = async (body) => {
    try {
        let categorias = await Categoria.find().sort({ nome: 1 }).lean();
        return categorias;
    } catch (error) {
        throw new Error(error);
    }
}