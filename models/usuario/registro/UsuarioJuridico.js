const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioJuridico = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    razao_social: {
        type: String,
        minLength: 3,
        required: true
    },
    fantasia: {
        type: String
    },
    inscricao_municipal: {
        type: String,
    },
    inscricao_estadual: {
        type: String
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
    }
})

module.exports = mongoose.model("usuariosJuridicos", UsuarioJuridico);