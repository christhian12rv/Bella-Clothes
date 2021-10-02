const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Empresa = new Schema({
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        minLength: 18,
        maxLength: 18,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    endereco: {
        type: String,
        minLength: 3,
        required: true
    },
    numero_endereco: {
        type: Number,
        required: true
    },
    complemento: {
        type: String,
        minLength: 3,
        sparse: true
    },
    bairro: {
        type: String,
        minLength: 3,
        required: true
    },
    cidade: {
        type: String,
        minLength: 3,
        required: true
    },
    estado: {
        type: String,
        minLength: 2,
        maxLength: 2,
        required: true
    },
    cep: {
        type: String,
        minLength: 9,
        maxLength: 9,
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
        unique: true,
        sparse: true
    },
}, { timestamps: true })

module.exports = mongoose.model("empresa", Empresa);