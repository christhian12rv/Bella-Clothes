const { body } = require('express-validator');
const fetch = require("node-fetch");
const Categoria = require("../../models/produto/Categoria");
const Subcategoria = require("../../models/produto/Subcategoria");

exports.addCategoria = [
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
        .withMessage("O campo Nome da Categoria é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome da Categoria informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O Nome da Categoria deve conter no mínimo 3 caracteres")
        .bail()
        .custom((value, { req }) => {
            return Categoria.findOne({ nome: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (categoria)
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
        .isLength({ min: 3 })
        .withMessage("O Slug deve conter no mínimo 3 caracteres")
        .bail()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return Categoria.findOne({ slug: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (categoria)
                        return Promise.reject("Já existe uma Categoria com o slug informado");
                })
        })
]

exports.updateCategoria = [
    body("categoriaToUpdate.nome")
        .optional()
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
        .isLength({ min: 3 })
        .withMessage("O Nome da Categoria deve conter no mínimo 3 caracteres")
        .bail()
        .custom((value, { req }) => {
            return Categoria.findOne({ _id: { $ne: req.body.id_categoria }, nome: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (categoria)
                        return Promise.reject("Já existe uma Categoria com o nome informado");
                })
        }),

    body("categoriaToUpdate.descricao")
        .optional()
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

    body("categoriaToUpdate.slug")
        .optional()
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é obrigatório")
        .bail()
        .isString()
        .withMessage("O Slug informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O Slug deve conter no mínimo 3 caracteres")
        .bail()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return Categoria.findOne({ _id: { $ne: req.body.id_categoria }, slug: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (categoria)
                        return Promise.reject("Já existe uma Categoria com o slug informado");
                })
        })
]


