const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioFisico = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
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
    dataNascimento: {
        type: Date,
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
    outroTelefone: {
        type: String,
        minLength: 14,
        maxLength: 15,
        unique: true
    },
    foto: {
        type: String,
        unique: true
    },
    ofertasEmail: {
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