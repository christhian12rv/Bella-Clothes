const ApiService = require("../services/api");

exports.getCategorias = async (req, res) => {
    try {
        let categorias = await ApiService.getCategorias();
        return res.json({ categorias: categorias });
    } catch (error) {
        return res.redirect("/erro-500");
    }
}