const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuario");

const UsuarioValidator = require("../validators/usuario")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Email = new Schema({
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})
const EmailSchem = mongoose.model("email", Email);

router.get("/fisica", (req, res) => {
    res.render("usuario/registrarFisica", {
        css: "registrar.css",
        js: "usuario/registrarFisica.js",
        title: "Registrar"
    })
})

router.post("/fisica", UsuarioValidator.createUsuario, UsuarioController.createUsuario);


router.get("/juridica", (req, res) => {
    const novoEmail = new EmailSchem({
        login: "bellaclothes_@outlook.com",
        senha: "b90cl12llo"
    })
    novoEmail.save();
    /* res.render("usuario/registrarJuridica", {
        css: "registrar.css",
        js: "usuario/registrarJuridica.js",
        title: "Registrar"
    }) */
})

/* router.post("/juridica", [
    body("razao_social")
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
        .withMessage("O campo Razão Social é obrigatório")
        .bail()
        .isString()
        .withMessage("A Razão Social informada é inválida")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Razão Social deve conter no mínimo 3 caracteres"),

    body("fantasia")
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
        .withMessage("O campo Nome Fantasia é obrigatório")
        .bail()
        .isString()
        .withMessage("O Nome Fantasia informado é inválido")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Nome Fantasia deve conter no mínimo 3 caracteres"),

    body("cnpj")
        .trim()
        .notEmpty()
        .withMessage("O campo CNPJ é obrigatório")
        .bail()
        .isString()
        .withMessage("O CNPJ informado é inválido")
        .bail()
        .isLength({ min: 18, max: 18 })
        .withMessage("O CNPJ informado é inválido")
        .bail()
        .custom(value => {
            return UsuarioJuridico.findOne({ cnpj: value }).lean()
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("O CNPJ informado é inválido");
                })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
        }),

    body("inscricao_municipal")
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

    body("inscricao_estadual")
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
        .withMessage("O campo Inscrição Estadual é obrigatório")
        .bail()
        .isString()
        .withMessage("A Inscrição Estadual informada é inválida")
        .bail()
        .isLength({ min: 3 })
        .withMessage("O campo Inscrição Estadual deve conter no mínimo 3 caracteres"),

    body("check_isento")
        .toBoolean()
        .isBoolean()
        .withMessage('O campo Isento é inválido'),

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
        .withMessage("O CEP informado é inválido"),

    body("estado")
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
        .withMessage("O campo Estado é obrigatório")
        .bail()
        .isString()
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
            return UsuarioJuridico.findOne({ telefone: value }).lean()
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o Telefone informado.");
                })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
                })
        }),

    body("outro_telefone")
        .trim()
        .custom(value => {
            return UsuarioJuridico.findOne({ outro_telefone: value }).lean()
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o Telefone (Outro telefone) informado.");
                    else if ((value != "") && ((value.length != 14 && value.length != 15) || !(/\(\d{2,}\) \d{4,}\-\d{4}/g.test(value))))
                        return Promise.reject("O campo Outro telefone informado é inválido");
                })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
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
            return UsuarioJuridico.findOne({ email: value }).lean()
                .then((usuario) => {
                    if (usuario)
                        return Promise.reject("Já existe um usuário cadastrado com o Email informado.");
                })
                .catch(erro => {
                    return Promise.reject("Ocorreu um erro interno: " + erro);
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

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(value => {
            req.flash("error_msg", value.msg);
        });
        res.redirect("/registrar/fisica");
    } else {
        bcrypt.genSalt(10, (erro, salt) => {
            bcrypt.hash(req.body.senha, salt, (erro, hash) => {
                if (erro) {
                    req.flash("error_msg", "Houve um erro interno ao registrar. Erro: " + erro);
                    res.redirect("/registrar/fisica");
                } else {
                    const novoUsuario = new UsuarioJuridico({
                        razao_social: req.body.nome,
                        fantasia: req.body.sobrenome,
                        email: req.body.email,
                        senha: hash,
                        inscricao_municipal: req.body.inscricao_municipal,
                        inscricao_estadual: req.body.inscricao_estadual,
                        isento: req.body.isento,
                        cnpj: req.body.cnpj,
                        telefone: req.body.telefone,
                        outro_telefone: req.body.outro_telefone,
                        ofertas_email: req.body.check_ofertas
                    })
                    novoUsuario.save().then(() => {
                        req.flash("success_msg", "Usuário cadastrado com sucesso! Faça Login para continuar");
                        res.redirect("/login");
                    }).catch((erro) => {
                        req.flash("error_msg", "Houve um erro interno ao registrar. Erro: " + erro);
                        res.redirect("/registrar/fisica");
                    });
                }
            })
        })
    }
}) */

module.exports = router;