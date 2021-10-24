const ApiService = require("../services/api");

exports.getCategorias = async (req, res) => {
    try {
        let categorias = await ApiService.getCategorias();
        return res.json({ categorias: categorias });
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.getSubcategoriasByCategoria = async (req, res) => {
    try {
        let subcategorias = await ApiService.getSubcategoriasByCategoria(req.params.idCategoria);
        return res.json({ subcategorias: subcategorias });
    } catch (error) {
        console.log(error);
        return res.redirect("/erro-500");
    }
}

exports.getUsuarios = async (req, res) => {
    try {
        let serviceResponse = await ApiService.getUsuarios(req.query);
        res.send(serviceResponse);
    } catch (error) {
        console.log(error);
        return res.redirect("/erro-500");
    }
}