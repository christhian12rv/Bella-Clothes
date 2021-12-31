const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Produto = new Schema({
    nome_produto: {
        type: String,
        minLength: 2,
        required: true
    },
    genero: {
        type: String,
        minLength: 2,
        enum: ['Masculino', 'Feminino', 'Infantil'],
        required: true
    },
    infantil: {
        type: String,
        minLength: 2,
        enum: ['Menino', 'Menina', 'Bebê Menino', 'Bebê Menina']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categoriasProduto",
        required: true
    },
    subcategoria: {
        type: Schema.Types.ObjectId,
        ref: "subcategoriasProduto",
        required: true
    },
    marca: {
        type: String,
        minLength: 2,
        required: true
    },
    materiais: [{
        type: String,
        minLength: 2,
        required: true
    }],
    composicao: [{
        type: String,
        minLength: 2,
        required: true
    }],
    peso: {
        type: String,
        minLength: 1,
        required: true
    },
    tipo_peso: {
        type: String,
        enum: ["Unidade", "Par"],
        required: true
    },
    indicado_para: {
        type: String,
        minLength: 2,
        required: true
    },
    descricao_introducao: {
        type: String,
        minLength: 10,
        required: true
    },
    descricao_recursos: {
        type: String,
        minLength: 10,
        required: true
    },
    quantidade_cores: {
        type: Number,
        min: 1,
        required: true
    },
    ativo: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("produto", Produto);