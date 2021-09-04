const { body } = require('express-validator');
const fetch = require('node-fetch');

const mongoose = require("mongoose");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");

exports.createUsuario = [
    body("nome")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        })
        .notEmpty()
        .withMessage("O campo Nome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Nome deve conter no mínimo 3 caracteres"),

    body("sobrenome")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        })
        .notEmpty()
        .withMessage("O campo Sobrenome é obrigatório")
        .bail()
        .isString()
        .withMessage("O Sobrenome informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Sobrenome deve conter no mínimo 3 caracteres"),

    body("sexo")
        .trim()
        .notEmpty()
        .withMessage("O campo Sexo é obrigatório")
        .bail()
        .isAlpha()
        .withMessage("O Sexo informado é inválido")
        .bail()
        .isIn(["Masculino", "Feminino"])
        .withMessage("O Sexo informado é inválido"),

    body("dia")
        .trim()
        .notEmpty()
        .withMessage("O campo Dia de nascimento é obrigatório")
        .bail()
        .isNumeric()
        .withMessage("O Dia de nascimento informado é inválido")
        .bail()
        .isLength({ min: 2, max: 2 })
        .withMessage("O Dia de nascimento informado é inválido"),

    body("mes")
        .trim()
        .notEmpty()
        .withMessage("O campo Mês de nascimento é obrigatório")
        .bail()
        .isNumeric()
        .withMessage("O Mês de nascimento informado é inválido")
        .bail()
        .isLength({ min: 2, max: 2 })
        .withMessage("O Mês de nascimento informado é inválido"),

    body("ano")
        .trim()
        .notEmpty()
        .withMessage("O campo Ano de nascimento é obrigatório")
        .bail()
        .isNumeric()
        .withMessage("O Ano de nascimento informado é inválido")
        .bail()
        .isLength({ min: 4, max: 4 })
        .withMessage("O Ano de nascimento informado é inválido"),

    body("data_nascimento")
        .trim()
        .notEmpty()
        .withMessage("A data de nascimento é obrigatória")
        .bail()
        .isDate({ format: "DD/MM/YYYY" })
        .withMessage("A data de nascimento é inválida")
        .bail()
        .custom((value, { req }) => {
            let { dia, mes, ano } = req.body;
            let data_nascimento = new Date(ano, mes, dia);
            return fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo").then(fetchRes => fetchRes.json())
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then(data => {
                    let currentDate = new Date(data.datetime);
                    if (data_nascimento > currentDate)
                        return Promise.reject("A data de nascimento é inválida");
                })
        }),

    body("cpf")
        .trim()
        .notEmpty()
        .withMessage("O campo CPF é obrigatório")
        .bail()
        .isString()
        .withMessage("O CPF informado é inválido")
        .bail()
        .isLength({ min: 14, max: 14 })
        .withMessage("O CPF informado é inválido")
        .bail()
        .custom(value => {
            return UsuarioFisico.findOne({ cpf: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o CPF informado.");
                })
        }),

    body("nome_do_endereco")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        })
        .notEmpty()
        .withMessage("O campo Nome do endereço é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome do endereço informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Nome do endereço deve conter no mínimo 3 caracteres"),

    body("numero_endereco")
        .trim()
        .notEmpty()
        .withMessage("O campo Nº do endereço é obrigatório")
        .bail()
        .isNumeric()
        .withMessage("O Nº do endereço informado é inválido"),

    body("complemento")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        }),

    body("bairro")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        })
        .notEmpty()
        .withMessage("O campo Bairro é obrigatório")
        .bail()
        .isString()
        .withMessage("O Bairro informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Bairro deve conter no mínimo 3 caracteres"),

    body("ponto_referencia")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        }),

    body("cep")
        .trim()
        .notEmpty()
        .withMessage("O campo CEP é obrigatório")
        .bail()
        .isString()
        .withMessage("O CEP informado é inválido")
        .bail()
        .isLength({ min: 9, max: 9 })
        .withMessage("O CEP informado é inválido")
        .bail()
        .custom((value, { req }) => {
            return fetch('https://viacep.com.br/ws/' + value.replace("-", "") + '/json/unicode/').then(fetchRes => fetchRes.json())
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then(data => {
                    if ("erro" in data) {
                        return Promise.reject("O CEP informado é inválido");
                    } else {
                        req.body.estado = data.uf;
                        req.body.cidade = data.localidade;
                    }
                })
        }),

    body("estado")
        .trim()
        .toUpperCase()
        .notEmpty()
        .withMessage("O campo Estado é obrigatório")
        .bail()
        .isAlpha()
        .withMessage("O Estado informado é inválido")
        .bail()
        .isLength({ min: 2, max: 2 })
        .withMessage("O Estado informado é inválido"),

    body("cidade")
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase()
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                .replace(/ Da /g, ' da ')
                .replace(/ De /g, ' de ')
                .replace(/ Do /g, ' do ')
                .replace(/ Das /g, ' das ')
                .replace(/ Dos /g, ' dos ');
        })
        .notEmpty()
        .withMessage("O campo Cidade é obrigatório")
        .bail()
        .isString()
        .withMessage("A Cidade informada é inválida")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Cidade deve conter no mínimo 3 caracteres"),

    body("telefone")
        .trim()
        .notEmpty()
        .withMessage("O campo Telefone é obrigatório")
        .bail()
        .isString()
        .withMessage("O Telefone informado é inválido")
        .bail()
        .isLength({ min: 14, max: 15 })
        .withMessage("O Telefone informado é inválido")
        .bail()
        .matches(/\(\d{2,}\) \d{4,}\-\d{4}/g)
        .withMessage("O Telefone informado é inválido")
        .bail()
        .custom((value, { req }) => {
            if (value == req.body.outro_telefone)
                throw new Error("Os telefones devem ser diferentes");
            return true;
        })
        .bail()
        .custom(value => {
            return UsuarioFisico.findOne({ telefone: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o Telefone informado.");
                })
        }),

    body("outro_telefone")
        .trim()
        .custom(value => {
            return UsuarioFisico.findOne({ outro_telefone: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o Telefone (Outro telefone) informado.");
                    else if ((value != "") && ((value.length != 14 && value.length != 15) || !(/\(\d{2,}\) \d{4,}\-\d{4}/g.test(value))))
                        return Promise.reject("O campo Outro telefone informado é inválido");
                })
        }),

    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage("O campo Email é obrigatório")
        .bail()
        .isString()
        .withMessage("O Email informado é inválido")
        .bail()
        .isEmail()
        .withMessage("O Email informado é inválido")
        .bail()
        .custom(value => {
            return UsuarioFisico.findOne({ email: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o Email informado.");
                })
        }),

    body("senha")
        .trim()
        .notEmpty()
        .withMessage("O campo Senha é obrigatório")
        .bail()
        .isString()
        .withMessage("A Senha informada é inválida")
        .bail()
        .isLength({ min: 8 })
        .withMessage("A Senha deve conter no mínimo 8 caracteres")
        .bail()
        .custom((value, { req }) => {
            if (value != req.body.con_senha)
                throw new Error("Os campos senha e confirmar senha devem ser iguais");
            return true;
        }),

    body("check_ofertas")
        .toBoolean()
        .isBoolean()
        .withMessage('O campo "Quero receber ofertas por e-mail..." é inválido'),

    body("check_politica")
        .toBoolean()
        .isBoolean()
        .withMessage('Você deve aceitar a política de privacidade ao fazer o registro')
        .bail()
        .custom(value => {
            if (value !== true)
                throw new Error("Você deve aceitar a política de privacidade ao fazer o registro");
            return true;
        })
]