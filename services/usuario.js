const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
require("../models/usuario/registro/UsuarioFisico");
const UsuarioFisico = mongoose.model("usuariosFisicos");

exports.createUsuario = async (data) => {
    console.log(data);
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.senha, salt);
        const novoUsuario = new UsuarioFisico({
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: hash,
            sexo: data.sexo,
            data_nascimento: data.data_nascimento,
            cpf: data.cpf,
            telefone: data.telefone,
            ofertas_email: data.check_ofertas
        })
        if (data.outro_telefone != "") novoUsuario.outro_telefone = data.outro_telefone;
        console.log(novoUsuario);
        await novoUsuario.save();
    } catch (error) {
        throw new Error(error);
    }
}