const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subcategoria = new Schema({
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
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categoriasProduto",
        required: true
    },
    genero: {
        type: String,
        enum: ["Homem", "Mulher", "Unissex", "Infantil"],
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("subcategoriasProduto", Subcategoria);