exports.addSubcategoria = [
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
        .withMessage("O campo Nome da Subcategoria é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome da Subcategoria informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O Nome da Subcategoria deve conter no mínimo 3 caracteres")
        .bail()
        .custom((value, { req }) => {
            return Subcategoria.findOne({ nome: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((subcategoria) => {
                    if (subcategoria)
                        return Promise.reject("Já existe uma Subcategoria com o nome informado");
                })
        }),

    body("descricao")
        .trim()
        .customSanitizer(value => value.charAt(0).toUpperCase() + value.slice(1))
        .notEmpty()
        .withMessage("O campo Descrição da Subcategoria é obrigatório")
        .bail()
        .isString()
        .withMessage("A Descrição da Subcategoria informada é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("A Descrição da Subcategoria deve conter no mínimo 3 caracteres"),

    body("slug")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é obrigatório")
        .bail()
        .isString()
        .withMessage("O Slug informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O Slug deve conter no mínimo 3 caracteres")
        .bail()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return Subcategoria.findOne({ slug: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((subcategoria) => {
                    if (subcategoria)
                        return Promise.reject("Já existe uma Subcategoria com o slug informado");
                })
        }),

    body("categoria")
        .trim()
        .notEmpty()
        .withMessage("O campo Categoria é obrigatório")
        .bail()
        .custom((value, { req }) => {
            return Categoria.findOne({ _id: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (!categoria)
                        return Promise.reject("A categoria informada não existe");
                })
        }),

    body("genero")
        .trim()
        .notEmpty()
        .withMessage("O campo Gênero é obrigatório")
        .bail()
        .isString()
        .withMessage("O Gênero informado é inválido")
        .bail()
        .isIn(["Homem", "Mulher", "Unissex", "Infantil"])
        .withMessage("O Gênero deve ser Homem, Mulher, Unissex ou Infantil")
]

exports.updateSubcategoria = [
    body("subcategoriaToUpdate.nome")
        .optional()
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
        .withMessage("O campo Nome da Subcategoria é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome da Subcategoria informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O Nome da Subcategoria deve conter no mínimo 3 caracteres")
        .bail()
        .custom((value, { req }) => {
            return Subcategoria.findOne({ _id: { $ne: req.body.id_subcategoria }, nome: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((subcategoria) => {
                    if (subcategoria)
                        return Promise.reject("Já existe uma Subcategoria com o nome informado");
                })
        }),

    body("subcategoriaToUpdate.descricao")
        .optional()
        .trim()
        .customSanitizer(value => value.charAt(0).toUpperCase() + value.slice(1))
        .notEmpty()
        .withMessage("O campo Descrição da Subcategoria é obrigatório")
        .bail()
        .isString()
        .withMessage("A Descrição da Subcategoria informada é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("A Descrição da Subcategoria deve conter no mínimo 3 caracteres"),

    body("subcategoriaToUpdate.slug")
        .optional()
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("O campo Slug é obrigatório")
        .bail()
        .isString()
        .withMessage("O Slug informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O Slug deve conter no mínimo 3 caracteres")
        .bail()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("O Slug informado é inválido. Um Slug deve ser todo em caracteres minúsculos e não pode conter nenhum caractere especial, exceto hífens")
        .custom((value, { req }) => {
            return Subcategoria.findOne({ _id: { $ne: req.body.id_subcategoria }, slug: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((subcategoria) => {
                    if (subcategoria)
                        return Promise.reject("Já existe uma Subcategoria com o slug informado");
                })
        }),

    body("subcategoriaToUpdate.categoria")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Categoria é obrigatório")
        .bail()
        .custom((value, { req }) => {
            return Categoria.findOne({ _id: value }).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (!categoria)
                        return Promise.reject("A categoria informada não existe");
                })
        }),

    body("subcategoriaToUpdate.genero")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("O campo Gênero é obrigatório")
        .bail()
        .isString()
        .withMessage("O Gênero informado é inválido")
        .bail()
        .isIn(["Homem", "Mulher", "Unissex", "Infantil"])
        .withMessage("O Gênero deve ser Homem, Mulher, Unissex ou Infantil")
]



exports.addProduto = [
    body("nome_produto")
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
        .withMessage("O campo Nome do Produto é obrigatório")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Nome do Produto deve conter no mínimo 2 caracteres"),

    body("genero")
        .trim()
        .notEmpty()
        .withMessage("O campo Gênero é obrigatório")
        .bail()
        .isIn(["Masculino", "Feminino", "Infantil"])
        .withMessage("O campo Gênero deve conter no mínimo 2 caracteres"),

    body("infantil")
        .trim()
        .custom((value, { req }) => {
            if (req.genero === "Infantil") {
                if (value == '')
                    throw new Error("O campo Gênero Infantil é obrigatório");
                else if (value !== "Menino" && value !== "Menina" && value !== "Bebê Menino" && value !== "Bebê Menina")
                    throw new Error("O Gênero Infantil informado é inválido");
            } else
                value = null;
            return true;
        }),

    body("categoria")
        .trim()
        .notEmpty()
        .withMessage("O campo Gênero é obrigatório")
        .bail()
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("A Categoria informada é inválida")
        .bail()
        .custom(value => {
            return Categoria.findById(value).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (!categoria)
                        return Promise.reject("A Categoria informada é inválida");
                })
        }),

    body("subcategoria")
        .trim()
        .notEmpty()
        .withMessage("O campo Gênero é obrigatório")
        .bail()
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("A Categoria informada é inválida")
        .bail()
        .custom(value => {
            return Categoria.findById(value).lean()
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
                .then((categoria) => {
                    if (!categoria)
                        return Promise.reject("A Categoria informada é inválida");
                })
        }),

    body("marca")
        .trim()
        .notEmpty()
        .withMessage("O campo Marca é obrigatório")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Marca deve conter no mínimo 2 caracteres"),

    body("materiais"),
    body("composicao"),

    body("peso")
        .trim()
        .notEmpty()
        .withMessage("O campo Peso é obrigatório")
        .bail()
        .isNumeric()
        .withMessage("O Peso informado é inválido")
        .bail()
        .isFloat({ min: 1 })
        .withMessage("O Peso informado é inválido"),

    body("tipo_peso")
        .trim()
        .notEmpty()
        .withMessage("O campo Tipo de Peso é obrigatório")
        .bail()
        .isString()
        .withMessage("O Tipo de Peso informado é inválido")
        .bail()
        .isIn(["Unidade", "Par"])
        .withMessage("O Tipo de Peso informado é inválido"),

    body("indicado_para")
        .trim()
        .customSanitizer(value => {
            return value.replace(/^./, value[0].toUpperCase());
        })
        .notEmpty()
        .withMessage("O campo Indicado para é obrigatório")
        .bail()
        .isLength({ min: 2 })
        .withMessage("O campo Indicado para deve conter no mínimo 2 caracteres"),

    body("descricao_introducao")
        .trim()
        .notEmpty()
        .withMessage("O campo Descrição da Introdução é obrigatório")
        .bail()
        .isLength({ min: 10 })
        .withMessage("O campo Descrição da Introdução deve conter no mínimo 10 caracteres"),

    body("descricao_recursos")
        .trim()
        .notEmpty()
        .withMessage("O campo Descrição da Recursos é obrigatório")
        .bail()
        .isLength({ min: 10 })
        .withMessage("O campo Descrição da Recursos deve conter no mínimo 10 caracteres"),
]