const { body } = require('express-validator');
const fetch = require("node-fetch");
const Categoria = require("../../models/produto/Categoria");

exports.categoria = [
    body("categoria")
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
        .withMessage("O campo Nome da Categoria é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome da Categoria informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O Nome da Categoria deve conter no mínimo 2 caracteres")
        .bail()
        .custom((value, { req }) => {
            return Categoria.findOne({ nome: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe uma Categoria com o nome informado");
                })
        }),

    body("descricao")
        .trim()
        .customSanitizer(value => value.charAt(0).toUpperCase() + value.slice(1))
        .notEmpty()
        .withMessage("O campo Descrição da Categoria é obrigatório")
        .bail()
        .isString()
        .withMessage("A Descrição da Categoria informada é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("A Descrição da Categoria deve conter no mínimo 3 caracteres"),

    body("slug")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é obrigatório")
        .bail()
        .isString()
        .withMessage("O Slug informado é inválido")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O Slug deve conter no mínimo 2 caracteres")
        .bail()
        .isSlug()
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return Categoria.findOne({ slug: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe uma Categoria com o slug informado");
                })
        }),
]