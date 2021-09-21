const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cartao = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    numero: {
        type: String,
        minLength: 19,
        maxLength: 19,
        required: true,
        unique: true
    },
    codigo_seguranca: {
        type: Number,
        minLength: 3,
        maxLength: 4,
        required: true
    },
    nome: {
        type: String,
        minLength: 3,
        required: true
    },
    tipo: {
        type: String,
        enum: ['cpf', 'cnpj'],
        required: true
    },
    banco: {
        type: String,
        required: true
    },
    imagem: {
        type: String
    },
    cadastro: {
        type: String,
        validate: {
            validator: (val) => {
                return val.toString().length === 14 || val.toString().length === 18
            },
            message: val => 'cadastro has to be 14 or 19 digits'
        },
        required: true,
        unique: true
    },
    data_vencimento: {
        type: String,
        minLength: 7,
        maxLenght: 7,
        sparse: true
    }
}, { timestamps: true })

module.exports = mongoose.model("cartoes", Cartao);