const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
        minLength: 3,
        required: true
    },
    slug: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("categoriasProduto", Categoria);