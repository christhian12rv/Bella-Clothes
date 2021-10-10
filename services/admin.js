const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const Endereco = require("../models/usuario/registro/Endereco");
const Cartao = require("../models/usuario/Cartao");

exports.excluirUsuario = async (id_usuario) => {
    try {
        console.log(id_usuario)
        let usuario = await Usuario.findById(id_usuario).lean();
        if (!usuario)
            return { status: 400, error: "Usuário inválido" };

        await Usuario.deleteOne({ _id: id_usuario });
        if (usuario.tipo === 'Fisico')
            await UsuarioFisico.deleteOne({ id_usuario: id_usuario });
        else
            await UsuarioJuridico.deleteOne({ id_usuario: id_usuario });

        await Endereco.deleteMany({ id_usuario: id_usuario });
        await Cartao.deleteMany({ id_usuario: id_usuario });

        return { status: 200 };
    } catch (error) {
        throw new Error(error);
    }
}