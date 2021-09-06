const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

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
        let tokenEmailVerification = randomstring.generate({ length: 64, charset: 'hex' });

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
            EmailToken.findOne({ token: tokenEmailVerification }).lean()
                .then((dataToken) => {
                    if (dataToken) {
                        tokenExists = true;
                        tokenEmailVerification = randomstring.generate({ length: 64, charset: 'hex' });
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

    } catch (error) {
        throw new Error(error);
    }
}


exports.createUsuarioJuridico = async (body) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.senha, salt);
        let tokenEmailVerification = randomstring.generate({ length: 64, charset: 'hex' });

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
            EmailToken.findOne({ token: tokenEmailVerification }).lean()
                .then((dataToken) => {
                    if (dataToken) {
                        tokenExists = true;
                        tokenEmailVerification = randomstring.generate({ length: 64, charset: 'hex' });
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
                "<a style='text-decoration: none; outline: none; border: none; border-radius: .25rem; box-shadow: none; color: #fff; background-color: #19c880; margin-left: auto; margin-right: auto; text-align:center; padding: .75rem 3rem; font-size: 1.1rem; font-weight: bold;'" +
                "href='" + webSiteUrl + "/verificarEmail?email=" + novoUsuario.email + "&id=" + novoEmailToken.token + "'>Verificar Email</a>br" +
                "<p>Ou copie e cole esse link no seu navegador</p>" +
                "<a href='" + webSiteUrl + "/verificarEmail?email=" + novoUsuario.email + "&id=" + novoEmailToken.token + "'>" + webSiteUrl + "/verificarEmail?email=" + novoUsuario.email + "&id=" + novoEmailToken.token + "</a></div>"
        })

    } catch (error) {
        throw new Error(error);
    }
}

exports.verificarEmail = async (query) => {
    try {
        let email = query.email;
        let tokenId = query.id;
        let checkEmailToken = await EmailToken.findOne({ token: tokenId }).lean();
        if (checkEmailToken) {
            let checkUsuario = await Usuario.findOne({ _id: checkEmailToken.id_usuario, email: email }).lean();
            if (checkUsuario) {
                if (checkUsuario.email_verificado == false)
                    await Usuario.findByIdAndUpdate(checkEmailToken.id_usuario, { email_verificado: true });
                else throw "Conta de usuário já verificada. Faça login para continuar.";
            } else { throw "Email inválido."; }
        } else { throw "Token inválido."; }
    } catch (error) {
        throw new Error(error);
    }
}