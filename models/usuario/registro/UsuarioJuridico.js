const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioJuridico = new Schema({
    razao_social: {
        type: String,
        minLength: 3,
        required: true
    },
    fantasia: {
        type: String,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    inscricao_municipal: {
        type: String,
    },
    inscricao_estadual: {
        type: String,
        required: true
    },
    isento: {
        type: Boolean,
        required: true
    },
    cnpj: {
        type: String,
        minLength: 18,
        maxLength: 18,
        unique: true,
        required: true
    },
    telefone: {
        type: String,
        minLength: 14,
        maxLength: 15,
        unique: true,
        required: true
    },
    outro_telefone: {
        type: String,
        maxLength: 15,
        unique: true
    },
    foto: {
        type: String,
        unique: true
    },
    ofertas_email: {
        type: Boolean,
        required: true
    },
    enderecos: [{
        type: Schema.Types.ObjectId,
        ref: "enderecos"
    }],
    cartoes: [{
        type: Schema.Types.ObjectId,
        ref: "cartoes"
    }],
    admin: {
        type: Boolean,
        default: false
    }

})

mongoose.model("usuariosJuridicos", UsuarioJuridico);