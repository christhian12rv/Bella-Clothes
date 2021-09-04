const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioFisico = new Schema({
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
    sobrenome: {
        type: String,
        minLength: 3,
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
    }
})

module.exports = mongoose.model("usuariosFisicos", UsuarioFisico);