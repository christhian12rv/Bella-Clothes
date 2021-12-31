const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariacaoProduto = new Schema({
    produto: {
        type: Schema.Types.ObjectId,
        ref: 'produto',
        required: true
    },
    cor: {
        type: String,
        minLength: 2,
        required: true
    },
    preco_original: {
        type: String,
        minLength: 3,
        required: true
    },
    slug: {
        type: String,
        minLength: 2,
        required: true,
        unique: true
    },
    tipo_desconto: {
        type: String,
        enum: ['porcentagem', 'bruto']
    },
    desconto: {
        type: String
    },
    parcelas: [{
        vezes_parcela: {
            type: Number,
            min: 1,
            max: 12,
            required: true
        },
        escolher_juros: {
            type: String,
            minLength: 2,
            enum: ['sem-juros', 'com-juros'],
            required: true
        },
        preco_parcela: {
            type: String,
            minLength: 4,
            required: true
        },
        juros_parcela: {
            type: String
        }
    }],
    tamanhos: [{
        tamanho: {
            type: String,
            minLength: 1,
            required: true
        },
        estoque: {
            type: Number,
            min: 0,
            required: true
        }
    }],
    imagens: [{
        type: String,
        unique: true,
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model("variacaoProduto", VariacaoProduto);