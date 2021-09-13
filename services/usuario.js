const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const Endereco = require("../models/usuario/registro/Endereco");
const EmailToken = require("../models/usuario/registro/EmailToken");
const SenhaToken = require("../models/usuario/SenhaToken");

const webSiteUrl = require("../config/webSiteUrl");
const { smtpTransport, fromNodemailer } = require("../config/nodemailer");

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
        await readHTMLFile("templates/email/verificarEmail.handlebars", async (err, html) => {
            try {
                let template = handlebars.compile(html);
                let replacements = {
                    nome: novoUsuarioFisico.nome,
                    webSiteUrl: webSiteUrl,
                    email: novoUsuario.email,
                    token: novoEmailToken.token
                };
                var htmlToSend = template(replacements);

                await smtpTransport.sendMail({
                    from: fromNodemailer,
                    to: novoUsuario.email,
                    subject: "Bella Clothes - Verificação de Conta",
                    html: htmlToSend,
                    attachments: [{
                        filename: 'bella-clothes-logo.png',
                        path: './public/img/bella-clothes-logo.png',
                        cid: 'unique@logo'
                    }]
                })
            } catch (error) {
                throw error;
            }
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
        await readHTMLFile("templates/email/verificarEmail.handlebars", async (err, html) => {
            try {
                let template = handlebars.compile(html);
                let replacements = {
                    nome: novoUsuarioJuridico.razao_social,
                    webSiteUrl: webSiteUrl,
                    email: novoUsuario.email,
                    token: novoEmailToken.token
                };
                var htmlToSend = template(replacements);

                await smtpTransport.sendMail({
                    from: fromNodemailer,
                    to: novoUsuario.email,
                    subject: "Bella Clothes - Verificação de Conta",
                    html: htmlToSend,
                    attachments: [{
                        filename: 'bella-clothes-logo.png',
                        path: './public/img/bella-clothes-logo.png',
                        cid: 'unique@logo'
                    }]
                })
            } catch (error) {
                throw error;
            }
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
        if (checkUsuario && checkEmailToken)
            return { status: 200 }
        else
            return { status: 404 }
    } catch (error) {
        throw new Error(error);
    }
}

exports.emailVerificado = async (query) => {
    try {
        let email = query.email;
        let tokenId = query.token;
        let checkUsuario = await Usuario.findOne({ email: email }).lean();
        let checkEmailToken = await EmailToken.findOne({ token: tokenId, id_usuario: checkUsuario._id }).lean();
        if (checkUsuario && checkUsuario.email_verificado == true)
            throw "Conta de usuário já verificada. Faça login para continuar.";
        if (!checkUsuario || !checkEmailToken)
            return { status: 404 };
        await Usuario.findByIdAndUpdate(checkEmailToken.id_usuario, { email_verificado: true });
        let checkUsuarioTipo = await checkTipoUsuario(checkUsuario);
        await EmailToken.deleteOne({ token: tokenId, id_usuario: checkUsuario._id });
        return { nome: (checkUsuarioTipo.nome ? checkUsuarioTipo.nome : checkUsuarioTipo.razao_social) };
    } catch (error) {
        throw new Error(error);
    }
}

exports.reenviarEmail = async (query) => {
    try {
        let { email, id } = query;
        let checkEmailToken = await EmailToken.findById(id).lean();
        let checkUsuario = await Usuario.findOne({ email: email }).lean();
        if (checkEmailToken && checkUsuario) {
            let checkUsuarioTipo = await checkTipoUsuario(checkUsuario);
            await readHTMLFile("templates/email/verificarEmail.handlebars", async (err, html) => {
                try {
                    let template = handlebars.compile(html);
                    let replacements = {
                        nome: (checkUsuarioTipo.nome ? checkUsuarioTipo.nome : checkUsuarioTipo.razao_social),
                        webSiteUrl: webSiteUrl,
                        email: checkUsuario.email,
                        token: checkEmailToken.token
                    };
                    var htmlToSend = template(replacements);

                    await smtpTransport.sendMail({
                        from: fromNodemailer,
                        to: checkUsuario.email,
                        subject: "Bella Clothes - Verificação de Conta",
                        html: htmlToSend,
                        attachments: [{
                            filename: 'bella-clothes-logo.png',
                            path: './public/img/bella-clothes-logo.png',
                            cid: 'unique@logo'
                        }]
                    })
                } catch (error) {
                    throw error;
                }
            })
        }
        return { email: checkUsuario.email, id: checkEmailToken._id };
    } catch (error) {
        throw new Error(error);
    }
}

exports.trocarSenha = async (email) => {
    try {
        let usuario = await Usuario.findOne({ email: email }).lean();
        if (usuario) {
            let existsSenhaToken = await SenhaToken.findOne({ id_usuario: usuario._id }).lean();
            if (existsSenhaToken)
                return { status: "token_exists" };

            let tokenSenhaVerification = randomstring.generate({ length: 64, charset: 'alphanumeric' });
            let tokenExists;
            do {
                let findOneSenhaToken = await SenhaToken.findOne({ token: tokenSenhaVerification }).lean();
                if (findOneSenhaToken) {
                    tokenExists = true;
                    tokenSenhaVerification = randomstring.generate({ length: 64, charset: 'alphanumeric' });
                } else {
                    tokenExists = false;
                }
            } while (tokenExists === true);

            const novaSenhaToken = new SenhaToken({
                id_usuario: usuario._id,
                token: tokenSenhaVerification
            });

            await novaSenhaToken.save();
            await readHTMLFile("templates/email/trocarSenha.handlebars", async (err, html) => {
                try {
                    let template = handlebars.compile(html);
                    let replacements = {
                        webSiteUrl: webSiteUrl,
                        email: usuario.email,
                        token: novaSenhaToken.token
                    };
                    var htmlToSend = template(replacements);

                    await smtpTransport.sendMail({
                        from: fromNodemailer,
                        to: usuario.email,
                        subject: "Bella Clothes - Trocar senha",
                        html: htmlToSend,
                        attachments: [{
                            filename: 'bella-clothes-logo.png',
                            path: './public/img/bella-clothes-logo.png',
                            cid: 'unique@logo'
                        }]
                    })
                } catch (error) {
                    throw error;
                }
            })
            return { status: 200 };
        } else
            return { status: "incorrect" };
    } catch (error) {
        throw new Error(error);
    }
}

exports.verificarEscolhaNovaSenha = async (query) => {
    try {
        let { email, token } = query;
        let usuario = await Usuario.findOne({ email: email }).lean();
        let senhaToken = await SenhaToken.findOne({ id_usuario: usuario._id, token: token }).lean();
        if (usuario && senhaToken)
            return { status: 200 };
        else
            return { status: 404 };
    } catch (error) {
        throw new Error(error);
    }
}

exports.escolhaNovaSenha = async (body) => {
    try {
        let { email, token, senha } = body;
        let usuario = await Usuario.findOne({ email: email }).lean();
        let senhaToken = await SenhaToken.findOne({ id_usuario: usuario._id, token: token }).lean();
        if (usuario && senhaToken) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(senha, salt);
            await Usuario.findByIdAndUpdate(usuario._id, { senha: hash });
            await SenhaToken.deleteOne({ id_usuario: usuario._id, token: token });
            return { status: 200 };
        } else
            return { status: 404 };
    } catch (error) {
        throw new Error(error);
    }
}

exports.getUsuarioById = async (id_usuario) => {
    try {
        let usuario = await Usuario.findById(id_usuario).lean();
        let usuarioTipo = await checkTipoUsuario(usuario);
        let enderecos = await Endereco.find({ id_usuario: id_usuario }).lean();
        if (usuario && usuarioTipo && enderecos)
            return { status: 200, usuario: usuario, usuarioTipo: usuarioTipo, enderecos: enderecos };
        else
            return { status: 404 };
    } catch (error) {
        throw new Error(error);
    }
}

exports.changeFotoPerfil = async (id_usuario, foto) => {
    try {
        if (foto !== undefined) {
            let fotoExists = await Usuario.findOne({ _id: id_usuario, foto: { $ne: undefined } }).lean();
            if (fotoExists && fs.existsSync(path.join(__dirname) + "/../public/img/foto-usuarios/" + fotoExists.foto)) {
                fs.unlink(path.join(__dirname) + "/../public/img/foto-usuarios/" + fotoExists.foto, async (error) => {
                    if (error) throw error;
                });
            }
            const caminhoArquivo = path.join(__dirname) + "/../public/img/foto-usuarios/" + id_usuario + path.parse(foto.name).ext;

            foto.mv(caminhoArquivo, async (error) => {
                if (error)
                    throw error;
                await Usuario.findByIdAndUpdate(id_usuario, { foto: id_usuario + path.parse(foto.name).ext });
            })

        } else {
            let fotoExists = await Usuario.findOne({ _id: id_usuario }).lean();
            if (fotoExists && fs.existsSync(path.join(__dirname) + "/../public/img/foto-usuarios/" + fotoExists.foto)) {
                fs.unlink(path.join(__dirname) + "/../public/img/foto-usuarios/" + fotoExists.foto, async (error) => {
                    if (error) throw error;
                });
            }

            await Usuario.findByIdAndUpdate(id_usuario, { foto: undefined });
        }
    } catch (error) {
        throw new Error(error);
    }
}

exports.changeEmail = async (id_usuario, novo_email, senha) => {
    try {
        let usuario = await Usuario.findById(id_usuario).lean();
        let compareSenha = await bcrypt.compare(senha, usuario.senha);
        if (usuario) {
            if (usuario.email === novo_email)
                return { status: "incorrect", error: "Escolha um email diferente" };
            if (!compareSenha)
                return { status: "incorrect", error: "Senha incorreta" };

            let emailExists = await Usuario.findOne({ email: novo_email }).lean();
            if (emailExists)
                return { status: "incorrect", error: "Já existe um usuário cadastrado com o Email informado." };

            await Usuario.findByIdAndUpdate(id_usuario, { email: novo_email });
            return { status: 200, novo_email: novo_email };
        } else
            return { status: "incorrect", error: "Usuário incorreto" };
    } catch (error) {
        throw new Error(error);
    }
}



async function checkTipoUsuario(usuario) {
    let checkTipoUsuario = {
        "Fisico": await UsuarioFisico.findOne({ id_usuario: usuario._id }).lean(),
        "Juridico": await UsuarioJuridico.findOne({ id_usuario: usuario._id }).lean()
    }
    return checkTipoUsuario[usuario.tipo];
}

function readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
        if (err) {
            throw err;
        } else {
            return callback(null, html);
        }
    })
}