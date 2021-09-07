const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const mongoose = require("mongoose");

const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const Endereco = require("../models/usuario/registro/Endereco");
const EmailToken = require("../models/usuario/registro/EmailToken");

const webSiteUrl = require("../config/webSiteUrl");
const smtpTransport = require("../config/nodemailer");

exports.createUsuarioFisico = async (body) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.senha, salt);
        let tokenEmailVerification = randomstring.generate({ length: 64, charset: 'alphanumeric' });

        const novoUsuario = new Usuario({
            email: body.email,
            senha: hash,
            telefone: body.telefone,
            outro_telefone: (body.outro_telefone != "" && body.outro_telefone) ? body.outro_telefone : undefined,
            tipo: "Fisico",
            ofertas_email: body.check_ofertas
        })

        const novoUsuarioFisico = new UsuarioFisico({
            id_usuario: novoUsuario._id,
            nome: body.nome,
            sobrenome: body.sobrenome,
            sexo: body.sexo,
            data_nascimento: body.data_nascimento,
            cpf: body.cpf
        })

        const novoEndereco = new Endereco({
            id_usuario: novoUsuario._id,
            nome: body.nome_do_endereco,
            numero: body.numero_endereco,
            complemento: (body.complemento != "" && body.complemento) ? body.complemento : undefined,
            bairro: body.bairro,
            ponto_referencia: (body.ponto_referencia != "" && body.ponto_referencia) ? body.ponto_referencia : undefined,
            cep: body.cep,
            estado: body.estado,
            cidade: body.cidade,
            nome_pessoa: body.nome + " " + body.sobrenome,
            telefone: body.telefone,
            principal: true
        })

        let tokenExists;
        do {
            let findOneEmailToken = await EmailToken.findOne({ token: tokenEmailVerification }).lean();
            if (findOneEmailToken) {
                tokenExists = true;
                tokenEmailVerification = randomstring.generate({ length: 64, charset: 'alphanumeric' });
            } else {
                tokenExists = false;
            }
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
                "<a style='text-decoration: none; outline: none; border: none; border-radius: .25rem; box-shadow: none; color: #fff; background-color: #19c880; margin-left: auto; margin-right: auto; text-align:center; padding: .75rem 3rem; font-size: 1.1rem; font-weight: bold;'" +
                "href='" + webSiteUrl + "/emailVerificado?email=" + novoUsuario.email + "&token=" + novoEmailToken.token + "'>Verificar Email</a>br" +
                "<p>Ou copie e cole esse link no seu navegador</p>" +
                "<a href='" + webSiteUrl + "/emailVerificado?email=" + novoUsuario.email + "&token=" + novoEmailToken.token + "'>" + webSiteUrl + "/emailVerificado?email=" + novoUsuario.email + "&token=" + novoEmailToken.token + "</a></div>"
        })
        return { usuario: novoUsuario, emailToken: novoEmailToken };
    } catch (error) {
        throw new Error(error);
    }
}


exports.createUsuarioJuridico = async (body) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.senha, salt);
        let tokenEmailVerification = randomstring.generate({ length: 64, charset: 'alphanumeric' });

        const novoUsuario = new Usuario({
            email: body.email,
            senha: hash,
            telefone: body.telefone,
            outro_telefone: (body.outro_telefone != "" && body.outro_telefone) ? body.outro_telefone : undefined,
            tipo: "Juridico",
            ofertas_email: body.check_ofertas
        })

        const novoUsuarioJuridico = new UsuarioJuridico({
            id_usuario: novoUsuario._id,
            razao_social: body.razao_social,
            fantasia: body.fantasia,
            inscricao_municipal: (body.inscricao_municipal != "" && body.inscricao_municipal) ? body.inscricao_municipal : undefined,
            inscricao_estadual: (body.inscricao_estadual != "" && body.inscricao_estadual) ? body.inscricao_estadual : undefined,
            isento: body.check_isento,
            cnpj: body.cnpj
        })

        const novoEndereco = new Endereco({
            id_usuario: novoUsuario._id,
            nome: body.nome_do_endereco,
            numero: body.numero_endereco,
            complemento: (body.complemento != "" && body.complemento) ? body.complemento : undefined,
            bairro: body.bairro,
            ponto_referencia: (body.ponto_referencia != "" && body.ponto_referencia) ? body.ponto_referencia : undefined,
            cep: body.cep,
            estado: body.estado,
            cidade: body.cidade,
            nome_pessoa: body.razao_social,
            telefone: body.telefone,
            principal: true
        })

        let tokenExists;
        do {
            let findOneEmailToken = await EmailToken.findOne({ token: tokenEmailVerification }).lean();
            if (findOneEmailToken) {
                tokenExists = true;
                tokenEmailVerification = randomstring.generate({ length: 64, charset: 'alphanumeric' });
            } else {
                tokenExists = false;
            }
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
                "<a style='text-decoration: none; outline: none; border: none; border-radius: .25rem; box-shadow: none; color: #fff; background-color: #19c880; margin-left: auto; margin-right: auto; text-align:center; padding: .75rem 3rem; font-size: 1.1rem; font-weight: bold;'" +
                "href='" + webSiteUrl + "/emailVerificado?email=" + novoUsuario.email + "&token=" + novoEmailToken.token + "'>Verificar Email</a>br" +
                "<p>Ou copie e cole esse link no seu navegador</p>" +
                "<a href='" + webSiteUrl + "/emailVerificado?email=" + novoUsuario.email + "&token=" + novoEmailToken.token + "'>" + webSiteUrl + "/emailVerificado?email=" + novoUsuario.email + "&token=" + novoEmailToken.token + "</a></div>"
        })
        return { usuario: novoUsuario, emailToken: novoEmailToken };
    } catch (error) {
        throw new Error(error);
    }
}

exports.verificarEmail = async (email, emailTokenId) => {
    try {
        let checkUsuario = await Usuario.findOne({ email: email }).lean();
        let checkEmailToken = await EmailToken.findById(emailTokenId).lean();
        if (checkUsuario && checkEmailToken) return { status: 200 }
        else return { status: 404 }
    } catch (error) {
        throw new Error(error);
    }
}

exports.emailVerificado = async (query) => {
    try {
        let email = query.email;
        let tokenId = query.token;
        let checkUsuario = await Usuario.findOne({ email: email }).lean();
        let checkEmailToken = await EmailToken.findOne({ token: tokenId }).lean();
        if (checkUsuario && checkUsuario.email_verificado == true) throw "Conta de usuário já verificada. Faça login para continuar.";
        if (!checkUsuario || !checkEmailToken) return { status: 404 };
        await Usuario.findByIdAndUpdate(checkEmailToken.id_usuario, { email_verificado: true });
        async function checkTipoUsuarioNome(tipo) {
            let checkTipoUsuario = {
                "Fisico": await UsuarioFisico.findOne({ id_usuario: checkUsuario._id }).select("nome"),
                "Juridico": await UsuarioJuridico.findOne({ id_usuario: checkUsuario._id }).select("razao_social")
            }
            return checkTipoUsuario[tipo];
        }
        let nome = await checkTipoUsuarioNome(checkUsuario.tipo);
        await EmailToken.deleteOne({ token: tokenId });
        return { nome: nome.nome };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}