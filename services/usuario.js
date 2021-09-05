const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const schedule = require("node-schedule");

const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const Endereco = require("../models/usuario/registro/Endereco");
const EmailToken = require("../models/usuario/registro/EmailToken");

const webSiteUrl = require("../config/webSiteUrl");
const smtpTransport = require("../config/nodemailer");

exports.createUsuarioFisico = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.senha, salt);
        var tokenEmailVerification = randomstring.generate({ length: 32, charset: 'hex' });

        const novoUsuario = new Usuario({
            email: data.email,
            senha: hash,
            telefone: data.telefone,
            outro_telefone: (data.outro_telefone != "" && data.outro_telefone) ? data.outro_telefone : undefined,
            tipo: "Fisico",
            ofertas_email: data.check_ofertas
        })

        const novoUsuarioFisico = new UsuarioFisico({
            id_usuario: novoUsuario._id,
            nome: data.nome,
            sobrenome: data.sobrenome,
            sexo: data.sexo,
            data_nascimento: data.data_nascimento,
            cpf: data.cpf
        })

        const novoEndereco = new Endereco({
            id_usuario: novoUsuario._id,
            nome: data.nome_do_endereco,
            numero: data.numero_endereco,
            complemento: (data.complemento != "" && data.complemento) ? data.complemento : undefined,
            bairro: data.bairro,
            ponto_referencia: (data.ponto_referencia != "" && data.ponto_referencia) ? data.ponto_referencia : undefined,
            cep: data.cep,
            estado: data.estado,
            cidade: data.cidade,
            nome_pessoa: data.nome + " " + data.sobrenome,
            telefone: data.telefone,
            principal: true
        })

        let tokenExists;
        do {
            EmailToken.findOne({ token: tokenEmailVerification }).lean()
                .then((dataToken) => {
                    if (dataToken) {
                        tokenExists = true;
                        tokenEmailVerification = randomstring.generate({ length: 32, charset: 'hex' });
                    } else {
                        tokenExists = false;
                    }
                })
                .catch((erro) => { throw new Error(erro) });
        } while (tokenExists === true);

        const novoEmailToken = new EmailToken({
            id_usuario: novoUsuario._id,
            token: tokenEmailVerification
        });

        await novoUsuario.save();
        await novoUsuarioFisico.save();
        await novoEndereco.save();
        await novoEmailToken.save();
        await smtpTransport.sendMail({
            from: '"Bella Clothes" <bellaclothes5@gmail.com>',
            to: novoUsuario.email,
            subject: "Bella Clothes - Verificação de Conta",
            html: "<div><h2>Olá " + novoUsuarioFisico.nome + ",</h2>" +
                "<h3>Por favor verifique sua conta clicando no link abaixo</h3><br>" +
                "<a style='text-decoration: none; outline: none; border: none; box-shadow: none; color: #fff; background-color: #19c880; margin-left: auto; margin-right: auto; text-align:center; padding: .75rem 3rem; font-size: 1.1rem; font-weight: bold;'" +
                "href='" + webSiteUrl + "/verificarEmail?email=" + novoUsuario.email + "&id=" + novoEmailToken.token + "'>Verificar Email</a></div>"
        })

        schedule.scheduleJob(tokenEmailVerification, "59 59 */23 * * *", async () => {
            console.log("Executando a tarefa a cada 24 horas para o documento " + novoEmailToken._id);
            let checkUsuario = await Usuario.findOne({ _id: novoUsuario._id, email_verificado: false }).lean();
            if (checkUsuario) {
                await UsuarioFisico.deleteOne({ id_usuario: novoUsuario._id });
                await Endereco.deleteOne({ id_usuario: novoUsuario._id });
                await EmailToken.deleteOne({ id_usuario: novoUsuario._id });
                await Usuario.deleteOne({ _id: novoUsuario._id });
                schedule.scheduledJobs[tokenEmailVerification].cancel();
            }
        });

    } catch (error) {
        throw new Error(error);
    }
}


