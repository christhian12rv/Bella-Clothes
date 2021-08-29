const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Model de Usuário
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = function (passport) {
    /* usernameField e passwordField: Fala quais são os campos de username e de senha (names no formulário) */
    /* (email,senha done): Recebe esses campos para fazer a autenticação */
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {

        Usuario.findOne({ email: email }).lean().then((usuario) => {
            if (usuario) {
                bcrypt.compare(senha, usuario.senha, (erro, result) => {
                    if (result) {
                        /* Retorna o usuário autenticado */
                        return done(null, usuario);
                    } else {
                        /* false: Falha na autenticação*/
                        return done(null, false, { message: "Senha incorreta" })
                    }
                })
            } else {
                /* null: Dados da conta que foi autenticada. Ficou null porquê nesse caso a conta n existe */
                /* false: Se a conta aconteceu com sucesso ou não (true ou false) */
                return done(null, false, { message: "Esta conta não existe" });
            }
        })
    }));

    /* Autentica, retornando o usuário */
    passport.serializeUser((usuario, done) => {
        done(null, usuario);
    })
    /* Desfaz a autenticação, retornando o usuário */
    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario);
        })
    })
}