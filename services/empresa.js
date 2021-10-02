const Empresa = require("../models/empresa/Empresa")
const email = require("../config/email");

exports.getEmpresa = async () => {
    try {
        let empresa = await Empresa.findOne().lean();
        return empresa || "";
    } catch (error) {
        throw new Error(error);
    }
}

exports.updateEmpresa = async (body) => {
    try {
        await Empresa.findOneAndUpdate({ email: email }, {
            nome: 'Bella Clothes',
            cnpj: '00.000.000/0000-01',
            email: 'bellaclothes5@gmail.com',
            endereco: body.endereco,
            numero_endereco: body.numero_endereco,
            complemento: (body.complemento != "" && body.complemento) ? body.complemento : undefined,
            bairro: body.bairro,
            cidade: body.cidade,
            estado: body.estado,
            cep: body.cep,
            telefone: body.telefone,
            outro_telefone: (body.outro_telefone != "" && body.outro_telefone) ? body.outro_telefone : undefined,
        })
    } catch (error) {
        throw new Error(error);
    }
}