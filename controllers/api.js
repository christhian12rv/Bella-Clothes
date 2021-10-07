const ApiService = require("../services/api");

exports.getCategorias = async (req, res) => {
    try {
        let categorias = await ApiService.getCategorias();
        return res.json({ categorias: categorias });
    } catch (error) {
        return res.redirect("/erro-500");
    }
}

exports.getUsuarios = async (req, res) => {
    try {
        let usuarios = await ApiService.getUsuarios(req.query);
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        return res.redirect("/erro-500");
    }
    /* console.log(req.query);
    var clientes = [];
    var max = req.body.max;
    if (!max)
        max = 53;

    for (let i = 0; i < max; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            cpf_cnpj: "12345678912" + i,
            status: "Ativo",
            data_registro: "21/02/2020, 14:21"
        });
    }
    for (let i = max; i < max + 10; i++) {
        clientes.push({
            id: i + 1,
            nome: "João Pedro da Silva" + i,
            foto: "menina.jpg",
            email: "cs@hotmail.com" + i,
            cpf_cnpj: "12345678912" + i,
            status: "Inativo",
            data_registro: "21/02/2020, 14:21"
        });
    }

    var { start, length } = req.query;
    res.send(clientes); */
}