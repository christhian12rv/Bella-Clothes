const schedule = require("node-schedule");
const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const Endereco = require("../models/usuario/registro/Endereco");
const EmailToken = require("../models/usuario/registro/EmailToken");

module.exports = {
    runAllCrons: () => {
        schedule.scheduleJob("* */20 * * *", async () => {
            try {
                let usuarios = await Usuario.find({ email_verificado: false }).lean();
                if (usuarios) {
                    await usuarios.forEach(async (usuario) => {
                        await deleteTipoUsuario(usuario);
                        await Endereco.deleteOne({ id_usuario: usuario._id });
                        await EmailToken.deleteOne({ id_usuario: usuario._id });
                        await Usuario.deleteOne({ _id: usuario._id });
                    });
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
}

async function deleteTipoUsuario(usuario) {
    let deleteTipoUsuario = {
        "Fisico": await UsuarioFisico.deleteOne({ id_usuario: usuario._id }),
        "Juridico": await UsuarioJuridico.deleteOne({ id_usuario: usuario._id })
    }
    return deleteTipoUsuario[usuario.tipo];
}