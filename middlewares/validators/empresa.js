const { body } = require('express-validator');
const fetch = require("node-fetch");
const Usuario = require("../../models/usuario/registro/Usuario");

exports.updateEmpresa = [
    body("endereco")
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
            return Usuario.findOne({ telefone: value }).lean()
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
            return Usuario.findOne({ outro_telefone: value }).lean()
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

]