exports.createUsuarioJuridico = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.senha, salt);
        var tokenEmailVerification = randomstring.generate({ length: 32, charset: 'hex' });

        const novoUsuario = new Usuario({
            email: data.email,
            senha: hash,
            telefone: data.telefone,
            outro_telefone: (data.outro_telefone != "" && data.outro_telefone) ? data.outro_telefone : undefined,
            tipo: "Juridico",
            ofertas_email: data.check_ofertas
        })

        const novoUsuarioJuridico = new UsuarioJuridico({
            id_usuario: novoUsuario._id,
            razao_social: data.razao_social,
            fantasia: data.fantasia,
            inscricao_municipal: (data.inscricao_municipal != "" && data.inscricao_municipal) ? data.inscricao_municipal : undefined,
            inscricao_estadual: (data.inscricao_estadual != "" && data.inscricao_estadual) ? data.inscricao_estadual : undefined,
            isento: data.check_isento,
            cnpj: data.cnpj
        })

        const novoEndereco = new Endereco({
            id_usuario: novoUsuario._id,
            nome: data.nome_do_endereco,
            numero: data.numero_endereco,
            complemento: (data.complemento != "" && data.complemento) ? data.complemento : undefined,
            bairro: data.bairro,
            ponto_referencia: (data.ponto_referencia != "" && data.ponto_referencia) ? data.ponto_referencia : undefined,
            cep: data.cep,
            estado: data.estado,
            cidade: data.cidade,
            nome_pessoa: data.razao_social,
            telefone: data.telefone,
            principal: true
        })

        let tokenExists;
        do {
            EmailToken.findOne({ token: tokenEmailVerification }).lean()
                .then((dataToken) => {
                    if (dataToken) {
                        tokenExists = true;
                        tokenEmailVerification = randomstring.generate({ length: 32, charset: 'hex' });
                    } else {
                        tokenExists = false;
                    }
                })
                .catch((erro) => { throw new Error(erro) });
        } while (tokenExists === true);

        const novoEmailToken = new EmailToken({
            id_usuario: novoUsuario._id,
            token: tokenEmailVerification
        });

        await novoUsuario.save();
        await novoUsuarioJuridico.save();
        await novoEndereco.save();
        await novoEmailToken.save();
        await smtpTransport.sendMail({
            from: '"Bella Clothes" <bellaclothes5@gmail.com>',
            to: novoUsuario.email,
            subject: "Bella Clothes - Verificação de Conta",
            html: "<div><h2>Olá " + novoUsuarioJuridico.razao_social + ",</h2>" +
                "<h3>Por favor verifique sua conta clicando no link abaixo</h3><br>" +
                "<a style='text-decoration: none; outline: none; border: none; box-shadow: none; color: #fff; background-color: #19c880; margin-left: auto; margin-right: auto; text-align:center; padding: .75rem 3rem; font-size: 1.1rem; font-weight: bold;'" +
                "href='" + webSiteUrl + "/verificarEmail?email=" + novoUsuario.email + "&id=" + novoEmailToken.token + "'>Verificar Email</a></div>"
        })

        schedule.scheduleJob(tokenEmailVerification, "59 59 */23 * * *", async () => {
            console.log("Executando a tarefa a cada 24 horas para o documento " + novoEmailToken._id);
            let checkUsuario = await Usuario.findOne({ _id: novoUsuario._id, email_verificado: false }).lean();
            if (checkUsuario) {
                await UsuarioJuridico.deleteOne({ id_usuario: novoUsuario._id });
                await Endereco.deleteOne({ id_usuario: novoUsuario._id });
                await EmailToken.deleteOne({ id_usuario: novoUsuario._id });
                await Usuario.deleteOne({ _id: novoUsuario._id });
                schedule.scheduledJobs[tokenEmailVerification].cancel();
            }
        });

    } catch (error) {
        throw new Error(error);
    }
}

exports.verificarEmail = async (data) => {
    try {
        console.log(data);
        let email = data.email;
        let tokenId = data.id;
        let checkEmailToken = await EmailToken.findOne({ token: tokenId }).lean();
        if (checkEmailToken) {
            let checkUsuario = await Usuario.findOne({ _id: checkEmailToken.id_usuario, email: email }).lean();
            if (checkUsuario) {
                if (checkUsuario.email_verificado == false)
                    await Usuario.findByIdAndUpdate(checkEmailToken.id_usuario, { email_verificado: true });
                else throw "Conta de usuário já verificada. Faça login para continuar.";
            } else { throw "O Usuário com esse email não está cadastrado."; }
        } else { throw "Token inválido."; }

    } catch (error) {
        throw new Error(error);
    }
}