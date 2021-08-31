const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioFisico = new Schema({
    nome: {
        type: String,
        minLength: 3,
        required: true
    },
    sobrenome: {
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
    sexo: {
        type: String,
        enum: ['Masculino', 'Feminino'],
        required: true
    },
    data_nascimento: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        minLength: 14,
        maxLength: 14,
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
        unique: true,
        sparse: true
    },
    foto: {
        type: String,
        unique: true,
        sparse: true
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

mongoose.model("usuariosFisicos", UsuarioFisico);