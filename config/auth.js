const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");

module.exports = (passport) => {
    passport.use('user-local', new localStrategy({ usernameField: 'login', passwordField: 'senha', passReqToCallback: true }, async (req, login, senha, done) => {
        try {
            let usuario = await findUsuario(login);
            if (usuario) {
                if (usuario.email_verificado === true) {
                    if (usuario.ativo !== true)
                        return done(null, false, { message: req.flash("error_login_message", "Conta desativada. Contate nossa Central de Relacionamento para saber o que ocorreu com sua conta.") });
                    let compareSenha = await bcrypt.compare(senha, usuario.senha);
                    if (compareSenha)
                        return done(null, usuario);
                    else
                        return done(null, false, { message: req.flash("error_login_message", "Senha incorreta") })
                }
                else
                    return done(null, false, { message: req.flash("error_login_message", "Conta não verificada. Por favor confirme sua conta no email que enviamos para você.") });
            } else
                return done(null, false, { message: req.flash("error_login_message", "Login incorreto") });
        } catch (error) {
            return done(error);
        }
    })
    );

    passport.use('admin-local', new localStrategy({ usernameField: 'login', passwordField: 'senha', passReqToCallback: true }, async (req, login, senha, done) => {
        try {
            let usuario = await findUsuario(login);
            if (usuario) {
                if (usuario.admin === false)
                    return done(null, false, { message: req.flash("error_login_message", "Esse usuário não é um administrador") })
                if (usuario.email_verificado === true) {
                    if (usuario.ativo !== true)
                        return done(null, false, { message: req.flash("error_login_message", "Conta desativada. Contate nossa Central de Relacionamento para saber o que ocorreu com sua conta.") });
                    let compareSenha = await bcrypt.compare(senha, usuario.senha);
                    if (compareSenha)
                        return done(null, usuario);
                    else
                        return done(null, false, { message: req.flash("error_login_message", "Senha incorreta") })
                } else
                    return done(null, false, { message: req.flash("error_login_message", "Conta não verificada. Por favor confirme sua conta no email que enviamos para você.") });
            } else
                return done(null, false, { message: req.flash("error_login_message", "Login incorreto") });
        } catch (error) {
            return done(error);
        }
    })
    );

    passport.serializeUser((usuario, done) => {
        return done(null, usuario);
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            return done(err, usuario);
        })
    })
}

async function findUsuario(login) {
    let inputLength = login.length;
    let checkCPForCNPJ = async () => {
        if (inputLength == 11) {
            let cpf = login.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            return await UsuarioFisico.findOne({ cpf: cpf }).lean();
        } else if (inputLength == 14) {
            let cnpj = login.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            return await UsuarioJuridico.findOne({ cnpj: cnpj }).lean();
        }
    }
    let result = await checkCPForCNPJ();
    let checkUser = result ? await Usuario.findOne({ _id: result.id_usuario }).lean() : undefined;
    return checkUser || await Usuario.findOne({ email: login }).lean();
}