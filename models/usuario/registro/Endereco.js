const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Endereco = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    nome: {
        type: String,
        minLength: 3,
        required: true
    },
    numero: {
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
    ponto_referencia: {
        type: String,
        minLength: 3,
        sparse: true
    },
    cep: {
        type: String,
        minLength: 9,
        maxLength: 9,
        required: true
    },
    estado: {
        type: String,
        minLength: 2,
        maxLength: 2,
        required: true
    },
    cidade: {
        type: String,
        minLength: 3,
        required: true
    },
    informacoes_adicionais: {
        type: String,
        minLength: 3
    },
    nome_pessoa: {
        type: String,
        minLength: 3,
        required: true
    },
    telefone: {
        type: String,
        minLength: 14,
        maxLength: 15,
        unique: true,
        required: true
    },
    principal: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("enderecos", Endereco);