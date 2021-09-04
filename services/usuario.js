const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const randomstring = require("randomstring");

const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const Endereco = require("../models/usuario/registro/Endereco");
const EmailToken = require("../models/usuario/registro/EmailToken");

const webSiteUrl = require("../config/webSiteUrl");
const smtpTransport = require("../config/nodemailer");

exports.createUsuario = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.senha, salt);
        var tokenEmailVerification = randomstring.generate({ length: 32, charset: 'hex' });

        const novoUsuario = new Usuario({
            email: data.email,
            senha: hash,
            telefone: data.telefone,
            outro_telefone: (data.outro_telefone != "" && data.outro_telefone) ? data.outro_telefone : undefined,
            tipo: "fisico",
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

        await smtpTransport.sendMail({
            from: '"Bella Clothes" <bellaclothes5@gmail.com>',
            to: novoUsuario.email,
            subject: "Bella Clothes - Verificação de Conta",
            html: "<div><h2>Olá " + novoUsuarioFisico.nome + ",</h2>" +
                "<h3>Por favor verifique sua conta clicando no link abaixo</h3><br>" +
                "<a style='text-decoration: none; outline: none; border: none; box-shadow: none; color: #fff; background-color: #19c880; margin-left: auto; margin-right: auto; text-align:center; padding: .75rem 3rem; font-size: 1.1rem; font-weight: bold;'" +
                "href='" + webSiteUrl + "/verificarEmail?email=" + novoUsuario.email + "&id=" + novoEmailToken.token + "'>Verificar Email</a></div>"
        })

        await novoUsuario.save();
        await novoUsuarioFisico.save();
        await novoEndereco.save();
        await novoEmailToken.save();
    } catch (error) {
        throw new Error(error);
    }
}